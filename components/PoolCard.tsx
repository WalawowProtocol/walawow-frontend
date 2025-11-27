'use client'
import { useAnchorProgram } from '../hooks/useAnchorProgram';
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses';
import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

interface PoolCardProps {
  title: string
  poolType: 'weekly' | 'monthly'
  nextDraw: string // 占位，但我们会用链上数据覆盖
}

export default function PoolCard({ title, poolType, nextDraw }: PoolCardProps) {
  const program = useAnchorProgram('pool');
  const [poolBalance, setPoolBalance] = useState(0); // 链上vault余额
  const [totalWinners, setTotalWinners] = useState(0); // 暂模拟，后面可从事件算
  const [actualNextDraw, setActualNextDraw] = useState(nextDraw); // 链上next_draw_time
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoolData = async () => {
      if (!program) return;

      setLoading(true);
      setError(null);

      try {
        // 选地址
        const configAddress = new PublicKey(
          poolType === 'weekly' 
            ? JACKPOT_PROTOCOL_ADDRESSES.POOL_WEEKLY 
            : JACKPOT_PROTOCOL_ADDRESSES.POOL_MONTHLY
        );
        const vaultAddress = new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_VAULT); // 假设共享，或分weekly/monthly

        // 读PoolConfig
        const data = await program.account.poolConfig.fetch(configAddress);
        
        // 更新nextDraw
        const drawTime = new Date(data.nextDrawTime * 1000).toLocaleString();
        setActualNextDraw(drawTime);

        // 读vault余额 (USDC)
        const connection = new Connection(JACKPOT_PROTOCOL_ADDRESSES.RPC_URL, 'confirmed');
        const balanceInfo = await connection.getTokenAccountBalance(vaultAddress);
        const balance = parseInt(balanceInfo.value.amount) / 10**balanceInfo.value.decimals; // USDC decimals=6
        setPoolBalance(balance);

        // totalWinners暂模拟，后面可加事件查询
        setTotalWinners(8); // 或从data.lastWinner等算历史

      } catch (err: any) {
        console.error(err);
        setError('加载失败: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoolData();
  }, [program, poolType]);

  if (loading) return <div className="bg-gray-800 p-6 rounded-xl">加载中...</div>;
  if (error) return <div className="bg-red-500 p-6 rounded-xl">{error}</div>;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="text-sm bg-green-300 text-black px-2 py-1 rounded-full">
          {poolType === 'weekly' ? 'Weekly' : 'Monthly'}
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            ${poolBalance.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Current Prize Pool</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-white">{totalWinners}</div>
            <div className="text-gray-400 text-sm">Total Winners</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-white">---</div>
            <div className="text-gray-400 text-sm">Your Chance</div>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Next Draw:</span>
            <span className="text-white">{actualNextDraw}</span>
          </div>
        </div>
        <button
          className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          onClick={() => {
            alert('This feature will be implemented soon!')
          }}
        >
          Check Details
        </button>
      </div>
    </div>
  )
}
