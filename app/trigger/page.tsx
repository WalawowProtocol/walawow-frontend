// app/trigger/page.tsx
'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useTriggerEligibility } from '../../hooks/useTriggerEligibility'
import { usePoolInfo } from '../../hooks/usePoolInfo'
import { Code2, Cpu, Zap, Target, BookOpen, Search, Trophy, Clock, Sparkles, Timer, Shield, Rocket, Award } from 'lucide-react'
import CommunityFooter from '../../components/CommunityFooter'
import { WALAWOW_PROTOCOL_ADDRESSES } from '../../config/addresses'

export default function TriggerPage() {
  const [activeTab, setActiveTab] = useState('instruction')
  const weeklyEligibility = useTriggerEligibility('weekly')
  const monthlyEligibility = useTriggerEligibility('monthly')
  const { poolInfo: weeklyPoolInfo } = usePoolInfo('weekly')
  const { poolInfo: monthlyPoolInfo } = usePoolInfo('monthly')

  const instructionCode = `// Core Trigger Call
const tx = await program.methods
  .drawWinner()
  .accounts({
    pool: poolAddress,      // Weekly or Monthly pool address
    triggerer: publicKey,  // Your wallet public key (the triggerer)
  })
  .rpc();`

  const poolAddresses = useMemo(() => `// Pool Addresses (Devnet)
const WEEKLY_POOL = "${WALAWOW_PROTOCOL_ADDRESSES.POOL_WEEKLY}";
const MONTHLY_POOL = "${WALAWOW_PROTOCOL_ADDRESSES.POOL_MONTHLY}";
const WALAWOW_POOL_PROGRAM = "${WALAWOW_PROTOCOL_ADDRESSES.POOL_PROGRAM}";`, [])

  const errorHandling = `// Common Trigger Error Handling
try {
  await triggerDraw();
} catch (triggerError) {
  if (triggerError.message.includes('NotInDrawWindow')) {
    console.log('⏰ Not in draw window');
  } else if (triggerError.message.includes('TooEarlyToDraw')) {
    console.log('🕒 Too early to draw');
  } else if (triggerError.message.includes('InvalidState')) {
    console.log('⚠️ Pool state does not allow drawing');
  } else if (triggerError.message.includes('Paused')) {
    console.log('⛔ Contract is paused');
  }
}`

  const pythonExample = `# Python Trigger Example
from solders.pubkey import Pubkey
from anchorpy import Program, Context

async def trigger_draw():
    program = await Program.connect(PROGRAM_ID)
    tx = await program.rpc["draw_winner"](
        ctx=Context(
            accounts={
                "pool": weekly_pool,
                "triggerer": wallet.pubkey,
            }
        )
    )
    return tx`

  const rustExample = `// Rust Trigger Example
use anchor_lang::prelude::*;

#[program]
pub mod trigger_client {
    use super::*;

    pub fn draw_winner(ctx: Context<TriggerDraw>) -> Result<()> {
        let cpi_ctx = CpiContext::new(
            ctx.accounts.pool_program.to_account_info(),
            walawow_pool::cpi::accounts::DrawWinner {
                pool: ctx.accounts.pool.to_account_info(),
                triggerer: ctx.accounts.triggerer.to_account_info(),
            }
        );
        walawow_pool::cpi::draw_winner(cpi_ctx)?;
        Ok(())
    }
}`

  const formatUtcDate = (date: Date | null) => {
    if (!date) return 'Schedule not available'
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }) + ' UTC'
  }

  const formatWindowEnd = (date: Date | null, drawWindow: number) => {
    if (!date || drawWindow <= 0) return 'Schedule not available'
    const end = new Date(date.getTime() + drawWindow * 1000)
    return formatUtcDate(end)
  }

  const getWindowStatus = (isOpen: boolean, timeUntil: string) => {
    if (isOpen) {
      return {
        label: 'OPEN NOW',
        detail: 'Triggering is live on the Dashboard.',
        tone: 'text-walawow-gold',
        bg: 'from-walawow-gold/20 to-walawow-gold/5',
        border: 'border-walawow-gold/30',
      }
    }
    if (timeUntil.includes('Awaiting')) {
      return {
        label: 'CLOSED',
        detail: 'Awaiting the next round.',
        tone: 'text-walawow-purple-light',
        bg: 'from-walawow-purple/15 to-walawow-purple/5',
        border: 'border-walawow-purple/30',
      }
    }
    return {
      label: 'OPENS SOON',
      detail: `Opens in ${timeUntil}`,
      tone: 'text-walawow-purple-light',
      bg: 'from-walawow-purple/15 to-walawow-gold/10',
      border: 'border-walawow-purple/30',
    }
  }

  const weeklyStatus = getWindowStatus(weeklyEligibility.isWithinTriggerWindow, weeklyEligibility.timeUntilTrigger)
  const monthlyStatus = getWindowStatus(monthlyEligibility.isWithinTriggerWindow, monthlyEligibility.timeUntilTrigger)

  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4 py-10">
      <section className="relative overflow-hidden glass-card rounded-3xl border border-walawow-neutral-border p-8 md:p-10">
        <div className="absolute -top-8 right-16 h-40 w-40 bg-walawow-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 left-10 h-48 w-48 bg-walawow-purple/10 rounded-full blur-3xl"></div>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Zap className="h-9 w-9 text-walawow-purple-light animate-pulse" />
              <span className="text-xs tracking-[0.2em] text-walawow-neutral-text-secondary uppercase">Trigger Overview</span>
            </div>
            <h1 className="title-gradient text-4xl md:text-5xl font-bold">
              Trigger the Surprise Draw
            </h1>
            <p className="text-lg text-walawow-neutral-text-secondary">
              First confirmed trigger earns <span className="text-walawow-gold font-semibold">5% of the prize pool</span>. Triggering
              happens on the Dashboard during the open window.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="btn-gold px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Go to Dashboard
              </Link>
              <div className="px-4 py-3 rounded-xl border border-walawow-neutral-border text-sm text-walawow-neutral-text-secondary">
                Status updates refresh automatically.
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card p-4 rounded-2xl border border-walawow-neutral-border/60">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-walawow-neutral-text-secondary">Weekly Window</div>
                <span className={`text-xs font-semibold ${weeklyStatus.tone}`}>{weeklyStatus.label}</span>
              </div>
              <div className="text-white font-semibold">
                {formatUtcDate(weeklyEligibility.nextTriggerTime)}
              </div>
              <div className="text-xs text-walawow-neutral-text-secondary mt-1">{weeklyStatus.detail}</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-walawow-neutral-border/60">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-walawow-neutral-text-secondary">Monthly Window</div>
                <span className={`text-xs font-semibold ${monthlyStatus.tone}`}>{monthlyStatus.label}</span>
              </div>
              <div className="text-white font-semibold">
                {formatUtcDate(monthlyEligibility.nextTriggerTime)}
              </div>
              <div className="text-xs text-walawow-neutral-text-secondary mt-1">{monthlyStatus.detail}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-7 rounded-3xl border border-walawow-neutral-border">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 notranslate" translate="no">Weekly Surprise</h3>
              <p className="text-sm text-walawow-neutral-text-secondary">Weekly trigger cadence</p>
            </div>
            <span className="bg-gradient-to-r from-walawow-purple to-walawow-purple-dark text-white px-3 py-1.5 rounded-full text-xs font-bold">
              Weekly Draw
            </span>
          </div>
          <div className={`p-4 rounded-2xl border bg-gradient-to-r ${weeklyStatus.bg} ${weeklyStatus.border}`}>
            <div className={`text-2xl font-bold ${weeklyStatus.tone}`}>{weeklyStatus.label}</div>
            <div className="text-sm text-walawow-neutral-text-secondary mt-1">{weeklyStatus.detail}</div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div className="glass-card p-4 rounded-2xl border border-walawow-neutral-border/50">
              <div className="text-walawow-neutral-text-secondary">Next Trigger Window</div>
              <div className="text-white font-medium mt-1">{formatUtcDate(weeklyEligibility.nextTriggerTime)}</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-walawow-neutral-border/50">
              <div className="text-walawow-neutral-text-secondary">Window Closes</div>
              <div className="text-white font-medium mt-1">
                {formatWindowEnd(weeklyEligibility.nextTriggerTime, weeklyPoolInfo.drawWindow)}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-7 rounded-3xl border border-walawow-neutral-border hover:glow-gold">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 notranslate" translate="no">Monthly Spectacular</h3>
              <p className="text-sm text-walawow-neutral-text-secondary">Monthly trigger cadence</p>
            </div>
            <span className="bg-gradient-to-r from-walawow-gold to-walawow-gold-dark text-walawow-neutral-bg px-3 py-1.5 rounded-full text-xs font-bold">
              Monthly Draw
            </span>
          </div>
          <div className={`p-4 rounded-2xl border bg-gradient-to-r ${monthlyStatus.bg} ${monthlyStatus.border}`}>
            <div className={`text-2xl font-bold ${monthlyStatus.tone}`}>{monthlyStatus.label}</div>
            <div className="text-sm text-walawow-neutral-text-secondary mt-1">{monthlyStatus.detail}</div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div className="glass-card p-4 rounded-2xl border border-walawow-neutral-border/50">
              <div className="text-walawow-neutral-text-secondary">Next Trigger Window</div>
              <div className="text-white font-medium mt-1">{formatUtcDate(monthlyEligibility.nextTriggerTime)}</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-walawow-neutral-border/50">
              <div className="text-walawow-neutral-text-secondary">Window Closes</div>
              <div className="text-white font-medium mt-1">
                {formatWindowEnd(monthlyEligibility.nextTriggerTime, monthlyPoolInfo.drawWindow)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-purple-dark flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Trigger Flow</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Clock className="h-6 w-6" />,
              title: 'Watch the Window',
              description: 'Triggering only counts during the open window for each pool.',
              color: 'from-walawow-purple/20 to-walawow-purple/5',
              iconColor: 'text-walawow-purple-light',
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: 'Submit Fast',
              description: 'The first confirmed trigger locks the reward share.',
              color: 'from-walawow-gold/20 to-walawow-gold/5',
              iconColor: 'text-walawow-gold',
            },
            {
              icon: <Trophy className="h-6 w-6" />,
              title: 'Reward Distribution',
              description: 'Trigger reward is paid together when the winner claims.',
              color: 'from-walawow-purple/15 to-walawow-gold/10',
              iconColor: 'text-walawow-purple-light',
            },
          ].map((item) => (
            <div key={item.title} className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                <div className={item.iconColor}>{item.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-walawow-neutral-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-walawow-gold/30 bg-gradient-to-br from-walawow-gold/5 to-walawow-gold/10">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-6 w-6 text-walawow-gold" />
            <h3 className="text-xl font-bold text-white">Winning Conditions</h3>
          </div>
          <ul className="space-y-3 text-sm text-walawow-neutral-text-secondary">
            <li>Only the first confirmed trigger earns the reward share.</li>
            <li>Multiple attempts are allowed but only one can succeed.</li>
            <li>Network congestion affects confirmation speed.</li>
          </ul>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-walawow-neutral-border">
          <div className="flex items-center gap-3 mb-4">
            <Timer className="h-6 w-6 text-walawow-purple-light" />
            <h3 className="text-xl font-bold text-white">Preparation Tips</h3>
          </div>
          <ul className="space-y-3 text-sm text-walawow-neutral-text-secondary">
            <li>Keep your wallet connected before the window opens.</li>
            <li>Use a low-latency connection for quicker confirmation.</li>
            <li>Monitor the Dashboard for the live trigger button.</li>
          </ul>
        </div>
      </section>

      <section className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-purple-dark flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Trigger Integration Guide</h2>
        </div>
        <p className="text-walawow-neutral-text-secondary text-lg">
          Build your own trigger tool and compete for <span className="text-walawow-gold font-semibold">trigger rewards</span>.
        </p>
      </section>

      <section className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-purple-dark flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Why Build Your Trigger Tool?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-purple/20 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-walawow-purple-light" />
                </div>
                <span className="title-gradient text-lg">Triggerer Advantages</span>
              </h3>
              <ul className="space-y-3">
                {["Full Control - Customize triggers to your needs", "Performance Optimization - Maximize winning chances",
                  "Learn & Experiment - Deep Solana development experience", "Competitive Edge - Unique strategies and optimizations"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-gold mt-2 flex-shrink-0"></div>
                    <span className="text-walawow-neutral-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-gold/20 flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-walawow-gold" />
                </div>
                <span className="title-gradient text-lg">Reward Opportunities</span>
              </h3>
              <ul className="space-y-3">
                {["Reward Share - First successful triggerer wins the configured share", "Trigger window follows pool schedule",
                  "Global Scale - Compete with developers worldwide", "Community Recognition - Earn honors in the Winner Feed"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-purple-light mt-2 flex-shrink-0"></div>
                    <span className="text-walawow-neutral-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-gold flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Trigger Guide</h2>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'instruction', label: 'Core Trigger', icon: Zap },
            { id: 'addresses', label: 'Pool Addresses', icon: Cpu },
            { id: 'errors', label: 'Error Handling', icon: Shield },
            { id: 'examples', label: 'Code Examples', icon: Code2 }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'btn-gold shadow-gold'
                    : 'bg-walawow-neutral-card border border-walawow-neutral-border text-walawow-neutral-text-secondary hover:bg-walawow-purple/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50 bg-gradient-to-br from-walawow-neutral-card to-walawow-neutral-card/50">
          {activeTab === 'instruction' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-5 w-5 text-walawow-purple-light" />
                <h3 className="text-lg font-semibold text-white">Core Trigger Call</h3>
              </div>
              <pre className="text-walawow-purple-light text-sm overflow-x-auto p-4 rounded-lg bg-black/50 border border-walawow-purple/30">
                {instructionCode}
              </pre>
              <div className="mt-4 p-4 rounded-lg bg-walawow-purple/10 border border-walawow-purple/20">
                <h4 className="text-walawow-gold-light font-semibold mb-2">Parameters:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-purple-light"></div>
                    <code className="text-sm">pool</code>
                    <span className="text-walawow-neutral-text-secondary text-sm">Pool address (weekly or monthly)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-gold"></div>
                    <code className="text-sm">triggerer</code>
                    <span className="text-walawow-neutral-text-secondary text-sm">Your wallet public key (must be transaction signer)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Cpu className="h-5 w-5 text-walawow-purple-light" />
                <h3 className="text-lg font-semibold text-white">Pool Addresses (Devnet)</h3>
              </div>
              <pre className="text-walawow-gold-light text-sm overflow-x-auto p-4 rounded-lg bg-black/50 border border-walawow-gold/30">
                {poolAddresses}
              </pre>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-walawow-purple/10 border border-walawow-purple/20">
                  <div className="text-walawow-gold-light font-semibold">Network</div>
                  <div className="text-walawow-neutral-text-secondary text-sm">Solana Devnet</div>
                </div>
                <div className="p-3 rounded-lg bg-walawow-gold/10 border border-walawow-gold/20">
                  <div className="text-walawow-gold-light font-semibold">RPC Endpoint</div>
                  <div className="text-walawow-neutral-text-secondary text-sm">https://devnet.helius-rpc.com/?api-key=ea4c9b26-b295-4bcb-bba4-9a1ab1007184</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'errors' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-walawow-purple-light" />
                <h3 className="text-lg font-semibold text-white">Common Error Handling</h3>
              </div>
              <pre className="text-red-300 text-sm overflow-x-auto p-4 rounded-lg bg-black/50 border border-red-500/30">
                {errorHandling}
              </pre>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { error: "NotInDrawWindow", desc: "Trigger outside draw window", color: "text-yellow-400" },
                  { error: "TooEarlyToDraw", desc: "Draw window not yet open", color: "text-red-400" },
                  { error: "InvalidState", desc: "Pool state does not allow drawing", color: "text-purple-400" },
                  { error: "Paused", desc: "Contract is paused", color: "text-blue-400" }
                ].map((err, i) => (
                  <div key={i} className="p-3 rounded-lg bg-walawow-neutral-card border border-walawow-neutral-border">
                    <code className={`text-sm font-mono ${err.color}`}>{err.error}</code>
                    <div className="text-walawow-neutral-text-secondary text-sm mt-1">{err.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 text-sm font-bold">Py</span>
                  </div>
                  <h4 className="text-md font-semibold text-blue-400">Python Trigger Example</h4>
                </div>
                <pre className="text-green-400 text-sm overflow-x-auto p-4 rounded-lg bg-black/50 border border-blue-500/30">
                  {pythonExample}
                </pre>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 text-sm font-bold">Rs</span>
                  </div>
                  <h4 className="text-md font-semibold text-orange-400">Rust Trigger Example</h4>
                </div>
                <pre className="text-yellow-300 text-sm overflow-x-auto p-4 rounded-lg bg-black/50 border border-orange-500/30">
                  {rustExample}
                </pre>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-gold to-walawow-gold-dark flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Winning Strategies</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-purple/20 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-walawow-purple-light" />
                </div>
                <span className="title-gradient text-lg">Technical Optimizations</span>
              </h3>
              <ul className="space-y-3">
                {["Low Latency RPC - Use geographically close RPC endpoints", "Priority Fees - Set higher compute unit price",
                  "Multi-region Deployment - Deploy trigger bots in different regions", "Pre-signed Transactions - Prepare transaction before window opens"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-purple-light mt-2 flex-shrink-0"></div>
                    <span className="text-walawow-neutral-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-gold/20 flex items-center justify-center">
                  <Timer className="h-4 w-4 text-walawow-gold" />
                </div>
                <span className="title-gradient text-lg">Timing Strategies</span>
              </h3>
              <ul className="space-y-3">
                {["Clock Synchronization - Use NTP for precise timing", "Network Monitoring - Monitor Solana network congestion",
                  "Retry Logic - Implement smart retry mechanisms", "Block Monitoring - Track latest block hashes"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-gold mt-2 flex-shrink-0"></div>
                    <span className="text-walawow-neutral-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-purple-dark flex items-center justify-center">
            <Search className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Development Resources</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "📖", title: "Solana Docs", desc: "Official Solana documentation", link: "https://docs.solana.com", color: "bg-walawow-purple/20" },
            { icon: "⚓", title: "Anchor Framework", desc: "Solana Sealevel framework", link: "https://www.anchor-lang.com", color: "bg-walawow-gold/20" },
            { icon: "🔍", title: "Solana Explorer", desc: "View contract transactions", link: "https://explorer.solana.com", color: "bg-walawow-purple/20" }
          ].map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 text-center group hover:scale-[1.02] transition-all duration-300 border border-walawow-neutral-border/50 hover:border-walawow-purple/50"
            >
              <div className={`w-14 h-14 ${resource.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{resource.icon}</span>
              </div>
              <h3 className="font-semibold text-white mb-2">{resource.title}</h3>
              <p className="text-walawow-neutral-text-secondary text-sm mb-3">{resource.desc}</p>
              <span className="inline-flex items-center gap-1 text-walawow-purple-light text-sm font-medium">
                Visit Site <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
          ))}
        </div>
      </section>
      <CommunityFooter />
    </div>
  )
}
