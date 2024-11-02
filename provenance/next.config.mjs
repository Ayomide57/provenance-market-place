/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ipfs.io"],
  },

  remotePatterns: [
    {
      protocol: "https",
      hostname: "ipfs.io",
      port: "",
      pathname: "**",
    },
    {
      protocol: "https",
      hostname: "another-example.com",
      port: "",
      pathname: "**",
    },
  ],
};

export default nextConfig;
