import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const posts=JSON.parse(readFileSync('src/lib/blog-posts.json','utf8'));
const groups=JSON.parse(readFileSync('src/lib/blog-translations.json','utf8'));
for(const group of groups){assert.equal(new Set(group.map(href=>posts.find(post=>post.href===href)?.lang)).size,group.length,'One article per language in a translation group');}
const inventory=JSON.parse(readFileSync('docs/blog-migration-inventory.json','utf8'));
const hash=file=>createHash('sha256').update(readFileSync(file)).digest('hex');
assert.equal(posts.length,inventory.length);
for(const item of inventory){
 assert.equal(hash(item.source),item.sha256,'Migrated MDX content changed: '+item.source);
 assert.equal(hash('/Users/alfredonavas/REACT/epdc/'+item.source),item.sha256,'Original source changed: '+item.source);
 for(const asset of item.assets)assert(existsSync(asset),'Missing asset '+asset);
}
for(const post of posts){
 const html=readFileSync('dist'+post.href+'index.html','utf8');
 assert(html.includes(`<html lang="${post.lang}"`));
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]??'null');
 const article=schema['@graph'].find(node=>node['@type']==='BlogPosting');
 assert.equal(article.headline,post.title);assert.equal(article.inLanguage,post.lang);
 assert(html.includes('class="post-body"'));assert(html.includes('og:type" content="article"'));
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,'Single article H1');
 for(const m of html.matchAll(/href="(\/(?:es|en|it)\/[^"#?]*)/g))assert(existsSync('dist'+m[1].replace(/\/$/,'')+'/index.html'),'Missing internal route '+m[1]);
 for(const m of html.matchAll(/<img[^>]+src="(\/[^"?]+)[^"]*"/g))assert(existsSync('dist'+m[1]),'Missing rendered image '+m[1]);
 const group=groups.find(group=>group.includes(post.href));
 const expected=group?posts.filter(other=>group.includes(other.href)):[post];
 for(const other of expected)assert(html.includes(`hreflang="${other.lang}" href="https://elpuasdigitalcrafts.com${other.href}"`),'Translated route');
}
console.log(`${posts.length} complete articles: source hashes, routes, images, schema and translation links OK`);
