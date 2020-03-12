const mure = { axiom: 'MI' }
const symbols = ['M', 'I', 'U', '', ' ']
const patt = [/III/gi, /UU/gi]
const [M, I, U, ...extra] = symbols
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
    .map((ch, i) => i >= match.index && i <= match.index + 2 ? !o ? o = true && U : '' : ch)
    .join('')
  ),
  str => matchAll(str, U, 2).map(match =>
    Array.from(match.input)
      .filter((ch, i) => i < match.index || i > match.index + 1)
      .join('')
  )
]
const err = (i) => { if(i) throw new Error('Invalid MIU String'); else throw new Error('Invalid Rule') }
const matchAll = (str, ch, times) => [...str].reduce((acc, v, i) => v === ch
  ? Array(times).fill(0).reduce((acc, _, k) => str[i + k] === ch, true)
    ? !acc.push({ index: i, input: str }) ? acc : acc : acc : acc, [])
mure.isValid = str => [...str].reduce((o, ch) => symbols.includes(ch.toUpperCase()) && o, true)
mure.canApply = (str, rule) => (rule - 1 in rules) ? rules[rule - 1](str.toUpperCase()) : err(0)
mure.applyRule = (str, rule) => mure.isValid(str) ? mure.canApply(str, rule) ? apply[rule - 1](str.toUpperCase()) : err(0) : err(1)
mure.canApplyWhich = str => rules.flatMap((v, i) => mure.canApply(str, i + 1) ? [i + 1] : [])
mure.possibility = (iterations, start = mure.axiom) => Array(iterations).fill(0).reduce(p =>
  p[1].add(new Set(p[0] = p[0].map(
    m => mure.canApplyWhich(m).map(rule => mure.applyRule(m, rule))
  ).flat(2))) ? p : p,
[Array.isArray(start) ? [...start] : [start], new Set().add(new Set().add(start))])[1]
module.exports = Object.freeze(mure)
