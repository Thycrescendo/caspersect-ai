export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

export type TxInput = {
  hash: string;
  amount: number;
  direction: "inbound" | "outbound";
  counterparty: string;
  timestamp: string;
  label?: string;
};

export type RiskResult = {
  walletAddress: string;
  riskScore: number;
  category: string;
  summary: string;
  flags: string[];
  transactions?: TxInput[];
  evidenceHash?: string;
};

export type AgentRecommendation = {
  recommendation?: string;
  action?: string;
  explanation: string;
  confidence?: number;
};

export type ScanPayload = {
  wallet: string;
  walletAddress?: string;
  riskScore: number;
  category: string;
  evidenceHash: string;
  summary: string;
};

export type CombinedScanResult = RiskResult & {
  agent: AgentRecommendation;
  payload: ScanPayload;
  txHash?: string;
  saved?: unknown;
};

async function api<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function analyzeRisk(
  walletAddress: string,
  transactions: TxInput[]
): Promise<RiskResult> {
  return api<RiskResult>("/api/risk/analyze", {
    walletAddress,
    transactions,
  });
}

export function recommendAction(
  result: RiskResult
): Promise<AgentRecommendation> {
  return api<AgentRecommendation>("/api/agent/recommend", result);
}

export function createScanPayload(
  result: RiskResult
): Promise<ScanPayload> {
  return api<ScanPayload>("/api/casper/scan-payload", result);
}

export function recordLocalScan(
  scan: CombinedScanResult
): Promise<unknown> {
  return api<unknown>("/api/casper/record-local", scan);
}