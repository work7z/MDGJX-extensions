(window.saladictEntry=window.saladictEntry||[]).push([[47],{116:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(0),o=n(30);function i(e,t){var n=Object(o.e)(o.a),i=Object(o.e)((function(){return e(n.current)}));return[Object(r.useRef)((function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];n.current.next(t?t(e):e[0])})).current,i.current]}},182:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(30),o=n(0);function i(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=Object(o.useRef)(e);n.current=e;var i=Object(r.d)(),a=Object(o.useRef)(),c=Object(o.useRef)();if(Object(o.useEffect)((function(){c.current=null;var e=n.current[0],t=e.subscribe({next:function(t){if(e===n.current[0])return n.current[1]?n.current[1](t):void 0},error:function(t){if(e===n.current[0]){if(n.current[2])return c.current=null,n.current[2](t);c.current=t,i()}},complete:function(){if(e===n.current[0])return n.current[3]?n.current[3]():void 0}});return a.current=t,function(){t.unsubscribe()}}),[e[0]]),c.current)throw c.current;return a}},30:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return u})),n.d(t,"e",(function(){return s})),n.d(t,"d",(function(){return l}));var r=n(0),o=n(91),i=n(161);function a(e){return e}function c(e){return Object(i.a)(0)(e)}function u(){return new o.a}function s(e){var t=Object(r.useRef)(!0),n=Object(r.useRef)(null);return t.current&&(t.current=!1,n.current=e()),n}function l(){var e=Object(r.useState)(0)[1];return Object(r.useRef)((function(){return e(f)})).current}function f(e){return(e+1)%1e6}"undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?r.useLayoutEffect:r.useEffect},5:function(e,t,n){"use strict";n.d(t,"h",(function(){return i})),n.d(t,"g",(function(){return a})),n.d(t,"b",(function(){return c})),n.d(t,"f",(function(){return u})),n.d(t,"d",(function(){return f})),n.d(t,"e",(function(){return d})),n.d(t,"i",(function(){return p})),n.d(t,"j",(function(){return m})),n.d(t,"a",(function(){return h})),n.d(t,"c",(function(){return y}));var r=n(507),o=n.n(r);n(0),n(116),n(182),n(10),n(371),n(634);function i(){return Promise.reject(new Error("NO_RESULT"))}function a(){return Promise.reject(new Error("NETWORK_ERROR"))}async function c(e){return null==e||/zh-TW|zh-HK/i.test(e)?(await n.e(109).then(n.bind(null,1321))).chsToChz:null}function u(e,...t){if(!e)return"";let n="",r=null;for(let e=t.length-1;e>=0;e--)"string"==typeof t[e]?n=t[e]:"function"==typeof t[e]&&(r=t[e]);const o=n?e.querySelector(n):e;if(!o)return"";const i=o.textContent||"";return r?r(i):i}const s={FORBID_TAGS:["style"],FORBID_ATTR:["style"]};function l(e,{mode:t="innerHTML",selector:n,transform:r,host:i,config:a=s}={}){const c=n?e.querySelector(n):e;if(!c)return"";if(i){const e=e=>{e.setAttribute("href",y(i,e,"href")),e.setAttribute("src",y(i,e,"src"))};"A"!==c.tagName&&"IMG"!==c.tagName||e(c),c.querySelectorAll("a").forEach(e),c.querySelectorAll("img").forEach(e)}const u=o.a.sanitize(c,{...a,RETURN_DOM_FRAGMENT:!0}),l=u.firstChild?u.firstChild[t]:"";return r?r(l):l}function f(e,t,n={}){return l(t,"string"==typeof n?{selector:n,host:e,mode:"innerHTML"}:{...n,host:e,mode:"innerHTML"})}function d(e,t,n={}){return l(t,"string"==typeof n?{selector:n,host:e,mode:"outerHTML"}:{...n,host:e,mode:"outerHTML"})}function p(e,t){const n=e.querySelector(t);n&&n.remove()}function m(e,t){e.querySelectorAll(t).forEach(e=>e.remove())}function h(e){e.setAttribute("target","_blank"),e.setAttribute("rel","nofollow noopener noreferrer")}function y(e,t,n){e.endsWith("/")&&(e=e.slice(0,-1));const r=e.startsWith("https")?"https:":"http:",o=t.getAttribute(n);return o?/^[a-zA-Z0-9]+:/.test(o)?o:o.startsWith("//")?r+o:/^.?\/+/.test(o)?e+"/"+o.replace(/^.?\/+/,""):e+"/"+o:""}},507:function(e,t,n){e.exports=function(){"use strict";var e=Object.freeze||function(e){return e},t=e(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),n=e(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","audio","canvas","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","video","view","vkern"]),r=e(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),o=e(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),i=e(["#text"]),a=Object.freeze||function(e){return e},c=a(["accept","action","align","alt","autocomplete","background","bgcolor","border","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","coords","crossorigin","datetime","default","dir","disabled","download","enctype","face","for","headers","height","hidden","high","href","hreflang","id","integrity","ismap","label","lang","list","loop","low","max","maxlength","media","method","min","minlength","multiple","name","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","type","usemap","valign","value","width","xmlns"]),u=a(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","tabindex","targetx","targety","transform","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),s=a(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),l=a(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),f=Object.hasOwnProperty,d=Object.setPrototypeOf,p=("undefined"!=typeof Reflect&&Reflect).apply;function m(e,t){d&&d(e,null);for(var n=t.length;n--;){var r=t[n];if("string"==typeof r){var o=r.toLowerCase();o!==r&&(Object.isFrozen(t)||(t[n]=o),r=o)}e[r]=!0}return e}function h(e){var t={},n=void 0;for(n in e)p(f,e,[n])&&(t[n]=e[n]);return t}p||(p=function(e,t,n){return e.apply(t,n)});var y=Object.seal||function(e){return e},g=y(/\{\{[\s\S]*|[\s\S]*\}\}/gm),b=y(/<%[\s\S]*|[\s\S]*%>/gm),v=y(/^data-[\-\w.\u00B7-\uFFFF]/),T=y(/^aria-[\-\w]+$/),w=y(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),A=y(/^(?:\w+script|data):/i),x=y(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g),_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function O(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var E=("undefined"!=typeof Reflect&&Reflect).apply,S=Array.prototype.slice,R=Object.freeze,L=function(){return"undefined"==typeof window?null:window};E||(E=function(e,t,n){return e.apply(t,n)});var M=function(e,t){if("object"!==(void 0===e?"undefined":_(e))||"function"!=typeof e.createPolicy)return null;var n=null;t.currentScript&&t.currentScript.hasAttribute("data-tt-policy-suffix")&&(n=t.currentScript.getAttribute("data-tt-policy-suffix"));var r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+r+" could not be created."),null}};return function e(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L(),f=function(t){return e(t)};if(f.version="2.0.7",f.removed=[],!a||!a.document||9!==a.document.nodeType)return f.isSupported=!1,f;var d=a.document,p=!1,y=!1,N=a.document,k=a.DocumentFragment,D=a.HTMLTemplateElement,C=a.Node,j=a.NodeFilter,H=a.NamedNodeMap,z=void 0===H?a.NamedNodeMap||a.MozNamedAttrMap:H,F=a.Text,I=a.Comment,U=a.DOMParser,P=a.TrustedTypes;if("function"==typeof D){var q=N.createElement("template");q.content&&q.content.ownerDocument&&(N=q.content.ownerDocument)}var W=M(P,d),B=W?W.createHTML(""):"",G=N,K=G.implementation,V=G.createNodeIterator,Y=G.getElementsByTagName,$=G.createDocumentFragment,X=d.importNode,Z={};f.isSupported=K&&void 0!==K.createHTMLDocument&&9!==N.documentMode;var J=g,Q=b,ee=v,te=T,ne=A,re=x,oe=w,ie=null,ae=m({},[].concat(O(t),O(n),O(r),O(o),O(i))),ce=null,ue=m({},[].concat(O(c),O(u),O(s),O(l))),se=null,le=null,fe=!0,de=!0,pe=!1,me=!1,he=!1,ye=!1,ge=!1,be=!1,ve=!1,Te=!1,we=!1,Ae=!1,xe=!0,_e=!0,Oe=!1,Ee={},Se=m({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","plaintext","script","style","svg","template","thead","title","video","xmp"]),Re=m({},["audio","video","img","source","image"]),Le=null,Me=m({},["alt","class","for","id","label","name","pattern","placeholder","summary","title","value","style","xmlns"]),Ne=null,ke=N.createElement("form"),De=function(e){Ne&&Ne===e||(e&&"object"===(void 0===e?"undefined":_(e))||(e={}),ie="ALLOWED_TAGS"in e?m({},e.ALLOWED_TAGS):ae,ce="ALLOWED_ATTR"in e?m({},e.ALLOWED_ATTR):ue,Le="ADD_URI_SAFE_ATTR"in e?m(h(Me),e.ADD_URI_SAFE_ATTR):Me,se="FORBID_TAGS"in e?m({},e.FORBID_TAGS):{},le="FORBID_ATTR"in e?m({},e.FORBID_ATTR):{},Ee="USE_PROFILES"in e&&e.USE_PROFILES,fe=!1!==e.ALLOW_ARIA_ATTR,de=!1!==e.ALLOW_DATA_ATTR,pe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,me=e.SAFE_FOR_JQUERY||!1,he=e.SAFE_FOR_TEMPLATES||!1,ye=e.WHOLE_DOCUMENT||!1,ve=e.RETURN_DOM||!1,Te=e.RETURN_DOM_FRAGMENT||!1,we=e.RETURN_DOM_IMPORT||!1,Ae=e.RETURN_TRUSTED_TYPE||!1,be=e.FORCE_BODY||!1,xe=!1!==e.SANITIZE_DOM,_e=!1!==e.KEEP_CONTENT,Oe=e.IN_PLACE||!1,oe=e.ALLOWED_URI_REGEXP||oe,he&&(de=!1),Te&&(ve=!0),Ee&&(ie=m({},[].concat(O(i))),ce=[],!0===Ee.html&&(m(ie,t),m(ce,c)),!0===Ee.svg&&(m(ie,n),m(ce,u),m(ce,l)),!0===Ee.svgFilters&&(m(ie,r),m(ce,u),m(ce,l)),!0===Ee.mathMl&&(m(ie,o),m(ce,s),m(ce,l))),e.ADD_TAGS&&(ie===ae&&(ie=h(ie)),m(ie,e.ADD_TAGS)),e.ADD_ATTR&&(ce===ue&&(ce=h(ce)),m(ce,e.ADD_ATTR)),e.ADD_URI_SAFE_ATTR&&m(Le,e.ADD_URI_SAFE_ATTR),_e&&(ie["#text"]=!0),ye&&m(ie,["html","head","body"]),ie.table&&(m(ie,["tbody"]),delete se.tbody),R&&R(e),Ne=e)},Ce=function(e){f.removed.push({element:e});try{e.parentNode.removeChild(e)}catch(t){e.outerHTML=B}},je=function(e,t){try{f.removed.push({attribute:t.getAttributeNode(e),from:t})}catch(e){f.removed.push({attribute:null,from:t})}t.removeAttribute(e)},He=function(e){var t=void 0,n=void 0;if(be)e="<remove></remove>"+e;else{var r=e.match(/^[\s]+/);(n=r&&r[0])&&(e=e.slice(n.length))}if(p)try{t=(new U).parseFromString(e,"text/html")}catch(e){}if(y&&m(se,["title"]),!t||!t.documentElement){var o=(t=K.createHTMLDocument("")).body;o.parentNode.removeChild(o.parentNode.firstElementChild),o.outerHTML=W?W.createHTML(e):e}return e&&n&&t.body.insertBefore(N.createTextNode(n),t.body.childNodes[0]||null),Y.call(t,ye?"html":"body")[0]};f.isSupported&&(function(){try{He('<svg><p><textarea><img src="</textarea><img src=x abc=1//">').querySelector("svg img")&&(p=!0)}catch(e){}}(),function(){try{var e=He("<x/><title>&lt;/title&gt;&lt;img&gt;");/<\/title/.test(e.querySelector("title").innerHTML)&&(y=!0)}catch(e){}}());var ze=function(e){return V.call(e.ownerDocument||e,e,j.SHOW_ELEMENT|j.SHOW_COMMENT|j.SHOW_TEXT,(function(){return j.FILTER_ACCEPT}),!1)},Fe=function(e){return!(e instanceof F||e instanceof I||"string"==typeof e.nodeName&&"string"==typeof e.textContent&&"function"==typeof e.removeChild&&e.attributes instanceof z&&"function"==typeof e.removeAttribute&&"function"==typeof e.setAttribute&&"string"==typeof e.namespaceURI)},Ie=function(e){return"object"===(void 0===C?"undefined":_(C))?e instanceof C:e&&"object"===(void 0===e?"undefined":_(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},Ue=function(e,t,n){Z[e]&&Z[e].forEach((function(e){e.call(f,t,n,Ne)}))},Pe=function(e){var t=void 0;if(Ue("beforeSanitizeElements",e,null),Fe(e))return Ce(e),!0;var n=e.nodeName.toLowerCase();if(Ue("uponSanitizeElement",e,{tagName:n,allowedTags:ie}),("svg"===n||"math"===n)&&0!==e.querySelectorAll("p, br").length)return Ce(e),!0;if(!ie[n]||se[n]){if(_e&&!Se[n]&&"function"==typeof e.insertAdjacentHTML)try{var r=e.innerHTML;e.insertAdjacentHTML("AfterEnd",W?W.createHTML(r):r)}catch(e){}return Ce(e),!0}return"noscript"===n&&/<\/noscript/i.test(e.innerHTML)||"noembed"===n&&/<\/noembed/i.test(e.innerHTML)?(Ce(e),!0):(!me||e.firstElementChild||e.content&&e.content.firstElementChild||!/</g.test(e.textContent)||(f.removed.push({element:e.cloneNode()}),e.innerHTML?e.innerHTML=e.innerHTML.replace(/</g,"&lt;"):e.innerHTML=e.textContent.replace(/</g,"&lt;")),he&&3===e.nodeType&&(t=(t=(t=e.textContent).replace(J," ")).replace(Q," "),e.textContent!==t&&(f.removed.push({element:e.cloneNode()}),e.textContent=t)),Ue("afterSanitizeElements",e,null),!1)},qe=function(e,t,n){if(xe&&("id"===t||"name"===t)&&(n in N||n in ke))return!1;if(de&&ee.test(t));else if(fe&&te.test(t));else{if(!ce[t]||le[t])return!1;if(Le[t]);else if(oe.test(n.replace(re,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==n.indexOf("data:")||!Re[e])if(pe&&!ne.test(n.replace(re,"")));else if(n)return!1}return!0},We=function(e){var t=void 0,n=void 0,r=void 0,o=void 0,i=void 0;Ue("beforeSanitizeAttributes",e,null);var a=e.attributes;if(a){var c={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ce};for(i=a.length;i--;){var u=t=a[i],s=u.name,l=u.namespaceURI;if(n=t.value.trim(),r=s.toLowerCase(),c.attrName=r,c.attrValue=n,c.keepAttr=!0,Ue("uponSanitizeAttribute",e,c),n=c.attrValue,"name"===r&&"IMG"===e.nodeName&&a.id)o=a.id,a=E(S,a,[]),je("id",e),je(s,e),a.indexOf(o)>i&&e.setAttribute("id",o.value);else{if("INPUT"===e.nodeName&&"type"===r&&"file"===n&&c.keepAttr&&(ce[r]||!le[r]))continue;"id"===s&&e.setAttribute(s,""),je(s,e)}if(c.keepAttr)if(/svg|math/i.test(e.namespaceURI)&&new RegExp("</("+Object.keys(Se).join("|")+")","i").test(n))je(s,e);else{he&&(n=(n=n.replace(J," ")).replace(Q," "));var d=e.nodeName.toLowerCase();if(qe(d,r,n))try{l?e.setAttributeNS(l,s,n):e.setAttribute(s,n),f.removed.pop()}catch(e){}}}Ue("afterSanitizeAttributes",e,null)}},Be=function e(t){var n=void 0,r=ze(t);for(Ue("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)Ue("uponSanitizeShadowNode",n,null),Pe(n)||(n.content instanceof k&&e(n.content),We(n));Ue("afterSanitizeShadowDOM",t,null)};return f.sanitize=function(e,t){var n=void 0,r=void 0,o=void 0,i=void 0,c=void 0;if(e||(e="\x3c!--\x3e"),"string"!=typeof e&&!Ie(e)){if("function"!=typeof e.toString)throw new TypeError("toString is not a function");if("string"!=typeof(e=e.toString()))throw new TypeError("dirty is not a string, aborting")}if(!f.isSupported){if("object"===_(a.toStaticHTML)||"function"==typeof a.toStaticHTML){if("string"==typeof e)return a.toStaticHTML(e);if(Ie(e))return a.toStaticHTML(e.outerHTML)}return e}if(ge||De(t),f.removed=[],Oe);else if(e instanceof C)1===(r=(n=He("\x3c!--\x3e")).ownerDocument.importNode(e,!0)).nodeType&&"BODY"===r.nodeName||"HTML"===r.nodeName?n=r:n.appendChild(r);else{if(!ve&&!he&&!ye&&Ae&&-1===e.indexOf("<"))return W?W.createHTML(e):e;if(!(n=He(e)))return ve?null:B}n&&be&&Ce(n.firstChild);for(var u=ze(Oe?e:n);o=u.nextNode();)3===o.nodeType&&o===i||Pe(o)||(o.content instanceof k&&Be(o.content),We(o),i=o);if(i=null,Oe)return e;if(ve){if(Te)for(c=$.call(n.ownerDocument);n.firstChild;)c.appendChild(n.firstChild);else c=n;return we&&(c=X.call(d,c,!0)),c}var s=ye?n.outerHTML:n.innerHTML;return he&&(s=(s=s.replace(J," ")).replace(Q," ")),W&&Ae?W.createHTML(s):s},f.setConfig=function(e){De(e),ge=!0},f.clearConfig=function(){Ne=null,ge=!1},f.isValidAttribute=function(e,t,n){Ne||De({});var r=e.toLowerCase(),o=t.toLowerCase();return qe(r,o,n)},f.addHook=function(e,t){"function"==typeof t&&(Z[e]=Z[e]||[],Z[e].push(t))},f.removeHook=function(e){Z[e]&&Z[e].pop()},f.removeHooks=function(e){Z[e]&&(Z[e]=[])},f.removeAllHooks=function(){Z={}},f}()}()},61:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return a}));n(507);var r=n(131),o=n.n(r);function i(e,t={}){return o()(e,{withCredentials:!1,...t,transformResponse:[e=>e],responseType:"document"}).then(({data:e})=>new DOMParser().parseFromString(e,"text/html"))}function a(e,t={}){return o()(e,{withCredentials:!1,...t,transformResponse:[e=>e],responseType:"text"}).then(({data:e})=>e)}},634:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(3),o=n(7);function i(){}var a=n(45);function c(e,t,n){return function(r){return r.lift(new u(e,t,n))}}var u=function(){function e(e,t,n){this.nextOrObserver=e,this.error=t,this.complete=n}return e.prototype.call=function(e,t){return t.subscribe(new s(e,this.nextOrObserver,this.error,this.complete))},e}(),s=function(e){function t(t,n,r,o){var c=e.call(this,t)||this;return c._tapNext=i,c._tapError=i,c._tapComplete=i,c._tapError=r||i,c._tapComplete=o||i,Object(a.a)(n)?(c._context=c,c._tapNext=n):n&&(c._context=n,c._tapNext=n.next||i,c._tapError=n.error||i,c._tapComplete=n.complete||i),c}return r.__extends(t,e),t.prototype._next=function(e){try{this._tapNext.call(this._context,e)}catch(e){return void this.destination.error(e)}this.destination.next(e)},t.prototype._error=function(e){try{this._tapError.call(this._context,e)}catch(e){return void this.destination.error(e)}this.destination.error(e)},t.prototype._complete=function(){try{this._tapComplete.call(this._context)}catch(e){return void this.destination.error(e)}return this.destination.complete()},t}(o.a)},842:function(e,t,n){"use strict";n.r(t),n.d(t,"getSrcPage",(function(){return s})),n.d(t,"search",(function(){return l}));var r=n(61),o=n(5),i=n(131),a=n.n(i),c=n(507),u=n.n(c);const s=e=>"https://www.shanbay.com/bdc/mobile/preview/word?word="+e,l=(e,t,n)=>{const i=n.dicts.all.shanbay.options;return Object(r.a)("https://www.shanbay.com/bdc/mobile/preview/word?word="+encodeURIComponent(e.replace(/\s+/g," "))).catch(o.g).then(e=>function(e,t){if(!e.querySelector(".error-typo"))return async function(e,t){const n=e.querySelector(".word-spell"),r={id:"shanbay",type:"lex",title:Object(o.f)(e,".word-spell"),pattern:Object(o.f)(e,".pattern"),prons:[],sentences:[]},i={uk:"http://media.shanbay.com/audio/uk/"+r.title+".mp3",us:"http://media.shanbay.com/audio/us/"+r.title+".mp3"};r.prons.push({phsym:Object(o.f)(e,".word-announace"),url:i.us}),t.basic&&(r.basic=Object(o.d)("http://www.shanbay.com",e,".definition-cn"));r.wordId=n&&n.getAttribute("data-id"),t.sentence&&r.wordId&&(r.sentences=await(c=r.wordId,a.a.get(`https://www.shanbay.com/api/v1/bdc/example/?vocabulary_id=${c}&type=sys`).then(({data:{data:e}})=>Array.isArray(e)?e.map(e=>({annotation:u.a.sanitize(e.annotation),translation:u.a.sanitize(e.translation)})):[])));var c;if(r.title)return{result:r,audio:i};return Object(o.h)()}(e,t);return Object(o.h)()}(e,i))}}}]);