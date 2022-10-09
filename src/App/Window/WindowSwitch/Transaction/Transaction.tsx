import React from 'react';
import SuspenseBoundary from '../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import ContentContainer from '../_sharedComponents/ContentContainer';
import StandardWindowContainer from '../_sharedComponents/StandardWindowContainer';
import AccountInputs from './AccountInputs';
import InstructionDetails from './InstructionDetails/InstructionDetails';
import ProgramLog from './ProgramLog/ProgramLog';
import RawTransactionData from './RawTransactionData';
import TransactionOverview from './TransactionOverview/TransactionOverview';

function Transaction() {
  return (
    <StandardWindowContainer>
      <ContentContainer>
        <SuspenseBoundary
          content={<TransactionOverview />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<AccountInputs />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<InstructionDetails />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<ProgramLog />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<RawTransactionData />}
          error={null}
          loading={null}
        />
      </ContentContainer>
    </StandardWindowContainer>
  );
}

export default Transaction;
