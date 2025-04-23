import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'http://9000-idx-studio-1744858354495.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev',
        'https://9000-idx-studio-1744858354495.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev'
      ]
    }
  }
};

export default nextConfig;
