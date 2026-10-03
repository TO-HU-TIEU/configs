import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root=new URL('../',import.meta.url),path=new URL('manifest.json',root);
const manifest=JSON.parse(await readFile(path,'utf8')),version=process.argv[2];
if(!version||version===manifest.version)throw new Error('Provide a new release version: node scripts/update-manifest.mjs 2026.10.05.1');
// Presets is the editing source; configs retains verified mirrors for installed extensions.
const presetRoot=new URL('../presets/',root);
for(const[source,target]of [['default-presets.json','presets/reply-styles.json'],['content-styles.json','presets/content-styles.json']]){const raw=(await readFile(new URL(source,presetRoot),'utf8')).replace(/\r\n/g,'\n');JSON.parse(raw);await writeFile(new URL(target,root),raw)}
for(const resource of Object.values(manifest.resources)){const file=new URL(resource.path,root),raw=(await readFile(file,'utf8')).replace(/\r\n/g,'\n');JSON.parse(raw);await writeFile(file,raw);resource.sha256=createHash('sha256').update(raw).digest('hex')}
manifest.version=version;await writeFile(path,JSON.stringify(manifest,null,2)+'\n');console.log('Manifest updated: '+version);
