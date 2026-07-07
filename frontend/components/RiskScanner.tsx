"use client";

import { ShieldAlert, Sparkles } from "lucide-react";
import {
  analyzeRisk,
  createScanPayload,
  recommendAction,
  recordLocalScan,
  type CombinedScanResult,
  type TxInput,
} from "@/lib/api";

const demoTxs: TxInput[] = [
  {
    hash: "demo-1",
    amount: 250,
    direction: "outbound",
    counterparty: "account-hash-bridge",
    timestamp: new Date().toISOString(),
    label: "unknown bridge",
  },
  {
    hash: "demo-2",
    amount: 75,
    direction: "outbound",
    counterparty: "account-hash-bridge",
    timestamp: new Date().toISOString(),
    label: "unknown",
  },
  {
    hash: "demo-3",
    amount: 12,
    direction: "inbound",
    counterparty: "account-hash-user",
    timestamp: new Date().toISOString(),
  },
];

type RiskScannerProps = {
  publicKey: string;
  result: CombinedScanResult | null;
  setResult: (value: CombinedScanResult | null) => void;
};

export function RiskScanner({
  publicKey,
  result,
  setResult,
}: RiskScannerProps) {
  async function runScan() {
    const wallet = publicKey || "account-hash-demo-wallet";

    const risk = await analyzeRisk(wallet, demoTxs);
    const agent = await recommendAction(risk);
    const payload = await createScanPayload(risk);

    const combined: CombinedScanResult = {
      ...risk,
      agent,
      payload,
    };

    setResult(combined);
  }

  async function markRecorded() {
    if (!result) return;

    const txHash = prompt(
      "Paste Casper Testnet transaction/deploy hash after recording scan on-chain:"
    );

    if (!txHash) return;

    const saved = await recordLocalScan({
      ...result,
      txHash,
    });

    setResult({
      ...result,
      txHash,
      saved,
    });
  }

  return (
    <div className="card space-y-5">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-casper/20 p-3 text-casper">
          <ShieldAlert />
        </div>

        <div>
          <h2 className="text-xl font-semibold">AI Risk Scanner</h2>
          <p className="text-sm text-zinc-400">
            Run an agentic wallet review and prepare Casper scan evidence.
          </p>
        </div>
      </div>

      <button className="button" onClick={runScan}>
        Run AI Scan
      </button>

      {result && (
        <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Risk Score
            </p>
            <span className="badge">{result.category}</span>
          </div>

          <p className="mt-3 text-6xl font-bold text-casper">
            {result.riskScore}
          </p>

          <p className="mt-2 text-zinc-300">{result.summary}</p>

          {result.flags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {result.flags.map((flag) => (
                <span className="badge" key={flag}>
                  {flag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-2xl bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-casper">
              <Sparkles size={18} />
              <span className="font-semibold">Agent Recommendation</span>
            </div>

            <p className="text-sm text-zinc-300">
              {result.agent.explanation ||
                result.agent.recommendation ||
                result.agent.action ||
                "No recommendation available."}
            </p>
          </div>

          <div className="mt-5 rounded-2xl bg-white/5 p-4 text-xs text-zinc-400">
            <p>Evidence Hash</p>
            <p className="break-all text-zinc-200">
              {result.payload.evidenceHash}
            </p>
          </div>

          <button className="button mt-5" onClick={markRecorded}>
            Mark Scan Recorded On Casper Testnet
          </button>

          {result.txHash && (
            <p className="mt-3 break-all text-sm text-green-300">
              Recorded deploy hash: {result.txHash}
            </p>
          )}
        </div>
      )}
    </div>
  );
}