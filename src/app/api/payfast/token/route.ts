import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  const merchantId = process.env.PAYFAST_MERCHANT_ID!;
  const securedKey = process.env.PAYFAST_SECURED_KEY!;
  const basketId = "ITEM-001";
  const txnAmount = "100";

  const params = new URLSearchParams({
    MERCHANT_ID: merchantId,
    SECURED_KEY: securedKey,
    TXNAMT: txnAmount,
    BASKET_ID: basketId,
  });

  try {
    const response = await fetch(
      "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Next.js Server",
        },
        body: params.toString(),
      }
    );

    const data = await response.json();

    if (data.ACCESS_TOKEN) {
      return NextResponse.json({ token: data.ACCESS_TOKEN });
    } else {
      return NextResponse.json({ error: "No token received" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
