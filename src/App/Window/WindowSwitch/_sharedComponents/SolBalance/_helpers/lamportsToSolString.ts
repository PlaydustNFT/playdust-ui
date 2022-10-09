import BN from 'bn.js';
import lamportsToSol from '../../../_helpers/lamportsToSol';
import round from '../../../_helpers/round';

function lamportsToSolString(
  lamports: number | BN,
  maximumFractionDigits = 9
): string {
  const sol = lamportsToSol(lamports);
  return round(sol, maximumFractionDigits);
}

export default lamportsToSolString;
