/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/portfolio",
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "api.unsplash.com" },
    ],
  },
};

export default nextConfig;
