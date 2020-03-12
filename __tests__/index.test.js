const mure = require('../src/index')

test('mure.isValid', () => {
  expect(mure.isValid('MI')).toBe(true)
  expect(mure.isValid('MUU')).toBe(true)
  expect(mure.isValid('MUIII')).toBe(true)
  expect(mure.isValid('MUuI')).toBe(true)
  expect(mure.isValid('Mui')).toBe(true)
  expect(mure.isValid('Mlk')).toBe(false)
  expect(mure.isValid('uuiiI')).toBe(true)
  expect(mure.isValid('zzzZzZ')).toBe(false)
})

test('mure.canApply', () => {
  expect(mure.canApply('MI', 1)).toBe(true)
  expect(mure.canApply('MI', 2)).toBe(true)
  expect(mure.canApply('MI', 3)).toBe(false)
  expect(mure.canApply('MI', 4)).toBe(false)
  expect(mure.canApply('MUU', 1)).toBe(false)
  expect(mure.canApply('MUU', 2)).toBe(true)
  expect(mure.canApply('MUU', 3)).toBe(false)
  expect(mure.canApply('MUU', 4)).toBe(true)
  expect(mure.canApply('MIII', 1)).toBe(true)
  expect(mure.canApply('MIII', 2)).toBe(true)
  expect(mure.canApply('MIII', 3)).toBe(true)
  expect(mure.canApply('MIII', 4)).toBe(false)
  expect(mure.canApply('MUI', 1)).toBe(true)
  expect(mure.canApply('MUI', 2)).toBe(true)
  expect(mure.canApply('MUI', 3)).toBe(false)
  expect(mure.canApply('MUI', 4)).toBe(false)
})

test('mure.canApplyWhich', () => {
  expect(mure.canApplyWhich('MiI')).toEqual(expect.arrayContaining([1, 2]))
  expect(mure.canApplyWhich('MUI')).toEqual(expect.arrayContaining([1, 2]))
  expect(mure.canApplyWhich('MIUU')).toEqual(expect.arrayContaining([2, 4]))
  expect(mure.canApplyWhich('MIIIU')).toEqual(expect.arrayContaining([2, 3]))
  expect(mure.canApplyWhich('MIIUI')).toEqual(expect.arrayContaining([1, 2]))
  expect(mure.canApplyWhich('MIUUIII')).toEqual(expect.arrayContaining([1, 2, 3, 4]))
})

test('mure.applyRule', () => {
  expect(mure.applyRule('MiI', 1)).toBe('MIIU')
  expect(mure.applyRule('MiI', 2)).toBe('MIIII')
  expect(() => mure.applyRule('MiI', 3)).toThrow()
  expect(() => mure.applyRule('MiI', 4)).toThrow()
  expect(mure.applyRule('MUI', 1)).toBe('MUIU')
  expect(mure.applyRule('MUI', 2)).toBe('MUIUI')
  expect(() => mure.applyRule('MUI', 3)).toThrow()
  expect(() => mure.applyRule('MUI', 4)).toThrow()
})
