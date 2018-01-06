!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../lib/codemirror")):"function"==typeof define&&define.amd?define(["../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";function b(a,b){return a.line==b.line&&a.ch==b.ch}function c(a){I.push(a),I.length>50&&I.shift()}function d(a){return I.length?void(I[I.length-1]+=a):c(a)}function e(a){return I[I.length-(a?Math.min(a,1):1)]||""}function f(){return I.length>1&&I.pop(),e()}function g(a,e,f,g,h){null==h&&(h=a.getRange(e,f)),"grow"==g&&J&&J.cm==a&&b(e,J.pos)&&a.isClean(J.gen)?d(h):g!==!1&&c(h),a.replaceRange("",e,f,"+delete"),J="grow"==g?{cm:a,pos:e,gen:a.changeGeneration()}:null}function h(a,b,c){return a.findPosH(b,c,"char",!0)}function i(a,b,c){return a.findPosH(b,c,"word",!0)}function j(a,b,c){return a.findPosV(b,c,"line",a.doc.sel.goalColumn)}function k(a,b,c){return a.findPosV(b,c,"page",a.doc.sel.goalColumn)}function l(a,b,c){for(var d=b.line,e=a.getLine(d),f=/\S/.test(c<0?e.slice(0,b.ch):e.slice(b.ch)),g=a.firstLine(),h=a.lastLine();;){if(d+=c,d<g||d>h)return a.clipPos(H(d-c,c<0?0:null));e=a.getLine(d);var i=/\S/.test(e);if(i)f=!0;else if(f)return H(d,0)}}function m(a,b,c){for(var d=b.line,e=b.ch,f=a.getLine(b.line),g=!1;;){var h=f.charAt(e+(c<0?-1:0));if(h){if(g&&/[!?.]/.test(h))return H(d,e+(c>0?1:0));g||(g=/\w/.test(h)),e+=c}else{if(d==(c<0?a.firstLine():a.lastLine()))return H(d,e);if(f=a.getLine(d+c),!/\S/.test(f))return H(d,e);d+=c,e=c<0?f.length:0}}}function n(a,c,d){var e;if(a.findMatchingBracket&&(e=a.findMatchingBracket(c,{strict:!0}))&&e.match&&(e.forward?1:-1)==d)return d>0?H(e.to.line,e.to.ch+1):e.to;for(var f=!0;;f=!1){var g=a.getTokenAt(c),h=H(c.line,d<0?g.start:g.end);if(!(f&&d>0&&g.end==c.ch)&&/\w/.test(g.string))return h;var i=a.findPosH(h,d,"char");if(b(h,i))return c;c=i}}function o(a,b){var c=a.state.emacsPrefix;return c?(w(a),"-"==c?-1:Number(c)):b?null:1}function p(a){var b="string"==typeof a?function(b){b.execCommand(a)}:a;return function(a){var c=o(a);b(a);for(var d=1;d<c;++d)b(a)}}function q(a,c,d,e){var f=o(a);f<0&&(e=-e,f=-f);for(var g=0;g<f;++g){var h=d(a,c,e);if(b(h,c))break;c=h}return c}function r(a,b){var c=function(c){c.extendSelection(q(c,c.getCursor(),a,b))};return c.motion=!0,c}function s(a,b,c,d){for(var e,f=a.listSelections(),h=f.length;h--;)e=f[h].head,g(a,e,q(a,e,b,c),d)}function t(a,b){if(a.somethingSelected()){for(var c,d=a.listSelections(),e=d.length;e--;)c=d[e],g(a,c.anchor,c.head,b);return!0}}function u(a,b){return a.state.emacsPrefix?void("-"!=b&&(a.state.emacsPrefix+=b)):(a.state.emacsPrefix=b,a.on("keyHandled",v),void a.on("inputRead",x))}function v(a,b){a.state.emacsPrefixMap||K.hasOwnProperty(b)||w(a)}function w(a){a.state.emacsPrefix=null,a.off("keyHandled",v),a.off("inputRead",x)}function x(a,b){var c=o(a);if(c>1&&"+input"==b.origin){for(var d=b.text.join("\n"),e="",f=1;f<c;++f)e+=d;a.replaceSelection(e)}}function y(a){a.state.emacsPrefixMap=!0,a.addKeyMap(M),a.on("keyHandled",z),a.on("inputRead",z)}function z(a,b){("string"!=typeof b||!/^\d$/.test(b)&&"Ctrl-U"!=b)&&(a.removeKeyMap(M),a.state.emacsPrefixMap=!1,a.off("keyHandled",z),a.off("inputRead",z))}function A(a){a.setCursor(a.getCursor()),a.setExtending(!a.getExtending()),a.on("change",function(){a.setExtending(!1)})}function B(a){a.setExtending(!1),a.setCursor(a.getCursor())}function C(a,b,c){a.openDialog?a.openDialog(b+': <input type="text" style="width: 10em"/>',c,{bottom:!0}):c(prompt(b,""))}function D(a,b){var c=a.getCursor(),d=a.findPosH(c,1,"word");a.replaceRange(b(a.getRange(c,d)),c,d),a.setCursor(d)}function E(a){for(var b=a.getCursor(),c=b.line,d=b.ch,e=[];c>=a.firstLine();){for(var f=a.getLine(c),g=null==d?f.length:d;g>0;){var d=f.charAt(--g);if(")"==d)e.push("(");else if("]"==d)e.push("[");else if("}"==d)e.push("{");else if(/[\(\{\[]/.test(d)&&(!e.length||e.pop()!=d))return a.extendSelection(H(c,g))}--c,d=null}}function F(a){a.execCommand("clearSearch"),B(a)}function G(a){M[a]=function(b){u(b,a)},L["Ctrl-"+a]=function(b){u(b,a)},K["Ctrl-"+a]=!0}var H=a.Pos,I=[],J=null,K={"Alt-G":!0,"Ctrl-X":!0,"Ctrl-Q":!0,"Ctrl-U":!0};a.emacs={kill:g,killRegion:t,repeated:p};for(var L=a.keyMap.emacs=a.normalizeKeyMap({"Ctrl-W":function(a){g(a,a.getCursor("start"),a.getCursor("end"),!0)},"Ctrl-K":p(function(a){var b=a.getCursor(),c=a.clipPos(H(b.line)),d=a.getRange(b,c);/\S/.test(d)||(d+="\n",c=H(b.line+1,0)),g(a,b,c,"grow",d)}),"Alt-W":function(a){c(a.getSelection()),B(a)},"Ctrl-Y":function(a){var b=a.getCursor();a.replaceRange(e(o(a)),b,b,"paste"),a.setSelection(b,a.getCursor())},"Alt-Y":function(a){a.replaceSelection(f(),"around","paste")},"Ctrl-Space":A,"Ctrl-Shift-2":A,"Ctrl-F":r(h,1),"Ctrl-B":r(h,-1),Right:r(h,1),Left:r(h,-1),"Ctrl-D":function(a){s(a,h,1,!1)},Delete:function(a){t(a,!1)||s(a,h,1,!1)},"Ctrl-H":function(a){s(a,h,-1,!1)},Backspace:function(a){t(a,!1)||s(a,h,-1,!1)},"Alt-F":r(i,1),"Alt-B":r(i,-1),"Alt-D":function(a){s(a,i,1,"grow")},"Alt-Backspace":function(a){s(a,i,-1,"grow")},"Ctrl-N":r(j,1),"Ctrl-P":r(j,-1),Down:r(j,1),Up:r(j,-1),"Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd",End:"goLineEnd",Home:"goLineStart","Alt-V":r(k,-1),"Ctrl-V":r(k,1),PageUp:r(k,-1),PageDown:r(k,1),"Ctrl-Up":r(l,-1),"Ctrl-Down":r(l,1),"Alt-A":r(m,-1),"Alt-E":r(m,1),"Alt-K":function(a){s(a,m,1,"grow")},"Ctrl-Alt-K":function(a){s(a,n,1,"grow")},"Ctrl-Alt-Backspace":function(a){s(a,n,-1,"grow")},"Ctrl-Alt-F":r(n,1),"Ctrl-Alt-B":r(n,-1,"grow"),"Shift-Ctrl-Alt-2":function(a){var b=a.getCursor();a.setSelection(q(a,b,n,1),b)},"Ctrl-Alt-T":function(a){var b=n(a,a.getCursor(),-1),c=n(a,b,1),d=n(a,c,1),e=n(a,d,-1);a.replaceRange(a.getRange(e,d)+a.getRange(c,e)+a.getRange(b,c),b,d)},"Ctrl-Alt-U":p(E),"Alt-Space":function(a){for(var b=a.getCursor(),c=b.ch,d=b.ch,e=a.getLine(b.line);c&&/\s/.test(e.charAt(c-1));)--c;for(;d<e.length&&/\s/.test(e.charAt(d));)++d;a.replaceRange(" ",H(b.line,c),H(b.line,d))},"Ctrl-O":p(function(a){a.replaceSelection("\n","start")}),"Ctrl-T":p(function(a){a.execCommand("transposeChars")}),"Alt-C":p(function(a){D(a,function(a){var b=a.search(/\w/);return b==-1?a:a.slice(0,b)+a.charAt(b).toUpperCase()+a.slice(b+1).toLowerCase()})}),"Alt-U":p(function(a){D(a,function(a){return a.toUpperCase()})}),"Alt-L":p(function(a){D(a,function(a){return a.toLowerCase()})}),"Alt-;":"toggleComment","Ctrl-/":p("undo"),"Shift-Ctrl--":p("undo"),"Ctrl-Z":p("undo"),"Cmd-Z":p("undo"),"Shift-Alt-,":"goDocStart","Shift-Alt-.":"goDocEnd","Ctrl-S":"findPersistentNext","Ctrl-R":"findPersistentPrev","Ctrl-G":F,"Shift-Alt-5":"replace","Alt-/":"autocomplete",Enter:"newlineAndIndent","Ctrl-J":p(function(a){a.replaceSelection("\n","end")}),Tab:"indentAuto","Alt-G G":function(a){var b=o(a,!0);return null!=b&&b>0?a.setCursor(b-1):void C(a,"Goto line",function(b){var c;b&&!isNaN(c=Number(b))&&c==(0|c)&&c>0&&a.setCursor(c-1)})},"Ctrl-X Tab":function(a){a.indentSelection(o(a,!0)||a.getOption("indentUnit"))},"Ctrl-X Ctrl-X":function(a){a.setSelection(a.getCursor("head"),a.getCursor("anchor"))},"Ctrl-X Ctrl-S":"save","Ctrl-X Ctrl-W":"save","Ctrl-X S":"saveAll","Ctrl-X F":"open","Ctrl-X U":p("undo"),"Ctrl-X K":"close","Ctrl-X Delete":function(a){g(a,a.getCursor(),m(a,a.getCursor(),1),"grow")},"Ctrl-X H":"selectAll","Ctrl-Q Tab":p("insertTab"),"Ctrl-U":y}),M={"Ctrl-G":w},N=0;N<10;++N)G(String(N));G("-")});