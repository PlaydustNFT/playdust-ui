import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import SuspenseBoundary from '../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import WindowInput from './WindowInput/WindowInput';

const SearchInputContainer = styled.div`
  padding: 16px;
  position: sticky;
  width: 100%;
  z-index: 2;
`;

const ContentContainer = styled(Scrollbars)`
  overflow: auto;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

function StandardWindowContainer({ children }: PropsWithChildren<object>) {
  return (
    <>
      <SearchInputContainer>
        <SuspenseBoundary
          loading={null}
          error={null}
          content={<WindowInput />}
        />
      </SearchInputContainer>
      <ContentContainer autoHide={true}>
        <SuspenseBoundary
          loading={
            <SpinnerContainer>
              <CircularProgress />
            </SpinnerContainer>
          }
          error={null}
          content={children}
        />
      </ContentContainer>
    </>
  );
}

export default StandardWindowContainer;
