// app/layout.tsx
import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import ClientWalletProvider from '../components/ClientWalletProvider'
import Navigation from '../components/Navigation'

// 配置正文字体：Inter
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// 配置标题字体：Space Grotesk，更具科技感
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

export const metadata = {
  // 更新为 Walawow 品牌名称和口号
  title: 'Walawow - The Surprise Protocol on Solana',
  description: 'Experience the thrill of decentralized surprises. Where every interaction could lead to a magical Walawow moment.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen antialiased">
        {/* 已删除原有的内联背景样式，由globals.css中的华丽星云背景统一接管 */}
        <ClientWalletProvider>
          {/* 应用新的全局字体变量 */}
          <div className="font-sans">
            <Navigation />
            {/* 主内容区域：移除了旧容器，为各页面提供更灵活的布局基础 */}
            <main>
              {children}
            </main>
          </div>
        </ClientWalletProvider>
      </body>
    </html>
  )
}
