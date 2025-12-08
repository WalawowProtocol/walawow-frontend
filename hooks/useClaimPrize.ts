'use client'

import { useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import * as anchor from '@coral-xyz/anchor'

import idl from '@/idl/jackpot_pool.json'
import { JACKPOT_PROTOCOL_ADDRESSES } from '@/config/addresses'

/** ✅ 这里是唯一权威参数定义 */
export interface ClaimPrizeParams {
  poolPda: string                  // ✅ 你刚刚传入的
  winner: string
  winnerAmount: bigint
  cumulativeWeight: bigint
  proof: number[][]
  winnerTokenAccount: string
  triggererTokenAccount: string
}

export function useClaimPrize() {
  const { publicKey, signTransaction } = useWallet()
  const { connection } = useConnection()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const claimPrize = async (params: ClaimPrizeParams) => {
    try {
      if (!publicKey) throw new Error('Wallet not connected')

      setLoading(true)
      setError(null)
      setSuccess(false)

      const provider = new anchor.AnchorProvider(
        connection,
        {
          publicKey,
          signTransaction,
          signAllTransactions: async txs => txs,
        } as any,
        { commitment: 'confirmed' }
      )

      const program = new anchor.Program(
        idl as anchor.Idl,
        new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_PROGRAM),
        provider
      )

      const tx = await program.methods
        .claimPrize(
          new PublicKey(params.winner),
          new anchor.BN(params.winnerAmount.toString()),
          new anchor.BN(params.cumulativeWeight.toString()),
          params.proof.map(p => Uint8Array.from(p))
        )
        .accounts({
          pool: new PublicKey(params.poolPda),
          poolAuthority: new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_AUTHORITY),
          vault: new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_VAULT),
          usdcMintAccount: new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.USDC_MINT),
          winnerTokenAccount: new PublicKey(params.winnerTokenAccount),
          triggererTokenAccount: new PublicKey(params.triggererTokenAccount),
          tokenProgram: new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'),
        })
        .rpc()

      console.log('✅ Claim success:', tx)
      setSuccess(true)
      return tx
    } catch (e: any) {
      console.error(e)
      setError(e.message || 'Claim failed')
      throw e
    } finally {
      setLoading(false)
    }
  }

  return {
    claimPrize,
    loading,
    error,
    success,
  }
}
