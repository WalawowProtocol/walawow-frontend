// utils/programs.ts
import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor'
import { Connection, PublicKey, Commitment } from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useMemo } from 'react'

// Buffer 在 Node.js 环境中可用，在浏览器中需要 polyfill
// 在 Next.js 中，Buffer 在服务端可用，客户端需要配置

// 导入 IDL
import poolIdl from '../idl/walawow_pool.json'
import distributorIdl from '../idl/walawow_distributor.json'
import harvestIdl from '../idl/walawow_harvest.json'
import swapIdl from '../idl/walawow_swap.json'

// 程序地址
export const PROGRAM_IDS = {
  POOL: new PublicKey(poolIdl.address),
  DISTRIBUTOR: new PublicKey(distributorIdl.address),
  HARVEST: new PublicKey(harvestIdl.address),
  SWAP: new PublicKey(swapIdl.address),
}

// 获取 Anchor Provider
export function getProvider(connection: Connection, wallet: any): AnchorProvider {
  // 创建一个只读的 wallet 对象用于读取数据
  const readOnlyWallet = {
    publicKey: wallet?.publicKey || null,
    signTransaction: wallet?.signTransaction || (async (tx: any) => { throw new Error('Read-only wallet') }),
    signAllTransactions: wallet?.signAllTransactions || (async (txs: any[]) => { throw new Error('Read-only wallet') }),
  }

  const provider = new AnchorProvider(
    connection,
    readOnlyWallet as any,
    {
      preflightCommitment: 'confirmed',
      commitment: 'confirmed',
    }
  )

  return provider
}

// 获取 Pool 程序实例
export function getPoolProgram(provider: AnchorProvider): Program {
  return new Program(poolIdl as Idl, provider)
}

// 获取 Distributor 程序实例
export function getDistributorProgram(provider: AnchorProvider): Program {
  return new Program(distributorIdl as Idl, provider)
}

// 获取 Harvest 程序实例
export function getHarvestProgram(provider: AnchorProvider): Program {
  return new Program(harvestIdl as Idl, provider)
}

// 获取 Swap 程序实例
export function getSwapProgram(provider: AnchorProvider): Program {
  return new Program(swapIdl as Idl, provider)
}

// React Hook: 获取 Pool 程序
export function usePoolProgram() {
  const { connection } = useConnection()
  const wallet = useWallet()

  return useMemo(() => {
    if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
      return null
    }

    try {
      const provider = getProvider(connection, wallet)
      return getPoolProgram(provider)
    } catch (error) {
      console.error('Error creating pool program:', error)
      return null
    }
  }, [connection, wallet])
}

// React Hook: 获取 Distributor 程序
export function useDistributorProgram() {
  const { connection } = useConnection()
  const wallet = useWallet()

  return useMemo(() => {
    if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
      return null
    }

    try {
      const provider = getProvider(connection, wallet)
      return getDistributorProgram(provider)
    } catch (error) {
      console.error('Error creating distributor program:', error)
      return null
    }
  }, [connection, wallet])
}

// PDA 计算工具
export function getPoolPDA(owner: PublicKey, poolType: { weekly?: {} } | { monthly?: {} }): [PublicKey, number] {
  const poolTypeIndex = 'weekly' in poolType ? 0 : 1
  // 使用 Uint8Array 而不是 Buffer 以确保浏览器兼容性
  const poolConfigSeed = new TextEncoder().encode('pool-config')
  return PublicKey.findProgramAddressSync(
    [
      poolConfigSeed,
      owner.toBuffer(),
      Uint8Array.from([poolTypeIndex]),
    ],
    PROGRAM_IDS.POOL
  )
}

export function getPoolAuthorityPDA(pool: PublicKey): [PublicKey, number] {
  const poolAuthoritySeed = new TextEncoder().encode('pool-authority')
  return PublicKey.findProgramAddressSync(
    [poolAuthoritySeed, pool.toBuffer()],
    PROGRAM_IDS.POOL
  )
}

export function getPoolVaultPDA(pool: PublicKey): [PublicKey, number] {
  const poolVaultSeed = new TextEncoder().encode('pool-vault')
  return PublicKey.findProgramAddressSync(
    [poolVaultSeed, pool.toBuffer()],
    PROGRAM_IDS.POOL
  )
}

export function getDistributorConfigPDA(): [PublicKey, number] {
  const distributorConfigSeed = new TextEncoder().encode('distributor-config')
  return PublicKey.findProgramAddressSync(
    [distributorConfigSeed],
    PROGRAM_IDS.DISTRIBUTOR
  )
}

export function getDistributorAuthorityPDA(config: PublicKey): [PublicKey, number] {
  const distributorAuthoritySeed = new TextEncoder().encode('distributor-authority')
  return PublicKey.findProgramAddressSync(
    [distributorAuthoritySeed, config.toBuffer()],
    PROGRAM_IDS.DISTRIBUTOR
  )
}

