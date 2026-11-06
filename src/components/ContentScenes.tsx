import { useState } from 'react';
import { translator, studioStory, type Locale } from '../lib/i18n';
import { editorial } from '../lib/editorial';
import {showcaseProjects,projectDisplayName} from '../lib/portfolio';
import StudioScene from './StudioScene';
export type ContentDestination = 'trabajo' | 'estudio' | 'contacto' | 'blog';
const team=[{name:'Catalina Valverde',role:'CEO y Directora de Contenido',bio:'Define la voz y la dirección editorial de los proyectos.',image:'/team/catalina-valverde-dos.webp'}, {name:'Alfredo Navas Fernandini',role:'CTO',bio:'Lidera la estrategia técnica y el desarrollo.',image:'/team/foto-uno.webp'}, {name:'Gianfranco Navas',role:'Lead Frontend Developer',bio:'Convierte las decisiones de diseño en interfaces responsivas y accesibles.',image:'/team/gianfranco.webp'}];
export default function ContentScenes({destination,navigate,locale="es",active=true}:{destination:ContentDestination;navigate:(value:ContentDestination)=>void;locale?:Locale;active?:boolean}){
 const t=translator(locale);
 const projects=showcaseProjects(locale);
 const articles=editorial[locale].articles;

 const [notice,setNotice]=useState('');
 return <main className={'content-scene '+destination+'-scene'+(destination==='trabajo'?' portfolio-scene':'')+(active?' is-active':'')} key={destination}>
 {destination==='trabajo'&&<>
  <div className="services-heading"><p className="services-kicker">{t('LA EVIDENCIA ACOMPAÑA LA RESPUESTA')}</p><h1>{t('Hecho con Amor.')}</h1></div>
  <div className="portfolio-scroll">
   <div className="portfolio-grid">{projects.map((project,index)=><a className={'portfolio-work'+(project.showcaseRole==='primary'?' portfolio-featured':'')} href={project.href} key={project.slug} style={{'--work-order':index} as React.CSSProperties}>
    <div className="portfolio-image"><img src={project.image} alt="" width="900" height="600" loading={index===0?'eager':'lazy'}/></div>
    <div className="portfolio-work-copy"><span className="portfolio-work-kicker">{project.showcaseRole==='primary'?t('PROYECTO DESTACADO'):String(index).padStart(2,'0')}</span><h2>{projectDisplayName(project)}</h2><p>{project.description}</p><span className="portfolio-work-link">{t('Leer el caso completo ↗')}</span></div>
   </a>)}</div>
   <div className="portfolio-clients"><h2>{t('Marcas con las que hemos trabajado.')}</h2><div className="portfolio-ticker" tabIndex={0} role="group" aria-label={t('Marcas con las que hemos trabajado.')}><div className="portfolio-track">{[0,1].map(copy=><ul className="portfolio-logo-group" aria-hidden={copy===1} key={copy}>{[
    ['avalanche.png','Avalanche Advertising','avalanche'],['pb.png','Premium Brokers','premium'],['monkey.png','Monkey Scrubs','monkey'],['fishcostarica.png','Costa Rica Fishing','fishing'],['Logo-rojo-voyager.png','Voyager Comunicación','voyager']
   ].map(([file,name,kind])=><li className={'portfolio-logo portfolio-logo-'+kind} key={file}><img src={'/brands/'+file} alt={copy===1?'':name} loading="lazy" width="220" height="100"/></li>)}</ul>)}</div></div></div>
  </div>
  <div className="service-actions"><button onClick={()=>navigate('estudio')}>{t('Conocer al equipo ↗')}</button><button onClick={()=>navigate('contacto')}>{t('Contactanos →')}</button></div>
 </>}
 {destination==='estudio'&&<StudioScene locale={locale} navigate={navigate} active={active}/>}
 {destination==='contacto'&&<>
 <div className="services-heading"><p className="services-kicker">{t('EL SIGUIENTE PASO')}</p><h1>{t('Conversemos sobre tu idea.')}</h1></div>
 <div className="contact-composition">
  <div className="contact-introduction"><h2>{t('Ya tenemos un punto de partida.')}</h2><p>{t('Contanos qué querés crear o mejorar. La próxima conversación es con nosotros.')}</p><p className="contact-note">{t('Prototipo: este formulario todavía no envía información.')}</p></div>
  <form className="contact-form" onSubmit={e=>{e.preventDefault();setNotice(t('Esta es una prueba. No se envió ni guardó tu información.'))}}>
   <div className="contact-fields"><div className="contact-identity"><label>{t('Tu nombre')}<input name="name" autoComplete="name" required/></label><label>{t('Tu correo')}<input name="email" type="email" autoComplete="email" required/></label></div>
   <label>{t('¿Qué necesitás?')}<select name="service"><option>{t('Desarrollo web')}</option><option>{t('Comercio electrónico')}</option><option>{t('Mantenimiento y soporte')}</option><option>{t('White-label')}</option><option>{t('Todavía lo estoy explorando')}</option></select></label>
   <label>{t('Contanos tu idea')}<textarea name="message" rows={4} required/></label></div>
   <div className="service-actions contact-submit"><button type="submit">{t('Probar formulario ↗')}</button></div><p className="form-status" role="status">{notice}</p>
  </form>
 </div>
 </>}
 {destination==='blog'&&<><p className="eyebrow">{t("LA HISTORIA CONTINÚA")}</p><h1>{t("En el Bucle.")}</h1><p className="intro">{t("Procesos, experimentos y aprendizajes de nuestro taller digital.")}</p><div className="article-panels">{articles.map(p=><a className="article-panel" href={p.href} target="_blank" rel="noopener" key={p.title}><img src={p.image} alt=""/><div><span className="eyebrow">{t("ELPUAS DIGITAL CRAFTS")}</span><h2>{p.title}</h2><span>{t("Leer en el sitio actual ↗")}</span></div></a>)}</div><div className="scene-next"><button onClick={()=>navigate('trabajo')}>{t("Volver al trabajo →")}</button><button onClick={()=>navigate('contacto')}>{t("Contanos tu idea →")}</button></div></>}
 </main>
}
