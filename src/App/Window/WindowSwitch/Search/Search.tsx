import styled from '@emotion/styled';
import { FilterAlt } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, Slide } from '@mui/material';
import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import StandardWindowContainer from '../_sharedComponents/StandardWindowContainer';
import SearchOverview from './SearchOverview/SearchOverview';
import SearchResults from './SearchResults/SearchResults';
import SearchSideBar from './SearchSideBar/SearchSideBar';

const RootContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled(Box)`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex-direction: column;
  margin-left: 16px;
`;

const TokenContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const DesktopSidebarContainer = styled.div`
  width: 300px;
  margin-right: 8px;
  margin-left: 16px;
`;

const MobileOverviewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MobileSidebarContainer = styled(Paper)`
  position: absolute;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  z-index: 1;
  top: 8px;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  overflow: hidden;
`;

const breakPoint = 768;

function Search() {
  const windowSize = useWindowSize();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mobileSidebar = (
    <MobileSidebarContainer elevation={8} square={false}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          p: 2,
          pb: 6,
        }}
      >
        <Button
          fullWidth={true}
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => setIsSidebarOpen(false)}
        >
          Close
        </Button>
        <SearchSideBar />
      </Box>
    </MobileSidebarContainer>
  );

  return (
    <StandardWindowContainer>
      <RootContainer>
        {windowSize.width > breakPoint ? (
          <>
            <DesktopSidebarContainer>
              <SearchSideBar />
            </DesktopSidebarContainer>
            <ContentContainer>
              <SearchOverview />
              <TokenContainer>
                <SearchResults />
              </TokenContainer>
            </ContentContainer>
          </>
        ) : (
          <>
            <Slide
              direction="up"
              in={isSidebarOpen}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              {mobileSidebar}
            </Slide>
            <ContentContainer sx={{ zIndex: isSidebarOpen ? -1 : 0 }}>
              <MobileOverviewContainer>
                <IconButton onClick={() => setIsSidebarOpen(true)}>
                  <FilterAlt />
                </IconButton>
                <SearchOverview />
              </MobileOverviewContainer>
              <TokenContainer>
                <SearchResults />
              </TokenContainer>
            </ContentContainer>
          </>
        )}
      </RootContainer>
    </StandardWindowContainer>
  );
}

export default Search;
