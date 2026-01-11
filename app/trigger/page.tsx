// app/trigger/page.tsx
'use client'
import Link from 'next/link'
import { useTriggerEligibility } from '../../hooks/useTriggerEligibility'
import { usePoolInfo } from '../../hooks/usePoolInfo'
import { Zap, Trophy, Clock, Target, Sparkles, Timer, Award } from 'lucide-react'
import CommunityFooter from '../../components/CommunityFooter'

export default function TriggerPage() {
  const weeklyEligibility = useTriggerEligibility('weekly')
  const monthlyEligibility = useTriggerEligibility('monthly')
  const { poolInfo: weeklyPoolInfo } = usePoolInfo('weekly')
  const { poolInfo: monthlyPoolInfo } = usePoolInfo('monthly')

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
              <span className="text-xs tracking-[0.2em] text-walawow-neutral-text-secondary uppercase">Draw Winner Overview</span>
            </div>
            <h1 className="title-gradient text-4xl md:text-5xl font-bold">
              Trigger the Surprise Draw
            </h1>
            <div className="text-lg text-walawow-neutral-text-secondary space-y-3">
              <p>
                The draw must be triggered during the 1-hour window by calling the on-chain
                <span className="text-walawow-gold font-semibold"> draw_winner </span>
                instruction. The first successful call becomes the Lucky Messenger and earns the trigger reward
                (<span className="text-walawow-gold font-semibold">5% of the current prize pool</span>).
              </p>
              <div className="text-sm text-walawow-neutral-text-secondary space-y-1">
                <div>
                  1) Click the draw button on the <Link href="/" className="text-walawow-purple-light hover:text-walawow-gold">Home page</Link>.
                </div>
                <div>
                  2) Build your own script via the <Link href="/trigger-script" className="text-walawow-purple-light hover:text-walawow-gold">Developer Docs</Link>.
                </div>
              </div>
            </div>
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
              title: 'Open Window Only',
              description: 'Calls are only valid inside the scheduled trigger window for each pool.',
              color: 'from-walawow-purple/20 to-walawow-purple/5',
              iconColor: 'text-walawow-purple-light',
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: 'First draw_winner Wins',
              description: 'The first successful on-chain draw_winner call becomes the triggerer and earns the trigger reward.',
              color: 'from-walawow-gold/20 to-walawow-gold/5',
              iconColor: 'text-walawow-gold',
            },
            {
              icon: <Trophy className="h-6 w-6" />,
              title: 'Reward Settlement',
              description: 'The trigger reward is paid out alongside the winner claim.',
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
      <CommunityFooter />
    </div>
  )
}
