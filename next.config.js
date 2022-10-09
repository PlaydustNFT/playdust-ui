// https://github.com/facebookexperimental/Recoil/issues/733
const intercept = require('intercept-stdout')
intercept((text) => (text.includes('Duplicate atom key') ? '' : text))

const { PLAYDUST_API_HOST } = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    modularizeImports: {
      "@mui/material": {
        transform: "@mui/material/{{member}}",
      },
      '@mui/icons-material/?(((\\w*)?/?)*)': {
        transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
      },
    },
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.PD_ENV': JSON.stringify(process.env.PD_ENV),
        'process.env.RPC_NODE_CLUSTER': JSON.stringify(process.env.RPC_NODE_CLUSTER),
        'process.env.RPC_NODE_URL': JSON.stringify(process.env.RPC_NODE_URL),
        'process.env.WHITELIST_ACTIVE': JSON.stringify(process.env.WHITELIST_ACTIVE || false),
        'process.env.HUBSPOT_PORTAL_ID': JSON.stringify(process.env.HUBSPOT_PORTAL_ID),
        'process.env.HUBSPOT_JOIN_WHITELIST_FORM_ID': JSON.stringify(process.env.HUBSPOT_JOIN_WHITELIST_FORM_ID),
        'process.env.GO_LIVE': JSON.stringify(process.env.GO_LIVE),
        'process.env.GOOGLE_ANALYTICS_4_MEASUREMENT_ID': JSON.stringify(process.env.GOOGLE_ANALYTICS_4_MEASUREMENT_ID),
      })
    );
    return config;
  },
  rewrites: async () => [
    {
      source: '/cdn/:path*',
      destination: 'https://bix5os3dh6.execute-api.us-east-1.amazonaws.com/prod/3:path*',
    },
    {
      source: '/playdust-api/:path*',
      destination: `${PLAYDUST_API_HOST}/:path*`,
    },
  ],
  ignoreDuringBuilds: true,
  typescript: {
    tsconfigPath: "tsconfig.json",
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    OPENSEARCH_URL: process.env.OPENSEARCH_URL,
    OPENSEARCH_USER: process.env.OPENSEARCH_USER,
    OPENSEARCH_PASSWORD: process.env.OPENSEARCH_PASSWORD,
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)
