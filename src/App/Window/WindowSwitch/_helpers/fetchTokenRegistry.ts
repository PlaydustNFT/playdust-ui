import type { TokenInfo, TokenInfoMap } from '@solana/spl-token-registry';
import axios from 'axios';

function toTokenInfoMap(tokenList: TokenInfo[]): TokenInfoMap {
  return tokenList.reduce((map: TokenInfoMap, item: TokenInfo) => {
    map.set(item.address, item);
    return map;
  }, new Map());
}

async function fetchTokenRegistry(): Promise<TokenInfoMap> {
  const { data } = await axios.get<Record<string, TokenInfo>>(
    `/playdust-api/token-registry`
  );

  return toTokenInfoMap(Object.values(data));
}

export default fetchTokenRegistry;
