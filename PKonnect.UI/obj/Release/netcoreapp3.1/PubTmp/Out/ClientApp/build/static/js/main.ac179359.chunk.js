(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,a){e.exports=a.p+"static/media/Communities_WelcomeScreen.f96c95a2.png"},37:function(e,t,a){e.exports=a(59)},44:function(e,t,a){},47:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);a(38);var n=a(1),r=a.n(n),l=a(12),c=a.n(l),o=a(63),i=a(2),u=a.n(i),m=a(13),s=a(4),d=a(5),h=a(9),p=a(6),E=a(10),b=a(64),f=a(8),v=a(15),g=a(62),y=(a(44),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).toggleNavbar=a.toggleNavbar.bind(Object(v.a)(a)),a.state={collapsed:!0},a}return Object(E.a)(t,e),Object(d.a)(t,[{key:"toggleNavbar",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){return r.a.createElement("header",null,r.a.createElement(f.f,{className:"navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3",light:!0},r.a.createElement(f.c,null,r.a.createElement(f.g,{tag:g.a,to:"/"},"PKonnect.UI"),r.a.createElement(f.h,{onClick:this.toggleNavbar,className:"mr-2"}),r.a.createElement(f.b,{className:"d-sm-inline-flex flex-sm-row-reverse",isOpen:!this.state.collapsed,navbar:!0},r.a.createElement("ul",{className:"navbar-nav flex-grow"},r.a.createElement(f.d,null,r.a.createElement(f.e,{tag:g.a,className:"text-dark",to:"/"},"Home")),r.a.createElement(f.d,null,r.a.createElement(f.e,{tag:g.a,className:"text-dark",to:"/counter"},"Counter")),r.a.createElement(f.d,null,r.a.createElement(f.e,{tag:g.a,className:"text-dark",to:"/fetch-data"},"Fetch data")))))))}}]),t}(n.Component));y.displayName=y.name;var w=function(e){function t(){return Object(s.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(f.c,{fluid:!0},r.a.createElement(f.i,null,r.a.createElement(f.a,null,"  ",this.props.children))))}}]),t}(n.Component);w.displayName=w.name;var k=a(33),j=a.n(k),O=(a(47),function(e){function t(){return Object(s.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-9"},r.a.createElement("div",{className:"image"},r.a.createElement("img",{src:j.a,alt:"Welcome"})),r.a.createElement("div",{className:"centered"},r.a.createElement("div",{className:"CenterLine1"}," Community Building"),r.a.createElement("div",{className:"CenterLine2"}," A new PK digital community is coming Summer 2020"))),r.a.createElement("div",{className:"col-sm-3"},r.a.createElement("div",{id:"welcometitle"},r.a.createElement("h5",null,r.a.createElement("h1",null,"Hello, ",this.props.user.account.name))),r.a.createElement("div",{id:"formdata"},r.a.createElement("div",{className:"row"},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h3",null,"Help us build your community"),r.a.createElement("div",null,"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"),r.a.createElement("br",null),r.a.createElement("h3",{id:"RedColor"},"Share your ideas"),r.a.createElement("br",null),r.a.createElement("h6",null,"Which of the following are important to you?"),r.a.createElement("div",null,r.a.createElement("input",{type:"checkbox",value:"SkillSerach"}),r.a.createElement("label",null,"SkillSerach")),r.a.createElement("div",null,r.a.createElement("input",{type:"checkbox",value:"NetWorking"}),r.a.createElement("label",null,"NetWorking")),r.a.createElement("div",null,r.a.createElement("input",{type:"checkbox",value:"Training"}),r.a.createElement("label",null,"Training")),r.a.createElement("div",null,r.a.createElement("input",{type:"checkbox",value:"Mentorship"}),r.a.createElement("label",null,"Mentorship")),r.a.createElement("div",null,r.a.createElement("input",{type:"checkbox",value:"Knowledge"}),r.a.createElement("label",null,"Knowledge")),r.a.createElement("br",null),r.a.createElement("h6",null,"Here is where another question?"),r.a.createElement("select",null,r.a.createElement("option",{value:"Empty"}),r.a.createElement("option",{value:"questions"},"few more questions")),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h6",null,"Feedback"),r.a.createElement("textarea",{id:"comments",rows:"5",cols:"40"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("button",null,"Submit")))))))}}]),t}(n.Component));O.displayName=O.name;var N=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).state={forecasts:[],loading:!0},a}return Object(E.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.populateWeatherData()}},{key:"render",value:function(){var e=this.state.loading?r.a.createElement("p",null,r.a.createElement("em",null,"Loading...")):t.renderForecastsTable(this.state.forecasts);return r.a.createElement("div",null,r.a.createElement("h1",{id:"tabelLabel"},"Weather forecast"),r.a.createElement("p",null,"This component demonstrates fetching data from the server."),e)}},{key:"populateWeatherData",value:function(){var e=Object(m.a)(u.a.mark(function e(){var t,a;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("weatherforecast");case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,this.setState({forecasts:a,loading:!1});case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}],[{key:"renderForecastsTable",value:function(e){return r.a.createElement("table",{className:"table table-striped","aria-labelledby":"tabelLabel"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Date"),r.a.createElement("th",null,"Temp. (C)"),r.a.createElement("th",null,"Temp. (F)"),r.a.createElement("th",null,"Summary"))),r.a.createElement("tbody",null,e.map(function(e){return r.a.createElement("tr",{key:e.date},r.a.createElement("td",null,e.date),r.a.createElement("td",null,e.temperatureC),r.a.createElement("td",null,e.temperatureF),r.a.createElement("td",null,e.summary))})))}}]),t}(n.Component);N.displayName=N.name;var C=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).state={currentCount:0},a.incrementCounter=a.incrementCounter.bind(Object(v.a)(a)),a}return Object(E.a)(t,e),Object(d.a)(t,[{key:"incrementCounter",value:function(){this.setState({currentCount:this.state.currentCount+1})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Counter"),r.a.createElement("p",null,"This is a simple example of a React component."),r.a.createElement("p",{"aria-live":"polite"},"Current count: ",r.a.createElement("strong",null,this.state.currentCount)),r.a.createElement("button",{className:"btn btn-primary",onClick:this.incrementCounter},"Increment"))}}]),t}(n.Component);C.displayName=C.name;var x=a(16),L=new x.MsalAuthProvider({auth:{authority:"https://login.microsoftonline.com/common",clientId:"870244e3-2770-4ab1-84f3-fb91d35111e5"},cache:{cacheLocation:"sessionStorage",storeAuthStateInCookie:!0}},{scopes:["https://graph.microsoft.com/.default"]},x.LoginType.Popup);a(58);var S=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).state={isLoading:!0,user:null};L.getAccount();return a}return Object(E.a)(t,e),Object(d.a)(t,[{key:"login",value:function(){var e=Object(m.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L.login();case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(x.AzureAD,{provider:L,forceLogin:!0},function(e){var t=e.authenticationState,a=e.accountInfo;return r.a.createElement(w,null,t===x.AuthenticationState.Authenticated&&r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{exact:!0,path:"/",render:function(e){return r.a.createElement(O,Object.assign({},e,{user:a}))}}),r.a.createElement(b.a,{path:"/counter",component:C}),r.a.createElement(b.a,{path:"/fetch-data/:startDateIndex?",component:N})))})}}]),t}(n.Component);S.displayName=S.name;var W=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function A(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}var T=document.getElementsByTagName("base")[0].getAttribute("href"),F=document.getElementById("root");c.a.render(r.a.createElement(o.a,{basename:T},r.a.createElement(S,null)),F),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("","/service-worker.js");W?function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):A(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e):A(e)})}}()}},[[37,1,2]]]);
//# sourceMappingURL=main.ac179359.chunk.js.map