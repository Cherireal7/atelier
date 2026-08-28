/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Workspace packages ship raw TSX; Next must transpile them.
  transpilePackages: ['@atelier/tokens', '@atelier/ui'],
};

export default config;
