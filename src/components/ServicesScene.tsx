import {useRef, useState} from 'react';
import {services, translator, type Locale} from '../lib/i18n';
import type {ContentDestination} from './ContentScenes';

const details=[
 ['Un sitio que se sienta tuyo.','Diseñamos y desarrollamos sitios a medida de tu marca y de lo que necesitás comunicar. Unimos diseño, contenido y código para que cada página tenga un propósito claro.','Desde una nueva presencia digital hasta la evolución de tu sitio actual, trabajamos con vos para crear una experiencia clara, adaptable y preparada para crecer.'],
 ['Tu tienda, conectada a tu negocio.','Creamos tiendas que conectan tus productos con las personas que los buscan. Organizamos el catálogo, la experiencia de compra y las integraciones que necesita tu operación.','Trabajamos con WooCommerce y soluciones a medida para que vender, comprar y administrar la tienda sea más sencillo. Partimos de cómo funciona tu negocio.'],
 ['Tu sitio necesita cuidado continuo.','Te acompañamos después del lanzamiento con actualizaciones, respaldos, monitoreo y soporte. Cuidamos lo que ya construiste para que puedas concentrarte en tu negocio.','Ofrecemos tres planes con distintos alcances. Conocé qué incluye cada uno o conversemos para encontrar el acompañamiento que necesitás.'],
 ['Tu agencia al frente. Nosotros a tu lado.','Nos integramos al trabajo de tu agencia como un equipo de desarrollo de confianza. Transformamos los diseños y las necesidades de tus clientes en sitios y experiencias digitales, con tu marca al frente.','Podemos colaborar en un proyecto concreto o acompañarte de forma continua. Coordinamos el alcance y la comunicación con tu equipo desde el inicio.']
];
function ServiceIcon({index}:{index:number}){
 return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 {index===0?<><rect x="2" y="3" width="20" height="16" rx="2"/><path d="M2 8h20M9 12l-3 2 3 2m6-4 3 2-3 2"/></>:index===1?<><path d="M3 3h2l2 12h12l2-9H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>:index===2?<><path d="M12 2l8 3v6c0 5-8 10-8 10S4 16 4 11V5l8-3Z"/><path d="m8 11 3 3 5-6"/></>:<><rect x="3" y="4" width="13" height="13" rx="2"/><rect x="8" y="9" width="13" height="13" rx="2"/></>}
 </svg>;
}
export default function ServicesScene({locale,navigate,active=true}:{locale:Locale;navigate:(d:ContentDestination)=>void;active?:boolean}){
 const t=translator(locale),[selected,setSelected]=useState(0);
 const descriptionRef=useRef<HTMLDivElement>(null);
 return <section className={'services-explorer'+(active?' is-active':'')} aria-labelledby="services-title">
  <div className="services-heading"><p className="services-kicker">{t('Elegí cómo empezamos.')}</p><h1 id="services-title">{t('Démosle forma a lo que necesitás.')}</h1></div>
  <div className="services-layout">
   <div className="service-options" role="group" aria-label={t('Servicios')}>{services.map(([number,name],i)=><button key={number} type="button" aria-pressed={selected===i} aria-controls="service-description" onClick={()=>{setSelected(i);if(descriptionRef.current)descriptionRef.current.scrollTop=0;}} style={{'--service-order':i} as React.CSSProperties}><ServiceIcon index={i}/><span>{t(i===0?'Diseño y desarrollo web':name)}</span><span className="service-option-arrow" aria-hidden="true">↗</span></button>)}</div>
   <div ref={descriptionRef} id="service-description" tabIndex={active?0:-1} className="service-description" aria-live="polite" aria-atomic="true"><div key={selected} className="service-copy"><span className="service-detail-number" aria-hidden="true">{services[selected][0]} / 04</span><h2>{t(details[selected][0])}</h2><p>{t(details[selected][1])}</p><p>{t(details[selected][2])}</p>{selected===2&&<a className="maintenance-plans" href={`https://elpuasdigitalcrafts.com/${locale}/services/#pricing-title`}>{t('Ver los tres planes ↗')}</a>}</div></div>
  </div>
  <div className="service-actions"><button onClick={()=>navigate('trabajo')}>{t('Ver nuestro portafolio ↗')}</button><button onClick={()=>navigate('estudio')}>{t('Conocer al equipo ↗')}</button><button onClick={()=>navigate('contacto')}>{t('Contactanos →')}</button></div>
 </section>;
}
