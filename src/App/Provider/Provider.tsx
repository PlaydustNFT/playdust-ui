import React, { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';
import AnalyticsProvider from './AnalyticsProvider';
import ThemeProvider from './ThemeProvider';
import WalletProvider from './WalletProvider';

function Provider({ children }: PropsWithChildren<object>) {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <WalletProvider>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </WalletProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default Provider;
