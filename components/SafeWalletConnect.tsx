'use client'

import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react'

// 完全动态导入，避免任何服务端渲染
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { 
    ssr: false,
    loading: () => (
      <button 
        disabled
        className="bg-gray-600 text-white border-0 rounded-lg px-6 py-3 font-semibold opacity-50"
      >
        Loading Wallet...
      </button>
    )
  }
)

export default function SafeWalletConnect() {
  const { connected, publicKey } = useWallet()

  return (
    <div className="flex flex-col items-center space-y-2">
      {connected && publicKey && (
        <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      <WalletMultiButtonDynamic 
        className="!bg-gradient-to-r !from-yellow-500 !to-red-500 !text-white !border-0 !rounded-lg !px-6 !py-3 !font-semibold hover:!opacity-90 transition-opacity"
      />
    </div>
  )
}
