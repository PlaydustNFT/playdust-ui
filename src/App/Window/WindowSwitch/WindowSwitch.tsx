import React from 'react';
import { useRecoilValue } from 'recoil';
import windowStateAtom from '../_atoms/windowStateAtom';
import Address from './Address/Address';
import Block from './Block/Block';
import Epoch from './Epoch/Epoch';
import Home from './Home/Home';
import Search from './Search/Search';
import Transaction from './Transaction/Transaction';

function WindowSwitch() {
  const windowState = useRecoilValue(windowStateAtom);

  switch (windowState?.type) {
    case 'home':
      return <Home />;
    case 'search':
      return <Search />;
    case 'address':
      return <Address />;
    case 'block':
      return <Block />;
    case 'tx':
      return <Transaction />;
    case 'epoch':
      return <Epoch />;
    default:
      return null;
  }
}

export default WindowSwitch;
