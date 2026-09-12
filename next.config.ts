import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/Afwasmachine", destination: "/spuelmaschinen-reparatur-berlin", permanent: true },
      { source: "/Koelkast", destination: "/kuehlschrank-reparatur-berlin", permanent: true },
      { source: "/Herd", destination: "/herd-backofen-reparatur-berlin", permanent: true },
      { source: "/Magnetron", destination: "/herd-backofen-reparatur-berlin", permanent: true },
      { source: "/Koffiezetapparaat", destination: "/kaffeemaschinen-reparatur-berlin", permanent: true },
      { source: "/TV", destination: "/fernseher-reparatur-berlin", permanent: true },
      { source: "/Hifi", destination: "/hifi-reparatur-berlin", permanent: true },
      { source: "/Sprekerstudio", destination: "/hifi-reparatur-berlin", permanent: true },
      { source: "/satellitenanlage", destination: "/satellitenanlagen-service-berlin", permanent: true },
      { source: "/gastronomiegeraete", destination: "/gastronomiegeraete-reparatur-berlin", permanent: true },
      { source: "/trockner", destination: "/waeschetrockner-reparatur-berlin", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/spuelmaschinen-reparatur-berlin", destination: "/Afwasmachine" },
      { source: "/kuehlschrank-reparatur-berlin", destination: "/Koelkast" },
      { source: "/herd-backofen-reparatur-berlin", destination: "/Herd" },
      { source: "/kaffeemaschinen-reparatur-berlin", destination: "/Koffiezetapparaat" },
      { source: "/fernseher-reparatur-berlin", destination: "/TV" },
      { source: "/hifi-reparatur-berlin", destination: "/Hifi" },
      { source: "/satellitenanlagen-service-berlin", destination: "/satellitenanlage" },
      { source: "/gastronomiegeraete-reparatur-berlin", destination: "/gastronomiegeraete" },
      { source: "/waeschetrockner-reparatur-berlin", destination: "/trockner" },
    ];
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;

