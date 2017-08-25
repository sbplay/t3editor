'use strict';(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineMode("ruby",function(e){function n(a){for(var c={},b=0,f=a.length;b<f;++b)c[a[b]]=!0;return c}function k(a,c,b){b.tokenize.push(a);return a(c,b)}function m(a,c){if(a.sol()&&a.match("=begin")&&a.eol())return c.tokenize.push(t),"comment";if(a.eatSpace())return null;var b=a.next();if("`"==
b||"'"==b||'"'==b)return k(l(b,"string",'"'==b||"`"==b),a,c);if("/"==b){var f=a.pos;for(var h=0,d,e=!1,p=!1;null!=(d=a.next());)if(p)p=!1;else{if(-1<"[{(".indexOf(d))h++;else if(-1<"]})".indexOf(d)){if(h--,0>h)break}else if("/"==d&&0==h){e=!0;break}p="\\"==d}a.backUp(a.pos-f);return e?k(l(b,"string-2",!0),a,c):"operator"}if("%"==b){b="string";f=!0;a.eat("s")?b="atom":a.eat(/[WQ]/)?b="string":a.eat(/[r]/)?b="string-2":a.eat(/[wxq]/)&&(b="string",f=!1);h=a.eat(/[^\w\s=]/);if(!h)return"operator";q.propertyIsEnumerable(h)&&
(h=q[h]);return k(l(h,b,f,!0),a,c)}if("#"==b)return a.skipToEnd(),"comment";if("<"==b&&(f=a.match(/^<-?[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/)))return k(u(f[1]),a,c);if("0"==b)return a.eat("x")?a.eatWhile(/[\da-fA-F]/):a.eat("b")?a.eatWhile(/[01]/):a.eatWhile(/[0-7]/),"number";if(/\d/.test(b))return a.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/),"number";if("?"==b){for(;a.match(/^\\[CM]-/););a.eat("\\")?a.eatWhile(/\w/):a.next();return"string"}if(":"==b)return a.eat("'")?k(l("'","atom",!1),
a,c):a.eat('"')?k(l('"',"atom",!0),a,c):a.eat(/[\<\>]/)?(a.eat(/[\<\>]/),"atom"):a.eat(/[\+\-\*\/\&\|\:\!]/)?"atom":a.eat(/[a-zA-Z$@_\xa1-\uffff]/)?(a.eatWhile(/[\w$\xa1-\uffff]/),a.eat(/[\?\!\=]/),"atom"):"operator";if("@"==b&&a.match(/^@?[a-zA-Z_\xa1-\uffff]/))return a.eat("@"),a.eatWhile(/[\w\xa1-\uffff]/),"variable-2";if("$"==b)return a.eat(/[a-zA-Z_]/)?a.eatWhile(/[\w]/):a.eat(/\d/)?a.eat(/\d/):a.next(),"variable-3";if(/[a-zA-Z_\xa1-\uffff]/.test(b))return a.eatWhile(/[\w\xa1-\uffff]/),a.eat(/[\?\!]/),
a.eat(":")?"atom":"ident";if("|"!=b||!c.varList&&"{"!=c.lastTok&&"do"!=c.lastTok)return/[\(\)\[\]{}\\;]/.test(b)?(g=b,null):"-"==b&&a.eat(">")?"arrow":/[=+\-\/*:\.^%<>~|]/.test(b)?(a=a.eatWhile(/[=+\-\/*:\.^%<>~|]/),"."!=b||a||(g="."),"operator"):null;g="|";return null}function r(a){a||(a=1);return function(c,b){if("}"==c.peek()){if(1==a)return b.tokenize.pop(),b.tokenize[b.tokenize.length-1](c,b);b.tokenize[b.tokenize.length-1]=r(a-1)}else"{"==c.peek()&&(b.tokenize[b.tokenize.length-1]=r(a+1));return m(c,
b)}}function v(){var a=!1;return function(c,b){if(a)return b.tokenize.pop(),b.tokenize[b.tokenize.length-1](c,b);a=!0;return m(c,b)}}function l(a,c,b,f){return function(h,d){var e=!1,g;"read-quoted-paused"===d.context.type&&(d.context=d.context.prev,h.eat("}"));for(;null!=(g=h.next());){if(g==a&&(f||!e)){d.tokenize.pop();break}if(b&&"#"==g&&!e)if(h.eat("{")){"}"==a&&(d.context={prev:d.context,type:"read-quoted-paused"});d.tokenize.push(r());break}else if(/[@\$]/.test(h.peek())){d.tokenize.push(v());
break}e=!e&&"\\"==g}return c}}function u(a){return function(c,b){c.match(a)?b.tokenize.pop():c.skipToEnd();return"string"}}function t(a,c){a.sol()&&a.match("=end")&&a.eol()&&c.tokenize.pop();a.skipToEnd();return"comment"}var w=n("alias and BEGIN begin break case class def defined? do else elsif END end ensure false for if in module next not or redo rescue retry return self super then true undef unless until when while yield nil raise throw catch fail loop callcc caller lambda proc public protected private require load require_relative extend autoload __END__ __FILE__ __LINE__ __dir__".split(" ")),
x=n("def class case for while until module then catch loop proc begin".split(" ")),y=n(["end","until"]),q={"[":"]","{":"}","(":")"},g;return{startState:function(){return{tokenize:[m],indented:0,context:{type:"top",indented:-e.indentUnit},continuedLine:!1,lastTok:null,varList:!1}},token:function(a,c){g=null;a.sol()&&(c.indented=a.indentation());var b=c.tokenize[c.tokenize.length-1](a,c),f,e=g;if("ident"==b){var d=a.current(),b="."==c.lastTok?"property":w.propertyIsEnumerable(a.current())?"keyword":
/^[A-Z]/.test(d)?"tag":"def"==c.lastTok||"class"==c.lastTok||c.varList?"def":"variable";"keyword"==b&&(e=d,x.propertyIsEnumerable(d)?f="indent":y.propertyIsEnumerable(d)?f="dedent":"if"!=d&&"unless"!=d||a.column()!=a.indentation()?"do"==d&&c.context.indented<c.indented&&(f="indent"):f="indent")}if(g||b&&"comment"!=b)c.lastTok=e;"|"==g&&(c.varList=!c.varList);"indent"==f||/[\(\[\{]/.test(g)?c.context={prev:c.context,type:g||b,indented:c.indented}:("dedent"==f||/[\)\]\}]/.test(g))&&c.context.prev&&
(c.context=c.context.prev);a.eol()&&(c.continuedLine="\\"==g||"operator"==b);return b},indent:function(a,c){if(a.tokenize[a.tokenize.length-1]!=m)return 0;var b=c&&c.charAt(0),f=a.context;c=f.type==q[b]||"keyword"==f.type&&/^(?:end|until|else|elsif|when|rescue)\b/.test(c);return f.indented+(c?0:e.indentUnit)+(a.continuedLine?e.indentUnit:0)},electricInput:/^\s*(?:end|rescue|elsif|else|\})$/,lineComment:"#"}});e.defineMIME("text/x-ruby","ruby")});
