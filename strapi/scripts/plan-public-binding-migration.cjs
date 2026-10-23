'use strict';
// Offline planner only. Never connects to Railway, writes a volume, or deploys.
const fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path');
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const must=value=>{if(!value)throw Error('binding-migration-input-invalid');};
const hash=value=>typeof value==='string'&&/^[0-9a-f]{64}$/.test(value);
const sorted=value=>Array.isArray(value)?value.map(sorted):(value&&typeof value==='object'?Object.fromEntries(Object.entries(value).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([key,item])=>[key,sorted(item)])):value);
const encode=value=>Buffer.from(JSON.stringify(sorted(value)));
function plan({oldSourceBytes,oldReadyBytes,oldInitializedBytes,newSourceBytes,expectedOldSourceHash,expectedOldSeedHash}){
 must(hash(expectedOldSourceHash)&&hash(expectedOldSeedHash));
 must(sha(oldSourceBytes)===expectedOldSourceHash&&sha(oldReadyBytes)===expectedOldSeedHash);
 const oldSource=JSON.parse(oldSourceBytes),ready=JSON.parse(oldReadyBytes),initialized=JSON.parse(oldInitializedBytes),nextSource=JSON.parse(newSourceBytes);
 must(oldSource.version===1&&nextSource.version===1&&oldSource.kind==='voter-runtime-source'&&nextSource.kind==='voter-runtime-source');
 must(Object.keys(oldSource.files).length===47&&encode(oldSource.files).equals(encode(nextSource.files)));
 must(ready.version===1&&ready.kind==='voter-public-seed'&&ready.sourceManifestSha256===expectedOldSourceHash);
 must(initialized.version===1&&initialized.sourceManifestSha256===expectedOldSourceHash&&initialized.seedManifestSha256===expectedOldSeedHash);
 must(ready.files&&typeof ready.files==='object'&&Object.keys(ready.files).length>0&&Object.values(ready.files).every(hash));
 const sourceHash=sha(newSourceBytes);must(sourceHash!==expectedOldSourceHash);
 const nextReady={...ready,sourceManifestSha256:sourceHash},readyBytes=encode(nextReady),seedHash=sha(readyBytes);
 const initializedBytes=encode({...initialized,sourceManifestSha256:sourceHash,seedManifestSha256:seedHash});
 return{readyBytes,initializedBytes,environment:{SPARK_VOTER_SOURCE_MANIFEST_SHA256:sourceHash,SPARK_VOTER_SEED_MANIFEST_SHA256:seedHash},seedFileCount:Object.keys(ready.files).length};
}
module.exports={plan,sha,encode};
if(require.main===module){
 try{
  // INPUT is a private directory containing source.json, ready.json,
  // initialized.json and expected.json with the two existing runtime hashes.
  const [input,newSource,output]=process.argv.slice(2);must(input&&newSource&&output&&process.argv.length===5);
  const metadata=fs.lstatSync(input);must(metadata.isDirectory()&&!metadata.isSymbolicLink()&&(metadata.mode&0o777)===0o700&&metadata.uid===process.getuid());
  const read=name=>{const file=path.join(input,name),st=fs.lstatSync(file);must(st.isFile()&&!st.isSymbolicLink()&&(st.mode&0o777)===0o600&&st.uid===process.getuid());return fs.readFileSync(file);};
  const expected=JSON.parse(read('expected.json'));must(Object.keys(expected).length===2&&Object.keys(expected).every(key=>['expectedOldSourceHash','expectedOldSeedHash'].includes(key)));const result=plan({oldSourceBytes:read('source.json'),oldReadyBytes:read('ready.json'),oldInitializedBytes:read('initialized.json'),newSourceBytes:fs.readFileSync(newSource),...expected});
  fs.mkdirSync(output,{mode:0o700});
  for(const [name,bytes]of [['ready.json',result.readyBytes],['initialized.json',result.initializedBytes],['environment.json',encode(result.environment)]]){const fd=fs.openSync(path.join(output,name),'wx',0o600);try{fs.writeFileSync(fd,bytes);fs.fsyncSync(fd);}finally{fs.closeSync(fd);}}
  const fd=fs.openSync(output,'r');try{fs.fsyncSync(fd);}finally{fs.closeSync(fd);}
  console.log(JSON.stringify({planned:true,seedFileCount:result.seedFileCount,providerChanges:false,volumeWrites:false}));
 }catch{console.error('binding-migration-plan-failed');process.exitCode=1;}
}
