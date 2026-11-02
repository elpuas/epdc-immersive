import {indexable,siteURL} from '../lib/seo';
export function GET(){return new Response(`User-agent: *\n${indexable?'Allow: /':'Disallow: /'}\nSitemap: ${new URL('/sitemap.xml',siteURL).href}\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});}
