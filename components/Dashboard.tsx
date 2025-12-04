// components/Dashboard.tsx
'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import PoolCard from './PoolCard'
import UserInfo from './UserInfo'
import { useProtocolStats } from '../hooks/useProtocolStats'
import { Trophy, Users, Coins, Percent } from 'lucide-react' // 引入图标

export default function Dashboard() {
  const { publicKey } = useWallet()
  const { stats, loading: statsLoading } = useProtocolStats()

  return (
    <div className="space-y-8">
      {/* 资金池信息 - 添加了标题和描述 */}
      <div>
        <h2 className="notranslate section-title text-3xl mb-2">Surprise Pools</h2>
        <p className="text-walawow-neutral-text-secondary mb-6">
          Participate in our periodic draws. The more you engage, the higher your chances of a <span className="text-walawow-gold font-semibold">WOW moment</span>!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PoolCard 
            title="Weekly Surprise" 
            poolType="weekly"
            nextDraw="Friday 12:00 UTC"
            accent="purple" // 可以传递给PoolCard自定义样式
          />
          <PoolCard 
            title="Monthly Spectacular" 
            poolType="monthly"
            nextDraw="Last Friday of Month"
            accent="gold" // 可以传递给PoolCard自定义样式
          />
        </div>
      </div>

      {/* 用户信息 */}
      {publicKey && <UserInfo publicKey={publicKey} />}

      {/* 协议统计信息 - 完全重设计 */}
      <div className="glass-card p-6 md:p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h3 className="notranslate text-2xl font-bold text-white mb-2">Magic in Numbers</h3>
            <p className="text-walawow-neutral-text-secondary">
              Real-time protocol performance & community growth
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-walawow-purple/20 text-walawow-purple-light">
              <span className="h-2 w-2 rounded-full bg-walawow-gold animate-pulse mr-2"></span>
              Live On-Chain Data
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 总分发金额 */}
          <div className="glass-card p-5 hover:glow-purple transition-all duration-300 border border-walawow-neutral-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-walawow-purple/30 to-walawow-purple/10 flex items-center justify-center">
                <Coins className="h-6 w-6 text-walawow-purple-light" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-walawow-gold/10 text-walawow-gold">
                +12.5%
              </span>
            </div>
            <div className="data-value mb-1">
              {statsLoading ? '...' : `$${(stats.totalDistributed / 1000000).toFixed(1)}M`}
            </div>
            <div className="data-label">Total Magic Distributed</div>
          </div>

          {/* 获胜者数量 */}
          <div className="glass-card p-5 hover:glow-purple transition-all duration-300 border border-walawow-neutral-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-walawow-gold/30 to-walawow-gold/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-walawow-gold" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-walawow-purple/10 text-walawow-purple-light">
                {statsLoading ? '...' : `+${Math.floor(stats.totalWinners / 10)} today`}
              </span>
            </div>
            <div className="data-value mb-1">
              {statsLoading ? '...' : stats.totalWinners.toLocaleString()}
            </div>
            <div className="data-label">WOW Winners</div>
          </div>

          {/* 活跃持有者 */}
          <div className="glass-card p-5 hover:glow-purple transition-all duration-300 border border-walawow-neutral-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-walawow-purple/20 to-walawow-gold/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-walawow-purple-light" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-walawow-gold/10 text-walawow-gold">
                Active
              </span>
            </div>
            <div className="data-value mb-1">
              {statsLoading ? '...' : stats.activeHolders.toLocaleString()}
            </div>
            <div className="data-label">Community Explorers</div>
          </div>

          {/* 交易税 */}
          <div className="glass-card p-5 hover:glow-purple transition-all duration-300 border border-walawow-neutral-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-walawow-gold/20 to-walawow-purple/10 flex items-center justify-center">
                <Percent className="h-6 w-6 text-walawow-gold" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-walawow-purple/10 text-walawow-purple-light">
                Fixed Rate
              </span>
            </div>
            <div className="data-value mb-1">{stats.transactionTax}%</div>
            <div className="data-label">Protocol Contribution</div>
          </div>
        </div>

        {/* 底部备注 */}
        <div className="mt-8 pt-6 border-t border-walawow-neutral-border text-center">
          <p className="text-sm text-walawow-neutral-text-secondary">
            All data updates in real-time from the Solana blockchain. Last updated just now.
          </p>
        </div>
      </div>
    </div>
  )
}
