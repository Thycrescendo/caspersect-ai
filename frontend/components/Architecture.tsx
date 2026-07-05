import type { LucideIcon } from 'lucide-react';
import { Bot, Database, Globe2, WalletCards } from 'lucide-react';

type ArchitectureItem = {
  title: string;
  text: string;
  Icon: LucideIcon;
};

const items: ArchitectureItem[] = [
  { title: 'Frontend', text: 'Next.js 15 dashboard + Casper Wallet', Icon: Globe2 },
  { title: 'AI Backend', text: 'Express API + risk agent + OpenAI optional', Icon: Bot },
  { title: 'Casper Wallet', text: 'User-approved deploy signing', Icon: WalletCards },
  { title: 'Odra Registry', text: 'On-chain scan evidence records', Icon: Database }
];

export function Architecture() {
  return (
    <div className="card">
      <h2 className="mb-5 text-xl font-semibold">System Architecture</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map(({ title, text, Icon }) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-black/30 p-4">
            <Icon className="mb-4 text-casper" />
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
