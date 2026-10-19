QUnit.module("Arab számok átalakítása római számmá");

QUnit.test("1 → I", function (assert) {
    assert.strictEqual(toRoman(1), "I");
});
