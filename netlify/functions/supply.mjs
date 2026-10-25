/* Public read-only BEP-20 supply endpoint. No cookies, wallets or credentials. */
const ADDRESS = '0x94aa263052419b526f93c4a2924929abfdf13bc4';
const RPC_URLS = [
  'https://bsc-rpc.publicnode.com',
  'https://bsc-dataseed.bnbchain.org',
  'https://bsc-dataseed.binance.org',
  'https://1rpc.io/bnb',
];

const json = (statusCode, data) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, max-age=0',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(data),
});

async function call(rpc, selector, abortSignal) {
  const response = await fetch(rpc, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_call',
      params: [{ to: ADDRESS, data: selector }, 'latest'] }),
    signal: abortSignal,
  });
  if (!response.ok) throw new Error(`RPC HTTP ${response.status}`);
  const body = await response.json();
  if (body.error || !/^0x[0-9a-f]+$/i.test(body.result ?? '')) {
    throw new Error('No valid contract response');
  }
  return BigInt(body.result);
}

export function formatRawSupply(raw, decimals) {
  if (typeof raw !== 'bigint' || raw < 0n || !Number.isInteger(decimals) || decimals < 0 || decimals > 36) {
    throw new Error('Invalid supply parameters');
  }
  const digits = raw.toString().padStart(decimals + 1, '0');
  if (decimals === 0) return digits;
  const integer = digits.slice(0, -decimals);
  const fraction = digits.slice(-decimals).replace(/0+$/, '');
  return fraction ? `${integer}.${fraction}` : integer;
}

export async function getSupplyFromRpc(rpc, fetchTimeoutMs = 6500) {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), fetchTimeoutMs);
  try {
    const [raw, decimalsRaw] = await Promise.all([
      call(rpc, '0x18160ddd', ctrl.signal), // totalSupply()
      call(rpc, '0x313ce567', ctrl.signal), // decimals()
    ]);
    const decimals = Number(decimalsRaw);
    const supply = formatRawSupply(raw, decimals);
    return { supply, raw: raw.toString(), decimals };
  } finally {
    clearTimeout(timeout);
  }
}

export async function handler(event = {}) {
  if (event.httpMethod && event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed' });
  // Optional authenticated indexed explorer API in case public RPCs fail; not required.
  // Priority remains contract totalSupply(). API is used only if key is configured.
  const rpcUrls = process.env.BSC_RPC_URL
    ? [process.env.BSC_RPC_URL, ...RPC_URLS]
    : RPC_URLS;
  for (const rpc of rpcUrls) {
    try {
      const supply = await getSupplyFromRpc(rpc);
      return json(200, {
        ok: true,
        ...supply,
        contract: ADDRESS,
        chainId: 56,
        method: 'totalSupply()',
        source: 'BNB Smart Chain',
        fetchedAt: new Date().toISOString(),
      });
    } catch (error) {
      // Move to the next read-only public RPC. Never manufacture a value.
      console.warn('RM supply RPC unavailable:', new URL(rpc).hostname, error.message);
    }
  }
  return json(503, {
    ok: false,
    error: 'Blockchain currently unavailable. Please try again.',
  });
}
