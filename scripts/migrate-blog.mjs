import {readFileSync,writeFileSync,readdirSync,mkdirSync,copyFileSync,existsSync} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {parse} from 'yaml';
const source='/Users/alfredonavas/REACT/epdc',posts=[],inventory=[];
mkdirSync('src/content/blog',{recursive:true});
for(const name of readdirSync(join(source,'src/content/blog')).filter(n=>/\.mdx$/.test(n))){
 const raw=readFileSync(join(source,'src/content/blog',name),'utf8');
 const data=parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);if(data.draft)continue;
 const lang=data.lang||'en',id=name.replace(/\.mdx$/,''),slug=id.endsWith('.'+lang)?id.slice(0,-lang.length-1):id.replace(/\./g,'-');
 const assets=new Set([data.image,...[...raw.matchAll(/(?:from\s*|src=)["']([^"']+)["']/g)].map(m=>m[1])].filter(Boolean));
 const copied=[];
 for(const asset of assets){
  let origin,relative;
  if(asset.startsWith('../../../public/')){origin=resolve(source,'src/content/blog',asset);relative=asset.slice('../../../public/'.length);}
  else if(asset.startsWith('/posts/')){relative=asset.slice(1);origin=join(source,'public',relative);}else continue;
  if(!existsSync(origin))throw new Error('Missing asset '+asset);
  const target=join('public',relative);mkdirSync(dirname(target),{recursive:true});copyFileSync(origin,target);copied.push(target);
 }
 copyFileSync(join(source,'src/content/blog',name),join('src/content/blog',name));
 posts.push({title:data.title,description:data.description||'',image:data.image||null,date:data.date?String(data.date):null,author:data.author||null,translationKey:data.translationKey||null,sourceFile:name,lang,slug,href:`/${lang}/blog/${slug}/`});
 inventory.push({source:'src/content/blog/'+name,sha256:createHash('sha256').update(raw).digest('hex'),lang,slug,assets:copied});
}
posts.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.slug.localeCompare(b.slug));
writeFileSync('src/lib/blog-posts.json',JSON.stringify(posts,null,2)+'\n');
writeFileSync('docs/blog-migration-inventory.json',JSON.stringify(inventory,null,2)+'\n');
console.log('Copied '+posts.length+' MDX files without changing their bytes.');
