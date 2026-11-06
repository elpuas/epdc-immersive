import {readFileSync,writeFileSync,readdirSync,mkdirSync,copyFileSync,existsSync} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {parse} from 'yaml';

const source='/Users/alfredonavas/REACT/epdc';
const sourceDir=join(source,'src/content/portfolio');
const roleByGroup={
 'nuara-pelletterie-ecommerce':['primary',1],
 'gbox-supplies':['secondary',2],
 'premium-brokers':['secondary',3],
 'second-project':['secondary',4],
};
const groupFor=name=>name.startsWith('phonogram-single-management-system.')||name.startsWith('sistema-gestion-fonogramas-sencillos.')||name.startsWith('sistema-gestione-fonogrammi-singoli.')?'phonogram-management':name.replace(/\.(es|en|it)\.mdx$/,'');
const projects=[],inventory=[];
mkdirSync('src/content/portfolio',{recursive:true});
for(const name of readdirSync(sourceDir).filter(name=>name.endsWith('.mdx')).sort()){
 const sourcePath=join(sourceDir,name),raw=readFileSync(sourcePath,'utf8');
 const match=raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
 if(!match)throw new Error('Missing frontmatter: '+name);
 const normalizedFrontmatter=match[1].replace(/\t/g,'  ');
 const original=parse(normalizedFrontmatter),group=groupFor(name);
 const target=join('src/content/portfolio',name);
 const current=existsSync(target)?parse(readFileSync(target,'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]):null;
 const [defaultRole,defaultOrder]=roleByGroup[group]??['none',0];
 const showcaseRole=current?.showcaseRole??defaultRole,showcaseOrder=current?.showcaseOrder??defaultOrder;
 const frontmatter=normalizedFrontmatter.replace(/\s*$/,'')+`\ntranslationKey: "${group}"\nshowcaseRole: "${showcaseRole}"\nshowcaseOrder: ${showcaseOrder}\n`;
 const output=raw.replace(match[0],`---\n${frontmatter}---`);
 const assets=new Set([original.image,...[...raw.matchAll(/from\s*["']([^"']+)["']/g)].map(m=>m[1])].filter(Boolean));
 const copied=[];
 for(const asset of assets){
  let origin,relative;
  if(asset.startsWith('../../../public/')){origin=resolve(sourceDir,asset);relative=asset.slice('../../../public/'.length);}
  else if(asset.startsWith('/portfolio/')){relative=asset.slice(1);origin=join(source,'public',relative);}else continue;
  if(!existsSync(origin))throw new Error('Missing portfolio asset: '+asset+' in '+name);
  const target=join('public',relative);mkdirSync(dirname(target),{recursive:true});copyFileSync(origin,target);copied.push(target);
 }
 writeFileSync(target,output);
 projects.push({title:original.title,description:original.description,image:original.image,date:String(original.date??''),tags:original.tags??[],lang:original.lang,slug:original.slug,translationKey:group,showcaseRole,showcaseOrder,sourceFile:name,href:`/${original.lang}/crafted-with-love/${original.slug}/`});
 inventory.push({source:`src/content/portfolio/${name}`,sourceSHA256:createHash('sha256').update(raw).digest('hex'),migratedSHA256:createHash('sha256').update(output).digest('hex'),bodyPreserved:output.slice(output.indexOf('---',4)+3)===raw.slice(raw.indexOf('---',4)+3),assets:[...new Set(copied)]});
}
if(projects.length!==30)throw new Error('Expected 30 localized cases, got '+projects.length);
for(const group of new Set(projects.map(p=>p.translationKey))){if(projects.filter(p=>p.translationKey===group).length!==3)throw new Error('Incomplete localization: '+group);}
for(const lang of ['es','en','it']){const chosen=projects.filter(p=>p.lang===lang&&p.showcaseRole!=='none');if(chosen.length!==4||chosen.filter(p=>p.showcaseRole==='primary').length!==1)throw new Error('Invalid showcase: '+lang);}
writeFileSync('src/lib/portfolio-projects.json',JSON.stringify(projects,null,2)+'\n');
writeFileSync('docs/portfolio-migration-inventory.json',JSON.stringify(inventory,null,2)+'\n');
for(const name of ['avalanche.png','pb.png','monkey.png','fishcostarica.png','Logo-rojo-voyager.png']){mkdirSync('public/brands',{recursive:true});copyFileSync(join(source,'public/brands',name),join('public/brands',name));}
console.log(`Migrated ${projects.length} localized cases, preserving every MDX body.`);
