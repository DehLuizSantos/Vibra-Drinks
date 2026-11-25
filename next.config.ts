import type { NextConfig } from "next";

/** Domínio público do bucket R2 (ex.: https://pub-xxxx.r2.dev), liberado para o next/image. */
function r2RemotePattern() {
  const publicUrl = process.env.R2_PUBLIC_URL;
  if (!publicUrl) return [];
  const { protocol, hostname } = new URL(publicUrl);
  return [
    {
      protocol: protocol.replace(":", "") as "http" | "https",
      hostname,
      pathname: "/eventos/**"
    }
  ];
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: r2RemotePattern()
  }
};

export default nextConfig;
