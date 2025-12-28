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
  HARVEST_PROGRAM: harvestIdl.address,        // J8eLvawkkDtSsaLBz5A1SboQotYaeLBrJY8ZkrnHh82q
  SWAP_PROGRAM: swapIdl.address,              // EPfjEbGLq5d6PTfUL7uM6aqLfHggudUSfDYyBKr7Xw61
  DISTRIBUTOR_PROGRAM: "HSZfznuyUAZYXdNxmhsZRmT4xwpuUpkJq9XwdNkQJR3e",
  POOL_PROGRAM: "DBEDzWftZsCRFFuTywbd16YAMsbSKvrUUeQWn6FFTKxc",

  // ==================== Token Mint ====================
  WALAWOW_MINT: "DAWDZfiYQAEoJMtQGaHw4NLXZypL7gCpe2ehqpLLLRzm", // Token-2022 (taxed)
  USDC_MINT: "CBXMnFSp5Uxyybqv4vRik1NyhkixDAt4SYcU1sTZbKRL",    // Token-2022 USDC

  // ==================== Pool PDA ====================
  POOL_WEEKLY: "DmgcHCeHL1rd3JsdeDU2e24P4Pq6g4Dw4fpDG5k5Vunf",
  POOL_MONTHLY: "6oPC8nYGoSmReDwesB9if7Sohd7yyUowTkwiQEaGGDLo",
  POOL_WEEKLY_AUTHORITY: "Afh46W4usnW2VwLnjFE9mkEUE7VknpF7M6LHhDkq8MgB",
  POOL_MONTHLY_AUTHORITY: "4MkHYNLFtAnAc3oTQTqUsPLLPEjkf48W7q6XB68ACU9Y",

  // ==================== Distributor PDA ====================
  DISTRIBUTOR_CONFIG: "9Qv4q8ZjqRDndxgH5DE86ou5HAfXbN9zvfg4iRBpQ94Y",
  DISTRIBUTOR_AUTHORITY: "BGfYALHb9C8WXdzqDVMeaWwPCamBwVz44JZeTh5am1mN",
  DISTRIBUTOR_VAULT: "5gzdQ7bedWLtvuSQvGWdZ7ps1gvHVXRHuA18BgbZ2AuR",

  // Distributor 分配池（USDC vaults）
  DISTRIBUTOR_POOL_WEEKLY_VAULT: "2re9cVKVMFKMV6w6wWETVLXMAw2ik8WmVCJio4usygFf",
  DISTRIBUTOR_POOL_MONTHLY_VAULT: "CTJVuPxLf6YCzATwYDYCHZ44dt5aYmv229vRzxGRS6k9",
  DISTRIBUTOR_POOL_STAKING_VAULT: "DRvQ3x2xUT4BZ4AxBFMR5gHGQ57xYsF2WmeEipxCi4rm",
  DISTRIBUTOR_POOL_LIQUIDITY_VAULT: "NBQidkTLpGkGZKWgQN55Uqe4QqGE49fY3HEUS5bbPH6",
  DISTRIBUTOR_POOL_TEAM_VAULT: "2Xw7NjVgCUKmDEmm16Pc1jD68tjbpuv8NsTSZxafHU3n",
  WEEKLY_STAGING_VAULT: "4R1U8p1Gxmt3qbD5ntcSrDHSgXVQ8GbLfaoGevUDcM1d",
  MONTHLY_STAGING_VAULT: "3nSxsJLotax6DrN57D9pLHJ21eKPPQPv1GBd8BGxLFfe",

  // ==================== Harvest PDA ====================
  HARVEST_CONFIG: "FHmDbKiGY42YxP6SmiERqrZCM7NZ5nbSmKfGNjkxD68x",
  HARVEST_AUTHORITY: "A28MvUrobntFMaKAhLgd6u1ayjcsGUAqdkFE4iSnwZiG",

  // ==================== Swap PDA ====================
  SWAP_CONFIG: "4u4iY4HgdxspnokAyJZify8qn6fjL3Kc4RK32KTKCdJe",
  SWAP_AUTHORITY: "GwodGyKw6cbaVY2TTPzGeDYoGjSRdq67Ar3XkyXJBwfA",
  SWAP_TAX_VAULT: "GpUEw9WLN41516FQ2JaSCjEMmh2DBwfK5cjhKNRgXk96", // WALAWOW tax
  SWAP_USDC_VAULT: "FztWoe36fdN32TzJBNy1Ee4XEmYmeqoPDrwZtDBSKX7h",

  // ==================== VRF / Keeper ====================
  VRF_COORDINATOR: "HifRke4NrpDcget6FRwW2aryZDWgdiURVh8ewduaoepx",

  // ==================== RPC ====================
  RPC_URL: "RL=https://api.devnet.solana.c",
} as const;

// 向后兼容
export const RPC_URL = WALAWOW_PROTOCOL_ADDRESSES.RPC_URL;
