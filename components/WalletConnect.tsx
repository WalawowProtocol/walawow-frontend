'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function WalletConnect() {
  const { connected, publicKey } = useWallet()

  return (
    <div className="flex items-center space-x-4">
      {connected && publicKey && (
        <div className="text-sm text-gray-400">
          Connected: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      <WalletMultiButton className="!bg-gradient-to-r !from-yellow-500 !to-red-500 !text-white !border-0 !rounded-lg !px-4 !py-2" />
    </div>
  )
}
