!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}((function(t){var e=t.Pos;function r(t,e){for(var r=0,n=t.length;r<n;++r)e(t[r])}function n(r,n,i,o){var s=r.getCursor(),a=i(r,s);if(!/\b(?:string|comment)\b/.test(a.type)){var f=t.innerMode(r.getMode(),a.state);if("json"!==f.mode.helperType){a.state=f.state,/^[\w$_]*$/.test(a.string)?a.end>s.ch&&(a.end=s.ch,a.string=a.string.slice(0,s.ch-a.start)):a={start:s.ch,end:s.ch,string:"",state:a.state,type:"."==a.string?"property":null};for(var l=a;"property"==l.type;){if("."!=(l=i(r,e(s.line,l.start))).string)return;if(l=i(r,e(s.line,l.start)),!p)var p=[];p.push(l)}return{list:c(a,p,n,o),from:e(s.line,a.start),to:e(s.line,a.end)}}}}function i(t,e){var r=t.getTokenAt(e);return e.ch==r.start+1&&"."==r.string.charAt(0)?(r.end=r.start,r.string=".",r.type="property"):/^\.[\w$_]*$/.test(r.string)&&(r.type="property",r.start++,r.string=r.string.replace(/\./,"")),r}t.registerHelper("hint","javascript",(function(t,e){return n(t,f,(function(t,e){return t.getTokenAt(e)}),e)})),t.registerHelper("hint","coffeescript",(function(t,e){return n(t,l,i,e)}));var o="charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "),s="length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" "),a="prototype apply call bind".split(" "),f="break case catch class const continue debugger default delete do else export extends false finally for function if in import instanceof new null return super switch this throw true try typeof var void while with yield".split(" "),l="and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ");function c(t,e,n,i){var f=[],l=t.string,c=i&&i.globalScope||window;function p(t){0!=t.lastIndexOf(l,0)||function(t,e){if(!Array.prototype.indexOf){for(var r=t.length;r--;)if(t[r]===e)return!0;return!1}return-1!=t.indexOf(e)}(f,t)||f.push(t)}function u(t){"string"==typeof t?r(o,p):t instanceof Array?r(s,p):t instanceof Function&&r(a,p),function(t,e){if(Object.getOwnPropertyNames&&Object.getPrototypeOf)for(var r=t;r;r=Object.getPrototypeOf(r))Object.getOwnPropertyNames(r).forEach(e);else for(var n in t)e(n)}(t,p)}if(e&&e.length){var d,g=e.pop();for(g.type&&0===g.type.indexOf("variable")?(i&&i.additionalContext&&(d=i.additionalContext[g.string]),i&&!1===i.useGlobalScope||(d=d||c[g.string])):"string"==g.type?d="":"atom"==g.type?d=1:"function"==g.type&&(null==c.jQuery||"$"!=g.string&&"jQuery"!=g.string||"function"!=typeof c.jQuery?null!=c._&&"_"==g.string&&"function"==typeof c._&&(d=c._()):d=c.jQuery());null!=d&&e.length;)d=d[e.pop().string];null!=d&&u(d)}else{for(var y=t.state.localVars;y;y=y.next)p(y.name);for(var h=t.state.context;h;h=h.prev)for(y=h.vars;y;y=y.next)p(y.name);for(y=t.state.globalVars;y;y=y.next)p(y.name);i&&!1===i.useGlobalScope||u(c),r(n,p)}return f}}));