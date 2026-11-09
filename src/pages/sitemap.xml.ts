import {locales} from '../lib/i18n';
import {siteURL} from '../lib/seo';
import {blogRoutes,blogPageCount,blogPath,postTranslations} from '../lib/blog';
import posts from '../lib/blog-posts.json';
import projects from '../lib/portfolio-projects.json';
import {projectTranslations} from '../lib/portfolio';
export function GET(){
const absolute=(path:string)=>new URL(path,siteURL).href;
const entries=[...locales.map(locale=>({path:`/${locale}/`,alternates:locales.map(lang=>({lang,path:`/${lang}/`}))})),...['services','terms-and-conditions'].flatMap(section=>locales.map(locale=>({path:`/${locale}/${section}/`,alternates:locales.map(lang=>({lang,path:`/${lang}/${section}/`}))}))),...blogRoutes.map(route=>({path:route.path,alternates:locales.filter(lang=>blogPageCount(lang)>=route.page).map(lang=>({lang,path:blogPath(lang,route.page)}))})),...posts.map(post=>({path:post.href,alternates:postTranslations(post).map(other=>({lang:other.lang,path:other.href}))})),...projects.map(project=>({path:project.href,alternates:projectTranslations(project).map(other=>({lang:other.lang,path:other.href}))}))];
return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.map(entry=>`<url><loc>${absolute(entry.path)}</loc>${entry.alternates.map(item=>`<xhtml:link rel="alternate" hreflang="${item.lang}" href="${absolute(item.path)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${absolute(entry.alternates[0].path)}"/></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});}
