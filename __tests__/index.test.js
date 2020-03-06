const mure = require("../src/index");

test('mure.isValid', () => {
    expect(mure.isValid("MI")).toBe(true);
    expect(mure.isValid("MUU")).toBe(true);
    expect(mure.isValid("MUIII")).toBe(true);
    expect(mure.isValid("MUuI")).toBe(true);
    expect(mure.isValid("Mui")).toBe(true);
    expect(mure.isValid("Mlk")).toBe(false);
    expect(mure.isValid("uuiiI")).toBe(true);
    expect(mure.isValid("zzzZzZ")).toBe(false);
});

test('mure.canApply', () => {
    expect(mure.canApply("MI",1)).toBe(true);
    expect(mure.canApply("MI",2)).toBe(true);
    expect(mure.canApply("MI",3)).toBe(false);
    expect(mure.canApply("MI",4)).toBe(false);
    expect(mure.canApply("MUU",1)).toBe(false);
    expect(mure.canApply("MUU",2)).toBe(true);
    expect(mure.canApply("MUU",3)).toBe(false);
    expect(mure.canApply("MUU",4)).toBe(true);
    expect(mure.canApply("MIII",1)).toBe(true);
    expect(mure.canApply("MIII",2)).toBe(true);
    expect(mure.canApply("MIII",3)).toBe(true);
    expect(mure.canApply("MIII",4)).toBe(false);
    expect(mure.canApply("MUI",1)).toBe(true);
    expect(mure.canApply("MUI",2)).toBe(true);
    expect(mure.canApply("MUI",3)).toBe(false);
    expect(mure.canApply("MUI",4)).toBe(false);
});