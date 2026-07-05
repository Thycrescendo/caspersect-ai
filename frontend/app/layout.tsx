import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CasperSect AI',
  description: 'Agentic wallet risk analysis and on-chain scan registry on Casper.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
