(window.saladictEntry=window.saladictEntry||[]).push([[23,27],{540:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=r(3);n.__exportStar(r(966),e),n.__exportStar(r(968),e),n.__exportStar(r(969),e)},541:function(t,e,r){"use strict";var n=r(975),i=r(976),o=r(817);t.exports={formats:o,parse:i,stringify:n}},542:function(t,e,r){"use strict";r.r(e),r.d(e,"getTranslator",(function(){return a})),r.d(e,"getSrcPage",(function(){return s})),r.d(e,"search",(function(){return c}));var n=r(19),i=r(819),o=r(17);const a=Object(n.a)(()=>new i.Baidu({env:"ext",config:{DEBUG:!1,SDAPP_VETTED:"true",SDAPP_ANALYTICS:"UA-49163616-4",MOJI_ID:"E62VyFVLMiW7kvbtVq3p",PROXY_PROTOCAL:"socks5",PROXY_HOST:"localhost",PROXY_PORT:"7890"}.BAIDU_APPID&&{DEBUG:!1,SDAPP_VETTED:"true",SDAPP_ANALYTICS:"UA-49163616-4",MOJI_ID:"E62VyFVLMiW7kvbtVq3p",PROXY_PROTOCAL:"socks5",PROXY_HOST:"localhost",PROXY_PORT:"7890"}.BAIDU_KEY?{appid:{DEBUG:!1,SDAPP_VETTED:"true",SDAPP_ANALYTICS:"UA-49163616-4",MOJI_ID:"E62VyFVLMiW7kvbtVq3p",PROXY_PROTOCAL:"socks5",PROXY_HOST:"localhost",PROXY_PORT:"7890"}.BAIDU_APPID,key:{DEBUG:!1,SDAPP_VETTED:"true",SDAPP_ANALYTICS:"UA-49163616-4",MOJI_ID:"E62VyFVLMiW7kvbtVq3p",PROXY_PROTOCAL:"socks5",PROXY_HOST:"localhost",PROXY_PORT:"7890"}.BAIDU_KEY}:void 0})),s=(t,e,r)=>`https://fanyi.baidu.com/#auto/${"default"===r.dicts.all.baidu.options.tl?"zh-CN"===e.langCode?"zh":"zh-TW"===e.langCode?"cht":"en":r.dicts.all.baidu.options.tl}/${t}`,c=async(t,e,r,n)=>{const i=a(),{sl:s,tl:c,text:u}=await Object(o.a)(i,t,r.dicts.all.baidu,e,n),l=e.dictAuth.baidu.appid,f=e.dictAuth.baidu.key,p=l&&f?{appid:l,key:f}:void 0;try{const t=await i.translate(u,s,c,p);return Object(o.c)({result:{id:"baidu",slInitial:r.dicts.all.baidu.options.slInitial,sl:t.from,tl:t.to,searchText:t.origin,trans:t.trans},audio:{py:t.trans.tts,us:t.trans.tts}},i.getSupportLanguages())}catch(t){return Object(o.c)({result:{id:"baidu",slInitial:"hide",sl:s,tl:c,searchText:{paragraphs:[""]},trans:{paragraphs:[""]}}},i.getSupportLanguages())}}},635:function(t,e,r){var n;t.exports=(n=n||function(t,e){var r=Object.create||function(){function t(){}return function(e){var r;return t.prototype=e,r=new t,t.prototype=null,r}}(),n={},i=n.lib={},o=i.Base={extend:function(t){var e=r(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},a=i.WordArray=o.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||c).stringify(this)},concat:function(t){var e=this.words,r=t.words,n=this.sigBytes,i=t.sigBytes;if(this.clamp(),n%4)for(var o=0;o<i;o++){var a=r[o>>>2]>>>24-o%4*8&255;e[n+o>>>2]|=a<<24-(n+o)%4*8}else for(o=0;o<i;o+=4)e[n+o>>>2]=r[o>>>2];return this.sigBytes+=i,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=o.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var r,n=[],i=function(e){e=e;var r=987654321,n=4294967295;return function(){var i=((r=36969*(65535&r)+(r>>16)&n)<<16)+(e=18e3*(65535&e)+(e>>16)&n)&n;return i/=4294967296,(i+=.5)*(t.random()>.5?1:-1)}},o=0;o<e;o+=4){var s=i(4294967296*(r||t.random()));r=987654071*s(),n.push(4294967296*s()|0)}return new a.init(n,e)}}),s=n.enc={},c=s.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],i=0;i<r;i++){var o=e[i>>>2]>>>24-i%4*8&255;n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n+=2)r[n>>>3]|=parseInt(t.substr(n,2),16)<<24-n%8*4;return new a.init(r,e/2)}},u=s.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],i=0;i<r;i++){var o=e[i>>>2]>>>24-i%4*8&255;n.push(String.fromCharCode(o))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n++)r[n>>>2]|=(255&t.charCodeAt(n))<<24-n%4*8;return new a.init(r,e)}},l=s.Utf8={stringify:function(t){try{return decodeURIComponent(escape(u.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return u.parse(unescape(encodeURIComponent(t)))}},f=i.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=l.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r=this._data,n=r.words,i=r.sigBytes,o=this.blockSize,s=i/(4*o),c=(s=e?t.ceil(s):t.max((0|s)-this._minBufferSize,0))*o,u=t.min(4*c,i);if(c){for(var l=0;l<c;l+=o)this._doProcessBlock(n,l);var f=n.splice(0,c);r.sigBytes-=u}return new a.init(f,u)},clone:function(){var t=o.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),p=(i.Hasher=f.extend({cfg:o.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){f.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new p.HMAC.init(t,r).finalize(e)}}}),n.algo={});return n}(Math),n)},762:function(t,e,r){"use strict";var n=Object.prototype.hasOwnProperty,i=Array.isArray,o=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}(),a=function(t,e){for(var r=e&&e.plainObjects?Object.create(null):{},n=0;n<t.length;++n)void 0!==t[n]&&(r[n]=t[n]);return r};t.exports={arrayToObject:a,assign:function(t,e){return Object.keys(e).reduce((function(t,r){return t[r]=e[r],t}),t)},combine:function(t,e){return[].concat(t,e)},compact:function(t){for(var e=[{obj:{o:t},prop:"o"}],r=[],n=0;n<e.length;++n)for(var o=e[n],a=o.obj[o.prop],s=Object.keys(a),c=0;c<s.length;++c){var u=s[c],l=a[u];"object"==typeof l&&null!==l&&-1===r.indexOf(l)&&(e.push({obj:a,prop:u}),r.push(l))}return function(t){for(;t.length>1;){var e=t.pop(),r=e.obj[e.prop];if(i(r)){for(var n=[],o=0;o<r.length;++o)void 0!==r[o]&&n.push(r[o]);e.obj[e.prop]=n}}}(e),t},decode:function(t,e,r){var n=t.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(t){return n}},encode:function(t,e,r){if(0===t.length)return t;var n=t;if("symbol"==typeof t?n=Symbol.prototype.toString.call(t):"string"!=typeof t&&(n=String(t)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,(function(t){return"%26%23"+parseInt(t.slice(2),16)+"%3B"}));for(var i="",a=0;a<n.length;++a){var s=n.charCodeAt(a);45===s||46===s||95===s||126===s||s>=48&&s<=57||s>=65&&s<=90||s>=97&&s<=122?i+=n.charAt(a):s<128?i+=o[s]:s<2048?i+=o[192|s>>6]+o[128|63&s]:s<55296||s>=57344?i+=o[224|s>>12]+o[128|s>>6&63]+o[128|63&s]:(a+=1,s=65536+((1023&s)<<10|1023&n.charCodeAt(a)),i+=o[240|s>>18]+o[128|s>>12&63]+o[128|s>>6&63]+o[128|63&s])}return i},isBuffer:function(t){return!(!t||"object"!=typeof t)&&!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))},isRegExp:function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},maybeMap:function(t,e){if(i(t)){for(var r=[],n=0;n<t.length;n+=1)r.push(e(t[n]));return r}return e(t)},merge:function t(e,r,o){if(!r)return e;if("object"!=typeof r){if(i(e))e.push(r);else{if(!e||"object"!=typeof e)return[e,r];(o&&(o.plainObjects||o.allowPrototypes)||!n.call(Object.prototype,r))&&(e[r]=!0)}return e}if(!e||"object"!=typeof e)return[e].concat(r);var s=e;return i(e)&&!i(r)&&(s=a(e,o)),i(e)&&i(r)?(r.forEach((function(r,i){if(n.call(e,i)){var a=e[i];a&&"object"==typeof a&&r&&"object"==typeof r?e[i]=t(a,r,o):e.push(r)}else e[i]=r})),e):Object.keys(r).reduce((function(e,i){var a=r[i];return n.call(e,i)?e[i]=t(e[i],a,o):e[i]=a,e}),s)}}},763:function(t,e,r){var n,i,o,a,s;n=r(977),i=r(818).utf8,o=r(978),a=r(818).bin,(s=function(t,e){t.constructor==String?t=e&&"binary"===e.encoding?a.stringToBytes(t):i.stringToBytes(t):o(t)?t=Array.prototype.slice.call(t,0):Array.isArray(t)||(t=t.toString());for(var r=n.bytesToWords(t),c=8*t.length,u=1732584193,l=-271733879,f=-1732584194,p=271733878,d=0;d<r.length;d++)r[d]=16711935&(r[d]<<8|r[d]>>>24)|4278255360&(r[d]<<24|r[d]>>>8);r[c>>>5]|=128<<c%32,r[14+(c+64>>>9<<4)]=c;var h=s._ff,g=s._gg,y=s._hh,m=s._ii;for(d=0;d<r.length;d+=16){var v=u,b=l,T=f,O=p;u=h(u,l,f,p,r[d+0],7,-680876936),p=h(p,u,l,f,r[d+1],12,-389564586),f=h(f,p,u,l,r[d+2],17,606105819),l=h(l,f,p,u,r[d+3],22,-1044525330),u=h(u,l,f,p,r[d+4],7,-176418897),p=h(p,u,l,f,r[d+5],12,1200080426),f=h(f,p,u,l,r[d+6],17,-1473231341),l=h(l,f,p,u,r[d+7],22,-45705983),u=h(u,l,f,p,r[d+8],7,1770035416),p=h(p,u,l,f,r[d+9],12,-1958414417),f=h(f,p,u,l,r[d+10],17,-42063),l=h(l,f,p,u,r[d+11],22,-1990404162),u=h(u,l,f,p,r[d+12],7,1804603682),p=h(p,u,l,f,r[d+13],12,-40341101),f=h(f,p,u,l,r[d+14],17,-1502002290),u=g(u,l=h(l,f,p,u,r[d+15],22,1236535329),f,p,r[d+1],5,-165796510),p=g(p,u,l,f,r[d+6],9,-1069501632),f=g(f,p,u,l,r[d+11],14,643717713),l=g(l,f,p,u,r[d+0],20,-373897302),u=g(u,l,f,p,r[d+5],5,-701558691),p=g(p,u,l,f,r[d+10],9,38016083),f=g(f,p,u,l,r[d+15],14,-660478335),l=g(l,f,p,u,r[d+4],20,-405537848),u=g(u,l,f,p,r[d+9],5,568446438),p=g(p,u,l,f,r[d+14],9,-1019803690),f=g(f,p,u,l,r[d+3],14,-187363961),l=g(l,f,p,u,r[d+8],20,1163531501),u=g(u,l,f,p,r[d+13],5,-1444681467),p=g(p,u,l,f,r[d+2],9,-51403784),f=g(f,p,u,l,r[d+7],14,1735328473),u=y(u,l=g(l,f,p,u,r[d+12],20,-1926607734),f,p,r[d+5],4,-378558),p=y(p,u,l,f,r[d+8],11,-2022574463),f=y(f,p,u,l,r[d+11],16,1839030562),l=y(l,f,p,u,r[d+14],23,-35309556),u=y(u,l,f,p,r[d+1],4,-1530992060),p=y(p,u,l,f,r[d+4],11,1272893353),f=y(f,p,u,l,r[d+7],16,-155497632),l=y(l,f,p,u,r[d+10],23,-1094730640),u=y(u,l,f,p,r[d+13],4,681279174),p=y(p,u,l,f,r[d+0],11,-358537222),f=y(f,p,u,l,r[d+3],16,-722521979),l=y(l,f,p,u,r[d+6],23,76029189),u=y(u,l,f,p,r[d+9],4,-640364487),p=y(p,u,l,f,r[d+12],11,-421815835),f=y(f,p,u,l,r[d+15],16,530742520),u=m(u,l=y(l,f,p,u,r[d+2],23,-995338651),f,p,r[d+0],6,-198630844),p=m(p,u,l,f,r[d+7],10,1126891415),f=m(f,p,u,l,r[d+14],15,-1416354905),l=m(l,f,p,u,r[d+5],21,-57434055),u=m(u,l,f,p,r[d+12],6,1700485571),p=m(p,u,l,f,r[d+3],10,-1894986606),f=m(f,p,u,l,r[d+10],15,-1051523),l=m(l,f,p,u,r[d+1],21,-2054922799),u=m(u,l,f,p,r[d+8],6,1873313359),p=m(p,u,l,f,r[d+15],10,-30611744),f=m(f,p,u,l,r[d+6],15,-1560198380),l=m(l,f,p,u,r[d+13],21,1309151649),u=m(u,l,f,p,r[d+4],6,-145523070),p=m(p,u,l,f,r[d+11],10,-1120210379),f=m(f,p,u,l,r[d+2],15,718787259),l=m(l,f,p,u,r[d+9],21,-343485551),u=u+v>>>0,l=l+b>>>0,f=f+T>>>0,p=p+O>>>0}return n.endian([u,l,f,p])})._ff=function(t,e,r,n,i,o,a){var s=t+(e&r|~e&n)+(i>>>0)+a;return(s<<o|s>>>32-o)+e},s._gg=function(t,e,r,n,i,o,a){var s=t+(e&n|r&~n)+(i>>>0)+a;return(s<<o|s>>>32-o)+e},s._hh=function(t,e,r,n,i,o,a){var s=t+(e^r^n)+(i>>>0)+a;return(s<<o|s>>>32-o)+e},s._ii=function(t,e,r,n,i,o,a){var s=t+(r^(e|~n))+(i>>>0)+a;return(s<<o|s>>>32-o)+e},s._blocksize=16,s._digestsize=16,t.exports=function(t,e){if(null==t)throw new Error("Illegal argument "+t);var r=n.wordsToBytes(s(t,e));return e&&e.asBytes?r:e&&e.asString?a.bytesToString(r):n.bytesToHex(r)}},817:function(t,e,r){"use strict";var n=String.prototype.replace,i=/%20/g,o=r(762),a={RFC1738:"RFC1738",RFC3986:"RFC3986"};t.exports=o.assign({default:a.RFC3986,formatters:{RFC1738:function(t){return n.call(t,i,"+")},RFC3986:function(t){return String(t)}}},a)},818:function(t,e){var r={utf8:{stringToBytes:function(t){return r.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(r.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],r=0;r<t.length;r++)e.push(255&t.charCodeAt(r));return e},bytesToString:function(t){for(var e=[],r=0;r<t.length;r++)e.push(String.fromCharCode(t[r]));return e.join("")}}};t.exports=r},819:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=r(3),i=r(540),o=n.__importDefault(r(763)),a=n.__importDefault(r(541)),s=[["auto","auto"],["zh-CN","zh"],["en","en"],["yue","yue"],["wyw","wyw"],["ja","jp"],["ko","kor"],["fr","fra"],["es","spa"],["th","th"],["ar","ara"],["ru","ru"],["pt","pt"],["de","de"],["it","it"],["el","el"],["nl","nl"],["pl","pl"],["bg","bul"],["et","est"],["da","dan"],["fi","fin"],["cs","cs"],["ro","rom"],["sl","slo"],["sv","swe"],["hu","hu"],["zh-TW","cht"],["vi","vie"]];class c extends i.Translator{constructor(){super(...arguments),this.name="baidu",this.endpoint="http://api.fanyi.baidu.com/api/trans/vip/translate",this.appid="20151211000007653",this.key="IFJB6jBORFuMmVGDRude"}async query(t,e,r,n){const s=Date.now(),u=n.appid||this.appid,l=n.key||this.key,f=await this.request(this.endpoint,{params:{from:c.langMap.get(e),to:c.langMap.get(r),q:t,salt:s,appid:u,sign:o.default(u+t+s+l)}}).then(this.checkData).catch(()=>this.request("http://openapi.baidu.com/public/2.0/bmt/translate?"+a.default.stringify({client_id:"AVhF9A0GExzkU5gCkZ0Gbht7",from:c.langMap.get(e),to:c.langMap.get(r),q:t})).then(this.checkData)).catch(()=>{throw new i.TranslateError("NETWORK_ERROR")}),{trans_result:p,from:d}=f,h=c.langMapReverse.get(d)||e;return{text:t,from:h,to:r,origin:{paragraphs:p.map(({src:t})=>t),tts:await this.textToSpeech(t,h)},trans:{paragraphs:p.map(({dst:t})=>t),tts:await this.textToSpeech(p[0].dst,r)}}}async textToSpeech(t,e){return"http://tts.baidu.com/text2audio?"+a.default.stringify({lan:c.langMap.get("auto"!==e?e:"zh-CN")||"zh",ie:"UTF-8",spd:5,text:t})}checkData({data:t}){if(t.error_code)throw new i.TranslateError("API_SERVER_ERROR");return t}getSupportLanguages(){return[...c.langMap.keys()]}}e.Baidu=c,c.langMap=new Map(s),c.langMapReverse=new Map(s.map(([t,e])=>[e,t])),e.default=c},820:function(t,e,r){var n;t.exports=(n=r(635),function(t){var e=n,r=e.lib,i=r.WordArray,o=r.Hasher,a=e.algo,s=[],c=[];!function(){function e(e){for(var r=t.sqrt(e),n=2;n<=r;n++)if(!(e%n))return!1;return!0}function r(t){return 4294967296*(t-(0|t))|0}for(var n=2,i=0;i<64;)e(n)&&(i<8&&(s[i]=r(t.pow(n,.5))),c[i]=r(t.pow(n,1/3)),i++),n++}();var u=[],l=a.SHA256=o.extend({_doReset:function(){this._hash=new i.init(s.slice(0))},_doProcessBlock:function(t,e){for(var r=this._hash.words,n=r[0],i=r[1],o=r[2],a=r[3],s=r[4],l=r[5],f=r[6],p=r[7],d=0;d<64;d++){if(d<16)u[d]=0|t[e+d];else{var h=u[d-15],g=(h<<25|h>>>7)^(h<<14|h>>>18)^h>>>3,y=u[d-2],m=(y<<15|y>>>17)^(y<<13|y>>>19)^y>>>10;u[d]=g+u[d-7]+m+u[d-16]}var v=n&i^n&o^i&o,b=(n<<30|n>>>2)^(n<<19|n>>>13)^(n<<10|n>>>22),T=p+((s<<26|s>>>6)^(s<<21|s>>>11)^(s<<7|s>>>25))+(s&l^~s&f)+c[d]+u[d];p=f,f=l,l=s,s=a+T|0,a=o,o=i,i=n,n=T+(b+v)|0}r[0]=r[0]+n|0,r[1]=r[1]+i|0,r[2]=r[2]+o|0,r[3]=r[3]+a|0,r[4]=r[4]+s|0,r[5]=r[5]+l|0,r[6]=r[6]+f|0,r[7]=r[7]+p|0},_doFinalize:function(){var e=this._data,r=e.words,n=8*this._nDataBytes,i=8*e.sigBytes;return r[i>>>5]|=128<<24-i%32,r[14+(i+64>>>9<<4)]=t.floor(n/4294967296),r[15+(i+64>>>9<<4)]=n,e.sigBytes=4*r.length,this._process(),this._hash},clone:function(){var t=o.clone.call(this);return t._hash=this._hash.clone(),t}});e.SHA256=o._createHelper(l),e.HmacSHA256=o._createHmacHelper(l)}(Math),n.SHA256)},845:function(t,e,r){"use strict";r.r(e),r.d(e,"getTranslator",(function(){return s})),r.d(e,"getSrcPage",(function(){return c})),r.d(e,"search",(function(){return u}));var n=r(19),i=r(846),o=r(17),a=r(542);const s=Object(n.a)(()=>new i.Tencent({env:"ext",config:{DEBUG:!1,SDAPP_VETTED:"true",SDAPP_ANALYTICS:"UA-49163616-4",MOJI_ID:"E62VyFVLMiW7kvbtVq3p",PROXY_PROTOCAL:"socks5",PROXY_HOST:"localhost",PROXY_PORT:"7890"}.TENCENT_SECRETID&&{DEBUG:!1,SDAPP_VETTED:"true",SDAPP_ANALYTICS:"UA-49163616-4",MOJI_ID:"E62VyFVLMiW7kvbtVq3p",PROXY_PROTOCAL:"socks5",PROXY_HOST:"localhost",PROXY_PORT:"7890"}.TENCENT_SECRETKEY?{secretId:{DEBUG:!1,SDAPP_VETTED:"true",SDAPP_ANALYTICS:"UA-49163616-4",MOJI_ID:"E62VyFVLMiW7kvbtVq3p",PROXY_PROTOCAL:"socks5",PROXY_HOST:"localhost",PROXY_PORT:"7890"}.TENCENT_SECRETID,secretKey:{DEBUG:!1,SDAPP_VETTED:"true",SDAPP_ANALYTICS:"UA-49163616-4",MOJI_ID:"E62VyFVLMiW7kvbtVq3p",PROXY_PROTOCAL:"socks5",PROXY_HOST:"localhost",PROXY_PORT:"7890"}.TENCENT_SECRETKEY}:void 0})),c=(t,e,r)=>`https://fanyi.qq.com/#auto/${"default"===r.dicts.all.tencent.options.tl?"zh-CN"===e.langCode?"zh-CHS":"zh-TW"===e.langCode?"zh-CHT":"en":r.dicts.all.tencent.options.tl}/${t}`,u=async(t,e,r,n)=>{const i=s(),{sl:c,tl:u,text:l}=await Object(o.a)(i,t,r.dicts.all.tencent,e,n),f=e.dictAuth.tencent.secretId,p=e.dictAuth.tencent.secretKey,d=f&&p?{secretId:f,secretKey:p}:void 0;try{const t=await i.translate(l,c,u,d),e=Object(a.getTranslator)();return t.origin.tts=await e.textToSpeech(t.origin.paragraphs.join("\n"),t.from),t.trans.tts=await e.textToSpeech(t.trans.paragraphs.join("\n"),t.to),Object(o.c)({result:{id:"tencent",sl:t.from,tl:t.to,slInitial:r.dicts.all.tencent.options.slInitial,searchText:t.origin,trans:t.trans},audio:{py:t.trans.tts,us:t.trans.tts}},i.getSupportLanguages())}catch(t){return Object(o.c)({result:{id:"tencent",sl:c,tl:u,slInitial:"hide",searchText:{paragraphs:[""]},trans:{paragraphs:[""]}}},i.getSupportLanguages())}}},846:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=r(3),i=r(540),o=n.__importDefault(r(541)),a=n.__importDefault(r(820)),s=n.__importDefault(r(982)),c=n.__importDefault(r(984)),u=r(985),l=[["auto","auto"],["zh-CN","zh"],["zh-TW","zh-TW"],["en","en"],["ko","kr"],["ja","jp"],["de","de"],["fr","fr"],["es","es"],["it","it"],["tr","tr"],["ru","ru"],["pt","pt"],["vi","vi"],["id","id"],["ms","ms"],["th","th"]],f={qtv:"1f287950babc6f41",qtk:"7ZL+2Pxljmav9j1z8Q7RuhmVeN5nkYZrLJH0kfWZ8rin6SYxcu62TsMramShwVod/uNYNIKWAu7I4x09lVkCEou4pIVE5E1GuDDrHuNjLUHQCSPssTaFUOOiIomtcwFYQAxap7Kp9beMz+rxnUL9pg==",date:0};class p extends i.Translator{constructor(){super(...arguments),this.token={...f},this.name="tencent"}static getUTCDate(t){return`${t.getUTCFullYear()}-${(""+(t.getUTCMonth()+1)).padStart(2,"0")}-${(""+t.getUTCDate()).padStart(2,"0")}`}stubHeaders(t){if("ext"!==this.env||p.isStubHeaders[t])return;p.isStubHeaders[t]=!0;const e="undefined"!=typeof browser?browser:"undefined"!=typeof chrome?chrome:null,r=["blocking","requestHeaders"];e.webRequest.OnBeforeSendHeadersOptions&&e.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty("EXTRA_HEADERS")&&r.push("extraHeaders"),e.webRequest.onBeforeSendHeaders.addListener(e=>{if(e&&e.requestHeaders){const r=e.requestHeaders.filter(t=>!/Host/i.test(t.name));return r.push({name:"Host",value:t}),{requestHeaders:r}}return e},{urls:[`*://${t}/*`]},r)}signedRequest({secretId:t,secretKey:e,action:r,payload:n,service:i,version:o}){const u=i+".tencentcloudapi.com";this.stubHeaders(u);const l=new Date,f=(""+(new Date).valueOf()).slice(0,10),d=["POST","/","","content-type:application/json; charset=utf-8","host:"+u,"","content-type;host",a.default(n).toString(c.default)].join("\n"),h=p.getUTCDate(l),g=["TC3-HMAC-SHA256",f,`${h}/${i}/tc3_request`,a.default(d).toString(c.default)].join("\n"),y=s.default(h,"TC3"+e),m=s.default(i,y),v=s.default("tc3_request",m),b=s.default(g,v).toString(c.default);return this.request(`https://${i}.tencentcloudapi.com`,{method:"POST",headers:{"Content-Type":"application/json; charset=utf-8",Host:u,"X-TC-Action":r,"X-TC-Timestamp":f,"X-TC-Region":"ap-beijing","X-TC-Version":o,Authorization:`TC3-HMAC-SHA256 Credential=${t}/${h}/${i}/tc3_request, SignedHeaders=content-type;host, Signature=${b}`},data:n})}async updateToken(){const t={...f};try{const e=(await this.request("https://fanyi.qq.com")).data,r=e.match(/"qtv=([^"]+)/);r&&(t.qtv=r[1]);const n=e.match(/"qtk=([^"]+)/);n&&(t.qtk=n[1])}catch(t){}this.token={...t,date:Date.now()}}async getToken(){return Date.now()-this.token.date>36e4&&await this.updateToken(),this.token}async query(t,e,r,n){if(n.secretKey){const i=JSON.stringify({ProjectId:0,Source:p.langMap.get(e),SourceText:t,Target:p.langMap.get(r)}),{data:o}=await this.signedRequest({secretId:n.secretId,secretKey:n.secretKey,action:"TextTranslate",payload:i,service:"tmt",version:"2018-03-21"});return{text:t,from:p.langMapReverse.get(o.Response.Source)||e,to:p.langMapReverse.get(o.Response.Target)||r,origin:{paragraphs:t.split(/\n+/)},trans:{paragraphs:u.decodeHTMLEntities(o.Response.TargetText).split(/\n+/)}}}const{qtv:a,qtk:s}=await this.getToken(),c=o.default.stringify({source:p.langMap.get(e),target:p.langMap.get(r),sourceText:t,qtv:a,qtk:s,sessionUuid:"translate_uuid"+Date.now()}),l=await this.request("https://fanyi.qq.com/api/translate",{method:"post",withCredentials:!1,headers:{Origin:"https://fanyi.qq.com",Accept:"application/json, text/javascript, */*; q=0.01","Content-Type":"application/x-www-form-urlencoded; charset=UTF-8","X-Requested-With":"XMLHttpRequest"},data:c});if(!l||!l.data)throw new i.TranslateError("NETWORK_ERROR");const f=l.data,d=u.decodeHTMLEntities(f.translate.records.map(t=>t.targetText).join(" ").replace(/\s*↵\s*/g,"\n")),h=u.decodeHTMLEntities(f.translate.records.map(t=>t.sourceText).join(" ").replace(/\s*↵\s*/g,"\n"));return{text:t,from:p.langMapReverse.get(f.translate.source)||("auto"!==e?e:await this.detect(t)),to:r,origin:{paragraphs:h.split("\n"),tts:await this.textToSpeech(h,p.langMapReverse.get(f.translate.source)||e)},trans:{paragraphs:d.split("\n"),tts:await this.textToSpeech(d,p.langMapReverse.get(f.translate.target)||r)}}}getSupportLanguages(){return[...p.langMap.keys()]}async detect(t){if(this.config.secretKey){const e=JSON.stringify({ProjectId:0,Text:t}),{data:r}=await this.signedRequest({secretId:this.config.secretId,secretKey:this.config.secretKey,action:"LanguageDetect",payload:e,service:"tmt",version:"2018-03-21"});return p.langMapReverse.get(r.Response.Lang)||"auto"}return super.detect(t)}async textToSpeech(t,e){if(this.config.secretKey){const r=JSON.stringify({ProjectId:0,Text:encodeURIComponent(t),SessionId:""+Date.now(),ModelType:-1,PrimaryLanguage:e.startsWith("zh")?1:2,Codec:"mp3"}),{data:n}=await this.signedRequest({secretId:this.config.secretId,secretKey:this.config.secretKey,action:"TextToVoice",payload:r,service:"tts",version:"2019-08-23"});return n.Response.Audio||""}return"https://fanyi.qq.com/api/tts?"+o.default.stringify({lang:p.langMap.get("auto"!==e?e:"zh-CN")||"zh",text:t})}}e.Tencent=p,p.langMap=new Map(l),p.langMapReverse=new Map(l.map(([t,e])=>[e,t])),p.isStubHeaders={},e.default=p},966:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});r(3).__exportStar(r(967),e)},967:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.languages=["af","am","ar","auto","az","be","bg","bn","bs","ca","ceb","co","cs","cy","da","de","el","en","eo","es","et","eu","fa","fi","fil","fj","fr","fy","ga","gd","gl","gu","ha","haw","he","hi","hmn","hr","ht","hu","hy","id","ig","is","it","ja","jw","ka","kk","km","kn","ko","ku","ky","la","lb","lo","lt","lv","mg","mi","mk","ml","mn","mr","ms","mt","mww","my","ne","nl","no","ny","otq","pa","pl","ps","pt","ro","ru","sd","si","sk","sl","sm","sn","so","sq","sr","sr-Cyrl","sr-Latn","st","su","sv","sw","ta","te","tg","th","tlh","tlh-Qaak","to","tr","ty","ug","uk","ur","uz","vi","wyw","xh","yi","yo","yua","yue","zh-CN","zh-TW","zu"]},968:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class n extends Error{constructor(t){super(t)}}e.TranslateError=n},969:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=r(3).__importDefault(r(131)),i=r(970),o=r(971);e.Translator=class{constructor(t={}){this.env=t.env||"node",this.axios=t.axios||n.default,this.config=t.config||{}}async translate(t,e,r,n={}){return{...await this.query(t,e,r,{...this.config,...n}),engine:this.name}}request(t,e){return"ext"===this.env&&e&&e.headers?this.axios(t,i.modifyExtraHeaders(t,e)):this.axios(t,e)}async detect(t){return o.detectLang(t)}textToSpeech(t,e,r){return Promise.resolve(null)}}},970:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n="undefined"!=typeof browser?browser:"undefined"!=typeof chrome?chrome:null,i={},o=/^(Origin|Referer|Host|Cookie|User-Agent|DNT|Accept-Charset|Accept-Encoding)$/i,a=/^(Origin|Referer)$/i;e.modifyExtraHeaders=(t,e)=>{if(!e.headers)return e;const r=Object.keys(e.headers),s={};let c;for(let t=0;t<r.length;t++){const n=r[t];o.test(n)?a.test(n)&&(c=e.headers[n]):s[n]=e.headers[n]}return c&&function(t,e){if(!n)return void console.warn("Missing Browser Global");const r=new URL(t).origin+"/*";if(i[r])return;i[r]=!0;const o=["blocking","requestHeaders"];n.webRequest.OnBeforeSendHeadersOptions&&n.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty("EXTRA_HEADERS")&&o.push("extraHeaders"),n.webRequest.onBeforeSendHeaders.addListener(t=>{if(t&&t.requestHeaders){const r=t.requestHeaders.filter(t=>!a.test(t.name));return r.push({name:"Origin",value:e},{name:"Referer",value:e}),{requestHeaders:r}}return t},{urls:[r]},o)}(t,c),{...e,headers:s}}},971:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=r(3).__importDefault(r(979)),i=new Map([["eng","en"],["jpn","ja"],["kor","ko"],["cmn","zh-CN"]]),o={minLength:1,whitelist:[...i.keys()]};e.detectLang=function(t){return i.get(n.default(t,o))||"auto"}},972:function(t,e,r){"use strict";function n(t){if("number"!=typeof t||isNaN(t)||t<1||t===1/0)throw new Error("`"+t+"` is not a valid argument for n-gram");return function(e){var r,n=[];if(null==e)return n;if(e=e.slice?e:String(e),(r=e.length-t+1)<1)return n;for(;r--;)n[r]=e.slice(r,r+t);return n}}t.exports=n,n.bigram=n(2),n.trigram=n(3)},973:function(t,e,r){"use strict";t.exports=function(t){return String(t).replace(/\s+/g," ")}},974:function(t,e){(e=t.exports=function(t){return t.replace(/^\s*|\s*$/g,"")}).left=function(t){return t.replace(/^\s*/,"")},e.right=function(t){return t.replace(/\s*$/,"")}},975:function(t,e,r){"use strict";var n=r(762),i=r(817),o=Object.prototype.hasOwnProperty,a={brackets:function(t){return t+"[]"},comma:"comma",indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},s=Array.isArray,c=Array.prototype.push,u=function(t,e){c.apply(t,s(e)?e:[e])},l=Date.prototype.toISOString,f=i.default,p={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:f,formatter:i.formatters[f],indices:!1,serializeDate:function(t){return l.call(t)},skipNulls:!1,strictNullHandling:!1},d=function t(e,r,i,o,a,c,l,f,d,h,g,y,m){var v,b=e;if("function"==typeof l?b=l(r,b):b instanceof Date?b=h(b):"comma"===i&&s(b)&&(b=n.maybeMap(b,(function(t){return t instanceof Date?h(t):t})).join(",")),null===b){if(o)return c&&!y?c(r,p.encoder,m,"key"):r;b=""}if("string"==typeof(v=b)||"number"==typeof v||"boolean"==typeof v||"symbol"==typeof v||"bigint"==typeof v||n.isBuffer(b))return c?[g(y?r:c(r,p.encoder,m,"key"))+"="+g(c(b,p.encoder,m,"value"))]:[g(r)+"="+g(String(b))];var T,O=[];if(void 0===b)return O;if(s(l))T=l;else{var _=Object.keys(b);T=f?_.sort(f):_}for(var w=0;w<T.length;++w){var S=T[w],P=b[S];if(!a||null!==P){var x=s(b)?"function"==typeof i?i(r,S):r:r+(d?"."+S:"["+S+"]");u(O,t(P,x,i,o,a,c,l,f,d,h,g,y,m))}}return O};t.exports=function(t,e){var r,n=t,c=function(t){if(!t)return p;if(null!==t.encoder&&void 0!==t.encoder&&"function"!=typeof t.encoder)throw new TypeError("Encoder has to be a function.");var e=t.charset||p.charset;if(void 0!==t.charset&&"utf-8"!==t.charset&&"iso-8859-1"!==t.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=i.default;if(void 0!==t.format){if(!o.call(i.formatters,t.format))throw new TypeError("Unknown format option provided.");r=t.format}var n=i.formatters[r],a=p.filter;return("function"==typeof t.filter||s(t.filter))&&(a=t.filter),{addQueryPrefix:"boolean"==typeof t.addQueryPrefix?t.addQueryPrefix:p.addQueryPrefix,allowDots:void 0===t.allowDots?p.allowDots:!!t.allowDots,charset:e,charsetSentinel:"boolean"==typeof t.charsetSentinel?t.charsetSentinel:p.charsetSentinel,delimiter:void 0===t.delimiter?p.delimiter:t.delimiter,encode:"boolean"==typeof t.encode?t.encode:p.encode,encoder:"function"==typeof t.encoder?t.encoder:p.encoder,encodeValuesOnly:"boolean"==typeof t.encodeValuesOnly?t.encodeValuesOnly:p.encodeValuesOnly,filter:a,formatter:n,serializeDate:"function"==typeof t.serializeDate?t.serializeDate:p.serializeDate,skipNulls:"boolean"==typeof t.skipNulls?t.skipNulls:p.skipNulls,sort:"function"==typeof t.sort?t.sort:null,strictNullHandling:"boolean"==typeof t.strictNullHandling?t.strictNullHandling:p.strictNullHandling}}(e);"function"==typeof c.filter?n=(0,c.filter)("",n):s(c.filter)&&(r=c.filter);var l,f=[];if("object"!=typeof n||null===n)return"";l=e&&e.arrayFormat in a?e.arrayFormat:e&&"indices"in e?e.indices?"indices":"repeat":"indices";var h=a[l];r||(r=Object.keys(n)),c.sort&&r.sort(c.sort);for(var g=0;g<r.length;++g){var y=r[g];c.skipNulls&&null===n[y]||u(f,d(n[y],y,h,c.strictNullHandling,c.skipNulls,c.encode?c.encoder:null,c.filter,c.sort,c.allowDots,c.serializeDate,c.formatter,c.encodeValuesOnly,c.charset))}var m=f.join(c.delimiter),v=!0===c.addQueryPrefix?"?":"";return c.charsetSentinel&&("iso-8859-1"===c.charset?v+="utf8=%26%2310003%3B&":v+="utf8=%E2%9C%93&"),m.length>0?v+m:""}},976:function(t,e,r){"use strict";var n=r(762),i=Object.prototype.hasOwnProperty,o=Array.isArray,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},s=function(t){return t.replace(/&#(\d+);/g,(function(t,e){return String.fromCharCode(parseInt(e,10))}))},c=function(t,e){return t&&"string"==typeof t&&e.comma&&t.indexOf(",")>-1?t.split(","):t},u=function(t,e,r,n){if(t){var o=r.allowDots?t.replace(/\.([^.[]+)/g,"[$1]"):t,a=/(\[[^[\]]*])/g,s=r.depth>0&&/(\[[^[\]]*])/.exec(o),u=s?o.slice(0,s.index):o,l=[];if(u){if(!r.plainObjects&&i.call(Object.prototype,u)&&!r.allowPrototypes)return;l.push(u)}for(var f=0;r.depth>0&&null!==(s=a.exec(o))&&f<r.depth;){if(f+=1,!r.plainObjects&&i.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;l.push(s[1])}return s&&l.push("["+o.slice(s.index)+"]"),function(t,e,r,n){for(var i=n?e:c(e,r),o=t.length-1;o>=0;--o){var a,s=t[o];if("[]"===s&&r.parseArrays)a=[].concat(i);else{a=r.plainObjects?Object.create(null):{};var u="["===s.charAt(0)&&"]"===s.charAt(s.length-1)?s.slice(1,-1):s,l=parseInt(u,10);r.parseArrays||""!==u?!isNaN(l)&&s!==u&&String(l)===u&&l>=0&&r.parseArrays&&l<=r.arrayLimit?(a=[])[l]=i:a[u]=i:a={0:i}}i=a}return i}(l,e,r,n)}};t.exports=function(t,e){var r=function(t){if(!t)return a;if(null!==t.decoder&&void 0!==t.decoder&&"function"!=typeof t.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==t.charset&&"utf-8"!==t.charset&&"iso-8859-1"!==t.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var e=void 0===t.charset?a.charset:t.charset;return{allowDots:void 0===t.allowDots?a.allowDots:!!t.allowDots,allowPrototypes:"boolean"==typeof t.allowPrototypes?t.allowPrototypes:a.allowPrototypes,arrayLimit:"number"==typeof t.arrayLimit?t.arrayLimit:a.arrayLimit,charset:e,charsetSentinel:"boolean"==typeof t.charsetSentinel?t.charsetSentinel:a.charsetSentinel,comma:"boolean"==typeof t.comma?t.comma:a.comma,decoder:"function"==typeof t.decoder?t.decoder:a.decoder,delimiter:"string"==typeof t.delimiter||n.isRegExp(t.delimiter)?t.delimiter:a.delimiter,depth:"number"==typeof t.depth||!1===t.depth?+t.depth:a.depth,ignoreQueryPrefix:!0===t.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof t.interpretNumericEntities?t.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:"number"==typeof t.parameterLimit?t.parameterLimit:a.parameterLimit,parseArrays:!1!==t.parseArrays,plainObjects:"boolean"==typeof t.plainObjects?t.plainObjects:a.plainObjects,strictNullHandling:"boolean"==typeof t.strictNullHandling?t.strictNullHandling:a.strictNullHandling}}(e);if(""===t||null==t)return r.plainObjects?Object.create(null):{};for(var l="string"==typeof t?function(t,e){var r,u={},l=e.ignoreQueryPrefix?t.replace(/^\?/,""):t,f=e.parameterLimit===1/0?void 0:e.parameterLimit,p=l.split(e.delimiter,f),d=-1,h=e.charset;if(e.charsetSentinel)for(r=0;r<p.length;++r)0===p[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===p[r]?h="utf-8":"utf8=%26%2310003%3B"===p[r]&&(h="iso-8859-1"),d=r,r=p.length);for(r=0;r<p.length;++r)if(r!==d){var g,y,m=p[r],v=m.indexOf("]="),b=-1===v?m.indexOf("="):v+1;-1===b?(g=e.decoder(m,a.decoder,h,"key"),y=e.strictNullHandling?null:""):(g=e.decoder(m.slice(0,b),a.decoder,h,"key"),y=n.maybeMap(c(m.slice(b+1),e),(function(t){return e.decoder(t,a.decoder,h,"value")}))),y&&e.interpretNumericEntities&&"iso-8859-1"===h&&(y=s(y)),m.indexOf("[]=")>-1&&(y=o(y)?[y]:y),i.call(u,g)?u[g]=n.combine(u[g],y):u[g]=y}return u}(t,r):t,f=r.plainObjects?Object.create(null):{},p=Object.keys(l),d=0;d<p.length;++d){var h=p[d],g=u(h,l[h],r,"string"==typeof t);f=n.merge(f,g,r)}return n.compact(f)}},977:function(t,e){var r,n;r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&n.rotl(t,8)|4278255360&n.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=n.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],r=0,n=0;r<t.length;r++,n+=8)e[n>>>5]|=t[r]<<24-n%32;return e},wordsToBytes:function(t){for(var e=[],r=0;r<32*t.length;r+=8)e.push(t[r>>>5]>>>24-r%32&255);return e},bytesToHex:function(t){for(var e=[],r=0;r<t.length;r++)e.push((t[r]>>>4).toString(16)),e.push((15&t[r]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],r=0;r<t.length;r+=2)e.push(parseInt(t.substr(r,2),16));return e},bytesToBase64:function(t){for(var e=[],n=0;n<t.length;n+=3)for(var i=t[n]<<16|t[n+1]<<8|t[n+2],o=0;o<4;o++)8*n+6*o<=8*t.length?e.push(r.charAt(i>>>6*(3-o)&63)):e.push("=");return e.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var e=[],n=0,i=0;n<t.length;i=++n%4)0!=i&&e.push((r.indexOf(t.charAt(n-1))&Math.pow(2,-2*i+8)-1)<<2*i|r.indexOf(t.charAt(n))>>>6-2*i);return e}},t.exports=n},978:function(t,e){function r(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&(r(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&r(t.slice(0,0))}(t)||!!t._isBuffer)}},980:function(t,e,r){"use strict";var n=r(972).trigram,i=r(973),o=r(974),a={}.hasOwnProperty;function s(t){return null==t?"":o(i(String(t).replace(/[\u0021-\u0040]+/g," "))).toLowerCase()}function c(t){return n(" "+s(t)+" ")}function u(t){for(var e,r=c(t),n=r.length,i={};n--;)e=r[n],a.call(i,e)?i[e]++:i[e]=1;return i}function l(t,e){return t[1]-e[1]}e.clean=s,e.trigrams=c,e.asDictionary=u,e.asTuples=function(t){var e,r=u(t),n=[];for(e in r)n.push([e,r[e]]);return n.sort(l),n},e.tuplesAsDictionary=function(t){var e,r=t.length,n={};for(;r--;)e=t[r],n[e[0]]=e[1];return n}},982:function(t,e,r){var n;t.exports=(n=r(635),r(820),r(983),n.HmacSHA256)},983:function(t,e,r){var n,i,o,a;t.exports=(n=r(635),o=(i=n).lib.Base,a=i.enc.Utf8,void(i.algo.HMAC=o.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=a.parse(e));var r=t.blockSize,n=4*r;e.sigBytes>n&&(e=t.finalize(e)),e.clamp();for(var i=this._oKey=e.clone(),o=this._iKey=e.clone(),s=i.words,c=o.words,u=0;u<r;u++)s[u]^=1549556828,c[u]^=909522486;i.sigBytes=o.sigBytes=n,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,r=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(r))}})))},984:function(t,e,r){var n;t.exports=(n=r(635),n.enc.Hex)},985:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.decodeHTMLEntities=function(t){return t.replace(/&([^;]+);/gm,(t,e)=>{switch(e){case"amp":return"&";case"apos":case"#x27":return"'";case"#x2F":return"/";case"#39":return"'";case"#47":return"/";case"lt":return"<";case"gt":return">";case"nbsp":return" ";case"quot":return'"';default:return t}})}}}]);