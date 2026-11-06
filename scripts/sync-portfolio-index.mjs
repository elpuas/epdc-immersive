import {readFileSync,writeFileSync,readdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {parse} from 'yaml';
const directory='src/content/portfolio';
const projects=[];
for(const sourceFile of readdirSync(directory).filter(name=>name.endsWith('.mdx')).sort()){
 const raw=readFileSync(join(directory,sourceFile),'utf8');
 const frontmatter=raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
 if(!frontmatter)throw new Error('Missing frontmatter: '+sourceFile);
 const data=parse(frontmatter[1]);
 for(const field of ['title','description','image','lang','slug','translationKey','showcaseRole','showcaseOrder'])if(data[field]===undefined)throw new Error(`Missing ${field}: ${sourceFile}`);
 if(!['es','en','it'].includes(data.lang))throw new Error('Invalid locale: '+sourceFile);
 if(!['primary','secondary','none'].includes(data.showcaseRole))throw new Error('Invalid showcase role: '+sourceFile);
 if(!Number.isInteger(data.showcaseOrder)||data.showcaseOrder<0)throw new Error('Invalid showcase order: '+sourceFile);
 if(!existsSync('public'+data.image))throw new Error('Missing hero image: '+data.image);
 projects.push({title:data.title,description:data.description,image:data.image,date:String(data.date??''),tags:data.tags??[],lang:data.lang,slug:data.slug,translationKey:data.translationKey,showcaseRole:data.showcaseRole,showcaseOrder:data.showcaseOrder,sourceFile,href:`/${data.lang}/crafted-with-love/${data.slug}/`});
}
if(projects.length!==30)throw new Error('Expected 30 localized cases, got '+projects.length);
for(const group of new Set(projects.map(project=>project.translationKey))){const translated=projects.filter(project=>project.translationKey===group);if(translated.length!==3||new Set(translated.map(project=>project.lang)).size!==3)throw new Error('Incomplete translations: '+group);}
for(const lang of ['es','en','it']){
 const selected=projects.filter(project=>project.lang===lang&&project.showcaseRole!=='none');
 if(selected.length!==4||selected.filter(project=>project.showcaseRole==='primary').length!==1||selected.filter(project=>project.showcaseRole==='secondary').length!==3)throw new Error('Showcase must have one primary and three secondary cases: '+lang);
 if(new Set(selected.map(project=>project.showcaseOrder)).size!==4)throw new Error('Duplicate showcase order: '+lang);
}
writeFileSync('src/lib/portfolio-projects.json',JSON.stringify(projects,null,2)+'\n');
console.log('Synced '+projects.length+' project entries from local frontmatter.');
