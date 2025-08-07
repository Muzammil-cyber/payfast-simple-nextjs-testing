import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PAYFAST_MERCHANT_ID: process.env.PAYFAST_MERCHANT_ID,
    PAYFAST_SECURED_KEY: process.env.PAYFAST_SECURED_KEY,
  },
};

export default nextConfig;
