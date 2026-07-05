export {};

declare global {
  interface Window {
    CasperWalletProvider?: {
      requestConnection: () => Promise<void>;
      isConnected: () => Promise<boolean>;
      getActivePublicKey: () => Promise<string>;
      sign: (deploy: unknown, signingPublicKey: string) => Promise<unknown>;
    };
  }
}
