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
  expect(() => mure.canApply('MUI', 6)).toThrow()
})

test('mure.canApplyWhich', () => {
  expect(mure.canApplyWhich('MiI')).toEqual([1, 2])
  expect(mure.canApplyWhich('MUI')).toEqual([1, 2])
  expect(mure.canApplyWhich('MIUU')).toEqual([2, 4])
  expect(mure.canApplyWhich('MIIIU')).toEqual([2, 3])
  expect(mure.canApplyWhich('MIIUI')).toEqual([1, 2])
  expect(mure.canApplyWhich('MIUUIII')).toEqual([1, 2, 3, 4])
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
  expect(() => mure.applyRule('MIUU', 1)).toThrow()
  expect(mure.applyRule('MIUU', 2)).toBe('MIUUIUU')
  expect(() => mure.applyRule('MIUU', 3)).toThrow()
  expect(mure.applyRule('MIUU', 4)).toEqual(['MI'])
  expect(() => mure.applyRule('MIIIU', 1)).toThrow()
  expect(mure.applyRule('MIIIU', 2)).toBe('MIIIUIIIU')
  expect(mure.applyRule('MIIIU', 3)).toEqual(['MUU'])
  expect(() => mure.applyRule('MIIIU', 4)).toThrow()
  expect(mure.applyRule('MIIUI', 1)).toBe('MIIUIU')
  expect(mure.applyRule('MIIUI', 2)).toBe('MIIUIIIUI')
  expect(() => mure.applyRule('MIIUI', 3)).toThrow()
  expect(() => mure.applyRule('MIIUI', 4)).toThrow()
  expect(mure.applyRule('MIUUIII', 1)).toBe('MIUUIIIU')
  expect(mure.applyRule('MIUUIII', 2)).toBe('MIUUIIIIUUIII')
  expect(mure.applyRule('MIUUIII', 3)).toEqual(['MIUUU'])
  expect(mure.applyRule('MIUUIII', 4)).toEqual(['MIIII'])
  expect(mure.applyRule('MIIII', 3)).toEqual(['MUI', 'MIU'])
  expect(mure.applyRule('MUUIUU', 4)).toEqual(['MIUU', 'MUUI'])
  expect(() => mure.applyRule('kasdjfk', 3)).toThrow()
})

test('mure.applyAll', () => {
  expect(mure.applyAll('MI')).toEqual(['MIU', 'MII'])
  expect(mure.applyAll('MUI')).toEqual(['MUIU', 'MUIUI'])
  expect(mure.applyAll('MIUU')).toEqual(['MIUUIUU', 'MI'])
  expect(mure.applyAll('MIIIU')).toEqual(['MIIIUIIIU', 'MUU'])
  expect(mure.applyAll('MIIUI')).toEqual(['MIIUIU', 'MIIUIIIUI'])
  expect(mure.applyAll('MIUUIII')).toEqual(['MIUUIIIU', 'MIUUIIIIUUIII', 'MIUUU', 'MIIII'])
})

test('mure.lazilyApplyAll', () => {
    expect([...mure.lazilyApplyAll('MI')]).toEqual(mure.applyAll('MI'))
    expect([...mure.lazilyApplyAll('MUI')]).toEqual(mure.applyAll('MUI'))
    expect([...mure.lazilyApplyAll('MIUU')]).toEqual(mure.applyAll('MIUU'))
    expect([...mure.lazilyApplyAll('MIIIU')]).toEqual(mure.applyAll('MIIIU'))
    expect([...mure.lazilyApplyAll('MIIUI')]).toEqual(mure.applyAll('MIIUI'))
    expect([...mure.lazilyApplyAll('MIUUIII')]).toEqual(mure.applyAll('MIUUIII'))
})

