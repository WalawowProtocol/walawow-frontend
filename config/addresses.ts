// 从 IDL 导入程序地址
import poolIdl from '../idl/walawow_pool.json'
import distributorIdl from '../idl/walawow_distributor.json'
import harvestIdl from '../idl/walawow_harvest.json'
import swapIdl from '../idl/walawow_swap.json'
import presaleIdl from '../idl/walawow_presale.json'
/**
 * Walawow Protocol 地址配置
 * ✅ 与当前 devnet 实际部署状态完全一致
 */
function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`${name} is required`)
  }
  return value
}

const DEFAULT_RPC_URL = requireEnv(
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
  'NEXT_PUBLIC_SOLANA_RPC_URL'
)

export const WALAWOW_PROTOCOL_ADDRESSES = {
  // ==================== 程序 ID ====================
  HARVEST_PROGRAM: harvestIdl.address,
  SWAP_PROGRAM: swapIdl.address,
  DISTRIBUTOR_PROGRAM: distributorIdl.address,
  POOL_PROGRAM: poolIdl.address,
  PRESALE_PROGRAM: presaleIdl.address,

  // ==================== Token Mint ====================
  WALAWOW_MINT: requireEnv(process.env.NEXT_PUBLIC_WALAWOW_MINT, 'NEXT_PUBLIC_WALAWOW_MINT'), // Token-2022 (taxed)
  USDC_MINT: requireEnv(process.env.NEXT_PUBLIC_USDC_MINT, 'NEXT_PUBLIC_USDC_MINT'),       // Devnet USDC (Tokenkeg)

  // ==================== Pool PDA ====================
  POOL_WEEKLY: requireEnv(process.env.NEXT_PUBLIC_POOL_WEEKLY, 'NEXT_PUBLIC_POOL_WEEKLY'),
  POOL_MONTHLY: requireEnv(process.env.NEXT_PUBLIC_POOL_MONTHLY, 'NEXT_PUBLIC_POOL_MONTHLY'),
  POOL_WEEKLY_AUTHORITY: requireEnv(process.env.NEXT_PUBLIC_POOL_WEEKLY_AUTHORITY, 'NEXT_PUBLIC_POOL_WEEKLY_AUTHORITY'),
  POOL_MONTHLY_AUTHORITY: requireEnv(process.env.NEXT_PUBLIC_POOL_MONTHLY_AUTHORITY, 'NEXT_PUBLIC_POOL_MONTHLY_AUTHORITY'),

  // ==================== Distributor PDA ====================
  DISTRIBUTOR_CONFIG: requireEnv(process.env.NEXT_PUBLIC_DISTRIBUTOR_CONFIG, 'NEXT_PUBLIC_DISTRIBUTOR_CONFIG'),
  DISTRIBUTOR_AUTHORITY: requireEnv(process.env.NEXT_PUBLIC_DISTRIBUTOR_AUTHORITY, 'NEXT_PUBLIC_DISTRIBUTOR_AUTHORITY'),
  DISTRIBUTOR_VAULT: requireEnv(process.env.NEXT_PUBLIC_DISTRIBUTOR_VAULT, 'NEXT_PUBLIC_DISTRIBUTOR_VAULT'),

  // Distributor 分配池（USDC vaults）
  DISTRIBUTOR_POOL_WEEKLY_VAULT: requireEnv(process.env.NEXT_PUBLIC_DISTRIBUTOR_POOL_WEEKLY_VAULT, 'NEXT_PUBLIC_DISTRIBUTOR_POOL_WEEKLY_VAULT'),
  DISTRIBUTOR_POOL_MONTHLY_VAULT: requireEnv(process.env.NEXT_PUBLIC_DISTRIBUTOR_POOL_MONTHLY_VAULT, 'NEXT_PUBLIC_DISTRIBUTOR_POOL_MONTHLY_VAULT'),
  DISTRIBUTOR_POOL_STAKING_VAULT: requireEnv(process.env.NEXT_PUBLIC_DISTRIBUTOR_POOL_STAKING_VAULT, 'NEXT_PUBLIC_DISTRIBUTOR_POOL_STAKING_VAULT'),
  DISTRIBUTOR_POOL_LIQUIDITY_VAULT: requireEnv(process.env.NEXT_PUBLIC_DISTRIBUTOR_POOL_LIQUIDITY_VAULT, 'NEXT_PUBLIC_DISTRIBUTOR_POOL_LIQUIDITY_VAULT'),
  DISTRIBUTOR_POOL_TEAM_VAULT: requireEnv(process.env.NEXT_PUBLIC_DISTRIBUTOR_POOL_TEAM_VAULT, 'NEXT_PUBLIC_DISTRIBUTOR_POOL_TEAM_VAULT'),
  WEEKLY_STAGING_VAULT: requireEnv(process.env.NEXT_PUBLIC_WEEKLY_STAGING_VAULT, 'NEXT_PUBLIC_WEEKLY_STAGING_VAULT'),
  MONTHLY_STAGING_VAULT: requireEnv(process.env.NEXT_PUBLIC_MONTHLY_STAGING_VAULT, 'NEXT_PUBLIC_MONTHLY_STAGING_VAULT'),

  // ==================== Harvest PDA ====================
  HARVEST_CONFIG: requireEnv(process.env.NEXT_PUBLIC_HARVEST_CONFIG, 'NEXT_PUBLIC_HARVEST_CONFIG'),
  HARVEST_AUTHORITY: requireEnv(process.env.NEXT_PUBLIC_HARVEST_AUTHORITY, 'NEXT_PUBLIC_HARVEST_AUTHORITY'),

  // ==================== Swap PDA ====================
  SWAP_CONFIG: requireEnv(process.env.NEXT_PUBLIC_SWAP_CONFIG, 'NEXT_PUBLIC_SWAP_CONFIG'),
  SWAP_AUTHORITY: requireEnv(process.env.NEXT_PUBLIC_SWAP_AUTHORITY, 'NEXT_PUBLIC_SWAP_AUTHORITY'),
  SWAP_TAX_VAULT: requireEnv(process.env.NEXT_PUBLIC_SWAP_TAX_VAULT, 'NEXT_PUBLIC_SWAP_TAX_VAULT'), // WALAWOW tax
  SWAP_USDC_VAULT: requireEnv(process.env.NEXT_PUBLIC_SWAP_USDC_VAULT, 'NEXT_PUBLIC_SWAP_USDC_VAULT'),

  // ==================== VRF / Keeper ====================
  VRF_COORDINATOR: requireEnv(process.env.NEXT_PUBLIC_VRF_COORDINATOR, 'NEXT_PUBLIC_VRF_COORDINATOR'),
  
  // ==================== Presale ====================
  PRESALE_TREASURY_USDC: requireEnv(process.env.NEXT_PUBLIC_PRESALE_TREASURY_USDC, 'NEXT_PUBLIC_PRESALE_TREASURY_USDC'),
  PRESALE_PRICE_NUMERATOR: requireEnv(process.env.NEXT_PUBLIC_PRESALE_PRICE_NUMERATOR, 'NEXT_PUBLIC_PRESALE_PRICE_NUMERATOR'),
  PRESALE_PRICE_DENOMINATOR: requireEnv(process.env.NEXT_PUBLIC_PRESALE_PRICE_DENOMINATOR, 'NEXT_PUBLIC_PRESALE_PRICE_DENOMINATOR'),
  PRESALE_ADDRESS_CAP_USDC: requireEnv(process.env.NEXT_PUBLIC_PRESALE_ADDRESS_CAP_USDC, 'NEXT_PUBLIC_PRESALE_ADDRESS_CAP_USDC'),

  // ==================== RPC ====================
  RPC_URL: DEFAULT_RPC_URL,
} as const;

// 向后兼容
export const RPC_URL = WALAWOW_PROTOCOL_ADDRESSES.RPC_URL;
