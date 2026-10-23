'use strict';
// Offline-prepared Voter guard. No app import or automatic execution on require.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const ensure = value => { if (!value) throw Error('voter-recovery-guard-failed'); };
const READY = '.spark-voter-ready.json';
const INITIALIZED = '.spark-voter-initialized.json';

function regular(file) {
  const s = fs.lstatSync(file);
  ensure(s.isFile() && !s.isSymbolicLink());
  return fs.readFileSync(file);
}
function safeRelative(name) {
  return typeof name === 'string' && name.length > 0 && !path.isAbsolute(name) &&
    !name.includes('\\') && !name.includes('\0') && !name.split('/').some(p => !p || p === '.' || p === '..');
}
function filesAt(root, prefix = '', excludeMarkers = false) {
  const out = Object.create(null);
  for (const e of fs.readdirSync(root, {withFileTypes: true})) {
    if (!prefix && excludeMarkers && [READY, INITIALIZED].includes(e.name)) continue;
    ensure(!e.isSymbolicLink());
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    ensure(safeRelative(rel));
    if (e.isDirectory()) Object.assign(out, filesAt(path.join(root, e.name), rel));
    else {
      ensure(e.isFile());
      out[rel] = sha(regular(path.join(root, e.name)));
    }
  }
  return out;
}
function sameFiles(actual, expected) {
  ensure(expected && typeof expected === 'object' && !Array.isArray(expected));
  ensure(Object.keys(actual).length === Object.keys(expected).length);
  ensure(Object.entries(expected).every(([p,h]) => safeRelative(p) && /^[0-9a-f]{64}$/.test(h) && actual[p] === h));
}
function directory(root) {
  const s = fs.lstatSync(root);
  ensure(s.isDirectory() && !s.isSymbolicLink());
}
function sourceAt(appRoot, sourceHash) {
  ensure(path.isAbsolute(appRoot) && /^[0-9a-f]{64}$/.test(sourceHash));
  directory(appRoot);
  const sourceBytes = regular(path.join(appRoot, 'spark-recovery-source-manifest.json'));
  ensure(sha(sourceBytes) === sourceHash);
  const source = JSON.parse(sourceBytes);
  ensure(source.version === 1 && source.kind === 'voter-runtime-source');
  ensure(Object.keys(source.files).length === 47);
  ensure(Object.entries(source.files).every(([p,h]) => safeRelative(p) &&
    /^(src\/|config\/|database\/|package\.json$|package-lock\.json$)/.test(p) &&
    /^[0-9a-f]{64}$/.test(h) && sha(regular(path.join(appRoot,p))) === h));
  const actualSource = Object.create(null);
  for (const root of ['src','config','database']) {
    directory(path.join(appRoot,root));
    for (const [p,h] of Object.entries(filesAt(path.join(appRoot,root)))) actualSource[`${root}/${p}`] = h;
  }
  for (const p of ['package.json','package-lock.json']) actualSource[p] = sha(regular(path.join(appRoot,p)));
  sameFiles(actualSource,source.files);
  return source;
}
function prepare(appRoot, volumeRoot, sourceHash, seedHash) {
  ensure(path.isAbsolute(appRoot) && path.isAbsolute(volumeRoot) && appRoot !== volumeRoot);
  ensure(/^[0-9a-f]{64}$/.test(seedHash));
  directory(volumeRoot);
  const source = sourceAt(appRoot,sourceHash);
  const seedBytes = regular(path.join(volumeRoot, READY));
  ensure(sha(seedBytes) === seedHash);
  const seed = JSON.parse(seedBytes);
  ensure(seed.version === 1 && seed.kind === 'voter-public-seed' && seed.sourceManifestSha256 === sourceHash);
  const marker = path.join(volumeRoot, INITIALIZED);
  const actual = filesAt(volumeRoot, '', true);
  if (!fs.existsSync(marker)) sameFiles(actual, seed.files);
  else {
    const initialized = JSON.parse(regular(marker));
    ensure(initialized.version === 1 && initialized.seedManifestSha256 === seedHash && initialized.sourceManifestSha256 === sourceHash);
    // App writes after first initialization must never be replaced by the seed.
  }
  directory(path.join(volumeRoot, 'uploads'));
  const local = path.join(appRoot, 'public');
  let exists = true;
  try { fs.lstatSync(local); } catch (e) { if (e.code === 'ENOENT') exists = false; else throw e; }
  if (exists) {
    const s = fs.lstatSync(local);
    if (s.isSymbolicLink()) ensure(fs.realpathSync(local) === fs.realpathSync(volumeRoot));
    else {
      directory(local); sameFiles(filesAt(local), source.imagePublicFiles);
      const retained = path.join(appRoot, '.spark-voter-image-public');
      try { fs.lstatSync(retained); ensure(false); } catch(e) { if(e.code !== 'ENOENT') throw e; }
      try { fs.renameSync(local, retained); }
      catch(e) {
        if(e.code !== 'EXDEV') throw e;
        // OverlayFS cannot rename an image-layer directory. Preserve a verified
        // copy, then remove only the already-verified image files and empty dirs.
        // This never copies to, removes from, or overwrites the durable volume.
        fs.mkdirSync(retained,{mode:0o700});
        for(const [name,hash] of Object.entries(source.imagePublicFiles)) {
          const from=path.join(local,name),to=path.join(retained,name);
          ensure(sha(regular(from))===hash);
          fs.mkdirSync(path.dirname(to),{recursive:true,mode:0o700});
          fs.copyFileSync(from,to,fs.constants.COPYFILE_EXCL);
          const fd=fs.openSync(to,'r');try{fs.fsyncSync(fd);}finally{fs.closeSync(fd);}
        }
        sameFiles(filesAt(retained),source.imagePublicFiles);
        sameFiles(filesAt(local),source.imagePublicFiles);
        for(const [name,hash] of Object.entries(source.imagePublicFiles)) {
          const file=path.join(local,name);ensure(sha(regular(file))===hash);fs.unlinkSync(file);
        }
        const removeEmpty=dir=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){ensure(entry.isDirectory()&&!entry.isSymbolicLink());removeEmpty(path.join(dir,entry.name));}fs.rmdirSync(dir);};
        removeEmpty(local);
      }
      fs.symlinkSync(volumeRoot, local, 'dir');
    }
  } else fs.symlinkSync(volumeRoot, local, 'dir');
  if (!fs.existsSync(marker)) {
    const fd = fs.openSync(marker, 'wx', 0o600);
    try { fs.writeFileSync(fd, JSON.stringify({version:1,seedManifestSha256:seedHash,sourceManifestSha256:sourceHash})); fs.fsyncSync(fd); }
    finally { fs.closeSync(fd); }
  }
  ensure(fs.realpathSync(local) === fs.realpathSync(volumeRoot));
  return {ready:true,sourceFilesVerified:47,durablePublic:true};
}
async function waitForSeed(appRoot,volumeRoot,sourceHash,seedHash,{timeoutMs=600000,pollMs=250}={}) {
  ensure(Number.isFinite(timeoutMs) && timeoutMs>0 && timeoutMs<=600000 && Number.isFinite(pollMs) && pollMs>0 && pollMs<=1000);
  ensure(path.isAbsolute(volumeRoot) && appRoot!==volumeRoot && /^[0-9a-f]{64}$/.test(seedHash));
  directory(volumeRoot); sourceAt(appRoot,sourceHash);
  const deadline=Date.now()+timeoutMs;
  for (;;) {
    let present=true;
    try { fs.lstatSync(path.join(volumeRoot,READY)); }
    catch(e) { if(e.code==='ENOENT') present=false; else throw e; }
    // A present but invalid manifest/source fails immediately; only absence waits.
    if(present) return prepare(appRoot,volumeRoot,sourceHash,seedHash);
    ensure(Date.now()<deadline);
    await new Promise(resolve=>setTimeout(resolve,Math.min(pollMs,Math.max(1,deadline-Date.now()))));
  }
}
module.exports = {prepare,waitForSeed,filesAt,sha};
if (require.main === module) {
  (async()=>{
    ensure(process.argv.length===3&&process.argv[2]==='--prepare-only'&&process.cwd()==='/app'&&process.env.RAILWAY_VOLUME_MOUNT_PATH==='/public');
    await waitForSeed('/app','/public',process.env.SPARK_VOTER_SOURCE_MANIFEST_SHA256,process.env.SPARK_VOTER_SEED_MANIFEST_SHA256);
    // npm continues to the original `strapi develop` only after this hook exits0.
    // This mode never imports app code, calls a DB, listens, or spawns a child.
    console.log('voter-durable-public-ready');
  })().catch(e=>{console.error(JSON.stringify({error:'voter-recovery-guard-failed',code:e.code||null,syscall:e.syscall||null,guardFrame:String(e.stack||'').split('\n').find(line=>line.includes('spark-recovery-start.cjs:'))?.trim()||null}));process.exit(1);});
}
