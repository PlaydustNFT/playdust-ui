import { PublicKey } from '@solana/web3.js';

function safePubkeyString(maybePubkey: PublicKey | string | number): string {
  if (!(maybePubkey instanceof PublicKey)) {
    return String(maybePubkey);
  }

  // ONLY IN DEV: recoil freezes all values returned by atoms/selectors
  // However, toBase58() - in certain circumstances, namely for the System Program pubkey
  // needs to modify the pubkey object, which if frozen will throw,
  // so we hardcode a fallback to the SystemProgram.
  try {
    return maybePubkey.toBase58();
  } catch (err) {
    return '11111111111111111111111111111111';
  }
}

export default safePubkeyString;
