!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("../utils/dev-mode"),require("../utils/debug"),require("../utils/NoClickFocus"));else if("function"==typeof define&&define.amd)define(["../utils/dev-mode","../utils/debug","../utils/NoClickFocus"],e);else{var n="object"==typeof exports?e(require("../utils/dev-mode"),require("../utils/debug"),require("../utils/NoClickFocus")):e(t["../utils/dev-mode"],t["../utils/debug"],t["../utils/NoClickFocus"]);for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}("undefined"!=typeof self?self:this,function(t,e,n){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=949)}({0:function(t,e,n){"use strict";e.a=function(t,e,n,i,r,o,a,s){var u,c="function"==typeof t?t.options:t;e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0);i&&(c.functional=!0);o&&(c._scopeId="data-v-"+o);a?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},c._ssrRegister=u):r&&(u=s?function(){r.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:r);if(u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(t,e){return u.call(e),l(t,e)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,u):[u]}return{exports:t,options:c}}},1:function(e,n){e.exports=t},103:function(t,e,n){var i=n(5),r=n(104),o=n(105),a="Expected a function",s=Math.max,u=Math.min;t.exports=function(t,e,n){var c,l,f,d,p,v,h=0,b=!1,g=!1,x=!0;if("function"!=typeof t)throw new TypeError(a);function y(e){var n=c,i=l;return c=l=void 0,h=e,d=t.apply(i,n)}function m(t){var n=t-v;return void 0===v||n>=e||n<0||g&&t-h>=f}function _(){var t=r();if(m(t))return T(t);p=setTimeout(_,function(t){var n=e-(t-v);return g?u(n,f-(t-h)):n}(t))}function T(t){return p=void 0,x&&c?y(t):(c=l=void 0,d)}function S(){var t=r(),n=m(t);if(c=arguments,l=this,v=t,n){if(void 0===p)return function(t){return h=t,p=setTimeout(_,e),b?y(t):d}(v);if(g)return clearTimeout(p),p=setTimeout(_,e),y(v)}return void 0===p&&(p=setTimeout(_,e)),d}return e=o(e)||0,i(n)&&(b=!!n.leading,f=(g="maxWait"in n)?s(o(n.maxWait)||0,e):f,x="trailing"in n?!!n.trailing:x),S.cancel=function(){void 0!==p&&clearTimeout(p),h=0,c=v=l=p=void 0},S.flush=function(){return void 0===p?d:T(r())},S}},104:function(t,e,n){var i=n(4);t.exports=function(){return i.Date.now()}},105:function(t,e,n){var i=n(5),r=n(30),o=NaN,a=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,c=/^0o[0-7]+$/i,l=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(r(t))return o;if(i(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=i(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(a,"");var n=u.test(t);return n||c.test(t)?l(t.slice(2),n?2:8):s.test(t)?o:+t}},11:function(t,e,n){var i=n(4).Symbol;t.exports=i},12:function(t,e,n){var i=n(11),r=n(26),o=n(27),a="[object Null]",s="[object Undefined]",u=i?i.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?s:a:u&&u in Object(t)?r(t):o(t)}},127:function(t,e,n){"use strict";const i=Symbol("TabKey");e.a=i},19:function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},2:function(t,n){t.exports=e},20:function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(e,n(19))},22:function(t,e,n){!function(e,n){t.exports=n()}(0,function(){"use strict";return{name:"pseudo-window",props:{document:Boolean},render:function(){var t=this.$slots.default;return t&&1===t.length?t[0]:t},data:function(){return{handlers:[]}},mounted:function(){var t=this;Object.entries(this.$listeners).forEach(function(e){var n=t.normalizeEvent(t.document?window.document:window,e[0],e[1]);n.target.addEventListener(n.name,n.handler,n.opts),t.handlers.push(n)})},destroyed:function(){for(;this.handlers.length;){var t=this.handlers.shift();t.target.removeEventListener(t.name,t.handler,t.opts)}},methods:{normalizeEvent:function(t,e,n){var i=e,r="&"===i[0],o="~"===(i=r?i.slice(1):i)[0],a="!"===(i=o?i.slice(1):i)[0];return{target:t,name:i=a?i.slice(1):i,handler:n,opts:{once:o,capture:a,passive:r}}}}}})},26:function(t,e,n){var i=n(11),r=Object.prototype,o=r.hasOwnProperty,a=r.toString,s=i?i.toStringTag:void 0;t.exports=function(t){var e=o.call(t,s),n=t[s];try{t[s]=void 0;var i=!0}catch(t){}var r=a.call(t);return i&&(e?t[s]=n:delete t[s]),r}},27:function(t,e){var n=Object.prototype.toString;t.exports=function(t){return n.call(t)}},30:function(t,e,n){var i=n(12),r=n(9),o="[object Symbol]";t.exports=function(t){return"symbol"==typeof t||r(t)&&i(t)==o}},4:function(t,e,n){var i=n(20),r="object"==typeof self&&self&&self.Object===Object&&self,o=i||r||Function("return this")();t.exports=o},42:function(t,e){t.exports=n},473:function(t,e,n){"use strict";var i=n(474);e.a=i.a},474:function(t,e,n){"use strict";var i=n(62),r=n.n(i),o=n(22),a=n.n(o),s=n(953),u=n(127);e.a={name:"OTabs",inject:{api:{from:u.a,default:void 0}},components:{TabControl:s.a,PseudoWindow:a.a},model:{prop:"tabIdx",event:"tabs:change"},props:{align:{type:String,default:"left",validator:t=>["left","center","right","stretch"].includes(t)},tabIdx:{type:Number,validator:t=>Number.isInteger(t)&&t>=0,default:void 0},position:{type:String,default:"top",validator:t=>["top","left"].includes(t)}},data(){const t=this;return{state:{tabRegister:[],_tabIdx:0,position:this.position,get currentTabIdx(){return void 0!==t.tabIdx?t.tabIdx:this._tabIdx},set currentTabIdx(e){t.$emit("tabs:change",e),this._tabIdx=e}},slider:{width:0,top:"auto",height:"auto",right:"auto"}}},provide(){return{[u.a]:this.state}},watch:{"state.currentTabIdx":"updateSlider"},created(){this.onResize=r()(this.updateSlider,100)},updated(){this.updateSlider()},methods:{updateSlider(){const t=this.$refs.tabLabel[this.state.currentTabIdx].$el;let e,n;"top"===this.position?(this.slider.left="".concat(t.offsetLeft,"px"),this.slider.width="".concat(t.offsetWidth,"px"),e="bottom",n="height"):(this.slider.top="".concat(t.offsetTop,"px"),this.slider.height="".concat(t.offsetHeight,"px"),e="right",n="width"),this.slider["".concat(e)]="-1px",this.slider["".concat(n)]="4px"}}}},475:function(t,e,n){"use strict";var i=n(476);e.a=i.a},476:function(t,e,n){"use strict";var i=n(6),r=n.n(i),o=n(42),a=n.n(o);e.a={name:"OTabControl",components:{NoClickFocus:a.a},props:{active:{type:Boolean,default:!1},align:{type:String,default:void 0},labelNode:{type:null,default:void 0},position:{type:String,default:void 0}},render(){const t=arguments[0],{$s:e}=this;return t("a",r()([{class:[e.TabControl,e["align_".concat(this.align)],e["position_".concat(this.position)],{[e.active]:this.active}]},{on:this.$listeners},{attrs:{tabindex:"0"}}]),[t("no-click-focus",{class:e.InnerTab},[this.labelNode])])}}},477:function(t,e){t.exports={InnerTab:"🚀0-0-01lFKn",TabControl:"🚀0-0-02Nn9E",active:"🚀0-0-01RSpV",position_top:"🚀0-0-01Q6rv",position_left:"🚀0-0-0ad4oA",align_center:"🚀0-0-0fP7l2",align_right:"🚀0-0-01T7yG",align_stretch:"🚀0-0-0HMuSM"}},478:function(t,e){t.exports={Tabs:"🚀0-0-0h8G-8 🚀0-0-01fyTq",position_left:"🚀0-0-02clLd",Content:"🚀0-0-02P7-T",Controller:"🚀0-0-03HskV",align_stretch:"🚀0-0-03D-qI",position_top:"🚀0-0-02UgQh",align_left:"🚀0-0-01u3SG",align_center:"🚀0-0-0h3RE_",align_right:"🚀0-0-03mWgo",flush:"🚀0-0-0G_G3W",ControllerSlider:"🚀0-0-01pNfc"}},479:function(t,e,n){"use strict";var i=n(480);e.a=i.a},480:function(t,e,n){"use strict";var i=n(2),r=(n.n(i),n(127));e.a={name:"OTabPane",props:{label:{type:String,default:void 0}},inject:{tabState:r.a},data:()=>({data:{labelSlot:null}}),computed:{isActive(){return this.tabState.currentTabIdx===this.tabState.tabRegister.indexOf(this.data)}},created(){this.tabState||Object(i.throwError)("TabPane","Must be used inside of a Tab component"),this.updateLabelSlot(),this.tabState.tabRegister.push(this.data)},updated(){this.updateLabelSlot()},beforeDestroy(){this.tabState.tabRegister.splice(this.tabState.tabRegister.indexOf(this.data),1)},methods:{updateLabelSlot(){this.data.labelSlot=this.$slots.label||this.label}}}},5:function(t,e){t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},6:function(t,e){var n=/^(attrs|props|on|nativeOn|class|style|hook)$/;function i(t,e){return function(){t&&t.apply(this,arguments),e&&e.apply(this,arguments)}}t.exports=function(t){return t.reduce(function(t,e){var r,o,a,s,u;for(a in e)if(r=t[a],o=e[a],r&&n.test(a))if("class"===a&&("string"==typeof r&&(u=r,t[a]=r={},r[u]=!0),"string"==typeof o&&(u=o,e[a]=o={},o[u]=!0)),"on"===a||"nativeOn"===a||"hook"===a)for(s in o)r[s]=i(r[s],o[s]);else if(Array.isArray(r))t[a]=r.concat(o);else if(Array.isArray(o))t[a]=[r].concat(o);else for(s in o)r[s]=o[s];else t[a]=e[a];return t},{})}},62:function(t,e,n){var i=n(103),r=n(5),o="Expected a function";t.exports=function(t,e,n){var a=!0,s=!0;if("function"!=typeof t)throw new TypeError(o);return r(n)&&(a="leading"in n?!!n.leading:a,s="trailing"in n?!!n.trailing:s),i(t,e,{leading:a,maxWait:e,trailing:s})}},9:function(t,e){t.exports=function(t){return null!=t&&"object"==typeof t}},949:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),r=(n.n(i),n(950)),o=n(956),a=n(127);n.d(e,"OTabs",function(){return r.a}),n.d(e,"OTabPane",function(){return o.a}),n.d(e,"TabKey",function(){return a.a})},950:function(t,e,n){"use strict";var i=n(951),r=n(473),o=n(955),a=n(0);var s=Object(a.a)(r.a,i.a,i.b,!1,function(t){this.$s=o.default.locals||o.default},null,null);e.a=s.exports},951:function(t,e,n){"use strict";var i=n(952);n.d(e,"a",function(){return i.a}),n.d(e,"b",function(){return i.b})},952:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t,e=this,n=e.$createElement,i=e._self._c||n;return i("div",{class:[e.$s.Tabs,e.$s["position_"+e.position]]},[i("pseudo-window",{on:{"&resize":function(t){return e.onResize(t)}}}),e._v(" "),i("nav",{class:[e.$s.Controller,e.$s["align_"+e.align],e.$s["position_"+e.position],(t={},t[e.$s.flush]=e.api&&e.api.controllerFlush,t)]},[e._l(e.state.tabRegister,function(t,n){return i("tab-control",{key:n,ref:"tabLabel",refInFor:!0,attrs:{active:n===e.state.currentTabIdx,"label-node":t.labelSlot,position:e.position,align:e.align},on:{click:function(t){e.state.currentTabIdx=n},keypress:function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"]))return null;t.preventDefault(),e.state.currentTabIdx=n}}})}),e._v(" "),i("div",{class:e.$s.ControllerSlider,style:e.slider})],2),e._v(" "),i("div",{class:e.$s.Content},[e._t("default")],2)],1)},r=[]},953:function(t,e,n){"use strict";var i=n(475),r=n(954),o=n(0);var a=Object(o.a)(i.a,void 0,void 0,!1,function(t){this.$s=r.default.locals||r.default},null,null);e.a=a.exports},954:function(t,e,n){"use strict";var i=n(477),r=n.n(i);n.d(e,"default",function(){return r.a})},955:function(t,e,n){"use strict";var i=n(478),r=n.n(i);n.d(e,"default",function(){return r.a})},956:function(t,e,n){"use strict";var i=n(957),r=n(479),o=n(0),a=Object(o.a)(r.a,i.a,i.b,!1,null,null,null);e.a=a.exports},957:function(t,e,n){"use strict";var i=n(958);n.d(e,"a",function(){return i.a}),n.d(e,"b",function(){return i.b})},958:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r});var i=function(){var t=this.$createElement;return(this._self._c||t)("div",{directives:[{name:"show",rawName:"v-show",value:this.isActive,expression:"isActive"}]},[this._t("default")],2)},r=[]}})});
//# sourceMappingURL=Tabs.js.map