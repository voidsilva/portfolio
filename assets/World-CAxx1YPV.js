import{b as Je,B as xe,M as H,c as et,P as he,d as g,e as G,f as tt,C as z,g as it,h as M,i as _e,j as ke,W as Z,H as $,k as W,U as ue,O as ct,l as ge,F as Re,V as E,N as ht,m as st,A as k,R as ut,n as ft,o as dt,L as pt,p as mt,q as vt,r as ot,s as gt,t as xt,u as De,S as Ae,v as wt,w as Ve,x as yt,y as bt,z as Ge,D as j,E as Te,G as se,I as Mt,J as X,K as V,Q as Tt,X as ve,Y as je,Z as He,_ as Qe,$ as ne,a0 as le,a1 as K,a2 as Ye,a3 as Se,a4 as qe,a5 as Xe,a as St}from"./three-BJuaKTYX.js";import{p as Ct,s as Pt,t as zt,L as _t}from"./index-BsPFBHds.js";import"./gsap-DjKJqAo0.js";class Rt extends Je{constructor(){super();const e=new xe;e.deleteAttribute("uv");const t=new H({side:et}),o=new H,i=new he(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const s=new g(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const r=new g(e,o);r.position.set(-10.906,2.009,1.846),r.rotation.set(0,-.195,0),r.scale.set(2.328,7.905,4.651),this.add(r);const n=new g(e,o);n.position.set(-5.607,-.754,-.758),n.rotation.set(0,.994,0),n.scale.set(1.97,1.534,3.955),this.add(n);const a=new g(e,o);a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),this.add(a);const f=new g(e,o);f.position.set(-2.017,.018,6.124),f.rotation.set(0,.333,0),f.scale.set(2.002,4.566,2.064),this.add(f);const c=new g(e,o);c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),this.add(c);const l=new g(e,o);l.position.set(-2.193,-.369,-5.547),l.rotation.set(0,.516,0),l.scale.set(3.875,3.487,2.986),this.add(l);const h=new g(e,oe(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const m=new g(e,oe(50));m.position.set(-16.109,18.021,-8.207),m.scale.set(.1,2.425,2.751),this.add(m);const d=new g(e,oe(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);const w=new g(e,oe(43));w.position.set(-.462,8.89,14.52),w.scale.set(4.38,5.441,.088),this.add(w);const v=new g(e,oe(20));v.position.set(3.235,11.486,-12.541),v.scale.set(2.5,2,.1),this.add(v);const p=new g(e,oe(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function oe(x){const e=new G;return e.color.setScalar(x),e}class we extends g{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new tt;const o=this,i=t.color!==void 0?new z(t.color):new z(8355711),s=t.textureWidth||512,r=t.textureHeight||512,n=t.clipBias||0,a=t.shader||we.ReflectorShader,f=t.multisample!==void 0?t.multisample:4,c=new it,l=new M,h=new M,m=new M,d=new _e,w=new M(0,0,-1),v=new ke,p=new M,P=new M,D=new ke,U=new _e,y=this.camera,A=new Z(s,r,{samples:f,type:$}),I=new W({name:a.name!==void 0?a.name:"unspecified",uniforms:ue.clone(a.uniforms),fragmentShader:a.fragmentShader,vertexShader:a.vertexShader});I.uniforms.tDiffuse.value=A.texture,I.uniforms.color.value=i,I.uniforms.textureMatrix.value=U,this.material=I,this.onBeforeRender=function(T,q,L){if(h.setFromMatrixPosition(o.matrixWorld),m.setFromMatrixPosition(L.matrixWorld),d.extractRotation(o.matrixWorld),l.set(0,0,1),l.applyMatrix4(d),p.subVectors(h,m),p.dot(l)>0)return;p.reflect(l).negate(),p.add(h),d.extractRotation(L.matrixWorld),w.set(0,0,-1),w.applyMatrix4(d),w.add(m),P.subVectors(h,w),P.reflect(l).negate(),P.add(h),y.position.copy(p),y.up.set(0,1,0),y.up.applyMatrix4(d),y.up.reflect(l),y.lookAt(P),y.far=L.far,y.updateMatrixWorld(),y.projectionMatrix.copy(L.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(y.projectionMatrix),U.multiply(y.matrixWorldInverse),U.multiply(o.matrixWorld),c.setFromNormalAndCoplanarPoint(l,h),c.applyMatrix4(y.matrixWorldInverse),v.set(c.normal.x,c.normal.y,c.normal.z,c.constant);const u=y.projectionMatrix;D.x=(Math.sign(v.x)+u.elements[8])/u.elements[0],D.y=(Math.sign(v.y)+u.elements[9])/u.elements[5],D.z=-1,D.w=(1+u.elements[10])/u.elements[14],v.multiplyScalar(2/v.dot(D)),u.elements[2]=v.x,u.elements[6]=v.y,u.elements[10]=v.z+1-n,u.elements[14]=v.w,o.visible=!1;const S=T.getRenderTarget(),_=T.xr.enabled,F=T.shadowMap.autoUpdate;T.xr.enabled=!1,T.shadowMap.autoUpdate=!1,T.setRenderTarget(A),T.state.buffers.depth.setMask(!0),T.autoClear===!1&&T.clear(),T.render(q,y),T.xr.enabled=_,T.shadowMap.autoUpdate=F,T.setRenderTarget(S);const B=L.viewport;B!==void 0&&T.state.viewport(B),o.visible=!0},this.getRenderTarget=function(){return A},this.dispose=function(){A.dispose(),o.material.dispose()}}}we.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const at={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class J{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Dt=new ct(-1,1,1,-1,0,1);class At extends ge{constructor(){super(),this.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Re([0,2,0,0,2,0],2))}}const Ft=new At;class Ee{constructor(e){this._mesh=new g(Ft,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Dt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Fe extends J{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof W?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ue.clone(e.uniforms),this.material=new W({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ee(this.material)}render(e,t,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ke extends J{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,o){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let r,n;this.inverse?(r=0,n=1):(r=1,n=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),s.buffers.stencil.setClear(n),s.buffers.stencil.setLocked(!0),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Et extends J{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Ut{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const o=e.getSize(new E);this._width=o.width,this._height=o.height,t=new Z(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Fe(at),this.copyPass.material.blending=ht,this.clock=new st}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let o=!1;for(let i=0,s=this.passes.length;i<s;i++){const r=this.passes[i];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,o),r.needsSwap){if(o){const n=this.renderer.getContext(),a=this.renderer.state.buffers.stencil;a.setFunc(n.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),a.setFunc(n.EQUAL,1,4294967295)}this.swapBuffers()}Ke!==void 0&&(r instanceof Ke?o=!0:r instanceof Et&&(o=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new E);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const o=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(o,i),this.renderTarget2.setSize(o,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(o,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Bt extends J{constructor(e,t,o=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=o,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new z}render(e,t,o){const i=e.autoClear;e.autoClear=!1;let s,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=i}}const It={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new z(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class re extends J{constructor(e,t,o,i){super(),this.strength=t!==void 0?t:1,this.radius=o,this.threshold=i,this.resolution=e!==void 0?new E(e.x,e.y):new E(256,256),this.clearColor=new z(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new Z(s,r,{type:$}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let l=0;l<this.nMips;l++){const h=new Z(s,r,{type:$});h.texture.name="UnrealBloomPass.h"+l,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const m=new Z(s,r,{type:$});m.texture.name="UnrealBloomPass.v"+l,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),s=Math.round(s/2),r=Math.round(r/2)}const n=It;this.highPassUniforms=ue.clone(n.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new W({uniforms:this.highPassUniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),this.separableBlurMaterials=[];const a=[3,5,7,9,11];s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let l=0;l<this.nMips;l++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(a[l])),this.separableBlurMaterials[l].uniforms.invSize.value=new E(1/s,1/r),s=Math.round(s/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new M(1,1,1),new M(1,1,1),new M(1,1,1),new M(1,1,1),new M(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=at;this.copyUniforms=ue.clone(c.uniforms),this.blendMaterial=new W({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:k,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new z,this.oldClearAlpha=1,this.basic=new G,this.fsQuad=new Ee(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let o=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(o,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(o,i),this.renderTargetsVertical[s].setSize(o,i),this.separableBlurMaterials[s].uniforms.invSize.value=new E(1/o,1/i),o=Math.round(o/2),i=Math.round(i/2)}render(e,t,o,i,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=o.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let n=this.renderTargetBright;for(let a=0;a<this.nMips;a++)this.fsQuad.material=this.separableBlurMaterials[a],this.separableBlurMaterials[a].uniforms.colorTexture.value=n.texture,this.separableBlurMaterials[a].uniforms.direction.value=re.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[a]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[a].uniforms.colorTexture.value=this.renderTargetsHorizontal[a].texture,this.separableBlurMaterials[a].uniforms.direction.value=re.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[a]),e.clear(),this.fsQuad.render(e),n=this.renderTargetsVertical[a];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(o),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=r}getSeperableBlurMaterial(e){const t=[];for(let o=0;o<e;o++)t.push(.39894*Math.exp(-.5*o*o/(e*e))/e);return new W({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new E(.5,.5)},direction:{value:new E(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new W({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}re.BlurDirectionX=new E(1,0);re.BlurDirectionY=new E(0,1);const Wt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Nt extends J{constructor(){super();const e=Wt;this.uniforms=ue.clone(e.uniforms),this.material=new ut({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Ee(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,o){this.uniforms.tDiffuse.value=o.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ft.getTransfer(this._outputColorSpace)===dt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===pt?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===mt?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===vt?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ot?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===gt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===xt&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const ce=new M;function O(x,e,t,o,i,s){const r=2*Math.PI*i/4,n=Math.max(s-2*i,0),a=Math.PI/4;ce.copy(e),ce[o]=0,ce.normalize();const f=.5*r/(r+n),c=1-ce.angleTo(x)/a;return Math.sign(ce[t])===1?c*f:n/(r+n)+f+f*(1-c)}class Ze extends xe{constructor(e=1,t=1,o=1,i=2,s=.1){if(i=i*2+1,s=Math.min(e/2,t/2,o/2,s),super(1,1,1,i,i,i),i===1)return;const r=this.toNonIndexed();this.index=null,this.attributes.position=r.attributes.position,this.attributes.normal=r.attributes.normal,this.attributes.uv=r.attributes.uv;const n=new M,a=new M,f=new M(e,t,o).divideScalar(2).subScalar(s),c=this.attributes.position.array,l=this.attributes.normal.array,h=this.attributes.uv.array,m=c.length/6,d=new M,w=.5/i;for(let v=0,p=0;v<c.length;v+=3,p+=2)switch(n.fromArray(c,v),a.copy(n),a.x-=Math.sign(a.x)*w,a.y-=Math.sign(a.y)*w,a.z-=Math.sign(a.z)*w,a.normalize(),c[v+0]=f.x*Math.sign(n.x)+a.x*s,c[v+1]=f.y*Math.sign(n.y)+a.y*s,c[v+2]=f.z*Math.sign(n.z)+a.z*s,l[v+0]=a.x,l[v+1]=a.y,l[v+2]=a.z,Math.floor(v/m)){case 0:d.set(1,0,0),h[p+0]=O(d,a,"z","y",s,o),h[p+1]=1-O(d,a,"y","z",s,t);break;case 1:d.set(-1,0,0),h[p+0]=1-O(d,a,"z","y",s,o),h[p+1]=1-O(d,a,"y","z",s,t);break;case 2:d.set(0,1,0),h[p+0]=1-O(d,a,"x","z",s,e),h[p+1]=O(d,a,"z","x",s,o);break;case 3:d.set(0,-1,0),h[p+0]=1-O(d,a,"x","z",s,e),h[p+1]=1-O(d,a,"z","x",s,o);break;case 4:d.set(0,0,1),h[p+0]=1-O(d,a,"x","y",s,e),h[p+1]=1-O(d,a,"y","x",s,t);break;case 5:d.set(0,0,-1),h[p+0]=O(d,a,"x","y",s,e),h[p+1]=1-O(d,a,"y","x",s,t);break}}}function Ce(){const x=document.createElement("canvas");x.width=x.height=128;const e=x.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,0.35)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);const o=new De(x);return o.colorSpace=Ae,o.flipY=!1,o}const ae=new z("#9d8cf0"),Ot=new z("#8fd3df"),Lt=new z(.055,.046,.1),Pe=["#0b0e18","#0b0e18","#0b0e18","#0b0e18","#0b0e18"].map(x=>new z(x)),Q=-400,rt=Array.from({length:Ct.length},(x,e)=>{const t=e%2===0?-3.6:3.6;return{x:t,y:4.3,z:-205-e*34,rotY:t<0?.32:-.32}}),$e={hero:{px:-2.6,py:2.4,pz:9.5,lx:-2.9,ly:1.5,lz:0,roll:0,fog:0,glitch:0,morph:0,energy:1},over:{px:0,py:13.5,pz:-8,lx:0,ly:4,lz:-48,roll:0,fog:.6,glitch:0,morph:0,energy:1},corridor:{px:0,py:3.2,pz:-150,lx:0,ly:3.4,lz:-200,roll:.04,fog:1,glitch:0,morph:0,energy:1.2},...Object.fromEntries(rt.map((x,e)=>[`p${e}`,{px:x.x*.22-1.6,py:x.y+.4,pz:x.z+11,lx:x.x-2.4,ly:x.y+.3,lz:x.z,roll:x.x<0?.015:-.015,fog:2,glitch:0,morph:0,energy:1}])),archive:{px:0,py:5,pz:-300,lx:-8,ly:9,lz:-380,roll:0,fog:2.5,glitch:0,morph:0,energy:1},about:{px:0,py:6,pz:Q+17,lx:-3.6,ly:6,lz:Q,roll:0,fog:3,glitch:0,morph:0,energy:1},stack:{px:12,py:12.5,pz:Q+13,lx:-5,ly:6.5,lz:Q,roll:-.08,fog:3.4,glitch:0,morph:1,energy:1.2},outro:{px:0,py:1.5,pz:Q+40,lx:0,ly:-.5,lz:Q,roll:0,fog:4,glitch:0,morph:2,energy:1.4}};class jt{constructor(e,t,o){this.screenTextures=o,this.rig={...$e.hero},this.fps=60,this.hovered=-1,this.cur={...$e.hero},this.scene=new Je,this.camera=new tt(40,1,.1,260),this.fog=new wt("#06070b",.026),this.clock=new st,this.pointer=new E,this.pointerCur=new E,this.pointerMoved=!1,this.released=[],this.waterPlane=new it(new M(0,1,0),0),this.hitV=new M,this.raycaster=new Ve,this.disposables=[],this.updaters=[],this.screens=[],this.velocity=0,this.raf=0,this.running=!1,this.started=!1,this.fpsAcc=0,this.fpsN=0,this.look=new M,this.tmpV=new M,this.lanternHalo=Ce(),this.fogBase=new z,this.corridor=[],this.reducedIntro=!1,this.introStart=()=>{},this.introSkip=()=>{},this.onVisibility=()=>{document.hidden?this.stop():this.started&&this.start()},this.resize=()=>{const a=window.innerWidth,f=window.innerHeight;this.renderer.setSize(a,f,!1),this.composer.setSize(a,f),this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.camera.aspect=a/f,this.camera.fov=a/f<.8?58:40,this.camera.updateProjectionMatrix(),this.finalPass.uniforms.uRes.value.set(a,f),!(!this.running&&this.started===!1)&&(this.running||this.renderOnce())},this.loop=()=>{if(!this.running)return;this.raf=requestAnimationFrame(this.loop);const a=Math.min(this.clock.getDelta(),.05),f=this.clock.elapsedTime,c=1-Math.exp(-a*2.8),l=this.cur,h=this.rig;for(const m in h)l[m]+=(h[m]-l[m])*(m==="glitch"?Math.min(1,c*3):c);this.pointerCur.lerp(this.pointer,1-Math.exp(-a*1.8)),this.apply(f,a),this.composer.render(),a>0&&(this.fpsAcc+=a,this.fpsN++,this.fpsAcc>.5&&(this.fps=Math.round(this.fpsN/this.fpsAcc),this.adapt(),this.fpsAcc=0,this.fpsN=0))},this.dprMax=Math.min(window.devicePixelRatio,1.5),this.slow=0,this.high=t==="high",this.renderer=new yt({canvas:e,antialias:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.high?1.5:1)),this.dprMax=this.renderer.getPixelRatio(),this.renderer.debug.checkShaderErrors=!1,this.renderer.toneMapping=ot,this.renderer.toneMappingExposure=1.1,this.renderer.outputColorSpace=Ae,this.scene.fog=this.fog,this.scene.background=new z("#0a0d14");const i=new bt(this.renderer),s=i.fromScene(new Rt,.04).texture;this.scene.environment=s,this.disposables.push(i,s),this.scene.add(new Ge("#2a2440","#050507",1.2)),this.buildFloor(),this.buildMonolith(),this.buildCorridor(),this.buildGallery(),this.buildCore(),this.buildDust(),this.renderer.compileAsync(this.scene,this.camera).catch(()=>{});const r=new Z(window.innerWidth,window.innerHeight,{type:$});this.composer=new Ut(this.renderer,r);const n=this.high?new Z(window.innerWidth,window.innerHeight,{type:$,samples:4}):null;if(n){const a=this.scene,f=this.camera;class c extends J{constructor(){super(),this.needsSwap=!1}render(h){h.setRenderTarget(n),h.clear(),h.render(a,f)}setSize(h,m){n.setSize(h,m)}}this.composer.addPass(new c),this.disposables.push(n)}else this.composer.addPass(new Bt(this.scene,this.camera));if(this.high){this.composer.addPass(new Fe({uniforms:{tDiffuse:{value:null}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
            uniform sampler2D tDiffuse; varying vec2 vUv;
            void main(){
              vec4 c = texture2D(tDiffuse, vUv);
              if (any(isnan(c)) || any(isinf(c))) c = vec4(0.0, 0.0, 0.0, 1.0);
              gl_FragColor = vec4(clamp(c.rgb, 0.0, 24.0), 1.0);
            }`},n?"":"tDiffuse")),n&&(this.composer.passes[this.composer.passes.length-1].uniforms.tDiffuse.value=n.texture),this.bloom=new re(new E(512,512),.38,.6,.55);const a=this.bloom.setSize.bind(this.bloom);this.bloom.setSize=(f,c)=>a(Math.max(1,Math.round(f/2)),Math.max(1,Math.round(c/2))),this.composer.addPass(this.bloom)}this.finalPass=new Fe({uniforms:{tDiffuse:{value:null},uTime:{value:0},uGlitch:{value:0},uAberr:{value:5e-4},uPx:{value:1},uRes:{value:new E(1,1)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform sampler2D tDiffuse; uniform float uTime; uniform float uGlitch; uniform float uAberr; uniform vec2 uRes; uniform float uPx;
        varying vec2 vUv;
        float rand(vec2 c){ return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }
        void main(){
          vec2 uv = vUv;
          // pixelização da entrada (uPx = tamanho do bloco em pixels; 1 = imagem normal)
          if (uPx > 1.0) uv = (floor(uv * uRes / uPx) + 0.5) * uPx / uRes;
          float g = uGlitch;
          float slice = floor(uv.y * 24.0 + floor(uTime * 14.0) * 5.0);
          float r = rand(vec2(slice, floor(uTime * 22.0)));
          uv.x += (r - 0.5) * 0.14 * g * step(1.0 - g * 0.55, r);
          vec2 dir = uv - 0.5;
          float d = length(dir);
          float ab = uAberr * (0.3 + d * 1.8) + g * 0.025;
          vec3 col;
          col.r = texture2D(tDiffuse, uv + dir * ab).r;
          col.g = texture2D(tDiffuse, uv).g;
          col.b = texture2D(tDiffuse, uv - dir * ab).b;
          col += g * 0.12 * vec3(0.55, 0.36, 0.96) * step(0.96, rand(vec2(floor(uv.y * 160.0), floor(uTime * 30.0))));
          col *= smoothstep(1.1, 0.32, d);
          col += (rand(uv * uRes + fract(uTime)) - 0.5) * 0.014;
          gl_FragColor = vec4(col, 1.0);
        }
      `}),this.composer.addPass(this.finalPass),this.composer.addPass(new Nt),this.resize(),window.addEventListener("resize",this.resize),document.addEventListener("visibilitychange",this.onVisibility)}buildFloor(){if(this.high){const o={name:"WaterReflector",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null},uTime:{value:0},uFog:{value:new z},uDensity:{value:.026},uRip:{value:Array.from({length:10},()=>new M(0,0,-99))}},vertexShader:`
          uniform mat4 textureMatrix; varying vec4 vUv; varying vec3 vW; varying float vD;
          #include <common>
          #include <logdepthbuf_pars_vertex>
          void main(){
            vUv = textureMatrix * vec4(position, 1.0);
            vW = (modelMatrix * vec4(position, 1.0)).xyz;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vD = -mv.z;
            gl_Position = projectionMatrix * mv;
            #include <logdepthbuf_vertex>
          }`,fragmentShader:`
          uniform vec3 color; uniform sampler2D tDiffuse; uniform float uTime; uniform vec3 uFog; uniform float uDensity; uniform vec3 uRip[10]; varying vec4 vUv; varying vec3 vW; varying float vD;
          #include <logdepthbuf_pars_fragment>
          void main(){
            #include <logdepthbuf_fragment>
            vec2 w = vec2(
              sin(vW.x * 1.7 + uTime * 0.9) + sin(vW.z * 2.3 - uTime * 1.1) + sin((vW.x + vW.z) * 4.1 + uTime * 1.7) * 0.5,
              cos(vW.z * 1.9 + uTime * 0.8) + cos(vW.x * 2.7 - uTime * 1.3) + cos((vW.x - vW.z) * 3.7 + uTime * 1.5) * 0.5
            );
            // anéis que se espalham a partir de onde o cursor passou
            float ring = 0.0;
            for (int i = 0; i < 10; i++) {
              float age = uTime - uRip[i].z;
              if (age < 0.0 || age > 3.5) continue;
              float dd = distance(vW.xz, uRip[i].xy);
              float front = age * 2.4;
              ring += sin((dd - front) * 7.0) * exp(-abs(dd - front) * 2.2) * exp(-age * 1.1);
            }
            w += vec2(ring * 6.0);
            vec4 uv = vUv;
            uv.xy += w * 0.0016 * uv.w;
            vec4 base = texture2DProj(tDiffuse, uv);
            float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
            vec3 wc = base.rgb * color + vec3(0.6, 0.55, 0.9) * max(ring, 0.0) * 0.05;
            gl_FragColor = vec4(mix(wc, uFog, f), 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`},i=new we(new j(520,520),{textureWidth:Math.round(window.innerWidth*.42),textureHeight:Math.round(window.innerHeight*.42),color:new z("#9a98b4"),clipBias:.003,multisample:0,shader:o});i.rotation.x=-Math.PI/2,i.position.set(0,0,-90),this.scene.add(i),this.reflector=i;const s=i.onBeforeRender.bind(i),r=new _e;let n=!1;i.onBeforeRender=(...l)=>{const h=l[2],d=h.matrixWorld.elements.some((w,v)=>Math.abs(w-r.elements[v])>(v>=12?.04:.004));n=!n,!(!d&&n)&&(r.copy(h.matrixWorld),s(...l))};const a=i.material;this.ripples=a.uniforms.uRip.value;let f=3,c=7;this.updaters.push(l=>{if(l<f||!this.ripples)return;f=l+2.2+Math.random()*3.5;const h=this.camera.position;this.ripples[c++%this.ripples.length].set(h.x+(Math.random()-.5)*18,h.z-6-Math.random()*22,l)}),this.updaters.push(l=>{a.uniforms.uTime.value=l,a.uniforms.uFog.value.copy(this.fog.color),a.uniforms.uDensity.value=this.fog.density}),this.disposables.push(i.geometry,a,i.getRenderTarget())}const e=new g(new j(520,520),new W({transparent:!0,depthWrite:!1,uniforms:{uBase:{value:new z(this.high?"#07080c":"#0e1022")},uSolid:{value:this.high?.22:1},uFog:{value:new z},uDensity:{value:.026},uTime:{value:0}},vertexShader:"varying vec3 vW; varying float vD; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vD = -mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:`
          uniform vec3 uBase; uniform float uSolid; uniform vec3 uFog; uniform float uDensity; uniform float uTime; varying vec3 vW; varying float vD;
          void main(){
            vec3 col = uBase;
            if (uSolid > 0.9) {
              float fade = exp(-vD * 0.03);
              float w = sin(vW.z * 4.6 + uTime * 0.9 + sin(vW.x * 0.5 + uTime * 0.3) * 2.5) * sin(vW.x * 2.2 - uTime * 0.5);
              float glint = smoothstep(0.72, 1.0, w) * fade;
              col += vec3(0.05, 0.05, 0.1) * (0.5 + 0.5 * sin(vW.z * 0.6 + uTime * 0.5)) * fade + vec3(0.55, 0.55, 0.85) * glint * 0.22;
            }
            float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
            gl_FragColor = vec4(mix(col, uFog, f), uSolid);
          }
        `}));e.rotation.x=-Math.PI/2,e.position.set(0,.01,-300),this.scene.add(e);const t=e.material;this.updaters.push(()=>{e.position.x=this.camera.position.x,e.position.z=this.camera.position.z,t.uniforms.uFog.value.copy(this.fog.color),t.uniforms.uDensity.value=this.fog.density,t.uniforms.uTime.value=this.clock.elapsedTime})}buildSky(){const e=new W({side:et,depthWrite:!1,fog:!1,uniforms:{uFog:{value:new z},uWater:{value:new z},uTime:{value:0},uMoon:{value:new M(-.3,.2,-.93).normalize()}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }",fragmentShader:`
        uniform vec3 uFog; uniform vec3 uWater; uniform float uTime; uniform vec3 uMoon; varying vec3 vDir;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float n1(float x, float s){ float i = floor(x); float f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(hash(vec2(i, s)), hash(vec2(i + 1.0, s)), f); }
        float n2(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
        float fbm2(vec2 p){ float v = 0.0; float a = 0.5; for (int i = 0; i < 5; i++){ v += n2(p) * a; p *= 2.07; a *= 0.5; } return v; }
        // silhueta de montanha com cristas (ridged fbm): picos recortados e encostas suaves
        float mountain(float a, float freq, float seed){
          float h = 0.0; float w = 0.55; float s = freq;
          for (int i = 0; i < 7; i++){ float n = 1.0 - abs(n1(a * s, seed + float(i)) * 2.0 - 1.0); h += n * n * w; s *= 2.03; w *= 0.48; }
          return h;
        }
        void main(){
          vec3 d = normalize(vDir);
          float y = d.y;
          vec3 zenith = uFog * 0.3 + vec3(0.008, 0.01, 0.026);
          vec3 horizon = uFog * 1.5 + vec3(0.07, 0.065, 0.13);
          vec3 col = mix(horizon, zenith, smoothstep(-0.02, 0.6, y));
          float az = atan(d.z, d.x) + 3.14159;
          // luar espalhado no céu, mais forte perto da lua
          float m = dot(d, uMoon);
          col += vec3(0.2, 0.2, 0.34) * pow(max(m, 0.0), 6.0) * 0.35;
          // estrelas (menos perto da lua e do horizonte)
          vec2 sp = vec2(az * 150.0, asin(clamp(y, -1.0, 1.0)) * 150.0);
          vec2 cell = floor(sp);
          float h = hash(cell);
          float star = step(0.9968, h) * smoothstep(0.45, 0.0, length(fract(sp) - 0.5));
          star *= (0.55 + 0.45 * sin(uTime * (1.0 + h * 3.0) + h * 40.0)) * (1.0 - pow(max(m, 0.0), 40.0));
          col += vec3(0.85, 0.88, 1.0) * star * smoothstep(0.06, 0.4, y);
          // estrela cadente
          float cyc = floor(uTime / 9.0);
          float ph = fract(uTime / 9.0) / 0.1;
          if (ph < 1.0) {
            vec2 sky = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0)));
            float r1 = fract(sin(cyc * 12.9898) * 43758.5453);
            float r2 = fract(sin(cyc * 78.233) * 12345.678);
            vec2 a0 = vec2(-2.3 + r1 * 1.4, 0.5 + r2 * 0.3);
            vec2 a1 = a0 + vec2(0.5, -0.2);
            vec2 head = mix(a0, a1, ph);
            vec2 tail = mix(a0, a1, max(ph - 0.35, 0.0));
            vec2 pa = sky - tail, ba = head - tail;
            float hh = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
            col += vec3(0.95, 0.92, 1.0) * smoothstep(0.003, 0.0, length(pa - ba * hh)) * hh * sin(ph * 3.14159) * 1.4;
          }
          // lua: disco com mares escuros, crateras, borda mais escura e halo
          vec3 right = normalize(cross(uMoon, vec3(0.0, 1.0, 0.0)));
          vec3 up = cross(right, uMoon);
          float R = 0.036;
          vec2 lp = vec2(dot(d, right), dot(d, up)) / R;
          float r = length(lp);
          // halo da lua (o disco agora é uma esfera 3D iluminada de lado)
          float hal = max(r - 1.0, 0.0);
          col += vec3(0.5, 0.5, 0.75) * exp(-hal * 1.6) * 0.16 * step(1.0, r) * step(0.0, m);
          col += vec3(0.3, 0.28, 0.52) * exp(-hal * 0.3) * 0.07 * step(0.0, m);
          // aurora: cortinas lentas de verde-água e lilás no alto do céu
          if (y > 0.1 && y < 0.8) {
            float curtain = smoothstep(0.1, 0.3, y) * smoothstep(0.8, 0.42, y);
            float band = sin(az * 2.0 + uTime * 0.05 + sin(az * 5.0 + uTime * 0.08) * 0.7);
            float rays = n2(vec2(az * 26.0, y * 2.0 - uTime * 0.06));
            vec3 ac = mix(vec3(0.16, 0.5, 0.5), vec3(0.45, 0.33, 0.85), smoothstep(0.2, 0.6, y));
            col += ac * curtain * pow(max(band, 0.0), 2.0) * (0.35 + 0.65 * rays) * 0.3 * (1.0 - pow(max(m, 0.0), 8.0));
          }
          if (y > -0.02 && y < 0.2) {
          // montanhas em três camadas, com névoa entre elas e borda iluminada pela lua
          float moonAz = atan(uMoon.z, uMoon.x) + 3.14159;
          float lit = 0.5 + 0.5 * cos(az - moonAz);
          float far = 0.03 + mountain(az, 2.2, 3.0) * 0.13;
          float mid = 0.012 + mountain(az + 7.0, 3.4, 17.0) * 0.085;
          float near = -0.004 + mountain(az + 19.0, 5.2, 41.0) * 0.05;
          vec3 farCol = mix(horizon * 0.82, vec3(0.32, 0.34, 0.5), 0.25);
          vec3 midCol = horizon * 0.5 + vec3(0.0, 0.004, 0.012);
          vec3 nearCol = horizon * 0.27;
          float fade = smoothstep(-0.06, 0.0, y);
          // camada distante, com topos claros (neve sob a lua)
          float inFar = step(y, far) * fade;
          float snow = smoothstep(far - 0.022, far - 0.002, y) * smoothstep(0.08, 0.13, far) * lit;
          col = mix(col, farCol + vec3(0.14, 0.14, 0.2) * snow, inFar);
          // névoa subindo do lago entre as camadas
          col = mix(col, horizon * 0.95, smoothstep(0.05, 0.0, y) * 0.35 * fade);
          // camada do meio, com borda iluminada
          float inMid = step(y, mid) * fade;
          float rimM = smoothstep(0.006, 0.0, mid - y) * lit;
          col = mix(col, midCol + vec3(0.05, 0.05, 0.09) * rimM, inMid);
          col = mix(col, horizon * 0.8, smoothstep(0.025, 0.0, y) * 0.3 * fade);
          // camada próxima, mais escura e recortada
          float inNear = step(y, near) * fade;
          float rimN = smoothstep(0.004, 0.0, near - y) * lit;
          col = mix(col, nearCol + vec3(0.04, 0.04, 0.08) * rimN, inNear);
          }
          // abaixo do horizonte o céu vira a névoa do lago: a água some nele sem borda
          col = mix(col, uWater, smoothstep(0.0, -0.014, y));
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`}),t=new W({fog:!1,uniforms:{uLight:{value:new M(-.49,.16,.65).normalize()}},vertexShader:"varying vec3 vN; varying vec3 vO; void main(){ vO = normalize(position); vN = normalize((modelMatrix * vec4(normal, 0.0)).xyz); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform vec3 uLight; varying vec3 vN; varying vec3 vO;
        float h3(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
        float n3(vec3 p){ vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(mix(h3(i), h3(i + vec3(1,0,0)), f.x), mix(h3(i + vec3(0,1,0)), h3(i + vec3(1,1,0)), f.x), f.y),
                     mix(mix(h3(i + vec3(0,0,1)), h3(i + vec3(1,0,1)), f.x), mix(h3(i + vec3(0,1,1)), h3(i + vec3(1,1,1)), f.x), f.y), f.z); }
        float fbm(vec3 p){ float v = 0.0; float a = 0.5; for (int i = 0; i < 5; i++){ v += n3(p) * a; p *= 2.1; a *= 0.5; } return v; }
        // crateras: bacias com borda elevada, em células de várias escalas
        float craters(vec3 p){
          float c = 0.0;
          for (int s = 0; s < 3; s++){
            float sc = 4.0 * pow(2.2, float(s));
            vec3 q = p * sc; vec3 i = floor(q);
            vec3 o = vec3(h3(i), h3(i + 3.1), h3(i + 7.7));
            float d = length(fract(q) - o);
            float r = 0.18 + h3(i + 1.3) * 0.22;
            float bowl = smoothstep(r, 0.0, d);
            float rim = smoothstep(r * 1.35, r, d) * smoothstep(r * 0.75, r, d);
            c += (rim * 0.6 - bowl * 0.9) * step(0.45, h3(i + 9.1)) / (1.0 + float(s));
          }
          return c;
        }
        float height(vec3 p){ return fbm(p * 2.2) * 0.6 + craters(p) * 0.35; }
        void main(){
          vec3 p = normalize(vO);
          // relevo: perturba a normal pelo gradiente da altura
          float e = 0.01;
          float h0 = height(p);
          vec3 g = vec3(height(p + vec3(e,0,0)) - h0, height(p + vec3(0,e,0)) - h0, height(p + vec3(0,0,e)) - h0) / e;
          vec3 n = normalize(vN - (g - dot(g, vN) * vN) * 0.06);
          float diff = smoothstep(-0.08, 0.35, dot(n, uLight));
          float maria = smoothstep(0.45, 0.62, fbm(p * 1.4 + 5.0));
          vec3 albedo = vec3(0.86, 0.86, 0.9) * (1.0 - maria * 0.4) * (0.85 + h0 * 0.3);
          vec3 col = albedo * (diff * 0.95 + 0.035);
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`}),o=new g(new Te(1,96,64),t);o.renderOrder=1,o.frustumCulled=!1,this.scene.add(o);const i=e.uniforms.uMoon.value.clone();this.updaters.push(r=>{o.position.copy(this.camera.position).addScaledVector(i,150),o.scale.setScalar(150*.036),o.rotation.y=.6+r*.002});const s=new g(new Te(200,48,24),e);s.frustumCulled=!1,s.renderOrder=-1,this.scene.add(s),this.updaters.push(r=>{s.position.copy(this.camera.position),e.uniforms.uFog.value.copy(this.fogBase),e.uniforms.uWater.value.copy(this.fog.color),e.uniforms.uTime.value=r})}buildMonolith(){this.buildSky();const e=new se;this.scene.add(e);const t=new Mt(1,4),o=t.getAttribute("position"),i=new M;for(let u=0;u<o.count;u++){i.fromBufferAttribute(o,u);const S=Math.sin(i.x*3.1+i.z*1.7)*.08+Math.sin(i.y*5.3+i.x*2.9)*.05+Math.sin(i.z*9.1+i.y*7.7)*.025;i.multiplyScalar(1+S),i.y>.35&&(i.y=.35+(i.y-.35)*.18),o.setXYZ(u,i.x*2.4,i.y*1.6,i.z*1.7)}t.computeVertexNormals();const s=new Float32Array(o.count*3);for(let u=0;u<o.count;u++){i.fromBufferAttribute(o,u);const S=.75+.25*Math.sin(i.x*4.7+i.z*3.3)*Math.sin(i.y*6.1+i.x*1.3)+(Math.random()-.5)*.12,_=X.smoothstep(i.y,-.2,.25)*.12;s.set([S-_*.5,S+_*.2,S-_*.3],u*3)}t.setAttribute("color",new V(s,3));const r=new g(t,new H({color:"#1c1d26",roughness:.92,metalness:0,vertexColors:!0,flatShading:!0}));r.position.set(0,.15,0),e.add(r),[[-2.6,.9,.6],[2.4,1.6,.45],[-1.2,-1.9,.35],[3.4,-.8,.3]].forEach(([u,S,_])=>{const F=new g(t,r.material);F.scale.setScalar(_),F.position.set(u,.05,S),F.rotation.y=u*2,e.add(F)});const n=new he("#ffb36b",0,14,1.6),{screen:a,flame:f,light:c}=this.buildProps(e,r);n.position.copy(c),e.add(n);const l=new he("#d8ccff",0,7,1.6);this.scene.add(l);let h=0,m=0;const d=new M(1e3,0,0);this.updaters.push(u=>{const S=this.waterPoint(this.pointer),_=this.cur.pz>-40&&S;l.intensity+=((_?9:0)-l.intensity)*.08,S&&(l.position.set(S.x,.9,S.z),this.ripples&&u-h>.12&&S.distanceTo(d)>.7&&this.pointerMoved&&(this.ripples[m%this.ripples.length].set(S.x,S.z,u),m++,h=u,d.copy(S))),this.pointerMoved=!1;for(let F=this.released.length-1;F>=0;F--){const B=this.released[F],ee=u-B.userData.t0;B.userData.t0<0&&(B.userData.t0=u),B.position.y=B.userData.y0+ee*.7,B.position.x+=Math.sin(u*.6+B.userData.s)*.004,B.rotation.y=u*.3,ee>22&&(this.scene.remove(B),this.released.splice(F,1))}}),this.scene.add(new Ge("#7d7fc8","#0b0e18",.55));const w=new Tt("#b8c4ff",.9);w.position.set(-8,10,-12),this.scene.add(w);const v=this.high?140:60,p=new Float32Array(v*3),P=new Float32Array(v);for(let u=0;u<v;u++)p.set([(Math.random()-.5)*18,.4+Math.random()*3.5,(Math.random()-.5)*12-1],u*3),P[u]=Math.random();const D=new ge;D.setAttribute("position",new V(p,3)),D.setAttribute("aR",new V(P,1));const U=new W({transparent:!0,depthWrite:!1,blending:k,uniforms:{uTime:{value:0},uPixel:{value:1},uI:{value:0}},vertexShader:`
        uniform float uTime; uniform float uPixel; attribute float aR; varying float vA;
        void main(){
          vec3 p = position;
          float t = uTime * (0.25 + aR * 0.35) + aR * 60.0;
          p += vec3(sin(t) * 0.8, sin(t * 1.7) * 0.35, cos(t * 0.8) * 0.8);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (2.0 + aR * 2.5) * uPixel * 18.0 / -mv.z;
          vA = pow(0.5 + 0.5 * sin(uTime * (1.2 + aR * 2.0) + aR * 30.0), 3.0);
        }`,fragmentShader:`
        uniform float uI; varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vec3(1.0, 0.85, 0.45) * 1.6, a * vA * uI);
        }`}),y=new ve(D,U);y.frustumCulled=!1,e.add(y);let A=this.reducedIntro?1:0,I=!1;const T=u=>{const S=X.smoothstep(u,.1,.5);n.intensity=13*S,f.scale.setScalar(Math.max(1e-4,S)).setY(Math.max(1e-4,S*1.6)),a.color.setScalar(.85*X.smoothstep(u,.45,.8)),U.uniforms.uI.value=X.smoothstep(u,.6,1)};T(A),this.introStart=()=>{A=0,I=!0},this.introSkip=()=>{A=1,I=!1,T(1)};const q=[];e.traverse(u=>{u!==e&&(u.isMesh||u.isPoints)&&q.push(u)});let L=!0;this.updaters.push((u,S)=>{const _=this.camera.position.z>-115;if(_!==L&&(L=_,q.forEach(F=>F.visible=_)),!!_){if(I&&A<1&&(A=Math.min(1,A+S/3),T(A)),A>=1){const F=1+Math.sin(u*9.3)*.06+Math.sin(u*23.7)*.04+Math.sin(u*3.1)*.05;n.intensity=13*F,f.scale.set(F,1.6*F,F)}U.uniforms.uTime.value=u,U.uniforms.uPixel.value=this.renderer.getPixelRatio()}})}buildProps(e,t){t.updateMatrixWorld(!0);const o=new Ve,i=new M(0,-1,0),s=(R,b)=>{var C;return o.set(new M(R,10,b),i),((C=o.intersectObject(t,!1)[0])==null?void 0:C.point.y)??.8},r=(R,b,C)=>Math.max(s(R,b),s(R+C,b),s(R-C,b),s(R,b+C),s(R,b-C)),n=r(-.35,.1,.6),a=r(1.25,-.25,.2),f=Ce();this.disposables.push(f);const c=document.createElement("canvas");c.width=c.height=128;const l=c.getContext("2d"),h=l.createRadialGradient(64,64,0,64,64,64);h.addColorStop(0,"rgba(0,0,0,0.75)"),h.addColorStop(.55,"rgba(0,0,0,0.35)"),h.addColorStop(1,"rgba(0,0,0,0)"),l.fillStyle=h,l.fillRect(0,0,128,128);const m=new De(c);this.disposables.push(m);const d=(R,b,C,me,Y=0)=>{const ie=new g(new j(R,b),new G({map:m,transparent:!0,depthWrite:!1,color:0,opacity:.85}));ie.rotation.set(-Math.PI/2,0,Y),ie.position.set(C,s(C,me)+.006,me),e.add(ie)},w=new se,v=new H({color:"#2a2d3a",metalness:.55,roughness:.38}),p=new g(new Ze(1.62,.06,1.1,3,.028),v);p.position.y=.03,w.add(p);const P=document.createElement("canvas");P.width=512,P.height=200;const D=P.getContext("2d");D.fillStyle="#14151c",D.fillRect(0,0,512,200),[14,14,13,12,10].forEach((R,b)=>{const C=35.06849315068493,me=(14-R)*C*.5;for(let Y=0;Y<R;Y++){const ie=6+me+Y*C,Oe=8+b*37,Le=b===4&&Y===4?C*4.2:C-5;b===4&&Y>4&&Y<8||(D.fillStyle="#0b0c11",D.fillRect(ie,Oe,Le,31),D.fillStyle="rgba(165,150,242,0.22)",D.fillRect(ie+1,Oe+29,Le-2,2))}});const y=new De(P);y.colorSpace=Ae,y.anisotropy=4,this.disposables.push(y);const A=new g(new j(1.4,.52),new H({map:y,roughness:.7,metalness:.1}));A.rotation.x=-Math.PI/2,A.position.set(0,.0605,-.13),w.add(A);const I=new g(new j(.52,.3),new H({color:"#343846",metalness:.4,roughness:.3}));I.rotation.x=-Math.PI/2,I.position.set(0,.0605,.33),w.add(I);const T=new se;T.position.set(0,.06,-.54),T.rotation.x=-.32,w.add(T);const q=new g(new Ze(1.62,1.06,.04,3,.018),v);q.position.set(0,.53,-.02),T.add(q);const L=new g(new j(1.56,1),new G({color:"#07080b"}));L.position.set(0,.53,.0015),T.add(L);const u=new G({map:this.screenTextures[0],toneMapped:!1,color:new z(.85,.85,.9)}),S=new g(new j(1.48,.925),u);S.position.set(0,.54,.002),T.add(S);const _=new G({map:this.screenTextures[0],toneMapped:!1,transparent:!0,opacity:0,color:new z(.85,.85,.9)}),F=new g(S.geometry,_);F.position.set(0,.54,.0028),T.add(F);let B=0,ee=0;this.updaters.push((R,b)=>{ee+=b,ee>4.5&&this.screenTextures.length>1&&(_.opacity===0&&(_.map=this.screenTextures[(B+1)%this.screenTextures.length]),_.opacity=Math.min(1,_.opacity+b*1.6),_.color.copy(u.color),_.opacity>=1&&(B=(B+1)%this.screenTextures.length,u.map=this.screenTextures[B],_.opacity=0,ee=0))});const Ue=new je(new He(new j(1.6,1.04)),new Qe({color:ae,transparent:!0,opacity:.35}));Ue.position.set(0,.53,5e-4),T.add(Ue);const fe=new ne(new le({map:f,color:"#8f86ff",transparent:!0,opacity:.32,depthWrite:!1,blending:k}));fe.scale.set(2.6,1.6,1),fe.position.set(0,.5,.4),T.add(fe),w.position.set(-.35,n,.1),w.rotation.y=.35,e.add(w),d(2.3,1.7,-.35,.05,-.35);const N=new se,de=new H({color:"#3a302a",metalness:.7,roughness:.42}),Be=new H({color:"#8a6a3a",metalness:.8,roughness:.35}),Ie=new g(new K(.2,.22,.08,24),de);Ie.position.y=.04,N.add(Ie);const ye=new g(new Ye(.19,.012,8,32),Be);ye.rotation.x=Math.PI/2,ye.position.y=.085,N.add(ye);const be=new g(new K(.145,.16,.42,24,1,!0),new G({color:new z(1,.62,.32),transparent:!0,opacity:.22,blending:k,depthWrite:!1,side:Se}));be.position.y=.3,N.add(be);for(let R=0;R<4;R++){const b=R/4*Math.PI*2+Math.PI/4,C=new g(new K(.011,.011,.46,6),de);C.position.set(Math.cos(b)*.175,.3,Math.sin(b)*.175),N.add(C)}const We=new g(new K(.07,.21,.13,24),de);We.position.y=.58,N.add(We);const Ne=new g(new K(.045,.06,.08,16),Be);Ne.position.y=.68,N.add(Ne);const Me=new g(new Ye(.17,.011,8,32,Math.PI),de);Me.position.y=.66,Me.rotation.y=Math.PI/2,N.add(Me);const te=new g(new Te(.05,12,10),new G({color:new z(3,1.8,.8),toneMapped:!1}));te.scale.y=1.6,te.position.y=.3,N.add(te);const pe=new ne(new le({map:f,color:"#ffae5c",transparent:!0,opacity:.6,depthWrite:!1,blending:k}));pe.scale.set(.95,.95,1),pe.position.y=.32,N.add(pe);const nt=Array.from({length:5},(R,b)=>{const C=new ne(new le({map:f,color:"#ffd9a0",transparent:!0,opacity:.9,depthWrite:!1,blending:k}));return C.scale.setScalar(.06+b%2*.03),N.add(C),{sp:C,r:.28+Math.random()*.22,s:.9+Math.random()*1.4,p:Math.random()*6.28,h:Math.random()*.3}});this.updaters.push(R=>{for(const b of nt){const C=R*b.s+b.p;b.sp.position.set(Math.cos(C)*b.r,.36+b.h+Math.sin(C*2.3)*.08,Math.sin(C)*b.r*.8),b.sp.material.opacity=(.5+.5*Math.sin(C*3.1))*Math.min(1,te.scale.x)}}),N.position.set(1.25,a,-.25),N.scale.setScalar(1.25),e.add(N),d(1.1,1.1,1.25,-.25),this.updaters.push(()=>{const R=Math.min(1,te.scale.x);pe.material.opacity=.6*R,be.material.opacity=.08+.18*R,fe.material.opacity=.32*(u.color.r/.85)});const lt=new M(1.25,a+.32*1.25,-.25);return{screen:u,flame:te,light:lt}}buildCorridor(){const e=this.high?270:120,t=new K(.2,.15,.42,10,1,!0),o=new Float32Array(e*4),i=ze(11);for(let l=0;l<e;l++)o.set([(i()-.5)*34,-15-i()*160,i(),i()],l*4);const s=new qe;s.index=t.index,s.setAttribute("position",t.getAttribute("position")),s.setAttribute("uv",t.getAttribute("uv")),s.setAttribute("aSeed",new Xe(o,4)),s.instanceCount=e;const r=`
      uniform float uTime;
      attribute vec4 aSeed;
      vec3 lanternPos(){
        float rise = mod(aSeed.z * 22.0 + uTime * (0.35 + aSeed.w * 0.35), 22.0);
        return vec3(aSeed.x + sin(uTime * 0.3 + aSeed.w * 20.0) * 0.6, 0.6 + rise, aSeed.y + cos(uTime * 0.25 + aSeed.z * 30.0) * 0.6);
      }`;this.lanternMat=new W({side:Se,uniforms:{uTime:{value:0},uFog:{value:new z},uDensity:{value:.026},uI:{value:0}},vertexShader:r+`
        varying vec2 vUv; varying float vD; varying float vF;
        void main(){
          vec3 p = position * (0.85 + aSeed.w * 0.5) + lanternPos();
          vec4 mv = viewMatrix * vec4(p, 1.0);
          vD = -mv.z; vUv = uv;
          vF = 0.8 + 0.2 * sin(uTime * (6.0 + aSeed.z * 5.0) + aSeed.w * 40.0);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform vec3 uFog; uniform float uDensity; uniform float uI; varying vec2 vUv; varying float vD; varying float vF;
        void main(){
          // papel: mais claro em baixo (onde está a chama), bordas mais escuras
          float glow = mix(1.6, 0.55, vUv.y) * vF;
          float edge = smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
          vec3 col = vec3(1.0, 0.56, 0.24) * glow * (0.55 + edge * 0.45) * uI;
          float f = 1.0 - exp(-uDensity * uDensity * vD * vD * 0.5);
          gl_FragColor = vec4(mix(col, uFog, f), uI);
        }`}),this.lanternMat.transparent=!0;const n=new g(s,this.lanternMat);n.frustumCulled=!1;const a=new qe;a.setAttribute("position",new Re([0,0,0],3)),a.setAttribute("aSeed",new Xe(o,4)),a.instanceCount=e,this.haloMat=new W({transparent:!0,depthWrite:!1,blending:k,uniforms:{uTime:{value:0},uPixel:{value:1},uI:{value:0}},vertexShader:r+`
        uniform float uPixel; varying float vD;
        void main(){
          vec4 mv = viewMatrix * vec4(lanternPos(), 1.0);
          vD = -mv.z;
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixel * 90.0 / max(vD, 1.0);
        }`,fragmentShader:`
        uniform float uI; varying float vD;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = pow(smoothstep(0.5, 0.0, d), 2.2) * 0.55 * uI * exp(-vD * 0.012);
          gl_FragColor = vec4(1.0, 0.62, 0.3, a);
        }`});const f=new ve(a,this.haloMat);f.frustumCulled=!1,this.scene.add(n,f),this.corridor.push(n,f);const c=new he("#ff9a52",30,60,1.4);c.position.set(0,8,-90),this.scene.add(c),this.disposables.push(t)}buildGallery(){const e=new H({color:"#101219",metalness:.9,roughness:.3,envMapIntensity:.4}),t=new Qe({color:ae,transparent:!0,opacity:.7}),o=Ce();this.disposables.push(o),rt.forEach((i,s)=>{const r=new se;r.position.set(i.x,i.y,i.z),r.rotation.y=i.rotY;const n=7.4,a=4.6,f=new g(new xe(n+.3,a+.3,.22),e);f.position.z=-.14;const c=this.screenTextures[s],l=c.image;if(l!=null&&l.width){const p=l.width/l.height,P=n/a;p>P?(c.repeat.set(P/p,1),c.offset.set((1-P/p)/2,0)):(c.repeat.set(1,p/P),c.offset.set(0,(1-p/P)/2))}const h=new g(new j(n,a),new G({map:c,toneMapped:!1,color:new z(.62,.62,.68)}));h.userData.index=s,this.screens.push(h);const m=new je(new He(new xe(n+.3,a+.3,.22)),t);m.position.z=-.14;const d=new ne(new le({map:o,color:ae,transparent:!0,opacity:.25,depthWrite:!1,blending:k}));d.scale.set(16,11,1),d.position.z=-1.2,r.add(d,f,h,m),this.scene.add(r);const w=i.y,v=new E;this.updaters.push(p=>{const P=this.camera.position.z-i.z;if(r.visible=P<120&&P>-30,!r.visible)return;r.position.y=w+Math.sin(p*.8+s)*.18;const D=X.smoothstep(P,13,34),U=this.hovered===s;v.lerp(U?this.pointerCur:new E,.08),r.rotation.y=i.rotY+D*(i.x<0?1.25:-1.25)+v.x*.22,r.rotation.x=-v.y*.16,r.scale.setScalar((1-D*.25)*(1+(U?.03:0))),r.rotation.z=Math.sin(p*.5+s*2)*.012;const y=h.material,A=U?.95:.62;y.color.r+=(A-y.color.r)*.1,y.color.g=y.color.r,y.color.b=y.color.r+.05,d.material.opacity+=((U?.55:.25)-d.material.opacity)*.1})})}buildCore(){const e=this.high?9e3:3600,t=new Float32Array(e*3),o=new Float32Array(e*3),i=new Float32Array(e*3),s=new Float32Array(e),r=new Float32Array(e),n=ze(42),a=Pt(_t,e,n),f=.27;for(let m=0;m<e;m++){const d=m+.5,w=Math.acos(1-2*d/e),v=Math.PI*(1+Math.sqrt(5))*d,p=m%5===0?5.6*Math.cbrt(n()):5.6;t.set([p*Math.cos(v)*Math.sin(w),p*Math.sin(v)*Math.sin(w),p*Math.cos(w)],m*3);const P=n()*2-1,D=n()*2-1;o.set([P*13,D*.25,D*3.2],m*3);const[U,y,A]=a[m%a.length],I=zt(U,y,f);i.set([I.x,I.y-5.9,(n()-.5)*.7],m*3),s[m]=n(),r[m]=A==="cyan"?2:A==="white"||n()<.12?1:0}const c=new ge;c.setAttribute("position",new V(t,3)),c.setAttribute("aB",new V(o,3)),c.setAttribute("aC",new V(i,3)),c.setAttribute("aR",new V(s,1)),c.setAttribute("aT",new V(r,1)),this.particleMat=new W({transparent:!0,depthWrite:!1,blending:k,uniforms:{uTime:{value:0},uMorph:{value:0},uPixel:{value:1},uEnergy:{value:1},uPurple:{value:ae},uCyan:{value:Ot},uPointer:{value:new E}},vertexShader:`
        uniform float uTime; uniform float uMorph; uniform float uPixel; uniform float uEnergy; uniform vec2 uPointer;
        attribute vec3 aB; attribute vec3 aC; attribute float aR; attribute float aT;
        varying float vT; varying float vA;
        void main(){
          float m1 = smoothstep(0.0, 1.0, clamp(uMorph, 0.0, 1.0));
          float m2 = smoothstep(0.0, 1.0, clamp(uMorph - 1.0, 0.0, 1.0));
          vec3 b = aB;
          b.y += sin(b.x * 0.45 + uTime * 0.9) * 1.6 + sin(b.z * 0.9 + b.x * 0.2 + uTime * 1.3) * 0.5;
          b.z += cos(b.x * 0.3 + uTime * 0.6) * 1.2;
          vec3 p = mix(mix(position, b, m1), aC, m2);
          // turbulência: mais forte no meio de cada transição
          float chaos = sin(m1 * 3.14159) + sin(m2 * 3.14159);
          float t = uTime * (0.4 + aR * 0.6);
          p += vec3(sin(t + aR * 40.0), cos(t * 1.3 + aR * 20.0), sin(t * 0.7 + aR * 60.0)) * (0.05 + chaos * 1.6 * aR);
          // as órbitas giram
          float ang = 0.0;
          p.xz = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p.xz;
          p.xy += uPointer * 0.6 * (1.0 - m2) * aR;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (aT > 1.5 ? 3.0 : 1.4 + aR * 1.8) * uPixel * uEnergy * 22.0 / -mv.z;
          vT = aT;
          vA = (0.55 + 0.45 * sin(uTime * 2.0 + aR * 30.0)) * (1.0 - smoothstep(55.0, 110.0, -mv.z));
        }`,fragmentShader:`
        uniform vec3 uPurple; uniform vec3 uCyan; varying float vT; varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 col = vT > 1.5 ? uCyan * 1.6 : (vT > 0.5 ? vec3(0.9, 0.92, 1.0) : uPurple * 1.4);
          gl_FragColor = vec4(col * 1.25, a * vA);
        }`});const l=new ve(c,this.particleMat);l.position.set(0,6,Q),l.frustumCulled=!1,this.scene.add(l),this.updaters.push(()=>l.visible=this.camera.position.z<Q+125);const h=new he(ae,60,30,1.5);h.position.set(0,6,Q),this.scene.add(h)}buildDust(){const e=this.high?3e3:1200,t=new Float32Array(e*3),o=new Float32Array(e),i=ze(3);for(let a=0;a<e;a++)t.set([(i()-.5)*50,i()*18,30-i()*460],a*3),o[a]=i();const s=new ge;s.setAttribute("position",new V(t,3)),s.setAttribute("aR",new V(o,1));const r=new W({transparent:!0,depthWrite:!1,blending:k,uniforms:{uTime:{value:0},uPixel:{value:1},uPurple:{value:ae}},vertexShader:`
        uniform float uTime; uniform float uPixel; attribute float aR; varying float vR; varying float vD;
        void main(){
          vec3 p = position;
          p.y = mod(p.y + uTime * (0.1 + aR * 0.25), 18.0);
          p.x += sin(uTime * 0.3 + aR * 50.0) * 0.6;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vD = -mv.z;
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (0.6 + aR * 1.6) * uPixel * 12.0 / -mv.z;
          vR = aR;
        }`,fragmentShader:`
        uniform vec3 uPurple; varying float vR; varying float vD;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d) * exp(-vD * 0.04);
          vec3 col = vR > 0.8 ? uPurple * 1.5 : vec3(0.8, 0.82, 0.9);
          gl_FragColor = vec4(col, a * 0.55);
        }`}),n=new ve(s,r);n.frustumCulled=!1,this.scene.add(n),this.updaters.push(a=>{r.uniforms.uTime.value=a,r.uniforms.uPixel.value=this.renderer.getPixelRatio()})}setVelocity(e){this.velocity=Math.max(this.velocity,Math.min(1,Math.abs(e)/60))}waterPoint(e){this.raycaster.setFromCamera(e,this.camera);const t=this.raycaster.ray.intersectPlane(this.waterPlane,this.hitV);return t&&t.distanceTo(this.camera.position)<60?t:null}releaseLantern(e,t){const o=new E(e/window.innerWidth*2-1,-(t/window.innerHeight)*2+1),i=this.waterPoint(o);if(!i||this.released.length>40)return!1;const s=this.camera.position,r=new M(i.x-s.x,0,i.z-s.z);r.length()<10&&(r.setLength(10),i.set(s.x+r.x,0,s.z+r.z));const n=new se,a=new g(new K(.26,.2,.55,12,1,!0),new G({color:new z(2.2,1.2,.5),side:Se,toneMapped:!1,transparent:!0,opacity:.92})),f=new ne(new le({map:this.lanternHalo,color:"#ffae5c",transparent:!0,opacity:.6,depthWrite:!1,blending:k}));return f.scale.setScalar(2.4),n.add(a,f),n.position.set(i.x,.4,i.z),n.scale.setScalar(.75),n.userData={t0:-1,y0:.4,s:Math.random()*10},this.scene.add(n),this.released.push(n),this.ripples&&this.ripples[Math.floor(Math.random()*10)].set(i.x,i.z,this.clock.elapsedTime),!0}get pixelate(){return this.finalPass.uniforms.uPx.value}set pixelate(e){this.finalPass.uniforms.uPx.value=e}setPointer(e,t){this.pointerMoved=!0,this.pointer.set(e,t)}pick(e,t){const o=new E(e/window.innerWidth*2-1,-(t/window.innerHeight)*2+1);this.raycaster.setFromCamera(o,this.camera);const i=this.raycaster.intersectObjects(this.screens,!1)[0];return i&&i.distance<30?i.object.userData.index:-1}start(){this.running||(this.started||(Object.assign(this.cur,this.rig),this.started=!0),this.running=!0,this.clock.getDelta(),this.loop())}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderOnce(){Object.assign(this.cur,this.rig),this.apply(1.5,0),this.composer.render()}adapt(){const e=this.renderer.getPixelRatio();this.fps<48?this.slow++:this.fps>58&&this.slow--;let t=e;this.slow>=2&&e>.75&&(t=Math.max(.75,e-.25)),this.slow<=-6&&e<this.dprMax&&(t=Math.min(this.dprMax,e+.25)),t!==e&&(this.slow=0,this.renderer.setPixelRatio(t),this.composer.setPixelRatio(t),this.resize())}apply(e,t){const o=this.cur,i=this.pointerCur;this.camera.position.set(o.px+i.x*1.5,o.py+i.y*.8,o.pz),this.look.set(o.lx+i.x*.4,o.ly+i.y*.3,o.lz),this.camera.up.set(Math.sin(o.roll),Math.cos(o.roll),0),this.camera.lookAt(this.look);const s=Math.max(0,Math.min(Pe.length-1.001,o.fog)),r=Math.floor(s);this.fogBase.copy(Pe[r]).lerp(Pe[r+1],s-r),this.fog.color.copy(this.fogBase).multiplyScalar(1.6).add(Lt),this.scene.background.copy(this.fog.color),this.fog.density=.026+Math.sin(Math.min(s,3)*Math.PI)*.004;const n=X.smoothstep(-o.pz,-6,4)*(1-X.smoothstep(-o.pz,215,285));this.lanternMat.uniforms.uTime.value=e,this.lanternMat.uniforms.uFog.value.copy(this.fog.color),this.lanternMat.uniforms.uDensity.value=this.fog.density,this.lanternMat.uniforms.uI.value=n,this.haloMat.uniforms.uTime.value=e,this.haloMat.uniforms.uPixel.value=this.renderer.getPixelRatio(),this.haloMat.uniforms.uI.value=n,this.velocity*=.92;const f=(this.camera.aspect<.8?58:40)+Math.min(this.velocity,1)*9;Math.abs(this.camera.fov-f)>.01&&(this.camera.fov+=(f-this.camera.fov)*.12,this.camera.updateProjectionMatrix()),this.particleMat.uniforms.uTime.value=e,this.particleMat.uniforms.uMorph.value=o.morph,this.particleMat.uniforms.uEnergy.value=o.energy,this.particleMat.uniforms.uPixel.value=this.renderer.getPixelRatio(),this.particleMat.uniforms.uPointer.value.copy(i),this.finalPass.uniforms.uTime.value=e,this.finalPass.uniforms.uGlitch.value=o.glitch*.35,this.bloom&&(this.bloom.strength=.38+o.glitch*.4),this.reflector&&(this.reflector.position.x=this.camera.position.x,this.reflector.position.z=this.camera.position.z),this.corridor.forEach(c=>c.visible=n>.002),this.tmpV.copy(this.camera.position);for(const c of this.updaters)c(e,t)}dispose(){this.stop(),window.removeEventListener("resize",this.resize),document.removeEventListener("visibilitychange",this.onVisibility),this.scene.traverse(e=>{var i;const t=e;(i=t.geometry)==null||i.dispose();const o=t.material;Array.isArray(o)?o.forEach(s=>s.dispose()):o&&(Object.values(o).forEach(s=>s instanceof St&&s.dispose()),o.dispose())}),this.disposables.forEach(e=>e.dispose()),this.composer.dispose(),this.renderer.dispose()}}function ze(x){let e=x;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}export{Q as CORE_Z,$e as KEYS,rt as SLOTS,jt as World};
