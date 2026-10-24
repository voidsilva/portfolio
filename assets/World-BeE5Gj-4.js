import{b as fe,B as k,M as U,c as ye,P as L,d as v,e as V,f as pe,g as S,h as Te,i as w,j as ee,k as oe,W as Q,H,l as R,U as j,O as Ce,m as te,F as ae,V as T,N as Se,n as de,A as K,R as Pe,o as _e,p as Re,L as Ae,q as De,r as Ee,s as me,t as Fe,u as ze,v as Be,w as Ue,x as Ne,S as Oe,y as Le,z as Ie,D as Y,G as re,E as Ge,I as ne,J as We,K as ke,Q as Ve,X as le,Y as Qe,Z as He,_ as je,$ as Ye,a0 as Ke,a1 as Xe,a2 as Ze,a3 as B,a4 as he,a as qe,a5 as $e}from"./three-CBlTl4EM.js";import{L as Z,p as Je,t as q,h as et,n as tt,s as st}from"./index-BzkCPNR7.js";import"./gsap-DjKJqAo0.js";class it extends fe{constructor(){super();const e=new k;e.deleteAttribute("uv");const t=new U({side:ye}),s=new U,o=new L(16777215,900,28,2);o.position.set(.418,16.199,.3),this.add(o);const i=new v(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);const a=new v(e,s);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const r=new v(e,s);r.position.set(-5.607,-.754,-.758),r.rotation.set(0,.994,0),r.scale.set(1.97,1.534,3.955),this.add(r);const l=new v(e,s);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const f=new v(e,s);f.position.set(-2.017,.018,6.124),f.rotation.set(0,.333,0),f.scale.set(2.002,4.566,2.064),this.add(f);const h=new v(e,s);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const n=new v(e,s);n.position.set(-2.193,-.369,-5.547),n.rotation.set(0,.516,0),n.scale.set(3.875,3.487,2.986),this.add(n);const u=new v(e,N(50));u.position.set(-16.116,14.37,8.208),u.scale.set(.1,2.428,2.739),this.add(u);const c=new v(e,N(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const M=new v(e,N(17));M.position.set(14.904,12.198,-1.832),M.scale.set(.15,4.265,6.331),this.add(M);const g=new v(e,N(43));g.position.set(-.462,8.89,14.52),g.scale.set(4.38,5.441,.088),this.add(g);const m=new v(e,N(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const p=new v(e,N(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function N(d){const e=new V;return e.color.setScalar(d),e}class X extends v{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new pe;const s=this,o=t.color!==void 0?new S(t.color):new S(8355711),i=t.textureWidth||512,a=t.textureHeight||512,r=t.clipBias||0,l=t.shader||X.ReflectorShader,f=t.multisample!==void 0?t.multisample:4,h=new Te,n=new w,u=new w,c=new w,M=new ee,g=new w(0,0,-1),m=new oe,p=new w,x=new w,C=new oe,E=new ee,y=this.camera,z=new Q(i,a,{samples:f,type:H}),P=new R({name:l.name!==void 0?l.name:"unspecified",uniforms:j.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});P.uniforms.tDiffuse.value=z.texture,P.uniforms.color.value=o,P.uniforms.textureMatrix.value=E,this.material=P,this.onBeforeRender=function(b,A,W){if(u.setFromMatrixPosition(s.matrixWorld),c.setFromMatrixPosition(W.matrixWorld),M.extractRotation(s.matrixWorld),n.set(0,0,1),n.applyMatrix4(M),p.subVectors(u,c),p.dot(n)>0)return;p.reflect(n).negate(),p.add(u),M.extractRotation(W.matrixWorld),g.set(0,0,-1),g.applyMatrix4(M),g.add(c),x.subVectors(u,g),x.reflect(n).negate(),x.add(u),y.position.copy(p),y.up.set(0,1,0),y.up.applyMatrix4(M),y.up.reflect(n),y.lookAt(x),y.far=W.far,y.updateMatrixWorld(),y.projectionMatrix.copy(W.projectionMatrix),E.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),E.multiply(y.projectionMatrix),E.multiply(y.matrixWorldInverse),E.multiply(s.matrixWorld),h.setFromNormalAndCoplanarPoint(n,u),h.applyMatrix4(y.matrixWorldInverse),m.set(h.normal.x,h.normal.y,h.normal.z,h.constant);const D=y.projectionMatrix;C.x=(Math.sign(m.x)+D.elements[8])/D.elements[0],C.y=(Math.sign(m.y)+D.elements[9])/D.elements[5],C.z=-1,C.w=(1+D.elements[10])/D.elements[14],m.multiplyScalar(2/m.dot(C)),D.elements[2]=m.x,D.elements[6]=m.y,D.elements[10]=m.z+1-r,D.elements[14]=m.w,s.visible=!1;const we=b.getRenderTarget(),Me=b.xr.enabled,be=b.shadowMap.autoUpdate;b.xr.enabled=!1,b.shadowMap.autoUpdate=!1,b.setRenderTarget(z),b.state.buffers.depth.setMask(!0),b.autoClear===!1&&b.clear(),b.render(A,y),b.xr.enabled=Me,b.shadowMap.autoUpdate=be,b.setRenderTarget(we);const ie=W.viewport;ie!==void 0&&b.state.viewport(ie),s.visible=!0},this.getRenderTarget=function(){return z},this.dispose=function(){z.dispose(),s.material.dispose()}}}X.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};const ge={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class G{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ot=new Ce(-1,1,1,-1,0,1);class at extends te{constructor(){super(),this.setAttribute("position",new ae([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ae([0,2,0,0,2,0],2))}}const rt=new at;class se{constructor(e){this._mesh=new v(rt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ot)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ve extends G{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof R?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=j.clone(e.uniforms),this.material=new R({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new se(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class ue extends G{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const o=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,r;this.inverse?(a=0,r=1):(a=1,r=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),i.buffers.stencil.setFunc(o.ALWAYS,a,4294967295),i.buffers.stencil.setClear(r),i.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(o.EQUAL,1,4294967295),i.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),i.buffers.stencil.setLocked(!0)}}class nt extends G{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class lt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const s=e.getSize(new T);this._width=s.width,this._height=s.height,t=new Q(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:H}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ve(ge),this.copyPass.material.blending=Se,this.clock=new de}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let o=0,i=this.passes.length;o<i;o++){const a=this.passes[o];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),a.needsSwap){if(s){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}ue!==void 0&&(a instanceof ue?s=!0:a instanceof nt&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new T);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(s,o),this.renderTarget2.setSize(s,o);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(s,o)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ht extends G{constructor(e,t,s=null,o=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=o,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new S}render(e,t,s){const o=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=o}}const ut={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new S(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class I extends G{constructor(e,t,s,o){super(),this.strength=t!==void 0?t:1,this.radius=s,this.threshold=o,this.resolution=e!==void 0?new T(e.x,e.y):new T(256,256),this.clearColor=new S(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Q(i,a,{type:H}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let n=0;n<this.nMips;n++){const u=new Q(i,a,{type:H});u.texture.name="UnrealBloomPass.h"+n,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const c=new Q(i,a,{type:H});c.texture.name="UnrealBloomPass.v"+n,c.texture.generateMipmaps=!1,this.renderTargetsVertical.push(c),i=Math.round(i/2),a=Math.round(a/2)}const r=ut;this.highPassUniforms=j.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new R({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let n=0;n<this.nMips;n++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[n])),this.separableBlurMaterials[n].uniforms.invSize.value=new T(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=ge;this.copyUniforms=j.clone(h.uniforms),this.blendMaterial=new R({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:K,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new S,this.oldClearAlpha=1,this.basic=new V,this.fsQuad=new se(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let s=Math.round(e/2),o=Math.round(t/2);this.renderTargetBright.setSize(s,o);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(s,o),this.renderTargetsVertical[i].setSize(s,o),this.separableBlurMaterials[i].uniforms.invSize.value=new T(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2)}render(e,t,s,o,i){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let r=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[l].uniforms.direction.value=I.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=I.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),r=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(e*e))/e);return new R({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new T(.5,.5)},direction:{value:new T(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new R({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}I.BlurDirectionX=new T(1,0);I.BlurDirectionY=new T(0,1);const ct={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class ft extends G{constructor(){super();const e=ct;this.uniforms=j.clone(e.uniforms),this.material=new Pe({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new se(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},_e.getTransfer(this._outputColorSpace)===Re&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ae?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===De?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ee?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===me?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Fe?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ze&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const _=new S("#8B5CF6"),O=new S("#55D6FF"),$=["#06070b","#0a0816","#071015","#130a24","#06060a"].map(d=>new S(d)),F=-400,xe=Array.from({length:5},(d,e)=>{const t=e%2===0?-3.6:3.6;return{x:t,y:4.3,z:-205-e*34,rotY:t<0?.32:-.32}}),ce={hero:{px:0,py:3.4,pz:27,lx:0,ly:4.6,lz:0,roll:0,fog:0,glitch:0,morph:0,energy:1},over:{px:0,py:13.5,pz:-8,lx:0,ly:4,lz:-48,roll:0,fog:.6,glitch:0,morph:0,energy:1},corridor:{px:0,py:3.2,pz:-150,lx:0,ly:3.4,lz:-200,roll:.04,fog:1,glitch:0,morph:0,energy:1.2},...Object.fromEntries(xe.map((d,e)=>[`p${e}`,{px:d.x*.22,py:d.y+.2,pz:d.z+10.5,lx:d.x*.92,ly:d.y,lz:d.z,roll:d.x<0?.015:-.015,fog:2,glitch:0,morph:0,energy:1}])),about:{px:0,py:6,pz:F+17,lx:-3.6,ly:6,lz:F,roll:0,fog:3,glitch:0,morph:0,energy:1},stack:{px:12,py:12.5,pz:F+13,lx:-5,ly:6.5,lz:F,roll:-.08,fog:3.4,glitch:0,morph:1,energy:1.2},outro:{px:0,py:1.5,pz:F+40,lx:0,ly:-.5,lz:F,roll:0,fog:4,glitch:0,morph:2,energy:1.4}};class vt{constructor(e,t,s){this.screenTextures=s,this.rig={...ce.hero},this.fps=60,this.hovered=-1,this.cur={...ce.hero},this.scene=new fe,this.camera=new pe(40,1,.1,260),this.fog=new Be("#06070b",.026),this.clock=new de,this.pointer=new T,this.pointerCur=new T,this.raycaster=new Ue,this.disposables=[],this.updaters=[],this.screens=[],this.raf=0,this.running=!1,this.started=!1,this.fpsAcc=0,this.fpsN=0,this.look=new w,this.tmpV=new w,this.onVisibility=()=>{document.hidden?this.stop():this.started&&this.start()},this.resize=()=>{const a=window.innerWidth,r=window.innerHeight;this.renderer.setSize(a,r,!1),this.composer.setSize(a,r),this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.camera.aspect=a/r,this.camera.fov=a/r<.8?58:40,this.camera.updateProjectionMatrix(),this.finalPass.uniforms.uRes.value.set(a,r),!(!this.running&&this.started===!1)&&(this.running||this.renderOnce())},this.loop=()=>{if(!this.running)return;this.raf=requestAnimationFrame(this.loop);const a=Math.min(this.clock.getDelta(),.05),r=this.clock.elapsedTime,l=1-Math.exp(-a*3.4),f=this.cur,h=this.rig;for(const n in h)f[n]+=(h[n]-f[n])*(n==="glitch"?Math.min(1,l*3):l);this.pointerCur.lerp(this.pointer,1-Math.exp(-a*2.2)),this.apply(r,a),this.composer.render(),a>0&&(this.fpsAcc+=a,this.fpsN++,this.fpsAcc>.5&&(this.fps=Math.round(this.fpsN/this.fpsAcc),this.fpsAcc=0,this.fpsN=0))},this.high=t==="high",this.renderer=new Ne({canvas:e,antialias:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.high?1.5:1)),this.renderer.toneMapping=me,this.renderer.toneMappingExposure=1.1,this.renderer.outputColorSpace=Oe,this.scene.fog=this.fog,this.scene.background=new S("#06070b");const o=new Le(this.renderer),i=o.fromScene(new it,.04).texture;this.scene.environment=i,this.disposables.push(o,i),this.scene.add(new Ie("#2a2440","#050507",1.2)),this.buildFloor(),this.buildMonolith(),this.buildCorridor(),this.buildGallery(),this.buildCore(),this.buildDust(),this.composer=new lt(this.renderer),this.composer.addPass(new ht(this.scene,this.camera)),this.high&&(this.bloom=new I(new T(512,512),.6,.5,.42),this.composer.addPass(this.bloom)),this.finalPass=new ve({uniforms:{tDiffuse:{value:null},uTime:{value:0},uGlitch:{value:0},uAberr:{value:.0016},uRes:{value:new T(1,1)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
          col += (rand(uv * uRes + fract(uTime)) - 0.5) * 0.05;
          gl_FragColor = vec4(col, 1.0);
        }
      `}),this.composer.addPass(this.finalPass),this.composer.addPass(new ft),this.resize(),window.addEventListener("resize",this.resize),document.addEventListener("visibilitychange",this.onVisibility)}buildFloor(){if(this.high){const t=new X(new Y(160,260),{textureWidth:Math.round(window.innerWidth*.5),textureHeight:Math.round(window.innerHeight*.5),color:new S("#5a5a6a"),clipBias:.003});t.rotation.x=-Math.PI/2,t.position.set(0,0,-90),this.scene.add(t),this.reflector=t,this.disposables.push(t.geometry,t.material,t.getRenderTarget())}const e=new v(new Y(160,900),new R({transparent:!0,depthWrite:!1,uniforms:{uColor:{value:_},uBase:{value:new S("#07080c")},uSolid:{value:this.high?.55:1}},vertexShader:"varying vec3 vW; varying float vD; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vD = -mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:`
          uniform vec3 uColor; uniform vec3 uBase; uniform float uSolid; varying vec3 vW; varying float vD;
          float line(float v, float w){ float f = abs(fract(v) - 0.5); return smoothstep(w, 0.0, 0.5 - f); }
          void main(){
            float g = max(line(vW.x / 4.0, 0.012), line(vW.z / 4.0, 0.012));
            float fade = exp(-vD * 0.035);
            vec3 col = uBase + uColor * g * 0.2 * fade;
            gl_FragColor = vec4(col, max(uSolid, g * 0.3 * fade));
          }
        `}));e.rotation.x=-Math.PI/2,e.position.set(0,.01,-300),this.scene.add(e)}buildMonolith(){const e=new re,t=.19,s={white:new U({color:"#1b1d26",metalness:1,roughness:.22,envMapIntensity:.7}),purple:new U({color:"#2b1f52",metalness:.85,roughness:.25,envMapIntensity:.5,emissive:_,emissiveIntensity:.28})};Z.strokes.forEach(f=>{const{pts:h,closed:n}=Je(f.d,.35),u=h.map(([m,p])=>{const x=q(m,p,t);return new w(x.x,x.y,0)}),c=new pt(u),M=f.w/2*t,g=new v(new Ge(c,u.length*2,M,20,n),s[f.tone]);e.add(g),n||[u[0],u[u.length-1]].forEach(m=>{const p=new v(new ne(M,24,16),s[f.tone]);p.position.copy(m),e.add(p)})});const o=Z.dots.map(f=>{const h=q(f.cx,f.cy,t),n=new v(new ne(f.r*t,32,20),new U({color:O,emissive:O,emissiveIntensity:1.1}));n.position.set(h.x,h.y+.4,0);const u=new L(O,16,14,1.8);return u.position.copy(n.position),e.add(n,u),{m:n,light:u,y:n.position.y}}),i=new v(new We(7.6,7.66,160),new V({color:_,transparent:!0,opacity:.9,side:ke,toneMapped:!1}));i.rotation.x=-Math.PI/2,i.position.y=.03,e.add(i);const a=new Ve(_,260,60,.55,.6,1.4);a.position.set(-9,16,12),a.target.position.set(0,4,0),e.add(a,a.target);const r=new L("#c9c4ff",34,30,1.6);r.position.set(8,6,10),e.add(r);const l=new L(O,20,22,1.6);l.position.set(4,3,-6),e.add(l),e.position.y=.6,this.scene.add(e),this.updaters.push(f=>{o.forEach((h,n)=>{h.m.position.y=h.y+Math.sin(f*1.4+n)*.25,h.light.position.y=h.m.position.y}),e.rotation.y=Math.sin(f*.2)*.12})}buildCorridor(){const t=[];for(let u=-32;u>-168;u-=3.4)t.push(u);const s=new k(1,1,1);s.translate(0,.5,0);const o=new U({color:"#12141b",metalness:.9,roughness:.35,envMapIntensity:.35}),i=new le(s,o,t.length*2+Math.ceil(t.length/3)),a=new le(new k(.07,1,.07).translate(0,.5,0),void 0,t.length*2),r=new ee,l=new Qe;let f=0,h=0;const n=J(7);t.forEach((u,c)=>{[-1,1].forEach(M=>{const g=6+n()*12,m=.7+n()*1.1,p=M*(4.6+n()*2.4);r.compose(new w(p,0,u),l,new w(m,g,m)),i.setMatrixAt(f++,r),r.compose(new w(p-M*(m/2+.06),0,u),l,new w(1,g*(.55+n()*.4),1)),a.setMatrixAt(h++,r)}),c%3===0&&(r.compose(new w(0,11+n()*4,u),l,new w(14,.5,.6)),i.setMatrixAt(f++,r))}),i.count=f,this.stripMat=new R({uniforms:{uTime:{value:0},uPurple:{value:_},uCyan:{value:O},uEnergy:{value:1},uFog:{value:new S},uDensity:{value:.026}},vertexShader:`
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
        }`}),a.material=this.stripMat,this.scene.add(i,a);for(let u=-45;u>-165;u-=30){const c=new L(_,40,22,1.7);c.position.set(0,7,u),this.scene.add(c)}this.disposables.push(s)}buildGallery(){const e=new U({color:"#101219",metalness:.9,roughness:.3,envMapIntensity:.4}),t=new He({color:_,transparent:!0,opacity:.7}),s=et();this.disposables.push(s),xe.forEach((o,i)=>{const a=new re;a.position.set(o.x,o.y,o.z),a.rotation.y=o.rotY;const r=7.4,l=4.6,f=new v(new k(r+.3,l+.3,.22),e);f.position.z=-.14;const h=this.screenTextures[i],n=h.image;if(n!=null&&n.width){const p=n.width/n.height,x=r/l;p>x?(h.repeat.set(x/p,1),h.offset.set((1-x/p)/2,0)):(h.repeat.set(1,p/x),h.offset.set(0,(1-p/x)/2))}const u=new v(new Y(r,l),new V({map:h,toneMapped:!1,color:new S(.62,.62,.68)}));u.userData.index=i,this.screens.push(u);const c=new je(new Ye(new k(r+.3,l+.3,.22)),t);c.position.z=-.14;const M=new v(new Y(9,9),new V({map:tt(String(i+1).padStart(2,"0")),transparent:!0,opacity:.55,depthWrite:!1,toneMapped:!1}));M.position.set(o.x<0?-5.5:5.5,1.2,-4);const g=new Ke(new Xe({map:s,color:_,transparent:!0,opacity:.25,depthWrite:!1,blending:K}));g.scale.set(16,11,1),g.position.z=-1.2,a.add(g,f,u,c,M),this.scene.add(a);const m=o.y;this.updaters.push(p=>{a.position.y=m+Math.sin(p*.8+i)*.18,a.rotation.z=Math.sin(p*.5+i*2)*.012;const x=this.hovered===i,C=u.material,E=x?.95:.62;C.color.r+=(E-C.color.r)*.1,C.color.g=C.color.r,C.color.b=C.color.r+.05,g.material.opacity+=((x?.55:.25)-g.material.opacity)*.1})})}buildCore(){const e=this.high?9e3:3600,t=new Float32Array(e*3),s=new Float32Array(e*3),o=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e),r=J(42),l=st(Z,e,r),f=.27;for(let c=0;c<e;c++){const M=c+.5,g=Math.acos(1-2*M/e),m=Math.PI*(1+Math.sqrt(5))*M,p=c%5===0?5.6*Math.cbrt(r()):5.6;t.set([p*Math.cos(m)*Math.sin(g),p*Math.sin(m)*Math.sin(g),p*Math.cos(g)],c*3);const x=c%4;if(x===3){const P=1.6*Math.cbrt(r()),b=r()*Math.PI*2,A=Math.acos(2*r()-1);s.set([P*Math.sin(A)*Math.cos(b),P*Math.sin(A)*Math.sin(b),P*Math.cos(A)],c*3)}else{const P=[4.2,6.6,9][x]+(r()-.5)*.25,b=r()*Math.PI*2,A=new w(Math.cos(b)*P,(r()-.5)*.15,Math.sin(b)*P);A.applyEuler(new Ze([.4,-.7,1.2][x],[0,.6,-.3][x],[.2,.5,0][x])),s.set([A.x,A.y,A.z],c*3)}const[C,E,y]=l[c%l.length],z=q(C,E,f);o.set([z.x,z.y-5.9,(r()-.5)*.7],c*3),i[c]=r(),a[c]=y==="cyan"?2:y==="white"||r()<.12?1:0}const h=new te;h.setAttribute("position",new B(t,3)),h.setAttribute("aB",new B(s,3)),h.setAttribute("aC",new B(o,3)),h.setAttribute("aR",new B(i,1)),h.setAttribute("aT",new B(a,1)),this.particleMat=new R({transparent:!0,depthWrite:!1,blending:K,uniforms:{uTime:{value:0},uMorph:{value:0},uPixel:{value:1},uEnergy:{value:1},uPurple:{value:_},uCyan:{value:O},uPointer:{value:new T}},vertexShader:`
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
          vA = 0.55 + 0.45 * sin(uTime * 2.0 + aR * 30.0);
        }`,fragmentShader:`
        uniform vec3 uPurple; uniform vec3 uCyan; varying float vT; varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 col = vT > 1.5 ? uCyan * 1.6 : (vT > 0.5 ? vec3(0.9, 0.92, 1.0) : uPurple * 1.4);
          gl_FragColor = vec4(col * 1.25, a * vA);
        }`});const n=new he(h,this.particleMat);n.position.set(0,6,F),n.frustumCulled=!1,this.scene.add(n);const u=new L(_,60,30,1.5);u.position.set(0,6,F),this.scene.add(u)}buildDust(){const e=this.high?4200:1500,t=new Float32Array(e*3),s=new Float32Array(e),o=J(3);for(let l=0;l<e;l++)t.set([(o()-.5)*50,o()*18,30-o()*460],l*3),s[l]=o();const i=new te;i.setAttribute("position",new B(t,3)),i.setAttribute("aR",new B(s,1));const a=new R({transparent:!0,depthWrite:!1,blending:K,uniforms:{uTime:{value:0},uPixel:{value:1},uPurple:{value:_}},vertexShader:`
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
        }`}),r=new he(i,a);r.frustumCulled=!1,this.scene.add(r),this.updaters.push(l=>{a.uniforms.uTime.value=l,a.uniforms.uPixel.value=this.renderer.getPixelRatio()})}setPointer(e,t){this.pointer.set(e,t)}pick(e,t){const s=new T(e/window.innerWidth*2-1,-(t/window.innerHeight)*2+1);this.raycaster.setFromCamera(s,this.camera);const o=this.raycaster.intersectObjects(this.screens,!1)[0];return o&&o.distance<30?o.object.userData.index:-1}start(){this.running||(this.started||(Object.assign(this.cur,this.rig),this.started=!0),this.running=!0,this.clock.getDelta(),this.loop())}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderOnce(){Object.assign(this.cur,this.rig),this.apply(1.5,0),this.composer.render()}apply(e,t){const s=this.cur,o=this.pointerCur;this.camera.position.set(s.px+o.x*.7,s.py+o.y*.45,s.pz),this.look.set(s.lx+o.x*.4,s.ly+o.y*.3,s.lz),this.camera.up.set(Math.sin(s.roll),Math.cos(s.roll),0),this.camera.lookAt(this.look);const i=Math.max(0,Math.min($.length-1.001,s.fog)),a=Math.floor(i);this.fog.color.copy($[a]).lerp($[a+1],i-a),this.scene.background.copy(this.fog.color),this.fog.density=.026+Math.sin(Math.min(i,3)*Math.PI)*.004,this.stripMat.uniforms.uTime.value=e,this.stripMat.uniforms.uEnergy.value=s.energy,this.stripMat.uniforms.uFog.value.copy(this.fog.color),this.stripMat.uniforms.uDensity.value=this.fog.density,this.particleMat.uniforms.uTime.value=e,this.particleMat.uniforms.uMorph.value=s.morph,this.particleMat.uniforms.uEnergy.value=s.energy,this.particleMat.uniforms.uPixel.value=this.renderer.getPixelRatio(),this.particleMat.uniforms.uPointer.value.copy(o),this.finalPass.uniforms.uTime.value=e,this.finalPass.uniforms.uGlitch.value=s.glitch,this.bloom&&(this.bloom.strength=.6+s.glitch*.8),this.reflector&&(this.reflector.visible=s.pz>-175),this.tmpV.copy(this.camera.position);for(const r of this.updaters)r(e,t)}dispose(){this.stop(),window.removeEventListener("resize",this.resize),document.removeEventListener("visibilitychange",this.onVisibility),this.scene.traverse(e=>{var o;const t=e;(o=t.geometry)==null||o.dispose();const s=t.material;Array.isArray(s)?s.forEach(i=>i.dispose()):s&&(Object.values(s).forEach(i=>i instanceof qe&&i.dispose()),s.dispose())}),this.disposables.forEach(e=>e.dispose()),this.composer.dispose(),this.renderer.dispose()}}function J(d){let e=d;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}class pt extends $e{constructor(e){super(),this.pts=e}getPoint(e,t=new w){const s=e*(this.pts.length-1),o=Math.min(Math.floor(s),this.pts.length-2);return t.copy(this.pts[o]).lerp(this.pts[o+1],s-o)}}export{F as CORE_Z,ce as KEYS,xe as SLOTS,vt as World};
