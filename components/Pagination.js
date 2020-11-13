!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("../utils/dev-mode"),require("../utils/debug"),require("./Icon"),require("./Button"),require("../utils/v-node-filter"),require("./Select"));else if("function"==typeof define&&define.amd)define(["../utils/dev-mode","../utils/debug","./Icon","./Button","../utils/v-node-filter","./Select"],t);else{var n="object"==typeof exports?t(require("../utils/dev-mode"),require("../utils/debug"),require("./Icon"),require("./Button"),require("../utils/v-node-filter"),require("./Select")):t(e["../utils/dev-mode"],e["../utils/debug"],e["./Icon"],e["./Button"],e["../utils/v-node-filter"],e["./Select"]);for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}("undefined"!=typeof self?self:this,function(e,t,n,o,r,i){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=843)}({0:function(e,t,n){"use strict";t.a=function(e,t,n,o,r,i,s,a){var u,c="function"==typeof e?e.options:e;t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0);o&&(c.functional=!0);i&&(c._scopeId="data-v-"+i);s?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},c._ssrRegister=u):r&&(u=a?function(){r.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:r);if(u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(e,t){return u.call(t),l(e,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,u):[u]}return{exports:e,options:c}}},1:function(t,n){t.exports=e},2:function(e,n){e.exports=t},3:function(e,t){e.exports=n},385:function(e,t,n){"use strict";var o=n(386);t.a=o.a},386:function(e,t,n){"use strict";var o=n(2),r=(n.n(o),n(7)),i=(n.n(r),n(3)),s=(n.n(i),n(847)),a=(n.n(s),n(8)),u=n.n(a);t.a={name:"OPagination",components:{VnodeFilter:u.a,OButton:r.OButton,OIcon:i.OIcon,OSelect:s.OSelect},model:{prop:"currentPage",event:"pagination:update"},props:{currentPage:{type:Number,default:1,validator:e=>Number.isInteger(e)&&e>0},pages:{type:Number,required:!0,validator:e=>Number.isInteger(e)&&e>0},selectable:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},computed:{pageOptions(){return Array(this.pages).fill().map((e,t)=>({value:t+1,label:t+1}))},onPage:{get(){return this.currentPage},set(e){this.currentPage!==e&&e>0&&e<=this.pages&&this.$emit("pagination:update",e)}},nextDisabled(){return this.disabled||this.onPage===this.pages}},watch:{currentPage(){this.enforceBound()},pages(){this.enforceBound()}},created(){this.enforceBound()},methods:{nextPage(){this.onPage+=1},prevPage(){this.onPage-=1},enforceBound(){this.currentPage>this.pages&&this.$emit("pagination:update",this.pages)},componentMismatch(){Object(o.throwError)("Pagination","You can only use OButton components in the next slot")},checkSlotLen(e){e.length>1&&Object(o.throwError)("Pagination","You can only include one element in the next slot")}}}},387:function(e,t){e.exports={Pagination:"🚀0-0-01LWCw",Button:"🚀0-0-035gZr",Select:"🚀0-0-07g9_x"}},7:function(e,t){e.exports=o},8:function(e,t){e.exports=r},843:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=(n.n(o),n(844));n.d(t,"OPagination",function(){return r.a})},844:function(e,t,n){"use strict";var o=n(845),r=n(385),i=n(848),s=n(0);var a=Object(s.a)(r.a,o.a,o.b,!1,function(e){this.$s=i.default.locals||i.default},null,null);t.a=a.exports},845:function(e,t,n){"use strict";var o=n(846);n.d(t,"a",function(){return o.a}),n.d(t,"b",function(){return o.b})},846:function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"b",function(){return r});var o=function(){var e,t=this,n=t.$createElement,o=t._self._c||n;return o("div",{class:[t.$s.Pagination,(e={},e[t.$s.selectable]=t.selectable,e)]},[o("o-button",{class:t.$s.Button,attrs:{disabled:t.disabled||1===t.onPage},on:{click:t.prevPage}},[o("o-icon",{attrs:{name:"arrow-left"}})],1),t._v(" "),t.selectable?o("o-select",{class:t.$s.Select,attrs:{options:t.pageOptions,disabled:t.disabled},model:{value:t.onPage,callback:function(e){t.onPage=e},expression:"onPage"}}):t._e(),t._v(" "),o("vnode-filter",{attrs:{"enforce-component":t.$options.components.OButton},on:{componentMismatch:t.componentMismatch,completed:t.checkSlotLen}},[t._t("next",[o("o-button",{class:t.$s.Button,attrs:{disabled:t.nextDisabled},on:{click:t.nextPage}},[o("o-icon",{attrs:{name:"arrow-right"}})],1)],{nextPage:t.nextPage,disabled:t.nextDisabled})],2)],1)},r=[]},847:function(e,t){e.exports=i},848:function(e,t,n){"use strict";var o=n(387),r=n.n(o);n.d(t,"default",function(){return r.a})}})});
//# sourceMappingURL=Pagination.js.map