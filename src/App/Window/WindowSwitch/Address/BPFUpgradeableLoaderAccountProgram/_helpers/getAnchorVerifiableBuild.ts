import { PublicKey } from '@solana/web3.js';
import axios from 'axios';
import VerifiableBuildType from '../_types/VerifiableBuildType';

interface AnchorBuild {
  aborted: boolean;
  address: string;
  created_at: string;
  updated_at: string;
  descriptor: string[];
  docker: string;
  id: number;
  name: string;
  sha256: string;
  upgrade_authority: string;
  verified: string;
  verified_slot: number;
  state: string;
}

const defaultAnchorBuild = {
  label: 'Anchor',
  verifiedSlot: null,
};

/**
 * Returns a verified build from the anchor registry. null if no such
 * verified build exists, e.g., if the program has been upgraded since the
 * last verified build.
 */
async function getAnchorVerifiableBuild(
  programId: PublicKey,
  limit = 5
): Promise<VerifiableBuildType> {
  const url = `https://anchor.projectserum.com/api/v0/program/${programId.toString()}/latest?limit=${limit}`;
  const latestBuildsResp = await axios.get<AnchorBuild[]>(url);

  // Filter out all non successful builds.
  const latestBuilds = latestBuildsResp.data.filter(
    (b: AnchorBuild) =>
      !b.aborted && b.state === 'Built' && b.verified === 'Verified'
  ); // as AnchorBuild[];

  if (latestBuilds.length === 0) {
    return defaultAnchorBuild;
  }

  // Get the latest build.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { verified_slot, id } = latestBuilds[0];

  return {
    ...defaultAnchorBuild,
    verifiedSlot: verified_slot,
    id,
    url: `https://anchor.projectserum.com/build/${id}`,
  };
}

export default getAnchorVerifiableBuild;
