export type CasperWalletState = {
  isAvailable: boolean;
  publicKey?: string;
};

export function getCasperProvider() {
  if (typeof window === 'undefined') return undefined;
  return window.CasperWalletProvider;
}

export async function connectCasperWallet(): Promise<CasperWalletState> {
  const provider = getCasperProvider();
  if (!provider) return { isAvailable: false };
  await provider.requestConnection();
  const publicKey = await provider.getActivePublicKey();
  return { isAvailable: true, publicKey };
}
