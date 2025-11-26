'use client'

import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react'

// 动态导入官方钱包按钮，确保只在客户端渲染
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { 
    ssr: false,
    loading: () => (
      <button 
        disabled
        className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium opacity-50"
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
        <div className="text-sm text-emerald-300 bg-emerald-800 px-3 py-1 rounded-lg">
          已连接: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      {/* 使用 className 而不是 style，避免 hydration 问题 */}
      <WalletMultiButton className="!bg-emerald-600 !text-white !border-0 !rounded-lg !px-6 !py-3 !font-medium hover:!bg-emerald-700 transition-colors" />
    </div>
  )
}
