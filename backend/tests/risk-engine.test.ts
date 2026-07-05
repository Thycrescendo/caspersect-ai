import { describe, expect, it } from 'vitest';
import { analyzeWalletRisk } from '../src/services/risk-engine.js';

describe('risk engine', () => {
  it('scores risky labels higher', async () => {
    const result = await analyzeWalletRisk({
      walletAddress: 'account-hash-demo',
      transactions: [
        { hash: '1', amount: 250, direction: 'outbound', counterparty: 'x', timestamp: new Date().toISOString(), label: 'unknown bridge' },
        { hash: '2', amount: 100, direction: 'outbound', counterparty: 'x', timestamp: new Date().toISOString(), label: 'phish' },
        { hash: '3', amount: 10, direction: 'inbound', counterparty: 'y', timestamp: new Date().toISOString() }
      ]
    });
    expect(result.riskScore).toBeGreaterThan(40);
    expect(result.scanHash).toHaveLength(64);
  });
});
