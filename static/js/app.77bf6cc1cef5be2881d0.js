webpackJsonp([9],{"4ml/":function(e,t){},"6mMw":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var o=n("VU/8")({name:"App"},a,!1,function(e){n("X9c1")},null,null).exports,i=n("/ocq"),l={data:function(){return{src:"https://www.baidu.com",divList:[{color:"tan"},{color:"tomato"},{color:"skyblue"},{color:"pink"},{color:"#39f"},{color:"#910"}],zIndex:1,imgBase64:""}},watch:{imgBase64:function(e){document.querySelector(".wrap").style.background="url("+e+")",document.querySelector(".wrap").style.backgroundSize="100% 100%"}},methods:{uploadImg:function(){var e,t;if("png"===(e=(t=document.getElementById("personsFile").value).substring(t.lastIndexOf(".")+1).toLowerCase())||"jpg"===e||""===e){if(""!=e){var n=n||window.event,r="";n.target.files[0]&&(r=n.target.files[0]),this.getImgFile(r)}}else this.$message.error("上传图片格式不正确，请重新上传")},getImgFile:function(e){var t=this,n=new FileReader;n.onload=function(e){t.imgBase64=e.target.result},n.readAsDataURL(e);var r=new Image;r.src=t.imgBase64,r.onload=function(){t.imgBase64=t.$Utils.Tools.image2Base64(r),t.imgBase64=""}},drag:function(e){var t=this,n=document.querySelector(e);n.onmousedown=function(e){this.style.zIndex=t.zIndex++;var r=(e=e||event).clientX-n.offsetLeft,a=e.clientY-n.offsetTop;document.onmousemove=function(e){var t=(e=e||event).clientX-r,o=e.clientY-a,i=document.documentElement.clientWidth||document.body.clientWidth,l=document.documentElement.clientHeight||document.body.clientHeight;t>i-n.offsetWidth&&(t=i-n.offsetWidth),t<0&&(t=0),o<0&&(o=0),o>l-n.offsetHeight&&(o=l-n.offsetHeight),n.style.left=t+"px",n.style.top=o+"px"},document.onmouseup=function(e){console.log(n.style.left.slice(0,-2),n.style.top.slice(0,-2)),document.onmousemove=null}}}},mounted:function(){var e=this;this.divList.forEach(function(t,n){e.drag(".div"+(n+1))})}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrap"},[n("iframe",{attrs:{src:e.src,frameborder:"0"}}),e._v(" "),e._l(e.divList,function(t,r){return n("div",{key:r,class:"div"+(r+1),style:{background:t.color}},[n("span",[e._v("div "+e._s(r+1))])])}),e._v(" "),n("input",{staticClass:"upload-file-img",attrs:{type:"file",name:"file",id:"personsFile",multiple:"multiple",accept:"image/*"},on:{change:function(t){return e.uploadImg()}}})],2)},staticRenderFns:[]};var s=n("VU/8")(l,u,!1,function(e){n("6mMw")},"data-v-77f4bbfd",null).exports;r.default.use(i.a);var c=new i.a({routes:[{path:"/HelloWorld",name:"HelloWorld",component:s},{path:"/RunBox",name:"RunBox",component:function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"y8H8"))}},{path:"/Index1",name:"Index1",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"uzw/"))}},{path:"/Door",name:"Door",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"neUP"))}},{path:"/Index3",name:"Index3",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"MV75"))}},{path:"/",name:"Cinema",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"ASex"))}},{path:"/Cinema2",name:"Cinema2",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"tkuR"))}},{path:"/DateTime",name:"DateTime",component:function(){return n.e(7).then(n.bind(null,"mTaX"))}}]}),d=n("zL8q"),f=n.n(d),m=(n("tvR6"),n("yKcf"),n("Fd2+")),p=(n("4ml/"),n("//Fk")),h=n.n(p),v=n("mtWM"),g=n.n(v),y=n("NYxO");r.default.use(y.a);new y.a.Store({state:{}});var w=this;g.a.defaults.headers["Content-Type"]="application/json;charset=utf-8";var b=g.a.create({baseURL:"",timeout:1e4});b.interceptors.request.use(function(e){if("get"===e.method&&e.params){var t=e.url+"?"+w.$Utils.Tools.tansParams(e.params);t=t.slice(0,-1),e.params={},e.url=t}return e},function(e){console.log(e),h.a.reject(e)}),b.interceptors.response.use(function(e){var t=parseInt(e.data.code)||200,n=e.data.msg;if(401!==t)return 500===t?h.a.reject(new Error(n)):200!==t?h.a.reject("error"):e.data},function(e){console.log("err"+e);var t=e.message;return"Network Error"==t?t="后端接口连接异常":t.includes("timeout")?t="系统接口请求超时":t.includes("Request failed with status code")&&(t="系统接口"+t.substr(t.length-3)+"异常"),console.log(t),h.a.reject(e)});var I=b,x={dev:""};x.dev="./app";var R={Home:{getData1:function(e){return I.get("https://autumnfish.cn/api/joke/list",{params:e})},getData2:function(e){return I.post("https://autumnfish.cn/api/user/reg",e)}}},E=n("fZjL"),U=n.n(E),_=n("BO1k"),j=n.n(_),B=n("pFYg"),L=n.n(B),T=Object({NODE_ENV:"production"}).VUE_APP_BASE_API,A={Tools:{parseTime:function(e,t){if(0===arguments.length||!e)return null;var n=t||"{y}-{m}-{d} {h}:{i}:{s}",r=void 0;"object"===(void 0===e?"undefined":L()(e))?r=e:("string"==typeof e&&/^[0-9]+$/.test(e)?e=parseInt(e):"string"==typeof e&&(e=e.replace(new RegExp(/-/gm),"/").replace("T"," ").replace(new RegExp(/\.[\d]{3}/gm),"")),"number"==typeof e&&10===e.toString().length&&(e*=1e3),r=new Date(e));var a={y:r.getFullYear(),m:r.getMonth()+1,d:r.getDate(),h:r.getHours(),i:r.getMinutes(),s:r.getSeconds(),a:r.getDay()};return n.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var n=a[t];return"a"===t?["日","一","二","三","四","五","六"][n]:(e.length>0&&n<10&&(n="0"+n),n||0)})},addDateRange:function(e,t,n){var r=e;return r.params="object"!==L()(r.params)||null===r.params||Array.isArray(r.params)?{}:r.params,t=Array.isArray(t)?t:[],void 0===n?(r.params.beginTime=t[0],r.params.endTime=t[1]):(r.params["begin"+n]=t[0],r.params["end"+n]=t[1]),r},download:function(e){window.location.href=T+"/common/download?fileName="+encodeURI(e)+"&delete="+!0},sprintf:function(e){var t=arguments,n=!0,r=1;return e=e.replace(/%s/g,function(){var e=t[r++];return void 0===e?(n=!1,""):e}),n?e:""},praseStrEmpty:function(e){return e&&"undefined"!=e&&"null"!=e?e:""},handleTree:function(e,t,n,r){var a={id:t||"id",parentId:n||"parentId",childrenList:r||"children"},o={},i={},l=[],u=!0,s=!1,c=void 0;try{for(var d,f=j()(e);!(u=(d=f.next()).done);u=!0){var m=d.value,p=m[a.parentId];null==o[p]&&(o[p]=[]),i[m[a.id]]=m,o[p].push(m)}}catch(e){s=!0,c=e}finally{try{!u&&f.return&&f.return()}finally{if(s)throw c}}var h=!0,v=!1,g=void 0;try{for(var y,w=j()(e);!(h=(y=w.next()).done);h=!0){var b=y.value;null==i[b[a.parentId]]&&l.push(b)}}catch(e){v=!0,g=e}finally{try{!h&&w.return&&w.return()}finally{if(v)throw g}}var I=!0,x=!1,R=void 0;try{for(var E,U=j()(l);!(I=(E=U.next()).done);I=!0){_(E.value)}}catch(e){x=!0,R=e}finally{try{!I&&U.return&&U.return()}finally{if(x)throw R}}function _(e){if(null!==o[e[a.id]]&&(e[a.childrenList]=o[e[a.id]]),e[a.childrenList]){var t=!0,n=!1,r=void 0;try{for(var i,l=j()(e[a.childrenList]);!(t=(i=l.next()).done);t=!0){_(i.value)}}catch(e){n=!0,r=e}finally{try{!t&&l.return&&l.return()}finally{if(n)throw r}}}}return l},tansParams:function(e){var t="",n=!0,r=!1,a=void 0;try{for(var o,i=j()(U()(e));!(n=(o=i.next()).done);n=!0){var l=o.value,u=e[l],s=encodeURIComponent(l)+"=";if(null!==u&&void 0!==u)if("object"===(void 0===u?"undefined":L()(u))){var c=!0,d=!1,f=void 0;try{for(var m,p=j()(U()(u));!(c=(m=p.next()).done);c=!0){var h=m.value;if(null!==u[h]&&void 0!==u[h])t+=encodeURIComponent(l+"["+h+"]")+"="+encodeURIComponent(u[h])+"&"}}catch(e){d=!0,f=e}finally{try{!c&&p.return&&p.return()}finally{if(d)throw f}}}else t+=s+encodeURIComponent(u)+"&"}}catch(e){r=!0,a=e}finally{try{!n&&i.return&&i.return()}finally{if(r)throw a}}return t},image2Base64:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.7,n=document.createElement("canvas"),r=1;(e.width>1280||e.height>1280)&&(r=e.width>e.height?1280/e.width:1280/e.height),1!=r&&(e.width*=r,e.height*=r),n.width=e.width,n.height=e.width*(e.height/e.width),n.getContext("2d").drawImage(e,0,0,n.width,n.height);var a=n.toDataURL("image/jpeg",t);return a.length/1024>1e4?this.image2Base64(e,1*(t/2).toFixed(1)):a}}};r.default.prototype.$Api=R,r.default.prototype.$Utils=A,r.default.config.productionTip=!1,r.default.use(f.a),r.default.use(m.a),new r.default({el:"#app",router:c,components:{App:o},template:"<App/>"})},X9c1:function(e,t){},tvR6:function(e,t){},yKcf:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.77bf6cc1cef5be2881d0.js.map