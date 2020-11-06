(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{0:function(e,t,s){e.exports=s("zUnb")},"0hB7":function(e,t,s){"use strict";s.d(t,"a",(function(){return o}));var n=s("V2kc"),r=s("fXoL");let o=(()=>{class e{constructor(){this.user=new n.a,this.token="",this.getSession()}doSignIn(e,t){e&&t&&(this.user=e,this.token=t,localStorage.setItem("USER",JSON.stringify(this.user)),localStorage.setItem("TOKEN",JSON.stringify(this.token)))}updateUser(e){e&&(this.user=e,localStorage.setItem("USER",JSON.stringify(this.user)))}doSignOut(){this.user=new n.a,localStorage.removeItem("USER"),localStorage.removeItem("TOKEN")}get isSignedIn(){return!!localStorage.getItem("USER")||!!localStorage.getItem("TOKEN")}getSession(){try{this.user=JSON.parse(localStorage.getItem("USER")),this.token=JSON.parse(localStorage.getItem("TOKEN"))}catch(e){this.user=new n.a,this.token=""}}get isAdmin(){return"admin"===this.user.role}get isUser(){return"user"===this.user.role}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=r.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},"0kbX":function(e,t,s){"use strict";s.d(t,"a",(function(){return o}));var n=s("fXoL"),r=s("dNgK");let o=(()=>{class e{constructor(e){this.snackBar=e,this.horizontalPosition="center",this.verticalPosition="top"}openSnackBar(e){this.snackBar.open(e,null,{panelClass:["warn-snackbar"],duration:4500})}manageStatusCode(e){switch(e){case 200:break;case 199:case 201:case 204:this.notifyOk(e,this.listMessage(e));break;case 404:case 401:case 403:case 500:this.notifyAlert(e,this.listMessage(e));break;case 250:default:this.notifyOk(e,this.listMessage(e))}}notifyOk(e,t){this.snackBar.open(t,null,{panelClass:["green-snackbar"],duration:2500})}notifyAlert(e,t){this.snackBar.open(t,null,{panelClass:["alert-snackbar"],duration:3500})}message(e){}listMessage(e){const t=[{code:202,message:e+": Enregistrement a \xe9t\xe9 bien supprim\xe9"},{code:201,message:e+": Enregistrement a \xe9t\xe9 bien ajout\xe9"},{code:204,message:e+": Enregistrement a \xe9t\xe9 bien edit\xe9"},{code:404,message:e+": Chemin non trouv\xe9"},{code:401,message:e+": Chemin non autoris\xe9"},{code:403,message:e+": Chemin Interdit"},{code:250,message:e+": Les enregistrements on \xe9t\xe9 ajout\xe9s"},{code:500,message:e+": Impossible d'effectuer cette op\xe9ration"}].find(t=>t.code===e);return t?t.message:e+": erreur inconnue"}}return e.\u0275fac=function(t){return new(t||e)(n.Wb(r.a))},e.\u0275prov=n.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},M0ag:function(e,t,s){"use strict";var n=s("0hB7");s.d(t,"a",(function(){return n.a}))},V2kc:function(e,t,s){"use strict";s.d(t,"a",(function(){return n}));class n{constructor(){this.id=0,this.name="",this.email="",this.password="",this.isActive=!1,this.date=new Date,this.role="",this.imageUrl=""}}},zUnb:function(e,t,s){"use strict";s.r(t);var n=s("fXoL"),r=s("ofXK"),o=s("bv9b"),i=s("Xa2L");let a=(()=>{class e{}return e.\u0275mod=n.Kb({type:e}),e.\u0275inj=n.Jb({factory:function(t){return new(t||e)},imports:[[r.c,o.b,i.a]]}),e})();var c=s("jhN1"),u=s("tk/3"),l=s("tyNb"),h=s("lJxs"),d=s("pLZG"),p=s("IzEk"),b=s("3E0/"),g=s("R0Ic");let f=(()=>{class e{constructor(e,t,s){this.router=e,this.document=t,this.animationBuilder=s,this.init()}init(){this.splashScreenElem=this.document.body.querySelector("#splash-screen"),this.splashScreenElem&&this.router.events.pipe(Object(h.a)(e=>e),Object(d.a)(e=>e instanceof l.b),Object(p.a)(1),Object(b.a)(700)).subscribe(()=>this.hide())}hide(){const e=this.animationBuilder.build([Object(g.l)({opacity:1}),Object(g.e)("400ms cubic-bezier(0.25, 0.8, 0.25, 1)",Object(g.l)({opacity:0}))]).create(this.splashScreenElem);e.onDone(()=>{}),e.play()}}return e.\u0275fac=function(t){return new(t||e)(n.Wb(l.e),n.Wb(r.d),n.Wb(g.b))},e.\u0275prov=n.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var m=s("HDdC");let v=(()=>{class e{constructor(){this.ipc=null,this.remote=null,window&&window.process&&window.process.type&&(this.ipc=window.require("electron").ipcRenderer,this.remote=window.require("electron").remote)}get(e){return this.ipc.send(e),new m.a(e=>this.ipc.prependOnceListener("angular",(t,s)=>e.next(s)))}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=n.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var k=s("2Vo4");let w=(()=>{class e{constructor(){this.isLoading=new k.a({isBegin:!1,count:0})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=n.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();function y(e,t){if(1&e&&(n.Sb(0,"span",1),n.Nb(1,"mat-progress-bar",2),n.ec(2,"async"),n.Rb()),2&e){const e=n.dc();n.Bb(1),n.ic("value",n.fc(2,1,e.loader.isLoading).count)}}let O=(()=>{class e{constructor(e){this.loader=e,this.isOpen=!0}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(n.Mb(w))},e.\u0275cmp=n.Gb({type:e,selectors:[["app-loader"]],decls:2,vars:3,consts:[["class","topbar",4,"ngIf"],[1,"topbar"],["mode","determinate","color","primary",2,"height","3px",3,"value"]],template:function(e,t){1&e&&(n.xc(0,y,3,3,"span",0),n.ec(1,"async")),2&e&&n.ic("ngIf",n.fc(1,1,t.loader.isLoading).isBegin)},directives:[r.k,o.a],pipes:[r.b],styles:[".mat-spinner.mat-accent[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%],   .mat-progress-spinner.mat-accent circle{stroke:#fff!important}.topbar[_ngcontent-%COMP%]{position:absolute;width:100%;z-index:20;top:0}.myspinner[_ngcontent-%COMP%]{position:absolute;right:0;top:50%;z-index:19;background-color:grey;padding:5px 10px 5px 5px;border-radius:5px 0 0 5px}.myspinner[_ngcontent-%COMP%]   .percentage[_ngcontent-%COMP%]{position:absolute;top:17px;left:12px;z-index:20;color:#fff}"],data:{animation:[Object(g.n)("openClose",[Object(g.k)("open",Object(g.l)({right:0})),Object(g.k)("closed",Object(g.l)({right:"-52px"})),Object(g.m)("open <=> closed",[Object(g.e)("0.5s")])])]}}),e})(),S=(()=>{class e{constructor(e,t){this.splashScreenService=e,this.electron=t}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(n.Mb(f),n.Mb(v))},e.\u0275cmp=n.Gb({type:e,selectors:[["app-root"]],decls:2,vars:0,template:function(e,t){1&e&&(n.Nb(0,"app-loader"),n.Nb(1,"router-outlet"))},directives:[O,l.i],styles:[""]}),e})();var I=s("R1ws"),x=s("zg4H"),j=s("0hB7");const C=[{path:"",redirectTo:"auth",pathMatch:"full"},{path:"auth",loadChildren:()=>Promise.all([s.e(1),s.e(3)]).then(s.bind(null,"Yj9t")).then(e=>e.AuthModule)},{path:"admin",loadChildren:()=>Promise.all([s.e(1),s.e(2)]).then(s.bind(null,"jkDv")).then(e=>e.AdminModule),canActivate:[(()=>{class e{constructor(e,t){this.session=e,this.router=t}canActivate(e,t){return!!this.session.isSignedIn||(this.router.navigate(["/auth"]),!1)}}return e.\u0275fac=function(t){return new(t||e)(n.Wb(j.a),n.Wb(l.e))},e.\u0275prov=n.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()]}];let R=(()=>{class e{}return e.\u0275mod=n.Kb({type:e}),e.\u0275inj=n.Jb({factory:function(t){return new(t||e)},imports:[[l.h.forRoot(C,{preloadingStrategy:l.d})],l.h]}),e})();var q=s("0kbX"),B=s("M0ag");let E=(()=>{class e{constructor(e,t,s,n){this.loaderService=e,this.router=t,this.snackBar=s,this.session=n,this.requests=[],this.cachedRequests=[],this.max=0,this.percentage=0}intercept(e,t){return this.requests.push(e),this.calculPercentage(this.requests.length),new m.a(s=>{const n=e.clone({setHeaders:{Authorization:"Bearer "+this.session.token}}),r=t.handle(n).subscribe(t=>{t instanceof u.f&&(this.removeRequest(e),s.next(t),this.snackBar.manageStatusCode(t.status))},t=>{t instanceof u.d&&(401===t.status||403===t.status?(console.log(t.status,t.statusText),this.router.navigate(["/admin"])):this.snackBar.manageStatusCode(t.status)),this.removeRequest(e),s.error(t)},()=>{this.removeRequest(e),s.complete()});return()=>{this.removeRequest(e),r.unsubscribe()}})}removeRequest(e){const t=this.requests.indexOf(e);t>=0&&(this.requests.splice(t,1),this.calculPercentage(this.requests.length))}collectFailedRequest(e){this.cachedRequests.push(e)}retryFailedRequests(){}calculPercentage(e){0===e?(this.percentage=100,this.max=0,this.loaderService.isLoading.next({isBegin:this.requests.length>0,count:+this.percentage.toFixed(0)})):(this.max=this.max>e?this.max:e,this.percentage=100-100*e/this.max,this.loaderService.isLoading.next({isBegin:!0,count:+this.percentage.toFixed(0)}))}}return e.\u0275fac=function(t){return new(t||e)(n.Wb(w),n.Wb(l.e),n.Wb(q.a),n.Wb(B.a))},e.\u0275prov=n.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var M=s("/t3+"),N=s("f0Cb"),P=s("bTqV"),L=s("dNgK"),U=s("0IaG");let z=(()=>{class e{constructor(e){this.injector=e,x.a.injector=this.injector}}return e.\u0275mod=n.Kb({type:e,bootstrap:[S]}),e.\u0275inj=n.Jb({factory:function(t){return new(t||e)(n.Wb(n.t))},providers:[{provide:u.a,useClass:E,multi:!0}],imports:[[c.a,R,u.c,M.b,i.a,N.b,P.b,L.b,U.f,I.b,a]]}),e})();Object(n.U)(),c.c([{provide:"BASE_URL",useValue:"http://localhost:9001"},{provide:"API_URL",useValue:"http://localhost:9001/api"}]).bootstrapModule(z).catch(e=>console.error(e))},zg4H:function(e,t,s){"use strict";s.d(t,"a",(function(){return r}));var n=s("fXoL");let r=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=n.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},zn8P:function(e,t){function s(e){return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}))}s.keys=function(){return[]},s.resolve=s,e.exports=s,s.id="zn8P"}},[[0,0,10]]]);