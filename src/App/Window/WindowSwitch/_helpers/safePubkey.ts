import { PublicKey } from '@solana/web3.js';
import safePubkeyString from '../../../_helpers/safePubkeyString';

// In dev, recoil freezes all values returned by atoms/selectors
// However, toBase58() - in certain circumstances, namely for the System Program pubkey
// needs to modify the pubkey object, which if frozen will throw,
// so we use safePubkeyString before create a new Pubkey object
function safePubkey(maybePubkey: PublicKey | string): PublicKey {
  if (maybePubkey instanceof PublicKey) {
    return new PublicKey(safePubkeyString(maybePubkey));
  }
  return new PublicKey(maybePubkey);
}

export default safePubkey;
