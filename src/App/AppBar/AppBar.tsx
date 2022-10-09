import styled from '@emotion/styled';
import {
  Add,
  Close,
  DeleteSweep,
  Home,
  Search,
  Twitter,
} from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { styled as muiStyled, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useRecoilValue } from 'recoil';
import activeTabAtom from '../_atoms/activeTabAtom';
import appStateAtom from '../_atoms/appStateAtom';
import currentUserProfileAtom from '../_atoms/currentUserProfileAtom';
import appBarWidth from '../_helpers/appBarWidth';
import safePromise from '../_helpers/safePromise';
import useGoHome from '../_hooks/useGoHome';
import ImageButton from '../_sharedComponents/ImageButton';
import WhitelistGuarded from '../_sharedComponents/WhitelistGuarded';
import AppWindowType from '../_types/AppWindowType';
import DiscordLogo from './DiscordLogo';
import Playdust from './PlaydustIcon';
import WalletButton from './WalletButton/WalletButton';
import useGoToNewTab from './_hooks/useGoToNewTab';
import useGoToTab from './_hooks/useGoToTab';
import useRemoveTab from './_hooks/useRemoveTab';

const largeButtonSize = 40;
const smallButtonSize = 24;

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 4px 0px 16px 0px;
  width: ${appBarWidth}px;
  overflow: hidden;
  gap: 16px;
`;

const GroupContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TabButtonContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 2;
  height: ${appBarWidth}px;
`;

const ActiveHighlightContainer = styled(Box)`
  position: absolute;
  height: ${appBarWidth}px;
  width: ${appBarWidth}px;
  top: 0;
  left: 0;
  padding: 2px;
`;

const ActiveHighlight = muiStyled(Box)(
  ({ theme }) => `
  position: relative;
  border: solid 2px ${theme.palette.background.default};
  height: 100%;
  width: 100%;
  border-radius: 50%;
`
);

const CloseButtonContainer = styled.div`
  position: absolute;
  padding: 8px;
  opacity: 0;
  z-index: 2;
  transition: opacity 0.25s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const getWindowTab = (window: AppWindowType): ReactNode | undefined => {
  switch (window.type) {
    case 'home':
      return <Home />;
    case 'search':
      return <Search />;
    case 'tx':
      return <Typography>T</Typography>;
    case 'block':
      return <Typography>B</Typography>;
    case 'address':
      return <Typography>A</Typography>;
    case 'epoch':
      return <Typography>E</Typography>;
    default:
      return null;
  }
};

function AppBar() {
  const currentUserProfile = useRecoilValue(currentUserProfileAtom);
  const { tabs } = useRecoilValue(appStateAtom);
  const activeTab = useRecoilValue(activeTabAtom);
  const removeTab = useRemoveTab();
  const goToTab = useGoToTab();
  const goToNewTab = useGoToNewTab();
  const router = useRouter();
  const theme = useTheme();
  const goHome = useGoHome();

  if (!router.isReady) {
    return null;
  }

  const inWindowManager = router.pathname === '/';
  const backgroundColor = theme.palette.background.default;

  const tabControls = (
    <WhitelistGuarded fallback={null}>
      {tabs.map((tab) => {
        const isActive = inWindowManager && tab.id === activeTab?.id;
        const currentWindow = tab.windows[tab.selectedWindowIdx];

        return (
          <TabButtonContainer key={tab.id}>
            <div>
              <ImageButton
                size={largeButtonSize}
                images={currentWindow.images}
                onClick={() => goToTab(tab)}
              >
                {getWindowTab(currentWindow)}
              </ImageButton>
              {isActive && (
                <ActiveHighlightContainer>
                  <ActiveHighlight />
                </ActiveHighlightContainer>
              )}
            </div>
            {isActive && (
              <CloseButtonContainer>
                <ImageButton size={smallButtonSize} onClick={() => removeTab()}>
                  <Close fontSize="small" />
                </ImageButton>
              </CloseButtonContainer>
            )}
          </TabButtonContainer>
        );
      })}
      <TabButtonContainer>
        <ImageButton onClick={() => goToNewTab()}>
          <Add />
        </ImageButton>
        {inWindowManager && tabs.length > 0 && currentUserProfile?.isAdmin && (
          <ImageButton
            size={24}
            onClick={() => {
              localStorage.clear();
              safePromise(router.replace('/'));
              router.reload();
            }}
          >
            <DeleteSweep fontSize="small" />
          </ImageButton>
        )}
      </TabButtonContainer>
    </WhitelistGuarded>
  );

  return (
    <RootContainer>
      <GroupContainer>
        <IconButton onClick={() => goHome()}>
          <Playdust width={largeButtonSize} />
        </IconButton>
      </GroupContainer>
      <Scrollbars>
        <GroupContainer sx={{ flex: 1 }}>{tabControls}</GroupContainer>
      </Scrollbars>
      <GroupContainer sx={{ gap: 1 }}>
        <IconButton href="https://twitter.com/PlaydustNFT" target="_blank">
          <Twitter sx={{ color: backgroundColor }} />
        </IconButton>
        <IconButton href="https://discord.gg/3H3b4XMQt6" target="_blank">
          <DiscordLogo color={backgroundColor} />
        </IconButton>
        <WalletButton
          backgroundColor={backgroundColor}
          size={largeButtonSize}
        />
      </GroupContainer>
    </RootContainer>
  );
}

export default AppBar;
