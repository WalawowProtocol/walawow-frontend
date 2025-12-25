// app/draw-logic/page.tsx
import { ScrollText, CheckCircle, Zap, Shield, Target } from 'lucide-react'

export default function DrawLogicPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4 py-8">
      <div className="text-center relative">
        <div className="absolute -top-12 left-1/3 h-40 w-40 bg-walawow-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-1/3 h-28 w-28 bg-walawow-gold/5 rounded-full blur-3xl"></div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <ScrollText className="h-10 w-10 text-walawow-purple-light" />
          <h1 className="title-gradient text-4xl md:text-5xl font-bold">开奖逻辑详解</h1>
        </div>
        <p className="text-walawow-neutral-text-secondary text-lg max-w-3xl mx-auto">
          该页面说明持仓快照、VRF 随机数、中奖计算与领奖/回流的完整流程。
        </p>
      </div>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-walawow-gold" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">第一步：持仓快照与 Merkle 树</h2>
        </div>
        <ul className="space-y-3 text-walawow-neutral-text-secondary">
          <li>链下索引器在 snapshot window 内记录所有 $WALAWOW 持有者地址与持仓数量。</li>
          <li>排除流动性池、CEX、团队锁仓与合约地址，确保仅真实用户参与。</li>
          <li>以 (地址, 持仓数量) 作为叶子构建 Merkle 树，并将 Merkle 根、总权重、快照区块高度提交至 pool 合约。</li>
        </ul>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-6 w-6 text-walawow-purple-light" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">第二步：开奖与请求随机数</h2>
        </div>
        <ul className="space-y-3 text-walawow-neutral-text-secondary">
          <li>任何社区成员可在 draw window 内调用 draw_winner 触发开奖。</li>
          <li>首位触发者记录为 triggerer，享有 fee_bps_triggerer 奖励。</li>
          <li>合约请求 Switchboard VRF，由 coordinator 回调 fulfill_randomness。</li>
        </ul>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-walawow-gold" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">第三步：Switchboard VRF 随机数</h2>
        </div>
        <ul className="space-y-3 text-walawow-neutral-text-secondary">
          <li>随机数为 32 字节（256-bit），链上可验证且不可篡改。</li>
          <li>合约校验请求 ID 与 coordinator 地址，确保随机数来源可信。</li>
        </ul>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="h-6 w-6 text-walawow-purple-light" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">第四步：中奖计算与验证</h2>
        </div>
        <ul className="space-y-3 text-walawow-neutral-text-secondary">
          <li>winning_index = randomness % total_weight。</li>
          <li>按持仓权重分配连续区间，累计权重首次超过 winning_index 的地址即为中奖地址。</li>
          <li>中奖者提交 Merkle 证明与区间信息，调用 claim_prize 完成链上验证与发奖。</li>
        </ul>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-walawow-gold" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">最终步骤：领奖与回流</h2>
        </div>
        <ul className="space-y-3 text-walawow-neutral-text-secondary">
          <li>奖金按比例分发给中奖者与 triggerer。</li>
          <li>领取窗口结束后，未领取奖金可由 keeper/owner 回流至 distributor_vault。</li>
          <li>回流资金进入下一轮分配流程。</li>
        </ul>
      </section>

      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-6 w-6 text-walawow-purple-light" />
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">去中心化开奖触发器</h2>
        </div>
        <ul className="space-y-3 text-walawow-neutral-text-secondary">
          <li>开源触发脚本允许任何人竞争触发 draw_winner。</li>
          <li>第一个上链触发交易获得 triggerer 奖励。</li>
          <li>draw window 结束后由 keeper 兜底触发，确保开奖不会停摆。</li>
        </ul>
      </section>
    </div>
  )
}
