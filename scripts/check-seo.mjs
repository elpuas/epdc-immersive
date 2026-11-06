import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const posts=JSON.parse(readFileSync('src/lib/blog-posts.json','utf8'));
const projects=JSON.parse(readFileSync('src/lib/portfolio-projects.json','utf8'));
const pageCount=lang=>Math.ceil(posts.filter(p=>p.lang===lang).length/6);
const langs=['es','en','it'];
const names={es:'Servicios',en:'Services',it:'Servizi'};
for(const lang of langs){
 const html=readFileSync(`dist/${lang}/index.html`,'utf8');
 assert.match(html,new RegExp(`<html lang="${lang}"`));
 assert.match(html,/<title>[^<]+<\/title>/);
 assert.match(html,/<meta name="description" content="[^"]+"/);
 const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
 assert(canonical?.endsWith(`/${lang}/`),'locale-specific canonical');
 for(const other of [...langs,'x-default'])assert(html.includes(`hreflang="${other}"`),'reciprocal language alternate');
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]??'null');
 assert(schema?.['@graph']);
 assert.equal(schema['@graph'].find(n=>n['@type']==='WebPage').inLanguage,lang);
 assert.equal(schema['@graph'].filter(n=>n['@type']==='Service').length,4);
 const readable=html.slice(html.indexOf('<details'));
 assert(readable.includes(names[lang]),'localized HTML services without JavaScript');
 assert(readable.includes('Catalina Valverde'));
 assert(readable.includes('Nuara Pelletterie'));
 assert(readable.includes(`https://elpuasdigitalcrafts.com/${lang}/blog/`));
 assert(html.includes('noindex,follow')||html.includes('index,follow,max-image-preview:large'));
 console.log(`${lang}: metadata, hreflang, JSON-LD and HTML content OK`);
}
const sitemap=readFileSync('dist/sitemap.xml','utf8');
const routeCount=3+langs.reduce((sum,lang)=>sum+pageCount(lang),0);
assert.equal((sitemap.match(/<loc>/g)||[]).length,routeCount+posts.length+projects.length);
const groups=JSON.parse(readFileSync('src/lib/blog-translations.json','utf8'));
const alternateCount=posts.reduce((sum,post)=>sum+1+(groups.find(group=>group.includes(post.href))?.length??1),0);
assert.equal((sitemap.match(/hreflang=/g)||[]).length,routeCount*4+alternateCount+projects.length*4);
for(const lang of langs){for(let page=1;page<=pageCount(lang);page++){
 const path=`dist/${lang}/blog/${page===1?'':page+'/'}index.html`;
 const html=readFileSync(path,'utf8');
 assert.equal((html.match(/class="blog-entry"/g)||[]).length,Math.min(6,posts.filter(p=>p.lang===lang).length-(page-1)*6));
 assert(html.includes('CollectionPage'));assert(html.includes('aria-current="page"'));
 assert(html.includes(`/${lang}/blog/${page===1?'':page+'/'}`));
 }}
assert(existsSync('dist/robots.txt'));assert(existsSync('dist/llms.txt'));
console.log('Sitemap, robots and optional LLM link index OK');

await import('./check-blog-migration.mjs');
await import('./check-portfolio-migration.mjs');
