webpackJsonp([1],{0:function(t,e,n){n("j1ja"),n("rplX"),t.exports=n("NHnr")},"7zck":function(t,e){},BZC6:function(t,e){},"L+Dk":function(t,e){},NHnr:function(t,e,n){"use strict";function a(t){return window.fetch(T+"/raids",{body:k()(t),method:"POST",headers:{"content-type":"application/json"}}).then(function(t){return t.json()})}function i(t){return window.fetch(T+"/raids/"+t.id,{body:k()(t),method:"PUT",headers:{"content-type":"application/json"}}).then(function(t){return t.json()})}function r(t,e){return window.fetch(T+"/raids/"+t+"/players",{body:k()(e),method:"POST",headers:{"content-type":"application/json"}}).then(function(t){return t.json()})}function o(){var t=new Date,e=new Date(t.getTime()-27e5),n=new Date(t.getTime()+36e5);return window.fetch(T+"/raids?start="+e.toISOString()+"&end="+n.toISOString()).then(function(t){return t.json()})}function s(t){var t=new Date(t);return t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function c(t){var e=t.split(":"),n=S()(e,2),a=n[0],i=n[1],r=new Date;return r.setHours(a,i),r}function l(t){n("BZC6")}function u(t){n("Z5FK")}function d(t){n("L+Dk")}function m(t){n("kWBS")}Object.defineProperty(e,"__esModule",{value:!0});var p=n("7+uW"),f=n("BO1k"),v=n.n(f),h=n("Xxa5"),g=n.n(h),y=n("exGp"),b=n.n(y),_=n("mvHQ"),k=n.n(_),w=function(){var t=b()(g.a.mark(function t(){return g.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(O.length){t.next=4;break}return t.next=3,window.fetch(T+"/gyms").then(function(t){return t.json()});case 3:O=t.sent;case 4:return t.abrupt("return",O);case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),x=function(){var t=b()(g.a.mark(function t(e){return g.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w();case 2:return t.t0=function(t){return t.id===e},t.t1=function(t,e){return e},t.t2={},t.abrupt("return",t.sent.filter(t.t0).reduce(t.t1,t.t2));case 6:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),T="https://pokemongogymmap.herokuapp.com",O=[],R=n("d7EF"),S=n.n(R),D={props:["raid"],data:function(){return{selectedGym:null,timeOfPop:"",startTime:"",gyms:[],error:"",toast:{visible:!1,text:""},valid:!1,validationRules:{timeFormat:function(t){return!t||/^[0-9]{2}:[0-9]{2}$/.test(t)||"Format incorrect : HH:MM attendu"},required:function(t){return!!t||"Champ obligatoire"}}}},created:function(){var t=this;return b()(g.a.mark(function e(){return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w();case 2:t.gyms=e.sent;case 3:case"end":return e.stop()}},e,t)}))()},watch:{raid:function(){var t=this;this.raid&&(this.gyms.filter(function(e){return t.raid.gym.id===e.id}).forEach(function(e){t.selectedGym=e}),this.timeOfPop=s(this.raid.hatchTime),this.raid.raidStartTime&&(this.startTime=s(this.raid.raidStartTime)))}},methods:{saveRaid:function(){var t=this;return b()(g.a.mark(function e(){var n,r,o;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.$refs.manageRaidForm.validate()){e.next=2;break}return e.abrupt("return");case 2:if(n=c(t.timeOfPop),r=t.startTime?c(t.startTime):null,o=void 0,!t.raid){e.next=11;break}return e.next=8,i({id:t.raid.id,gymId:t.selectedGym.id,hatchTime:n.toISOString(),raidStartTime:r?r.toISOString():""}).catch(function(t){return t});case 8:o=e.sent,e.next=14;break;case 11:return e.next=13,a({gymId:t.selectedGym.id,hatchTime:n.toISOString(),raidStartTime:r?r.toISOString():""}).catch(function(t){return t});case 13:o=e.sent;case 14:t.error=o.message,t.error||(t.resetFields(),t.$emit("raidModified",{message:"Raid enregistré avec succès"}),t.$modal.hide("raid"));case 16:case"end":return e.stop()}},e,t)}))()},beforeClose:function(){this.$emit("closeModal")},resetFields:function(){this.$refs.manageRaidForm.reset()}}},M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{attrs:{name:"raid",height:"auto",adaptive:!0},on:{"before-close":function(e){t.beforeClose()}}},[n("v-container",{attrs:{fluid:""}},[n("div",{staticClass:"sp-close",on:{click:function(e){t.$modal.hide("raid")}}},[t._v("×")]),t._v(" "),n("h2",[t._v(t._s(t.raid?"Modifier":"Ajouter")+" un raid 5 ★")]),t._v(" "),n("v-form",{ref:"manageRaidForm",attrs:{"lazy-validation":!0},on:{submit:function(e){e.preventDefault(),t.saveRaid()}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-select",{attrs:{items:t.gyms,disabled:!!t.raid,"item-text":"name",label:"Nom de l'arène",autocomplete:"","max-height":200,rules:[t.validationRules.required],required:""},model:{value:t.selectedGym,callback:function(e){t.selectedGym=e},expression:"selectedGym"}}),t._v(" "),n("v-text-field",{attrs:{label:"Heure du pop",rules:[t.validationRules.required,t.validationRules.timeFormat],placeholder:"Au format HH:MM ex : 14:45","validate-on-blur":!0,mask:"##:##","return-masked-value":!0,required:""},model:{value:t.timeOfPop,callback:function(e){t.timeOfPop=e},expression:"timeOfPop"}}),t._v(" "),n("v-text-field",{attrs:{label:"On lance à",rules:[t.validationRules.timeFormat],placeholder:"Au format HH:MM ex : 14:45","validate-on-blur":!0,mask:"##:##","return-masked-value":!0},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}}),t._v(" "),n("v-btn",{on:{click:function(e){t.saveRaid()}}},[t._v("Enregistrer")])],1),t._v(" "),n("v-alert",{attrs:{type:"error",value:t.error}},[t._v(t._s(t.error))])],1)],1)},P=[],A={render:M,staticRenderFns:P},C=A,I=n("VU/8"),F=l,$=I(D,C,!1,F,"data-v-377caa81",null),j=$.exports,N={props:["raid"],data:function(){return{selectedGymName:"",numberOfAccounts:1,startTime:"",players:[],playerNames:"",numberOfPlayers:0,pseudo:"",error:"",toast:{visible:!1,text:""},valid:!1,validationRules:{required:function(t){return!!t||"Champ obligatoire"}}}},watch:{raid:function(){this.pseudo=localStorage.getItem("nickname"),this.raid&&(this.selectedGymName=this.raid.gym.name,this.players=this.raid.players,this.players&&(this.numberOfPlayers=this.players.map(function(t){return t.accounts}).reduce(function(t,e){return t+e},0),this.playerNames=this.players.map(function(t){return t.nickname+(t.accounts>1?" ("+t.accounts+")":"")}).join(", ")),this.raid.raidStartTime&&(this.startTime=s(this.raid.raidStartTime))),this.numberOfAccounts=1}},methods:{saveRaid:function(){var t=this;return b()(g.a.mark(function e(){var n;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.$refs.managePlayersForm.validate()){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,r(t.raid.id,{nickname:t.pseudo,accounts:t.numberOfAccounts}).catch(function(t){return t});case 4:n=e.sent,t.error=n.message,t.error||(localStorage.setItem("nickname",t.pseudo),t.$emit("playerAdded",{message:"Participants enregistrés avec succès"}),t.resetFields(),t.$modal.hide("player"));case 7:case"end":return e.stop()}},e,t)}))()},beforeClose:function(){this.$emit("closeModal")},resetFields:function(){this.$refs.managePlayersForm.reset()}}},H=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{attrs:{name:"player",height:"auto",adaptive:!0},on:{"before-close":function(e){t.beforeClose()}}},[n("v-container",{attrs:{fluid:""}},[n("div",{staticClass:"sp-close",on:{click:function(e){t.$modal.hide("player")}}},[t._v("×")]),t._v(" "),n("h2",[t._v("Ajouter un participant à un raid")]),t._v(" "),n("div",{staticStyle:{margin:"auto","margin-top":"10px","text-align":"center",width:"70%"}},[n("strong",[t._v(t._s(t.selectedGymName))]),n("br"),t._v(" "),n("strong",[t._v("On lance à :")]),t._v(" "+t._s(t.startTime?t.startTime:"-")),n("br"),t._v(" "),n("strong",[t._v(t._s(t.numberOfPlayers)+" participants :")]),t._v(" "+t._s(t.playerNames)+"\n    ")]),t._v(" "),n("v-form",{ref:"managePlayersForm",attrs:{"lazy-validation":!0},on:{submit:function(e){e.preventDefault(),t.saveRaid()}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-text-field",{attrs:{label:"Mon pseudo",rules:[t.validationRules.required],"validate-on-blur":!0,required:""},model:{value:t.pseudo,callback:function(e){t.pseudo=e},expression:"pseudo"}}),t._v(" "),n("v-text-field",{attrs:{label:"Nombre de comptes","validate-on-blur":!0,rules:[t.validationRules.required],required:""},model:{value:t.numberOfAccounts,callback:function(e){t.numberOfAccounts=t._n(e)},expression:"numberOfAccounts"}}),t._v(" "),n("v-btn",{on:{click:function(e){t.saveRaid()}}},[t._v("Enregistrer")])],1),t._v(" "),n("v-alert",{attrs:{type:"error",value:t.error}},[t._v(t._s(t.error))])],1)],1)},E=[],G={render:H,staticRenderFns:E},q=G,z=n("VU/8"),Z=u,B=z(N,q,!1,Z,"data-v-13eafd66",null),U=B.exports,V=n("bOdI"),W=n.n(V),X=W()({props:["raid"],data:function(){return{remaining:{}}},methods:{},created:function(){this.hacthTimeasDate=new Date(this.raid.hatchTime),this.calcRemaining()}},"methods",{calcRemaining:function(){var t=new Date;t.getTime()<this.hacthTimeasDate.getTime()?this.remaining={type:"unhatched",time:this.hacthTimeasDate.getTime()-t.getTime()}:this.remaining={type:"ongoing",time:this.hacthTimeasDate.getTime()+27e5-t.getTime()}},remainingType:function(){return(new Date).getTime()<this.hacthTimeasDate.getTime()?"unhatched":"ongoing"}}),K=function(){var t=this,e=t.$createElement;return(t._self._c||e)("countdown",{staticClass:"countdown",class:t.remaining.type,attrs:{time:t.remaining.time},on:{countdownend:function(e){t.calcRemaining()}},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.hours)+":"+t._s(e.minutes)+":"+t._s(e.seconds))]}}])})},J=[],Q={render:K,staticRenderFns:J},Y=Q,tt=n("VU/8"),et=d,nt=tt(X,Y,!1,et,null,null),at=nt.exports,it={data:function(){return{map:{center:[48.828036,2.32696]},gyms:[],tileLayers:[],markers:[],selectedRaid:{},showAddImage:!0,loading:!1,toast:{visible:!1,text:""},location:{position:null,loading:!1}}},components:{ManageRaid:j,AddPlayer:U,RaidCountDown:at},created:function(){var t=this;return b()(g.a.mark(function e(){return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.tileLayers.push({url:"https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}",options:{attribution:'Map tiles by\n          <a href="http://stamen.com">Stamen Design</a>,\n          <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy;\n          <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',subdomains:"abcd",minZoom:0,maxZoom:20,ext:"png"}}),t.loadData(),setInterval(function(){return t.loadData()},2e4);case 3:case"end":return e.stop()}},e,t)}))()},methods:{toPrintedDate:s,showAddRaid:function(t){this.selectedRaid=t,this.showAddImage=!1,this.$modal.show("raid")},showAddPlayer:function(t){this.selectedRaid=t,this.showAddImage=!1,this.$modal.show("player")},getNumberOfPlayers:function(t){return t.players?t.players.map(function(t){return t.accounts}).reduce(function(t,e){return t+e},0):0},buildTooltipOptions:function(){return{permanent:!0,opacity:1,offset:new L.Point(0,-50),direction:"top"}},getEndDate:function(t){return s(new Date(new Date(t).getTime()+27e5))},raidModified:function(t){this.showToast(t.message),this.loadData()},closeModal:function(){this.showAddImage=!0},addCoordinates:function(t){var e=this;return b()(g.a.mark(function n(){var a,i,r,o,s,c;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=!0,i=!1,r=void 0,e.prev=3,o=v()(t);case 5:if(a=(s=o.next()).done){e.next=13;break}return c=s.value,e.next=9,x(c.gymId);case 9:c.gym=e.sent;case 10:a=!0,e.next=5;break;case 13:e.next=19;break;case 15:e.prev=15,e.t0=e.catch(3),i=!0,r=e.t0;case 19:e.prev=19,e.prev=20,!a&&o.return&&o.return();case 22:if(e.prev=22,!i){e.next=25;break}throw r;case 25:return e.finish(22);case 26:return e.finish(19);case 27:return e.abrupt("return",t);case 28:case"end":return e.stop()}},n,e,[[3,15,19,27],[20,,22,26]])}))()},buildIcon:function(t){return new L.DivIcon({iconSize:[50,50],iconAnchor:[25,50],popupAnchor:[0,-50],html:'<div class="gym-marker '+(t.ex_eligible?"gym-ex":"")+'"></div>'})},loadData:function(){var t=this;return b()(g.a.mark(function e(){var n,a,i,r,s,c,l;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.t0=t,e.next=4,o();case 4:return e.t1=e.sent,e.next=7,e.t0.addCoordinates.call(e.t0,e.t1);case 7:for(n=e.sent,t.markers=[],a=!0,i=!1,r=void 0,e.prev=12,s=v()(n);!(a=(c=s.next()).done);a=!0)l=c.value,t.markers.push({id:l.id,raid:l,latLng:{lat:l.gym.latitude,lng:l.gym.longitude},icon:t.buildIcon(l.gym)});e.next=20;break;case 16:e.prev=16,e.t2=e.catch(12),i=!0,r=e.t2;case 20:e.prev=20,e.prev=21,!a&&s.return&&s.return();case 23:if(e.prev=23,!i){e.next=26;break}throw r;case 26:return e.finish(23);case 27:return e.finish(20);case 28:t.loading=!1;case 29:case"end":return e.stop()}},e,t,[[12,16,20,28],[21,,23,27]])}))()},showToast:function(t){this.toast.text=t,this.toast.visible=!0},toggleLocation:function(){var t=this;console.log("enable location"),this.location.loading=!0,navigator.geolocation.getCurrentPosition(function(e){console.log("current position",e),t.location.position={latLng:{lat:e.coords.latitude,lng:e.coords.longitude},icon:new L.DivIcon({html:'<span class="location-badge"><i class="fas fa-circle"></i></span>'})},t.map.center=[e.coords.latitude,e.coords.longitude],t.location.loading=!1},function(e){console.log("unable to get location",e),t.location.loading=!1})}}},rt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("v-app",[n("v-map",{attrs:{zoom:15,center:t.map.center}},[t._l(t.tileLayers,function(t){return n("v-tilelayer",{key:t.url,attrs:{url:t.url,options:t.options}})}),t._v(" "),t._l(t.markers,function(e){return n("v-marker",{key:e.id,attrs:{"lat-lng":e.latLng,icon:e.icon,options:e.options}},[e.raid?n("v-popup",[n("div",{staticStyle:{width:"150px","text-align":"center"}},[n("div",{staticClass:"gymName"},[t._v(t._s(e.raid.gym.name))]),t._v("\n            5 ★"),n("br"),t._v("\n            Pop : "+t._s(t.toPrintedDate(e.raid.hatchTime))),n("br"),t._v("\n            Fin : "+t._s(t.getEndDate(e.raid.hatchTime))),n("br"),t._v("\n            On lance à : "+t._s(e.raid.raidStartTime?t.toPrintedDate(e.raid.raidStartTime):"-")),n("br"),t._v(" "),n("a",{attrs:{href:"#"},on:{click:function(n){t.showAddRaid(e.raid)}}},[t._v("Modifier")]),t._v(" "),n("div",{staticStyle:{"margin-top":"10px"}},[n("strong",[t._v(t._s(t.getNumberOfPlayers(e.raid))+" participants")])]),t._v(" "),n("div",[n("a",{attrs:{href:"#"},on:{click:function(n){t.showAddPlayer(e.raid)}}},[t._v("Ajouter un participant")])])])]):t._e(),t._v(" "),e.raid?n("v-tooltip",{attrs:{options:t.buildTooltipOptions()}},[n("raid-count-down",{attrs:{raid:e.raid}})],1):t._e()],1)}),t._v(" "),t.location.position?n("v-marker",{attrs:{"lat-lng":t.location.position.latLng,icon:t.location.position.icon,options:t.location.position.options}}):t._e()],2),t._v(" "),n("manage-raid",{attrs:{raid:t.selectedRaid},on:{raidModified:function(e){t.raidModified(e)},closeModal:function(e){t.closeModal()}}}),t._v(" "),n("add-player",{attrs:{raid:t.selectedRaid},on:{playerAdded:function(e){t.raidModified(e)},closeModal:function(e){t.closeModal()}}}),t._v(" "),n("div",{staticClass:"actions-panel"},[n("div",{staticClass:"action-btn action-add",on:{click:function(e){t.showAddRaid()}}},[n("i",{staticClass:"fas fa-plus"})]),t._v(" "),n("div",{staticClass:"action-btn action-location",class:{rotating:t.location.loading},on:{click:function(e){t.toggleLocation()}}},[n("i",{staticClass:"fas fa-location-arrow"})]),t._v(" "),n("div",{staticClass:"action-btn action-reload",class:{rotating:t.loading},on:{click:function(e){t.loadData()}}},[n("i",{staticClass:"fas fa-sync-alt"})])]),t._v(" "),n("v-snackbar",{attrs:{timeout:2e3,top:!0},model:{value:t.toast.visible,callback:function(e){t.$set(t.toast,"visible",e)},expression:"toast.visible"}},[t._v("\n      "+t._s(t.toast.text)+"\n      "),n("v-btn",{attrs:{flat:""},nativeOn:{click:function(e){t.toast.visible=!1}}},[t._v("Close")])],1)],1)],1)},ot=[],st={render:rt,staticRenderFns:ot},ct=st,lt=n("VU/8"),ut=m,dt=lt(it,ct,!1,ut,null,null),mt=dt.exports,pt=n("sUu7"),ft=n("v9es"),vt=n("MdIv"),ht=n("rifk"),gt=n.n(ht),yt=n("IZMb"),bt=n.n(yt),_t=n("3EgV"),kt=n.n(_t),wt=(n("7zck"),n("IHMs")),xt=n.n(wt);n("j1ja"),n("rplX");p.a.config.productionTip=!1,p.a.use(pt.a),p.a.use(gt.a),p.a.use(bt.a),p.a.use(kt.a,{theme:{primary:xt.a.grey.darken4}}),p.a.component("countdown",ft.a),p.a.component("v-map",vt.Map),p.a.component("v-tilelayer",vt.TileLayer),p.a.component("v-marker",vt.Marker),p.a.component("v-popup",vt.Popup),p.a.component("v-tooltip",vt.Tooltip),new p.a({el:"#app",template:"<App/>",components:{App:mt}})},Z5FK:function(t,e){},kWBS:function(t,e){}},[0]);
//# sourceMappingURL=main.b09575bf1f7eebbb3c24.js.map