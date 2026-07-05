import crypto from 'node:crypto';

type ScanPayloadInput = {
  walletAddress: string;
  riskScore: number;
  category: string;
  summary: string;
  flags: string[];
};

const localScans: unknown[] = [];

export async function createScanPayload(input: ScanPayloadInput) {
  const timestamp = new Date().toISOString();
  const evidenceHash = crypto
    .createHash('sha256')
    .update(JSON.stringify({ ...input, timestamp }))
    .digest('hex');

  return {
    network: process.env.CASPER_NETWORK || 'testnet',
    rpc: process.env.CASPER_NODE_RPC || 'https://node.testnet.casper.network/rpc',
    contractPackageHash: process.env.SCAN_REGISTRY_PACKAGE_HASH || 'deploy-contract-first',
    entryPoint: 'record_scan',
    runtimeArgs: {
      wallet: input.walletAddress,
      risk_score: input.riskScore,
      category: input.category,
      evidence_hash: evidenceHash,
      summary: input.summary.slice(0, 240)
    },
    evidenceHash,
    timestamp,
    note: 'Use these values to create a Casper deploy calling the Odra scan registry record_scan entrypoint.'
  };
}

export async function recordLocalScan(scan: unknown) {
  const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...scan as object };
  localScans.unshift(record);
  return { ok: true, record };
}

export function listLocalScans() {
  return localScans.slice(0, 20);
}
