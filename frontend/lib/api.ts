export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';

export type TxInput = {
  hash: string;
  amount: number;
  direction: 'inbound' | 'outbound';
  counterparty: string;
  timestamp: string;
  label?: string;
};

export async function analyzeRisk(walletAddress: string, transactions: TxInput[]) {
  const response = await fetch(`${API_URL}/api/risk/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress, transactions })
  });
  if (!response.ok) throw new Error('Risk analysis failed');
  return response.json();
}

export async function recommendAction(result: any) {
  const response = await fetch(`${API_URL}/api/agent/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result)
  });
  if (!response.ok) throw new Error('Agent recommendation failed');
  return response.json();
}

export async function createScanPayload(result: any) {
  const response = await fetch(`${API_URL}/api/casper/scan-payload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result)
  });
  if (!response.ok) throw new Error('Payload generation failed');
  return response.json();
}

export async function recordLocalScan(scan: any) {
  const response = await fetch(`${API_URL}/api/casper/record-local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scan)
  });
  if (!response.ok) throw new Error('Local recording failed');
  return response.json();
}
