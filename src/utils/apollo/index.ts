import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { createUploadLink } from 'apollo-upload-client';
import getConfig from 'next/config';
import { useMemo } from 'react';
import { getAuthHeaders, removeAuthenticatedDataFromCache } from '../auth';
import isServer from '../isServer';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const API_ENDPOINT = isServer()
  ? serverRuntimeConfig.apiUrl
  : publicRuntimeConfig.apiUrl;

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...getAuthHeaders(),
    },
  };
});

export const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  console.error({
    graphQLErrors,
    networkError,
  });

  // If any authentication errors are return, we want to sign the user out
  if (graphQLErrors) {
    graphQLErrors.some(({ extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        removeAuthenticatedDataFromCache();
        return true;
      }
      return false;
    });
  }
});

export const retryLink = new RetryLink({
  delay: (count) => {
    return count * 500 * Math.random();
  },
  attempts: {
    max: 5,
    retryIf: (error) => {
      return Boolean(
        error?.networkError ||
          error?.message?.includes('Network request failed')
      );
    },
  },
});

/**
 * Setup ApolloClient to handle SSR
 * Taken from [here](https://www.apollographql.com/blog/apollo-client/next-js/building-a-next-js-app-with-slash-graphql/)
 */
let apolloClient: ApolloClient<NormalizedCacheObject>;
export const cache = new InMemoryCache({});
function createApolloClient() {
  const link = ApolloLink.from([
    authLink,
    onErrorLink,
    retryLink,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - this has the wrong type because of a version mismatch but
    // works, see: https://github.com/jaydenseric/apollo-upload-client/issues/221
    createUploadLink({
      uri: `${API_ENDPOINT}/api`,
      credentials:
        process.env.NODE_ENV === 'development' ? 'include' : 'same-origin',
    }),
  ]);

  return new ApolloClient({
    ssrMode: isServer(),
    connectToDevTools: !isServer(),
    link,
    cache,
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data

    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (isServer()) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(
  initialState: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
