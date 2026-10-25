import { strict as assert } from 'node:assert';
import { formatRawSupply, handler } from '../netlify/functions/supply.mjs';
assert.equal(formatRawSupply(150538n, 0), '150538');
assert.equal(formatRawSupply(150538n * 10n ** 18n, 18), '150538');
assert.equal(formatRawSupply(150538123400000000000000n, 18), '150538.1234');
assert.equal(formatRawSupply(1n, 18), '0.000000000000000001');
assert.throws(() => formatRawSupply(-1n, 18));
const forbidden = await handler({ httpMethod: 'POST' });
assert.equal(forbidden.statusCode, 405);
const remaining = Math.max(0, 250000 - Number(formatRawSupply(150538n * 10n ** 18n,18)));
assert.equal(remaining, 99462);
assert.equal((150538 / 250000 * 100).toFixed(2), '60.22');
console.log('All supply tests passed.');
// Deterministic contract API test without access to a real wallet or the network.
const previousFetch = globalThis.fetch;
try {
  globalThis.fetch = async (_url, options) => {
    const { method, params } = JSON.parse(options.body);
    assert.equal(method, 'eth_call');
    assert.equal(params[0].to, '0x94aa263052419b526f93c4a2924929abfdf13bc4');
    const expected = params[0].data === '0x18160ddd' ? 150538n * 10n ** 18n : 18n;
    return { ok: true, json: async () => ({ jsonrpc: '2.0', id: 1, result: '0x' + expected.toString(16) }) };
  };
  const response = await handler({ httpMethod: 'GET' });
  assert.equal(response.statusCode, 200);
  const body = JSON.parse(response.body);
  assert.equal(body.supply, '150538');
  assert.equal(body.contract, '0x94aa263052419b526f93c4a2924929abfdf13bc4');
  assert.equal(body.method, 'totalSupply()');
  assert.equal(body.ok, true);
} finally { globalThis.fetch = previousFetch; }
