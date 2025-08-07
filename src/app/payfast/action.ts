"use server";

import PayFast, { ITransactionDetails } from "@/utils/PayFastClient";

export async function payFromPayfast(details: ITransactionDetails) {
  const payfast = new PayFast({
    merchantName: "UAT Demo Merchant",
    storeId: process.env.PAYFAST_STORE_ID!,
  });

  const res = await payfast.createTransaction(details);

  console.log("Response", res);
  return res;
}
