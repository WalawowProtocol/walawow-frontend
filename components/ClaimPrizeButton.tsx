// components/ClaimPrizeButton.tsx
'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useState } from 'react'
import { useClaimPrize } from '../hooks/useClaimPrize'

interface ClaimPrizeButtonProps {
  poolPda: PublicKey
  snapshot: any | null   // 你后端生成的快照
}

export default function ClaimPrizeButton({ poolPda, snapshot }: ClaimPrizeButtonProps) {
  const { publicKey } = useWallet()
  const { claimPrize, loading, tx } = useClaimPrize()
  const [error, setError] = useState<string | null>(null)

  const onClick = async () => {
    try {
      setError(null)
      if (!snapshot) {
        throw new Error('Snapshot not ready')
      }
      await claimPrize(poolPda, snapshot)
    } catch (e: any) {
      setError(e.message || 'Claim failed')
    }
  }

  // ✅ 没钱包 or 没快照 -> 直接隐藏
  if (!publicKey || !snapshot) return null

  return (
    <div className="mt-4">
      <button
        onClick={onClick}
        disabled={loading}
        className="w-full py-3 rounded-xl font-bold text-white 
                   bg-gradient-to-r from-green-500 to-emerald-600
                   hover:shadow-lg hover:scale-[1.02] active:scale-95
                   disabled:opacity-50"
      >
        {loading ? 'Claiming...' : '🎉 Claim Prize'}
      </button>

      {tx && (
        <div className="mt-2 text-xs text-green-400 break-all text-center">
          Tx: {tx}
        </div>
      )}

      {error && (
        <div className="mt-2 text-xs text-red-400 text-center">
          {error}
        </div>
      )}
    </div>
  )
}
