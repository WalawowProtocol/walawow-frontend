// hooks/useProtocolStats.ts
'use client'
import { useEffect, useState } from 'react'
import { fetchWalawowAPI, WALAWOW_API } from '../config/api'

interface ProtocolStats {
  totalDistributed: number
  totalWinners: number
  activeHolders: number
  transactionTax: number
}

export function useProtocolStats() {
  const [stats, setStats] = useState<ProtocolStats>({
    totalDistributed: 0,
    totalWinners: 0,
    activeHolders: 0,
    transactionTax: 10
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await fetchWalawowAPI(WALAWOW_API.ENDPOINTS.STATS)

        const realStats: ProtocolStats = {
          totalDistributed: Number(statsData.data?.total_distributed || 0),
          totalWinners: Number(statsData.data?.total_winners || 0),
          activeHolders: Number(statsData.data?.active_holders || 0),
          transactionTax: Number(statsData.data?.transaction_tax || 10)
        }
        setStats(realStats)
      } catch (err) {
        console.error('Error fetching protocol stats:', err)
        setStats({
          totalDistributed: 0,
          totalWinners: 0,
          activeHolders: 0,
          transactionTax: 10
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [])

  return { stats, loading }
}
