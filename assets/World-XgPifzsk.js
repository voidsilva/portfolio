import{b as De,B as q,M as $,c as Ue,P as O,d,e as j,f as Re,g as P,h as Be,i as C,j as ce,k as ge,W as J,H as ee,l as E,U as te,O as We,m as fe,F as xe,V as A,N as Ie,n as Ae,A as L,R as Ne,o as Oe,p as Le,L as ke,q as Ge,r as Ve,s as Fe,t as je,u as Qe,v as He,w as Ye,x as Ke,S as Xe,y as Ze,z as qe,D as K,G as X,E as we,I as re,J as Me,K as ye,Q as be,X as $e,Y as Je,Z,_ as Te,$ as et,a0 as tt,a1 as st,a2 as it,a3 as ot,a4 as N,a5 as Ce,a as at,a6 as rt,a7 as nt}from"./three-DrYO9VF3.js";import{L as ne,p as lt,t as le,h as Se,n as ut,s as ht}from"./index-B6z0aCWm.js";import"./gsap-DjKJqAo0.js";class ct extends De{constructor(){super();const e=new q;e.deleteAttribute("uv");const t=new $({side:Ue}),s=new $,o=new O(16777215,900,28,2);o.position.set(.418,16.199,.3),this.add(o);const i=new d(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);const a=new d(e,s);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const r=new d(e,s);r.position.set(-5.607,-.754,-.758),r.rotation.set(0,.994,0),r.scale.set(1.97,1.534,3.955),this.add(r);const n=new d(e,s);n.position.set(6.167,.857,7.803),n.rotation.set(0,.561,0),n.scale.set(3.927,6.285,3.687),this.add(n);const x=new d(e,s);x.position.set(-2.017,.018,6.124),x.rotation.set(0,.333,0),x.scale.set(2.002,4.566,2.064),this.add(x);const u=new d(e,s);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const l=new d(e,s);l.position.set(-2.193,-.369,-5.547),l.rotation.set(0,.516,0),l.scale.set(3.875,3.487,2.986),this.add(l);const h=new d(e,G(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const c=new d(e,G(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const T=new d(e,G(17));T.position.set(14.904,12.198,-1.832),T.scale.set(.15,4.265,6.331),this.add(T);const w=new d(e,G(43));w.position.set(-.462,8.89,14.52),w.scale.set(4.38,5.441,.088),this.add(w);const v=new d(e,G(20));v.position.set(3.235,11.486,-12.541),v.scale.set(2.5,2,.1),this.add(v);const g=new d(e,G(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function G(m){const e=new j;return e.color.setScalar(m),e}class se extends d{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new Re;const s=this,o=t.color!==void 0?new P(t.color):new P(8355711),i=t.textureWidth||512,a=t.textureHeight||512,r=t.clipBias||0,n=t.shader||se.ReflectorShader,x=t.multisample!==void 0?t.multisample:4,u=new Be,l=new C,h=new C,c=new C,T=new ce,w=new C(0,0,-1),v=new ge,g=new C,M=new C,D=new ge,U=new ce,S=this.camera,R=new J(i,a,{samples:x,type:ee}),F=new E({name:n.name!==void 0?n.name:"unspecified",uniforms:te.clone(n.uniforms),fragmentShader:n.fragmentShader,vertexShader:n.vertexShader});F.uniforms.tDiffuse.value=R.texture,F.uniforms.color.value=o,F.uniforms.textureMatrix.value=U,this.material=F,this.onBeforeRender=function(y,f,_){if(h.setFromMatrixPosition(s.matrixWorld),c.setFromMatrixPosition(_.matrixWorld),T.extractRotation(s.matrixWorld),l.set(0,0,1),l.applyMatrix4(T),g.subVectors(h,c),g.dot(l)>0)return;g.reflect(l).negate(),g.add(h),T.extractRotation(_.matrixWorld),w.set(0,0,-1),w.applyMatrix4(T),w.add(c),M.subVectors(h,w),M.reflect(l).negate(),M.add(h),S.position.copy(g),S.up.set(0,1,0),S.up.applyMatrix4(T),S.up.reflect(l),S.lookAt(M),S.far=_.far,S.updateMatrixWorld(),S.projectionMatrix.copy(_.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(S.projectionMatrix),U.multiply(S.matrixWorldInverse),U.multiply(s.matrixWorld),u.setFromNormalAndCoplanarPoint(l,h),u.applyMatrix4(S.matrixWorldInverse),v.set(u.normal.x,u.normal.y,u.normal.z,u.constant);const p=S.projectionMatrix;D.x=(Math.sign(v.x)+p.elements[8])/p.elements[0],D.y=(Math.sign(v.y)+p.elements[9])/p.elements[5],D.z=-1,D.w=(1+p.elements[10])/p.elements[14],v.multiplyScalar(2/v.dot(D)),p.elements[2]=v.x,p.elements[6]=v.y,p.elements[10]=v.z+1-r,p.elements[14]=v.w,s.visible=!1;const b=y.getRenderTarget(),z=y.xr.enabled,W=y.shadowMap.autoUpdate;y.xr.enabled=!1,y.shadowMap.autoUpdate=!1,y.setRenderTarget(R),y.state.buffers.depth.setMask(!0),y.autoClear===!1&&y.clear(),y.render(f,S),y.xr.enabled=z,y.shadowMap.autoUpdate=W,y.setRenderTarget(b);const Y=_.viewport;Y!==void 0&&y.state.viewport(Y),s.visible=!0},this.getRenderTarget=function(){return R},this.dispose=function(){R.dispose(),s.material.dispose()}}}se.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};const ze={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class H{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ft=new We(-1,1,1,-1,0,1);class pt extends fe{constructor(){super(),this.setAttribute("position",new xe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new xe([0,2,0,0,2,0],2))}}const dt=new pt;class de{constructor(e){this._mesh=new d(dt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ft)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class pe extends H{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof E?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=te.clone(e.uniforms),this.material=new E({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new de(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class _e extends H{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const o=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,r;this.inverse?(a=0,r=1):(a=1,r=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),i.buffers.stencil.setFunc(o.ALWAYS,a,4294967295),i.buffers.stencil.setClear(r),i.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(o.EQUAL,1,4294967295),i.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),i.buffers.stencil.setLocked(!0)}}class mt extends H{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class vt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const s=e.getSize(new A);this._width=s.width,this._height=s.height,t=new J(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ee}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new pe(ze),this.copyPass.material.blending=Ie,this.clock=new Ae}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let o=0,i=this.passes.length;o<i;o++){const a=this.passes[o];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),a.needsSwap){if(s){const r=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}_e!==void 0&&(a instanceof _e?s=!0:a instanceof mt&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new A);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(s,o),this.renderTarget2.setSize(s,o);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(s,o)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class gt extends H{constructor(e,t,s=null,o=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=o,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new P}render(e,t,s){const o=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=o}}const xt={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new P(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Q extends H{constructor(e,t,s,o){super(),this.strength=t!==void 0?t:1,this.radius=s,this.threshold=o,this.resolution=e!==void 0?new A(e.x,e.y):new A(256,256),this.clearColor=new P(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new J(i,a,{type:ee}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let l=0;l<this.nMips;l++){const h=new J(i,a,{type:ee});h.texture.name="UnrealBloomPass.h"+l,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const c=new J(i,a,{type:ee});c.texture.name="UnrealBloomPass.v"+l,c.texture.generateMipmaps=!1,this.renderTargetsVertical.push(c),i=Math.round(i/2),a=Math.round(a/2)}const r=xt;this.highPassUniforms=te.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new E({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const n=[3,5,7,9,11];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let l=0;l<this.nMips;l++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(n[l])),this.separableBlurMaterials[l].uniforms.invSize.value=new A(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const x=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=x,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=ze;this.copyUniforms=te.clone(u.uniforms),this.blendMaterial=new E({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:L,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new P,this.oldClearAlpha=1,this.basic=new j,this.fsQuad=new de(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let s=Math.round(e/2),o=Math.round(t/2);this.renderTargetBright.setSize(s,o);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(s,o),this.renderTargetsVertical[i].setSize(s,o),this.separableBlurMaterials[i].uniforms.invSize.value=new A(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2)}render(e,t,s,o,i){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let r=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this.fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[n].uniforms.direction.value=Q.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[n]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=Q.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[n]),e.clear(),this.fsQuad.render(e),r=this.renderTargetsVertical[n];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(e*e))/e);return new E({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new A(.5,.5)},direction:{value:new A(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new E({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Q.BlurDirectionX=new A(1,0);Q.BlurDirectionY=new A(0,1);const wt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Mt extends H{constructor(){super();const e=wt;this.uniforms=te.clone(e.uniforms),this.material=new Ne({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new de(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Oe.getTransfer(this._outputColorSpace)===Le&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ke?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ge?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ve?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Fe?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===je?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Qe&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const B=new P("#8B5CF6"),V=new P("#55D6FF"),ue=["#06070b","#0a0816","#071015","#130a24","#06060a"].map(m=>new P(m)),I=-400,Ee=Array.from({length:5},(m,e)=>{const t=e%2===0?-3.6:3.6;return{x:t,y:4.3,z:-205-e*34,rotY:t<0?.32:-.32}}),Pe={hero:{px:-4.2,py:3.4,pz:27,lx:-4.6,ly:4.8,lz:0,roll:0,fog:0,glitch:0,morph:0,energy:1},over:{px:0,py:13.5,pz:-8,lx:0,ly:4,lz:-48,roll:0,fog:.6,glitch:0,morph:0,energy:1},corridor:{px:0,py:3.2,pz:-150,lx:0,ly:3.4,lz:-200,roll:.04,fog:1,glitch:0,morph:0,energy:1.2},...Object.fromEntries(Ee.map((m,e)=>[`p${e}`,{px:m.x*.22,py:m.y+.2,pz:m.z+10.5,lx:m.x*.92,ly:m.y,lz:m.z,roll:m.x<0?.015:-.015,fog:2,glitch:0,morph:0,energy:1}])),about:{px:0,py:6,pz:I+17,lx:-3.6,ly:6,lz:I,roll:0,fog:3,glitch:0,morph:0,energy:1},stack:{px:12,py:12.5,pz:I+13,lx:-5,ly:6.5,lz:I,roll:-.08,fog:3.4,glitch:0,morph:1,energy:1.2},outro:{px:0,py:1.5,pz:I+40,lx:0,ly:-.5,lz:I,roll:0,fog:4,glitch:0,morph:2,energy:1.4}};class St{constructor(e,t,s){this.screenTextures=s,this.rig={...Pe.hero},this.fps=60,this.hovered=-1,this.cur={...Pe.hero},this.scene=new De,this.camera=new Re(40,1,.1,260),this.fog=new He("#06070b",.026),this.clock=new Ae,this.pointer=new A,this.pointerCur=new A,this.raycaster=new Ye,this.disposables=[],this.updaters=[],this.screens=[],this.raf=0,this.running=!1,this.started=!1,this.fpsAcc=0,this.fpsN=0,this.look=new C,this.tmpV=new C,this.reducedIntro=!1,this.introStart=()=>{},this.introSkip=()=>{},this.onVisibility=()=>{document.hidden?this.stop():this.started&&this.start()},this.resize=()=>{const a=window.innerWidth,r=window.innerHeight;this.renderer.setSize(a,r,!1),this.composer.setSize(a,r),this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.camera.aspect=a/r,this.camera.fov=a/r<.8?58:40,this.camera.updateProjectionMatrix(),this.finalPass.uniforms.uRes.value.set(a,r),!(!this.running&&this.started===!1)&&(this.running||this.renderOnce())},this.loop=()=>{if(!this.running)return;this.raf=requestAnimationFrame(this.loop);const a=Math.min(this.clock.getDelta(),.05),r=this.clock.elapsedTime,n=1-Math.exp(-a*3.4),x=this.cur,u=this.rig;for(const l in u)x[l]+=(u[l]-x[l])*(l==="glitch"?Math.min(1,n*3):n);this.pointerCur.lerp(this.pointer,1-Math.exp(-a*2.2)),this.apply(r,a),this.composer.render(),a>0&&(this.fpsAcc+=a,this.fpsN++,this.fpsAcc>.5&&(this.fps=Math.round(this.fpsN/this.fpsAcc),this.fpsAcc=0,this.fpsN=0))},this.high=t==="high",this.renderer=new Ke({canvas:e,antialias:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.high?1.5:1)),this.renderer.toneMapping=Fe,this.renderer.toneMappingExposure=1.1,this.renderer.outputColorSpace=Xe,this.scene.fog=this.fog,this.scene.background=new P("#06070b");const o=new Ze(this.renderer),i=o.fromScene(new ct,.04).texture;this.scene.environment=i,this.disposables.push(o,i),this.scene.add(new qe("#2a2440","#050507",1.2)),this.buildFloor(),this.buildMonolith(),this.buildCorridor(),this.buildGallery(),this.buildCore(),this.buildDust(),this.composer=new vt(this.renderer),this.composer.addPass(new gt(this.scene,this.camera)),this.high&&(this.composer.addPass(new pe({uniforms:{tDiffuse:{value:null}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
            uniform sampler2D tDiffuse; varying vec2 vUv;
            void main(){
              vec4 c = texture2D(tDiffuse, vUv);
              if (any(isnan(c)) || any(isinf(c))) c = vec4(0.0, 0.0, 0.0, 1.0);
              gl_FragColor = vec4(clamp(c.rgb, 0.0, 24.0), 1.0);
            }`})),this.bloom=new Q(new A(512,512),.5,.5,.5),this.composer.addPass(this.bloom)),this.finalPass=new pe({uniforms:{tDiffuse:{value:null},uTime:{value:0},uGlitch:{value:0},uAberr:{value:.0016},uRes:{value:new A(1,1)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
      `}),this.composer.addPass(this.finalPass),this.composer.addPass(new Mt),this.resize(),window.addEventListener("resize",this.resize),document.addEventListener("visibilitychange",this.onVisibility)}buildFloor(){if(this.high){const s={name:"WaterReflector",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null},uTime:{value:0},uFog:{value:new P},uDensity:{value:.026}},vertexShader:`
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
            uv.xy += w * 0.0045 * uv.w;
            vec4 base = texture2DProj(tDiffuse, uv);
            float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
            gl_FragColor = vec4(mix(base.rgb * color, uFog, f), 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`},o=new se(new K(160,260),{textureWidth:Math.round(window.innerWidth*.6),textureHeight:Math.round(window.innerHeight*.6),color:new P("#9a98b4"),clipBias:.003,shader:s});o.rotation.x=-Math.PI/2,o.position.set(0,0,-90),this.scene.add(o),this.reflector=o;const i=o.material;this.updaters.push(a=>{i.uniforms.uTime.value=a,i.uniforms.uFog.value.copy(this.fog.color),i.uniforms.uDensity.value=this.fog.density}),this.disposables.push(o.geometry,i,o.getRenderTarget())}const e=new d(new K(160,900),new E({transparent:!0,depthWrite:!1,uniforms:{uColor:{value:B},uBase:{value:new P("#07080c")},uSolid:{value:this.high?.3:1},uFog:{value:new P},uDensity:{value:.026}},vertexShader:"varying vec3 vW; varying float vD; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vD = -mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:`
          uniform vec3 uColor; uniform vec3 uBase; uniform float uSolid; uniform vec3 uFog; uniform float uDensity; varying vec3 vW; varying float vD;
          float line(float v, float w){ float f = abs(fract(v) - 0.5); return smoothstep(w, 0.0, 0.5 - f); }
          void main(){
            float g = max(line(vW.x / 4.0, 0.012), line(vW.z / 4.0, 0.012));
            float fade = exp(-vD * 0.035);
            vec3 col = uBase + uColor * g * 0.2 * fade;
            float f = 1.0 - exp(-uDensity * uDensity * vD * vD);
            gl_FragColor = vec4(mix(col, uFog, f), max(uSolid, g * 0.3 * fade));
          }
        `}));e.rotation.x=-Math.PI/2,e.position.set(0,.01,-300),this.scene.add(e);const t=e.material;this.updaters.push(()=>{t.uniforms.uFog.value.copy(this.fog.color),t.uniforms.uDensity.value=this.fog.density})}buildMonolith(){const e=new X,t=.19,s={white:new P("#F4F5FA"),purple:B},o=f=>this.high?new rt({color:f==="white"?"#dfe3f5":"#cdbcff",metalness:0,roughness:.06,transmission:1,thickness:.9,ior:1.45,iridescence:.7,iridescenceIOR:1.3,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.4}):new $({color:"#1a1c26",metalness:.9,roughness:.2,transparent:!0,opacity:.35}),i=[],a=[];let r=[];ne.strokes.forEach(f=>{const{pts:_,closed:p}=lt(f.d,.3),b=_.map(([ae,k])=>{const ve=le(ae,k,t);return new C(ve.x,ve.y,0)});b.length>r.length&&(r=b);const z=new yt(b),W=f.w/2*t,Y=b.length*2,ie=new we(z,Y,W,28,p),oe=new we(z,Y,W*.28,10,p),me=new j({color:s[f.tone].clone().multiplyScalar(f.tone==="white"?1.15:2.4),toneMapped:!1});e.add(new d(ie,o(f.tone)),new d(oe,me)),i.push({geo:ie,total:ie.index.count},{geo:oe,total:oe.index.count}),p||[b[0],b[b.length-1]].forEach(ae=>{const k=new X;k.position.copy(ae),k.add(new d(new re(W,28,18),o(f.tone)),new d(new re(W*.28,12,8),me)),e.add(k),a.push(k)})});const n=ne.dots.map(f=>{const _=le(f.cx,f.cy,t),p=new d(new re(f.r*t,32,20),new j({color:V.clone().multiplyScalar(2.5),toneMapped:!1}));p.position.set(_.x,_.y+.4,0);const b=new O(V,22,16,1.8);return b.position.copy(p.position),e.add(p,b),{m:p,light:b,y:p.position.y}}),x=new X;x.position.set(0,4.6,-7);const u=new E({transparent:!0,depthWrite:!1,blending:L,uniforms:{uTime:{value:0},uIntro:{value:0},uPurple:{value:B},uCyan:{value:V}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform float uTime; uniform float uIntro; uniform vec3 uPurple; uniform vec3 uCyan; varying vec2 vUv;
        void main(){
          float a = vUv.x;
          float sweep = smoothstep(0.0, 0.02, uIntro - a);
          float hl = pow(0.5 + 0.5 * sin((a - uTime * 0.05) * 6.2832), 6.0);
          vec3 col = mix(uPurple, uCyan, hl) * (1.2 + hl * 3.0);
          float edge = 1.0 - abs(vUv.y - 0.5) * 2.0;
          gl_FragColor = vec4(col * edge, edge * sweep);
        }`}),l=new d(new Me(9.5,.05,12,400),u);l.rotation.z=Math.PI/2;const h=new d(new Me(10.4,.015,8,400),u);h.rotation.z=Math.PI/2;const c=Se();this.disposables.push(c);const T=new ye(new be({map:c,color:B,transparent:!0,opacity:0,depthWrite:!1,blending:L}));T.scale.set(34,34,1),x.add(T,l,h),e.add(x);const w=new E({transparent:!0,depthWrite:!1,side:$e,blending:L,uniforms:{uTime:{value:0},uColor:{value:new P("#9d80ff")},uI:{value:0}},vertexShader:"varying vec2 vUv; varying vec3 vW; void main(){ vUv = uv; vW = (modelMatrix * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * viewMatrix * vec4(vW, 1.0); }",fragmentShader:`
        uniform float uTime; uniform vec3 uColor; uniform float uI; varying vec2 vUv; varying vec3 vW;
        void main(){
          float x = 1.0 - abs(vUv.x - 0.5) * 2.0;
          float fall = smoothstep(0.0, 0.45, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
          float flicker = 0.75 + 0.25 * sin(uTime * 0.7 + vW.x * 2.0) * sin(uTime * 0.43 + vW.z);
          float a = pow(x, 2.5) * fall * flicker * 0.16 * uI;
          gl_FragColor = vec4(uColor, a);
        }`}),v=new X;[[-4.5,-2,.22,3.2],[-1.5,-3,.08,2.4],[2.2,-2.5,-.12,3.6],[5,-1.5,-.25,2.6],[.4,-4.5,.02,4.2]].forEach(([f,_,p,b])=>{const z=new d(new K(b,26),w);z.position.set(f,11,_),z.rotation.set(0,0,p),v.add(z);const W=z.clone();W.rotation.y=Math.PI/2,v.add(W)}),e.add(v);const M=new Je(B,300,60,.6,.6,1.4);M.position.set(-9,16,12),M.target.position.set(0,4,0),e.add(M,M.target);const D=new O("#c9c4ff",40,30,1.6);D.position.set(8,6,10),e.add(D);const U=new O(V,26,22,1.6);U.position.set(4,3,-5),e.add(U),e.position.y=.8,this.scene.add(e);const S=new O("#ffffff",0,8,2);e.add(S);let R=this.reducedIntro?1:0,F=!1;const y=f=>{i.forEach(({geo:_,total:p})=>_.setDrawRange(0,Math.floor(p*f/6)*6)),a.forEach((_,p)=>_.scale.setScalar(Math.max(1e-4,Z.smoothstep(f,p%2?.92:0,p%2?1:.08))))};y(R),this.introStart=()=>{R=0,F=!0},this.introSkip=()=>{R=1,F=!1,y(1)},this.updaters.push((f,_)=>{if(F&&R<1){R=Math.min(1,R+_/3.2);const b=1-Math.pow(1-R,3);y(b);const z=r[Math.min(r.length-1,Math.floor(b*(r.length-1)))];S.position.copy(z),S.intensity=R<1?30:0}const p=R;u.uniforms.uTime.value=f,u.uniforms.uIntro.value=Z.smoothstep(p,.2,.9)*1.02,T.material.opacity=.28*Z.smoothstep(p,.5,1),w.uniforms.uTime.value=f,w.uniforms.uI.value=Z.smoothstep(p,.6,1),x.rotation.z=Math.sin(f*.1)*.05,n.forEach((b,z)=>{b.m.position.y=b.y+Math.sin(f*1.4+z)*.25,b.light.position.y=b.m.position.y,b.m.scale.setScalar(Math.max(1e-4,Z.smoothstep(p,.85,1)))}),e.rotation.y=Math.sin(f*.2)*.1})}buildCorridor(){const t=[];for(let h=-32;h>-168;h-=3.4)t.push(h);const s=new q(1,1,1);s.translate(0,.5,0);const o=new $({color:"#12141b",metalness:.9,roughness:.35,envMapIntensity:.35}),i=new Te(s,o,t.length*2+Math.ceil(t.length/3)),a=new Te(new q(.07,1,.07).translate(0,.5,0),void 0,t.length*2),r=new ce,n=new et;let x=0,u=0;const l=he(7);t.forEach((h,c)=>{[-1,1].forEach(T=>{const w=6+l()*12,v=.7+l()*1.1,g=T*(4.6+l()*2.4);r.compose(new C(g,0,h),n,new C(v,w,v)),i.setMatrixAt(x++,r),r.compose(new C(g-T*(v/2+.06),0,h),n,new C(1,w*(.55+l()*.4),1)),a.setMatrixAt(u++,r)}),c%3===0&&(r.compose(new C(0,11+l()*4,h),n,new C(14,.5,.6)),i.setMatrixAt(x++,r))}),i.count=x,this.stripMat=new E({uniforms:{uTime:{value:0},uPurple:{value:B},uCyan:{value:V},uEnergy:{value:1},uFog:{value:new P},uDensity:{value:.026}},vertexShader:`
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
        }`}),a.material=this.stripMat,this.scene.add(i,a);for(let h=-45;h>-165;h-=30){const c=new O(B,40,22,1.7);c.position.set(0,7,h),this.scene.add(c)}this.disposables.push(s)}buildGallery(){const e=new $({color:"#101219",metalness:.9,roughness:.3,envMapIntensity:.4}),t=new tt({color:B,transparent:!0,opacity:.7}),s=Se();this.disposables.push(s),Ee.forEach((o,i)=>{const a=new X;a.position.set(o.x,o.y,o.z),a.rotation.y=o.rotY;const r=7.4,n=4.6,x=new d(new q(r+.3,n+.3,.22),e);x.position.z=-.14;const u=this.screenTextures[i],l=u.image;if(l!=null&&l.width){const g=l.width/l.height,M=r/n;g>M?(u.repeat.set(M/g,1),u.offset.set((1-M/g)/2,0)):(u.repeat.set(1,g/M),u.offset.set(0,(1-g/M)/2))}const h=new d(new K(r,n),new j({map:u,toneMapped:!1,color:new P(.62,.62,.68)}));h.userData.index=i,this.screens.push(h);const c=new st(new it(new q(r+.3,n+.3,.22)),t);c.position.z=-.14;const T=new d(new K(9,9),new j({map:ut(String(i+1).padStart(2,"0")),transparent:!0,opacity:.55,depthWrite:!1,toneMapped:!1}));T.position.set(o.x<0?-5.5:5.5,1.2,-4);const w=new ye(new be({map:s,color:B,transparent:!0,opacity:.25,depthWrite:!1,blending:L}));w.scale.set(16,11,1),w.position.z=-1.2,a.add(w,x,h,c,T),this.scene.add(a);const v=o.y;this.updaters.push(g=>{a.position.y=v+Math.sin(g*.8+i)*.18,a.rotation.z=Math.sin(g*.5+i*2)*.012;const M=this.hovered===i,D=h.material,U=M?.95:.62;D.color.r+=(U-D.color.r)*.1,D.color.g=D.color.r,D.color.b=D.color.r+.05,w.material.opacity+=((M?.55:.25)-w.material.opacity)*.1})})}buildCore(){const e=this.high?9e3:3600,t=new Float32Array(e*3),s=new Float32Array(e*3),o=new Float32Array(e*3),i=new Float32Array(e),a=new Float32Array(e),r=he(42),n=ht(ne,e,r),x=.27;for(let c=0;c<e;c++){const T=c+.5,w=Math.acos(1-2*T/e),v=Math.PI*(1+Math.sqrt(5))*T,g=c%5===0?5.6*Math.cbrt(r()):5.6;t.set([g*Math.cos(v)*Math.sin(w),g*Math.sin(v)*Math.sin(w),g*Math.cos(w)],c*3);const M=c%4;if(M===3){const F=1.6*Math.cbrt(r()),y=r()*Math.PI*2,f=Math.acos(2*r()-1);s.set([F*Math.sin(f)*Math.cos(y),F*Math.sin(f)*Math.sin(y),F*Math.cos(f)],c*3)}else{const F=[4.2,6.6,9][M]+(r()-.5)*.25,y=r()*Math.PI*2,f=new C(Math.cos(y)*F,(r()-.5)*.15,Math.sin(y)*F);f.applyEuler(new ot([.4,-.7,1.2][M],[0,.6,-.3][M],[.2,.5,0][M])),s.set([f.x,f.y,f.z],c*3)}const[D,U,S]=n[c%n.length],R=le(D,U,x);o.set([R.x,R.y-5.9,(r()-.5)*.7],c*3),i[c]=r(),a[c]=S==="cyan"?2:S==="white"||r()<.12?1:0}const u=new fe;u.setAttribute("position",new N(t,3)),u.setAttribute("aB",new N(s,3)),u.setAttribute("aC",new N(o,3)),u.setAttribute("aR",new N(i,1)),u.setAttribute("aT",new N(a,1)),this.particleMat=new E({transparent:!0,depthWrite:!1,blending:L,uniforms:{uTime:{value:0},uMorph:{value:0},uPixel:{value:1},uEnergy:{value:1},uPurple:{value:B},uCyan:{value:V},uPointer:{value:new A}},vertexShader:`
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
        }`});const l=new Ce(u,this.particleMat);l.position.set(0,6,I),l.frustumCulled=!1,this.scene.add(l);const h=new O(B,60,30,1.5);h.position.set(0,6,I),this.scene.add(h)}buildDust(){const e=this.high?4200:1500,t=new Float32Array(e*3),s=new Float32Array(e),o=he(3);for(let n=0;n<e;n++)t.set([(o()-.5)*50,o()*18,30-o()*460],n*3),s[n]=o();const i=new fe;i.setAttribute("position",new N(t,3)),i.setAttribute("aR",new N(s,1));const a=new E({transparent:!0,depthWrite:!1,blending:L,uniforms:{uTime:{value:0},uPixel:{value:1},uPurple:{value:B}},vertexShader:`
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
        }`}),r=new Ce(i,a);r.frustumCulled=!1,this.scene.add(r),this.updaters.push(n=>{a.uniforms.uTime.value=n,a.uniforms.uPixel.value=this.renderer.getPixelRatio()})}setPointer(e,t){this.pointer.set(e,t)}pick(e,t){const s=new A(e/window.innerWidth*2-1,-(t/window.innerHeight)*2+1);this.raycaster.setFromCamera(s,this.camera);const o=this.raycaster.intersectObjects(this.screens,!1)[0];return o&&o.distance<30?o.object.userData.index:-1}start(){this.running||(this.started||(Object.assign(this.cur,this.rig),this.started=!0),this.running=!0,this.clock.getDelta(),this.loop())}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderOnce(){Object.assign(this.cur,this.rig),this.apply(1.5,0),this.composer.render()}apply(e,t){const s=this.cur,o=this.pointerCur;this.camera.position.set(s.px+o.x*1.5,s.py+o.y*.8,s.pz),this.look.set(s.lx+o.x*.4,s.ly+o.y*.3,s.lz),this.camera.up.set(Math.sin(s.roll),Math.cos(s.roll),0),this.camera.lookAt(this.look);const i=Math.max(0,Math.min(ue.length-1.001,s.fog)),a=Math.floor(i);this.fog.color.copy(ue[a]).lerp(ue[a+1],i-a),this.scene.background.copy(this.fog.color),this.fog.density=.026+Math.sin(Math.min(i,3)*Math.PI)*.004,this.stripMat.uniforms.uTime.value=e,this.stripMat.uniforms.uEnergy.value=s.energy,this.stripMat.uniforms.uFog.value.copy(this.fog.color),this.stripMat.uniforms.uDensity.value=this.fog.density,this.particleMat.uniforms.uTime.value=e,this.particleMat.uniforms.uMorph.value=s.morph,this.particleMat.uniforms.uEnergy.value=s.energy,this.particleMat.uniforms.uPixel.value=this.renderer.getPixelRatio(),this.particleMat.uniforms.uPointer.value.copy(o),this.finalPass.uniforms.uTime.value=e,this.finalPass.uniforms.uGlitch.value=s.glitch,this.bloom&&(this.bloom.strength=.5+s.glitch*.8),this.reflector&&(this.reflector.visible=s.pz>-175),this.tmpV.copy(this.camera.position);for(const r of this.updaters)r(e,t)}dispose(){this.stop(),window.removeEventListener("resize",this.resize),document.removeEventListener("visibilitychange",this.onVisibility),this.scene.traverse(e=>{var o;const t=e;(o=t.geometry)==null||o.dispose();const s=t.material;Array.isArray(s)?s.forEach(i=>i.dispose()):s&&(Object.values(s).forEach(i=>i instanceof at&&i.dispose()),s.dispose())}),this.disposables.forEach(e=>e.dispose()),this.composer.dispose(),this.renderer.dispose()}}function he(m){let e=m;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}class yt extends nt{constructor(e){super(),this.pts=e}getPoint(e,t=new C){const s=e*(this.pts.length-1),o=Math.min(Math.floor(s),this.pts.length-2);return t.copy(this.pts[o]).lerp(this.pts[o+1],s-o)}}export{I as CORE_Z,Pe as KEYS,Ee as SLOTS,St as World};
