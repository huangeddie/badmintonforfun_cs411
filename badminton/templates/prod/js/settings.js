(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=53)})([function(a,b,c){'use strict';function d(a){return'[object Array]'===k.call(a)}function e(a){return null!==a&&'object'==typeof a}function f(a){return'[object Function]'===k.call(a)}function g(a,b){if(null!==a&&'undefined'!=typeof a)if('object'!=typeof a&&(a=[a]),d(a))for(var c=0,e=a.length;c<e;c++)b.call(null,a[c],c,a);else for(var f in a)Object.prototype.hasOwnProperty.call(a,f)&&b.call(null,a[f],f,a)}function h(){function a(a,c){b[c]='object'==typeof b[c]&&'object'==typeof a?h(b[c],a):a}for(var b={},c=0,d=arguments.length;c<d;c++)g(arguments[c],a);return b}var i=c(3),j=c(12),k=Object.prototype.toString;a.exports={isArray:d,isArrayBuffer:function(a){return'[object ArrayBuffer]'===k.call(a)},isBuffer:j,isFormData:function(a){return'undefined'!=typeof FormData&&a instanceof FormData},isArrayBufferView:function(a){var b;return b='undefined'!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(a):a&&a.buffer&&a.buffer instanceof ArrayBuffer,b},isString:function(a){return'string'==typeof a},isNumber:function(a){return'number'==typeof a},isObject:e,isUndefined:function(a){return'undefined'==typeof a},isDate:function(a){return'[object Date]'===k.call(a)},isFile:function(a){return'[object File]'===k.call(a)},isBlob:function(a){return'[object Blob]'===k.call(a)},isFunction:f,isStream:function(a){return e(a)&&f(a.pipe)},isURLSearchParams:function(a){return'undefined'!=typeof URLSearchParams&&a instanceof URLSearchParams},isStandardBrowserEnv:function(){return('undefined'==typeof navigator||'ReactNative'!==navigator.product)&&'undefined'!=typeof window&&'undefined'!=typeof document},forEach:g,merge:h,extend:function(c,a,b){return g(a,function(a,d){c[d]=b&&'function'==typeof a?i(a,b):a}),c},trim:function(a){return a.replace(/^\s*/,'').replace(/\s*$/,'')}}},function(a){a.exports=React},function(a,b,c){'use strict';(function(b){function d(a,b){!e.isUndefined(a)&&e.isUndefined(a['Content-Type'])&&(a['Content-Type']=b)}var e=c(0),f=c(14),g={"Content-Type":'application/x-www-form-urlencoded'},h={adapter:function(){var a;return'undefined'==typeof XMLHttpRequest?'undefined'!=typeof b&&(a=c(5)):a=c(5),a}(),transformRequest:[function(a,b){return f(b,'Content-Type'),e.isFormData(a)||e.isArrayBuffer(a)||e.isBuffer(a)||e.isStream(a)||e.isFile(a)||e.isBlob(a)?a:e.isArrayBufferView(a)?a.buffer:e.isURLSearchParams(a)?(d(b,'application/x-www-form-urlencoded;charset=utf-8'),a.toString()):e.isObject(a)?(d(b,'application/json;charset=utf-8'),JSON.stringify(a)):a}],transformResponse:[function(a){if('string'==typeof a)try{a=JSON.parse(a)}catch(a){}return a}],timeout:0,xsrfCookieName:'XSRF-TOKEN',xsrfHeaderName:'X-XSRF-TOKEN',maxContentLength:-1,validateStatus:function(a){return 200<=a&&300>a}};h.headers={common:{Accept:'application/json, text/plain, */*'}},e.forEach(['delete','get','head'],function(a){h.headers[a]={}}),e.forEach(['post','put','patch'],function(a){h.headers[a]=e.merge(g)}),a.exports=h}).call(b,c(4))},function(a){'use strict';a.exports=function(a,b){return function(){for(var c=Array(arguments.length),d=0;d<c.length;d++)c[d]=arguments[d];return a.apply(b,c)}}},function(a){function b(){throw new Error('setTimeout has not been defined')}function c(){throw new Error('clearTimeout has not been defined')}function d(a){if(j===setTimeout)return setTimeout(a,0);if((j===b||!j)&&setTimeout)return j=setTimeout,setTimeout(a,0);try{return j(a,0)}catch(b){try{return j.call(null,a,0)}catch(b){return j.call(this,a,0)}}}function e(a){if(k===clearTimeout)return clearTimeout(a);if((k===c||!k)&&clearTimeout)return k=clearTimeout,clearTimeout(a);try{return k(a)}catch(b){try{return k.call(null,a)}catch(b){return k.call(this,a)}}}function f(){o&&m&&(o=!1,m.length?n=m.concat(n):p=-1,n.length&&g())}function g(){if(!o){var a=d(f);o=!0;for(var b=n.length;b;){for(m=n,n=[];++p<b;)m&&m[p].run();p=-1,b=n.length}m=null,o=!1,e(a)}}function h(a,b){this.fun=a,this.array=b}function i(){}var j,k,l=a.exports={};(function(){try{j='function'==typeof setTimeout?setTimeout:b}catch(a){j=b}try{k='function'==typeof clearTimeout?clearTimeout:c}catch(a){k=c}})();var m,n=[],o=!1,p=-1;l.nextTick=function(a){var b=Array(arguments.length-1);if(1<arguments.length)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];n.push(new h(a,b)),1!==n.length||o||d(g)},h.prototype.run=function(){this.fun.apply(null,this.array)},l.title='browser',l.browser=!0,l.env={},l.argv=[],l.version='',l.versions={},l.on=i,l.addListener=i,l.once=i,l.off=i,l.removeListener=i,l.removeAllListeners=i,l.emit=i,l.prependListener=i,l.prependOnceListener=i,l.listeners=function(){return[]},l.binding=function(){throw new Error('process.binding is not supported')},l.cwd=function(){return'/'},l.chdir=function(){throw new Error('process.chdir is not supported')},l.umask=function(){return 0}},function(a,b,c){'use strict';(function(b){var d=c(0),e=c(15),f=c(17),g=c(18),h=c(19),i=c(6),j='undefined'!=typeof window&&window.btoa&&window.btoa.bind(window)||c(20);a.exports=function(a){return new Promise(function(k,l){var m=a.data,n=a.headers;d.isFormData(m)&&delete n['Content-Type'];var o=new XMLHttpRequest,p='onreadystatechange',q=!1;if('test'===b.env.NODE_ENV||'undefined'==typeof window||!window.XDomainRequest||'withCredentials'in o||h(a.url)||(o=new window.XDomainRequest,p='onload',q=!0,o.onprogress=function(){},o.ontimeout=function(){}),a.auth){var r=a.auth.username||'',s=a.auth.password||'';n.Authorization='Basic '+j(r+':'+s)}if(o.open(a.method.toUpperCase(),f(a.url,a.params,a.paramsSerializer),!0),o.timeout=a.timeout,o[p]=function(){if(o&&(4===o.readyState||q)&&(0!==o.status||o.responseURL&&0===o.responseURL.indexOf('file:'))){var b='getAllResponseHeaders'in o?g(o.getAllResponseHeaders()):null,c=a.responseType&&'text'!==a.responseType?o.response:o.responseText,d={data:c,status:1223===o.status?204:o.status,statusText:1223===o.status?'No Content':o.statusText,headers:b,config:a,request:o};e(k,l,d),o=null}},o.onerror=function(){l(i('Network Error',a,null,o)),o=null},o.ontimeout=function(){l(i('timeout of '+a.timeout+'ms exceeded',a,'ECONNABORTED',o)),o=null},d.isStandardBrowserEnv()){var t=c(21),u=(a.withCredentials||h(a.url))&&a.xsrfCookieName?t.read(a.xsrfCookieName):void 0;u&&(n[a.xsrfHeaderName]=u)}if('setRequestHeader'in o&&d.forEach(n,function(a,b){'undefined'==typeof m&&'content-type'===b.toLowerCase()?delete n[b]:o.setRequestHeader(b,a)}),a.withCredentials&&(o.withCredentials=!0),a.responseType)try{o.responseType=a.responseType}catch(b){if('json'!==a.responseType)throw b}'function'==typeof a.onDownloadProgress&&o.addEventListener('progress',a.onDownloadProgress),'function'==typeof a.onUploadProgress&&o.upload&&o.upload.addEventListener('progress',a.onUploadProgress),a.cancelToken&&a.cancelToken.promise.then(function(a){o&&(o.abort(),l(a),o=null)}),void 0===m&&(m=null),o.send(m)})}}).call(b,c(4))},function(a,b,c){'use strict';var d=c(16);a.exports=function(a,b,c,e,f){var g=new Error(a);return d(g,b,c,e,f)}},function(a){'use strict';a.exports=function(a){return!!(a&&a.__CANCEL__)}},function(a){'use strict';function b(a){this.message=a}b.prototype.toString=function(){return'Cancel'+(this.message?': '+this.message:'')},b.prototype.__CANCEL__=!0,a.exports=b},function(a){a.exports=ReactDOM},function(a,b,c){a.exports=c(11)},function(a,b,c){'use strict';function d(a){var b=new g(a),c=f(g.prototype.request,b);return e.extend(c,g.prototype,b),e.extend(c,b),c}var e=c(0),f=c(3),g=c(13),h=c(2),i=d(h);i.Axios=g,i.create=function(a){return d(e.merge(h,a))},i.Cancel=c(8),i.CancelToken=c(27),i.isCancel=c(7),i.all=function(a){return Promise.all(a)},i.spread=c(28),a.exports=i,a.exports.default=i},function(a){function b(a){return!!a.constructor&&'function'==typeof a.constructor.isBuffer&&a.constructor.isBuffer(a)}function c(a){return'function'==typeof a.readFloatLE&&'function'==typeof a.slice&&b(a.slice(0,0))}a.exports=function(a){return null!=a&&(b(a)||c(a)||!!a._isBuffer)}},function(a,b,c){'use strict';function d(a){this.defaults=a,this.interceptors={request:new g,response:new g}}var e=c(2),f=c(0),g=c(22),h=c(23);d.prototype.request=function(a){'string'==typeof a&&(a=f.merge({url:arguments[0]},arguments[1])),a=f.merge(e,{method:'get'},this.defaults,a),a.method=a.method.toLowerCase();var b=[h,void 0],c=Promise.resolve(a);for(this.interceptors.request.forEach(function(a){b.unshift(a.fulfilled,a.rejected)}),this.interceptors.response.forEach(function(a){b.push(a.fulfilled,a.rejected)});b.length;)c=c.then(b.shift(),b.shift());return c},f.forEach(['delete','get','head','options'],function(a){d.prototype[a]=function(b,c){return this.request(f.merge(c||{},{method:a,url:b}))}}),f.forEach(['post','put','patch'],function(a){d.prototype[a]=function(b,c,d){return this.request(f.merge(d||{},{method:a,url:b,data:c}))}}),a.exports=d},function(a,b,c){'use strict';var d=c(0);a.exports=function(a,b){d.forEach(a,function(c,d){d!==b&&d.toUpperCase()===b.toUpperCase()&&(a[b]=c,delete a[d])})}},function(a,b,c){'use strict';var d=c(6);a.exports=function(a,b,c){var e=c.config.validateStatus;c.status&&e&&!e(c.status)?b(d('Request failed with status code '+c.status,c.config,null,c.request,c)):a(c)}},function(a){'use strict';a.exports=function(a,b,c,d,e){return a.config=b,c&&(a.code=c),a.request=d,a.response=e,a}},function(a,b,c){'use strict';function d(a){return encodeURIComponent(a).replace(/%40/gi,'@').replace(/%3A/gi,':').replace(/%24/g,'$').replace(/%2C/gi,',').replace(/%20/g,'+').replace(/%5B/gi,'[').replace(/%5D/gi,']')}var e=c(0);a.exports=function(a,b,c){if(!b)return a;var f;if(c)f=c(b);else if(e.isURLSearchParams(b))f=b.toString();else{var g=[];e.forEach(b,function(a,b){null===a||'undefined'==typeof a||(e.isArray(a)?b+='[]':a=[a],e.forEach(a,function(a){e.isDate(a)?a=a.toISOString():e.isObject(a)&&(a=JSON.stringify(a)),g.push(d(b)+'='+d(a))}))}),f=g.join('&')}return f&&(a+=(-1===a.indexOf('?')?'?':'&')+f),a}},function(a,b,c){'use strict';var d=c(0),e=['age','authorization','content-length','content-type','etag','expires','from','host','if-modified-since','if-unmodified-since','last-modified','location','max-forwards','proxy-authorization','referer','retry-after','user-agent'];a.exports=function(a){var b,c,f,g={};return a?(d.forEach(a.split('\n'),function(a){if(f=a.indexOf(':'),b=d.trim(a.substr(0,f)).toLowerCase(),c=d.trim(a.substr(f+1)),b){if(g[b]&&0<=e.indexOf(b))return;g[b]='set-cookie'===b?(g[b]?g[b]:[]).concat([c]):g[b]?g[b]+', '+c:c}}),g):g}},function(a,b,c){'use strict';var d=c(0);a.exports=d.isStandardBrowserEnv()?function(){function a(a){var b=a;return c&&(e.setAttribute('href',b),b=e.href),e.setAttribute('href',b),{href:e.href,protocol:e.protocol?e.protocol.replace(/:$/,''):'',host:e.host,search:e.search?e.search.replace(/^\?/,''):'',hash:e.hash?e.hash.replace(/^#/,''):'',hostname:e.hostname,port:e.port,pathname:'/'===e.pathname.charAt(0)?e.pathname:'/'+e.pathname}}var b,c=/(msie|trident)/i.test(navigator.userAgent),e=document.createElement('a');return b=a(window.location.href),function(c){var e=d.isString(c)?a(c):c;return e.protocol===b.protocol&&e.host===b.host}}():function(){return function(){return!0}}()},function(a){'use strict';function b(){this.message='String contains an invalid character'}b.prototype=new Error,b.prototype.code=5,b.prototype.name='InvalidCharacterError',a.exports=function(a){for(var c,d,e=a+'',f='',g=0,h='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';e.charAt(0|g)||(h='=',g%1);f+=h.charAt(63&c>>8-8*(g%1))){if(d=e.charCodeAt(g+=3/4),255<d)throw new b;c=c<<8|d}return f}},function(a,b,c){'use strict';var d=c(0);a.exports=d.isStandardBrowserEnv()?function(){return{write:function(a,b,c,e,f,g){var h=[];h.push(a+'='+encodeURIComponent(b)),d.isNumber(c)&&h.push('expires='+new Date(c).toGMTString()),d.isString(e)&&h.push('path='+e),d.isString(f)&&h.push('domain='+f),!0===g&&h.push('secure'),document.cookie=h.join('; ')},read:function(a){var b=document.cookie.match(new RegExp('(^|;\\s*)('+a+')=([^;]*)'));return b?decodeURIComponent(b[3]):null},remove:function(a){this.write(a,'',Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(a,b,c){'use strict';function d(){this.handlers=[]}var e=c(0);d.prototype.use=function(a,b){return this.handlers.push({fulfilled:a,rejected:b}),this.handlers.length-1},d.prototype.eject=function(a){this.handlers[a]&&(this.handlers[a]=null)},d.prototype.forEach=function(a){e.forEach(this.handlers,function(b){null!==b&&a(b)})},a.exports=d},function(a,b,c){'use strict';function d(a){a.cancelToken&&a.cancelToken.throwIfRequested()}var e=c(0),f=c(24),g=c(7),h=c(2),i=c(25),j=c(26);a.exports=function(a){d(a),a.baseURL&&!i(a.url)&&(a.url=j(a.baseURL,a.url)),a.headers=a.headers||{},a.data=f(a.data,a.headers,a.transformRequest),a.headers=e.merge(a.headers.common||{},a.headers[a.method]||{},a.headers||{}),e.forEach(['delete','get','head','post','put','patch','common'],function(b){delete a.headers[b]});var b=a.adapter||h.adapter;return b(a).then(function(b){return d(a),b.data=f(b.data,b.headers,a.transformResponse),b},function(b){return g(b)||(d(a),b&&b.response&&(b.response.data=f(b.response.data,b.response.headers,a.transformResponse))),Promise.reject(b)})}},function(a,b,c){'use strict';var d=c(0);a.exports=function(a,b,c){return d.forEach(c,function(c){a=c(a,b)}),a}},function(a){'use strict';a.exports=function(a){return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(a)}},function(a){'use strict';a.exports=function(a,b){return b?a.replace(/\/+$/,'')+'/'+b.replace(/^\/+/,''):a}},function(a,b,c){'use strict';function d(a){if('function'!=typeof a)throw new TypeError('executor must be a function.');var b;this.promise=new Promise(function(a){b=a});var c=this;a(function(a){c.reason||(c.reason=new e(a),b(c.reason))})}var e=c(8);d.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},d.source=function(){var a,b=new d(function(b){a=b});return{token:b,cancel:a}},a.exports=d},function(a){'use strict';a.exports=function(a){return function(b){return a.apply(null,b)}}},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});const d=c(1);b.Option=class{constructor(a,b){this.value=a,this.display=b}};const e='select-check-fade-out';class f extends d.Component{render(){return d.createElement('span',{className:'select'},this.props.options.map((a,b)=>d.createElement(d.Fragment,null,d.createElement('input',{className:'select-hidden',key:b,id:this.props.name+b,value:a.value,name:this.props.name,type:'radio',onChange:this.props.onChange}),d.createElement('label',{className:'select-label',key:-1*b-1,htmlFor:this.props.name+b},a.display))))}}class g extends d.Component{constructor(a){super(a),this.change=this.change.bind(this),this.handleClickOutside=this.handleClickOutside.bind(this),this.lazyAnimationAdder=this.lazyAnimationAdder.bind(this),this._decideInitialStatus=this._decideInitialStatus.bind(this);const b=this._decideInitialStatus();this.state={status:b}}_decideInitialStatus(){if(this.props.defaultValue){const a=this.props.options.find((a)=>a.value===this.props.defaultValue);return a?a.display:''}return this.props.options[0].display}componentDidMount(){document.addEventListener('mousedown',this.handleClickOutside);this.scrollDiv.style.height=30+'px',this.interval=setInterval(()=>{const a=this.innerDiv.scrollTop/(this.innerDiv.scrollHeight-this.innerDiv.clientHeight),b=this.innerDiv.scrollTop*(1+a)+2;this.scrollDiv.style.top=''+b+'px'},20);const a=(a)=>{const b=this.selectDiv.getBoundingClientRect(),c=.2,d=b.bottom-b.top,e=b.bottom-c*d,f=b.top+c*d,g=Math.max(Math.min(a.clientY,e),f);this.innerDiv.scrollTop=(g-f)/(e-f)*(this.innerDiv.scrollHeight-this.innerDiv.clientHeight)};this.scrollDiv.addEventListener('mousedown',function(){window.addEventListener('mousemove',a,!0)},!1),window.addEventListener('mouseup',function(){window.removeEventListener('mousemove',a,!0)},!1)}componentWillUnmount(){document.removeEventListener('mousedown',this.handleClickOutside),clearInterval(this.interval)}handleClickOutside(a){this.inputDiv&&!this.wrapper.contains(a.target)&&(this.inputDiv.checked=!1)}lazyAnimationAdder(){this.inputDiv.checked&&!this.selectDiv.classList.contains(e)&&this.selectDiv.classList.add(e)}change(a){const b=a.target;this.props.onChange&&this.props.onChange(b.value);const c=document.querySelector('label[for="'+b.id+'"]');this.setState({status:c.innerHTML}),this.inputDiv.checked=!1}render(){return d.createElement('div',{className:'select-wrapper-div',ref:(a)=>this.wrapper=a},d.createElement('input',{className:'select-hidden select-check-toggle',id:this.props.name+'-toggle',name:this.props.name,onChange:this.lazyAnimationAdder,type:'checkbox',ref:(a)=>this.inputDiv=a}),d.createElement('label',{className:'select-label select-toggle',htmlFor:this.props.name+'-toggle'},d.createElement('span',{ref:(a)=>this.titleSpan=a,className:'select-title-text'},this.state.status),d.createElement('b',{className:'select-arrow'})),d.createElement('div',{className:'select-div',ref:(a)=>this.selectDiv=a},d.createElement('div',{className:'inner-select-div',ref:(a)=>this.innerDiv=a},d.createElement(f,{options:this.props.options,name:this.props.name,onChange:this.change}),d.createElement('div',{className:'select-scroll',ref:(a)=>this.scrollDiv=a}))))}}b.Select=g},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});const d=c(1),e='popup-disabled';b.PopupProps=class{};class f extends d.Component{constructor(a){super(a),this.close=this.close.bind(this)}componentDidMount(){this.screenDiv=document.createElement('div'),this.screenDiv.className='popup-screen';const a=document.querySelector('body');a.appendChild(this.screenDiv),a.classList.add(e)}componentWillUnmount(){const a=document.querySelector('body');a.removeChild(this.screenDiv),a.classList.remove(e)}close(){this.wrapperDiv.classList.add('popup-fade'),this.screenDiv.classList.add('popup-screen-fade');const a={count:0},b=()=>{1==a.count?this.props.callback():a.count+=1};this.wrapperDiv.addEventListener('animationend',b),this.screenDiv.addEventListener('animationend',b)}render(){return d.createElement('div',{className:'popup-div',ref:(a)=>this.wrapperDiv=a},d.createElement('div',{className:'grid row'},d.createElement('div',{className:'row-1'},d.createElement('div',{className:'col-11 popup-title-div'},d.createElement('h4',{className:'popup-title'},this.props.title))),d.createElement('div',{className:'row-1'},d.createElement('div',{className:'col-offset-1 col-11'},d.createElement('p',{className:'popup-message'},this.props.message))),d.createElement('div',{className:'row-offset-10'},d.createElement('div',{className:'col-offset-es-9 col-es-5 row-offset-es-9 col-offset-9 row-offset-11'},d.createElement('button',{className:'popup-button row-2',onClick:this.close},'\u2714')))))}}b.Popup=f},,,,function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});const d=c(1);class e extends d.Component{constructor(a){super(a),this.onChange=this.onChange.bind(this),this.selected=!!this.props.checked}componentDidMount(){this.selected&&(this.inputElem.checked=!0)}onChange(a){this.selected=!this.selected,this.props.change(a)}render(){return d.createElement('label',{className:'switch'},d.createElement('input',{type:'checkbox',onChange:this.onChange,ref:(a)=>this.inputElem=a}),d.createElement('span',{className:'slider round'}))}}b.Slider=e},,,,,,,,,,,,,,,,,,,function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});const d=c(1),e=c(9),f=c(54);e.render(d.createElement(f.SettingsView,null),document.querySelector('settings-view'))},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});const d=c(1),e=c(10),f=c(34),g=c(30),h=c(29);var i;(function(a){a[a.Loading=0]='Loading',a[a.Loaded=1]='Loaded'})(i||(i={}));class j extends d.Component{render(){const a=this.props.data.options.map((a)=>new h.Option(a.value,a.name));return d.createElement(h.Select,{name:this.props.data.name,defaultValue:this.props.data.value,onChange:()=>{},options:a})}}class k extends d.Component{render(){return d.createElement(f.Slider,{change:()=>{},checked:this.props.data.value})}}class l extends d.Component{render(){return d.createElement('input',{type:'text',name:this.props.data.name,defaultValue:this.props.data.value})}}class m extends d.Component{constructor(a){super(a),this.decideComponent=this.decideComponent.bind(this),this.state={popup:null}}decideComponent(a,b){if('bool'===a.type)return d.createElement(k,{data:a,key:b});return'option'===a.type?d.createElement(j,{data:a,key:b}):'text'===a.type?d.createElement(l,{data:a,key:b}):void 0}render(){return d.createElement(d.Fragment,null,d.createElement('div',{className:'grid'},this.props.data.map((a,b)=>d.createElement('div',{className:'row',key:b},d.createElement('div',{className:'col-6 col-es-12'},d.createElement('h2',null,a.display_name)),d.createElement('div',{className:'col-6 col-es-12'},this.decideComponent(a,b)))),d.createElement('button',{onClick:()=>this.setState({popup:d.createElement(g.Popup,{title:'Saved',message:'Your data has been saved',callback:()=>this.setState({popup:null})})})},'Save')),this.state.popup&&this.state.popup)}}class n extends d.Component{constructor(a){super(a),this.deleteMember=this.deleteMember.bind(this),this.deleteCourt=this.deleteCourt.bind(this),this.state={data:null}}componentDidMount(){e.default.get('/mock/board_settings.json').then((a)=>{this.setState({data:a.data,memberTypes:a.data.memberTypes.map((a)=>new h.Option(a,a)),courtTypes:a.data.courtTypes.map((a)=>new h.Option(a,a))})}).catch(()=>{})}deleteMember(){}deleteCourt(){}render(){return null===this.state.data?d.createElement('div',null,d.createElement('h3',null,'Board Member only Views'),d.createElement('p',null,'Loading')):d.createElement('div',{className:'grid'},d.createElement('h2',null,'Board Member Options'),d.createElement('h3',null,'Members'),this.state.data.members.map((a,b)=>d.createElement('div',{key:b,className:'row'},d.createElement('div',{className:'col-5 col-es-12'},d.createElement('h4',null,a.name)),d.createElement('div',{className:'col-4 col-es-12'},d.createElement(h.Select,{options:this.state.memberTypes,defaultValue:a.type,onChange:(a)=>{console.log(a)},name:a.id})),d.createElement('div',{className:'col-3 col-es-12'},d.createElement('button',null,'Delete')))),d.createElement('h3',null,'Courts'),this.state.data.courts.map((a,b)=>d.createElement('div',{key:b,className:'row'},d.createElement('div',{className:'col-5 col-es-12'},d.createElement('h4',null,a.name)),d.createElement('div',{className:'col-4 col-es-12'},d.createElement(h.Select,{options:this.state.courtTypes,defaultValue:a.type,onChange:(a)=>{console.log(a)},name:'courts'+b})),d.createElement('div',{className:'col-3 col-es-12'},d.createElement('button',null,'Delete')))))}}class o extends d.Component{constructor(a){super(a),this.switch=this.switch.bind(this),this.performRequest=this.performRequest.bind(this),this.state={regular_settings:null,board_settings:null,loading:!0}}performRequest(){e.default.get('/api/settings').then((a)=>{this.setState({loading:!1,regular_settings:d.createElement(m,{data:a.data.regular}),board_settings:null})}).catch(()=>{})}componentDidMount(){this.performRequest()}switch(){!0===this.state.loading||this.performRequest()}render(){return d.createElement('div',{className:'election-view'},d.createElement('h2',null,'Toggle Board View'),null!==this.state.regular_settings&&this.state.regular_settings,null!==this.state.board_settings&&this.state.board_settings)}}b.SettingsView=o}]);
//# sourceMappingURL=settings.js.map