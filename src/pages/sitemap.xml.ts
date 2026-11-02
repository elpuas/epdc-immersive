import {locales} from '../lib/i18n';
import {siteURL} from '../lib/seo';
export function GET(){const url=(lang:string)=>new URL(`/${lang}/`,siteURL).href;
return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${locales.map(lang=>`<url><loc>${url(lang)}</loc>${locales.map(other=>`<xhtml:link rel="alternate" hreflang="${other}" href="${url(other)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${url('es')}"/></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});}
