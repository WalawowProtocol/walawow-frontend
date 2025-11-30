// app/trigger-script/page.tsx
'use client'
import { useState } from 'react'

export default function TriggerScriptPage() {
  const [activeTab, setActiveTab] = useState('instruction')

  const instructionCode = `// Core Instruction Call
const transaction = await program.methods
  .drawWinner()
  .accounts({
    pool: poolAddress,      // Weekly or Monthly pool address
    triggerer: publicKey,   // Your wallet public key
  })
  .transaction();`

  const poolAddresses = `// Pool Addresses (Devnet)
const POOL_WEEKLY = "2wsXkzJtM7wnbotZ2sjNHiQzjSWiVHwqnackGHpWXdVQ";
const POOL_MONTHLY = "Fy1begTbD5YGKYYouX8KRE2AbWQ5ADSewM1vmRXeHm3N";
const POOL_PROGRAM = "9F8ezXUnTAKUXqvxSUBwrZqLZuRD96kURp323GHt91hU";`

  const errorHandling = `// Common Error Handling
try {
  await triggerDraw();
} catch (error) {
  if (error.message.includes('TooEarlyToDraw')) {
    console.log('⏰ Too early to trigger');
  } else if (error.message.includes('InvalidState')) {
    console.log('❌ Invalid pool state');
  } else if (error.message.includes('Paused')) {
    console.log('⏸️ Contract paused');
  }
}`

  const pythonExample = `# Python example using solders
from solders.pubkey import Pubkey
from anchorpy import Program, Context

async def trigger_draw():
    program = await Program.connect(POOL_PROGRAM_ID)
    tx = await program.rpc["draw_winner"](
        ctx=Context(
            accounts={
                "pool": weekly_pool_pubkey,
                "triggerer": wallet.pubkey,
            }
        )
    )
    return tx`

  const rustExample = `// Rust example
use anchor_lang::prelude::*;

#[program]
pub mod trigger_bot {
    use super::*;

    pub fn trigger_draw(ctx: Context<TriggerDraw>) -> Result<()> {
        let cpi_ctx = CpiContext::new(
            ctx.accounts.pool_program.to_account_info(),
            jackpot_pool::cpi::accounts::DrawWinner {
                pool: ctx.accounts.pool.to_account_info(),
                triggerer: ctx.accounts.triggerer.to_account_info(),
            }
        );
        jackpot_pool::cpi::draw_winner(cpi_ctx)?;
        Ok(())
    }
}`

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          🔧 Trigger Integration Guide
        </h1>
        <p className="text-xl text-gray-300">
          Build your own draw trigger bot and compete for 5% rewards
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">🎯 Build Your Own Trigger Bot</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Why Build Your Own?</h3>
            <ul className="text-gray-300 space-y-2">
              <li>🚀 <strong>Full Control</strong> - Customize to your needs</li>
              <li>⚡ <strong>Optimize Performance</strong> - Maximize winning chances</li>
              <li>🔧 <strong>Learn & Experiment</strong> - Deep Solana development experience</li>
              <li>🏆 <strong>Competitive Edge</strong> - Unique strategies and optimizations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Reward Opportunity</h3>
            <ul className="text-gray-300 space-y-2">
              <li>💰 <strong>5% of Prize Pool</strong> - First successful trigger wins</li>
              <li>⏰ <strong>Weekly Competition</strong> - Every Friday 12:00-13:00 UTC</li>
              <li>🌍 <strong>Global Scale</strong> - Compete with developers worldwide</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('instruction')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'instruction' 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📋 Core Instruction
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'addresses' 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🏷️ Contract Addresses
          </button>
          <button
            onClick={() => setActiveTab('errors')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'errors' 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            ⚠️ Error Handling
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'examples' 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            💡 Code Examples
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-black rounded-lg p-6">
          {activeTab === 'instruction' && (
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Core Instruction Call</h3>
              <pre className="text-green-400 text-sm overflow-x-auto">
                {instructionCode}
              </pre>
              <div className="mt-4 text-gray-300 space-y-2">
                <p><strong>Parameters:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li><code>pool</code> - Pool address (weekly or monthly)</li>
                  <li><code>triggerer</code> - Your wallet public key (must be transaction signer)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Contract Addresses (Devnet)</h3>
              <pre className="text-green-400 text-sm overflow-x-auto">
                {poolAddresses}
              </pre>
              <div className="mt-4 text-gray-300">
                <p><strong>Network:</strong> Solana Devnet</p>
                <p><strong>RPC URL:</strong> https://api.devnet.solana.com</p>
              </div>
            </div>
          )}

          {activeTab === 'errors' && (
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Common Error Handling</h3>
              <pre className="text-green-400 text-sm overflow-x-auto">
                {errorHandling}
              </pre>
              <div className="mt-4 text-gray-300 space-y-2">
                <p><strong>Possible Errors:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li><code>TooEarlyToDraw</code> - Triggered outside the 1-hour window</li>
                  <li><code>InvalidState</code> - Pool not in correct state for drawing</li>
                  <li><code>Paused</code> - Contract temporarily paused</li>
                  <li><code>Unauthorized</code> - Invalid permissions</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-semibold text-blue-400 mb-2">Python Example</h4>
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {pythonExample}
                </pre>
              </div>
              <div>
                <h4 className="text-md font-semibold text-purple-400 mb-2">Rust Example</h4>
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {rustExample}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Strategy Guide */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">🏆 Winning Strategies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Technical Optimizations</h3>
            <ul className="text-gray-300 space-y-2">
              <li>⚡ <strong>Low Latency RPC</strong> - Use geographically close RPC endpoints</li>
              <li>💰 <strong>Priority Fees</strong> - Set higher compute unit price</li>
              <li>🌐 <strong>Multi-region Deployment</strong> - Deploy bots in different regions</li>
              <li>🕒 <strong>Pre-signed Transactions</strong> - Prepare transaction before window opens</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-3">Timing Strategies</h3>
            <ul className="text-gray-300 space-y-2">
              <li>⏱️ <strong>Clock Synchronization</strong> - Use NTP for precise timing</li>
              <li>📊 <strong>Network Monitoring</strong> - Monitor Solana network congestion</li>
              <li>🔄 <strong>Retry Logic</strong> - Implement smart retry mechanisms</li>
              <li>🔍 <strong>Block Monitoring</strong> - Track latest block hashes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Development Resources */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">📚 Development Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📖</span>
            </div>
            <h3 className="font-semibold mb-2">Solana Docs</h3>
            <p className="text-gray-400 text-sm">Official Solana documentation</p>
            <a href="https://docs.solana.com" className="text-yellow-400 text-sm hover:underline">Visit</a>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚓</span>
            </div>
            <h3 className="font-semibold mb-2">Anchor Framework</h3>
            <p className="text-gray-400 text-sm">Solana Sealevel framework</p>
            <a href="https://www.anchor-lang.com" className="text-yellow-400 text-sm hover:underline">Visit</a>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="font-semibold mb-2">Explorer</h3>
            <p className="text-gray-400 text-sm">View contract transactions</p>
            <a href="https://explorer.solana.com" className="text-yellow-400 text-sm hover:underline">Visit</a>
          </div>
        </div>
      </div>

      {/* Community */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-2xl p-6 text-center">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">👥 Join the Competition</h2>
        <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
          Build, optimize, and compete with developers worldwide. Share strategies, learn from others, 
          and become part of the decentralized trigger ecosystem.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-gray-700 px-4 py-2 rounded-lg">
            <span className="text-yellow-400">🏆</span> Weekly Competition
          </div>
          <div className="bg-gray-700 px-4 py-2 rounded-lg">
            <span className="text-green-400">💰</span> 5% Reward Pool
          </div>
          <div className="bg-gray-700 px-4 py-2 rounded-lg">
            <span className="text-purple-400">🌍</span> Global Scale
          </div>
        </div>
      </div>
    </div>
  )
}
