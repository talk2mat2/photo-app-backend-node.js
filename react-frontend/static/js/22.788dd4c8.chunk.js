(this.webpackJsonpogaphoto=this.webpackJsonpogaphoto||[]).push([[22],{1057:function(e,s,t){"use strict";t.r(s);var c=t(6),a=t(4),l=t(0),i=t(1),r=t.n(i),n=t(614),j=t(12),o=t.n(j);s.default=function(e){var s=e.match.params.id,t=r.a.useState({Porthfolio_works:[]}),i=Object(a.a)(t,2),j=i[0],d=i[1],b=r.a.useState(!1),m=Object(a.a)(b,2),h=(m[0],m[1]);return r.a.useEffect((function(){h(!0),o.a.get("".concat("","/users/getPhotoGraphebyId/").concat(s)).then((function(e){h(!1),console.log(e.data),d(Object(c.a)({photographer:j},e.data.userData))})).catch((function(e){h(!1),e.response?console.log(e.response.data.message):console.log("error occured"),console.log(e)}))}),[]),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(n.a,{}),Object(l.jsx)("div",{className:"detailSection container ",children:Object(l.jsxs)("section",{id:"blog-list-section",className:"blog-list-classic",children:[Object(l.jsx)("div",{style:{height:"30px"}}),Object(l.jsxs)("div",{className:"blog-list-inner tt-wrap",children:[" ",Object(l.jsxs)("div",{className:"row no-margin justify-content-between",children:[Object(l.jsxs)("div",{className:"col-md-12 no-padding-left no-padding-right",children:[Object(l.jsx)("div",{className:"isotope-wrap",children:Object(l.jsx)("div",{className:"isotope col-3 gutter-3",children:Object(l.jsxs)("div",{className:"isotope-items-wrap no-margin",children:[Object(l.jsx)("div",{className:"grid-sizer"}),Object(l.jsx)("div",{className:"isotope-item",children:Object(l.jsxs)("article",{className:"blog-list-item",children:[Object(l.jsx)("a",{href:"/#",className:"bl-item-image",children:Object(l.jsx)("img",{src:j.profileImage||"/assets/img/blog/list/featured-carousel/blog-fc-1.jpg",alt:""})}),Object(l.jsxs)("div",{className:"bl-item-info",children:[Object(l.jsx)("div",{className:"bl-item-category"}),Object(l.jsx)("h3",{className:'bl-item-title"',children:Object(l.jsxs)("b",{children:[j.fname," ",j.lname," "]})}),Object(l.jsxs)("h4",{children:[Object(l.jsxs)("b",{children:["Favourite shoots: ",j.favouriteShoots]})," "]}),Object(l.jsxs)("h4",{children:[Object(l.jsxs)("b",{children:["Phone: ",j.mobile]})," "]}),Object(l.jsx)("div",{className:"bl-item-meta"}),Object(l.jsx)("div",{className:"bl-item-desc",children:Object(l.jsx)("p",{children:j.aboutMe})})]})]})}),Object(l.jsxs)("div",{style:{margin:"40px"},className:"isotope-wrap ",children:[Object(l.jsx)("div",{className:"tt-heading tt-heading-lg padding-on text-center",children:Object(l.jsxs)("div",{className:"tt-heading-inner tt-wrap",children:[Object(l.jsx)("h1",{className:"tt-heading-title",children:"Past Works"}),Object(l.jsxs)("div",{className:"tt-heading-subtitle",children:["List showing previous works of ",j.fname,Object(l.jsx)("hr",{className:"hr-short"})]})]})}),Object(l.jsx)("div",{className:"isotope col-4",children:Object(l.jsxs)("div",{className:"isotope-items-wrap gli-colored gli-alter-4",children:[Object(l.jsx)("div",{className:"grid-sizer"}),j.Porthfolio_works&&j.Porthfolio_works.map((function(e){return Object(l.jsx)("div",{className:"isotope-item iso-height-1",children:Object(l.jsxs)("div",{className:"gallery-list-item",children:[Object(l.jsxs)("div",{className:"gl-item-image-wrap",children:[Object(l.jsxs)("a",{href:"/#",className:"gl-item-image-inner",children:[Object(l.jsx)("div",{className:"gl-item-image bg-image",style:{backgroundImage:"url("+e.imgUri+")",backgroundPosition:"50% 50%"}}),Object(l.jsx)("span",{className:"gl-item-image-zoom"})]}),Object(l.jsx)("ul",{className:"gli-meta",children:Object(l.jsx)("li",{})})]}),Object(l.jsx)("div",{className:"gl-item-info",children:Object(l.jsx)("div",{className:"gl-item-caption",children:Object(l.jsx)("h2",{className:"gl-item-title",children:Object(l.jsxs)("a",{href:"/#",children:["By ",j.fname]})})})})]})})}))]})})]})]})})})," "]})," "]})," "]})," "]})})]})}},614:function(e,s,t){"use strict";var c=t(4),a=t(15),l=t(0),i=t(1),r=t(9),n=t(11),j=(t(145),t(181)),o=t.n(j),d=(t(17),t(280),t(14)),b=t(61),m=t(70),h=t.n(m);function O(){var e=Object(a.a)([""]);return O=function(){return e},e}d.a.div(O());s.a=function(){Object(r.c)((function(e){return e.auth})),Object(r.b)();var e=Object(r.c)((function(e){return e.user.currentUser})),s=e&&e.userData,t=Object(i.useState)(null),a=Object(c.a)(t,2);a[0],a[1];return Object(l.jsxs)("header",{id:"header",className:"header-show-hide-on-scroll menu-align-right ",children:[Object(l.jsxs)(b.a,{children:[Object(l.jsx)("link",{rel:"stylesheet",href:"assets/vendor/bootstrap/css/bootstrap.min.css"}),Object(l.jsx)("script",{src:"/assets/vendor/jquery.mousewheel.min.js"}),Object(l.jsx)("script",{src:"/assets/vendor/ytplayer/js/jquery.mb.YTPlayer.min.js"}),Object(l.jsx)("script",{src:"/assets/vendor/lightgallery/js/lightgallery-all.min.js"}),Object(l.jsx)("script",{src:"/assets/js/theme.js"}),Object(l.jsx)("script",{src:"/assets/demo-panel/js/demo-panel.js"}),Object(l.jsx)("script",{src:"/assets/demo-panel/js/styleswitch.js"})]}),Object(l.jsxs)("div",{className:"header-inner tt-wrap",children:[Object(l.jsxs)("div",{id:"logo",children:[Object(l.jsx)("a",{href:"/",className:"logo-dark",children:Object(l.jsx)("img",{src:"/media/logo-dark.png",alt:"logo"})}),Object(l.jsx)("a",{href:"/",className:"logo-light",children:Object(l.jsx)("img",{src:"/assets/img/logo-light.png",alt:"logo"})}),Object(l.jsx)("a",{href:"/",className:"logo-dark-m",children:Object(l.jsx)("img",{src:"/assets/img/logo-dark-m.png",alt:"logo"})}),Object(l.jsx)("a",{href:"/",className:"logo-light-m",children:Object(l.jsx)("img",{src:"/assets/img/logo-light-m.png",alt:"logo"})})]}),Object(l.jsxs)("nav",{className:"tt-main-menu",children:[Object(l.jsx)("div",{id:"tt-m-menu-toggle-btn",children:Object(l.jsx)("span",{})}),Object(l.jsx)("div",{className:"tt-menu-tools",children:Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:Object(l.jsxs)("div",{className:"tt-clobal-search",children:[Object(l.jsxs)("div",{className:"tt-clobal-search-inner",children:[Object(l.jsx)("span",{className:"tt-clobal-search-title",children:"Search"}),Object(l.jsxs)("form",{id:"tt-clobal-search-form",className:"form-btn-inside",method:"get",action:"",children:[Object(l.jsx)("input",{type:"text",id:"tt-clobal-search-input",name:"search",placeholder:"Type your keywords ..."}),Object(l.jsx)("button",{type:"submit",children:Object(l.jsx)("i",{className:"fas fa-search"})})]})]}),Object(l.jsx)("div",{className:"tt-clobal-search-close",children:Object(l.jsx)("i",{className:"tt-close-btn tt-close-light"})})]})}),s?Object(l.jsx)("li",{className:" tt-dropdown-master tt-dropdown-dark tt-dropdown-right tt-tools-lang",children:Object(l.jsx)("a",{href:"/dashboard",children:Object(l.jsx)(o.a,{fontSize:"medium"})})}):Object(l.jsx)("li",{className:" tt-dropdown-master tt-dropdown-dark tt-dropdown-right tt-tools-lang",children:Object(l.jsx)(n.b,{to:"/signUp",children:"Log In"})}),Object(l.jsx)("li",{children:Object(l.jsxs)(n.b,{style:{textDecoration:"none"},to:"/Purpose",className:"tt-tools-button",target:"_blank",children:["Hire",Object(l.jsx)("span",{className:"hide-from-sm",children:" a photographer"}),"!"]})})]})}),Object(l.jsx)("div",{className:"tt-menu-collapse tt-submenu-dark",children:Object(l.jsxs)("ul",{className:"tt-menu-nav",children:[Object(l.jsx)("li",{className:" tt-submenu-master ",children:Object(l.jsxs)("a",{href:"/#blog-list-section",children:[Object(l.jsx)(h.a,{fontSize:"small"}),"How It Works"]})})," ",Object(l.jsx)("li",{className:" tt-submenu-master",style:{lineHeight:"auto"},children:Object(l.jsxs)("a",{href:"/#specialist",children:[Object(l.jsx)(h.a,{fontSize:"small"}),"Specialties"]})})," ","  ",Object(l.jsx)("li",{className:" tt-submenu-master",children:Object(l.jsxs)("a",{href:"/#Servicepricing",children:[Object(l.jsx)(h.a,{fontSize:"small"}),"Pricing"]})})," ","  ",Object(l.jsx)("li",{className:" tt-submenu-master",children:Object(l.jsxs)("a",{href:"/#gallery-list-section",children:[Object(l.jsx)(h.a,{fontSize:"small"}),"Portfolio"]})})," ","  ","  ",Object(l.jsx)("li",{className:" tt-submenu-master",children:Object(l.jsxs)("a",{href:"/#contact-section",children:[Object(l.jsx)(h.a,{fontSize:"small"}),"Contact"]})})," ",s?null:Object(l.jsx)("li",{className:" tt-submenu-master ",children:Object(l.jsxs)("a",{href:"/PhotographersRegister",children:[Object(l.jsx)(h.a,{fontSize:"small"}),"Become A Photographer"]})})]})})]})]})]})}}}]);
//# sourceMappingURL=22.788dd4c8.chunk.js.map