import React from 'react';
import { AppProps } from 'next/app';
import { install } from 'resize-observer';
import AppProvider from '../utils/AppProvider';
import isServer from '../utils/isServer';
import '../components/tailwind.scss';
import '../components/all.scss';
import '../features/all.scss';

function App({ Component, pageProps }: AppProps): React.ReactNode {
  if (!isServer()) {
    install();
  }
  return (
    <div>
      <AppProvider {...pageProps}>
        <Component {...pageProps} />
      </AppProvider>
    </div>
  );
}

export default App;
