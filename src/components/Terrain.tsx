import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Stable geometry and GPU-only accents: no allocations or React updates per frame.
export default function Terrain({ reduced }: { reduced: boolean }) {
  const resources = useMemo(() => {
    const ground = new THREE.PlaneGeometry(110, 400, 44, 120);
    ground.rotateX(-Math.PI / 2);
    const pos = ground.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      const shoulder = THREE.MathUtils.smoothstep(Math.abs(x), 8, 24);
      const peaks = 2 + Math.abs(Math.sin(x * .41 + z * .23) * Math.cos(z * .31 - x * .27)) * 10;
      pos.setY(i, shoulder * peaks);
    }
    ground.computeVertexNormals();
    const edges = new THREE.WireframeGeometry(ground);
    const ink = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { time: { value: 0 }, motion: { value: 0 } },
      vertexShader: `uniform float time; uniform float motion; varying vec3 p; varying float depth;
      void main(){ vec3 v=position; float side=smoothstep(8.,24.,abs(v.x));
      v.y+=sin(v.z*.12+time*.17)*.10*side*motion;
      p=v; vec4 mv=modelViewMatrix*vec4(v,1.);depth=-mv.z;gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform float time; uniform float motion; varying vec3 p; varying float depth;
      void main(){float fade=1.-smoothstep(32.,125.,depth);
      float sweep=pow(max(0.,sin(p.z*.16+p.x*.10+time*.24)),38.)*motion;
      float sparse=pow(max(0.,sin(p.x*.79-p.z*.41)),14.);
      float mountain=smoothstep(.8,3.5,p.y);
      // Sparse soft pockets drift across ridges, independently of the ground route.
      float cyanWave=pow(max(0.,sin(p.x*.23+p.z*.13-time*.14)),30.);
      float limeWave=pow(max(0.,sin(p.x*.17-p.z*.11+time*.11+2.4)),36.);
      float pocket=pow(max(0.,sin(p.x*.61+p.z*.29)),8.);
      float cyanGlow=cyanWave*pocket*mountain*motion;
      float limeGlow=limeWave*(1.-pocket)*mountain*motion;
      vec3 base=vec3(.045,.56,.58);
      vec3 color=mix(base,vec3(.08,.95,.89),clamp(sweep*sparse+cyanGlow*.65,0.,1.));
      color=mix(color,vec3(.847,1.,0.),limeGlow*.68);
      float accent=max(cyanGlow,limeGlow);
      gl_FragColor=vec4(color,(.55+sweep*sparse*.30+accent*.20)*fade); }`
    });
    // Starts exactly on a grid axis; then deliberately leaves its straight rules.
    const path = new THREE.CurvePath<THREE.Vector3>();
    path.add(new THREE.LineCurve3(new THREE.Vector3(0,.045,25),new THREE.Vector3(0,.045,18)));
    path.add(new THREE.CubicBezierCurve3(
      new THREE.Vector3(0,.045,18),new THREE.Vector3(0,.045,12),
      new THREE.Vector3(-6,.12,13),new THREE.Vector3(-5,.22,4)
    ));
    path.add(new THREE.CubicBezierCurve3(
      new THREE.Vector3(-5,.22,4),new THREE.Vector3(-5,.4,-6),
      new THREE.Vector3(7,1.5,-14),new THREE.Vector3(8,1.8,-25)
    ));
    path.add(new THREE.CubicBezierCurve3(
      new THREE.Vector3(8,1.8,-25),new THREE.Vector3(9,2.3,-36),
      new THREE.Vector3(-4,.7,-39),new THREE.Vector3(-2,.15,-65)
    ));
    const routeGeometry = new THREE.TubeGeometry(path, 180, .026, 4, false);
    const routeMaterial = new THREE.ShaderMaterial({ transparent:true,depthWrite:false,
      uniforms:{time:{value:0},motion:{value:0}},
      vertexShader:`varying vec2 tex; varying float depth; void main(){tex=uv;vec4 mv=modelViewMatrix*vec4(position,1.);depth=-mv.z;gl_Position=projectionMatrix*mv;}`,
      fragmentShader:`uniform float time;uniform float motion;varying vec2 tex;varying float depth;
      void main(){float head=fract(time*.024);float d=abs(tex.x-head);float pulse=exp(-d*d*1800.)*motion;
      float fade=1.-smoothstep(25.,95.,depth);gl_FragColor=vec4(vec3(.847,1.,0.),(.48+pulse*.50)*fade);}`
    });
    const starsGeometry = new THREE.BufferGeometry();
    const stars = new Float32Array(55 * 3);
    for(let i=0;i<55;i++){stars[i*3]=Math.sin(i*127.1)*46;stars[i*3+1]=4+(Math.sin(i*43.2)*.5+.5)*24;stars[i*3+2]=-15-(Math.cos(i*71.7)*.5+.5)*75;}
    starsGeometry.setAttribute('position',new THREE.BufferAttribute(stars,3));
    const starsMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,
      uniforms:{time:{value:0},motion:{value:0}},
      vertexShader:`varying float seed;void main(){seed=position.x*3.1+position.y;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=2.;gl_Position=projectionMatrix*mv;}`,
      fragmentShader:`uniform float time;uniform float motion;varying float seed;
      void main(){float circle=1.-smoothstep(.1,.5,length(gl_PointCoord-.5));float wink=pow(max(0.,sin(time*.38+seed)),18.)*motion;gl_FragColor=vec4(.32,.72,.70,circle*(.06+wink*.5));}`
    });
    return {ground,edges,ink,routeGeometry,routeMaterial,starsGeometry,starsMaterial};
  }, []);
  useEffect(()=>()=>{Object.values(resources).forEach(r=>r.dispose());},[resources]);
  useFrame(({clock})=>{
    for(const material of [resources.ink,resources.routeMaterial,resources.starsMaterial]){
      material.uniforms.motion.value=reduced?0:1;
      material.uniforms.time.value=reduced?0:clock.elapsedTime;
    }
  });
  return <group position={[0,-1,-22]}>
    <mesh geometry={resources.ground}><meshBasicMaterial color="#050c0e" /></mesh>
    <lineSegments geometry={resources.edges} material={resources.ink}/>
    <gridHelper args={[400,160,'#34575c','#213a40']} position={[0,.015,0]}/>
    <mesh geometry={resources.routeGeometry} material={resources.routeMaterial}/>
    <points geometry={resources.starsGeometry} material={resources.starsMaterial}/>
  </group>;
}
