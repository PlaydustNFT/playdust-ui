import BN from 'bn.js';

const MAX_EPOCH = new BN(2).pow(new BN(64)).sub(new BN(1));

function getMaxEpoch() {
  return MAX_EPOCH;
}

export default getMaxEpoch;
