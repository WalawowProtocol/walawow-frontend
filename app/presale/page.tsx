'use client'
import { useMemo, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import ReliableWalletConnect from '../../components/ReliableWalletConnect'

const PRICE_USDC = 0.001
const MAX_USDC = 1000

function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return '0'
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })
}

export default function PresalePage() {
  const { connected, publicKey } = useWallet()
  const [usdcAmount, setUsdcAmount] = useState('100')

  const parsedUsdc = useMemo(() => {
    const value = Number(usdcAmount)
    return Number.isFinite(value) && value > 0 ? value : 0
  }, [usdcAmount])

  const tokenAmount = useMemo(() => {
    if (!parsedUsdc) return 0
    return parsedUsdc / PRICE_USDC
  }, [parsedUsdc])

  const capProgress = Math.min(parsedUsdc / MAX_USDC, 1)

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden rounded-3xl mb-10 p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-walawow-gold/15 via-transparent to-walawow-purple/20"></div>
        <div className="absolute top-10 left-10 h-64 w-64 bg-walawow-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 right-4 h-72 w-72 bg-walawow-purple/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="max-w-2xl">
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

            <div className="glass-card p-6 w-full lg:w-[380px]">
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
                <div className="mt-3 h-2 rounded-full bg-walawow-neutral-border overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-walawow-gold to-walawow-purple"
                    style={{ width: `${capProgress * 100}%` }}
                  />
                </div>
              </div>

              <button
                className="btn-gold w-full mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!connected || parsedUsdc <= 0}
              >
                Buy WALAWOW
              </button>
              <p className="text-xs text-walawow-neutral-text-secondary mt-3">
                Transfers are locked until liquidity is live. Buying confirms your
                acceptance of presale terms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6">
              <div className="data-label">Presale Supply</div>
              <div className="data-value">100,000,000 WOW</div>
              <div className="text-xs text-walawow-neutral-text-secondary mt-2">
                Fixed allocation for community early access.
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="data-label">Delivery</div>
              <div className="data-value text-walawow-gold-light">Instant</div>
              <div className="text-xs text-walawow-neutral-text-secondary mt-2">
                Tokens are minted directly to your wallet.
              </div>
            </div>
            <div className="glass-card p-6">
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
