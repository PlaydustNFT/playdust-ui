import { PublicKey } from '@solana/web3.js';

interface AddressExplorerType {
  state: string;
  type: 'address';
  pubkey: PublicKey;
  hasPrivateKey: boolean;
  label?: string;
}

export default AddressExplorerType;
