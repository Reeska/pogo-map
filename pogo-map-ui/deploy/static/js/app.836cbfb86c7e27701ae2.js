webpackJsonp([1],{"8nSe":function(t,e){},"L+Dk":function(t,e){},NHnr:function(t,e,n){"use strict";function r(t){return window.fetch("http://localhost:3000/raids",{body:y()(t),method:"POST",headers:{"content-type":"application/json"}}).then(function(t){return t.json()})}function a(t){return window.fetch("http://localhost:3000/raids/"+t.id,{body:y()(t),method:"PUT",headers:{"content-type":"application/json"}}).then(function(t){return t.json()})}function i(){var t=new Date,e=new Date(t.getTime()-27e5),n=new Date(t.getTime()+36e5);return window.fetch("http://localhost:3000/raids?start="+e.toISOString()+"&end="+n.toISOString()).then(function(t){return t.json()})}function o(t){var t=new Date(t);return t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function s(t){var e=t.split(":"),n=O()(e,2),r=n[0],a=n[1],i=new Date;return i.setHours(r,a),i}function c(t){n("UFHE")}function u(t){n("L+Dk")}function d(t){n("8nSe")}Object.defineProperty(e,"__esModule",{value:!0});var m=n("7+uW"),p=n("Xxa5"),l=n.n(p),f=n("BO1k"),h=n.n(f),v=n("exGp"),g=n.n(v),w=n("mvHQ"),y=n.n(w),x=function(){var t=g()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(b.length){t.next=4;break}return t.next=3,window.fetch("http://localhost:3000/gyms").then(function(t){return t.json()});case 3:b=t.sent;case 4:return t.abrupt("return",b);case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),_=function(){var t=g()(l.a.mark(function t(e){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x();case 2:return t.t0=function(t){return t.name===e},t.t1=function(t){return t.id},t.t2=function(t,e){return e},t.t3={},t.abrupt("return",t.sent.filter(t.t0).map(t.t1).reduce(t.t2,t.t3));case 7:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),T=function(){var t=g()(l.a.mark(function t(e){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x();case 2:return t.t0=function(t){return t.id===e},t.t1=function(t,e){return e},t.t2={},t.abrupt("return",t.sent.filter(t.t0).reduce(t.t1,t.t2));case 6:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),b=[],k=n("d7EF"),O=n.n(k),D={props:["raid"],data:function(){return{selectedGymName:"",timeOfPop:"",startTime:"",gyms:[],error:""}},watch:{raid:function(){this.raid?(this.selectedGymName=this.raid.gym.name,this.timeOfPop=o(this.raid.hatchTime)):(this.selectedGymName="",this.timeOfPop="")}},methods:{saveRaid:function(){var t=this;this.$validator.validateAll().then(function(){var e=g()(l.a.mark(function e(n){var i,o,c,u;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=19;break}return e.next=3,_(t.selectedGymName);case 3:if(i=e.sent,o=s(t.timeOfPop),c=o,t.startTime&&(c=s(t.startTime)),u=void 0,!t.raid){e.next=14;break}return e.next=11,a({id:t.raid.id,gymId:i,hatchTime:o.toISOString(),raidStartTime:c.toISOString()}).catch(function(t){return t});case 11:u=e.sent,e.next=17;break;case 14:return e.next=16,r({gymId:i,hatchTime:o.toISOString(),raidStartTime:c.toISOString()}).catch(function(t){return t});case 16:u=e.sent;case 17:t.error=u.message,t.error||(t.$toasted.show("Raid enregistré avec succès",{duration:2e3,className:"toast-success",fullWidth:!0,position:"top-center",fitToScreen:!1}),t.$emit("raidModified"),t.$modal.hide("raid"));case 19:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}())}},created:function(){var t=this;return g()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x();case 2:t.gyms=e.sent;case 3:case"end":return e.stop()}},e,t)}))()}},P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{attrs:{name:"raid",height:"auto"}},[n("div",{staticClass:"p-3"},[n("div",{staticClass:"sp-close",on:{click:function(e){t.$modal.hide("raid")}}},[t._v("×")]),t._v(" "),n("h2",[t._v(t._s(t.raid?"Modifier":"Ajouter")+" un raid 5 ★")]),t._v(" "),n("form",{on:{submit:function(e){e.preventDefault(),t.saveRaid()}}},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"gymName"}},[t._v("Nom de l'arène")]),t._v(" "),n("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:t.selectedGymName,expression:"selectedGymName"}],staticClass:"form-control",attrs:{type:"text",list:"gyms",id:"gymName",placeholder:"Nom de l'arène"},domProps:{value:t.selectedGymName},on:{input:function(e){e.target.composing||(t.selectedGymName=e.target.value)}}})]),t._v(" "),n("datalist",{attrs:{id:"gyms"}},t._l(t.gyms,function(t){return n("option",{attrs:{id:t.id},domProps:{value:t.name}})})),t._v(" "),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"timeOfPop"}},[t._v("Heure du pop")]),t._v(" "),n("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|regex:^[0-9]{2}:[0-9]{2}$",expression:"'required|regex:^[0-9]{2}:[0-9]{2}$'"},{name:"model",rawName:"v-model",value:t.timeOfPop,expression:"timeOfPop"}],staticClass:"form-control",attrs:{type:"text",name:"timeOfPop",id:"timeOfPop",placeholder:"HH:MM : ex 14:45"},domProps:{value:t.timeOfPop},on:{input:function(e){e.target.composing||(t.timeOfPop=e.target.value)}}}),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.errors.has("timeOfPop"),expression:"errors.has('timeOfPop')"}],staticClass:"help is-danger"},[t._v(t._s(t.errors.first("timeOfPop")))])]),t._v(" "),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"timeOfRaid"}},[t._v("On lance à")]),t._v(" "),n("input",{directives:[{name:"validate",rawName:"v-validate",value:"regex:^[0-9]{2}:[0-9]{2}$",expression:"'regex:^[0-9]{2}:[0-9]{2}$'"},{name:"model",rawName:"v-model",value:t.startTime,expression:"startTime"}],staticClass:"form-control",attrs:{type:"text",id:"timeOfRaid",placeholder:"HH:MM : ex 14:45"},domProps:{value:t.startTime},on:{input:function(e){e.target.composing||(t.startTime=e.target.value)}}})]),t._v(" "),n("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Enregistrer")])]),t._v(" "),t.error?n("div",{staticClass:"alert alert-danger mt-3 mb-2"},[t._v(t._s(t.error))]):t._e()])])},S=[],N={render:P,staticRenderFns:S},M=N,R=n("VU/8"),C=c,I=R(D,M,!1,C,null,null),$=I.exports,H=n("bOdI"),E=n.n(H),A=E()({props:["raid"],data:function(){return{remaining:{}}},methods:{},created:function(){this.hacthTimeasDate=new Date(this.raid.hatchTime),this.calcRemaining()}},"methods",{calcRemaining:function(){var t=new Date;t.getTime()<this.hacthTimeasDate.getTime()?this.remaining={type:"unhatched",time:this.hacthTimeasDate.getTime()-t.getTime()}:this.remaining={type:"ongoing",time:this.hacthTimeasDate.getTime()+27e5-t.getTime()}},remainingType:function(){return(new Date).getTime()<this.hacthTimeasDate.getTime()?"unhatched":"ongoing"}}),G=function(){var t=this,e=t.$createElement;return(t._self._c||e)("countdown",{staticClass:"countdown",class:t.remaining.type,attrs:{time:t.remaining.time},on:{countdownend:function(e){t.calcRemaining()}},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.hours)+":"+t._s(e.minutes)+":"+t._s(e.seconds))]}}])})},j=[],U={render:G,staticRenderFns:j},F=U,q=n("VU/8"),z=u,V=q(A,F,!1,z,null,null),Z=V.exports,B={data:function(){return{gyms:[],tileLayers:[],markers:[],selectedRaid:{}}},components:{ManageRaid:$,RaidCountDown:Z},methods:{toPrintedDate:o,showAddRaid:function(t){this.selectedRaid=t,this.$modal.show("raid")},buildTooltipOptions:function(){return{permanent:!0,opacity:1,offset:new L.Point(0,-50),direction:"top"}},getEndDate:function(t){return o(new Date(new Date(t).getTime()+27e5))},raidModified:function(){console.log("raidModified event !!"),this.loadData()},addCoordinates:function(t){var e=this;return g()(l.a.mark(function n(){var r,a,i,o,s,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=!0,a=!1,i=void 0,e.prev=3,o=h()(t);case 5:if(r=(s=o.next()).done){e.next=13;break}return c=s.value,e.next=9,T(c.gymId);case 9:c.gym=e.sent;case 10:r=!0,e.next=5;break;case 13:e.next=19;break;case 15:e.prev=15,e.t0=e.catch(3),a=!0,i=e.t0;case 19:e.prev=19,e.prev=20,!r&&o.return&&o.return();case 22:if(e.prev=22,!a){e.next=25;break}throw i;case 25:return e.finish(22);case 26:return e.finish(19);case 27:return e.abrupt("return",t);case 28:case"end":return e.stop()}},n,e,[[3,15,19,27],[20,,22,26]])}))()},loadData:function(){var t=this;return g()(l.a.mark(function e(){var n,r,a,o,s,c,u,d;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("load data"),e.t0=t,e.next=4,i();case 4:return e.t1=e.sent,e.next=7,e.t0.addCoordinates.call(e.t0,e.t1);case 7:for(n=e.sent,r=new L.Icon({iconUrl:"assets/gym.png",iconSize:[50,50],iconAnchor:[25,50],popupAnchor:[0,-50]}),t.markers=[],a=!0,o=!1,s=void 0,e.prev=13,c=h()(n);!(a=(u=c.next()).done);a=!0)d=u.value,t.markers.push({raid:d,latLng:{lat:d.gym.latitude,lng:d.gym.longitude},icon:r});e.next=21;break;case 17:e.prev=17,e.t2=e.catch(13),o=!0,s=e.t2;case 21:e.prev=21,e.prev=22,!a&&c.return&&c.return();case 24:if(e.prev=24,!o){e.next=27;break}throw s;case 27:return e.finish(24);case 28:return e.finish(21);case 29:case"end":return e.stop()}},e,t,[[13,17,21,29],[22,,24,28]])}))()}},created:function(){var t=this;return g()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.tileLayers.push({url:"https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}",options:{attribution:'Map tiles by\n          <a href="http://stamen.com">Stamen Design</a>,\n          <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy;\n          <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',subdomains:"abcd",minZoom:0,maxZoom:20,ext:"png"}}),t.loadData(),setInterval(function(){return t.loadData()},2e4);case 3:case"end":return e.stop()}},e,t)}))()}},W=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("v-map",{attrs:{zoom:15,center:[48.828036,2.32696]}},[t._l(t.tileLayers,function(t){return n("v-tilelayer",{key:t.url,attrs:{url:t.url,options:t.options}})}),t._v(" "),t._l(t.markers,function(e){return n("v-marker",{key:e.raid.id,attrs:{"lat-lng":e.latLng,icon:e.icon}},[n("v-popup",[n("div",{staticStyle:{width:"150px","text-align":"center"}},[n("div",{staticClass:"gymName"},[t._v(t._s(e.raid.gym.name))]),t._v("\n          5 ★"),n("br"),t._v("\n          Pop : "+t._s(t.toPrintedDate(e.raid.hatchTime))),n("br"),t._v("\n          Fin : "+t._s(t.getEndDate(e.raid.hatchTime))),n("br"),t._v("\n          On lance à : "+t._s(t.toPrintedDate(e.raid.raidStartTime))),n("br"),t._v(" "),n("a",{attrs:{href:"#"},on:{click:function(n){t.showAddRaid(e.raid)}}},[t._v("Modifier")])])]),t._v(" "),n("v-tooltip",{attrs:{options:t.buildTooltipOptions()}},[n("raid-count-down",{attrs:{raid:e.raid}})],1)],1)})],2),t._v(" "),n("manage-raid",{attrs:{raid:t.selectedRaid},on:{raidModified:function(e){t.raidModified()}}}),t._v(" "),n("div",{staticStyle:{height:"50px",width:"50px","z-index":"5454357",position:"absolute",right:"10px",top:"10px"},on:{click:function(e){t.showAddRaid()}}},[t._m(0,!1,!1)])],1)},J=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{attrs:{href:"#"}},[n("img",{staticStyle:{height:"50px"},attrs:{src:"assets/add.png"}})])}],Q={render:W,staticRenderFns:J},X=Q,Y=n("VU/8"),K=d,tt=Y(B,X,!1,K,null,null),et=tt.exports,nt=n("sUu7"),rt=n("v9es"),at=n("MdIv"),it=n("rifk"),ot=n.n(it),st=n("IZMb"),ct=n.n(st);m.a.config.productionTip=!1,m.a.use(nt.a),m.a.use(ot.a),m.a.use(ct.a),m.a.component("countdown",rt.a),m.a.component("v-map",at.Map),m.a.component("v-tilelayer",at.TileLayer),m.a.component("v-marker",at.Marker),m.a.component("v-popup",at.Popup),m.a.component("v-tooltip",at.Tooltip),new m.a({el:"#app",template:"<App/>",components:{App:et}})},UFHE:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.836cbfb86c7e27701ae2.js.map