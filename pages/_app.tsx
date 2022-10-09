import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import getPDEnv from '../src/App/_helpers/getPDEnv';
import '../styles/globals.css';

const env = getPDEnv();

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }

  return (
    <>
      <Head>
        <title>playdust</title>
        <link rel="icon" href="/fav-icon-circle.svg" />
        <link rel="apple-touch-icon" href="/fav-icon-square.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
      {/* Hubspot Embed Code */}
      {getPDEnv() === 'production' && (
        <script
          type="text/javascript"
          id="hs-script-loader"
          async={true}
          defer={true}
          src="//js.hs-scripts.com/21785114.js"
        />
      )}
    </>
  );
}

export default App;
