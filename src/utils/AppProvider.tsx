import { ApolloProvider } from '@apollo/client';
import SSRProvider from '../contexts/ssr/provider';
import React, { ReactElement } from 'react';
import { useApollo } from './apollo';

type AppProviderProps = {
  children: React.ReactChild;
  initialApolloState: any;
  ssrIsMobile?: boolean;
};
const AppProvider = ({
  children,
  initialApolloState,
  ssrIsMobile,
}: AppProviderProps): ReactElement => {
  const client = useApollo(initialApolloState);

  return (
    <SSRProvider isMobile={ssrIsMobile}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SSRProvider>
  );
};

export default AppProvider;
