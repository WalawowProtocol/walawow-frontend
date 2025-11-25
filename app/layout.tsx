import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientWalletProvider from '../components/ClientWalletProvider'
import StrictHydrationFix from '../components/StrictHydrationFix'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // 优化字体加载
})

export const metadata: Metadata = {
  title: 'Jackpot Protocol - The Perpetual Wealth Aggregator on Solana',
  description: 'A smart contract-driven on-chain wealth aggregation protocol on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 添加一些性能优化的meta标签 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <StrictHydrationFix>
          <ClientWalletProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
              {children}
            </div>
          </ClientWalletProvider>
        </StrictHydrationFix>
      </body>
    </html>
  )
}
