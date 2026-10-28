import{S as R,P as U,G as j,B as _,C as B,V as p,R as K,W as L,F as N,a as d,b as V,c as P,d as w,e as O,f as G,T as X,g as Y,h as q,M as D,i as E,j as $,I as k,k as F,l as W,m as Q,Q as I,n as J}from"./three-Dicmn_Rt.js";const Z=`
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
}`,f=12e3,ee=`
uniform float uTime;
uniform float uFrom;
uniform float uTo;
uniform float uMix;
uniform float uFront;
uniform float uTurb;
uniform vec3 uMouse;
uniform vec4 uShock;
uniform float uPx;
uniform float uShow;
uniform float uPMix;
uniform float uProjA;
uniform float uProjB;
attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aP3;
attribute vec3 aP4;
attribute vec4 aSeed;
attribute float aKind;
attribute float aKind4;
attribute vec3 aC0;
attribute vec3 aC1;
attribute vec3 aC2;
uniform vec3 uInk;
uniform vec3 uChaos;
uniform vec3 uAccent;
uniform vec3 uGlow;
varying vec3 vCol;
varying float vSq;
varying float vA;
${Z}

vec3 chaos(){
  vec3 c=aSeed.xyz*vec3(3.6,2.5,2.6);
  float t=uTime*0.12;
  return c+vec3(snoise(c*0.35+vec3(t,0.0,0.0)),snoise(c*0.35+vec3(0.0,t+17.0,0.0)),snoise(c*0.35+vec3(0.0,0.0,t+31.0)))*(1.1+uTurb);
}
vec3 projCol(float i){
  return i<0.5?aC0:(i<1.5?aC1:aC2);
}
// posição, cor e "quadradice" (0 = ponto redondo, 1 = voxel) de cada forma
void shape(float s,vec3 c,out vec3 p,out vec3 col,out float sq){
  if(s<0.5){
    p=c; col=uChaos; sq=0.0;
  } else if(s<1.5){
    float lag=aSeed.w*0.9;
    float k=smoothstep(lag,lag+0.6,uFront-aP1.x-aP1.z*0.35);
    p=mix(c,aP1,k);
    vec3 ord=aKind>1.5?uAccent:(aKind>0.5?mix(uInk,uAccent,0.35):uInk);
    float edge=1.0-smoothstep(0.0,0.35,abs(uFront-aP1.x-aP1.z*0.35-lag-0.3));
    col=mix(mix(uChaos,ord,k),uGlow,edge*k);
    sq=k;
  } else if(s<2.5){
    // túnel: os anéis correm na direção da câmera
    vec3 q=aP2;
    q.z=mod(q.z+uTime*0.9+6.0,10.0)-6.0;
    p=q;
    float d=smoothstep(-6.0,3.0,q.z);
    col=mix(uChaos,mix(uAccent,uGlow,aSeed.w),d);
    sq=0.0;
  } else if(s<3.5){
    p=aP3;
    vec3 a=projCol(uProjA);
    vec3 b=projCol(uProjB);
    float m=smoothstep(aSeed.w*0.6,aSeed.w*0.6+0.4,uPMix);
    col=mix(a,b,m);
    p.z+=sin(m*3.14159)*0.6*(aSeed.x);
    sq=1.0;
  } else {
    p=aP4;
    col=aKind4>2.5?uGlow:(aKind4>1.5?uAccent:(aKind4>0.5?mix(uInk,uAccent,0.4):uInk));
    p.y+=sin(uTime*0.8+aKind4*1.3)*0.05;
    sq=1.0;
  }
}

void main(){
  vec3 c=chaos();
  vec3 pa; vec3 ca; float sa;
  vec3 pb; vec3 cb; float sb;
  shape(uFrom,c,pa,ca,sa);
  shape(uTo,c,pb,cb,sb);
  float lag=aSeed.w*0.45;
  float m=smoothstep(lag,lag+0.55,uMix);
  vec3 p=mix(pa,pb,m);
  // no meio da troca as partículas fazem um redemoinho
  float mid=sin(m*3.14159);
  p+=vec3(snoise(c*0.6+uTime*0.3),snoise(c*0.6-uTime*0.3+9.0),snoise(c*0.6+21.0))*mid*0.9;
  vec3 col=mix(ca,cb,m);
  float sq=mix(sa,sb,m);

  // mouse: empurra as partículas para fora, como um campo de força
  vec2 dv=p.xy-uMouse.xy;
  float dd=length(dv);
  float push=(1.0-smoothstep(0.0,1.1,dd));
  p.xy+=normalize(dv+1e-4)*push*0.55;
  p.z+=push*0.4;

  // onda de choque do clique
  float age=uTime-uShock.w;
  float ring=abs(distance(p.xy,uShock.xy)-age*4.0);
  float shock=(1.0-smoothstep(0.0,0.7,ring))*(1.0-smoothstep(0.0,1.6,age))*step(0.0,age);
  p+=normalize(vec3(p.xy-uShock.xy,0.3)+1e-4)*shock*0.5;
  col=mix(col,uGlow,max(shock,push*0.6));

  vCol=col;
  vSq=sq;
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  gl_Position=projectionMatrix*mv;
  float s=mix(1.6+aSeed.w*1.6,2.9,sq)+shock*2.0+push*1.2;
  // quando a captura nítida aparece, os pontos da tela se recolhem
  float onScreen=step(2.5,uTo)*step(uTo,3.5)*m;
  gl_PointSize=s*uPx*(7.0/-mv.z)*(1.0-uShow*onScreen*0.85);
}`,te=`
uniform float uAlpha;
varying vec3 vCol;
varying float vSq;
void main(){
  vec2 q=gl_PointCoord-0.5;
  float round=1.0-smoothstep(0.25,0.5,length(q));
  float square=1.0-smoothstep(0.42,0.5,max(abs(q.x),abs(q.y)));
  float a=mix(round*0.75,square,vSq)*uAlpha;
  if(a<0.02) discard;
  gl_FragColor=vec4(vCol,a);
}`;function b(u){const e=new Float32Array(f*3),a=u.length/3;for(let n=0;n<f;n++){const o=n<a?n:Math.random()*a|0;e[n*3]=u[o*3],e[n*3+1]=u[o*3+1],e[n*3+2]=u[o*3+2]}return e}function oe(){const u=[],e=[];for(let t=0;t<64;t++)for(let s=0;s<64;s++)(t+s)%2&&(t<3||s<3||t>60||s>60)||(u.push((t-64/2)*.075,-1.2,(s-64/2)*.075),e.push(0));[12,20,15,27,22,33,26,40].forEach((t,s)=>{const c=(-3.5+s)*.52;for(let h=0;h<t;h++)for(let m=0;m<5;m++)for(let i=0;i<5;i++)(m===0||i===0||m===4||i===4||h===t-1)&&(u.push(c+(m-2)*.075,-1.2+(h+1)*.075,.7+(i-2)*.075),e.push(h>=t-2?2:1))});for(let t=0;t<520;t++){const s=t/519;u.push(-2.2+s*4.4,.15+s*.95+Math.sin(s*9)*.14,-.9+t%3*.03),e.push(2)}const o=new Float32Array(f);for(let t=0;t<f;t++)o[t]=t<e.length?e[t]:0;return{p:b(u),kind:o,n:e.length}}function se(){const u=[];for(let n=0;n<64;n++)for(let o=0;o<180;o++){const t=o/180*Math.PI*2,s=1.7,c=Math.cos(t),h=Math.sin(t),m=Math.pow(Math.pow(Math.abs(c),4)+Math.pow(Math.abs(h),4),.25);u.push(c/m*s,h/m*s*.8,-6+n/64*10)}return b(u)}function ae(){const u=[];for(let o=0;o<60;o++)for(let t=0;t<96;t++){const s=(t-48)*.048;u.push(s,(60/2-o)*.048,-s*s*.06)}return{p:b(u),W:96,H:60}}function ie(){const u=[],e=[];[{y:-1.3,n:34,k:0},{y:-.45,n:30,k:1},{y:.4,n:26,k:2},{y:1.25,n:22,k:3}].forEach(t=>{for(let s=0;s<t.n;s++)for(let c=0;c<t.n;c++)!(s===0||c===0||s===t.n-1||c===t.n-1)&&(s+c)%2||(u.push((s-t.n/2)*.09,t.y,(c-t.n/2)*.09),e.push(t.k))});for(let t=0;t<4;t++)for(let s=0;s<60;s++){const c=t/4*Math.PI*2+.6;u.push(Math.cos(c)*.6,-1.3+s/59*2.55,Math.sin(c)*.6),e.push(3)}const o=new Float32Array(f);for(let t=0;t<f;t++)o[t]=t<e.length?e[t]:e[Math.random()*e.length|0];return{p:b(u),kind:o,n:e.length}}const ne=`
varying vec3 vW;
void main(){
  vec4 w=modelMatrix*vec4(position,1.0);
  vW=w.xyz;
  gl_Position=projectionMatrix*viewMatrix*w;
}`,re=`
uniform vec3 uLine;
uniform vec3 uFog;
uniform vec3 uCam;
uniform float uTime;
varying vec3 vW;
float grid(vec2 p,float s){
  vec2 g=abs(fract(p/s-0.5)-0.5)/fwidth(p/s);
  return 1.0-min(min(g.x,g.y),1.0);
}
void main(){
  float d=distance(vW.xz,uCam.xz);
  float g=grid(vW.xz,1.0)*0.55+grid(vW.xz,5.0)*0.6;
  // um pulso de luz corre pelo piso, no sentido da caminhada
  float pulse=smoothstep(0.0,0.6,1.0-abs(fract(vW.z*0.02+uTime*0.08)-0.5)*2.0)*0.5;
  float fade=1.0-smoothstep(6.0,46.0,d);
  float a=clamp(g*(0.55+pulse),0.0,1.0)*fade;
  gl_FragColor=vec4(mix(uFog,uLine,a),a*0.9);
}`;function ce(u){const e=new D(new E(400,400),new P({vertexShader:ne,fragmentShader:re,transparent:!0,depthWrite:!1,uniforms:{uLine:{value:new w},uFog:{value:new w},uCam:{value:new p},uTime:{value:0}}}));e.rotation.x=-Math.PI/2,e.position.set(0,-3.2,-100),u.add(e);const a=46,n=new k(new F(1,1,1),new W({color:16777215,fog:!0}),a),o=new Q;for(let i=0;i<a;i++){const r=i%2?1:-1,v=3+Math.random()*9,l=.15+Math.random()*.5;o.compose(new p(r*(11+Math.random()*12),-3.2+v/2,-4-i/a*190-Math.random()*4),new I,new p(l,v,l)),n.setMatrixAt(i,o)}u.add(n);const t=new k(new F(1,1,1),new W({color:16777215,fog:!0}),a);for(let i=0;i<a;i++){n.getMatrixAt(i,o);const r=new p,v=new I,l=new p;o.decompose(r,v,l),o.compose(new p(r.x,r.y+l.y/2+.02,r.z),v,new p(l.x*1.02,.05,l.z*1.02)),t.setMatrixAt(i,o)}u.add(t);const s=1600,c=new Float32Array(s*3);for(let i=0;i<s;i++)c.set([(Math.random()-.5)*40,-3+Math.random()*12,10-Math.random()*200],i*3);const h=new _;h.setAttribute("position",new d(c,3));const m=new G(h,new J({size:.05,sizeAttenuation:!0,transparent:!0,opacity:.7,fog:!0,depthWrite:!1}));return u.add(m),{floor:e,pillars:n,glow:t,dust:m}}class le{constructor(e,a){this.scene=new R,this.camera=new U(30,1,.1,60),this.group=new j,this.rig=new j,this.travel=0,this.travelTo=0,this.geo=new _,this.raf=0,this.clock=new B,this.target={x:0,y:0},this.mouse=new p(99,99,0),this.mouseTo=new p(99,99,0),this.ray=new K,this.vel=0,this.front=-6,this.frontTo=-6,this.speed=12/3.2,this.stage=0,this.pose={x:0,y:0,z:-2,rx:0,ry:0,s:1.3,a:.4},this.project=0,this.show=0,this.showTo=0,this.pendingProject=-1,this.resize=()=>{this.renderer.setSize(innerWidth,innerHeight,!1),this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix()},this.move=i=>{this.target.x=i.clientX/innerWidth*2-1,this.target.y=i.clientY/innerHeight*2-1;const r=this.toLocal(i.clientX,i.clientY);r&&this.mouseTo.copy(r)},this.click=i=>{if(i.target.closest("a, button, summary, .menu, .panel, input"))return;const r=this.toLocal(i.clientX,i.clientY);r&&this.mat.uniforms.uShock.value.set(r.x,r.y,r.z,this.mat.uniforms.uTime.value)},this.loop=()=>{this.raf=requestAnimationFrame(this.loop);const i=Math.min(this.clock.getDelta(),.05);if(document.hidden)return;const r=this.mat.uniforms;r.uTime.value+=i*(1+this.vel*2),r.uTurb.value+=(this.vel*1.5-r.uTurb.value)*.08,this.vel*=.94,this.front<this.frontTo&&(this.front=Math.min(this.frontTo,this.front+i*this.speed)),r.uFront.value=this.front,this.mouse.lerp(this.mouseTo,.15);const v=this.group,l=this.pose;v.position.set(l.x,l.y,l.z),v.scale.setScalar(l.s),v.rotation.x+=(l.rx+this.target.y*.12-v.rotation.x)*.06,v.rotation.y+=(l.ry+this.target.x*.25-v.rotation.y)*.06,r.uAlpha.value=l.a;const g=r.uTo.value===3&&r.uMix.value>.92;this.pendingProject>=0&&this.show<.04&&(this.screenMesh.material.uniforms.uIdx.value=this.pendingProject,this.pendingProject=-1),this.pendingProject<0&&(this.showTo=g?1:0),this.show+=(this.showTo-this.show)*(this.showTo>this.show?.035:.12),r.uShow.value=this.show,this.screenMesh.material.uniforms.uShow.value=this.show,this.screenMesh.visible=this.show>.01,this.travel+=(this.travelTo-this.travel)*.06,this.rig.position.set(Math.sin(this.travel*9)*1.2,0,-this.travel*150),this.camera.rotation.y+=(-this.target.x*.05-this.camera.rotation.y)*.05,this.camera.rotation.x+=(-this.target.y*.03-this.camera.rotation.x)*.05;const y=this.hall.floor.material.uniforms;y.uCam.value.copy(this.rig.position),y.uTime.value=r.uTime.value,this.renderer.render(this.scene,this.camera)},this.renderer=new L({canvas:e,antialias:!1,alpha:!0,powerPreference:"high-performance"});const n=Math.min(devicePixelRatio,1.5);this.renderer.setPixelRatio(n),this.camera.position.set(0,0,13),this.scene.add(this.rig),this.rig.add(this.camera),this.hall=ce(this.scene),this.scene.fog=new N(16777215,14,60);const o=oe(),t=se(),s=ae();this.screenStage=s;const c=ie(),h=new Float32Array(f*4);for(let i=0;i<f;i++){let r,v,l;do r=Math.random()*2-1,v=Math.random()*2-1,l=Math.random()*2-1;while(r*r+v*v+l*l>1);h.set([r,v,l,Math.random()],i*4)}this.geo.setAttribute("position",new d(o.p,3)),this.geo.setAttribute("aP1",new d(o.p,3)),this.geo.setAttribute("aP2",new d(t,3)),this.geo.setAttribute("aP3",new d(s.p,3)),this.geo.setAttribute("aP4",new d(c.p,3)),this.geo.setAttribute("aSeed",new d(h,4)),this.geo.setAttribute("aKind",new d(o.kind,1)),this.geo.setAttribute("aKind4",new d(c.kind,1));const m=new Float32Array(f*3).fill(.5);this.geo.setAttribute("aC0",new d(m.slice(),3)),this.geo.setAttribute("aC1",new d(m.slice(),3)),this.geo.setAttribute("aC2",new d(m.slice(),3)),this.geo.boundingSphere=new V(new p,20),this.mat=new P({vertexShader:ee,fragmentShader:te,transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uFrom:{value:0},uTo:{value:0},uMix:{value:1},uFront:{value:this.front},uTurb:{value:0},uMouse:{value:this.mouse},uShock:{value:new O(0,0,0,-99)},uPx:{value:n*(innerWidth<820?1.3:1.6)},uPMix:{value:1},uProjA:{value:0},uProjB:{value:0},uAlpha:{value:1},uShow:{value:0},uInk:{value:new w},uChaos:{value:new w},uAccent:{value:new w},uGlow:{value:new w}}}),this.group.add(new G(this.geo,this.mat)),this.screenMesh=this.buildScreen(s.W*.048,s.H*.048),this.group.add(this.screenMesh),this.rig.add(this.group),this.setTheme(a),this.resize(),window.addEventListener("resize",this.resize),window.addEventListener("pointermove",this.move),window.addEventListener("pointerdown",this.click),this.loop()}loadProjects(e){const{W:a,H:n}=this.screenStage,o=document.createElement("canvas");o.width=a,o.height=n;const t=o.getContext("2d",{willReadFrequently:!0});e.slice(0,3).forEach((s,c)=>{const h=new Image;h.onload=()=>{const m=h.width,i=Math.min(h.height,m*n/a);t.clearRect(0,0,a,n),t.drawImage(h,0,0,m,i,0,0,a,n);const r=t.getImageData(0,0,a,n).data,v=this.geo.getAttribute(`aC${c}`),l=v.array;for(let x=0;x<f;x++){const M=x<a*n?x:Math.random()*a*n|0,T=r[M*4]/255,S=r[M*4+1]/255,C=r[M*4+2]/255,A=(T+S+C)/3,z=H=>Math.min(1,Math.max(0,A+(H-A)*1.6)*1.1);l[x*3]=z(T),l[x*3+1]=z(S),l[x*3+2]=z(C)}v.needsUpdate=!0;const g=new X(h);g.colorSpace=Y,g.needsUpdate=!0;const y=this.screenMesh.material.uniforms;y[`uT${c}`].value=g,y.uCrop.value.setComponent(c,i/h.height)},h.src=s})}setTravel(e){this.travelTo=e}setTheme(e){const a=new w(e?"#08090d":"#f1ecfb");this.scene.fog.color.copy(a);const n=this.hall.floor.material.uniforms;n.uFog.value.copy(a),n.uLine.value.set(e?"#3a3360":"#b9a8ee"),this.hall.pillars.material.color.set(e?"#121521":"#e7e0f8"),this.hall.glow.material.color.set(e?"#55d6ff":"#8b5cf6"),this.hall.dust.material.color.set(e?"#a78bfa":"#7c4dff");const o=this.mat.uniforms;o.uInk.value.set(e?"#e9e6f5":"#14102a"),o.uChaos.value.set(e?"#8b5cf6":"#8b6cf7"),o.uAccent.value.set(e?"#a78bfa":"#7c4dff"),o.uGlow.value.set(e?"#55d6ff":"#22b8e0")}setVelocity(e){this.vel=Math.min(1,Math.abs(e)/40)}goTo(e){if(e===this.stage&&this.mat.uniforms.uMix.value>=1)return null;const a=this.mat.uniforms;return a.uFrom.value=a.uMix.value>=.5?this.stage:a.uFrom.value,a.uTo.value=e,a.uMix.value=0,this.stage=e,e===1&&this.front<6&&this.build(),a.uMix}setProject(e){if(e===this.project)return null;const a=this.mat.uniforms;return a.uProjA.value=this.project,a.uProjB.value=e,a.uPMix.value=0,this.project=e,this.pendingProject=e,this.showTo=0,a.uPMix}buildScreen(e,a){const n=new P({transparent:!0,depthWrite:!1,uniforms:{uT0:{value:null},uT1:{value:null},uT2:{value:null},uIdx:{value:0},uCrop:{value:new p(1,1,1)},uShow:{value:0},uRes:{value:new q(96,60)}},vertexShader:`
        varying vec2 vUv;
        void main(){
          vUv=uv;
          vec3 p=position;
          p.z=-p.x*p.x*0.06;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
        }`,fragmentShader:`
        uniform sampler2D uT0; uniform sampler2D uT1; uniform sampler2D uT2;
        uniform float uIdx; uniform vec3 uCrop; uniform float uShow; uniform vec2 uRes;
        varying vec2 vUv;
        float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
        void main(){
          // blocos grandes viram pixels pequenos conforme a tela "carrega"
          float cells=mix(12.0,240.0,uShow*uShow);
          vec2 g=floor(vUv*vec2(cells,cells*0.625))/vec2(cells,cells*0.625);
          vec2 uv=mix(g,vUv,step(0.98,uShow));
          float crop=uIdx<0.5?uCrop.x:(uIdx<1.5?uCrop.y:uCrop.z);
          vec2 tuv=vec2(uv.x,1.0-(1.0-uv.y)*crop);
          vec4 c=uIdx<0.5?texture2D(uT0,tuv):(uIdx<1.5?texture2D(uT1,tuv):texture2D(uT2,tuv));
          float cell=h(floor(vUv*vec2(24.0,15.0)));
          float a=smoothstep(cell-0.15,cell,uShow*1.15);
          // moldura fina
          vec2 e=min(vUv,1.0-vUv);
          float rim=1.0-smoothstep(0.0,0.006,min(e.x,e.y*1.6));
          gl_FragColor=vec4(mix(c.rgb,vec3(0.55,0.4,1.0),rim),a*0.97);
        }`}),o=new D(new E(e,a,24,1),n);return o.renderOrder=2,o}build(e=3.2){this.front=-6,this.frontTo=6,this.speed=12/e}toLocal(e,a){const n=e/innerWidth*2-1,o=-(a/innerHeight)*2+1;this.ray.setFromCamera(new q(n,o),this.camera);const t=this.group.getWorldPosition(new p),s=new $(new p(0,0,1),-t.z),c=new p;return this.ray.ray.intersectPlane(s,c)?this.group.worldToLocal(c):null}dispose(){cancelAnimationFrame(this.raf),window.removeEventListener("resize",this.resize),window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerdown",this.click),this.geo.dispose(),this.mat.dispose(),this.screenMesh.geometry.dispose(),this.screenMesh.material.dispose(),Object.values(this.hall).forEach(e=>{e.geometry.dispose(),e.material.dispose()}),this.renderer.dispose()}}export{f as COUNT,le as World};
