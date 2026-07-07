# CasperSect Scan Registry Contract

This folder contains the Odra smart contract for recording AI wallet-risk scan evidence on Casper.

## Build

```bash
rustup target add wasm32-unknown-unknown
cargo build
```

## Test

```bash
cargo test
```

## Contract Entry Points

### `record_scan(wallet, risk_score, category, evidence_hash, summary)`

Records one scan result for a wallet. The reporter is the caller of the deploy.

### `get_scan(wallet)`

Returns the latest scan for a wallet.

### `total_scans()`

Returns the total number of scan submissions.

## Testnet Deployment

See `../../docs/testnet-deployment.md`.
