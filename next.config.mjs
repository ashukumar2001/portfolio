/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "api.unsplash.com" },
    ],
  },
};

export default nextConfig;
