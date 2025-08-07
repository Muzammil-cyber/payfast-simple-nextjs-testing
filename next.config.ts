import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PAYFAST_MERCHANT_ID: process.env.PAYFAST_MERCHANT_ID,
    PAYFAST_SECURED_KEY: process.env.PAYFAST_SECURED_KEY,
    PAYFAST_STORE_ID: process.env.PAYFAST_STORE_ID,
  },
};

export default nextConfig;
