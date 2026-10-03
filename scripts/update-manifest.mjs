import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root=new URL('../',import.meta.url),path=new URL('manifest.json',root);
const manifest=JSON.parse(await readFile(path,'utf8')),version=process.argv[2];
if(!version||version===manifest.version)throw new Error('Provide a new release version: node scripts/update-manifest.mjs 2026.10.05.1');
for(const resource of Object.values(manifest.resources)){const raw=await readFile(new URL(resource.path,root));JSON.parse(raw.toString());resource.sha256=createHash('sha256').update(raw).digest('hex')}
manifest.version=version;await writeFile(path,JSON.stringify(manifest,null,2)+'\n');console.log('Manifest updated: '+version);
