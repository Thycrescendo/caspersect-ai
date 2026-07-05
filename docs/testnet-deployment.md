# Casper Testnet Deployment Guide

This guide turns CasperSect AI from a local prototype into a Testnet-ready hackathon submission.

## 1. Prepare Casper Wallet

1. Install Casper Wallet browser extension.
2. Create or import a testnet account.
3. Fund the account from the Casper Testnet faucet.
4. Copy your public key.

## 2. Build the Odra Contract

```bash
cd smart-contracts/scan-registry
rustup target add wasm32-unknown-unknown
cargo build
```

If you use Odra CLI in your local setup:

```bash
cargo install odra-cli
cargo odra build
```

## 3. Deploy to Casper Testnet

Use the deployment command recommended by your installed Odra CLI version. After deployment, capture the contract package hash.

Update backend `.env`:

```env
CASPER_NETWORK=testnet
CASPER_NODE_RPC=https://node.testnet.casper.network/rpc
SCAN_REGISTRY_PACKAGE_HASH=hash-your-package-hash
```

## 4. Record a Scan

1. Run backend and frontend.
2. Connect Casper Wallet.
3. Run AI scan.
4. Use the generated runtime args to call `record_scan`.
5. Save the deploy hash in the dashboard.
6. Add the deploy link to your DoraHacks submission.

## 5. Submission Evidence

Include:

- GitHub repository URL
- Frontend demo URL or local demo video
- Casper Testnet contract package hash
- Example deploy hash proving transaction-producing behavior
- Demo video showing analysis and on-chain recording
