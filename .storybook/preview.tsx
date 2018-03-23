import { MockedProvider } from '@apollo/client/testing';
import * as nextImage from 'next/image';
import * as nextConfig from 'next/config';
import React from 'react';
import { Provider } from '../src/components/provider';
import '../src/components/tailwind.scss';
import '../src/components/all.scss';
import '../src/features/all.scss';

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props: any) => <img {...props} />,
});

Object.defineProperty(nextConfig, 'default', {
  configurable: true,
  value: () => ({
    publicRuntimeConfig: {},
    serverRuntimeConfig: {},
  }),
});

export const parameters = {
  apolloClient: {
    MockedProvider,
  },
  layout: 'centered',
  controls: {
    disable: true,
  },
  actions: {
    disable: true,
  },
  backgrounds: {
    disable: true,
  },
  design: {
    disable: true,
  },
  a11y: {
    disable: true,
  },
};

export const decorators = [
  (Story) => (
    <Provider>
      <Story />
    </Provider>
  ),
];
