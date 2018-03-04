/* eslint-disable no-undef */
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, { webpack }) => {
    /**
     * Enables use of arbitary value support with scss in next
     * https://stackoverflow.com/questions/68565169/using-tailwind-arbitrary-value-support-with-scss/68572037#68572037
     */
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (moduleLoader.loader.includes('resolve-url-loader'))
          moduleLoader.options.sourceMap = false;
      });
    });

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /(?:\/__stories__\/.+.ts[x]?)|(?:.*\.stories\.ts[x]?$)/,
      })
    );
    return config;
  },
  images: {
    domains: (process.env.ALLOWABLE_IMAGE_DOMAINS || '').split(','),
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiUrl: process.env.NEXT_PUBLIC_SSR_API_BASE_URL, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // Pass through env variables
  },
};

module.exports = nextConfig;
