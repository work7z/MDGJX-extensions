(window.saladictEntry=window.saladictEntry||[]).push([[95],{1328:function(e,t,a){"use strict";var l=a(0),i=a.n(l);t.a=e=>{const{title:t,className:a,children:l,...c}=e;return i.a.createElement("div",{className:"entryBox-Wrap"+(a?" "+a:""),...c},i.a.createElement("section",{className:"entryBox"},i.a.createElement("h1",{className:"entryBox-Title"},t),i.a.createElement("div",null,l)))}},655:function(e,t,a){"use strict";a.r(t),a.d(t,"DictMojidict",(function(){return s}));var l=a(0),i=a.n(l),c=a(119),r=a(1328),n=a(1);const s=({result:e})=>i.a.createElement(i.a.Fragment,null,e.word&&i.a.createElement("div",null,i.a.createElement("h1",null,e.word.spell),i.a.createElement("span",null,e.word.pron)," ",i.a.createElement(c.c,{src:e.word.tts||(()=>{var t;return n.a.send({type:"DICT_ENGINE_METHOD",payload:{id:"mojidict",method:"getTTS",args:[null===(t=e.word)||void 0===t?void 0:t.tarId,102]}})})})),e.details&&e.details.map(e=>i.a.createElement(r.a,{key:e.title,title:e.title},e.subdetails&&i.a.createElement("ul",{className:"dictMojidict-List"},e.subdetails.map(e=>i.a.createElement("li",{key:e.title,className:"dictMojidict-ListItem_Disc"},i.a.createElement("p",null,e.title),e.examples&&i.a.createElement("ul",{className:"dictMojidict-Sublist"},e.examples.map(e=>i.a.createElement("li",{key:e.title},i.a.createElement("p",{className:"dictMojidict-Word_Title"},e.title,i.a.createElement(c.c,{src:()=>n.a.send({type:"DICT_ENGINE_METHOD",payload:{id:"mojidict",method:"getTTS",args:[e.objectId,103]}})})),i.a.createElement("p",{className:"dictMojidict-Word_Trans"},e.trans))))))))),e.releated&&i.a.createElement(r.a,{title:"関連用語"},i.a.createElement("ul",{className:"dictMojidict-List"},e.releated.map(e=>i.a.createElement("li",{key:e.title},i.a.createElement("p",{className:"dictMojidict-Word_Title"},e.title),i.a.createElement("p",{className:"dictMojidict-Word_Trans"},e.excerpt))))));t.default=s}}]);