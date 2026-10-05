const { calculateDiscountedPrice } = require('./discountCalculator');
const cases = [
  ['T01', 0, false, 0],
  ['T02', 9999, false, 9999],
  ['T03', 10000, false, 9500],
  ['T04', 10001, false, 9500.95],
  ['T05', 24999, false, 23749.05],
  ['T06', 25000, false, 22500],
  ['T07', 49999, false, 44999.10],
  ['T08', 50000, false, 42500],
  ['T09', 50001, false, 42500.85],
  ['T10', 1000, true, 950],
  ['T11', 25000, true, 21250],
  ['T12', 50000, true, 40000],
  ['T13', -1000, false, null],
];
const results = cases.map(([id, orderValue, isVip, expected]) => {
  let actual;
  let threw = false;
  try { actual = calculateDiscountedPrice(orderValue, isVip); }
  catch (error) { threw = true; actual = String(error); }
  const passed = expected === null ? threw :
    !threw && typeof actual === 'number' && Math.abs(actual - expected) < 1e-8;
  return { id, orderValue, isVip, expected, actual, passed };
});
console.log(JSON.stringify(results, null, 2));
console.log(`Megfelelt: ${results.filter(r => r.passed).length}/${results.length}`);
process.exitCode = results.every(r => r.passed) ? 0 : 1;
