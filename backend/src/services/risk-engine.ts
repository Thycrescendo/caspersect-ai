import crypto from 'node:crypto';

export type WalletTransaction = {
  hash: string;
  amount: number;
  direction: 'inbound' | 'outbound';
  counterparty: string;
  timestamp: string;
  label?: string;
};

export type RiskInput = {
  walletAddress: string;
  transactions: WalletTransaction[];
  context?: string;
};

export async function analyzeWalletRisk(input: RiskInput) {
  const txs = input.transactions;
  const outboundValue = txs.filter(t => t.direction === 'outbound').reduce((sum, tx) => sum + tx.amount, 0);
  const inboundValue = txs.filter(t => t.direction === 'inbound').reduce((sum, tx) => sum + tx.amount, 0);
  const uniqueCounterparties = new Set(txs.map(t => t.counterparty.toLowerCase())).size;
  const riskyLabels = txs.filter(t => /mixer|phish|exploit|bridge|unknown/i.test(t.label || '')).length;
  const burstActivity = txs.length >= 8 ? 12 : 0;
  const highOutbound = outboundValue > inboundValue * 2 && outboundValue > 100 ? 18 : 0;
  const concentration = uniqueCounterparties <= 2 && txs.length >= 5 ? 10 : 0;
  const labelRisk = Math.min(35, riskyLabels * 12);

  const score = Math.min(100, Math.round(18 + burstActivity + highOutbound + concentration + labelRisk + Math.min(20, txs.length * 2)));
  const flags: string[] = [];
  if (burstActivity) flags.push('High transaction burst detected');
  if (highOutbound) flags.push('Outbound value significantly exceeds inbound value');
  if (concentration) flags.push('Activity concentrated around few counterparties');
  if (riskyLabels) flags.push('Potentially risky counterparty labels found');
  if (txs.length === 0) flags.push('No recent transaction data supplied; confidence is limited');

  const category = score >= 75 ? 'critical' : score >= 50 ? 'elevated' : score >= 30 ? 'moderate' : 'low';
  const scanHash = crypto
    .createHash('sha256')
    .update(JSON.stringify({ walletAddress: input.walletAddress, score, category, flags, txs }))
    .digest('hex');

  return {
    walletAddress: input.walletAddress,
    riskScore: score,
    category,
    confidence: txs.length ? Math.min(0.95, 0.55 + txs.length * 0.04) : 0.42,
    scanHash,
    summary: `CasperSect AI classified this wallet as ${category} risk with a score of ${score}/100.`,
    flags,
    recommendedAction: score >= 75
      ? 'Record scan on-chain, freeze automated interactions, and manually review counterparties.'
      : score >= 50
        ? 'Record scan on-chain and monitor wallet for additional suspicious activity.'
        : 'Record scan for audit history and continue monitoring.'
  };
}
