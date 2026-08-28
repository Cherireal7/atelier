/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Workspace packages ship raw TSX; Next must transpile them.
  transpilePackages: ['@atelier/tokens', '@atelier/ui'],
  // Dev-only URL composition. In production Nginx does this at the edge.
  // Each entry maps a shell URL to the origin of a running micro frontend.
  rewrites: async () => [
    { source: '/collection', destination: 'http://localhost:4401/collection' },
    {
      source: '/collection/:path*',
      destination: 'http://localhost:4401/collection/:path*',
    },
  ],
};

export default config;