test('mure.possibility', () => {
  expect(mure.possibility(2)).toEqual(new Set(
    [
      new Set(['MI']),
      new Set(['MIU', 'MII']),
      new Set(['MIUIU', 'MIIU', 'MIIII'])
    ]
  )
  )
  expect(mure.possibility(2, ['MIU', 'MII'])).toEqual(new Set(
    [
      new Set(['MIU', 'MII']),
      new Set(['MIUIU', 'MIIU', 'MIIII']),
      new Set(['MIUIUIUIU', 'MIIUIIU', 'MIIIIU', 'MIIIIIIII', 'MUI', 'MIU'])
    ]
  )
  )
  expect(mure.possibility(2, 'MII')).toEqual(new Set(
    [
      new Set(['MII']),
      new Set(['MIIU', 'MIIII']),
      new Set(['MIIUIIU', 'MIIIIU', 'MIIIIIIII', 'MUI', 'MIU'])
    ]
  )
  )
  expect(mure.possibility(2, 'MUI')).toEqual(new Set(
    [
      new Set(['MUI']),
      new Set(['MUIU', 'MUIUI']),
      new Set(['MUIUUIU', 'MUIUIU', 'MUIUIUIUI'])
    ]
  )
  )
  expect(mure.possibility(2, 'MIUU')).toEqual(new Set(
    [
      new Set(['MIUU']),
      new Set(['MIUUIUU', 'MI']),
      new Set(['MIUUIUUIUUIUU', 'MIIUU', 'MIUUI', 'MIU', 'MII'])
    ]
  )
  )
  expect(mure.possibility(2, 'MIIIU')).toEqual(new Set(
    [
      new Set(['MIIIU']),
      new Set(['MIIIUIIIU', 'MUU']),
      new Set(
        [
          'MIIIUIIIUIIIUIIIU',
          'MUUIIIU',
          'MIIUIIU',
          'MIIIUUU',
          'MUUUU',
          'M'
        ]
      )
    ]
  )
  )
  expect(mure.possibility(2, 'MIIUI')).toEqual(new Set(
    [
      new Set(['MIIUI']),
      new Set(['MIIUIU', 'MIIUIIIUI']),
      new Set(
        [
          'MIIUIUIIUIU',
          'MIIUIIIUIU',
          'MIIUIIIUIIIUIIIUI',
          'MIUIIUI',
          'MIIUUUI',
          'MIIUIIU'
        ]
      )
    ]
  )
  )
  expect(mure.possibility(2, 'MIUUIII')).toEqual(new Set(
    [
      new Set(['MIUUIII']),
      new Set(['MIUUIIIU', 'MIUUIIIIUUIII', 'MIUUU', 'MIIII']),
      new Set(
        [
          'MIUUIIIUIUUIIIU',
          'MIUUUU',
          'MIIIIU',
          'MIUUIIIIUUIIIU',
          'MIUUIIIIUUIIIIUUIIIIUUIII',
          'MIUUUIUUIII',
          'MIUUIUUUIII',
          'MIUUIIIIUUU',
          'MIIIIIUUIII',
          'MIUUIIIIIII',
          'MIUUUIUUU',
          'MIU',
          'MIIIIIIII',
          'MUI'
        ]
      )
    ]
  )
  )
})

test('mure.lazyPossibility', () => {
    let temp = [new Set(['MI'])]
    let generator = mure.lazyPossibility()
    for(let i = 0;i < 2;i++) {
        temp.push(generator.next().value)
    }
    expect(new Set(temp)).toEqual(mure.possibility(2))
    temp = [new Set(['MIU', 'MII'])]
    generator = mure.lazyPossibility(['MIU', 'MII'])
    for(let i = 0;i < 2;i++) {
        temp.push(generator.next().value)
    }
    expect(new Set(temp)).toEqual(mure.possibility(2, ['MIU', 'MII']))
    temp = [new Set(['MII'])]
    generator = mure.lazyPossibility('MII')
    for(let i = 0;i < 2;i++) {
        temp.push(generator.next().value)
    }
    expect(new Set(temp)).toEqual(mure.possibility(2, 'MII'))
})
  