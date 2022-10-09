import round from './round';

const humanizeSolana = (input = 0, maximumFractionDigits?: number): string =>
  `◎${round(input, maximumFractionDigits)}`;

export default humanizeSolana;
