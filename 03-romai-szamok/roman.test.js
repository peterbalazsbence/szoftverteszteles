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
