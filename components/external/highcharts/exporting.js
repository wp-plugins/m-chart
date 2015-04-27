!function(a){var b,c,d=a.Chart,e=a.addEvent,f=a.removeEvent,g=HighchartsAdapter.fireEvent,h=a.createElement,i=a.discardElement,j=a.css,k=a.merge,l=a.each,m=a.extend,n=a.splat,o=Math,p=o.max,q=document,r=window,s=a.isTouchDevice,t="M",u="L",v="div",w="hidden",x="none",y="highcharts-",z="absolute",A="px",B=a.Renderer.prototype.symbols,C=a.getOptions();m(C.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"}),C.navigation={menuStyle:{border:"1px solid #A0A0A0",background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:x,color:"#303030",fontSize:s?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}},C.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{menuClassName:y+"contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}},a.post=function(a,b,c){var d,e;e=h("form",k({method:"post",action:a,enctype:"multipart/form-data"},c),{display:x},q.body);for(d in b)h("input",{type:w,name:d,value:b[d]},null,e);e.submit(),i(e)},m(d.prototype,{sanitizeSVG:function(a){return a.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g," ").replace(/&shy;/g,"­").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()})},getSVG:function(c){var d,e,f,g,j,o,p,r,s=this,t=k(s.options,c);return q.createElementNS||(q.createElementNS=function(a,b){return q.createElement(b)}),e=h(v,null,{position:z,top:"-9999em",width:s.chartWidth+A,height:s.chartHeight+A},q.body),p=s.renderTo.style.width,r=s.renderTo.style.height,j=t.exporting.sourceWidth||t.chart.width||/px$/.test(p)&&parseInt(p,10)||600,o=t.exporting.sourceHeight||t.chart.height||/px$/.test(r)&&parseInt(r,10)||400,m(t.chart,{animation:!1,renderTo:e,forExport:!0,width:j,height:o}),t.exporting.enabled=!1,delete t.data,t.series=[],l(s.series,function(a){g=k(a.options,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible}),g.isInternal||t.series.push(g)}),c&&l(["xAxis","yAxis"],function(a){l(n(c[a]),function(b,c){t[a][c]=k(t[a][c],b)})}),d=new a.Chart(t,s.callback),l(["xAxis","yAxis"],function(a){l(s[a],function(c,e){var f=d[a][e],g=c.getExtremes(),h=g.userMin,i=g.userMax;!f||h===b&&i===b||f.setExtremes(h,i,!0,!1)})}),f=d.container.innerHTML,t=null,d.destroy(),i(e),f=this.sanitizeSVG(f),f=f.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},getSVGForExport:function(a,b){var c=this.options.exporting;return this.getSVG(k({chart:{borderRadius:0}},c.chartOptions,b,{exporting:{sourceWidth:a&&a.sourceWidth||c.sourceWidth,sourceHeight:a&&a.sourceHeight||c.sourceHeight}}))},exportChart:function(b,c){var d=this.getSVGForExport(b,c);b=k(this.options.exporting,b),a.post(b.url,{filename:b.filename||"chart",type:b.type,width:b.width||0,scale:b.scale||2,svg:d},b.formAttributes)},print:function(){var a=this,b=a.container,c=[],d=b.parentNode,e=q.body,f=e.childNodes;a.isPrinting||(a.isPrinting=!0,g(a,"beforePrint"),l(f,function(a,b){1===a.nodeType&&(c[b]=a.style.display,a.style.display=x)}),e.appendChild(b),r.focus(),r.print(),setTimeout(function(){d.appendChild(b),l(f,function(a,b){1===a.nodeType&&(a.style.display=c[b])}),a.isPrinting=!1,g(a,"afterPrint")},1e3))},contextMenu:function(a,b,c,d,g,i,k){var n,o,q,r,s=this,t=s.options.navigation,u=t.menuItemStyle,w=s.chartWidth,y=s.chartHeight,B="cache-"+a,C=s[B],D=p(g,i),E="3px 3px 10px #888",F=function(b){s.pointer.inClass(b.target,a)||o()};C||(s[B]=C=h(v,{className:a},{position:z,zIndex:1e3,padding:D+A},s.container),n=h(v,null,m({MozBoxShadow:E,WebkitBoxShadow:E,boxShadow:E},t.menuStyle),C),o=function(){j(C,{display:x}),k&&k.setState(0),s.openMenu=!1},e(C,"mouseleave",function(){q=setTimeout(o,500)}),e(C,"mouseenter",function(){clearTimeout(q)}),e(document,"mouseup",F),e(s,"destroy",function(){f(document,"mouseup",F)}),l(b,function(a){if(a){var b=a.separator?h("hr",null,null,n):h(v,{onmouseover:function(){j(this,t.menuItemHoverStyle)},onmouseout:function(){j(this,u)},onclick:function(){o(),a.onclick&&a.onclick.apply(s,arguments)},innerHTML:a.text||s.options.lang[a.textKey]},m({cursor:"pointer"},u),n);s.exportDivElements.push(b)}}),s.exportDivElements.push(n,C),s.exportMenuWidth=C.offsetWidth,s.exportMenuHeight=C.offsetHeight),r={display:"block"},c+s.exportMenuWidth>w?r.right=w-c-g-D+A:r.left=c-D+A,d+i+s.exportMenuHeight>y&&"top"!==k.alignOptions.verticalAlign?r.bottom=y-d-D+A:r.top=d+i-D+A,j(C,r),s.openMenu=!0},addButton:function(b){var d,e,f=this,g=f.renderer,h=k(f.options.navigation.buttonOptions,b),i=h.onclick,j=h.menuItems,l={stroke:h.symbolStroke,fill:h.symbolFill},n=h.symbolSize||12;if(f.btnCount||(f.btnCount=0),f.exportDivElements||(f.exportDivElements=[],f.exportSVGElements=[]),h.enabled!==!1){var o,p=h.theme,q=p.states,r=q&&q.hover,s=q&&q.select;delete p.states,i?o=function(){i.apply(f,arguments)}:j&&(o=function(){f.contextMenu(e.menuClassName,j,e.translateX,e.translateY,e.width,e.height,e),e.setState(2)}),h.text&&h.symbol?p.paddingLeft=a.pick(p.paddingLeft,25):h.text||m(p,{width:h.width,height:h.height,padding:0}),e=g.button(h.text,0,0,o,p,r,s).attr({title:f.options.lang[h._titleKey],"stroke-linecap":"round"}),e.menuClassName=b.menuClassName||y+"menu-"+f.btnCount++,h.symbol&&(d=g.symbol(h.symbol,h.symbolX-n/2,h.symbolY-n/2,n,n).attr(m(l,{"stroke-width":h.symbolStrokeWidth||1,zIndex:1})).add(e)),e.add().align(m(h,{width:e.width,x:a.pick(h.x,c)}),!0,"spacingBox"),c+=(e.width+h.buttonSpacing)*("right"===h.align?-1:1),f.exportSVGElements.push(e,d)}},destroyExport:function(a){var b,c,d=a.target;for(b=0;b<d.exportSVGElements.length;b++)c=d.exportSVGElements[b],c&&(c.onclick=c.ontouchstart=null,d.exportSVGElements[b]=c.destroy());for(b=0;b<d.exportDivElements.length;b++)c=d.exportDivElements[b],f(c,"mouseleave"),d.exportDivElements[b]=c.onmouseout=c.onmouseover=c.ontouchstart=c.onclick=null,i(c)}}),B.menu=function(a,b,c,d){var e=[t,a,b+2.5,u,a+c,b+2.5,t,a,b+d/2+.5,u,a+c,b+d/2+.5,t,a,b+d-1.5,u,a+c,b+d-1.5];return e},d.prototype.callbacks.push(function(a){var b,d=a.options.exporting,f=d.buttons;if(c=0,d.enabled!==!1){for(b in f)a.addButton(f[b]);e(a,"destroy",a.destroyExport)}})}(Highcharts);