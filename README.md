# CasperSect AI

CasperSect AI is an agentic Web3 security and wallet-risk intelligence platform built for the **Casper Agentic Buildathon 2026**. It combines a modern Next.js dashboard, an Express AI backend, Casper wallet integration, and an Odra smart-contract registry for recording verifiable risk scan results on Casper Testnet.

## Why it fits the Buildathon

- **Agentic AI:** an autonomous risk agent evaluates wallet activity, assigns a risk score, explains the decision, and recommends next actions.
- **Casper Testnet:** the project includes a Casper/Odra scan registry contract and frontend flow for submitting scan evidence.
- **Transaction-producing component:** wallet scans can be recorded on-chain with a scan hash, risk score, category, and timestamp.
- **DeFi/RWA relevance:** the same workflow can help wallets, DeFi users, RWA issuers, and protocol operators verify risk signals.
- **Open-source submission:** includes setup docs, demo flow, presentation, and demo video script.

## Repository Structure

```txt
caspersect-ai/
├── frontend/                # Next.js 15 + TypeScript + Tailwind UI
├── backend/                 # Express + TypeScript AI/risk-analysis API
├── smart-contracts/          # Odra/Casper scan registry contract
│   └── scan-registry/
├── docs/
│   ├── demo-video-script.md
│   ├── hackathon-submission.md
│   └── testnet-deployment.md
├── pitch/
│   └── CasperSect-AI-Hackathon-Pitch.pptx
├── package.json
└── README.md
```

## Quick Start

### 1. Install everything

```bash
npm run install:all
```

Or install each app separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure backend

```bash
cd backend
cp .env.example .env
```

Optional AI integration:

```env
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4o-mini
```

If no OpenAI key is provided, the backend uses the built-in deterministic risk engine so the app still works for demo purposes.

### 3. Run backend

```bash
cd backend
npm run dev
```

Backend runs at:

```txt
http://localhost:5050
```

### 4. Run frontend

```bash
cd frontend
cp .env.example .env.local
npm run dev
```

Frontend runs at:

```txt
http://localhost:3000
```

### 5. Build smart contract

```bash
cd smart-contracts/scan-registry
rustup target add wasm32-unknown-unknown
cargo build
```

For real Testnet deployment, follow:

```txt
docs/testnet-deployment.md
```

## Main User Flow

1. Open the dashboard.
2. Connect Casper Wallet.
3. Enter or confirm a wallet public key/account hash.
4. Run AI risk analysis.
5. Review the risk score, flags, and agent recommendation.
6. Generate scan evidence hash.
7. Record scan result on Casper Testnet.
8. Copy the transaction hash into the dashboard to mark the scan as verified.

## Backend API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | API health check |
| `POST` | `/api/risk/analyze` | Analyze wallet risk |
| `POST` | `/api/agent/recommend` | Generate agent recommendation |
| `POST` | `/api/casper/scan-payload` | Prepare on-chain scan payload metadata |
| `POST` | `/api/casper/record-local` | Store submitted scan proof locally for demo history |
| `GET` | `/api/casper/scans` | List demo scan records |

## Environment Variables

### Backend

```env
PORT=5050
FRONTEND_ORIGIN=http://localhost:3000
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
CASPER_NETWORK=testnet
CASPER_NODE_RPC=https://node.testnet.casper.network/rpc
SCAN_REGISTRY_PACKAGE_HASH=
```

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5050
NEXT_PUBLIC_CASPER_NETWORK=testnet
NEXT_PUBLIC_CASPER_EXPLORER=https://testnet.cspr.live
```

## Hackathon Deliverables Included

- Working frontend scaffold
- Working backend API
- AI-powered wallet risk analysis
- Casper wallet integration helper
- Odra smart-contract source
- Casper Testnet deployment guide
- Polished README
- Demo video script
- Hackathon submission copy
- Pitch presentation

## Demo Positioning

> CasperSect AI turns a passive wallet dashboard into an autonomous security agent. It analyzes wallet behavior, explains risk, recommends actions, and records verifiable scan results on Casper Testnet.

## License

MIT

## Validation

The backend and frontend were build-tested before packaging. See `docs/validation.md` for details. The Odra contract source is included, but Rust/Cargo must be installed locally to compile and deploy it to Casper Testnet.
