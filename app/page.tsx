'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import ReliableWalletConnect from '../components/ReliableWalletConnect'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const { connected } = useWallet()

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* 只修改颜色相关的类名 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            {/* 修改文字渐变颜色 */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              💰 Jackpot Protocol
            </h1>
            {/* 修改副标题颜色 */}
            <p className="text-green-200 mt-2">
              The Perpetual Wealth Aggregator on Solana
            </p>
          </div>
          <ReliableWalletConnect />
        </div>

        {connected ? (
          <Dashboard />
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">💎</div>
              {/* 修改连接钱包页面的文字颜色 */}
              <h2 className="text-2xl font-bold mb-4 text-green-100">Connect Your Wallet</h2>
              <p className="text-green-300 mb-8">
                Connect your Solana wallet to start participating in the Jackpot Protocol
              </p>
              <div className="flex justify-center">
                <ReliableWalletConnect />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
