import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react';
import ReactGA from 'react-ga4';

const trackingID = process.env.GOOGLE_ANALYTICS_4_MEASUREMENT_ID;

const value = {};

const AnalyticsContext = React.createContext(value);

function AnalyticsProvider({ children }: PropsWithChildren<object>) {
  const router = useRouter();
  const wallet = useWallet();

  const handleRouteChange = () => {
    ReactGA.send('pageview');
  };

  const handleHashChange = () => {
    ReactGA.send('pageview');
  };

  useEffect(() => {
    if (!trackingID) {
      throw new Error('No trackingID found.');
    }
    ReactGA.initialize(trackingID);
  }, []);

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      ReactGA.set({ userId: wallet.publicKey });
    }
  }, [wallet.connected, wallet.publicKey]);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleHashChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleHashChange);
    };
  }, [router]);

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;
