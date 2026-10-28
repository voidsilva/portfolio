import{S as x,P as p,G as y,B as g,C as w,V as d,R as b,a as z,W as k,b as m,c as S,d as C,e as f,f as M,g as T,h as q}from"./three-CDxcJdQA.js";const A=`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`,P=`
uniform float uTime;
uniform float uFront;
uniform float uScatter;
uniform float uTurb;
uniform vec3 uMouse;
uniform float uLens;
uniform vec4 uShock;
uniform float uPx;
attribute vec3 aOrder;
attribute vec4 aSeed;
attribute float aKind;
varying float vK;
varying float vEdge;
varying float vKind;
varying float vShock;
${A}
void main(){
  // caos: nuvem que se move por ruído
  vec3 c=aSeed.xyz*vec3(3.4,2.4,2.6);
  float t=uTime*0.12;
  c+=vec3(snoise(c*0.35+vec3(t,0.0,0.0)),snoise(c*0.35+vec3(0.0,t+17.0,0.0)),snoise(c*0.35+vec3(0.0,0.0,t+31.0)))*(1.1+uTurb);

  // feixe: organiza da esquerda para a direita, cada partícula com um pequeno atraso
  float lag=aSeed.w*0.9;
  float k=smoothstep(lag,lag+0.6,uFront-aOrder.x-aOrder.z*0.35);

  // lente do mouse: perto do cursor o estado se inverte
  vec3 base=mix(c,aOrder,k);
  float d=distance(base.xy,uMouse.xy);
  float lens=(1.0-smoothstep(0.0,1.15,d))*uLens;
  k=mix(k,1.0-k,lens);

  // scroll desmancha o sistema (com atraso por partícula)
  k*=1.0-smoothstep(aSeed.w*0.5,aSeed.w*0.5+0.5,uScatter);

  // onda de choque: anel que expande a partir do clique
  float age=uTime-uShock.w;
  float ring=abs(distance(aOrder.xz,uShock.xz)-age*4.0);
  float shock=(1.0-smoothstep(0.0,0.7,ring))*(1.0-smoothstep(0.0,1.6,age))*step(0.0,age);
  k*=1.0-shock*0.85;

  vec3 p=mix(c,aOrder,k);
  p.y+=shock*0.35;
  vK=k;
  vKind=aKind;
  vShock=shock;
  // brilho na borda do feixe
  vEdge=1.0-smoothstep(0.0,0.35,abs(uFront-aOrder.x-aOrder.z*0.35-lag-0.3));
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  gl_Position=projectionMatrix*mv;
  float s=mix(1.6+aSeed.w*1.6,3.0,k)+vEdge*2.0*k+shock*2.0;
  gl_PointSize=s*uPx*(7.0/-mv.z);
}`,K=`
uniform vec3 uInk;
uniform vec3 uChaos;
uniform vec3 uAccent;
uniform vec3 uGlow;
varying float vK;
varying float vEdge;
varying float vKind;
varying float vShock;
void main(){
  vec2 q=gl_PointCoord-0.5;
  // no caos o ponto é redondo e suave; no sistema vira um quadrado nítido (voxel)
  float round=1.0-smoothstep(0.25,0.5,length(q));
  float square=1.0-smoothstep(0.42,0.5,max(abs(q.x),abs(q.y)));
  float a=mix(round*0.75,square,vK);
  if(a<0.02) discard;
  vec3 ord=vKind>1.5?uAccent:(vKind>0.5?mix(uInk,uAccent,0.35):uInk);
  vec3 col=mix(uChaos,ord,vK);
  col=mix(col,uGlow,max(vEdge*vK,vShock));
  gl_FragColor=vec4(col,a);
}`;function L(){const u=[],o=[];for(let s=0;s<64;s++)for(let i=0;i<64;i++)(s+i)%2&&(s<3||i<3||s>60||i>60)||(u.push((s-64/2)*.075,-1.2,(i-64/2)*.075),o.push(0));[12,20,15,27,22,33,26,40].forEach((s,i)=>{const c=(-3.5+i)*.52;for(let a=0;a<s;a++)for(let e=0;e<5;e++)for(let t=0;t<5;t++)(e===0||t===0||e===4||t===4||a===s-1)&&(u.push(c+(e-2)*.075,-1.2+(a+1)*.075,.7+(t-2)*.075),o.push(a>=s-2?2:1))});for(let s=0;s<520;s++){const i=s/519,c=-2.2+i*4.4,a=.15+i*.95+Math.sin(i*9)*.14;u.push(c,a,-.9+s%3*.03),o.push(2)}return{order:new Float32Array(u),kind:new Float32Array(o)}}class F{constructor(o,n){this.canvas=o,this.scene=new x,this.camera=new p(30,1,.1,60),this.group=new y,this.geo=new g,this.raf=0,this.visible=!0,this.clock=new w,this.target={x:0,y:0},this.mouse=new d(99,99,0),this.ray=new b,this.plane=new z(new d(0,0,1),0),this.vel=0,this.front=-6,this.frontTo=-6,this.speed=12/3.2,this.resize=()=>{const e=this.canvas.getBoundingClientRect();this.renderer.setSize(e.width,e.height,!1),this.camera.aspect=e.width/Math.max(1,e.height),this.camera.updateProjectionMatrix()},this.move=e=>{this.target.x=e.clientX/innerWidth*2-1,this.target.y=e.clientY/innerHeight*2-1;const t=this.toWorld(e);t&&this.mouse.copy(t)},this.click=e=>{if(e.target.closest("a, button, summary, .menu, .panel"))return;const t=this.canvas.getBoundingClientRect();if(e.clientY>t.bottom||e.clientY<t.top)return;const r=this.toWorld(e);r&&this.mat.uniforms.uShock.value.set(r.x,r.y,r.z,this.mat.uniforms.uTime.value)},this.loop=()=>{this.raf=requestAnimationFrame(this.loop);const e=Math.min(this.clock.getDelta(),.05);if(!this.visible||document.hidden)return;const t=this.mat.uniforms;t.uTime.value+=e*(1+this.vel*2),t.uTurb.value+=(this.vel*1.5-t.uTurb.value)*.08,this.vel*=.94,this.front<this.frontTo&&(this.front=Math.min(this.frontTo,this.front+e*this.speed)),t.uFront.value=this.front,t.uLens.value+=((this.front>3?1:0)-t.uLens.value)*.05;const r=this.group;r.rotation.y+=(-.62+this.target.x*.25-r.rotation.y)*.04,r.rotation.x+=(.42+this.target.y*.12-r.rotation.x)*.04,this.renderer.render(this.scene,this.camera)},this.renderer=new k({canvas:o,antialias:!1,alpha:!0,powerPreference:"high-performance"});const h=Math.min(devicePixelRatio,1.75);this.renderer.setPixelRatio(h),this.camera.position.set(0,.4,13),this.camera.lookAt(0,0,0);const{order:v,kind:s}=L(),i=s.length,c=new Float32Array(i*4);for(let e=0;e<i;e++){let t,r,l;do t=Math.random()*2-1,r=Math.random()*2-1,l=Math.random()*2-1;while(t*t+r*r+l*l>1);c.set([t,r,l,Math.random()],e*4)}this.geo.setAttribute("position",new m(v,3)),this.geo.setAttribute("aOrder",new m(v,3)),this.geo.setAttribute("aSeed",new m(c,4)),this.geo.setAttribute("aKind",new m(s,1)),this.geo.boundingSphere=new S(new d,8),this.mat=new C({vertexShader:P,fragmentShader:K,transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uFront:{value:this.front},uScatter:{value:0},uTurb:{value:0},uMouse:{value:this.mouse},uLens:{value:0},uShock:{value:new M(0,0,0,-99)},uPx:{value:h*(innerWidth<820?1.3:1.6)},uInk:{value:new f},uChaos:{value:new f},uAccent:{value:new f},uGlow:{value:new f}}});const a=new T(this.geo,this.mat);this.group.add(a),this.group.rotation.set(.42,-.62,0),this.scene.add(this.group),this.setTheme(n),this.resize(),window.addEventListener("resize",this.resize),window.addEventListener("pointermove",this.move),window.addEventListener("pointerdown",this.click),this.io=new IntersectionObserver(([e])=>this.visible=e.isIntersecting),this.io.observe(o),this.loop()}setTheme(o){const n=this.mat.uniforms;n.uInk.value.set(o?"#e9e6f5":"#14102a"),n.uChaos.value.set(o?"#8b5cf6":"#8b6cf7"),n.uAccent.value.set(o?"#a78bfa":"#7c4dff"),n.uGlow.value.set(o?"#55d6ff":"#22b8e0")}setVelocity(o){this.vel=Math.min(1,Math.abs(o)/40)}setScatter(o){this.mat.uniforms.uScatter.value=o}build(o=3.2){this.front=-6,this.frontTo=6,this.speed=12/o}toWorld(o){const n=this.canvas.getBoundingClientRect(),h=(o.clientX-n.left)/n.width*2-1,v=-((o.clientY-n.top)/n.height)*2+1;this.ray.setFromCamera(new q(h,v),this.camera);const s=new d;return this.ray.ray.intersectPlane(this.plane,s)?this.group.worldToLocal(s):null}dispose(){cancelAnimationFrame(this.raf),this.io.disconnect(),window.removeEventListener("resize",this.resize),window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerdown",this.click),this.geo.dispose(),this.mat.dispose(),this.renderer.dispose()}}export{F as Blob};
