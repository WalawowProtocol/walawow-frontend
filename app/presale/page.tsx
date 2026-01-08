'use client'
import { useEffect, useMemo, useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { BN } from '@coral-xyz/anchor'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token'
import ReliableWalletConnect from '../../components/ReliableWalletConnect'
import {
  getPresaleBuyerRecordPDA,
  getPresaleConfigPDA,
  getPresaleMintAuthorityPDA,
  usePresaleProgram,
  usePresaleReadOnlyProgram,
} from '../../utils/programs'
import { WALAWOW_PROTOCOL_ADDRESSES } from '../../config/addresses'

const USDC_DECIMALS = 6
const TOKEN_DECIMALS = 9

const PRICE_NUMERATOR = Number(WALAWOW_PROTOCOL_ADDRESSES.PRESALE_PRICE_NUMERATOR)
const PRICE_DENOMINATOR = Number(WALAWOW_PROTOCOL_ADDRESSES.PRESALE_PRICE_DENOMINATOR)
const MAX_USDC_BASE = Number(WALAWOW_PROTOCOL_ADDRESSES.PRESALE_ADDRESS_CAP_USDC)

const PRICE_USDC = PRICE_NUMERATOR / PRICE_DENOMINATOR
const MAX_USDC = MAX_USDC_BASE / 10 ** USDC_DECIMALS

function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return '0'
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })
}

function formatUnits(value: bigint, decimals: number, digits = 2) {
  const base = BigInt(10) ** BigInt(decimals)
  const whole = value / base
  const fraction = value % base
  if (digits <= 0) return whole.toString()
  const fracStr = fraction.toString().padStart(decimals, '0').slice(0, digits)
  return `${whole.toString()}.${fracStr}`.replace(/\.?0+$/, '')
}

function formatCountdown(endTs: number, now: number) {
  const diff = Math.max(endTs - now, 0)
  const days = Math.floor(diff / 86400)
  const hours = Math.floor((diff % 86400) / 3600)
  const mins = Math.floor((diff % 3600) / 60)
  const secs = diff % 60
  if (diff === 0) return 'Ended'
  return `${days}d ${hours}h ${mins}m ${secs}s`
}

