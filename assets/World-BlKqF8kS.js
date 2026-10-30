/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Os="169";const Ct="",je="srgb",Dt="srgb-linear",Bs="display-p3",Ni="display-p3-linear",Di="linear",re="srgb",Li="rec709",Ui="p3";const Qs="300 es";class En{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let er=1234567;const Gn=Math.PI/180,vn=180/Math.PI;function Wt(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[i&255]+De[i>>8&255]+De[i>>16&255]+De[i>>24&255]+"-"+De[e&255]+De[e>>8&255]+"-"+De[e>>16&15|64]+De[e>>24&255]+"-"+De[t&63|128]+De[t>>8&255]+"-"+De[t>>16&255]+De[t>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function xe(i,e,t){return Math.max(e,Math.min(t,i))}function zs(i,e){return(i%e+e)%e}function V1(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function k1(i,e,t){return i!==e?(t-i)/(e-i):0}function Vn(i,e,t){return(1-t)*i+t*e}function H1(i,e,t,n){return Vn(i,e,1-Math.exp(-t*n))}function W1(i,e=1){return e-Math.abs(zs(i,e*2)-e)}function X1(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function q1(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Y1(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Z1(i,e){return i+Math.random()*(e-i)}function K1(i){return i*(.5-Math.random())}function $1(i){i!==void 0&&(er=i);let e=er+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function j1(i){return i*Gn}function J1(i){return i*vn}function Q1(i){return(i&i-1)===0&&i!==0}function eo(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function to(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function no(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function fn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ne(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const $t={DEG2RAD:Gn,RAD2DEG:vn,generateUUID:Wt,clamp:xe,euclideanModulo:zs,mapLinear:V1,inverseLerp:k1,lerp:Vn,damp:H1,pingpong:W1,smoothstep:X1,smootherstep:q1,randInt:Y1,randFloat:Z1,randFloatSpread:K1,seededRandom:$1,degToRad:j1,radToDeg:J1,isPowerOfTwo:Q1,ceilPowerOfTwo:eo,floorPowerOfTwo:to,setQuaternionFromProperEuler:no,normalize:Ne,denormalize:fn};class t0{constructor(e=0,t=0){t0.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class q0{constructor(e,t,n,s,r,o,a,l,c){q0.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],x=s[0],p=s[3],m=s[6],T=s[1],v=s[4],S=s[7],P=s[2],A=s[5],w=s[8];return r[0]=o*x+a*T+l*P,r[3]=o*p+a*v+l*A,r[6]=o*m+a*S+l*w,r[1]=c*x+h*T+u*P,r[4]=c*p+h*v+u*A,r[7]=c*m+h*S+u*w,r[2]=f*x+d*T+g*P,r[5]=f*p+d*v+g*A,r[8]=f*m+d*S+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,g=t*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=u*x,e[1]=(s*c-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=f*x,e[4]=(h*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=d*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ki.makeScale(e,t)),this}rotate(e){return this.premultiply(Ki.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ki.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ki=new q0;function u1(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ii(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function io(){const i=Ii("canvas");return i.style.display="block",i}const tr={};function Ri(i){i in tr||(tr[i]=!0,console.warn(i))}function so(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function ro(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function oo(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const nr=new q0().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ir=new q0().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Pn={[Dt]:{transfer:Di,primaries:Li,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[je]:{transfer:re,primaries:Li,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ni]:{transfer:Di,primaries:Ui,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(ir),fromReference:i=>i.applyMatrix3(nr)},[Bs]:{transfer:re,primaries:Ui,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(ir),fromReference:i=>i.applyMatrix3(nr).convertLinearToSRGB()}},ao=new Set([Dt,Ni]),Q0={enabled:!0,_workingColorSpace:Dt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!ao.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Pn[e].toReference,s=Pn[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Pn[i].primaries},getTransfer:function(i){return i===Ct?Di:Pn[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(Pn[e].luminanceCoefficients)}};function mn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $i(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let jt;class lo{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{jt===void 0&&(jt=Ii("canvas")),jt.width=e.width,jt.height=e.height;const n=jt.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=jt}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ii("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=mn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mn(t[n]/255)*255):t[n]=mn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let co=0;class f1{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:co++}),this.uuid=Wt(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ji(s[o].image)):r.push(ji(s[o]))}else r=ji(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ji(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?lo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ho=0;class Ie extends En{constructor(e=Ie.DEFAULT_IMAGE,t=Ie.DEFAULT_MAPPING,n=1001,s=1001,r=1006,o=1008,a=1023,l=1009,c=Ie.DEFAULT_ANISOTROPY,h=Ct){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ho++}),this.uuid=Wt(),this.name="",this.source=new f1(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new t0(0,0),this.repeat=new t0(1,1),this.center=new t0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ie.DEFAULT_IMAGE=null;Ie.DEFAULT_MAPPING=300;Ie.DEFAULT_ANISOTROPY=1;class ge{constructor(e=0,t=0,n=0,s=1){ge.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],x=l[2],p=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,S=(d+1)/2,P=(m+1)/2,A=(h+f)/4,w=(u+x)/4,D=(g+p)/4;return v>S&&v>P?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=A/n,r=w/n):S>P?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=A/s,r=D/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=w/r,s=D/r),this.set(n,s,r,t),this}let T=Math.sqrt((p-g)*(p-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(p-g)/T,this.y=(u-x)/T,this.z=(f-h)/T,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class uo extends En{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ge(0,0,e,t),this.scissorTest=!1,this.viewport=new ge(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ie(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new f1(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Be extends uo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class d1 extends Ie{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class fo extends Ie{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ye{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=x;return}if(u!==x||l!==f||c!==d||h!==g){let p=1-a;const m=l*f+c*d+h*g+u*x,T=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const P=Math.sqrt(v),A=Math.atan2(P,m*T);p=Math.sin(p*A)/P,a=Math.sin(a*A)/P}const S=a*T;if(l=l*p+f*S,c=c*p+d*S,h=h*p+g*S,u=u*p+x*S,p===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*d-c*f,e[t+1]=l*g+h*f+c*u-a*d,e[t+2]=c*g+h*d+a*f-l*u,e[t+3]=h*g-a*u-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sr.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sr.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ji.copy(this).projectOnVector(e),this.sub(Ji)}reflect(e){return this.sub(Ji.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ji=new R,sr=new ye;class Xt{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qe.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qe.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Qe.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Qe):Qe.fromBufferAttribute(r,o),Qe.applyMatrix4(e.matrixWorld),this.expandByPoint(Qe);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ei.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ei.copy(n.boundingBox)),ei.applyMatrix4(e.matrixWorld),this.union(ei)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qe),Qe.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Dn),ti.subVectors(this.max,Dn),Jt.subVectors(e.a,Dn),Qt.subVectors(e.b,Dn),en.subVectors(e.c,Dn),Mt.subVectors(Qt,Jt),St.subVectors(en,Qt),Lt.subVectors(Jt,en);let t=[0,-Mt.z,Mt.y,0,-St.z,St.y,0,-Lt.z,Lt.y,Mt.z,0,-Mt.x,St.z,0,-St.x,Lt.z,0,-Lt.x,-Mt.y,Mt.x,0,-St.y,St.x,0,-Lt.y,Lt.x,0];return!Qi(t,Jt,Qt,en,ti)||(t=[1,0,0,0,1,0,0,0,1],!Qi(t,Jt,Qt,en,ti))?!1:(ni.crossVectors(Mt,St),t=[ni.x,ni.y,ni.z],Qi(t,Jt,Qt,en,ti))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qe).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qe).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ct[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ct[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ct[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ct[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ct[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ct[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ct[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ct[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ct),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ct=[new R,new R,new R,new R,new R,new R,new R,new R],Qe=new R,ei=new Xt,Jt=new R,Qt=new R,en=new R,Mt=new R,St=new R,Lt=new R,Dn=new R,ti=new R,ni=new R,Ut=new R;function Qi(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ut.fromArray(i,r);const a=s.x*Math.abs(Ut.x)+s.y*Math.abs(Ut.y)+s.z*Math.abs(Ut.z),l=e.dot(Ut),c=t.dot(Ut),h=n.dot(Ut);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const po=new Xt,Ln=new R,es=new R;class $n{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):po.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ln.subVectors(e,this.center);const t=Ln.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ln,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(es.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ln.copy(e.center).add(es)),this.expandByPoint(Ln.copy(e.center).sub(es))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ht=new R,ts=new R,ii=new R,yt=new R,ns=new R,si=new R,is=new R;class p1{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ht)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ht.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ht.copy(this.origin).addScaledVector(this.direction,t),ht.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ts.copy(e).add(t).multiplyScalar(.5),ii.copy(t).sub(e).normalize(),yt.copy(this.origin).sub(ts);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ii),a=yt.dot(this.direction),l=-yt.dot(ii),c=yt.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ts).addScaledVector(ii,f),d}intersectSphere(e,t){ht.subVectors(e.center,this.origin);const n=ht.dot(this.direction),s=ht.dot(ht)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ht)!==null}intersectTriangle(e,t,n,s,r){ns.subVectors(t,e),si.subVectors(n,e),is.crossVectors(ns,si);let o=this.direction.dot(is),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;yt.subVectors(this.origin,e);const l=a*this.direction.dot(si.crossVectors(yt,si));if(l<0)return null;const c=a*this.direction.dot(ns.cross(yt));if(c<0||l+c>o)return null;const h=-a*yt.dot(is);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Y0{constructor(e,t,n,s,r,o,a,l,c,h,u,f,d,g,x,p){Y0.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,f,d,g,x,p)}set(e,t,n,s,r,o,a,l,c,h,u,f,d,g,x,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Y0().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/tn.setFromMatrixColumn(e,0).length(),r=1/tn.setFromMatrixColumn(e,1).length(),o=1/tn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*h,d=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=d+g*c,t[5]=f-x*c,t[9]=-a*l,t[2]=x-f*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*h,d=l*u,g=c*h,x=c*u;t[0]=f+x*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-g,t[6]=x+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*h,d=l*u,g=c*h,x=c*u;t[0]=f-x*a,t[4]=-o*u,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*h,t[9]=x-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*h,d=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=g*c-d,t[8]=f*c+x,t[1]=l*u,t[5]=x*c+f,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-f*u,t[8]=g*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=d*u+g,t[10]=f-x*u}else if(e.order==="XZY"){const f=o*l,d=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+x,t[5]=o*h,t[9]=d*u-g,t[2]=g*u-d,t[6]=a*h,t[10]=x*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mo,e,go)}lookAt(e,t,n){const s=this.elements;return ke.subVectors(e,t),ke.lengthSq()===0&&(ke.z=1),ke.normalize(),Tt.crossVectors(n,ke),Tt.lengthSq()===0&&(Math.abs(n.z)===1?ke.x+=1e-4:ke.z+=1e-4,ke.normalize(),Tt.crossVectors(n,ke)),Tt.normalize(),ri.crossVectors(ke,Tt),s[0]=Tt.x,s[4]=ri.x,s[8]=ke.x,s[1]=Tt.y,s[5]=ri.y,s[9]=ke.y,s[2]=Tt.z,s[6]=ri.z,s[10]=ke.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],x=n[6],p=n[10],m=n[14],T=n[3],v=n[7],S=n[11],P=n[15],A=s[0],w=s[4],D=s[8],V=s[12],_=s[1],y=s[5],F=s[9],I=s[13],z=s[2],K=s[6],B=s[10],Q=s[14],H=s[3],s0=s[7],u0=s[11],d0=s[15];return r[0]=o*A+a*_+l*z+c*H,r[4]=o*w+a*y+l*K+c*s0,r[8]=o*D+a*F+l*B+c*u0,r[12]=o*V+a*I+l*Q+c*d0,r[1]=h*A+u*_+f*z+d*H,r[5]=h*w+u*y+f*K+d*s0,r[9]=h*D+u*F+f*B+d*u0,r[13]=h*V+u*I+f*Q+d*d0,r[2]=g*A+x*_+p*z+m*H,r[6]=g*w+x*y+p*K+m*s0,r[10]=g*D+x*F+p*B+m*u0,r[14]=g*V+x*I+p*Q+m*d0,r[3]=T*A+v*_+S*z+P*H,r[7]=T*w+v*y+S*K+P*s0,r[11]=T*D+v*F+S*B+P*u0,r[15]=T*V+v*I+S*Q+P*d0,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],d=e[14],g=e[3],x=e[7],p=e[11],m=e[15];return g*(+r*l*u-s*c*u-r*a*f+n*c*f+s*a*d-n*l*d)+x*(+t*l*d-t*c*f+r*o*f-s*o*d+s*c*h-r*l*h)+p*(+t*c*u-t*a*d-r*o*u+n*o*d+r*a*h-n*c*h)+m*(-s*a*h-t*l*u+t*a*f+s*o*u-n*o*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],d=e[11],g=e[12],x=e[13],p=e[14],m=e[15],T=u*p*c-x*f*c+x*l*d-a*p*d-u*l*m+a*f*m,v=g*f*c-h*p*c-g*l*d+o*p*d+h*l*m-o*f*m,S=h*x*c-g*u*c+g*a*d-o*x*d-h*a*m+o*u*m,P=g*u*l-h*x*l-g*a*f+o*x*f+h*a*p-o*u*p,A=t*T+n*v+s*S+r*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=T*w,e[1]=(x*f*r-u*p*r-x*s*d+n*p*d+u*s*m-n*f*m)*w,e[2]=(a*p*r-x*l*r+x*s*c-n*p*c-a*s*m+n*l*m)*w,e[3]=(u*l*r-a*f*r-u*s*c+n*f*c+a*s*d-n*l*d)*w,e[4]=v*w,e[5]=(h*p*r-g*f*r+g*s*d-t*p*d-h*s*m+t*f*m)*w,e[6]=(g*l*r-o*p*r-g*s*c+t*p*c+o*s*m-t*l*m)*w,e[7]=(o*f*r-h*l*r+h*s*c-t*f*c-o*s*d+t*l*d)*w,e[8]=S*w,e[9]=(g*u*r-h*x*r-g*n*d+t*x*d+h*n*m-t*u*m)*w,e[10]=(o*x*r-g*a*r+g*n*c-t*x*c-o*n*m+t*a*m)*w,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*d-t*a*d)*w,e[12]=P*w,e[13]=(h*x*s-g*u*s+g*n*f-t*x*f-h*n*p+t*u*p)*w,e[14]=(g*a*s-o*x*s-g*n*l+t*x*l+o*n*p-t*a*p)*w,e[15]=(o*u*s-h*a*s+h*n*l-t*u*l-o*n*f+t*a*f)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,g=r*u,x=o*h,p=o*u,m=a*u,T=l*c,v=l*h,S=l*u,P=n.x,A=n.y,w=n.z;return s[0]=(1-(x+m))*P,s[1]=(d+S)*P,s[2]=(g-v)*P,s[3]=0,s[4]=(d-S)*A,s[5]=(1-(f+m))*A,s[6]=(p+T)*A,s[7]=0,s[8]=(g+v)*w,s[9]=(p-T)*w,s[10]=(1-(f+x))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=tn.set(s[0],s[1],s[2]).length();const o=tn.set(s[4],s[5],s[6]).length(),a=tn.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],et.copy(this);const c=1/r,h=1/o,u=1/a;return et.elements[0]*=c,et.elements[1]*=c,et.elements[2]*=c,et.elements[4]*=h,et.elements[5]*=h,et.elements[6]*=h,et.elements[8]*=u,et.elements[9]*=u,et.elements[10]*=u,t.setFromRotationMatrix(et),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=2e3){const l=this.elements,c=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let d,g;if(a===2e3)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===2001)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=2e3){const l=this.elements,c=1/(t-e),h=1/(n-s),u=1/(o-r),f=(t+e)*c,d=(n+s)*h;let g,x;if(a===2e3)g=(o+r)*u,x=-2*u;else if(a===2001)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const tn=new R,et=new Y0,mo=new R(0,0,0),go=new R(1,1,1),Tt=new R,ri=new R,ke=new R,rr=new Y0,or=new ye;class Re{constructor(e=0,t=0,n=0,s=Re.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(xe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-xe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rr.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rr,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return or.setFromEuler(this),this.setFromQuaternion(or,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Re.DEFAULT_ORDER="XYZ";class Gs{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let _o=0;const ar=new R,nn=new ye,ut=new Y0,oi=new R,Un=new R,vo=new R,xo=new ye,lr=new R(1,0,0),cr=new R(0,1,0),hr=new R(0,0,1),ur={type:"added"},Mo={type:"removed"},sn={type:"childadded",child:null},ss={type:"childremoved",child:null};class Me extends En{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_o++}),this.uuid=Wt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Me.DEFAULT_UP.clone();const e=new R,t=new Re,n=new ye,s=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Y0},normalMatrix:{value:new q0}}),this.matrix=new Y0,this.matrixWorld=new Y0,this.matrixAutoUpdate=Me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return nn.setFromAxisAngle(e,t),this.quaternion.multiply(nn),this}rotateOnWorldAxis(e,t){return nn.setFromAxisAngle(e,t),this.quaternion.premultiply(nn),this}rotateX(e){return this.rotateOnAxis(lr,e)}rotateY(e){return this.rotateOnAxis(cr,e)}rotateZ(e){return this.rotateOnAxis(hr,e)}translateOnAxis(e,t){return ar.copy(e).applyQuaternion(this.quaternion),this.position.add(ar.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(lr,e)}translateY(e){return this.translateOnAxis(cr,e)}translateZ(e){return this.translateOnAxis(hr,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ut.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?oi.copy(e):oi.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Un.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ut.lookAt(Un,oi,this.up):ut.lookAt(oi,Un,this.up),this.quaternion.setFromRotationMatrix(ut),s&&(ut.extractRotation(s.matrixWorld),nn.setFromRotationMatrix(ut),this.quaternion.premultiply(nn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ur),sn.child=e,this.dispatchEvent(sn),sn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Mo),ss.child=e,this.dispatchEvent(ss),ss.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ut.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ut.multiply(e.parent.matrixWorld)),e.applyMatrix4(ut),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ur),sn.child=e,this.dispatchEvent(sn),sn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Un,e,vo),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Un,xo,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Me.DEFAULT_UP=new R(0,1,0);Me.DEFAULT_MATRIX_AUTO_UPDATE=!0;Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tt=new R,ft=new R,rs=new R,dt=new R,rn=new R,on=new R,fr=new R,os=new R,as=new R,ls=new R,cs=new ge,hs=new ge,us=new ge;class it{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),tt.subVectors(e,t),s.cross(tt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){tt.subVectors(s,t),ft.subVectors(n,t),rs.subVectors(e,t);const o=tt.dot(tt),a=tt.dot(ft),l=tt.dot(rs),c=ft.dot(ft),h=ft.dot(rs),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,dt)===null?!1:dt.x>=0&&dt.y>=0&&dt.x+dt.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,dt)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,dt.x),l.addScaledVector(o,dt.y),l.addScaledVector(a,dt.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return cs.setScalar(0),hs.setScalar(0),us.setScalar(0),cs.fromBufferAttribute(e,t),hs.fromBufferAttribute(e,n),us.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(cs,r.x),o.addScaledVector(hs,r.y),o.addScaledVector(us,r.z),o}static isFrontFacing(e,t,n,s){return tt.subVectors(n,t),ft.subVectors(e,t),tt.cross(ft).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return tt.subVectors(this.c,this.b),ft.subVectors(this.a,this.b),tt.cross(ft).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return it.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return it.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return it.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return it.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return it.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;rn.subVectors(s,n),on.subVectors(r,n),os.subVectors(e,n);const l=rn.dot(os),c=on.dot(os);if(l<=0&&c<=0)return t.copy(n);as.subVectors(e,s);const h=rn.dot(as),u=on.dot(as);if(h>=0&&u<=h)return t.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(rn,o);ls.subVectors(e,r);const d=rn.dot(ls),g=on.dot(ls);if(g>=0&&d<=g)return t.copy(r);const x=d*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(on,a);const p=h*g-d*u;if(p<=0&&u-h>=0&&d-g>=0)return fr.subVectors(r,s),a=(u-h)/(u-h+(d-g)),t.copy(s).addScaledVector(fr,a);const m=1/(p+x+f);return o=x*m,a=f*m,t.copy(n).addScaledVector(rn,o).addScaledVector(on,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const m1={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Et={h:0,s:0,l:0},ai={h:0,s:0,l:0};function fs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class P0{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=je){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Q0.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Q0.workingColorSpace){return this.r=e,this.g=t,this.b=n,Q0.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Q0.workingColorSpace){if(e=zs(e,1),t=xe(t,0,1),n=xe(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=fs(o,r,e+1/3),this.g=fs(o,r,e),this.b=fs(o,r,e-1/3)}return Q0.toWorkingColorSpace(this,s),this}setStyle(e,t=je){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=je){const n=m1[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mn(e.r),this.g=mn(e.g),this.b=mn(e.b),this}copyLinearToSRGB(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=je){return Q0.fromWorkingColorSpace(Le.copy(this),e),Math.round(xe(Le.r*255,0,255))*65536+Math.round(xe(Le.g*255,0,255))*256+Math.round(xe(Le.b*255,0,255))}getHexString(e=je){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Q0.workingColorSpace){Q0.fromWorkingColorSpace(Le.copy(this),t);const n=Le.r,s=Le.g,r=Le.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Q0.workingColorSpace){return Q0.fromWorkingColorSpace(Le.copy(this),t),e.r=Le.r,e.g=Le.g,e.b=Le.b,e}getStyle(e=je){Q0.fromWorkingColorSpace(Le.copy(this),e);const t=Le.r,n=Le.g,s=Le.b;return e!==je?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Et),this.setHSL(Et.h+e,Et.s+t,Et.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Et),e.getHSL(ai);const n=Vn(Et.h,ai.h,t),s=Vn(Et.s,ai.s,t),r=Vn(Et.l,ai.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Le=new P0;P0.NAMES=m1;let So=0;class An extends En{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:So++}),this.uuid=Wt(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new P0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class mt extends An{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new P0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Re,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=yo();function yo(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function To(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=xe(i,-65504,65504),pt.floatView[0]=i;const e=pt.uint32View[0],t=e>>23&511;return pt.baseTable[t]+((e&8388607)>>pt.shiftTable[t])}function Eo(i){const e=i>>10;return pt.uint32View[0]=pt.mantissaTable[pt.offsetTable[e]+(i&1023)]+pt.exponentTable[e],pt.floatView[0]}const dr={toHalfFloat:To,fromHalfFloat:Eo},ve=new R,li=new t0;class ze{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)li.fromBufferAttribute(this,t),li.applyMatrix3(e),this.setXY(t,li.x,li.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ve.fromBufferAttribute(this,t),ve.applyMatrix3(e),this.setXYZ(t,ve.x,ve.y,ve.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ve.fromBufferAttribute(this,t),ve.applyMatrix4(e),this.setXYZ(t,ve.x,ve.y,ve.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ve.fromBufferAttribute(this,t),ve.applyNormalMatrix(e),this.setXYZ(t,ve.x,ve.y,ve.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ve.fromBufferAttribute(this,t),ve.transformDirection(e),this.setXYZ(t,ve.x,ve.y,ve.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ne(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ne(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ne(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ne(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ne(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ne(t,this.array),n=Ne(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ne(t,this.array),n=Ne(n,this.array),s=Ne(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ne(t,this.array),n=Ne(n,this.array),s=Ne(s,this.array),r=Ne(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}}class g1 extends ze{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _1 extends ze{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ie extends ze{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ao=0;const Ke=new Y0,ds=new Me,an=new R,He=new Xt,In=new Xt,Ae=new R;class Pe extends En{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ao++}),this.uuid=Wt(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(u1(e)?_1:g1)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new q0().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ke.makeRotationFromQuaternion(e),this.applyMatrix4(Ke),this}rotateX(e){return Ke.makeRotationX(e),this.applyMatrix4(Ke),this}rotateY(e){return Ke.makeRotationY(e),this.applyMatrix4(Ke),this}rotateZ(e){return Ke.makeRotationZ(e),this.applyMatrix4(Ke),this}translate(e,t,n){return Ke.makeTranslation(e,t,n),this.applyMatrix4(Ke),this}scale(e,t,n){return Ke.makeScale(e,t,n),this.applyMatrix4(Ke),this}lookAt(e){return ds.lookAt(e),ds.updateMatrix(),this.applyMatrix4(ds.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(an).negate(),this.translate(an.x,an.y,an.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ie(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];He.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,He.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,He.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(He.min),this.boundingBox.expandByPoint(He.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $n);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(He.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];In.setFromBufferAttribute(a),this.morphTargetsRelative?(Ae.addVectors(He.min,In.min),He.expandByPoint(Ae),Ae.addVectors(He.max,In.max),He.expandByPoint(Ae)):(He.expandByPoint(In.min),He.expandByPoint(In.max))}He.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ae.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ae));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ae.fromBufferAttribute(a,c),l&&(an.fromBufferAttribute(e,c),Ae.add(an)),s=Math.max(s,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ze(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<n.count;D++)a[D]=new R,l[D]=new R;const c=new R,h=new R,u=new R,f=new t0,d=new t0,g=new t0,x=new R,p=new R;function m(D,V,_){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,V),u.fromBufferAttribute(n,_),f.fromBufferAttribute(r,D),d.fromBufferAttribute(r,V),g.fromBufferAttribute(r,_),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const y=1/(d.x*g.y-g.x*d.y);isFinite(y)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(y),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(y),a[D].add(x),a[V].add(x),a[_].add(x),l[D].add(p),l[V].add(p),l[_].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let D=0,V=T.length;D<V;++D){const _=T[D],y=_.start,F=_.count;for(let I=y,z=y+F;I<z;I+=3)m(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const v=new R,S=new R,P=new R,A=new R;function w(D){P.fromBufferAttribute(s,D),A.copy(P);const V=a[D];v.copy(V),v.sub(P.multiplyScalar(P.dot(V))).normalize(),S.crossVectors(A,V);const y=S.dot(l[D])<0?-1:1;o.setXYZW(D,v.x,v.y,v.z,y)}for(let D=0,V=T.length;D<V;++D){const _=T[D],y=_.start,F=_.count;for(let I=y,z=y+F;I<z;I+=3)w(e.getX(I+0)),w(e.getX(I+1)),w(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ze(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new R,r=new R,o=new R,a=new R,l=new R,c=new R,h=new R,u=new R;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),x=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ae.fromBufferAttribute(e,t),Ae.normalize(),e.setXYZ(t,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let x=0,p=l.length;x<p;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*h;for(let m=0;m<h;m++)f[g++]=c[d++]}return new ze(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pe,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pr=new Y0,It=new p1,ci=new $n,mr=new R,hi=new R,ui=new R,fi=new R,ps=new R,di=new R,gr=new R,pi=new R;class J extends Me{constructor(e=new Pe,t=new mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){di.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(ps.fromBufferAttribute(u,e),o?di.addScaledVector(ps,h):di.addScaledVector(ps.sub(t),h))}t.add(di)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ci.copy(n.boundingSphere),ci.applyMatrix4(r),It.copy(e.ray).recast(e.near),!(ci.containsPoint(It.origin)===!1&&(It.intersectSphere(ci,mr)===null||It.origin.distanceToSquared(mr)>(e.far-e.near)**2))&&(pr.copy(r).invert(),It.copy(e.ray).applyMatrix4(pr),!(n.boundingBox!==null&&It.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,It)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const p=f[g],m=o[p.materialIndex],T=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let S=T,P=v;S<P;S+=3){const A=a.getX(S),w=a.getX(S+1),D=a.getX(S+2);s=mi(this,m,e,n,c,h,u,A,w,D),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let p=g,m=x;p<m;p+=3){const T=a.getX(p),v=a.getX(p+1),S=a.getX(p+2);s=mi(this,o,e,n,c,h,u,T,v,S),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const p=f[g],m=o[p.materialIndex],T=Math.max(p.start,d.start),v=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let S=T,P=v;S<P;S+=3){const A=S,w=S+1,D=S+2;s=mi(this,m,e,n,c,h,u,A,w,D),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let p=g,m=x;p<m;p+=3){const T=p,v=p+1,S=p+2;s=mi(this,o,e,n,c,h,u,T,v,S),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function bo(i,e,t,n,s,r,o,a){let l;if(e.side===1?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===0,a),l===null)return null;pi.copy(a),pi.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(pi);return c<t.near||c>t.far?null:{distance:c,point:pi.clone(),object:i}}function mi(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,hi),i.getVertexPosition(l,ui),i.getVertexPosition(c,fi);const h=bo(i,e,t,n,hi,ui,fi,gr);if(h){const u=new R;it.getBarycoord(gr,hi,ui,fi,u),s&&(h.uv=it.getInterpolatedAttribute(s,a,l,c,u,new t0)),r&&(h.uv1=it.getInterpolatedAttribute(r,a,l,c,u,new t0)),o&&(h.normal=it.getInterpolatedAttribute(o,a,l,c,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new R,materialIndex:0};it.getNormal(hi,ui,fi,f.normal),h.face=f,h.barycoord=u}return h}class qt extends Pe{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ie(c,3)),this.setAttribute("normal",new ie(h,3)),this.setAttribute("uv",new ie(u,2));function g(x,p,m,T,v,S,P,A,w,D,V){const _=S/w,y=P/D,F=S/2,I=P/2,z=A/2,K=w+1,B=D+1;let Q=0,H=0;const s0=new R;for(let u0=0;u0<B;u0++){const d0=u0*y-I;for(let B0=0;B0<K;B0++){const H0=B0*_-F;s0[x]=H0*T,s0[p]=d0*v,s0[m]=z,c.push(s0.x,s0.y,s0.z),s0[x]=0,s0[p]=0,s0[m]=A>0?1:-1,h.push(s0.x,s0.y,s0.z),u.push(B0/w),u.push(1-u0/D),Q+=1}}for(let u0=0;u0<D;u0++)for(let d0=0;d0<w;d0++){const B0=f+d0+K*u0,H0=f+d0+K*(u0+1),X=f+(d0+1)+K*(u0+1),n0=f+(d0+1)+K*u0;l.push(B0,H0,n0),l.push(H0,X,n0),H+=6}a.addGroup(d,H,V),d+=H,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function xn(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Oe(i){const e={};for(let t=0;t<i.length;t++){const n=xn(i[t]);for(const s in n)e[s]=n[s]}return e}function wo(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function v1(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Q0.workingColorSpace}const ot={clone:xn,merge:Oe};var Co=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ro=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ue extends An{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Co,this.fragmentShader=Ro,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xn(e.uniforms),this.uniformsGroups=wo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class x1 extends Me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Y0,this.projectionMatrix=new Y0,this.projectionMatrixInverse=new Y0,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const At=new R,_r=new t0,vr=new t0;class Xe extends x1{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vn*2*Math.atan(Math.tan(Gn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){At.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(At.x,At.y).multiplyScalar(-e/At.z),At.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(At.x,At.y).multiplyScalar(-e/At.z)}getViewSize(e,t){return this.getViewBounds(e,_r,vr),t.subVectors(vr,_r)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Gn*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ln=-90,cn=1;class Po extends Me{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Xe(ln,cn,e,t);s.layers=this.layers,this.add(s);const r=new Xe(ln,cn,e,t);r.layers=this.layers,this.add(r);const o=new Xe(ln,cn,e,t);o.layers=this.layers,this.add(o);const a=new Xe(ln,cn,e,t);a.layers=this.layers,this.add(a);const l=new Xe(ln,cn,e,t);l.layers=this.layers,this.add(l);const c=new Xe(ln,cn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class M1 extends Ie{constructor(e,t,n,s,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Do extends Be{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new M1(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new qt(5,5,5),r=new ue({name:"CubemapFromEquirect",uniforms:xn(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const o=new J(s,r),a=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Po(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const ms=new R,Lo=new R,Uo=new q0;class wt{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ms.subVectors(n,t).cross(Lo.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ms),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Uo.getNormalMatrix(e),s=this.coplanarPoint(ms).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ft=new $n,gi=new R;class Vs{constructor(e=new wt,t=new wt,n=new wt,s=new wt,r=new wt,o=new wt){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],x=s[10],p=s[11],m=s[12],T=s[13],v=s[14],S=s[15];if(n[0].setComponents(l-r,f-c,p-d,S-m).normalize(),n[1].setComponents(l+r,f+c,p+d,S+m).normalize(),n[2].setComponents(l+o,f+h,p+g,S+T).normalize(),n[3].setComponents(l-o,f-h,p-g,S-T).normalize(),n[4].setComponents(l-a,f-u,p-x,S-v).normalize(),t===2e3)n[5].setComponents(l+a,f+u,p+x,S+v).normalize();else if(t===2001)n[5].setComponents(a,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ft.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ft.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ft)}intersectsSprite(e){return Ft.center.set(0,0,0),Ft.radius=.7071067811865476,Ft.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ft)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(gi.x=s.normal.x>0?e.max.x:e.min.x,gi.y=s.normal.y>0?e.max.y:e.min.y,gi.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(gi)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function S1(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Io(i){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],x=u[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const x=u[d];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class oe extends Pe{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,f=t/l,d=[],g=[],x=[],p=[];for(let m=0;m<h;m++){const T=m*f-o;for(let v=0;v<c;v++){const S=v*u-r;g.push(S,-T,0),x.push(0,0,1),p.push(v/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let T=0;T<a;T++){const v=T+c*m,S=T+c*(m+1),P=T+1+c*(m+1),A=T+1+c*m;d.push(v,S,A),d.push(S,P,A)}this.setIndex(d),this.setAttribute("position",new ie(g,3)),this.setAttribute("normal",new ie(x,3)),this.setAttribute("uv",new ie(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oe(e.width,e.height,e.widthSegments,e.heightSegments)}}var Fo=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,No=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Oo=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bo=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zo=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Go=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vo=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ko=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ho=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Wo=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xo=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qo=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yo=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zo=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ko=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$o=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qo=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ea=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ta=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,na=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ia=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,sa=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ra=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,oa=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,aa=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,la=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ca=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ha=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ua="gl_FragColor = linearToOutputTexel( gl_FragColor );",fa=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,da=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,pa=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ma=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ga=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_a=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,va=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xa=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ma=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sa=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ya=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ta=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ea=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Aa=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ba=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wa=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ca=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ra=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pa=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Da=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,La=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ua=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ia=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fa=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Na=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Oa=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ba=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,za=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ga=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Va=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ka=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ha=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Wa=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xa=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qa=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ya=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Za=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ka=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$a=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ja=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ja=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qa=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,e9=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t9=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n9=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,i9=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,s9=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,r9=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o9=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a9=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,l9=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c9=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,h9=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,u9=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,f9=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,d9=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,p9=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,m9=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,g9=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,_9=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,v9=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,x9=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,M9=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,S9=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,y9=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,T9=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,E9=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,A9=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,b9=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,w9=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,C9=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,R9=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,P9=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,D9=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,L9=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,U9=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const I9=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,F9=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N9=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O9=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B9=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z9=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,G9=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,V9=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,k9=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,H9=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,W9=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,X9=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q9=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Y9=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Z9=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,K9=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$9=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j9=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J9=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Q9=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,t2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,n2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s2=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,r2=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o2=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l2=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,c2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,h2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u2=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,f2=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,d2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,X0={alphahash_fragment:Fo,alphahash_pars_fragment:No,alphamap_fragment:Oo,alphamap_pars_fragment:Bo,alphatest_fragment:zo,alphatest_pars_fragment:Go,aomap_fragment:Vo,aomap_pars_fragment:ko,batching_pars_vertex:Ho,batching_vertex:Wo,begin_vertex:Xo,beginnormal_vertex:qo,bsdfs:Yo,iridescence_fragment:Zo,bumpmap_pars_fragment:Ko,clipping_planes_fragment:$o,clipping_planes_pars_fragment:jo,clipping_planes_pars_vertex:Jo,clipping_planes_vertex:Qo,color_fragment:ea,color_pars_fragment:ta,color_pars_vertex:na,color_vertex:ia,common:sa,cube_uv_reflection_fragment:ra,defaultnormal_vertex:oa,displacementmap_pars_vertex:aa,displacementmap_vertex:la,emissivemap_fragment:ca,emissivemap_pars_fragment:ha,colorspace_fragment:ua,colorspace_pars_fragment:fa,envmap_fragment:da,envmap_common_pars_fragment:pa,envmap_pars_fragment:ma,envmap_pars_vertex:ga,envmap_physical_pars_fragment:wa,envmap_vertex:_a,fog_vertex:va,fog_pars_vertex:xa,fog_fragment:Ma,fog_pars_fragment:Sa,gradientmap_pars_fragment:ya,lightmap_pars_fragment:Ta,lights_lambert_fragment:Ea,lights_lambert_pars_fragment:Aa,lights_pars_begin:ba,lights_toon_fragment:Ca,lights_toon_pars_fragment:Ra,lights_phong_fragment:Pa,lights_phong_pars_fragment:Da,lights_physical_fragment:La,lights_physical_pars_fragment:Ua,lights_fragment_begin:Ia,lights_fragment_maps:Fa,lights_fragment_end:Na,logdepthbuf_fragment:Oa,logdepthbuf_pars_fragment:Ba,logdepthbuf_pars_vertex:za,logdepthbuf_vertex:Ga,map_fragment:Va,map_pars_fragment:ka,map_particle_fragment:Ha,map_particle_pars_fragment:Wa,metalnessmap_fragment:Xa,metalnessmap_pars_fragment:qa,morphinstance_vertex:Ya,morphcolor_vertex:Za,morphnormal_vertex:Ka,morphtarget_pars_vertex:$a,morphtarget_vertex:ja,normal_fragment_begin:Ja,normal_fragment_maps:Qa,normal_pars_fragment:e9,normal_pars_vertex:t9,normal_vertex:n9,normalmap_pars_fragment:i9,clearcoat_normal_fragment_begin:s9,clearcoat_normal_fragment_maps:r9,clearcoat_pars_fragment:o9,iridescence_pars_fragment:a9,opaque_fragment:l9,packing:c9,premultiplied_alpha_fragment:h9,project_vertex:u9,dithering_fragment:f9,dithering_pars_fragment:d9,roughnessmap_fragment:p9,roughnessmap_pars_fragment:m9,shadowmap_pars_fragment:g9,shadowmap_pars_vertex:_9,shadowmap_vertex:v9,shadowmask_pars_fragment:x9,skinbase_vertex:M9,skinning_pars_vertex:S9,skinning_vertex:y9,skinnormal_vertex:T9,specularmap_fragment:E9,specularmap_pars_fragment:A9,tonemapping_fragment:b9,tonemapping_pars_fragment:w9,transmission_fragment:C9,transmission_pars_fragment:R9,uv_pars_fragment:P9,uv_pars_vertex:D9,uv_vertex:L9,worldpos_vertex:U9,background_vert:I9,background_frag:F9,backgroundCube_vert:N9,backgroundCube_frag:O9,cube_vert:B9,cube_frag:z9,depth_vert:G9,depth_frag:V9,distanceRGBA_vert:k9,distanceRGBA_frag:H9,equirect_vert:W9,equirect_frag:X9,linedashed_vert:q9,linedashed_frag:Y9,meshbasic_vert:Z9,meshbasic_frag:K9,meshlambert_vert:$9,meshlambert_frag:j9,meshmatcap_vert:J9,meshmatcap_frag:Q9,meshnormal_vert:e2,meshnormal_frag:t2,meshphong_vert:n2,meshphong_frag:i2,meshphysical_vert:s2,meshphysical_frag:r2,meshtoon_vert:o2,meshtoon_frag:a2,points_vert:l2,points_frag:c2,shadow_vert:h2,shadow_frag:u2,sprite_vert:f2,sprite_frag:d2},f0={common:{diffuse:{value:new P0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q0},alphaMap:{value:null},alphaMapTransform:{value:new q0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q0}},envmap:{envMap:{value:null},envMapRotation:{value:new q0},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q0},normalScale:{value:new t0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new P0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new P0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q0},alphaTest:{value:0},uvTransform:{value:new q0}},sprite:{diffuse:{value:new P0(16777215)},opacity:{value:1},center:{value:new t0(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q0},alphaMap:{value:null},alphaMapTransform:{value:new q0},alphaTest:{value:0}}},rt={basic:{uniforms:Oe([f0.common,f0.specularmap,f0.envmap,f0.aomap,f0.lightmap,f0.fog]),vertexShader:X0.meshbasic_vert,fragmentShader:X0.meshbasic_frag},lambert:{uniforms:Oe([f0.common,f0.specularmap,f0.envmap,f0.aomap,f0.lightmap,f0.emissivemap,f0.bumpmap,f0.normalmap,f0.displacementmap,f0.fog,f0.lights,{emissive:{value:new P0(0)}}]),vertexShader:X0.meshlambert_vert,fragmentShader:X0.meshlambert_frag},phong:{uniforms:Oe([f0.common,f0.specularmap,f0.envmap,f0.aomap,f0.lightmap,f0.emissivemap,f0.bumpmap,f0.normalmap,f0.displacementmap,f0.fog,f0.lights,{emissive:{value:new P0(0)},specular:{value:new P0(1118481)},shininess:{value:30}}]),vertexShader:X0.meshphong_vert,fragmentShader:X0.meshphong_frag},standard:{uniforms:Oe([f0.common,f0.envmap,f0.aomap,f0.lightmap,f0.emissivemap,f0.bumpmap,f0.normalmap,f0.displacementmap,f0.roughnessmap,f0.metalnessmap,f0.fog,f0.lights,{emissive:{value:new P0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X0.meshphysical_vert,fragmentShader:X0.meshphysical_frag},toon:{uniforms:Oe([f0.common,f0.aomap,f0.lightmap,f0.emissivemap,f0.bumpmap,f0.normalmap,f0.displacementmap,f0.gradientmap,f0.fog,f0.lights,{emissive:{value:new P0(0)}}]),vertexShader:X0.meshtoon_vert,fragmentShader:X0.meshtoon_frag},matcap:{uniforms:Oe([f0.common,f0.bumpmap,f0.normalmap,f0.displacementmap,f0.fog,{matcap:{value:null}}]),vertexShader:X0.meshmatcap_vert,fragmentShader:X0.meshmatcap_frag},points:{uniforms:Oe([f0.points,f0.fog]),vertexShader:X0.points_vert,fragmentShader:X0.points_frag},dashed:{uniforms:Oe([f0.common,f0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X0.linedashed_vert,fragmentShader:X0.linedashed_frag},depth:{uniforms:Oe([f0.common,f0.displacementmap]),vertexShader:X0.depth_vert,fragmentShader:X0.depth_frag},normal:{uniforms:Oe([f0.common,f0.bumpmap,f0.normalmap,f0.displacementmap,{opacity:{value:1}}]),vertexShader:X0.meshnormal_vert,fragmentShader:X0.meshnormal_frag},sprite:{uniforms:Oe([f0.sprite,f0.fog]),vertexShader:X0.sprite_vert,fragmentShader:X0.sprite_frag},background:{uniforms:{uvTransform:{value:new q0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X0.background_vert,fragmentShader:X0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new q0}},vertexShader:X0.backgroundCube_vert,fragmentShader:X0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X0.cube_vert,fragmentShader:X0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X0.equirect_vert,fragmentShader:X0.equirect_frag},distanceRGBA:{uniforms:Oe([f0.common,f0.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X0.distanceRGBA_vert,fragmentShader:X0.distanceRGBA_frag},shadow:{uniforms:Oe([f0.lights,f0.fog,{color:{value:new P0(0)},opacity:{value:1}}]),vertexShader:X0.shadow_vert,fragmentShader:X0.shadow_frag}};rt.physical={uniforms:Oe([rt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q0},clearcoatNormalScale:{value:new t0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q0},sheen:{value:0},sheenColor:{value:new P0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q0},transmissionSamplerSize:{value:new t0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q0},attenuationDistance:{value:0},attenuationColor:{value:new P0(0)},specularColor:{value:new P0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q0},anisotropyVector:{value:new t0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q0}}]),vertexShader:X0.meshphysical_vert,fragmentShader:X0.meshphysical_frag};const _i={r:0,b:0,g:0},Nt=new Re,p2=new Y0;function m2(i,e,t,n,s,r,o){const a=new P0(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(T){let v=T.isScene===!0?T.background:null;return v&&v.isTexture&&(v=(T.backgroundBlurriness>0?t:e).get(v)),v}function x(T){let v=!1;const S=g(T);S===null?m(a,l):S&&S.isColor&&(m(S,1),v=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(T,v){const S=g(v);S&&(S.isCubeTexture||S.mapping===306)?(h===void 0&&(h=new J(new qt(1,1,1),new ue({name:"BackgroundCubeMaterial",uniforms:xn(rt.backgroundCube.uniforms),vertexShader:rt.backgroundCube.vertexShader,fragmentShader:rt.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Nt.copy(v.backgroundRotation),Nt.x*=-1,Nt.y*=-1,Nt.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Nt.y*=-1,Nt.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(p2.makeRotationFromEuler(Nt)),h.material.toneMapped=Q0.getTransfer(S.colorSpace)!==re,(u!==S||f!==S.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=S,f=S.version,d=i.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new J(new oe(2,2),new ue({name:"BackgroundMaterial",uniforms:xn(rt.background.uniforms),vertexShader:rt.background.vertexShader,fragmentShader:rt.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Q0.getTransfer(S.colorSpace)!==re,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,d=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function m(T,v){T.getRGB(_i,v1(i)),n.buffers.color.setClear(_i.r,_i.g,_i.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(T,v=1){a.set(T),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,m(a,l)},render:x,addToRenderList:p}}function g2(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(_,y,F,I,z){let K=!1;const B=u(I,F,y);r!==B&&(r=B,c(r.object)),K=d(_,I,F,z),K&&g(_,I,F,z),z!==null&&e.update(z,i.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,S(_,y,F,I),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function u(_,y,F){const I=F.wireframe===!0;let z=n[_.id];z===void 0&&(z={},n[_.id]=z);let K=z[y.id];K===void 0&&(K={},z[y.id]=K);let B=K[I];return B===void 0&&(B=f(l()),K[I]=B),B}function f(_){const y=[],F=[],I=[];for(let z=0;z<t;z++)y[z]=0,F[z]=0,I[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:F,attributeDivisors:I,object:_,attributes:{},index:null}}function d(_,y,F,I){const z=r.attributes,K=y.attributes;let B=0;const Q=F.getAttributes();for(const H in Q)if(Q[H].location>=0){const u0=z[H];let d0=K[H];if(d0===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(d0=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(d0=_.instanceColor)),u0===void 0||u0.attribute!==d0||d0&&u0.data!==d0.data)return!0;B++}return r.attributesNum!==B||r.index!==I}function g(_,y,F,I){const z={},K=y.attributes;let B=0;const Q=F.getAttributes();for(const H in Q)if(Q[H].location>=0){let u0=K[H];u0===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(u0=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(u0=_.instanceColor));const d0={};d0.attribute=u0,u0&&u0.data&&(d0.data=u0.data),z[H]=d0,B++}r.attributes=z,r.attributesNum=B,r.index=I}function x(){const _=r.newAttributes;for(let y=0,F=_.length;y<F;y++)_[y]=0}function p(_){m(_,0)}function m(_,y){const F=r.newAttributes,I=r.enabledAttributes,z=r.attributeDivisors;F[_]=1,I[_]===0&&(i.enableVertexAttribArray(_),I[_]=1),z[_]!==y&&(i.vertexAttribDivisor(_,y),z[_]=y)}function T(){const _=r.newAttributes,y=r.enabledAttributes;for(let F=0,I=y.length;F<I;F++)y[F]!==_[F]&&(i.disableVertexAttribArray(F),y[F]=0)}function v(_,y,F,I,z,K,B){B===!0?i.vertexAttribIPointer(_,y,F,z,K):i.vertexAttribPointer(_,y,F,I,z,K)}function S(_,y,F,I){x();const z=I.attributes,K=F.getAttributes(),B=y.defaultAttributeValues;for(const Q in K){const H=K[Q];if(H.location>=0){let s0=z[Q];if(s0===void 0&&(Q==="instanceMatrix"&&_.instanceMatrix&&(s0=_.instanceMatrix),Q==="instanceColor"&&_.instanceColor&&(s0=_.instanceColor)),s0!==void 0){const u0=s0.normalized,d0=s0.itemSize,B0=e.get(s0);if(B0===void 0)continue;const H0=B0.buffer,X=B0.type,n0=B0.bytesPerElement,M0=X===i.INT||X===i.UNSIGNED_INT||s0.gpuType===1013;if(s0.isInterleavedBufferAttribute){const r0=s0.data,C0=r0.stride,b0=s0.offset;if(r0.isInstancedInterleavedBuffer){for(let D0=0;D0<H.locationSize;D0++)m(H.location+D0,r0.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=r0.meshPerAttribute*r0.count)}else for(let D0=0;D0<H.locationSize;D0++)p(H.location+D0);i.bindBuffer(i.ARRAY_BUFFER,H0);for(let D0=0;D0<H.locationSize;D0++)v(H.location+D0,d0/H.locationSize,X,u0,C0*n0,(b0+d0/H.locationSize*D0)*n0,M0)}else{if(s0.isInstancedBufferAttribute){for(let r0=0;r0<H.locationSize;r0++)m(H.location+r0,s0.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=s0.meshPerAttribute*s0.count)}else for(let r0=0;r0<H.locationSize;r0++)p(H.location+r0);i.bindBuffer(i.ARRAY_BUFFER,H0);for(let r0=0;r0<H.locationSize;r0++)v(H.location+r0,d0/H.locationSize,X,u0,d0*n0,d0/H.locationSize*r0*n0,M0)}}else if(B!==void 0){const u0=B[Q];if(u0!==void 0)switch(u0.length){case 2:i.vertexAttrib2fv(H.location,u0);break;case 3:i.vertexAttrib3fv(H.location,u0);break;case 4:i.vertexAttrib4fv(H.location,u0);break;default:i.vertexAttrib1fv(H.location,u0)}}}}T()}function P(){D();for(const _ in n){const y=n[_];for(const F in y){const I=y[F];for(const z in I)h(I[z].object),delete I[z];delete y[F]}delete n[_]}}function A(_){if(n[_.id]===void 0)return;const y=n[_.id];for(const F in y){const I=y[F];for(const z in I)h(I[z].object),delete I[z];delete y[F]}delete n[_.id]}function w(_){for(const y in n){const F=n[y];if(F[_.id]===void 0)continue;const I=F[_.id];for(const z in I)h(I[z].object),delete I[z];delete F[_.id]}}function D(){V(),o=!0,r!==s&&(r=s,c(r.object))}function V(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:V,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:p,disableUnusedAttributes:T}}function _2(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];t.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x];for(let x=0;x<f.length;x++)t.update(g,n,f[x])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function v2(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==1023&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const D=w===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==1009&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==1015&&!D)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(f===!0){const w=e.get("EXT_clip_control");w.clipControlEXT(w.LOWER_LEFT_EXT,w.ZERO_TO_ONE_EXT)}const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:T,maxVaryings:v,maxFragmentUniforms:S,vertexTextures:P,maxSamples:A}}function x2(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new wt,a=new q0,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,x=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const T=r?0:n,v=T*4;let S=m.clippingState||null;l.value=S,S=h(g,f,v,d);for(let P=0;P!==v;++P)S[P]=t[P];m.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,g){const x=u!==null?u.length:0;let p=null;if(x!==0){if(p=l.value,g!==!0||p===null){const m=d+x*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,S=d;v!==x;++v,S+=4)o.copy(u[v]).applyMatrix4(T,a),o.normal.toArray(p,S),p[S+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}function M2(i){let e=new WeakMap;function t(o,a){return a===303?o.mapping=301:a===304&&(o.mapping=302),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===303||a===304)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Do(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class ks extends x1{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const dn=4,xr=[.125,.215,.35,.446,.526,.582],zt=20,gs=new ks,Mr=new P0;let _s=null,vs=0,xs=0,Ms=!1;const Bt=(1+Math.sqrt(5))/2,hn=1/Bt,Sr=[new R(-Bt,hn,0),new R(Bt,hn,0),new R(-hn,0,Bt),new R(hn,0,Bt),new R(0,Bt,-hn),new R(0,Bt,hn),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class Ds{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){_s=this._renderer.getRenderTarget(),vs=this._renderer.getActiveCubeFace(),xs=this._renderer.getActiveMipmapLevel(),Ms=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Er(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_s,vs,xs),this._renderer.xr.enabled=Ms,e.scissorTest=!1,vi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_s=this._renderer.getRenderTarget(),vs=this._renderer.getActiveCubeFace(),xs=this._renderer.getActiveMipmapLevel(),Ms=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:Dt,depthBuffer:!1},s=yr(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yr(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=S2(r)),this._blurMaterial=y2(r,e,t)}return s}_compileMaterial(e){const t=new J(this._lodPlanes[0],e);this._renderer.compile(t,gs)}_sceneToCubeUV(e,t,n,s){const a=new Xe(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Mr),h.toneMapping=0,h.autoClear=!1;const d=new mt({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),g=new J(new qt,d);let x=!1;const p=e.background;p?p.isColor&&(d.color.copy(p),e.background=null,x=!0):(d.color.copy(Mr),x=!0);for(let m=0;m<6;m++){const T=m%3;T===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):T===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const v=this._cubeSize;vi(s,T*v,m>2?v:0,v,v),h.setRenderTarget(s),x&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===301||e.mapping===302;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Er()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tr());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new J(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;vi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,gs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Sr[(s-r-1)%Sr.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new J(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*zt-1),x=r/g,p=isFinite(r)?1+Math.floor(h*x):zt;p>zt&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${zt}`);const m=[];let T=0;for(let w=0;w<zt;++w){const D=w/x,V=Math.exp(-D*D/2);m.push(V),w===0?T+=V:w<p&&(T+=2*V)}for(let w=0;w<m.length;w++)m[w]=m[w]/T;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const S=this._sizeLods[s],P=3*S*(s>v-dn?s-v+dn:0),A=4*(this._cubeSize-S);vi(t,P,A,3*S,2*S),l.setRenderTarget(t),l.render(u,gs)}}function S2(i){const e=[],t=[],n=[];let s=i;const r=i-dn+1+xr.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-dn?l=xr[o-i+dn-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,x=3,p=2,m=1,T=new Float32Array(x*g*d),v=new Float32Array(p*g*d),S=new Float32Array(m*g*d);for(let A=0;A<d;A++){const w=A%3*2/3-1,D=A>2?0:-1,V=[w,D,0,w+2/3,D,0,w+2/3,D+1,0,w,D,0,w+2/3,D+1,0,w,D+1,0];T.set(V,x*g*A),v.set(f,p*g*A);const _=[A,A,A,A,A,A];S.set(_,m*g*A)}const P=new Pe;P.setAttribute("position",new ze(T,x)),P.setAttribute("uv",new ze(v,p)),P.setAttribute("faceIndex",new ze(S,m)),e.push(P),s>dn&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function yr(i,e,t){const n=new Be(i,e,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vi(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function y2(i,e,t){const n=new Float32Array(zt),s=new R(0,1,0);return new ue({name:"SphericalGaussianBlur",defines:{n:zt,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Hs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Tr(){return new ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Er(){return new ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Hs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function T2(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===303||l===304,h=l===301||l===302;if(c||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ds(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&s(d)?(t===null&&(t=new Ds(i)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function E2(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Ri("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function A2(i,e,t,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const x=f.morphAttributes[g];for(let p=0,m=x.length;p<m;p++)e.remove(x[p])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const x=d[g];for(let p=0,m=x.length;p<m;p++)e.update(x[p],i.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,g=u.attributes.position;let x=0;if(d!==null){const T=d.array;x=d.version;for(let v=0,S=T.length;v<S;v+=3){const P=T[v+0],A=T[v+1],w=T[v+2];f.push(P,A,A,w,w,P)}}else if(g!==void 0){const T=g.array;x=g.version;for(let v=0,S=T.length/3-1;v<S;v+=3){const P=v+0,A=v+1,w=v+2;f.push(P,A,A,w,w,P)}}else return;const p=new(u1(f)?_1:g1)(f,1);p.version=x;const m=r.get(u);m&&e.remove(m),r.set(u,p)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function b2(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*o),t.update(d,n,1)}function c(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),t.update(d,n,g))}function h(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];t.update(p,n,1)}function u(f,d,g,x){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)c(f[m]/o,d[m],x[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,g);let m=0;for(let T=0;T<g;T++)m+=d[T];for(let T=0;T<x.length;T++)t.update(m,n,x[T])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function w2(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function C2(i,e,t){const n=new WeakMap,s=new ge;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let V=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",V)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let v=0;d===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let S=a.attributes.position.count*v,P=1;S>e.maxTextureSize&&(P=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const A=new Float32Array(S*P*4*u),w=new d1(A,S,P,u);w.type=1015,w.needsUpdate=!0;const D=v*4;for(let _=0;_<u;_++){const y=p[_],F=m[_],I=T[_],z=S*P*4*_;for(let K=0;K<y.count;K++){const B=K*D;d===!0&&(s.fromBufferAttribute(y,K),A[z+B+0]=s.x,A[z+B+1]=s.y,A[z+B+2]=s.z,A[z+B+3]=0),g===!0&&(s.fromBufferAttribute(F,K),A[z+B+4]=s.x,A[z+B+5]=s.y,A[z+B+6]=s.z,A[z+B+7]=0),x===!0&&(s.fromBufferAttribute(I,K),A[z+B+8]=s.x,A[z+B+9]=s.y,A[z+B+10]=s.z,A[z+B+11]=I.itemSize===4?s.w:1)}}f={count:u,texture:w,size:new t0(S,P)},n.set(a,f),a.addEventListener("dispose",V)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];const g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function R2(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Ws extends Ie{constructor(e,t,n,s,r,o,a,l,c,h=1026){if(h!==1026&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===1026&&(n=1014),n===void 0&&h===1027&&(n=1020),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:1003,this.minFilter=l!==void 0?l:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const y1=new Ie,Ar=new Ws(1,1),T1=new d1,E1=new fo,A1=new M1,br=[],wr=[],Cr=new Float32Array(16),Rr=new Float32Array(9),Pr=new Float32Array(4);function bn(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=br[s];if(r===void 0&&(r=new Float32Array(s),br[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Te(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ee(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Oi(i,e){let t=wr[e];t===void 0&&(t=new Int32Array(e),wr[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function P2(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function D2(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Te(t,e))return;i.uniform2fv(this.addr,e),Ee(t,e)}}function L2(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Te(t,e))return;i.uniform3fv(this.addr,e),Ee(t,e)}}function U2(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Te(t,e))return;i.uniform4fv(this.addr,e),Ee(t,e)}}function I2(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Te(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ee(t,e)}else{if(Te(t,n))return;Pr.set(n),i.uniformMatrix2fv(this.addr,!1,Pr),Ee(t,n)}}function F2(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Te(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ee(t,e)}else{if(Te(t,n))return;Rr.set(n),i.uniformMatrix3fv(this.addr,!1,Rr),Ee(t,n)}}function N2(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Te(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ee(t,e)}else{if(Te(t,n))return;Cr.set(n),i.uniformMatrix4fv(this.addr,!1,Cr),Ee(t,n)}}function O2(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function B2(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Te(t,e))return;i.uniform2iv(this.addr,e),Ee(t,e)}}function z2(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Te(t,e))return;i.uniform3iv(this.addr,e),Ee(t,e)}}function G2(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Te(t,e))return;i.uniform4iv(this.addr,e),Ee(t,e)}}function V2(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function k2(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Te(t,e))return;i.uniform2uiv(this.addr,e),Ee(t,e)}}function H2(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Te(t,e))return;i.uniform3uiv(this.addr,e),Ee(t,e)}}function W2(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Te(t,e))return;i.uniform4uiv(this.addr,e),Ee(t,e)}}function X2(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ar.compareFunction=515,r=Ar):r=y1,t.setTexture2D(e||r,s)}function q2(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||E1,s)}function Y2(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||A1,s)}function Z2(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||T1,s)}function K2(i){switch(i){case 5126:return P2;case 35664:return D2;case 35665:return L2;case 35666:return U2;case 35674:return I2;case 35675:return F2;case 35676:return N2;case 5124:case 35670:return O2;case 35667:case 35671:return B2;case 35668:case 35672:return z2;case 35669:case 35673:return G2;case 5125:return V2;case 36294:return k2;case 36295:return H2;case 36296:return W2;case 35678:case 36198:case 36298:case 36306:case 35682:return X2;case 35679:case 36299:case 36307:return q2;case 35680:case 36300:case 36308:case 36293:return Y2;case 36289:case 36303:case 36311:case 36292:return Z2}}function $2(i,e){i.uniform1fv(this.addr,e)}function j2(i,e){const t=bn(e,this.size,2);i.uniform2fv(this.addr,t)}function J2(i,e){const t=bn(e,this.size,3);i.uniform3fv(this.addr,t)}function Q2(i,e){const t=bn(e,this.size,4);i.uniform4fv(this.addr,t)}function e3(i,e){const t=bn(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function t3(i,e){const t=bn(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function n3(i,e){const t=bn(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function i3(i,e){i.uniform1iv(this.addr,e)}function s3(i,e){i.uniform2iv(this.addr,e)}function r3(i,e){i.uniform3iv(this.addr,e)}function o3(i,e){i.uniform4iv(this.addr,e)}function a3(i,e){i.uniform1uiv(this.addr,e)}function l3(i,e){i.uniform2uiv(this.addr,e)}function c3(i,e){i.uniform3uiv(this.addr,e)}function h3(i,e){i.uniform4uiv(this.addr,e)}function u3(i,e,t){const n=this.cache,s=e.length,r=Oi(t,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||y1,r[o])}function f3(i,e,t){const n=this.cache,s=e.length,r=Oi(t,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||E1,r[o])}function d3(i,e,t){const n=this.cache,s=e.length,r=Oi(t,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||A1,r[o])}function p3(i,e,t){const n=this.cache,s=e.length,r=Oi(t,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||T1,r[o])}function m3(i){switch(i){case 5126:return $2;case 35664:return j2;case 35665:return J2;case 35666:return Q2;case 35674:return e3;case 35675:return t3;case 35676:return n3;case 5124:case 35670:return i3;case 35667:case 35671:return s3;case 35668:case 35672:return r3;case 35669:case 35673:return o3;case 5125:return a3;case 36294:return l3;case 36295:return c3;case 36296:return h3;case 35678:case 36198:case 36298:case 36306:case 35682:return u3;case 35679:case 36299:case 36307:return f3;case 35680:case 36300:case 36308:case 36293:return d3;case 36289:case 36303:case 36311:case 36292:return p3}}class g3{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=K2(t.type)}}class _3{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=m3(t.type)}}class v3{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Ss=/(\w+)(\])?(\[|\.)?/g;function Dr(i,e){i.seq.push(e),i.map[e.id]=e}function x3(i,e,t){const n=i.name,s=n.length;for(Ss.lastIndex=0;;){const r=Ss.exec(n),o=Ss.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Dr(t,c===void 0?new g3(a,i,e):new _3(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new v3(a),Dr(t,u)),t=u}}}class Pi{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);x3(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Lr(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const M3=37297;let S3=0;function y3(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function T3(i){const e=Q0.getPrimaries(Q0.workingColorSpace),t=Q0.getPrimaries(i);let n;switch(e===t?n="":e===Ui&&t===Li?n="LinearDisplayP3ToLinearSRGB":e===Li&&t===Ui&&(n="LinearSRGBToLinearDisplayP3"),i){case Dt:case Ni:return[n,"LinearTransferOETF"];case je:case Bs:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Ur(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+y3(i.getShaderSource(e),o)}else return s}function E3(i,e){const t=T3(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function A3(i,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="Cineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xi=new R;function b3(){Q0.getLuminanceCoefficients(xi);const i=xi.x.toFixed(4),e=xi.y.toFixed(4),t=xi.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function w3(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zn).join(`
`)}function C3(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function R3(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function zn(i){return i!==""}function Ir(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fr(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const P3=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ls(i){return i.replace(P3,L3)}const D3=new Map;function L3(i,e){let t=X0[e];if(t===void 0){const n=D3.get(e);if(n!==void 0)t=X0[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ls(t)}const U3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nr(i){return i.replace(U3,I3)}function I3(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Or(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function F3(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function N3(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function O3(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case 302:e="ENVMAP_MODE_REFRACTION";break}return e}function B3(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function z3(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function G3(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=F3(t),c=N3(t),h=O3(t),u=B3(t),f=z3(t),d=w3(t),g=C3(r),x=s.createProgram();let p,m,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(zn).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(zn).join(`
`),m.length>0&&(m+=`
`)):(p=[Or(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zn).join(`
`),m=[Or(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?X0.tonemapping_pars_fragment:"",t.toneMapping!==0?A3("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",X0.colorspace_pars_fragment,E3("linearToOutputTexel",t.outputColorSpace),b3(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zn).join(`
`)),o=Ls(o),o=Ir(o,t),o=Fr(o,t),a=Ls(a),a=Ir(a,t),a=Fr(a,t),o=Nr(o),a=Nr(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Qs?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qs?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=T+p+o,S=T+m+a,P=Lr(s,s.VERTEX_SHADER,v),A=Lr(s,s.FRAGMENT_SHADER,S);s.attachShader(x,P),s.attachShader(x,A),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(y){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(x).trim(),I=s.getShaderInfoLog(P).trim(),z=s.getShaderInfoLog(A).trim();let K=!0,B=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,P,A);else{const Q=Ur(s,P,"vertex"),H=Ur(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+F+`
`+Q+`
`+H)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(I===""||z==="")&&(B=!1);B&&(y.diagnostics={runnable:K,programLog:F,vertexShader:{log:I,prefix:p},fragmentShader:{log:z,prefix:m}})}s.deleteShader(P),s.deleteShader(A),D=new Pi(s,x),V=R3(s,x)}let D;this.getUniforms=function(){return D===void 0&&w(this),D};let V;this.getAttributes=function(){return V===void 0&&w(this),V};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(x,M3)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=S3++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=A,this}let V3=0;class k3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new H3(e),t.set(e,n)),n}}class H3{constructor(e){this.id=V3++,this.code=e,this.usedTimes=0}}function W3(i,e,t,n,s,r,o){const a=new Gs,l=new k3,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.reverseDepthBuffer,d=s.vertexTextures;let g=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return c.add(_),_===0?"uv":`uv${_}`}function m(_,y,F,I,z){const K=I.fog,B=z.geometry,Q=_.isMeshStandardMaterial?I.environment:null,H=(_.isMeshStandardMaterial?t:e).get(_.envMap||Q),s0=H&&H.mapping===306?H.image.height:null,u0=x[_.type];_.precision!==null&&(g=s.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));const d0=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,B0=d0!==void 0?d0.length:0;let H0=0;B.morphAttributes.position!==void 0&&(H0=1),B.morphAttributes.normal!==void 0&&(H0=2),B.morphAttributes.color!==void 0&&(H0=3);let X,n0,M0,r0;if(u0){const ce=rt[u0];X=ce.vertexShader,n0=ce.fragmentShader}else X=_.vertexShader,n0=_.fragmentShader,l.update(_),M0=l.getVertexShaderID(_),r0=l.getFragmentShaderID(_);const C0=i.getRenderTarget(),b0=z.isInstancedMesh===!0,D0=z.isBatchedMesh===!0,F0=!!_.map,q=!!_.matcap,C=!!H,a0=!!_.aoMap,o0=!!_.lightMap,i0=!!_.bumpMap,c0=!!_.normalMap,A0=!!_.displacementMap,_0=!!_.emissiveMap,b=!!_.metalnessMap,M=!!_.roughnessMap,O=_.anisotropy>0,Z=_.clearcoat>0,$=_.dispersion>0,Y=_.iridescence>0,T0=_.sheen>0,h0=_.transmission>0,v0=O&&!!_.anisotropyMap,k0=Z&&!!_.clearcoatMap,e0=Z&&!!_.clearcoatNormalMap,m0=Z&&!!_.clearcoatRoughnessMap,N0=Y&&!!_.iridescenceMap,I0=Y&&!!_.iridescenceThicknessMap,E0=T0&&!!_.sheenColorMap,W0=T0&&!!_.sheenRoughnessMap,O0=!!_.specularMap,j0=!!_.specularColorMap,L=!!_.specularIntensityMap,p0=h0&&!!_.transmissionMap,W=h0&&!!_.thicknessMap,j=!!_.gradientMap,x0=!!_.alphaMap,g0=_.alphaTest>0,G0=!!_.alphaHash,de=!!_.extensions;let be=0;_.toneMapped&&(C0===null||C0.isXRRenderTarget===!0)&&(be=i.toneMapping);const K0={shaderID:u0,shaderType:_.type,shaderName:_.name,vertexShader:X,fragmentShader:n0,defines:_.defines,customVertexShaderID:M0,customFragmentShaderID:r0,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:D0,batchingColor:D0&&z._colorsTexture!==null,instancing:b0,instancingColor:b0&&z.instanceColor!==null,instancingMorph:b0&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:C0===null?i.outputColorSpace:C0.isXRRenderTarget===!0?C0.texture.colorSpace:Dt,alphaToCoverage:!!_.alphaToCoverage,map:F0,matcap:q,envMap:C,envMapMode:C&&H.mapping,envMapCubeUVHeight:s0,aoMap:a0,lightMap:o0,bumpMap:i0,normalMap:c0,displacementMap:d&&A0,emissiveMap:_0,normalMapObjectSpace:c0&&_.normalMapType===1,normalMapTangentSpace:c0&&_.normalMapType===0,metalnessMap:b,roughnessMap:M,anisotropy:O,anisotropyMap:v0,clearcoat:Z,clearcoatMap:k0,clearcoatNormalMap:e0,clearcoatRoughnessMap:m0,dispersion:$,iridescence:Y,iridescenceMap:N0,iridescenceThicknessMap:I0,sheen:T0,sheenColorMap:E0,sheenRoughnessMap:W0,specularMap:O0,specularColorMap:j0,specularIntensityMap:L,transmission:h0,transmissionMap:p0,thicknessMap:W,gradientMap:j,opaque:_.transparent===!1&&_.blending===1&&_.alphaToCoverage===!1,alphaMap:x0,alphaTest:g0,alphaHash:G0,combine:_.combine,mapUv:F0&&p(_.map.channel),aoMapUv:a0&&p(_.aoMap.channel),lightMapUv:o0&&p(_.lightMap.channel),bumpMapUv:i0&&p(_.bumpMap.channel),normalMapUv:c0&&p(_.normalMap.channel),displacementMapUv:A0&&p(_.displacementMap.channel),emissiveMapUv:_0&&p(_.emissiveMap.channel),metalnessMapUv:b&&p(_.metalnessMap.channel),roughnessMapUv:M&&p(_.roughnessMap.channel),anisotropyMapUv:v0&&p(_.anisotropyMap.channel),clearcoatMapUv:k0&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:e0&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:m0&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:N0&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:I0&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:E0&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:W0&&p(_.sheenRoughnessMap.channel),specularMapUv:O0&&p(_.specularMap.channel),specularColorMapUv:j0&&p(_.specularColorMap.channel),specularIntensityMapUv:L&&p(_.specularIntensityMap.channel),transmissionMapUv:p0&&p(_.transmissionMap.channel),thicknessMapUv:W&&p(_.thicknessMap.channel),alphaMapUv:x0&&p(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(c0||O),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!B.attributes.uv&&(F0||x0),fog:!!K,useFog:_.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:f,skinning:z.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:B0,morphTextureStride:H0,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:be,decodeVideoTexture:F0&&_.map.isVideoTexture===!0&&Q0.getTransfer(_.map.colorSpace)===re,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===2,flipSided:_.side===1,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:de&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&_.extensions.multiDraw===!0||D0)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return K0.vertexUv1s=c.has(1),K0.vertexUv2s=c.has(2),K0.vertexUv3s=c.has(3),c.clear(),K0}function T(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const F in _.defines)y.push(F),y.push(_.defines[F]);return _.isRawShaderMaterial===!1&&(v(y,_),S(y,_),y.push(i.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function v(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function S(_,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),_.push(a.mask)}function P(_){const y=x[_.type];let F;if(y){const I=rt[y];F=ot.clone(I.uniforms)}else F=_.uniforms;return F}function A(_,y){let F;for(let I=0,z=h.length;I<z;I++){const K=h[I];if(K.cacheKey===y){F=K,++F.usedTimes;break}}return F===void 0&&(F=new G3(i,y,_,r),h.push(F)),F}function w(_){if(--_.usedTimes===0){const y=h.indexOf(_);h[y]=h[h.length-1],h.pop(),_.destroy()}}function D(_){l.remove(_)}function V(){l.dispose()}return{getParameters:m,getProgramCacheKey:T,getUniforms:P,acquireProgram:A,releaseProgram:w,releaseShaderCache:D,programs:h,dispose:V}}function X3(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function q3(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Br(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function zr(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,d,g,x,p){let m=i[e];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:x,group:p},i[e]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=x,m.group=p),e++,m}function a(u,f,d,g,x,p){const m=o(u,f,d,g,x,p);d.transmission>0?n.push(m):d.transparent===!0?s.push(m):t.push(m)}function l(u,f,d,g,x,p){const m=o(u,f,d,g,x,p);d.transmission>0?n.unshift(m):d.transparent===!0?s.unshift(m):t.unshift(m)}function c(u,f){t.length>1&&t.sort(u||q3),n.length>1&&n.sort(f||Br),s.length>1&&s.sort(f||Br)}function h(){for(let u=e,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Y3(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new zr,i.set(n,[o])):s>=r.length?(o=new zr,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Z3(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new P0};break;case"SpotLight":t={position:new R,direction:new R,color:new P0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new P0,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new P0,groundColor:new P0};break;case"RectAreaLight":t={color:new P0,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function K3(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t0};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t0};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t0,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let $3=0;function j3(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function J3(i){const e=new Z3,t=K3(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const s=new R,r=new Y0,o=new Y0;function a(c){let h=0,u=0,f=0;for(let V=0;V<9;V++)n.probe[V].set(0,0,0);let d=0,g=0,x=0,p=0,m=0,T=0,v=0,S=0,P=0,A=0,w=0;c.sort(j3);for(let V=0,_=c.length;V<_;V++){const y=c[V],F=y.color,I=y.intensity,z=y.distance,K=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)h+=F.r*I,u+=F.g*I,f+=F.b*I;else if(y.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(y.sh.coefficients[B],I);w++}else if(y.isDirectionalLight){const B=e.get(y);if(B.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const Q=y.shadow,H=t.get(y);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=K,n.directionalShadowMatrix[d]=y.shadow.matrix,T++}n.directional[d]=B,d++}else if(y.isSpotLight){const B=e.get(y);B.position.setFromMatrixPosition(y.matrixWorld),B.color.copy(F).multiplyScalar(I),B.distance=z,B.coneCos=Math.cos(y.angle),B.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),B.decay=y.decay,n.spot[x]=B;const Q=y.shadow;if(y.map&&(n.spotLightMap[P]=y.map,P++,Q.updateMatrices(y),y.castShadow&&A++),n.spotLightMatrix[x]=Q.matrix,y.castShadow){const H=t.get(y);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,n.spotShadow[x]=H,n.spotShadowMap[x]=K,S++}x++}else if(y.isRectAreaLight){const B=e.get(y);B.color.copy(F).multiplyScalar(I),B.halfWidth.set(y.width*.5,0,0),B.halfHeight.set(0,y.height*.5,0),n.rectArea[p]=B,p++}else if(y.isPointLight){const B=e.get(y);if(B.color.copy(y.color).multiplyScalar(y.intensity),B.distance=y.distance,B.decay=y.decay,y.castShadow){const Q=y.shadow,H=t.get(y);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,H.shadowCameraNear=Q.camera.near,H.shadowCameraFar=Q.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=y.shadow.matrix,v++}n.point[g]=B,g++}else if(y.isHemisphereLight){const B=e.get(y);B.skyColor.copy(y.color).multiplyScalar(I),B.groundColor.copy(y.groundColor).multiplyScalar(I),n.hemi[m]=B,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=f0.LTC_FLOAT_1,n.rectAreaLTC2=f0.LTC_FLOAT_2):(n.rectAreaLTC1=f0.LTC_HALF_1,n.rectAreaLTC2=f0.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const D=n.hash;(D.directionalLength!==d||D.pointLength!==g||D.spotLength!==x||D.rectAreaLength!==p||D.hemiLength!==m||D.numDirectionalShadows!==T||D.numPointShadows!==v||D.numSpotShadows!==S||D.numSpotMaps!==P||D.numLightProbes!==w)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=S+P-A,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=w,D.directionalLength=d,D.pointLength=g,D.spotLength=x,D.rectAreaLength=p,D.hemiLength=m,D.numDirectionalShadows=T,D.numPointShadows=v,D.numSpotShadows=S,D.numSpotMaps=P,D.numLightProbes=w,n.version=$3++)}function l(c,h){let u=0,f=0,d=0,g=0,x=0;const p=h.matrixWorldInverse;for(let m=0,T=c.length;m<T;m++){const v=c[m];if(v.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),u++}else if(v.isSpotLight){const S=n.spot[d];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),d++}else if(v.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),o.identity(),r.copy(v.matrixWorld),r.premultiply(p),o.extractRotation(r),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const S=n.point[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const S=n.hemi[x];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(p),x++}}}return{setup:a,setupView:l,state:n}}function Gr(i){const e=new J3(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Q3(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Gr(i),e.set(s,[a])):r>=o.length?(a=new Gr(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class e4 extends An{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class t4 extends An{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const n4=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,i4=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function s4(i,e,t){let n=new Vs;const s=new t0,r=new t0,o=new ge,a=new e4({depthPacking:3201}),l=new t4,c={},h=t.maxTextureSize,u={0:1,1:0,2:2},f=new ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new t0},radius:{value:4}},vertexShader:n4,fragmentShader:i4}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Pe;g.setAttribute("position",new ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new J(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let m=this.type;this.render=function(A,w,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const V=i.getRenderTarget(),_=i.getActiveCubeFace(),y=i.getActiveMipmapLevel(),F=i.state;F.setBlending(0),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const I=m!==3&&this.type===3,z=m===3&&this.type!==3;for(let K=0,B=A.length;K<B;K++){const Q=A[K],H=Q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const s0=H.getFrameExtents();if(s.multiply(s0),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/s0.x),s.x=r.x*s0.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/s0.y),s.y=r.y*s0.y,H.mapSize.y=r.y)),H.map===null||I===!0||z===!0){const d0=this.type!==3?{minFilter:1003,magFilter:1003}:{};H.map!==null&&H.map.dispose(),H.map=new Be(s.x,s.y,d0),H.map.texture.name=Q.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const u0=H.getViewportCount();for(let d0=0;d0<u0;d0++){const B0=H.getViewport(d0);o.set(r.x*B0.x,r.y*B0.y,r.x*B0.z,r.y*B0.w),F.viewport(o),H.updateMatrices(Q,d0),n=H.getFrustum(),S(w,D,H.camera,Q,this.type)}H.isPointLightShadow!==!0&&this.type===3&&T(H,D),H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(V,_,y)};function T(A,w){const D=e.update(x);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Be(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(w,null,D,f,x,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(w,null,D,d,x,null)}function v(A,w,D,V){let _=null;const y=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(y!==void 0)_=y;else if(_=D.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const F=_.uuid,I=w.uuid;let z=c[F];z===void 0&&(z={},c[F]=z);let K=z[I];K===void 0&&(K=_.clone(),z[I]=K,w.addEventListener("dispose",P)),_=K}if(_.visible=w.visible,_.wireframe=w.wireframe,V===3?_.side=w.shadowSide!==null?w.shadowSide:w.side:_.side=w.shadowSide!==null?w.shadowSide:u[w.side],_.alphaMap=w.alphaMap,_.alphaTest=w.alphaTest,_.map=w.map,_.clipShadows=w.clipShadows,_.clippingPlanes=w.clippingPlanes,_.clipIntersection=w.clipIntersection,_.displacementMap=w.displacementMap,_.displacementScale=w.displacementScale,_.displacementBias=w.displacementBias,_.wireframeLinewidth=w.wireframeLinewidth,_.linewidth=w.linewidth,D.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const F=i.properties.get(_);F.light=D}return _}function S(A,w,D,V,_){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&_===3)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const I=e.update(A),z=A.material;if(Array.isArray(z)){const K=I.groups;for(let B=0,Q=K.length;B<Q;B++){const H=K[B],s0=z[H.materialIndex];if(s0&&s0.visible){const u0=v(A,s0,V,_);A.onBeforeShadow(i,A,w,D,I,u0,H),i.renderBufferDirect(D,null,I,u0,A,H),A.onAfterShadow(i,A,w,D,I,u0,H)}}}else if(z.visible){const K=v(A,z,V,_);A.onBeforeShadow(i,A,w,D,I,K,null),i.renderBufferDirect(D,null,I,K,A,null),A.onAfterShadow(i,A,w,D,I,K,null)}}const F=A.children;for(let I=0,z=F.length;I<z;I++)S(F[I],w,D,V,_)}function P(A){A.target.removeEventListener("dispose",P);for(const D in c){const V=c[D],_=A.target.uuid;_ in V&&(V[_].dispose(),delete V[_])}}}const r4={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function o4(i){function e(){let L=!1;const p0=new ge;let W=null;const j=new ge(0,0,0,0);return{setMask:function(x0){W!==x0&&!L&&(i.colorMask(x0,x0,x0,x0),W=x0)},setLocked:function(x0){L=x0},setClear:function(x0,g0,G0,de,be){be===!0&&(x0*=de,g0*=de,G0*=de),p0.set(x0,g0,G0,de),j.equals(p0)===!1&&(i.clearColor(x0,g0,G0,de),j.copy(p0))},reset:function(){L=!1,W=null,j.set(-1,0,0,0)}}}function t(){let L=!1,p0=!1,W=null,j=null,x0=null;return{setReversed:function(g0){p0=g0},setTest:function(g0){g0?M0(i.DEPTH_TEST):r0(i.DEPTH_TEST)},setMask:function(g0){W!==g0&&!L&&(i.depthMask(g0),W=g0)},setFunc:function(g0){if(p0&&(g0=r4[g0]),j!==g0){switch(g0){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}j=g0}},setLocked:function(g0){L=g0},setClear:function(g0){x0!==g0&&(i.clearDepth(g0),x0=g0)},reset:function(){L=!1,W=null,j=null,x0=null}}}function n(){let L=!1,p0=null,W=null,j=null,x0=null,g0=null,G0=null,de=null,be=null;return{setTest:function(K0){L||(K0?M0(i.STENCIL_TEST):r0(i.STENCIL_TEST))},setMask:function(K0){p0!==K0&&!L&&(i.stencilMask(K0),p0=K0)},setFunc:function(K0,ce,Ye){(W!==K0||j!==ce||x0!==Ye)&&(i.stencilFunc(K0,ce,Ye),W=K0,j=ce,x0=Ye)},setOp:function(K0,ce,Ye){(g0!==K0||G0!==ce||de!==Ye)&&(i.stencilOp(K0,ce,Ye),g0=K0,G0=ce,de=Ye)},setLocked:function(K0){L=K0},setClear:function(K0){be!==K0&&(i.clearStencil(K0),be=K0)},reset:function(){L=!1,p0=null,W=null,j=null,x0=null,g0=null,G0=null,de=null,be=null}}}const s=new e,r=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,f=[],d=null,g=!1,x=null,p=null,m=null,T=null,v=null,S=null,P=null,A=new P0(0,0,0),w=0,D=!1,V=null,_=null,y=null,F=null,I=null;const z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,B=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(Q)[1]),K=B>=1):Q.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),K=B>=2);let H=null,s0={};const u0=i.getParameter(i.SCISSOR_BOX),d0=i.getParameter(i.VIEWPORT),B0=new ge().fromArray(u0),H0=new ge().fromArray(d0);function X(L,p0,W,j){const x0=new Uint8Array(4),g0=i.createTexture();i.bindTexture(L,g0),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let G0=0;G0<W;G0++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(p0,0,i.RGBA,1,1,j,0,i.RGBA,i.UNSIGNED_BYTE,x0):i.texImage2D(p0+G0,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,x0);return g0}const n0={};n0[i.TEXTURE_2D]=X(i.TEXTURE_2D,i.TEXTURE_2D,1),n0[i.TEXTURE_CUBE_MAP]=X(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n0[i.TEXTURE_2D_ARRAY]=X(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),n0[i.TEXTURE_3D]=X(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),M0(i.DEPTH_TEST),r.setFunc(3),o0(!1),i0(1),M0(i.CULL_FACE),C(0);function M0(L){c[L]!==!0&&(i.enable(L),c[L]=!0)}function r0(L){c[L]!==!1&&(i.disable(L),c[L]=!1)}function C0(L,p0){return h[L]!==p0?(i.bindFramebuffer(L,p0),h[L]=p0,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=p0),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=p0),!0):!1}function b0(L,p0){let W=f,j=!1;if(L){W=u.get(p0),W===void 0&&(W=[],u.set(p0,W));const x0=L.textures;if(W.length!==x0.length||W[0]!==i.COLOR_ATTACHMENT0){for(let g0=0,G0=x0.length;g0<G0;g0++)W[g0]=i.COLOR_ATTACHMENT0+g0;W.length=x0.length,j=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,j=!0);j&&i.drawBuffers(W)}function D0(L){return d!==L?(i.useProgram(L),d=L,!0):!1}const F0={100:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};F0[103]=i.MIN,F0[104]=i.MAX;const q={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,204:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,205:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function C(L,p0,W,j,x0,g0,G0,de,be,K0){if(L===0){g===!0&&(r0(i.BLEND),g=!1);return}if(g===!1&&(M0(i.BLEND),g=!0),L!==5){if(L!==x||K0!==D){if((p!==100||v!==100)&&(i.blendEquation(i.FUNC_ADD),p=100,v=100),K0)switch(L){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}m=null,T=null,S=null,P=null,A.set(0,0,0),w=0,x=L,D=K0}return}x0=x0||p0,g0=g0||W,G0=G0||j,(p0!==p||x0!==v)&&(i.blendEquationSeparate(F0[p0],F0[x0]),p=p0,v=x0),(W!==m||j!==T||g0!==S||G0!==P)&&(i.blendFuncSeparate(q[W],q[j],q[g0],q[G0]),m=W,T=j,S=g0,P=G0),(de.equals(A)===!1||be!==w)&&(i.blendColor(de.r,de.g,de.b,be),A.copy(de),w=be),x=L,D=!1}function a0(L,p0){L.side===2?r0(i.CULL_FACE):M0(i.CULL_FACE);let W=L.side===1;p0&&(W=!W),o0(W),L.blending===1&&L.transparent===!1?C(0):C(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),s.setMask(L.colorWrite);const j=L.stencilWrite;o.setTest(j),j&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),A0(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?M0(i.SAMPLE_ALPHA_TO_COVERAGE):r0(i.SAMPLE_ALPHA_TO_COVERAGE)}function o0(L){V!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),V=L)}function i0(L){L!==0?(M0(i.CULL_FACE),L!==_&&(L===1?i.cullFace(i.BACK):L===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):r0(i.CULL_FACE),_=L}function c0(L){L!==y&&(K&&i.lineWidth(L),y=L)}function A0(L,p0,W){L?(M0(i.POLYGON_OFFSET_FILL),(F!==p0||I!==W)&&(i.polygonOffset(p0,W),F=p0,I=W)):r0(i.POLYGON_OFFSET_FILL)}function _0(L){L?M0(i.SCISSOR_TEST):r0(i.SCISSOR_TEST)}function b(L){L===void 0&&(L=i.TEXTURE0+z-1),H!==L&&(i.activeTexture(L),H=L)}function M(L,p0,W){W===void 0&&(H===null?W=i.TEXTURE0+z-1:W=H);let j=s0[W];j===void 0&&(j={type:void 0,texture:void 0},s0[W]=j),(j.type!==L||j.texture!==p0)&&(H!==W&&(i.activeTexture(W),H=W),i.bindTexture(L,p0||n0[L]),j.type=L,j.texture=p0)}function O(){const L=s0[H];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function T0(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function h0(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function v0(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function k0(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function e0(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function m0(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function N0(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function I0(L){B0.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),B0.copy(L))}function E0(L){H0.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),H0.copy(L))}function W0(L,p0){let W=l.get(p0);W===void 0&&(W=new WeakMap,l.set(p0,W));let j=W.get(L);j===void 0&&(j=i.getUniformBlockIndex(p0,L.name),W.set(L,j))}function O0(L,p0){const j=l.get(p0).get(L);a.get(p0)!==j&&(i.uniformBlockBinding(p0,j,L.__bindingPointIndex),a.set(p0,j))}function j0(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},H=null,s0={},h={},u=new WeakMap,f=[],d=null,g=!1,x=null,p=null,m=null,T=null,v=null,S=null,P=null,A=new P0(0,0,0),w=0,D=!1,V=null,_=null,y=null,F=null,I=null,B0.set(0,0,i.canvas.width,i.canvas.height),H0.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:M0,disable:r0,bindFramebuffer:C0,drawBuffers:b0,useProgram:D0,setBlending:C,setMaterial:a0,setFlipSided:o0,setCullFace:i0,setLineWidth:c0,setPolygonOffset:A0,setScissorTest:_0,activeTexture:b,bindTexture:M,unbindTexture:O,compressedTexImage2D:Z,compressedTexImage3D:$,texImage2D:m0,texImage3D:N0,updateUBOMapping:W0,uniformBlockBinding:O0,texStorage2D:k0,texStorage3D:e0,texSubImage2D:Y,texSubImage3D:T0,compressedTexSubImage2D:h0,compressedTexSubImage3D:v0,scissor:I0,viewport:E0,reset:j0}}function Vr(i,e,t,n){const s=a4(n);switch(t){case 1021:return i*e;case 1024:return i*e;case 1025:return i*e*2;case 1028:return i*e/s.components*s.byteLength;case 1029:return i*e/s.components*s.byteLength;case 1030:return i*e*2/s.components*s.byteLength;case 1031:return i*e*2/s.components*s.byteLength;case 1022:return i*e*3/s.components*s.byteLength;case 1023:return i*e*4/s.components*s.byteLength;case 1033:return i*e*4/s.components*s.byteLength;case 33776:case 33777:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function a4(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function l4(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new t0,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,M){return d?new OffscreenCanvas(b,M):Ii("canvas")}function x(b,M,O){let Z=1;const $=_0(b);if(($.width>O||$.height>O)&&(Z=O/Math.max($.width,$.height)),Z<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Y=Math.floor(Z*$.width),T0=Math.floor(Z*$.height);u===void 0&&(u=g(Y,T0));const h0=M?g(Y,T0):u;return h0.width=Y,h0.height=T0,h0.getContext("2d").drawImage(b,0,0,Y,T0),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Y+"x"+T0+")."),h0}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),b;return b}function p(b){return b.generateMipmaps&&b.minFilter!==1003&&b.minFilter!==1006}function m(b){i.generateMipmap(b)}function T(b,M,O,Z,$=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Y=M;if(M===i.RED&&(O===i.FLOAT&&(Y=i.R32F),O===i.HALF_FLOAT&&(Y=i.R16F),O===i.UNSIGNED_BYTE&&(Y=i.R8)),M===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.R8UI),O===i.UNSIGNED_SHORT&&(Y=i.R16UI),O===i.UNSIGNED_INT&&(Y=i.R32UI),O===i.BYTE&&(Y=i.R8I),O===i.SHORT&&(Y=i.R16I),O===i.INT&&(Y=i.R32I)),M===i.RG&&(O===i.FLOAT&&(Y=i.RG32F),O===i.HALF_FLOAT&&(Y=i.RG16F),O===i.UNSIGNED_BYTE&&(Y=i.RG8)),M===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RG8UI),O===i.UNSIGNED_SHORT&&(Y=i.RG16UI),O===i.UNSIGNED_INT&&(Y=i.RG32UI),O===i.BYTE&&(Y=i.RG8I),O===i.SHORT&&(Y=i.RG16I),O===i.INT&&(Y=i.RG32I)),M===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),O===i.UNSIGNED_INT&&(Y=i.RGB32UI),O===i.BYTE&&(Y=i.RGB8I),O===i.SHORT&&(Y=i.RGB16I),O===i.INT&&(Y=i.RGB32I)),M===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),O===i.UNSIGNED_INT&&(Y=i.RGBA32UI),O===i.BYTE&&(Y=i.RGBA8I),O===i.SHORT&&(Y=i.RGBA16I),O===i.INT&&(Y=i.RGBA32I)),M===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),M===i.RGBA){const T0=$?Di:Q0.getTransfer(Z);O===i.FLOAT&&(Y=i.RGBA32F),O===i.HALF_FLOAT&&(Y=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Y=T0===re?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function v(b,M){let O;return b?M===null||M===1014||M===1020?O=i.DEPTH24_STENCIL8:M===1015?O=i.DEPTH32F_STENCIL8:M===1012&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===1014||M===1020?O=i.DEPTH_COMPONENT24:M===1015?O=i.DEPTH_COMPONENT32F:M===1012&&(O=i.DEPTH_COMPONENT16),O}function S(b,M){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==1003&&b.minFilter!==1006?Math.log2(Math.max(M.width,M.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?M.mipmaps.length:1}function P(b){const M=b.target;M.removeEventListener("dispose",P),w(M),M.isVideoTexture&&h.delete(M)}function A(b){const M=b.target;M.removeEventListener("dispose",A),V(M)}function w(b){const M=n.get(b);if(M.__webglInit===void 0)return;const O=b.source,Z=f.get(O);if(Z){const $=Z[M.__cacheKey];$.usedTimes--,$.usedTimes===0&&D(b),Object.keys(Z).length===0&&f.delete(O)}n.remove(b)}function D(b){const M=n.get(b);i.deleteTexture(M.__webglTexture);const O=b.source,Z=f.get(O);delete Z[M.__cacheKey],o.memory.textures--}function V(b){const M=n.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(M.__webglFramebuffer[Z]))for(let $=0;$<M.__webglFramebuffer[Z].length;$++)i.deleteFramebuffer(M.__webglFramebuffer[Z][$]);else i.deleteFramebuffer(M.__webglFramebuffer[Z]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[Z])}else{if(Array.isArray(M.__webglFramebuffer))for(let Z=0;Z<M.__webglFramebuffer.length;Z++)i.deleteFramebuffer(M.__webglFramebuffer[Z]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Z=0;Z<M.__webglColorRenderbuffer.length;Z++)M.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const O=b.textures;for(let Z=0,$=O.length;Z<$;Z++){const Y=n.get(O[Z]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(O[Z])}n.remove(b)}let _=0;function y(){_=0}function F(){const b=_;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),_+=1,b}function I(b){const M=[];return M.push(b.wrapS),M.push(b.wrapT),M.push(b.wrapR||0),M.push(b.magFilter),M.push(b.minFilter),M.push(b.anisotropy),M.push(b.internalFormat),M.push(b.format),M.push(b.type),M.push(b.generateMipmaps),M.push(b.premultiplyAlpha),M.push(b.flipY),M.push(b.unpackAlignment),M.push(b.colorSpace),M.join()}function z(b,M){const O=n.get(b);if(b.isVideoTexture&&c0(b),b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){const Z=b.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{H0(O,b,M);return}}t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+M)}function K(b,M){const O=n.get(b);if(b.version>0&&O.__version!==b.version){H0(O,b,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+M)}function B(b,M){const O=n.get(b);if(b.version>0&&O.__version!==b.version){H0(O,b,M);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+M)}function Q(b,M){const O=n.get(b);if(b.version>0&&O.__version!==b.version){X(O,b,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+M)}const H={1e3:i.REPEAT,1001:i.CLAMP_TO_EDGE,1002:i.MIRRORED_REPEAT},s0={1003:i.NEAREST,1004:i.NEAREST_MIPMAP_NEAREST,1005:i.NEAREST_MIPMAP_LINEAR,1006:i.LINEAR,1007:i.LINEAR_MIPMAP_NEAREST,1008:i.LINEAR_MIPMAP_LINEAR},u0={512:i.NEVER,519:i.ALWAYS,513:i.LESS,515:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function d0(b,M){if(M.type===1015&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===1006||M.magFilter===1007||M.magFilter===1005||M.magFilter===1008||M.minFilter===1006||M.minFilter===1007||M.minFilter===1005||M.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,H[M.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,H[M.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,H[M.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,s0[M.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,s0[M.minFilter]),M.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,u0[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===1003||M.minFilter!==1005&&M.minFilter!==1008||M.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function B0(b,M){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,M.addEventListener("dispose",P));const Z=M.source;let $=f.get(Z);$===void 0&&($={},f.set(Z,$));const Y=I(M);if(Y!==b.__cacheKey){$[Y]===void 0&&($[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),$[Y].usedTimes++;const T0=$[b.__cacheKey];T0!==void 0&&($[b.__cacheKey].usedTimes--,T0.usedTimes===0&&D(M)),b.__cacheKey=Y,b.__webglTexture=$[Y].texture}return O}function H0(b,M,O){let Z=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=i.TEXTURE_3D);const $=B0(b,M),Y=M.source;t.bindTexture(Z,b.__webglTexture,i.TEXTURE0+O);const T0=n.get(Y);if(Y.version!==T0.__version||$===!0){t.activeTexture(i.TEXTURE0+O);const h0=Q0.getPrimaries(Q0.workingColorSpace),v0=M.colorSpace===Ct?null:Q0.getPrimaries(M.colorSpace),k0=M.colorSpace===Ct||h0===v0?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,k0);let e0=x(M.image,!1,s.maxTextureSize);e0=A0(M,e0);const m0=r.convert(M.format,M.colorSpace),N0=r.convert(M.type);let I0=T(M.internalFormat,m0,N0,M.colorSpace,M.isVideoTexture);d0(Z,M);let E0;const W0=M.mipmaps,O0=M.isVideoTexture!==!0,j0=T0.__version===void 0||$===!0,L=Y.dataReady,p0=S(M,e0);if(M.isDepthTexture)I0=v(M.format===1027,M.type),j0&&(O0?t.texStorage2D(i.TEXTURE_2D,1,I0,e0.width,e0.height):t.texImage2D(i.TEXTURE_2D,0,I0,e0.width,e0.height,0,m0,N0,null));else if(M.isDataTexture)if(W0.length>0){O0&&j0&&t.texStorage2D(i.TEXTURE_2D,p0,I0,W0[0].width,W0[0].height);for(let W=0,j=W0.length;W<j;W++)E0=W0[W],O0?L&&t.texSubImage2D(i.TEXTURE_2D,W,0,0,E0.width,E0.height,m0,N0,E0.data):t.texImage2D(i.TEXTURE_2D,W,I0,E0.width,E0.height,0,m0,N0,E0.data);M.generateMipmaps=!1}else O0?(j0&&t.texStorage2D(i.TEXTURE_2D,p0,I0,e0.width,e0.height),L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,e0.width,e0.height,m0,N0,e0.data)):t.texImage2D(i.TEXTURE_2D,0,I0,e0.width,e0.height,0,m0,N0,e0.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){O0&&j0&&t.texStorage3D(i.TEXTURE_2D_ARRAY,p0,I0,W0[0].width,W0[0].height,e0.depth);for(let W=0,j=W0.length;W<j;W++)if(E0=W0[W],M.format!==1023)if(m0!==null)if(O0){if(L)if(M.layerUpdates.size>0){const x0=Vr(E0.width,E0.height,M.format,M.type);for(const g0 of M.layerUpdates){const G0=E0.data.subarray(g0*x0/E0.data.BYTES_PER_ELEMENT,(g0+1)*x0/E0.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,g0,E0.width,E0.height,1,m0,G0,0,0)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,E0.width,E0.height,e0.depth,m0,E0.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,W,I0,E0.width,E0.height,e0.depth,0,E0.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O0?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,E0.width,E0.height,e0.depth,m0,N0,E0.data):t.texImage3D(i.TEXTURE_2D_ARRAY,W,I0,E0.width,E0.height,e0.depth,0,m0,N0,E0.data)}else{O0&&j0&&t.texStorage2D(i.TEXTURE_2D,p0,I0,W0[0].width,W0[0].height);for(let W=0,j=W0.length;W<j;W++)E0=W0[W],M.format!==1023?m0!==null?O0?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,W,0,0,E0.width,E0.height,m0,E0.data):t.compressedTexImage2D(i.TEXTURE_2D,W,I0,E0.width,E0.height,0,E0.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O0?L&&t.texSubImage2D(i.TEXTURE_2D,W,0,0,E0.width,E0.height,m0,N0,E0.data):t.texImage2D(i.TEXTURE_2D,W,I0,E0.width,E0.height,0,m0,N0,E0.data)}else if(M.isDataArrayTexture)if(O0){if(j0&&t.texStorage3D(i.TEXTURE_2D_ARRAY,p0,I0,e0.width,e0.height,e0.depth),L)if(M.layerUpdates.size>0){const W=Vr(e0.width,e0.height,M.format,M.type);for(const j of M.layerUpdates){const x0=e0.data.subarray(j*W/e0.data.BYTES_PER_ELEMENT,(j+1)*W/e0.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,e0.width,e0.height,1,m0,N0,x0)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,e0.width,e0.height,e0.depth,m0,N0,e0.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,I0,e0.width,e0.height,e0.depth,0,m0,N0,e0.data);else if(M.isData3DTexture)O0?(j0&&t.texStorage3D(i.TEXTURE_3D,p0,I0,e0.width,e0.height,e0.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,e0.width,e0.height,e0.depth,m0,N0,e0.data)):t.texImage3D(i.TEXTURE_3D,0,I0,e0.width,e0.height,e0.depth,0,m0,N0,e0.data);else if(M.isFramebufferTexture){if(j0)if(O0)t.texStorage2D(i.TEXTURE_2D,p0,I0,e0.width,e0.height);else{let W=e0.width,j=e0.height;for(let x0=0;x0<p0;x0++)t.texImage2D(i.TEXTURE_2D,x0,I0,W,j,0,m0,N0,null),W>>=1,j>>=1}}else if(W0.length>0){if(O0&&j0){const W=_0(W0[0]);t.texStorage2D(i.TEXTURE_2D,p0,I0,W.width,W.height)}for(let W=0,j=W0.length;W<j;W++)E0=W0[W],O0?L&&t.texSubImage2D(i.TEXTURE_2D,W,0,0,m0,N0,E0):t.texImage2D(i.TEXTURE_2D,W,I0,m0,N0,E0);M.generateMipmaps=!1}else if(O0){if(j0){const W=_0(e0);t.texStorage2D(i.TEXTURE_2D,p0,I0,W.width,W.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,m0,N0,e0)}else t.texImage2D(i.TEXTURE_2D,0,I0,m0,N0,e0);p(M)&&m(Z),T0.__version=Y.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function X(b,M,O){if(M.image.length!==6)return;const Z=B0(b,M),$=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+O);const Y=n.get($);if($.version!==Y.__version||Z===!0){t.activeTexture(i.TEXTURE0+O);const T0=Q0.getPrimaries(Q0.workingColorSpace),h0=M.colorSpace===Ct?null:Q0.getPrimaries(M.colorSpace),v0=M.colorSpace===Ct||T0===h0?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,v0);const k0=M.isCompressedTexture||M.image[0].isCompressedTexture,e0=M.image[0]&&M.image[0].isDataTexture,m0=[];for(let j=0;j<6;j++)!k0&&!e0?m0[j]=x(M.image[j],!0,s.maxCubemapSize):m0[j]=e0?M.image[j].image:M.image[j],m0[j]=A0(M,m0[j]);const N0=m0[0],I0=r.convert(M.format,M.colorSpace),E0=r.convert(M.type),W0=T(M.internalFormat,I0,E0,M.colorSpace),O0=M.isVideoTexture!==!0,j0=Y.__version===void 0||Z===!0,L=$.dataReady;let p0=S(M,N0);d0(i.TEXTURE_CUBE_MAP,M);let W;if(k0){O0&&j0&&t.texStorage2D(i.TEXTURE_CUBE_MAP,p0,W0,N0.width,N0.height);for(let j=0;j<6;j++){W=m0[j].mipmaps;for(let x0=0;x0<W.length;x0++){const g0=W[x0];M.format!==1023?I0!==null?O0?L&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,x0,0,0,g0.width,g0.height,I0,g0.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,x0,W0,g0.width,g0.height,0,g0.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O0?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,x0,0,0,g0.width,g0.height,I0,E0,g0.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,x0,W0,g0.width,g0.height,0,I0,E0,g0.data)}}}else{if(W=M.mipmaps,O0&&j0){W.length>0&&p0++;const j=_0(m0[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,p0,W0,j.width,j.height)}for(let j=0;j<6;j++)if(e0){O0?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,m0[j].width,m0[j].height,I0,E0,m0[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,W0,m0[j].width,m0[j].height,0,I0,E0,m0[j].data);for(let x0=0;x0<W.length;x0++){const G0=W[x0].image[j].image;O0?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,x0+1,0,0,G0.width,G0.height,I0,E0,G0.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,x0+1,W0,G0.width,G0.height,0,I0,E0,G0.data)}}else{O0?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,I0,E0,m0[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,W0,I0,E0,m0[j]);for(let x0=0;x0<W.length;x0++){const g0=W[x0];O0?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,x0+1,0,0,I0,E0,g0.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,x0+1,W0,I0,E0,g0.image[j])}}}p(M)&&m(i.TEXTURE_CUBE_MAP),Y.__version=$.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function n0(b,M,O,Z,$,Y){const T0=r.convert(O.format,O.colorSpace),h0=r.convert(O.type),v0=T(O.internalFormat,T0,h0,O.colorSpace);if(!n.get(M).__hasExternalTextures){const e0=Math.max(1,M.width>>Y),m0=Math.max(1,M.height>>Y);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,Y,v0,e0,m0,M.depth,0,T0,h0,null):t.texImage2D($,Y,v0,e0,m0,0,T0,h0,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),i0(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,$,n.get(O).__webglTexture,0,o0(M)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,$,n.get(O).__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function M0(b,M,O){if(i.bindRenderbuffer(i.RENDERBUFFER,b),M.depthBuffer){const Z=M.depthTexture,$=Z&&Z.isDepthTexture?Z.type:null,Y=v(M.stencilBuffer,$),T0=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,h0=o0(M);i0(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,h0,Y,M.width,M.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,h0,Y,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Y,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,T0,i.RENDERBUFFER,b)}else{const Z=M.textures;for(let $=0;$<Z.length;$++){const Y=Z[$],T0=r.convert(Y.format,Y.colorSpace),h0=r.convert(Y.type),v0=T(Y.internalFormat,T0,h0,Y.colorSpace),k0=o0(M);O&&i0(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,k0,v0,M.width,M.height):i0(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,k0,v0,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,v0,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function r0(b,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),z(M.depthTexture,0);const Z=n.get(M.depthTexture).__webglTexture,$=o0(M);if(M.depthTexture.format===1026)i0(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(M.depthTexture.format===1027)i0(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function C0(b){const M=n.get(b),O=b.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==b.depthTexture){const Z=b.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Z){const $=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Z.removeEventListener("dispose",$)};Z.addEventListener("dispose",$),M.__depthDisposeCallback=$}M.__boundDepthTexture=Z}if(b.depthTexture&&!M.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");r0(M.__webglFramebuffer,b)}else if(O){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]===void 0)M.__webglDepthbuffer[Z]=i.createRenderbuffer(),M0(M.__webglDepthbuffer[Z],b,!1);else{const $=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),M0(M.__webglDepthbuffer,b,!1);else{const Z=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,$)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function b0(b,M,O){const Z=n.get(b);M!==void 0&&n0(Z.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&C0(b)}function D0(b){const M=b.texture,O=n.get(b),Z=n.get(M);b.addEventListener("dispose",A);const $=b.textures,Y=b.isWebGLCubeRenderTarget===!0,T0=$.length>1;if(T0||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=M.version,o.memory.textures++),Y){O.__webglFramebuffer=[];for(let h0=0;h0<6;h0++)if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer[h0]=[];for(let v0=0;v0<M.mipmaps.length;v0++)O.__webglFramebuffer[h0][v0]=i.createFramebuffer()}else O.__webglFramebuffer[h0]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer=[];for(let h0=0;h0<M.mipmaps.length;h0++)O.__webglFramebuffer[h0]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(T0)for(let h0=0,v0=$.length;h0<v0;h0++){const k0=n.get($[h0]);k0.__webglTexture===void 0&&(k0.__webglTexture=i.createTexture(),o.memory.textures++)}if(b.samples>0&&i0(b)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let h0=0;h0<$.length;h0++){const v0=$[h0];O.__webglColorRenderbuffer[h0]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[h0]);const k0=r.convert(v0.format,v0.colorSpace),e0=r.convert(v0.type),m0=T(v0.internalFormat,k0,e0,v0.colorSpace,b.isXRRenderTarget===!0),N0=o0(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,N0,m0,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+h0,i.RENDERBUFFER,O.__webglColorRenderbuffer[h0])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),M0(O.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),d0(i.TEXTURE_CUBE_MAP,M);for(let h0=0;h0<6;h0++)if(M.mipmaps&&M.mipmaps.length>0)for(let v0=0;v0<M.mipmaps.length;v0++)n0(O.__webglFramebuffer[h0][v0],b,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+h0,v0);else n0(O.__webglFramebuffer[h0],b,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+h0,0);p(M)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(T0){for(let h0=0,v0=$.length;h0<v0;h0++){const k0=$[h0],e0=n.get(k0);t.bindTexture(i.TEXTURE_2D,e0.__webglTexture),d0(i.TEXTURE_2D,k0),n0(O.__webglFramebuffer,b,k0,i.COLOR_ATTACHMENT0+h0,i.TEXTURE_2D,0),p(k0)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let h0=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(h0=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(h0,Z.__webglTexture),d0(h0,M),M.mipmaps&&M.mipmaps.length>0)for(let v0=0;v0<M.mipmaps.length;v0++)n0(O.__webglFramebuffer[v0],b,M,i.COLOR_ATTACHMENT0,h0,v0);else n0(O.__webglFramebuffer,b,M,i.COLOR_ATTACHMENT0,h0,0);p(M)&&m(h0),t.unbindTexture()}b.depthBuffer&&C0(b)}function F0(b){const M=b.textures;for(let O=0,Z=M.length;O<Z;O++){const $=M[O];if(p($)){const Y=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,T0=n.get($).__webglTexture;t.bindTexture(Y,T0),m(Y),t.unbindTexture()}}}const q=[],C=[];function a0(b){if(b.samples>0){if(i0(b)===!1){const M=b.textures,O=b.width,Z=b.height;let $=i.COLOR_BUFFER_BIT;const Y=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,T0=n.get(b),h0=M.length>1;if(h0)for(let v0=0;v0<M.length;v0++)t.bindFramebuffer(i.FRAMEBUFFER,T0.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+v0,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,T0.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+v0,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,T0.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,T0.__webglFramebuffer);for(let v0=0;v0<M.length;v0++){if(b.resolveDepthBuffer&&(b.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),h0){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,T0.__webglColorRenderbuffer[v0]);const k0=n.get(M[v0]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,k0,0)}i.blitFramebuffer(0,0,O,Z,0,0,O,Z,$,i.NEAREST),l===!0&&(q.length=0,C.length=0,q.push(i.COLOR_ATTACHMENT0+v0),b.depthBuffer&&b.resolveDepthBuffer===!1&&(q.push(Y),C.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,q))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),h0)for(let v0=0;v0<M.length;v0++){t.bindFramebuffer(i.FRAMEBUFFER,T0.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+v0,i.RENDERBUFFER,T0.__webglColorRenderbuffer[v0]);const k0=n.get(M[v0]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,T0.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+v0,i.TEXTURE_2D,k0,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,T0.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const M=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function o0(b){return Math.min(s.maxSamples,b.samples)}function i0(b){const M=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function c0(b){const M=o.render.frame;h.get(b)!==M&&(h.set(b,M),b.update())}function A0(b,M){const O=b.colorSpace,Z=b.format,$=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||O!==Dt&&O!==Ct&&(Q0.getTransfer(O)===re?(Z!==1023||$!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),M}function _0(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=y,this.setTexture2D=z,this.setTexture2DArray=K,this.setTexture3D=B,this.setTextureCube=Q,this.rebindTextures=b0,this.setupRenderTarget=D0,this.updateRenderTargetMipmap=F0,this.updateMultisampleRenderTarget=a0,this.setupDepthRenderbuffer=C0,this.setupFrameBufferTexture=n0,this.useMultisampledRTT=i0}function c4(i,e){function t(n,s=Ct){let r;const o=Q0.getTransfer(s);if(n===1009)return i.UNSIGNED_BYTE;if(n===1017)return i.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return i.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return i.BYTE;if(n===1011)return i.SHORT;if(n===1012)return i.UNSIGNED_SHORT;if(n===1013)return i.INT;if(n===1014)return i.UNSIGNED_INT;if(n===1015)return i.FLOAT;if(n===1016)return i.HALF_FLOAT;if(n===1021)return i.ALPHA;if(n===1022)return i.RGB;if(n===1023)return i.RGBA;if(n===1024)return i.LUMINANCE;if(n===1025)return i.LUMINANCE_ALPHA;if(n===1026)return i.DEPTH_COMPONENT;if(n===1027)return i.DEPTH_STENCIL;if(n===1028)return i.RED;if(n===1029)return i.RED_INTEGER;if(n===1030)return i.RG;if(n===1031)return i.RG_INTEGER;if(n===1033)return i.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(o===re)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===36196||n===37492)return o===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===37496)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===37808)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===36492)return o===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===36492)return r.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class h4 extends Xe{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ae extends Me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const u4={type:"move"};class ys{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const p=t.getJointPose(x,n),m=this._getHandJoint(c,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(u4)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ae;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const f4=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d4=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class p4{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Ie,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ue({vertexShader:f4,fragmentShader:d4,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new J(new oe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class m4 extends En{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const x=new p4,p=t.getContextAttributes();let m=null,T=null;const v=[],S=[],P=new t0;let A=null;const w=new Xe;w.layers.enable(1),w.viewport=new ge;const D=new Xe;D.layers.enable(2),D.viewport=new ge;const V=[w,D],_=new h4;_.layers.enable(1),_.layers.enable(2);let y=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let n0=v[X];return n0===void 0&&(n0=new ys,v[X]=n0),n0.getTargetRaySpace()},this.getControllerGrip=function(X){let n0=v[X];return n0===void 0&&(n0=new ys,v[X]=n0),n0.getGripSpace()},this.getHand=function(X){let n0=v[X];return n0===void 0&&(n0=new ys,v[X]=n0),n0.getHandSpace()};function I(X){const n0=S.indexOf(X.inputSource);if(n0===-1)return;const M0=v[n0];M0!==void 0&&(M0.update(X.inputSource,X.frame,c||o),M0.dispatchEvent({type:X.type,data:X.inputSource}))}function z(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",K);for(let X=0;X<v.length;X++){const n0=S[X];n0!==null&&(S[X]=null,v[X].disconnect(n0))}y=null,F=null,x.reset(),e.setRenderTarget(m),d=null,f=null,u=null,s=null,T=null,H0.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",z),s.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(P),s.renderState.layers===void 0){const n0={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,n0),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),T=new Be(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let n0=null,M0=null,r0=null;p.depth&&(r0=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n0=p.stencil?1027:1026,M0=p.stencil?1020:1014);const C0={colorFormat:t.RGBA8,depthFormat:r0,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(C0),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),T=new Be(f.textureWidth,f.textureHeight,{format:1023,type:1009,depthTexture:new Ws(f.textureWidth,f.textureHeight,M0,void 0,void 0,void 0,void 0,void 0,void 0,n0),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),H0.setContext(s),H0.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function K(X){for(let n0=0;n0<X.removed.length;n0++){const M0=X.removed[n0],r0=S.indexOf(M0);r0>=0&&(S[r0]=null,v[r0].disconnect(M0))}for(let n0=0;n0<X.added.length;n0++){const M0=X.added[n0];let r0=S.indexOf(M0);if(r0===-1){for(let b0=0;b0<v.length;b0++)if(b0>=S.length){S.push(M0),r0=b0;break}else if(S[b0]===null){S[b0]=M0,r0=b0;break}if(r0===-1)break}const C0=v[r0];C0&&C0.connect(M0)}}const B=new R,Q=new R;function H(X,n0,M0){B.setFromMatrixPosition(n0.matrixWorld),Q.setFromMatrixPosition(M0.matrixWorld);const r0=B.distanceTo(Q),C0=n0.projectionMatrix.elements,b0=M0.projectionMatrix.elements,D0=C0[14]/(C0[10]-1),F0=C0[14]/(C0[10]+1),q=(C0[9]+1)/C0[5],C=(C0[9]-1)/C0[5],a0=(C0[8]-1)/C0[0],o0=(b0[8]+1)/b0[0],i0=D0*a0,c0=D0*o0,A0=r0/(-a0+o0),_0=A0*-a0;if(n0.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(_0),X.translateZ(A0),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),C0[10]===-1)X.projectionMatrix.copy(n0.projectionMatrix),X.projectionMatrixInverse.copy(n0.projectionMatrixInverse);else{const b=D0+A0,M=F0+A0,O=i0-_0,Z=c0+(r0-_0),$=q*F0/M*b,Y=C*F0/M*b;X.projectionMatrix.makePerspective(O,Z,$,Y,b,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function s0(X,n0){n0===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(n0.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let n0=X.near,M0=X.far;x.texture!==null&&(x.depthNear>0&&(n0=x.depthNear),x.depthFar>0&&(M0=x.depthFar)),_.near=D.near=w.near=n0,_.far=D.far=w.far=M0,(y!==_.near||F!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),y=_.near,F=_.far);const r0=X.parent,C0=_.cameras;s0(_,r0);for(let b0=0;b0<C0.length;b0++)s0(C0[b0],r0);C0.length===2?H(_,w,D):_.projectionMatrix.copy(w.projectionMatrix),u0(X,_,r0)};function u0(X,n0,M0){M0===null?X.matrix.copy(n0.matrixWorld):(X.matrix.copy(M0.matrixWorld),X.matrix.invert(),X.matrix.multiply(n0.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(n0.projectionMatrix),X.projectionMatrixInverse.copy(n0.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=vn*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(_)};let d0=null;function B0(X,n0){if(h=n0.getViewerPose(c||o),g=n0,h!==null){const M0=h.views;d!==null&&(e.setRenderTargetFramebuffer(T,d.framebuffer),e.setRenderTarget(T));let r0=!1;M0.length!==_.cameras.length&&(_.cameras.length=0,r0=!0);for(let b0=0;b0<M0.length;b0++){const D0=M0[b0];let F0=null;if(d!==null)F0=d.getViewport(D0);else{const C=u.getViewSubImage(f,D0);F0=C.viewport,b0===0&&(e.setRenderTargetTextures(T,C.colorTexture,f.ignoreDepthValues?void 0:C.depthStencilTexture),e.setRenderTarget(T))}let q=V[b0];q===void 0&&(q=new Xe,q.layers.enable(b0),q.viewport=new ge,V[b0]=q),q.matrix.fromArray(D0.transform.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale),q.projectionMatrix.fromArray(D0.projectionMatrix),q.projectionMatrixInverse.copy(q.projectionMatrix).invert(),q.viewport.set(F0.x,F0.y,F0.width,F0.height),b0===0&&(_.matrix.copy(q.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),r0===!0&&_.cameras.push(q)}const C0=s.enabledFeatures;if(C0&&C0.includes("depth-sensing")){const b0=u.getDepthInformation(M0[0]);b0&&b0.isValid&&b0.texture&&x.init(e,b0,s.renderState)}}for(let M0=0;M0<v.length;M0++){const r0=S[M0],C0=v[M0];r0!==null&&C0!==void 0&&C0.update(r0,n0,c||o)}d0&&d0(X,n0),n0.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:n0}),g=null}const H0=new S1;H0.setAnimationLoop(B0),this.setAnimationLoop=function(X){d0=X},this.dispose=function(){}}}const Ot=new Re,g4=new Y0;function _4(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,v1(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,T,v,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,S)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),x(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,T,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===1&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===1&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const T=e.get(m),v=T.envMap,S=T.envMapRotation;v&&(p.envMap.value=v,Ot.copy(S),Ot.x*=-1,Ot.y*=-1,Ot.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ot.y*=-1,Ot.z*=-1),p.envMapRotation.value.setFromMatrix4(g4.makeRotationFromEuler(Ot)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,T,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*T,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,T){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===1&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){const T=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function v4(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,v){const S=v.program;n.uniformBlockBinding(T,S)}function c(T,v){let S=s[T.id];S===void 0&&(g(T),S=h(T),s[T.id]=S,T.addEventListener("dispose",p));const P=v.program;n.updateUBOMapping(T,P);const A=e.render.frame;r[T.id]!==A&&(f(T),r[T.id]=A)}function h(T){const v=u();T.__bindingPointIndex=v;const S=i.createBuffer(),P=T.__size,A=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,P,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,S),S}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const v=s[T.id],S=T.uniforms,P=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let A=0,w=S.length;A<w;A++){const D=Array.isArray(S[A])?S[A]:[S[A]];for(let V=0,_=D.length;V<_;V++){const y=D[V];if(d(y,A,V,P)===!0){const F=y.__offset,I=Array.isArray(y.value)?y.value:[y.value];let z=0;for(let K=0;K<I.length;K++){const B=I[K],Q=x(B);typeof B=="number"||typeof B=="boolean"?(y.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,F+z,y.__data)):B.isMatrix3?(y.__data[0]=B.elements[0],y.__data[1]=B.elements[1],y.__data[2]=B.elements[2],y.__data[3]=0,y.__data[4]=B.elements[3],y.__data[5]=B.elements[4],y.__data[6]=B.elements[5],y.__data[7]=0,y.__data[8]=B.elements[6],y.__data[9]=B.elements[7],y.__data[10]=B.elements[8],y.__data[11]=0):(B.toArray(y.__data,z),z+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,y.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(T,v,S,P){const A=T.value,w=v+"_"+S;if(P[w]===void 0)return typeof A=="number"||typeof A=="boolean"?P[w]=A:P[w]=A.clone(),!0;{const D=P[w];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return P[w]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function g(T){const v=T.uniforms;let S=0;const P=16;for(let w=0,D=v.length;w<D;w++){const V=Array.isArray(v[w])?v[w]:[v[w]];for(let _=0,y=V.length;_<y;_++){const F=V[_],I=Array.isArray(F.value)?F.value:[F.value];for(let z=0,K=I.length;z<K;z++){const B=I[z],Q=x(B),H=S%P,s0=H%Q.boundary,u0=H+s0;S+=s0,u0!==0&&P-u0<Q.storage&&(S+=P-u0),F.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=Q.storage}}}const A=S%P;return A>0&&(S+=P-A),T.__size=S,T.__cache={},this}function x(T){const v={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(v.boundary=4,v.storage=4):T.isVector2?(v.boundary=8,v.storage=8):T.isVector3||T.isColor?(v.boundary=16,v.storage=12):T.isVector4?(v.boundary=16,v.storage=16):T.isMatrix3?(v.boundary=48,v.storage=48):T.isMatrix4?(v.boundary=64,v.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),v}function p(T){const v=T.target;v.removeEventListener("dispose",p);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(const T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}class x4{constructor(e={}){const{canvas:t=io(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const d=new Uint32Array(4),g=new Int32Array(4);let x=null,p=null;const m=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=je,this.toneMapping=0,this.toneMappingExposure=1;const v=this;let S=!1,P=0,A=0,w=null,D=-1,V=null;const _=new ge,y=new ge;let F=null;const I=new P0(0);let z=0,K=t.width,B=t.height,Q=1,H=null,s0=null;const u0=new ge(0,0,K,B),d0=new ge(0,0,K,B);let B0=!1;const H0=new Vs;let X=!1,n0=!1;const M0=new Y0,r0=new Y0,C0=new R,b0=new ge,D0={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let F0=!1;function q(){return w===null?Q:1}let C=n;function a0(E,U){return t.getContext(E,U)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Os}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",x0,!1),t.addEventListener("webglcontextcreationerror",g0,!1),C===null){const U="webgl2";if(C=a0(U,E),C===null)throw a0(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let o0,i0,c0,A0,_0,b,M,O,Z,$,Y,T0,h0,v0,k0,e0,m0,N0,I0,E0,W0,O0,j0,L;function p0(){o0=new E2(C),o0.init(),O0=new c4(C,o0),i0=new v2(C,o0,e,O0),c0=new o4(C),i0.reverseDepthBuffer&&c0.buffers.depth.setReversed(!0),A0=new w2(C),_0=new X3,b=new l4(C,o0,c0,_0,i0,O0,A0),M=new M2(v),O=new T2(v),Z=new Io(C),j0=new g2(C,Z),$=new A2(C,Z,A0,j0),Y=new R2(C,$,Z,A0),I0=new C2(C,i0,b),e0=new x2(_0),T0=new W3(v,M,O,o0,i0,j0,e0),h0=new _4(v,_0),v0=new Y3,k0=new Q3(o0),N0=new m2(v,M,O,c0,Y,f,l),m0=new s4(v,Y,i0),L=new v4(C,A0,i0,c0),E0=new _2(C,o0,A0),W0=new b2(C,o0,A0),A0.programs=T0.programs,v.capabilities=i0,v.extensions=o0,v.properties=_0,v.renderLists=v0,v.shadowMap=m0,v.state=c0,v.info=A0}p0();const W=new m4(v,C);this.xr=W,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const E=o0.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=o0.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(E){E!==void 0&&(Q=E,this.setSize(K,B,!1))},this.getSize=function(E){return E.set(K,B)},this.setSize=function(E,U,G=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=E,B=U,t.width=Math.floor(E*Q),t.height=Math.floor(U*Q),G===!0&&(t.style.width=E+"px",t.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(K*Q,B*Q).floor()},this.setDrawingBufferSize=function(E,U,G){K=E,B=U,Q=G,t.width=Math.floor(E*G),t.height=Math.floor(U*G),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(_)},this.getViewport=function(E){return E.copy(u0)},this.setViewport=function(E,U,G,k){E.isVector4?u0.set(E.x,E.y,E.z,E.w):u0.set(E,U,G,k),c0.viewport(_.copy(u0).multiplyScalar(Q).round())},this.getScissor=function(E){return E.copy(d0)},this.setScissor=function(E,U,G,k){E.isVector4?d0.set(E.x,E.y,E.z,E.w):d0.set(E,U,G,k),c0.scissor(y.copy(d0).multiplyScalar(Q).round())},this.getScissorTest=function(){return B0},this.setScissorTest=function(E){c0.setScissorTest(B0=E)},this.setOpaqueSort=function(E){H=E},this.setTransparentSort=function(E){s0=E},this.getClearColor=function(E){return E.copy(N0.getClearColor())},this.setClearColor=function(){N0.setClearColor.apply(N0,arguments)},this.getClearAlpha=function(){return N0.getClearAlpha()},this.setClearAlpha=function(){N0.setClearAlpha.apply(N0,arguments)},this.clear=function(E=!0,U=!0,G=!0){let k=0;if(E){let N=!1;if(w!==null){const l0=w.texture.format;N=l0===1033||l0===1031||l0===1029}if(N){const l0=w.texture.type,y0=l0===1009||l0===1014||l0===1012||l0===1020||l0===1017||l0===1018,w0=N0.getClearColor(),R0=N0.getClearAlpha(),z0=w0.r,V0=w0.g,L0=w0.b;y0?(d[0]=z0,d[1]=V0,d[2]=L0,d[3]=R0,C.clearBufferuiv(C.COLOR,0,d)):(g[0]=z0,g[1]=V0,g[2]=L0,g[3]=R0,C.clearBufferiv(C.COLOR,0,g))}else k|=C.COLOR_BUFFER_BIT}U&&(k|=C.DEPTH_BUFFER_BIT,C.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),G&&(k|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",x0,!1),t.removeEventListener("webglcontextcreationerror",g0,!1),v0.dispose(),k0.dispose(),_0.dispose(),M.dispose(),O.dispose(),Y.dispose(),j0.dispose(),L.dispose(),T0.dispose(),W.dispose(),W.removeEventListener("sessionstart",Cn),W.removeEventListener("sessionend",Rn),S0.stop()};function j(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function x0(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const E=A0.autoReset,U=m0.enabled,G=m0.autoUpdate,k=m0.needsUpdate,N=m0.type;p0(),A0.autoReset=E,m0.enabled=U,m0.autoUpdate=G,m0.needsUpdate=k,m0.type=N}function g0(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function G0(E){const U=E.target;U.removeEventListener("dispose",G0),de(U)}function de(E){be(E),_0.remove(E)}function be(E){const U=_0.get(E).programs;U!==void 0&&(U.forEach(function(G){T0.releaseProgram(G)}),E.isShaderMaterial&&T0.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,G,k,N,l0){U===null&&(U=D0);const y0=N.isMesh&&N.matrixWorld.determinant()<0,w0=Wi(E,U,G,k,N);c0.setMaterial(k,y0);let R0=G.index,z0=1;if(k.wireframe===!0){if(R0=$.getWireframeAttribute(G),R0===void 0)return;z0=2}const V0=G.drawRange,L0=G.attributes.position;let ne=V0.start*z0,le=(V0.start+V0.count)*z0;l0!==null&&(ne=Math.max(ne,l0.start*z0),le=Math.min(le,(l0.start+l0.count)*z0)),R0!==null?(ne=Math.max(ne,0),le=Math.min(le,R0.count)):L0!=null&&(ne=Math.max(ne,0),le=Math.min(le,L0.count));const pe=le-ne;if(pe<0||pe===1/0)return;j0.setup(N,k,w0,G,R0);let Ge,ee=E0;if(R0!==null&&(Ge=Z.get(R0),ee=W0,ee.setIndex(Ge)),N.isMesh)k.wireframe===!0?(c0.setLineWidth(k.wireframeLinewidth*q()),ee.setMode(C.LINES)):ee.setMode(C.TRIANGLES);else if(N.isLine){let U0=k.linewidth;U0===void 0&&(U0=1),c0.setLineWidth(U0*q()),N.isLineSegments?ee.setMode(C.LINES):N.isLineLoop?ee.setMode(C.LINE_LOOP):ee.setMode(C.LINE_STRIP)}else N.isPoints?ee.setMode(C.POINTS):N.isSprite&&ee.setMode(C.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ee.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(o0.get("WEBGL_multi_draw"))ee.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const U0=N._multiDrawStarts,Ce=N._multiDrawCounts,te=N._multiDrawCount,Je=R0?Z.get(R0).bytesPerElement:1,Kt=_0.get(k).currentProgram.getUniforms();for(let Ve=0;Ve<te;Ve++)Kt.setValue(C,"_gl_DrawID",Ve),ee.render(U0[Ve]/Je,Ce[Ve])}else if(N.isInstancedMesh)ee.renderInstances(ne,pe,N.count);else if(G.isInstancedBufferGeometry){const U0=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Ce=Math.min(G.instanceCount,U0);ee.renderInstances(ne,pe,Ce)}else ee.render(ne,pe)};function K0(E,U,G){E.transparent===!0&&E.side===2&&E.forceSinglePass===!1?(E.side=1,E.needsUpdate=!0,we(E,U,G),E.side=0,E.needsUpdate=!0,we(E,U,G),E.side=2):we(E,U,G)}this.compile=function(E,U,G=null){G===null&&(G=E),p=k0.get(G),p.init(U),T.push(p),G.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),E!==G&&E.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const k=new Set;return E.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const l0=N.material;if(l0)if(Array.isArray(l0))for(let y0=0;y0<l0.length;y0++){const w0=l0[y0];K0(w0,G,N),k.add(w0)}else K0(l0,G,N),k.add(l0)}),T.pop(),p=null,k},this.compileAsync=function(E,U,G=null){const k=this.compile(E,U,G);return new Promise(N=>{function l0(){if(k.forEach(function(y0){_0.get(y0).currentProgram.isReady()&&k.delete(y0)}),k.size===0){N(E);return}setTimeout(l0,10)}o0.get("KHR_parallel_shader_compile")!==null?l0():setTimeout(l0,10)})};let ce=null;function Ye(E){ce&&ce(E)}function Cn(){S0.stop()}function Rn(){S0.start()}const S0=new S1;S0.setAnimationLoop(Ye),typeof self<"u"&&S0.setContext(self),this.setAnimationLoop=function(E){ce=E,W.setAnimationLoop(E),E===null?S0.stop():S0.start()},W.addEventListener("sessionstart",Cn),W.addEventListener("sessionend",Rn),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(U),U=W.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,U,w),p=k0.get(E,T.length),p.init(U),T.push(p),r0.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),H0.setFromProjectionMatrix(r0),n0=this.localClippingEnabled,X=e0.init(this.clippingPlanes,n0),x=v0.get(E,m.length),x.init(),m.push(x),W.enabled===!0&&W.isPresenting===!0){const l0=v.xr.getDepthSensingMesh();l0!==null&&Z0(l0,U,-1/0,v.sortObjects)}Z0(E,U,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(H,s0),F0=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,F0&&N0.addToRenderList(x,E),this.info.render.frame++,X===!0&&e0.beginShadows();const G=p.state.shadowsArray;m0.render(G,E,U),X===!0&&e0.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=x.opaque,N=x.transmissive;if(p.setupLights(),U.isArrayCamera){const l0=U.cameras;if(N.length>0)for(let y0=0,w0=l0.length;y0<w0;y0++){const R0=l0[y0];he(k,N,E,R0)}F0&&N0.render(E);for(let y0=0,w0=l0.length;y0<w0;y0++){const R0=l0[y0];J0(x,E,R0,R0.viewport)}}else N.length>0&&he(k,N,E,U),F0&&N0.render(E),J0(x,E,U);w!==null&&(b.updateMultisampleRenderTarget(w),b.updateRenderTargetMipmap(w)),E.isScene===!0&&E.onAfterRender(v,E,U),j0.resetDefaultState(),D=-1,V=null,T.pop(),T.length>0?(p=T[T.length-1],X===!0&&e0.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?x=m[m.length-1]:x=null};function Z0(E,U,G,k){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)G=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||H0.intersectsSprite(E)){k&&b0.setFromMatrixPosition(E.matrixWorld).applyMatrix4(r0);const y0=Y.update(E),w0=E.material;w0.visible&&x.push(E,y0,w0,G,b0.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||H0.intersectsObject(E))){const y0=Y.update(E),w0=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),b0.copy(E.boundingSphere.center)):(y0.boundingSphere===null&&y0.computeBoundingSphere(),b0.copy(y0.boundingSphere.center)),b0.applyMatrix4(E.matrixWorld).applyMatrix4(r0)),Array.isArray(w0)){const R0=y0.groups;for(let z0=0,V0=R0.length;z0<V0;z0++){const L0=R0[z0],ne=w0[L0.materialIndex];ne&&ne.visible&&x.push(E,y0,ne,G,b0.z,L0)}}else w0.visible&&x.push(E,y0,w0,G,b0.z,null)}}const l0=E.children;for(let y0=0,w0=l0.length;y0<w0;y0++)Z0(l0[y0],U,G,k)}function J0(E,U,G,k){const N=E.opaque,l0=E.transmissive,y0=E.transparent;p.setupLightsView(G),X===!0&&e0.setGlobalState(v.clippingPlanes,G),k&&c0.viewport(_.copy(k)),N.length>0&&Se(N,U,G),l0.length>0&&Se(l0,U,G),y0.length>0&&Se(y0,U,G),c0.buffers.depth.setTest(!0),c0.buffers.depth.setMask(!0),c0.buffers.color.setMask(!0),c0.setPolygonOffset(!1)}function he(E,U,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new Be(1,1,{generateMipmaps:!0,type:o0.has("EXT_color_buffer_half_float")||o0.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Q0.workingColorSpace}));const l0=p.state.transmissionRenderTarget[k.id],y0=k.viewport||_;l0.setSize(y0.z,y0.w);const w0=v.getRenderTarget();v.setRenderTarget(l0),v.getClearColor(I),z=v.getClearAlpha(),z<1&&v.setClearColor(16777215,.5),v.clear(),F0&&N0.render(G);const R0=v.toneMapping;v.toneMapping=0;const z0=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),X===!0&&e0.setGlobalState(v.clippingPlanes,k),Se(E,G,k),b.updateMultisampleRenderTarget(l0),b.updateRenderTargetMipmap(l0),o0.has("WEBGL_multisampled_render_to_texture")===!1){let V0=!1;for(let L0=0,ne=U.length;L0<ne;L0++){const le=U[L0],pe=le.object,Ge=le.geometry,ee=le.material,U0=le.group;if(ee.side===2&&pe.layers.test(k.layers)){const Ce=ee.side;ee.side=1,ee.needsUpdate=!0,Fe(pe,G,k,Ge,ee,U0),ee.side=Ce,ee.needsUpdate=!0,V0=!0}}V0===!0&&(b.updateMultisampleRenderTarget(l0),b.updateRenderTargetMipmap(l0))}v.setRenderTarget(w0),v.setClearColor(I,z),z0!==void 0&&(k.viewport=z0),v.toneMapping=R0}function Se(E,U,G){const k=U.isScene===!0?U.overrideMaterial:null;for(let N=0,l0=E.length;N<l0;N++){const y0=E[N],w0=y0.object,R0=y0.geometry,z0=k===null?y0.material:k,V0=y0.group;w0.layers.test(G.layers)&&Fe(w0,U,G,R0,z0,V0)}}function Fe(E,U,G,k,N,l0){E.onBeforeRender(v,U,G,k,N,l0),E.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(v,U,G,k,E,l0),N.transparent===!0&&N.side===2&&N.forceSinglePass===!1?(N.side=1,N.needsUpdate=!0,v.renderBufferDirect(G,U,k,N,E,l0),N.side=0,N.needsUpdate=!0,v.renderBufferDirect(G,U,k,N,E,l0),N.side=2):v.renderBufferDirect(G,U,k,N,E,l0),E.onAfterRender(v,U,G,k,N,l0)}function we(E,U,G){U.isScene!==!0&&(U=D0);const k=_0.get(E),N=p.state.lights,l0=p.state.shadowsArray,y0=N.state.version,w0=T0.getParameters(E,N.state,l0,U,G),R0=T0.getProgramCacheKey(w0);let z0=k.programs;k.environment=E.isMeshStandardMaterial?U.environment:null,k.fog=U.fog,k.envMap=(E.isMeshStandardMaterial?O:M).get(E.envMap||k.environment),k.envMapRotation=k.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,z0===void 0&&(E.addEventListener("dispose",G0),z0=new Map,k.programs=z0);let V0=z0.get(R0);if(V0!==void 0){if(k.currentProgram===V0&&k.lightsStateVersion===y0)return lt(E,w0),V0}else w0.uniforms=T0.getUniforms(E),E.onBeforeCompile(w0,v),V0=T0.acquireProgram(w0,R0),z0.set(R0,V0),k.uniforms=w0.uniforms;const L0=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(L0.clippingPlanes=e0.uniform),lt(E,w0),k.needsLights=z1(E),k.lightsStateVersion=y0,k.needsLights&&(L0.ambientLightColor.value=N.state.ambient,L0.lightProbe.value=N.state.probe,L0.directionalLights.value=N.state.directional,L0.directionalLightShadows.value=N.state.directionalShadow,L0.spotLights.value=N.state.spot,L0.spotLightShadows.value=N.state.spotShadow,L0.rectAreaLights.value=N.state.rectArea,L0.ltc_1.value=N.state.rectAreaLTC1,L0.ltc_2.value=N.state.rectAreaLTC2,L0.pointLights.value=N.state.point,L0.pointLightShadows.value=N.state.pointShadow,L0.hemisphereLights.value=N.state.hemi,L0.directionalShadowMap.value=N.state.directionalShadowMap,L0.directionalShadowMatrix.value=N.state.directionalShadowMatrix,L0.spotShadowMap.value=N.state.spotShadowMap,L0.spotLightMatrix.value=N.state.spotLightMatrix,L0.spotLightMap.value=N.state.spotLightMap,L0.pointShadowMap.value=N.state.pointShadowMap,L0.pointShadowMatrix.value=N.state.pointShadowMatrix),k.currentProgram=V0,k.uniformsList=null,V0}function vt(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Pi.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function lt(E,U){const G=_0.get(E);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function Wi(E,U,G,k,N){U.isScene!==!0&&(U=D0),b.resetTextureUnits();const l0=U.fog,y0=k.isMeshStandardMaterial?U.environment:null,w0=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Dt,R0=(k.isMeshStandardMaterial?O:M).get(k.envMap||y0),z0=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,V0=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),L0=!!G.morphAttributes.position,ne=!!G.morphAttributes.normal,le=!!G.morphAttributes.color;let pe=0;k.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(pe=v.toneMapping);const Ge=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ee=Ge!==void 0?Ge.length:0,U0=_0.get(k),Ce=p.state.lights;if(X===!0&&(n0===!0||E!==V)){const Ze=E===V&&k.id===D;e0.setState(k,E,Ze)}let te=!1;k.version===U0.__version?(U0.needsLights&&U0.lightsStateVersion!==Ce.state.version||U0.outputColorSpace!==w0||N.isBatchedMesh&&U0.batching===!1||!N.isBatchedMesh&&U0.batching===!0||N.isBatchedMesh&&U0.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&U0.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&U0.instancing===!1||!N.isInstancedMesh&&U0.instancing===!0||N.isSkinnedMesh&&U0.skinning===!1||!N.isSkinnedMesh&&U0.skinning===!0||N.isInstancedMesh&&U0.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&U0.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&U0.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&U0.instancingMorph===!1&&N.morphTexture!==null||U0.envMap!==R0||k.fog===!0&&U0.fog!==l0||U0.numClippingPlanes!==void 0&&(U0.numClippingPlanes!==e0.numPlanes||U0.numIntersection!==e0.numIntersection)||U0.vertexAlphas!==z0||U0.vertexTangents!==V0||U0.morphTargets!==L0||U0.morphNormals!==ne||U0.morphColors!==le||U0.toneMapping!==pe||U0.morphTargetsCount!==ee)&&(te=!0):(te=!0,U0.__version=k.version);let Je=U0.currentProgram;te===!0&&(Je=we(k,U,N));let Kt=!1,Ve=!1,qi=!1;const _e=Je.getUniforms(),xt=U0.uniforms;if(c0.useProgram(Je.program)&&(Kt=!0,Ve=!0,qi=!0),k.id!==D&&(D=k.id,Ve=!0),Kt||V!==E){i0.reverseDepthBuffer?(M0.copy(E.projectionMatrix),ro(M0),oo(M0),_e.setValue(C,"projectionMatrix",M0)):_e.setValue(C,"projectionMatrix",E.projectionMatrix),_e.setValue(C,"viewMatrix",E.matrixWorldInverse);const Ze=_e.map.cameraPosition;Ze!==void 0&&Ze.setValue(C,C0.setFromMatrixPosition(E.matrixWorld)),i0.logarithmicDepthBuffer&&_e.setValue(C,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&_e.setValue(C,"isOrthographic",E.isOrthographicCamera===!0),V!==E&&(V=E,Ve=!0,qi=!0)}if(N.isSkinnedMesh){_e.setOptional(C,N,"bindMatrix"),_e.setOptional(C,N,"bindMatrixInverse");const Ze=N.skeleton;Ze&&(Ze.boneTexture===null&&Ze.computeBoneTexture(),_e.setValue(C,"boneTexture",Ze.boneTexture,b))}N.isBatchedMesh&&(_e.setOptional(C,N,"batchingTexture"),_e.setValue(C,"batchingTexture",N._matricesTexture,b),_e.setOptional(C,N,"batchingIdTexture"),_e.setValue(C,"batchingIdTexture",N._indirectTexture,b),_e.setOptional(C,N,"batchingColorTexture"),N._colorsTexture!==null&&_e.setValue(C,"batchingColorTexture",N._colorsTexture,b));const Yi=G.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&I0.update(N,G,Je),(Ve||U0.receiveShadow!==N.receiveShadow)&&(U0.receiveShadow=N.receiveShadow,_e.setValue(C,"receiveShadow",N.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(xt.envMap.value=R0,xt.flipEnvMap.value=R0.isCubeTexture&&R0.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&U.environment!==null&&(xt.envMapIntensity.value=U.environmentIntensity),Ve&&(_e.setValue(C,"toneMappingExposure",v.toneMappingExposure),U0.needsLights&&Xi(xt,qi),l0&&k.fog===!0&&h0.refreshFogUniforms(xt,l0),h0.refreshMaterialUniforms(xt,k,Q,B,p.state.transmissionRenderTarget[E.id]),Pi.upload(C,vt(U0),xt,b)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Pi.upload(C,vt(U0),xt,b),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&_e.setValue(C,"center",N.center),_e.setValue(C,"modelViewMatrix",N.modelViewMatrix),_e.setValue(C,"normalMatrix",N.normalMatrix),_e.setValue(C,"modelMatrix",N.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Ze=k.uniformsGroups;for(let Zi=0,G1=Ze.length;Zi<G1;Zi++){const Js=Ze[Zi];L.update(Js,Je),L.bind(Js,Je)}}return Je}function Xi(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function z1(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(E,U,G){_0.get(E.texture).__webglTexture=U,_0.get(E.depthTexture).__webglTexture=G;const k=_0.get(E);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=G===void 0,k.__autoAllocateDepthBuffer||o0.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,U){const G=_0.get(E);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,G=0){w=E,P=U,A=G;let k=!0,N=null,l0=!1,y0=!1;if(E){const R0=_0.get(E);if(R0.__useDefaultFramebuffer!==void 0)c0.bindFramebuffer(C.FRAMEBUFFER,null),k=!1;else if(R0.__webglFramebuffer===void 0)b.setupRenderTarget(E);else if(R0.__hasExternalTextures)b.rebindTextures(E,_0.get(E.texture).__webglTexture,_0.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const L0=E.depthTexture;if(R0.__boundDepthTexture!==L0){if(L0!==null&&_0.has(L0)&&(E.width!==L0.image.width||E.height!==L0.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(E)}}const z0=E.texture;(z0.isData3DTexture||z0.isDataArrayTexture||z0.isCompressedArrayTexture)&&(y0=!0);const V0=_0.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(V0[U])?N=V0[U][G]:N=V0[U],l0=!0):E.samples>0&&b.useMultisampledRTT(E)===!1?N=_0.get(E).__webglMultisampledFramebuffer:Array.isArray(V0)?N=V0[G]:N=V0,_.copy(E.viewport),y.copy(E.scissor),F=E.scissorTest}else _.copy(u0).multiplyScalar(Q).floor(),y.copy(d0).multiplyScalar(Q).floor(),F=B0;if(c0.bindFramebuffer(C.FRAMEBUFFER,N)&&k&&c0.drawBuffers(E,N),c0.viewport(_),c0.scissor(y),c0.setScissorTest(F),l0){const R0=_0.get(E.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+U,R0.__webglTexture,G)}else if(y0){const R0=_0.get(E.texture),z0=U||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,R0.__webglTexture,G||0,z0)}D=-1},this.readRenderTargetPixels=function(E,U,G,k,N,l0,y0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let w0=_0.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&y0!==void 0&&(w0=w0[y0]),w0){c0.bindFramebuffer(C.FRAMEBUFFER,w0);try{const R0=E.texture,z0=R0.format,V0=R0.type;if(!i0.textureFormatReadable(z0)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!i0.textureTypeReadable(V0)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-k&&G>=0&&G<=E.height-N&&C.readPixels(U,G,k,N,O0.convert(z0),O0.convert(V0),l0)}finally{const R0=w!==null?_0.get(w).__webglFramebuffer:null;c0.bindFramebuffer(C.FRAMEBUFFER,R0)}}},this.readRenderTargetPixelsAsync=async function(E,U,G,k,N,l0,y0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let w0=_0.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&y0!==void 0&&(w0=w0[y0]),w0){const R0=E.texture,z0=R0.format,V0=R0.type;if(!i0.textureFormatReadable(z0))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!i0.textureTypeReadable(V0))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=E.width-k&&G>=0&&G<=E.height-N){c0.bindFramebuffer(C.FRAMEBUFFER,w0);const L0=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,L0),C.bufferData(C.PIXEL_PACK_BUFFER,l0.byteLength,C.STREAM_READ),C.readPixels(U,G,k,N,O0.convert(z0),O0.convert(V0),0);const ne=w!==null?_0.get(w).__webglFramebuffer:null;c0.bindFramebuffer(C.FRAMEBUFFER,ne);const le=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await so(C,le,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,L0),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,l0),C.deleteBuffer(L0),C.deleteSync(le),l0}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,U=null,G=0){E.isTexture!==!0&&(Ri("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,E=arguments[1]);const k=Math.pow(2,-G),N=Math.floor(E.image.width*k),l0=Math.floor(E.image.height*k),y0=U!==null?U.x:0,w0=U!==null?U.y:0;b.setTexture2D(E,0),C.copyTexSubImage2D(C.TEXTURE_2D,G,0,0,y0,w0,N,l0),c0.unbindTexture()},this.copyTextureToTexture=function(E,U,G=null,k=null,N=0){E.isTexture!==!0&&(Ri("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,E=arguments[1],U=arguments[2],N=arguments[3]||0,G=null);let l0,y0,w0,R0,z0,V0;G!==null?(l0=G.max.x-G.min.x,y0=G.max.y-G.min.y,w0=G.min.x,R0=G.min.y):(l0=E.image.width,y0=E.image.height,w0=0,R0=0),k!==null?(z0=k.x,V0=k.y):(z0=0,V0=0);const L0=O0.convert(U.format),ne=O0.convert(U.type);b.setTexture2D(U,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);const le=C.getParameter(C.UNPACK_ROW_LENGTH),pe=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Ge=C.getParameter(C.UNPACK_SKIP_PIXELS),ee=C.getParameter(C.UNPACK_SKIP_ROWS),U0=C.getParameter(C.UNPACK_SKIP_IMAGES),Ce=E.isCompressedTexture?E.mipmaps[N]:E.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,Ce.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Ce.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,w0),C.pixelStorei(C.UNPACK_SKIP_ROWS,R0),E.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,N,z0,V0,l0,y0,L0,ne,Ce.data):E.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,N,z0,V0,Ce.width,Ce.height,L0,Ce.data):C.texSubImage2D(C.TEXTURE_2D,N,z0,V0,l0,y0,L0,ne,Ce),C.pixelStorei(C.UNPACK_ROW_LENGTH,le),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,pe),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ge),C.pixelStorei(C.UNPACK_SKIP_ROWS,ee),C.pixelStorei(C.UNPACK_SKIP_IMAGES,U0),N===0&&U.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),c0.unbindTexture()},this.copyTextureToTexture3D=function(E,U,G=null,k=null,N=0){E.isTexture!==!0&&(Ri("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,k=arguments[1]||null,E=arguments[2],U=arguments[3],N=arguments[4]||0);let l0,y0,w0,R0,z0,V0,L0,ne,le;const pe=E.isCompressedTexture?E.mipmaps[N]:E.image;G!==null?(l0=G.max.x-G.min.x,y0=G.max.y-G.min.y,w0=G.max.z-G.min.z,R0=G.min.x,z0=G.min.y,V0=G.min.z):(l0=pe.width,y0=pe.height,w0=pe.depth,R0=0,z0=0,V0=0),k!==null?(L0=k.x,ne=k.y,le=k.z):(L0=0,ne=0,le=0);const Ge=O0.convert(U.format),ee=O0.convert(U.type);let U0;if(U.isData3DTexture)b.setTexture3D(U,0),U0=C.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)b.setTexture2DArray(U,0),U0=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);const Ce=C.getParameter(C.UNPACK_ROW_LENGTH),te=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Je=C.getParameter(C.UNPACK_SKIP_PIXELS),Kt=C.getParameter(C.UNPACK_SKIP_ROWS),Ve=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,pe.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,pe.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,R0),C.pixelStorei(C.UNPACK_SKIP_ROWS,z0),C.pixelStorei(C.UNPACK_SKIP_IMAGES,V0),E.isDataTexture||E.isData3DTexture?C.texSubImage3D(U0,N,L0,ne,le,l0,y0,w0,Ge,ee,pe.data):U.isCompressedArrayTexture?C.compressedTexSubImage3D(U0,N,L0,ne,le,l0,y0,w0,Ge,pe.data):C.texSubImage3D(U0,N,L0,ne,le,l0,y0,w0,Ge,ee,pe),C.pixelStorei(C.UNPACK_ROW_LENGTH,Ce),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,te),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Je),C.pixelStorei(C.UNPACK_SKIP_ROWS,Kt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ve),N===0&&U.generateMipmaps&&C.generateMipmap(U0),c0.unbindTexture()},this.initRenderTarget=function(E){_0.get(E).__webglFramebuffer===void 0&&b.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?b.setTextureCube(E,0):E.isData3DTexture?b.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?b.setTexture2DArray(E,0):b.setTexture2D(E,0),c0.unbindTexture()},this.resetState=function(){P=0,A=0,w=null,c0.reset(),j0.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Bs?"display-p3":"srgb",t.unpackColorSpace=Q0.workingColorSpace===Ni?"display-p3":"srgb"}}class b1 extends Me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Re,this.environmentIntensity=1,this.environmentRotation=new Re,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Gt extends Ie{constructor(e=null,t=1,n=1,s,r,o,a,l,c=1003,h=1003,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kr extends ze{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const un=new Y0,Hr=new Y0,Mi=[],Wr=new Xt,M4=new Y0,Fn=new J,Nn=new $n;class Us extends J{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new kr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,M4)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,un),Wr.copy(e.boundingBox).applyMatrix4(un),this.boundingBox.union(Wr)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new $n),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,un),Nn.copy(e.boundingSphere).applyMatrix4(un),this.boundingSphere.union(Nn)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Fn.geometry=this.geometry,Fn.material=this.material,Fn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nn.copy(this.boundingSphere),Nn.applyMatrix4(n),e.ray.intersectsSphere(Nn)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,un),Hr.multiplyMatrices(n,un),Fn.matrixWorld=Hr,Fn.raycast(e,Mi);for(let o=0,a=Mi.length;o<a;o++){const l=Mi[o];l.instanceId=r,l.object=this,t.push(l)}Mi.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new kr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gt(new Float32Array(s*this.count),s,this.count,1028,1015));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class S4 extends Ie{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class at{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new t0:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new R,s=[],r=[],o=[],a=new R,l=new Y0;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new R)}r[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(xe(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(xe(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Xs extends at{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new t0){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class y4 extends Xs{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function qs(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const Si=new R,Ts=new qs,Es=new qs,As=new qs;class gn extends at{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new R){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Si.subVectors(s[0],s[1]).add(s[0]),c=Si);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Si.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Si),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),g<1e-4&&(g=x),p<1e-4&&(p=x),Ts.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,x,p),Es.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,x,p),As.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,x,p)}else this.curveType==="catmullrom"&&(Ts.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Es.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),As.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Ts.calc(l),Es.calc(l),As.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new R().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Xr(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function T4(i,e){const t=1-i;return t*t*e}function E4(i,e){return 2*(1-i)*i*e}function A4(i,e){return i*i*e}function kn(i,e,t,n){return T4(i,e)+E4(i,t)+A4(i,n)}function b4(i,e){const t=1-i;return t*t*t*e}function w4(i,e){const t=1-i;return 3*t*t*i*e}function C4(i,e){return 3*(1-i)*i*i*e}function R4(i,e){return i*i*i*e}function Hn(i,e,t,n,s){return b4(i,e)+w4(i,t)+C4(i,n)+R4(i,s)}class w1 extends at{constructor(e=new t0,t=new t0,n=new t0,s=new t0){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new t0){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hn(e,s.x,r.x,o.x,a.x),Hn(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class P4 extends at{constructor(e=new R,t=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new R){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hn(e,s.x,r.x,o.x,a.x),Hn(e,s.y,r.y,o.y,a.y),Hn(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class C1 extends at{constructor(e=new t0,t=new t0){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new t0){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new t0){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class D4 extends at{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class R1 extends at{constructor(e=new t0,t=new t0,n=new t0){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new t0){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(kn(e,s.x,r.x,o.x),kn(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class P1 extends at{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(kn(e,s.x,r.x,o.x),kn(e,s.y,r.y,o.y),kn(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class D1 extends at{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new t0){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Xr(a,l.x,c.x,h.x,u.x),Xr(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new t0().fromArray(s))}return this}}var Fi=Object.freeze({__proto__:null,ArcCurve:y4,CatmullRomCurve3:gn,CubicBezierCurve:w1,CubicBezierCurve3:P4,EllipseCurve:Xs,LineCurve:C1,LineCurve3:D4,QuadraticBezierCurve:R1,QuadraticBezierCurve3:P1,SplineCurve:D1});class L4 extends at{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Fi[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Fi[s.type]().fromJSON(s))}return this}}class qr extends L4{constructor(e){super(),this.type="Path",this.currentPoint=new t0,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new C1(this.currentPoint.clone(),new t0(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new R1(this.currentPoint.clone(),new t0(e,t),new t0(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new w1(this.currentPoint.clone(),new t0(e,t),new t0(n,s),new t0(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new D1(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){const c=new Xs(e,t,n,s,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Pt extends Pe{constructor(e=[new t0(0,-.5),new t0(.5,0),new t0(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=xe(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/t,u=new R,f=new t0,d=new R,g=new R,x=new R;let p=0,m=0;for(let T=0;T<=e.length-1;T++)switch(T){case 0:p=e[T+1].x-e[T].x,m=e[T+1].y-e[T].y,d.x=m*1,d.y=-p,d.z=m*0,x.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:p=e[T+1].x-e[T].x,m=e[T+1].y-e[T].y,d.x=m*1,d.y=-p,d.z=m*0,g.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),l.push(d.x,d.y,d.z),x.copy(g)}for(let T=0;T<=t;T++){const v=n+T*h*s,S=Math.sin(v),P=Math.cos(v);for(let A=0;A<=e.length-1;A++){u.x=e[A].x*S,u.y=e[A].y,u.z=e[A].x*P,o.push(u.x,u.y,u.z),f.x=T/t,f.y=A/(e.length-1),a.push(f.x,f.y);const w=l[3*A+0]*S,D=l[3*A+1],V=l[3*A+0]*P;c.push(w,D,V)}}for(let T=0;T<t;T++)for(let v=0;v<e.length-1;v++){const S=v+T*e.length,P=S,A=S+e.length,w=S+e.length+1,D=S+1;r.push(P,A,D),r.push(w,D,A)}this.setIndex(r),this.setAttribute("position",new ie(o,3)),this.setAttribute("uv",new ie(a,2)),this.setAttribute("normal",new ie(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pt(e.points,e.segments,e.phiStart,e.phiLength)}}class wn extends Pe{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new R,h=new t0;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const d=n+u/t*s;c.x=e*Math.cos(d),c.y=e*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ie(o,3)),this.setAttribute("normal",new ie(a,3)),this.setAttribute("uv",new ie(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ue extends Pe{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const x=[],p=n/2;let m=0;T(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ie(u,3)),this.setAttribute("normal",new ie(f,3)),this.setAttribute("uv",new ie(d,2));function T(){const S=new R,P=new R;let A=0;const w=(t-e)/n;for(let D=0;D<=r;D++){const V=[],_=D/r,y=_*(t-e)+e;for(let F=0;F<=s;F++){const I=F/s,z=I*l+a,K=Math.sin(z),B=Math.cos(z);P.x=y*K,P.y=-_*n+p,P.z=y*B,u.push(P.x,P.y,P.z),S.set(K,w,B).normalize(),f.push(S.x,S.y,S.z),d.push(I,1-_),V.push(g++)}x.push(V)}for(let D=0;D<s;D++)for(let V=0;V<r;V++){const _=x[V][D],y=x[V+1][D],F=x[V+1][D+1],I=x[V][D+1];e>0&&(h.push(_,y,I),A+=3),t>0&&(h.push(y,F,I),A+=3)}c.addGroup(m,A,0),m+=A}function v(S){const P=g,A=new t0,w=new R;let D=0;const V=S===!0?e:t,_=S===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,p*_,0),f.push(0,_,0),d.push(.5,.5),g++;const y=g;for(let F=0;F<=s;F++){const z=F/s*l+a,K=Math.cos(z),B=Math.sin(z);w.x=V*B,w.y=p*_,w.z=V*K,u.push(w.x,w.y,w.z),f.push(0,_,0),A.x=K*.5+.5,A.y=B*.5*_+.5,d.push(A.x,A.y),g++}for(let F=0;F<s;F++){const I=P+F,z=y+F;S===!0?h.push(z,z+1,I):h.push(z+1,z,I),D+=3}c.addGroup(m,D,S===!0?1:2),m+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ue(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ys extends Ue{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ys(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qn extends qr{constructor(e){super(e),this.uuid=Wt(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new qr().fromJSON(s))}return this}}const U4={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=L1(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,f,d;if(n&&(r=B4(i,e,r,t)),i.length>80*t){a=c=i[0],l=h=i[1];for(let g=t;g<s;g+=t)u=i[g],f=i[g+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-a,h-l),d=d!==0?32767/d:0}return Yn(r,o,t,a,l,d,0),o}};function L1(i,e,t,n,s){let r,o;if(s===K4(i,e,t,n)>0)for(r=e;r<t;r+=n)o=Yr(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=Yr(r,i[r],i[r+1],o);return o&&Bi(o,o.next)&&(Kn(o),o=o.next),o}function Ht(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Bi(t,t.next)||fe(t.prev,t,t.next)===0)){if(Kn(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Yn(i,e,t,n,s,r,o){if(!i)return;!o&&r&&H4(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?F4(i,n,s,r):I4(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),Kn(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=N4(Ht(i),e,t),Yn(i,e,t,n,s,r,2)):o===2&&O4(i,e,t,n,s,r):Yn(Ht(i),e,t,n,s,r,1);break}}}function I4(i){const e=i.prev,t=i,n=i.next;if(fe(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,f=s>r?s>o?s:o:r>o?r:o,d=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&pn(s,a,r,l,o,c,g.x,g.y)&&fe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function F4(i,e,t,n){const s=i.prev,r=i,o=i.next;if(fe(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,g=h<u?h<f?h:f:u<f?u:f,x=a>l?a>c?a:c:l>c?l:c,p=h>u?h>f?h:f:u>f?u:f,m=Is(d,g,e,t,n),T=Is(x,p,e,t,n);let v=i.prevZ,S=i.nextZ;for(;v&&v.z>=m&&S&&S.z<=T;){if(v.x>=d&&v.x<=x&&v.y>=g&&v.y<=p&&v!==s&&v!==o&&pn(a,h,l,u,c,f,v.x,v.y)&&fe(v.prev,v,v.next)>=0||(v=v.prevZ,S.x>=d&&S.x<=x&&S.y>=g&&S.y<=p&&S!==s&&S!==o&&pn(a,h,l,u,c,f,S.x,S.y)&&fe(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;v&&v.z>=m;){if(v.x>=d&&v.x<=x&&v.y>=g&&v.y<=p&&v!==s&&v!==o&&pn(a,h,l,u,c,f,v.x,v.y)&&fe(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;S&&S.z<=T;){if(S.x>=d&&S.x<=x&&S.y>=g&&S.y<=p&&S!==s&&S!==o&&pn(a,h,l,u,c,f,S.x,S.y)&&fe(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function N4(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!Bi(s,r)&&U1(s,n,n.next,r)&&Zn(s,r)&&Zn(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Kn(n),Kn(n.next),n=i=r),n=n.next}while(n!==i);return Ht(n)}function O4(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&q4(o,a)){let l=I1(o,a);o=Ht(o,o.next),l=Ht(l,l.next),Yn(o,e,t,n,s,r,0),Yn(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function B4(i,e,t,n){const s=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=L1(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(X4(c));for(s.sort(z4),r=0;r<s.length;r++)t=G4(s[r],t);return t}function z4(i,e){return i.x-e.x}function G4(i,e){const t=V4(i,e);if(!t)return e;const n=I1(t,i);return Ht(n,n.next),Ht(t,t.next)}function V4(i,e){let t=e,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const f=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=r&&f>n&&(n=f,s=t.x<t.next.x?t:t.next,f===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,l=s.x,c=s.y;let h=1/0,u;t=s;do r>=t.x&&t.x>=l&&r!==t.x&&pn(o<c?r:n,o,l,c,o<c?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),Zn(t,i)&&(u<h||u===h&&(t.x>s.x||t.x===s.x&&k4(s,t)))&&(s=t,h=u)),t=t.next;while(t!==a);return s}function k4(i,e){return fe(i.prev,i,e.prev)<0&&fe(e.next,i,i.next)<0}function H4(i,e,t,n){let s=i;do s.z===0&&(s.z=Is(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,W4(s)}function W4(i){let e,t,n,s,r,o,a,l,c=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,c*=2}while(o>1);return i}function Is(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function X4(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function pn(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function q4(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Y4(i,e)&&(Zn(i,e)&&Zn(e,i)&&Z4(i,e)&&(fe(i.prev,i,e.prev)||fe(i,e.prev,e))||Bi(i,e)&&fe(i.prev,i,i.next)>0&&fe(e.prev,e,e.next)>0)}function fe(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Bi(i,e){return i.x===e.x&&i.y===e.y}function U1(i,e,t,n){const s=Ti(fe(i,e,t)),r=Ti(fe(i,e,n)),o=Ti(fe(t,n,i)),a=Ti(fe(t,n,e));return!!(s!==r&&o!==a||s===0&&yi(i,t,e)||r===0&&yi(i,n,e)||o===0&&yi(t,i,n)||a===0&&yi(t,e,n))}function yi(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ti(i){return i>0?1:i<0?-1:0}function Y4(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&U1(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Zn(i,e){return fe(i.prev,i,i.next)<0?fe(i,e,i.next)>=0&&fe(i,i.prev,e)>=0:fe(i,e,i.prev)<0||fe(i,i.next,e)<0}function Z4(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function I1(i,e){const t=new Fs(i.i,i.x,i.y),n=new Fs(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Yr(i,e,t,n){const s=new Fs(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Kn(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Fs(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function K4(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Wn{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Wn.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Zr(e),Kr(n,e);let o=e.length;t.forEach(Zr);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Kr(n,t[l]);const a=U4.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Zr(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Kr(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Mn extends Pe{constructor(e=new qn([new t0(.5,.5),new t0(-.5,.5),new t0(-.5,-.5),new t0(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new ie(s,3)),this.setAttribute("uv",new ie(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:$4;let v,S=!1,P,A,w,D;m&&(v=m.getSpacedPoints(h),S=!0,f=!1,P=m.computeFrenetFrames(h,!1),A=new R,w=new R,D=new R),f||(p=0,d=0,g=0,x=0);const V=a.extractPoints(c);let _=V.shape;const y=V.holes;if(!Wn.isClockWise(_)){_=_.reverse();for(let q=0,C=y.length;q<C;q++){const a0=y[q];Wn.isClockWise(a0)&&(y[q]=a0.reverse())}}const I=Wn.triangulateShape(_,y),z=_;for(let q=0,C=y.length;q<C;q++){const a0=y[q];_=_.concat(a0)}function K(q,C,a0){return C||console.error("THREE.ExtrudeGeometry: vec does not exist"),q.clone().addScaledVector(C,a0)}const B=_.length,Q=I.length;function H(q,C,a0){let o0,i0,c0;const A0=q.x-C.x,_0=q.y-C.y,b=a0.x-q.x,M=a0.y-q.y,O=A0*A0+_0*_0,Z=A0*M-_0*b;if(Math.abs(Z)>Number.EPSILON){const $=Math.sqrt(O),Y=Math.sqrt(b*b+M*M),T0=C.x-_0/$,h0=C.y+A0/$,v0=a0.x-M/Y,k0=a0.y+b/Y,e0=((v0-T0)*M-(k0-h0)*b)/(A0*M-_0*b);o0=T0+A0*e0-q.x,i0=h0+_0*e0-q.y;const m0=o0*o0+i0*i0;if(m0<=2)return new t0(o0,i0);c0=Math.sqrt(m0/2)}else{let $=!1;A0>Number.EPSILON?b>Number.EPSILON&&($=!0):A0<-Number.EPSILON?b<-Number.EPSILON&&($=!0):Math.sign(_0)===Math.sign(M)&&($=!0),$?(o0=-_0,i0=A0,c0=Math.sqrt(O)):(o0=A0,i0=_0,c0=Math.sqrt(O/2))}return new t0(o0/c0,i0/c0)}const s0=[];for(let q=0,C=z.length,a0=C-1,o0=q+1;q<C;q++,a0++,o0++)a0===C&&(a0=0),o0===C&&(o0=0),s0[q]=H(z[q],z[a0],z[o0]);const u0=[];let d0,B0=s0.concat();for(let q=0,C=y.length;q<C;q++){const a0=y[q];d0=[];for(let o0=0,i0=a0.length,c0=i0-1,A0=o0+1;o0<i0;o0++,c0++,A0++)c0===i0&&(c0=0),A0===i0&&(A0=0),d0[o0]=H(a0[o0],a0[c0],a0[A0]);u0.push(d0),B0=B0.concat(d0)}for(let q=0;q<p;q++){const C=q/p,a0=d*Math.cos(C*Math.PI/2),o0=g*Math.sin(C*Math.PI/2)+x;for(let i0=0,c0=z.length;i0<c0;i0++){const A0=K(z[i0],s0[i0],o0);r0(A0.x,A0.y,-a0)}for(let i0=0,c0=y.length;i0<c0;i0++){const A0=y[i0];d0=u0[i0];for(let _0=0,b=A0.length;_0<b;_0++){const M=K(A0[_0],d0[_0],o0);r0(M.x,M.y,-a0)}}}const H0=g+x;for(let q=0;q<B;q++){const C=f?K(_[q],B0[q],H0):_[q];S?(w.copy(P.normals[0]).multiplyScalar(C.x),A.copy(P.binormals[0]).multiplyScalar(C.y),D.copy(v[0]).add(w).add(A),r0(D.x,D.y,D.z)):r0(C.x,C.y,0)}for(let q=1;q<=h;q++)for(let C=0;C<B;C++){const a0=f?K(_[C],B0[C],H0):_[C];S?(w.copy(P.normals[q]).multiplyScalar(a0.x),A.copy(P.binormals[q]).multiplyScalar(a0.y),D.copy(v[q]).add(w).add(A),r0(D.x,D.y,D.z)):r0(a0.x,a0.y,u/h*q)}for(let q=p-1;q>=0;q--){const C=q/p,a0=d*Math.cos(C*Math.PI/2),o0=g*Math.sin(C*Math.PI/2)+x;for(let i0=0,c0=z.length;i0<c0;i0++){const A0=K(z[i0],s0[i0],o0);r0(A0.x,A0.y,u+a0)}for(let i0=0,c0=y.length;i0<c0;i0++){const A0=y[i0];d0=u0[i0];for(let _0=0,b=A0.length;_0<b;_0++){const M=K(A0[_0],d0[_0],o0);S?r0(M.x,M.y+v[h-1].y,v[h-1].x+a0):r0(M.x,M.y,u+a0)}}}X(),n0();function X(){const q=s.length/3;if(f){let C=0,a0=B*C;for(let o0=0;o0<Q;o0++){const i0=I[o0];C0(i0[2]+a0,i0[1]+a0,i0[0]+a0)}C=h+p*2,a0=B*C;for(let o0=0;o0<Q;o0++){const i0=I[o0];C0(i0[0]+a0,i0[1]+a0,i0[2]+a0)}}else{for(let C=0;C<Q;C++){const a0=I[C];C0(a0[2],a0[1],a0[0])}for(let C=0;C<Q;C++){const a0=I[C];C0(a0[0]+B*h,a0[1]+B*h,a0[2]+B*h)}}n.addGroup(q,s.length/3-q,0)}function n0(){const q=s.length/3;let C=0;M0(z,C),C+=z.length;for(let a0=0,o0=y.length;a0<o0;a0++){const i0=y[a0];M0(i0,C),C+=i0.length}n.addGroup(q,s.length/3-q,1)}function M0(q,C){let a0=q.length;for(;--a0>=0;){const o0=a0;let i0=a0-1;i0<0&&(i0=q.length-1);for(let c0=0,A0=h+p*2;c0<A0;c0++){const _0=B*c0,b=B*(c0+1),M=C+o0+_0,O=C+i0+_0,Z=C+i0+b,$=C+o0+b;b0(M,O,Z,$)}}}function r0(q,C,a0){l.push(q),l.push(C),l.push(a0)}function C0(q,C,a0){D0(q),D0(C),D0(a0);const o0=s.length/3,i0=T.generateTopUV(n,s,o0-3,o0-2,o0-1);F0(i0[0]),F0(i0[1]),F0(i0[2])}function b0(q,C,a0,o0){D0(q),D0(C),D0(o0),D0(C),D0(a0),D0(o0);const i0=s.length/3,c0=T.generateSideWallUV(n,s,i0-6,i0-3,i0-2,i0-1);F0(c0[0]),F0(c0[1]),F0(c0[3]),F0(c0[1]),F0(c0[2]),F0(c0[3])}function D0(q){s.push(l[q*3+0]),s.push(l[q*3+1]),s.push(l[q*3+2])}function F0(q){r.push(q.x),r.push(q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return j4(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Fi[s.type]().fromJSON(s)),new Mn(n,e.options)}}const $4={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new t0(r,o),new t0(a,l),new t0(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[s*3],d=e[s*3+1],g=e[s*3+2],x=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new t0(o,1-l),new t0(c,1-u),new t0(f,1-g),new t0(x,1-m)]:[new t0(a,1-l),new t0(h,1-u),new t0(d,1-g),new t0(p,1-m)]}};function j4(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Vt extends Pe{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new R,f=new R,d=[],g=[],x=[],p=[];for(let m=0;m<=n;m++){const T=[],v=m/n;let S=0;m===0&&o===0?S=.5/t:m===n&&l===Math.PI&&(S=-.5/t);for(let P=0;P<=t;P++){const A=P/t;u.x=-e*Math.cos(s+A*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(s+A*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),p.push(A+S,1-v),T.push(c++)}h.push(T)}for(let m=0;m<n;m++)for(let T=0;T<t;T++){const v=h[m][T+1],S=h[m][T],P=h[m+1][T],A=h[m+1][T+1];(m!==0||o>0)&&d.push(v,S,A),(m!==n-1||l<Math.PI)&&d.push(S,P,A)}this.setIndex(d),this.setAttribute("position",new ie(g,3)),this.setAttribute("normal",new ie(x,3)),this.setAttribute("uv",new ie(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Zs extends Pe{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new R,u=new R,f=new R;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const x=g/s*r,p=d/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(x),u.y=(e+t*Math.cos(p))*Math.sin(x),u.z=t*Math.sin(p),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const x=(s+1)*d+g-1,p=(s+1)*(d-1)+g-1,m=(s+1)*(d-1)+g,T=(s+1)*d+g;o.push(x,p,T),o.push(p,m,T)}this.setIndex(o),this.setAttribute("position",new ie(a,3)),this.setAttribute("normal",new ie(l,3)),this.setAttribute("uv",new ie(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class zi extends Pe{constructor(e=new P1(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new R,l=new R,c=new t0;let h=new R;const u=[],f=[],d=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new ie(u,3)),this.setAttribute("normal",new ie(f,3)),this.setAttribute("uv",new ie(d,2));function x(){for(let v=0;v<t;v++)p(v);p(r===!1?t:0),T(),m()}function p(v){h=e.getPointAt(v/t,h);const S=o.normals[v],P=o.binormals[v];for(let A=0;A<=s;A++){const w=A/s*Math.PI*2,D=Math.sin(w),V=-Math.cos(w);l.x=V*S.x+D*P.x,l.y=V*S.y+D*P.y,l.z=V*S.z+D*P.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function m(){for(let v=1;v<=t;v++)for(let S=1;S<=s;S++){const P=(s+1)*(v-1)+(S-1),A=(s+1)*v+(S-1),w=(s+1)*v+S,D=(s+1)*(v-1)+S;g.push(P,A,D),g.push(A,w,D)}}function T(){for(let v=0;v<=t;v++)for(let S=0;S<=s;S++)c.x=v/t,c.y=S/s,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new zi(new Fi[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class J4 extends ue{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class me extends An{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new P0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new P0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new t0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Re,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class jn extends me{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new t0(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new P0(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new P0(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new P0(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Q4 extends An{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new t0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Gi extends Me{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new P0(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class e5 extends Gi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new P0(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const bs=new Y0,$r=new R,jr=new R;class F1{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new t0(512,512),this.map=null,this.mapPass=null,this.matrix=new Y0,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vs,this._frameExtents=new t0(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;$r.setFromMatrixPosition(e.matrixWorld),t.position.copy($r),jr.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jr),t.updateMatrixWorld(),bs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bs),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(bs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class t5 extends F1{constructor(){super(new Xe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=vn*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class n5 extends Gi{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new t5}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class i5 extends F1{constructor(){super(new ks(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class s5 extends Gi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.shadow=new i5}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Jr extends Gi{constructor(e,t,n=10,s=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=s}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class N1{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Qr(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Qr();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Qr(){return performance.now()}const e1=new Y0;class r5{constructor(e,t,n=0,s=1/0){this.ray=new p1(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Gs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return e1.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(e1),this}intersectObject(e,t=!0,n=[]){return Ns(e,this,n,t),n.sort(t1),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Ns(e[s],this,n,t);return n.sort(t1),n}}function t1(i,e){return i.distance-e.distance}function Ns(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Ns(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Os}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Os);const Xn={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Yt{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const o5=new ks(-1,1,1,-1,0,1);class a5 extends Pe{constructor(){super(),this.setAttribute("position",new ie([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ie([0,2,0,0,2,0],2))}}const l5=new a5;class Vi{constructor(e){this._mesh=new J(l5,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,o5)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class c5 extends Yt{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof ue?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ot.clone(e.uniforms),this.material=new ue({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Vi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class n1 extends Yt{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class h5 extends Yt{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class u5{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new t0);this._width=n.width,this._height=n.height,t=new Be(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:1016}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new c5(Xn),this.copyPass.material.blending=0,this.clock=new N1}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}n1!==void 0&&(o instanceof n1?n=!0:o instanceof h5&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new t0);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class f5 extends Yt{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new P0}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const Ei={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new t0},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Y0},cameraProjectionMatrixInverse:{value:new Y0},cameraWorldMatrix:{value:new Y0},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new R(-1,-1,-1)},sceneBoxMax:{value:new R(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Ai={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ws={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function d5(i=5){const e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=p5(e),n=t.length,s=new Uint8Array(n*4);for(let o=0;o<n;++o){const a=t[o],l=2*Math.PI*a/n,c=new R(Math.cos(l),Math.sin(l),0).normalize();s[o*4]=(c.x*.5+.5)*255,s[o*4+1]=(c.y*.5+.5)*255,s[o*4+2]=127,s[o*4+3]=255}const r=new Gt(s,e,e);return r.wrapS=1e3,r.wrapT=1e3,r.needsUpdate=!0,r}function p5(i){const e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=e*e,n=Array(t).fill(0);let s=Math.floor(e/2),r=e-1;for(let o=1;o<=t;){if(s===-1&&r===e?(r=e-2,s=0):(r===e&&(r=0),s<0&&(s=e-1)),n[s*e+r]!==0){r-=2,s++;continue}else n[s*e+r]=o++;r++,s--}return n}const bi={defines:{SAMPLES:16,SAMPLE_VECTORS:O1(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new t0},cameraProjectionMatrixInverse:{value:new Y0},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function O1(i,e,t){const n=m5(i,e,t);let s="vec3[SAMPLES](";for(let r=0;r<i;r++){const o=n[r];s+=`vec3(${o.x}, ${o.y}, ${o.z})${r<i-1?",":")"}`}return s}function m5(i,e,t){const n=[];for(let s=0;s<i;s++){const r=2*Math.PI*e*s/i,o=Math.pow(s/(i-1),t);n.push(new R(Math.cos(r),Math.sin(r),o))}return n}class g5{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,n){return e[0]*t+e[1]*n}dot3(e,t,n,s){return e[0]*t+e[1]*n+e[2]*s}dot4(e,t,n,s,r){return e[0]*t+e[1]*n+e[2]*s+e[3]*r}noise(e,t){let n,s,r;const o=.5*(Math.sqrt(3)-1),a=(e+t)*o,l=Math.floor(e+a),c=Math.floor(t+a),h=(3-Math.sqrt(3))/6,u=(l+c)*h,f=l-u,d=c-u,g=e-f,x=t-d;let p,m;g>x?(p=1,m=0):(p=0,m=1);const T=g-p+h,v=x-m+h,S=g-1+2*h,P=x-1+2*h,A=l&255,w=c&255,D=this.perm[A+this.perm[w]]%12,V=this.perm[A+p+this.perm[w+m]]%12,_=this.perm[A+1+this.perm[w+1]]%12;let y=.5-g*g-x*x;y<0?n=0:(y*=y,n=y*y*this.dot(this.grad3[D],g,x));let F=.5-T*T-v*v;F<0?s=0:(F*=F,s=F*F*this.dot(this.grad3[V],T,v));let I=.5-S*S-P*P;return I<0?r=0:(I*=I,r=I*I*this.dot(this.grad3[_],S,P)),70*(n+s+r)}noise3d(e,t,n){let s,r,o,a;const c=(e+t+n)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),f=Math.floor(n+c),d=1/6,g=(h+u+f)*d,x=h-g,p=u-g,m=f-g,T=e-x,v=t-p,S=n-m;let P,A,w,D,V,_;T>=v?v>=S?(P=1,A=0,w=0,D=1,V=1,_=0):T>=S?(P=1,A=0,w=0,D=1,V=0,_=1):(P=0,A=0,w=1,D=1,V=0,_=1):v<S?(P=0,A=0,w=1,D=0,V=1,_=1):T<S?(P=0,A=1,w=0,D=0,V=1,_=1):(P=0,A=1,w=0,D=1,V=1,_=0);const y=T-P+d,F=v-A+d,I=S-w+d,z=T-D+2*d,K=v-V+2*d,B=S-_+2*d,Q=T-1+3*d,H=v-1+3*d,s0=S-1+3*d,u0=h&255,d0=u&255,B0=f&255,H0=this.perm[u0+this.perm[d0+this.perm[B0]]]%12,X=this.perm[u0+P+this.perm[d0+A+this.perm[B0+w]]]%12,n0=this.perm[u0+D+this.perm[d0+V+this.perm[B0+_]]]%12,M0=this.perm[u0+1+this.perm[d0+1+this.perm[B0+1]]]%12;let r0=.6-T*T-v*v-S*S;r0<0?s=0:(r0*=r0,s=r0*r0*this.dot3(this.grad3[H0],T,v,S));let C0=.6-y*y-F*F-I*I;C0<0?r=0:(C0*=C0,r=C0*C0*this.dot3(this.grad3[X],y,F,I));let b0=.6-z*z-K*K-B*B;b0<0?o=0:(b0*=b0,o=b0*b0*this.dot3(this.grad3[n0],z,K,B));let D0=.6-Q*Q-H*H-s0*s0;return D0<0?a=0:(D0*=D0,a=D0*D0*this.dot3(this.grad3[M0],Q,H,s0)),32*(s+r+o+a)}noise4d(e,t,n,s){const r=this.grad4,o=this.simplex,a=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,u,f,d,g;const x=(e+t+n+s)*l,p=Math.floor(e+x),m=Math.floor(t+x),T=Math.floor(n+x),v=Math.floor(s+x),S=(p+m+T+v)*c,P=p-S,A=m-S,w=T-S,D=v-S,V=e-P,_=t-A,y=n-w,F=s-D,I=V>_?32:0,z=V>y?16:0,K=_>y?8:0,B=V>F?4:0,Q=_>F?2:0,H=y>F?1:0,s0=I+z+K+B+Q+H,u0=o[s0][0]>=3?1:0,d0=o[s0][1]>=3?1:0,B0=o[s0][2]>=3?1:0,H0=o[s0][3]>=3?1:0,X=o[s0][0]>=2?1:0,n0=o[s0][1]>=2?1:0,M0=o[s0][2]>=2?1:0,r0=o[s0][3]>=2?1:0,C0=o[s0][0]>=1?1:0,b0=o[s0][1]>=1?1:0,D0=o[s0][2]>=1?1:0,F0=o[s0][3]>=1?1:0,q=V-u0+c,C=_-d0+c,a0=y-B0+c,o0=F-H0+c,i0=V-X+2*c,c0=_-n0+2*c,A0=y-M0+2*c,_0=F-r0+2*c,b=V-C0+3*c,M=_-b0+3*c,O=y-D0+3*c,Z=F-F0+3*c,$=V-1+4*c,Y=_-1+4*c,T0=y-1+4*c,h0=F-1+4*c,v0=p&255,k0=m&255,e0=T&255,m0=v&255,N0=a[v0+a[k0+a[e0+a[m0]]]]%32,I0=a[v0+u0+a[k0+d0+a[e0+B0+a[m0+H0]]]]%32,E0=a[v0+X+a[k0+n0+a[e0+M0+a[m0+r0]]]]%32,W0=a[v0+C0+a[k0+b0+a[e0+D0+a[m0+F0]]]]%32,O0=a[v0+1+a[k0+1+a[e0+1+a[m0+1]]]]%32;let j0=.6-V*V-_*_-y*y-F*F;j0<0?h=0:(j0*=j0,h=j0*j0*this.dot4(r[N0],V,_,y,F));let L=.6-q*q-C*C-a0*a0-o0*o0;L<0?u=0:(L*=L,u=L*L*this.dot4(r[I0],q,C,a0,o0));let p0=.6-i0*i0-c0*c0-A0*A0-_0*_0;p0<0?f=0:(p0*=p0,f=p0*p0*this.dot4(r[E0],i0,c0,A0,_0));let W=.6-b*b-M*M-O*O-Z*Z;W<0?d=0:(W*=W,d=W*W*this.dot4(r[W0],b,M,O,Z));let j=.6-$*$-Y*Y-T0*T0-h0*h0;return j<0?g=0:(j*=j,g=j*j*this.dot4(r[O0],$,Y,T0,h0)),27*(h+u+f+d+g)}}class st extends Yt{constructor(e,t,n,s,r,o,a){super(),this.width=n!==void 0?n:512,this.height=s!==void 0?s:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=d5(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Be(this.width,this.height,{type:1016}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new ue({defines:Object.assign({},Ei.defines),uniforms:ot.clone(Ei.uniforms),vertexShader:Ei.vertexShader,fragmentShader:Ei.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Q4,this.normalMaterial.blending=0,this.pdMaterial=new ue({defines:Object.assign({},bi.defines),uniforms:ot.clone(bi.uniforms),vertexShader:bi.vertexShader,fragmentShader:bi.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new ue({defines:Object.assign({},Ai.defines),uniforms:ot.clone(Ai.uniforms),vertexShader:Ai.vertexShader,fragmentShader:Ai.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ue({uniforms:ot.clone(Xn.uniforms),vertexShader:Xn.vertexShader,fragmentShader:Xn.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new ue({uniforms:ot.clone(ws.uniforms),vertexShader:ws.vertexShader,fragmentShader:ws.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.fsQuad=new Vi(null),this.originalClearColor=new P0,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),a!==void 0&&this.updatePdMaterial(a)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new Ws,this.depthTexture.format=1027,this.depthTexture.type=1020,this.normalRenderTarget=new Be(this.width,this.height,{minFilter:1003,magFilter:1003,type:1016,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=O1(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case st.OUTPUT.Off:break;case st.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=0,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case st.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case st.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case st.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case st.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case st.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=0,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,n,s,r){e.getClearColor(this.originalClearColor);const o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}renderOverride(e,t,n,s,r){e.getClearColor(this.originalClearColor);const o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this.originalClearColor),e.setClearAlpha(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){t.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){const s=t.get(n);n.visible=s}),t.clear()}generateNoise(e=64){const t=new g5,n=e*e*4,s=new Uint8Array(n);for(let o=0;o<e;o++)for(let a=0;a<e;a++){const l=o,c=a;s[(o*e+a)*4]=(t.noise(l,c)*.5+.5)*255,s[(o*e+a)*4+1]=(t.noise(l+e,c)*.5+.5)*255,s[(o*e+a)*4+2]=(t.noise(l,c+e)*.5+.5)*255,s[(o*e+a)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}const r=new Gt(s,e,e,1023,1009);return r.wrapS=1e3,r.wrapT=1e3,r.needsUpdate=!0,r}}st.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const _5={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new P0(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Sn extends Yt{constructor(e,t,n,s){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new t0(e.x,e.y):new t0(256,256),this.clearColor=new P0(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Be(r,o,{type:1016}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new Be(r,o,{type:1016});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const d=new Be(r,o,{type:1016});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),o=Math.round(o/2)}const a=_5;this.highPassUniforms=ot.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ue({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new t0(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Xn;this.copyUniforms=ot.clone(h.uniforms),this.blendMaterial=new ue({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new P0,this.oldClearAlpha=1,this.basic=new mt,this.fsQuad=new Vi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new t0(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Sn.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Sn.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new ue({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new t0(.5,.5)},direction:{value:new t0(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new ue({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Sn.BlurDirectionX=new t0(1,0);Sn.BlurDirectionY=new t0(0,1);const v5={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class x5 extends Yt{constructor(){super();const e=v5;this.uniforms=ot.clone(e.uniforms),this.material=new J4({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Vi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Q0.getTransfer(this._outputColorSpace)===re&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===7&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class yn{static init(){const e=[1,0,0,2e-5,1,0,0,503905e-9,1,0,0,.00201562,1,0,0,.00453516,1,0,0,.00806253,1,0,0,.0125978,1,0,0,.018141,1,0,0,.0246924,1,0,0,.0322525,1,0,0,.0408213,1,0,0,.0503999,1,0,0,.0609894,1,0,0,.0725906,1,0,0,.0852058,1,0,0,.0988363,1,0,0,.113484,1,0,0,.129153,1,0,0,.145839,1,0,0,.163548,1,0,0,.182266,1,0,0,.201942,1,0,0,.222314,1,0,0,.241906,1,0,0,.262314,1,0,0,.285754,1,0,0,.310159,1,0,0,.335426,1,0,0,.361341,1,0,0,.387445,1,0,0,.412784,1,0,0,.438197,1,0,0,.466966,1,0,0,.49559,1,0,0,.523448,1,0,0,.549938,1,0,0,.57979,1,0,0,.608746,1,0,0,.636185,1,0,0,.664748,1,0,0,.69313,1,0,0,.71966,1,0,0,.747662,1,0,0,.774023,1,0,0,.799775,1,0,0,.825274,1,0,0,.849156,1,0,0,.873248,1,0,0,.89532,1,0,0,.917565,1,0,0,.937863,1,0,0,.958139,1,0,0,.976563,1,0,0,.994658,1,0,0,1.0112,1,0,0,1.02712,1,0,0,1.04189,1,0,0,1.05568,1,0,0,1.06877,1,0,0,1.08058,1,0,0,1.09194,1,0,0,1.10191,1,0,0,1.11161,1,0,0,1.1199,1,0,0,1.12813,.999547,-448815e-12,.0224417,199902e-10,.999495,-113079e-10,.0224406,503651e-9,.999496,-452317e-10,.0224406,.00201461,.999496,-101772e-9,.0224406,.00453287,.999495,-180928e-9,.0224406,.00805845,.999497,-282702e-9,.0224406,.0125914,.999496,-407096e-9,.0224406,.0181319,.999498,-554114e-9,.0224406,.02468,.999499,-723768e-9,.0224406,.0322363,.999495,-916058e-9,.0224405,.0408009,.999499,-.00113101,.0224408,.050375,.999494,-.00136863,.0224405,.0609586,.999489,-.00162896,.0224401,.0725537,.999489,-.00191201,.0224414,.0851619,.999498,-.00221787,.0224413,.0987867,.999492,-.00254642,.0224409,.113426,.999507,-.00289779,.0224417,.129088,.999494,-.0032716,.0224386,.145767,.999546,-.0036673,.0224424,.163472,.999543,-.00408166,.0224387,.182182,.999499,-.00450056,.0224338,.201843,.999503,-.00483661,.0224203,.222198,.999546,-.00452928,.022315,.241714,.999508,-.00587403,.0224329,.262184,.999509,-.00638806,.0224271,.285609,.999501,-.00691028,.0224166,.309998,.999539,-.00741979,.0223989,.335262,.999454,-.00786282,.0223675,.361154,.999529,-.00811928,.0222828,.387224,.999503,-.00799941,.0221063,.41252,.999561,-.00952753,.0223057,.438006,.999557,-.0099134,.0222065,.466735,.999541,-.0100935,.0220402,.495332,.999562,-.00996821,.0218067,.523197,.999556,-.0105031,.0217096,.550223,.999561,-.0114191,.0217215,.579498,.999588,-.0111818,.0213357,.608416,.999633,-.0107725,.0208689,.635965,.999527,-.0121671,.0210149,.664476,.999508,-.0116005,.020431,.692786,.999568,-.0115604,.0199791,.719709,.999671,-.0121117,.0197415,.74737,.999688,-.0110769,.0188846,.773692,.99962,-.0122368,.0188452,.799534,.999823,-.0110325,.0178001,.825046,.999599,-.0114923,.0174221,.849075,.999619,-.0105923,.0164345,.872999,.999613,-.0105988,.0158227,.895371,.99964,-.00979861,.0148131,.917364,.99977,-.00967238,.0140721,.938002,.999726,-.00869175,.0129543,.957917,.99973,-.00866872,.0122329,.976557,.999773,-.00731956,.0108958,.994459,.999811,-.00756027,.0102715,1.01118,.999862,-.00583732,.00878781,1.02701,.999835,-.00631438,.00827529,1.04186,.999871,-.00450785,.00674583,1.05569,.999867,-.00486079,.00621041,1.06861,.999939,-.00322072,.00478301,1.08064,.999918,-.00318199,.00406395,1.09181,1.00003,-.00193348,.00280682,1.10207,.999928,-.00153729,.00198741,1.11152,.999933,-623666e-9,917714e-9,1.12009,1,-102387e-11,907581e-12,1.12813,.997866,-896716e-12,.0448334,199584e-10,.997987,-225945e-10,.0448389,502891e-9,.997987,-903781e-10,.0448388,.00201156,.997985,-203351e-9,.0448388,.00452602,.997986,-361514e-9,.0448388,.00804629,.997987,-56487e-8,.0448389,.0125724,.997988,-813423e-9,.0448389,.0181045,.997984,-.00110718,.0448387,.0246427,.997985,-.00144616,.0448388,.0321875,.997987,-.00183038,.044839,.0407392,.997983,-.00225987,.0448387,.0502986,.997991,-.00273467,.0448389,.0608667,.997984,-.00325481,.0448384,.0724444,.998002,-.00382043,.044839,.0850348,.997997,-.00443145,.0448396,.0986372,.998007,-.00508796,.0448397,.113255,.998008,-.00578985,.04484,.128891,.998003,-.00653683,.0448384,.145548,.997983,-.00732713,.0448358,.163221,.997985,-.00815454,.0448358,.181899,.998005,-.00898985,.0448286,.201533,.998026,-.00964404,.0447934,.221821,.998055,-.00922677,.044611,.241282,.99804,-.0117361,.0448245,.261791,.998048,-.0127628,.0448159,.285181,.998088,-.0138055,.0447996,.30954,.998058,-.0148206,.0447669,.334751,.998099,-.0156998,.044697,.36061,.998116,-.0161976,.0445122,.386603,.998195,-.015945,.0441711,.411844,.998168,-.0183947,.0444255,.43773,.998184,-.0197913,.0443809,.466009,.998251,-.0201426,.0440689,.494574,.998305,-.0198847,.0435632,.522405,.998273,-.0210577,.043414,.549967,.998254,-.0227901,.0433943,.578655,.998349,-.0223108,.0426529,.60758,.99843,-.0223088,.042,.635524,.998373,-.0241141,.0418987,.663621,.998425,-.0231446,.0408118,.691906,.998504,-.0233684,.0400565,.719339,.998443,-.0241652,.0394634,.74643,.99848,-.0228715,.0380002,.773086,.998569,-.023519,.0372322,.798988,.998619,-.0223108,.0356468,.824249,.998594,-.0223105,.034523,.848808,.998622,-.0213426,.0328887,.87227,.998669,-.0207912,.0314374,.895157,.998705,-.0198416,.0296925,.916769,.998786,-.0189168,.0279634,.937773,.998888,-.0178811,.0261597,.957431,.99906,-.0166845,.0242159,.976495,.999038,-.0155464,.0222638,.994169,.999237,-.0141349,.0201967,1.01112,.999378,-.0129324,.0181744,1.02692,.999433,-.0113192,.0159898,1.04174,.999439,-.0101244,.0140385,1.05559,.999614,-.00837456,.0117826,1.06852,.999722,-.00721769,.00983745,1.08069,.999817,-.00554067,.00769002,1.09176,.99983,-.00426961,.005782,1.10211,.999964,-.00273904,.00374503,1.11152,1.00001,-.00136739,.00187176,1.12031,.999946,393227e-10,-28919e-9,1.12804,.995847,-13435e-10,.0671785,19916e-9,.995464,-338387e-10,.0671527,501622e-9,.99547,-135355e-9,.0671531,.00200649,.995471,-30455e-8,.0671532,.00451461,.99547,-541423e-9,.0671531,.008026,.995471,-84598e-8,.0671531,.0125407,.99547,-.00121823,.0671531,.0180589,.99547,-.00165817,.0671531,.0245806,.995463,-.00216583,.0671526,.0321062,.995468,-.00274127,.0671527,.0406366,.995474,-.00338447,.0671534,.0501717,.995473,-.00409554,.0671533,.0607131,.995478,-.00487451,.0671531,.0722618,.995476,-.00572148,.0671532,.0848191,.995477,-.00663658,.0671539,.0983882,.995498,-.00761986,.0671541,.112972,.995509,-.00867094,.0671542,.128568,.995509,-.00978951,.0671531,.145183,.995503,-.0109725,.0671491,.162808,.995501,-.012211,.0671465,.181441,.99553,-.0134565,.0671371,.201015,.99555,-.014391,.0670831,.221206,.99558,-.014351,.0668883,.240813,.995577,-.0173997,.0671055,.261257,.995602,-.0191111,.0671178,.284467,.995623,-.0206705,.0670946,.308765,.995658,-.022184,.0670472,.333905,.995705,-.0234832,.0669417,.359677,.995719,-.0241933,.0666714,.385554,.995786,-.0243539,.066266,.410951,.995887,-.0271866,.0664367,.437163,.995944,-.0296012,.0664931,.464842,.996004,-.0301045,.0660105,.49332,.996128,-.0298311,.0652694,.521131,.996253,-.0316426,.0650739,.549167,.996244,-.0339043,.0649433,.57737,.996309,-.033329,.0638926,.606073,.996417,-.0338935,.0630849,.634527,.996372,-.0353104,.0625083,.66256,.996542,-.0348942,.0611986,.690516,.996568,-.0351614,.060069,.718317,.996711,-.0354317,.0588522,.74528,.996671,-.0349513,.0571902,.772061,.996865,-.0345622,.0555321,.798089,.996802,-.0342566,.0537816,.823178,.996992,-.0330862,.0516095,.847949,.996944,-.0324666,.0495537,.871431,.997146,-.0309544,.0470302,.894357,.997189,-.0299372,.0446043,.916142,.997471,-.0281389,.0418812,.937193,.997515,-.0268702,.0391823,.957,.997812,-.0247166,.0361338,.975936,.998027,-.0233525,.0333945,.99391,.998233,-.0209839,.0301917,1.01075,.998481,-.0194309,.027271,1.02669,.998859,-.0169728,.0240162,1.04173,.99894,-.0152322,.0210517,1.05551,.999132,-.0127497,.0178632,1.06856,.999369,-.0108282,.014787,1.08054,.999549,-.00845886,.0116185,1.09185,.999805,-.0063937,.00867209,1.10207,.99985,-.00414582,.00566823,1.1117,.999912,-.00207443,.00277562,1.12022,1.00001,870226e-10,-53766e-9,1.12832,.991943,-178672e-11,.0893382,198384e-10,.991952,-450183e-10,.089339,499849e-9,.991956,-180074e-9,.0893394,.0019994,.991955,-405167e-9,.0893393,.00449867,.991953,-720298e-9,.0893391,.00799764,.991955,-.00112548,.0893393,.0124964,.991957,-.0016207,.0893395,.0179951,.991958,-.00220601,.0893396,.0244939,.991947,-.00288137,.0893385,.0319929,.991962,-.00364693,.0893399,.0404933,.991965,-.00450264,.0893399,.049995,.99198,-.00544862,.0893411,.0604995,.99197,-.00648491,.0893397,.0720074,.991976,-.00761164,.089341,.0845207,.99198,-.00882891,.0893405,.0980413,.991982,-.0101367,.0893396,.112571,.992008,-.011535,.0893415,.128115,.992026,-.0130228,.0893414,.144672,.992064,-.0145966,.0893418,.162241,.992041,-.0162421,.0893359,.180801,.992086,-.0178888,.0893214,.200302,.992157,-.0190368,.0892401,.220332,.992181,-.0195584,.0890525,.240144,.992175,-.0227257,.0892153,.260728,.99221,-.0254195,.089304,.283473,.99222,-.0274883,.0892703,.307673,.992317,-.0294905,.0892027,.332729,.992374,-.0311861,.0890577,.358387,.992505,-.0320656,.0886994,.384102,.992568,-.0329715,.0883198,.409767,.992675,-.036006,.0883602,.436145,.992746,-.0392897,.0884591,.463217,.992873,-.0399337,.0878287,.491557,.992934,-.040231,.0870108,.519516,.993091,-.0422013,.0865857,.547741,.993259,-.0443503,.0861937,.575792,.993455,-.0446368,.0851187,.604233,.993497,-.0454299,.0840576,.632925,.993694,-.0463296,.0829671,.660985,.993718,-.0470619,.0817185,.688714,.993973,-.0468838,.0800294,.716743,.994207,-.046705,.0781286,.74377,.994168,-.0469698,.0763337,.77042,.9945,-.0456816,.0738184,.796659,.994356,-.0455518,.0715545,.821868,.994747,-.0439488,.0686085,.846572,.994937,-.0430056,.065869,.870435,.995142,-.0413414,.0626446,.893272,.995451,-.0396521,.05929,.915376,.995445,-.0378453,.0558503,.936196,.995967,-.0355219,.0520949,.956376,.996094,-.0335146,.048377,.975327,.996622,-.030682,.0442575,.993471,.996938,-.0285504,.0404693,1.01052,.997383,-.0253399,.0360903,1.02637,.997714,-.0231651,.0322176,1.04139,.998249,-.0198138,.0278433,1.05542,.998596,-.0174337,.0238759,1.06846,.998946,-.0141349,.0195944,1.08056,.99928,-.0115603,.0156279,1.09181,.999507,-.00839065,.0114607,1.10213,.999697,-.005666,.00763325,1.11169,.999869,-.00269902,.00364946,1.12042,1.00001,623836e-10,-319288e-10,1.12832,.987221,-222675e-11,.111332,197456e-10,.98739,-561116e-10,.111351,497563e-9,.987448,-224453e-9,.111357,.00199031,.987441,-505019e-9,.111357,.0044782,.987442,-897816e-9,.111357,.00796129,.987442,-.00140284,.111357,.0124396,.987444,-.00202012,.111357,.0179132,.987442,-.00274964,.111357,.0243824,.987446,-.00359147,.111357,.0318474,.987435,-.00454562,.111356,.0403086,.987461,-.00561225,.111358,.0497678,.987458,-.00679125,.111358,.0602239,.987443,-.0080828,.111356,.0716792,.987476,-.0094872,.111358,.0841364,.98749,-.0110044,.111361,.097597,.987508,-.0126344,.111362,.112062,.987494,-.0143767,.111357,.127533,.987526,-.0162307,.111359,.144015,.987558,-.0181912,.111361,.161502,.987602,-.0202393,.111355,.179979,.987692,-.022273,.111346,.199386,.987702,-.0235306,.111215,.219183,.987789,-.0247628,.111061,.239202,.987776,-.0280668,.111171,.259957,.987856,-.0316751,.111327,.282198,.987912,-.0342468,.111282,.306294,.988,-.0367205,.111198,.331219,.988055,-.0387766,.110994,.356708,.988241,-.0397722,.110547,.382234,.988399,-.0416076,.110198,.408227,.988539,-.0448192,.110137,.434662,.988661,-.0483793,.110143,.461442,.988967,-.0495895,.109453,.489318,.989073,-.0506797,.108628,.517516,.989274,-.0526953,.108003,.545844,.989528,-.054578,.107255,.573823,.989709,-.0561503,.106294,.601944,.989991,-.056866,.104896,.630855,.990392,-.0572914,.103336,.658925,.990374,-.0586224,.10189,.686661,.990747,-.0584764,.099783,.714548,.991041,-.0582662,.0974309,.74186,.991236,-.0584118,.0951678,.768422,.991585,-.0573055,.0921581,.794817,.991984,-.0564241,.0891167,.820336,.9921,-.0553608,.085805,.84493,.992749,-.0533816,.0820354,.868961,.99288,-.0518661,.0782181,.891931,.993511,-.0492492,.0738935,.914186,.993617,-.0471956,.0696402,.93532,.99411,-.044216,.0649659,.95543,.994595,-.0416654,.0603177,.974685,.994976,-.0384314,.0553493,.992807,.995579,-.0353491,.0503942,1.00996,.996069,-.0319787,.0452123,1.02606,.996718,-.028472,.0400112,1.04114,.997173,-.0250789,.0349456,1.05517,.997818,-.0213326,.029653,1.0683,.998318,-.0178509,.024549,1.0805,.998853,-.0141118,.0194197,1.09177,.999218,-.0105914,.0143869,1.1022,.999594,-.00693474,.00943517,1.11175,.99975,-.00340478,.00464051,1.12056,1.00001,109172e-9,-112821e-9,1.12853,.983383,-266524e-11,.133358,196534e-10,.981942,-671009e-10,.133162,494804e-9,.981946,-268405e-9,.133163,.00197923,.981944,-603912e-9,.133163,.00445326,.981941,-.00107362,.133162,.00791693,.981946,-.00167755,.133163,.0123703,.981944,-.00241569,.133162,.0178135,.981945,-.00328807,.133163,.0242466,.981945,-.00429472,.133162,.03167,.981955,-.00543573,.133164,.0400846,.981951,-.00671105,.133163,.0494901,.981968,-.00812092,.133165,.0598886,.981979,-.00966541,.133166,.0712811,.981996,-.0113446,.133168,.083669,.982014,-.0131585,.133169,.0970533,.982011,-.0151073,.133167,.111438,.982062,-.0171906,.133172,.126826,.9821,-.0194067,.133175,.143215,.982149,-.0217502,.133176,.160609,.982163,-.0241945,.133173,.178981,.982247,-.0265907,.133148,.198249,.982291,-.027916,.132974,.217795,.982396,-.0299663,.132868,.238042,.982456,-.0334544,.132934,.258901,.982499,-.0378636,.133137,.280639,.982617,-.0409274,.133085,.304604,.98274,-.0438523,.132985,.329376,.982944,-.0462288,.132728,.354697,.98308,-.0475995,.132228,.380102,.983391,-.0501901,.131924,.406256,.983514,-.0535899,.131737,.432735,.98373,-.0571858,.131567,.459359,.984056,-.0592353,.130932,.486637,.984234,-.0610488,.130092,.51509,.984748,-.0630758,.12923,.543461,.985073,-.0647398,.128174,.571376,.985195,-.0671941,.127133,.599414,.985734,-.0681345,.125576,.628134,.986241,-.0686089,.123639,.656399,.986356,-.0698511,.121834,.684258,.986894,-.0700931,.119454,.711818,.987382,-.0698321,.116718,.739511,.988109,-.0693975,.113699,.766267,.988363,-.0689584,.110454,.792456,.989112,-.0672353,.106602,.81813,.989241,-.0662034,.10267,.842889,.990333,-.0638938,.0981381,.867204,.990591,-.0618534,.0935388,.89038,.991106,-.0593117,.088553,.912576,.991919,-.0562676,.0832187,.934118,.992111,-.0534085,.0778302,.954254,.992997,-.0495459,.0720453,.973722,.993317,-.0463707,.0663458,.991949,.994133,-.0421245,.0601883,1.00936,.994705,-.0384977,.0542501,1.02559,.995495,-.0340956,.0479862,1.04083,.996206,-.030105,.041887,1.05497,.996971,-.0256095,.0355355,1.06824,.997796,-.0213932,.0293655,1.08056,.998272,-.0169612,.0232926,1.09182,.998857,-.0126756,.0172786,1.10219,.99939,-.00832486,.0113156,1.11192,.999752,-.00410826,.00557892,1.12075,1,150957e-9,-119101e-9,1.12885,.975169,-309397e-11,.154669,195073e-10,.975439,-779608e-10,.154712,491534e-9,.975464,-311847e-9,.154716,.00196617,.975464,-701656e-9,.154716,.00442387,.975462,-.0012474,.154715,.0078647,.975461,-.00194906,.154715,.0122886,.975464,-.00280667,.154715,.0176959,.975468,-.00382025,.154716,.0240867,.975471,-.00498985,.154716,.0314612,.975472,-.00631541,.154717,.0398199,.975486,-.00779719,.154718,.0491639,.975489,-.00943505,.154718,.0594932,.975509,-.0112295,.154721,.0708113,.97554,-.0131802,.154724,.0831176,.975557,-.0152876,.154726,.096415,.975585,-.0175512,.154728,.110705,.975605,-.0199713,.154729,.125992,.975645,-.0225447,.154729,.142272,.975711,-.0252649,.154735,.159549,.975788,-.0280986,.154736,.177805,.975872,-.0308232,.154704,.196911,.975968,-.0324841,.154525,.216324,.976063,-.0351281,.154432,.236628,.976157,-.0388618,.15446,.257539,.976204,-.0437704,.154665,.278975,.976358,-.047514,.154652,.302606,.976571,-.0508638,.154535,.327204,.976725,-.0534995,.154221,.352276,.977013,-.0555547,.153737,.377696,.977294,-.0586728,.153403,.403855,.977602,-.0622715,.15312,.430333,.977932,-.0658166,.152755,.456855,.978241,-.0689877,.152233,.483668,.978602,-.0712805,.15132,.512097,.979234,-.0732775,.150235,.540455,.97977,-.075163,.148978,.568486,.979995,-.0778026,.147755,.596524,.98078,-.0791854,.146019,.624825,.981628,-.0799666,.143906,.653403,.982067,-.0808532,.141561,.681445,.98271,-.0816024,.139025,.708918,.983734,-.0812511,.135764,.736594,.98431,-.0806201,.132152,.763576,.985071,-.0801605,.12846,.789797,.98618,-.0784208,.124084,.815804,.986886,-.0766643,.1193,.840869,.987485,-.0747744,.114236,.864952,.988431,-.0716701,.108654,.888431,.988886,-.0691609,.102994,.910963,.990024,-.0654048,.0967278,.932629,.990401,-.0619765,.090384,.95313,.991093,-.0579296,.0837885,.972587,.992018,-.0536576,.0770171,.991184,.992536,-.0493719,.0701486,1.00863,.993421,-.0444813,.062953,1.02494,.993928,-.040008,.0560455,1.04017,.994994,-.0347982,.04856,1.05463,.995866,-.0301017,.0416152,1.06807,.996916,-.0248225,.0342597,1.08039,.997766,-.0199229,.0271668,1.09177,.998479,-.0147422,.0201387,1.10235,.99921,-.00980173,.0131944,1.11206,.999652,-.0047426,.00640712,1.12104,.999998,891673e-10,-10379e-8,1.12906,.967868,-351885e-11,.175947,193569e-10,.968001,-886733e-10,.175972,487782e-9,.96801,-354697e-9,.175973,.00195115,.968012,-798063e-9,.175974,.00439006,.968011,-.00141879,.175973,.00780461,.968011,-.00221686,.175973,.0121948,.968016,-.00319231,.175974,.0175607,.968019,-.00434515,.175974,.0239027,.968018,-.00567538,.175974,.0312208,.968033,-.00718308,.175977,.0395158,.968049,-.00886836,.175979,.0487885,.968047,-.0107312,.175978,.0590394,.968072,-.0127719,.175981,.0702705,.968108,-.0149905,.175986,.0824836,.968112,-.0173866,.175985,.0956783,.968173,-.0199611,.175993,.109862,.96827,-.0227128,.176008,.125033,.968292,-.025639,.17601,.141193,.968339,-.0287299,.176007,.158336,.968389,-.0319399,.176001,.176441,.968501,-.034941,.175962,.195359,.968646,-.0370812,.175793,.214686,.968789,-.0402329,.175708,.234973,.96886,-.0442601,.1757,.255871,.969013,-.049398,.175876,.277238,.969242,-.0539932,.17594,.300326,.969419,-.0577299,.175781,.324702,.969763,-.0605643,.175432,.349527,.970093,-.0634488,.174992,.374976,.970361,-.0670589,.174611,.401097,.970825,-.0708246,.174226,.427496,.971214,-.0742871,.173684,.453858,.971622,-.0782608,.173186,.480637,.972175,-.0813151,.172288,.508655,.972944,-.0832678,.170979,.536973,.973595,-.0855964,.169573,.565138,.974345,-.0882163,.168152,.593222,.975233,-.0901671,.166314,.621201,.976239,-.0912111,.163931,.649919,.977289,-.0916959,.161106,.678011,.978076,-.0927061,.158272,.705717,.979533,-.0925562,.15475,.733228,.980335,-.0918159,.150638,.760454,.981808,-.0908508,.146201,.786918,.983061,-.0896172,.141386,.812953,.984148,-.0871588,.135837,.838281,.985047,-.0850624,.130135,.862594,.986219,-.0818541,.123882,.88633,.987043,-.0784523,.117126,.908952,.988107,-.0749601,.110341,.930744,.988955,-.0703548,.102885,.951728,.989426,-.0662798,.0954167,.971166,.990421,-.0610834,.0876331,.989984,.991032,-.0562936,.0797785,1.00765,.992041,-.0508154,.0718166,1.02434,.992794,-.0454045,.0637125,1.03976,.993691,-.0398194,.0555338,1.05418,.994778,-.0341482,.0473388,1.06772,.995915,-.028428,.0391016,1.08028,.997109,-.022642,.0309953,1.09185,.998095,-.0168738,.0230288,1.10247,.998985,-.0111274,.0150722,1.11229,.999581,-.00543881,.00740605,1.12131,1.00003,162239e-9,-105549e-9,1.12946,.959505,-393734e-11,.196876,191893e-10,.959599,-992157e-10,.196895,483544e-9,.959641,-396868e-9,.196903,.0019342,.959599,-892948e-9,.196895,.00435193,.959603,-.00158747,.196896,.0077368,.959604,-.00248042,.196896,.0120888,.959605,-.00357184,.196896,.0174082,.959605,-.00486169,.196896,.0236949,.959613,-.00635008,.196897,.0309497,.959619,-.00803696,.196898,.0391725,.959636,-.00992255,.196901,.0483649,.959634,-.0120067,.1969,.0585266,.959675,-.0142898,.196906,.0696609,.959712,-.0167717,.196911,.0817678,.959752,-.0194524,.196918,.0948494,.959807,-.0223321,.196925,.10891,.959828,-.0254091,.196924,.123947,.959906,-.0286815,.196934,.139968,.960005,-.0321371,.196944,.156968,.960071,-.0357114,.196936,.17491,.960237,-.0389064,.196882,.193597,.960367,-.041623,.196731,.21285,.960562,-.0452655,.196654,.233075,.960735,-.0496207,.196643,.253941,.960913,-.0549379,.196774,.275278,.961121,-.0603414,.196893,.297733,.96139,-.0644244,.196717,.321877,.961818,-.067556,.196314,.346476,.962175,-.0712709,.195917,.371907,.96255,-.0752848,.1955,.397916,.963164,-.0792073,.195026,.424229,.963782,-.0828225,.194424,.450637,.964306,-.0873119,.193831,.477288,.964923,-.0911051,.192973,.504716,.966048,-.093251,.19151,.533053,.967024,-.0958983,.190013,.561366,.968038,-.09835,.188253,.589464,.969152,-.100754,.186257,.617433,.970557,-.102239,.183775,.645801,.972104,-.102767,.180645,.674278,.973203,-.103492,.177242,.702004,.975123,-.103793,.17345,.729529,.97641,-.102839,.168886,.756712,.978313,-.101687,.163892,.783801,.980036,-.100314,.158439,.809671,.981339,-.097836,.152211,.835402,.982794,-.0950006,.145679,.860081,.984123,-.0920994,.138949,.883757,.984918,-.0878641,.131283,.90685,.985999,-.083939,.123464,.928786,.987151,-.0791234,.115324,.94983,.987827,-.0739332,.106854,.96962,.988806,-.0688088,.0982691,.98861,.989588,-.0628962,.0893456,1.00667,.990438,-.0573146,.0805392,1.02344,.991506,-.0509433,.0713725,1.03933,.992492,-.0448724,.0623732,1.05378,.993663,-.0383497,.0530838,1.06747,.994956,-.0319593,.0439512,1.08007,.99634,-.025401,.0347803,1.09182,.99761,-.0189687,.0257954,1.1025,.99863,-.0124441,.0169893,1.11247,.99947,-.00614003,.00829498,1.12151,1.00008,216624e-9,-146107e-9,1.12993,.950129,-434955e-11,.217413,190081e-10,.950264,-10957e-8,.217444,47884e-8,.9503,-438299e-9,.217451,.00191543,.950246,-986124e-9,.21744,.00430951,.950246,-.00175311,.21744,.00766137,.950245,-.00273923,.21744,.011971,.950253,-.00394453,.217441,.0172385,.950258,-.00536897,.217442,.0234641,.950267,-.00701262,.217444,.030648,.950277,-.00887551,.217446,.038791,.950284,-.0109576,.217446,.0478931,.950312,-.0132591,.217451,.0579568,.950334,-.01578,.217454,.0689821,.950378,-.0185204,.217462,.0809714,.950417,-.0214803,.217467,.0939265,.950488,-.0246594,.217479,.10785,.950534,-.0280565,.217483,.122743,.950633,-.0316685,.217498,.138611,.950698,-.0354787,.217499,.155442,.950844,-.0394003,.217507,.173208,.950999,-.0426812,.217419,.191605,.951221,-.0461302,.217317,.21084,.951412,-.0502131,.217238,.230945,.951623,-.0549183,.21722,.251745,.951867,-.0604493,.217306,.273001,.952069,-.0665189,.217466,.294874,.952459,-.0709179,.217266,.318732,.952996,-.0746112,.216891,.34318,.953425,-.0789252,.216503,.36849,.953885,-.0833293,.216042,.394373,.954617,-.087371,.215469,.420505,.955429,-.0914054,.214802,.446907,.956068,-.0961671,.214146,.473522,.957094,-.10048,.213286,.50052,.958372,-.103248,.211796,.528715,.959654,-.106033,.21016,.557065,.961305,-.108384,.208149,.585286,.962785,-.111122,.206024,.613334,.964848,-.112981,.203442,.641334,.966498,-.113717,.19996,.669955,.968678,-.114121,.196105,.698094,.970489,-.114524,.191906,.725643,.972903,-.113792,.186963,.752856,.974701,-.112406,.181343,.780013,.976718,-.110685,.175185,.806268,.978905,-.108468,.168535,.832073,.980267,-.105061,.161106,.857149,.981967,-.101675,.153387,.881145,.983063,-.0974492,.145199,.904255,.984432,-.0925815,.136527,.926686,.985734,-.0877983,.127584,.947901,.986228,-.081884,.118125,.968111,.98719,-.0761208,.108594,.98719,.988228,-.0698196,.0989996,1.00559,.989046,-.0632739,.0890074,1.02246,.990242,-.056522,.0790832,1.03841,.991252,-.0495272,.0689182,1.05347,.992542,-.0425373,.0588592,1.06724,.994096,-.0353198,.0486833,1.08009,.995593,-.028235,.0385977,1.09177,.99711,-.0209511,.0286457,1.10274,.998263,-.0139289,.0188497,1.11262,.999254,-.0067359,.009208,1.12191,.999967,141846e-9,-657764e-10,1.13024,.935608,-474692e-11,.236466,187817e-10,.93996,-11971e-8,.237568,473646e-9,.939959,-478845e-9,.237567,.0018946,.939954,-.0010774,.237566,.00426284,.939956,-.00191538,.237566,.00757842,.939954,-.00299277,.237566,.0118413,.93996,-.00430961,.237567,.0170518,.939969,-.00586589,.237569,.02321,.939982,-.00766166,.237572,.0303164,.939987,-.00969686,.237572,.0383711,.939997,-.0119715,.237574,.0473751,.940031,-.0144858,.237581,.0573298,.940073,-.0172399,.237589,.0682366,.94012,-.0202335,.237598,.080097,.940162,-.0234663,.237604,.0929116,.940237,-.0269387,.237615,.106686,.940328,-.0306489,.237632,.121421,.940419,-.0345917,.237645,.137115,.940522,-.0387481,.237654,.153766,.940702,-.0429906,.237661,.17133,.940871,-.0465089,.237561,.189502,.941103,-.050531,.23748,.208616,.941369,-.0550657,.237423,.228595,.941641,-.0601337,.237399,.249287,.941903,-.0658804,.237443,.270467,.942224,-.0722674,.237597,.292024,.942633,-.0771788,.237419,.315272,.943172,-.0815623,.237068,.339579,.943691,-.0863973,.236682,.364717,.944382,-.0911536,.236213,.390435,.945392,-.0952967,.235562,.416425,.946185,-.0998948,.234832,.442772,.947212,-.104796,.234114,.469347,.948778,-.10928,.233222,.496162,.950149,-.113081,.231845,.523978,.951989,-.115893,.230005,.552295,.953921,-.11846,.227862,.580569,.955624,-.12115,.225439,.608698,.958234,-.123373,.222635,.636696,.960593,-.124519,.219093,.665208,.963201,-.124736,.214749,.693557,.965642,-.125012,.210059,.721334,.968765,-.124661,.204935,.748613,.971753,-.122996,.198661,.776224,.973751,-.120998,.191823,.802461,.976709,-.118583,.184359,.828399,.977956,-.115102,.176437,.853693,.979672,-.111077,.167681,.877962,.981816,-.10688,.158872,.901564,.98238,-.101469,.149398,.924057,.983964,-.0960013,.139436,.945751,.984933,-.0899626,.12943,.966272,.985694,-.0832973,.11894,.985741,.986822,-.0767082,.108349,1.00407,.987725,-.0693614,.0976026,1.02154,.98877,-.06211,.086652,1.03757,.990129,-.0544143,.0756182,1.05296,.991337,-.046744,.0645753,1.06683,.992978,-.0387931,.0534683,1.0798,.994676,-.030973,.0424137,1.09181,.99645,-.0230311,.0314035,1.10286,.997967,-.0152065,.0206869,1.11291,.99922,-.00744837,.010155,1.12237,1.00002,240209e-9,-752767e-10,1.13089,.922948,-515351e-11,.255626,186069e-10,.928785,-129623e-9,.257244,468009e-9,.928761,-51849e-8,.257237,.00187202,.928751,-.0011666,.257235,.00421204,.928751,-.00207395,.257234,.0074881,.928754,-.00324055,.257235,.0117002,.92876,-.00466639,.257236,.0168486,.928763,-.00635149,.257237,.0229334,.928774,-.00829584,.257239,.029955,.928791,-.0104995,.257243,.0379139,.928804,-.0129623,.257245,.0468108,.928847,-.0156846,.257255,.0566473,.92889,-.0186661,.257263,.0674246,.928924,-.0219067,.257268,.0791433,.928989,-.0254066,.257282,.0918076,.92909,-.0291651,.257301,.105419,.92918,-.0331801,.257316,.119978,.92929,-.0374469,.257332,.135491,.929453,-.041939,.257357,.151948,.929586,-.0464612,.257347,.169275,.929858,-.0503426,.257269,.187257,.930125,-.0548409,.257199,.206204,.930403,-.0598063,.257149,.22601,.930726,-.0652437,.257122,.246561,.931098,-.0712376,.257153,.267618,.931396,-.0777506,.257237,.288993,.931947,-.0832374,.257124,.311527,.932579,-.0883955,.25683,.335697,.933194,-.0937037,.256444,.360634,.934013,-.0987292,.255939,.386126,.935307,-.103215,.255282,.412018,.936374,-.108234,.254538,.438292,.93776,-.113234,.253728,.464805,.939599,-.118013,.25275,.491464,.941036,-.122661,.251404,.518751,.94337,-.125477,.249435,.547133,.945318,-.128374,.247113,.575456,.947995,-.130996,.244441,.60372,.950818,-.133438,.241352,.63174,.954378,-.135004,.237849,.659971,.957151,-.135313,.233188,.688478,.960743,-.13521,.228001,.716767,.964352,-.135007,.222249,.744349,.967273,-.133523,.21542,.771786,.969767,-.131155,.208039,.798639,.973195,-.128492,.200076,.824774,.975557,-.125094,.191451,.850222,.977692,-.120578,.18184,.874761,.98026,-.115882,.172102,.898497,.981394,-.110372,.161859,.921636,.982386,-.10415,.15108,.943467,.983783,-.0978128,.140407,.964045,.98422,-.0906171,.129058,.98398,.985447,-.0832921,.117614,1.00276,.986682,-.0754412,.10585,1.02047,.987326,-.0673885,.0940943,1.03678,.988707,-.0592565,.0822093,1.05218,.990185,-.050717,.070192,1.06652,.991866,-.0423486,.0582081,1.07965,.993897,-.0336118,.0460985,1.09188,.995841,-.0252178,.0342737,1.10307,.997605,-.0164893,.0224829,1.11324,.999037,-.00817112,.0110647,1.12262,1.00003,291686e-9,-168673e-9,1.13139,.915304,-552675e-11,.275999,183285e-10,.91668,-139285e-9,.276414,461914e-9,.916664,-55713e-8,.276409,.00184763,.916653,-.00125354,.276406,.00415715,.916651,-.00222851,.276405,.00739053,.916655,-.00348205,.276406,.0115478,.916653,-.00501414,.276405,.0166291,.916667,-.00682478,.276409,.0226346,.91668,-.00891398,.276412,.0295648,.91669,-.0112817,.276413,.0374199,.916727,-.013928,.276422,.0462016,.916759,-.0168528,.276429,.0559101,.916793,-.0200558,.276436,.0665466,.916849,-.0235373,.276448,.0781139,.916964,-.0272973,.276474,.0906156,.917047,-.0313344,.276491,.104051,.917152,-.0356465,.276511,.118424,.917286,-.0402271,.276533,.133736,.917469,-.0450408,.276564,.149978,.917686,-.0497872,.276563,.167057,.917953,-.0540937,.276493,.184846,.918228,-.0590709,.276437,.203614,.918572,-.0644277,.276398,.223212,.918918,-.0702326,.276362,.243584,.919356,-.076484,.276383,.264465,.919842,-.0830808,.276434,.285701,.920451,-.0892972,.276407,.307559,.921113,-.095016,.276128,.331501,.921881,-.100771,.275754,.356207,.923027,-.106029,.275254,.381477,.924364,-.111029,.274595,.40722,.925818,-.116345,.273841,.433385,.92746,-.121424,.272913,.459848,.929167,-.12657,.271837,.486493,.931426,-.131581,.270575,.513432,.934001,-.135038,.268512,.541502,.936296,-.138039,.266135,.569658,.939985,-.140687,.263271,.598375,.943516,-.143247,.260058,.626563,.94782,-.145135,.256138,.654711,.951023,-.145733,.251154,.683285,.955338,-.145554,.245562,.711831,.959629,-.145008,.239265,.739573,.963123,-.144003,.232064,.767027,.966742,-.141289,.224036,.794359,.969991,-.138247,.215305,.820361,.973403,-.134786,.206051,.846548,.975317,-.129966,.195914,.871541,.977647,-.12471,.185184,.895313,.980137,-.119086,.174161,.918398,.981031,-.112297,.162792,.940679,.982037,-.105372,.150952,.961991,.983164,-.097821,.138921,.981913,.983757,-.0897245,.126611,1.00109,.985036,-.0815974,.114228,1.01902,.986289,-.0727725,.101389,1.03604,.987329,-.0639323,.0886476,1.05149,.989193,-.0548109,.0756837,1.06619,.990716,-.045687,.0627581,1.07948,.992769,-.0364315,.0498337,1.09172,.99524,-.0271761,.0370305,1.1033,.997154,-.0179609,.0243959,1.11353,.998845,-.00878063,.0119567,1.12319,1.00002,259038e-9,-108146e-9,1.13177,.903945,-591681e-11,.295126,181226e-10,.903668,-148672e-9,.295037,455367e-9,.903677,-594683e-9,.29504,.00182145,.903673,-.00133805,.295039,.00409831,.903666,-.00237872,.295036,.00728584,.903668,-.00371676,.295037,.0113842,.903679,-.00535212,.29504,.0163936,.903684,-.00728479,.295041,.0223141,.903698,-.00951473,.295044,.0291462,.903718,-.0120419,.295049,.0368904,.903754,-.0148664,.295058,.0455477,.903801,-.017988,.29507,.0551194,.903851,-.0214064,.295082,.0656058,.903921,-.0251219,.295097,.0770109,.904002,-.0291337,.295116,.0893354,.904111,-.033441,.29514,.102583,.904246,-.0380415,.295169,.116755,.904408,-.0429258,.295202,.131853,.904637,-.0480468,.295245,.147869,.904821,-.0529208,.295214,.164658,.905163,-.0577748,.295185,.182274,.905469,-.0631763,.295143,.200828,.905851,-.068917,.295112,.2202,.906322,-.0750861,.295104,.240372,.906761,-.0815855,.295086,.261082,.90735,-.0882138,.295095,.282123,.908087,-.095082,.295139,.303563,.908826,-.101488,.29492,.327028,.909832,-.107577,.294577,.351464,.911393,-.113033,.294115,.376497,.912804,-.118629,.293446,.402115,.914081,-.124232,.292581,.428111,.91637,-.129399,.29166,.454442,.91814,-.134892,.290422,.481024,.921179,-.140069,.289194,.507924,.924544,-.144431,.287421,.535557,.927995,-.147498,.284867,.563984,.931556,-.150197,.281722,.5923,.935777,-.152711,.278207,.620832,.940869,-.154836,.274148,.649069,.945994,-.155912,.269057,.677746,.949634,-.155641,.262799,.706293,.955032,-.154809,.256097,.734278,.95917,-.153678,.248618,.761751,.962931,-.151253,.239794,.789032,.966045,-.147625,.230281,.815422,.96971,-.143964,.220382,.841787,.972747,-.139464,.209846,.867446,.975545,-.133459,.198189,.892004,.978381,-.127424,.186362,.915458,.979935,-.120506,.173964,.937948,.980948,-.11282,.161429,.959732,.982234,-.104941,.148557,.980118,.982767,-.0962905,.135508,.999463,.983544,-.0873625,.122338,1.01756,.984965,-.0783447,.108669,1.03492,.986233,-.0684798,.0949911,1.05087,.987796,-.0590867,.0811386,1.0656,.989885,-.0489145,.0673099,1.0794,.991821,-.0391,.0535665,1.09174,.99448,-.029087,.0397529,1.10341,.996769,-.019114,.0261463,1.11383,.998641,-.00947007,.0128731,1.1237,.999978,446316e-9,-169093e-9,1.13253,.888362,-627064e-11,.312578,178215e-10,.889988,-157791e-9,.313148,448451e-9,.889825,-631076e-9,.313092,.00179356,.88984,-.00141994,.313097,.00403554,.889828,-.0025243,.313092,.00717429,.889831,-.00394421,.313093,.0112099,.889831,-.00567962,.313093,.0161425,.889844,-.00773051,.313096,.0219724,.889858,-.0100968,.3131,.0286999,.889882,-.0127786,.313106,.0363256,.889918,-.0157757,.313116,.0448509,.889967,-.0190878,.313129,.0542758,.89003,-.022715,.313145,.0646032,.890108,-.0266566,.313165,.0758339,.890218,-.0309131,.313193,.0879729,.890351,-.0354819,.313226,.101019,.89051,-.0403613,.313263,.114979,.890672,-.0455385,.313294,.129848,.890882,-.0509444,.313333,.145616,.891189,-.0559657,.313324,.162122,.891457,-.0613123,.313281,.179524,.891856,-.0671488,.313281,.197855,.892312,-.0732732,.313268,.216991,.892819,-.0797865,.313263,.236924,.893369,-.0865269,.313247,.257433,.894045,-.0931592,.313205,.278215,.894884,-.100532,.313276,.299467,.895832,-.107716,.313205,.322276,.897043,-.114099,.312873,.34642,.898515,-.119941,.312331,.371187,.900191,-.126044,.311731,.396656,.90188,-.131808,.310859,.422488,.904359,-.137289,.309857,.448744,.906923,-.142991,.308714,.475239,.910634,-.148253,.307465,.501983,.914502,-.153332,.305774,.529254,.919046,-.156646,.303156,.557709,.923194,-.159612,.299928,.586267,.928858,-.162027,.296245,.614925,.934464,-.164203,.291832,.643187,.939824,-.165602,.286565,.671601,.944582,-.165383,.280073,.700213,.949257,-.164439,.272891,.728432,.954389,-.162953,.264771,.756082,.958595,-.161007,.255927,.78369,.962138,-.157243,.245769,.810769,.966979,-.152872,.235127,.836999,.969566,-.148209,.22347,.862684,.972372,-.142211,.211147,.887847,.975916,-.135458,.198606,.911843,.978026,-.128398,.185498,.934795,.979686,-.120313,.17171,.956787,.980748,-.11166,.158159,.978046,.981622,-.103035,.144399,.997693,.982356,-.0930328,.13001,1.01642,.983308,-.0834627,.115778,1.03366,.985037,-.0732249,.101327,1.05014,.986493,-.0628145,.086554,1.06507,.988484,-.0526556,.0720413,1.07907,.991051,-.0415744,.0571151,1.09189,.993523,-.0314275,.0426643,1.10369,.99628,-.0203603,.0279325,1.11423,.998344,-.0102446,.0138182,1.12421,.999997,42612e-8,-193628e-9,1.1333,.871555,-660007e-11,.329176,174749e-10,.875255,-166579e-9,.330571,441051e-9,.875644,-666394e-9,.330718,.00176441,.875159,-.00149903,.330536,.00396899,.87516,-.00266493,.330536,.007056,.875158,-.00416393,.330535,.0110251,.87516,-.00599598,.330535,.0158764,.875163,-.00816108,.330536,.0216101,.875174,-.0106591,.330538,.0282266,.875199,-.0134899,.330545,.0357266,.875257,-.0166538,.330563,.0441117,.875304,-.0201501,.330575,.0533821,.875373,-.0239785,.330595,.0635395,.875464,-.0281389,.330619,.0745872,.875565,-.0326301,.330645,.0865255,.875691,-.0374516,.330676,.0993599,.875897,-.0425993,.330733,.113093,.876091,-.0480576,.330776,.127722,.876353,-.0537216,.330826,.143227,.876649,-.0589807,.330809,.159462,.877034,-.0647865,.330819,.176642,.877443,-.0709789,.330817,.194702,.877956,-.0774782,.330832,.213577,.878499,-.0843175,.330822,.233246,.879144,-.0912714,.330804,.253512,.879982,-.0980824,.330766,.274137,.88097,-.105823,.330864,.295209,.882051,-.113671,.330896,.317226,.883397,-.120303,.330545,.341068,.884987,-.12667,.330068,.365613,.886789,-.133118,.329418,.390807,.889311,-.139024,.328683,.416494,.891995,-.144971,.327729,.442618,.895106,-.150747,.326521,.469131,.899527,-.156283,.325229,.495921,.90504,-.161707,.32378,.523162,.909875,-.165661,.32122,.55092,.91561,-.168755,.317942,.579928,.921225,-.171193,.313983,.608539,.927308,-.17319,.309636,.636854,.933077,-.174819,.304262,.66523,.938766,-.175002,.297563,.693609,.943667,-.173946,.289613,.722157,.949033,-.172221,.281227,.750021,.953765,-.169869,.271545,.777466,.95804,-.166578,.261034,.804853,.962302,-.161761,.249434,.831569,.966544,-.156636,.237484,.857779,.969372,-.150784,.224395,.883051,.972486,-.143672,.210786,.907864,.975853,-.135772,.196556,.931223,.977975,-.127942,.182307,.954061,.979122,-.118347,.167607,.97531,.980719,-.109112,.152739,.995666,.981223,-.0991789,.137932,1.01475,.98216,-.0883553,.122692,1.03253,.983379,-.0780825,.107493,1.04917,.985434,-.0665646,.0917791,1.06464,.987332,-.0557714,.0764949,1.07896,.990004,-.0442805,.060721,1.09199,.992975,-.0331676,.0452284,1.10393,.995811,-.0219547,.0297934,1.11476,.9982,-.0107613,.0146415,1.12484,1.00002,248678e-9,-14555e-8,1.13413,.859519,-693595e-11,.347264,171673e-10,.859843,-17503e-8,.347394,433219e-9,.859656,-700076e-9,.347319,.00173277,.859671,-.00157517,.347325,.00389875,.859669,-.00280028,.347324,.00693112,.85967,-.0043754,.347324,.01083,.859665,-.00630049,.347321,.0155954,.859685,-.0085755,.347328,.0212278,.859694,-.0112003,.347329,.0277273,.859718,-.0141747,.347336,.0350946,.85976,-.0174988,.347348,.0433314,.85982,-.0211722,.347366,.0524384,.859892,-.0251941,.347387,.0624168,.860006,-.0295649,.347422,.0732708,.860122,-.0342825,.347453,.0849999,.860282,-.0393462,.347499,.0976102,.860482,-.0447513,.347554,.111104,.860719,-.0504775,.347614,.125479,.860998,-.0563577,.347666,.140703,.861322,-.0619473,.347662,.156681,.861724,-.0681277,.347684,.173597,.862198,-.0746567,.347709,.191371,.862733,-.0815234,.347727,.209976,.863371,-.0886643,.347744,.229351,.86414,-.0957908,.347734,.24934,.865138,-.102912,.34772,.269797,.866182,-.110924,.3478,.290654,.867436,-.119223,.347911,.312074,.869087,-.126197,.347649,.335438,.870859,-.133145,.347222,.359732,.872997,-.139869,.346645,.38467,.875939,-.146089,.345935,.41019,.879012,-.152334,.345012,.436218,.883353,-.15821,.343924,.462641,.888362,-.164097,.342636,.489449,.895026,-.169528,.341351,.516629,.900753,-.174408,.339115,.544109,.906814,-.17751,.335809,.572857,.912855,-.180101,.331597,.601554,.919438,-.182116,.32698,.630198,.925962,-.183494,.321449,.658404,.931734,-.184159,.314595,.686625,.93762,-.18304,.306462,.71531,.943858,-.181323,.297514,.744272,.948662,-.178683,.287447,.771462,.953299,-.175379,.276166,.798593,.957346,-.170395,.263758,.8256,.962565,-.165042,.251019,.852575,.966075,-.158655,.237011,.878316,.969048,-.151707,.222518,.90329,.972423,-.143271,.207848,.927745,.975833,-.134824,.192463,.950859,.977629,-.125444,.1768,.972947,.978995,-.114949,.161033,.993263,.980533,-.104936,.145523,1.01337,.980745,-.0935577,.129799,1.03128,.981814,-.0822956,.113486,1.04825,.983943,-.0710082,.0972925,1.06405,.986141,-.0587931,.0808138,1.0785,.988878,-.0472755,.0644915,1.09204,.992132,-.0349128,.0478128,1.10413,.9953,-.0232407,.031621,1.11527,.998117,-.0112713,.0154935,1.12551,1.00003,339743e-9,-195763e-9,1.13504,.845441,-729126e-11,.364305,169208e-10,.843588,-183164e-9,.363506,425067e-9,.843412,-73253e-8,.36343,.00169999,.843401,-.00164818,.363426,.00382495,.843399,-.00293008,.363425,.00679993,.843401,-.00457822,.363425,.010625,.843394,-.00659249,.363421,.0153002,.843398,-.00897282,.363421,.0208258,.843415,-.0117191,.363426,.0272024,.843438,-.0148312,.363432,.0344305,.843483,-.018309,.363447,.0425116,.84356,-.0221521,.363472,.0514471,.843646,-.0263597,.363499,.061238,.843743,-.0309315,.363527,.0718873,.84388,-.0358658,.363569,.0833969,.844079,-.0411624,.363631,.0957742,.844279,-.0468128,.363688,.109015,.844549,-.0527923,.363761,.123124,.844858,-.0588204,.363817,.138044,.84522,-.0647573,.36383,.153755,.845669,-.0713181,.363879,.170394,.846155,-.0781697,.363908,.187861,.846789,-.0853913,.363969,.206176,.847502,-.0928086,.363999,.225244,.8484,-.10005,.363997,.244926,.849461,-.107615,.364008,.265188,.850562,-.115814,.364055,.28587,.851962,-.124334,.364179,.306926,.854326,-.131995,.364233,.329605,.856295,-.139338,.363856,.35359,.858857,-.146346,.363347,.37831,.862428,-.152994,.362807,.403722,.866203,-.159463,.361963,.429537,.871629,-.165623,.36112,.456,.877365,-.171649,.359917,.482773,.883744,-.177151,.35848,.509705,.890693,-.182381,.356523,.537215,.897278,-.186076,.3533,.565493,.903958,-.188602,.349095,.594293,.910908,-.190755,.344215,.623165,.918117,-.192063,.338606,.651573,.924644,-.192758,.331544,.679869,.931054,-.192238,.323163,.708668,.937303,-.190035,.313529,.737201,.943387,-.187162,.303152,.764977,.948494,-.183876,.29146,.792683,.952546,-.178901,.277917,.819228,.958077,-.173173,.264753,.846559,.962462,-.16645,.25002,.872962,.966569,-.159452,.234873,.898729,.969108,-.15074,.218752,.923126,.973072,-.141523,.202673,.947278,.975452,-.132075,.186326,.969938,.977784,-.121257,.169396,.991325,.97899,-.110182,.153044,1.01123,.979777,-.0989634,.136485,1.0299,.980865,-.0865894,.119343,1.04727,.982432,-.0746115,.102452,1.06341,.984935,-.0621822,.0852423,1.07834,.987776,-.0495694,.0678546,1.092,.99103,-.0372386,.0506917,1.1043,.99474,-.0244353,.0333316,1.11576,.997768,-.0121448,.0164348,1.12617,1.00003,31774e-8,-169504e-9,1.13598,.825551,-756799e-11,.378425,165099e-10,.82664,-190922e-9,.378923,416504e-9,.826323,-763495e-9,.378779,.0016656,.826359,-.00171789,.378795,.00374768,.82636,-.00305402,.378795,.00666259,.826368,-.00477185,.378798,.0104104,.826364,-.00687131,.378795,.0149912,.826368,-.00935232,.378795,.0204054,.826376,-.0122146,.378797,.0266532,.826399,-.0154581,.378803,.0337355,.82646,-.0190825,.378824,.0416537,.826525,-.0230873,.378846,.0504091,.826614,-.0274719,.378876,.0600032,.82674,-.0322355,.378917,.0704393,.826888,-.0373766,.378964,.0817195,.827078,-.0428936,.379024,.0938492,.827318,-.0487778,.379099,.106828,.82764,-.0549935,.379199,.120659,.827926,-.0611058,.379227,.13526,.828325,-.0675054,.379275,.150713,.828801,-.0743455,.379332,.167034,.8294,-.0815523,.379415,.184209,.830094,-.0890779,.379495,.202203,.8309,-.096736,.379555,.220945,.831943,-.104135,.379577,.240306,.833037,-.112106,.379604,.260317,.834278,-.120554,.379668,.2808,.836192,-.129128,.3799,.301654,.838671,-.137541,.380109,.323502,.840939,-.14523,.379809,.347176,.844575,-.15248,.379593,.371706,.848379,-.159607,.37909,.39688,.853616,-.166267,.378617,.422702,.858921,-.172698,.377746,.448919,.865324,-.178823,.376749,.475661,.872207,-.184542,.375363,.502599,.880018,-.189836,.373657,.529914,.88694,-.194294,.370673,.557683,.894779,-.197022,.36662,.586848,.902242,-.199108,.36138,.615831,.909914,-.200398,.355434,.644478,.917088,-.20094,.348173,.672905,.923888,-.200671,.339482,.701327,.930495,-.198773,.32956,.730101,.937247,-.195394,.318363,.758383,.943108,-.191956,.306323,.786539,.948296,-.187227,.292576,.813637,.953472,-.181165,.278234,.840793,.958485,-.174119,.263054,.867712,.962714,-.166564,.246756,.893635,.966185,-.158181,.229945,.919028,.970146,-.148275,.212633,.943413,.973491,-.138157,.195229,.966627,.975741,-.127574,.178048,.988817,.977238,-.11554,.160312,1.00924,.978411,-.10364,.142857,1.02845,.979811,-.0913122,.125317,1.04648,.98116,-.0782558,.107627,1.06284,.983543,-.0655957,.0895862,1.07798,.986789,-.0520411,.0713756,1.092,.990292,-.0389727,.053228,1.10484,.994187,-.025808,.0351945,1.11642,.997499,-.0126071,.0173198,1.12703,.999999,275604e-9,-148602e-9,1.13674,.81075,-78735e-10,.394456,161829e-10,.808692,-198293e-9,.393453,407564e-9,.80846,-792877e-9,.39334,.00162965,.808595,-.00178416,.393407,.00366711,.808597,-.00317182,.393408,.00651934,.808598,-.00495589,.393408,.0101866,.808591,-.00713627,.393403,.0146689,.808592,-.00971285,.393402,.0199667,.80861,-.0126855,.393407,.0260803,.808633,-.0160538,.393413,.0330107,.80868,-.0198175,.393429,.0407589,.808748,-.0239758,.393453,.0493264,.808854,-.0285286,.39349,.0587161,.808992,-.0334748,.39354,.0689304,.809141,-.0388116,.393588,.0799707,.809352,-.0445375,.39366,.0918432,.809608,-.0506427,.393742,.104549,.809915,-.0570708,.393834,.118085,.810253,-.0633526,.393885,.132377,.810687,-.0700966,.393953,.147537,.811233,-.0772274,.394047,.163543,.811865,-.0847629,.394148,.180394,.812648,-.0925663,.394265,.198051,.813583,-.100416,.394363,.216443,.814683,-.108119,.394402,.235502,.815948,-.11644,.394489,.255242,.817278,-.125036,.394542,.275441,.819605,-.133655,.39486,.296094,.822256,-.142682,.395248,.317309,.825349,-.150756,.395241,.340516,.829605,-.158392,.395285,.364819,.83391,-.165801,.394922,.389736,.839808,-.172677,.394691,.415409,.845708,-.179448,.394006,.441546,.853025,-.185746,.393279,.46832,.859666,-.191684,.391655,.495302,.86789,-.197146,.390068,.52262,.875845,-.201904,.38727,.550336,.882634,-.205023,.382688,.578825,.891076,-.207098,.377543,.608103,.900589,-.208474,.371752,.63723,.90791,-.209068,.364016,.665769,.915971,-.208655,.355593,.694428,.923455,-.20729,.345439,.723224,.931514,-.203821,.334099,.751925,.937885,-.19986,.321069,.780249,.943136,-.194993,.306571,.8077,.948818,-.189132,.291556,.83497,.954433,-.181617,.275745,.86188,.959078,-.173595,.258695,.888562,.962705,-.164855,.240825,.914008,.966753,-.155129,.22268,.939145,.970704,-.144241,.204542,.963393,.973367,-.133188,.185927,.985983,.975984,-.121146,.167743,1.00704,.976994,-.108366,.149218,1.02715,.978485,-.0956746,.13131,1.0455,.980074,-.0820733,.112513,1.06221,.98225,-.0684061,.0938323,1.07782,.98553,-.0549503,.0749508,1.09199,.989529,-.0407857,.055848,1.10508,.993536,-.0271978,.0368581,1.11684,.997247,-.0132716,.0181845,1.12789,1,431817e-9,-198809e-9,1.13792,.785886,-812608e-11,.405036,157669e-10,.790388,-205278e-9,.407355,398297e-9,.790145,-820824e-9,.407231,.00159263,.790135,-.00184681,.407226,.00358336,.790119,-.00328316,.407218,.00637039,.790126,-.00512988,.40722,.0099539,.79013,-.00738684,.407221,.0143339,.790135,-.0100538,.407221,.0195107,.790134,-.0131306,.407217,.0254848,.79016,-.0166169,.407224,.0322572,.790197,-.020512,.407236,.0398284,.790273,-.0248157,.407263,.0482014,.790381,-.029527,.407304,.0573777,.790521,-.0346446,.407355,.0673602,.790704,-.0401665,.40742,.0781522,.790925,-.0460896,.407499,.0897582,.791195,-.0524017,.407589,.10218,.791522,-.0590121,.407691,.11541,.791878,-.0654876,.407748,.12939,.792361,-.0725207,.407849,.144237,.792942,-.0799844,.407963,.159924,.79362,-.0877896,.408087,.176425,.794529,-.0958451,.408259,.193733,.795521,-.103827,.408362,.211756,.796778,-.111937,.408482,.230524,.798027,-.120521,.408547,.249967,.799813,-.129242,.408721,.269926,.802387,-.138048,.409148,.290338,.805279,-.147301,.409641,.311193,.809251,-.155895,.410154,.333611,.813733,-.163942,.410297,.357615,.819081,-.171666,.410373,.382339,.825427,-.178905,.410348,.407828,.83172,-.185812,.409486,.434034,.83877,-.192318,.408776,.460493,.845817,-.198249,.407176,.487346,.854664,-.204034,.405719,.514832,.863495,-.208908,.403282,.542401,.871883,-.212765,.399293,.570683,.88065,-.214911,.393803,.599947,.89004,-.216214,.387536,.62932,.898476,-.216745,.379846,.658319,.906738,-.216387,.370625,.687138,.914844,-.215053,.360139,.71601,.923877,-.212007,.348849,.745124,.931925,-.207481,.335639,.773366,.938054,-.202418,.320798,.801636,.943895,-.196507,.304772,.829055,.949468,-.189009,.288033,.856097,.955152,-.180539,.270532,.88301,.959403,-.171437,.251639,.909296,.963309,-.161661,.232563,.934868,.967399,-.150425,.213231,.959662,.972009,-.138659,.194247,.98302,.97433,-.126595,.174718,1.00517,.975823,-.113205,.155518,1.02566,.976371,-.0996096,.136709,1.04418,.978705,-.0860754,.117571,1.06146,.981477,-.0714438,.0980046,1.07777,.984263,-.0572304,.0782181,1.09214,.988423,-.0428875,.0584052,1.10553,.993,-.0282442,.038522,1.11758,.99704,-.0140183,.0190148,1.12864,.999913,369494e-9,-145203e-9,1.13901,.777662,-84153e-10,.423844,154403e-10,.770458,-211714e-9,.419915,38845e-8,.770716,-846888e-9,.420055,.00155386,.770982,-.00190567,.420202,.00349653,.770981,-.00338782,.420201,.00621606,.77098,-.00529338,.4202,.00971274,.770983,-.00762223,.4202,.0139867,.770985,-.0103741,.420198,.0190381,.770996,-.0135489,.4202,.0248677,.771029,-.0171461,.420212,.0314764,.771052,-.0211647,.420215,.0388648,.771131,-.0256048,.420245,.047036,.771235,-.0304647,.420284,.0559911,.771383,-.0357436,.420341,.0657346,.771591,-.0414392,.420423,.0762694,.771819,-.0475462,.420506,.0875984,.772123,-.0540506,.420617,.099727,.772464,-.060797,.42072,.112637,.772855,-.0675393,.420799,.126313,.773317,-.0748323,.420893,.140824,.773981,-.0825681,.421058,.15617,.774746,-.0906307,.421226,.172322,.77566,-.0988982,.421397,.189253,.776837,-.106994,.421569,.206912,.778097,-.115528,.421704,.225359,.779588,-.124317,.421849,.24447,.781574,-.133139,.422097,.264156,.784451,-.142179,.422615,.284318,.787682,-.15165,.423269,.304902,.792433,-.160771,.424396,.3265,.797359,-.169166,.424772,.35014,.803986,-.177149,.425475,.374768,.809504,-.184745,.424996,.399928,.815885,-.19173,.424247,.425796,.823513,-.198525,.423515,.452287,.832549,-.204709,.422787,.479321,.841653,-.210447,.421187,.506718,.850401,-.215501,.418519,.53432,.859854,-.219752,.414715,.56242,.869364,-.222305,.409462,.591558,.878837,-.223744,.402926,.621074,.888636,-.224065,.395043,.650538,.898132,-.223742,.38564,.679538,.907181,-.222308,.375378,.708674,.915621,-.219837,.363212,.737714,.9239,-.215233,.349313,.767014,.931644,-.209592,.334162,.795133,.938887,-.203644,.317943,.823228,.945282,-.196349,.300581,.850822,.950758,-.18742,.282195,.877594,.956146,-.177879,.262481,.904564,.960355,-.167643,.242487,.930741,.965256,-.156671,.222668,.955868,.968029,-.144123,.201907,.979869,.97251,-.131305,.18202,1.00291,.974925,-.118335,.161909,1.02392,.975402,-.103714,.142129,1.0433,.976987,-.089415,.122447,1.06089,.979677,-.0748858,.102248,1.07713,.983184,-.0596086,.0814851,1.09218,.987466,-.0447671,.0609484,1.10585,.992348,-.0295217,.0401835,1.11829,.996674,-.0143917,.0198163,1.12966,1.00003,321364e-9,-149983e-9,1.1402,.757901,-869074e-11,.436176,151011e-10,.751195,-217848e-9,.432317,378533e-9,.751178,-871373e-9,.432307,.0015141,.751195,-.00196061,.432317,.0034068,.751198,-.00348552,.432318,.00605659,.751195,-.00544599,.432315,.00946353,.751207,-.00784203,.43232,.013628,.751213,-.0106732,.43232,.0185499,.751221,-.0139393,.432319,.0242302,.751244,-.0176398,.432325,.0306694,.7513,-.0217743,.432348,.0378698,.751358,-.0263412,.432367,.0458321,.751458,-.0313396,.432404,.0545587,.751608,-.0367682,.432464,.0640543,.7518,-.0426246,.43254,.0743222,.752065,-.0489031,.432645,.0853668,.752376,-.0555828,.432762,.0971911,.752715,-.0623861,.432859,.109768,.753137,-.069415,.432958,.123126,.753676,-.0770039,.433099,.137308,.754345,-.084971,.433272,.15229,.755235,-.0932681,.433504,.168075,.756186,-.10171,.433693,.184625,.757363,-.110019,.433857,.201897,.75884,-.11887,.434102,.220014,.760467,-.127881,.434306,.238778,.762969,-.136766,.434751,.258172,.765823,-.14612,.43529,.278062,.769676,-.15566,.436236,.298437,.774909,-.165177,.437754,.319532,.77994,-.17402,.438343,.342505,.785757,-.182201,.438609,.366693,.792487,-.190104,.438762,.391668,.80038,-.197438,.438795,.417494,.808494,-.204365,.438226,.443933,.817695,-.210714,.437283,.470929,.828111,-.216651,.436087,.498569,.837901,-.221804,.433717,.526165,.847813,-.226318,.430133,.554155,.858314,-.229297,.425213,.582822,.868891,-.230999,.418576,.612847,.878941,-.231155,.410405,.642445,.888809,-.230935,.400544,.672024,.898089,-.229343,.389613,.701366,.908081,-.226886,.377197,.730763,.916819,-.222676,.363397,.759642,.924968,-.216835,.347437,.788775,.932906,-.210245,.32995,.817135,.940025,-.202992,.312262,.844912,.946101,-.19436,.293313,.872164,.952835,-.184125,.273638,.899443,.957347,-.173657,.252385,.926389,.961434,-.162204,.231038,.951947,.965522,-.14979,.209834,.976751,.969412,-.136307,.188821,1.00022,.973902,-.122527,.168013,1.02229,.974045,-.108213,.147634,1.04199,.975775,-.0927397,.12705,1.06019,.978383,-.0778212,.106309,1.07711,.98211,-.0621216,.0849279,1.09245,.986517,-.0463847,.0633519,1.10651,.991696,-.0309353,.0419698,1.11903,.996349,-.0150914,.0206272,1.13073,1.00003,442449e-9,-231396e-9,1.14146,.727498,-885074e-11,.441528,145832e-10,.730897,-223525e-9,.443589,368298e-9,.730796,-893996e-9,.443528,.00147303,.730805,-.00201149,.443533,.00331433,.730814,-.00357596,.443538,.00589222,.730815,-.00558734,.443538,.00920678,.730822,-.00804544,.44354,.0132582,.730836,-.0109501,.443545,.0180468,.730848,-.0143008,.443546,.0235732,.730871,-.0180969,.443552,.0298382,.730915,-.022338,.443567,.0368438,.730982,-.0270225,.443591,.044591,.731076,-.0321491,.443627,.0530831,.731245,-.0377166,.443699,.0623243,.73144,-.0437216,.443777,.0723181,.7317,-.0501576,.443881,.0830691,.732034,-.0569942,.444014,.0945809,.732388,-.0638756,.444113,.106825,.732853,-.071203,.444247,.119859,.733473,-.0790076,.444442,.13369,.734195,-.0871937,.444645,.148304,.735069,-.095696,.444877,.163702,.736169,-.10426,.445133,.179861,.73747,-.112853,.44537,.196778,.738991,-.12199,.445651,.214496,.740865,-.131153,.445958,.232913,.743637,-.140245,.446548,.251977,.746797,-.149722,.447246,.271551,.751517,-.159341,.448656,.291774,.756156,-.169106,.449866,.312455,.761519,-.178436,.450919,.334552,.768295,-.186904,.451776,.358491,.776613,-.195117,.452832,.383446,.783966,-.202695,.45249,.408945,.793542,-.20985,.452587,.435364,.803192,-.216403,.451852,.462336,.813892,-.22251,.450708,.48987,.824968,-.227676,.4486,.517697,.835859,-.232443,.445156,.545975,.846825,-.235775,.440351,.574483,.858085,-.237897,.433641,.604246,.868825,-.238074,.425354,.634101,.879638,-.237661,.415383,.664201,.889966,-.236186,.404136,.693918,.899479,-.233599,.390917,.723481,.908769,-.229737,.376352,.75258,.917966,-.223836,.360372,.781764,.926304,-.217067,.342551,.811139,.934626,-.209309,.324238,.839585,.941841,-.20071,.304484,.867044,.94789,-.190602,.283607,.894579,.954196,-.179253,.262205,.921743,.958383,-.167646,.239847,.948026,.963119,-.155073,.218078,.973296,.966941,-.141426,.195899,.998135,.970836,-.126849,.174121,1.02021,.973301,-.112296,.153052,1.04085,.97448,-.0964965,.131733,1.05946,.977045,-.080489,.10997,1.07693,.980751,-.064844,.0881657,1.09254,.985475,-.0481938,.0657987,1.10697,.991089,-.0319185,.0435215,1.12004,.996122,-.0158088,.0214779,1.13173,1.00001,372455e-9,-200295e-9,1.14291,.708622,-907597e-11,.45304,141962e-10,.711162,-228911e-9,.454662,358052e-9,.709812,-914446e-9,.453797,.00143034,.709865,-.00205819,.453834,.00321935,.709864,-.00365894,.453833,.00572331,.709855,-.00571692,.453826,.00894278,.709862,-.00823201,.453828,.012878,.709875,-.011204,.453832,.0175295,.709896,-.0146323,.453839,.0228978,.709925,-.0185163,.453847,.0289839,.709974,-.0228551,.453866,.0357894,.710045,-.0276473,.453892,.0433161,.710133,-.032891,.453924,.0515665,.710292,-.0385851,.453992,.0605458,.710485,-.0447254,.45407,.0702574,.710769,-.0513051,.454192,.0807077,.711106,-.0582733,.454329,.091896,.711516,-.0652866,.45446,.103814,.712071,-.0728426,.454653,.116508,.712676,-.0808307,.45484,.129968,.713476,-.0892216,.455096,.144206,.714377,-.0979047,.455346,.159212,.715579,-.106531,.455647,.174973,.716977,-.115492,.455961,.191504,.71862,-.124821,.456315,.208835,.72084,-.134079,.4568,.226869,.723786,-.143427,.457521,.245582,.727464,-.153061,.458475,.264957,.732771,-.162768,.460239,.284948,.736515,-.172627,.460899,.30522,.743519,-.182487,.463225,.326717,.750041,-.191295,.464027,.350113,.758589,-.199746,.465227,.374782,.767703,-.207584,.465877,.400226,.777484,-.214973,.465996,.426442,.788792,-.221796,.466019,.453688,.800194,-.228038,.465083,.481246,.811234,-.233346,.462506,.509086,.822859,-.238073,.459257,.537338,.835082,-.241764,.454863,.566108,.846332,-.244241,.448163,.595126,.858355,-.244736,.439709,.625574,.87034,-.244278,.429837,.65617,.881027,-.24255,.418002,.686029,.891007,-.239912,.404325,.716039,.900874,-.236133,.389222,.745518,.911072,-.230672,.373269,.775026,.920359,-.22356,.355083,.804521,.928604,-.215591,.335533,.834045,.937175,-.206503,.315278,.861612,.942825,-.196684,.293653,.889131,.949805,-.185116,.271503,.916853,.955535,-.172703,.248821,.943541,.959843,-.159978,.225591,.970132,.964393,-.146375,.202719,.994709,.968008,-.131269,.179928,1.0186,.971013,-.11569,.158007,1.03928,.973334,-.1003,.13624,1.05887,.975775,-.0833352,.1138,1.07652,.979579,-.0668981,.0913141,1.09297,.984323,-.0500902,.0683051,1.10734,.990351,-.0332377,.0451771,1.12084,.995823,-.0161491,.0221705,1.13296,1.0001,234083e-9,-108712e-9,1.14441,.683895,-924677e-11,.46015,137429e-10,.68833,-233383e-9,.463134,346865e-9,.688368,-933547e-9,.463159,.00138748,.688367,-.00210049,.463159,.00312187,.688369,-.00373415,.463159,.00555004,.688377,-.00583449,.463163,.00867216,.688386,-.00840128,.463166,.0124884,.688398,-.0114343,.463169,.0169993,.688418,-.0149329,.463175,.0222054,.688453,-.0188964,.463188,.028108,.688515,-.0233239,.463214,.0347085,.68857,-.0282136,.463231,.0420091,.688679,-.033564,.463276,.0500132,.688854,-.0393733,.463356,.0587255,.689038,-.0456354,.46343,.0681476,.689321,-.0523433,.463553,.0782897,.689662,-.059412,.463693,.0891501,.690188,-.0665736,.4639,.100735,.690755,-.0743106,.464107,.113074,.691405,-.0824722,.464329,.126161,.692198,-.0910484,.464585,.140007,.693196,-.0998778,.464893,.154612,.69454,-.108651,.465285,.169984,.695921,-.117855,.465596,.186106,.697749,-.12734,.466056,.203034,.700375,-.136714,.466771,.220703,.703395,-.146386,.467579,.239062,.707904,-.156096,.469067,.258188,.711673,-.165904,.469851,.277759,.717489,-.175812,.471815,.297935,.724051,-.185931,.47389,.318916,.731965,-.195238,.47587,.341591,.741151,-.204021,.477523,.366062,.751416,-.212113,.478881,.391396,.761848,-.21979,.479226,.417599,.771886,-.2267,.478495,.444401,.783998,-.232991,.477622,.472084,.796523,-.238645,.475833,.500193,.808851,-.243396,.472568,.52865,.821191,-.247226,.467857,.557362,.834261,-.250102,.461871,.586768,.846762,-.251056,.453543,.617085,.859867,-.250604,.443494,.647659,.871948,-.248783,.431711,.678119,.882967,-.245855,.417911,.708399,.892826,-.242168,.401993,.738256,.90332,-.237062,.385371,.767999,.913633,-.22997,.366837,.798191,.922774,-.221687,.346372,.827756,.931371,-.212345,.325682,.856425,.938929,-.20206,.303665,.884299,.944821,-.190981,.280786,.912023,.951792,-.178065,.2573,.939669,.957712,-.164634,.233448,.96655,.961912,-.150863,.209504,.992366,.966382,-.13577,.18597,1.01633,.969588,-.119593,.162905,1.03843,.971777,-.103203,.14053,1.05841,.97433,-.0865888,.117909,1.07632,.978686,-.0690829,.0944101,1.09326,.983281,-.0516568,.0705671,1.10796,.989562,-.034558,.0468592,1.12182,.995465,-.0167808,.0229846,1.1342,.999991,373016e-9,-235606e-9,1.1459,.662251,-939016e-11,.468575,132714e-10,.666634,-237624e-9,.471675,335842e-9,.666411,-950385e-9,.471516,.00134321,.666399,-.00213833,.471509,.00302221,.666386,-.0038014,.471499,.00537283,.666405,-.00593958,.471511,.00839533,.666406,-.00855253,.471508,.0120898,.666428,-.0116401,.471519,.0164569,.666444,-.0152015,.471522,.0214971,.66649,-.0192362,.471543,.027212,.666537,-.0237428,.471558,.033603,.666617,-.0287198,.471591,.0406728,.666718,-.0341647,.471631,.0484238,.666889,-.0400759,.47171,.0568621,.667104,-.0464479,.471805,.0659915,.667374,-.0532677,.471923,.0758178,.667772,-.0603805,.472098,.0863425,.668371,-.0677392,.472363,.0975917,.668971,-.0756028,.472596,.109567,.669696,-.0839293,.472869,.122272,.670481,-.0926683,.473126,.135718,.6715,-.1016,.473442,.149914,.672911,-.110566,.47389,.164882,.674512,-.119984,.474354,.180602,.67651,-.129574,.474922,.19711,.679292,-.139106,.475764,.214371,.682798,-.148993,.476886,.232405,.686955,-.158737,.478179,.251153,.691406,-.168754,.479432,.270436,.697438,-.178703,.481481,.290374,.704761,-.188955,.484143,.311044,.713599,-.198814,.487007,.333003,.723194,-.207869,.488962,.357144,.732601,-.216189,.489815,.382169,.744193,-.22398,.490888,.408227,.754907,-.231156,.490355,.434928,.767403,-.23747,.489548,.462599,.78107,-.243503,.488274,.490908,.793893,-.248114,.484843,.519421,.807296,-.25222,.4803,.548561,.820529,-.255265,.474097,.577772,.833716,-.256741,.466041,.607782,.848403,-.25637,.456547,.638807,.860755,-.254804,.443946,.670058,.874012,-.251834,.430852,.700749,.885619,-.247867,.414903,.731446,.896069,-.242634,.397276,.761191,.906266,-.236093,.378535,.791053,.916759,-.227543,.358038,.821298,.92523,-.21783,.335705,.850747,.93436,-.207534,.313797,.879258,.941631,-.195983,.289671,.907734,.947564,-.183567,.265319,.935206,.953681,-.169345,.240815,.962739,.960008,-.154909,.216119,.989227,.964145,-.140161,.192096,1.01465,.968171,-.123411,.167855,1.03737,.969859,-.106525,.144817,1.05767,.972666,-.0891023,.12149,1.0761,.977055,-.0718094,.0975306,1.09336,.982527,-.0534213,.0730217,1.10878,.989001,-.0355579,.0483366,1.12285,.99512,-.0176383,.023938,1.13548,1.00007,368831e-9,-211581e-9,1.14744,.651047,-960845e-11,.484101,12922e-9,.644145,-241347e-9,.478968,324578e-9,.64396,-965142e-9,.478831,.00129798,.64396,-.00217154,.47883,.00292046,.643968,-.00386049,.478835,.00519202,.643974,-.00603186,.478838,.0081128,.643977,-.0086854,.478836,.011683,.643982,-.0118207,.478834,.0159031,.644024,-.0154374,.478856,.0207743,.644059,-.0195343,.478868,.0262975,.644122,-.0241103,.478896,.0324747,.644207,-.0291638,.478933,.039309,.64432,-.0346919,.478981,.0468029,.644481,-.0406919,.479053,.0549614,.644722,-.047159,.479169,.0637909,.645013,-.0540748,.479302,.0732974,.645503,-.0612001,.479541,.0834898,.646117,-.0687303,.479829,.0943873,.646707,-.0767846,.480061,.105991,.647431,-.0852465,.480343,.11831,.64831,-.0940719,.48066,.131348,.649486,-.103056,.481083,.14514,.650864,-.112261,.481528,.159676,.652604,-.121852,.482102,.174979,.654825,-.131505,.482813,.191079,.657876,-.141189,.483876,.207927,.661339,-.151239,.48499,.225586,.665463,-.161091,.486279,.243947,.670542,-.171235,.487968,.262957,.677361,-.181347,.49053,.282781,.685672,-.191679,.493862,.303311,.694551,-.201781,.49699,.324607,.703753,-.211164,.498884,.347916,.713703,-.219675,.500086,.372628,.725911,-.227836,.501554,.398694,.73862,-.23533,.502193,.425529,.752118,-.241786,.501811,.453209,.76579,-.247865,.500185,.481381,.779568,-.252696,.497159,.51011,.793991,-.256802,.492765,.539322,.808182,-.259942,.486827,.569078,.821698,-.261703,.478386,.598818,.836009,-.262006,.468772,.629762,.849824,-.260333,.456352,.661366,.863888,-.257398,.442533,.69295,.876585,-.253264,.426573,.723608,.888665,-.248026,.408964,.754378,.899537,-.241487,.389677,.784761,.9094,-.233463,.368516,.814688,.920166,-.223397,.346624,.845009,.928899,-.21255,.322717,.874431,.937156,-.200869,.298698,.902922,.943861,-.188387,.273491,.931356,.949557,-.174341,.247866,.958854,.955862,-.158994,.222496,.986098,.961721,-.143664,.197522,1.01229,.965976,-.127412,.17302,1.03571,.968652,-.109798,.148954,1.05699,.971084,-.0916787,.125044,1.07587,.975584,-.0739634,.100577,1.09372,.98122,-.055322,.0753666,1.10948,.988253,-.0366825,.0498899,1.12394,.99482,-.0180389,.024611,1.13694,1.00001,229839e-9,-188283e-9,1.14919,.613867,-964198e-11,.479449,123452e-10,.621485,-244534e-9,.485399,313091e-9,.621429,-978202e-9,.485353,.00125245,.62112,-.00220004,.485114,.00281687,.621119,-.0039111,.485112,.00500783,.621122,-.00611091,.485112,.00782498,.621133,-.00879922,.485117,.0112687,.621152,-.0119756,.485125,.0153394,.621183,-.0156396,.485139,.0200382,.621227,-.0197898,.485158,.0253663,.621298,-.0244253,.485192,.0313261,.621388,-.0295441,.485233,.0379204,.621507,-.0351432,.485286,.0451523,.621693,-.0412198,.485378,.0530277,.621933,-.0477673,.485495,.0615522,.622232,-.0547574,.485635,.0707316,.622809,-.0619417,.485943,.0805883,.623407,-.069625,.486232,.0911267,.62406,-.077796,.486516,.102354,.624835,-.0863731,.486838,.114279,.625758,-.095251,.487188,.126902,.627043,-.104299,.487695,.140285,.628438,-.113724,.488163,.154397,.630325,-.123417,.488858,.169267,.632801,-.133137,.489754,.184941,.635784,-.143052,.490815,.20136,.639406,-.153132,.492048,.218643,.643872,-.163143,.49363,.236615,.6499,-.17333,.496009,.255449,.657201,-.183622,.498994,.275006,.666221,-.194019,.502888,.295354,.674419,-.204192,.505459,.316244,.683729,-.21406,.507771,.33849,.695584,-.222854,.510245,.363166,.708583,-.231315,.512293,.389071,.721233,-.238911,.512747,.415737,.735134,-.245657,.512482,.443331,.750179,-.251879,.511526,.471891,.765073,-.256911,.508935,.500892,.779794,-.261144,.504341,.530294,.794801,-.264316,.498515,.560144,.810339,-.266276,.491015,.590213,.824818,-.266981,.481126,.620865,.839375,-.265778,.468685,.652687,.853043,-.262748,.453925,.684759,.867335,-.258474,.437912,.716209,.88037,-.253187,.419648,.747508,.891711,-.246476,.39982,.77797,.902896,-.238735,.37879,.808586,.913601,-.22885,.355891,.838843,.923019,-.217656,.331773,.869014,.933432,-.205539,.307356,.898512,.939691,-.192595,.281321,.9269,.946938,-.178945,.255441,.955297,.952372,-.163587,.229013,.983231,.95909,-.147214,.203179,1.00971,.963675,-.13064,.17792,1.03438,.968247,-.113121,.152898,1.05625,.97001,-.0945824,.128712,1.07598,.974458,-.0755648,.103349,1.094,.980168,-.0571998,.0776731,1.1104,.987295,-.0377994,.0514445,1.12491,.994432,-.0186417,.025429,1.13851,.999975,542714e-9,-282356e-9,1.15108,.592656,-980249e-11,.486018,119532e-10,.598467,-247275e-9,.490781,301531e-9,.597934,-988317e-9,.490343,.00120517,.597903,-.00222366,.490319,.0027116,.597913,-.00395315,.490327,.00482077,.597919,-.00617653,.490329,.00753264,.597936,-.00889375,.490339,.0108478,.597956,-.0121043,.490347,.0147668,.597992,-.0158073,.490365,.0192905,.598032,-.0200017,.490382,.0244204,.598109,-.0246865,.49042,.0301593,.598215,-.0298594,.490474,.03651,.59833,-.0355167,.490524,.0434757,.598525,-.0416559,.490624,.0510629,.598778,-.0482692,.490753,.0592781,.599135,-.0553114,.49094,.0681304,.599802,-.062542,.491328,.0776467,.600361,-.0703638,.491598,.0878184,.60101,-.0786256,.491882,.0986573,.601811,-.0872962,.492232,.11018,.602861,-.0962284,.492684,.1224,.604167,-.10538,.493213,.135354,.605693,-.114896,.493799,.149034,.607682,-.124654,.494576,.163469,.610672,-.13456,.4959,.178747,.613313,-.144581,.496713,.194723,.617603,-.154703,.498499,.211617,.622174,-.16489,.500188,.229183,.628855,-.175164,.503072,.247786,.636963,-.185565,.506798,.267116,.644866,-.195911,.509719,.28702,.653741,-.206104,.512776,.307763,.664942,-.216447,.516812,.329631,.67633,-.22552,.519181,.353515,.690012,-.234316,.521681,.379226,.704243,-.242032,.523129,.405901,.719396,-.249172,.523768,.433585,.734471,-.255543,.522541,.462085,.750539,-.260697,.520217,.491233,.766365,-.26501,.516293,.521094,.781677,-.268409,.509708,.551014,.797132,-.270399,.501944,.581463,.812655,-.271247,.492025,.612402,.828592,-.270708,.480424,.643798,.844044,-.268085,.465955,.67682,.857305,-.263459,.448425,.708496,.87114,-.258151,.430243,.74046,.884936,-.251171,.410578,.771583,.895772,-.243305,.38862,.802234,.906961,-.234037,.365214,.833179,.917775,-.222714,.34116,.86353,.927883,-.210175,.31572,.893557,.936617,-.196925,.289159,.922976,.943384,-.182788,.261996,.951606,.949713,-.167965,.235324,.979958,.955818,-.151109,.208408,1.00765,.961344,-.133834,.182591,1.03329,.965469,-.115987,.156958,1.0557,.968693,-.09746,.132239,1.07583,.973165,-.0778514,.106195,1.09451,.979387,-.0585067,.0797669,1.11137,.98671,-.0390409,.0530263,1.12643,.994093,-.019408,.0263163,1.14016,1.00002,540029e-9,-194487e-9,1.15299,.574483,-989066e-11,.494533,114896e-10,.574478,-249127e-9,.494528,289403e-9,.574607,-996811e-9,.494637,.00115797,.574396,-.00224241,.494458,.00260498,.574377,-.00398632,.49444,.00463102,.574386,-.00622836,.494445,.00723623,.574401,-.0089683,.494453,.010421,.574419,-.0122056,.49446,.0141859,.574459,-.0159396,.494481,.0185322,.574525,-.0201692,.49452,.0234617,.574587,-.0248924,.494547,.0289762,.574697,-.0301074,.494604,.0350797,.574853,-.0358114,.494688,.0417767,.575027,-.041999,.494772,.0490718,.575294,-.0486618,.494915,.0569728,.575733,-.0557148,.495173,.0654955,.576356,-.0630489,.495537,.0746612,.576944,-.0709285,.495836,.0844615,.57765,-.0792723,.496177,.0949142,.578491,-.0880167,.496563,.10603,.579639,-.0969462,.497096,.117841,.580989,-.10622,.497684,.130367,.582587,-.115861,.498337,.143609,.584951,-.125605,.499414,.157625,.587602,-.135608,.500518,.172413,.59076,-.145742,.501767,.187999,.594992,-.155934,.503542,.20445,.600656,-.166303,.506135,.221764,.607816,-.176681,.509542,.24002,.61522,-.187071,.51263,.258992,.623702,-.197465,.516021,.278773,.634192,-.207816,.520422,.299377,.644936,-.218183,.524073,.320802,.657888,-.2278,.528049,.34384,.670666,-.236747,.52986,.36916,.685626,-.24484,.531892,.395867,.701304,-.252071,.532727,.423488,.717727,-.258714,.532146,.452201,.733914,-.264211,.529883,.481579,.750529,-.26859,.5259,.511558,.76747,-.272046,.51999,.542042,.785189,-.274225,.513083,.572799,.800954,-.275189,.502936,.603816,.816962,-.274946,.490921,.635461,.83336,-.272695,.47684,.6676,.848143,-.268223,.459405,.70051,.861818,-.262768,.440319,.732902,.876828,-.255872,.420123,.765084,.889312,-.247703,.398379,.796391,.900412,-.238381,.374496,.827333,.912251,-.227783,.349874,.858385,.921792,-.214832,.323181,.888652,.931273,-.200949,.296624,.917763,.940295,-.186537,.269211,.947878,.946812,-.171538,.241447,.977016,.953588,-.155254,.213829,1.00501,.958841,-.137156,.186807,1.03179,.963746,-.118699,.160706,1.05502,.966468,-.0998358,.135504,1.07568,.971178,-.0805186,.109131,1.09479,.97831,-.0599348,.0818293,1.1123,.985886,-.0399661,.0545872,1.12771,.994021,-.0198682,.0269405,1.14186,1.00009,271022e-9,-12989e-8,1.15514,.538716,-990918e-11,.486732,109675e-10,.550656,-250642e-9,.497518,277412e-9,.55057,-.00100265,.497441,.00110974,.550903,-.00225672,.497733,.00249779,.550568,-.00401046,.497438,.00443906,.550574,-.00626613,.49744,.00693637,.550591,-.0090226,.497449,.00998921,.550623,-.0122795,.497469,.0135984,.550667,-.0160361,.497495,.0177654,.550724,-.0202908,.497526,.0224915,.550792,-.0250421,.497557,.0277795,.550918,-.0302878,.49763,.0336334,.551058,-.0360241,.497701,.0400573,.551276,-.0422473,.497824,.0470585,.551551,-.0489441,.497977,.0546433,.552074,-.0559596,.498312,.0628367,.552681,-.0633978,.498679,.071646,.553324,-.0713176,.499031,.0810746,.554011,-.0797268,.499365,.091129,.55488,-.0885238,.499779,.101837,.556171,-.0974417,.500444,.113239,.557498,-.106841,.501025,.125316,.559299,-.116533,.501864,.138128,.561647,-.126298,.502967,.151695,.564347,-.136388,.504129,.16604,.567863,-.146576,.505713,.181207,.572569,-.156832,.507953,.197259,.578919,-.167323,.511186,.214258,.585387,-.177712,.514042,.232038,.593134,-.188184,.517484,.250733,.603295,-.198717,.522345,.270454,.613854,-.209177,.526751,.290807,.626092,-.219644,.531595,.312202,.637868,-.229494,.534721,.334435,.652458,-.238718,.538304,.359184,.666985,-.247061,.539875,.385637,.683301,-.254652,.541042,.41328,.69998,-.261376,.540735,.441903,.717824,-.267085,.539139,.471609,.734617,-.271465,.534958,.501446,.753663,-.27528,.53032,.532571,.770512,-.277617,.522134,.563641,.787356,-.278525,.51206,.595067,.806252,-.278512,.50119,.627226,.822061,-.277023,.486791,.659402,.838959,-.273175,.470467,.692874,.85379,-.267238,.450688,.725702,.868268,-.260327,.429741,.75832,.881994,-.251946,.407223,.790189,.893885,-.242432,.383214,.821625,.905118,-.231904,.357297,.853011,.916045,-.219545,.330733,.883773,.927614,-.205378,.303916,.914435,.936005,-.190388,.275941,.944502,.944533,-.1749,.247493,.974439,.950758,-.158588,.218996,1.00286,.957078,-.141027,.191559,1.0304,.962448,-.121507,.164457,1.05466,.964993,-.102068,.138636,1.0761,.970017,-.0822598,.111861,1.09541,.97661,-.062033,.0843438,1.11317,.985073,-.0409832,.0558496,1.12911,.993515,-.020146,.0275331,1.1438,1.00006,27329e-8,-107883e-9,1.15736,.525324,-999341e-11,.498153,105385e-10,.526513,-251605e-9,.499277,265329e-9,.526517,-.00100641,.499282,.0010613,.526588,-.00226466,.499337,.00238823,.526539,-.0040255,.499302,.00424535,.526547,-.00628954,.499306,.00663364,.526561,-.00905628,.499313,.00955337,.526593,-.0123253,.499334,.0130054,.526642,-.0160957,.499365,.0169911,.5267,-.0203661,.499396,.0215122,.526792,-.0251347,.499451,.0265718,.526904,-.0303985,.499511,.0321732,.527079,-.0361554,.499617,.0383231,.527285,-.0423982,.499731,.045026,.527602,-.0491121,.499924,.0522936,.528166,-.0561127,.500306,.0601528,.52879,-.0635988,.5007,.0686059,.529421,-.071581,.501048,.0776518,.530144,-.0799854,.501421,.0873148,.531062,-.0888032,.501884,.0976084,.532374,-.0977643,.50259,.108588,.533828,-.107197,.50329,.120234,.53581,-.116887,.504312,.132602,.538063,-.126755,.505365,.145721,.5409,-.136819,.506668,.159617,.544882,-.147117,.508731,.174369,.550238,-.157446,.511601,.190028,.556038,-.167988,.514431,.206587,.563031,-.178364,.517808,.224046,.571543,-.189007,.521937,.242503,.582255,-.199546,.527415,.261977,.59272,-.210084,.531682,.282162,.605648,-.220448,.537123,.303426,.61785,-.230593,.540664,.325323,.632223,-.240238,.544467,.348993,.648819,-.24887,.547594,.375462,.665825,-.256657,.54912,.403024,.683389,-.263711,.549294,.431773,.701495,-.269666,.547649,.461494,.719197,-.274169,.543786,.491623,.737906,-.278124,.538644,.522994,.756652,-.280632,.531057,.554775,.775279,-.281741,.521972,.586441,.792688,-.281652,.509613,.618596,.811894,-.280345,.496497,.651462,.827938,-.277128,.47968,.684023,.844837,-.271646,.460688,.718024,.859239,-.264397,.438872,.751207,.874088,-.256144,.41577,.784232,.887693,-.246311,.391369,.816191,.899402,-.235497,.365872,.847828,.910973,-.223631,.338618,.87934,.92204,-.209874,.310803,.910325,.930987,-.194265,.281802,.940695,.94,-.178125,.252836,.970958,.948018,-.161479,.224239,1.00078,.955141,-.144038,.195857,1.0288,.960513,-.124915,.168487,1.05371,.963964,-.104284,.141495,1.07596,.968713,-.0838732,.114437,1.09628,.975524,-.0635579,.0863105,1.11448,.98431,-.042291,.0574774,1.13069,.992916,-.0209131,.0284343,1.14568,.999926,743097e-9,-379265e-9,1.15955,.501042,-998428e-11,.498726,100306e-10,.502992,-252112e-9,.500665,253283e-9,.502417,-.00100791,.500092,.00101259,.502965,-.00226919,.500621,.00227978,.502318,-.00403109,.499994,.00405011,.502333,-.00629832,.500005,.00632868,.502362,-.00906907,.500027,.00911446,.502369,-.0123423,.500023,.0124078,.50243,-.0161178,.500066,.016211,.502493,-.0203937,.500103,.0205256,.502592,-.0251684,.500166,.0253548,.502707,-.0304389,.50023,.0307029,.502881,-.0362015,.500335,.0365753,.503124,-.0424507,.500488,.0429798,.503443,-.0491582,.500686,.0499268,.504083,-.0561476,.501155,.0574541,.504668,-.0636846,.501524,.0655408,.505319,-.0716834,.501904,.0742072,.50609,-.0800925,.502321,.0834699,.507122,-.0888425,.502896,.0933603,.508414,-.097855,.503603,.10391,.509955,-.107304,.504416,.115113,.512061,-.116921,.505565,.127054,.514419,-.12689,.506732,.139709,.517529,-.136934,.508338,.153173,.522085,-.147327,.510987,.167528,.526986,-.157612,.513527,.182708,.533122,-.168213,.516717,.198881,.540807,-.178688,.520832,.215986,.550687,-.189511,.52632,.234335,.560567,-.199998,.531009,.253375,.571698,-.210652,.535839,.273499,.584364,-.220917,.541091,.294355,.599066,-.23137,.546875,.316525,.614148,-.241206,.551306,.339671,.631157,-.250379,.555187,.36531,.647919,-.258397,.556595,.392767,.666112,-.265528,.556949,.421397,.686158,-.271827,.556617,.451433,.704838,-.27674,.552975,.482131,.723957,-.280733,.547814,.513458,.74262,-.283359,.53997,.545446,.762009,-.284541,.530422,.57775,.781314,-.284507,.518546,.610434,.799116,-.283309,.504178,.643178,.817604,-.280378,.48843,.676248,.83459,-.275619,.469457,.709698,.850974,-.26856,.447698,.744245,.866747,-.260094,.424791,.777695,.881412,-.249929,.399913,.810392,.8936,-.239137,.37308,.842872,.905943,-.226818,.345705,.874677,.916408,-.213699,.31706,.906257,.927215,-.198428,.288444,.936881,.935625,-.181643,.258329,.96795,.944076,-.164386,.228488,.998216,.951229,-.146339,.199763,1.02689,.958793,-.127709,.172153,1.0535,.963219,-.107244,.144989,1.07646,.967562,-.0857764,.11685,1.09675,.974866,-.0645377,.0880571,1.11576,.983353,-.0431732,.0587352,1.13227,.992503,-.0218356,.0294181,1.1478,1.00003,605203e-9,-231013e-9,1.16207,.482935,-101177e-10,.504695,968142e-11,.477554,-251521e-9,.499071,240676e-9,.477904,-.00100683,.499436,96342e-8,.478368,-.00226636,.499899,.0021687,.477977,-.00402719,.499513,.00385384,.477993,-.00629226,.499525,.0060221,.478011,-.00906011,.499536,.00867289,.478051,-.0123305,.499566,.0118074,.478089,-.016102,.499587,.0154269,.478171,-.0203736,.499645,.0195341,.478254,-.025143,.499692,.0241318,.47839,-.0304071,.499779,.0292247,.478588,-.0361631,.499911,.0348196,.478812,-.0424023,.500046,.0409231,.479208,-.0490724,.500326,.047552,.479841,-.0560722,.500805,.0547377,.480392,-.0636125,.501152,.0624607,.481068,-.0716134,.501561,.0707473,.481898,-.0800062,.502054,.0796118,.483022,-.0886568,.502728,.0890974,.484332,-.0977553,.503479,.0992099,.486126,-.107173,.504546,.10999,.488066,-.11677,.50557,.121476,.490521,-.126725,.506849,.133672,.494232,-.136793,.50911,.146731,.498302,-.147116,.511345,.160577,.503565,-.157446,.514344,.175335,.510902,-.168121,.518824,.191207,.519263,-.178799,.523666,.208058,.528204,-.189407,.528296,.225875,.538854,-.200145,.533724,.244782,.551278,-.210701,.539833,.264753,.565222,-.221303,.546131,.285745,.579403,-.231688,.551496,.307592,.595469,-.241718,.556809,.330582,.610929,-.250992,.559641,.354995,.629433,-.259602,.562379,.382471,.648504,-.267038,.563676,.411126,.66756,-.273388,.562092,.440924,.689143,-.278788,.560807,.472118,.709056,-.282783,.555701,.503774,.729855,-.285836,.548698,.536364,.748954,-.287078,.538544,.56895,.768373,-.287133,.526711,.601991,.78827,-.285839,.512511,.635403,.807465,-.283238,.496323,.668797,.825194,-.27906,.477638,.702584,.842203,-.272286,.456253,.736393,.857749,-.263854,.432412,.77096,.874799,-.253943,.407806,.80489,.887497,-.24237,.38033,.83771,.89966,-.230278,.352446,.870376,.911753,-.21646,.323268,.902256,.923011,-.202071,.294314,.933306,.932375,-.185519,.264104,.965177,.940537,-.167604,.234035,.996303,.948904,-.149068,.20412,1.0261,.955263,-.129539,.175431,1.05304,.960303,-.109932,.148116,1.07617,.965512,-.0880572,.119693,1.09742,.973466,-.0660548,.0901619,1.11721,.98284,-.0439228,.0599875,1.13436,.992216,-.0219588,.0298975,1.15006,.999946,119402e-9,-208547e-10,1.16471,.447827,-100414e-10,.491543,914833e-11,.454778,-251257e-9,.499172,22891e-8,.453519,-.00100342,.497787,914184e-9,.45357,-.00225776,.497847,.00205701,.453578,-.00401371,.497855,.00365705,.45357,-.00627107,.497841,.00571453,.453598,-.00902968,.497864,.00823019,.453627,-.0122888,.497882,.0112049,.453684,-.0160475,.497923,.0146405,.453764,-.0203044,.49798,.0185394,.453866,-.0250576,.498049,.0229054,.453996,-.0303028,.49813,.0277424,.454196,-.0360379,.498267,.0330587,.454457,-.0422521,.498445,.0388613,.454926,-.0488393,.498812,.0451767,.455525,-.0558653,.499272,.0520153,.456074,-.0633772,.499625,.0593754,.456752,-.0713606,.500049,.0672751,.457648,-.07971,.500615,.0757447,.458849,-.0883032,.501399,.0848231,.46029,-.0974095,.502293,.0945135,.462,-.106729,.503301,.104848,.464121,-.116354,.504533,.115884,.466889,-.126214,.506172,.127652,.470744,-.136324,.508667,.14024,.47488,-.146595,.510995,.153673,.480845,-.157027,.514832,.168053,.488262,-.167658,.519506,.183508,.496547,-.178343,.524347,.199948,.506254,-.188916,.52983,.217503,.517961,-.199975,.536357,.236272,.531484,-.210624,.543641,.256096,.545496,-.221227,.550048,.277085,.559497,-.231568,.555076,.298615,.575752,-.241698,.560541,.321547,.591999,-.251172,.564156,.345602,.610654,-.260178,.567607,.371851,.630484,-.268094,.56923,.40076,.651807,-.274661,.569779,.430801,.67239,-.280331,.566791,.461939,.693024,-.284501,.562007,.493854,.715473,-.287852,.555791,.526992,.736323,-.28929,.546345,.560102,.755771,-.289405,.534,.593543,.775424,-.2881,.519114,.627256,.795447,-.285562,.502543,.661464,.815319,-.281416,.484773,.695206,.831769,-.275523,.463445,.729044,.849464,-.267516,.440269,.764069,.866775,-.257584,.415049,.799089,.881252,-.245817,.388049,.831948,.894209,-.233127,.35889,.865526,.906922,-.219579,.329915,.89818,.919686,-.204491,.300441,.930013,.929044,-.188962,.269445,.962061,.938393,-.171079,.238402,.994214,.94661,-.15199,.208204,1.02533,.953095,-.131953,.178653,1.0529,.958644,-.111233,.150684,1.0771,.963925,-.0903098,.122359,1.09855,.971995,-.0680505,.0923342,1.11874,.981658,-.0448512,.0614195,1.13635,.991649,-.0221931,.0303582,1.15238,.999985,393403e-9,-111086e-9,1.16772,.396806,-971563e-11,.457671,842355e-11,.429186,-249421e-9,.495017,21625e-8,.429324,-998052e-9,.495173,865322e-9,.429175,-.00224487,.494999,.00194637,.429129,-.00399041,.494952,.00346004,.429153,-.00623476,.494974,.00540684,.429168,-.0089773,.494983,.00778714,.429207,-.0122175,.495012,.0106022,.429257,-.0159542,.495047,.0138535,.429338,-.0201864,.495106,.0175443,.429431,-.0249104,.495165,.0216774,.429587,-.0301252,.495279,.0262594,.429796,-.0358249,.495432,.0312968,.430065,-.0419972,.495621,.0367985,.430588,-.0485144,.496061,.042798,.43113,-.0555028,.496472,.0492914,.431743,-.0629852,.496904,.0562907,.432448,-.0709256,.497369,.0638056,.433414,-.0791942,.498032,.071885,.434638,-.0877346,.498854,.0805517,.43611,-.0968056,.499812,.0898047,.437859,-.106002,.500891,.0997142,.440017,-.115648,.502198,.110289,.443236,-.125427,.504389,.121644,.44697,-.135492,.506809,.133769,.451689,-.145746,.509858,.146787,.45811,-.156219,.514247,.160793,.465305,-.166834,.518816,.175791,.474085,-.177546,.524331,.191906,.484808,-.188262,.53104,.209199,.49732,-.199346,.538511,.227825,.509693,-.209951,.544554,.247269,.524367,-.220533,.551616,.267978,.539228,-.231082,.557368,.289672,.55644,-.241342,.563782,.31268,.574204,-.250964,.568851,.33651,.593388,-.260306,.57312,.362219,.613358,-.268667,.574916,.390322,.634512,-.275591,.575053,.420478,.65563,-.281328,.572404,.451614,.678265,-.285948,.568893,.484112,.70011,-.289408,.561878,.517348,.723005,-.291328,.55359,.551355,.743744,-.291418,.541099,.585109,.763949,-.290252,.526489,.619487,.784186,-.287648,.509496,.65404,.804304,-.283782,.491484,.688649,.823629,-.278067,.470517,.723133,.84094,-.270588,.44705,.757163,.857852,-.261188,.421252,.792816,.874934,-.249313,.394191,.827248,.888709,-.236492,.365359,.861074,.902589,-.222185,.336016,.894417,.914201,-.207314,.30527,.926825,.925978,-.191146,.274532,.9595,.93512,-.174135,.243393,.991583,.943656,-.155231,.212414,1.02356,.951719,-.134403,.182005,1.05239,.957164,-.113023,.153043,1.07754,.962656,-.0914493,.124186,1.09984,.970695,-.0694179,.0941654,1.12,.980749,-.0466199,.0629671,1.13849,.991205,-.0227032,.0311146,1.15494,.999884,632388e-9,-254483e-9,1.1706,.379821,-957289e-11,.460637,789337e-11,.405188,-247483e-9,.491396,204064e-9,.404796,-989434e-9,.490914,815853e-9,.40483,-.00222607,.490949,.00183559,.40473,-.00395723,.49084,.00326332,.404731,-.00618287,.490836,.00509945,.404768,-.00890258,.490871,.00734463,.404791,-.0121156,.490883,.00999992,.404857,-.0158214,.490938,.0130676,.404943,-.0200178,.491004,.0165503,.405059,-.0247027,.491093,.0204521,.405213,-.0298729,.491205,.0247788,.405399,-.0355226,.491333,.0295373,.405731,-.0416352,.491604,.034741,.406303,-.0480807,.492116,.0404255,.406814,-.0550458,.492506,.0465732,.407404,-.0624652,.492926,.0532058,.408149,-.0702958,.493442,.0603442,.409128,-.0784623,.494136,.0680297,.410408,-.087007,.495054,.0762786,.411813,-.0959639,.495962,.0851046,.413735,-.105075,.497257,.0945878,.416137,-.114646,.498882,.104725,.41934,-.124394,.501132,.11563,.423326,-.134328,.503883,.127325,.428419,-.14458,.50747,.139911,.43484,-.154979,.511964,.153481,.442641,-.165628,.517328,.168114,.452511,-.176365,.524258,.183995,.463473,-.187298,.531248,.200953,.475564,-.198244,.538367,.219176,.488664,-.208938,.545175,.238514,.504073,-.219599,.553227,.259129,.520832,-.230378,.560653,.280997,.538455,-.240703,.567523,.303821,.55709,-.250548,.573287,.327948,.576646,-.259964,.577795,.353362,.596705,-.268721,.580077,.380336,.618053,-.276054,.58018,.4101,.640303,-.282176,.578747,.44161,.662365,-.286931,.574294,.474106,.684542,-.290521,.567035,.507549,.707984,-.292672,.558687,.541853,.730913,-.293189,.547606,.576581,.752948,-.292199,.533471,.61172,.773452,-.289508,.516395,.646339,.794715,-.285716,.497873,.682131,.814251,-.280051,.476845,.716396,.833057,-.272873,.453449,.751503,.84959,-.263982,.427857,.786085,.867022,-.252745,.400335,.821355,.882277,-.239655,.371304,.85646,.895375,-.225386,.340397,.890828,.909347,-.209587,.310005,.923532,.921885,-.193433,.2796,.956419,.932127,-.176135,.247276,.989445,.941869,-.157872,.216186,1.02221,.949735,-.137577,.185602,1.05195,.956617,-.115285,.155767,1.07822,.961974,-.0928418,.126103,1.10149,.96972,-.0700592,.0956758,1.12207,.98012,-.0474671,.0643269,1.1408,.990825,-.0238113,.0320863,1.1577,.999876,381574e-9,-812203e-10,1.17403,.367636,-961342e-11,.469176,753287e-11,.380377,-244772e-9,.485434,191797e-9,.380416,-978857e-9,.485475,767015e-9,.380376,-.00220165,.485435,.00172522,.380419,-.00391408,.485487,.00306734,.380438,-.00611549,.485505,.00479332,.380462,-.00880558,.485525,.00690391,.380496,-.0119837,.485551,.00940039,.38056,-.0156487,.485605,.0122848,.38064,-.0197988,.485666,.0155601,.380767,-.0244324,.48577,.0192313,.380909,-.0295444,.485871,.0233032,.381142,-.0351321,.48606,.0277861,.381472,-.0411535,.486336,.0326939,.382015,-.0475408,.486833,.0380565,.382523,-.0544395,.487231,.0438615,.383129,-.061784,.487683,.0501332,.383952,-.0695085,.488313,.0568996,.38498,-.0775819,.489077,.0641952,.386331,-.0860443,.490113,.0720324,.387788,-.0948406,.491099,.0804379,.389808,-.103899,.492566,.0894899,.39252,-.113313,.494601,.0992098,.395493,-.123007,.496619,.109641,.399826,-.132859,.499912,.120919,.405341,-.143077,.504061,.133107,.411932,-.153465,.508905,.146263,.420591,-.164108,.515482,.160544,.43101,-.174893,.523191,.176123,.441881,-.185839,.53026,.192757,.453919,-.196633,.537295,.210535,.468715,-.207611,.546156,.229886,.485182,-.218517,.555173,.250543,.501926,-.229249,.562728,.27221,.51785,-.239481,.567494,.294892,.536947,-.249395,.573889,.318987,.557115,-.259,.578831,.344348,.577966,-.268075,.582055,.371223,.599489,-.276115,.583307,.399834,.62479,-.282523,.583902,.431415,.647504,-.287663,.57953,.464301,.670601,-.291538,.573103,.498123,.693539,-.293842,.563731,.532662,.717385,-.294681,.553169,.567925,.741533,-.293717,.539908,.603502,.762142,-.291156,.521902,.639074,.783014,-.28719,.502815,.674439,.805158,-.281773,.482598,.710497,.823646,-.274682,.458949,.7456,.841879,-.266184,.433129,.781085,.859515,-.255682,.406064,.816,.875335,-.242849,.376509,.851074,.890147,-.228329,.345502,.886473,.903144,-.212491,.31428,.920751,.916618,-.195695,.282994,.954606,.927953,-.178267,.251091,.988402,.937414,-.159549,.219107,1.02141,.946823,-.140022,.18896,1.05167,.954651,-.118154,.158667,1.07819,.959955,-.0946636,.128808,1.1025,.96858,-.0711792,.0973787,1.12391,.97938,-.0475046,.0650965,1.14322,.990498,-.024059,.0326267,1.16077,.999844,-512408e-10,112444e-9,1.17727,.316912,-934977e-11,.425996,695559e-11,.356423,-241372e-9,.479108,179562e-9,.356272,-965292e-9,.478897,71811e-8,.356262,-.00217182,.478894,.00161574,.356265,-.00386092,.478895,.00287261,.356278,-.0060324,.478905,.00448907,.356293,-.00868565,.478914,.00646572,.356346,-.0118207,.478965,.00880438,.356395,-.0154355,.479001,.0115066,.356484,-.019529,.479075,.0145762,.356609,-.0240991,.47918,.018018,.356766,-.0291413,.479305,.0218379,.357009,-.0346498,.479512,.0260454,.357424,-.0405462,.479909,.0306657,.357899,-.0468825,.480337,.0357054,.358424,-.0536887,.480771,.0411728,.359041,-.0609416,.481242,.0470841,.359903,-.0685239,.481943,.0534831,.360932,-.0764883,.482741,.0603795,.362196,-.0848364,.483688,.0678028,.363847,-.0935002,.484947,.0758086,.365972,-.102471,.486588,.0844173,.368741,-.111751,.488787,.0937199,.372146,-.121334,.491405,.103732,.377114,-.131147,.495604,.114608,.38226,-.141213,.499436,.126345,.389609,-.151632,.505334,.139116,.397925,-.162073,.51168,.152995,.407824,-.172819,.518876,.168071,.420014,-.183929,.527639,.184495,.434266,-.195032,.537588,.20232,.447352,-.205792,.544379,.221189,.463726,-.216704,.553422,.241616,.481406,-.227531,.562074,.263298,.498707,-.238017,.568227,.286116,.518039,-.247936,.574473,.3101,.538277,-.257437,.579191,.335401,.561166,-.266829,.584807,.362246,.583189,-.275329,.586476,.390609,.606024,-.28234,.585578,.420998,.632419,-.287924,.584496,.454357,.656128,-.291972,.577766,.488233,.679953,-.29456,.56875,.523248,.704654,-.295816,.558388,.559168,.729016,-.295157,.544826,.595326,.752062,-.292779,.528273,.631864,.773138,-.288681,.508482,.667793,.794869,-.283358,.487341,.704035,.815101,-.27608,.46354,.739925,.834212,-.26767,.438672,.775539,.852368,-.257397,.411239,.810895,.870207,-.245689,.3829,.846472,.884063,-.231452,.351496,.881788,.898284,-.215561,.31895,.917438,.912964,-.198208,.287367,.952422,.924666,-.180426,.254487,.987551,.934429,-.161525,.222226,1.02142,.943485,-.141197,.191143,1.05218,.9521,-.120085,.161112,1.07937,.957876,-.0975881,.130982,1.10403,.966943,-.0726842,.0990553,1.12616,.978313,-.0483705,.0662818,1.14619,.990048,-.0239072,.0329243,1.16413,.999984,461885e-9,-772859e-10,1.18099,.321287,-935049e-11,.455413,659662e-11,.332595,-237513e-9,.471437,167562e-9,.332729,-949964e-9,.471618,670192e-9,.332305,-.00213618,.471028,.00150712,.332326,-.00379765,.471055,.00267959,.332344,-.00593353,.471072,.00418751,.332356,-.00854349,.471077,.00603172,.332403,-.0116268,.471121,.00821362,.332461,-.0151824,.47117,.0107357,.332552,-.0192088,.471251,.0136014,.332657,-.0237024,.47133,.0168152,.332835,-.0286615,.471487,.0203853,.333083,-.0340765,.471708,.0243212,.333547,-.0398563,.47219,.0286518,.333989,-.0460916,.472587,.0333763,.334532,-.0527897,.473054,.0385084,.335167,-.0599284,.473568,.0440638,.33608,-.0673514,.474362,.0500962,.337146,-.0752237,.475231,.0566022,.338462,-.083418,.476282,.0636272,.34014,-.0919382,.477615,.0712153,.342341,-.100741,.479404,.079417,.345088,-.109905,.481618,.0882631,.349049,-.119369,.485081,.0978851,.353939,-.129033,.489317,.108336,.359893,-.139038,.494309,.119698,.366945,-.149411,.499983,.132024,.375814,-.159843,.507185,.145558,.387112,-.170664,.516392,.160433,.40023,-.181897,.526519,.176648,.412555,-.192785,.53423,.193922,.427023,-.203663,.542741,.212662,.443685,-.214695,.552066,.232944,.461499,-.225561,.560762,.254495,.480975,-.236257,.569421,.277531,.501,-.24639,.576101,.301724,.521691,-.256101,.581493,.327112,.543478,-.265289,.585221,.353917,.566094,-.273938,.587614,.381941,.589578,-.281679,.587991,.41172,.614583,-.287655,.585928,.444148,.641813,-.292228,.582092,.478617,.666189,-.295172,.57398,.51397,.690475,-.29648,.561676,.550118,.715543,-.296203,.548758,.586933,.740405,-.293999,.532792,.62384,.762183,-.28998,.512735,.660723,.786069,-.28478,.492402,.69807,.806812,-.277568,.469058,.734422,.826987,-.268951,.443017,.770946,.844588,-.259049,.415501,.80699,.863725,-.2471,.387328,.842107,.879137,-.234157,.356108,.878078,.894634,-.218719,.324315,.914058,.909162,-.201293,.291813,.949922,.92072,-.18267,.258474,.985337,.93158,-.163212,.225593,1.0205,.941238,-.142771,.193986,1.05273,.949293,-.120956,.163392,1.08075,.956226,-.0985743,.132934,1.10559,.96546,-.075118,.101255,1.12823,.977403,-.0497921,.0675441,1.149,.989648,-.0241574,.0334681,1.16765,1.00001,5762e-7,-184807e-9,1.18519,.303474,-916603e-11,.4542,61243e-10,.308894,-232869e-9,.462306,155592e-9,.309426,-931661e-9,.463093,622499e-9,.308643,-.0020949,.461933,.00139979,.308651,-.0037242,.461941,.00248874,.308662,-.00581873,.46195,.00388933,.308687,-.00837818,.461974,.00560247,.308728,-.0114016,.462011,.00762948,.308789,-.0148884,.462067,.00997326,.308882,-.0188369,.462151,.0126375,.309007,-.0232436,.462263,.0156271,.30918,-.0281054,.462417,.0189498,.309442,-.0334065,.462667,.0226167,.309901,-.0390589,.463162,.0266614,.310331,-.0452042,.463555,.0310715,.310858,-.0517735,.464019,.0358698,.311576,-.0587359,.464669,.0410848,.312436,-.0660383,.465406,.0467453,.313526,-.0737266,.466339,.0528718,.314903,-.0817574,.467504,.0595039,.316814,-.090167,.469226,.0666888,.318965,-.0987555,.470981,.0744658,.322077,-.107792,.473814,.082912,.325947,-.117098,.477241,.0920846,.331008,-.126602,.48184,.102137,.337893,-.136619,.488334,.113135,.345106,-.146838,.494415,.12511,.355111,-.157357,.503275,.138356,.365095,-.167955,.510966,.152686,.378344,-.179157,.521508,.16856,.391599,-.190143,.530455,.18561,.407786,-.20123,.541275,.204308,.425294,-.212456,.551784,.224623,.444021,-.223568,.561493,.246172,.463418,-.234154,.569886,.268979,.484077,-.244546,.577116,.293411,.505513,-.254301,.582914,.318936,.527672,-.263564,.587208,.345856,.550565,-.272332,.589277,.374054,.573656,-.280011,.588426,.403276,.59827,-.286924,.587504,.43474,.624731,-.291994,.583401,.468767,.652396,-.295159,.576997,.504411,.67732,-.296954,.565863,.54114,.703147,-.296877,.552316,.57816,.728715,-.295147,.536773,.616124,.752448,-.291275,.51771,.653885,.775169,-.285905,.496087,.691537,.799307,-.279064,.474232,.729251,.819482,-.270294,.447676,.766267,.837659,-.260032,.419656,.802616,.856903,-.248497,.391328,.838583,.873325,-.235252,.360285,.874711,.889788,-.221126,.329215,.91077,.904486,-.204304,.296392,.94653,.917711,-.185562,.262159,.983828,.928969,-.165635,.229142,1.01955,.939707,-.14442,.19673,1.05317,.948167,-.122147,.165095,1.0823,.955222,-.099098,.13451,1.10791,.964401,-.0755332,.102476,1.1312,.976605,-.0513817,.0689667,1.15218,.989085,-.0258499,.034506,1.17129,.999908,617773e-9,-271268e-9,1.18961,.285803,-905752e-11,.452348,572272e-11,.284689,-22732e-8,.450581,143626e-9,.285263,-910214e-9,.451482,575099e-9,.285302,-.00204784,.451553,.00129395,.285318,-.00364057,.451574,.0023006,.28533,-.00568813,.451585,.00359547,.285361,-.00819001,.451618,.00517934,.285397,-.0111458,.45165,.007054,.285447,-.0145536,.451688,.00922167,.285527,-.0184127,.451758,.0116869,.285688,-.0227207,.451929,.0144555,.28584,-.0274712,.452055,.0175341,.286136,-.0326278,.452369,.0209406,.286574,-.0381792,.452853,.0246965,.287012,-.0441879,.453272,.0287996,.287542,-.0506096,.453752,.033268,.288299,-.0573634,.454488,.0381504,.289186,-.0645458,.455294,.0434447,.290302,-.0720405,.456301,.0491973,.291776,-.0799046,.457648,.0554453,.29372,-.088117,.459483,.0622311,.296052,-.0965328,.461571,.0695992,.299563,-.105409,.465085,.077658,.30335,-.114553,.468506,.0864176,.309167,-.123917,.474423,.0961078,.31529,-.13381,.47995,.106643,.324163,-.144021,.488592,.118322,.333272,-.154382,.496461,.131133,.344224,-.165015,.50562,.145208,.357733,-.176168,.516719,.16073,.373046,-.187468,.528513,.177807,.38788,-.198488,.537713,.196072,.405133,-.209545,.547999,.21605,.423845,-.220724,.55759,.237484,.443777,-.231518,.566246,.26039,.464824,-.242035,.574326,.284835,.486635,-.251898,.58037,.310518,.51012,-.261304,.58568,.337678,.535301,-.270384,.590197,.366242,.559193,-.27841,.590569,.395873,.583544,-.285325,.588161,.426857,.608834,-.291113,.584249,.459477,.635753,-.294882,.57763,.494734,.664367,-.297088,.569479,.532023,.689688,-.297364,.555064,.569629,.715732,-.295949,.539522,.608124,.741307,-.292259,.521613,.646231,.764949,-.287063,.49969,.684938,.788599,-.28012,.476747,.723548,.81048,-.27153,.45116,.761135,.831372,-.261289,.424101,.798916,.850092,-.249559,.39443,.835952,.867777,-.236348,.363849,.871606,.884632,-.221569,.332477,.907843,.90047,-.20618,.300667,.944187,.914524,-.188771,.266552,.981371,.926892,-.168362,.232349,1.01841,.937951,-.146761,.199359,1.05308,.947236,-.123813,.1675,1.0839,.954367,-.099984,.136166,1.11047,.963907,-.0759278,.103808,1.13414,.976218,-.0511367,.0697061,1.15575,.988772,-.0267415,.0352529,1.17531,.999888,-520778e-9,289926e-9,1.19389,.263546,-883274e-11,.441896,526783e-11,.262352,-221849e-9,.439889,132311e-9,.262325,-886683e-9,.439848,528824e-9,.26228,-.00199476,.439765,.00118975,.262372,-.00354671,.439922,.00211568,.26239,-.00554141,.439941,.00330652,.262412,-.00797888,.439961,.00476346,.262453,-.0108584,.440002,.00648818,.262528,-.0141788,.440085,.0084835,.262615,-.017938,.440166,.0107533,.262744,-.0221346,.440291,.0133044,.262939,-.026762,.440493,.0161445,.263277,-.0317573,.440889,.0192974,.26368,-.0371832,.441338,.0227699,.264106,-.0430371,.441753,.0265698,.264624,-.0493035,.442227,.0307178,.265378,-.0558669,.442985,.0352616,.266253,-.0628718,.443795,.0401968,.267478,-.0701569,.445008,.04559,.269062,-.077845,.446599,.0514539,.270926,-.0857941,.448349,.0578382,.273693,-.0940773,.451221,.0648363,.276746,-.102704,.454097,.0724389,.281693,-.111735,.459517,.0808744,.287335,-.121004,.46531,.0901551,.29448,-.130734,.472605,.100371,.30257,-.140777,.480251,.111644,.312465,-.15111,.489444,.124111,.324856,-.16189,.500919,.137979,.33774,-.172946,.511317,.153163,.35255,-.184152,.522684,.169817,.367786,-.19522,.53248,.187886,.385474,-.20632,.543326,.207634,.404976,-.217744,.554109,.229165,.425203,-.228691,.563395,.252068,.446704,-.239299,.571565,.276471,.468951,-.249348,.577935,.302323,.493487,-.258933,.584309,.329882,.517861,-.268009,.58773,.358525,.543309,-.276238,.589612,.388585,.569704,-.28356,.589294,.419787,.594871,-.289497,.585137,.452114,.622555,-.294452,.580356,.486466,.651167,-.296918,.57185,.523079,.677332,-.297647,.558428,.5611,.703718,-.296321,.542232,.599592,.730262,-.293339,.524541,.639138,.754304,-.288036,.502691,.677978,.778051,-.281018,.479212,.716537,.801557,-.272414,.454071,.75586,.822559,-.262419,.425952,.794477,.843051,-.250702,.397313,.832664,.86232,-.237264,.366534,.869876,.879044,-.222716,.334816,.906973,.896362,-.206827,.303143,.943558,.910342,-.189659,.269699,.979759,.924119,-.171108,.236411,1.01718,.935374,-.149579,.202224,1.05289,.944295,-.126295,.16989,1.08496,.952227,-.101511,.138089,1.11256,.962041,-.0766392,.105053,1.1375,.97528,-.0511967,.070329,1.15983,.988476,-.025463,.0351268,1.17987,.999962,286808e-10,145564e-10,1.19901,.227089,-841413e-11,.404216,472707e-11,.239725,-215083e-9,.426708,120833e-9,.239904,-860718e-9,.427028,483555e-9,.239911,-.00193661,.427039,.00108806,.239914,-.00344276,.42704,.00193457,.239933,-.00537907,.427064,.00302363,.239944,-.00774482,.427065,.00435604,.239993,-.01054,.427122,.00593398,.240052,-.0137626,.427179,.00775987,.240148,-.0174115,.427279,.00983854,.240278,-.021484,.42741,.0121763,.240472,-.0259729,.427618,.0147827,.240839,-.0308131,.428086,.0176837,.241201,-.0360893,.428482,.0208775,.241626,-.0417723,.428907,.0243821,.242207,-.0478337,.42952,.0282228,.24298,-.0542199,.430332,.0324333,.243881,-.0610015,.431222,.0370252,.245123,-.0680874,.432512,.0420535,.24667,-.0755482,.434088,.0475414,.248779,-.0832873,.436323,.0535542,.251665,-.0913546,.439509,.0601716,.255305,-.0998489,.443478,.0674282,.260049,-.108576,.448713,.0754673,.266192,-.117754,.455524,.084339,.273158,-.127294,.4627,.0941683,.282131,-.137311,.472068,.10515,.293332,-.147736,.483565,.117402,.304667,-.158357,.493702,.130824,.317785,-.169274,.504708,.145724,.333245,-.180595,.517107,.16215,.349843,-.191892,.528849,.180149,.367944,-.203168,.540301,.199746,.387579,-.214443,.551514,.221047,.408247,-.225624,.560906,.243981,.43014,-.236422,.56959,.268513,.452669,-.24654,.576098,.294409,.476196,-.256157,.580925,.322002,.501157,-.265289,.584839,.351052,.527632,-.273671,.587614,.3812,.555754,-.281254,.589119,.412994,.581682,-.287448,.585204,.445498,.608196,-.292614,.579006,.479505,.635661,-.296068,.571297,.514643,.664999,-.297395,.560855,.552213,.691039,-.296645,.544525,.591365,.7179,-.293785,.526535,.630883,.744059,-.289089,.50545,.670932,.76863,-.282239,.482514,.710904,.793273,-.273688,.457246,.750259,.814731,-.26328,.428872,.78948,.835603,-.251526,.399384,.828597,.85489,-.238339,.368811,.866892,.872828,-.223607,.336617,.90563,.889462,-.207538,.303997,.943538,.904929,-.190297,.270812,.980591,.919101,-.172034,.237453,1.01935,.930536,-.152058,.204431,1.05498,.941223,-.129515,.172495,1.08717,.94982,-.104263,.140175,1.11551,.960592,-.0781944,.106465,1.14098,.974629,-.051688,.0711592,1.16418,.98811,-.0253929,.0354432,1.18465,1.00004,804378e-9,-330876e-9,1.20462,.214668,-821282e-11,.406619,433582e-11,.218053,-208144e-9,.413025,109887e-9,.217987,-832212e-9,.412901,439362e-9,.217971,-.00187246,.412876,988623e-9,.217968,-.00332855,.41286,.00175772,.217985,-.00520055,.412882,.00274729,.218014,-.00748814,.412916,.00395842,.218054,-.0101901,.412957,.00539274,.218106,-.0133057,.413005,.00705348,.218217,-.0168342,.413139,.00894581,.218338,-.0207707,.413258,.0110754,.21855,-.0251001,.413509,.0134551,.218913,-.0297861,.413992,.0161081,.219265,-.0348956,.414383,.0190307,.219696,-.0403909,.414839,.0222458,.220329,-.0462003,.415567,.025792,.220989,-.0524208,.41621,.0296637,.222027,-.058948,.417385,.0339323,.223301,-.0658208,.418779,.0386055,.224988,-.0730347,.420665,.0437355,.227211,-.0805274,.423198,.0493844,.230131,-.088395,.426566,.0556135,.233908,-.0966208,.43091,.0624829,.239092,-.105223,.437148,.0701636,.245315,-.11424,.444302,.0786949,.253166,-.12368,.453262,.0882382,.262374,-.133569,.463211,.0988682,.273145,-.143836,.474271,.110727,.285512,-.154577,.4863,.123945,.299512,-.165501,.498817,.138581,.314287,-.176698,.510341,.154676,.331083,-.188066,.522583,.172459,.349615,-.199597,.534879,.191979,.369318,-.210843,.546083,.21309,.390377,-.222068,.5562,.235998,.412411,-.233059,.564704,.260518,.435715,-.24357,.572314,.286795,.461196,-.253356,.579395,.314559,.485587,-.262362,.581985,.343581,.511908,-.270895,.584347,.374367,.539798,-.278452,.58505,.406015,.567974,-.284877,.583344,.439168,.594303,-.290124,.577348,.473005,.622951,-.294183,.570751,.508534,.652404,-.296389,.561541,.544764,.679291,-.296605,.546426,.582927,.706437,-.294095,.528599,.622681,.734485,-.28978,.508676,.663567,.758841,-.283363,.484768,.704092,.78537,-.275015,.460434,.745101,.807315,-.264689,.432166,.784712,.8271,-.252597,.401807,.824241,.849191,-.239154,.371458,.863803,.867046,-.224451,.338873,.903063,.8852,-.208342,.306175,.942763,.901771,-.190684,.272759,.981559,.915958,-.172105,.239306,1.02048,.928046,-.152214,.206071,1.05765,.939961,-.130247,.17367,1.08999,.948711,-.10672,.142201,1.11829,.959305,-.0808688,.108454,1.14467,.973009,-.0539145,.0728109,1.16839,.987631,-.0262947,.0360625,1.19004,.999978,.00132758,-559424e-9,1.21058,.193925,-793421e-11,.391974,392537e-11,.196746,-200315e-9,.397675,991033e-10,.19667,-801099e-9,.397521,396342e-9,.196633,-.00180246,.397445,891829e-9,.196654,-.00320443,.397482,.00158582,.196659,-.00500647,.39748,.00247867,.196683,-.0072086,.397506,.00357167,.196728,-.00981001,.397562,.00486675,.196792,-.0128096,.397633,.00636707,.19689,-.0162055,.397746,.00807752,.197017,-.0199943,.397884,.0100052,.19729,-.024139,.39827,.0121691,.197583,-.0286671,.398639,.0145755,.197927,-.0335858,.399034,.0172355,.198383,-.0388806,.399554,.0201718,.199002,-.0444736,.400289,.0234194,.199739,-.0504583,.401111,.026984,.200784,-.056729,.402349,.0309217,.202075,-.0633643,.403841,.0352496,.203898,-.0703247,.406076,.0400313,.206199,-.0775565,.408841,.0453282,.209252,-.085184,.41259,.0511794,.213638,-.0931994,.418288,.0577459,.21881,-.101617,.424681,.0650508,.225642,-.11052,.433429,.0732759,.233717,-.119772,.442897,.0824683,.242823,-.129505,.452888,.0927484,.254772,-.139906,.466407,.104417,.266603,-.150402,.477413,.117211,.28073,-.161395,.490519,.131598,.295399,-.172465,.50201,.147407,.312705,-.183982,.515311,.165031,.331335,-.195532,.52786,.184336,.351037,-.206971,.5392,.205361,.372175,-.218117,.54941,.228043,.394548,-.229327,.558642,.25267,.419598,-.240052,.567861,.279071,.443922,-.249937,.573332,.306882,.471495,-.259407,.58013,.33661,.496769,-.267749,.580564,.367328,.524951,-.275524,.581696,.399753,.55318,-.282148,.579885,.433134,.581577,-.287533,.575471,.467534,.609231,-.291612,.567445,.502943,.637478,-.293911,.557657,.53871,.667795,-.295096,.546535,.576568,.694272,-.294073,.529561,.614929,.722937,-.290386,.510561,.655909,.749682,-.284481,.487846,.697663,.774754,-.276188,.462487,.738515,.799301,-.266215,.43481,.779802,.820762,-.254116,.404879,.820045,.843231,-.240393,.374559,.860294,.861857,-.225503,.341582,.900965,.880815,-.209382,.308778,.941727,.89766,-.19155,.275232,.980916,.912926,-.172346,.240938,1.02162,.926391,-.151799,.207223,1.0597,.938429,-.129968,.17484,1.09291,.947834,-.10651,.142984,1.12248,.958432,-.0824098,.109902,1.149,.972402,-.0565242,.0744454,1.1733,.987191,-.028427,.0373794,1.19538,.999975,385685e-10,-4203e-8,1.21676,.178114,-766075e-11,.385418,354027e-11,.176074,-191966e-9,.381002,887135e-10,.17601,-767549e-9,.380861,354715e-9,.17598,-.00172696,.380798,798168e-9,.175994,-.00307012,.380824,.00141928,.176017,-.00479684,.380858,.00221859,.176019,-.00690648,.380839,.00319714,.176072,-.00939888,.380913,.0043572,.176131,-.0122726,.380979,.005702,.176239,-.0155264,.38112,.00723689,.176371,-.0191551,.381272,.00896907,.176638,-.023117,.381669,.0109194,.176912,-.0274633,.382015,.0130903,.177279,-.032173,.382476,.0154949,.17774,-.0372219,.383041,.0181669,.178344,-.0426132,.38378,.0211209,.179153,-.0483309,.384773,.0243899,.180197,-.0543447,.386076,.0280062,.181581,-.0607122,.387809,.032004,.18344,-.0673855,.390205,.036453,.186139,-.0743989,.393944,.0414162,.189432,-.0817731,.39832,.0469394,.193795,-.0895464,.404188,.0531442,.199641,-.0978264,.4121,.0601374,.206679,-.106499,.421425,.0680078,.214865,-.115654,.431504,.076919,.224406,-.125268,.442526,.0868835,.235876,-.135475,.455465,.0981875,.248335,-.146023,.4681,.110759,.262868,-.157016,.482069,.124885,.278962,-.168245,.496182,.140645,.295082,-.17958,.507401,.157838,.313738,-.191227,.520252,.17695,.333573,-.202718,.531708,.197817,.356433,-.214424,.544509,.220785,.378853,-.225492,.55373,.245306,.402717,-.236236,.561348,.271593,.428375,-.246568,.568538,.299776,.454724,-.255941,.573462,.329433,.482291,-.264511,.576356,.360598,.509706,-.272129,.576446,.393204,.538805,-.278979,.575298,.427227,.568919,-.284528,.572154,.462157,.596804,-.288801,.564691,.497997,.625987,-.291334,.555134,.534467,.656414,-.292722,.545051,.571736,.683916,-.292185,.528813,.610158,.711809,-.290043,.51106,.649061,.739547,-.285246,.490103,.690081,.766914,-.277647,.465523,.732554,.791375,-.267603,.437718,.773982,.814772,-.256109,.40882,.81609,.836691,-.242281,.377823,.856849,.856984,-.227155,.34496,.898363,.876332,-.210395,.311335,.939471,.894988,-.192612,.277703,.980799,.911113,-.173236,.243019,1.02215,.924092,-.152258,.209037,1.06139,.936828,-.129575,.175909,1.09635,.946869,-.10594,.143852,1.12707,.958284,-.081318,.110289,1.15419,.972325,-.0556133,.0747232,1.17909,.986878,-.0297899,.0383149,1.20163,.999936,-.00197169,912402e-9,1.22338,.151174,-720365e-11,.351531,309789e-11,.155594,-18279e-8,.361806,78608e-9,.156099,-731569e-9,.362982,314615e-9,.156053,-.00164578,.362869,707845e-9,.156093,-.0029261,.362961,.00125884,.156099,-.00457155,.362959,.00196783,.15612,-.00658224,.362982,.00283622,.156168,-.00895774,.363048,.00386625,.156221,-.0116962,.363101,.00506109,.156324,-.0147973,.363241,.00642675,.156476,-.0182503,.363448,.00797175,.156731,-.0220266,.36384,.00971484,.156994,-.026176,.364179,.0116575,.157341,-.0306701,.36462,.0138207,.157867,-.0354591,.365364,.0162356,.15846,-.0406141,.366111,.0189092,.159308,-.0460519,.367248,.021885,.160426,-.0518096,.368767,.0252004,.161877,-.0578906,.370745,.0288825,.163995,-.0642812,.373831,.0330139,.16655,-.0710067,.377366,.0376283,.170237,-.0781522,.382799,.0428493,.175096,-.0857172,.389915,.0487324,.181069,-.0938025,.398487,.0554214,.188487,-.102363,.408799,.0630189,.197029,-.111343,.419991,.071634,.206684,-.120812,.431455,.0812797,.218698,-.131033,.445746,.0923651,.230726,-.141373,.457471,.104545,.245516,-.152387,.472388,.118449,.261551,-.163628,.486671,.133923,.277437,-.174814,.49762,.150849,.296662,-.186713,.51162,.169924,.31795,-.198513,.525435,.190848,.339422,-.210119,.536267,.213504,.362143,-.221354,.545982,.237947,.387198,-.23224,.555364,.264427,.412349,-.24257,.561489,.292519,.439274,-.252284,.566903,.322561,.466779,-.261023,.569614,.353952,.496011,-.26899,.571589,.387278,.524964,-.275498,.570325,.421356,.556518,-.281449,.568792,.457314,.584363,-.285526,.560268,.493199,.614214,-.28844,.55205,.530276,.645684,-.289777,.541906,.56855,.673446,-.289722,.526464,.606927,.701924,-.287792,.509872,.645945,.73037,-.284315,.490649,.685564,.757405,-.278804,.467964,.726511,.784025,-.269543,.441468,.768601,.808255,-.258117,.41216,.811321,.830739,-.244728,.380606,.853496,.851914,-.229428,.348111,.895374,.872586,-.212508,.314732,.937674,.891581,-.194025,.280338,.979869,.907641,-.174711,.245203,1.02253,.922233,-.153509,.21077,1.06371,.935878,-.130418,.177399,1.09972,.946338,-.105558,.144507,1.13124,.957265,-.080059,.110508,1.15973,.971668,-.0539766,.0742311,1.18515,.9866,-.0277101,.0375224,1.20858,1.00021,-515531e-9,135226e-9,1.23135,.137468,-686011e-11,.345041,273315e-11,.13703,-173378e-9,.343936,690761e-10,.136986,-693048e-9,.34383,276126e-9,.136964,-.00155931,.343761,621337e-9,.137003,-.00277211,.343863,.00110494,.137012,-.00433103,.343868,.00172744,.137043,-.00623606,.343916,.00249022,.13709,-.0084868,.343986,.00339559,.137145,-.0110814,.344045,.00444687,.137242,-.0140187,.344177,.00565007,.137431,-.0172713,.344491,.00701868,.137644,-.0208605,.344805,.00856042,.13791,-.024792,.345172,.0102863,.138295,-.0290461,.345734,.0122185,.138764,-.0335957,.346371,.0143771,.139415,-.038467,.347298,.0167894,.140272,-.0436176,.348527,.0194895,.141457,-.0491016,.350276,.0225043,.14303,-.0548764,.352646,.0258962,.145289,-.0610096,.356206,.0297168,.148502,-.0674777,.361488,.0340562,.152188,-.074345,.367103,.0389534,.157359,-.0817442,.375247,.0445541,.16379,-.0896334,.385064,.0509535,.171376,-.098005,.396082,.0582611,.179901,-.106817,.407418,.06654,.189892,-.116239,.420031,.075994,.201838,-.12627,.434321,.0867239,.214311,-.136701,.447631,.0987517,.228902,-.147616,.462046,.112353,.245107,-.158871,.476942,.127605,.262292,-.170261,.490285,.144469,.281215,-.182017,.503783,.163282,.301058,-.193729,.515505,.183873,.322752,-.205512,.52682,.206466,.347547,-.217214,.539473,.231194,.370969,-.227966,.546625,.257288,.397533,-.238555,.55472,.285789,.42398,-.248278,.559468,.315746,.452928,-.257422,.564095,.347724,.482121,-.265306,.565426,.380922,.510438,-.272043,.563205,.415639,.541188,-.277614,.561087,.451702,.571667,-.281927,.554922,.48845,.602432,-.285015,.546838,.526442,.634126,-.286512,.537415,.564896,.662816,-.286388,.522906,.604037,.692411,-.284734,.507003,.643795,.720946,-.281297,.488398,.68298,.748293,-.276262,.466353,.723466,.776931,-.269978,.443573,.764565,.801065,-.260305,.415279,.805838,.825843,-.247426,.384773,.849985,.84807,-.232437,.352555,.893174,.869122,-.215806,.318642,.936564,.888963,-.197307,.28381,.980253,.905547,-.177203,.247888,1.02463,.918554,-.155542,.212904,1.06714,.931395,-.131948,.1787,1.10451,.941749,-.106723,.145902,1.13694,.954551,-.0804939,.111193,1.1666,.970279,-.0534239,.0744697,1.19249,.986117,-.0257452,.0368788,1.21665,.999938,.00190634,-.0010291,1.23981,.118493,-647439e-11,.32272,23772e-10,.118765,-163023e-9,.323456,598573e-10,.118772,-65212e-8,.323477,239447e-9,.118843,-.00146741,.323657,538881e-9,.118804,-.00260846,.323553,95826e-8,.118826,-.00407576,.323595,.00149845,.118846,-.00586826,.323617,.00216047,.118886,-.00798578,.32367,.00294679,.118947,-.0104273,.323753,.00386124,.119055,-.0131909,.323922,.00490999,.119241,-.0162444,.324251,.00610804,.11944,-.0196339,.324544,.00745805,.119739,-.0233378,.325026,.00897805,.12011,-.0273179,.325586,.0106895,.120571,-.0316143,.326231,.0126073,.12124,-.0361939,.327264,.0147654,.122162,-.0410511,.328733,.0172001,.123378,-.0462233,.330659,.0199375,.125183,-.0517109,.333754,.0230498,.127832,-.0575652,.338507,.026597,.130909,-.0637441,.343666,.0306345,.135221,-.0704302,.351063,.035273,.14082,-.0776364,.360604,.0406137,.146781,-.0852293,.369638,.0466788,.155121,-.0935351,.3827,.0537628,.16398,-.102234,.39522,.0617985,.173926,-.111465,.40793,.07097,.185137,-.121296,.42105,.0813426,.19826,-.13169,.435735,.0931596,.212938,-.142614,.450932,.106547,.229046,-.153884,.465726,.121575,.246246,-.165382,.479461,.138286,.264637,-.176806,.492106,.15666,.284959,-.188793,.504774,.17728,.308157,-.200763,.518805,.19988,.330951,-.21239,.528231,.224293,.3549,-.223521,.536376,.250541,.381502,-.234169,.544846,.278902,.409529,-.244077,.551717,.309227,.437523,-.253363,.55517,.341426,.467624,-.261659,.557772,.37518,.497268,-.268498,.556442,.41007,.528294,-.274018,.553915,.446445,.559053,-.278169,.549153,.483779,.589329,-.281229,.539878,.522249,.622503,-.282902,.53162,.561754,.652382,-.282815,.518119,.601544,.681847,-.281247,.502187,.641574,.712285,-.277986,.484824,.682633,.740094,-.273017,.463483,.723426,.768478,-.266692,.441299,.763747,.794556,-.258358,.415238,.805565,.819408,-.248807,.386912,.847254,.843411,-.236214,.356165,.891091,.862397,-.219794,.320562,.936174,.883113,-.201768,.285322,.982562,.90023,-.181672,.249713,1.02862,.915192,-.159279,.214546,1.07163,.928458,-.134725,.180285,1.10995,.94069,-.10913,.147119,1.14354,.953409,-.0821315,.112492,1.17372,.969537,-.0542677,.0752014,1.20043,.985612,-.0259096,.0370361,1.22528,.999835,.00298198,-.00151801,1.24959,.10097,-602574e-11,.300277,202619e-11,.101577,-152164e-9,.302077,511662e-10,.101572,-608889e-9,.302066,204751e-9,.101566,-.00136997,.302047,460753e-9,.101592,-.00243557,.302114,819497e-9,.101608,-.0038053,.30214,.00128154,.101627,-.00547906,.30216,.0018483,.101669,-.00745647,.302224,.00252223,.101732,-.00973615,.302318,.00330716,.101844,-.0123097,.302513,.00421061,.102025,-.0151681,.30285,.00524481,.102224,-.0183334,.303166,.0064154,.102515,-.0217819,.303654,.00774063,.102886,-.0255067,.304243,.0092398,.103395,-.029514,.305089,.0109339,.104109,-.0337912,.306301,.0128561,.105074,-.0383565,.30798,.0150338,.10654,-.0432132,.310726,.0175228,.108478,-.0484244,.314351,.0203648,.111015,-.0539339,.319032,.0236325,.114682,-.0598885,.32605,.0274188,.11911,-.0663375,.334109,.0317905,.124736,-.0733011,.344013,.0368502,.131479,-.0807744,.355358,.0427104,.139283,-.0888204,.367614,.0494788,.148054,-.0973394,.380072,.0572367,.159037,-.10665,.395678,.0662704,.169794,-.116221,.40795,.0763192,.18314,-.126632,.423546,.087956,.197515,-.137383,.438213,.101042,.213514,-.148641,.453248,.115827,.23065,-.160117,.46688,.132283,.249148,-.171807,.479962,.150644,.270219,-.183695,.494618,.171073,.292338,-.195574,.506937,.193378,.314999,-.207205,.516463,.217585,.340991,-.218955,.528123,.24428,.367982,-.229917,.537025,.272784,.39432,-.239737,.541627,.302742,.423364,-.249048,.546466,.335112,.453751,-.257329,.549466,.369032,.48416,-.264623,.549503,.404577,.515262,-.270411,.547008,.441337,.547036,-.274581,.542249,.479162,.576614,-.277266,.533015,.517904,.611143,-.279144,.525512,.558508,.640989,-.279001,.51154,.598995,.671182,-.277324,.495641,.639935,.700848,-.273908,.477526,.681017,.729862,-.269063,.457955,.722764,.758273,-.262282,.434846,.764349,.784121,-.254281,.409203,.806206,.809798,-.24505,.382694,.848617,.834953,-.233861,.354034,.892445,.856817,-.221308,.321764,.936263,.877609,-.205996,.288118,.982401,.897489,-.186702,.253277,1.02975,.913792,-.164618,.217963,1.07488,.92785,-.140023,.183221,1.11487,.940378,-.11328,.149385,1.14947,.95273,-.0853958,.114152,1.1807,.969059,-.0568698,.0769845,1.20912,.985574,-.0276502,.0381186,1.23498,.999943,.00239052,-.00126861,1.25987,.0852715,-560067e-11,.279021,171162e-11,.0854143,-140871e-9,.279483,430516e-10,.0854191,-563385e-9,.2795,172184e-9,.0854188,-.00126753,.279493,387464e-9,.0854229,-.00225337,.279501,68918e-8,.0854443,-.00352086,.279549,.00107803,.0854697,-.00506962,.279591,.00155536,.0855093,-.00689873,.279652,.00212354,.0855724,-.00900821,.279752,.00278703,.0856991,-.0113799,.280011,.0035551,.085855,-.0140314,.280297,.00443449,.0860682,-.016963,.280682,.00543636,.086344,-.0201438,.281159,.0065788,.0867426,-.0235999,.281886,.00787977,.087239,-.0273069,.282745,.0093606,.0879815,-.031269,.284139,.011056,.0891258,-.035531,.28647,.0130065,.0906909,-.0400947,.289708,.0152495,.0927624,-.0449638,.293904,.0178454,.0958376,-.0502427,.300471,.0208915,.0995827,-.0559514,.30806,.0244247,.104526,-.0622152,.317874,.0285721,.110532,-.0690046,.329332,.0334227,.117385,-.0763068,.341217,.0390466,.12522,-.084184,.353968,.0455786,.134037,-.0925248,.366797,.0530773,.144014,-.101487,.380209,.0617424,.156013,-.111273,.395956,.071777,.168872,-.121431,.41053,.0830905,.183089,-.132105,.425073,.0959341,.198763,-.143286,.439833,.110448,.216159,-.154841,.454507,.126769,.234859,-.166588,.468368,.14495,.255879,-.178626,.482846,.165233,.27677,-.190218,.493489,.187217,.301184,-.202227,.506549,.211659,.325852,-.213764,.5158,.237922,.352824,-.22487,.525442,.26632,.380882,-.235246,.532487,.296691,.410137,-.244847,.537703,.329179,.439787,-.253122,.540361,.363135,.472291,-.260517,.542734,.399222,.501856,-.266519,.538826,.436352,.534816,-.270905,.535152,.474505,.565069,-.273826,.525979,.513988,.597154,-.275333,.516394,.554852,.630473,-.275314,.506206,.596592,.660574,-.273323,.489769,.638117,.692015,-.270008,.472578,.680457,.720647,-.265001,.452134,.723008,.750528,-.258311,.430344,.765954,.777568,-.250046,.405624,.809012,.80387,-.240114,.378339,.852425,.828439,-.228737,.349877,.895346,.851472,-.216632,.318968,.940695,.873906,-.202782,.287489,.987235,.89467,-.187059,.254394,1.03348,.912281,-.168818,.221294,1.07812,.927358,-.146494,.18675,1.11928,.940385,-.120009,.152322,1.15609,.952672,-.0917183,.117514,1.18875,.968496,-.0620321,.0797405,1.21821,.985236,-.0314945,.0402383,1.24523,.99998,-575153e-9,110644e-9,1.27133,.0702429,-512222e-11,.255273,140947e-11,.0702981,-128826e-9,.255469,354488e-10,.0703691,-515562e-9,.255727,141874e-9,.0703805,-.00116,.255754,31929e-8,.0703961,-.00206224,.255813,567999e-9,.0704102,-.00322223,.255839,88871e-8,.0704298,-.00463928,.255863,.00128272,.0704759,-.00631375,.255953,.00175283,.0705434,-.00824317,.256079,.00230342,.0706693,-.010412,.25636,.0029443,.0708189,-.0128439,.256647,.00368031,.0710364,-.0155177,.257084,.00452614,.0713223,-.0184374,.257637,.00549706,.0717182,-.0216002,.258416,.00661246,.072321,-.0249966,.259699,.00790147,.0731446,-.0286566,.261475,.0093884,.0743352,-.0325888,.264132,.0111186,.0760676,-.036843,.26815,.013145,.078454,-.0414292,.273636,.0155251,.0818618,-.0464634,.281653,.0183525,.0857382,-.0519478,.289992,.0216642,.0908131,-.0579836,.30066,.0255956,.0967512,-.0645124,.312204,.0301954,.103717,-.0716505,.325001,.0356017,.111596,-.0793232,.338129,.041896,.120933,-.087645,.352853,.0492447,.130787,-.096492,.366192,.0576749,.142311,-.105973,.380864,.0673969,.155344,-.116182,.396575,.0785899,.169535,-.126815,.411443,.0912377,.185173,-.138015,.426256,.105607,.201755,-.149325,.439607,.121551,.221334,-.161207,.455467,.139608,.241461,-.173162,.469096,.159591,.26294,-.18504,.481014,.18156,.286776,-.196881,.493291,.205781,.311596,-.208311,.503556,.231819,.338667,-.219671,.513268,.260274,.366021,-.230451,.519414,.290862,.395875,-.240131,.526766,.323196,.425564,-.248566,.52905,.357071,.457094,-.256195,.530796,.393262,.488286,-.262331,.528703,.430797,.522291,-.267141,.52727,.470231,.554172,-.270411,.519848,.510477,.586427,-.271986,.510307,.551594,.619638,-.27192,.499158,.593849,.650656,-.269817,.483852,.636314,.68284,-.266267,.467515,.679679,.714356,-.26113,.44931,.723884,.742717,-.254067,.425789,.767245,.770894,-.245652,.401144,.811819,.797358,-.235554,.374224,.856315,.823377,-.223896,.346167,.901077,.847456,-.210865,.316056,.946502,.870697,-.196574,.284503,.993711,.891068,-.180814,.251628,1.04134,.909267,-.163314,.219065,1.08609,.925653,-.143304,.186446,1.12702,.940017,-.121322,.153416,1.16371,.952398,-.0973872,.120334,1.19712,.967568,-.0698785,.08352,1.22791,.984772,-.0390031,.0439209,1.25672,1.00026,-.0070087,.00315668,1.28428,.0556653,-459654e-11,.227325,112556e-11,.0565238,-116382e-9,.230826,284985e-10,.0565717,-465666e-9,.231026,114036e-9,.0565859,-.00104773,.231079,256656e-9,.0565761,-.00186255,.231025,45663e-8,.0565913,-.00291002,.231058,714664e-9,.0566108,-.00418998,.231085,.00103224,.0566532,-.00570206,.231169,.00141202,.0567473,-.00743666,.231417,.00186018,.0568567,-.00940298,.231661,.00238264,.0569859,-.0115991,.231895,.00298699,.0572221,-.0140096,.232456,.00368957,.057519,-.0166508,.233096,.00450303,.0579534,-.01951,.234094,.00544945,.0585922,-.0225991,.235629,.00655564,.0595647,-.0259416,.238106,.00785724,.0609109,-.0295661,.241557,.00939127,.0628751,-.0335126,.246652,.0112198,.0656908,-.0378604,.254091,.0134168,.0691347,-.0426543,.262666,.0160374,.0732165,-.0478967,.272029,.0191514,.0782863,-.0536716,.283007,.0228597,.0843973,-.0600683,.295732,.0272829,.0913598,-.0670095,.308779,.032484,.0994407,-.0745516,.322886,.0385886,.108189,-.082712,.336408,.0457133,.118574,-.0914927,.351692,.0539832,.129989,-.100854,.366502,.0635162,.142722,-.110837,.381675,.0744386,.156654,-.121353,.3963,.0868483,.172151,-.132414,.411477,.100963,.188712,-.143809,.42508,.116795,.208093,-.155765,.441328,.134715,.227936,-.167608,.454328,.154396,.249495,-.179579,.467235,.176179,.27362,-.191488,.480248,.200193,.296371,-.202618,.487886,.225775,.324234,-.214133,.499632,.25441,.353049,-.225212,.509532,.285077,.381785,-.234875,.514265,.317047,.414038,-.244205,.521282,.351874,.445251,-.252145,.522931,.388279,.476819,-.258433,.520947,.425825,.509209,-.263411,.517669,.465104,.542759,-.266732,.512841,.505741,.574822,-.268263,.503317,.547611,.609324,-.268489,.493035,.590953,.641772,-.266941,.478816,.63488,.674049,-.263297,.462863,.679072,.705071,-.257618,.442931,.723487,.734709,-.250625,.421299,.768708,.763704,-.24179,.397085,.814375,.791818,-.231115,.370577,.859907,.817439,-.21922,.34232,.906715,.843202,-.205658,.312627,.953943,.866639,-.190563,.280933,1.00185,.888129,-.173978,.248393,1.05105,.907239,-.155485,.216007,1.09704,.923893,-.134782,.183233,1.13857,.938882,-.11249,.150376,1.17539,.952464,-.0890706,.117177,1.20924,.968529,-.0646523,.0813095,1.24055,.984763,-.038606,.0439378,1.27018,1.00053,-.01238,.00598668,1.29873,.0437928,-409594e-11,.204012,879224e-12,.0440166,-103395e-9,.205049,221946e-10,.0440529,-413633e-9,.205225,887981e-10,.0440493,-930594e-9,.2052,199858e-9,.0439884,-.00165352,.204901,355495e-9,.0440716,-.0025849,.205255,556983e-9,.0440968,-.00372222,.205311,805326e-9,.0441359,-.00506478,.205391,.00110333,.0442231,-.00660384,.205638,.00145768,.0443254,-.00835246,.205877,.00187275,.0444832,-.0102992,.20627,.00235938,.0447001,-.0124449,.206796,.0029299,.0450168,-.0147935,.207593,.0036005,.0454816,-.017336,.208819,.00439246,.0462446,-.0201156,.211036,.00533864,.0473694,-.0231568,.214388,.00646984,.0490191,-.0264941,.219357,.00783856,.0512776,-.030184,.226061,.00950182,.0541279,-.0342661,.234094,.0115156,.0578989,-.0388539,.244297,.0139687,.0620835,-.0438735,.254457,.0169015,.0673497,-.04951,.266706,.0204554,.0731759,-.0556263,.278753,.0246606,.0803937,-.0624585,.29309,.0297126,.0879287,-.0697556,.305856,.0355868,.0970669,-.0778795,.321059,.0425768,.106508,-.0863541,.333873,.05056,.11776,-.0955935,.349008,.0598972,.130081,-.105438,.363776,.0706314,.144454,-.115899,.380112,.0828822,.1596,-.126827,.394843,.0967611,.176097,-.138161,.409033,.112381,.194726,-.149904,.424257,.129952,.213944,-.161675,.436945,.149333,.235516,-.173659,.450176,.170892,.260564,-.185963,.466305,.194984,.285183,-.197582,.477328,.220805,.311095,-.208697,.486566,.248694,.338924,-.219519,.494811,.279015,.369757,-.229766,.504065,.311725,.3996,-.238879,.507909,.345844,.430484,-.246802,.509805,.381749,.46413,-.253924,.511436,.420251,.497077,-.259319,.508787,.459957,.530434,-.263297,.50394,.501356,.565725,-.265619,.49804,.544252,.599254,-.265842,.487346,.587856,.631251,-.263978,.472975,.631969,.663972,-.26043,.457135,.677471,.697724,-.255358,.439844,.723744,.727725,-.248308,.417872,.770653,.756417,-.239181,.39273,.817357,.785419,-.22814,.367839,.864221,.81266,-.215681,.339449,.912701,.839391,-.201623,.309279,.962419,.86366,-.185624,.278029,1.0122,.885028,-.16797,.245294,1.06186,.904639,-.148336,.212689,1.10934,.922048,-.12637,.179616,1.15063,.936952,-.102928,.146749,1.18885,.951895,-.0785268,.112733,1.22352,.967198,-.0530153,.0760056,1.25681,.984405,-.02649,.0383183,1.28762,1.00021,70019e-8,-20039e-8,1.31656,.0325964,-355447e-11,.176706,655682e-12,.0329333,-899174e-10,.178527,165869e-10,.0329181,-359637e-9,.178453,663498e-10,.0329085,-808991e-9,.178383,149332e-9,.0329181,-.00143826,.178394,265873e-9,.0329425,-.00224678,.178517,416597e-9,.0329511,-.00323575,.17849,603299e-9,.033011,-.00439875,.178695,829422e-9,.0330733,-.00574059,.178843,.00109908,.0331857,-.00725896,.179176,.00141933,.0333445,-.00895289,.179618,.0017999,.0335674,-.0108219,.180238,.00225316,.033939,-.0128687,.181417,.00279765,.0345239,-.015114,.183395,.0034564,.0354458,-.017596,.186616,.00425864,.0368313,-.0203524,.191547,.00524936,.0386115,-.0234105,.197508,.00647033,.0410303,-.0268509,.205395,.00798121,.0442245,-.0307481,.215365,.0098557,.0478659,-.0350863,.225595,.0121417,.0522416,-.0399506,.236946,.0149385,.0574513,-.045357,.249442,.0183189,.0631208,-.0512863,.261222,.0223644,.0701124,-.0579273,.275418,.0272418,.0777331,-.0650652,.288989,.0329458,.0862709,-.0728813,.302546,.0396819,.096103,-.081363,.317164,.04757,.106976,-.0904463,.331733,.0567012,.119175,-.100105,.34661,.067202,.132919,-.110375,.362249,.0792588,.147727,-.121115,.376978,.0928672,.163618,-.132299,.390681,.108228,.182234,-.143887,.406571,.125502,.201809,-.155827,.42042,.144836,.225041,-.168357,.438411,.166706,.247621,-.18004,.450368,.189909,.27097,-.191536,.460083,.215251,.296658,-.203024,.469765,.243164,.325892,-.214056,.481837,.273388,.35406,-.224104,.487474,.305344,.384372,-.233489,.492773,.339741,.41749,-.241874,.498451,.376287,.45013,-.248834,.499632,.414195,.481285,-.254658,.495233,.454077,.519183,-.259367,.496401,.496352,.551544,-.261818,.487686,.538798,.587349,-.262964,.479453,.583626,.621679,-.262128,.467709,.629451,.654991,-.258998,.452123,.67566,.686873,-.254119,.433495,.723248,.719801,-.246946,.413657,.771156,.750355,-.237709,.390366,.81989,.780033,-.226549,.364947,.868601,.809254,-.214186,.337256,.920034,.836576,-.199639,.307395,.971706,.861774,-.183169,.275431,1.02479,.885707,-.165111,.243431,1.07837,.904742,-.144363,.210921,1.12783,.915604,-.121305,.17647,1.17254,.930959,-.0962119,.143106,1.21012,.948404,-.069969,.108112,1.24474,.967012,-.0427586,.0708478,1.27718,.984183,-.0147043,.032335,1.3083,.999577,.0142165,-.00726867,1.3382,.0229227,-299799e-11,.148623,462391e-12,.0232194,-758796e-10,.15054,117033e-10,.0232315,-303636e-9,.15063,468397e-10,.0232354,-683189e-9,.150624,105472e-9,.0232092,-.0012136,.150445,187744e-9,.0232523,-.00189765,.150679,294847e-9,.0232828,-.00273247,.150789,428013e-9,.0233371,-.00371287,.150995,591134e-9,.0234015,-.00484794,.15118,787642e-9,.023514,-.00612877,.151562,.00102547,.023679,-.00756125,.152116,.00131351,.0239559,-.00914651,.153162,.00166594,.0244334,-.010904,.155133,.00210182,.025139,-.0128615,.158035,.00264406,.0262598,-.0150628,.162751,.00332923,.0277875,-.0175532,.168944,.00419773,.0298472,-.0203981,.176835,.00530034,.0325444,-.023655,.186686,.00669777,.0355581,-.0272982,.196248,.00842661,.0392841,-.0314457,.207352,.0105854,.0436815,-.0361157,.219279,.0132458,.0485272,-.0412932,.230728,.0164736,.0541574,-.0470337,.242994,.0203715,.0609479,-.0535002,.257042,.0250953,.0685228,-.0605409,.27102,.0306856,.0768042,-.0680553,.28406,.037193,.0864844,-.0765011,.299186,.0449795,.0969415,-.0852674,.3132,.0538316,.108478,-.0947333,.327138,.0641149,.121705,-.10481,.342345,.0759185,.136743,-.115474,.358472,.0894116,.152986,-.126536,.374067,.104562,.170397,-.138061,.388267,.121632,.191392,-.150203,.406467,.140996,.211566,-.161751,.418641,.161696,.233567,-.173407,.430418,.184557,.257769,-.185397,.44277,.210092,.28531,-.197048,.457191,.237827,.311726,-.20784,.464712,.267253,.340537,-.218345,.472539,.299332,.372921,-.228306,.482331,.333988,.402924,-.236665,.484378,.369722,.434475,-.244097,.484717,.407836,.469736,-.250547,.487093,.448465,.505045,-.25511,.485575,.490263,.540262,-.258444,.481225,.534495,.576347,-.259903,.473481,.579451,.608656,-.259572,.4603,.625604,.646679,-.257908,.450341,.674511,.679902,-.253663,.431561,.723269,.714159,-.247419,.412684,.773263,.745345,-.239122,.389388,.824182,.778248,-.228837,.365361,.876634,.807208,-.216197,.337667,.92945,.835019,-.201772,.307197,.985261,.860261,-.185291,.274205,1.04299,.877601,-.165809,.240178,1.09816,.898211,-.143897,.207571,1.14694,.915789,-.119513,.174904,1.19008,.931831,-.0932919,.141423,1.2297,.949244,-.0656528,.105603,1.26553,.967527,-.0370262,.0679551,1.29986,.984139,-.00730117,.0283133,1.33252,.999713,.0234648,-.0121785,1.36397,.0152135,-245447e-11,.122795,304092e-12,.0151652,-615778e-10,.122399,76292e-10,.0151181,-245948e-9,.122023,304802e-10,.0151203,-553394e-9,.12203,686634e-10,.015125,-983841e-9,.122037,122463e-9,.0151427,-.00153774,.12214,192706e-9,.0151708,-.0022103,.122237,281219e-9,.0152115,-.00300741,.12238,390804e-9,.0152877,-.00392494,.1227,526317e-9,.015412,-.00496597,.123244,69443e-8,.0156201,-.00613314,.124228,90547e-8,.0159658,-.00744113,.125945,.0011732,.0165674,-.00892546,.129098,.00151888,.017487,-.010627,.133865,.00197007,.018839,-.0126043,.140682,.0025637,.020554,-.0148814,.148534,.00333637,.0226727,-.0175123,.157381,.00433738,.0251879,-.0205266,.166685,.00561664,.0283635,-.0240319,.177796,.00725563,.0318694,-.0279432,.188251,.00928811,.0361044,-.0324313,.200038,.011835,.0406656,-.0373527,.210685,.0149146,.0463846,-.0430132,.224182,.0187254,.0525696,-.0491013,.23634,.0232283,.0598083,-.0559175,.250013,.0286521,.0679437,-.0633657,.263981,.0350634,.0771181,-.0714602,.278072,.0425882,.0881273,-.0803502,.29511,.0514487,.0996628,-.0896903,.309976,.0615766,.112702,-.099644,.325611,.0732139,.126488,-.109829,.339321,.0862324,.142625,-.120859,.35574,.101275,.15953,-.131956,.369845,.117892,.176991,-.143145,.38146,.136205,.199715,-.155292,.40052,.157252,.220787,-.167066,.412055,.179966,.243697,-.178396,.423133,.204418,.272106,-.190433,.439524,.232141,.297637,-.201265,.447041,.261109,.325273,-.211834,.454488,.292627,.357219,-.221889,.465004,.326669,.387362,-.230729,.468527,.362426,.423131,-.23924,.475836,.401533,.45543,-.246067,.475017,.441902,.493393,-.251557,.478017,.484239,.526253,-.255571,.4709,.528586,.560554,-.257752,.463167,.574346,.599306,-.258076,.456452,.621655,.634541,-.256471,.443725,.670492,.668907,-.253283,.428719,.721943,.705619,-.247562,.411348,.772477,.739034,-.240626,.388939,.8264,.771408,-.231493,.36425,.881702,.803312,-.220125,.337321,.9385,.828457,-.206645,.305364,.997437,.854819,-.190664,.273715,1.05693,.878666,-.171429,.242218,1.11251,.898404,-.149235,.209556,1.16398,.917416,-.12435,.176863,1.21014,.933133,-.0972703,.142775,1.25178,.95066,-.0683607,.106735,1.29028,.968589,-.0378724,.0681609,1.32703,.984776,-.00605712,.0273966,1.36158,.99994,.0263276,-.0138124,1.3943,.00867437,-186005e-11,.0928979,173682e-12,.00864003,-466389e-10,.0925237,435505e-11,.00864593,-186594e-9,.0925806,174322e-10,.00864095,-419639e-9,.0924903,392862e-10,.00863851,-746272e-9,.0924589,702598e-10,.00868531,-.00116456,.0929,111188e-9,.00869667,-.00167711,.0928529,163867e-9,.00874332,-.00228051,.0930914,23104e-8,.00882709,-.00297864,.0935679,31741e-8,.00898874,-.00377557,.0946165,430186e-9,.00929346,-.00469247,.0967406,580383e-9,.00978271,-.00575491,.100084,783529e-9,.0105746,-.00701514,.105447,.00106304,.0116949,-.00851797,.112494,.00144685,.0130419,-.0102757,.119876,.00196439,.0148375,-.012381,.129034,.00266433,.0168725,-.01482,.137812,.00358364,.0193689,-.0176563,.147696,.00478132,.0222691,-.0209211,.157795,.00631721,.0256891,-.0246655,.168431,.00826346,.0294686,-.0288597,.178587,.0106714,.0340412,-.0336441,.190251,.0136629,.0393918,-.039033,.202999,.0173272,.0453947,-.0450087,.215655,.0217448,.0521936,-.0515461,.228686,.0269941,.0600279,-.058817,.242838,.033272,.0692398,-.0667228,.258145,.0406457,.0793832,-.0752401,.273565,.0492239,.0902297,-.0841851,.287735,.0590105,.102014,-.0936479,.301161,.0702021,.116054,-.103967,.317438,.0832001,.13191,-.114622,.334166,.0977951,.148239,-.125452,.348192,.113985,.165809,-.136453,.361094,.131928,.184616,-.147648,.373534,.151811,.207491,-.159607,.39101,.174476,.230106,-.171119,.402504,.198798,.257036,-.182906,.418032,.225796,.281172,-.193605,.425468,.254027,.312034,-.204771,.440379,.285713,.340402,-.214988,.445406,.319196,.370231,-.224711,.44968,.35537,.407105,-.233516,.460747,.393838,.439037,-.240801,.460624,.433747,.47781,-.24762,.465957,.477234,.510655,-.251823,.460054,.52044,.550584,-.255552,.459172,.567853,.585872,-.257036,.450311,.615943,.620466,-.257535,.437763,.667693,.660496,-.255248,.426639,.718988,.695578,-.251141,.409185,.772503,.732176,-.244718,.39015,.827023,.760782,-.236782,.362594,.885651,.79422,-.225923,.33711,.943756,.824521,-.213855,.308272,1.00874,.854964,-.197723,.278529,1.06764,.878065,-.179209,.246208,1.12836,.899834,-.157569,.21329,1.18318,.918815,-.133206,.181038,1.23161,.934934,-.106545,.146993,1.27644,.952115,-.0780574,.111175,1.31842,.96906,-.0478279,.0728553,1.35839,.985178,-.0160014,.032579,1.39697,1.00039,.0173126,-.0095256,1.43312,.00384146,-124311e-11,.0613583,778271e-13,.00390023,-314043e-10,.0622919,196626e-11,.00389971,-125622e-9,.0622632,787379e-11,.00389491,-282352e-9,.0620659,1778e-8,.00391618,-502512e-9,.0624687,320918e-10,.00392662,-784458e-9,.0625113,515573e-10,.00396053,-.00112907,.0628175,778668e-10,.00401911,-.00153821,.0633286,113811e-9,.00414994,-.0020208,.0646443,16445e-8,.00441223,-.00260007,.0673886,237734e-9,.00484427,-.0033097,.0716528,345929e-9,.00549109,-.00418966,.0774998,505987e-9,.00636293,-.00527331,.0844758,739208e-9,.00746566,-.00660428,.0921325,.00107347,.00876625,-.00818826,.0997067,.00153691,.0103125,-.0100811,.107433,.00217153,.0123309,-.0123643,.117088,.00303427,.0146274,-.0150007,.126438,.00416018,.0172295,-.0180531,.135672,.00561513,.0204248,-.0215962,.146244,.007478,.0241597,-.0256234,.157481,.00981046,.0284693,-.0302209,.169125,.0127148,.033445,-.0353333,.181659,.0162453,.0391251,-.0410845,.1944,.0205417,.0454721,-.0473451,.207082,.0256333,.0530983,-.0542858,.221656,.0317036,.0615356,-.0618384,.236036,.0388319,.0703363,-.0697631,.248398,.046974,.0810391,-.0784757,.263611,.0565246,.0920144,-.0873488,.275857,.0671724,.105584,-.0973652,.292555,.0798105,.119506,-.107271,.306333,.0935945,.134434,-.117608,.318888,.109106,.153399,-.128938,.337552,.127074,.171258,-.139944,.349955,.14643,.191059,-.151288,.361545,.168,.215069,-.163018,.378421,.192082,.237838,-.174226,.38879,.217838,.266965,-.186063,.405857,.246931,.292827,-.196909,.414146,.277505,.324352,-.207473,.426955,.310711,.354427,-.217713,.433429,.346794,.389854,-.227183,.443966,.385237,.420749,-.235131,.44471,.424955,.459597,-.242786,.451729,.468446,.495316,-.248767,.45072,.513422,.534903,-.253351,.450924,.560618,.572369,-.256277,.445266,.609677,.612383,-.2576,.438798,.660995,.644037,-.256931,.421693,.713807,.686749,-.254036,.4109,.767616,.719814,-.249785,.390151,.82533,.754719,-.244283,.367847,.888311,.792022,-.235076,.345013,.948177,.822404,-.225061,.316193,1.01661,.853084,-.211113,.287013,1.08075,.879871,-.19449,.255424,1.14501,.901655,-.174023,.222879,1.20203,.919957,-.1509,.18989,1.25698,.938412,-.124923,.15606,1.30588,.953471,-.0968139,.120512,1.3529,.970451,-.066734,.0828515,1.3986,.985522,-.034734,.0424458,1.44148,1.00099,-.00102222,678929e-9,1.48398,965494e-9,-627338e-12,.0306409,197672e-13,99168e-8,-158573e-10,.0314638,499803e-12,991068e-9,-634012e-10,.031363,200682e-11,974567e-9,-14144e-8,.03036,457312e-11,998079e-9,-252812e-9,.031496,860131e-11,.00102243,-396506e-9,.0319955,148288e-10,.00107877,-577593e-9,.0331376,249141e-10,.00121622,-816816e-9,.0359396,423011e-10,.0014455,-.00113761,.0399652,724613e-10,.00178791,-.00156959,.0450556,123929e-9,.00225668,-.00214064,.0508025,208531e-9,.00285627,-.00287655,.0568443,341969e-9,.0035991,-.00380271,.0630892,544158e-9,.00455524,-.00496264,.0702204,842423e-9,.00569143,-.0063793,.0773426,.00126704,.00716928,-.00813531,.0860839,.00186642,.00885307,-.0101946,.0944079,.00267014,.0109316,-.0126386,.103951,.00374033,.0133704,-.0154876,.113786,.0051304,.0161525,-.0187317,.123477,.00688858,.0194267,-.0224652,.133986,.00910557,.0230967,-.0265976,.143979,.0118074,.0273627,-.0312848,.154645,.0151266,.0323898,-.0365949,.166765,.0191791,.0379225,-.0422914,.177932,.0239236,.0447501,-.0487469,.19167,.0296568,.0519391,-.0556398,.203224,.0362924,.0599464,-.0631646,.215652,.0440585,.0702427,-.0714308,.232089,.0531619,.0806902,-.0800605,.245258,.0634564,.0923194,-.0892815,.258609,.0752481,.106938,-.09931,.276654,.0888914,.121238,-.109575,.289847,.104055,.138817,-.120461,.307566,.121266,.15595,-.131209,.320117,.139944,.178418,-.143049,.339677,.161591,.197875,-.154074,.349886,.184303,.224368,-.166307,.369352,.210669,.252213,-.178051,.386242,.238895,.277321,-.189335,.395294,.269182,.310332,-.200683,.412148,.302508,.338809,-.210856,.418266,.337264,.372678,-.220655,.428723,.374881,.405632,-.230053,.433887,.415656,.442293,-.237993,.439911,.457982,.477256,-.244897,.440175,.502831,.515592,-.250657,.441079,.550277,.550969,-.255459,.435219,.601102,.592883,-.257696,.432882,.651785,.629092,-.259894,.421054,.708961,.672033,-.258592,.41177,.763806,.709147,-.256525,.395267,.824249,.745367,-.254677,.375013,.8951,.784715,-.247892,.353906,.959317,.818107,-.240162,.327801,1.03153,.847895,-.229741,.298821,1.10601,.879603,-.213084,.269115,1.164,.902605,-.195242,.236606,1.22854,.922788,-.174505,.203442,1.29017,.944831,-.150169,.169594,1.34157,.959656,-.124099,.135909,1.3956,.972399,-.0960626,.0990563,1.45128,.986549,-.0657097,.0602348,1.50312,1.00013,-.0333558,.0186694,1.55364,619747e-11,-1e-7,.00778326,796756e-16,237499e-13,-999999e-13,282592e-10,114596e-15,100292e-11,-166369e-11,250354e-9,677492e-14,350752e-11,-637769e-11,357289e-9,631655e-13,826445e-11,-174689e-10,516179e-9,31851e-11,242481e-10,-450868e-10,.0010223,130577e-11,455631e-10,-89044e-9,.00144302,374587e-11,971222e-10,-178311e-9,.00241912,102584e-10,171403e-9,-313976e-9,.00354938,236481e-10,292747e-9,-520026e-9,.00513765,496014e-10,789827e-9,-.00118187,.0238621,139056e-9,.00114093,-.00171827,.0286691,244093e-9,.00176119,-.00249667,.0368565,420623e-9,.0022233,-.00333742,.0400469,65673e-8,.00343382,-.00481976,.0535751,.00109323,.00427602,-.00600755,.057099,.00155268,.00461435,-.00737637,.0551084,.00215031,.00695698,-.00971401,.0715767,.00316529,.00867619,-.0120943,.0793314,.00436995,.0106694,-.0148202,.0869391,.0058959,.0140351,-.0183501,.101572,.00798757,.0168939,-.022006,.11018,.0104233,.020197,-.0261568,.119041,.0134167,.0254702,-.0312778,.135404,.0173009,.0298384,-.0362469,.1437,.0215428,.035159,-.042237,.15512,.0268882,.0427685,-.0488711,.17128,.033235,.0494848,-.0557997,.181813,.0404443,.0592394,-.0635578,.198745,.0490043,.0681463,-.071838,.210497,.0588239,.0804753,-.0809297,.228864,.0702835,.0942205,-.0906488,.247008,.0834012,.106777,-.100216,.258812,.0975952,.124471,-.110827,.278617,.114162,.138389,-.121193,.287049,.131983,.159543,-.13253,.307151,.152541,.176432,-.143611,.31564,.174673,.201723,-.15548,.33538,.199842,.229721,-.167166,.355256,.227097,.250206,-.178238,.360047,.256014,.282118,-.189905,.378761,.28855,.312821,-.201033,.39181,.323348,.341482,-.211584,.397716,.360564,.377368,-.221314,.410141,.400004,.418229,-.230474,.423485,.442371,.444881,-.239443,.418874,.488796,.488899,-.245987,.427545,.535012,.520317,-.253948,.422147,.589678,.568566,-.256616,.42719,.637683,.599607,-.26376,.415114,.703363,.64222,-.268687,.408715,.771363,.685698,-.2694,.399722,.83574,.732327,-.266642,.388651,.897764,.769873,-.267712,.369198,.983312,.806733,-.263479,.346802,1.06222,.843466,-.254575,.321368,1.13477,.873008,-.242749,.29211,1.20712,.908438,-.22725,.262143,1.27465,.936321,-.207621,.228876,1.33203,.950353,-.187932,.19484,1.40439,.96442,-.165154,.163178,1.4732,.979856,-.139302,.127531,1.53574,.982561,-.11134,.0903457,1.59982,.996389,-.0808124,.0489007,1.6577],t=[1,0,0,0,1,791421e-36,0,0,1,104392e-29,0,0,1,349405e-26,0,0,1,109923e-23,0,0,1,947414e-22,0,0,1,359627e-20,0,0,1,772053e-19,0,0,1,108799e-17,0,0,1,110655e-16,0,0,1,865818e-16,0,0,.999998,545037e-15,0,0,.999994,285095e-14,0,0,.999989,126931e-13,0,0,.999973,489938e-13,0,0,.999947,166347e-12,0,0,.999894,502694e-12,0,0,.999798,136532e-11,0,0,.999617,335898e-11,0,0,.999234,752126e-11,0,0,.998258,152586e-10,0,0,.99504,266207e-10,0,0,.980816,236802e-10,0,0,.967553,207684e-11,0,0,.966877,403733e-11,0,0,.965752,741174e-11,0,0,.96382,127746e-10,0,0,.960306,202792e-10,0,0,.953619,280232e-10,0,0,.941103,278816e-10,0,0,.926619,160221e-10,0,0,.920983,235164e-10,0,0,.912293,311924e-10,0,.0158731,.899277,348118e-10,0,.0476191,.880884,26041e-9,0,.0793651,.870399,338726e-10,0,.111111,.856138,392906e-10,0,.142857,.837436,372874e-10,0,.174603,.820973,392558e-10,0,.206349,.803583,434658e-10,0,.238095,.782168,40256e-9,0,.269841,.764107,448159e-10,0,.301587,.743092,457627e-10,0,.333333,.721626,455314e-10,0,.365079,.700375,477335e-10,0,.396825,.677334,461072e-10,0,.428571,.655702,484393e-10,0,.460317,.632059,464583e-10,0,.492064,.610125,483923e-10,0,.52381,.58653,464342e-10,0,.555556,.564508,477033e-10,0,.587302,.541405,459263e-10,0,.619048,.519556,46412e-9,0,.650794,.497292,448913e-10,0,.68254,.475898,445789e-10,0,.714286,.454722,433496e-10,0,.746032,.434042,423054e-10,0,.777778,.414126,413737e-10,0,.809524,.394387,397265e-10,0,.84127,.375841,390709e-10,0,.873016,.357219,369938e-10,0,.904762,.340084,365618e-10,0,.936508,.322714,342533e-10,0,.968254,.306974,339596e-10,0,1,1,101524e-23,0,0,1,10292e-22,0,0,1,130908e-23,0,0,1,473331e-23,0,0,1,625319e-22,0,0,1,107932e-20,0,0,1,163779e-19,0,0,1,203198e-18,0,0,1,204717e-17,0,0,.999999,168995e-16,0,0,.999998,115855e-15,0,0,.999996,66947e-14,0,0,.999991,330863e-14,0,0,.999983,141737e-13,0,0,.999968,532626e-13,0,0,.99994,177431e-12,0,0,.999891,528835e-12,0,0,.999797,142169e-11,0,0,.999617,347057e-11,0,0,.999227,77231e-10,0,0,.998239,155753e-10,0,0,.994937,268495e-10,0,0,.980225,213742e-10,0,0,.967549,21631e-10,0,0,.966865,417989e-11,0,0,.965739,763341e-11,0,0,.963794,130892e-10,0,0,.960244,206456e-10,0,0,.953495,282016e-10,0,148105e-9,.940876,271581e-10,0,.002454,.926569,164159e-10,0,.00867491,.920905,239521e-10,0,.01956,.912169,315127e-10,0,.035433,.899095,346626e-10,0,.056294,.882209,290223e-10,0,.0818191,.870272,342992e-10,0,.111259,.855977,394164e-10,0,.142857,.837431,372343e-10,0,.174603,.820826,396691e-10,0,.206349,.803408,435395e-10,0,.238095,.782838,419579e-10,0,.269841,.763941,450953e-10,0,.301587,.742904,455847e-10,0,.333333,.721463,458833e-10,0,.365079,.700197,477159e-10,0,.396825,.677501,470641e-10,0,.428571,.655527,484732e-10,0,.460317,.6324,476834e-10,0,.492064,.609964,484213e-10,0,.52381,.586839,475541e-10,0,.555556,.564353,476951e-10,0,.587302,.541589,467611e-10,0,.619048,.519413,463493e-10,0,.650794,.497337,453994e-10,0,.68254,.475797,445308e-10,0,.714286,.454659,435787e-10,0,.746032,.434065,424839e-10,0,.777778,.414018,41436e-9,0,.809524,.39455,401902e-10,0,.84127,.375742,390813e-10,0,.873016,.357501,377116e-10,0,.904762,.339996,36535e-9,0,.936508,.323069,351265e-10,0,.968254,.306897,339112e-10,0,1,1,10396e-19,0,0,1,104326e-20,0,0,1,110153e-20,0,0,1,144668e-20,0,0,1,34528e-19,0,0,1,175958e-19,0,0,1,12627e-17,0,0,1,936074e-18,0,0,1,645742e-17,0,0,.999998,401228e-16,0,0,.999997,222338e-15,0,0,.999995,10967e-13,0,0,.999991,482132e-14,0,0,.999981,189434e-13,0,0,.999967,667716e-13,0,0,.999938,212066e-12,0,0,.999886,60977e-11,0,0,.999792,159504e-11,0,0,.999608,381191e-11,0,0,.999209,833727e-11,0,0,.998179,165288e-10,0,0,.994605,274387e-10,0,0,.979468,167316e-10,0,0,.967529,242877e-11,0,0,.966836,461696e-11,0,0,.96569,830977e-11,0,0,.963706,140427e-10,0,244659e-11,.960063,217353e-10,0,760774e-9,.953113,286606e-10,0,.00367261,.940192,247691e-10,0,.00940263,.927731,195814e-10,0,.018333,.920669,252531e-10,0,.0306825,.911799,324277e-10,0,.0465556,.89857,340982e-10,0,.0659521,.883283,319622e-10,0,.0887677,.86989,35548e-9,0,.114784,.855483,397143e-10,0,.143618,.837987,391665e-10,0,.174606,.820546,411306e-10,0,.206349,.802878,436753e-10,0,.238095,.783402,444e-7,0,.269841,.763439,458726e-10,0,.301587,.742925,467097e-10,0,.333333,.721633,478887e-10,0,.365079,.69985,481251e-10,0,.396825,.67783,491811e-10,0,.428571,.655126,488199e-10,0,.460318,.632697,496025e-10,0,.492064,.609613,48829e-9,0,.52381,.587098,492754e-10,0,.555556,.564119,482625e-10,0,.587302,.541813,482807e-10,0,.619048,.519342,471552e-10,0,.650794,.497514,466765e-10,0,.68254,.475879,455582e-10,0,.714286,.454789,446007e-10,0,.746032,.434217,435382e-10,0,.777778,.414086,421753e-10,0,.809524,.394744,412093e-10,0,.84127,.375782,396634e-10,0,.873016,.357707,386419e-10,0,.904762,.340038,370345e-10,0,.936508,.323284,359725e-10,0,.968254,.306954,3436e-8,0,1,1,599567e-19,0,0,1,600497e-19,0,0,1,614839e-19,0,0,1,686641e-19,0,0,1,972658e-19,0,0,1,221271e-18,0,0,1,833195e-18,0,0,1,403601e-17,0,0,.999999,206001e-16,0,0,.999998,101739e-15,0,0,.999997,470132e-15,0,0,.999993,200436e-14,0,0,.999988,783682e-14,0,0,.999979,280338e-13,0,0,.999962,917033e-13,0,0,.999933,274514e-12,0,0,.999881,753201e-12,0,0,.999783,189826e-11,0,0,.999594,440279e-11,0,0,.999178,93898e-10,0,0,.998073,181265e-10,0,0,.993993,280487e-10,0,0,.979982,149422e-10,0,0,.968145,378481e-11,0,0,.966786,53771e-10,0,0,.965611,947508e-11,0,388934e-10,.963557,156616e-10,0,9693e-7,.959752,235144e-10,0,.00370329,.952461,291568e-10,0,.00868428,.940193,240102e-10,0,.0161889,.929042,231235e-10,0,.0263948,.920266,273968e-10,0,.0394088,.911178,337915e-10,0,.0552818,.897873,333629e-10,0,.0740138,.884053,351405e-10,0,.0955539,.869455,378034e-10,0,.119795,.854655,399378e-10,0,.14656,.838347,419108e-10,0,.175573,.820693,440831e-10,0,.206388,.802277,445599e-10,0,.238095,.783634,472691e-10,0,.269841,.763159,476984e-10,0,.301587,.742914,491487e-10,0,.333333,.721662,502312e-10,0,.365079,.699668,502817e-10,0,.396825,.677839,51406e-9,0,.428571,.655091,511095e-10,0,.460317,.632665,516067e-10,0,.492064,.609734,512255e-10,0,.52381,.587043,510263e-10,0,.555556,.564298,50565e-9,0,.587302,.541769,497951e-10,0,.619048,.519529,492698e-10,0,.650794,.497574,482066e-10,0,.68254,.476028,473689e-10,0,.714286,.454961,461941e-10,0,.746032,.434341,450618e-10,0,.777778,.414364,438355e-10,0,.809524,.394832,424196e-10,0,.84127,.376109,412563e-10,0,.873016,.35779,396226e-10,0,.904762,.340379,384886e-10,0,.936508,.323385,368214e-10,0,.968254,.307295,356636e-10,0,1,1,106465e-17,0,0,1,106555e-17,0,0,1,107966e-17,0,0,1,114601e-17,0,0,1,137123e-17,0,0,1,21243e-16,0,0,.999999,489653e-17,0,0,.999999,160283e-16,0,0,.999998,62269e-15,0,0,.999997,251859e-15,0,0,.999996,996192e-15,0,0,.999992,374531e-14,0,0,.999986,132022e-13,0,0,.999975,433315e-13,0,0,.999959,131956e-12,0,0,.999927,372249e-12,0,0,.999871,972461e-12,0,0,.999771,235343e-11,0,0,.999572,52768e-10,0,0,.999133,109237e-10,0,0,.997912,203675e-10,0,0,.993008,279396e-10,0,0,.980645,139604e-10,0,0,.970057,646596e-11,0,0,.966717,65089e-10,0,474145e-10,.965497,111863e-10,0,89544e-8,.96334,179857e-10,0,.0032647,.959294,259045e-10,0,.0075144,.951519,292327e-10,0,.0138734,.940517,249769e-10,0,.0224952,.93014,26803e-9,0,.0334828,.91972,303656e-10,0,.0468973,.910294,353323e-10,0,.0627703,.897701,351002e-10,0,.0811019,.884522,388104e-10,0,.10186,.869489,412932e-10,0,.124985,.853983,415781e-10,0,.150372,.838425,454066e-10,0,.177868,.820656,471624e-10,0,.207245,.801875,475243e-10,0,.238143,.783521,505621e-10,0,.269841,.763131,50721e-9,0,.301587,.74261,523293e-10,0,.333333,.72148,528699e-10,0,.365079,.699696,538677e-10,0,.396825,.677592,539255e-10,0,.428571,.65525,546367e-10,0,.460317,.632452,541348e-10,0,.492064,.609903,544976e-10,0,.52381,.586928,536201e-10,0,.555556,.564464,535185e-10,0,.587302,.541801,524949e-10,0,.619048,.519681,51812e-9,0,.650794,.497685,507687e-10,0,.68254,.47622,496243e-10,0,.714286,.455135,485714e-10,0,.746032,.4346,471847e-10,0,.777778,.414564,459294e-10,0,.809524,.395165,444705e-10,0,.84127,.376333,430772e-10,0,.873016,.358197,416229e-10,0,.904762,.34064,401019e-10,0,.936508,.323816,386623e-10,0,.968254,.307581,370933e-10,0,1,1,991541e-17,0,0,1,992077e-17,0,0,1,100041e-16,0,0,1,10385e-15,0,0,1,115777e-16,0,0,1,150215e-16,0,0,.999999,254738e-16,0,0,.999999,598822e-16,0,0,.999998,179597e-15,0,0,.999997,602367e-15,0,0,.999994,206835e-14,0,0,.99999,694952e-14,0,0,.999984,223363e-13,0,0,.999972,678578e-13,0,0,.999952,193571e-12,0,0,.999919,516594e-12,0,0,.99986,128739e-11,0,0,.999753,299298e-11,0,0,.999546,648258e-11,0,0,.999074,129985e-10,0,0,.997671,232176e-10,0,0,.991504,256701e-10,0,0,.981148,131141e-10,0,0,.971965,869048e-11,0,280182e-10,.966624,808301e-11,0,695475e-9,.965344,135235e-10,0,.00265522,.963048,210592e-10,0,.00622975,.958673,287473e-10,0,.0116234,.950262,281379e-10,0,.018976,.940836,271089e-10,0,.0283844,.930996,30926e-9,0,.0399151,.919848,348359e-10,0,.0536063,.909136,366092e-10,0,.0694793,.897554,384162e-10,0,.0875342,.884691,430971e-10,0,.107749,.869414,447803e-10,0,.130087,.853462,452858e-10,0,.154481,.838187,495769e-10,0,.180833,.820381,502709e-10,0,.209005,.801844,522713e-10,0,.238791,.783061,541505e-10,0,.269869,.763205,553712e-10,0,.301587,.742362,564909e-10,0,.333333,.721393,572646e-10,0,.365079,.699676,581012e-10,0,.396825,.677395,58096e-9,0,.428571,.655208,585766e-10,0,.460317,.632451,583602e-10,0,.492064,.609839,580234e-10,0,.52381,.587093,577161e-10,0,.555556,.564467,568447e-10,0,.587302,.542043,563166e-10,0,.619048,.519826,55156e-9,0,.650794,.497952,541682e-10,0,.68254,.476477,528971e-10,0,.714286,.455412,514952e-10,0,.746032,.434926,502222e-10,0,.777778,.4149,485779e-10,0,.809524,.395552,472242e-10,0,.84127,.376712,454891e-10,0,.873016,.358622,440924e-10,0,.904762,.341048,422984e-10,0,.936508,.324262,408582e-10,0,.968254,.308013,390839e-10,0,1,1,613913e-16,0,0,1,614145e-16,0,0,1,617708e-16,0,0,1,633717e-16,0,0,1,681648e-16,0,0,1,808291e-16,0,0,1,114608e-15,0,0,.999998,210507e-15,0,0,.999997,499595e-15,0,0,.999995,139897e-14,0,0,.999994,419818e-14,0,0,.999988,127042e-13,0,0,.999979,375153e-13,0,0,.999965,106206e-12,0,0,.999945,285381e-12,0,0,.999908,723611e-12,0,0,.999846,17255e-10,0,0,.999733,386104e-11,0,0,.999511,808493e-11,0,0,.998993,156884e-10,0,0,.997326,265538e-10,0,0,.989706,206466e-10,0,0,.981713,130756e-10,0,70005e-10,.973636,106473e-10,0,464797e-9,.966509,10194e-9,0,.00201743,.965149,165881e-10,0,.00497549,.962669,249147e-10,0,.00953262,.95786,317449e-10,0,.0158211,.949334,281045e-10,0,.0239343,.941041,303263e-10,0,.0339372,.931575,356754e-10,0,.0458738,.920102,397075e-10,0,.059772,.908002,384886e-10,0,.075645,.897269,43027e-9,0,.0934929,.884559,479925e-10,0,.113302,.869161,48246e-9,0,.135045,.853342,509505e-10,0,.158678,.837633,542846e-10,0,.184136,.820252,554139e-10,0,.211325,.801872,581412e-10,0,.240113,.782418,585535e-10,0,.270306,.7631,610923e-10,0,.301594,.742183,613678e-10,0,.333333,.721098,627275e-10,0,.365079,.699512,629413e-10,0,.396825,.677372,636351e-10,0,.428571,.655059,633555e-10,0,.460317,.632567,636513e-10,0,.492064,.609784,628965e-10,0,.52381,.587237,625546e-10,0,.555556,.564525,615825e-10,0,.587302,.542181,605048e-10,0,.619048,.520017,596329e-10,0,.650794,.498204,581516e-10,0,.68254,.476742,569186e-10,0,.714286,.455803,553833e-10,0,.746032,.435251,537807e-10,0,.777778,.415374,522025e-10,0,.809524,.395921,503421e-10,0,.84127,.377253,488211e-10,0,.873016,.359021,468234e-10,0,.904762,.341637,453269e-10,0,.936508,.3247,433014e-10,0,.968254,.308625,418007e-10,0,1,1,286798e-15,0,0,1,286877e-15,0,0,1,288094e-15,0,0,1,293506e-15,0,0,1,309262e-15,0,0,.999999,348593e-15,0,0,.999999,444582e-15,0,0,.999998,688591e-15,0,0,.999996,134391e-14,0,0,.999993,317438e-14,0,0,.999989,835609e-14,0,0,.999983,228677e-13,0,0,.999974,623361e-13,0,0,.999959,165225e-12,0,0,.999936,419983e-12,0,0,.999896,101546e-11,0,0,.99983,232376e-11,0,0,.999709,50156e-10,0,0,.999469,10167e-9,0,0,.998886,190775e-10,0,0,.996819,300511e-10,0,0,.988837,185092e-10,0,168222e-12,.982178,134622e-10,0,259622e-9,.975017,125961e-10,0,.00142595,.967101,13507e-9,0,.00382273,.964905,205003e-10,0,.00764164,.96218,29546e-9,0,.0130121,.956821,343738e-10,0,.0200253,.948829,305063e-10,0,.0287452,.941092,346487e-10,0,.039218,.931883,412061e-10,0,.0514748,.920211,444651e-10,0,.0655351,.907307,431252e-10,0,.0814082,.89684,490382e-10,0,.0990939,.884119,53334e-9,0,.118583,.869148,54114e-9,0,.139856,.853377,578536e-10,0,.162882,.836753,592285e-10,0,.187615,.820063,622787e-10,0,.213991,.801694,645492e-10,0,.241918,.782116,65353e-9,0,.271267,.762673,674344e-10,0,.301847,.742133,682788e-10,0,.333333,.720779,691959e-10,0,.365079,.699386,696817e-10,0,.396826,.67732,699583e-10,0,.428572,.654888,698447e-10,0,.460318,.632499,694063e-10,0,.492064,.609825,691612e-10,0,.52381,.587287,681576e-10,0,.555556,.564743,674138e-10,0,.587302,.542409,661617e-10,0,.619048,.520282,647785e-10,0,.650794,.498506,633836e-10,0,.68254,.477102,615905e-10,0,.714286,.456167,601013e-10,0,.746032,.435728,581457e-10,0,.777778,.415809,564215e-10,0,.809524,.396517,544997e-10,0,.84127,.377737,525061e-10,0,.873016,.359698,506831e-10,0,.904762,.342164,48568e-9,0,.936508,.325417,467826e-10,0,.968254,.309186,446736e-10,0,1,1,109018e-14,0,0,1,10904e-13,0,0,1,109393e-14,0,0,1,11095e-13,0,0,1,1154e-12,0,0,1,126089e-14,0,0,.999999,15059e-13,0,0,.999997,207899e-14,0,0,.999994,348164e-14,0,0,.999993,705728e-14,0,0,.999987,163692e-13,0,0,.999981,406033e-13,0,0,.999969,10245e-11,0,0,.999953,255023e-12,0,0,.999925,61511e-11,0,0,.999881,142218e-11,0,0,.99981,313086e-11,0,0,.99968,653119e-11,0,0,.999418,12832e-9,0,0,.998748,232497e-10,0,0,.996066,329522e-10,0,0,.988379,179613e-10,0,108799e-9,.982567,143715e-10,0,921302e-9,.976097,148096e-10,0,.00280738,.968475,178905e-10,0,.00596622,.964606,253921e-10,0,.0105284,.961564,348623e-10,0,.0165848,.955517,357612e-10,0,.0242,.948381,343493e-10,0,.03342,.941095,405849e-10,0,.0442777,.931923,475394e-10,0,.0567958,.91996,484328e-10,0,.0709879,.907419,502146e-10,0,.086861,.89618,561654e-10,0,.104415,.88337,587612e-10,0,.123643,.869046,618057e-10,0,.144531,.853278,657392e-10,0,.167057,.836091,66303e-9,0,.191188,.819644,704445e-10,0,.216878,.801246,714071e-10,0,.244062,.782031,740093e-10,0,.272649,.762066,74685e-9,0,.302509,.741964,766647e-10,0,.333442,.720554,766328e-10,0,.365079,.699098,777857e-10,0,.396826,.677189,774633e-10,0,.428572,.65484,776235e-10,0,.460318,.632496,770316e-10,0,.492064,.609908,762669e-10,0,.52381,.587312,753972e-10,0,.555556,.564938,739994e-10,0,.587302,.542577,728382e-10,0,.619048,.52062,71112e-9,0,.650794,.498819,694004e-10,0,.68254,.477555,675575e-10,0,.714286,.456568,653449e-10,0,.746032,.436278,636068e-10,0,.777778,.41637,613466e-10,0,.809524,.397144,594177e-10,0,.84127,.378412,570987e-10,0,.873016,.360376,550419e-10,0,.904762,.342906,527422e-10,0,.936508,.326136,506544e-10,0,.968254,.30997,484307e-10,0,1,1,354014e-14,0,0,1,354073e-14,0,0,1,354972e-14,0,0,1,358929e-14,0,0,1,370093e-14,0,0,.999999,396194e-14,0,0,.999998,453352e-14,0,0,.999997,578828e-14,0,0,.999994,863812e-14,0,0,.999991,153622e-13,0,0,.999985,316356e-13,0,0,.999977,712781e-13,0,0,.999964,166725e-12,0,0,.999945,390501e-12,0,0,.999912,895622e-12,0,0,.999866,198428e-11,0,0,.999786,421038e-11,0,0,.999647,850239e-11,0,0,.999356,162059e-10,0,0,.998563,282652e-10,0,0,.994928,336309e-10,0,244244e-10,.987999,178458e-10,0,523891e-9,.982893,159162e-10,0,.00194729,.977044,178056e-10,0,.00451099,.969972,230624e-10,0,.00835132,.964237,313922e-10,0,.013561,.960791,406145e-10,0,.0202056,.954292,372796e-10,0,.0283321,.948052,403199e-10,0,.0379739,.940938,479537e-10,0,.0491551,.931689,545292e-10,0,.0618918,.91987,54038e-9,0,.0761941,.907665,589909e-10,0,.0920672,.895281,642651e-10,0,.109511,.882621,659707e-10,0,.12852,.86873,709973e-10,0,.149085,.853008,742221e-10,0,.171189,.835944,761754e-10,0,.194809,.818949,797052e-10,0,.21991,.800951,812434e-10,0,.246447,.781847,838075e-10,0,.274352,.761649,84501e-9,0,.303535,.74152,860258e-10,0,.333857,.720495,866233e-10,0,.365104,.698742,868326e-10,0,.396826,.677096,87133e-9,0,.428572,.654782,863497e-10,0,.460318,.632335,860206e-10,0,.492064,.610031,849337e-10,0,.52381,.587457,838279e-10,0,.555556,.56513,82309e-9,0,.587302,.542877,803542e-10,0,.619048,.5209,786928e-10,0,.650794,.499291,765171e-10,0,.68254,.477971,744753e-10,0,.714286,.457221,72209e-9,0,.746032,.436803,697448e-10,0,.777778,.417083,675333e-10,0,.809524,.397749,648058e-10,0,.84127,.379177,625759e-10,0,.873016,.361061,598584e-10,0,.904762,.343713,575797e-10,0,.936508,.326894,549999e-10,0,.968254,.310816,527482e-10,0,1,1,10153e-12,0,0,1,101544e-13,0,0,1,101751e-13,0,0,1,102662e-13,0,0,1,10521e-12,0,0,.999999,111049e-13,0,0,.999999,123408e-13,0,0,.999996,14924e-12,0,0,.999992,204471e-13,0,0,.999989,326539e-13,0,0,.99998,603559e-13,0,0,.999971,123936e-12,0,0,.999955,269058e-12,0,0,.999933,593604e-12,0,0,.999901,129633e-11,0,0,.999847,275621e-11,0,0,.999761,564494e-11,0,0,.999607,110485e-10,0,0,.999282,204388e-10,0,0,.99831,341084e-10,0,22038e-11,.993288,294949e-10,0,242388e-9,.987855,192736e-10,0,.0012503,.983167,182383e-10,0,.0032745,.977908,218633e-10,0,.00646321,.971194,290662e-10,0,.0109133,.963867,386401e-10,0,.0166927,.95982,462827e-10,0,.0238494,.953497,420705e-10,0,.0324178,.947621,477743e-10,0,.0424225,.940611,568258e-10,0,.0538808,.931174,618061e-10,0,.0668047,.919919,627098e-10,0,.0812014,.907856,694714e-10,0,.0970745,.894509,735008e-10,0,.114424,.881954,763369e-10,0,.133246,.868309,821896e-10,0,.153534,.852511,83769e-9,0,.175275,.835821,881615e-10,0,.198453,.817981,896368e-10,0,.223042,.800504,930906e-10,0,.249009,.78141,945056e-10,0,.276304,.761427,963605e-10,0,.304862,.74094,968088e-10,0,.334584,.720233,981481e-10,0,.365322,.698592,979122e-10,0,.396826,.676763,981057e-10,0,.428571,.654808,973956e-10,0,.460318,.632326,962619e-10,0,.492064,.610049,952996e-10,0,.52381,.58763,933334e-10,0,.555556,.565261,917573e-10,0,.587302,.543244,896636e-10,0,.619048,.521273,873304e-10,0,.650794,.499818,852648e-10,0,.68254,.478536,823961e-10,0,.714286,.457826,79939e-9,0,.746032,.437549,77126e-9,0,.777778,.41776,743043e-10,0,.809524,.39863,716426e-10,0,.84127,.379954,686456e-10,0,.873016,.362025,660514e-10,0,.904762,.344581,630755e-10,0,.936508,.327909,605439e-10,0,.968254,.311736,576345e-10,0,1,1,263344e-13,0,0,1,263373e-13,0,0,1,263815e-13,0,0,1,265753e-13,0,0,1,271132e-13,0,0,.999999,283279e-13,0,0,.999997,30833e-12,0,0,.999995,358711e-13,0,0,.999992,461266e-13,0,0,.999985,67574e-12,0,0,.999977,11358e-11,0,0,.999966,213657e-12,0,0,.999948,431151e-12,0,0,.999923,896656e-12,0,0,.999884,186603e-11,0,0,.999826,381115e-11,0,0,.999732,754184e-11,0,0,.999561,143192e-10,0,0,.999191,257061e-10,0,0,.997955,405724e-10,0,744132e-10,.992228,276537e-10,0,716477e-9,.987638,208885e-10,0,.0022524,.983395,215226e-10,0,.00484816,.978614,270795e-10,0,.00860962,.972389,365282e-10,0,.0136083,.964392,474747e-10,0,.0198941,.95861,509141e-10,0,.0275023,.952806,48963e-9,0,.0364584,.94712,571119e-10,0,.04678,.940104,671704e-10,0,.0584799,.930398,687586e-10,0,.0715665,.919866,738161e-10,0,.086045,.907853,813235e-10,0,.101918,.894078,834582e-10,0,.119186,.881177,892093e-10,0,.137845,.867575,944548e-10,0,.157891,.852107,969607e-10,0,.179316,.835502,101456e-9,0,.202106,.81756,103256e-9,0,.226243,.79984,106954e-9,0,.251704,.780998,108066e-9,0,.278451,.761132,110111e-9,0,.306436,.740429,110459e-9,0,.335586,.719836,111219e-9,0,.365796,.698467,11145e-8,0,.3969,.676446,110393e-9,0,.428571,.654635,110035e-9,0,.460318,.632411,108548e-9,0,.492064,.609986,106963e-9,0,.52381,.587872,105238e-9,0,.555556,.565528,102665e-9,0,.587302,.543563,100543e-9,0,.619048,.52176,976182e-10,0,.650794,.500188,947099e-10,0,.68254,.479204,919929e-10,0,.714286,.458413,886139e-10,0,.746032,.438314,857839e-10,0,.777778,.418573,82411e-9,0,.809524,.39947,792211e-10,0,.84127,.380892,759546e-10,0,.873016,.362953,727571e-10,0,.904762,.345601,695738e-10,0,.936508,.328895,664907e-10,0,.968254,.312808,634277e-10,0,1,1,628647e-13,0,0,1,628705e-13,0,0,1,629587e-13,0,0,1,633441e-13,0,0,.999999,644087e-13,0,0,.999998,667856e-13,0,0,.999997,715889e-13,0,0,.999995,809577e-13,0,0,.999989,992764e-13,0,0,.999983,135834e-12,0,0,.999974,210482e-12,0,0,.999959,365215e-12,0,0,.999939,686693e-12,0,0,.999911,13472e-10,0,0,.999868,26731e-10,0,0,.999804,524756e-11,0,0,.9997,100403e-10,0,0,.99951,185019e-10,0,0,.999078,322036e-10,0,620676e-11,.997428,470002e-10,0,341552e-9,.99162,287123e-10,0,.00143727,.987479,234706e-10,0,.00349201,.983582,260083e-10,0,.0066242,.979186,337927e-10,0,.0109113,.97325,454689e-10,0,.0164064,.965221,573759e-10,0,.0231463,.957262,544114e-10,0,.0311571,.952211,587006e-10,0,.0404572,.946631,692256e-10,0,.0510592,.939391,787819e-10,0,.0629723,.929795,792368e-10,0,.0762025,.91965,875075e-10,0,.090753,.907737,950903e-10,0,.106626,.893899,972963e-10,0,.123822,.880239,10459e-8,0,.142337,.866562,107689e-9,0,.16217,.85164,113081e-9,0,.183314,.835021,116636e-9,0,.20576,.817311,120074e-9,0,.229496,.798845,121921e-9,0,.254502,.780479,12475e-8,0,.280753,.760694,125255e-9,0,.308212,.740142,126719e-9,0,.336825,.719248,12636e-8,0,.366517,.698209,126712e-9,0,.397167,.676398,125769e-9,0,.428578,.654378,124432e-9,0,.460318,.632484,123272e-9,0,.492064,.610113,12085e-8,0,.52381,.587931,118411e-9,0,.555556,.565872,11569e-8,0,.587302,.543814,112521e-9,0,.619048,.522265,109737e-9,0,.650794,.500835,106228e-9,0,.68254,.479818,102591e-9,0,.714286,.459258,991288e-10,0,.746032,.439061,952325e-10,0,.777778,.419552,91895e-9,0,.809524,.400399,879051e-10,0,.84127,.381976,844775e-10,0,.873016,.364009,806316e-10,0,.904762,.346761,771848e-10,0,.936508,.330049,735429e-10,0,.968254,.314018,702103e-10,0,1,1,139968e-12,0,0,1,139979e-12,0,0,1,140145e-12,0,0,1,14087e-11,0,0,.999999,142865e-12,0,0,.999998,147279e-12,0,0,.999997,156057e-12,0,0,.999992,17276e-11,0,0,.999989,204352e-12,0,0,.99998,26494e-11,0,0,.999969,383435e-12,0,0,.999953,618641e-12,0,0,.999929,108755e-11,0,0,.999898,201497e-11,0,0,.999849,381346e-11,0,0,.999778,719815e-11,0,0,.999661,133215e-10,0,0,.999451,238313e-10,0,0,.998936,401343e-10,0,113724e-9,.99662,517346e-10,0,820171e-9,.991094,304323e-10,0,.00238143,.987487,281757e-10,0,.00493527,.983731,320048e-10,0,.00856859,.979647,423905e-10,0,.0133393,.973837,562935e-10,0,.0192863,.96584,677442e-10,0,.0264369,.956309,623073e-10,0,.03481,.951523,704131e-10,0,.0444184,.946003,836594e-10,0,.0552713,.938454,911736e-10,0,.0673749,.929279,938264e-10,0,.0807329,.919239,103754e-9,0,.0953479,.907293,109928e-9,0,.111221,.893936,115257e-9,0,.128352,.879674,122265e-9,0,.14674,.865668,125733e-9,0,.166382,.850998,132305e-9,0,.187276,.834498,134844e-9,0,.209413,.816903,139276e-9,0,.232786,.798235,140984e-9,0,.257382,.779724,14378e-8,0,.283181,.760251,144623e-9,0,.310156,.739808,145228e-9,0,.338269,.718762,14539e-8,0,.367461,.697815,144432e-9,0,.397646,.67631,143893e-9,0,.428685,.654278,141846e-9,0,.460318,.632347,13935e-8,0,.492064,.610296,137138e-9,0,.52381,.588039,133806e-9,0,.555556,.566218,130755e-9,0,.587302,.544346,127128e-9,0,.619048,.522701,123002e-9,0,.650794,.501542,119443e-9,0,.68254,.480508,115055e-9,0,.714286,.460092,111032e-9,0,.746032,.440021,106635e-9,0,.777778,.420446,102162e-9,0,.809524,.401512,98184e-9,0,.84127,.38299,936497e-10,0,.873016,.365232,89813e-9,0,.904762,.347865,853073e-10,0,.936508,.331342,817068e-10,0,.968254,.315202,773818e-10,0,1,1,29368e-11,0,0,1,2937e-10,0,0,1,293998e-12,0,0,1,295298e-12,0,0,.999999,298865e-12,0,0,.999998,3067e-10,0,0,.999995,322082e-12,0,0,.999992,350767e-12,0,0,.999986,403538e-12,0,0,.999976,501372e-12,0,0,.999964,68562e-11,0,0,.999945,10374e-10,0,0,.999919,171269e-11,0,0,.999882,300175e-11,0,0,.999829,542144e-11,0,0,.999749,984182e-11,0,0,.99962,176213e-10,0,0,.999382,305995e-10,0,138418e-10,.998751,496686e-10,0,389844e-9,.995344,510733e-10,0,.00150343,.990768,345829e-10,0,.00352451,.987464,342841e-10,0,.00655379,.983846,399072e-10,0,.0106554,.980007,533219e-10,0,.0158723,.974494,696992e-10,0,.0222333,.96622,776754e-10,0,.029758,.956273,747718e-10,0,.0384596,.950952,864611e-10,0,.0483473,.945215,100464e-9,0,.0594266,.937287,103729e-9,0,.0717019,.928649,111665e-9,0,.0851752,.918791,12353e-8,0,.0998479,.906685,127115e-9,0,.115721,.893706,13628e-8,0,.132794,.879248,142427e-9,0,.151067,.864685,148091e-9,0,.170538,.850032,153517e-9,0,.191204,.833853,157322e-9,0,.213063,.816353,161086e-9,0,.236107,.797834,164111e-9,0,.260329,.778831,165446e-9,0,.285714,.759756,167492e-9,0,.312243,.739419,166928e-9,0,.339887,.718491,167e-6,0,.368604,.697392,165674e-9,0,.398329,.676102,163815e-9,0,.428961,.654243,162003e-9,0,.460331,.632176,158831e-9,0,.492064,.610407,155463e-9,0,.52381,.588394,152062e-9,0,.555556,.56645,147665e-9,0,.587302,.5449,14375e-8,0,.619048,.523276,138905e-9,0,.650794,.502179,134189e-9,0,.68254,.481359,129392e-9,0,.714286,.46092,124556e-9,0,.746032,.441084,11957e-8,0,.777778,.421517,114652e-9,0,.809524,.402721,109688e-9,0,.84127,.384222,104667e-9,0,.873016,.366534,999633e-10,0,.904762,.349205,950177e-10,0,.936508,.332702,907301e-10,0,.968254,.316599,859769e-10,0,1,1,585473e-12,0,0,1,585507e-12,0,0,1,58602e-11,0,0,.999999,588259e-12,0,0,.999999,594381e-12,0,0,.999998,607754e-12,0,0,.999995,633729e-12,0,0,.99999,68137e-11,0,0,.999984,767003e-12,0,0,.999973,921212e-12,0,0,.999959,120218e-11,0,0,.999936,172024e-11,0,0,.999907,268088e-11,0,0,.999866,445512e-11,0,0,.999806,768481e-11,0,0,.999716,1342e-8,0,0,.999576,232473e-10,0,0,.9993,391694e-10,0,129917e-9,.998498,608429e-10,0,845035e-9,.994132,489743e-10,0,.00237616,.99031,384644e-10,0,.00484456,.987409,421768e-10,0,.00832472,.983981,504854e-10,0,.0128643,.980268,671028e-10,0,.0184947,.974875,852749e-10,0,.025237,.966063,85531e-9,0,.0331046,.956779,900588e-10,0,.0421067,.950259,10577e-8,0,.0522487,.944239,119458e-9,0,.0635343,.936341,122164e-9,0,.0759654,.928047,134929e-9,0,.0895434,.918065,145544e-9,0,.104269,.906267,150531e-9,0,.120142,.893419,161652e-9,0,.137163,.878758,16593e-8,0,.15533,.863699,174014e-9,0,.174645,.848876,177877e-9,0,.195106,.833032,184049e-9,0,.21671,.815557,186088e-9,0,.239454,.797323,19054e-8,0,.263332,.778124,191765e-9,0,.288336,.758929,192535e-9,0,.314451,.738979,192688e-9,0,.341658,.718213,191522e-9,0,.369924,.696947,190491e-9,0,.399202,.675807,187913e-9,0,.429416,.654147,184451e-9,0,.460447,.63229,181442e-9,0,.492064,.610499,177139e-9,0,.523809,.588747,172596e-9,0,.555555,.566783,167457e-9,0,.587301,.545359,162518e-9,0,.619048,.523984,156818e-9,0,.650794,.502917,151884e-9,0,.68254,.482294,145514e-9,0,.714286,.461945,140199e-9,0,.746032,.442133,134101e-9,0,.777778,.422705,128374e-9,0,.809524,.403916,122996e-9,0,.84127,.38554,116808e-9,0,.873016,.367909,111973e-9,0,.904762,.350651,105938e-9,0,.936508,.334208,101355e-9,0,.968254,.318123,957629e-10,0,1,1,111633e-11,0,0,1,111639e-11,0,0,1,111725e-11,0,0,1,112096e-11,0,0,.999999,11311e-10,0,0,.999997,115315e-11,0,0,.999995,11956e-10,0,0,.999989,127239e-11,0,0,.999981,140772e-11,0,0,.999969,164541e-11,0,0,.999952,206607e-11,0,0,.999928,281783e-11,0,0,.999895,416835e-11,0,0,.999848,658728e-11,0,0,.999781,108648e-10,0,0,.999682,182579e-10,0,0,.999523,306003e-10,0,159122e-10,.999205,499862e-10,0,391184e-9,.998131,73306e-9,0,.00147534,.993334,513229e-10,0,.0034227,.99016,467783e-10,0,.00632232,.987321,523413e-10,0,.0102295,.984099,64267e-9,0,.0151794,.980432,843042e-10,0,.0211947,.974976,102819e-9,0,.0282899,.966429,996234e-10,0,.0364739,.957633,111074e-9,0,.0457522,.949422,128644e-9,0,.0561278,.943045,140076e-9,0,.0676023,.935448,146349e-9,0,.0801762,.927225,161854e-9,0,.0938499,.917033,169135e-9,0,.108623,.905762,179987e-9,0,.124496,.892879,189832e-9,0,.141469,.878435,195881e-9,0,.159541,.863114,20466e-8,0,.178713,.84776,209473e-9,0,.198985,.832084,214861e-9,0,.220355,.814915,217695e-9,0,.242823,.796711,220313e-9,0,.266385,.777603,22313e-8,0,.291036,.757991,222471e-9,0,.316767,.738371,222869e-9,0,.343563,.717872,221243e-9,0,.371402,.696619,218089e-9,0,.400248,.675379,21562e-8,0,.430047,.65411,21169e-8,0,.460709,.63241,206947e-9,0,.492079,.61046,201709e-9,0,.52381,.58903,196753e-9,0,.555556,.567267,189637e-9,0,.587302,.545886,184735e-9,0,.619048,.524714,177257e-9,0,.650794,.503789,171424e-9,0,.68254,.483204,164688e-9,0,.714286,.462976,157172e-9,0,.746032,.443294,151341e-9,0,.777778,.423988,143737e-9,0,.809524,.405325,138098e-9,0,.84127,.386981,130698e-9,0,.873016,.369436,125276e-9,0,.904762,.35219,118349e-9,0,.936508,.335804,11312e-8,0,.968254,.319749,106687e-9,0,1,1,204685e-11,0,0,1,204694e-11,0,0,1,204831e-11,0,0,.999999,205428e-11,0,0,.999999,207056e-11,0,0,.999997,210581e-11,0,0,.999993,21732e-10,0,0,.999987,229365e-11,0,0,.999979,250243e-11,0,0,.999965,286127e-11,0,0,.999947,348028e-11,0,0,.999918,455588e-11,0,0,.999881,643303e-11,0,0,.999828,970064e-11,0,0,.999753,153233e-10,0,0,.999642,24793e-9,0,0,.999464,402032e-10,0,122947e-9,.999089,635852e-10,0,807414e-9,.997567,857026e-10,0,.00227206,.992903,594912e-10,0,.00462812,.990011,578515e-10,0,.00794162,.987192,65399e-9,0,.0122534,.98418,819675e-10,0,.0175888,.980491,105514e-9,0,.0239635,.974779,121532e-9,0,.031387,.96675,119144e-9,0,.0398644,.958248,136125e-9,0,.0493982,.948884,155408e-9,0,.0599896,.941673,162281e-9,0,.0716382,.934521,176754e-9,0,.0843437,.926205,192873e-9,0,.0981056,.916089,200038e-9,0,.112923,.904963,213624e-9,0,.128796,.892089,221834e-9,0,.145725,.878028,232619e-9,0,.163709,.86249,238632e-9,0,.182749,.846587,247002e-9,0,.202847,.830988,250702e-9,0,.224001,.814165,255562e-9,0,.246214,.796135,257505e-9,0,.269482,.777052,258625e-9,0,.293805,.757201,258398e-9,0,.319176,.737655,256714e-9,0,.345587,.717477,255187e-9,0,.373021,.696433,251792e-9,0,.401454,.675084,247223e-9,0,.430844,.653907,242213e-9,0,.461125,.632561,237397e-9,0,.492187,.610658,229313e-9,0,.52381,.589322,224402e-9,0,.555556,.567857,216116e-9,0,.587302,.54652,209124e-9,0,.619048,.525433,201601e-9,0,.650794,.504679,192957e-9,0,.68254,.484203,186052e-9,0,.714286,.464203,177672e-9,0,.746032,.444549,170005e-9,0,.777778,.425346,162401e-9,0,.809524,.406706,1544e-7,0,.84127,.388576,147437e-9,0,.873016,.37094,139493e-9,0,.904762,.353996,133219e-9,0,.936508,.337391,125573e-9,0,.968254,.321648,119867e-9,0,1,1,362511e-11,0,0,1,362525e-11,0,0,1,362739e-11,0,0,.999999,363673e-11,0,0,.999998,366214e-11,0,0,.999996,371698e-11,0,0,.999992,382116e-11,0,0,.999986,400554e-11,0,0,.999976,432058e-11,0,0,.999961,485194e-11,0,0,.999938,574808e-11,0,0,.999908,726643e-11,0,0,.999865,984707e-11,0,0,.999807,142217e-10,0,0,.999723,215581e-10,0,0,.999602,336114e-10,0,119113e-10,.999398,527353e-10,0,355813e-9,.998946,805809e-10,0,.00137768,.996647,942908e-10,0,.00322469,.992298,668733e-10,0,.00597897,.989802,716564e-10,0,.00968903,.987019,821355e-10,0,.0143845,.984219,104555e-9,0,.0200831,.980425,131245e-9,0,.0267948,.974241,139613e-9,0,.034525,.967006,145931e-9,0,.0432757,.95893,167153e-9,0,.0530471,.949157,188146e-9,0,.0638386,.94062,194625e-9,0,.0756487,.933509,213721e-9,0,.0884762,.925088,229616e-9,0,.10232,.915178,239638e-9,0,.117178,.904093,254814e-9,0,.133051,.891337,263685e-9,0,.149939,.877326,274789e-9,0,.167841,.861794,280534e-9,0,.18676,.845758,289534e-9,0,.206696,.829792,294446e-9,0,.22765,.813037,296877e-9,0,.249625,.795285,300217e-9,0,.27262,.776323,299826e-9,0,.296636,.756673,299787e-9,0,.321671,.736856,297867e-9,0,.347718,.716883,294052e-9,0,.374768,.696089,289462e-9,0,.402804,.67505,285212e-9,0,.431796,.653509,27653e-8,0,.461695,.63258,271759e-9,0,.49242,.61104,262811e-9,0,.523822,.589567,255151e-9,0,.555556,.568322,246434e-9,0,.587302,.547235,237061e-9,0,.619048,.52616,228343e-9,0,.650794,.505716,219236e-9,0,.68254,.485274,209595e-9,0,.714286,.465411,201011e-9,0,.746032,.445854,19109e-8,0,.777778,.426911,182897e-9,0,.809524,.408222,173569e-9,0,.84127,.390307,165496e-9,0,.873016,.372624,156799e-9,0,.904762,.355804,14917e-8,0,.936508,.33924,140907e-9,0,.968254,.323534,134062e-9,0,1,1,622487e-11,0,0,1,62251e-10,0,0,1,622837e-11,0,0,.999999,624259e-11,0,0,.999998,628127e-11,0,0,.999996,636451e-11,0,0,.999991,65218e-10,0,0,.999984,679782e-11,0,0,.999973,726361e-11,0,0,.999955,803644e-11,0,0,.999931,931397e-11,0,0,.999896,114299e-10,0,0,.999847,149402e-10,0,0,.999784,207461e-10,0,0,.999692,302493e-10,0,0,.999554,454957e-10,0,997275e-10,.999326,690762e-10,0,724813e-9,.998757,101605e-9,0,.0020972,.995367,958745e-10,0,.00432324,.99209,832808e-10,0,.00746347,.989517,887601e-10,0,.0115534,.987008,10564e-8,0,.0166134,.98421,133179e-9,0,.0226552,.98021,161746e-9,0,.0296838,.973676,161821e-9,0,.0377016,.967052,178635e-9,0,.0467079,.959385,206765e-9,0,.0567013,.949461,22476e-8,0,.0676796,.939578,23574e-8,0,.0796403,.932416,25893e-8,0,.0925812,.923759,271228e-9,0,.106501,.914223,289165e-9,0,.121397,.902942,301156e-9,0,.13727,.890419,313852e-9,0,.15412,.876639,324408e-9,0,.171946,.861316,33249e-8,0,.190751,.84496,338497e-9,0,.210537,.828427,345861e-9,0,.231305,.811871,347863e-9,0,.253057,.794397,350225e-9,0,.275797,.775726,349915e-9,0,.299525,.75617,347297e-9,0,.324242,.736091,344232e-9,0,.349947,.716213,340835e-9,0,.376633,.695736,332369e-9,0,.404289,.674961,327943e-9,0,.432895,.653518,318533e-9,0,.462415,.632574,310391e-9,0,.492788,.61134,300755e-9,0,.523909,.590017,290506e-9,0,.555556,.568752,280446e-9,0,.587302,.548061,269902e-9,0,.619048,.52711,258815e-9,0,.650794,.506682,248481e-9,0,.68254,.486524,237141e-9,0,.714286,.466812,226872e-9,0,.746032,.44732,216037e-9,0,.777778,.428473,205629e-9,0,.809524,.409921,195691e-9,0,.84127,.392028,185457e-9,0,.873016,.374606,176436e-9,0,.904762,.357601,166508e-9,0,.936508,.341348,158385e-9,0,.968254,.32542,149203e-9,0,1,1,103967e-10,0,0,1,10397e-9,0,0,1,104019e-10,0,0,.999999,104231e-10,0,0,.999998,104806e-10,0,0,.999995,106042e-10,0,0,.999991,108366e-10,0,0,.999982,112415e-10,0,0,.999968,119174e-10,0,0,.99995,130227e-10,0,0,.999922,148176e-10,0,0,.999884,177303e-10,0,0,.99983,224564e-10,0,0,.999758,300966e-10,0,0,.999654,423193e-10,0,549083e-11,.999503,614848e-10,0,296087e-9,.999237,903576e-10,0,.00123144,.998491,1271e-7,0,.00295954,.994594,107754e-9,0,.00555829,.99178,103025e-9,0,.00907209,.989265,11154e-8,0,.0135257,.986998,136296e-9,0,.0189327,.984137,169154e-9,0,.0252993,.979798,196671e-9,0,.0326272,.97337,196678e-9,0,.0409157,.967239,223121e-9,0,.0501623,.959543,253809e-9,0,.0603638,.949466,265972e-9,0,.0715171,.939074,288372e-9,0,.0836187,.931118,310983e-9,0,.0966657,.922525,325561e-9,0,.110656,.912983,345725e-9,0,.125588,.901617,3556e-7,0,.141461,.889487,374012e-9,0,.158275,.875787,383445e-9,0,.176031,.860654,393972e-9,0,.19473,.844417,400311e-9,0,.214374,.82741,405004e-9,0,.234967,.810545,407378e-9,0,.256512,.793312,407351e-9,0,.279011,.774847,406563e-9,0,.302468,.755621,404903e-9,0,.326887,.735511,397486e-9,0,.352266,.715435,39357e-8,0,.378605,.695403,384739e-9,0,.405897,.674681,376108e-9,0,.43413,.65359,365997e-9,0,.463277,.632471,354957e-9,0,.493295,.61151,343593e-9,0,.524106,.59064,331841e-9,0,.555561,.569386,318891e-9,0,.587302,.548785,3072e-7,0,.619048,.528146,29361e-8,0,.650794,.507872,281709e-9,0,.68254,.487805,268627e-9,0,.714286,.468196,255887e-9,0,.746032,.448922,243997e-9,0,.777778,.430093,231662e-9,0,.809524,.411845,220339e-9,0,.84127,.393808,208694e-9,0,.873016,.376615,198045e-9,0,.904762,.359655,187375e-9,0,.936508,.343452,177371e-9,0,.968254,.32765,167525e-9,0,1,1,169351e-10,0,0,1,169356e-10,0,0,1,169427e-10,0,0,.999999,169736e-10,0,0,.999998,170575e-10,0,0,.999995,172372e-10,0,0,.99999,175739e-10,0,0,.999979,181568e-10,0,0,.999966,191206e-10,0,0,.999944,20677e-9,0,0,.999912,231644e-10,0,0,.999869,271268e-10,0,0,.999811,334272e-10,0,0,.99973,433979e-10,0,0,.999617,590083e-10,0,680315e-10,.999445,829497e-10,0,612796e-9,.999138,118019e-9,0,.00187408,.998095,156712e-9,0,.00395791,.993919,125054e-9,0,.00692144,.991333,126091e-9,0,.0107962,.989226,144912e-9,0,.0155986,.986954,175737e-9,0,.0213364,.983982,213883e-9,0,.0280114,.979128,234526e-9,0,.0356226,.973327,243725e-9,0,.0441668,.967416,2773e-7,0,.0536399,.959729,308799e-9,0,.0640376,.949758,322447e-9,0,.0753554,.939173,350021e-9,0,.0875893,.9296,370089e-9,0,.100736,.921181,391365e-9,0,.114793,.91164,413636e-9,0,.129759,.900435,427068e-9,0,.145632,.888183,441046e-9,0,.162412,.874772,454968e-9,0,.180101,.859566,461882e-9,0,.1987,.843579,471556e-9,0,.218213,.826453,474335e-9,0,.238641,.809164,477078e-9,0,.259989,.792179,47755e-8,0,.282262,.773866,472573e-9,0,.305464,.754944,469765e-9,0,.329599,.735133,462371e-9,0,.35467,.714858,453674e-9,0,.380678,.694829,443888e-9,0,.407622,.674453,432052e-9,0,.435493,.653685,420315e-9,0,.464275,.632666,406829e-9,0,.493938,.611676,392234e-9,0,.524422,.591193,379208e-9,0,.555624,.570145,36319e-8,0,.587302,.549566,349111e-9,0,.619048,.529278,334166e-9,0,.650794,.509026,318456e-9,0,.68254,.489186,30449e-8,0,.714286,.469662,289051e-9,0,.746032,.450691,275494e-9,0,.777778,.431841,261437e-9,0,.809524,.413752,247846e-9,0,.84127,.395951,235085e-9,0,.873016,.378633,222245e-9,0,.904762,.36194,210533e-9,0,.936508,.345599,198494e-9,0,.968254,.329999,188133e-9,0,1,1,269663e-10,0,0,1,26967e-9,0,0,1,269772e-10,0,0,.999999,270214e-10,0,0,.999998,271415e-10,0,0,.999994,27398e-9,0,0,.999988,278771e-10,0,0,.999977,287019e-10,0,0,.999961,300544e-10,0,0,.999937,322138e-10,0,0,.999904,356163e-10,0,0,.999854,409465e-10,0,0,.99979,492651e-10,0,0,.999699,621722e-10,0,88288e-11,.999572,819715e-10,0,223369e-9,.999381,111689e-9,0,.00105414,.999016,153862e-9,0,.0026493,.997437,187667e-9,0,.00508608,.993545,155672e-9,0,.00840554,.991135,161455e-9,0,.012629,.989157,188241e-9,0,.0177661,.986874,226229e-9,0,.0238198,.983714,268668e-9,0,.0307887,.978301,277109e-9,0,.0386688,.973227,303446e-9,0,.0474554,.967317,341851e-9,0,.0571428,.959477,370885e-9,0,.0677256,.950012,392753e-9,0,.0791988,.939484,42781e-8,0,.0915576,.928135,443866e-9,0,.104798,.919819,472959e-9,0,.118918,.910049,491551e-9,0,.133915,.899181,512616e-9,0,.149788,.886881,523563e-9,0,.166537,.87359,540183e-9,0,.184164,.858613,547386e-9,0,.202669,.842809,554809e-9,0,.222056,.825727,558316e-9,0,.242329,.808086,557824e-9,0,.263492,.790728,556346e-9,0,.285551,.772987,552672e-9,0,.30851,.7541,543738e-9,0,.332376,.734669,536107e-9,0,.357153,.714411,523342e-9,0,.382845,.694196,512238e-9,0,.409454,.674252,497465e-9,0,.436977,.65357,481096e-9,0,.465404,.632999,467054e-9,0,.494713,.611994,448771e-9,0,.524864,.591604,431889e-9,0,.555779,.571134,415238e-9,0,.587302,.550528,396369e-9,0,.619048,.530292,379477e-9,0,.650794,.510364,361488e-9,0,.68254,.490749,343787e-9,0,.714286,.471266,327822e-9,0,.746032,.452462,310626e-9,0,.777778,.433907,295352e-9,0,.809524,.415659,279179e-9,0,.84127,.398138,264685e-9,0,.873016,.380833,249905e-9,0,.904762,.364247,236282e-9,0,.936508,.348041,222905e-9,0,.968254,.332389,210522e-9,0,1,1,420604e-10,0,0,1,420614e-10,0,0,1,420757e-10,0,0,.999999,42138e-9,0,0,.999997,423067e-10,0,0,.999993,426668e-10,0,0,.999986,433372e-10,0,0,.999974,444857e-10,0,0,.999956,463554e-10,0,0,.99993,493105e-10,0,0,.999892,539077e-10,0,0,.999838,610005e-10,0,0,.999767,718822e-10,0,0,.999666,884581e-10,0,365471e-10,.999525,113398e-9,0,485623e-9,.999311,150043e-9,0,.00162096,.998865,200063e-9,0,.00355319,.996278,211014e-9,0,.00633818,.992956,189672e-9,0,.0100043,.991017,210262e-9,0,.0145648,.989055,244292e-9,0,.0200237,.986741,290481e-9,0,.0263798,.983288,334303e-9,0,.033629,.977784,340307e-9,0,.0417652,.973037,377864e-9,0,.0507821,.967181,4239e-7,0,.060673,.958971,443854e-9,0,.0714314,.950093,483039e-9,0,.0830518,.939552,517934e-9,0,.0955288,.927678,539449e-9,0,.108859,.918278,568604e-9,0,.123038,.908449,588505e-9,0,.138065,.897713,612473e-9,0,.153938,.885533,625575e-9,0,.170657,.872131,63854e-8,0,.188224,.857517,647034e-9,0,.20664,.841796,65209e-8,0,.225909,.824726,6544e-7,0,.246035,.807297,655744e-9,0,.267022,.789058,646716e-9,0,.288878,.77189,643898e-9,0,.311607,.753082,629973e-9,0,.335216,.7341,621564e-9,0,.359713,.714094,605171e-9,0,.385103,.693839,588752e-9,0,.41139,.673891,573294e-9,0,.438576,.653565,552682e-9,0,.466656,.633326,533446e-9,0,.495617,.612582,514635e-9,0,.525431,.59205,49303e-8,0,.556041,.571918,471842e-9,0,.587338,.551572,451713e-9,0,.619048,.531553,430049e-9,0,.650794,.51175,410445e-9,0,.68254,.49238,390098e-9,0,.714286,.473143,370033e-9,0,.746032,.45423,351205e-9,0,.777778,.435963,332049e-9,0,.809524,.41787,315021e-9,0,.84127,.400387,297315e-9,0,.873016,.383332,281385e-9,0,.904762,.366665,265397e-9,0,.936508,.350633,250601e-9,0,.968254,.334964,23589e-8,0,1,1,643736e-10,0,0,1,64375e-9,0,0,1,643947e-10,0,0,.999999,64481e-9,0,0,.999997,647143e-10,0,0,.999994,652119e-10,0,0,.999985,661359e-10,0,0,.999972,677116e-10,0,0,.999952,702599e-10,0,0,.999922,742517e-10,0,0,.99988,803906e-10,0,0,.99982,897315e-10,0,0,.999741,103838e-9,0,0,.999629,12496e-8,0,149024e-9,.999474,156161e-9,0,861027e-9,.999229,201034e-9,0,.00231198,.998662,259069e-9,0,.00458147,.995299,245439e-9,0,.00770895,.992732,24498e-8,0,.0117126,.990847,273211e-9,0,.0165989,.988911,316492e-9,0,.0223674,.98654,37161e-8,0,.0290135,.982636,410352e-9,0,.0365309,.977346,421756e-9,0,.0449117,.972909,475578e-9,0,.0541481,.966821,522482e-9,0,.0642326,.958686,545008e-9,0,.075158,.949754,589286e-9,0,.0869181,.939184,619995e-9,0,.0995074,.927505,654266e-9,0,.112922,.916606,682362e-9,0,.127157,.906707,704286e-9,0,.142212,.895937,725909e-9,0,.158085,.883913,743939e-9,0,.174776,.870642,755157e-9,0,.192287,.856241,764387e-9,0,.210619,.84069,771032e-9,0,.229775,.823728,765906e-9,0,.249761,.806481,767604e-9,0,.270582,.787924,754385e-9,0,.292243,.770588,749668e-9,0,.314753,.751991,731613e-9,0,.338118,.733407,717655e-9,0,.362347,.713688,700604e-9,0,.387447,.693595,678765e-9,0,.413424,.673426,657042e-9,0,.440284,.65359,635892e-9,0,.468027,.633576,611569e-9,0,.496645,.613144,586011e-9,0,.526122,.592711,563111e-9,0,.556417,.572722,537699e-9,0,.587451,.552762,512556e-9,0,.619048,.532985,489757e-9,0,.650794,.513219,464139e-9,0,.68254,.493992,442193e-9,0,.714286,.47509,418629e-9,0,.746032,.456287,397045e-9,0,.777778,.438152,375504e-9,0,.809524,.420294,35492e-8,0,.84127,.402749,335327e-9,0,.873016,.385879,316422e-9,0,.904762,.369352,298333e-9,0,.936508,.353301,281417e-9,0,.968254,.337781,265203e-9,0,1,1,968267e-10,0,0,1,968284e-10,0,0,1,968556e-10,0,0,.999999,969733e-10,0,0,.999997,972913e-10,0,0,.999993,979688e-10,0,0,.999984,992239e-10,0,0,.999969,101356e-9,0,0,.999946,104784e-9,0,0,.999913,110111e-9,0,0,.999868,118217e-9,0,0,.999801,130396e-9,0,0,.999712,148523e-9,0,124907e-10,.999589,175233e-9,0,355405e-9,.999416,213999e-9,0,.0013528,.999136,268529e-9,0,.00312557,.998367,333088e-9,0,.00573045,.994701,304757e-9,0,.00919397,.992497,318031e-9,0,.0135261,.990608,353863e-9,0,.0187278,.988715,409044e-9,0,.0247947,.986241,472967e-9,0,.0317196,.981696,495104e-9,0,.039494,.977097,532873e-9,0,.0481087,.972583,594447e-9,0,.0575549,.966142,636867e-9,0,.0678242,.95823,669899e-9,0,.0789089,.949677,719499e-9,0,.0908023,.939226,750584e-9,0,.103499,.927501,793183e-9,0,.116993,.915199,81995e-8,0,.131282,.90498,847654e-9,0,.146364,.894243,868929e-9,0,.162237,.882154,884278e-9,0,.178902,.869161,898108e-9,0,.196358,.854751,901254e-9,0,.21461,.839368,90679e-8,0,.23366,.822874,901541e-9,0,.253512,.805514,897297e-9,0,.274174,.78716,881856e-9,0,.29565,.769061,870032e-9,0,.31795,.751,851719e-9,0,.341081,.732614,830671e-9,0,.365053,.713171,806569e-9,0,.389874,.693472,78338e-8,0,.415553,.673528,756404e-9,0,.442098,.653397,726872e-9,0,.469512,.633781,700494e-9,0,.497794,.613877,67105e-8,0,.526935,.593506,640361e-9,0,.556908,.573667,613502e-9,0,.587657,.553932,583177e-9,0,.61906,.534345,554375e-9,0,.650794,.515042,527811e-9,0,.68254,.495674,499367e-9,0,.714286,.477132,47429e-8,0,.746032,.458609,447726e-9,0,.777778,.440354,424205e-9,0,.809524,.422765,399549e-9,0,.84127,.405472,378315e-9,0,.873016,.388482,355327e-9,0,.904762,.372191,336122e-9,0,.936508,.356099,315247e-9,0,.968254,.340737,29794e-8,0,1,1,143327e-9,0,0,1,14333e-8,0,0,1,143366e-9,0,0,.999999,143524e-9,0,0,.999996,143952e-9,0,0,.999991,144862e-9,0,0,.999981,146544e-9,0,0,.999966,149391e-9,0,0,.999941,153946e-9,0,0,.999905,160971e-9,0,0,.999852,171562e-9,0,0,.99978,18729e-8,0,0,.999681,210386e-9,0,826239e-10,.999546,243906e-9,0,664807e-9,.999352,291739e-9,0,.00196192,.999027,357419e-9,0,.00405941,.997886,422349e-9,0,.00699664,.99419,385008e-9,0,.0107896,.99214,409775e-9,0,.0154415,.990274,456418e-9,0,.0209488,.988455,527008e-9,0,.0273037,.985804,597685e-9,0,.0344969,.98103,613124e-9,0,.0425183,.976674,668321e-9,0,.0513575,.972021,736985e-9,0,.0610046,.965274,773789e-9,0,.0714508,.958046,830852e-9,0,.0826877,.949333,875766e-9,0,.0947085,.939135,917088e-9,0,.107507,.927119,952244e-9,0,.121078,.91469,990626e-9,0,.135419,.903006,.00101304,0,.150526,.892368,.00103834,0,.166399,.880231,.00105002,0,.183038,.867432,.00106331,0,.200443,.853208,.00106783,0,.218618,.837956,.00106458,0,.237566,.821772,.00105945,0,.257291,.804328,.00104685,0,.2778,.786465,.00103178,0,.2991,.768004,.00101077,0,.321199,.74972,985504e-9,0,.344106,.731682,962893e-9,0,.36783,.712813,932146e-9,0,.392383,.693139,89871e-8,0,.417774,.673566,869678e-9,0,.444013,.653483,835525e-9,0,.471107,.633891,799853e-9,0,.49906,.614433,766838e-9,0,.527869,.594586,732227e-9,0,.557517,.574769,696442e-9,0,.587966,.555149,663935e-9,0,.61913,.535898,629826e-9,0,.650794,.516753,596486e-9,0,.68254,.497816,567078e-9,0,.714286,.479034,534399e-9,0,.746032,.460975,507013e-9,0,.777778,.442935,477421e-9,0,.809524,.425263,451101e-9,0,.84127,.408248,424964e-9,0,.873016,.391339,39993e-8,0,.904762,.37513,377619e-9,0,.936508,.359172,354418e-9,0,.968254,.343876,334823e-9,0,1,1,209042e-9,0,0,1,209045e-9,0,0,1,209093e-9,0,0,.999999,209304e-9,0,0,.999996,209871e-9,0,0,.999991,211078e-9,0,0,.999979,213304e-9,0,0,.999963,217061e-9,0,0,.999933,223042e-9,0,0,.999894,232206e-9,0,0,.999837,245901e-9,0,0,.999756,266023e-9,0,102927e-11,.999648,295204e-9,0,233468e-9,.999499,336958e-9,0,.00108237,.999283,395563e-9,0,.00268832,.998896,473785e-9,0,.00511138,.997006,520008e-9,0,.00837705,.993819,497261e-9,0,.0124928,.991632,523722e-9,0,.0174561,.989875,587258e-9,0,.0232596,.988109,676329e-9,0,.0298932,.985155,747701e-9,0,.0373453,.980479,768803e-9,0,.0456045,.976271,841054e-9,0,.0546593,.971347,911469e-9,0,.0644994,.964528,953057e-9,0,.0751152,.957632,.00102221,0,.0864981,.948681,.00106122,0,.0986407,.938716,.00111857,0,.111537,.926629,.00114762,0,.125182,.914025,.00118995,0,.139571,.901026,.00121228,0,.154703,.890358,.00123946,0,.170576,.878283,.0012527,0,.18719,.865459,.00125536,0,.204547,.851407,.00126134,0,.222648,.836276,.00124759,0,.241498,.820436,.00124443,0,.261101,.803253,.00122071,0,.281465,.785562,.00120107,0,.302595,.76718,.00117762,0,.324501,.748551,.00114289,0,.347192,.730564,.00110872,0,.370679,.712253,.00107636,0,.394973,.692867,.00103646,0,.420085,.673695,996793e-9,0,.446027,.653912,95675e-8,0,.47281,.634129,916739e-9,0,.500441,.615004,874401e-9,0,.528921,.595587,833411e-9,0,.558244,.575965,794556e-9,0,.588384,.5566,75196e-8,0,.619281,.537428,716381e-9,0,.650795,.518623,676558e-9,0,.68254,.499964,64074e-8,0,.714286,.481356,605984e-9,0,.746032,.463279,570256e-9,0,.777778,.445673,540138e-9,0,.809524,.428032,507299e-9,0,.84127,.411112,479553e-9,0,.873016,.394444,450737e-9,0,.904762,.378247,424269e-9,0,.936508,.362415,399111e-9,0,.968254,.347103,375274e-9,0,1,1,300729e-9,0,0,1,300733e-9,0,0,1,300797e-9,0,0,.999998,301072e-9,0,0,.999996,301817e-9,0,0,.999989,303398e-9,0,0,.999977,306309e-9,0,0,.999958,311209e-9,0,0,.999927,318975e-9,0,0,.999884,330804e-9,0,0,.99982,34834e-8,0,0,.999733,373854e-9,0,326995e-10,.999613,410424e-9,0,477174e-9,.999447,462047e-9,0,.00161099,.999204,533322e-9,0,.00353153,.998725,624964e-9,0,.00627965,.995871,631786e-9,0,.0098693,.993194,632017e-9,0,.0143011,.991541,68923e-8,0,.019568,.989773,766892e-9,0,.0256593,.987647,863668e-9,0,.0325625,.984193,922089e-9,0,.0402647,.980016,970749e-9,0,.0487532,.975859,.00106027,0,.058016,.970514,.00112239,0,.0680419,.963625,.00117212,0,.0788208,.956959,.00125211,0,.0903439,.947956,.00129411,0,.102604,.93809,.00135879,0,.115594,.92659,.00139309,0,.129309,.913829,.00143253,0,.143745,.90005,.00145809,0,.158901,.888129,.0014748,0,.174774,.87607,.00148756,0,.191365,.863461,.00148714,0,.208674,.849594,.00148892,0,.226705,.834531,.00146496,0,.245461,.81903,.0014579,0,.264947,.802122,.00143039,0,.28517,.78445,.00139717,0,.306137,.766434,.00136312,0,.327857,.747816,.00132597,0,.350341,.729519,.00128323,0,.373598,.711454,.00123803,0,.397642,.692699,.00119097,0,.422485,.673723,.00114565,0,.448139,.654386,.00109552,0,.474619,.634673,.00104553,0,.501933,.615554,99985e-8,0,.530089,.596462,948207e-9,0,.559087,.577385,902299e-9,0,.588913,.558257,856448e-9,0,.619525,.5392,810395e-9,0,.650826,.520543,768558e-9,0,.68254,.502206,7239e-7,0,.714286,.48402,685794e-9,0,.746032,.465779,64471e-8,0,.777778,.448455,609583e-9,0,.809524,.431091,57227e-8,0,.84127,.414147,54042e-8,0,.873016,.39765,506545e-9,0,.904762,.381576,477635e-9,0,.936508,.365881,448446e-9,0,.968254,.350582,421424e-9,0,1,1,427144e-9,0,0,1,427151e-9,0,0,1,427232e-9,0,0,.999998,42759e-8,0,0,.999995,428555e-9,0,0,.999988,430603e-9,0,0,.999976,434368e-9,0,0,.999952,440688e-9,0,0,.999919,450667e-9,0,0,.999871,46578e-8,0,0,.999801,488024e-9,0,0,.999704,520092e-9,0,129791e-9,.999572,565553e-9,0,821056e-9,.999389,628906e-9,0,.00225241,.999114,714911e-9,0,.00449109,.998488,819218e-9,0,.00756249,.995234,80415e-8,0,.0114716,.993021,830181e-9,0,.0162131,.991407,902645e-9,0,.021776,.989625,996934e-9,0,.0281471,.987064,.00109707,0,.0353118,.983265,.00114353,0,.0432562,.979535,.0012272,0,.0519665,.975224,.00132642,0,.0614298,.969574,.00138092,0,.0716348,.963021,.00145896,0,.0825709,.956046,.00152834,0,.094229,.947136,.00158217,0,.106602,.937313,.0016347,0,.119682,.926073,.00168383,0,.133465,.913121,.00171627,0,.147947,.899165,.00174229,0,.163125,.885891,.00176137,0,.178998,.873783,.00176406,0,.195566,.861331,.00176156,0,.21283,.847569,.00175346,0,.230793,.832785,.00172753,0,.249459,.817442,.00170204,0,.268832,.800613,.00166576,0,.28892,.783597,.00162909,0,.30973,.76571,.0015826,0,.331271,.747021,.00153106,0,.353554,.728593,.00148036,0,.37659,.710661,.00142808,0,.400391,.692426,.00136906,0,.424973,.673623,.00131066,0,.450347,.65494,.00125569,0,.476531,.635448,.00119517,0,.503535,.616221,.00113828,0,.531372,.597531,.0010816,0,.560047,.578795,.00102673,0,.589554,.559892,970985e-9,0,.619869,.541307,919773e-9,0,.650923,.522608,868479e-9,0,.68254,.504484,82137e-8,0,.714286,.486603,772916e-9,0,.746032,.468802,730353e-9,0,.777778,.451172,684955e-9,0,.809524,.434348,647565e-9,0,.84127,.417445,605863e-9,0,.873016,.401077,571885e-9,0,.904762,.385039,536034e-9,0,.936508,.369483,504227e-9,0,.968254,.354272,473165e-9,0,1,1,599525e-9,0,0,1,599533e-9,0,0,1,599639e-9,0,0,.999998,600097e-9,0,0,.999994,601336e-9,0,0,.999987,603958e-9,0,0,.999972,608775e-9,0,0,.999949,616842e-9,0,0,.999912,629534e-9,0,0,.999857,648658e-9,0,0,.999781,676615e-9,0,538873e-11,.999674,716574e-9,0,308602e-9,.999528,772641e-9,0,.00127003,.999326,849806e-9,0,.00300783,.999009,952682e-9,0,.00556637,.998112,.00106394,0,.00895889,.994496,.00102228,0,.0131827,.992806,.00108586,0,.0182277,.991211,.0011759,0,.0240795,.989415,.00128955,0,.030723,.986499,.00139038,0,.0381418,.982679,.00144539,0,.046321,.978839,.00153954,0,.0552459,.974295,.00164417,0,.0649034,.968784,.00171517,0,.0752814,.962324,.00180282,0,.0863693,.954956,.00186387,0,.0981578,.94624,.00193817,0,.110639,.936517,.00198156,0,.123806,.925186,.00203042,0,.137655,.91252,.0020664,0,.15218,.898441,.00207822,0,.16738,.884394,.0020992,0,.183253,.871273,.00208748,0,.199799,.859057,.00208686,0,.21702,.845243,.00205519,0,.234918,.830723,.00202868,0,.253496,.815801,.00199501,0,.272761,.79914,.00194193,0,.292719,.782372,.00188824,0,.313377,.76482,.00183695,0,.334745,.746586,.00177418,0,.356833,.7281,.00170628,0,.379654,.709842,.00164063,0,.403221,.692019,.00157355,0,.427548,.67364,.00150262,0,.452651,.655277,.00143473,0,.478545,.636438,.00136371,0,.505246,.617364,.00129911,0,.532768,.598603,.00123014,0,.561122,.580195,.00116587,0,.590309,.561786,.00110398,0,.620318,.543377,.00104148,0,.651102,.525093,983984e-9,0,.682545,.506791,92667e-8,0,.714286,.489291,874326e-9,0,.746032,.471811,821734e-9,0,.777778,.454435,774698e-9,0,.809524,.437493,727302e-9,0,.84127,.420977,684039e-9,0,.873016,.404729,64373e-8,0,.904762,.388756,60285e-8,0,.936508,.373344,56765e-8,0,.968254,.358191,531929e-9,0,1,1,832169e-9,0,0,1,832178e-9,0,0,1,83231e-8,0,0,.999998,832893e-9,0,0,.999995,834465e-9,0,0,.999985,837791e-9,0,0,.999969,843893e-9,0,0,.999944,854086e-9,0,0,.999903,870071e-9,0,0,.999843,894042e-9,0,0,.999759,928865e-9,0,531805e-10,.999643,978242e-9,0,579365e-9,.99948,.00104684,0,.00182774,.999255,.00114012,0,.00387804,.998885,.00126188,0,.00675709,.997405,.00135888,0,.010468,.99424,.00133626,0,.0150018,.992458,.00140905,0,.0203443,.990929,.00152305,0,.0264786,.989116,.00165882,0,.0333875,.985624,.00174128,0,.0410536,.982003,.00182108,0,.0494609,.978336,.00194498,0,.0585941,.973184,.00202708,0,.0684396,.9678,.00212166,0,.0789851,.961348,.00221366,0,.0902199,.953841,.00228219,0,.102134,.94534,.00235662,0,.114721,.935552,.00240572,0,.127972,.924064,.00244405,0,.141884,.911827,.00247557,0,.156451,.897731,.00248374,0,.171672,.883409,.00249863,0,.187545,.868625,.00246688,0,.20407,.856529,.00246523,0,.221249,.842999,.00242368,0,.239083,.828505,.00237354,0,.257578,.813825,.00232588,0,.276738,.797813,.00226731,0,.296569,.781097,.00219704,0,.31708,.764038,.00212394,0,.338281,.746067,.00204786,0,.360181,.727687,.00196728,0,.382794,.709571,.00188779,0,.406133,.691503,.00180532,0,.430213,.673673,.00171849,0,.45505,.655732,.00164147,0,.480662,.637399,.00155858,0,.507065,.618616,.00147641,0,.534278,.60005,.00140125,0,.562313,.581713,.00132441,0,.59118,.563546,.00125014,0,.620875,.545605,.00118249,0,.651373,.527559,.0011116,0,.682593,.509764,.00104979,0,.714286,.49193,985977e-9,0,.746032,.475011,928592e-9,0,.777778,.457878,873466e-9,0,.809524,.440979,819585e-9,0,.84127,.424613,772365e-9,0,.873016,.408549,722195e-9,0,.904762,.392771,680014e-9,0,.936508,.377317,636797e-9,0,.968254,.362352,598318e-9,0,1,1,.00114313,0,0,1,.00114314,0,0,.999999,.00114331,0,0,.999998,.00114404,0,0,.999994,.00114601,0,0,.999984,.00115019,0,0,.999967,.00115784,0,0,.999937,.0011706,0,0,.999894,.00119054,0,0,.999828,.00122031,0,0,.999735,.00126331,0,169263e-9,.999606,.00132382,0,949167e-9,.999426,.0014071,0,.00249668,.999173,.00151895,0,.00486392,.99873,.00166102,0,.00806323,.996243,.0017023,0,.0120895,.993779,.00172782,0,.0169288,.9919,.0018108,0,.0225633,.990524,.00196028,0,.028974,.98868,.00212014,0,.036142,.984663,.00217598,0,.044049,.981457,.00230563,0,.0526781,.977608,.00243966,0,.0620137,.972215,.00251336,0,.0720418,.966798,.0026285,0,.0827499,.960241,.00271409,0,.0941271,.952489,.00278381,0,.106164,.944127,.00285399,0,.118852,.934282,.00290994,0,.132185,.923271,.00294558,0,.146157,.910803,.00296269,0,.160766,.896705,.00296803,0,.176007,.88238,.00296637,0,.19188,.867116,.00293163,0,.208385,.853636,.00289418,0,.225523,.840469,.00284663,0,.243296,.82639,.00278594,0,.261709,.811759,.00271618,0,.280767,.796113,.00263187,0,.300476,.779518,.00254589,0,.320845,.763142,.00246003,0,.341883,.745464,.00236529,0,.363601,.727491,.00226536,0,.386011,.709414,.00216375,0,.409128,.691396,.00207127,0,.432967,.67368,.00197106,0,.457545,.656049,.00187022,0,.482881,.638188,.00177605,0,.508992,.620177,.00168482,0,.535899,.601506,.00158909,0,.563619,.58362,.00150583,0,.592165,.565496,.00141791,0,.621544,.54789,.00133693,0,.651743,.530323,.00126038,0,.682709,.512795,.00118556,0,.714286,.495199,.00111527,0,.746032,.478101,.0010489,0,.777778,.461511,984264e-9,0,.809524,.444879,92591e-8,0,.84127,.428424,866582e-9,0,.873016,.412495,814463e-9,0,.904762,.396975,764498e-9,0,.936508,.381614,715967e-9,0,.968254,.366732,672483e-9,0,1,1,.00155501,0,0,1,.00155503,0,0,1,.00155524,0,0,.999998,.00155615,0,0,.999994,.0015586,0,0,.999983,.00156379,0,0,.999963,.0015733,0,0,.999932,.00158911,0,0,.999882,.00161376,0,0,.99981,.00165041,0,100875e-10,.999708,.00170304,0,367658e-9,.999565,.00177658,0,.0014234,.999368,.00187688,0,.00327939,.999081,.00200989,0,.00596629,.99852,.00217177,0,.0094852,.99549,.0021745,0,.013824,.993252,.00222357,0,.0189642,.991727,.00235022,0,.0248856,.989951,.00250561,0,.0315669,.988029,.00268829,0,.0389882,.984029,.0027496,0,.0471302,.980683,.00289793,0,.0559754,.976554,.00303315,0,.0655081,.97139,.00313257,0,.0757138,.965544,.00323656,0,.08658,.95912,.00333432,0,.0980954,.951183,.0034039,0,.110251,.942974,.00347515,0,.123038,.932642,.00350381,0,.13645,.922158,.00354519,0,.150482,.909404,.00353851,0,.165129,.896071,.0035435,0,.18039,.881206,.00349936,0,.196263,.866077,.00347256,0,.212748,.85093,.003415,0,.229847,.837703,.00333367,0,.247561,.823878,.003249,0,.265895,.809449,.00316347,0,.284854,.794379,.00306351,0,.304445,.778138,.0029499,0,.324675,.761997,.00284099,0,.345555,.744938,.00272104,0,.367095,.727212,.00260715,0,.389309,.709549,.00248855,0,.41221,.691704,.00236783,0,.435814,.673689,.00225178,0,.460138,.656453,.00213765,0,.485203,.639128,.00202178,0,.511028,.621512,.00191443,0,.537634,.603598,.00180977,0,.565041,.58559,.00170456,0,.593268,.567852,.00160927,0,.622327,.5503,.00151395,0,.652217,.533033,.00142499,0,.682907,.515942,.00133955,0,.714296,.498814,.0012602,0,.746032,.481595,.00118188,0,.777778,.465117,.00111171,0,.809524,.448865,.00104091,0,.84127,.432711,976618e-9,0,.873016,.416822,91859e-8,0,.904762,.401272,857704e-9,0,.936508,.386226,807172e-9,0,.968254,.371321,75464e-8,0,1,1,.00209596,0,0,1,.00209598,0,0,1,.00209624,0,0,.999997,.00209736,0,0,.999991,.00210039,0,0,.999979,.00210678,0,0,.999959,.00211847,0,0,.999925,.0021379,0,0,.99987,.00216809,0,0,.999791,.00221281,0,681487e-10,.999677,.00227669,0,658161e-9,.999521,.00236533,0,.00200635,.999301,.00248514,0,.0041779,.998977,.00264185,0,.00718648,.998191,.00281695,0,.0110239,.994801,.00278518,0,.015672,.993091,.00288774,0,.0211091,.991571,.00303931,0,.0273123,.9897,.00321643,0,.034259,.987023,.00337332,0,.0419282,.983289,.00346146,0,.0502998,.979892,.00363704,0,.0593562,.975111,.00373601,0,.069081,.970351,.0038842,0,.0794598,.964131,.00397053,0,.0904798,.957747,.00408078,0,.10213,.949536,.00413533,0,.1144,.941372,.00420305,0,.127284,.931049,.00422815,0,.140772,.920647,.00425048,0,.154862,.908033,.0042281,0,.169548,.895028,.00422026,0,.184828,.879968,.00415042,0,.200701,.864875,.00408821,0,.217167,.84918,.00400909,0,.234227,.834934,.00391178,0,.251884,.821397,.00380066,0,.270141,.807135,.00367974,0,.289004,.792363,.00355172,0,.308479,.776661,.003411,0,.328575,.760705,.00328123,0,.349301,.744408,.00314003,0,.370668,.726994,.0029906,0,.392689,.709598,.00285034,0,.415379,.692112,.00271179,0,.438754,.674435,.00257185,0,.46283,.65676,.00243425,0,.48763,.639982,.00230351,0,.513173,.622983,.0021777,0,.539482,.605471,.00204991,0,.566579,.58796,.00193759,0,.594488,.570463,.00181976,0,.623226,.553058,.00171497,0,.6528,.535894,.00161109,0,.683198,.519089,.00151394,0,.714354,.502454,.00142122,0,.746032,.485681,.00133488,0,.777778,.468935,.00124975,0,.809524,.452951,.00117309,0,.84127,.437139,.00110155,0,.873016,.421446,.00103124,0,.904762,.405951,966387e-9,0,.936508,.391003,908119e-9,0,.968254,.376198,848057e-9,0,1,1,.00280076,0,0,1,.00280078,0,0,.999999,.00280109,0,0,.999997,.00280246,0,0,.999992,.00280616,0,0,.999979,.00281396,0,0,.999956,.00282822,0,0,.999916,.00285186,0,0,.999857,.0028885,0,0,.999768,.00294259,0,196026e-9,.999645,.00301946,0,.00104842,.99947,.00312541,0,.00270199,.999229,.00326733,0,.00519449,.998852,.00344992,0,.00852602,.997558,.00361052,0,.0126804,.994417,.0035898,0,.017635,.992824,.00372393,0,.023365,.991344,.00390695,0,.0298456,.989337,.00410392,0,.0370529,.985811,.00420987,0,.0449651,.982772,.00437488,0,.0535615,.979001,.00455069,0,.0628243,.974102,.00464462,0,.0727368,.969197,.00480577,0,.0832844,.962759,.00487818,0,.0944545,.956207,.00498176,0,.106236,.947909,.00503392,0,.118619,.939596,.00507474,0,.131595,.929642,.00509798,0,.145159,.918807,.00508476,0,.159305,.906921,.00505634,0,.174028,.893312,.00498845,0,.189327,.878933,.0049133,0,.2052,.863986,.0048259,0,.221647,.847936,.00470848,0,.23867,.832253,.00456889,0,.25627,.818619,.00442726,0,.274453,.804788,.00427677,0,.293222,.790241,.00411906,0,.312585,.775162,.00394833,0,.33255,.759463,.00377366,0,.353126,.743598,.00361026,0,.374324,.72697,.00343627,0,.396158,.709646,.00326422,0,.418641,.69277,.00309717,0,.44179,.675371,.0029356,0,.465624,.657863,.00277712,0,.490163,.640772,.00261738,0,.515429,.624441,.0024737,0,.541445,.607497,.00233125,0,.568236,.590438,.00218994,0,.595828,.573224,.0020664,0,.624242,.556168,.00193526,0,.653496,.539232,.00182463,0,.683588,.522352,.00170735,0,.714482,.506172,.00160555,0,.746032,.489842,.00150451,0,.777778,.473463,.00140938,0,.809524,.457266,.00132568,0,.84127,.441609,.0012376,0,.873016,.426348,.00116265,0,.904762,.411002,.00108935,0,.936508,.396045,.00101946,0,.968254,.381448,955665e-9,0,1,1,.0037121,0,0,1,.00371213,0,0,1,.00371251,0,0,.999997,.00371417,0,0,.99999,.00371863,0,0,.999977,.00372807,0,0,.99995,.00374529,0,0,.999908,.0037738,0,0,.999843,.00381789,0,123596e-10,.999745,.00388273,0,407442e-9,.999608,.00397443,0,.0015447,.999415,.00409998,0,.00351385,.999143,.00426662,0,.0063316,.9987,.00447625,0,.00998679,.996363,.00455323,0,.0144569,.994021,.00461052,0,.0197151,.992372,.00476359,0,.0257344,.991007,.00499101,0,.0324882,.988767,.0051972,0,.0399517,.984872,.00528407,0,.0481022,.982004,.00548926,0,.0569191,.977714,.00564385,0,.0663839,.973076,.0057693,0,.0764801,.967565,.0058924,0,.0871928,.961384,.00599629,0,.0985095,.954435,.00605998,0,.110419,.946303,.0061133,0,.122912,.937662,.00612028,0,.13598,.927867,.00612209,0,.149617,.916475,.00604813,0,.163817,.90541,.00603088,0,.178577,.891591,.00592218,0,.193894,.877573,.00578854,0,.209767,.862511,.00566648,0,.226196,.846861,.00551481,0,.243182,.83068,.00533754,0,.260728,.815725,.00515487,0,.278837,.802321,.0049655,0,.297515,.787826,.00475421,0,.316768,.773454,.00456002,0,.336605,.758224,.00434727,0,.357034,.74265,.00414444,0,.378067,.726729,.00393738,0,.399717,.710155,.00373575,0,.421998,.693312,.00353736,0,.444928,.67653,.00334368,0,.468523,.659444,.00315981,0,.492806,.642051,.00297809,0,.517798,.625758,.00280592,0,.543525,.609615,.00264254,0,.570012,.592919,.00248459,0,.597288,.576298,.00233327,0,.625379,.559489,.00219519,0,.654307,.542891,.00205441,0,.684084,.526255,.00193385,0,.714693,.509853,.00180745,0,.746044,.494131,.00169817,0,.777778,.478114,.0015913,0,.809524,.462274,.00148981,0,.84127,.446412,.00139537,0,.873016,.431274,.00130984,0,.904762,.41635,.00122403,0,.936508,.401476,.00114809,0,.968254,.386993,.00107563,0,1,1,.00488216,0,0,1,.0048822,0,0,1,.00488265,0,0,.999997,.00488463,0,0,.999988,.00488999,0,0,.999974,.00490129,0,0,.999946,.00492191,0,0,.999897,.00495598,0,0,.999825,.00500855,0,744791e-10,.999718,.00508559,0,712744e-9,.999565,.005194,0,.00215249,.999352,.00534147,0,.00444576,.999046,.00553523,0,.00759218,.998492,.00577016,0,.0115714,.995564,.00578487,0,.0163557,.993339,.00586414,0,.021915,.991834,.00606002,0,.0282201,.990496,.00633312,0,.0352433,.987826,.00651941,0,.042959,.98383,.00660842,0,.0513439,.98109,.00685523,0,.0603772,.976131,.00695778,0,.0700402,.971922,.00714236,0,.0803163,.965901,.00721437,0,.0911908,.959606,.00732017,0,.102651,.952504,.00735788,0,.114686,.944365,.00738493,0,.127286,.935652,.00737969,0,.140443,.925813,.00733612,0,.154151,.914397,.00723094,0,.168405,.903257,.00714002,0,.183201,.890015,.00700149,0,.198536,.876014,.00682813,0,.214409,.861436,.00665567,0,.23082,.845752,.00644526,0,.24777,.829169,.00621635,0,.265263,.813435,.00597789,0,.283301,.799701,.00575694,0,.301889,.785726,.00549866,0,.321035,.77152,.0052503,0,.340746,.75683,.00499619,0,.361032,.741951,.0047543,0,.381904,.726367,.0045084,0,.403374,.710537,.00426784,0,.425457,.693965,.00403487,0,.448169,.677724,.0038075,0,.47153,.66117,.00359431,0,.495561,.644274,.00338354,0,.520284,.627449,.00318163,0,.545725,.611645,.00299672,0,.571911,.595614,.00281016,0,.598873,.579426,.00264252,0,.62664,.563016,.00247509,0,.655239,.546728,.00232647,0,.684692,.530539,.00217803,0,.714999,.514164,.00204216,0,.746106,.498344,.00191403,0,.777778,.482957,.00179203,0,.809524,.467336,.00167695,0,.84127,.451994,.00157567,0,.873016,.436514,.00147113,0,.904762,.42178,.00138034,0,.936508,.407271,.00129219,0,.968254,.392822,.0012098,0,1,1,.00637427,0,0,1,.00637431,0,0,.999999,.00637485,0,0,.999996,.00637721,0,0,.999987,.00638357,0,0,.999971,.006397,0,0,.999939,.00642142,0,0,.999888,.00646177,0,0,.999807,.00652387,0,207916e-9,.999689,.00661454,0,.00112051,.99952,.00674155,0,.00287719,.999283,.00691313,0,.00550145,.998936,.00713598,0,.00897928,.998165,.00738501,0,.0132829,.994847,.00734388,0,.01838,.993182,.00749991,0,.0242381,.991665,.0077246,0,.030826,.989708,.00797579,0,.0381152,.986663,.00813011,0,.0460794,.983288,.00830365,0,.0546951,.980104,.00853496,0,.0639411,.974855,.00861045,0,.0737988,.97045,.00879133,0,.0842516,.964509,.00886377,0,.0952848,.957594,.00890346,0,.106886,.950546,.00893289,0,.119044,.942225,.00890074,0,.131749,.933365,.00886826,0,.144994,.923202,.0087316,0,.158772,.912605,.00863082,0,.173078,.901099,.00847403,0,.187908,.888177,.00825838,0,.203261,.873955,.00801834,0,.219134,.860091,.00779026,0,.235527,.84434,.00752478,0,.252443,.828517,.00724074,0,.269883,.81239,.00693769,0,.287851,.79721,.00664817,0,.306352,.783489,.00634763,0,.325393,.769514,.00604221,0,.344981,.755419,.00573568,0,.365126,.741083,.00544359,0,.385839,.726059,.00515515,0,.407132,.710809,.00487139,0,.42902,.695052,.00459846,0,.45152,.678886,.00433412,0,.474651,.663042,.00407981,0,.498433,.646634,.00384264,0,.52289,.630117,.00360897,0,.548048,.613804,.00338863,0,.573936,.598338,.00318486,0,.600584,.582687,.00298377,0,.628027,.566809,.00280082,0,.656295,.550817,.00262255,0,.685417,.534937,.00245835,0,.715406,.519151,.00230574,0,.74624,.503118,.0021549,0,.777778,.487723,.00202008,0,.809524,.472725,.00189355,0,.84127,.457599,.00177108,0,.873016,.442558,.00165843,0,.904762,.427624,.00155494,0,.936508,.413171,.00145273,0,.968254,.399122,.00136454,0,1,1,.00826496,0,0,1,.00826499,0,0,1,.00826564,0,0,.999996,.00826842,0,0,.999987,.00827589,0,0,.999967,.00829167,0,0,.999933,.00832037,0,0,.999876,.00836768,0,109338e-10,.999786,.00844031,0,427145e-9,.999655,.00854603,0,.0016384,.999468,.00869337,0,.00372392,.999203,.008891,0,.00668513,.998803,.00914387,0,.0104968,.99748,.00935838,0,.015125,.994446,.00933309,0,.0205338,.99292,.00953084,0,.0266884,.991414,.0097893,0,.0335565,.989049,.0100228,0,.0411086,.98582,.0101664,0,.0493181,.982441,.0103582,0,.0581613,.978595,.0105292,0,.0676169,.973495,.0106274,0,.0776661,.968405,.0107261,0,.0882926,.962717,.0108234,0,.0994817,.955478,.0108102,0,.111221,.948275,.0107914,0,.123499,.940006,.0107161,0,.136308,.930831,.0106309,0,.149639,.920648,.0104083,0,.163485,.910205,.0102312,0,.177843,.898445,.0100051,0,.192707,.885986,.00971928,0,.208077,.872204,.00940747,0,.22395,.858436,.0091085,0,.240326,.843454,.00876595,0,.257208,.827437,.00839794,0,.274596,.811488,.00803692,0,.292496,.796039,.00767352,0,.310911,.781083,.0073097,0,.329849,.767642,.00694032,0,.349316,.753901,.00657476,0,.369323,.740131,.00622699,0,.38988,.725845,.0058838,0,.410999,.710991,.00555586,0,.432696,.696002,.00523089,0,.454987,.680461,.00492494,0,.47789,.664875,.00463464,0,.501426,.649273,.00435422,0,.52562,.63302,.0040875,0,.550498,.61705,.00384075,0,.576089,.601154,.00359557,0,.602427,.586008,.00337636,0,.629544,.570699,.00316019,0,.657479,.555166,.00296033,0,.686264,.539645,.00277552,0,.715924,.524159,.00259499,0,.746459,.508682,.00243257,0,.777789,.493163,.00227851,0,.809524,.478004,.00213083,0,.84127,.46347,.00199502,0,.873016,.448778,.00186967,0,.904762,.434105,.00174732,0,.936508,.419576,.00163861,0,.968254,.405541,.00153341,0,1,1,.0106462,0,0,1,.0106462,0,0,.999999,.010647,0,0,.999995,.0106502,0,0,.999985,.0106589,0,0,.999964,.0106773,0,0,.999925,.0107106,0,0,.999861,.0107655,0,712986e-10,.999763,.0108497,0,743959e-9,.999616,.0109716,0,.00227361,.999408,.0111408,0,.0046983,.999112,.0113659,0,.00800158,.998637,.0116475,0,.0121493,.996223,.0117231,0,.0171023,.994006,.0118064,0,.0228218,.992444,.0120254,0,.0292711,.991028,.0123314,0,.036417,.98803,.0124954,0,.0442295,.984816,.0126538,0,.0526815,.981399,.0128537,0,.0617492,.977085,.0129694,0,.0714114,.972154,.013091,0,.0816495,.966617,.0131166,0,.0924472,.960628,.0131583,0,.10379,.953295,.0131094,0,.115665,.94575,.0129966,0,.128062,.937654,.0128796,0,.140972,.927716,.0126477,0,.154387,.917932,.0123889,0,.168301,.907719,.012131,0,.182709,.89584,.0118013,0,.197608,.883526,.0114145,0,.212994,.870301,.0110075,0,.228867,.856272,.0106019,0,.245227,.842251,.0101938,0,.262074,.826466,.00973254,0,.279412,.810859,.0092846,0,.297244,.795051,.00883304,0,.315575,.780053,.00840272,0,.334412,.76575,.00796438,0,.35376,.752298,.00752526,0,.373631,.739153,.00711486,0,.394034,.725514,.00670361,0,.414983,.711473,.00632656,0,.436491,.696936,.00595206,0,.458575,.682126,.00559191,0,.481253,.667027,.00525362,0,.504547,.651875,.00493805,0,.528481,.636463,.00462848,0,.553081,.620641,.00433936,0,.578377,.604931,.00407,0,.604404,.589549,.00380864,0,.631197,.574712,.00357049,0,.658795,.559775,.00334466,0,.687238,.544514,.00312505,0,.716559,.529555,.00293199,0,.746776,.514402,.00274204,0,.777849,.499302,.00256647,0,.809524,.484114,.00239901,0,.84127,.469308,.00225148,0,.873016,.455133,.00210178,0,.904762,.440939,.0019727,0,.936508,.426627,.00184382,0,.968254,.412509,.00172548,0,1,1,.013628,0,0,1,.0136281,0,0,.999999,.0136289,0,0,.999995,.0136327,0,0,.999983,.0136427,0,0,.99996,.0136638,0,0,.999917,.0137022,0,0,.999846,.0137652,0,204597e-9,.999736,.0138615,0,.00116837,.999573,.0140007,0,.00303325,.99934,.0141927,0,.00580613,.999004,.0144457,0,.00945626,.998407,.0147489,0,.0139421,.995464,.014731,0,.0192202,.993328,.0148283,0,.0252495,.991799,.0150797,0,.0319921,.990397,.0154316,0,.0394138,.986835,.0155005,0,.0474843,.983938,.0157308,0,.0561763,.980154,.0158753,0,.0654661,.975659,.0159581,0,.0753326,.970171,.0159832,0,.0857571,.964803,.0160084,0,.0967236,.958366,.0159484,0,.108218,.950613,.0158001,0,.120227,.942874,.0155845,0,.132741,.935005,.0154292,0,.145751,.924991,.0150742,0,.159249,.914814,.0146757,0,.17323,.904743,.0143097,0,.187687,.893216,.0138695,0,.202619,.880769,.0133706,0,.218021,.868136,.0128606,0,.233894,.85469,.0123403,0,.250238,.840593,.0118091,0,.267052,.825808,.011253,0,.284341,.81009,.0107099,0,.302106,.79504,.0101636,0,.320354,.779757,.00964041,0,.33909,.764697,.00911896,0,.358322,.750913,.00859533,0,.378059,.738175,.00811592,0,.398311,.725242,.00764504,0,.41909,.711864,.00718885,0,.440412,.698009,.00675843,0,.462292,.683841,.00634984,0,.484748,.669391,.00595502,0,.507802,.654731,.00558671,0,.531477,.639805,.00523578,0,.555802,.624789,.00490834,0,.580805,.609325,.00459448,0,.606522,.593975,.00430342,0,.63299,.578983,.00403019,0,.66025,.564442,.0037707,0,.688346,.549835,.0035316,0,.717319,.535039,.00330255,0,.7472,.520403,.00308932,0,.777982,.505687,.00289335,0,.809524,.490939,.00270818,0,.84127,.476233,.0025343,0,.873016,.461624,.00237097,0,.904762,.447833,.00222065,0,.936508,.433992,.00207561,0,.968254,.420147,.00194955,0,1,1,.0173415,0,0,1,.0173416,0,0,.999999,.0173426,0,0,.999995,.0173468,0,0,.999983,.0173582,0,0,.999954,.0173822,0,0,.999908,.0174258,0,669501e-11,.999828,.0174973,0,427399e-9,.999705,.0176063,0,.00171019,.999524,.0177631,0,.0039248,.999263,.0179781,0,.00705382,.998878,.018258,0,.0110552,.998012,.0185551,0,.0158812,.994614,.0184264,0,.0214852,.993132,.0186385,0,.0278239,.991563,.0189067,0,.0348585,.989298,.0191577,0,.0425544,.986036,.0192522,0,.050881,.982558,.0194063,0,.059811,.978531,.019486,0,.0693209,.974198,.0195847,0,.0793895,.968148,.0194749,0,.0899984,.962565,.0194277,0,.101132,.956041,.0192991,0,.112775,.947749,.0189893,0,.124917,.94018,.018704,0,.137547,.93165,.0183458,0,.150655,.921798,.0178775,0,.164236,.911573,.0173618,0,.178281,.901569,.0168482,0,.192788,.890341,.016265,0,.207752,.877835,.0156199,0,.223171,.865472,.0149516,0,.239044,.852905,.0143274,0,.255371,.838906,.0136643,0,.272153,.824888,.0129903,0,.289393,.809977,.0123218,0,.307093,.794697,.0116572,0,.325259,.780028,.0110307,0,.343896,.765124,.0104236,0,.363012,.750411,.0098219,0,.382617,.737264,.00924397,0,.402719,.724799,.00868719,0,.423332,.712253,.00816476,0,.444469,.699267,.00767262,0,.466146,.685618,.00719746,0,.488383,.671736,.00673916,0,.511199,.657777,.00631937,0,.534618,.643497,.00592411,0,.558668,.62889,.00553928,0,.58338,.614299,.0051934,0,.608787,.599197,.00485985,0,.634929,.584175,.00454357,0,.661849,.569541,.00425787,0,.689594,.555193,.00397905,0,.718211,.540947,.00372364,0,.747742,.526593,.00348599,0,.778205,.512335,.00326103,0,.80953,.498017,.00305137,0,.84127,.483609,.00285485,0,.873016,.469368,.00267472,0,.904762,.455037,.00249945,0,.936508,.441493,.00234792,0,.968254,.428147,.00219936,0,1,1,.0219422,0,0,1,.0219423,0,0,.999998,.0219434,0,0,.999993,.0219481,0,0,.999981,.021961,0,0,.999949,.0219879,0,0,.999896,.0220367,0,593194e-10,.999808,.0221167,0,75364e-8,.99967,.0222383,0,.00237884,.999466,.0224125,0,.00495612,.999174,.0226495,0,.00844887,.998725,.0229525,0,.0128058,.996979,.0231123,0,.0179742,.994317,.0230742,0,.0239047,.992781,.0232895,0,.0305526,.991191,.0235734,0,.0378786,.987787,.0236152,0,.0458475,.985092,.0237994,0,.0544287,.981121,.0238553,0,.0635952,.976924,.0238706,0,.0733233,.97218,.0238704,0,.0835922,.965956,.0236598,0,.0943839,.959998,.0234735,0,.105682,.953245,.0232277,0,.117474,.944445,.0226973,0,.129747,.937087,.0223527,0,.142491,.928341,.0218144,0,.155697,.9184,.0211516,0,.169358,.907959,.0204553,0,.183469,.89808,.0197673,0,.198024,.887047,.0189915,0,.21302,.875221,.0182082,0,.228455,.86269,.0173584,0,.244329,.850735,.0165718,0,.260639,.837545,.0157524,0,.277389,.823639,.0149482,0,.29458,.809699,.0141431,0,.312216,.794797,.0133527,0,.3303,.780578,.0126193,0,.34884,.766019,.0118914,0,.367842,.751447,.0111839,0,.387315,.737275,.010514,0,.40727,.724545,.00987277,0,.427717,.712644,.00926569,0,.448671,.700432,.00869029,0,.470149,.687664,.00814691,0,.492167,.674288,.00763012,0,.514746,.660966,.00714437,0,.537911,.647264,.00668457,0,.561688,.633431,.00626581,0,.586108,.619133,.00585593,0,.611206,.604935,.00548188,0,.637022,.590236,.00513288,0,.663599,.575473,.0047906,0,.690989,.561228,.00448895,0,.719242,.547054,.00420233,0,.748411,.533175,.00392869,0,.778531,.519163,.00367445,0,.809583,.505328,.00344097,0,.84127,.491446,.00322003,0,.873016,.477356,.00301283,0,.904762,.46356,.00282592,0,.936508,.449623,.00264956,0,.968254,.436068,.00246956,0,1,1,.0276135,0,0,1,.0276136,0,0,.999998,.0276148,0,0,.999993,.0276201,0,0,.999976,.0276342,0,0,.999945,.027664,0,0,.999884,.0277179,0,18679e-8,.999784,.027806,0,.00119607,.99963,.0279394,0,.00318407,.999401,.0281295,0,.00613601,.999066,.0283858,0,.00999963,.998524,.0287027,0,.0147164,.995702,.0286256,0,.0202295,.993593,.0286733,0,.0264876,.992067,.0288989,0,.0334452,.990548,.0292135,0,.0410621,.986775,.0291296,0,.0493032,.984054,.0293099,0,.0581381,.979481,.0291881,0,.0675397,.975297,.0291598,0,.0774848,.96981,.028954,0,.0879528,.963524,.028628,0,.0989258,.957398,.0283135,0,.110388,.950088,.0278469,0,.122327,.941538,.0271798,0,.134729,.933332,.0265388,0,.147587,.924392,.0257776,0,.160889,.914581,.024916,0,.174631,.904347,.0240242,0,.188806,.894324,.0231229,0,.203409,.883724,.022153,0,.218437,.872207,.0211355,0,.233888,.859927,.0201048,0,.249761,.848373,.0191263,0,.266056,.836023,.0181306,0,.282774,.82289,.0171718,0,.299917,.809324,.0162196,0,.317488,.795361,.0152622,0,.335493,.781253,.01439,0,.353936,.767338,.013533,0,.372825,.753156,.0127244,0,.392168,.739122,.0119454,0,.411976,.725358,.0112054,0,.432259,.712949,.010487,0,.453032,.701621,.00984032,0,.47431,.689703,.00921495,0,.496111,.677216,.00862492,0,.518456,.664217,.00806882,0,.541367,.65137,.00755922,0,.564872,.638,.00705705,0,.589001,.62453,.00661266,0,.613789,.610601,.00618432,0,.639277,.59676,.00578033,0,.66551,.582433,.00540927,0,.692539,.568026,.00506104,0,.720422,.55414,.0047353,0,.749216,.540178,.00442889,0,.778974,.526513,.00414363,0,.809711,.512954,.00388237,0,.84127,.499403,.00362875,0,.873016,.486026,.00340827,0,.904762,.472345,.00318598,0,.936508,.458828,.00297635,0,.968254,.445379,.00279447,0,1,1,.0345716,0,0,1,.0345717,0,0,.999999,.034573,0,0,.999991,.0345787,0,0,.999974,.0345941,0,0,.999937,.0346263,0,188589e-11,.999869,.0346847,0,409238e-9,.999757,.0347798,0,.0017674,.999582,.0349233,0,.00413658,.999322,.0351265,0,.00747408,.998939,.0353967,0,.0117157,.998219,.0357018,0,.0167966,.994974,.0354726,0,.0226572,.993201,.0355621,0,.0292445,.991573,.0357641,0,.0365123,.989301,.0359252,0,.0444203,.985712,.0358017,0,.0529334,.982411,.0358353,0,.0620214,.977827,.035617,0,.0716574,.973278,.0354398,0,.0818186,.967397,.0350483,0,.0924846,.960696,.0344795,0,.103638,.954349,.0339861,0,.115263,.946066,.0331323,0,.127348,.938012,.032359,0,.13988,.929413,.0314413,0,.152849,.920355,.0304103,0,.166248,.910586,.0292785,0,.18007,.900609,.0281391,0,.194308,.890093,.0269103,0,.208958,.880013,.0257269,0,.224018,.869001,.0244671,0,.239485,.85751,.0232252,0,.255359,.84582,.0220117,0,.271638,.834383,.0208274,0,.288324,.822158,.0196628,0,.305419,.809056,.0185306,0,.322927,.795832,.0174174,0,.340851,.782547,.0163758,0,.359199,.7689,.015391,0,.377975,.755526,.0144488,0,.397189,.741681,.0135372,0,.416851,.728178,.0126957,0,.436971,.714642,.0118812,0,.457564,.702756,.0111165,0,.478644,.69175,.0104145,0,.500229,.680159,.00974439,0,.522339,.668073,.00911926,0,.544997,.655405,.00851393,0,.56823,.642921,.00797637,0,.592068,.629993,.00745119,0,.616546,.616828,.00696972,0,.641705,.603305,.00652425,0,.66759,.589833,.00610188,0,.694255,.575945,.00570834,0,.72176,.561745,.00533384,0,.750168,.548277,.00500001,0,.779545,.534467,.00467582,0,.809933,.521032,.00438092,0,.841272,.507877,.00410348,0,.873016,.494654,.00383618,0,.904762,.481592,.00358699,0,.936508,.468509,.00337281,0,.968254,.455293,.00316196,0,1,1,.0430698,0,0,1,.0430699,0,0,.999998,.0430713,0,0,.999991,.0430773,0,0,.99997,.0430936,0,0,.999928,.0431277,0,406396e-10,.999852,.0431893,0,744376e-9,.999724,.0432895,0,.0024806,.999527,.0434397,0,.00524779,.99923,.0436507,0,.00898164,.998783,.0439255,0,.0136083,.997507,.0441104,0,.0190582,.994418,.0438225,0,.0252694,.992864,.0439396,0,.0321879,.991127,.0440962,0,.039767,.987331,.0438408,0,.0479667,.984819,.0438991,0,.056752,.980384,.0435906,0,.0660929,.975846,.0432543,0,.075963,.970748,.0428293,0,.0863398,.964303,.042153,0,.0972035,.95772,.0414111,0,.108537,.950747,.0405893,0,.120325,.942533,.0394887,0,.132554,.934045,.0383544,0,.145215,.924942,.037057,0,.158296,.915811,.0356993,0,.17179,.90612,.0342401,0,.185691,.896434,.0328078,0,.199993,.886021,.031288,0,.214691,.876081,.0297776,0,.229782,.865608,.0282334,0,.245265,.854924,.026749,0,.261138,.843607,.02526,0,.277401,.832456,.0238214,0,.294056,.821342,.0224682,0,.311104,.809303,.0211297,0,.328548,.796468,.0198387,0,.346394,.784046,.0186227,0,.364645,.771262,.0174561,0,.38331,.758118,.0163806,0,.402396,.745075,.0153287,0,.421912,.731926,.0143647,0,.44187,.71863,.0134363,0,.462283,.705414,.0125603,0,.483165,.693792,.0117508,0,.504535,.683108,.0110016,0,.52641,.67183,.0102757,0,.548816,.66015,.00962044,0,.571776,.647907,.00898031,0,.595323,.635734,.00840811,0,.619489,.623208,.00786211,0,.644317,.610438,.00734953,0,.669852,.597345,.00687688,0,.696148,.584138,.00643469,0,.723267,.5707,.00602236,0,.75128,.556966,.0056324,0,.780258,.543607,.00528277,0,.810268,.530213,.00493999,0,.841311,.516912,.00462265,0,.873016,.503916,.0043307,0,.904762,.491146,.00406858,0,.936508,.478439,.00381436,0,.968254,.465834,.00358003,0,1,1,.0534039,0,0,1,.053404,0,0,.999998,.0534055,0,0,.999989,.0534116,0,0,.999968,.0534283,0,0,.999918,.0534633,0,155895e-9,.99983,.0535262,0,.00120914,.999685,.0536281,0,.00334944,.999461,.0537799,0,.00653077,.999119,.0539902,0,.0106718,.998582,.0542524,0,.0156907,.995919,.0540318,0,.0215147,.993735,.0538914,0,.0280801,.992126,.0539557,0,.0353323,.990266,.0540401,0,.0432247,.986317,.0536064,0,.0517172,.983213,.0534425,0,.0607754,.978303,.0528622,0,.0703698,.973665,.0523363,0,.0804742,.968091,.0516165,0,.0910667,.961026,.0505434,0,.102128,.954333,.049523,0,.113641,.946372,.0481698,0,.125591,.938254,.0467674,0,.137965,.929516,.0452341,0,.150754,.920106,.0435083,0,.163947,.910899,.0417399,0,.177537,.901532,.0399389,0,.191516,.891919,.0380901,0,.205881,.882006,.0362341,0,.220626,.871965,.0343444,0,.235749,.862145,.0324832,0,.251248,.852058,.0306681,0,.267121,.84161,.0289097,0,.283368,.830806,.0272079,0,.299992,.820476,.0256089,0,.316992,.809514,.0240394,0,.334374,.797865,.0225379,0,.35214,.785621,.0211235,0,.370296,.773765,.0197908,0,.388849,.761629,.0185235,0,.407807,.748891,.0173358,0,.427178,.736437,.0162305,0,.446974,.723707,.0151778,0,.467207,.710606,.0141791,0,.487892,.698019,.0132592,0,.509046,.686203,.0123887,0,.530687,.675692,.0115976,0,.552839,.664826,.0108325,0,.575527,.65349,.0101348,0,.59878,.641774,.00947756,0,.622634,.629794,.00886058,0,.647128,.617647,.00828526,0,.672308,.60534,.00775312,0,.698231,.592718,.00726033,0,.724958,.579746,.00679731,0,.752563,.566763,.00636111,0,.781127,.553515,.00595228,0,.810733,.540118,.00556876,0,.841426,.527325,.00523051,0,.873016,.514265,.00490712,0,.904762,.501406,.00460297,0,.936508,.488922,.00431247,0,.968254,.476541,.0040472,0,1,1,.0659184,0,0,1,.0659185,0,0,.999998,.06592,0,0,.999988,.0659259,0,0,.999963,.0659423,0,0,.999907,.0659764,0,374198e-9,.999806,.0660376,0,.00182071,.999639,.0661361,0,.0043894,.999378,.0662814,0,.00800055,.998985,.0664779,0,.0125594,.998285,.0666914,0,.0179786,.995071,.0661989,0,.0241822,.993172,.0660454,0,.031106,.991438,.0660105,0,.0386952,.988428,.0656875,0,.0469032,.985218,.0652913,0,.0556905,.981128,.0647107,0,.065023,.976015,.0638491,0,.0748717,.97097,.062993,0,.0852112,.964582,.0617927,0,.0960199,.957383,.0603626,0,.107279,.949969,.0588128,0,.118971,.941843,.0570274,0,.131084,.933624,.0551885,0,.143604,.924543,.053122,0,.156521,.914919,.0508897,0,.169825,.905773,.0486418,0,.18351,.896434,.0463364,0,.197569,.887195,.0440623,0,.211997,.877706,.0417799,0,.226789,.867719,.03945,0,.241944,.858587,.037243,0,.257458,.849317,.0350956,0,.273331,.839585,.0329852,0,.289563,.829856,.0310028,0,.306154,.819589,.0290953,0,.323108,.809714,.0272738,0,.340426,.79934,.0255631,0,.358113,.788224,.0239175,0,.376175,.776619,.0223831,0,.394616,.76521,.0209298,0,.413445,.753716,.0195786,0,.432671,.741564,.0183001,0,.452305,.729413,.0171259,0,.472358,.717146,.0159933,0,.492845,.70436,.0149495,0,.513783,.69219,.0139681,0,.535189,.680289,.0130577,0,.557087,.669611,.0122198,0,.5795,.659113,.0114174,0,.602459,.648148,.0106729,0,.625997,.636905,.00998997,0,.650154,.625154,.00934313,0,.674976,.613481,.00874839,0,.700518,.60154,.00818265,0,.726845,.58943,.00766889,0,.754032,.576828,.00717153,0,.782167,.564194,.00672696,0,.811344,.551501,.00630863,0,.841644,.538635,.00592177,0,.873016,.525724,.00554888,0,.904762,.513209,.00520225,0,.936508,.500457,.00488231,0,.968254,.48799,.00457153,0,1,1,.0810131,0,0,1,.0810133,0,0,.999997,.0810145,0,0,.999985,.08102,0,0,.999956,.0810347,0,195026e-10,.999893,.0810656,0,719316e-9,.999777,.0811205,0,.00259774,.999583,.081208,0,.00561807,.999281,.0813343,0,.00967472,.998813,.0814969,0,.0146627,.997597,.0815217,0,.0204902,.994379,.0808502,0,.0270802,.992744,.0806792,0,.0343674,.990745,.0804589,0,.0422974,.986646,.0796107,0,.0508242,.983611,.0790913,0,.0599087,.978869,.0780746,0,.0695175,.973475,.0768218,0,.0796223,.967845,.0754926,0,.0901983,.960778,.0737063,0,.101224,.953333,.0718052,0,.112682,.945274,.0695946,0,.124555,.936955,.0672492,0,.136831,.928319,.0647732,0,.149496,.919075,.0620947,0,.162542,.909114,.0591816,0,.175958,.900137,.0563917,0,.189739,.891069,.0535392,0,.203877,.882262,.0507642,0,.218368,.873232,.0479793,0,.233208,.864042,.045226,0,.248393,.855002,.0425413,0,.263923,.846569,.0400126,0,.279796,.837714,.0375269,0,.296012,.828918,.0352027,0,.312573,.819783,.0330011,0,.329479,.810129,.0308908,0,.346734,.800866,.0289112,0,.364342,.79093,.0270255,0,.382307,.780593,.0252758,0,.400637,.769511,.0236178,0,.419337,.758558,.0220652,0,.438418,.747632,.0206289,0,.457889,.736146,.0192873,0,.477761,.724093,.0180333,0,.49805,.71234,.0168264,0,.51877,.700201,.015746,0,.53994,.687949,.0147027,0,.561581,.676163,.0137512,0,.583718,.665001,.0128655,0,.60638,.65472,.0120366,0,.629599,.644213,.0112604,0,.653415,.633382,.0105413,0,.677874,.62212,.00986498,0,.70303,.610631,.00923308,0,.728948,.599078,.00864206,0,.755706,.587519,.00811784,0,.783396,.575505,.00761237,0,.812121,.563148,.00713949,0,.841989,.550828,.00668379,0,.873035,.538458,.00627715,0,.904762,.525905,.00588336,0,.936508,.513517,.00552687,0,.968254,.501395,.00519681,0,1,1,.0991506,0,0,1,.0991504,0,0,.999996,.0991515,0,0,.999984,.0991558,0,0,.999947,.0991672,0,114389e-9,.999874,.0991912,0,.00121503,.999739,.0992331,0,.00356108,.999514,.0992983,0,.00705578,.999159,.0993877,0,.011574,.998586,.0994837,0,.017003,.995731,.0988425,0,.0232484,.993384,.098276,0,.0302318,.991615,.0979269,0,.0378884,.989029,.0973432,0,.0461641,.985373,.0963539,0,.0550136,.981278,.0952306,0,.0643988,.975777,.0936233,0,.0742868,.970526,.0920219,0,.0846501,.963755,.0898912,0,.0954644,.956676,.0876064,0,.106709,.948099,.0847751,0,.118367,.939718,.0818638,0,.130423,.931305,.078857,0,.142862,.922342,.0756127,0,.155674,.912842,.0721473,0,.168849,.903304,.0686195,0,.182378,.89411,.0650589,0,.196255,.885512,.0616022,0,.210473,.877193,.0582434,0,.225027,.86877,.0548979,0,.239915,.860267,.0516095,0,.255132,.851915,.048468,0,.270678,.843912,.0454447,0,.286551,.83604,.0425612,0,.302751,.828245,.0398752,0,.31928,.820159,.0373198,0,.336138,.81167,.034916,0,.35333,.802659,.0326402,0,.370858,.793921,.0304901,0,.388728,.784713,.0284857,0,.406944,.774946,.0266186,0,.425515,.76448,.0248593,0,.444449,.753793,.0232114,0,.463756,.743506,.0217039,0,.483447,.732555,.0202841,0,.503535,.720965,.0189648,0,.524036,.709422,.0177189,0,.544968,.697756,.0165626,0,.56635,.685565,.015483,0,.588208,.673987,.0144892,0,.610569,.66244,.0135607,0,.633466,.651675,.0126956,0,.656936,.641598,.0118788,0,.681025,.63121,.0111261,0,.705788,.620514,.010437,0,.731289,.609366,.00978747,0,.757606,.598137,.00917257,0,.784834,.586966,.00859778,0,.813085,.575549,.00806803,0,.842485,.563797,.00757294,0,.87313,.551758,.00710592,0,.904762,.539894,.0066841,0,.936508,.527901,.00627901,0,.968254,.515819,.00590506,0,1,1,.120864,0,0,1,.120864,0,0,.999996,.120864,0,0,.99998,.120867,0,0,.99994,.120872,0,323781e-9,.999852,.120884,0,.00188693,.999693,.120903,0,.00473489,.999426,.120929,0,.00872704,.999002,.120955,0,.0137237,.998235,.120918,0,.0196068,.994608,.119764,0,.0262803,.992997,.119265,0,.0336657,.990968,.11863,0,.0416987,.987002,.117261,0,.0503261,.983524,.116009,0,.0595035,.97875,.114252,0,.0691935,.972652,.11193,0,.0793645,.966613,.109555,0,.0899894,.959275,.106612,0,.101045,.951272,.103375,0,.112512,.942323,.0996594,0,.124372,.933679,.0958841,0,.136611,.924822,.0919265,0,.149216,.915742,.0878061,0,.162176,.906348,.0834894,0,.175482,.896883,.079085,0,.189125,.88774,.0746745,0,.203098,.87986,.0705773,0,.217396,.871998,.0665005,0,.232015,.864325,.0625413,0,.24695,.856685,.0586781,0,.2622,.84925,.0550063,0,.277761,.841719,.0514727,0,.293634,.834755,.0481398,0,.309819,.827853,.0450172,0,.326315,.820888,.0420969,0,.343126,.813616,.0393702,0,.360254,.805767,.0367771,0,.377701,.797338,.0343274,0,.395474,.789122,.0320529,0,.413577,.780601,.0299485,0,.432018,.771424,.0279812,0,.450804,.761502,.0261054,0,.469944,.751166,.0243942,0,.489451,.741276,.0228087,0,.509337,.730898,.0213265,0,.529617,.719878,.0199307,0,.550307,.708379,.0186574,0,.571428,.697165,.0174446,0,.593003,.685554,.0163144,0,.615059,.673631,.015276,0,.637628,.662385,.0143003,0,.660746,.651059,.0134112,0,.68446,.640451,.0125794,0,.70882,.630536,.011793,0,.733893,.620316,.0110547,0,.759756,.609722,.0103668,0,.786505,.598804,.00973009,0,.814259,.587871,.00912812,0,.843157,.577121,.00858916,0,.87334,.566019,.00807333,0,.904762,.554664,.00759687,0,.936508,.543101,.00714759,0,.968254,.531558,.00673418,0,1,1,.146767,0,0,1,.146767,0,0,.999997,.146767,0,0,.999977,.146765,0,320658e-11,.999929,.146762,0,682576e-9,.999823,.146753,0,.00276402,.999633,.146735,0,.00614771,.999314,.146699,0,.0106613,.998796,.14662,0,.0161546,.997124,.146107,0,.0225063,.994062,.144857,0,.0296198,.992154,.144011,0,.037417,.989186,.142712,0,.0458348,.985279,.140926,0,.0548211,.980826,.13885,0,.0643326,.975056,.136168,0,.074333,.969005,.133217,0,.0847917,.961554,.12959,0,.0956828,.954206,.125886,0,.106984,.945046,.121335,0,.118675,.935678,.116492,0,.130741,.926748,.111635,0,.143166,.917764,.106625,0,.155939,.908358,.101325,0,.169049,.899219,.0960249,0,.182487,.890089,.0906527,0,.196245,.881488,.0853905,0,.210317,.874031,.0804177,0,.224697,.866932,.0756005,0,.23938,.859976,.0709019,0,.254364,.853375,.0664391,0,.269646,.846971,.0622012,0,.285223,.840483,.058129,0,.301096,.833969,.0542762,0,.317265,.82806,.0507042,0,.333729,.822128,.047368,0,.350491,.815989,.044272,0,.367554,.809336,.0413444,0,.38492,.802177,.038601,0,.402594,.79441,.0360227,0,.420582,.786573,.0336383,0,.438891,.778619,.0314321,0,.457527,.77,.029362,0,.476499,.760698,.0274102,0,.49582,.750932,.0256146,0,.5155,.740993,.023974,0,.535555,.731159,.0224182,0,.556,.720836,.0209889,0,.576855,.709913,.0196411,0,.598143,.698415,.0183824,0,.619888,.68745,.0172222,0,.642123,.676154,.0161509,0,.664883,.664383,.0151397,0,.688211,.6533,.0141873,0,.71216,.642072,.0133105,0,.736792,.631412,.0124932,0,.762186,.621622,.0117408,0,.788439,.611681,.0110358,0,.815672,.60142,.0103775,0,.844034,.59083,.00975623,0,.873699,.580254,.00918084,0,.904765,.569841,.00864721,0,.936508,.559224,.00815731,0,.968254,.548315,.00767924,0,1,1,.177563,0,0,1,.177563,0,0,.999994,.177562,0,0,.999972,.177555,0,664171e-10,.999914,.177536,0,.0012276,.999787,.177496,0,.00388025,.999556,.17742,0,.00783463,.999165,.177285,0,.0128953,.9985,.177037,0,.0189053,.995388,.175634,0,.025742,.993102,.174375,0,.033309,.990992,.173121,0,.0415298,.986932,.170896,0,.0503425,.982786,.16847,0,.0596964,.977592,.165455,0,.0695498,.971075,.161676,0,.0798676,.963967,.157458,0,.0906201,.956397,.152836,0,.101783,.947489,.147467,0,.113333,.937564,.14145,0,.125254,.928182,.135383,0,.137529,.919027,.129212,0,.150144,.909618,.12276,0,.163088,.900492,.116273,0,.176351,.891671,.1098,0,.189924,.883146,.103362,0,.203799,.875151,.0970799,0,.21797,.868338,.0911732,0,.232433,.862033,.0854966,0,.247182,.856107,.0800691,0,.262216,.850644,.0749618,0,.27753,.845261,.070079,0,.293124,.839885,.0654321,0,.308997,.834609,.0610975,0,.325149,.829083,.0569741,0,.341581,.82404,.0531736,0,.358294,.818968,.049665,0,.37529,.813496,.0463856,0,.392573,.807533,.0433217,0,.410148,.80099,.0404402,0,.428019,.793891,.0377578,0,.446192,.786281,.0352616,0,.464676,.778773,.0329577,0,.483478,.770737,.030808,0,.502608,.762094,.0287964,0,.522079,.752898,.0269254,0,.541905,.743306,.0251926,0,.5621,.733416,.023595,0,.582684,.723742,.0221155,0,.603677,.713542,.0207435,0,.625106,.702755,.019434,0,.646998,.691484,.0182046,0,.66939,.680531,.0170771,0,.692324,.66953,.0160339,0,.715849,.658126,.0150677,0,.740028,.646933,.0141551,0,.764937,.636107,.0133179,0,.790673,.625271,.0125284,0,.817358,.615225,.0117937,0,.84515,.605678,.0111181,0,.874244,.59583,.0104759,0,.904828,.585704,.00986672,0,.936508,.575413,.00929712,0,.968254,.565373,.00876713,0,1,1,.214058,0,0,.999999,.214058,0,0,.999994,.214055,0,0,.999966,.214039,0,259642e-9,.999893,.213998,0,.00200075,.999737,.21391,0,.00527775,.999449,.213745,0,.00983959,.99896,.213458,0,.0154755,.9979,.212855,0,.0220249,.994278,.210779,0,.0293654,.992254,.20926,0,.0374021,.98881,.206908,0,.0460604,.984715,.204009,0,.0552802,.979738,.200471,0,.0650127,.972884,.195813,0,.0752175,.965996,.190856,0,.0858612,.957974,.185077,0,.0969155,.949155,.17868,0,.108356,.939288,.171513,0,.120163,.928996,.163838,0,.132319,.919563,.156246,0,.144808,.910004,.148359,0,.157618,.900791,.140417,0,.170737,.892135,.132569,0,.184155,.883803,.124741,0,.197866,.876034,.117091,0,.211861,.869219,.109835,0,.226134,.863062,.102859,0,.240682,.857795,.0962928,0,.255499,.853009,.0900725,0,.270583,.848603,.0842101,0,.285931,.844335,.0786527,0,.301542,.840208,.0734397,0,.317415,.836035,.0685334,0,.33355,.83172,.0639275,0,.349948,.827135,.0595909,0,.36661,.822797,.0556204,0,.383539,.818387,.0519394,0,.400738,.813565,.0485317,0,.41821,.808142,.0453138,0,.435961,.802212,.0423354,0,.453997,.79573,.0395553,0,.472324,.788741,.036988,0,.490951,.781093,.0345688,0,.509887,.773597,.0323297,0,.529144,.765622,.0302719,0,.548735,.757083,.0283477,0,.568674,.747992,.0265562,0,.588979,.738591,.0248844,0,.609671,.728719,.0233342,0,.630773,.719146,.0219081,0,.652314,.709165,.0205711,0,.674328,.69875,.0193248,0,.696854,.687884,.0181582,0,.719942,.676818,.0170746,0,.743651,.666247,.0160718,0,.768057,.655284,.0151262,0,.793253,.64401,.0142561,0,.819363,.633353,.0134327,0,.846547,.622674,.012653,0,.875017,.612265,.0119354,0,.905021,.602455,.0112533,0,.936508,.593147,.0106234,0,.968254,.583592,.0100213,0,1,1,.25717,0,0,1,.25717,0,0,.999992,.257164,0,0,.999958,.257135,0,641715e-9,.999864,.25706,0,.00305314,.999666,.256897,0,.00700975,.999302,.256596,0,.0122194,.998663,.25607,0,.0184622,.995607,.254123,0,.0255773,.993094,.252081,0,.0334439,.9907,.249867,0,.0419696,.98594,.246118,0,.0510823,.981214,.242049,0,.0607242,.974966,.236869,0,.0708486,.967589,.230724,0,.081417,.95915,.223635,0,.0923974,.950257,.21596,0,.103763,.940165,.207296,0,.115491,.929396,.197901,0,.127562,.919288,.188437,0,.13996,.909428,.178762,0,.15267,.900105,.169072,0,.165679,.891418,.159478,0,.178979,.883347,.15002,0,.192558,.875992,.140813,0,.20641,.869466,.13196,0,.220529,.863699,.123501,0,.234907,.858553,.115436,0,.249542,.854379,.107901,0,.264428,.850894,.10088,0,.279564,.847632,.0942296,0,.294947,.844571,.0879861,0,.310575,.84163,.0821534,0,.326448,.838542,.0766409,0,.342566,.835412,.0715322,0,.358929,.831899,.0666883,0,.37554,.828177,.0622175,0,.392399,.82416,.0580452,0,.409511,.820393,.054267,0,.426878,.816068,.0507172,0,.444506,.811201,.0474041,0,.4624,.805785,.0443174,0,.480566,.799878,.0414562,0,.499013,.793469,.0388147,0,.517749,.786473,.0363453,0,.536785,.778874,.0340225,0,.556134,.771277,.0318599,0,.575809,.763426,.0298859,0,.595827,.755044,.0280357,0,.616207,.746161,.0262979,0,.636973,.737124,.0247295,0,.65815,.72761,.0232514,0,.679772,.717822,.0218755,0,.701876,.708279,.0205942,0,.724509,.698333,.0193947,0,.74773,.68802,.0182717,0,.771609,.677321,.0172044,0,.79624,.666504,.0162122,0,.821743,.656184,.0152924,0,.84828,.64556,.0144326,0,.876069,.634636,.0136157,0,.905404,.624124,.0128612,0,.936508,.613914,.0121435,0,.968254,.603589,.0114887,0,1,1,.307946,0,0,.999999,.307945,0,0,.999988,.307934,0,204479e-10,.999944,.307886,0,.00127833,.999824,.307756,0,.00445047,.999565,.30748,0,.00914673,.999085,.306966,0,.0150498,.998103,.306004,0,.0219367,.994249,.303028,0,.0296485,.991807,.300435,0,.038068,.987773,.296554,0,.0471062,.982673,.2916,0,.0566942,.976623,.285641,0,.0667768,.968757,.27815,0,.0773099,.959849,.269529,0,.088257,.950663,.260248,0,.0995879,.940129,.249704,0,.111277,.92895,.238291,0,.123304,.917996,.226501,0,.13565,.907813,.214669,0,.148299,.898305,.202835,0,.161237,.889626,.191158,0,.174455,.88175,.179695,0,.187941,.874715,.168548,0,.201687,.868746,.15792,0,.215687,.863703,.147807,0,.229933,.859315,.138149,0,.24442,.855538,.128993,0,.259145,.852428,.120414,0,.274103,.850168,.112498,0,.289293,.848132,.105054,0,.304711,.846291,.0981087,0,.320357,.844431,.0915942,0,.33623,.842493,.0855056,0,.35233,.840368,.0798204,0,.368658,.83798,.0745097,0,.385214,.83523,.0695424,0,.402002,.832091,.0649092,0,.419023,.828667,.0606291,0,.436282,.824805,.0566523,0,.453782,.820988,.0530229,0,.471529,.816635,.0496364,0,.489528,.811725,.0464658,0,.507788,.806316,.0435082,0,.526317,.800469,.0407873,0,.545124,.794107,.038255,0,.564221,.787218,.0358825,0,.583621,.779872,.0336785,0,.603341,.772097,.0316379,0,.623397,.764484,.0297379,0,.643812,.756428,.0279581,0,.664611,.748022,.0263153,0,.685824,.739268,.0247799,0,.707488,.73024,.0233385,0,.729646,.720893,.0220035,0,.752354,.71119,.0207555,0,.77568,.701791,.0195843,0,.799715,.692184,.0184891,0,.824574,.682258,.0174541,0,.850417,.67206,.0164873,0,.877466,.661717,.0155959,0,.90604,.651462,.0147519,0,.936528,.641467,.0139727,0,.968254,.631229,.0132363,0,1,1,.367573,0,0,.999999,.367571,0,0,.999984,.367553,0,183382e-9,.999925,.367473,0,.00225254,.999759,.367259,0,.00628165,.99941,.366801,0,.0117858,.998739,.365946,0,.0184359,.995529,.363191,0,.0260114,.992875,.360171,0,.0343581,.989135,.355981,0,.0433637,.984166,.350401,0,.0529438,.977871,.343348,0,.0630334,.96951,.334341,0,.0735805,.959964,.323862,0,.0845437,.950162,.312521,0,.095889,.938882,.299577,0,.107588,.926992,.285573,0,.119617,.915589,.271212,0,.131957,.904791,.256611,0,.144591,.895177,.242224,0,.157503,.886403,.227952,0,.170682,.878957,.214192,0,.184117,.872418,.200795,0,.197799,.867029,.188015,0,.21172,.862835,.175975,0,.225873,.859411,.164526,0,.240253,.856655,.153693,0,.254854,.854519,.14352,0,.269673,.852828,.13397,0,.284707,.851412,.124984,0,.299953,.850609,.116748,0,.315408,.849855,.10905,0,.331073,.849017,.101839,0,.346946,.848079,.0951359,0,.363028,.846911,.0888774,0,.379318,.845445,.0830375,0,.395818,.84362,.0775844,0,.41253,.841411,.0725054,0,.429457,.838768,.0677691,0,.446602,.835801,.0634016,0,.463968,.832341,.0593095,0,.481561,.828424,.0555121,0,.499386,.824312,.052024,0,.51745,.819918,.0487865,0,.535761,.815072,.0457801,0,.554328,.809863,.0430184,0,.573162,.804164,.0404245,0,.592275,.798034,.0380146,0,.611681,.791436,.0357436,0,.631398,.784498,.0336475,0,.651445,.777125,.0316666,0,.671845,.769365,.0298122,0,.692628,.761579,.0281001,0,.713827,.753746,.0265049,0,.735484,.745573,.0250067,0,.75765,.737083,.0236026,0,.78039,.728545,.0223302,0,.803789,.719691,.0211243,0,.82796,.710569,.0199983,0,.853056,.701216,.0189569,0,.879298,.692094,.0179702,0,.907014,.682909,.0170418,0,.936691,.673509,.0161732,0,.968254,.663863,.0153406,0,1,1,.437395,0,0,.999998,.437394,0,0,.99998,.437363,0,616704e-9,.999891,.437232,0,.00367925,.999656,.436877,0,.00867446,.999148,.436121,0,.0150679,.997959,.434564,0,.022531,.993464,.430134,0,.0308507,.990606,.426077,0,.0398805,.985027,.419397,0,.0495148,.978491,.41118,0,.0596749,.969643,.40048,0,.0703001,.959189,.38769,0,.0813427,.948223,.373575,0,.0927641,.935955,.357622,0,.104533,.923237,.34043,0,.116624,.911074,.322735,0,.129015,.899724,.30479,0,.141687,.890189,.287392,0,.154626,.881796,.270248,0,.167818,.874781,.253659,0,.181252,.869166,.237786,0,.194918,.864725,.222618,0,.208807,.861565,.208356,0,.222913,.859284,.194867,0,.237229,.857677,.18212,0,.25175,.856714,.17018,0,.266473,.856155,.158969,0,.281392,.8558,.148413,0,.296505,.855672,.138578,0,.311811,.855538,.129345,0,.327306,.855689,.120861,0,.342991,.855767,.112969,0,.358864,.855618,.105593,0,.374925,.85525,.0987451,0,.391176,.854583,.0923727,0,.407616,.853534,.0864143,0,.424249,.852061,.0808338,0,.441076,.850253,.0756771,0,.4581,.848004,.0708612,0,.475324,.845333,.0663784,0,.492754,.842376,.0622631,0,.510394,.838956,.0584112,0,.528251,.835121,.0548328,0,.546331,.830842,.0514838,0,.564644,.826212,.048355,0,.583198,.821522,.0454714,0,.602005,.816551,.0428263,0,.621078,.811211,.0403612,0,.640434,.805479,.038039,0,.660089,.799409,.0358739,0,.680066,.79306,.0338727,0,.70039,.786395,.0319985,0,.721094,.779416,.030241,0,.742215,.77214,.0285951,0,.7638,.764636,.0270747,0,.785912,.756836,.0256354,0,.808628,.749315,.0243027,0,.832055,.741561,.0230497,0,.856338,.733589,.0218801,0,.88169,.725479,.020784,0,.908441,.717255,.0197702,0,.937125,.708829,.0188168,0,.968254,.700191,.0179113,0,1,1,.518937,0,0,.999998,.518933,0,0,.999967,.518883,0,.00147741,.999832,.51866,0,.00573221,.999466,.518057,0,.011826,.998644,.516752,0,.0192116,.994458,.512347,0,.027573,.991223,.507675,0,.0367099,.985515,.500188,0,.046487,.978308,.490408,0,.0568071,.968359,.477357,0,.0675984,.95682,.461752,0,.0788059,.943929,.443796,0,.090386,.930224,.423893,0,.102304,.916514,.402682,0,.114532,.903653,.380914,0,.127047,.892315,.359212,0,.139828,.882942,.338102,0,.152861,.875438,.31773,0,.16613,.869642,.298186,0,.179624,.865304,.279491,0,.193332,.862382,.261804,0,.207247,.860666,.245146,0,.22136,.859788,.229406,0,.235666,.859608,.214605,0,.250158,.859912,.200691,0,.264832,.86053,.187623,0,.279684,.861368,.17539,0,.294711,.862237,.163901,0,.309911,.863127,.153175,0,.32528,.863923,.143147,0,.340819,.864567,.133781,0,.356524,.865013,.125042,0,.372397,.86539,.116952,0,.388438,.865591,.109476,0,.404645,.865517,.102542,0,.421022,.865084,.0960688,0,.437569,.864309,.0900499,0,.454287,.863151,.0844328,0,.471181,.861649,.0792218,0,.488253,.859742,.0743482,0,.505507,.857446,.0697963,0,.522947,.854757,.0655364,0,.54058,.851783,.061608,0,.558412,.848516,.0579701,0,.576449,.844897,.0545742,0,.594701,.840956,.0514167,0,.613178,.836676,.0484598,0,.631892,.832075,.0456934,0,.650856,.827191,.0431178,0,.670088,.822295,.0407718,0,.689606,.817294,.0386032,0,.709434,.812013,.0365675,0,.7296,.806465,.0346547,0,.750138,.800691,.0328717,0,.771093,.794709,.031211,0,.792519,.788493,.0296504,0,.814488,.782049,.0281782,0,.837097,.775403,.0267965,0,.860481,.76857,.0255002,0,.884842,.761536,.0242759,0,.910494,.754303,.0231142,0,.937985,.74692,.0220305,0,.968254,.739745,.0210192,0,1,1,.613914,0,0,.999996,.613907,0,963597e-10,.999942,.613814,0,.00301247,.999704,.613407,0,.00870385,.999046,.612302,0,.0160714,.995516,.608266,0,.0245899,.991726,.602863,0,.0339681,.985157,.593956,0,.0440254,.97642,.581748,0,.0546409,.964404,.565183,0,.0657284,.950601,.545273,0,.0772246,.935158,.522129,0,.0890812,.919364,.496782,0,.10126,.904754,.470571,0,.113731,.89176,.444037,0,.126469,.881492,.418322,0,.139454,.873656,.393522,0,.15267,.868053,.369795,0,.166101,.864336,.347171,0,.179736,.862259,.325737,0,.193565,.861556,.305532,0,.207578,.861776,.286416,0,.221769,.862661,.268355,0,.23613,.864015,.251334,0,.250656,.865711,.235352,0,.265343,.867519,.220302,0,.280187,.869351,.206161,0,.295183,.871144,.192908,0,.31033,.872839,.180505,0,.325624,.874307,.168848,0,.341065,.875667,.158021,0,.35665,.876758,.147877,0,.37238,.87764,.138441,0,.388253,.878237,.129627,0,.404269,.878563,.121415,0,.42043,.878572,.113741,0,.436735,.87842,.106652,0,.453187,.878057,.100097,0,.469786,.877413,.0940128,0,.486536,.87646,.0883462,0,.503439,.875233,.0830924,0,.520498,.8737,.0781975,0,.537717,.871873,.07364,0,.555102,.86978,.0694103,0,.572657,.867405,.0654696,0,.59039,.864751,.0617914,0,.608307,.861818,.0583491,0,.626419,.858645,.0551443,0,.644733,.855307,.0521894,0,.663264,.851736,.0494334,0,.682025,.847927,.0468504,0,.701032,.843888,.0444261,0,.720308,.839629,.0421497,0,.739875,.835158,.0400082,0,.759764,.830509,.0380076,0,.780014,.825714,.0361488,0,.800673,.820729,.0343956,0,.821803,.815751,.0327781,0,.843492,.810752,.031275,0,.86586,.805587,.0298542,0,.889087,.800317,.0285397,0,.913466,.79489,.0272948,0,.93952,.789314,.0261139,0,.96835,.783593,.0249938,0,1,1,.724258,0,0,.999992,.724243,0,726889e-9,.99987,.724044,0,.00569574,.999336,.72317,0,.0131702,.996271,.719432,0,.0220738,.991159,.712576,0,.0319405,.982465,.700927,0,.0425202,.97049,.684297,0,.0536599,.953973,.661244,0,.065258,.935546,.633804,0,.0772427,.916596,.603071,0,.0895616,.899353,.57105,0,.102175,.885216,.539206,0,.11505,.875076,.508714,0,.128164,.868334,.479571,0,.141495,.864414,.451796,0,.155026,.862678,.425328,0,.168745,.862835,.400352,0,.182639,.864067,.376532,0,.196699,.866086,.35391,0,.210915,.868557,.332424,0,.225282,.871271,.312053,0,.239792,.874058,.292764,0,.25444,.8768,.27453,0,.269223,.87939,.257297,0,.284135,.8819,.24114,0,.299174,.884187,.225934,0,.314337,.886262,.211669,0,.329622,.888119,.198311,0,.345026,.889709,.185783,0,.360549,.891054,.174063,0,.376189,.892196,.163143,0,.391946,.893101,.152952,0,.407819,.893803,.143475,0,.423808,.894277,.134647,0,.439914,.894532,.126434,0,.456137,.894576,.1188,0,.472479,.894393,.111694,0,.48894,.893976,.105069,0,.505523,.893346,.0989077,0,.52223,.892502,.0931724,0,.539064,.891441,.0878276,0,.556028,.890276,.082903,0,.573125,.888972,.0783505,0,.590361,.887469,.0741083,0,.607741,.885785,.0701633,0,.62527,.883914,.0664835,0,.642957,.881872,.0630567,0,.660809,.879651,.0598527,0,.678836,.877267,.0568615,0,.69705,.874717,.05406,0,.715465,.872012,.0514378,0,.734098,.869157,.0489805,0,.752968,.866155,.0466727,0,.772101,.863014,.0445056,0,.791529,.859748,.0424733,0,.81129,.856416,.0405957,0,.831438,.852958,.0388273,0,.852044,.849382,.0371619,0,.87321,.845694,.0355959,0,.89509,.841893,.0341155,0,.917932,.837981,.0327141,0,.942204,.833963,.0313856,0,.968981,.829847,.0301275,0,1,1,.85214,0,0,.999969,.852095,0,.00279627,.999483,.851408,0,.0107635,.994545,.84579,0,.0206454,.986188,.835231,0,.0315756,.969847,.814687,0,.0432021,.945951,.783735,0,.0553396,.91917,.746074,0,.0678766,.895488,.706938,0,.0807395,.878232,.669534,0,.0938767,.868252,.635168,0,.10725,.863873,.603069,0,.120832,.863369,.572514,0,.134598,.86545,.543169,0,.148533,.868803,.514578,0,.16262,.872794,.486762,0,.176849,.87702,.459811,0,.19121,.881054,.433654,0,.205694,.884974,.408574,0,.220294,.888587,.384525,0,.235005,.891877,.36156,0,.24982,.894793,.339661,0,.264737,.89743,.318913,0,.279751,.899796,.299302,0,.294859,.901943,.280843,0,.310058,.903858,.263481,0,.325346,.905574,.247197,0,.340721,.907069,.231915,0,.356181,.908379,.217614,0,.371725,.90952,.20425,0,.387353,.910483,.191758,0,.403063,.91128,.180092,0,.418854,.911936,.169222,0,.434727,.912454,.159098,0,.450682,.912835,.149668,0,.466718,.913078,.140884,0,.482837,.913192,.132709,0,.499038,.913175,.125095,0,.515324,.91304,.118012,0,.531695,.912781,.111417,0,.548153,.91241,.105281,0,.5647,.911924,.0995691,0,.581338,.911331,.0942531,0,.59807,.910637,.0893076,0,.6149,.90984,.0846998,0,.63183,.908941,.0804044,0,.648865,.907944,.0763984,0,.666011,.906857,.0726638,0,.683273,.90568,.0691783,0,.700659,.904416,.0659222,0,.718176,.903067,.0628782,0,.735834,.901637,.0600307,0,.753646,.900128,.0573647,0,.771625,.898544,.0548668,0,.78979,.89689,.052527,0,.808162,.895165,.0503306,0,.826771,.893371,.0482668,0,.845654,.891572,.0463605,0,.864863,.889763,.0445998,0,.884472,.887894,.0429451,0,.904592,.885967,.0413884,0,.925407,.883984,.0399225,0,.947271,.881945,.0385405,0,.97105,.879854,.0372362,0,1,.999804,.995833,0,0,.938155,.933611,0,.0158731,.864755,.854311,0,.0317461,.888594,.865264,0,.0476191,.905575,.863922,0,.0634921,.915125,.850558,0,.0793651,.920665,.829254,0,.0952381,.924073,.802578,0,.111111,.926304,.772211,0,.126984,.927829,.739366,0,.142857,.928924,.705033,0,.15873,.92973,.670019,0,.174603,.930339,.634993,0,.190476,.930811,.600485,0,.206349,.931191,.566897,0,.222222,.93149,.534485,0,.238095,.931737,.503429,0,.253968,.931939,.473811,0,.269841,.932108,.445668,0,.285714,.93225,.418993,0,.301587,.932371,.393762,0,.31746,.932474,.369939,0,.333333,.932562,.347479,0,.349206,.932638,.326336,0,.365079,.932703,.306462,0,.380952,.93276,.287805,0,.396825,.932809,.270313,0,.412698,.932851,.253933,0,.428571,.932887,.23861,0,.444444,.932917,.224289,0,.460317,.932943,.210917,0,.47619,.932965,.19844,0,.492063,.932982,.186807,0,.507937,.932995,.175966,0,.52381,.933005,.165869,0,.539683,.933011,.156468,0,.555556,.933013,.147719,0,.571429,.933013,.139579,0,.587302,.93301,.132007,0,.603175,.933004,.124965,0,.619048,.932994,.118416,0,.634921,.932982,.112326,0,.650794,.932968,.106663,0,.666667,.93295,.101397,0,.68254,.932931,.0964993,0,.698413,.932908,.0919438,0,.714286,.932883,.0877057,0,.730159,.932856,.0837623,0,.746032,.932827,.0800921,0,.761905,.932796,.0766754,0,.777778,.932762,.0734936,0,.793651,.932727,.0705296,0,.809524,.932689,.0677676,0,.825397,.93265,.0651929,0,.84127,.932609,.0627917,0,.857143,.932565,.0605515,0,.873016,.932521,.0584606,0,.888889,.932474,.0565082,0,.904762,.932427,.0546841,0,.920635,.932377,.0529793,0,.936508,.932326,.0513851,0,.952381,.932274,.0498936,0,.968254,.93222,.0484975,0,.984127,.932164,.0471899,0,1],n=new Float32Array(e),s=new Float32Array(t),r=new Gt(n,64,64,1023,1015,300,1001,1001,1006,1003,1),o=new Gt(s,64,64,1023,1015,300,1001,1001,1006,1003,1);r.needsUpdate=!0,o.needsUpdate=!0;const a=new Uint16Array(e.length);e.forEach(function(u,f){a[f]=dr.toHalfFloat(u)});const l=new Uint16Array(t.length);t.forEach(function(u,f){l[f]=dr.toHalfFloat(u)});const c=new Gt(a,64,64,1023,1016,300,1001,1001,1006,1003,1),h=new Gt(l,64,64,1023,1016,300,1001,1001,1006,1003,1);return c.needsUpdate=!0,h.needsUpdate=!0,this.LTC_HALF_1=c,this.LTC_HALF_1=h,this.LTC_FLOAT_1=r,this.LTC_FLOAT_2=o,this}}yn.LTC_HALF_1=null;yn.LTC_HALF_1=null;yn.LTC_FLOAT_1=null;yn.LTC_FLOAT_2=null;class M5{static init(){yn.init();const{LTC_FLOAT_1:e,LTC_FLOAT_2:t,LTC_HALF_1:n,LTC_HALF_2:s}=yn;f0.LTC_FLOAT_1=e,f0.LTC_FLOAT_2=t,f0.LTC_HALF_1=n,f0.LTC_HALF_2=s}}function _t(i,e=i){const t=document.createElement("canvas");return t.width=i,t.height=e,{c:t,x:t.getContext("2d",{willReadFrequently:!0})}}function ki(i){let e=i>>>0||1;return()=>(e^=e<<13,e^=e>>>17,e^=e<<5,(e>>>0)%1e5/1e5)}function Tn(i,e,t,n,s){const r=ki(s),o=new Float32Array(i*e);let a=1,l=0;for(let c=0;c<n;c++){const h=Math.max(2,Math.round(i/t*2**c)),u=Math.max(2,Math.round(e/t*2**c)),f=new Float32Array(h*u).map(()=>r());for(let d=0;d<e;d++){const g=d/e*u,x=Math.floor(g)%u,p=(x+1)%u,m=g-Math.floor(g),T=m*m*(3-2*m);for(let v=0;v<i;v++){const S=v/i*h,P=Math.floor(S)%h,A=(P+1)%h,w=S-Math.floor(S),D=w*w*(3-2*w),V=f[x*h+P]+(f[x*h+A]-f[x*h+P])*D,_=f[p*h+P]+(f[p*h+A]-f[p*h+P])*D;o[d*i+v]+=(V+(_-V)*T)*a}}l+=a,a*=.5}for(let c=0;c<o.length;c++)o[c]/=l;return o}function Ks(i,e,t,n){const{c:s,x:r}=_t(e,t),o=r.createImageData(e,t);for(let a=0;a<t;a++)for(let l=0;l<e;l++){const c=i[a*e+(l-1+e)%e],h=i[a*e+(l+1)%e],u=i[(a-1+t)%t*e+l],f=i[(a+1)%t*e+l];let d=(c-h)*n,g=(f-u)*n,x=1;const p=Math.hypot(d,g,x);d/=p,g/=p,x/=p;const m=(a*e+l)*4;o.data[m]=(d*.5+.5)*255,o.data[m+1]=(g*.5+.5)*255,o.data[m+2]=(x*.5+.5)*255,o.data[m+3]=255}return r.putImageData(o,0,0),s}function B1(i,e,t,n){const{c:s,x:r}=_t(e,t),o=r.createImageData(e,t);for(let a=0;a<e*t;a++){const l=Math.max(0,Math.min(255,n(i[a],a)*255));o.data[a*4]=o.data[a*4+1]=o.data[a*4+2]=l,o.data[a*4+3]=255}return r.putImageData(o,0,0),s}function i1(i=1024,e=1024,t=6,n=7){const s=ki(n),r=Tn(i,e,64,5,n),o=Tn(i,e,8,3,n+1),{c:a,x:l}=_t(i,e),c=l.createImageData(i,e),h=new Float32Array(i*e),u=e/t,f=Array.from({length:t},()=>s()),d=Array.from({length:t},()=>.92+s()*.12),g=Array.from({length:t},()=>s()*i);for(let x=0;x<e;x++){const p=Math.floor(x/u),m=x%u/u;for(let T=0;T<i;T++){const v=r[x*i+T],S=Math.sin((m*38+v*9+f[p]*20)*Math.PI),P=Math.pow(Math.abs(S),6),A=o[x*i+T];let w=d[p]*(.9+.1*A)-P*.07;const D=Math.min(m,1-m)*u<1.2?.55:1,V=Math.abs(T-g[p])<1.2?.6:1;w*=D*V;const _=(x*i+T)*4;c.data[_]=222*w,c.data[_+1]=196*w,c.data[_+2]=162*w,c.data[_+3]=255,h[x*i+T]=(1-P)*.3+A*.2+(D<1||V<1?-1:0)}}return l.putImageData(c,0,0),{map:a,normal:Ks(h,i,e,2.2),rough:B1(h,i,e,x=>.58-x*.12)}}function S5(i=512,e=3){const t=Tn(i,i,40,6,e),n=Tn(i,i,4,2,e+9),s=t.map((r,o)=>r*.7+n[o]*.3);return{map:B1(s,i,i,r=>.94+r*.06),normal:Ks(s,i,i,1.4)}}function y5(i=512,e=5){const t=Tn(i,i,3,2,e),n=Tn(i,i,120,3,e+2),s=t.map((l,c)=>l*.8+n[c]*.2),{c:r,x:o}=_t(i,i),a=o.createImageData(i,i);for(let l=0;l<i*i;l++){const c=.86+s[l]*.14;a.data[l*4]=226*c,a.data[l*4+1]=222*c,a.data[l*4+2]=216*c,a.data[l*4+3]=255}return o.putImageData(a,0,0),{map:r,normal:Ks(s,i,i,4)}}function T5(i=256){const{c:e,x:t}=_t(i,i);t.fillStyle="#000",t.fillRect(0,0,i,i),t.strokeStyle="#fff",t.lineWidth=i/40;const n=16;for(let s=-n;s<n*2;s++)t.beginPath(),t.moveTo(s*i/n,0),t.lineTo(s*i/n+i,i),t.stroke(),t.beginPath(),t.moveTo(s*i/n,i),t.lineTo(s*i/n+i,0),t.stroke();return e}function E5(i,e,t,n=64,s=512){const{c:r,x:o}=_t(n,s);o.fillStyle=e,o.fillRect(0,0,n,s);const a=o.createLinearGradient(0,0,n,0);return a.addColorStop(0,"rgba(0,0,0,.18)"),a.addColorStop(.15,"rgba(255,255,255,.08)"),a.addColorStop(.85,"rgba(0,0,0,0)"),a.addColorStop(1,"rgba(0,0,0,.2)"),o.fillStyle=a,o.fillRect(0,0,n,s),o.fillStyle=t,o.fillRect(0,40,n,3),o.fillRect(0,s-44,n,3),o.save(),o.translate(n/2+9,s/2),o.rotate(-Math.PI/2),o.font="500 26px Geist, sans-serif",o.textAlign="center",o.fillText(i,0,0),o.restore(),r}function A5(i=768,e=1024){const{c:t,x:n}=_t(i,e);return n.fillStyle="#F3EFE8",n.fillRect(0,0,i,e),n.strokeStyle="#15171D",n.lineCap="round",n.lineWidth=46,n.beginPath(),n.arc(i*.62,e*.48,i*.3,-Math.PI/2,Math.PI/2),n.stroke(),n.strokeStyle="#8B5CF6",n.lineWidth=46,n.beginPath(),n.moveTo(i*.52,e*.3),n.lineTo(i*.3,e*.3),n.arc(i*.3,e*.39,e*.09,-Math.PI/2,Math.PI/2,!0),n.lineTo(i*.42,e*.48),n.arc(i*.42,e*.57,e*.09,-Math.PI/2,Math.PI/2),n.lineTo(i*.18,e*.66),n.stroke(),n.fillStyle="#2BB8E6",n.beginPath(),n.arc(i*.45,e*.2,24,0,Math.PI*2),n.fill(),n.fillStyle="#6A7080",n.font='400 22px "Geist Mono", monospace',n.fillText("SILVADEV  —  ESTÚDIO",60,e-70),t}function We(i,e,t=!0,n){const s=new S4(i);return t&&(s.colorSpace=je),s.anisotropy=Math.min(8,e.capabilities.getMaxAnisotropy()),n&&(s.wrapS=s.wrapT=1e3,s.repeat.set(...n)),s}function wi(i,e,t={}){const{repeat:n,bump:s=1,...r}=t,o=new me({map:We(i.map,e,!0,n),normalMap:i.normal?We(i.normal,e,!1,n):null,roughnessMap:i.rough?We(i.rough,e,!1,n):null,...r});return o.normalScale.set(s,s),o}const $s=`
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
`;function s1(i,e=[24,14]){return new ue({toneMapped:!1,uniforms:{map:{value:i},uOn:{value:0},uTime:{value:0},uGrid:{value:new t0(...e)},uGain:{value:1.5}},vertexShader:`
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,fragmentShader:`
      uniform sampler2D map; uniform float uOn; uniform float uTime; uniform vec2 uGrid; uniform float uGain;
      varying vec2 vUv;
      ${$s}
      void main(){
        vec3 off = vec3(0.006, 0.007, 0.009);
        vec3 img = texture2D(map, vUv).rgb * uGain;
        float a = smoothstep(0.0, 0.22, uOn);
        // 1. faixa de luz que abre do meio
        float band = 1.0 - smoothstep(0.0, mix(0.002, 0.5, a), abs(vUv.y - 0.5));
        float t = smoothstep(0.18, 1.0, uOn);
        vec3 col = off + vec3(0.9, 0.88, 1.0) * band * (1.0 - t) * step(0.0001, uOn) * 0.8;
        // 2. blocos acendem do centro para fora
        vec2 cell = floor(vUv * uGrid);
        float d = length((cell + 0.5) / uGrid - 0.5);
        float k = clamp((t * 1.7 - d * 0.95 - hash(cell) * 0.3) / 0.3, 0.0, 1.0);
        vec2 f = fract(vUv * uGrid);
        float edge = 1.0 - smoothstep(0.0, 0.08, min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y)));
        vec3 tc = mix(vec3(0.545, 0.36, 0.965) * 1.4, img, smoothstep(0.3, 1.0, k)) + edge * (1.0 - k) * 0.8;
        col = mix(col, tc, smoothstep(0.0, 0.15, k));
        // 3. ligado: brilho de varredura bem leve
        float on = step(0.999, t);
        col += on * 0.035 * pow(max(0.0, sin((vUv.y + uTime * 0.07) * 3.14159)), 40.0);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `})}function b5(i,e,t,n){return new ue({uniforms:{map:{value:i},uReveal:{value:0},uCols:{value:e},uRows:{value:t},uBg:{value:n},uLight:{value:1}},vertexShader:`
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,fragmentShader:`
      uniform sampler2D map; uniform float uReveal; uniform float uCols; uniform float uRows; uniform vec3 uBg; uniform float uLight;
      varying vec2 vUv;
      ${$s}
      void main(){
        vec2 g = vec2(uCols, uRows);
        vec2 c = floor(vec2(vUv.x, 1.0 - vUv.y) * g);
        float idx = c.y * uCols + c.x;
        vec2 l = fract(vec2(vUv.x, 1.0 - vUv.y) * g);
        float p = clamp(uReveal * uCols * uRows - idx, 0.0, 1.0);
        // varredura com borda irregular, como traço de caneta
        float wob = (hash(vec2(floor(l.y * 40.0), idx)) - 0.5) * 0.04;
        float m = smoothstep(p * 1.08 - 0.04, p * 1.08 - 0.02, l.x + wob);
        vec3 col = mix(texture2D(map, vUv).rgb, uBg, m);
        gl_FragColor = vec4(col * uLight, 1.0);
        #include <colorspace_fragment>
      }
    `})}function w5(){const{c:i,x:e}=_t(1024,512),t=e.createLinearGradient(0,0,0,512);t.addColorStop(0,"#DCE8F7"),t.addColorStop(.55,"#F4F6FA"),t.addColorStop(1,"#E9EEE6"),e.fillStyle=t,e.fillRect(0,0,1024,512),e.filter="blur(18px)",e.fillStyle="rgba(230,232,236,1)",e.fillRect(620,170,260,260);for(let n=0;n<14;n++)e.fillStyle=`rgba(${120+n%3*18},${150+n%4*12},${118+n%2*10},.75)`,e.beginPath(),e.arc(40+n*75,380-n%4*30,70+n%3*20,0,Math.PI*2),e.fill();return e.filter="none",i}function C5(){return new ue({transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{uColor:{value:new P0(1,.9,.75)},uStrength:{value:.05},uTime:{value:0}},vertexShader:`
      attribute vec2 aWin; // x: distância ao longo do feixe, y: altura na janela
      varying vec2 vWin; varying vec3 vPos; varying float vDepth;
      void main(){ vWin = aWin; vPos = position; vec4 mv = modelViewMatrix * vec4(position, 1.0); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }
    `,fragmentShader:`
      uniform vec3 uColor; uniform float uStrength; uniform float uTime;
      varying vec2 vWin; varying vec3 vPos; varying float vDepth;
      ${$s}
      float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
      void main(){
        float along = vWin.x;
        float y = vWin.y;
        // persiana na metade de cima: faixas
        float slats = y > 0.52 ? smoothstep(0.35, 0.65, fract(y * 18.0)) : 1.0;
        float fall = pow(1.0 - along, 1.6) * smoothstep(0.0, 0.08, along);
        float dust = 0.75 + 0.25 * noise(vPos.xz * 3.0 + vec2(uTime * 0.05, 0.0));
        float a = uStrength * slats * fall * dust * smoothstep(0.6, 3.0, vDepth);
        gl_FragColor = vec4(uColor * a, 1.0);
      }
    `})}function R5(){const i=new b1,e=new J(new qt(10,4,10),new mt({color:new P0(.85,.86,.9),side:1}));e.position.y=1.5,i.add(e);const t=new J(new oe(5,2),new mt({color:new P0(1,.97,.92).multiplyScalar(9)}));t.position.set(-4.9,1.8,0),t.rotation.y=Math.PI/2;const n=new J(new oe(4,4),new mt({color:new P0(1,1,1).multiplyScalar(2.2)}));n.position.set(0,3.45,0),n.rotation.x=Math.PI/2;const s=new J(new oe(10,10),new mt({color:new P0(.75,.68,.58)}));return s.rotation.x=-Math.PI/2,s.position.y=-.49,i.add(t,n,s),i}const On=new R;function $e(i,e,t,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;On.copy(e),On[n]=0,On.normalize();const c=.5*o/(o+a),h=1-On.angleTo(i)/l;return Math.sign(On[t])===1?h*c:a/(o+a)+c+c*(1-h)}class P5 extends qt{constructor(e=1,t=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(e/2,t/2,n/2,r),super(1,1,1,s,s,s),s===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new R,l=new R,c=new R(e,t,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,d=h.length/6,g=new R,x=.5/s;for(let p=0,m=0;p<h.length;p+=3,m+=2)switch(a.fromArray(h,p),l.copy(a),l.x-=Math.sign(l.x)*x,l.y-=Math.sign(l.y)*x,l.z-=Math.sign(l.z)*x,l.normalize(),h[p+0]=c.x*Math.sign(a.x)+l.x*r,h[p+1]=c.y*Math.sign(a.y)+l.y*r,h[p+2]=c.z*Math.sign(a.z)+l.z*r,u[p+0]=l.x,u[p+1]=l.y,u[p+2]=l.z,Math.floor(p/d)){case 0:g.set(1,0,0),f[m+0]=$e(g,l,"z","y",r,n),f[m+1]=1-$e(g,l,"y","z",r,t);break;case 1:g.set(-1,0,0),f[m+0]=1-$e(g,l,"z","y",r,n),f[m+1]=1-$e(g,l,"y","z",r,t);break;case 2:g.set(0,1,0),f[m+0]=1-$e(g,l,"x","z",r,e),f[m+1]=$e(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),f[m+0]=1-$e(g,l,"x","z",r,e),f[m+1]=1-$e(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),f[m+0]=1-$e(g,l,"x","y",r,e),f[m+1]=1-$e(g,l,"y","x",r,t);break;case 5:g.set(0,0,-1),f[m+0]=$e(g,l,"x","y",r,e),f[m+1]=1-$e(g,l,"y","x",r,t);break}}}function Cs(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Pe;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(e){let d;if(t)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(t){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=r1(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let x=0;x<o[h].length;++x)d.push(o[h][x][f]);const g=r1(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function r1(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const o=new e(r),a=new ze(o,t,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/t;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<t;g++){const x=h.getComponent(f,g);a.setComponent(f+u,g,x)}}else o.set(h.array,l);l+=h.count*t}return s!==void 0&&(a.gpuType=s),a}const $0=(i,e)=>new t0(i,e),se=(i,e,t,n=.004,s=3)=>new P5(i,e,t,s,Math.min(n,i/2.02,e/2.02,t/2.02));function D5(i,e,t){const n=new qn,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function gt(i,e,t,n,s=.003){const r=new Mn(D5(i,e,n),{depth:t-s*2,bevelEnabled:!0,bevelThickness:s,bevelSize:s,bevelSegments:3,curveSegments:16});return r.rotateX(-Math.PI/2),r.translate(0,-t/2+s,0),r.computeVertexNormals(),r}function L5(){const i=e=>new jn(e);return{oak:i({color:14468774,roughness:.55}),steel:i({color:1776931,roughness:.42,metalness:.6,clearcoat:.3,clearcoatRoughness:.4}),alu:i({color:13948894,roughness:.32,metalness:.95}),chrome:i({color:15264496,roughness:.12,metalness:1}),white:i({color:16185080,roughness:.45,clearcoat:.4,clearcoatRoughness:.3}),plastic:i({color:15527666,roughness:.38}),rubber:i({color:2303275,roughness:.85}),fabric:i({color:13224914,roughness:.95,sheen:1,sheenColor:new P0(16777215),sheenRoughness:.6}),ceramic:i({color:15723492,roughness:.55,clearcoat:.6,clearcoatRoughness:.25}),purple:i({color:9133302,roughness:.3,clearcoat:.8,clearcoatRoughness:.15})}}function U5(i,e,t=2.6,n=.82,s=.74){const r=new ae,o=.036,a=new J(gt(t,n,o,.03,.006),e);a.position.y=s-o/2,r.add(a);for(const h of[-1,1]){const u=h*(t/2-.16),f=new J(se(.06,s-o-.02,.025,.004),i.steel);f.position.set(u,(s-o)/2+.01,0);const d=new J(se(.07,.025,n-.06,.006),i.steel);d.position.set(u,.0125,0);const g=new J(se(.05,.025,n-.12,.004),i.steel);g.position.set(u,s-o-.0125,0);const x=new J(new Ue(.012,.014,.008,16),i.rubber);x.position.set(u,.004-.004,n/2-.05);const p=x.clone();p.position.z=-n/2+.05,r.add(f,d,g,x,p)}const l=new J(se(t-.36,.05,.025,.004),i.steel);l.position.set(0,s-o-.05,-n/2+.12);const c=new J(se(1.1,.06,.12,.004),i.steel);return c.position.set(0,s-o-.09,-n/2+.14),r.add(l,c),{group:r,top:s}}function I5(i,e,t=.6,n=.34){const s=new ae,r=new ae,o=new J(se(t+.014,n+.014,.01,.004),i.steel),a=new J(se(t+.006,n+.006,.014,.006),i.plastic);a.position.z=-.011;const l=new J(se(t*.6,n*.62,.04,.018,4),i.plastic);l.position.set(0,-n*.05,-.024);const c=new J(se(t+.014,.016,.012,.004),i.alu);c.position.set(0,-n/2-.012,0);const h=new J(new oe(t,n),e);h.position.z=.0051;const u=new J(new oe(t+.01,n+.01),new jn({color:0,roughness:.06,metalness:0,transparent:!0,opacity:.14,clearcoat:1,depthWrite:!1}));u.position.z=.0056,u.userData.noAO=!0,r.add(o,a,l,c,h,u);const f=new qn;f.moveTo(0,0),f.lineTo(.03,0),f.bezierCurveTo(.03,.12,-.01,.2,-.045,.28),f.lineTo(-.07,.28),f.bezierCurveTo(-.035,.2,0,.12,0,0);const d=new Mn(f,{depth:.05,bevelEnabled:!0,bevelThickness:.004,bevelSize:.004,bevelSegments:3,curveSegments:24});d.translate(0,0,-.025),d.rotateY(Math.PI/2);const g=new J(d,i.alu);g.position.set(0,.01,-.07);const x=new J(gt(.25,.19,.01,.06,.003),i.alu);return x.position.set(0,.005,-.05),s.add(x,g),r.position.set(0,.29+n/2-.06,0),r.rotation.x=-.06,s.add(r),{group:s,panel:r,screen:h,height:.29+n/2-.06}}function F5(i){const e=new ae,t=new J(gt(.44,.14,.012,.01,.002),i.alu);t.position.y=.006,t.rotation.x=.04,e.add(t);const n=.019,s=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1.5],[1.5,1,1,1,1,1,1,1,1,1,1,1,1,1],[1.75,1,1,1,1,1,1,1,1,1,1,1,1.75],[2.25,1,1,1,1,1,1,1,1,1,1,2.25],[1,1,1.25,1.25,5.5,1.25,1,1,1]],r=se(1,.007,1,.0025,2);let o=0;s.forEach(u=>o+=u.length);const a=new Us(r,i.plastic,o),l=new Us(r,i.purple,1),c=new Y0;let h=0;return s.forEach((u,f)=>{let g=-(u.reduce((x,p)=>x+p,0)*n)/2;u.forEach((x,p)=>{const m=x*n-.0025;c.compose(new R(g+x*n/2,.016+f*.0011,-.048+f*n),new ye().setFromEuler(new Re(.04,0,0)),new R(m,1,n-.0025)),f===0&&p===0&&l.setMatrixAt(0,c),a.setMatrixAt(h++,c),g+=x*n})}),e.add(a,l),e}function N5(i){const e=[];for(let s=0;s<=16;s++){const r=s/16;e.push($0(Math.sin(r*Math.PI)*.031*(1-.15*r),r*.11))}const t=new Pt(e,40);t.rotateX(Math.PI/2);const n=t.attributes.position;for(let s=0;s<n.count;s++){const r=n.getY(s);n.setY(s,r>0?r*.55:0)}return t.computeVertexNormals(),t.translate(0,.001,-.055),new J(t,i.white)}function O5(i,e){const t=new ae,n=new qn;n.moveTo(0,-.03),n.lineTo(.31,-.012),n.quadraticCurveTo(.33,0,.31,.012),n.lineTo(0,.03),n.lineTo(0,-.03);const s=new Mn(n,{depth:.03,bevelEnabled:!0,bevelThickness:.006,bevelSize:.006,bevelSegments:3});s.rotateX(Math.PI/2),s.translate(0,.085,0);const r=[],o=[],a=[];for(let _=0;_<5;_++){const y=_/5*Math.PI*2,F=s.clone();F.rotateY(y),r.push(F);for(const z of[-1,1]){const K=new Ue(.025,.025,.014,20);K.rotateZ(Math.PI/2),K.translate(z*.011,.025,0),K.rotateY(y+.6),K.translate(Math.cos(y)*.31,0,-Math.sin(y)*.31),o.push(K)}const I=new Vt(.02,16,8,0,Math.PI*2,0,Math.PI/2);I.translate(Math.cos(y)*.31,.045,-Math.sin(y)*.31),a.push(I)}t.add(new J(Cs(r),i.alu),new J(Cs(o),i.rubber),new J(Cs(a),i.steel));const l=new J(new Ue(.045,.055,.05,24),i.alu);l.position.y=.1;const c=new J(new Ue(.022,.022,.18,20),i.chrome);c.position.y=.22;const h=new J(new Ue(.03,.034,.12,20),i.steel);h.position.y=.17;const u=new J(se(.2,.04,.24,.01),i.steel);u.position.y=.33,t.add(l,c,h,u);const f=new J(gt(.5,.48,.07,.09,.025),i.fabric);f.position.set(0,.39,0);const d=new J(gt(.48,.46,.02,.085,.006),i.steel);d.position.set(0,.35,0),t.add(f,d);const g=.55,x=.85,p=.56,m=new ae,T=We(T5(256),e,!1,[6,6]),v=new J(new Ue(g,g,p,32,1,!0,-x/2+Math.PI,x),new me({color:2764085,roughness:.8,alphaMap:T,alphaTest:.35,side:2})),S=[],P=48;for(let _=0;_<=P;_++){const F=_/P*4,I=Math.floor(F)%4,z=F-Math.floor(F),K=[-1,1,1,-1][I]+[2,0,-2,0][I]*z/1,B=[-1,-1,1,1][I]+[0,2,0,-2][I]*z/1,Q=Math.PI+K*x/2*.98;S.push(new R(Math.sin(Q)*g,B*p/2*.98,Math.cos(Q)*g))}const A=new J(new zi(new gn(S,!0,"catmullrom",.05),160,.012,10,!0),i.steel);m.add(v,A),m.position.set(0,.83,.55+.23),m.rotation.x=-.12;const w=new qn;w.moveTo(0,0),w.quadraticCurveTo(.22,.02,.24,.42),w.lineTo(.2,.42),w.quadraticCurveTo(.18,.06,0,.05);const D=new Mn(w,{depth:.05,bevelEnabled:!0,bevelThickness:.006,bevelSize:.006,bevelSegments:2});D.translate(0,0,-.025),D.rotateY(-Math.PI/2);const V=new J(D,i.steel);V.position.set(0,.33,.02),t.add(m,V);for(const _ of[-1,1]){const y=new J(se(.03,.22,.05,.008),i.steel);y.position.set(_*.27,.48,.05);const F=new J(se(.07,.025,.24,.012,4),i.rubber);F.position.set(_*.27,.6,.02);const I=new J(se(.03,.02,.14,.006),i.steel);I.position.set(_*.2,.36,.05),I.rotation.z=_*.6,t.add(y,F,I)}return t}function B5(){const{c:i,x:e}=_t(256,512);e.clearRect(0,0,256,512),e.beginPath(),e.moveTo(128,500),e.bezierCurveTo(70,470,30,400,40,330),e.bezierCurveTo(48,280,70,270,60,220),e.bezierCurveTo(40,120,70,30,128,10),e.bezierCurveTo(186,30,216,120,196,220),e.bezierCurveTo(186,270,208,280,216,330),e.bezierCurveTo(226,400,186,470,128,500);const t=e.createLinearGradient(0,0,0,512);t.addColorStop(0,"#5E8C5A"),t.addColorStop(1,"#3E6A44"),e.fillStyle=t,e.fill(),e.save(),e.clip(),e.strokeStyle="rgba(210,235,190,.55)",e.lineWidth=5,e.beginPath(),e.moveTo(128,505),e.lineTo(128,20),e.stroke(),e.lineWidth=2.2,e.strokeStyle="rgba(200,230,180,.35)";for(let s=0;s<9;s++){const r=460-s*48;e.beginPath(),e.moveTo(128,r),e.quadraticCurveTo(170,r-30,230,r-70),e.moveTo(128,r),e.quadraticCurveTo(86,r-30,26,r-70),e.stroke()}const n=e.createRadialGradient(100,200,10,100,200,220);return n.addColorStop(0,"rgba(255,255,255,.12)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,256,512),e.restore(),i}function z5(i,e,t=4){const n=new ae,s=ki(t),r=[$0(0,0),$0(.15,0),$0(.17,.02),$0(.19,.42),$0(.2,.44),$0(.185,.445),$0(.175,.42),$0(0,.42)],o=new J(new Pt(r,48),i.ceramic);n.add(o);const a=new J(new wn(.175,32),new me({color:4865329,roughness:1}));a.rotation.x=-Math.PI/2,a.position.y=.415,n.add(a);const l=[new R(0,.41,0),new R(.02,.8,.01),new R(-.01,1.2,-.02),new R(.03,1.55,.02)],c=new gn(l),h=new me({color:8021584,roughness:.9});n.add(new J(new zi(c,40,.016,8),h));const u=We(B5(),e),f=new me({map:u,alphaTest:.5,side:2,roughness:.45}),d=new oe(.17,.32,6,10),g=d.attributes.position;for(let p=0;p<g.count;p++){const m=g.getX(p),T=g.getY(p)+.16;g.setZ(p,Math.abs(m)*.35-Math.pow(T/.32,2)*.05),g.setY(p,T)}d.computeVertexNormals();const x=30;for(let p=0;p<x;p++){const m=.25+p/x*.75,T=c.getPoint(m),v=p*2.39996+s()*.4,S=.05+s()*.05,P=new R(Math.cos(v)*S,.02+s()*.03,Math.sin(v)*S),A=new J(d,f);A.position.copy(T).add(P);const w=.75+m*.45+s()*.15;A.scale.setScalar(w),A.rotation.set(-.9+s()*.5+(1-m)*.5,-v+Math.PI/2,(s()-.5)*.4,"YXZ"),n.add(A)}return n}function G5(i){const e=new ae,t=new J(new Pt([$0(0,0),$0(.085,0),$0(.088,.008),$0(.08,.018),$0(.02,.024),$0(0,.024)],48),i.steel);e.add(t);const n=new ae;n.position.y=.024,e.add(n);const s=new J(new Vt(.014,16,12),i.alu);n.add(s);const r=new ae;r.rotation.z=.35,n.add(r);const o=new J(new Ue(.006,.006,.36,12),i.steel);o.position.y=.18,r.add(o);const a=new ae;a.position.y=.36,r.add(a),a.add(new J(new Vt(.013,16,12),i.alu));const l=new ae;l.rotation.z=-1.55,a.add(l);const c=new J(new Ue(.006,.006,.32,12),i.steel);c.position.y=.16,l.add(c);const h=new ae;h.position.y=.32,l.add(h),h.add(new J(new Vt(.012,16,12),i.alu));const u=new Pt([$0(.012,0),$0(.02,.01),$0(.03,.04),$0(.06,.1),$0(.062,.102)],40);u.rotateX(Math.PI);const f=new J(u,i.steel),d=new ae;h.add(d),d.add(f);const g=new J(new wn(.055,32),new mt({color:new P0(1,.86,.66).multiplyScalar(4),toneMapped:!1}));g.rotation.x=Math.PI/2,g.position.y=-.095,d.add(g);const x=new n5(16767400,6,2.2,.6,.6,1.6);x.position.y=-.08,d.add(x);const p=new Me;return p.position.y=-1,d.add(p),x.target=p,{group:e,yaw:n,pivot:d,spot:x}}function V5(i,e,t){const n=new ae,s=[.95,1.38,1.81],r=["Clean Code","SQL","Design de Dados","Refactoring","TypeScript","Sistemas","DDD","Python","Redes","UX","Algoritmos","Arquitetura"],o=["#E9E4DA","#15171D","#C9C0F7","#F3F1EC","#B8E6F5","#DCD5C7","#8B5CF6","#E2E4EA"],a=ki(11);s.forEach((f,d)=>{const g=new J(gt(1.1,.26,.03,.01,.003),e);g.position.set(0,f,0),n.add(g);let x=-.5;const p=d===1?-.02:.25;for(;x<p;){const m=.022+a()*.02,T=.2+a()*.07,v=.15+a()*.05,S=Math.floor(a()*o.length),P=We(E5(r[Math.floor(a()*r.length)],o[S],S===1||S===6?"#F4F5FA":"#15171D"),t),A=new me({color:o[S],roughness:.75}),w=[A,A,A,A,new me({map:P,roughness:.7}),new me({color:15921128,roughness:.9})],D=new J(se(m,T,v,.002,1),w),V=x>p-.05?-.18:0;D.position.set(x+m/2,f+.015+T/2,-.01+(a()-.5)*.02),D.rotation.z=V,n.add(D),x+=m+.003}});const l=new J(new Pt([$0(0,0),$0(.04,0),$0(.055,.06),$0(.03,.15),$0(.022,.2),$0(.026,.205),$0(0,.205)],40),i.ceramic);l.position.set(.35,s[0]+.015,0);const c=new J(new Ue(.002,.002,.25,4),new me({color:9076832}));c.position.set(.355,s[0]+.3,0),c.rotation.z=.15,n.add(l,c);const h=new J(se(.13,.2,.14,.02,4),i.plastic);h.position.set(.33,s[1]+.115,0);const u=new J(new wn(.04,32),i.steel);u.position.set(.33,s[1]+.09,.0705),n.add(h,u);for(let f=0;f<4;f++){const d=new J(se(.24-f*.015,.03,.17,.002,1),new me({color:o[f*3%o.length],roughness:.75}));d.position.set(.1,s[2]+.03+f*.03,0),d.rotation.y=(a()-.5)*.15,n.add(d)}return n}function k5(i,e,t=.6,n=.8){const s=new ae,r=new J(se(t+.05,n+.05,.03,.004),i),o=new J(new oe(t,n),new me({color:16513783,roughness:.9}));o.position.z=.0151;const a=new J(new oe(t*.72,n*.72),new me({map:e,roughness:.85}));a.position.z=.0153;const l=new J(new oe(t,n),new jn({color:16777215,roughness:.05,transparent:!0,opacity:.06,clearcoat:1,depthWrite:!1}));return l.position.z=.016,l.userData.noAO=!0,s.add(r,o,a,l),s}function H5(i){const e=new ae,t=[$0(0,0),$0(.036,0),$0(.04,.004),$0(.042,.095),$0(.039,.098),$0(.037,.095),$0(.035,.01),$0(0,.01)];e.add(new J(new Pt(t,48),i.ceramic));const n=new J(new Zs(.024,.0065,12,32,Math.PI),i.ceramic);n.rotation.z=-Math.PI/2,n.position.set(.041,.05,0);const s=new J(new wn(.035,32),new jn({color:2824720,roughness:.1,clearcoat:1}));return s.rotation.x=-Math.PI/2,s.position.y=.082,e.add(n,s),e}function W5(i,e){const t=new ae,n=.31,s=.215,r=new J(gt(n,s,.011,.01,.003),i.alu);r.position.y=.0055;const o=new J(new oe(n*.86,s*.42),new me({color:1908517,roughness:.7}));o.rotation.x=-Math.PI/2,o.position.set(0,.0112,-.03);const a=new J(new oe(n*.4,s*.3),new me({color:13159635,roughness:.25,metalness:.6}));a.rotation.x=-Math.PI/2,a.position.set(0,.0112,.06),t.add(r,o,a);const l=new ae;l.position.set(0,.011,-s/2);const c=new J(gt(n,s,.006,.01,.002),i.alu);c.rotation.x=Math.PI/2,c.position.set(0,s/2,-.003);const h=new J(new oe(n-.006,s-.006),new me({color:789776,roughness:.3}));h.position.set(0,s/2,2e-4);const u=new J(new oe(n-.02,s-.03),e);return u.position.set(0,s/2+.003,4e-4),l.add(c,h,u),t.add(l),{group:t,lid:l,screen:u}}function X5(i,e,t=.25){const r=new oe(.21,.297,6,8),o=r.attributes.uv,a=r.attributes.position,l=t*(.21/.297);for(let c=0;c<o.count;c++){o.setXY(c,i+(t-l)/2+o.getX(c)*l,e+o.getY(c)*t);const h=a.getX(c)/(.21/2),u=a.getY(c)/(.297/2);a.setZ(c,(h*h*.004+u*u*.003)*1)}return r.computeVertexNormals(),r.rotateX(-Math.PI/2),r}const qe="#10141D",Jn="#5A6070",js="#D9DCE6",nt="#8B5CF6",q5="#2BB8E6",Qn="Newsreader, Georgia, serif",Rt="Geist, system-ui, sans-serif",kt='"Geist Mono", ui-monospace, monospace';function Y5(i){let e=i*9301+49297;return()=>(e=(e*9301+49297)%233280,e/233280)}function _n(i,e,t,n,s,r){i.beginPath(),i.roundRect(e,t,n,s,r)}function Zt(i,e,t="#FFFFFF"){i.fillStyle=t,i.fillRect(0,0,e,e)}function Rs(i,e,t){Zt(i,e);const n=14,s=5,r=70,o=(e-r-20)/n,a=(e-40)/s;i.fillStyle="#EEF0F6",i.fillRect(20,r,e-40,o),i.strokeStyle=js,i.lineWidth=2;for(let l=0;l<=n;l++)i.beginPath(),i.moveTo(20,r+l*o),i.lineTo(e-20,r+l*o),i.stroke();for(let l=0;l<=s;l++)i.beginPath(),i.moveTo(20+l*a,r),i.lineTo(20+l*a,e-20),i.stroke();i.font=`500 26px ${Rt}`,i.fillStyle=qe,i.fillText("controle_FINAL_v3.xlsx",22,46),i.font=`400 19px ${kt}`;for(let l=1;l<n;l++)for(let c=0;c<s;c++){const h=c===0?`${String(l).padStart(2,"0")}/10`:(t()*9e3+120).toFixed(0);i.fillStyle=t()<.07?"#D0352F":Jn,i.fillText(t()<.06?"#REF!":h,26+c*a,r+l*o+o*.68)}i.fillStyle="rgba(255, 214, 10, .35)",i.fillRect(20,r+o*(3+Math.floor(t()*8)),e-40,o)}function o1(i,e,t){Zt(i,e),i.fillStyle=qe,i.font=`600 28px ${Rt}`,i.fillText("RE: RE: FW: estoque??",32,64),i.font=`400 20px ${Rt}`,i.fillStyle=Jn,i.fillText("De: comercial@  Para: todos@",32,98),i.fillStyle=js,i.fillRect(32,118,e-64,2),i.font=`400 22px ${Rt}`,i.fillStyle=qe,["Pessoal, alguém sabe quanto","tem do lote 14? A planilha","do financeiro diz uma coisa","e o sistema diz outra.","","Vou ver no caderno do Zé.","","Abs"].forEach((s,r)=>i.fillText(s,32,160+r*36));for(let s=0;s<4;s++)i.fillStyle="#E6E8EF",_n(i,32,430+s*0,(e-64)*(.5+t()*.4),14,7),i.fill()}function a1(i,e,t){Zt(i,e,"#FBFAF6"),i.fillStyle=qe,i.textAlign="center",i.font=`600 26px ${kt}`,i.fillText("CUPOM NÃO FISCAL",e/2,60),i.font=`400 19px ${kt}`,i.fillText("-----------------------------",e/2,90),i.textAlign="left";for(let n=0;n<9;n++)i.fillStyle=Jn,i.fillText(`ITEM ${String(n+1).padStart(3,"0")}  x${1+Math.floor(t()*4)}`,40,125+n*32),i.textAlign="right",i.fillText((t()*90+5).toFixed(2),e-40,125+n*32),i.textAlign="left";i.fillStyle=qe,i.font=`600 24px ${kt}`,i.fillText("TOTAL",40,445),i.textAlign="right",i.fillText((t()*900+100).toFixed(2),e-40,445),i.textAlign="left";for(let n=0;n<70;n++)i.fillStyle=qe,i.fillRect(60+n*5.6,462,t()<.5?2:3.5,32)}function Ps(i,e,t){Zt(i,e,"#FFF3B0"),i.fillStyle="rgba(0,0,0,.05)",i.fillRect(0,0,e,40),i.fillStyle="#2A2A33",i.font=`italic 400 44px ${Qn}`,[["ligar p/ cliente","sobre o pedido","3 vezes já!!"],["senha do sistema:","pergunta pra","Márcia"],["conferir caixa","de sexta, não","bateu de novo"],["NÃO apagar","a aba 2","da planilha"]][Math.floor(t()*4)].forEach((s,r)=>i.fillText(s,40,140+r*72)),i.strokeStyle="#D0352F",i.lineWidth=4,i.beginPath(),i.ellipse(e*.62,272,120,40,-.05,0,Math.PI*2),i.stroke()}function l1(i,e,t){Zt(i,e,"#F2F3F7"),i.fillStyle=qe,i.font=`600 24px ${Rt}`,i.fillText("Grupo · Operação",28,50);const n=["chegou o pedido?","qual pedido","o de ontem","qual de ontem kkk","manda print","tá na planilha?","qual planilha"];i.font=`400 21px ${Rt}`;let s=84;n.forEach((r,o)=>{const a=o%2===1,l=i.measureText(r).width+36;i.fillStyle=a?"#DCD3FF":"#FFFFFF",_n(i,a?e-28-l:28,s,l,46,16),i.fill(),i.fillStyle=qe,i.fillText(r,(a?e-28-l:28)+18,s+30),s+=58+t()*4})}function c1(i,e,t){Zt(i,e),i.strokeStyle=qe,i.lineWidth=2,i.strokeRect(24,24,e-48,e-48),i.fillStyle=qe,i.font=`600 24px ${Rt}`,i.fillText("NOTA FISCAL · DANFE",44,70),i.font=`400 18px ${kt}`,i.fillStyle=Jn;for(let n=0;n<6;n++)i.fillText(`${(t()*1e8).toFixed(0)}  ${(t()*1e4).toFixed(0)}`,44,120+n*30);i.strokeStyle=js;for(let n=0;n<8;n++)i.beginPath(),i.moveTo(44,320+n*22),i.lineTo(e-44,320+n*22),i.stroke();i.save(),i.translate(e*.64,e*.3),i.rotate(-.25),i.strokeStyle="#D0352F",i.lineWidth=5,i.strokeRect(-110,-34,220,68),i.fillStyle="#D0352F",i.font=`700 30px ${Rt}`,i.textAlign="center",i.fillText("PENDENTE",0,11),i.restore()}function h1(i,e,t){Zt(i,e,"#FFFFFF"),i.strokeStyle="#E3E8F3",i.lineWidth=1.5;for(let n=0;n<e;n+=28)i.beginPath(),i.moveTo(n,0),i.lineTo(n,e),i.stroke(),i.beginPath(),i.moveTo(0,n),i.lineTo(e,n),i.stroke();i.strokeStyle="#2A4BD0",i.lineWidth=4,i.beginPath(),i.moveTo(60,420);for(let n=0;n<8;n++)i.lineTo(60+n*56,420-t()*260-n*12);i.stroke(),i.fillStyle="#2A4BD0",i.font=`italic 400 36px ${Qn}`,i.fillText("vendas? (aprox.)",60,80)}const Z5=[Rs,o1,a1,Ps,l1,c1,h1,Rs,o1,Ps,a1,l1,c1,Rs,h1,Ps];function K5(i=2048){const e=document.createElement("canvas");e.width=e.height=i;const t=e.getContext("2d"),n=i/4;return Z5.forEach((s,r)=>{t.save(),t.translate(r%4*n,Math.floor(r/4)*n),t.beginPath(),t.rect(0,0,n,n),t.clip(),t.scale(n/512,n/512),s(t,512,Y5(r+3)),t.restore()}),e}function $5(i,e,t,n){const s=Math.max(t/e.width,n/e.height),r=e.width*s,o=e.height*s;i.drawImage(e,(t-r)/2,0,r,o)}function j5(i,e,t){i.fillStyle="#F7F8FC",i.fillRect(0,0,e,t);const n=[["Sistemas internos",(o,a,l)=>{for(let c=0;c<3;c++)o.fillStyle=c===0?nt:"#D9D2FB",_n(o,a-70,l-46+c*34,c===0?40:140,24,6),o.fill()}],["APIs e integrações",(o,a,l)=>{o.strokeStyle=nt,o.lineWidth=5,[[-60,-30],[60,-30],[0,40]].forEach(([c,h])=>{o.beginPath(),o.moveTo(a,l),o.lineTo(a+c,l+h),o.stroke()}),[[0,0],[-60,-30],[60,-30],[0,40]].forEach(([c,h],u)=>{o.fillStyle=u?"#fff":nt,o.beginPath(),o.arc(a+c,l+h,u?14:18,0,7),o.fill(),o.stroke()})}],["Painéis e relatórios",(o,a,l)=>{[.4,.65,.5,.9,.75].forEach((c,h)=>{o.fillStyle=h===3?nt:"#D9D2FB",o.fillRect(a-70+h*30,l+50-c*100,20,c*100)})}],["Automações",(o,a,l)=>{o.strokeStyle=nt,o.lineWidth=6,o.beginPath(),o.arc(a,l,44,.3,Math.PI*1.7),o.stroke(),o.fillStyle=nt,o.beginPath(),o.moveTo(a+46,l-38),o.lineTo(a+54,l+2),o.lineTo(a+18,l-14),o.fill()}],["Acesso e auditoria",(o,a,l)=>{o.strokeStyle=nt,o.lineWidth=6,_n(o,a-40,l-6,80,60,10),o.stroke(),o.beginPath(),o.arc(a,l-6,24,Math.PI,0),o.stroke(),o.fillStyle=nt,o.beginPath(),o.arc(a,l+22,8,0,7),o.fill()}],["Visão computacional",(o,a,l)=>{o.strokeStyle=nt,o.lineWidth=5;const c=22;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([h,u])=>{o.beginPath(),o.moveTo(a+h*56,l+u*(56-c)),o.lineTo(a+h*56,l+u*56),o.lineTo(a+h*(56-c),l+u*56),o.stroke()}),o.beginPath(),o.arc(a,l-8,20,0,7),o.stroke(),o.beginPath(),o.arc(a,l+46,34,Math.PI*1.15,Math.PI*1.85),o.stroke()}]],s=e/3,r=t/2;n.forEach(([o,a],l)=>{const c=l%3*s,h=Math.floor(l/3)*r;i.fillStyle="#FFFFFF",_n(i,c+18,h+18,s-36,r-36,18),i.fill(),i.strokeStyle="#E4E6EE",i.lineWidth=2,i.stroke(),a(i,c+s/2,h+r/2-22),i.fillStyle=qe,i.font=`400 34px ${Qn}`,i.textAlign="center",i.fillText(o,c+s/2,h+r-66),i.textAlign="left"})}function J5(i,e,t){i.fillStyle="#E6E8F0",i.fillRect(0,0,e,t);const n=e/4,s=["Escuto","Desenho","Construo","Acompanho"];for(let r=0;r<4;r++){const o=r*n+16,a=90,l=n-32,c=t-200;i.fillStyle="#FFFFFF",_n(i,o,a,l,c,16),i.fill(),i.strokeStyle="#E4E6EE",i.lineWidth=2,i.stroke();const h=o+l/2;r===0?["#FFF3B0","#DCD3FF","#CFF3FF"].forEach((u,f)=>{i.save(),i.translate(h-40+f*40,a+140+f*70),i.rotate((f-1)*.12),i.fillStyle=u,i.fillRect(-60,-40,120,80),i.fillStyle="#4A5061",i.fillRect(-44,-14,70,6),i.fillRect(-44,4,50,6),i.restore()}):r===1?(i.setLineDash([10,8]),i.strokeStyle="#4A5061",i.lineWidth=3,i.strokeRect(o+24,a+30,l-48,40),i.strokeRect(o+24,a+90,70,c-130),i.strokeRect(o+110,a+90,l-134,110),i.strokeRect(o+110,a+220,l-134,c-260),i.setLineDash([])):(i.fillStyle="#D5D9E4",i.fillRect(o+24,a+30,l-48,40),i.fillStyle="#CBBFFB",i.fillRect(o+24,a+90,70,c-130),i.fillStyle="#E3E6EE",i.fillRect(o+110,a+90,l-134,110),i.fillRect(o+110,a+220,l-134,c-260),(r===3?[.4,.55,.5,.72,.9]:[.4,.4,.4,.4,.4]).forEach((f,d)=>{i.fillStyle=r===3&&d===4?nt:"#A996F7",i.fillRect(o+130+d*30,a+190-f*80,18,f*80)}),r===3&&(i.fillStyle=q5,i.beginPath(),i.arc(o+l-44,a+50,10,0,7),i.fill())),i.fillStyle=nt,i.font=`400 22px ${kt}`,i.fillText(`0${r+1}`,o,60),i.fillStyle=qe,i.font=`400 40px ${Qn}`,i.fillText(s[r],o,t-50)}}function Q5(i,e,t){const n=i.createLinearGradient(0,0,e,t);n.addColorStop(0,"#FFFFFF"),n.addColorStop(1,"#EEEAFE"),i.fillStyle=n,i.fillRect(0,0,e,t),i.fillStyle=qe,i.font=`italic 300 300px ${Qn}`,i.textAlign="center",i.fillText("olá.",e/2,t/2+70),i.font=`400 28px ${kt}`,i.fillStyle=Jn,i.fillText("tudo no lugar. agora é a sua vez.",e/2,t-90),i.textAlign="left"}async function e8(i){const e=new Image;return e.src=i,await e.decode(),e}function Hi(i,e,t){const n=document.createElement("canvas");return n.width=i,n.height=e,t(n.getContext("2d")),n}const t8=(i,e=1280,t=720)=>Hi(e,t,n=>$5(n,i,e,t)),n8=(i=1600,e=900)=>Hi(i,e,t=>j5(t,i,e)),i8=(i=2400,e=800)=>Hi(i,e,t=>J5(t,i,e)),s8=(i=1280,e=800)=>Hi(i,e,t=>Q5(t,i,e)),bt=(i,e,t)=>{const n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},Ci=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,Bn=[{u:0,dir:new R(.82,-.32,-.42),color:new P0(1,.84,.68),k:5.2,sky:new P0(1,.93,.86)},{u:.45,dir:new R(.7,-.68,-.12),color:new P0(1,.97,.93),k:5.8,sky:new P0(.95,.97,1)},{u:1,dir:new R(.86,-.26,.38),color:new P0(1,.8,.62),k:4.2,sky:new P0(1,.9,.8)}];class r8{constructor(e,t,n){this.tier=t,this.scene=new b1,this.stations=[],this.progress=0,this.shown=0,this.pointer=new t0,this.smoothPtr=new t0,this.hasPointer=!1,this.clock=new N1,this.time=0,this.running=!1,this.intro=0,this.frames=[],this.win={x:-4,z0:-2.35,z1:1.35,y0:.72,y1:2.6},this.papers=[],this.screens=[],this.cards=[],this.deskTop=.74,this.deskZ=-2.15,this.diveTo=-1,this.diveK=0,this.diveGoal=0,this.tmp={p:new R,q:new ye,s:new R,p2:new R,q2:new ye,s2:new R,zero:new t0,v:new R,ray:new r5,plane:new wt(new R(0,1,0),0),lampAim:new R,lampQ:new ye},this.still=n.still,this.renderer=new x4({canvas:e,antialias:!1,powerPreference:"high-performance",stencil:!1}),this.renderer.outputColorSpace=je,this.renderer.toneMapping=7,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=t!=="low",this.renderer.shadowMap.type=1,this.camera=new Xe(38,1,.03,40)}get mobile(){return innerWidth<820}get stationCount(){return this.stations.length}async init(){const e=this.renderer,t=this.scene,n=this.tier==="high";M5.init(),t.background=new P0(15658995);const s=new Ds(e);t.environment=s.fromScene(R5(),.02).texture,t.environmentIntensity=.45,s.dispose();const r=L5(),o=(S0,Z0=!0,J0=!0)=>(S0.traverse(he=>{he.isMesh&&(he.castShadow=Z0,he.receiveShadow=J0)}),t.add(S0),S0),a=8,l=3.1,c=-3,h=4.5,u=h-c,f=wi(i1(1024,1024,6,7),e,{repeat:[a/1.3,u/1.3],bump:.5,color:15920099}),d=new J(new oe(a,u),f);d.rotation.x=-Math.PI/2,d.position.set(0,0,c+u/2),o(d,!1);const g=S5(512,3),x=(S0,Z0)=>wi(g,e,{repeat:[S0*2,Z0*2],bump:.1,roughness:.95,color:15987702}),p=(S0,Z0,J0,he,Se,Fe)=>{const we=new J(new oe(S0,Z0),x(S0/2,Z0/2));return we.position.set(J0,he,Se),we.rotation.y=Fe,o(we,!1)};p(a,l,0,l/2,c,0),p(u,l,a/2,l/2,c+u/2,-Math.PI/2),p(a,l,0,l/2,h,Math.PI);const m=new J(new oe(a,u),new me({color:16185080,roughness:1}));m.rotation.x=Math.PI/2,m.position.set(0,l,c+u/2),o(m,!1);const{z0:T,z1:v,y0:S,y1:P}=this.win,A=-a/2;p(T-c,l,A,l/2,(c+T)/2,Math.PI/2),p(h-v,l,A,l/2,(v+h)/2,Math.PI/2),p(v-T,S,A,S/2,(T+v)/2,Math.PI/2),p(v-T,l-P,A,(l+P)/2,(T+v)/2,Math.PI/2);const w=.22,D=new me({color:16053494,roughness:.9}),V=new J(se(w+.06,.03,v-T+.06,.006),r.white);V.position.set(A-w/2+.03,S-.015,(T+v)/2);const _=new J(new oe(w,v-T),D);_.rotation.set(Math.PI/2,0,Math.PI/2),_.position.set(A-w/2,P,(T+v)/2);const y=new J(new oe(w,P-S),D);y.position.set(A-w/2,(S+P)/2,T);const F=y.clone();F.rotation.y=Math.PI,F.position.z=v,o(V),o(_,!1),o(y,!1),o(F,!1);const I=(S0,Z0,J0,he,Se,Fe)=>{const we=new J(se(S0,Z0,J0,.004),r.white);we.position.set(he,Se,Fe),o(we,!0,!1)},z=A-w+.03;I(.05,P-S,.05,z,(S+P)/2,T+.025),I(.05,P-S,.05,z,(S+P)/2,v-.025),I(.05,P-S,.04,z,(S+P)/2,(T+v)/2),I(.05,.05,v-T,z,S+.025,(T+v)/2),I(.05,.05,v-T,z,P-.025,(T+v)/2),I(.05,.04,v-T,z,1.9,(T+v)/2);const K=We(w5(),e);this.sky=new mt({map:K,toneMapped:!1,color:new P0(1,1,1).multiplyScalar(1.6)});const B=new J(new oe(16,8),this.sky);B.position.set(A-4,1.8,(T+v)/2),B.rotation.y=Math.PI/2,B.userData.noAO=!0,t.add(B);const Q=14,H=new Us(se(.05,.004,v-T-.12,.0015,1),new me({color:16448250,roughness:.6}),Q),s0=new Y0;for(let S0=0;S0<Q;S0++)s0.compose(new R(A-.06,P-.07-S0*.062,(T+v)/2),new ye().setFromEuler(new Re(0,0,.5)),new R(1,1,1)),H.setMatrixAt(S0,s0);o(H,!0,!1);const u0=new J(se(.06,.04,v-T-.08,.008),r.white);u0.position.set(A-.06,P-.03,(T+v)/2),o(u0,!0,!1);const d0=new J(se(a,.09,.014,.003),r.white);d0.position.set(0,.045,c+.007);const B0=new J(se(.014,.09,u,.003),r.white);B0.position.set(a/2-.007,.045,c+u/2),o(d0,!1),o(B0,!1);const H0=new J(se(3,.03,.04,.008),r.steel);H0.position.set(.5,l-.03,-1.1),t.add(H0);for(let S0=0;S0<4;S0++){const Z0=new J(new Ue(.035,.035,.11,24),r.steel);Z0.position.set(-.6+S0*.75,l-.1,-1.1),Z0.rotation.x=.5,t.add(Z0)}this.hemi=new e5(16777215,14735048,.5),t.add(this.hemi);const X=new s5(16777215,3.4);X.castShadow=this.tier!=="low";const n0=n?4096:2048;X.shadow.mapSize.set(n0,n0),Object.assign(X.shadow.camera,{left:-5.5,right:5.5,top:5,bottom:-5,near:1,far:30}),X.shadow.bias=-25e-5,X.shadow.normalBias=.015,X.shadow.radius=n?4:2.5,X.target.position.set(0,0,-.5),t.add(X,X.target),this.sun=X,this.winLight=new Jr(16774890,2.2,v-T,P-S),this.winLight.position.set(A+.02,(S+P)/2,(T+v)/2),this.winLight.lookAt(0,(S+P)/2,(T+v)/2),t.add(this.winLight);const M0=new Jr(16771280,.9,4,4);M0.position.set(0,.05,-.5),M0.lookAt(0,3,-.5),t.add(M0);const r0=new Pe;r0.setAttribute("position",new ze(new Float32Array(8*3),3)),r0.setAttribute("aWin",new ze(new Float32Array([0,0,0,1,0,0,0,1,1,0,1,1,1,0,1,1]),2)),r0.setIndex([0,1,5,0,5,4,2,3,7,2,7,6,0,2,6,0,6,4,1,3,7,1,7,5]),this.beam=new J(r0,C5()),this.beam.frustumCulled=!1,this.beam.renderOrder=5,this.beam.userData.noAO=!0,t.add(this.beam);const C0=new J(gt(2.8,1.9,.012,.05,.004),wi(y5(512,5),e,{repeat:[3,2],bump:.8,roughness:1}));C0.position.set(.2,.006,this.deskZ+1.15),o(C0,!1);const b0=wi(i1(1024,512,3,21),e,{bump:.12,color:16446700,roughnessMap:null,roughness:.62}),D0=U5(r,b0);D0.group.position.z=this.deskZ,o(D0.group);const F0=this.deskTop=D0.top,q=this.deskZ,C=await Promise.all(["/belaways.webp","/pontofacial.webp","/gastos.webp"].map(e8)),a0=.6,o0=.3375;[[-.67,.3],[0,0],[.67,-.3]].forEach(([S0,Z0],J0)=>{const he=s1(We(t8(C[J0]),e),[26,15]),Se=I5(r,he,a0,o0);Se.group.position.set(S0,F0,q-.14+Math.abs(Z0)*.24),Se.group.rotation.y=Z0,o(Se.group),Se.screen.castShadow=!1,this.screens.push({mat:he,mesh:Se.screen,w:a0,h:o0})});const c0=F5(r);c0.position.set(-.02,F0,q+.2),o(c0);const A0=N5(r);A0.position.set(.3,F0,q+.23),A0.rotation.y=-.1,o(A0);const _0=H5(r);_0.position.set(-.92,F0,q+.16),_0.rotation.y=2.3,o(_0);const b=s1(We(s8(),e),[20,13]),M=W5(r,b);M.group.position.set(1,F0,q+.2),M.group.rotation.y=-.42,o(M.group),this.lap={lid:M.lid,screen:{mat:b,mesh:M.screen,w:.29,h:.185}},this.lamp=G5(r),this.lamp.group.position.set(-1.13,F0,q-.24),this.lamp.spot.castShadow=n,this.lamp.spot.shadow.mapSize.set(512,512),this.lamp.spot.shadow.bias=-8e-4,o(this.lamp.group);const O=We(K5(this.tier==="low"?1024:2048),e),Z=new me({map:O,roughness:.82,side:2});t.updateMatrixWorld(!0);const $=S0=>{const Z0=Math.sin(S0*127.1+311.7)*43758.5453;return Z0-Math.floor(Z0)},Y=16;for(let S0=0;S0<Y;S0++){const Z0=X5(S0%4/4,1-(Math.floor(S0/4)+1)/4),J0=new J(Z0,Z);J0.castShadow=J0.receiveShadow=!0,J0.matrixAutoUpdate=!1;const he=S0>=13,Se=new Y0().compose(he?new R(-.6+$(S0)*1.3,.016+S0*5e-4,q+.75+$(S0+9)*.6):new R(-.98+$(S0)*1.9,F0+.003+S0*.0011,q+.02+$(S0+5)*.33),new ye().setFromEuler(new Re(0,$(S0+1)*Math.PI*2,0)),new R(1,1,1)),Fe=S0/(Y-1),we=new Y0().compose(new R(-.92+Fe*1.84,F0+.36+Math.sin(Fe*Math.PI)*.1,q+.32-Math.sin(Fe*Math.PI)*.12),new ye().setFromEuler(new Re(Math.PI/2-.12,(.5-Fe)*.5,(Fe-.5)*.25,"YXZ")),new R(.9,.9,.9)),vt=this.screens[S0%3].mesh,lt=vt.getWorldPosition(new R),Wi=vt.getWorldQuaternion(new ye).multiply(new ye().setFromEuler(new Re(Math.PI/2,0,0))),Xi=new Y0().compose(lt,Wi,new R(.02,.02,.02));J0.matrix.copy(Se),t.add(J0),this.papers.push({mesh:J0,mess:Se,fan:we,into:Xi,delay:$(S0+11)})}const T0=O5(r,e);T0.position.set(.5,0,q+1),T0.rotation.y=-.55,o(T0);const h0=z5(r,e);h0.position.set(-3.25,0,c+.55),o(h0);const v0=V5(r,b0,e);v0.position.set(2.55,0,c+.14),o(v0);const k0=k5(b0,We(A5(),e),.62,.82);k0.position.set(-2.05,1.55,c+.016),o(k0);const e0=2,m0=1.125,N0=We(n8(),e);this.board=b5(N0,3,2,new P0(16251132).convertSRGBToLinear());const I0=new ae,E0=new J(se(e0+.04,m0+.04,.012,.01),new jn({color:16777215,roughness:.15,transmission:0,clearcoat:1,clearcoatRoughness:.05})),W0=new J(new oe(e0,m0),this.board);W0.position.z=.0065,W0.receiveShadow=!0,I0.add(E0,W0);for(const[S0,Z0]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const J0=new J(new Ue(.012,.012,.03,20),r.chrome);J0.rotation.x=Math.PI/2,J0.position.set(S0*(e0-.06)/2,Z0*(m0-.06)/2,.01),I0.add(J0)}const O0=new ae,j0=new J(new Ue(.011,.011,.12,20),r.purple),L=new J(new Ue(.0115,.0115,.035,20),r.steel);L.position.y=.075;const p0=new J(new Ys(.007,.018,16),r.steel);p0.position.y=-.069,p0.rotation.x=Math.PI,O0.add(j0,L,p0),O0.rotation.x=-.9,this.marker=O0,I0.add(O0),I0.position.set(a/2-.035,1.5,-.25),I0.rotation.y=-Math.PI/2,o(I0);const W=We(i8(2400,800),e),j=.46,x0=.613;for(let S0=0;S0<4;S0++){const Z0=new oe(j,x0),J0=Z0.attributes.uv;for(let lt=0;lt<J0.count;lt++)J0.setX(lt,(S0+J0.getX(lt))/4);const he=new ae,Se=new J(se(j,x0,.003,.001,1),new me({color:15922167,roughness:.9})),Fe=new J(Z0,new me({map:W,roughness:.85}));Fe.position.z=.0016;const we=new J(new Vt(.012,16,12),S0%2?r.purple:r.steel);we.position.set(0,x0/2-.03,.01),he.add(Se,Fe,we);const vt=new Y0().compose(new R(-.84+S0*.56,1.98,c+.008),new ye().setFromEuler(new Re(0,0,(S0%2?1:-1)*.012)),new R(1,1,1));he.matrixAutoUpdate=!1,he.matrix.copy(vt),o(he),this.cards.push({mesh:he,rest:vt,pin:we})}const g0=this.mobile,G0=(S0,Z0,J0)=>new R(S0,Z0,J0),de=S0=>{const Z0=this.screens[S0].mesh,J0=Z0.getWorldPosition(new R),he=new R(0,0,1).applyQuaternion(Z0.getWorldQuaternion(new ye));return{look:J0,cam:J0.clone().addScaledVector(he,g0?1.6:1.25).add(G0(0,.05,0))}},be=g0?[0,.18]:[.17,0],K0=g0?[0,.18]:[-.17,0],ce=(S0,Z0,J0)=>({cam:S0,look:Z0,shift:J0}),[Ye,Cn,Rn]=[0,1,2].map(de);this.stations=[ce(G0(2.35,1.55,2.7),G0(-.25,.95,-2.1),g0?[0,.14]:[.28,0]),ce(G0(-.05,1.42,-.15),G0(0,F0+.3,q),g0?[0,.16]:[.16,0]),ce(Ye.cam,Ye.look,K0),ce(Cn.cam,Cn.look,be),ce(Rn.cam,Rn.look,K0),ce(G0(1.05,1.5,-.25),G0(a/2,1.5,-.25),K0),ce(G0(0,1.86,g0?.2:-.75),G0(0,1.96,c),g0?[0,.2]:[0,.06]),ce(G0(1.62,1.08,-1.38),G0(1,F0+.1,q+.16),g0?be:[.24,0])],this.camCurve=new gn(this.stations.map(S0=>S0.cam),!1,"centripetal"),this.lookCurve=new gn(this.stations.map(S0=>S0.look),!1,"centripetal"),this.shiftCurve=new gn(this.stations.map(S0=>G0(S0.shift[0],S0.shift[1],0)),!1,"catmullrom",0),this.makePost(),this.setSize(),e.compile(t,this.camera)}makePost(){if(this.tier==="low")return;const e=this.renderer,t=new Be(1,1,{type:1016,samples:4}),n=new u5(e,t);if(n.addPass(new f5(this.scene,this.camera)),this.tier==="high"){const s=new st(this.scene,this.camera,1,1);s.updateGtaoMaterial({radius:.35,distanceExponent:1.4,thickness:1.2,scale:1.1,samples:16,distanceFallOff:1,screenSpaceRadius:!1}),s.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,rings:2,samples:16}),s.blendIntensity=.9;const r=s,o=r.overrideVisibility.bind(s);r.overrideVisibility=()=>{o(),this.scene.traverse(a=>{a.userData.noAO&&(a.visible=!1)})},n.addPass(s),this.ao=s}this.bloom=new Sn(new t0(1,1),.22,.5,1.35),n.addPass(this.bloom),n.addPass(new x5),this.composer=n}setSize(){const e=innerWidth,t=innerHeight,n=this.tier==="high"?1.75:this.tier==="mid"?1.35:1,s=Math.min(devicePixelRatio||1,n);this.renderer.setPixelRatio(s),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.fov=e<t?60:38,this.camera.updateProjectionMatrix(),this.composer&&(this.composer.setPixelRatio(s),this.composer.setSize(e,t))}setProgress(e){this.progress=$t.clamp(e,0,this.stations.length-1)}setPointer(e,t){this.pointer.set(e,t),this.hasPointer=!0}clearPointer(){this.hasPointer=!1}setIntro(e){this.intro=e}reveal(e=1600){const t=performance.now(),n=()=>{const s=Math.min(1,(performance.now()-t)/e);this.intro=Math.pow(1-s,3),s<1&&requestAnimationFrame(n)};n()}dive(e){return new Promise(t=>{e===null?this.diveGoal=0:(this.diveTo=e,this.diveGoal=1),this.diveDone=t,this.still&&(this.diveK=this.diveGoal,t())})}start(){this.running||(this.running=!0,this.clock.start(),this.renderer.setAnimationLoop(()=>this.frame()))}stop(){this.running=!1,this.renderer.setAnimationLoop(null)}blendPose(e,t,n,s,r){const{p:o,q:a,s:l,p2:c,q2:h,s2:u}=this.tmp;return e.decompose(o,a,l),t.decompose(c,h,u),o.lerp(c,n),o.y+=Math.sin(n*Math.PI)*s,a.slerp(h,n),l.lerp(u,n),r.compose(o,a,l)}frame(){const e=Math.min(this.clock.getDelta(),.05);this.still||(this.time+=e),this.watch(e);const t=this.still?1:1-Math.exp(-e*4);this.shown+=(this.progress-this.shown)*t;const n=this.shown,s=n/(this.stations.length-1),r=this.camera;this.camCurve.getPoint(s,r.position);const o=this.lookCurve.getPoint(s);if(this.intro>0){const p=r.position.clone().sub(o).normalize();r.position.addScaledVector(p,this.intro*1.5),r.position.y+=this.intro*.3}const a=this.still?1:1-Math.exp(-e*3);this.smoothPtr.lerp(this.hasPointer?this.pointer:this.tmp.zero,a);const l=this.tmp.v.subVectors(o,r.position).cross(r.up).normalize(),c=r.position.distanceTo(o);r.position.addScaledVector(l,this.smoothPtr.x*.03*c),r.position.y+=this.smoothPtr.y*.018*c;const h=this.shiftCurve.getPoint(s);if(this.still||(this.diveK+=(this.diveGoal-this.diveK)*(1-Math.exp(-e*3.2))),Math.abs(this.diveGoal-this.diveK)<.004&&(this.diveK=this.diveGoal,this.diveDone)){const p=this.diveDone;this.diveDone=void 0,p()}if(this.diveK>5e-4&&this.diveTo>=0){const p=this.screens[this.diveTo],m=p.mesh.getWorldPosition(new R),T=new R(0,0,1).applyQuaternion(p.mesh.getWorldQuaternion(new ye)),v=$t.degToRad(r.fov)/2,S=Math.atan(Math.tan(v)*r.aspect),P=Math.min(p.h/2/Math.tan(v),p.w/2/Math.tan(S))*.97,A=Ci(this.diveK);r.position.lerp(m.clone().addScaledVector(T,P),A),o.lerp(m,A),h.multiplyScalar(1-A)}r.lookAt(o);const u=innerWidth,f=innerHeight;r.setViewOffset(u,f,-h.x*u,h.y*f,u,f),this.dayAt(s);const d=new Y0;for(const p of this.papers){const m=p.delay,T=bt(.12+m*.3,.75+m*.25,n),v=bt(1.12+m*.25,1.55+m*.25,n);v<=0?this.blendPose(p.mess,p.fan,T,.25,d):this.blendPose(p.fan,p.into,Ci(v),.12,d),T>.99&&v<.01&&!this.still&&(d.elements[13]+=Math.sin(this.time*1.4+m*9)*.006),p.mesh.matrix.copy(d),p.mesh.matrixWorldNeedsUpdate=!0,p.mesh.visible=v<.995}this.screens.forEach((p,m)=>{p.mat.uniforms.uOn.value=bt(1.45+m*.12,1.95+m*.12,n),p.mat.uniforms.uTime.value=this.time});const g=bt(4.15,4.95,n);this.board.uniforms.uReveal.value=g;{const m=Math.min(5,Math.floor(g*6)),T=g*6-m,v=m%3/3,S=Math.floor(m/3)/2,P=2,A=1.125,w=(v+(g>=1?1/3:T/3))*P-P/2,D=A/2-(S+.25+Math.sin(T*30)*.02+(g>=1?.6:0))*A,V=g>0&&g<1,_=.75,y=-A/2-.05,F=V?new R(w,D,.08):new R(_,y,.03);this.still?this.marker.position.copy(F):this.marker.position.lerp(F,1-Math.exp(-e*14)),this.marker.rotation.set(V?-.75:-Math.PI/2,0,V?.3:Math.PI/2)}this.cards.forEach((p,m)=>{const T=bt(5.2+m*.13,5.62+m*.13,n),{p:v,q:S,s:P}=this.tmp;p.rest.decompose(v,S,P);const A=1-Ci(T);v.z+=A*.5,v.y+=A*.25,S.multiply(new ye().setFromEuler(new Re(-A*.6,A*(m%2?.5:-.5),A*(m%2?.4:-.4)))),P.setScalar(Math.max(1e-4,T<.01?1e-4:1)),p.mesh.matrix.compose(v,S,P),p.mesh.matrixWorldNeedsUpdate=!0,p.pin.visible=T>.95});const x=bt(6.2,6.85,n);this.lap.lid.rotation.x=$t.lerp(Math.PI/2-.02,-.32,Ci(x)),this.lap.screen.mat.uniforms.uOn.value=bt(6.65,7,n),this.lap.screen.mat.uniforms.uTime.value=this.time,this.aimLamp(e),this.beam.material.uniforms.uTime.value=this.time,this.composer?this.composer.render(e):this.renderer.render(this.scene,r)}dayAt(e){let t=Bn[0],n=Bn[1];e>Bn[1].u&&(t=Bn[1],n=Bn[2]);const s=bt(t.u,n.u,e),r=t.dir.clone().lerp(n.dir,s).normalize(),o=t.color.clone().lerp(n.color,s);this.sun.color.copy(o),this.sun.intensity=$t.lerp(t.k,n.k,s),this.sun.position.copy(this.sun.target.position).addScaledVector(r,-14),this.sky.color.copy(t.sky.clone().lerp(n.sky,s)).multiplyScalar(1.6),this.winLight.color.copy(o).lerp(new P0(16777215),.5);const{x:a,z0:l,z1:c,y0:h,y1:u}=this.win,f=this.beam.geometry.attributes.position,d=6.5;[[l,h],[l,u],[c,h],[c,u]].forEach(([p,m],T)=>{f.setXYZ(T,a,m,p),f.setXYZ(T+4,a+r.x*d,m+r.y*d,p+r.z*d)}),f.needsUpdate=!0;const x=this.beam.material;x.uniforms.uColor.value.copy(o),x.uniforms.uStrength.value=.022+(1-Math.abs(s-.5)*2)*.006}aimLamp(e){const t=this.lamp,n=this.tmp.lampAim,s=new R(.1,this.deskTop,this.deskZ+.15);if(this.hasPointer&&!this.mobile&&this.diveK<.01){this.tmp.ray.setFromCamera(this.pointer,this.camera),this.tmp.plane.constant=-this.deskTop;const u=new R;this.tmp.ray.ray.intersectPlane(this.tmp.plane,u)&&s.set($t.clamp(u.x,-1.25,1.25),this.deskTop,$t.clamp(u.z,this.deskZ-.3,this.deskZ+.4))}n.lengthSq()===0||this.still?n.copy(s):n.lerp(s,1-Math.exp(-e*5));const r=t.group.getWorldPosition(new R);t.yaw.rotation.y=Math.atan2(-(n.z-r.z),n.x-r.x),t.yaw.updateMatrixWorld(!0);const o=t.pivot.parent,a=o.getWorldPosition(new R),l=n.clone().sub(a).normalize(),c=o.getWorldQuaternion(new ye).invert(),h=l.applyQuaternion(c);this.tmp.lampQ.setFromUnitVectors(new R(0,-1,0),h),this.still?t.pivot.quaternion.copy(this.tmp.lampQ):t.pivot.quaternion.slerp(this.tmp.lampQ,1-Math.exp(-e*8))}watch(e){if(this.tier==="low"||this.still||(this.frames.push(e),this.frames.length<90))return;const t=this.frames.reduce((n,s)=>n+s,0)/this.frames.length;this.frames.length=0,t>1/42&&(this.tier=this.tier==="high"?"mid":"low",this.ao&&(this.ao.enabled=!1),this.lamp.spot.castShadow=!1,this.tier==="low"&&(this.bloom&&(this.bloom.enabled=!1),this.renderer.shadowMap.enabled=!1,this.sun.castShadow=!1,this.scene.traverse(n=>{const s=n.material;s&&!Array.isArray(s)&&(s.needsUpdate=!0)})),this.setSize(),this.onTier?.(this.tier))}dispose(){this.stop(),this.composer?.dispose(),this.renderer.dispose()}}export{r8 as World};
