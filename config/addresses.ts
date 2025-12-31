// 从 IDL 导入程序地址
import poolIdl from '../idl/walawow_pool.json'
import distributorIdl from '../idl/walawow_distributor.json'
import harvestIdl from '../idl/walawow_harvest.json'
import swapIdl from '../idl/walawow_swap.json'

/**
 * Walawow Protocol 地址配置
 * ✅ 与当前 devnet 实际部署状态完全一致
 */
function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is required`)
  }
  return value
}

const DEFAULT_RPC_URL = requireEnv('NEXT_PUBLIC_SOLANA_RPC_URL')

export const WALAWOW_PROTOCOL_ADDRESSES = {
  // ==================== 程序 ID ====================
  HARVEST_PROGRAM: harvestIdl.address,
  SWAP_PROGRAM: swapIdl.address,
  DISTRIBUTOR_PROGRAM: distributorIdl.address,
  POOL_PROGRAM: poolIdl.address,

  // ==================== Token Mint ====================
  WALAWOW_MINT: requireEnv('NEXT_PUBLIC_WALAWOW_MINT'), // Token-2022 (taxed)
  USDC_MINT: requireEnv('NEXT_PUBLIC_USDC_MINT'),       // Devnet USDC (Tokenkeg)

  // ==================== Pool PDA ====================
  POOL_WEEKLY: requireEnv('NEXT_PUBLIC_POOL_WEEKLY'),
  POOL_MONTHLY: requireEnv('NEXT_PUBLIC_POOL_MONTHLY'),
  POOL_WEEKLY_AUTHORITY: requireEnv('NEXT_PUBLIC_POOL_WEEKLY_AUTHORITY'),
  POOL_MONTHLY_AUTHORITY: requireEnv('NEXT_PUBLIC_POOL_MONTHLY_AUTHORITY'),

  // ==================== Distributor PDA ====================
  DISTRIBUTOR_CONFIG: requireEnv('NEXT_PUBLIC_DISTRIBUTOR_CONFIG'),
  DISTRIBUTOR_AUTHORITY: requireEnv('NEXT_PUBLIC_DISTRIBUTOR_AUTHORITY'),
  DISTRIBUTOR_VAULT: requireEnv('NEXT_PUBLIC_DISTRIBUTOR_VAULT'),

  // Distributor 分配池（USDC vaults）
  DISTRIBUTOR_POOL_WEEKLY_VAULT: requireEnv('NEXT_PUBLIC_DISTRIBUTOR_POOL_WEEKLY_VAULT'),
  DISTRIBUTOR_POOL_MONTHLY_VAULT: requireEnv('NEXT_PUBLIC_DISTRIBUTOR_POOL_MONTHLY_VAULT'),
  DISTRIBUTOR_POOL_STAKING_VAULT: requireEnv('NEXT_PUBLIC_DISTRIBUTOR_POOL_STAKING_VAULT'),
  DISTRIBUTOR_POOL_LIQUIDITY_VAULT: requireEnv('NEXT_PUBLIC_DISTRIBUTOR_POOL_LIQUIDITY_VAULT'),
  DISTRIBUTOR_POOL_TEAM_VAULT: requireEnv('NEXT_PUBLIC_DISTRIBUTOR_POOL_TEAM_VAULT'),
  WEEKLY_STAGING_VAULT: requireEnv('NEXT_PUBLIC_WEEKLY_STAGING_VAULT'),
  MONTHLY_STAGING_VAULT: requireEnv('NEXT_PUBLIC_MONTHLY_STAGING_VAULT'),

  // ==================== Harvest PDA ====================
  HARVEST_CONFIG: requireEnv('NEXT_PUBLIC_HARVEST_CONFIG'),
  HARVEST_AUTHORITY: requireEnv('NEXT_PUBLIC_HARVEST_AUTHORITY'),

  // ==================== Swap PDA ====================
  SWAP_CONFIG: requireEnv('NEXT_PUBLIC_SWAP_CONFIG'),
  SWAP_AUTHORITY: requireEnv('NEXT_PUBLIC_SWAP_AUTHORITY'),
  SWAP_TAX_VAULT: requireEnv('NEXT_PUBLIC_SWAP_TAX_VAULT'), // WALAWOW tax
  SWAP_USDC_VAULT: requireEnv('NEXT_PUBLIC_SWAP_USDC_VAULT'),

  // ==================== VRF / Keeper ====================
  VRF_COORDINATOR: requireEnv('NEXT_PUBLIC_VRF_COORDINATOR'),

  // ==================== RPC ====================
  RPC_URL: DEFAULT_RPC_URL,
} as const;

// 向后兼容
export const RPC_URL = WALAWOW_PROTOCOL_ADDRESSES.RPC_URL;
