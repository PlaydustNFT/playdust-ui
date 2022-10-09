import {
  getFilteredProgramAccounts,
  getHashedName,
  getNameAccountKey,
  NameRegistryState,
  NAME_PROGRAM_ID,
} from '@bonfida/spl-name-service';
import { Connection, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import SolanaClusterType from '../../../../../../_types/SolanaClusterType';
import safePubkey from '../../../../_helpers/safePubkey';

// Name auctionning Program ID
const PROGRAM_ID = new PublicKey('jCebN34bUfdeUYJT13J1yG16XWQpt5PDx6Mse9GUqhR');

interface DomainInfo {
  name: string;
  address: PublicKey;
  class: PublicKey;
}

async function getDomainKey(
  name: string,
  nameClass?: PublicKey,
  nameParent?: PublicKey
) {
  const hashedDomainName = await getHashedName(name);
  const nameKey = await getNameAccountKey(
    hashedDomainName,
    nameClass,
    nameParent
  );
  return nameKey;
}

async function findOwnedNameAccountsForUser(
  connection: Connection,
  userAccount: PublicKey
): Promise<PublicKey[]> {
  const filters = [
    {
      memcmp: {
        offset: 32,
        bytes: userAccount.toBase58(),
      },
    },
  ];
  const accounts = await getFilteredProgramAccounts(
    connection,
    NAME_PROGRAM_ID,
    filters
  );
  return accounts.map((a) => a.publicKey);
}

async function performReverseLookup(
  connection: Connection,
  nameAccounts: PublicKey[]
): Promise<DomainInfo[]> {
  const [centralState] = await PublicKey.findProgramAddress(
    [PROGRAM_ID.toBuffer()],
    PROGRAM_ID
  );

  const reverseLookupAccounts = await Promise.all(
    nameAccounts.map((name) => getDomainKey(name.toBase58(), centralState))
  );

  const names = await NameRegistryState.retrieveBatch(
    connection,
    reverseLookupAccounts
  );

  return names
    .map((name) => {
      if (!name?.data) {
        return undefined;
      }
      const nameLength = new BN(name.data.slice(0, 4), 'le').toNumber();
      return {
        name: `${name.data.slice(4, 4 + nameLength).toString()}.sol`,
        address: name.address,
        class: name.class,
      };
    })
    .filter((e) => !!e) as DomainInfo[];
}

async function fetchUserDomains(
  solanaCluster: SolanaClusterType,
  pubkey: PublicKey
): Promise<DomainInfo[]> {
  const connection = new Connection(solanaCluster.endpoint, 'confirmed');

  const domains = await findOwnedNameAccountsForUser(
    connection,
    safePubkey(pubkey)
  );

  const names = await performReverseLookup(connection, domains);
  names.sort((a, b) => a.name.localeCompare(b.name));
  return names;
}

export default fetchUserDomains;
