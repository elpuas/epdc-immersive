import { locales, translator, services, type Locale } from './i18n';
const configuredSite = import.meta.env.SITE_URL;
export const siteURL = new URL(configuredSite || 'https://elpuasdigitalcrafts.com/');
if (siteURL.protocol !== 'https:' || siteURL.pathname !== '/' || siteURL.search || siteURL.hash) throw new Error('SITE_URL must be an HTTPS origin, without a path, query or fragment.');
export const indexable = import.meta.env.INDEXABLE === 'true';
if (indexable && !configuredSite) throw new Error('Set SITE_URL explicitly before enabling INDEXABLE.');
export function pageSEO(locale: Locale) {
 const t=translator(locale),url=new URL(`/${locale}/`,siteURL).href;
 const title=t('ElPuas Digital Crafts: desarrollo web y ecommerce');
 const description=t('Estudio familiar de Costa Rica. Desarrollo web, ecommerce, mantenimiento y colaboración white-label con criterio humano.');
 const organization=siteURL.href+'#organization';
 return {title,description,url,alternates:locales.map(lang=>({lang,url:new URL(`/${lang}/`,siteURL).href})),schema:{'@context':'https://schema.org','@graph':[
 {'@type':'Organization','@id':organization,name:'ElPuas Digital Crafts',url:siteURL.href,description:t('Somos ElPuas Digital Crafts, un estudio familiar de Costa Rica. Creamos sitios y experiencias digitales combinando desarrollo, automatización e inteligencia artificial aplicada, con personas al mando.'),address:{'@type':'PostalAddress',addressCountry:'CR'},knowsLanguage:['es','en','it']},
 {'@type':'WebSite','@id':siteURL.href+'#website',url:siteURL.href,name:'ElPuas Digital Crafts',publisher:{'@id':organization},inLanguage:['es','en','it']},
 {'@type':'WebPage','@id':url+'#webpage',url,name:title,description,inLanguage:locale,isPartOf:{'@id':siteURL.href+'#website'},about:{'@id':organization}},
 ...services.map(([id,name,description])=>({'@type':'Service','@id':url+'#service-'+id,name:t(name),description:t(description),provider:{'@id':organization},url:url+'#services'}))
 ]}};
}
export function jsonLD(value:unknown){return JSON.stringify(value).replace(/</g,'\u003c');}
