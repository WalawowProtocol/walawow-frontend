'use client'

import dynamic from 'next/dynamic'

// 动态导入 WalletMultiButton 避免 SSR 问题
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

export default function WalletConnect() {
  return (
    <div className="flex items-center justify-center">
      <WalletMultiButtonDynamic 
        style={{
          backgroundColor: '#f59e0b',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      />
    </div>
  )
}
