(function(){"use strict";var n={5958:function(n,l,e){var t=e(5130),r=e(6768);function u(n,l,e,t,u,o){const a=(0,r.g2)("RouterView");return(0,r.uX)(),(0,r.Wv)(a,{jobs:u.emploi},null,8,["jobs"])}var o={name:"App",components:{},data(){return{emploi:[]}}},a=e(1241);const i=(0,a.A)(o,[["render",u]]);var s=i,b=e(1387);const p=(0,r.Lk)("p",{style:{"font-size":"30px"}},[(0,r.Lk)("b",null,"Tap on the job to see more details ")],-1),c=(0,r.Lk)("div",{style:{"margin-left":"0px",width:"14%"}},[(0,r.Lk)("button",{class:"add_but"},[(0,r.Lk)("span",null,[(0,r.Lk)("b",null,"+")]),(0,r.eW)(" ADD JOB")])],-1),d=(0,r.Lk)("br",null,null,-1),h=(0,r.Lk)("tr",null,[(0,r.Lk)("th",{id:"up_th"},"ID"),(0,r.Lk)("th",{id:"up_th"},"Titre"),(0,r.Lk)("th",{id:"up_th"},"Description"),(0,r.Lk)("th",{id:"up_th"},"Edit the job")],-1);function k(n,l,e,t,u,o){const a=(0,r.g2)("SHOW");return(0,r.uX)(),(0,r.CE)(r.FK,null,[p,c,d,(0,r.Lk)("table",null,[h,((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(u.jobs,(n=>((0,r.uX)(),(0,r.CE)("tr",null,[(0,r.bF)(a,{job:n},null,8,["job"])])))),256))])],64)}var L=e(4232);function f(n,l,e,t,u,o){return(0,r.uX)(),(0,r.CE)(r.FK,null,[(0,r.Lk)("th",{onClick:l[0]||(l[0]=n=>o.show_details(e.job))},[(0,r.Lk)("b",null,(0,L.v_)(e.job.id),1)]),(0,r.Lk)("th",{onClick:l[1]||(l[1]=n=>o.show_details(e.job))},[(0,r.Lk)("b",null,(0,L.v_)(e.job.titre),1)]),(0,r.Lk)("td",{onClick:l[2]||(l[2]=n=>o.show_details(e.job))},(0,L.v_)(e.job.description),1),(0,r.Lk)("th",null,[(0,r.Lk)("button",{class:"button_det",onClick:l[3]||(l[3]=n=>o.job_edit(e.job))},"Edit")])],64)}e(4114);var v={name:"SHOW",methods:{show_details(n){this.$router.push({name:"JOB_DETAIL",params:{id:n.id}})},job_edit(n){this.$router.push({name:"EDIT",params:{id:n.id}})}},props:["job"]};const m=(0,a.A)(v,[["render",f]]);var j=m,_={name:"Home",components:{SHOW:j},data(){return{jobs:[{id:1,titre:"Développeur Web",description:"Conception et développement de sites web modernes.",lieu:"Paris, France",salaire:5e4,type:"Temps plein"}]}},mounted(){fetch("http://localhost:3000/emplois").then((n=>n.json())).then((n=>this.jobs=n)).catch((n=>console.log(n.message)))}};const y=(0,a.A)(_,[["render",k]]);var T=y;const E={key:0,class:"details1"},O={style:{"font-size":"30px"}},C=(0,r.Lk)("br",null,null,-1),w=(0,r.Lk)("br",null,null,-1),I=(0,r.Lk)("span",null,[(0,r.Lk)("b",null,"The title : ")],-1),W=(0,r.Lk)("br",null,null,-1),D=(0,r.Lk)("br",null,null,-1),g=(0,r.Lk)("br",null,null,-1),x=(0,r.Lk)("span",null,[(0,r.Lk)("b",null," The description : ")],-1),A=(0,r.Lk)("br",null,null,-1),F=(0,r.Lk)("br",null,null,-1),H=(0,r.Lk)("br",null,null,-1),X=(0,r.Lk)("span",null,[(0,r.Lk)("b",null,"The place : ")],-1),B=(0,r.Lk)("br",null,null,-1),J=(0,r.Lk)("br",null,null,-1),K=(0,r.Lk)("br",null,null,-1),$=(0,r.Lk)("span",null,[(0,r.Lk)("b",null,"The salary :")],-1),S=(0,r.Lk)("br",null,null,-1),z=(0,r.Lk)("br",null,null,-1),P=(0,r.Lk)("br",null,null,-1),R=(0,r.Lk)("span",null,[(0,r.Lk)("b",null,"The type : ")],-1),G=(0,r.Lk)("br",null,null,-1),M=(0,r.Lk)("br",null,null,-1),Q=(0,r.Lk)("br",null,null,-1),V=(0,r.Lk)("br",null,null,-1);function q(n,l,e,t,u,o){return(0,r.uX)(),(0,r.CE)(r.FK,null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e.jobs,(n=>((0,r.uX)(),(0,r.CE)("div",null,[n.id==u.jobId?((0,r.uX)(),(0,r.CE)("div",E,[(0,r.Lk)("p",O,[(0,r.Lk)("b",null,[(0,r.eW)("Details for the job with id : "),(0,r.Lk)("span",null,[(0,r.Lk)("b",null,(0,L.v_)(u.jobId),1)])])]),C,w,(0,r.Lk)("label",null,[I,(0,r.eW)(" "+(0,L.v_)(n.titre),1)]),W,D,g,(0,r.Lk)("label",null,[x,(0,r.eW)(" "+(0,L.v_)(n.description),1)]),A,F,H,(0,r.Lk)("label",null,[X,(0,r.eW)(" "+(0,L.v_)(n.lieu),1)]),(0,r.eW)(),B,J,K,(0,r.Lk)("label",null,[$,(0,r.eW)(" "+(0,L.v_)(n.salaire),1)]),(0,r.eW)(),S,z,P,(0,r.Lk)("label",null,[R,(0,r.eW)(" "+(0,L.v_)(n.type),1)]),(0,r.eW)(),G,M,Q])):(0,r.Q3)("",!0)])))),256)),V,(0,r.Lk)("button",{class:"redirect",onClick:l[0]||(l[0]=n=>o.func())},"Redirect")],64)}var N={name:"JOB_DETAIL",props:["jobs"],data(){return{jobId:parseInt(this.$route.params.id)}},methods:{func(){this.$router.push({name:"Home"})}}};const U=(0,a.A)(N,[["render",q]]);var Y=U;const Z=(0,r.Fv)('<div class="details"><p style="font-size:30px;"><b>Give the informations you want to update for this job : <span></span></b></p><br><br><label><span><b>The title : <input type="text"></b></span><br><br><br></label><label><span><b> The description : <input type="text"></b></span><br><br><br></label><label><span><b>The place : <input type="text"></b></span><br><br><br></label><label><span><b>The salary : <input type="number"></b></span><br><br><br></label><label><span><b>The type : <input type="text"></b></span><br><br><br></label></div><br><br>',3);function nn(n,l,e,t,u,o){return(0,r.uX)(),(0,r.CE)(r.FK,null,[Z,(0,r.Lk)("button",{class:"redirect",onClick:l[0]||(l[0]=n=>o.func())},"Redirect")],64)}var ln={name:"EDIT",props:["jobs"],data(){return{jobId:parseInt(this.$route.params.id)}},methods:{func(){this.$router.push({name:"Home"})}}};const en=(0,a.A)(ln,[["render",nn]]);var tn=en;const rn=[{path:"/Home",name:"Home",component:T},{path:"/JOB_EDIT/:id",name:"EDIT",component:tn,props:!0},{path:"/SHOW",name:"SHOW",component:j,props:!0},{path:"/JOB_DETAIL/:id",name:"JOB_DETAIL",component:Y,props:!0}],un=(0,b.aE)({history:(0,b.LA)("/"),routes:rn});var on=un;(0,t.Ef)(s).use(on).mount("#app")}},l={};function e(t){var r=l[t];if(void 0!==r)return r.exports;var u=l[t]={exports:{}};return n[t].call(u.exports,u,u.exports,e),u.exports}e.m=n,function(){var n=[];e.O=function(l,t,r,u){if(!t){var o=1/0;for(b=0;b<n.length;b++){t=n[b][0],r=n[b][1],u=n[b][2];for(var a=!0,i=0;i<t.length;i++)(!1&u||o>=u)&&Object.keys(e.O).every((function(n){return e.O[n](t[i])}))?t.splice(i--,1):(a=!1,u<o&&(o=u));if(a){n.splice(b--,1);var s=r();void 0!==s&&(l=s)}}return l}u=u||0;for(var b=n.length;b>0&&n[b-1][2]>u;b--)n[b]=n[b-1];n[b]=[t,r,u]}}(),function(){e.n=function(n){var l=n&&n.__esModule?function(){return n["default"]}:function(){return n};return e.d(l,{a:l}),l}}(),function(){e.d=function(n,l){for(var t in l)e.o(l,t)&&!e.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:l[t]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){e.o=function(n,l){return Object.prototype.hasOwnProperty.call(n,l)}}(),function(){var n={524:0};e.O.j=function(l){return 0===n[l]};var l=function(l,t){var r,u,o=t[0],a=t[1],i=t[2],s=0;if(o.some((function(l){return 0!==n[l]}))){for(r in a)e.o(a,r)&&(e.m[r]=a[r]);if(i)var b=i(e)}for(l&&l(t);s<o.length;s++)u=o[s],e.o(n,u)&&n[u]&&n[u][0](),n[u]=0;return e.O(b)},t=self["webpackChunkapp7"]=self["webpackChunkapp7"]||[];t.forEach(l.bind(null,0)),t.push=l.bind(null,t.push.bind(t))}();var t=e.O(void 0,[504],(function(){return e(5958)}));t=e.O(t)})();
//# sourceMappingURL=app.f34dc982.js.map