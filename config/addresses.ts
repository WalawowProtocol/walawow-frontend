// 从 IDL 导入程序地址
import poolIdl from '../idl/walawow_pool.json'
import distributorIdl from '../idl/walawow_distributor.json'
import harvestIdl from '../idl/walawow_harvest.json'
import swapIdl from '../idl/walawow_swap.json'

/**
 * Walawow Protocol 地址配置
 * ✅ 与当前 devnet 实际部署状态完全一致
 */
export const WALAWOW_PROTOCOL_ADDRESSES = {
  // ==================== 程序 ID ====================
  HARVEST_PROGRAM: harvestIdl.address,        // EGgcfctL62Eaq8kG6T9gPjWSjNktx3edRVXWVm4e7R2r
  SWAP_PROGRAM: swapIdl.address,              // 93gyiehkL4mAQbqJViRWj3eq2FtGusy1SzuGLefNjamZ
  DISTRIBUTOR_PROGRAM: "Dr4qqXPEsbGt5TTuTbBcFSeqCUEAGv6ZNbZdwLTX8yTe",
  POOL_PROGRAM: "DNLgTgV56ifjHpP7V1iodtUoYwrnawq1tYMEwm2yD3KA",

  // ==================== Token Mint ====================
  WALAWOW_MINT: "vqvzPQ59Pdg5PUAYXeZ1sX5kiqNpGSXhaauXfE7PpZ2", // Token-2022 (taxed)
  USDC_MINT: "CBXMnFSp5Uxyybqv4vRik1NyhkixDAt4SYcU1sTZbKRL",    // Token-2022 USDC

  // ==================== Pool PDA ====================
  POOL_WEEKLY: "6ZuQ8Sokhm5ovXmaiMhSG2j5jgcWzYFR1WCUK6fDAmr8",
  POOL_MONTHLY: "PTz3PS5LWs96stMLRuQgU72HTPjGwhaaVFdHnTxmJcJ",
  POOL_WEEKLY_AUTHORITY: "GPJpB3eidJbj9NALkAqFXPLhiVNDWK5NsCrBQkW6FoDG",
  POOL_MONTHLY_AUTHORITY: "9hBWexge1ZLyv9YMJpr2PUnHZr5iSK2zr748tzZz47LD",

  // ==================== Distributor PDA ====================
  DISTRIBUTOR_CONFIG: "FUTmTfzZrzebkDRNmb3jmKY1mycvsDSL4U9WASXNpVWd",
  DISTRIBUTOR_AUTHORITY: "3H3dbH15zcxDAuQya5WeQSA8rFrYGuSvssjFMGFBHRBW",
  DISTRIBUTOR_VAULT: "EFSFzKvJCzTeJeq1Hy8w2SxqdWHk4dAmFLn8BS44EyBN",

  // Distributor 分配池（USDC vaults）
  DISTRIBUTOR_POOL_WEEKLY_VAULT: "8VzFpNAewszz3947vefjBUpxsX1DMr9s5XCCcxNqpuqc",
  DISTRIBUTOR_POOL_MONTHLY_VAULT: "5T8UXA2pZvJ2GTNGo6cs3cBxx8xXgC5JwNz8C4tsfigN",
  DISTRIBUTOR_POOL_STAKING_VAULT: "5mLjBNFnsUB27VPyquBDioBpMG6BMarTnnuK8UDFGfQn",
  DISTRIBUTOR_POOL_LIQUIDITY_VAULT: "2qQv7vrh2j7LveL44iZfc5PgVoCr6WNgq7XhGpj1vRHj",
  DISTRIBUTOR_POOL_TEAM_VAULT: "4atbKZz5DufzxSwzkEjY7cdd2waZ67stfyBLNo34M6JG",
  WEEKLY_STAGING_VAULT: "HGCkYZEnpcGzCEQ8FukBJRVnYYPzrhoTp1TvgViejEC5",
  MONTHLY_STAGING_VAULT: "GhURdu6UCP8pMv4vdbS1tApWn7LsY49GFp83r2XvJAiU",

  // ==================== Harvest PDA ====================
  HARVEST_CONFIG: "5roJrf7tNxTpcUdsdbD96hTZkdufACJq98GE1zMNKavV",
  HARVEST_AUTHORITY: "DimqWk8eRXxo7YEUV3TGENyZAcKZcmdc9ZX211o4kdDG",

  // ==================== Swap PDA ====================
  SWAP_CONFIG: "MQbvsddgxMQ3io45DrzDeptXPQokf5tXYJBactuDoUB",
  SWAP_AUTHORITY: "EojxfsA32ks8utWM4PJmB2eJdDr653tBk1gQ1dbS9hgX",
  SWAP_TAX_VAULT: "4rPtUXXN7FUtmWeNUBqBU428Vs1ueZHRwdfeQaVqtQJd", // WALAWOW tax
  SWAP_USDC_VAULT: "9tiqFmNxGmtdWcwn4so6ChJKx6BBrWMVUBwUuk9Yu7Lw",

  // ==================== VRF / Keeper ====================
  VRF_COORDINATOR: "HifRke4NrpDcget6FRwW2aryZDWgdiURVh8ewduaoepx",

  // ==================== RPC ====================
  RPC_URL: "RL=https://api.devnet.solana.c",
} as const;

// 向后兼容
export const RPC_URL = WALAWOW_PROTOCOL_ADDRESSES.RPC_URL;
