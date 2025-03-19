/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RIOT_API_KEY: process.env.RIOT_API_KEY,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/src/public/images/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ddragon.leagueoflegends.com",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
