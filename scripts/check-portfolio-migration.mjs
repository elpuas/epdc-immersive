import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const projects=JSON.parse(readFileSync('src/lib/portfolio-projects.json','utf8'));
const inventory=JSON.parse(readFileSync('docs/portfolio-migration-inventory.json','utf8'));
assert.equal(projects.length,30);assert.equal(inventory.length,30);
for(const item of inventory){
 const local=readFileSync(item.source,'utf8');
 assert.equal(createHash('sha256').update(local).digest('hex'),item.migratedSHA256,item.source);
 assert(item.bodyPreserved,item.source+' body was modified');
 for(const asset of item.assets)assert(existsSync(asset),asset);
}
for(const lang of ['es','en','it']){
 const localized=projects.filter(p=>p.lang===lang);
 assert.equal(localized.length,10);
 const showcase=localized.filter(p=>p.showcaseRole!=='none');
 assert.equal(showcase.length,4);assert.equal(showcase.filter(p=>p.showcaseRole==='primary').length,1);
 for(const project of localized){
  assert(existsSync('dist'+project.href+'index.html'),project.href);
  const html=readFileSync('dist'+project.href+'index.html','utf8');
  assert(html.includes('class="blog-return case-return"'),project.href+' terrain wrapper');
  assert(html.includes('editorial-terrain'),project.href+' footer texture');
  assert(html.includes('class="site-footer"'),project.href+' footer');
  assert(html.includes(project.title.replaceAll('&','&amp;'))||html.includes(project.title),project.href+' title');
  assert(html.includes('hreflang="es"')&&html.includes('hreflang="en"')&&html.includes('hreflang="it"'),project.href+' translations');
 }
}
console.log('Portfolio migration: 30 localized cases, assets, routes, alternates, and shared footer OK');
