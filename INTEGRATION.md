# Walawow Protocol 前端链上对接完成说明

## ✅ 已完成的工作

### 1. Anchor 程序集成
- ✅ 创建了 `utils/programs.ts` 工具文件，提供所有程序的 Anchor 实例
- ✅ 支持 Pool、Distributor、Harvest、Swap 四个程序的完整集成
- ✅ 实现了 PDA（Program Derived Address）计算工具
- ✅ 支持只读和可写两种模式的 Provider

### 2. 配置文件更新
- ✅ `config/addresses.ts` 现在从 IDL 文件自动读取程序地址
- ✅ 确保程序地址与链上部署的程序一致

### 3. Hooks 完整实现

#### `usePoolInfo` - 池信息读取
- ✅ 从链上读取 `PoolConfig` 账户数据
- ✅ 获取池状态、下次开奖时间、上次获胜者等信息
- ✅ 自动刷新（每30秒）
- ✅ 错误处理和降级方案

#### `usePoolBalance` - 池余额读取
- ✅ 从链上读取 vault token account 余额
- ✅ 使用正确的 PDA 计算 vault 地址
- ✅ 自动刷新（每30秒）

#### `useDrawTrigger` - 开奖触发
- ✅ 使用 Anchor 调用 `draw_winner` 指令
- ✅ 完整的错误处理和用户友好的错误消息
- ✅ 交易确认和状态管理

#### `useClaimPrize` - 领取奖励
- ✅ 使用 Anchor 调用 `claim_prize` 指令
- ✅ 支持 Merkle 证明验证
- ✅ 自动计算所需的 token accounts
- ✅ 完整的错误处理

#### `useUserBalance` - 用户余额
- ✅ 已存在，读取用户 WALAWOW token 余额

#### `useTriggerEligibility` - 触发资格检查
- ✅ 已存在，计算触发窗口时间

### 4. 程序地址（从 IDL 自动获取）
- **Pool Program**: `9HbEMdbqqfGRuTWEhKzPSzoRsY55MuxkwmSKdHUZm2mh`
- **Distributor Program**: `G5amgFciBWH5AMuc8af4prpZ11GWgscDPeuD4fBs9AcV`
- **Harvest Program**: `2fHg3CJUs7Yky66YnQfC8geMY1NSkbZk8YTVs2Dpyjz7`
- **Swap Program**: `477SV7DQCteAoZ9PAQLNs3d2HtVapP13ogojWVGUmkjk`

## 📝 使用方法

### 在组件中使用 Hooks

```typescript
import { usePoolInfo } from '../hooks/usePoolInfo'
import { useDrawTrigger } from '../hooks/useDrawTrigger'
import { useClaimPrize } from '../hooks/useClaimPrize'

function MyComponent() {
  const { poolInfo, loading, error } = usePoolInfo('weekly')
  const { triggerDraw, triggering, error: triggerError } = useDrawTrigger()
  const { claimPrize, claiming } = useClaimPrize()

  // 触发开奖
  const handleTrigger = async () => {
    await triggerDraw('weekly')
  }

  // 领取奖励
  const handleClaim = async () => {
    await claimPrize({
      poolType: 'weekly',
      winner: publicKey,
      winnerLeafAmount: BigInt(1000),
      cumulativeWeightUntil: BigInt(5000),
      proof: [/* Merkle proof */]
    })
  }

  return (
    // 你的组件 JSX
  )
}
```

### PDA 计算

```typescript
import { getPoolPDA, getPoolVaultPDA } from '../utils/programs'

// 计算池 PDA
const [poolPDA] = getPoolPDA(ownerPublicKey, { weekly: {} })

// 计算 vault PDA
const [vaultPDA] = getPoolVaultPDA(poolPDA)
```

## 🔧 注意事项

1. **Merkle 证明**: `claim_prize` 需要从后端 API 获取 Merkle 证明
2. **Token Accounts**: 系统会自动计算所需的 token accounts，但需要确保账户已创建
3. **错误处理**: 所有 hooks 都包含完整的错误处理，会显示用户友好的错误消息
4. **网络配置**: 当前配置为 Devnet，如需切换到 Mainnet，请更新 `ClientWalletProvider.tsx`

## 🚀 下一步

1. **后端 API 集成**: 需要实现获取 Merkle 证明的 API 端点
2. **测试**: 在 Devnet 上测试所有功能
3. **UI 优化**: 根据实际数据调整 UI 显示
4. **错误处理优化**: 根据实际使用情况优化错误消息

## 📚 相关文件

- `utils/programs.ts` - Anchor 程序工具
- `hooks/usePoolInfo.ts` - 池信息读取
- `hooks/usePoolBalance.ts` - 池余额读取
- `hooks/useDrawTrigger.ts` - 开奖触发
- `hooks/useClaimPrize.ts` - 领取奖励
- `config/addresses.ts` - 地址配置

