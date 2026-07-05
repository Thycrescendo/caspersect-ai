'use client';

import { useState } from 'react';
import { WalletConnector } from '@/components/WalletConnector';
import { RiskScanner } from '@/components/RiskScanner';
import { Architecture } from '@/components/Architecture';

export default function Home() {
  const [publicKey, setPublicKey] = useState('');
  const [result, setResult] = useState<any>(null);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,71,62,.22),_transparent_35%),#09090b]">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="badge">Casper Agentic Buildathon 2026</span>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">CasperSect AI</h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-300">An agentic wallet-risk platform that analyzes suspicious activity, recommends actions, and records verifiable scan evidence on Casper Testnet.</p>
          </div>
          <div className="rounded-3xl border border-casper/30 bg-casper/10 p-5 text-sm text-zinc-200">
            <p className="font-semibold text-white">Buildathon-ready</p>
            <p>AI agent · Casper wallet · Odra contract · Testnet recording</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <WalletConnector publicKey={publicKey} setPublicKey={setPublicKey} />
          <RiskScanner publicKey={publicKey} result={result} setResult={setResult} />
        </div>
        <div className="mt-6"><Architecture /></div>
      </section>
    </main>
  );
}
