const mure = {}
const M = 'M'
const U = 'U'
const I = 'I'
const EMPTY = ''
const SPACE = ' '
const symbols = [M, I, U, EMPTY, SPACE]
const patt = [/III/gi,/UU/gi]
const error_gen = ()=>{throw new SyntaxError('Invalid MIU String')};

mure.axiom = 'MI'

mure.isValid = str => [...str].reduce((o,ch) => symbols.includes(ch.toUpperCase())&&o,true);

mure.rules = [
  str => str.endsWith(I),
  str => str[0] === M,
  str => str.match(patt[0]) !== null,
  str => str.match(patt[1]) !== null
]

mure.apply = [
  str => (str += U),
  str => (str += str.slice(1)),
  str => Array.from(str.matchAll(patt[0])).map((match,a,b,c,o = false) => 
    Array.from(match.input)
    .map((ch,i) => i >= match.index && i <= match.index+2?!o?((o=true)&&U):'':ch)
    .join("")
  ), 
  str => Array.from(str.matchAll(patt[1])).map(match =>
    Array.from(match.input)
    .filter((ch,i) => i < match.index || i > match.index+1)
    .join("")
  )
]

mure.canApply = (str=mure.axiom, rule) => mure.isValid(str) && (rule-1 in mure.rules)?mure.rules[rule-1](str.toUpperCase()):error_gen()

mure.canApplyWhich = str => mure.rules.flatMap((v,i) => mure.canApply(str, i+1)?[i+1]:[]);

mure.applyRule = (str=mure.axiom, rule) => mure.isValid(str) && (rule-1 in mure.apply)?mure.apply[rule-1](str.toUpperCase()):error_gen();

mure.possibility = (iterations, start=mure.axiom) => Array(iterations).fill(0).reduce((p,c) =>
      !p[1].push(Array.from(p[0] = p[0].map(
        m => mure.canApplyWhich(m).map(rule => mure.applyRule(m, rule))
      ).flat(2))) && p,
      [Array.isArray(start)?[...start]:[start],[start]])[1];

Object.freeze(mure.apply)
Object.freeze(mure.rules)
module.exports = Object.freeze(mure)