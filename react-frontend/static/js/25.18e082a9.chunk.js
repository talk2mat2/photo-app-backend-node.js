(this.webpackJsonpogaphoto=this.webpackJsonpogaphoto||[]).push([[25],{1066:function(e,o,t){"use strict";t.r(o);var n=t(6),r=t(26),c=t(9),a=t.n(c),s=t(14),i=t(4),d=t(15),b=t(0),l=t(1),p=t.n(l),u=t(13),g=t(274),j=t(29),x=t.n(j),f=t(17),h=t(12),O=t.n(h),m=t(76),k=t.n(m),P=t(8),y=t(22),v=t(40),w=t(57);function H(){var e=Object(d.a)(["\n  && {\n\n\nmargin-top:8px;\n    color: rgb(190, 10, 10);\n    border-color: rgb(190, 10, 10);\n    &:focus {\n      background-color: white;\n    }\n    // @media (max-width: 1100px) {\n    //   display: none;\n    // }\n  }\n"]);return H=function(){return e},e}function S(){var e=Object(d.a)(["\nmargin-top:5px;\ndisplay:flex;\nflex-direction:column;\nalign-items:flex-start;\nbackground-color: #fffffff;\npadding:0px;\nwidth:95%;\nli{\n\tlist-style:none;\n\tfont-size:18px;\n\twidth:100%;\n  padding:10px;\n  border-radius:4px;\n  box-sizing:border-box;\n\tbackground-color: #ffff;\n\tcolor:grey;\n\tmargin-top:1.7px;\n  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;\n\tmargin-bottom:4px;\n  small{\n    font-size:14px;\n  }\n}\n"]);return S=function(){return e},e}function z(){var e=Object(d.a)(["\nfont-size:14px;\ncolor:grey;\nfont-weight:500;\n"]);return z=function(){return e},e}function C(){var e=Object(d.a)(["\nfont-size:20px;\ncolor:grey;\nfont-weight:500;\n"]);return C=function(){return e},e}function D(){var e=Object(d.a)(["\nwidth:100%;\ndisplay:flex;\nflex-direction:column;\npadding-bottom:20px;\nalign-items:center;\nbackground-color:#f1f0f0;\nmin-height:440px;\npadding-top:10px;\n"]);return D=function(){return e},e}var T=u.a.div(D()),E=u.a.p(C()),G=(u.a.p(z()),u.a.ul(S())),R=(Object(u.a)(g.a)(H()),function(e){var o=e.location.state.Data,t=Object(l.useState)({}),n=Object(i.a)(t,2),r=n[0],c=n[1],a=Object(y.g)(),s=Object(P.c)((function(e){return e.bookings})),d=Object(l.useState)(!1),u=Object(i.a)(d,2);u[0],u[1];Object(l.useEffect)((function(){s.length&&s.map((function(e){return e._id===o._id&&c(e)}))}),[s,o._id]);var j=p.a.useMemo((function(){return[r]}),[r]),f=p.a.useMemo((function(){return[{Header:"location",accessor:"address"},{Header:"location details",accessor:"bookingProcess.AdditionalAddress"},{Header:"Category",accessor:"bookingProcess.category"},{Header:"Purpose",accessor:"bookingProcess.purpose"},{Header:"Amount(NGN)",accessor:"bookingProcess.price"},{Header:"Status",accessor:"bookingProcess.status"},{Header:"payment type",accessor:"bookingProcess.payment_type"},{Header:"Event Date",accessor:"bookingProcess.date"},{Header:"Event Duration",accessor:"bookingProcess.duration"},{Header:"Event time(24h)",accessor:"bookingProcess.time"},{Header:"Photographer Name",accessor:"bookingProcess.choosenPhotoGrapher.fname"},{Header:"Photographer no.",accessor:"bookingProcess.choosenPhotoGrapher.mobile"}]}),[]),h=Object(w.useTable)({columns:f,data:j});h.getTableProps,h.getTableBodyProps,h.headerGroups,h.rows,h.prepareRow;return Object(b.jsxs)("div",{style:{backgroundColor:"#ffffff",borderRadius:"12px",minHeight:"560px",width:"94%",padding:"10px",marginTop:"20px",marginBottom:"20px",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center",position:"relative"},children:[Object(b.jsx)("div",{onClick:a.goBack,style:{position:"absolute",left:"50px",top:"18px",cursor:"pointer",zIndex:3},children:Object(b.jsx)(x.a,{style:{fontSize:"30px"}})}),Object(b.jsx)(E,{style:{textAlign:"center"},children:"Details"}),Object(b.jsxs)(G,{children:[Object(b.jsxs)("li",{style:{minHeight:"400px"},children:[Object(b.jsx)("br",{}),r.timeStart&&Object(b.jsxs)(b.Fragment,{children:[" ",Object(b.jsxs)("small",{children:["Event started at:","   ",Object(b.jsx)(k.a,{children:"".concat(r.timeStart)})]}),Object(b.jsx)("br",{})]}),Object(b.jsxs)("small",{children:["Event Status:","   ",r.completed?"ended":r.accepted?"processing":"pending"]}),Object(b.jsx)("br",{}),Object(b.jsxs)("small",{children:["Address :",r.bookingProcess&&r.bookingProcess.locations]}),Object(b.jsx)("br",{}),Object(b.jsxs)("small",{children:["Event Time:","   ",r.bookingProcess&&r.bookingProcess.time]}),Object(b.jsx)("br",{}),Object(b.jsxs)("small",{children:["Payment status:","   ",r.bookingProcess&&r.bookingProcess.status]}),Object(b.jsx)("br",{}),Object(b.jsxs)("small",{children:["Shots by:","   ",r.photographerId&&r.photographerId.fname]}),Object(b.jsx)("br",{}),Object(b.jsx)(g.a,{onClick:function(){r.bookingProcess&&Object(v.a)(r.bookingProcess)},style:{float:"inline-end",marginLeft:"30px",backgroundColor:"dodgerblue",color:"#ffffff",fontSize:"9px",marginTop:"120px"},children:"Download Ticket"})]}),Object(b.jsx)("br",{})]})]})});o.default=function(e){var o=e.match,t=e.history,c=Object(l.useState)([]),d=Object(i.a)(c,2),u=d[0],g=d[1],j=Object(P.b)(),x=Object(P.c)((function(e){return e.user.currentUser})),h=x&&x.token,m=function(){var e=Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("".concat("","/users/getSesssionHistory"),{headers:{authorization:h}}).then((function(e){console.log(e.data),g(e.data.userData),j(Object(f.a)(e.data.userData))})).catch((function(e){e.response&&console.log(e.response.data.message),console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(l.useEffect)((function(){m()}),[]);var k=p.a.useMemo((function(){return Object(r.a)(u)}),[u]),v=p.a.useMemo((function(){return[{Header:"location",accessor:"address"},{Header:"Event Date",accessor:"bookingProcess.date"},{Header:"Photographer Name",accessor:"bookingProcess.choosenPhotoGrapher.fname"},{Header:"Photographer no.",accessor:"bookingProcess.choosenPhotoGrapher.mobile"},{Header:"Event Status",accessor:"bookingProcess._id",Cell:function(e){var o=e.row;return o.original.completed?"ended":o.original.accepted?"accepted":"pending"}},{Header:"Details",Cell:function(e){var n=e.row;return Object(b.jsx)("button",{style:{border:"none",backgroundColor:"inherit",cursor:"pointer"},onClick:function(){console.log(n.original),t.push({pathname:"".concat(o.url,"/info"),state:{Data:n.original}})},children:"View"})}}]}),[]),H=Object(w.useTable)({columns:v,data:k}),S=H.getTableProps,z=H.getTableBodyProps,C=H.headerGroups,D=H.rows,G=H.prepareRow;return Object(b.jsx)(T,{children:Object(b.jsxs)(y.d,{children:[Object(b.jsx)(y.b,{exact:!0,path:o.url,children:Object(b.jsxs)("div",{style:{backgroundColor:"#ffffff",borderRadius:"8px",minHeight:"560px",width:"94%",padding:"10px",marginTop:"20px",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(b.jsx)(E,{style:{fontSize:"15px"},children:"My booking History"}),Object(b.jsx)("div",{style:{overflowX:"auto",maxWidth:"90%"},children:Object(b.jsxs)("table",Object(n.a)(Object(n.a)({},S()),{},{style:{border:"none"},children:[Object(b.jsx)("thead",{children:C.map((function(e){return Object(b.jsx)("tr",Object(n.a)(Object(n.a)({className:"mytablerow"},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(b.jsx)("th",Object(n.a)(Object(n.a)({},e.getHeaderProps()),{},{style:{color:"grey",height:"40px",fontSize:"12px",padding:"10px",borderRadius:"2px",boxSizing:"border-box",backgroundColor:"#e0dede"},children:e.render("Header")}))}))}))}))}),Object(b.jsx)("tbody",Object(n.a)(Object(n.a)({},z()),{},{children:D.map((function(e){return G(e),Object(b.jsx)("tr",Object(n.a)(Object(n.a)({className:"tableRowdata"},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(b.jsx)("td",Object(n.a)(Object(n.a)({},e.getCellProps()),{},{style:{padding:"3px",boxSizing:"border-box",fontSize:"13px",border:"none"},children:e.render("Cell")}))}))}))}))}))]}))})]})}),Object(b.jsx)(y.b,{path:"".concat(o.url,"/info"),component:R})]})})}}}]);
//# sourceMappingURL=25.18e082a9.chunk.js.map