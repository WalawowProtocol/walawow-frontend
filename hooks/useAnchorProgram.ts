'use client';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { JACKPOT_PROTOCOL_ADDRESSES, RPC_URL } from '../config/addresses';

import jackpotPoolIDL from '../idl/jackpot_pool.json';
import jackpotDistributorIDL from '../idl/jackpot_distributor.json';

export function useAnchorProgram(programName: 'harvest' | 'swap' | 'distributor' | 'pool') {
  const wallet = useWallet();
  const connection = useMemo(() => new Connection(RPC_URL, 'confirmed'), []);

  return useMemo(() => {
    if (!wallet.publicKey || !wallet.signTransaction) return null;

    const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });

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

    // ✅ 不使用类型参数，让 Anchor 动态处理
    return new Program(idl, new PublicKey(programId), provider);
  }, [wallet.publicKey, connection, programName, wallet.signTransaction]);
}
