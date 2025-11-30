// hooks/useDrawTrigger.ts
'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
import { Program, AnchorProvider, web3 } from '@coral-xyz/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses'
import jackpotPoolIdl from '../idl/jackpot_pool.json'

export function useDrawTrigger() {
  const { connection } = useConnection()
  const { publicKey, wallet, sendTransaction } = useWallet()
  const [triggering, setTriggering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const triggerDraw = async (poolType: 'weekly' | 'monthly') => {
    if (!publicKey || !wallet) {
      setError('Wallet not connected')
      return
    }

    setTriggering(true)
    setError(null)
    setSuccess(false)

    try {
      console.log(`🎯 Triggering ${poolType} draw...`)

      // 创建 Anchor provider
      const provider = new AnchorProvider(connection, wallet.adapter as any, {})
      
      // 创建程序实例
      const program = new Program(
        jackpotPoolIdl as any,
        new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_PROGRAM),
        provider
      )

      // 获取奖池地址
      const poolAddress = new PublicKey(
        poolType === 'weekly' 
          ? JACKPOT_PROTOCOL_ADDRESSES.POOL_WEEKLY
          : JACKPOT_PROTOCOL_ADDRESSES.POOL_MONTHLY
      )

      console.log('📝 Preparing draw transaction...')

      // 调用 draw_winner 指令
      const transaction = await program.methods
        .drawWinner()
        .accounts({
          pool: poolAddress,
          triggerer: publicKey,
        })
        .transaction()

      // 设置计算单位价格（优先费）
      transaction.feePayer = publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      console.log('🔄 Sending transaction...')

      // 发送交易
      const signature = await sendTransaction(transaction, connection)
      
      console.log('⏳ Confirming transaction...', signature)

      // 等待确认
      const confirmation = await connection.confirmTransaction(signature, 'confirmed')
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed')
      }

      console.log(`✅ ${poolType} draw triggered successfully!`, signature)
      setSuccess(true)

      // 5秒后重置成功状态
      setTimeout(() => setSuccess(false), 5000)

    } catch (err: any) {
      console.error(`❌ Error triggering ${poolType} draw:`, err)
      
      // 提供更友好的错误信息
      let errorMessage = err.message
      if (err.message.includes('TooEarlyToDraw')) {
        errorMessage = 'Too early to trigger draw. Please wait until the scheduled time.'
      } else if (err.message.includes('InvalidState')) {
        errorMessage = 'Pool is not in a state that allows drawing.'
      } else if (err.message.includes('Paused')) {
        errorMessage = 'Contract is currently paused.'
      } else if (err.message.includes('Unauthorized')) {
        errorMessage = 'Unauthorized to trigger draw.'
      }

      setError(errorMessage)
    } finally {
      setTriggering(false)
    }
  }

  return { 
    triggerDraw, 
    triggering, 
    error, 
    success,
    canTrigger: !!publicKey && !!wallet
  }
}
