// app/winners/page.tsx
'use client'
import { useState } from 'react'

// Mock data - in real implementation, this would come from on-chain events
const mockWinners = [
  {
    id: 1,
    pool: 'weekly',
    winner: '9xN1DcpQeA3HzShZiiGq7kafuQPzU88gV86bsMo77iwp',
    amount: 125000,
    date: '2024-01-12',
    triggerer: '7s4aBc8dE9fG2hJ3kL5mN6pQ8rS9tU2vW4xY6zA',
    triggerReward: 6250
  },
  {
    id: 2,
    pool: 'weekly',
    winner: '5yM2nB4vC6x8zA1bD3eF5gH7jK9lM2oP4qR6sT8u',
    amount: 98000,
    date: '2024-01-05',
    triggerer: '3wE5rT7yU9iO1pA3sD5fG7hJ9kL2mN4qP6rS8tU',
    triggerReward: 4900
  },
  {
    id: 3,
    pool: 'monthly',
    winner: '2aB4cD6eF8gH0jK2lM4nO6pQ8rS0tU2wX4yZ6aB',
    amount: 450000,
    date: '2023-12-29',
    triggerer: '8dF3gH5jK7lM9oP1qR3sT5uV7wX9yZ1bC3dE5f',
    triggerReward: 22500
  }
]

export default function Winners() {
  const [filter, setFilter] = useState<'all' | 'weekly' | 'monthly'>('all')

  const filteredWinners = mockWinners.filter(winner => 
    filter === 'all' || winner.pool === filter
  )

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          🏆 Past Winners
        </h1>
        <p className="text-xl text-gray-300">
          Celebrating the lucky winners who changed their lives with Jackpot Protocol
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            {mockWinners.length}
          </div>
          <div className="text-gray-400">Total Winners</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            ${mockWinners.reduce((sum, w) => sum + w.amount, 0).toLocaleString()}
          </div>
          <div className="text-gray-400">Total Distributed</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            ${mockWinners.reduce((sum, w) => sum + w.triggerReward, 0).toLocaleString()}
          </div>
          <div className="text-gray-400">Trigger Rewards</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {mockWinners.filter(w => w.pool === 'monthly').length}
          </div>
          <div className="text-gray-400">Mega Winners</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'all' 
              ? 'bg-yellow-500 text-black' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All Winners
        </button>
        <button
          onClick={() => setFilter('weekly')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'weekly' 
              ? 'bg-yellow-500 text-black' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setFilter('monthly')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'monthly' 
              ? 'bg-yellow-500 text-black' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Winners List */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Winners</h2>
        
        {filteredWinners.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No winners found for the selected filter
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWinners.map((winner) => (
              <div key={winner.id} className="bg-gray-700 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      winner.pool === 'weekly' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}>
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          winner.pool === 'weekly' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-purple-500 text-white'
                        }`}>
                          {winner.pool === 'weekly' ? 'Weekly' : 'Monthly'}
                        </span>
                        <span className="text-sm text-gray-400">{winner.date}</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {winner.winner.slice(0, 8)}...{winner.winner.slice(-8)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-center md:text-right">
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">
                        ${winner.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">Prize</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">
                        ${winner.triggerReward.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">Trigger Reward</div>
                    </div>
                  </div>
                </div>
                
                {/* Triggerer Info */}
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="text-sm text-gray-400">
                    Triggered by: {winner.triggerer.slice(0, 8)}...{winner.triggerer.slice(-8)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          You Could Be Next!
        </h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Hold $JACKPOT tokens to automatically enter every draw. The more you hold, 
          the higher your chances of winning life-changing prizes.
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Buy $JACKPOT Now
        </button>
      </div>
    </div>
  )
}
