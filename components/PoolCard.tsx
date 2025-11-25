'use client'

interface PoolCardProps {
  title: string
  poolType: 'weekly' | 'monthly'
  nextDraw: string
}

export default function PoolCard({ title, poolType, nextDraw }: PoolCardProps) {
  const poolBalance = 12500
  const totalWinners = 8

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-6 border border-emerald-800 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <div className="text-xs text-emerald-400 bg-emerald-900 bg-opacity-30 px-3 py-1 rounded-full border border-emerald-700">
          {poolType === 'weekly' ? 'WEEKLY' : 'MONTHLY'}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-3xl font-bold text-emerald-400 mb-1">
            ${poolBalance.toLocaleString()}
          </div>
          <div className="text-emerald-300 text-sm">Prize Pool</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-medium text-white">{totalWinners}</div>
            <div className="text-emerald-300 text-sm">Winners</div>
          </div>
          <div>
            <div className="text-lg font-medium text-white">---</div>
            <div className="text-emerald-300 text-sm">Your Chance</div>
          </div>
        </div>

        <div className="pt-4 border-t border-emerald-800">
          <div className="flex justify-between text-sm">
            <span className="text-emerald-400">Next Draw:</span>
            <span className="text-white">{nextDraw}</span>
          </div>
        </div>

        <button 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium transition-colors"
          onClick={() => alert('Feature coming soon')}
        >
          View Details
        </button>
      </div>
    </div>
  )
}
