export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5050";

export type TxInput = {
  hash: string;
  amount: number;
  direction: "inbound" | "outbound";
  counterparty: string;
  timestamp: string;
  label?: string;
};

async function api<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API request failed: ${response.status}`);
  }

  return response.json();
}

export function analyzeRisk(
  walletAddress: string,
  transactions: TxInput[]
) {
  return api("/api/risk/analyze", {
    walletAddress,
    transactions,
  });
}

export function recommendAction(result: unknown) {
  return api("/api/agent/recommend", result);
}

export function createScanPayload(result: unknown) {
  return api("/api/casper/scan-payload", result);
}

export function recordLocalScan(scan: unknown) {
  return api("/api/casper/record-local", scan);
}