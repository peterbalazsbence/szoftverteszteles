QUnit.module("Szállítási díj");

const cases = [
    { id: "T01", name: "Nulla tömeg", args: [10000, 0, "HU", false], expected: 1500 },
    { id: "T02", name: "5 kg alatt", args: [10000, 4.99, "HU", false], expected: 1500 },
    { id: "T03", name: "Pontosan 5 kg", args: [10000, 5, "HU", false], expected: 2500 },
    { id: "T04", name: "5 kg felett", args: [10000, 5.01, "HU", false], expected: 2500 },
    { id: "T05", name: "20 kg alatt", args: [10000, 19.99, "HU", false], expected: 2500 },
    { id: "T06", name: "Pontosan 20 kg", args: [10000, 20, "HU", false], expected: 2500 },
    { id: "T07", name: "20 kg felett", args: [10000, 20.01, "HU", false], expected: 5000 },
    { id: "T08", name: "Az ingyenességi határ alatt", args: [19999, 2, "HU", false], expected: 1500 },
    { id: "T09", name: "Pontosan 20 000 Ft", args: [20000, 2, "HU", false], expected: 1500 },
    { id: "T10", name: "20 000 Ft felett", args: [20001, 2, "HU", false], expected: 0 },
    { id: "T11", name: "Külföldi szállítás", args: [10000, 2, "DE", false], expected: 3000 },
    { id: "T12", name: "Külföldön nagy rendelésnél sincs ingyenesség", args: [30000, 10, "DE", false], expected: 5000 },
    { id: "T13", name: "Kisbetűs magyar országkód", args: [10000, 2, "hu", false], expected: 1500 },
    { id: "T14", name: "Kisbetűs országkód ingyenes szállításnál", args: [20001, 2, "hu", false], expected: 0 },
    { id: "T15", name: "Kisbetűs külföldi országkód", args: [10000, 2, "de", false], expected: 3000 },
    { id: "T16", name: "Belföldi expressz", args: [10000, 2, "HU", true], expected: 2250 },
    { id: "T17", name: "Külföldi expressz", args: [10000, 2, "DE", true], expected: 4500 },
    { id: "T18", name: "Ingyenes szállítás expresszel", args: [20001, 2, "HU", true], expected: 0 },
    { id: "T19", name: "Nulla rendelési érték", args: [0, 2, "HU", false], expected: 1500 },
    { id: "T20", name: "Negatív rendelési érték", args: [-1, 2, "HU", false], expected: null },
    { id: "T21", name: "Negatív tömeg", args: [10000, -1, "HU", false], expected: null },
    { id: "T22", name: "Negatív tömeg nagy rendelésnél", args: [30000, -1, "HU", false], expected: null }
];

for (const test of cases) {
    QUnit.test(test.id + " – " + test.name, function (assert) {
        if (test.expected === null) {
            assert.throws(function () {
                calculateShippingCost(...test.args);
            }, "Érvénytelen bemenetnél hibát várunk.");
        } else {
            assert.strictEqual(calculateShippingCost(...test.args), test.expected);
        }
    });
}
