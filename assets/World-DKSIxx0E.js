import{b as Me,B as L,M as H,c as ye,P as k,d as w,e as G,f as be,g as S,h as Re,i as x,j as te,k as pe,W as Y,H as K,l as F,U as X,O as ze,m as he,F as de,V as D,N as Ae,n as Te,A as ee,R as Fe,o as Ee,p as Be,L as Ue,q as Ie,r as Ne,s as Se,t as Oe,u as We,v as Le,w as ke,x as Ge,S as Ve,y as je,z as Qe,D as $,E as ie,G as ae,I as He,J as Ye,K as Ke,Q as oe,X as me,Y as Xe,Z as ve,_ as Ze,$ as qe,a0 as $e,a1 as Je,a2 as et,a3 as tt,a4 as st,a5 as it,a6 as N,a7 as ge,a as at,a8 as re}from"./three-DnCGgHHP.js";import{h as ot,n as rt,s as nt,t as lt,L as ht}from"./index-oJRbavsE.js";import"./gsap-DjKJqAo0.js";class ut extends Me{constructor(){super();const e=new L;e.deleteAttribute("uv");const t=new H({side:ye}),s=new H,a=new k(16777215,900,28,2);a.position.set(.418,16.199,.3),this.add(a);const i=new w(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);const o=new w(e,s);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const r=new w(e,s);r.position.set(-5.607,-.754,-.758),r.rotation.set(0,.994,0),r.scale.set(1.97,1.534,3.955),this.add(r);const n=new w(e,s);n.position.set(6.167,.857,7.803),n.rotation.set(0,.561,0),n.scale.set(3.927,6.285,3.687),this.add(n);const y=new w(e,s);y.position.set(-2.017,.018,6.124),y.rotation.set(0,.333,0),y.scale.set(2.002,4.566,2.064),this.add(y);const h=new w(e,s);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const l=new w(e,s);l.position.set(-2.193,-.369,-5.547),l.rotation.set(0,.516,0),l.scale.set(3.875,3.487,2.986),this.add(l);const u=new w(e,W(50));u.position.set(-16.116,14.37,8.208),u.scale.set(.1,2.428,2.739),this.add(u);const c=new w(e,W(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const T=new w(e,W(17));T.position.set(14.904,12.198,-1.832),T.scale.set(.15,4.265,6.331),this.add(T);const M=new w(e,W(43));M.position.set(-.462,8.89,14.52),M.scale.set(4.38,5.441,.088),this.add(M);const p=new w(e,W(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);const m=new w(e,W(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function W(g){const e=new G;return e.color.setScalar(g),e}class se extends w{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new be;const s=this,a=t.color!==void 0?new S(t.color):new S(8355711),i=t.textureWidth||512,o=t.textureHeight||512,r=t.clipBias||0,n=t.shader||se.ReflectorShader,y=t.multisample!==void 0?t.multisample:4,h=new Re,l=new x,u=new x,c=new x,T=new te,M=new x(0,0,-1),p=new pe,m=new x,b=new x,_=new pe,v=new te,f=this.camera,R=new Y(i,o,{samples:y,type:K}),P=new F({name:n.name!==void 0?n.name:"unspecified",uniforms:X.clone(n.uniforms),fragmentShader:n.fragmentShader,vertexShader:n.vertexShader});P.uniforms.tDiffuse.value=R.texture,P.uniforms.color.value=a,P.uniforms.textureMatrix.value=v,this.material=P,this.onBeforeRender=function(d,C,A){if(u.setFromMatrixPosition(s.matrixWorld),c.setFromMatrixPosition(A.matrixWorld),T.extractRotation(s.matrixWorld),l.set(0,0,1),l.applyMatrix4(T),m.subVectors(u,c),m.dot(l)>0)return;m.reflect(l).negate(),m.add(u),T.extractRotation(A.matrixWorld),M.set(0,0,-1),M.applyMatrix4(T),M.add(c),b.subVectors(u,M),b.reflect(l).negate(),b.add(u),f.position.copy(m),f.up.set(0,1,0),f.up.applyMatrix4(T),f.up.reflect(l),f.lookAt(b),f.far=A.far,f.updateMatrixWorld(),f.projectionMatrix.copy(A.projectionMatrix),v.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),v.multiply(f.projectionMatrix),v.multiply(f.matrixWorldInverse),v.multiply(s.matrixWorld),h.setFromNormalAndCoplanarPoint(l,u),h.applyMatrix4(f.matrixWorldInverse),p.set(h.normal.x,h.normal.y,h.normal.z,h.constant);const z=f.projectionMatrix;_.x=(Math.sign(p.x)+z.elements[8])/z.elements[0],_.y=(Math.sign(p.y)+z.elements[9])/z.elements[5],_.z=-1,_.w=(1+z.elements[10])/z.elements[14],p.multiplyScalar(2/p.dot(_)),z.elements[2]=p.x,z.elements[6]=p.y,z.elements[10]=p.z+1-r,z.elements[14]=p.w,s.visible=!1;const Z=d.getRenderTarget(),q=d.xr.enabled,O=d.shadowMap.autoUpdate;d.xr.enabled=!1,d.shadowMap.autoUpdate=!1,d.setRenderTarget(R),d.state.buffers.depth.setMask(!0),d.autoClear===!1&&d.clear(),d.render(C,f),d.xr.enabled=q,d.shadowMap.autoUpdate=O,d.setRenderTarget(Z);const Q=A.viewport;Q!==void 0&&d.state.viewport(Q),s.visible=!0},this.getRenderTarget=function(){return R},this.dispose=function(){R.dispose(),s.material.dispose()}}}se.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};const Ce={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class j{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ct=new ze(-1,1,1,-1,0,1);class ft extends he{constructor(){super(),this.setAttribute("position",new de([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new de([0,2,0,0,2,0],2))}}const pt=new ft;class ce{constructor(e){this._mesh=new w(pt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ct)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ue extends j{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof F?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=X.clone(e.uniforms),this.material=new F({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ce(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class xe extends j{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const a=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let o,r;this.inverse?(o=0,r=1):(o=1,r=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),i.buffers.stencil.setFunc(a.ALWAYS,o,4294967295),i.buffers.stencil.setClear(r),i.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(a.EQUAL,1,4294967295),i.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),i.buffers.stencil.setLocked(!0)}}class dt extends j{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class mt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const s=e.getSize(new D);this._width=s.width,this._height=s.height,t=new Y(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:K}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ue(Ce),this.copyPass.material.blending=Ae,this.clock=new Te}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let a=0,i=this.passes.length;a<i;a++){const o=this.passes[a];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),o.needsSwap){if(s){const r=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}xe!==void 0&&(o instanceof xe?s=!0:o instanceof dt&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new D);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(s,a),this.renderTarget2.setSize(s,a);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(s,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class vt extends j{constructor(e,t,s=null,a=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=a,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new S}render(e,t,s){const a=e.autoClear;e.autoClear=!1;let i,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=a}}const gt={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new S(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class V extends j{constructor(e,t,s,a){super(),this.strength=t!==void 0?t:1,this.radius=s,this.threshold=a,this.resolution=e!==void 0?new D(e.x,e.y):new D(256,256),this.clearColor=new S(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Y(i,o,{type:K}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let l=0;l<this.nMips;l++){const u=new Y(i,o,{type:K});u.texture.name="UnrealBloomPass.h"+l,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const c=new Y(i,o,{type:K});c.texture.name="UnrealBloomPass.v"+l,c.texture.generateMipmaps=!1,this.renderTargetsVertical.push(c),i=Math.round(i/2),o=Math.round(o/2)}const r=gt;this.highPassUniforms=X.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new F({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const n=[3,5,7,9,11];i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let l=0;l<this.nMips;l++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(n[l])),this.separableBlurMaterials[l].uniforms.invSize.value=new D(1/i,1/o),i=Math.round(i/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const y=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=y,this.bloomTintColors=[new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Ce;this.copyUniforms=X.clone(h.uniforms),this.blendMaterial=new F({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:ee,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new S,this.oldClearAlpha=1,this.basic=new G,this.fsQuad=new ce(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let s=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(s,a);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(s,a),this.renderTargetsVertical[i].setSize(s,a),this.separableBlurMaterials[i].uniforms.invSize.value=new D(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2)}render(e,t,s,a,i){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let r=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this.fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[n].uniforms.direction.value=V.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[n]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=V.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[n]),e.clear(),this.fsQuad.render(e),r=this.renderTargetsVertical[n];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(e*e))/e);return new F({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new D(.5,.5)},direction:{value:new D(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new F({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}V.BlurDirectionX=new D(1,0);V.BlurDirectionY=new D(0,1);const xt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class wt extends j{constructor(){super();const e=xt;this.uniforms=X.clone(e.uniforms),this.material=new Fe({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ce(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ee.getTransfer(this._outputColorSpace)===Be&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ue?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ie?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ne?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Se?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Oe?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===We&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const E=new S("#9d8cf0"),J=new S("#8fd3df"),Mt=new S(.055,.046,.1),ne=["#0a0d14","#0c1019","#0b1318","#13132a","#0a0c12"].map(g=>new S(g)),B=-400,_e=Array.from({length:5},(g,e)=>{const t=e%2===0?-3.6:3.6;return{x:t,y:4.3,z:-205-e*34,rotY:t<0?.32:-.32}}),we={hero:{px:-4.2,py:3.4,pz:27,lx:-4.6,ly:4.8,lz:0,roll:0,fog:0,glitch:0,morph:0,energy:1},over:{px:0,py:13.5,pz:-8,lx:0,ly:4,lz:-48,roll:0,fog:.6,glitch:0,morph:0,energy:1},corridor:{px:0,py:3.2,pz:-150,lx:0,ly:3.4,lz:-200,roll:.04,fog:1,glitch:0,morph:0,energy:1.2},...Object.fromEntries(_e.map((g,e)=>[`p${e}`,{px:g.x*.22,py:g.y+.2,pz:g.z+10.5,lx:g.x*.92,ly:g.y,lz:g.z,roll:g.x<0?.015:-.015,fog:2,glitch:0,morph:0,energy:1}])),about:{px:0,py:6,pz:B+17,lx:-3.6,ly:6,lz:B,roll:0,fog:3,glitch:0,morph:0,energy:1},stack:{px:12,py:12.5,pz:B+13,lx:-5,ly:6.5,lz:B,roll:-.08,fog:3.4,glitch:0,morph:1,energy:1.2},outro:{px:0,py:1.5,pz:B+40,lx:0,ly:-.5,lz:B,roll:0,fog:4,glitch:0,morph:2,energy:1.4}};class St{constructor(e,t,s){this.screenTextures=s,this.rig={...we.hero},this.fps=60,this.hovered=-1,this.cur={...we.hero},this.scene=new Me,this.camera=new be(40,1,.1,260),this.fog=new Le("#06070b",.026),this.clock=new Te,this.pointer=new D,this.pointerCur=new D,this.raycaster=new ke,this.disposables=[],this.updaters=[],this.screens=[],this.raf=0,this.running=!1,this.started=!1,this.fpsAcc=0,this.fpsN=0,this.look=new x,this.tmpV=new x,this.fogBase=new S,this.corridor=[],this.reducedIntro=!1,this.introStart=()=>{},this.introSkip=()=>{},this.onVisibility=()=>{document.hidden?this.stop():this.started&&this.start()},this.resize=()=>{const o=window.innerWidth,r=window.innerHeight;this.renderer.setSize(o,r,!1),this.composer.setSize(o,r),this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.camera.aspect=o/r,this.camera.fov=o/r<.8?58:40,this.camera.updateProjectionMatrix(),this.finalPass.uniforms.uRes.value.set(o,r),!(!this.running&&this.started===!1)&&(this.running||this.renderOnce())},this.loop=()=>{if(!this.running)return;this.raf=requestAnimationFrame(this.loop);const o=Math.min(this.clock.getDelta(),.05),r=this.clock.elapsedTime,n=1-Math.exp(-o*3.4),y=this.cur,h=this.rig;for(const l in h)y[l]+=(h[l]-y[l])*(l==="glitch"?Math.min(1,n*3):n);this.pointerCur.lerp(this.pointer,1-Math.exp(-o*2.2)),this.apply(r,o),this.composer.render(),o>0&&(this.fpsAcc+=o,this.fpsN++,this.fpsAcc>.5&&(this.fps=Math.round(this.fpsN/this.fpsAcc),this.fpsAcc=0,this.fpsN=0))},this.high=t==="high",this.renderer=new Ge({canvas:e,antialias:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.high?1.5:1)),this.renderer.debug.checkShaderErrors=!1,this.renderer.toneMapping=Se,this.renderer.toneMappingExposure=1.1,this.renderer.outputColorSpace=Ve,this.scene.fog=this.fog,this.scene.background=new S("#0a0d14");const a=new je(this.renderer),i=a.fromScene(new ut,.04).texture;this.scene.environment=i,this.disposables.push(a,i),this.scene.add(new Qe("#2a2440","#050507",1.2)),this.buildFloor(),this.buildMonolith(),this.buildCorridor(),this.buildGallery(),this.buildCore(),this.buildDust(),this.composer=new mt(this.renderer),this.composer.addPass(new vt(this.scene,this.camera)),this.high&&(this.composer.addPass(new ue({uniforms:{tDiffuse:{value:null}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
            uniform sampler2D tDiffuse; varying vec2 vUv;
            void main(){
              vec4 c = texture2D(tDiffuse, vUv);
              if (any(isnan(c)) || any(isinf(c))) c = vec4(0.0, 0.0, 0.0, 1.0);
              gl_FragColor = vec4(clamp(c.rgb, 0.0, 24.0), 1.0);
            }`})),this.bloom=new V(new D(512,512),.38,.6,.55),this.composer.addPass(this.bloom)),this.finalPass=new ue({uniforms:{tDiffuse:{value:null},uTime:{value:0},uGlitch:{value:0},uAberr:{value:.0016},uRes:{value:new D(1,1)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform sampler2D tDiffuse; uniform float uTime; uniform float uGlitch; uniform float uAberr; uniform vec2 uRes;
        varying vec2 vUv;
        float rand(vec2 c){ return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }
        void main(){
          vec2 uv = vUv;
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
          col += (rand(uv * uRes + fract(uTime)) - 0.5) * 0.028;
          gl_FragColor = vec4(col, 1.0);
        }
      `}),this.composer.addPass(this.finalPass),this.composer.addPass(new wt),this.resize(),window.addEventListener("resize",this.resize),document.addEventListener("visibilitychange",this.onVisibility)}buildFloor(){if(this.high){const s={name:"WaterReflector",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null},uTime:{value:0},uFog:{value:new S},uDensity:{value:.026}},vertexShader:`
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
          uniform vec3 color; uniform sampler2D tDiffuse; uniform float uTime; uniform vec3 uFog; uniform float uDensity; varying vec4 vUv; varying vec3 vW; varying float vD;
          #include <logdepthbuf_pars_fragment>
          void main(){
            #include <logdepthbuf_fragment>
            vec2 w = vec2(
              sin(vW.x * 1.7 + uTime * 0.9) + sin(vW.z * 2.3 - uTime * 1.1) + sin((vW.x + vW.z) * 4.1 + uTime * 1.7) * 0.5,
              cos(vW.z * 1.9 + uTime * 0.8) + cos(vW.x * 2.7 - uTime * 1.3) + cos((vW.x - vW.z) * 3.7 + uTime * 1.5) * 0.5
            );
            vec4 uv = vUv;
            uv.xy += w * 0.0016 * uv.w;
            vec4 base = texture2DProj(tDiffuse, uv);
            float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
            gl_FragColor = vec4(mix(base.rgb * color, uFog, f), 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`},a=new se(new $(160,260),{textureWidth:Math.round(window.innerWidth*.6),textureHeight:Math.round(window.innerHeight*.6),color:new S("#9a98b4"),clipBias:.003,shader:s});a.rotation.x=-Math.PI/2,a.position.set(0,0,-90),this.scene.add(a),this.reflector=a;const i=a.material;this.updaters.push(o=>{i.uniforms.uTime.value=o,i.uniforms.uFog.value.copy(this.fog.color),i.uniforms.uDensity.value=this.fog.density}),this.disposables.push(a.geometry,i,a.getRenderTarget())}const e=new w(new $(160,900),new F({transparent:!0,depthWrite:!1,uniforms:{uColor:{value:E},uBase:{value:new S("#07080c")},uSolid:{value:this.high?.22:1},uFog:{value:new S},uDensity:{value:.026}},vertexShader:"varying vec3 vW; varying float vD; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vD = -mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:`
          uniform vec3 uColor; uniform vec3 uBase; uniform float uSolid; uniform vec3 uFog; uniform float uDensity; varying vec3 vW; varying float vD;
          float line(float v, float w){ float f = abs(fract(v) - 0.5); return smoothstep(w, 0.0, 0.5 - f); }
          void main(){
            float g = max(line(vW.x / 4.0, 0.012), line(vW.z / 4.0, 0.012));
            float fade = exp(-vD * 0.035);
            vec3 col = uBase + uColor * g * (uSolid < 0.9 ? 0.0 : 0.12) * fade;
            float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
            gl_FragColor = vec4(mix(col, uFog, f), max(uSolid, g * 0.3 * fade));
          }
        `}));e.rotation.x=-Math.PI/2,e.position.set(0,.01,-300),this.scene.add(e);const t=e.material;this.updaters.push(()=>{t.uniforms.uFog.value.copy(this.fog.color),t.uniforms.uDensity.value=this.fog.density})}buildSky(){const e=new F({side:ye,depthWrite:!1,fog:!1,uniforms:{uFog:{value:new S},uTime:{value:0},uMoon:{value:new x(-.55,.32,-.77).normalize()}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }",fragmentShader:`
        uniform vec3 uFog; uniform float uTime; uniform vec3 uMoon; varying vec3 vDir;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(float x){ float i = floor(x); float f = fract(x); return mix(hash(vec2(i, 0.0)), hash(vec2(i + 1.0, 0.0)), smoothstep(0.0, 1.0, f)); }
        float ridge(float a, float s){ float h = 0.0; float amp = 0.5; for (int i = 0; i < 5; i++){ h += noise(a * s) * amp; s *= 2.1; amp *= 0.5; } return h; }
        void main(){
          vec3 d = normalize(vDir);
          float y = d.y;
          vec3 zenith = uFog * 0.35 + vec3(0.01, 0.012, 0.03);
          vec3 horizon = uFog * 1.6 + vec3(0.06, 0.05, 0.11);
          vec3 col = mix(horizon, zenith, smoothstep(-0.02, 0.55, y));
          // brilho suave no horizonte
          col += vec3(0.16, 0.12, 0.26) * exp(-abs(y) * 14.0) * 0.6;
          // estrelas
          vec2 sp = vec2(atan(d.z, d.x) * 140.0, asin(clamp(y, -1.0, 1.0)) * 140.0);
          vec2 cell = floor(sp);
          float h = hash(cell);
          float star = step(0.9965, h) * smoothstep(0.5, 0.0, length(fract(sp) - 0.5));
          star *= 0.6 + 0.4 * sin(uTime * (1.0 + h * 3.0) + h * 40.0);
          col += vec3(0.85, 0.88, 1.0) * star * smoothstep(0.05, 0.35, y);
          // lua
          float m = dot(d, uMoon);
          col += vec3(0.86, 0.88, 0.98) * smoothstep(0.9993, 0.9996, m);
          col += vec3(0.5, 0.48, 0.75) * pow(max(m, 0.0), 400.0) * 0.6 + vec3(0.25, 0.22, 0.4) * pow(max(m, 0.0), 30.0) * 0.25;
          // montanhas: duas camadas, a de trás mais clara (perspectiva atmosférica)
          float az = atan(d.z, d.x) + 3.14159;
          float far = 0.035 + ridge(az, 3.0) * 0.07;
          float near = 0.01 + ridge(az + 11.0, 5.0) * 0.05;
          col = mix(col, horizon * 0.62, step(y, far) * smoothstep(-0.05, 0.0, y));
          col = mix(col, horizon * 0.38, step(y, near) * smoothstep(-0.05, 0.0, y));
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`}),t=new w(new ie(200,48,24),e);t.frustumCulled=!1,t.renderOrder=-1,this.scene.add(t),this.updaters.push(s=>{t.position.copy(this.camera.position),e.uniforms.uFog.value.copy(this.fogBase),e.uniforms.uTime.value=s})}buildMonolith(){this.buildSky();const e=new ae;e.position.set(0,5.2,0),e.scale.setScalar(1.25);const t=(v,f)=>new ve({color:v,metalness:1,roughness:f,clearcoat:.6,clearcoatRoughness:.15,envMapIntensity:1.5}),s=t("#d9dce6",.18),a=t("#d8c7a6",.24),i=t("#a99be8",.26),o=t("#3a3e4c",.35),r=[];[[3.4,.11,s,[0,0,0],.18],[2.85,.09,a,[Math.PI/2,0,0],-.26],[2.35,.085,i,[0,Math.PI/2,.4],.34],[1.85,.07,s,[.9,.3,0],-.45]].forEach(([v,f,R,P,d],C)=>{const A=new ae;A.rotation.set(...P);const z=new He;z.absarc(0,0,v+f,0,Math.PI*2,!1);const Z=new Ye;Z.absarc(0,0,v-f,0,Math.PI*2,!0),z.holes.push(Z);const q=new Ke(z,{depth:f*1.6,bevelEnabled:!0,bevelThickness:.02,bevelSize:.02,bevelSegments:3,curveSegments:160});q.translate(0,0,-f*.8),A.add(new w(q,R));const O=C===0?120:C===1?72:48,Q=new oe(new L(.012,f*.9,.02),o,O),fe=new te;for(let U=0;U<O;U++){const I=U/O*Math.PI*2,De=U%(O/12)===0?1.6:1;fe.compose(new x(Math.cos(I)*v,Math.sin(I)*v,f*.82+.01),new me().setFromAxisAngle(new x(0,0,1),I-Math.PI/2),new x(1,De,1)),Q.setMatrixAt(U,fe)}A.add(Q),[-1,1].forEach(U=>{const I=new w(new Xe(.06,.06,.36,24),a);I.rotation.z=Math.PI/2,I.position.set(U*v,0,0),A.add(I)}),e.add(A);const Pe=new x(C%2?1:0,C%2?0:1,C===2?1:0).normalize();r.push({pivot:A,axis:Pe,speed:d,base:A.rotation.clone()})});const y=new w(new ie(1.05,64,48),this.high?new ve({color:"#e8e6ff",metalness:0,roughness:.04,transmission:1,thickness:1.2,ior:1.5,iridescence:.35,clearcoat:1,envMapIntensity:1.2}):new H({color:"#2a2a40",metalness:.4,roughness:.1,transparent:!0,opacity:.4})),h=new w(new Ze(.42,4),new G({color:E.clone().multiplyScalar(1.6),toneMapped:!1})),l=new w(new ie(.12,24,16),new G({color:J.clone().multiplyScalar(2),toneMapped:!1})),u=new k(E,26,12,1.6);e.add(y,h,l,u);const c=new qe("#f2eeff",2.2);c.position.set(-6,10,8);const T=new k(J,30,24,1.6);T.position.set(6,6,-6);const M=new k("#b8a8ff",24,26,1.6);M.position.set(7,3,9),this.scene.add(c,T,M),this.scene.add(e);let p=this.reducedIntro?1:0,m=!1;const b=v=>{r.forEach((R,P)=>{const d=re.clamp(v*1.4-P*.12,0,1),C=1-Math.pow(1-d,3);R.pivot.scale.setScalar(Math.max(1e-4,.6+C*.4)),R.pivot.visible=d>0});const f=re.smoothstep(v,.55,1);h.scale.setScalar(Math.max(1e-4,f)),l.scale.setScalar(Math.max(1e-4,f)),u.intensity=26*f,y.scale.setScalar(Math.max(1e-4,re.smoothstep(v,.35,.8)))};b(p),this.introStart=()=>{p=0,m=!0},this.introSkip=()=>{p=1,m=!1,b(1)};let _=0;this.updaters.push((v,f)=>{m&&p<1&&(p=Math.min(1,p+f/3),b(p));const R=1+(1-p)*8+this.pointerCur.length()*.6;_+=f*R,r.forEach(d=>{d.pivot.rotation.copy(d.base),d.pivot.rotateOnAxis(d.axis,_*d.speed)}),e.position.y=5.2+Math.sin(v*.7)*.18,e.rotation.y=this.pointerCur.x*.35,e.rotation.x=-this.pointerCur.y*.2,h.rotation.y=v*.4;const P=.85+Math.sin(v*1.6)*.15;h.material.color.copy(E).multiplyScalar(1.4*P),l.position.set(Math.cos(v*.9)*.22,Math.sin(v*1.3)*.18,Math.sin(v*.9)*.22)})}buildCorridor(){const t=[];for(let u=-32;u>-168;u-=3.4)t.push(u);const s=new L(1,1,1);s.translate(0,.5,0);const a=new H({color:"#12141b",metalness:.9,roughness:.35,envMapIntensity:.35}),i=new oe(s,a,t.length*2+Math.ceil(t.length/3)),o=new oe(new L(.07,1,.07).translate(0,.5,0),void 0,t.length*2),r=new te,n=new me;let y=0,h=0;const l=le(7);t.forEach((u,c)=>{[-1,1].forEach(T=>{const M=6+l()*12,p=.7+l()*1.1,m=T*(4.6+l()*2.4);r.compose(new x(m,0,u),n,new x(p,M,p)),i.setMatrixAt(y++,r),r.compose(new x(m-T*(p/2+.06),0,u),n,new x(1,M*(.55+l()*.4),1)),o.setMatrixAt(h++,r)}),c%3===0&&(r.compose(new x(0,11+l()*4,u),n,new x(14,.5,.6)),i.setMatrixAt(y++,r))}),i.count=y,this.stripMat=new F({uniforms:{uTime:{value:0},uPurple:{value:E},uCyan:{value:J},uEnergy:{value:1},uFog:{value:new S},uDensity:{value:.026}},vertexShader:`
        varying float vZ; varying float vY; varying float vD;
        void main(){
          vec4 w = modelMatrix * instanceMatrix * vec4(position, 1.0);
          vZ = w.z; vY = w.y;
          vec4 mv = viewMatrix * w; vD = -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform float uTime; uniform vec3 uPurple; uniform vec3 uCyan; uniform float uEnergy; uniform vec3 uFog; uniform float uDensity;
        varying float vZ; varying float vY; varying float vD;
        void main(){
          float p = fract(vZ * 0.035 + vY * 0.04 + uTime * 0.45);
          float pulse = smoothstep(0.0, 0.03, p) * smoothstep(0.3, 0.0, p);
          vec3 col = uPurple * (0.35 + pulse * 3.0 * uEnergy) + uCyan * pulse * pulse * 0.8;
          float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
          gl_FragColor = vec4(mix(col, uFog, f), 1.0);
        }`}),o.material=this.stripMat,this.scene.add(i,o),this.corridor.push(i,o);for(let u=-45;u>-165;u-=30){const c=new k(E,40,22,1.7);c.position.set(0,7,u),this.scene.add(c)}this.disposables.push(s)}buildGallery(){const e=new H({color:"#101219",metalness:.9,roughness:.3,envMapIntensity:.4}),t=new $e({color:E,transparent:!0,opacity:.7}),s=ot();this.disposables.push(s),_e.forEach((a,i)=>{const o=new ae;o.position.set(a.x,a.y,a.z),o.rotation.y=a.rotY;const r=7.4,n=4.6,y=new w(new L(r+.3,n+.3,.22),e);y.position.z=-.14;const h=this.screenTextures[i],l=h.image;if(l!=null&&l.width){const m=l.width/l.height,b=r/n;m>b?(h.repeat.set(b/m,1),h.offset.set((1-b/m)/2,0)):(h.repeat.set(1,m/b),h.offset.set(0,(1-m/b)/2))}const u=new w(new $(r,n),new G({map:h,toneMapped:!1,color:new S(.62,.62,.68)}));u.userData.index=i,this.screens.push(u);const c=new Je(new et(new L(r+.3,n+.3,.22)),t);c.position.z=-.14;const T=new w(new $(9,9),new G({map:rt(String(i+1).padStart(2,"0")),transparent:!0,opacity:.55,depthWrite:!1,toneMapped:!1}));T.position.set(a.x<0?-5.5:5.5,1.2,-4);const M=new tt(new st({map:s,color:E,transparent:!0,opacity:.25,depthWrite:!1,blending:ee}));M.scale.set(16,11,1),M.position.z=-1.2,o.add(M,y,u,c,T),this.scene.add(o);const p=a.y;this.updaters.push(m=>{o.position.y=p+Math.sin(m*.8+i)*.18,o.rotation.z=Math.sin(m*.5+i*2)*.012;const b=this.hovered===i,_=u.material,v=b?.95:.62;_.color.r+=(v-_.color.r)*.1,_.color.g=_.color.r,_.color.b=_.color.r+.05,M.material.opacity+=((b?.55:.25)-M.material.opacity)*.1})})}buildCore(){const e=this.high?9e3:3600,t=new Float32Array(e*3),s=new Float32Array(e*3),a=new Float32Array(e*3),i=new Float32Array(e),o=new Float32Array(e),r=le(42),n=nt(ht,e,r),y=.27;for(let c=0;c<e;c++){const T=c+.5,M=Math.acos(1-2*T/e),p=Math.PI*(1+Math.sqrt(5))*T,m=c%5===0?5.6*Math.cbrt(r()):5.6;t.set([m*Math.cos(p)*Math.sin(M),m*Math.sin(p)*Math.sin(M),m*Math.cos(M)],c*3);const b=c%4;if(b===3){const P=1.6*Math.cbrt(r()),d=r()*Math.PI*2,C=Math.acos(2*r()-1);s.set([P*Math.sin(C)*Math.cos(d),P*Math.sin(C)*Math.sin(d),P*Math.cos(C)],c*3)}else{const P=[4.2,6.6,9][b]+(r()-.5)*.25,d=r()*Math.PI*2,C=new x(Math.cos(d)*P,(r()-.5)*.15,Math.sin(d)*P);C.applyEuler(new it([.4,-.7,1.2][b],[0,.6,-.3][b],[.2,.5,0][b])),s.set([C.x,C.y,C.z],c*3)}const[_,v,f]=n[c%n.length],R=lt(_,v,y);a.set([R.x,R.y-5.9,(r()-.5)*.7],c*3),i[c]=r(),o[c]=f==="cyan"?2:f==="white"||r()<.12?1:0}const h=new he;h.setAttribute("position",new N(t,3)),h.setAttribute("aB",new N(s,3)),h.setAttribute("aC",new N(a,3)),h.setAttribute("aR",new N(i,1)),h.setAttribute("aT",new N(o,1)),this.particleMat=new F({transparent:!0,depthWrite:!1,blending:ee,uniforms:{uTime:{value:0},uMorph:{value:0},uPixel:{value:1},uEnergy:{value:1},uPurple:{value:E},uCyan:{value:J},uPointer:{value:new D}},vertexShader:`
        uniform float uTime; uniform float uMorph; uniform float uPixel; uniform float uEnergy; uniform vec2 uPointer;
        attribute vec3 aB; attribute vec3 aC; attribute float aR; attribute float aT;
        varying float vT; varying float vA;
        void main(){
          float m1 = smoothstep(0.0, 1.0, clamp(uMorph, 0.0, 1.0));
          float m2 = smoothstep(0.0, 1.0, clamp(uMorph - 1.0, 0.0, 1.0));
          vec3 p = mix(mix(position, aB, m1), aC, m2);
          // turbulência: mais forte no meio de cada transição
          float chaos = sin(m1 * 3.14159) + sin(m2 * 3.14159);
          float t = uTime * (0.4 + aR * 0.6);
          p += vec3(sin(t + aR * 40.0), cos(t * 1.3 + aR * 20.0), sin(t * 0.7 + aR * 60.0)) * (0.05 + chaos * 1.6 * aR);
          // as órbitas giram
          float ang = uTime * 0.25 * m1 * (1.0 - m2) * (0.5 + aR);
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
        }`});const l=new ge(h,this.particleMat);l.position.set(0,6,B),l.frustumCulled=!1,this.scene.add(l);const u=new k(E,60,30,1.5);u.position.set(0,6,B),this.scene.add(u)}buildDust(){const e=this.high?4200:1500,t=new Float32Array(e*3),s=new Float32Array(e),a=le(3);for(let n=0;n<e;n++)t.set([(a()-.5)*50,a()*18,30-a()*460],n*3),s[n]=a();const i=new he;i.setAttribute("position",new N(t,3)),i.setAttribute("aR",new N(s,1));const o=new F({transparent:!0,depthWrite:!1,blending:ee,uniforms:{uTime:{value:0},uPixel:{value:1},uPurple:{value:E}},vertexShader:`
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
        }`}),r=new ge(i,o);r.frustumCulled=!1,this.scene.add(r),this.updaters.push(n=>{o.uniforms.uTime.value=n,o.uniforms.uPixel.value=this.renderer.getPixelRatio()})}setPointer(e,t){this.pointer.set(e,t)}pick(e,t){const s=new D(e/window.innerWidth*2-1,-(t/window.innerHeight)*2+1);this.raycaster.setFromCamera(s,this.camera);const a=this.raycaster.intersectObjects(this.screens,!1)[0];return a&&a.distance<30?a.object.userData.index:-1}start(){this.running||(this.started||(Object.assign(this.cur,this.rig),this.started=!0),this.running=!0,this.clock.getDelta(),this.loop())}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderOnce(){Object.assign(this.cur,this.rig),this.apply(1.5,0),this.composer.render()}apply(e,t){const s=this.cur,a=this.pointerCur;this.camera.position.set(s.px+a.x*1.5,s.py+a.y*.8,s.pz),this.look.set(s.lx+a.x*.4,s.ly+a.y*.3,s.lz),this.camera.up.set(Math.sin(s.roll),Math.cos(s.roll),0),this.camera.lookAt(this.look);const i=Math.max(0,Math.min(ne.length-1.001,s.fog)),o=Math.floor(i);this.fogBase.copy(ne[o]).lerp(ne[o+1],i-o),this.fog.color.copy(this.fogBase).multiplyScalar(1.6).add(Mt),this.scene.background.copy(this.fog.color),this.fog.density=.026+Math.sin(Math.min(i,3)*Math.PI)*.004,this.stripMat.uniforms.uTime.value=e,this.stripMat.uniforms.uEnergy.value=s.energy,this.stripMat.uniforms.uFog.value.copy(this.fog.color),this.stripMat.uniforms.uDensity.value=this.fog.density,this.particleMat.uniforms.uTime.value=e,this.particleMat.uniforms.uMorph.value=s.morph,this.particleMat.uniforms.uEnergy.value=s.energy,this.particleMat.uniforms.uPixel.value=this.renderer.getPixelRatio(),this.particleMat.uniforms.uPointer.value.copy(a),this.finalPass.uniforms.uTime.value=e,this.finalPass.uniforms.uGlitch.value=s.glitch*.35,this.bloom&&(this.bloom.strength=.38+s.glitch*.4),this.reflector&&(this.reflector.visible=s.pz>-175),this.corridor.forEach(r=>r.visible=s.pz<4),this.tmpV.copy(this.camera.position);for(const r of this.updaters)r(e,t)}dispose(){this.stop(),window.removeEventListener("resize",this.resize),document.removeEventListener("visibilitychange",this.onVisibility),this.scene.traverse(e=>{var a;const t=e;(a=t.geometry)==null||a.dispose();const s=t.material;Array.isArray(s)?s.forEach(i=>i.dispose()):s&&(Object.values(s).forEach(i=>i instanceof at&&i.dispose()),s.dispose())}),this.disposables.forEach(e=>e.dispose()),this.composer.dispose(),this.renderer.dispose()}}function le(g){let e=g;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}export{B as CORE_Z,we as KEYS,_e as SLOTS,St as World};
