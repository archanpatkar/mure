(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mure = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const mure = { axiom: 'MI' }
const symbols = ['M', 'I', 'U', '', ' ']
const patt = [/III/gi, /UU/gi]
const [M, I, U, ...extra] = symbols
const err = (i) => { if (i) throw new Error('Invalid MIU String'); else throw new Error('Invalid Rule') }
const matchAll = (str, ch, times) => [...str].reduce((acc, v, i) => v === ch
  ? Array(times).fill(0).reduce((acc, _, k) => str[i + k] === ch, true)
  ? acc.push({ index: i, input: str }) && acc : acc : acc, [])
const rules = [
  str => str.endsWith(I),
  str => str[0] === M,
  str => str.match(patt[0]) !== null,
  str => str.match(patt[1]) !== null
]
const apply = [
  str => (str += U),
  str => (str += str.slice(1)),
  str => matchAll(str, I, 3).map((match, a, b, c, o = false) => Array.from(match.input)
    .map((ch, i) => i >= match.index && i <= match.index + 2 ? !o ? (o = true) && U : '' : ch)
    .join('')
  ),
  str => matchAll(str, U, 2).map(match =>
    Array.from(match.input)
      .filter((ch, i) => i < match.index || i > match.index + 1)
      .join('')
  )
]
mure.isValid = str => [...str].reduce((o, ch) => symbols.includes(ch.toUpperCase()) && o, true)
mure.canApply = (str, rule) => (rule - 1 in rules) ? rules[rule - 1](str.toUpperCase()) : err(0)
mure.applyRule = (str, rule) => mure.isValid(str) ? mure.canApply(str, rule) ? apply[rule - 1](str.toUpperCase()) : err(0) : err(1)
mure.canApplyWhich = str => rules.reduce((a, x, i) => a.concat(mure.canApply(str, i + 1) ? [i + 1] : []),[])
mure.applyAll = str => mure.canApplyWhich(str).map(r => mure.applyRule(str,r)).flat()
mure.possibility = (iterations, start = mure.axiom) => Array(iterations).fill(0).reduce(p =>
  p[1].add(new Set(p[0] = p[0].map(mure.applyAll).flat())) ? p : p,
[Array.isArray(start) ? [...start] : [start], new Set().add(new Set().add(start))])[1]
module.exports = Object.freeze(mure)
},{}]},{},[1])(1)
});
