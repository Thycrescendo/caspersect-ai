'use client';

import { Wallet } from 'lucide-react';
import { connectCasperWallet } from '@/lib/casper-wallet';

export function WalletConnector({ publicKey, setPublicKey }: { publicKey: string; setPublicKey: (v: string) => void }) {
  async function connect() {
    const wallet = await connectCasperWallet();
    if (!wallet.isAvailable) {
      alert('Casper Wallet extension was not detected. Install it, then refresh.');
      return;
    }
    if (wallet.publicKey) setPublicKey(wallet.publicKey);
  }

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-casper/20 p-3 text-casper"><Wallet /></div>
        <div>
          <h2 className="text-xl font-semibold">Casper Wallet</h2>
          <p className="text-sm text-zinc-400">Connect a Casper account or paste a public key to analyze.</p>
        </div>
      </div>
      <button className="button" onClick={connect}>Connect Casper Wallet</button>
      <input className="input" value={publicKey} onChange={e => setPublicKey(e.target.value)} placeholder="Paste Casper public key or account hash" />
    </div>
  );
}
