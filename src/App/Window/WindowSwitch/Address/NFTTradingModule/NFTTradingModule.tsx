import styled from '@emotion/styled';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import SuspenseBoundary from '../../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import addressStateAtom from '../../_atoms/addressStateAtom';
import ContentContainer from '../../_sharedComponents/ContentContainer';
import parsedTokenAccountAtom from '../_atoms/parsedTokenAccountAtom';
import NFTOrderBook from './NFTOrderBook/NFTOrderBook';
import NFTTradingDialog from './NFTTradingDialog/NFTTradingDialog';
import TradeButtons from './TradeButtons';

const ButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: end;
  gap: 16px;
`;

function NFTTradingModule() {
  const [expanded, setExpanded] = useState(false);
  const addressState = useRecoilValue(addressStateAtom);
  const parsedTokenAccount = useRecoilValue(parsedTokenAccountAtom);

  if (
    !addressState ||
    !parsedTokenAccount ||
    parsedTokenAccount.type !== 'mint'
  ) {
    return null;
  }

  return (
    <ContentContainer>
      <Accordion itemID="trading-module" expanded={expanded}>
        <AccordionSummary
          aria-controls="trading-module-content"
          aria-label="Playdust Trading Module"
          id="trading-module"
        >
          <ButtonContainer>
            <Button
              variant={expanded ? 'contained' : 'outlined'}
              size="medium"
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <ListAltSharpIcon />
            </Button>
            <SuspenseBoundary
              content={<TradeButtons />}
              loading={
                <Button variant="outlined" disabled={true}>
                  <CircularProgress
                    size={20}
                    color="inherit"
                    sx={{ marginRight: '8px' }}
                  />{' '}
                  Loading
                </Button>
              }
              error={null}
            />
          </ButtonContainer>
        </AccordionSummary>
        <AccordionDetails
          aria-labelledby="trading-module"
          id="trading-module-content"
        >
          <SuspenseBoundary
            content={<NFTOrderBook />}
            error={null}
            loading={null}
          />
        </AccordionDetails>
      </Accordion>
      <NFTTradingDialog />
    </ContentContainer>
  );
}

export default NFTTradingModule;
