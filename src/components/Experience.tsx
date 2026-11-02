import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Terrain from './Terrain';
import { Html } from '@react-three/drei';
import ContentScenes from './ContentScenes';
import { translator, services, type Locale } from '../lib/i18n';

type Destination = 'inicio' | 'servicios' | 'trabajo' | 'estudio' | 'contacto' | 'blog';
type Station = Exclude<Destination,'inicio'>;
// Entire sections stand along alternating sides of the central route.
const stations:Record<Station,{position:[number,number,number];angle:number;label:string}>={
 servicios:{position:[-12,3,-38],angle:Math.PI/5,label:'01 · Servicios'},
 trabajo:{position:[12,3,-58],angle:-Math.PI/3,label:'02 · Trabajo'},
 estudio:{position:[-12,3,-98],angle:Math.PI/3,label:'03 · Estudio'},
 contacto:{position:[12,3,-138],angle:-Math.PI/3,label:'04 · Contacto'},
 blog:{position:[-12,3,-178],angle:Math.PI/3,label:'05 · Blog'}
};
const stationIds=Object.keys(stations) as Station[];
function CameraRig({ destination, reduced }: { destination: Destination; reduced: boolean }) {
  const target = useMemo(() => new THREE.Vector3(), []);
  const trip=useRef<{id:Destination|null;elapsed:number;curve:THREE.CatmullRomCurve3|null;startLook:THREE.Vector3;endLook:THREE.Vector3;end:THREE.Vector3}>({id:null,elapsed:0,curve:null,startLook:new THREE.Vector3(0,3,-15),endLook:new THREE.Vector3(0,3,-15),end:new THREE.Vector3(0,4,28)});
  const look = useRef(new THREE.Vector3(0, 3, -15));
  const lookTarget = useMemo(()=>new THREE.Vector3(),[]);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerSmooth = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    const reset = () => { pointerTarget.current.x = 0; pointerTarget.current.y = 0; };
    const move = (event: PointerEvent) => {
      if (reduced || !finePointer.matches || event.pointerType !== 'mouse') return;
      pointerTarget.current.x = THREE.MathUtils.clamp(event.clientX / innerWidth * 2 - 1, -1, 1);
      pointerTarget.current.y = THREE.MathUtils.clamp(event.clientY / innerHeight * 2 - 1, -1, 1);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
    finePointer.addEventListener('change', reset);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
      finePointer.removeEventListener('change', reset);
    };
  }, [reduced]);
  useFrame(({ camera, size }, delta) => {
    const aspect=camera instanceof THREE.PerspectiveCamera?camera.aspect:1.5;
    // Fit the whole 10 × 6.5 world-unit surface into the usable reading area.
    // Only arrival distance changes; station positions and intro scale stay intact.
    const verticalFov=camera instanceof THREE.PerspectiveCamera?THREE.MathUtils.degToRad(camera.fov):THREE.MathUtils.degToRad(48);
    const frustum=2*Math.tan(verticalFov/2);
    const usableHeight=THREE.MathUtils.clamp((size.height-230)/size.height,.42,.78);
    const distance=Math.max(6.5/(frustum*usableHeight),10/(frustum*aspect*.9));
    if(destination==='inicio'){target.set(0,4,28);lookTarget.set(0,3,-15);}
    else{const station=stations[destination];lookTarget.set(...station.position);target.copy(lookTarget);target.x+=Math.sin(station.angle)*distance;target.z+=Math.cos(station.angle)*distance;}
    const flight=trip.current;
    if(flight.id!==destination || flight.end.distanceToSquared(target)>.1){
      flight.id=destination;flight.elapsed=0;flight.startLook.copy(look.current);flight.endLook.copy(lookTarget);flight.end.copy(target);
      const start=camera.position.clone();
      // Rejoin the aisle, travel along it, then turn toward the entire station.
      const rejoin=new THREE.Vector3(0,3.5,start.z);
      const aisle=new THREE.Vector3(0,3.5,destination==='inicio'?18:stations[destination].position[2]+13);
      flight.curve=new THREE.CatmullRomCurve3([start,rejoin,aisle,target.clone()],false,'centripetal');
    }
    flight.elapsed+=Math.min(delta,.1);
    const progress=reduced?1:Math.min(1,flight.elapsed/3.8);
    const ease=progress*progress*(3-2*progress);
    flight.curve?.getPoint(ease,camera.position);
    const turn=THREE.MathUtils.smoothstep(progress,.2,1);
    look.current.lerpVectors(flight.startLook,flight.endLook,turn);
    const smooth=pointerSmooth.current;
    const damping=1-Math.exp(-Math.min(delta,.1)*2.2);
    smooth.x=reduced?0:THREE.MathUtils.lerp(smooth.x,pointerTarget.current.x,damping);
    smooth.y=reduced?0:THREE.MathUtils.lerp(smooth.y,pointerTarget.current.y,damping);
    const settled=THREE.MathUtils.smoothstep(progress,.8,1);
    camera.position.x+=smooth.x*.25*settled;camera.position.y-=smooth.y*.12*settled;
    camera.lookAt(look.current);
  });
  return null;
}
function World({ destination, reduced, navigate, locale }: { destination: Destination; reduced: boolean; navigate:(d:Destination)=>void;locale:Locale }) {
  const t=translator(locale);
  return <><color attach="background" args={['#000000']} /><fog attach="fog" args={['#000000', 35, 150]} /><Terrain reduced={reduced} />
    {stationIds.map(id=><group key={id} position={stations[id].position} rotation={[0,stations[id].angle,0]}>
      <Html transform position={[0,4,0]} distanceFactor={4} zIndexRange={[50,0]}><div className="station-sign" aria-hidden="true" style={{opacity:destination===id?.8:destination==='inicio'?(id==='servicios'?.45:.13):.16,filter:destination===id?'none':destination==='inicio'&&id==='servicios'?'blur(2px)':'blur(3px)'}}>{stations[id].label.slice(0,5)+t(stations[id].label.slice(5))}</div></Html>
      <Html transform distanceFactor={4} zIndexRange={[50,0]}>
        <div className="spatial-section station-section" style={{opacity:destination===id?1:destination==='inicio'?(id==='servicios'?.42:.1):.17,filter:destination===id?'blur(0px)':destination==='inicio'?(id==='servicios'?'blur(2.5px)':'blur(4px)'):'blur(3px)'}} inert={destination!==id} aria-hidden={destination!==id}>
          {id==='servicios'?<section className="station-services"><p className="eyebrow">{t("NUESTRAS CAPACIDADES")}</p><h1>{t("Démosle forma a lo que necesitás.")}</h1><p className="intro">{t("Desarrollo, comercio electrónico y acompañamiento para tu negocio.")}</p><div className="service-panels">{services.map(([number,title,description,icon])=><article className="service-panel" key={number}><div className="panel-top"><span>{number}</span><span className="service-icon">{icon}</span></div><h2>{t(title)}</h2><p>{t(description)}</p><button onClick={()=>navigate('trabajo')}>{t("Explorar el trabajo ↗")}</button></article>)}</div><div className="scene-next"><button onClick={()=>navigate('trabajo')}>{t("Sigamos hacia los proyectos →")}</button></div></section>:<ContentScenes destination={id} navigate={navigate} locale={locale}/>}
        </div>
      </Html>
    </group>)}
    <CameraRig destination={destination} reduced={reduced}/></>;
}
export default function Experience({locale="es"}:{locale?:Locale}) {
 const t=translator(locale);
 const [destination,setDestination]=useState<Destination>('inicio');
 const [reduced,setReduced]=useState(true);
 const [webgl,setWebgl]=useState(false);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(media.matches);sync();media.addEventListener('change',sync);
  try{setWebgl(Boolean(document.createElement('canvas').getContext('webgl2')))}catch{setWebgl(false)}
  return()=>media.removeEventListener('change',sync);
 },[]);
 return <div className="experience">
 {webgl&&<div className="world"><Canvas dpr={[1,1.5]} camera={{position:[0,4,28],fov:48}}><Suspense fallback={null}><World destination={destination} reduced={reduced} navigate={setDestination} locale={locale}/></Suspense></Canvas></div>}
 <header><a className="brand" href={`/${locale}/`}>{t("ElPuas")}<span>{t("Digital Crafts")}</span></a><nav aria-label={t('Explorar el estudio')}>{(['inicio','servicios','trabajo','estudio','contacto','blog'] as Destination[]).map(item=><button key={item} aria-pressed={destination===item} onClick={()=>setDestination(item)}>{t(({inicio:'Inicio',servicios:'Servicios',trabajo:'Trabajo',estudio:'Estudio',contacto:'Contacto',blog:'Blog'})[item])}</button>)}</nav><div className="language-links" aria-label={t('Idioma')}>{(['es','en','it'] as const).map(lang=><a key={lang} href={`/${lang}/`} hrefLang={lang} aria-current={locale===lang?'page':undefined}>{lang.toUpperCase()}</a>)}</div></header>
 {destination==='inicio'&&<main className="arrival-overlay"><p className="eyebrow">{t("ARTESANOS DIGITALES")}</p><h1>{t("¿Qué querés hacer posible?")}</h1><p className="intro">{t("Desarrollo, tecnología y criterio humano. Elegí por dónde empezar.")}</p><div className="choices"><button onClick={()=>setDestination('servicios')}>{t("Explorar servicios ↗")}</button><button onClick={()=>setDestination('estudio')}>{t("Conocer el estudio ↗")}</button></div></main>}
 {!webgl&&destination!=='inicio'&&<div className="static-scenes">{destination==='servicios'?<div className="service-panels">{services.map(([n,title,description])=><article key={n} className="service-panel"><h2>{t(title)}</h2><p>{t(description)}</p><button onClick={()=>setDestination('trabajo')}>{t("Explorar proyectos")}</button></article>)}</div>:<ContentScenes destination={destination} navigate={setDestination} locale={locale}/>}</div>}
 {webgl&&destination!=='inicio'&&<div className="spatial-prompt"><span>{t(({servicios:'Descubramos lo que podemos construir.',trabajo:'El trabajo demuestra.',estudio:'Las personas detrás de la experiencia.',contacto:'Conversemos sobre tu idea.',blog:'La historia continúa.'})[destination])}</span><button onClick={()=>setDestination('inicio')}>{t("Volver al inicio ↩")}</button></div>}
 <footer><span>{t("Un mismo espacio. Distintos puntos de vista.")}</span><a href={`https://elpuasdigitalcrafts.com/${locale}/`}>{t("Sitio actual ↗")}</a></footer>
 </div>;
}
