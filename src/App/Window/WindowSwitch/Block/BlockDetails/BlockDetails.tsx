import React from 'react';
import SlotAccounts from './SlotAccounts';
import SlotPrograms from './SlotPrograms';
import SlotRewards from './SlotRewards';
import SlotTransactions from './SlotTransactions';

function BlockDetails() {
  return (
    <>
      <SlotTransactions />
      <SlotRewards />
      <SlotPrograms />
      <SlotAccounts />
    </>
  );
}

export default BlockDetails;
