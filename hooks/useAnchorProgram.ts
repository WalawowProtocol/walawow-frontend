'use client';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses';

// 导入 IDL
import jackpotPoolIDL from '../idl/jackpot_pool.json';
import jackpotDistributorIDL from '../idl/jackpot_distributor.json';

// 创建适配器来匹配 Anchor 的 Wallet 接口
const createWalletAdapter = (wallet: any) => {
  return {
    publicKey: wallet.publicKey,
    signTransaction: wallet.signTransaction,
    signAllTransactions: wallet.signAllTransactions,
    signMessage: wallet.signMessage,
  };
};

export function useAnchorProgram(programName: 'harvest' | 'swap' | 'distributor' | 'pool') {
  const wallet = useWallet();
  const connection = useMemo(() => new Connection("https://api.devnet.solana.com", 'confirmed'), []);

  return useMemo(() => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      console.log('❌ Wallet not connected or missing signTransaction');
      return null;
    }

    try {
      // 使用适配器包装 wallet
      const walletAdapter = createWalletAdapter(wallet);
      const provider = new AnchorProvider(connection, walletAdapter, { commitment: 'confirmed' });

      let idl: any;
      let programId: string;
      
      switch (programName) {
        case 'pool':
          idl = jackpotPoolIDL;
          programId = JACKPOT_PROTOCOL_ADDRESSES.POOL_PROGRAM;
          break;
        case 'distributor':
          idl = jackpotDistributorIDL;
          programId = JACKPOT_PROTOCOL_ADDRESSES.DISTRIBUTOR_PROGRAM;
          break;
        default:
          console.log(`❌ Unknown program: ${programName}`);
          return null;
      }

      if (!idl) {
        console.log(`❌ IDL not found for: ${programName}`);
        return null;
      }

      console.log(`✅ Initializing ${programName} program`);
      return new Program(idl, new PublicKey(programId), provider);
      
    } catch (error) {
      console.error(`❌ Error initializing ${programName} program:`, error);
      return null;
    }
  }, [wallet.publicKey, connection, programName, wallet.signTransaction, wallet.signAllTransactions, wallet.signMessage]);
}
