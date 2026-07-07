//! CasperSect AI Scan Registry
//!
//! Odra smart-contract module for storing verifiable wallet-risk scan evidence.
//! The frontend/backend produce a deterministic evidence hash, then a user-approved
//! Casper deploy records the result on Testnet.

use odra::prelude::*;

#[odra::odra_type]
pub struct ScanRecord {
    pub wallet: String,
    pub risk_score: u8,
    pub category: String,
    pub evidence_hash: String,
    pub summary: String,
    pub reporter: Address,
    pub created_at: u64,
}

#[odra::module]
pub struct ScanRegistry {
    scans: Mapping<String, ScanRecord>,
    scan_count: Var<u64>,
}

#[odra::module]
impl ScanRegistry {
    pub fn init(&mut self) {
        self.scan_count.set(0);
    }

    pub fn record_scan(
        &mut self,
        wallet: String,
        risk_score: u8,
        category: String,
        evidence_hash: String,
        summary: String,
    ) {
        assert!(risk_score <= 100, "risk score must be between 0 and 100");

        let caller = self.env().caller();
        let now = self.env().get_block_time();

        let record = ScanRecord {
            wallet: wallet.clone(),
            risk_score,
            category,
            evidence_hash,
            summary,
            reporter: caller,
            created_at: now,
        };

        self.scans.set(&wallet, record);

        let current = self.scan_count.get_or_default();
        self.scan_count.set(current + 1);
    }

    pub fn get_scan(&self, wallet: String) -> Option<ScanRecord> {
        self.scans.get(&wallet)
    }

    pub fn total_scans(&self) -> u64 {
        self.scan_count.get_or_default()
    }
}

// #[cfg(test)]
// mod tests {
//     use super::*;
//     use odra_test::env;

//     #[test]
//     fn records_scan() {
//         let mut contract = ScanRegistryHostRef::deploy(&env(), ());

//         contract.record_scan(
//             "account-hash-demo".to_string(),
//             42,
//             "moderate".to_string(),
//             "abc123".to_string(),
//             "demo scan".to_string(),
//         );

//         assert_eq!(contract.total_scans(), 1);

//         let record = contract
//             .get_scan("account-hash-demo".to_string())
//             .expect("scan should exist");

//         assert_eq!(record.risk_score, 42);
//         assert_eq!(record.category, "moderate".to_string());
//         assert_eq!(record.evidence_hash, "abc123".to_string());
//     }
// }