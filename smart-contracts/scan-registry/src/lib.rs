#![no_std]
#![no_main]

extern crate alloc;

use alloc::{format, string::String, vec};

use casper_contract::{
    contract_api::{runtime, storage},
    unwrap_or_revert::UnwrapOrRevert,
};

use casper_types::{
    contracts::{EntryPoint, EntryPoints, NamedKeys},
    CLType, CLValue, EntryPointAccess, EntryPointType, Key, Parameter, URef,
};

const SCANS_DICT: &str = "scans";
const SCAN_COUNT: &str = "scan_count";
const CONTRACT_HASH_NAME: &str = "caspersect_scan_registry_hash";
const CONTRACT_PACKAGE_HASH_NAME: &str = "caspersect_scan_registry_package_hash";

fn get_scan_count_uref() -> URef {
    runtime::get_key(SCAN_COUNT)
        .unwrap_or_revert()
        .into_uref()
        .unwrap_or_revert()
}

fn get_scans_uref() -> URef {
    runtime::get_key(SCANS_DICT)
        .unwrap_or_revert()
        .into_uref()
        .unwrap_or_revert()
}

#[no_mangle]
pub extern "C" fn record_scan() {
    let wallet: String = runtime::get_named_arg("wallet");
    let risk_score: u8 = runtime::get_named_arg("risk_score");
    let category: String = runtime::get_named_arg("category");
    let evidence_hash: String = runtime::get_named_arg("evidence_hash");
    let summary: String = runtime::get_named_arg("summary");

    if risk_score > 100 {
        runtime::revert(casper_types::ApiError::User(1));
    }

    let caller = runtime::get_caller();
    let block_time = runtime::get_blocktime();

    let record = format!(
        "{{\"wallet\":\"{}\",\"risk_score\":{},\"category\":\"{}\",\"evidence_hash\":\"{}\",\"summary\":\"{}\",\"reporter\":\"{}\",\"created_at\":\"{:?}\"}}",
        wallet,
        risk_score,
        category,
        evidence_hash,
        summary,
        caller,
        block_time
    );

    let scans_uref = get_scans_uref();
    storage::dictionary_put(scans_uref, &wallet, record);

    let count_uref = get_scan_count_uref();
    let current: u64 = storage::read(count_uref).unwrap_or_default().unwrap_or(0);
    storage::write(count_uref, current + 1);
}

#[no_mangle]
pub extern "C" fn get_scan() {
    let wallet: String = runtime::get_named_arg("wallet");
    let scans_uref = get_scans_uref();

    let record: Option<String> =
        storage::dictionary_get(scans_uref, &wallet).unwrap_or_revert();

    runtime::ret(CLValue::from_t(record.unwrap_or_default()).unwrap_or_revert());
}

#[no_mangle]
pub extern "C" fn total_scans() {
    let count_uref = get_scan_count_uref();
    let count: u64 = storage::read(count_uref).unwrap_or_default().unwrap_or(0);

    runtime::ret(CLValue::from_t(count).unwrap_or_revert());
}

fn entry_points() -> EntryPoints {
    let mut entry_points = EntryPoints::new();

    entry_points.add_entry_point(EntryPoint::new(
        "record_scan",
        vec![
            Parameter::new("wallet", CLType::String),
            Parameter::new("risk_score", CLType::U8),
            Parameter::new("category", CLType::String),
            Parameter::new("evidence_hash", CLType::String),
            Parameter::new("summary", CLType::String),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Called,
    ));

    entry_points.add_entry_point(EntryPoint::new(
        "get_scan",
        vec![Parameter::new("wallet", CLType::String)],
        CLType::String,
        EntryPointAccess::Public,
        EntryPointType::Called,
    ));

    entry_points.add_entry_point(EntryPoint::new(
        "total_scans",
        vec![],
        CLType::U64,
        EntryPointAccess::Public,
        EntryPointType::Called,
    ));

    entry_points
}

#[no_mangle]
pub extern "C" fn call() {
    let scans_uref = storage::new_dictionary(SCANS_DICT).unwrap_or_revert();
    let scan_count_uref = storage::new_uref(0u64);

    let mut named_keys = NamedKeys::new();
    named_keys.insert(SCANS_DICT.into(), Key::URef(scans_uref));
    named_keys.insert(SCAN_COUNT.into(), Key::URef(scan_count_uref));

    let (contract_hash, _contract_version) = storage::new_locked_contract(
    entry_points().into(),
    Some(named_keys),
    None,
    None,
    None,
    );

runtime::put_key(CONTRACT_HASH_NAME, contract_hash.into());

    runtime::put_key(CONTRACT_HASH_NAME, contract_hash.into());
    
}