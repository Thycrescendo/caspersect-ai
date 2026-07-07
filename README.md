# CasperSect AI

> **An AI-powered blockchain security agent for the Casper Network**

CasperSect AI is an intelligent blockchain security platform that helps users identify wallet risks, understand potential threats in plain language, and securely record verified security scan results on the Casper blockchain. By combining artificial intelligence with smart contracts, CasperSect AI makes Web3 security more transparent, proactive, and accessible.

Built for the **Casper Agentic Buildathon**, CasperSect AI demonstrates how AI agents can work alongside decentralized infrastructure to improve user safety while creating immutable, verifiable on-chain security records.

---

# Vision

Blockchain security remains one of the biggest barriers to Web3 adoption. Most users struggle to identify malicious transactions, understand wallet risks, or verify whether security information can be trusted.

CasperSect AI addresses this problem by acting as an intelligent security companion that:

* analyzes wallet activity,
* evaluates security risks,
* explains threats in simple language,
* recommends protective actions,
* records verified security evidence permanently on the Casper blockchain.

The long-term vision is to provide every Casper user with an AI-powered security assistant capable of preventing attacks before they happen while maintaining transparent, verifiable on-chain records.

---

# Key Features

* AI-powered wallet risk analysis
* Intelligent threat explanations
* Risk scoring engine
* On-chain scan registry
* Immutable security evidence storage
* Casper Testnet smart contract integration
* Wallet-ready architecture
* Modern Next.js frontend
* Express.js backend API
* Rust smart contracts built with the Native Casper Rust SDK

---

# Technology Stack

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Express.js
* TypeScript

## Artificial Intelligence

* OpenAI API
* AI Wallet Risk Analysis
* Security Recommendation Engine

## Blockchain

* Casper Network Testnet
* Native Casper Rust Smart Contract SDK
* Rust
* Casper Wallet Integration

---

# Smart Contract

CasperSect AI includes a dedicated smart contract that acts as an immutable registry for AI-generated wallet security scans.

Each record contains:

* Wallet Address
* Risk Score
* Risk Category
* Evidence Hash
* Security Summary
* Reporter
* Timestamp

Public contract entry points include:

* `record_scan`
* `get_scan`
* `total_scans`

---

# Casper Testnet Deployment

The smart contract has been successfully deployed to the **Casper Testnet**.

## Contract Address

```text
contract-9f3f473562a51da950d2fe70a0b73bf6e65936ea527819fcafbaca36bbc3dff2
```

## Contract Package

```text
contract-package-877beffd6e10dc180243d7f3e1d99f9fbbf6f7ef70900797a378d7d8a36b487b
```

## Deployment Transaction

```text
644c4d9185ed57c1dbe5cb766cea12ecaa44c831b665ec82a082f91f4a7cc1e8
```

The deployment executed successfully on the Casper Testnet and exposed the following public entry points:

* `record_scan`
* `get_scan`
* `total_scans`

The contract stores security scan data directly on-chain, allowing applications to verify recorded scan information without relying on centralized infrastructure.

---

# Project Structure

```
caspersect-ai/

├── frontend/
│   ├── Next.js
│   ├── React
│   └── Tailwind CSS
│
├── backend/
│   ├── Express API
│   ├── AI Risk Engine
│   └── Casper Integration
│
├── smart-contracts/
│   └── scan-registry/
│       ├── Rust
│       ├── Native Casper SDK
│       └── Smart Contract
│
├── docs/
└── README.md
```

---

# How It Works

1. A user connects their Casper wallet.
2. The backend analyzes wallet activity using the AI security engine.
3. The AI produces:

   * Risk score
   * Risk category
   * Human-readable explanation
   * Evidence hash
4. The user approves recording the scan.
5. The smart contract permanently stores the scan on the Casper Testnet.
6. Applications can later retrieve and verify scan records directly from the blockchain.

---

# Why CasperSect AI?

CasperSect AI combines artificial intelligence with blockchain technology to provide:

* Better wallet security
* Transparent risk reporting
* Verifiable security records
* Trustless evidence storage
* Improved user confidence when interacting with decentralized applications

Instead of relying on centralized security databases, CasperSect AI creates immutable on-chain security records that can be independently verified by anyone.

---

# Future Roadmap

* Autonomous AI security agent workflows
* Real-time wallet monitoring
* Smart contract vulnerability detection
* Phishing and scam detection
* Multi-wallet support
* Cross-chain security intelligence
* Risk notification system
* Security analytics dashboard
* Enterprise API
* DAO governance integration

---

# Build Status

* Smart Contract: Complete
* Casper Testnet Deployment: Complete
* AI Risk Engine: Complete
* Backend API: Complete
* Frontend Dashboard: Complete
* On-chain Scan Registry: Complete

---

# License

MIT License
