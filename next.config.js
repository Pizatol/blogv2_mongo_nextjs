/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
        ],
    },
    reactStrictMode: false,
    experimental: {
      forceSwcTransforms: true,
    },
};

module.exports = nextConfig;
