import{C as h,v as m,aa as x,ab as v,h as p,m as y,A as C,z as S,ac as k,ad as N}from"./C6xSg7Om.js";const z=Object.freeze({left:0,top:0,width:16,height:16}),I=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),w=Object.freeze({...z,...I});Object.freeze({...w,body:"",hidden:!1});function $(e,t){let s=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const n in t)s+=" "+n+'="'+t[n]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+s+">"+e+"</svg>"}const q=/(-?[0-9.]*[0-9]+[0-9.]*)/g,R=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function A(e,t,s){if(t===1)return e;s=s||100;const n=e.split(q);if(n===null||!n.length)return e;const c=[];let r=n.shift(),l=R.test(r);for(;;){if(l){const o=parseFloat(r);isNaN(o)?c.push(r):c.push(Math.ceil(o*t*s)/s)}else c.push(r);if(r=n.shift(),r===void 0)return c.join("");l=!l}}function P(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function T(e){return"data:image/svg+xml,"+P(e)}function j(e){return'url("'+T(e)+'")'}function F(e){if(e.width!==e.height){const t=Math.max(e.width,e.height);return{...e,width:t,height:t,left:e.left-(t-e.width)/2,top:e.top-(t-e.height)/2}}return e}function L(e){const t={display:"inline-block",width:"1em",height:"1em"},s=e.varName;switch(e.pseudoSelector&&(t.content="''"),e.mode){case"background":s&&(t["background-image"]="var(--"+s+")"),t["background-repeat"]="no-repeat",t["background-size"]="100% 100%";break;case"mask":t["background-color"]="currentColor",s&&(t["mask-image"]=t["-webkit-mask-image"]="var(--"+s+")"),t["mask-repeat"]=t["-webkit-mask-repeat"]="no-repeat",t["mask-size"]=t["-webkit-mask-size"]="100% 100%";break}return t}function O(e,t){const s={},n=t.varName;e.width!==e.height&&(t.forceSquare?e=F(e):s.width=A("1em",e.width/e.height));const c=$(e.body.replace(/currentColor/g,t.color||"black"),{viewBox:`${e.left} ${e.top} ${e.width} ${e.height}`,width:e.width.toString(),height:e.height.toString()}),r=j(c);if(n)s["--"+n]=r;else switch(t.mode){case"background":s["background-image"]=r;break;case"mask":s["mask-image"]=s["-webkit-mask-image"]=r;break}return s}const g={selectorStart:{compressed:"{",compact:" {",expanded:" {"},selectorEnd:{compressed:"}",compact:`; }
`,expanded:`;
}
`},rule:{compressed:"{key}:",compact:" {key}: ",expanded:`
  {key}: `}};function E(e,t="expanded"){const s=[];for(let n=0;n<e.length;n++){const{selector:c,rules:r}=e[n];let o=(c instanceof Array?c.join(t==="compressed"?",":", "):c)+g.selectorStart[t],a=!0;for(const u in r)a||(o+=";"),o+=g.rule[t].replace("{key}",u)+r[u],a=!1;o+=g.selectorEnd[t],s.push(o)}return s.join(t==="compressed"?"":`
`)}function M(e,t={}){const s=t.customise?t.customise(e.body):e.body,n=t.mode||(t.color||!s.includes("currentColor")?"background":"mask");let c=t.varName;c===void 0&&n==="mask"&&(c="svg");const r={...t,mode:n,varName:c};n==="background"&&delete r.varName;const l={...t.rules,...L(r),...O({...w,...e,body:s},r)},o=t.iconSelector||".icon";return E([{selector:o,rules:l}],r.format)}async function W(e){return e?(await new Promise(t=>x([e],()=>t(!0))).catch(()=>null),v(e)):null}function b(e){const t=h().icon,s=(t.collections||[]).sort((n,c)=>c.length-n.length);return m(()=>{var l;const n=e(),c=n.startsWith(t.cssSelectorPrefix)?n.slice(t.cssSelectorPrefix.length):n,r=((l=t.aliases)==null?void 0:l[c])||c;if(!r.includes(":")){const o=s.find(a=>r.startsWith(a+"-"));return o?o+":"+r.slice(o.length+1):r}return r})}let d;function _(e){return e.replace(/([^\w-])/g,"\\$1")}function B(){if(d)return d;d=new Set;const e=s=>{if(s=s.replace(/^:where\((.*)\)$/,"$1").trim(),s.startsWith("."))return s},t=s=>{if(s!=null&&s.length)for(const n of s){n!=null&&n.cssRules&&t(n.cssRules);const c=n==null?void 0:n.selectorText;if(typeof c=="string"){const r=e(c);r&&d.add(r)}}};for(const s of document.styleSheets)try{const n=s.cssRules||s.rules;t(n)}catch{}return d}const D=p({name:"NuxtIconCss",props:{name:{type:String,required:!0},customize:{type:Function,required:!1}},async setup(e){const t=y(),s=h().icon,n=m(()=>e.name?s.cssSelectorPrefix+e.name:"");function c(o){var i,f;if(!o)return;const a=v(o);if(a)return a;const u=(f=(i=t.payload)==null?void 0:i.data)==null?void 0:f[o];if(u)return k(o,u),u}const r=m(()=>"."+_(n.value));function l(o,a=!0){let u=r.value;s.cssWherePseudo&&(u=`:where(${u})`);const i=M(o,{iconSelector:u,format:"compressed",customise:e.customize});return s.cssLayer&&a?`@layer ${s.cssLayer} { ${i} }`:i}{const o=B();async function a(u){if(o.has(r.value))return;const i=document.createElement("style");i.textContent=l(u);const f=document.head.querySelector('style, link[rel="stylesheet"]');f?document.head.insertBefore(i,f):document.head.appendChild(i),o.add(r.value)}C(()=>e.name,()=>{if(o.has(r.value))return;const u=c(e.name);u?a(u):W(e.name).then(i=>{i&&a(i)})},{immediate:!0})}return()=>S("span",{class:["iconify",n.value,s.class]})}}),H=p({name:"NuxtIconSvg",props:{name:{type:String,required:!0},customize:{type:Function,required:!1}},async setup(e,{slots:t}){const s=y(),n=h().icon,c=b(()=>e.name),r="i-"+c.value;if(c.value){const l=s.payload.data[r];l&&k(c.value,l)}return()=>S(N,{icon:c.value,ssr:!0,class:n.class,customise:e.customize},t)}}),G=p({name:"NuxtIcon",props:{name:{type:String,required:!0},mode:{type:String,required:!1,default:null},size:{type:[Number,String],required:!1,default:null},customize:{type:Function,required:!1}},async setup(e,{slots:t}){const s=y(),n=h().icon,c=b(()=>e.name),r=m(()=>{var a;return((a=s.vueApp)==null?void 0:a.component(c.value))||((e.mode||n.mode)==="svg"?H:D)}),l=m(()=>{const a=e.size||n.size;return a?{fontSize:Number.isNaN(+a)?a:a+"px"}:null}),o=e.customize||n.customize;return()=>S(r.value,{...n.attrs,name:c.value,class:n.class,style:l.value,customize:o},t)}});export{G as default};
