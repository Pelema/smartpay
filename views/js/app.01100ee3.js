(function(e){function n(n){for(var i,o,l=n[0],s=n[1],u=n[2],d=0,m=[];d<l.length;d++)o=l[d],Object.prototype.hasOwnProperty.call(t,o)&&t[o]&&m.push(t[o][0]),t[o]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i]);c&&c(n);while(m.length)m.shift()();return r.push.apply(r,u||[]),a()}function a(){for(var e,n=0;n<r.length;n++){for(var a=r[n],i=!0,o=1;o<a.length;o++){var s=a[o];0!==t[s]&&(i=!1)}i&&(r.splice(n--,1),e=l(l.s=a[0]))}return e}var i={},t={app:0},r=[];function o(e){return l.p+"js/"+({about:"about"}[e]||e)+"."+{about:"8904c8ed"}[e]+".js"}function l(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(e){var n=[],a=t[e];if(0!==a)if(a)n.push(a[2]);else{var i=new Promise((function(n,i){a=t[e]=[n,i]}));n.push(a[2]=i);var r,s=document.createElement("script");s.charset="utf-8",s.timeout=120,l.nc&&s.setAttribute("nonce",l.nc),s.src=o(e);var u=new Error;r=function(n){s.onerror=s.onload=null,clearTimeout(d);var a=t[e];if(0!==a){if(a){var i=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;u.message="Loading chunk "+e+" failed.\n("+i+": "+r+")",u.name="ChunkLoadError",u.type=i,u.request=r,a[1](u)}t[e]=void 0}};var d=setTimeout((function(){r({type:"timeout",target:s})}),12e4);s.onerror=s.onload=r,document.head.appendChild(s)}return Promise.all(n)},l.m=e,l.c=i,l.d=function(e,n,a){l.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:a})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,n){if(1&n&&(e=l(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)l.d(a,i,function(n){return e[n]}.bind(null,i));return a},l.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(n,"a",n),n},l.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},l.p="/",l.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=n,s=s.slice();for(var d=0;d<s.length;d++)n(s[d]);var c=u;r.push([0,"chunk-vendors"]),a()})({0:function(e,n,a){e.exports=a("56d7")},"01dd":function(e,n,a){"use strict";a("528d")},"034f":function(e,n,a){"use strict";a("85ec")},"10de":function(e,n){var a={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"registerBusiness"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"name"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"regNumber"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"bizAbbr"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"cell"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"address"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"bizEmail"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"postalAddr"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"bankAccName"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"bankAccNumber"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"bankAccType"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"AccountTypes"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"branchCode"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"registerBusiness"},arguments:[{kind:"Argument",name:{kind:"Name",value:"name"},value:{kind:"Variable",name:{kind:"Name",value:"name"}}},{kind:"Argument",name:{kind:"Name",value:"regNumber"},value:{kind:"Variable",name:{kind:"Name",value:"regNumber"}}},{kind:"Argument",name:{kind:"Name",value:"bizAbbr"},value:{kind:"Variable",name:{kind:"Name",value:"bizAbbr"}}},{kind:"Argument",name:{kind:"Name",value:"cell"},value:{kind:"Variable",name:{kind:"Name",value:"cell"}}},{kind:"Argument",name:{kind:"Name",value:"address"},value:{kind:"Variable",name:{kind:"Name",value:"address"}}},{kind:"Argument",name:{kind:"Name",value:"bizEmail"},value:{kind:"Variable",name:{kind:"Name",value:"bizEmail"}}},{kind:"Argument",name:{kind:"Name",value:"postalAddr"},value:{kind:"Variable",name:{kind:"Name",value:"postalAddr"}}},{kind:"Argument",name:{kind:"Name",value:"bankAccName"},value:{kind:"Variable",name:{kind:"Name",value:"bankAccName"}}},{kind:"Argument",name:{kind:"Name",value:"bankAccNumber"},value:{kind:"Variable",name:{kind:"Name",value:"bankAccNumber"}}},{kind:"Argument",name:{kind:"Name",value:"bankAccType"},value:{kind:"Variable",name:{kind:"Name",value:"bankAccType"}}},{kind:"Argument",name:{kind:"Name",value:"branchCode"},value:{kind:"Variable",name:{kind:"Name",value:"branchCode"}}}],directives:[]}]}}],loc:{start:0,end:757}};a.loc.source={body:"mutation registerBusiness(\r\n        $name: String!,\r\n        $regNumber: String!, \r\n        $bizAbbr: String!,\r\n        $cell: String!,\r\n        $address: String!,\r\n        $bizEmail: String!,\r\n        $postalAddr: String!,\r\n        $bankAccName: String!,\r\n        $bankAccNumber: Int!,\r\n        $bankAccType: AccountTypes!,\r\n        $branchCode: String!\r\n    ) {\r\n            \r\n    registerBusiness(\r\n        name: $name, \r\n        regNumber: $regNumber, \r\n        bizAbbr: $bizAbbr, \r\n        cell: $cell,\r\n        address: $address,\r\n        bizEmail: $bizEmail,\r\n        postalAddr:  $postalAddr,\r\n        bankAccName: $bankAccName,\r\n        bankAccNumber: $bankAccNumber,\r\n        bankAccType: $bankAccType,\r\n        branchCode: $branchCode\r\n    )\r\n}\r\n",name:"GraphQL request",locationOffset:{line:1,column:1}};function i(e,n){if("FragmentSpread"===e.kind)n.add(e.name.value);else if("VariableDefinition"===e.kind){var a=e.type;"NamedType"===a.kind&&n.add(a.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){i(e,n)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){i(e,n)})),e.definitions&&e.definitions.forEach((function(e){i(e,n)}))}var t={};function r(e,n){for(var a=0;a<e.definitions.length;a++){var i=e.definitions[a];if(i.name&&i.name.value==n)return i}}function o(e,n){var a={kind:e.kind,definitions:[r(e,n)]};e.hasOwnProperty("loc")&&(a.loc=e.loc);var i=t[n]||new Set,o=new Set,l=new Set;i.forEach((function(e){l.add(e)}));while(l.size>0){var s=l;l=new Set,s.forEach((function(e){if(!o.has(e)){o.add(e);var n=t[e]||new Set;n.forEach((function(e){l.add(e)}))}}))}return o.forEach((function(n){var i=r(e,n);i&&a.definitions.push(i)})),a}(function(){a.definitions.forEach((function(e){if(e.name){var n=new Set;i(e,n),t[e.name.value]=n}}))})(),e.exports=a,e.exports["registerBusiness"]=o(a,"registerBusiness")},"10ea":function(e,n,a){},"155a":function(e,n,a){},1850:function(e,n,a){"use strict";a("c737")},"2ff6":function(e,n,a){"use strict";a("155a")},"3ec9":function(e,n){var a={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"register"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"username"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"password"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"email"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"register"},arguments:[{kind:"Argument",name:{kind:"Name",value:"username"},value:{kind:"Variable",name:{kind:"Name",value:"username"}}},{kind:"Argument",name:{kind:"Name",value:"password"},value:{kind:"Variable",name:{kind:"Name",value:"password"}}},{kind:"Argument",name:{kind:"Name",value:"email"},value:{kind:"Variable",name:{kind:"Name",value:"email"}}}],directives:[]}]}}],loc:{start:0,end:150}};a.loc.source={body:"mutation register($username: String!, $password: String!, $email: String!) {\r\n    register(username: $username, password: $password, email: $email)\r\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function i(e,n){if("FragmentSpread"===e.kind)n.add(e.name.value);else if("VariableDefinition"===e.kind){var a=e.type;"NamedType"===a.kind&&n.add(a.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){i(e,n)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){i(e,n)})),e.definitions&&e.definitions.forEach((function(e){i(e,n)}))}var t={};function r(e,n){for(var a=0;a<e.definitions.length;a++){var i=e.definitions[a];if(i.name&&i.name.value==n)return i}}function o(e,n){var a={kind:e.kind,definitions:[r(e,n)]};e.hasOwnProperty("loc")&&(a.loc=e.loc);var i=t[n]||new Set,o=new Set,l=new Set;i.forEach((function(e){l.add(e)}));while(l.size>0){var s=l;l=new Set,s.forEach((function(e){if(!o.has(e)){o.add(e);var n=t[e]||new Set;n.forEach((function(e){l.add(e)}))}}))}return o.forEach((function(n){var i=r(e,n);i&&a.definitions.push(i)})),a}(function(){a.definitions.forEach((function(e){if(e.name){var n=new Set;i(e,n),t[e.name.value]=n}}))})(),e.exports=a,e.exports["register"]=o(a,"register")},"528d":function(e,n,a){},"56d7":function(e,n,a){"use strict";a.r(n);a("e260"),a("e6cf"),a("cca6"),a("a79d");var i=a("2b0e"),t=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("router-view")},r=[],o=(a("034f"),a("2877")),l={},s=Object(o["a"])(l,t,r,!1,null,null,null),u=s.exports,d=(a("d3b7"),a("3ca3"),a("ddb0"),a("8c4f")),c=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"home"},[e._m(0),a("main",[e._m(1),a("div",{staticStyle:{margin:"0 40px"}},[a("signup-form")],1)])])},m=[function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("nav",[i("div",{staticClass:"container-fluid"},[i("div",{staticClass:"row"},[i("img",{attrs:{src:a("6d43"),alt:"smartpay-logo"}})])])])},function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticStyle:{"flex-grow":"1","text-align":"left",padding:"0 20px"}},[a("h5",[e._v("Hi")]),a("p",[e._v("Welcome to Smartpay, your number one financial tool")])])}],p=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("main",[i("div",{class:["form-box",{active:e.active}],staticStyle:{"background-color":"red"}},[i("h5",[e._v("Sign In")]),i("ApolloMutation",{attrs:{mutation:a("f0cb"),variables:{username:e.username,password:e.password}},on:{done:e.onDone},scopedSlots:e._u([{key:"default",fn:function(n){var a=n.mutate,t=n.loading,r=n.error;return[i("form",[i("label",[e._v("Username:")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",required:""},domProps:{value:e.username},on:{input:function(n){n.target.composing||(e.username=n.target.value)}}}),i("label",[e._v("Password:")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",required:""},domProps:{value:e.password},on:{input:function(n){n.target.composing||(e.password=n.target.value)}}}),i("input",{attrs:{disabled:t,type:"submit",value:"Continue"},on:{click:function(e){return a()}}}),r?i("p",[e._v("An error occurred: "+e._s(r))]):e._e()])]}}])}),i("div",{on:{click:function(n){e.active=!0}}},[e._v("I want to Sign Up")])],1),i("div",{class:["form-box",{active:e.active}],staticStyle:{"background-color":"purple"}},[i("h5",[e._v("Sign Up")]),i("ApolloMutation",{attrs:{mutation:a("3ec9"),variables:{username:e.rUsername,password:e.rPassword,email:e.rEmail}},on:{done:e.signUpDone},scopedSlots:e._u([{key:"default",fn:function(n){var a=n.mutate,t=n.loading,r=n.error;return[i("form",[i("label",[e._v("Username:")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.rUsername,expression:"rUsername"}],attrs:{type:"text",required:""},domProps:{value:e.rUsername},on:{input:function(n){n.target.composing||(e.rUsername=n.target.value)}}}),i("label",[e._v("Email:")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.rEmail,expression:"rEmail"}],attrs:{type:"text",required:""},domProps:{value:e.rEmail},on:{input:function(n){n.target.composing||(e.rEmail=n.target.value)}}}),i("label",[e._v("Password:")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.rPassword,expression:"rPassword"}],attrs:{type:"password",required:""},domProps:{value:e.rPassword},on:{input:function(n){n.target.composing||(e.rPassword=n.target.value)}}}),i("label",[e._v("Re-Type Password:")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.cPassword,expression:"cPassword"}],attrs:{type:"password",required:""},domProps:{value:e.cPassword},on:{input:function(n){n.target.composing||(e.cPassword=n.target.value)}}}),i("input",{attrs:{disabled:t,type:"submit",value:"Continue"},on:{click:function(e){return a()}}}),r?i("p",[e._v("An error occurred: "+e._s(r))]):e._e()])]}}])}),i("div",{on:{click:function(n){e.active=!1}}},[e._v("I want to Sign In")])],1)])},v=[],b={name:"SignupForm",props:{msg:String},data:function(){return{active:!1,username:"",password:"",rUsername:"",rPassword:"",cPassword:"",rEmail:""}},methods:{onDone:function(){this.$router.push("/launchpad")},signUpDone:function(){this.$router.push("/register")}}},f=b,k=(a("6155"),Object(o["a"])(f,p,v,!1,null,"70a06312",null)),g=k.exports,N={name:"Home",components:{SignupForm:g}},y=N,h=(a("d733"),Object(o["a"])(y,c,m,!1,null,"5e1dddc4",null)),w=h.exports,_=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("main",[i("ApolloMutation",{attrs:{mutation:a("10de"),variables:{name:e.bizName,regNumber:e.regNumber,bizAbbr:e.bizAbbr,cell:e.cell,address:e.address,bizEmail:e.bizEmail,postalAddr:e.postalAddr,bankAccName:e.bankAccName,bankAccNumber:parseInt(e.bankAccNumber),bankAccType:e.bankAccType,branchCode:e.branchCode}},on:{done:e.onDone},scopedSlots:e._u([{key:"default",fn:function(n){var a=n.mutate,t=n.loading,r=n.error;return[i("form",{on:{submit:function(e){return e.preventDefault(),a()}}},[i("div",{class:["one",{active:e.active}]},[i("div",{staticClass:"form-inner"},[i("label",[e._v("What's your business name?")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.bizName,expression:"bizName"}],attrs:{type:"text",required:""},domProps:{value:e.bizName},on:{input:function(n){n.target.composing||(e.bizName=n.target.value)}}}),i("label",[e._v("What's your business registration number?")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.regNumber,expression:"regNumber"}],attrs:{type:"password",required:""},domProps:{value:e.regNumber},on:{input:function(n){n.target.composing||(e.regNumber=n.target.value)}}}),i("label",[e._v("What's your business cellphone number?")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.cell,expression:"cell"}],attrs:{type:"text",required:""},domProps:{value:e.cell},on:{input:function(n){n.target.composing||(e.cell=n.target.value)}}}),i("label",[e._v("What's your business address?")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.address,expression:"address"}],attrs:{type:"text",required:""},domProps:{value:e.address},on:{input:function(n){n.target.composing||(e.address=n.target.value)}}}),i("label",[e._v("What's your email address?")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.bizEmail,expression:"bizEmail"}],attrs:{type:"email",required:""},domProps:{value:e.bizEmail},on:{input:function(n){n.target.composing||(e.bizEmail=n.target.value)}}}),i("label",[e._v("What's your postal address?")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.postalAddr,expression:"postalAddr"}],attrs:{type:"text",required:""},domProps:{value:e.postalAddr},on:{input:function(n){n.target.composing||(e.postalAddr=n.target.value)}}}),i("button",{on:{click:function(n){e.active=!0}}},[e._v("Next")])])]),i("div",{class:["two",{active:e.active}]},[i("div",{staticClass:"form-inner"},[i("label",[e._v("What's your business bank account name?")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.bankAccName,expression:"bankAccName"}],attrs:{type:"text",required:""},domProps:{value:e.bankAccName},on:{input:function(n){n.target.composing||(e.bankAccName=n.target.value)}}}),i("label",[e._v("What's your bank account number?")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.bankAccNumber,expression:"bankAccNumber"}],attrs:{type:"text",required:""},domProps:{value:e.bankAccNumber},on:{input:function(n){n.target.composing||(e.bankAccNumber=n.target.value)}}}),i("label",[e._v("What's your business account branch code?")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.branchCode,expression:"branchCode"}],attrs:{type:"text",required:""},domProps:{value:e.branchCode},on:{input:function(n){n.target.composing||(e.branchCode=n.target.value)}}}),i("label",[e._v("Abbreviated business name?")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.bizAbbr,expression:"bizAbbr"}],attrs:{type:"text",required:""},domProps:{value:e.bizAbbr},on:{input:function(n){n.target.composing||(e.bizAbbr=n.target.value)}}}),i("label",[e._v("Account Type:")]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.bankAccType,expression:"bankAccType"}],on:{change:function(n){var a=Array.prototype.filter.call(n.target.options,(function(e){return e.selected})).map((function(e){var n="_value"in e?e._value:e.value;return n}));e.bankAccType=n.target.multiple?a:a[0]}}},[i("option",{attrs:{value:"CHECQUE"}},[e._v("Cheque")]),i("option",{attrs:{value:"SAVINGS"}},[e._v("Savings")])]),i("button",{attrs:{disabled:t}},[e._v("Complete")]),r?i("p",[e._v("An error occurred: "+e._s(r))]):e._e()])])])]}}])}),i("section")],1)},A=[],S={name:"BusinessRegistration",components:{},data:function(){return{active:!1,bizName:"",regNumber:"",bizAbbr:"",cell:"",address:"",bizEmail:"",postalAddr:"",bankAccName:"",bankAccNumber:"",bankAccType:"",branchCode:""}},methods:{onDone:function(){this.$router.push("/launchpad")}}},x=S,E=(a("b748"),Object(o["a"])(x,_,A,!1,null,"492bd91a",null)),C=E.exports,T=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"launchpad"},[a("aside",[a("h1",[e._v("Smartpay")]),a("div",{staticClass:"links"},[a("div",[a("router-link",{attrs:{to:{name:"Create"}}},[a("div",{staticClass:"link-item active"},[e._v("Create Clients")])])],1),a("div",[a("router-link",{attrs:{to:{name:"Manage"}}},[a("div",{staticClass:"link-item"},[e._v("Manage Clients")])])],1),a("div",[a("router-link",{attrs:{to:{name:"Report"}}},[a("div",{staticClass:"link-item"},[e._v("Reports")])])],1)]),e._m(0)]),a("router-view")],1)},P=[function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticStyle:{display:"flex","margin-bottom":"15px"}},[a("div",{staticStyle:{width:"50px",height:"50px","border-radius":"100%","background-color":"red"}}),a("div",{staticStyle:{margin:"0 15px"}},[a("div",[e._v("Fitness Corp")]),a("div",[e._v("Logout")])])])}],V={name:"Launchpad",components:{}},$=V,D=(a("2ff6"),Object(o["a"])($,T,P,!1,null,"68947ed3",null)),O=D.exports,z=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("main",[a("h4",{staticClass:"title"},[e._v("Let's create a client")]),a("form",[a("section",[a("label",[e._v("Name:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text",required:""},domProps:{value:e.name},on:{input:function(n){n.target.composing||(e.name=n.target.value)}}}),a("label",[e._v("Cellphone:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.cell,expression:"cell"}],attrs:{type:"tel",required:""},domProps:{value:e.cell},on:{input:function(n){n.target.composing||(e.cell=n.target.value)}}}),a("label",[e._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"email",required:""},domProps:{value:e.email},on:{input:function(n){n.target.composing||(e.email=n.target.value)}}}),a("label",[e._v("Account Type:")]),a("select",{directives:[{name:"model",rawName:"v-model",value:e.accountType,expression:"accountType"}],on:{change:function(n){var a=Array.prototype.filter.call(n.target.options,(function(e){return e.selected})).map((function(e){var n="_value"in e?e._value:e.value;return n}));e.accountType=n.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"1"}},[e._v("FNB")]),a("option",{attrs:{value:"2"}},[e._v("Bank Windhoek")]),a("option",{attrs:{value:"3"}},[e._v("NedBank")])]),a("input",{attrs:{type:"submit",value:"Continue"}})]),a("section",[a("label",[e._v("Bank:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.bank,expression:"bank"}],attrs:{type:"text",required:""},domProps:{value:e.bank},on:{input:function(n){n.target.composing||(e.bank=n.target.value)}}}),a("label",[e._v("Bank Account Name:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.bankName,expression:"bankName"}],attrs:{type:"text",required:""},domProps:{value:e.bankName},on:{input:function(n){n.target.composing||(e.bankName=n.target.value)}}}),a("label",[e._v("Bank Account Number:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.accountNumber,expression:"accountNumber"}],attrs:{type:"text",required:""},domProps:{value:e.accountNumber},on:{input:function(n){n.target.composing||(e.accountNumber=n.target.value)}}}),a("label",[e._v("Branch Code:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.branchCode,expression:"branchCode"}],attrs:{type:"text",required:""},domProps:{value:e.branchCode},on:{input:function(n){n.target.composing||(e.branchCode=n.target.value)}}})])])])},q=[],j={name:"CreateClient",props:{msg:String},data:function(){return{name:"",cell:"",email:"",bank:"",bankName:"",accountType:"",accountNumber:"",branchCode:""}}},B=j,U=(a("d4fc"),Object(o["a"])(B,z,q,!1,null,"51ea4e64",null)),L=U.exports,R=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("main",{staticClass:"home"},[a("div",{staticClass:"box"},[a("h4",[e._v("Here are the client you have")]),e._l(e.clients,(function(n){return a("div",{key:n.id,staticClass:"client-item"},[a("router-link",{attrs:{to:{name:"ClientProfile",params:{id:n.id}}}},[e._v("Create Clients")])],1)}))],2)])},F=[],M={name:"ManageClient",props:{msg:String},data:function(){return{clients:[{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1}]}}},W=M,I=(a("01dd"),Object(o["a"])(W,R,F,!1,null,"ad4c127a",null)),H=I.exports,G=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"home"})},Q=[],J={name:"Report",props:{msg:String}},K=J,X=(a("1850"),Object(o["a"])(K,G,Q,!1,null,"989ecb30",null)),Y=X.exports,Z=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"info"},[a("div",{staticClass:"box"},[a("h5",{staticClass:"header"},[e._v(e._s(e.id))]),a("section",[e._m(0),e._l(e.clients,(function(n){return a("div",{key:n.id,staticClass:"contract-item"},[a("router-link",{attrs:{to:{name:"ClientProfile",params:{id:n.id}}}},[e._v("Create Clients")])],1)}))],2)])])},ee=[function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"summary"},[a("button",[e._v("add")])])}],ne={name:"ClientProfile",props:{id:String},data:function(){return{clients:[{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1}]}}},ae=ne,ie=(a("bd0d"),Object(o["a"])(ae,Z,ee,!1,null,"621c9d9d",null)),te=ie.exports;i["a"].use(d["a"]);var re=[{path:"/",name:"Home",component:w},{path:"/register",name:"BusinessRegistration",component:C},{path:"/launchpad",name:"Launchpad",component:O,children:[{path:"create",name:"Create",component:L},{path:"manage",name:"Manage",component:H},{path:"profile/:id",name:"ClientProfile",component:te,props:!0},{path:"report",name:"Report",component:Y}]},{path:"/about",name:"About",component:function(){return a.e("about").then(a.bind(null,"f820"))}}],oe=new d["a"]({mode:"history",base:"/",routes:re}),le=oe,se=(a("1da1"),a("5530")),ue=(a("96cf"),a("522d")),de=a("efe7");i["a"].use(ue["a"]);var ce="apollo-token",me=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_GRAPHQL_HTTP||"http://localhost:3000/graphql",pe=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_FILES_ROOT||me.substr(0,me.indexOf("/graphql"));i["a"].prototype.$filesRoot=pe;var ve={httpEndpoint:me,wsEndpoint:null,tokenName:ce,persisting:!1,websocketsOnly:!1,ssr:!1};function be(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object(de["createApolloClient"])(Object(se["a"])(Object(se["a"])({},ve),e)),a=n.apolloClient,i=n.wsClient;a.wsClient=i;var t=new ue["a"]({defaultClient:a,defaultOptions:{$query:{}},errorHandler:function(e){console.log("%cError","background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",e.message)}});return t}i["a"].config.productionTip=!1,new i["a"]({router:le,apolloProvider:be(),render:function(e){return e(u)}}).$mount("#app")},6155:function(e,n,a){"use strict";a("81f0")},"6d43":function(e,n,a){e.exports=a.p+"img/smartpayLogo.7e8792b7.png"},"81f0":function(e,n,a){},"85ec":function(e,n,a){},b748:function(e,n,a){"use strict";a("be1f")},bd0d:function(e,n,a){"use strict";a("c148")},be1f:function(e,n,a){},c148:function(e,n,a){},c737:function(e,n,a){},d3af:function(e,n,a){},d4fc:function(e,n,a){"use strict";a("10ea")},d733:function(e,n,a){"use strict";a("d3af")},f0cb:function(e,n){var a={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"login"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"username"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"password"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"login"},arguments:[{kind:"Argument",name:{kind:"Name",value:"username"},value:{kind:"Variable",name:{kind:"Name",value:"username"}}},{kind:"Argument",name:{kind:"Name",value:"password"},value:{kind:"Variable",name:{kind:"Name",value:"password"}}}],directives:[]}]}}],loc:{start:0,end:112}};a.loc.source={body:"mutation login($username: String!, $password: String!) {\r\n    login(username: $username, password: $password)\r\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function i(e,n){if("FragmentSpread"===e.kind)n.add(e.name.value);else if("VariableDefinition"===e.kind){var a=e.type;"NamedType"===a.kind&&n.add(a.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){i(e,n)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){i(e,n)})),e.definitions&&e.definitions.forEach((function(e){i(e,n)}))}var t={};function r(e,n){for(var a=0;a<e.definitions.length;a++){var i=e.definitions[a];if(i.name&&i.name.value==n)return i}}function o(e,n){var a={kind:e.kind,definitions:[r(e,n)]};e.hasOwnProperty("loc")&&(a.loc=e.loc);var i=t[n]||new Set,o=new Set,l=new Set;i.forEach((function(e){l.add(e)}));while(l.size>0){var s=l;l=new Set,s.forEach((function(e){if(!o.has(e)){o.add(e);var n=t[e]||new Set;n.forEach((function(e){l.add(e)}))}}))}return o.forEach((function(n){var i=r(e,n);i&&a.definitions.push(i)})),a}(function(){a.definitions.forEach((function(e){if(e.name){var n=new Set;i(e,n),t[e.name.value]=n}}))})(),e.exports=a,e.exports["login"]=o(a,"login")}});
//# sourceMappingURL=app.01100ee3.js.map