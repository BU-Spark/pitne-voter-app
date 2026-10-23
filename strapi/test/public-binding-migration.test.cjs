'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{plan,sha,encode}=require('../scripts/plan-public-binding-migration.cjs');
function fixture(){
 const files=Object.fromEntries(Array.from({length:47},(_,i)=>['config/file-'+i+'.js',sha(Buffer.from('source-'+i))]));
 const oldSourceBytes=encode({version:1,kind:'voter-runtime-source',files,imagePublicFiles:{'uploads/fixture.txt':sha(Buffer.from('old'))}}),expectedOldSourceHash=sha(oldSourceBytes);
 const oldReadyBytes=encode({version:1,kind:'voter-public-seed',sourceManifestSha256:expectedOldSourceHash,files:{'uploads/fixture.txt':sha(Buffer.from('old'))},directories:['uploads']}),expectedOldSeedHash=sha(oldReadyBytes);
 return{oldSourceBytes,oldReadyBytes,oldInitializedBytes:encode({version:1,sourceManifestSha256:expectedOldSourceHash,seedManifestSha256:expectedOldSeedHash}),newSourceBytes:encode({version:1,kind:'voter-runtime-source',files,imagePublicFiles:{'uploads/.gitkeep':sha(Buffer.alloc(0))}}),expectedOldSourceHash,expectedOldSeedHash};
}
test('plans both marker bindings without changing the seed file inventory',()=>{const input=fixture(),copy=JSON.stringify(input),out=plan(input),ready=JSON.parse(out.readyBytes),initialized=JSON.parse(out.initializedBytes);assert.deepEqual(ready.files,JSON.parse(input.oldReadyBytes).files);assert.deepEqual(ready.directories,['uploads']);assert.equal(ready.sourceManifestSha256,sha(input.newSourceBytes));assert.equal(initialized.sourceManifestSha256,ready.sourceManifestSha256);assert.equal(initialized.seedManifestSha256,sha(out.readyBytes));assert.equal(out.environment.SPARK_VOTER_SEED_MANIFEST_SHA256,sha(out.readyBytes));assert.equal(JSON.stringify(input),copy);});
test('rejects incorrect original source, seed or initialized bindings',()=>{for(const key of ['expectedOldSourceHash','expectedOldSeedHash'])assert.throws(()=>plan({...fixture(),[key]:'0'.repeat(64)}));const f=fixture(),marker=JSON.parse(f.oldInitializedBytes);marker.sourceManifestSha256='0'.repeat(64);assert.throws(()=>plan({...f,oldInitializedBytes:encode(marker)}));});
test('rejects an executable source change rather than treating it as manifest-only migration',()=>{const f=fixture(),source=JSON.parse(f.newSourceBytes);source.files['config/file-0.js']='0'.repeat(64);assert.throws(()=>plan({...f,newSourceBytes:encode(source)}));});
test('rejects missing initialization and a no-op source binding',()=>{const f=fixture();assert.throws(()=>plan({...f,oldInitializedBytes:encode({})}));assert.throws(()=>plan({...f,newSourceBytes:f.oldSourceBytes}));});

test('planned marker pair works with the exact canonical source and reviewed guard',()=>{
 const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),guard=require('../spark-recovery-start.cjs');
 const root=path.resolve(__dirname,'..'),temporary=fs.mkdtempSync(path.join(os.tmpdir(),'voter-binding-test-'));
 try{
  const app=path.join(temporary,'app'),volume=path.join(temporary,'volume'),sourceBytes=fs.readFileSync(path.join(root,'spark-recovery-source-manifest.json')),source=JSON.parse(sourceBytes);fs.mkdirSync(app);fs.mkdirSync(volume);
  for(const name of ['src','config','database','public'])fs.mkdirSync(path.join(app,name));
  for(const name of [...Object.keys(source.files),'spark-recovery-source-manifest.json',...Object.keys(source.imagePublicFiles).map(name=>'public/'+name)]){const target=path.join(app,name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,name),target);}
  fs.mkdirSync(path.join(volume,'uploads'));fs.writeFileSync(path.join(volume,'uploads/fixture.txt'),'seed-file');fs.writeFileSync(path.join(volume,'uploads/new-after-seed.txt'),'preserve-later-write');
  const oldSourceBytes=encode({...source,imagePublicFiles:{'uploads/fixture.txt':sha(Buffer.from('seed-file'))}}),oldSourceHash=sha(oldSourceBytes),oldReadyBytes=encode({version:1,kind:'voter-public-seed',sourceManifestSha256:oldSourceHash,files:{'uploads/fixture.txt':sha(Buffer.from('seed-file'))},directories:['uploads']}),oldSeedHash=sha(oldReadyBytes),oldInitializedBytes=encode({version:1,sourceManifestSha256:oldSourceHash,seedManifestSha256:oldSeedHash});
  fs.writeFileSync(path.join(volume,'.spark-voter-ready.json'),oldReadyBytes);fs.writeFileSync(path.join(volume,'.spark-voter-initialized.json'),oldInitializedBytes);
  assert.throws(()=>guard.prepare(app,volume,sha(sourceBytes),oldSeedHash));
  const result=plan({oldSourceBytes,oldReadyBytes,oldInitializedBytes,newSourceBytes:sourceBytes,expectedOldSourceHash:oldSourceHash,expectedOldSeedHash:oldSeedHash});fs.writeFileSync(path.join(volume,'.spark-voter-ready.json'),result.readyBytes);fs.writeFileSync(path.join(volume,'.spark-voter-initialized.json'),result.initializedBytes);
  const rename=fs.renameSync;fs.renameSync=(from,to)=>{if(from===path.join(app,'public')){const e=Error('fixture');e.code='EXDEV';throw e;}return rename(from,to);};
  try{assert.equal(guard.prepare(app,volume,result.environment.SPARK_VOTER_SOURCE_MANIFEST_SHA256,result.environment.SPARK_VOTER_SEED_MANIFEST_SHA256).ready,true);}finally{fs.renameSync=rename;}
  assert.equal(fs.realpathSync(path.join(app,'public')),fs.realpathSync(volume));assert.equal(fs.readFileSync(path.join(volume,'uploads/fixture.txt'),'utf8'),'seed-file');assert.equal(fs.readFileSync(path.join(volume,'uploads/new-after-seed.txt'),'utf8'),'preserve-later-write');
  assert.deepEqual(guard.filesAt(path.join(app,'.spark-voter-image-public')),Object.assign(Object.create(null),source.imagePublicFiles));
 }finally{fs.rmSync(temporary,{recursive:true,force:true});}
});