export default function PresalePage() {
  const { connected, publicKey } = useWallet()
  const { connection } = useConnection()
  const program = usePresaleProgram()
  const readOnlyProgram = usePresaleReadOnlyProgram()
  const [usdcAmount, setUsdcAmount] = useState('100')
  const [status, setStatus] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [config, setConfig] = useState<any>(null)
  const [buyerRecord, setBuyerRecord] = useState<any>(null)
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000))

  const parsedUsdc = useMemo(() => {
    const value = Number(usdcAmount)
    return Number.isFinite(value) && value > 0 ? value : 0
  }, [usdcAmount])

  const tokenAmount = useMemo(() => {
    if (!parsedUsdc) return 0
    return parsedUsdc / PRICE_USDC
  }, [parsedUsdc])

  const capProgress = Math.min(parsedUsdc / MAX_USDC, 1)

  useEffect(() => {
    const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!readOnlyProgram) return
    const [configPda] = getPresaleConfigPDA()
    const account = (readOnlyProgram as any).account
    account?.presaleConfig
      ?.fetch(configPda)
      .then(setConfig)
      .catch(() => setConfig(null))
  }, [readOnlyProgram])

  useEffect(() => {
    if (!program || !publicKey) {
      setBuyerRecord(null)
      return
    }
    const [configPda] = getPresaleConfigPDA()
    const [buyerRecordPda] = getPresaleBuyerRecordPDA(configPda, publicKey)
    const account = (program as any).account
    account?.buyerRecord
      ?.fetch(buyerRecordPda)
      .then(setBuyerRecord)
      .catch(() => setBuyerRecord(null))
  }, [program, publicKey])

  const handleBuy = async () => {
    if (!program || !publicKey) {
      setStatus('请先连接钱包')
      return
    }
    if (parsedUsdc <= 0) {
      setStatus('请输入有效的 USDC 金额')
      return
    }

    const usdcBase = Math.floor(parsedUsdc * 10 ** USDC_DECIMALS)
    if (usdcBase <= 0) {
      setStatus('USDC 金额过小')
      return
    }
    if (usdcBase > MAX_USDC_BASE) {
      setStatus('超过单地址限购上限')
      return
    }

    try {
      setSubmitting(true)
      setStatus('准备交易...')

      const walawowMint = new PublicKey(WALAWOW_PROTOCOL_ADDRESSES.WALAWOW_MINT)
      const usdcMint = new PublicKey(WALAWOW_PROTOCOL_ADDRESSES.USDC_MINT)
      const treasuryUsdc = new PublicKey(WALAWOW_PROTOCOL_ADDRESSES.PRESALE_TREASURY_USDC)

      const [configPda] = getPresaleConfigPDA()
      const [mintAuthorityPda] = getPresaleMintAuthorityPDA(configPda)
      const [buyerRecordPda] = getPresaleBuyerRecordPDA(configPda, publicKey)

      const buyerUsdcAta = await getAssociatedTokenAddress(
        usdcMint,
        publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
      const buyerTokenAta = await getAssociatedTokenAddress(
        walawowMint,
        publicKey,
        false,
        TOKEN_2022_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )

      const instructions = []
      const buyerTokenInfo = await connection.getAccountInfo(buyerTokenAta)
      if (!buyerTokenInfo) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            publicKey,
            buyerTokenAta,
            publicKey,
            walawowMint,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        )
      }

      const buyerUsdcInfo = await connection.getAccountInfo(buyerUsdcAta)
      if (!buyerUsdcInfo) {
        setStatus('未找到 USDC 账户，请先获取 USDC')
        return
      }

      setStatus('发送购买交易...')
      const tx = await program.methods
        .buy(new BN(usdcBase))
        .accounts({
          buyer: publicKey,
          config: configPda,
          buyerRecord: buyerRecordPda,
          walawowMint,
          usdcMint,
          buyerUsdc: buyerUsdcAta,
          treasuryUsdc,
          buyerToken: buyerTokenAta,
          mintAuthority: mintAuthorityPda,
          tokenProgram: TOKEN_PROGRAM_ID,
          token2022Program: TOKEN_2022_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .preInstructions(instructions)
        .rpc()

      setStatus(`购买成功: ${tx}`)
    } catch (error: any) {
      setStatus(error?.message ?? '交易失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden rounded-3xl mb-10 p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-walawow-gold/15 via-transparent to-walawow-purple/20"></div>
        <div className="absolute top-10 left-10 h-64 w-64 bg-walawow-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 right-4 h-72 w-72 bg-walawow-purple/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-stretch">
            <div className="flex flex-col">
              <div>
                <h1 className="title-gradient text-4xl md:text-5xl lg:text-6xl">
                  Walawow Presale
                </h1>
                <p className="mt-4 text-lg md:text-xl text-walawow-neutral-text-secondary">
                  Early access at a fixed price. Immediate delivery, transfers locked
                  until the official liquidity launch.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full bg-walawow-purple/20 text-walawow-purple-light text-sm">
                    1 WALAWOW = {PRICE_USDC} USDC
                  </span>
                  <span className="px-4 py-2 rounded-full bg-walawow-gold/15 text-walawow-gold-light text-sm">
                    Per-wallet cap: {MAX_USDC.toLocaleString()} USDC
                  </span>
                  <span className="px-4 py-2 rounded-full bg-walawow-neutral-card/70 text-walawow-neutral-text-secondary text-sm">
                    Devnet preview
                  </span>
                </div>
              </div>

              {config?.endTs && Number(config.endTs) > 0 && (
                <>
                  <div className="mt-6 lg:hidden">
                    <div className="glass-card px-5 py-4 text-center">
                      <div className="text-sm text-walawow-neutral-text-secondary">
                        Presale ends in
                      </div>
                      <div className="mt-2 text-2xl font-semibold text-walawow-gold-light tracking-wide">
                        {formatCountdown(Number(config.endTs), now)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-6 hidden lg:block">
                    <div className="glass-card px-6 py-10 flex flex-col items-center justify-center text-center min-h-[360px]">
                      <div className="text-sm text-walawow-neutral-text-secondary">
                        Presale ends in
                      </div>
                      <div className="mt-2 text-3xl md:text-4xl font-semibold text-walawow-gold-light tracking-wide">
                        {formatCountdown(Number(config.endTs), now)}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="glass-card p-6 w-full self-stretch">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-walawow-neutral-text-secondary">Wallet</div>
                  <div className="text-base font-semibold text-white">
                    {connected && publicKey
                      ? `${publicKey.toBase58().slice(0, 4)}...${publicKey
                          .toBase58()
                          .slice(-4)}`
                      : 'Not connected'}
                  </div>
                </div>
                <ReliableWalletConnect />
              </div>

              <label className="block text-sm text-walawow-neutral-text-secondary mb-2">
                Enter USDC amount
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={usdcAmount}
                  onChange={(e) => setUsdcAmount(e.target.value)}
                  className="w-full rounded-xl bg-walawow-neutral-card/80 border border-walawow-neutral-border px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-walawow-gold/60"
                />
                <div className="text-sm text-walawow-neutral-text-secondary">USDC</div>
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-walawow-neutral-card/60 border border-walawow-neutral-border">
                <div className="flex justify-between text-sm text-walawow-neutral-text-secondary">
                  <span>Estimated WALAWOW</span>
                  <span>{formatNumber(tokenAmount, 0)} WOW</span>
                </div>
                <div className="flex justify-between text-sm text-walawow-neutral-text-secondary mt-2">
                  <span>Cap used</span>
                  <span>{formatNumber(parsedUsdc, 0)} / {MAX_USDC} USDC</span>
                </div>
                {buyerRecord && (
                  <div className="flex justify-between text-sm text-walawow-neutral-text-secondary mt-2">
                    <span>Already purchased</span>
                    <span>
                      {formatUnits(
                        BigInt(
                          buyerRecord.totalUsdc?.toString?.() ??
                            buyerRecord.totalUsdc ??
                            0
                        ),
                        USDC_DECIMALS,
                        2
                      )}{' '}
                      USDC
                    </span>
                  </div>
                )}
                <div className="mt-3 h-2 rounded-full bg-walawow-neutral-border overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-walawow-gold to-walawow-purple"
                    style={{ width: `${capProgress * 100}%` }}
                  />
                </div>
              </div>

              <button
                className="btn-gold w-full mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!connected || parsedUsdc <= 0 || submitting}
                onClick={handleBuy}
              >
                {submitting ? 'Processing...' : 'Buy WALAWOW'}
              </button>
              {status && (
                <p className="text-xs text-walawow-neutral-text-secondary mt-3 break-all">
                  {status}
                </p>
              )}
              <p className="text-xs text-walawow-neutral-text-secondary mt-3">
                Transfers are locked until liquidity is live. Buying confirms your
                acceptance of presale terms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6 md:col-start-1 md:row-start-1">
              <div className="data-label">Presale Supply</div>
              <div className="data-value">
                {config
                  ? `${formatUnits(
                      BigInt(
                        config.totalCapTokens?.toString?.() ??
                          config.totalCapTokens ??
                          0
                      ),
                      TOKEN_DECIMALS,
                      0
                    )} WOW`
                  : '...'}
              </div>
              <div className="text-xs text-walawow-neutral-text-secondary mt-2">
                {config
                  ? `Sold: ${formatUnits(
                      BigInt(
                        config.totalSoldTokens?.toString?.() ??
                          config.totalSoldTokens ??
                          0
                      ),
                      TOKEN_DECIMALS,
                      0
                    )} WOW`
                  : 'Fixed allocation for community early access.'}
              </div>
            </div>
            <div className="glass-card p-6 md:col-start-2 md:row-start-1">
              <div className="data-label">Delivery</div>
              <div className="data-value text-walawow-gold-light">Instant</div>
              <div className="text-xs text-walawow-neutral-text-secondary mt-2">
                Tokens are minted directly to your wallet.
              </div>
            </div>
            <div className="glass-card p-6 md:col-start-3 md:row-start-1">
              <div className="data-label">Transfer Status</div>
              <div className="data-value text-walawow-purple-light">Locked</div>
              <div className="text-xs text-walawow-neutral-text-secondary mt-2">
                Unlocks automatically at launch time.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h2 className="section-title mb-6">Presale Flow</h2>
          <ol className="space-y-4 text-walawow-neutral-text-secondary">
            <li>1. Connect your Solana wallet.</li>
            <li>2. Input the USDC amount (cap per wallet applies).</li>
            <li>3. Confirm the transaction to mint WALAWOW to your wallet.</li>
            <li>4. Transfers stay locked until liquidity launch.</li>
          </ol>
        </div>

        <div className="glass-card p-8">
          <h2 className="section-title mb-6">FAQ</h2>
          <div className="space-y-4 text-sm text-walawow-neutral-text-secondary">
            <div>
              <div className="text-white font-semibold">When does presale end?</div>
              <div>Set by the on-chain presale config or until allocation sells out.</div>
            </div>
            <div>
              <div className="text-white font-semibold">Why are transfers locked?</div>
              <div>To keep liquidity fair before the official launch.</div>
            </div>
            <div>
              <div className="text-white font-semibold">Where does my USDC go?</div>
              <div>Into the presale treasury wallet configured on-chain.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
