'use client'

import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react'

const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { 
    ssr: false,
    loading: () => (
      <button 
        disabled
        className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold opacity-50"
      >
        Loading Wallet...
      </button>
    )
  }
)

export default function ReliableWalletConnect() {
  const { connected, publicKey } = useWallet()

  return (
    <div className="flex flex-col items-center space-y-2">
      {connected && publicKey && (
        <div className="text-sm text-green-300 bg-green-900 bg-opacity-50 px-3 py-1 rounded-lg">
          Connected: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      <WalletMultiButton 
        style={{
          // 修改为绿色渐变
          backgroundColor: '#10B981',
          backgroundImage: 'linear-gradient(to right, #10B981, #059669)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}
