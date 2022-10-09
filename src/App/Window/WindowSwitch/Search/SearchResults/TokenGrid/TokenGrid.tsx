import React from 'react';
import TokenGroup from './TokenGroup';
import TokenList from './TokenList';
import type TokenGroupProps from './_types/TokenGroupProps';
import type TokenListProps from './_types/TokenListProps';

type TokenGridProps = TokenListProps | TokenGroupProps;

function TokenGrid(props: TokenGridProps) {
  if ('grouped' in props) {
    return <TokenGroup {...props} />;
  }

  return <TokenList {...props} />;
}

export default TokenGrid;
