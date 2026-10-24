import{c as pe,B as O,M as I,d as Te,e as L,f as v,g as V,h as de,i as S,j as Ce,k as b,l as $,m as se,W as Q,H,n as R,U as j,O as Se,o as J,F as ie,V as y,N as _e,p as me,A as K,R as Pe,q as Re,r as Ae,L as De,s as Ee,t as Fe,u as ge,v as ze,w as Be,x as Ue,y as Ne,z as Oe,S as Le,D as Ie,E as Ge,G as Y,I as ae,J as oe,K as We,Q as re,X as ne,Y as ke,Z as Ve,_ as Qe,$ as le,a0 as He,a1 as je,a2 as Ye,a3 as Ke,a4 as B,a5 as he,b as Xe}from"./three-DaC9PHzq.js";import{l as Ze,t as ue,h as qe,n as $e,s as Je,L as et}from"./index-DAHOVF_J.js";import"./gsap-DjKJqAo0.js";class tt extends pe{constructor(){super();const e=new O;e.deleteAttribute("uv");const t=new I({side:Te}),s=new I,a=new L(16777215,900,28,2);a.position.set(.418,16.199,.3),this.add(a);const i=new v(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);const o=new v(e,s);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const r=new v(e,s);r.position.set(-5.607,-.754,-.758),r.rotation.set(0,.994,0),r.scale.set(1.97,1.534,3.955),this.add(r);const n=new v(e,s);n.position.set(6.167,.857,7.803),n.rotation.set(0,.561,0),n.scale.set(3.927,6.285,3.687),this.add(n);const p=new v(e,s);p.position.set(-2.017,.018,6.124),p.rotation.set(0,.333,0),p.scale.set(2.002,4.566,2.064),this.add(p);const u=new v(e,s);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const l=new v(e,s);l.position.set(-2.193,-.369,-5.547),l.rotation.set(0,.516,0),l.scale.set(3.875,3.487,2.986),this.add(l);const h=new v(e,U(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const c=new v(e,U(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const x=new v(e,U(17));x.position.set(14.904,12.198,-1.832),x.scale.set(.15,4.265,6.331),this.add(x);const d=new v(e,U(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);const g=new v(e,U(20));g.position.set(3.235,11.486,-12.541),g.scale.set(2.5,2,.1),this.add(g);const f=new v(e,U(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function U(m){const e=new V;return e.color.setScalar(m),e}class X extends v{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new de;const s=this,a=t.color!==void 0?new S(t.color):new S(8355711),i=t.textureWidth||512,o=t.textureHeight||512,r=t.clipBias||0,n=t.shader||X.ReflectorShader,p=t.multisample!==void 0?t.multisample:4,u=new Ce,l=new b,h=new b,c=new b,x=new $,d=new b(0,0,-1),g=new se,f=new b,w=new b,C=new se,E=new $,T=this.camera,z=new Q(i,o,{samples:p,type:H}),_=new R({name:n.name!==void 0?n.name:"unspecified",uniforms:j.clone(n.uniforms),fragmentShader:n.fragmentShader,vertexShader:n.vertexShader});_.uniforms.tDiffuse.value=z.texture,_.uniforms.color.value=a,_.uniforms.textureMatrix.value=E,this.material=_,this.onBeforeRender=function(M,A,k){if(h.setFromMatrixPosition(s.matrixWorld),c.setFromMatrixPosition(k.matrixWorld),x.extractRotation(s.matrixWorld),l.set(0,0,1),l.applyMatrix4(x),f.subVectors(h,c),f.dot(l)>0)return;f.reflect(l).negate(),f.add(h),x.extractRotation(k.matrixWorld),d.set(0,0,-1),d.applyMatrix4(x),d.add(c),w.subVectors(h,d),w.reflect(l).negate(),w.add(h),T.position.copy(f),T.up.set(0,1,0),T.up.applyMatrix4(x),T.up.reflect(l),T.lookAt(w),T.far=k.far,T.updateMatrixWorld(),T.projectionMatrix.copy(k.projectionMatrix),E.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),E.multiply(T.projectionMatrix),E.multiply(T.matrixWorldInverse),E.multiply(s.matrixWorld),u.setFromNormalAndCoplanarPoint(l,h),u.applyMatrix4(T.matrixWorldInverse),g.set(u.normal.x,u.normal.y,u.normal.z,u.constant);const D=T.projectionMatrix;C.x=(Math.sign(g.x)+D.elements[8])/D.elements[0],C.y=(Math.sign(g.y)+D.elements[9])/D.elements[5],C.z=-1,C.w=(1+D.elements[10])/D.elements[14],g.multiplyScalar(2/g.dot(C)),D.elements[2]=g.x,D.elements[6]=g.y,D.elements[10]=g.z+1-r,D.elements[14]=g.w,s.visible=!1;const Me=M.getRenderTarget(),be=M.xr.enabled,ye=M.shadowMap.autoUpdate;M.xr.enabled=!1,M.shadowMap.autoUpdate=!1,M.setRenderTarget(z),M.state.buffers.depth.setMask(!0),M.autoClear===!1&&M.clear(),M.render(A,T),M.xr.enabled=be,M.shadowMap.autoUpdate=ye,M.setRenderTarget(Me);const te=k.viewport;te!==void 0&&M.state.viewport(te),s.visible=!0},this.getRenderTarget=function(){return z},this.dispose=function(){z.dispose(),s.material.dispose()}}}X.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};const ve={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class W{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const st=new Se(-1,1,1,-1,0,1);class it extends J{constructor(){super(),this.setAttribute("position",new ie([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ie([0,2,0,0,2,0],2))}}const at=new it;class ee{constructor(e){this._mesh=new v(at,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,st)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class xe extends W{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof R?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=j.clone(e.uniforms),this.material=new R({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ee(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class ce extends W{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const a=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let o,r;this.inverse?(o=0,r=1):(o=1,r=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),i.buffers.stencil.setFunc(a.ALWAYS,o,4294967295),i.buffers.stencil.setClear(r),i.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(a.EQUAL,1,4294967295),i.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),i.buffers.stencil.setLocked(!0)}}class ot extends W{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class rt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const s=e.getSize(new y);this._width=s.width,this._height=s.height,t=new Q(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:H}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new xe(ve),this.copyPass.material.blending=_e,this.clock=new me}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let a=0,i=this.passes.length;a<i;a++){const o=this.passes[a];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),o.needsSwap){if(s){const r=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}ce!==void 0&&(o instanceof ce?s=!0:o instanceof ot&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new y);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(s,a),this.renderTarget2.setSize(s,a);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(s,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class nt extends W{constructor(e,t,s=null,a=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=a,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new S}render(e,t,s){const a=e.autoClear;e.autoClear=!1;let i,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=a}}const lt={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new S(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class G extends W{constructor(e,t,s,a){super(),this.strength=t!==void 0?t:1,this.radius=s,this.threshold=a,this.resolution=e!==void 0?new y(e.x,e.y):new y(256,256),this.clearColor=new S(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Q(i,o,{type:H}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let l=0;l<this.nMips;l++){const h=new Q(i,o,{type:H});h.texture.name="UnrealBloomPass.h"+l,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const c=new Q(i,o,{type:H});c.texture.name="UnrealBloomPass.v"+l,c.texture.generateMipmaps=!1,this.renderTargetsVertical.push(c),i=Math.round(i/2),o=Math.round(o/2)}const r=lt;this.highPassUniforms=j.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new R({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const n=[3,5,7,9,11];i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let l=0;l<this.nMips;l++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(n[l])),this.separableBlurMaterials[l].uniforms.invSize.value=new y(1/i,1/o),i=Math.round(i/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=ve;this.copyUniforms=j.clone(u.uniforms),this.blendMaterial=new R({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:K,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new S,this.oldClearAlpha=1,this.basic=new V,this.fsQuad=new ee(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let s=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(s,a);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(s,a),this.renderTargetsVertical[i].setSize(s,a),this.separableBlurMaterials[i].uniforms.invSize.value=new y(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2)}render(e,t,s,a,i){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=s.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let r=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this.fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[n].uniforms.direction.value=G.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[n]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=G.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[n]),e.clear(),this.fsQuad.render(e),r=this.renderTargetsVertical[n];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(e*e))/e);return new R({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new y(.5,.5)},direction:{value:new y(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}}G.BlurDirectionX=new y(1,0);G.BlurDirectionY=new y(0,1);const ht={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class ut extends W{constructor(){super();const e=ht;this.uniforms=j.clone(e.uniforms),this.material=new Pe({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ee(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Re.getTransfer(this._outputColorSpace)===Ae&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===De?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ee?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fe?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ge?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ze?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Be&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const P=new S("#8B5CF6"),N=new S("#55D6FF"),Z=["#06070b","#0a0816","#071015","#130a24","#06060a"].map(m=>new S(m)),F=-400,we=Array.from({length:5},(m,e)=>{const t=e%2===0?-3.6:3.6;return{x:t,y:4.3,z:-205-e*34,rotY:t<0?.32:-.32}}),fe={hero:{px:0,py:3.4,pz:27,lx:0,ly:4.6,lz:0,roll:0,fog:0,glitch:0,morph:0,energy:1},over:{px:0,py:13.5,pz:-8,lx:0,ly:4,lz:-48,roll:0,fog:.6,glitch:0,morph:0,energy:1},corridor:{px:0,py:3.2,pz:-150,lx:0,ly:3.4,lz:-200,roll:.04,fog:1,glitch:0,morph:0,energy:1.2},...Object.fromEntries(we.map((m,e)=>[`p${e}`,{px:m.x*.22,py:m.y+.2,pz:m.z+10.5,lx:m.x*.92,ly:m.y,lz:m.z,roll:m.x<0?.015:-.015,fog:2,glitch:0,morph:0,energy:1}])),about:{px:0,py:6,pz:F+17,lx:-3.6,ly:6,lz:F,roll:0,fog:3,glitch:0,morph:0,energy:1},stack:{px:12,py:12.5,pz:F+13,lx:-5,ly:6.5,lz:F,roll:-.08,fog:3.4,glitch:0,morph:1,energy:1.2},outro:{px:0,py:1.5,pz:F+40,lx:0,ly:-.5,lz:F,roll:0,fog:4,glitch:0,morph:2,energy:1.4}};class dt{constructor(e,t,s){this.screenTextures=s,this.rig={...fe.hero},this.fps=60,this.hovered=-1,this.cur={...fe.hero},this.scene=new pe,this.camera=new de(40,1,.1,260),this.fog=new Ue("#06070b",.026),this.clock=new me,this.pointer=new y,this.pointerCur=new y,this.raycaster=new Ne,this.disposables=[],this.updaters=[],this.screens=[],this.raf=0,this.running=!1,this.started=!1,this.fpsAcc=0,this.fpsN=0,this.look=new b,this.tmpV=new b,this.onVisibility=()=>{document.hidden?this.stop():this.started&&this.start()},this.resize=()=>{const o=window.innerWidth,r=window.innerHeight;this.renderer.setSize(o,r,!1),this.composer.setSize(o,r),this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.camera.aspect=o/r,this.camera.fov=o/r<.8?58:40,this.camera.updateProjectionMatrix(),this.finalPass.uniforms.uRes.value.set(o,r),!(!this.running&&this.started===!1)&&(this.running||this.renderOnce())},this.loop=()=>{if(!this.running)return;this.raf=requestAnimationFrame(this.loop);const o=Math.min(this.clock.getDelta(),.05),r=this.clock.elapsedTime,n=1-Math.exp(-o*3.4),p=this.cur,u=this.rig;for(const l in u)p[l]+=(u[l]-p[l])*(l==="glitch"?Math.min(1,n*3):n);this.pointerCur.lerp(this.pointer,1-Math.exp(-o*2.2)),this.apply(r,o),this.composer.render(),o>0&&(this.fpsAcc+=o,this.fpsN++,this.fpsAcc>.5&&(this.fps=Math.round(this.fpsN/this.fpsAcc),this.fpsAcc=0,this.fpsN=0))},this.high=t==="high",this.renderer=new Oe({canvas:e,antialias:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.high?1.5:1)),this.renderer.toneMapping=ge,this.renderer.toneMappingExposure=1.1,this.renderer.outputColorSpace=Le,this.scene.fog=this.fog,this.scene.background=new S("#06070b");const a=new Ie(this.renderer),i=a.fromScene(new tt,.04).texture;this.scene.environment=i,this.disposables.push(a,i),this.scene.add(new Ge("#2a2440","#050507",1.2)),this.buildFloor(),this.buildMonolith(),this.buildCorridor(),this.buildGallery(),this.buildCore(),this.buildDust(),this.composer=new rt(this.renderer),this.composer.addPass(new nt(this.scene,this.camera)),this.high&&(this.bloom=new G(new y(512,512),.6,.5,.42),this.composer.addPass(this.bloom)),this.finalPass=new xe({uniforms:{tDiffuse:{value:null},uTime:{value:0},uGlitch:{value:0},uAberr:{value:.0016},uRes:{value:new y(1,1)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
      `}),this.composer.addPass(this.finalPass),this.composer.addPass(new ut),this.resize(),window.addEventListener("resize",this.resize),document.addEventListener("visibilitychange",this.onVisibility)}buildFloor(){if(this.high){const t=new X(new Y(160,260),{textureWidth:Math.round(window.innerWidth*.5),textureHeight:Math.round(window.innerHeight*.5),color:new S("#5a5a6a"),clipBias:.003});t.rotation.x=-Math.PI/2,t.position.set(0,0,-90),this.scene.add(t),this.reflector=t,this.disposables.push(t.geometry,t.material,t.getRenderTarget())}const e=new v(new Y(160,900),new R({transparent:!0,depthWrite:!1,uniforms:{uColor:{value:P},uBase:{value:new S("#07080c")},uSolid:{value:this.high?.55:1}},vertexShader:"varying vec3 vW; varying float vD; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vD = -mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:`
          uniform vec3 uColor; uniform vec3 uBase; uniform float uSolid; varying vec3 vW; varying float vD;
          float line(float v, float w){ float f = abs(fract(v) - 0.5); return smoothstep(w, 0.0, 0.5 - f); }
          void main(){
            float g = max(line(vW.x / 4.0, 0.012), line(vW.z / 4.0, 0.012));
            float fade = exp(-vD * 0.035);
            vec3 col = uBase + uColor * g * 0.2 * fade;
            gl_FragColor = vec4(col, max(uSolid, g * 0.3 * fade));
          }
        `}));e.rotation.x=-Math.PI/2,e.position.set(0,.01,-300),this.scene.add(e)}buildMonolith(){const e=new ae,t=.19,s=new I({color:"#15171f",metalness:.95,roughness:.28,envMapIntensity:.4}),a=new oe({color:P,transparent:!0,opacity:.55});Ze(t).forEach(({name:d,shape:g})=>{const f=new We(g,{depth:1.8,bevelEnabled:!0,bevelThickness:.12,bevelSize:.1,bevelSegments:2});f.translate(0,0,-.9);const w=new v(f,s);e.add(w),e.add(new re(new ne(f,25),a))});const[i,o,r]=et,n=ue(i+r/2,o+r/2,t),p=new v(new O(r*t,r*t,r*t),new I({color:N,emissive:N,emissiveIntensity:.9}));p.position.set(n.x,n.y+.6,0),e.add(p);const u=new L(N,18,14,1.8);u.position.copy(p.position),e.add(u);const l=new v(new ke(7.6,7.66,160),new V({color:P,transparent:!0,opacity:.9,side:Ve,toneMapped:!1}));l.rotation.x=-Math.PI/2,l.position.y=.03,e.add(l);const h=new Qe(P,260,60,.55,.6,1.4);h.position.set(-9,16,12),h.target.position.set(0,4,0),e.add(h,h.target);const c=new L("#c9c4ff",30,30,1.6);c.position.set(8,6,10),e.add(c);const x=new L(N,20,22,1.6);x.position.set(4,3,-6),e.add(x),this.scene.add(e),this.updaters.push(d=>{p.rotation.set(d*.6,d*.8,0),p.position.y=n.y+.6+Math.sin(d*1.4)*.25,u.position.y=p.position.y,e.rotation.y=Math.sin(d*.15)*.08})}buildCorridor(){const t=[];for(let h=-32;h>-168;h-=3.4)t.push(h);const s=new O(1,1,1);s.translate(0,.5,0);const a=new I({color:"#12141b",metalness:.9,roughness:.35,envMapIntensity:.35}),i=new le(s,a,t.length*2+Math.ceil(t.length/3)),o=new le(new O(.07,1,.07).translate(0,.5,0),void 0,t.length*2),r=new $,n=new He;let p=0,u=0;const l=q(7);t.forEach((h,c)=>{[-1,1].forEach(x=>{const d=6+l()*12,g=.7+l()*1.1,f=x*(4.6+l()*2.4);r.compose(new b(f,0,h),n,new b(g,d,g)),i.setMatrixAt(p++,r),r.compose(new b(f-x*(g/2+.06),0,h),n,new b(1,d*(.55+l()*.4),1)),o.setMatrixAt(u++,r)}),c%3===0&&(r.compose(new b(0,11+l()*4,h),n,new b(14,.5,.6)),i.setMatrixAt(p++,r))}),i.count=p,this.stripMat=new R({uniforms:{uTime:{value:0},uPurple:{value:P},uCyan:{value:N},uEnergy:{value:1},uFog:{value:new S},uDensity:{value:.026}},vertexShader:`
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
        }`}),o.material=this.stripMat,this.scene.add(i,o);for(let h=-45;h>-165;h-=30){const c=new L(P,40,22,1.7);c.position.set(0,7,h),this.scene.add(c)}this.disposables.push(s)}buildGallery(){const e=new I({color:"#101219",metalness:.9,roughness:.3,envMapIntensity:.4}),t=new oe({color:P,transparent:!0,opacity:.7}),s=qe();this.disposables.push(s),we.forEach((a,i)=>{const o=new ae;o.position.set(a.x,a.y,a.z),o.rotation.y=a.rotY;const r=7.4,n=4.6,p=new v(new O(r+.3,n+.3,.22),e);p.position.z=-.14;const u=this.screenTextures[i],l=u.image;if(l!=null&&l.width){const f=l.width/l.height,w=r/n;f>w?(u.repeat.set(w/f,1),u.offset.set((1-w/f)/2,0)):(u.repeat.set(1,f/w),u.offset.set(0,(1-f/w)/2))}const h=new v(new Y(r,n),new V({map:u,toneMapped:!1,color:new S(.62,.62,.68)}));h.userData.index=i,this.screens.push(h);const c=new re(new ne(new O(r+.3,n+.3,.22)),t);c.position.z=-.14;const x=new v(new Y(9,9),new V({map:$e(String(i+1).padStart(2,"0")),transparent:!0,opacity:.55,depthWrite:!1,toneMapped:!1}));x.position.set(a.x<0?-5.5:5.5,1.2,-4);const d=new je(new Ye({map:s,color:P,transparent:!0,opacity:.25,depthWrite:!1,blending:K}));d.scale.set(16,11,1),d.position.z=-1.2,o.add(d,p,h,c,x),this.scene.add(o);const g=a.y;this.updaters.push(f=>{o.position.y=g+Math.sin(f*.8+i)*.18,o.rotation.z=Math.sin(f*.5+i*2)*.012;const w=this.hovered===i,C=h.material,E=w?.95:.62;C.color.r+=(E-C.color.r)*.1,C.color.g=C.color.r,C.color.b=C.color.r+.05,d.material.opacity+=((w?.55:.25)-d.material.opacity)*.1})})}buildCore(){const e=this.high?9e3:3600,t=new Float32Array(e*3),s=new Float32Array(e*3),a=new Float32Array(e*3),i=new Float32Array(e),o=new Float32Array(e),r=q(42),n=Je(e,r),p=.27;for(let c=0;c<e;c++){const x=c+.5,d=Math.acos(1-2*x/e),g=Math.PI*(1+Math.sqrt(5))*x,f=c%5===0?5.6*Math.cbrt(r()):5.6;t.set([f*Math.cos(g)*Math.sin(d),f*Math.sin(g)*Math.sin(d),f*Math.cos(d)],c*3);const w=c%4;if(w===3){const _=1.6*Math.cbrt(r()),M=r()*Math.PI*2,A=Math.acos(2*r()-1);s.set([_*Math.sin(A)*Math.cos(M),_*Math.sin(A)*Math.sin(M),_*Math.cos(A)],c*3)}else{const _=[4.2,6.6,9][w]+(r()-.5)*.25,M=r()*Math.PI*2,A=new b(Math.cos(M)*_,(r()-.5)*.15,Math.sin(M)*_);A.applyEuler(new Ke([.4,-.7,1.2][w],[0,.6,-.3][w],[.2,.5,0][w])),s.set([A.x,A.y,A.z],c*3)}const[C,E,T]=n[c%n.length],z=ue(C,E,p);a.set([z.x,z.y-5.9,(r()-.5)*.7],c*3),i[c]=r(),o[c]=T?2:r()<.3?1:0}const u=new J;u.setAttribute("position",new B(t,3)),u.setAttribute("aB",new B(s,3)),u.setAttribute("aC",new B(a,3)),u.setAttribute("aR",new B(i,1)),u.setAttribute("aT",new B(o,1)),this.particleMat=new R({transparent:!0,depthWrite:!1,blending:K,uniforms:{uTime:{value:0},uMorph:{value:0},uPixel:{value:1},uEnergy:{value:1},uPurple:{value:P},uCyan:{value:N},uPointer:{value:new y}},vertexShader:`
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
        }`});const l=new he(u,this.particleMat);l.position.set(0,6,F),l.frustumCulled=!1,this.scene.add(l);const h=new L(P,60,30,1.5);h.position.set(0,6,F),this.scene.add(h)}buildDust(){const e=this.high?4200:1500,t=new Float32Array(e*3),s=new Float32Array(e),a=q(3);for(let n=0;n<e;n++)t.set([(a()-.5)*50,a()*18,30-a()*460],n*3),s[n]=a();const i=new J;i.setAttribute("position",new B(t,3)),i.setAttribute("aR",new B(s,1));const o=new R({transparent:!0,depthWrite:!1,blending:K,uniforms:{uTime:{value:0},uPixel:{value:1},uPurple:{value:P}},vertexShader:`
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
        }`}),r=new he(i,o);r.frustumCulled=!1,this.scene.add(r),this.updaters.push(n=>{o.uniforms.uTime.value=n,o.uniforms.uPixel.value=this.renderer.getPixelRatio()})}setPointer(e,t){this.pointer.set(e,t)}pick(e,t){const s=new y(e/window.innerWidth*2-1,-(t/window.innerHeight)*2+1);this.raycaster.setFromCamera(s,this.camera);const a=this.raycaster.intersectObjects(this.screens,!1)[0];return a&&a.distance<30?a.object.userData.index:-1}start(){this.running||(this.started||(Object.assign(this.cur,this.rig),this.started=!0),this.running=!0,this.clock.getDelta(),this.loop())}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderOnce(){Object.assign(this.cur,this.rig),this.apply(1.5,0),this.composer.render()}apply(e,t){const s=this.cur,a=this.pointerCur;this.camera.position.set(s.px+a.x*.7,s.py+a.y*.45,s.pz),this.look.set(s.lx+a.x*.4,s.ly+a.y*.3,s.lz),this.camera.up.set(Math.sin(s.roll),Math.cos(s.roll),0),this.camera.lookAt(this.look);const i=Math.max(0,Math.min(Z.length-1.001,s.fog)),o=Math.floor(i);this.fog.color.copy(Z[o]).lerp(Z[o+1],i-o),this.scene.background.copy(this.fog.color),this.fog.density=.026+Math.sin(Math.min(i,3)*Math.PI)*.004,this.stripMat.uniforms.uTime.value=e,this.stripMat.uniforms.uEnergy.value=s.energy,this.stripMat.uniforms.uFog.value.copy(this.fog.color),this.stripMat.uniforms.uDensity.value=this.fog.density,this.particleMat.uniforms.uTime.value=e,this.particleMat.uniforms.uMorph.value=s.morph,this.particleMat.uniforms.uEnergy.value=s.energy,this.particleMat.uniforms.uPixel.value=this.renderer.getPixelRatio(),this.particleMat.uniforms.uPointer.value.copy(a),this.finalPass.uniforms.uTime.value=e,this.finalPass.uniforms.uGlitch.value=s.glitch,this.bloom&&(this.bloom.strength=.6+s.glitch*.8),this.reflector&&(this.reflector.visible=s.pz>-175),this.tmpV.copy(this.camera.position);for(const r of this.updaters)r(e,t)}dispose(){this.stop(),window.removeEventListener("resize",this.resize),document.removeEventListener("visibilitychange",this.onVisibility),this.scene.traverse(e=>{var a;const t=e;(a=t.geometry)==null||a.dispose();const s=t.material;Array.isArray(s)?s.forEach(i=>i.dispose()):s&&(Object.values(s).forEach(i=>i instanceof Xe&&i.dispose()),s.dispose())}),this.disposables.forEach(e=>e.dispose()),this.composer.dispose(),this.renderer.dispose()}}function q(m){let e=m;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}export{F as CORE_Z,fe as KEYS,we as SLOTS,dt as World};
