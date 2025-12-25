// app/whitepaper/page.tsx
import Link from 'next/link'
import {
  ScrollText,
  Target,
  TrendingUp,
  Coins,
  Globe,
  Zap,
  Shield,
  Users,
  Rocket,
  Gift,
} from 'lucide-react'

export default function Whitepaper() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4 py-8">
      <div className="text-center relative">
        <div className="absolute -top-12 left-1/3 h-40 w-40 bg-walawow-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-1/4 h-32 w-32 bg-walawow-gold/5 rounded-full blur-3xl"></div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <ScrollText className="h-10 w-10 text-walawow-purple-light" />
          <h1 className="title-gradient text-4xl md:text-5xl font-bold">
            Walawow Protocol Whitepaper
          </h1>
        </div>
        <p className="text-lg text-walawow-neutral-text-secondary max-w-3xl mx-auto">
          Walawow Protocol: The Perpetual Wealth Aggregator on Solana
        </p>
      </div>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-walawow-gold" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">1. Summary: Value for Holders</h2>
        </div>
        <p className="text-walawow-neutral-text-secondary text-lg leading-relaxed">
          Walawow Protocol is a Solana-based, smart-contract-driven on-chain wealth aggregation protocol. It is an
          experiment that uses Token-2022 transfer fees to aggregate and redistribute on-chain wealth. Walawow converts
          trading activity into periodic capital gains for holders and centers its narrative on weekly and monthly surprise pools.
        </p>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border space-y-8">
        <div className="flex items-center gap-3">
          <Coins className="h-6 w-6 text-walawow-purple-light" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">2. Economic Model: A Self-Reinforcing Loop</h2>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">2.1 Source of Wealth: Transaction Tax</h3>
          <p className="text-walawow-neutral-text-secondary text-lg leading-relaxed">
            The protocol enables Token-2022 Transfer Fee (10%) on $WALAWOW transfers and trades. After collection,
            the tax is automatically swapped into USDC and distributed to the pools below:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-walawow-neutral-text-secondary">
            <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
              <div className="text-white font-semibold mb-2">V1 Allocation</div>
              <ul className="space-y-1 text-sm">
                <li>Weekly Pool 35%</li>
                <li>Monthly Pool 25%</li>
                <li>Liquidity Injection 25%</li>
                <li>V2 Development Fund 5%</li>
                <li>Ecosystem Growth Fund 10%</li>
              </ul>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
              <div className="text-white font-semibold mb-2">V2 Allocation</div>
              <ul className="space-y-1 text-sm">
                <li>Weekly Pool 30%</li>
                <li>Monthly Pool 20%</li>
                <li>Liquidity Injection 20%</li>
                <li>Staking Dividends 20%</li>
                <li>Ecosystem Growth Fund 10%</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">2.2 Participation Rules: Hold to Participate</h3>
          <p className="text-walawow-neutral-text-secondary text-lg leading-relaxed">
            Simply holding $WALAWOW qualifies a wallet for pool distribution (subject to a minimum holding threshold to
            prevent dust attacks). Eligible addresses are included in each pre-draw snapshot.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">2.3 Distribution Rules (Lucky Mechanism)</h3>
          <ul className="text-walawow-neutral-text-secondary text-lg leading-relaxed space-y-2">
            <li>Prize Rule: No upper or lower limit; every round is guaranteed. One winner per round.</li>
            <li>If no triggerer exists, the winner receives 100% of the prize.</li>
            <li>Snapshot: Every Friday UTC 08:00 (4 hours before the draw).</li>
            <li>Trigger: Every Friday UTC 12:00. The first triggerer receives 5%, the winner receives 95%.</li>
            <li>Fallback: If no one triggers by UTC 13:00, the keeper executes with no trigger reward.</li>
            <li>V2: Triggerer receives the “Lucky Messenger” title and a paired NFT with the winner.</li>
            <li>Randomness: Switchboard VRF coordinator callback fulfill_randomness; randomness is tamper-proof.</li>
            <li>Probability: Weighted by holding size. See <Link href="/draw-logic" className="text-walawow-gold hover:underline">Draw Logic Details</Link>.</li>
            <li>Claiming: Rewards are claimed at www.walawowo.fun. After any claim, rewards are distributed to each address.</li>
            <li>Unclaimed: If no one claims by 8 hours before the next draw, funds return to the distributor for redistribution.</li>
          </ul>
        </div>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="h-6 w-6 text-walawow-gold" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">3. Token Information: Fair Launch</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-walawow-neutral-text-secondary">
          <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
            <div className="text-white font-semibold mb-2">Token Basics</div>
            <ul className="space-y-1 text-sm">
              <li>Name: $WALAWOW (Token-2022)</li>
              <li>Total Supply: 1,000,000,000</li>
            </ul>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
            <div className="text-white font-semibold mb-2">Allocation</div>
            <ul className="space-y-1 text-sm">
              <li>80% - Initial liquidity (LP burned, permanently locked)</li>
              <li>10% - Airdrops & marketing incentives</li>
              <li>10% - Team & future development (12-month linear vest)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-6 w-6 text-walawow-purple-light" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">4. Core Vision: From Entertainment to Infrastructure</h2>
        </div>
        <ul className="text-walawow-neutral-text-secondary text-lg leading-relaxed space-y-2">
          <li>V1 - Wealth Effect Phase: ignite attention with visible aggregation, build consensus and liquidity.</li>
          <li>V2 - Value Consolidation Phase: introduce staking and yield scenarios for sustainable value support.</li>
          <li>V3 - Perpetual Protocol Phase: gradually transfer DAO control for full decentralization.</li>
        </ul>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="h-6 w-6 text-walawow-gold" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">5. Roadmap</h2>
        </div>
        <div className="space-y-6 text-walawow-neutral-text-secondary">
          <div>
            <div className="text-white font-semibold mb-2">Phase 1: Launch</div>
            <ul className="space-y-1 text-sm">
              <li>Complete core contract deployment and security audits.</li>
              <li>Fair launch, create initial liquidity, burn LP tokens.</li>
              <li>Weekly/monthly draw flows live (indexer + VRF + claim).</li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-2">Phase 2: Growth & Consolidation</div>
            <ul className="space-y-1 text-sm">
              <li>Improve staking and ecosystem distribution modules.</li>
              <li>Mobile trigger tools and NFT ecosystem.</li>
              <li>Establish community governance framework.</li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-2">Phase 3: Autonomy</div>
            <ul className="space-y-1 text-sm">
              <li>Launch DAO governance.</li>
              <li>Gradually transfer contract permissions to the community.</li>
              <li>Host frontend on decentralized networks for long-term autonomy.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-walawow-purple-light" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">6. Disclaimer & Risk Notice</h2>
        </div>
        <p className="text-walawow-neutral-text-secondary text-lg leading-relaxed">
          Crypto investments carry high risk. Walawow Protocol is experimental. Users should participate only after
          fully understanding the mechanism and risks and based on their own risk tolerance.
        </p>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-6 w-6 text-walawow-gold" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Draw Logic Details</h2>
        </div>
        <div className="space-y-8 text-walawow-neutral-text-secondary">
          <div>
            <div className="text-white font-semibold mb-2">Step 1: Preparation — Snapshot & Merkle Tree</div>
            <ul className="space-y-1 text-sm">
              <li>Off-chain indexer records all $WALAWOW holders and balances during the snapshot window.</li>
              <li>Liquidity pool addresses, CEX addresses, team locks, and contract addresses are excluded.</li>
              <li>Build a Merkle tree where each leaf is (address, balance).</li>
              <li>Submit the Merkle root, total effective weight, and snapshot block height on-chain.</li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-2">Step 2: Draw & Randomness Request</div>
            <ul className="space-y-1 text-sm">
              <li>Any community member can call draw_winner during the draw window.</li>
              <li>The first successful triggerer is recorded and receives 5% of the prize.</li>
              <li>draw_winner requests Switchboard VRF; the coordinator later calls fulfill_randomness.</li>
              <li>The pool enters “waiting for randomness” to prevent repeated requests.</li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-2">Step 3: Switchboard VRF Randomness</div>
            <ul className="space-y-1 text-sm">
              <li>Randomness is 32 bytes (256-bit), verifiable and tamper-proof on-chain.</li>
              <li>The contract validates the request ID and coordinator address to ensure authenticity.</li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-2">Step 4: Winner Selection by Weight</div>
            <ul className="space-y-1 text-sm">
              <li>winning_index = randomness % total_weight.</li>
              <li>Balances create continuous ranges; the address whose cumulative balance first exceeds winning_index wins.</li>
            </ul>
            <div className="mt-3 text-sm">
              Example: A=1,000, B=2,000, C=7,000, total=10,000, winning_index=5,678 ⇒ winner is C.
            </div>
            <div className="mt-2 text-sm">
              Probabilities: A 10%, B 20%, C 70%.
            </div>
          </div>

          <div>
            <div className="text-white font-semibold mb-2">Final Step: Verification & Payout</div>
            <ul className="space-y-1 text-sm">
              <li>Anyone can call claim_prize with the winner address and Merkle proof.</li>
              <li>The pool distributes USDT/SOL to the winner and triggerer.</li>
              <li>Unclaimed funds can be recycled to distributor_vault after the claim window.</li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-2">Decentralized Trigger Scheme</div>
            <div className="text-sm mb-3">
              Open-source trigger scripts allow anyone to compete to trigger draw_winner at the scheduled time. The
              first confirmed transaction wins the trigger reward, while keeper_draw provides a fallback after the
              draw window ends.
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="glass-card p-4 rounded-xl border border-walawow-neutral-border/50">
                <div className="text-white font-semibold mb-2">Core Mechanism</div>
                <ul className="space-y-1">
                  <li>Open-source trigger scripts for community members.</li>
                  <li>All nodes race at the scheduled draw time.</li>
                  <li>First confirmed transaction wins the reward.</li>
                  <li>Reward is 5% of the round’s prize.</li>
                </ul>
              </div>
              <div className="glass-card p-4 rounded-xl border border-walawow-neutral-border/50">
                <div className="text-white font-semibold mb-2">Advantages</div>
                <ul className="space-y-1">
                  <li>Truly decentralized trigger control.</li>
                  <li>Strong incentives for community participation.</li>
                  <li>Compelling narrative: the protocol does not need the team to trigger draws.</li>
                  <li>Self-sustaining: rewards are paid from the pool itself.</li>
                  <li>High censorship resistance with globally distributed nodes.</li>
                </ul>
              </div>
              <div className="glass-card p-4 rounded-xl border border-walawow-neutral-border/50">
                <div className="text-white font-semibold mb-2">Considerations</div>
                <ul className="space-y-1">
                  <li>Reward amount: 5% of the round prize.</li>
                  <li>Anti-spam: trigger scripts should only send near the scheduled time.</li>
                  <li>Priority fees create healthy competition and must cover execution costs.</li>
                  <li>Fault tolerance: contract must gracefully reject repeated triggers.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-sm">
            See also: <Link href="/draw-logic" className="text-walawow-gold hover:underline">Draw Logic Details</Link>.
          </div>
        </div>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-walawow-gold" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Technical Whitepaper: Smart Contract Modules</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-walawow-neutral-text-secondary">
          <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
            <div className="text-white font-semibold mb-2">1. Token Contract (Token-2022 Mint + Transfer Fee)</div>
            <ul className="space-y-1 text-sm">
              <li>Implements Token-2022 standard.</li>
              <li>Enables Transfer Fee; taxes are withheld on Token-2022 accounts.</li>
            </ul>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
            <div className="text-white font-semibold mb-2">2. Tax Harvest Contract (Walawow Harvest)</div>
            <ul className="space-y-1 text-sm">
              <li>Batch harvests withheld taxes to the mint.</li>
              <li>Withdraws from mint to swap_tax_vault (WALAWOW).</li>
              <li>Rate limits and account checks prevent abuse.</li>
            </ul>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
            <div className="text-white font-semibold mb-2">3. Swap & Forward Contract (Walawow Swap)</div>
            <ul className="space-y-1 text-sm">
              <li>WALAWOW → USDC swap happens off-chain (no DEX CPI on-chain).</li>
              <li>forward_usdc transfers swap_usdc_vault to distributor_vault.</li>
              <li>Supports threshold and minimum interval parameters.</li>
            </ul>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
            <div className="text-white font-semibold mb-2">4. Distribution Contract (Walawow Distributor)</div>
            <ul className="space-y-1 text-sm">
              <li>Distributes USDC by BPS into weekly/monthly staging vaults and staking/liquidity/team pools.</li>
              <li>Releases staging funds into pool vaults during snapshot windows.</li>
              <li>Distribution ratios and target accounts are admin-updatable.</li>
            </ul>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
            <div className="text-white font-semibold mb-2">5. Pool Manager Contract (Walawow Pool)</div>
            <ul className="space-y-1 text-sm">
              <li>Manages weekly/monthly pools, rounds, and state.</li>
              <li>Stores Merkle root, total weight, and snapshot block.</li>
              <li>draw_winner in draw_window, records triggerer, requests VRF.</li>
              <li>keeper_draw after draw_window with no trigger reward.</li>
              <li>claim_prize validates Merkle proof and pays winner + triggerer.</li>
              <li>recycle_unclaimed returns unclaimed funds to distributor_vault.</li>
            </ul>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
            <div className="text-white font-semibold mb-2">6. Off-chain Indexer & Keeper</div>
            <ul className="space-y-1 text-sm">
              <li>Builds holder snapshots and submits Merkle roots.</li>
              <li>Triggers harvest and swap, then forwards to distributor.</li>
              <li>Calls distribute and release_staging_funds.</li>
              <li>Calls keeper_draw after the draw window if needed.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
