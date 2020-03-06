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

