import type { NextConfig } from 'next';
import { withSerwist } from '@serwist/turbopack';

const nextConfig: NextConfig = withSerwist({
  /* config options here */
});

export default nextConfig;
