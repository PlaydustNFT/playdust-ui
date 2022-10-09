import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import BN from 'bn.js';

function lamportsToSol(lamports: number | BN): number {
  if (typeof lamports === 'number') {
    return Math.abs(lamports) / LAMPORTS_PER_SOL;
  }

  let signMultiplier = 1;
  if (lamports.isNeg()) {
    signMultiplier = -1;
  }

  const absLamports = lamports.abs();
  const lamportsString = absLamports.toString(10).padStart(10, '0');
  const splitIndex = lamportsString.length - 9;
  const solString = `${lamportsString.slice(
    0,
    splitIndex
  )}.${lamportsString.slice(splitIndex)}`;
  return signMultiplier * parseFloat(solString);
}

export default lamportsToSol;
