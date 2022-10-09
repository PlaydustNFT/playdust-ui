import ProgramDataAccountInfoType from '../../_types/ProgramDataAccountInfoType';
import SecurityTXTType from '../_types/SecurityTXTType';

/*
  From: https://github.com/neodyme-labs/solana-security-txt

  See the an example in the Solana Explorer: https://explorer.solana.com/address/HPxKXnBN4vJ8RjpdqDCU7gvNQHeeyGnSviYTJ4fBrDt4/security?cluster=devnet

  Having standardized information about your project inside your contract makes it easy for whitehat researchers to reach you if they find any problems.

  To maximize compatibility with existing deployment setups, multisigs and DAOs, this security.txt is implemented to simply be a part of your program rather than an external contract.
*/

const REQUIRED_KEYS: (keyof SecurityTXTType)[] = [
  'name',
  'project_url',
  'contacts',
  'policy',
];
const VALID_KEYS: (keyof SecurityTXTType)[] = [
  'name',
  'project_url',
  'contacts',
  'policy',
  'preferred_languages',
  'source_code',
  'encryption',
  'auditors',
  'acknowledgements',
  'expiry',
];

const HEADER = '=======BEGIN SECURITY.TXT V1=======\0';
const FOOTER = '=======END SECURITY.TXT V1=======\0';

function getSecurityTXTFromProgramData(
  programData: ProgramDataAccountInfoType
): {
  securityTXT?: SecurityTXTType;
  error?: string;
} {
  const [data, encoding] = programData.data;
  if (!(data && encoding === 'base64'))
    return { securityTXT: undefined, error: 'Failed to decode program data' };

  const decoded = Buffer.from(data, encoding);

  const headerIdx = decoded.indexOf(HEADER);
  const footerIdx = decoded.indexOf(FOOTER);

  if (headerIdx < 0 || footerIdx < 0) {
    return { securityTXT: undefined, error: 'Program has no security.txt' };
  }

  /*
  the expected structure of content should be a list
  of ascii encoded key value pairs seperated by null characters.
  e.g. key1\0value1\0key2\0value2\0
  */
  const content = decoded.subarray(headerIdx + HEADER.length, footerIdx);

  const { map } = content
    .reduce<number[][]>(
      (prev, current) => {
        if (current === 0) {
          prev.push([]);
        } else {
          prev[prev.length - 1].push(current);
        }
        return prev;
      },
      [[]]
    )
    .map((c) => String.fromCharCode(...c))
    .reduce<{ map: { [key: string]: string }; key: string | undefined }>(
      (prev, current) => {
        const { key } = prev;
        if (!key) {
          return {
            map: prev.map,
            key: current,
          };
        }

        return {
          map: {
            ...(VALID_KEYS.some((x) => x === key) ? { [key]: current } : {}),
            ...prev.map,
          },
          key: undefined,
        };
      },
      { map: {}, key: undefined }
    );
  if (!REQUIRED_KEYS.every((k) => k in map)) {
    return {
      securityTXT: undefined,
      error: `some required fields are missing`,
    };
  }
  return { securityTXT: map as SecurityTXTType, error: undefined };
}

export default getSecurityTXTFromProgramData;
