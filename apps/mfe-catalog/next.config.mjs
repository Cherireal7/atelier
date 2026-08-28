/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@atelier/tokens', '@atelier/ui'],
  // basePath makes every route in this app live under /collection so URLs
  // line up 1:1 whether accessed directly (localhost:4401/collection) or
  // proxied through the shell (localhost:4400/collection). Assets, links,
  // and API routes all get the prefix automatically.
  basePath: '/collection',
};

export default config;
