import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
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
assert.equal((sitemap.match(/<loc>/g)||[]).length,3);
assert.equal((sitemap.match(/hreflang=/g)||[]).length,12);
assert(existsSync('dist/robots.txt'));assert(existsSync('dist/llms.txt'));
console.log('Sitemap, robots and optional LLM link index OK');
