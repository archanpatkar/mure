const flat = a => a.reduce((acc, v) => acc.concat(v), [])
const mure = { axiom: 'MI' }
const symbols = ['M', 'I', 'U', '', ' ']
const patt = [/III/gi, /UU/gi]
const [M, I, U, ...extra] = symbols
const err = i => { if (i) throw new Error('Invalid MIU String'); else throw new Error('Invalid Rule') }
const matchAll = (str, ch, times) => [...str].reduce((acc, v, i) => v === ch
  ? Array(times).fill(0).reduce((acc, _, k) => str[i + k] === ch, true)
    ? acc.push({ index: i, input: str }) && acc : acc : acc, [])
const rules = [str => str.endsWith(I), str => str[0] === M, str => str.match(patt[0]) !== null, str => str.match(patt[1]) !== null]
const apply = [str => (str += U), str => (str += str.slice(1)),
  str => matchAll(str, I, 3).map((match, a, b, c, o = false) => Array.from(match.input)
    .map((ch, i) => i >= match.index && i <= match.index + 2 ? !o ? (o = true) && U : '' : ch).join('')),
  str => matchAll(str, U, 2).map(match =>
    Array.from(match.input).filter((ch, i) => i < match.index || i > match.index + 1).join(''))]
mure.isValid = str => [...str].reduce((o, ch) => symbols.includes(ch.toUpperCase()) && o, true)
mure.canApply = (str, rule) => (rule - 1 in rules) ? rules[rule - 1](str.toUpperCase()) : err(0)
mure.applyRule = (str, rule) => mure.isValid(str) ? mure.canApply(str, rule) ? apply[rule - 1](str.toUpperCase()) : err(0) : err(1)
mure.canApplyWhich = str => rules.reduce((a, x, i) => a.concat(mure.canApply(str, i + 1) ? [i + 1] : []), [])
mure.applyAll = str => flat(mure.canApplyWhich(str).map(r => mure.applyRule(str, r)))
mure.lazilyApplyAll = function*(str) {let t;for(let r of mure.canApplyWhich(str)) Array.isArray(t = mure.applyRule(str,r))? yield* t:yield t;} 
mure.possibility = (iters, start = mure.axiom) => Array(iters).fill(0).reduce(p =>
  p[1].add(new Set(p[0] = flat(p[0].map(mure.applyAll)))) && p,
[Array.isArray(start) ? [...start] : [start], new Set().add(new Set(typeof start === 'string' ? [start] : start))])[1]
mure.lazyPossibility = function*(start = mure.axiom,iters=Infinity) { 
  let current = !Array.isArray(start) ? [start] : start; let i = 0;
  while(i < iters) yield ++i && new Set(current = flat(current.map(s => mure.applyAll(s))))
}
mure.mostLazyPossibility = function*(start = mure.axiom,iters=Infinity) {
  let current = !Array.isArray(start) ? [start] : start; let i = 0;
  while(i < iters)
  {
    
  } 
  // yield ++i && new Set(current = flat(current.map(s => mure.applyAll(s))))
}
module.exports = Object.freeze(mure)