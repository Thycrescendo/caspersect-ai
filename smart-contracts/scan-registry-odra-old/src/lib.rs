#![no_std]

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