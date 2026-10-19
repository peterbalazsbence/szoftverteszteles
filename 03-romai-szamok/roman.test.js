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
