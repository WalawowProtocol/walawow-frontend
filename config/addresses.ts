// 从 IDL 导入程序地址
import poolIdl from '../idl/walawow_pool.json'
import distributorIdl from '../idl/walawow_distributor.json'
import harvestIdl from '../idl/walawow_harvest.json'
import swapIdl from '../idl/walawow_swap.json'

/**
 * Walawow Protocol 地址配置
 * 根据 .env 文件配置更新
 */
export const WALAWOW_PROTOCOL_ADDRESSES = {
  // ==================== 程序ID (从 IDL 获取，与 .env 一致) ====================
  HARVEST_PROGRAM: harvestIdl.address,      // 2fHg3CJUs7Yky66YnQfC8geMY1NSkbZk8YTVs2Dpyjz7
  SWAP_PROGRAM: swapIdl.address,            // 477SV7DQCteAoZ9PAQLNs3d2HtVapP13ogojWVGUmkjk
  DISTRIBUTOR_PROGRAM: distributorIdl.address, // G5amgFciBWH5AMuc8af4prpZ11GWgscDPeuD4fBs9AcV
  POOL_PROGRAM: poolIdl.address,            // 9HbEMdbqqfGRuTWEhKzPSzoRsY55MuxkwmSKdHUZm2mh
 
  // ==================== 代币 Mint ====================
  WALAWOW_MINT: "8TGYurG76285iK1DxQg7GZScUtpeuSC4yaEogW6AiMJf",  // Token-2022, 带税
  USDC_MINT: "6YVAhYGragaj3oo87UM1MudRd9gEoEYLGtJCLD9SwHNc",     // Token-2022
 
  // ==================== Pool 合约 PDA ====================
  POOL_WEEKLY: "C2ZTwMNPb2MyGFie9nBNzsLNBDBS5hyHVdjGa5uGTNbj",   // Weekly Pool PDA
  POOL_MONTHLY: "8UC7vgndDd3cRXoPZMXxCB7MJthtnzyZnhT8P7SwvsKG",  // Monthly Pool PDA
 
  // ==================== Distributor 合约 PDA ====================
  DISTRIBUTOR_CONFIG: "4K9YGc3rnpVc9CcN2NZEPxCKTyosGDos5A5rDkDsBiz4",
  DISTRIBUTOR_AUTHORITY: "3fNDA3fGwyvVuQG2ktXptDDgVPVEG146qgX6P1daixf7",
  DISTRIBUTOR_VAULT: "BwCPCt4PCn3t9f6sT8Wo4VQBCPnrhsLAmAbjveefJMRD",
 
  // Distributor 分配的各个池的 Vault
  DISTRIBUTOR_POOL_WEEKLY_VAULT: "3tfQYJMCXRysM47STuk4QQqBsZJoTfyKHxDyteqNpdXT",
  DISTRIBUTOR_POOL_MONTHLY_VAULT: "HHdg7CtMJh6isDjCPQNZRner2tC6UE2msAsHKu41JxTK",
  DISTRIBUTOR_POOL_STAKING_VAULT: "BL8EGQnSGvPxz46rcE8UWRrqsxLqxL5WkZqTxPn6y4LZ",
  DISTRIBUTOR_POOL_LIQUIDITY_VAULT: "BtbkvU4SGf6YfbvFNg7g6iSqJNwWWKLSmyiS9DCAQVSv",
  DISTRIBUTOR_POOL_TEAM_VAULT: "Bk4tqUDX9x4QcjmjMZFxSxj4Nb57KXcD8JhbgCeLJQAP",
 
  // ==================== Harvest 合约 PDA ====================
  HARVEST_CONFIG: "3D4maWdU7aiE7nGQsfQQiwRTsJgRyvdnJS9KnA5EPNHP",
  HARVEST_AUTHORITY: "J5B9SR7xYtGkXZkqy7En1TADM6pnFDNcJwrSpdKDC6Db",
 
  // ==================== Swap 合约 PDA ====================
  SWAP_CONFIG: "J3GZES33SnsKGdcmBe5oxvCiYGjiaQ33g92ygBxsuTjc",
  SWAP_AUTHORITY: "33imqfTY9Hb38wTNPhxPCowcT4BFEcEtyb79qyT1CAbJ",
  SWAP_TAX_VAULT: "FNk6EX4BLakraRrusYXVAp783upMuSVM2SfhC4mUnU9v",  // WALAWOW tax vault
  SWAP_USDC_VAULT: "DmcvYibAkTBZtcJHcMijPhw2XBH2D7nCaxfnKxL6yk4F",   // USDC vault
 
  // ==================== VRF / Keeper 配置 ====================
  VRF_COORDINATOR: "HifRke4NrpDcget6FRwW2aryZDWgdiURVh8ewduaoepx",
 
  // ==================== RPC 配置 ====================
  RPC_URL: "https://api.devnet.solana.com",
} as const;

// 导出 RPC URL（向后兼容）
export const RPC_URL = WALAWOW_PROTOCOL_ADDRESSES.RPC_URL;
