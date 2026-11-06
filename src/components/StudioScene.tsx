import {useRef,useState} from 'react';
import {translator,type Locale} from '../lib/i18n';
import {studioContent} from '../lib/studio';
import type {ContentDestination} from './ContentScenes';
const people=[
 {name:'Catalina Valverde',role:'CEO y Directora de Contenido',bio:'Define la voz y la dirección editorial de los proyectos.',image:'/team/catalina-valverde-dos.webp',links:[]},
 {name:'Alfredo Navas Fernandini',role:'CTO',bio:"Alfredo es full-stack developer y está al frente de la estrategia técnica de ElPuas Digital Crafts. Ha participado en proyectos para pequeñas empresas, agencias y compañías Fortune 500, trabajando tanto en lo que las personas ven como en los sistemas que lo hacen funcionar.\n\nSu trabajo abarca desarrollo a medida con WordPress, Gutenberg y WooCommerce, además de interfaces con React y Astro. Le interesa que un sitio no solo se vea bien al lanzarlo: que sea accesible, rápido, fácil de mantener y útil para el negocio con el paso del tiempo.\n\nHoy también explora cómo integrar IA y automatización al proceso de desarrollo, con criterio humano y atención a los detalles. Esa mezcla de oficio, curiosidad y acompañamiento es lo que aporta a cada proyecto del estudio.",image:'/team/foto-uno.webp',links:[['LinkedIn','https://www.linkedin.com/in/elpuasdev/'],['GitHub','https://github.com/elpuasdev'],['Web','https://www.elpuas.com']]},
 {name:'Gianfranco Navas',role:'Lead Frontend Developer',bio:'Convierte las decisiones de diseño en interfaces responsivas y accesibles.',image:'/team/gianfranco.webp',links:[['LinkedIn','https://www.linkedin.com/in/gianfranconavasfernandiniwebdeveloper/'],['GitHub','https://github.com/gianfranco2605'],['X','https://x.com/gianfranco2605']]}
];
function SocialIcon({name}:{name:string}){
 return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 {name==='LinkedIn'?<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10v.01M11 17v-7m0 3a3 3 0 0 1 6 0v4"/></>:name==='GitHub'?<><path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3a5.7 5.7 0 0 0-1.5-4A5.3 5.3 0 0 0 19.2 0S18 0 15 1.5a14 14 0 0 0-6 0C6 0 4.8 0 4.8 0a5.3 5.3 0 0 0-.1 4A5.7 5.7 0 0 0 3.2 8c0 5.7 3.5 6.9 6.8 7.3A3.5 3.5 0 0 0 9 18v4" transform="translate(1 1) scale(.9)"/></>:name==='X'?<><path d="m4 4 16 16M20 4 4 20"/><path d="M4 4h5l11 16h-5L4 4Z"/></>:<><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></>}
 </svg>;
}
export default function StudioScene({locale,navigate,active}:{locale:Locale;navigate:(d:ContentDestination)=>void;active:boolean}){
 const t=translator(locale),copy=studioContent[locale];
 const [selected,setSelected]=useState<number|null>(null);
 const scrollRef=useRef<HTMLDivElement>(null);
 const select=(index:number|null)=>{setSelected(index);if(scrollRef.current)scrollRef.current.scrollTop=0;};
 const person=selected===null?null:people[selected];
 return <section className={'studio-explorer'+(active?' is-active':'')} aria-labelledby="studio-title">
  <div className="services-heading"><p className="services-kicker">{t('QUIÉNES SOMOS')}</p><h1 id="studio-title">{copy.title}</h1></div>
  <div className="studio-layout">
   <div className="studio-people"><button className="studio-story-choice" aria-pressed={selected===null} aria-controls="studio-detail" onClick={()=>select(null)}>{t('Nuestra historia')}</button><div className="studio-portraits">{people.map((p,index)=><button key={p.name} className="studio-person" aria-label={p.name} aria-pressed={selected===index} aria-controls="studio-detail" onClick={()=>select(index)} style={{'--person-order':index} as React.CSSProperties}><span className="studio-photo"><img src={p.image} alt="" width="200" height="300"/><span className="studio-profile-hint" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={selected===index?'m6 12 4 4 8-8':'M12 5v14M5 12h14'}/></svg></span></span></button>)}</div></div>
   <div ref={scrollRef} id="studio-detail" className="studio-detail" tabIndex={active?0:-1} aria-live="polite"><div key={selected??'story'} className="studio-copy">{person?<><figure className="studio-profile-visual"><img className="studio-profile-photo" src={person.image} alt={person.name} width="280" height="360"/><figcaption className="studio-profile-caption"><p className="studio-role">{t(person.role)}</p><h2>{person.name}</h2></figcaption></figure>{person.bio.split('\n\n').map(paragraph=><p key={paragraph}>{t(paragraph)}</p>)}{person.links.length>0&&<ul className="studio-socials">{person.links.map(([label,href])=><li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} — ${person.name}`} title={label}><SocialIcon name={label}/></a></li>)}</ul>}</>:<><h2>{copy.storyTitle}</h2>{copy.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</>}</div></div>
  </div>
  <div className="service-actions"><button onClick={()=>navigate('trabajo')}>{t('Ver nuestro portafolio ↗')}</button><button onClick={()=>navigate('contacto')}>{t('Contactanos →')}</button></div>
 </section>;
}
