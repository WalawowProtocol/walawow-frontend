'use client';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { JACKPOT_PROTOCOL_ADDRESSES, RPC_URL } from '../config/addresses';

// 你需要IDL，这里先用pool的程序ID占位。后面贴IDL给我，我帮加。
// 现在假设你有jackpot_pool.json在src/idl/，如果没有，跳到步骤5先提供IDL。
import jackpotPoolIDL from '../idl/jackpot_pool.json'; // 如果没有这个文件，后面告诉我

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
      // 后面加其他合约
      default:
        return null;
    }

    return new Program(idl, new PublicKey(programId), provider);
  }, [wallet.publicKey, connection, programName]);
}
