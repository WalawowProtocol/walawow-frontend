'use client';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses';

// 导入 IDL
import jackpotPoolIDL from '../idl/jackpot_pool.json';
import jackpotDistributorIDL from '../idl/jackpot_distributor.json';

export function useAnchorProgram(programName: 'harvest' | 'swap' | 'distributor' | 'pool') {
  const wallet = useWallet();
  const connection = useMemo(() => new Connection("https://api.devnet.solana.com", 'confirmed'), []);

  return useMemo(() => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      return null;
    }

    try {
      // 使用类型断言绕过类型检查
      const provider = new AnchorProvider(connection, wallet as any, { commitment: 'confirmed' });

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
          return null;
      }

      return new Program(idl, new PublicKey(programId), provider);
      
    } catch (error) {
      console.error(`Error initializing ${programName} program:`, error);
      return null;
    }
  }, [wallet, connection, programName]);
}
