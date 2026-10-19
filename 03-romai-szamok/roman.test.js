QUnit.module("Arab számok átalakítása római számmá");

QUnit.test("1 → I", function (assert) {
    assert.strictEqual(toRoman(1), "I");
});

QUnit.test("5 → V", function (assert) {
    assert.strictEqual(toRoman(5), "V");
});

QUnit.test("4 → IV", function (assert) {
    assert.strictEqual(toRoman(4), "IV");
});

QUnit.test("10 → X", function (assert) {
    assert.strictEqual(toRoman(10), "X");
});

QUnit.test("9 → IX", function (assert) {
    assert.strictEqual(toRoman(9), "IX");
});

QUnit.test("50 → L", function (assert) {
    assert.strictEqual(toRoman(50), "L");
});

QUnit.test("40 → XL", function (assert) {
    assert.strictEqual(toRoman(40), "XL");
});

QUnit.test("100 → C", function (assert) {
    assert.strictEqual(toRoman(100), "C");
});

QUnit.test("90 → XC", function (assert) {
    assert.strictEqual(toRoman(90), "XC");
});

QUnit.test("500 → D", function (assert) {
    assert.strictEqual(toRoman(500), "D");
});

QUnit.test("400 → CD", function (assert) {
    assert.strictEqual(toRoman(400), "CD");
});

QUnit.test("1000 → M", function (assert) {
    assert.strictEqual(toRoman(1000), "M");
});

QUnit.test("900 → CM", function (assert) {
    assert.strictEqual(toRoman(900), "CM");
});

QUnit.test("A nulla érvénytelen", function (assert) {
    assert.throws(() => toRoman(0), RangeError);
});

QUnit.test("2 → II", function (assert) {
    assert.strictEqual(toRoman(2), "II");
});

QUnit.test("3 → III", function (assert) {
    assert.strictEqual(toRoman(3), "III");
});

QUnit.test("8 → VIII", function (assert) {
    assert.strictEqual(toRoman(8), "VIII");
});

QUnit.test("14 → XIV", function (assert) {
    assert.strictEqual(toRoman(14), "XIV");
});

QUnit.test("49 → XLIX", function (assert) {
    assert.strictEqual(toRoman(49), "XLIX");
});

QUnit.test("99 → XCIX", function (assert) {
    assert.strictEqual(toRoman(99), "XCIX");
});

QUnit.test("444 → CDXLIV", function (assert) {
    assert.strictEqual(toRoman(444), "CDXLIV");
});

QUnit.test("944 → CMXLIV", function (assert) {
    assert.strictEqual(toRoman(944), "CMXLIV");
});

QUnit.test("1984 → MCMLXXXIV", function (assert) {
    assert.strictEqual(toRoman(1984), "MCMLXXXIV");
});

QUnit.test("2026 → MMXXVI", function (assert) {
    assert.strictEqual(toRoman(2026), "MMXXVI");
});

QUnit.test("3999 → MMMCMXCIX", function (assert) {
    assert.strictEqual(toRoman(3999), "MMMCMXCIX");
});

QUnit.test("Negatív szám elutasítása", function (assert) {
    assert.throws(() => toRoman(-1), RangeError);
});

QUnit.test("4000 feletti tartomány kezdete elutasítása", function (assert) {
    assert.throws(() => toRoman(4000), RangeError);
});

QUnit.test("Tört szám elutasítása", function (assert) {
    assert.throws(() => toRoman(1.5), RangeError);
});

QUnit.test("Szöveg elutasítása", function (assert) {
    assert.throws(() => toRoman("10"), RangeError);
});

QUnit.test("NaN elutasítása", function (assert) {
    assert.throws(() => toRoman(NaN), RangeError);
});

QUnit.test("Végtelen elutasítása", function (assert) {
    assert.throws(() => toRoman(Infinity), RangeError);
});

QUnit.test("null elutasítása", function (assert) {
    assert.throws(() => toRoman(null), RangeError);
});

QUnit.test("undefined elutasítása", function (assert) {
    assert.throws(() => toRoman(undefined), RangeError);
});

QUnit.test("Logikai érték elutasítása", function (assert) {
    assert.throws(() => toRoman(true), RangeError);
});
