// Run with: npm test  (uses Node's built-in test runner, no installs needed)
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const Calc = require('./calc.js');

const cases = JSON.parse(fs.readFileSync(path.join(__dirname, 'ref-test-cases.json'), 'utf8'));

const cents = (value) => Calc.roundTo(value, 2);

function assertMoney(actual, expected, label) {
  assert.equal(cents(actual), cents(expected), `${label}: got ${actual}, expected ${expected}`);
}

for (const tc of cases) {
  test(tc.name, () => {
    const r = Calc.calculate(tc.inputs);
    const e = tc.expected;

    assertMoney(r.materialCost, e.materialCost, 'materialCost');
    assertMoney(r.laborCost, e.laborCost, 'laborCost');
    assertMoney(r.totalCost, e.totalCost, 'totalCost');
    assert.equal(r.recommendedPrice, e.recommendedPrice, 'recommendedPrice');
    assert.equal(r.health, e.health, 'health');

    if (e.recommendedPrice === 0) assert.equal(r.error, 'IMPOSSIBLE');
    else assert.equal(r.error, null);

    if ('profit' in e) assertMoney(r.profit, e.profit, 'profit');
    if ('priceGap' in e) assertMoney(r.priceGap, e.priceGap, 'priceGap');
    if ('marginPct' in e) {
      assert.equal(Calc.roundTo(r.marginPct, 1), e.marginPct, `marginPct: got ${r.marginPct}`);
    }
    if (!('profit' in e)) assert.equal(r.hasCurrentPrice, false);
  });
}

// The receipt, as shown on the page (rounded to cents), must add up to what
// the seller receives: the price, after any discount, plus shipping charged.
function checkReceipt(inputs, label) {
  const r = Calc.calculate(inputs);
  const shown = Calc.roundReceipt(r.receipt);
  const total = shown.lines.reduce((sum, line) => sum + Math.round(line.amount * 100), 0) +
    Math.round(shown.profit * 100);
  assert.equal(total, Math.round(shown.received * 100), `${label}: rows do not add up`);
  assert.equal(shown.profit, cents(r.receipt.profit), `${label}: profit changed`);
  shown.lines.forEach((line, i) => {
    const gap = Math.abs(line.amount - r.receipt.lines[i].amount);
    assert.ok(gap < 0.0100001, `${label}: ${line.label} is ${gap} away from its exact value`);
  });
  return r;
}

test('receipt adds up to the recommended price, for every test case', () => {
  for (const tc of cases) {
    if (tc.expected.recommendedPrice === 0) continue;
    const r = checkReceipt(tc.inputs, tc.name);
    if (!tc.inputs.discountPct && !tc.inputs.shippingCharged) {
      assert.equal(cents(r.receipt.received), r.recommendedPrice);
    }
  }
});

test('receipt adds up for 5,000 random products', () => {
  let seed = 42; // fixed seed so the test always checks the same inputs
  const rand = (max) => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return Math.round(seed / 2147483648 * max * 1000) / 1000;
  };
  for (let i = 0; i < 5000; i++) {
    const inputs = {
      materialLines: [
        { packPrice: rand(50), packQty: rand(5000) + 1, used: rand(100) },
        { packPrice: rand(30), packQty: rand(50) + 1, used: rand(3) }
      ],
      laborMinutes: rand(60), hourlyRate: rand(30), packaging: rand(2),
      shippingCost: rand(8), overhead: rand(1), etsyAdsPerSale: rand(1),
      marketingPerSale: rand(3), discountPct: i % 3 ? 0 : rand(20),
      shippingCharged: i % 4 ? 0 : rand(6)
    };
    checkReceipt(inputs, `random #${i}`);
  }
});

test('receipt profit at the recommended price is the real profit at that price', () => {
  const inputs = Object.assign({}, cases[0].inputs, { currentPrice: 19.53 });
  const r = Calc.calculate(inputs);
  assertMoney(r.receipt.profit, 5.86, 'receipt profit');
  assertMoney(r.profit, r.receipt.profit, 'same profit');
});

test('impossible settings give an error and no receipt', () => {
  const r = Calc.calculate({ targetMarginPct: 90 });
  assert.equal(r.error, 'IMPOSSIBLE');
  assert.equal(r.recommendedPrice, 0);
  assert.equal(r.receipt, null);
});

test('empty inputs count as 0 and use the default settings', () => {
  const r = Calc.calculate({});
  assert.equal(r.totalCost, 0);
  // 0.45 / (1 - 0.125 - 0.02 - 0.30)
  assert.equal(r.recommendedPrice, 0.81);
  assert.equal(r.health, 'No price yet');
});

test('a material line with no pack quantity costs 0', () => {
  assert.equal(Calc.materialLineCost({ packPrice: 35, packQty: 0, used: 70 }), 0);
  assert.equal(Calc.materialLineCost({ packPrice: 35, packQty: '', used: 70 }), 0);
});

test('negative and non-numeric values are ignored (count as 0)', () => {
  const r = Calc.calculate({ packaging: -5, overhead: 'abc', laborMinutes: 10, hourlyRate: 20 });
  assertMoney(r.totalCost, 3.33, 'totalCost');
});
