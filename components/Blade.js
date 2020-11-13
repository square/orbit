!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("../utils/dev-mode"),require("../utils/debug"),require("./Icon"),require("./Button"),require("../utils/v-node-filter"),require("../utils/Spacer"),require("./Heading"));else if("function"==typeof define&&define.amd)define(["../utils/dev-mode","../utils/debug","./Icon","./Button","../utils/v-node-filter","../utils/Spacer","./Heading"],e);else{var n="object"==typeof exports?e(require("../utils/dev-mode"),require("../utils/debug"),require("./Icon"),require("./Button"),require("../utils/v-node-filter"),require("../utils/Spacer"),require("./Heading")):e(t["../utils/dev-mode"],t["../utils/debug"],t["./Icon"],t["./Button"],t["../utils/v-node-filter"],t["../utils/Spacer"],t["./Heading"]);for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}("undefined"!=typeof self?self:this,function(t,e,n,r,s,i,o){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=562)}({0:function(t,e,n){"use strict";e.a=function(t,e,n,r,s,i,o,a){var u,c="function"==typeof t?t.options:t;e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0);r&&(c.functional=!0);i&&(c._scopeId="data-v-"+i);o?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},c._ssrRegister=u):s&&(u=a?function(){s.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:s);if(u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(t,e){return u.call(e),l(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,u):[u]}return{exports:t,options:c}}},1:function(e,n){e.exports=t},15:function(t,e){t.exports=i},172:function(t,e,n){"use strict";var r=n(173);e.a=r.a},173:function(t,e,n){"use strict";var r=n(3),s=(n.n(r),n(7)),i=(n.n(s),n(44)),o=(n.n(i),n(64)),a=n(566);e.a={name:"OBlade",components:{OButton:s.OButton,OIcon:r.OIcon,OHeading:i.OHeading,BladeActions:a.a},inject:{bladeLayer:o.a},props:{title:{type:String,required:!0},subtitle:{type:String,default:void 0},backdrop:{type:Boolean,default:!1}},computed:{hasSubtitle(){return this.$slots.subtitle||this.subtitle}},created(){this.bladeLayer.configure({afterClose:t=>this.$emit("close",t)})},methods:{close(t){return this.bladeLayer.close(t)}}}},174:function(t,e,n){"use strict";var r=n(175);e.a=r.a},175:function(t,e,n){"use strict";var r=n(7),s=(n.n(r),n(2)),i=(n.n(s),n(15)),o=n.n(i),a=n(8),u=n.n(a);e.a={components:{VnodeFilter:u.a,Spacer:o.a},provide:()=>({[r.ButtonKey]:{fullWidth:!0}}),data:()=>({OButton:r.OButton}),methods:{onComponentMismatch(){Object(s.throwError)("Blade","Only OButtons are allowed in the actions slot.")},validateNodes(t){s.assert.error(t.length<=2,"Blade","No more than two OButtons allowed in the actions slot.")}}}},176:function(t,e){t.exports={Actions:"🚀0-0-01fedw"}},177:function(t,e){t.exports={Blade:"🚀0-0-03mhE6",backdrop:"🚀0-0-032B16",Header:"🚀0-0-03KQHL",Subtitle:"🚀0-0-01ctJv",CenteringBuffer:"🚀0-0-02gFk6",Title:"🚀0-0-02l_ce 🚀0-0-0QIL1r",Content:"🚀0-0-01jKyI",Footer:"🚀0-0-0geg5t"}},178:function(t,e,n){"use strict";var r=n(571),s=n(179),i=n(577),o=n(0);var a=Object(o.a)(s.a,r.a,r.b,!1,function(t){this.$s=i.default.locals||i.default},null,null);e.a=a.exports},179:function(t,e,n){"use strict";var r=n(180);e.a=r.a},180:function(t,e,n){"use strict";var r=n(2),s=(n.n(r),n(573)),i=n(64);const o=new Map;e.a={name:"OBladeLayer",components:{SlideTransition:s.a},props:{id:{type:null,required:!0}},provide(){return{[i.a]:this.api}},data(){const t=this;return{state:{component:null},settings:{afterClose:null},api:{close:t.close,configure(e){Object.assign(t.settings,e)}}}},watch:{id(t,e){o.delete(e),this.registerLayer()}},beforeMount(){this.registerLayer()},beforeDestroy(){o.delete(this.id)},methods:{registerLayer(){r.assert.error(!o.has(this.id),"BladeLayer","Layer with id ".concat(String(this.id)," already exists")),o.set(this.id,this)},close(t){return this.state.component=null,"function"==typeof this.settings.afterClose&&this.settings.afterClose(t),this.resetSettings(),t},resetSettings(){this.settings={afterClose:null}}},open(t,e){const n=o.get(t);return n.state.component={render:e},n}}},181:function(t,e){t.exports={active:"🚀0-0-03s8LD",hidden:"🚀0-0-0Q2vwH"}},182:function(t,e){t.exports={BladeLayer:"🚀0-0-0iA2nt"}},2:function(t,n){t.exports=e},3:function(t,e){t.exports=n},44:function(t,e){t.exports=o},562:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),s=(n.n(r),n(563)),i=n(178),o=n(578),a=n(64);n.d(e,"BladeAPIProvider",function(){return o.a}),n.d(e,"OBladeLayer",function(){return i.a}),n.d(e,"OBlade",function(){return s.a}),n.d(e,"BladeLayerKey",function(){return a.b})},563:function(t,e,n){"use strict";var r=n(564),s=n(172),i=n(570),o=n(0);var a=Object(o.a)(s.a,r.a,r.b,!1,function(t){this.$s=i.default.locals||i.default},null,null);e.a=a.exports},564:function(t,e,n){"use strict";var r=n(565);n.d(e,"a",function(){return r.a}),n.d(e,"b",function(){return r.b})},565:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return s});var r=function(){var t,e=this,n=e.$createElement,r=e._self._c||n;return r("div",{class:[e.$s.Blade,(t={},t[e.$s.backdrop]=e.backdrop,t)]},[r("header",{class:e.$s.Header},[r("o-button",{class:e.$s.CenteringBuffer,attrs:{variant:"muted"},on:{click:function(t){return e.close(!1)}}},[r("o-icon",{attrs:{name:"x"}})],1),e._v(" "),r("o-heading",{class:e.$s.Title,attrs:{size:"title-1",flush:""}},[e._v("\n\t\t\t"+e._s(e.title)+"\n\t\t")]),e._v(" "),r("div",{class:e.$s.CenteringBuffer})],1),e._v(" "),e.hasSubtitle?r("header",{class:[e.$s.Header,e.$s.Sub]},[e._t("subtitle",[r("o-heading",{class:e.$s.Subtitle,attrs:{size:"title-3",flush:""}},[e._v("\n\t\t\t\t"+e._s(e.subtitle)+"\n\t\t\t")])])],2):e._e(),e._v(" "),r("div",{class:e.$s.Content},[e._t("default")],2),e._v(" "),e.$slots.actions?r("div",{class:e.$s.Footer},[r("blade-actions",[e._t("actions")],2)],1):e._e()])},s=[]},566:function(t,e,n){"use strict";var r=n(567),s=n(174),i=n(569),o=n(0);var a=Object(o.a)(s.a,r.a,r.b,!1,function(t){this.$s=i.default.locals||i.default},null,null);e.a=a.exports},567:function(t,e,n){"use strict";var r=n(568);n.d(e,"a",function(){return r.a}),n.d(e,"b",function(){return r.b})},568:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return s});var r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{class:this.$s.Actions},[e("vnode-filter",{attrs:{"enforce-component":this.OButton,"remove-whitespace":""},on:{componentMismatch:this.onComponentMismatch,completed:this.validateNodes}},[e("spacer",[this._t("default")],2)],1)],1)},s=[]},569:function(t,e,n){"use strict";var r=n(176),s=n.n(r);n.d(e,"default",function(){return s.a})},570:function(t,e,n){"use strict";var r=n(177),s=n.n(r);n.d(e,"default",function(){return s.a})},571:function(t,e,n){"use strict";var r=n(572);n.d(e,"a",function(){return r.a}),n.d(e,"b",function(){return r.b})},572:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return s});var r=function(){var t=this.$createElement,e=this._self._c||t;return e("slide-transition",[this.state.component?e("div",{class:this.$s.BladeLayer},[e(this.state.component,{tag:"component"})],1):this._e()])},s=[]},573:function(t,e,n){"use strict";var r=n(574),s=n(576),i=n(0);var o=Object(i.a)({},r.a,r.b,!0,function(t){this.$s=s.default.locals||s.default},null,null);e.a=o.exports},574:function(t,e,n){"use strict";var r=n(575);n.d(e,"a",function(){return r.a}),n.d(e,"b",function(){return r.b})},575:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return s});var r=function(t,e){return(0,e._c)("transition",{attrs:{"enter-active-class":e.$s.active,"leave-active-class":e.$s.active,"enter-class":e.$s.hidden,"leave-to-class":e.$s.hidden}},[e._t("default")],2)},s=[]},576:function(t,e,n){"use strict";var r=n(181),s=n.n(r);n.d(e,"default",function(){return s.a})},577:function(t,e,n){"use strict";var r=n(182),s=n.n(r);n.d(e,"default",function(){return s.a})},578:function(t,e,n){"use strict";var r=n(178),s=n(64);e.a={data:()=>({bladeLayer:Symbol("bladeLayer")}),provide(){return"hasLayers"in this&&!this.hasLayers?{}:{[s.b]:{open:(...t)=>r.a.open(this.bladeLayer,...t)}}}}},64:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return s});const r=Symbol("Blade"),s=Symbol("Blade")},7:function(t,e){t.exports=r},8:function(t,e){t.exports=s}})});
//# sourceMappingURL=Blade.js.map