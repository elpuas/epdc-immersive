import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Terrain from './Terrain';
import { Html } from '@react-three/drei';
import ContentScenes from './ContentScenes';
import ServicesScene from './ServicesScene';
import { translator, type Locale } from '../lib/i18n';
import { contactLocations } from '../lib/contact';

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
function CameraRig({ destination, reduced, onArrive }: { destination: Destination; reduced: boolean; onArrive:(destination:Destination)=>void }) {
  const arrivalReported=useRef(false);
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
    const shellSpace=size.width<=600?220:220;
    const usableHeight=THREE.MathUtils.clamp((size.height-shellSpace)/size.height,.36,.78);
    const distance=Math.max(6.5/(frustum*usableHeight),10/(frustum*aspect*.9));
    if(destination==='inicio'){target.set(0,4,28);lookTarget.set(0,3,-15);}
    else{const station=stations[destination];lookTarget.set(...station.position);target.copy(lookTarget);target.x+=Math.sin(station.angle)*distance;target.z+=Math.cos(station.angle)*distance;}
    const flight=trip.current;
    if(flight.id!==destination || flight.end.distanceToSquared(target)>.1){
      arrivalReported.current=false;
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
    if(progress===1&&!arrivalReported.current){arrivalReported.current=true;onArrive(destination);}
  });
  return null;
}
function World({ destination, reduced, navigate, locale, shellOnly, onReady, onArrive, portal, settledDestination, compactPortfolio }: { destination: Destination; reduced: boolean; navigate:(d:Destination)=>void;locale:Locale;shellOnly:boolean;onReady:()=>void;onArrive:(destination:Destination)=>void;portal:{current:HTMLElement};settledDestination:Destination|null;compactPortfolio:boolean }) {
  const t=translator(locale);
  return <><color attach="background" args={['#000000']} /><fog attach="fog" args={['#000000', 35, 150]} /><Terrain reduced={reduced} />
    {!shellOnly&&stationIds.filter(id=>!(id==='trabajo'&&compactPortfolio)).map(id=><group key={id} position={stations[id].position} rotation={[0,stations[id].angle,0]}>
      <Html portal={portal} transform distanceFactor={4} zIndexRange={[50,0]} style={{overflow:"clip"}}>
        <div className={`spatial-section station-section${destination===id?' is-current':''}${destination===id&&(id==='estudio'||id==='contacto')&&settledDestination!==id?' is-arriving':''}${id==='servicios'?' station-services-container':id==='trabajo'?' station-portfolio-container':id==='estudio'?' station-studio-container':id==='contacto'?' station-contact-container':''}`} style={{opacity:destination===id?1:destination==='inicio'?(id==='servicios'?.42:.1):.17,filter:destination===id?'blur(0px)':destination==='inicio'?(id==='servicios'?'blur(2.5px)':'blur(4px)'):'blur(3px)'}} inert={destination!==id} aria-hidden={destination!==id}>
          {id==='servicios'?<ServicesScene locale={locale} navigate={navigate} active={destination==='servicios'}/ >:<ContentScenes destination={id} navigate={navigate} locale={locale} active={destination===id&&((id!=='estudio'&&id!=='contacto')||settledDestination===id)}/>}
          <button className="station-back" onClick={()=>navigate('inicio')} aria-label={t('Volver al inicio ↩')} title={t('Volver al inicio ↩')}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button>
        </div>
      </Html>
    </group>)}
    <SceneReady onReady={onReady}/><CameraRig destination={destination} reduced={reduced} onArrive={onArrive}/></>;
}
function SceneReady({onReady}:{onReady:()=>void}) {
 const rendered=useRef(false);
 const callback=useRef(onReady);callback.current=onReady;
 useFrame(()=>{if(!rendered.current){rendered.current=true;requestAnimationFrame(()=>requestAnimationFrame(()=>callback.current()));}});
 return null;
}
export default function Experience({locale="es",shellOnly=false}:{locale?:Locale;shellOnly?:boolean}) {
 const t=translator(locale);
 const [destination,setDestination]=useState<Destination>('inicio');
 const [settledDestination,setSettledDestination]=useState<Destination|null>(null);
 const [reduced,setReduced]=useState(true);
 const [webgl,setWebgl]=useState(false);
 const [compactPortfolio,setCompactPortfolio]=useState(false);
 const [worldHost,setWorldHost]=useState<HTMLDivElement|null>(null);
 const htmlPortal=useMemo(()=>worldHost?{current:worldHost}:null,[worldHost]);
 const [sceneReady,setSceneReady]=useState(shellOnly);
 const [entryPhase,setEntryPhase]=useState<'loading'|'docking'|'returning'|'revealing'|'ready'>(shellOnly?'ready':'loading');
 const [typedCount,setTypedCount]=useState(0);
 const [introComplete,setIntroComplete]=useState(shellOnly);
 const introText=t('Tu próxima idea merece salirse del molde. Somos un estudio familiar de artesanos digitales. Combinamos creatividad, código e IA para darle forma a lo que tu negocio necesita.');
 const letters=Array.from(introText);
 const entryStarted=useRef(false);
 const returningHome=useRef(false);
 const navigate=(next:Destination)=>{
   if(next===destination)return;
   if(next==='inicio'){
     returningHome.current=webgl;
     setTypedCount(0);setIntroComplete(false);
     setEntryPhase(webgl?'returning':reduced?'ready':'revealing');
     if(!webgl&&reduced){setTypedCount(letters.length);setIntroComplete(true);}
   }else{
     returningHome.current=false;
     setEntryPhase('ready');setIntroComplete(true);
   }
   setSettledDestination(null);
   setDestination(next);
 };
 useEffect(()=>{
   const openLinkedStation=()=>{
     if(window.location.hash!=='#trabajo')return;
     const loader=document.getElementById('entry-loader');if(loader)loader.hidden=true;
     entryStarted.current=true;setEntryPhase('ready');setIntroComplete(true);setTypedCount(letters.length);
     setDestination('trabajo');
   };
   openLinkedStation();window.addEventListener('hashchange',openLinkedStation);
   return()=>window.removeEventListener('hashchange',openLinkedStation);
 },[letters.length]);
 const handleArrival=useCallback((arrived:Destination)=>{
   setSettledDestination(arrived);
   if(arrived!=='inicio'||!returningHome.current)return;
   returningHome.current=false;
   if(reduced){setTypedCount(letters.length);setIntroComplete(true);setEntryPhase('ready');}
   else setEntryPhase('revealing');
 },[reduced,letters.length]);
 const signalReady=()=>setSceneReady(true);
 useEffect(()=>{
   if(shellOnly)return;
   const timeout=setTimeout(()=>setSceneReady(true),8500);
   return()=>clearTimeout(timeout);
 },[shellOnly]);
 useEffect(()=>{
   if(!sceneReady||shellOnly||entryStarted.current)return;
   entryStarted.current=true;
   const loader=document.getElementById('entry-loader');
   const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
   const headerLogo=document.querySelector('.brand-mark img');
   if(reducedMotion){if(loader)loader.hidden=true;setEntryPhase('ready');setTypedCount(letters.length);setIntroComplete(true);return;}
   if(loader&&headerLogo){const rect=headerLogo.getBoundingClientRect();loader.style.setProperty('--dock-x',`${rect.left+rect.width/2}px`);loader.style.setProperty('--dock-y',`${rect.top+rect.height/2}px`);loader.style.setProperty('--dock-size',`${rect.width}px`);loader.dataset.phase='docking';}
   setEntryPhase('docking');
   const timer=setTimeout(()=>{if(loader)loader.hidden=true;setEntryPhase('revealing');},950);
   return()=>clearTimeout(timer);
 },[sceneReady,shellOnly,letters.length]);
 useEffect(()=>{
   if(entryPhase!=='revealing')return;
   const start=performance.now()+550;
   const duration=Math.min(2400,letters.length*15);
   let frame=0;
   const tick=(now:number)=>{const progress=Math.max(0,Math.min(1,(now-start)/duration));setTypedCount(Math.floor(progress*letters.length));if(progress<1)frame=requestAnimationFrame(tick);else{setIntroComplete(true);setEntryPhase('ready');}};
   frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
 },[entryPhase,letters.length]);
 useEffect(()=>{
   const skip=(event:KeyboardEvent)=>{if(event.key==='Escape'&&!returningHome.current){entryStarted.current=true;const loader=document.getElementById('entry-loader');if(loader)loader.hidden=true;setSceneReady(true);setEntryPhase('ready');setTypedCount(letters.length);setIntroComplete(true);}};
   window.addEventListener('keydown',skip);return()=>window.removeEventListener('keydown',skip);
 },[letters.length]);
 useEffect(()=>{
  const media=matchMedia('(max-width: 600px)');
  const sync=()=>setCompactPortfolio(media.matches);sync();media.addEventListener('change',sync);
  return()=>media.removeEventListener('change',sync);
 },[]);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(media.matches);sync();media.addEventListener('change',sync);
  try{const supported=Boolean(document.createElement('canvas').getContext('webgl2'));setWebgl(supported);if(!supported)setSceneReady(true);}catch{setWebgl(false);setSceneReady(true);}
  return()=>media.removeEventListener('change',sync);
 },[]);
 return <div className={`experience entry-${entryPhase}${introComplete?' intro-complete':''}`}>
 {webgl&&<div className="world" ref={setWorldHost}>{htmlPortal&&<Canvas dpr={[1,1.5]} camera={{position:[0,4,28],fov:48}}><Suspense fallback={null}><World destination={destination} reduced={reduced} navigate={navigate} locale={locale} shellOnly={shellOnly} onReady={signalReady} onArrive={handleArrival} portal={htmlPortal} settledDestination={settledDestination} compactPortfolio={compactPortfolio}/></Suspense></Canvas>}</div>}
 <header className="site-header">
  <a className="brand brand-mark" href={`/${locale}/`} aria-label={`ElPuas Digital Crafts — ${t('Volver al inicio')}`}><img src="/brand/logo.webp" alt="ElPuas Digital Crafts" width="64" height="64" fetchPriority="high"/></a>
  <div className="header-extras"><a className="header-blog" href={`/${locale}/blog/`}>{t('Blog')}</a>
  <nav className="language-links" aria-label={t('Idioma')}>{(['es','en','it'] as const).map(lang=><a key={lang} href={`/${lang}/`} hrefLang={lang} lang={lang} aria-current={locale===lang?'page':undefined}>{lang.toUpperCase()}</a>)}</nav></div>
 </header>
 {!shellOnly&&destination==='inicio'&&<main id="experience-content" tabIndex={-1} className="arrival-overlay entry-intro">
  <h1>{t('Nosotros creamos arte digital para humanos.')}</h1>
  <p className="intro typed-intro"><span className="sr-only">{introText}</span><span aria-hidden="true">{letters.slice(0,typedCount).join('')}<span className="untyped">{letters.slice(typedCount).join('')}</span></span></p>
  <p className="journey-invitation">{t('¿Qué hacemos posible juntos?')}</p>
  <div className="choices" inert={!introComplete}><button onClick={()=>navigate('servicios')}>{t('Quiero construir algo')}</button><button onClick={()=>navigate('estudio')}>{t('Quiero conocerlos')}</button></div>
 </main>}
 {webgl&&compactPortfolio&&destination==='trabajo'&&<div className="mobile-portfolio-overlay"><ContentScenes destination="trabajo" navigate={navigate} locale={locale}/></div>}
 {!webgl&&destination!=='inicio'&&<div className="static-scenes">{destination==='servicios'?<ServicesScene locale={locale} navigate={navigate}/>:<ContentScenes destination={destination} navigate={navigate} locale={locale}/>}</div>}


 <footer className="site-footer">
  <small className="copyright">© {new Date().getFullYear()} ElPuas Digital Crafts.<span>{t('Todos los derechos reservados.')}</span></small>
  <ul className="footer-locations" aria-label={t('Teléfonos del estudio')}>{contactLocations.map(location=><li key={location.href}><span className="footer-city">{t(location.city)}</span><a href={location.href}>{location.telephone}</a></li>)}</ul>
 </footer>

 </div>;
}
