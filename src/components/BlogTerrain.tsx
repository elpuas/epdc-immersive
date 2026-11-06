import {useEffect,useState} from 'react';
import {Canvas} from '@react-three/fiber';
import Terrain from './Terrain';

// The same terrain as the home, isolated to the editorial footer.
export default function BlogTerrain(){
 const [reduced,setReduced]=useState(true);
 const [supported,setSupported]=useState(false);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>setReduced(media.matches);sync();media.addEventListener('change',sync);
  try{setSupported(Boolean(document.createElement('canvas').getContext('webgl2')));}catch{}
  return()=>media.removeEventListener('change',sync);
 },[]);
 if(!supported)return null;
 return <div className="blog-terrain-canvas"><Canvas dpr={[1,1.5]} camera={{position:[0,4,28],fov:48}} onCreated={({camera})=>camera.lookAt(0,3,-15)}>
  <color attach="background" args={['#000']}/>
  <fog attach="fog" args={['#000',35,150]}/>
  <Terrain reduced={reduced}/>
 </Canvas></div>;
}
