# Validation Notes

The repository was validated in the generation environment with:

```bash
cd backend
npm install
npm run build
npm test
```

Result: backend TypeScript build passed and Vitest test suite passed.

```bash
cd frontend
npm install
npm run build
```

Result: Next.js 15 production build passed.

The smart-contract folder includes the Odra contract source and deployment documentation. Contract compilation was not executed in the generation environment because Rust/Cargo was not installed there. Run the following locally:

```bash
cd smart-contracts/scan-registry
rustup target add wasm32-unknown-unknown
cargo build
cargo test
```
