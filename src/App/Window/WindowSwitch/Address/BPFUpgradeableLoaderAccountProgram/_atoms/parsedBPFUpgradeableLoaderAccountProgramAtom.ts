import { Connection } from '@solana/web3.js';
import { selector } from 'recoil';
import { assert, create } from 'superstruct';
import solanaClusterAtom from '../../../../../_atoms/solanaClusterAtom';
import addressStateAtom from '../../../_atoms/addressStateAtom';
import safePubkey from '../../../_helpers/safePubkey';
import parsedBPFUpgradeableLoaderAccountAtom from '../../_atoms/parsedBPFUpgradeableLoaderAccountAtom';
import { AccountInfoType } from '../../_types/AccountInfoType';
import ProgramAccountInfoType from '../../_types/ProgramAccountInfoType';
import ProgramDataAccountInfoType from '../../_types/ProgramDataAccountInfoType';
import ProgramDataAccountType from '../../_types/ProgramDataAccountType';
import getAnchorVerifiableBuild from '../_helpers/getAnchorVerifiableBuild';
import getSecurityTXTFromProgramData from '../_helpers/getSecurityTXTFromProgramData';
import SecurityTXTType from '../_types/SecurityTXTType';
import VerifiableBuildType from '../_types/VerifiableBuildType';

interface BPFUpgradeableLoaderAccountProgramAtom {
  parsed: ProgramAccountInfoType;
  parsedProgramAccount: ProgramDataAccountInfoType;
  verifiableBuild: VerifiableBuildType;
  securityTXT?: SecurityTXTType;
  error?: string;
}

const parsedBPFUpgradeableLoaderAccountProgramAtom =
  selector<BPFUpgradeableLoaderAccountProgramAtom | null>({
    key: 'parsedBPFUpgradeableLoaderAccountProgramAtom',
    get: async ({ get }) => {
      const addressState = get(addressStateAtom);
      const parsedBPFUpgradeableLoaderAccount = get(
        parsedBPFUpgradeableLoaderAccountAtom
      );

      if (!addressState) {
        return null;
      }

      const { pubkey } = addressState;

      if (
        !parsedBPFUpgradeableLoaderAccount ||
        parsedBPFUpgradeableLoaderAccount.type !== 'program'
      ) {
        return null;
      }

      const { info } = parsedBPFUpgradeableLoaderAccount;

      const solanaCluster = get(solanaClusterAtom);

      const connection = new Connection(solanaCluster.endpoint, 'confirmed');
      const accountInfoResult = await connection.getParsedAccountInfo(
        safePubkey(info.programData)
      );

      const accountInfo = create(accountInfoResult.value, AccountInfoType);

      if (!accountInfo) {
        return null;
      }

      if (!accountInfo || Buffer.isBuffer(accountInfo.data)) {
        return null;
      }

      assert(accountInfo.data.parsed, ProgramDataAccountType);

      const verifiableBuild = await getAnchorVerifiableBuild(pubkey);

      const parsedProgramAccount = accountInfo.data.parsed.info;

      const { securityTXT, error } =
        getSecurityTXTFromProgramData(parsedProgramAccount);

      return {
        parsed: parsedBPFUpgradeableLoaderAccount.info,
        parsedProgramAccount,
        verifiableBuild,
        securityTXT,
        error,
      };
    },
  });

export default parsedBPFUpgradeableLoaderAccountProgramAtom;
