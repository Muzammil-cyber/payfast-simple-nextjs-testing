export interface ITransactionDetails {
  email: string;
  mobile: string;
  txnAmount: number;
  txndesc?: string;
  basketId: string;
}

export default class PayFast {
  private readonly merchantId = process.env.PAYFAST_MERCHANT_ID!;
  private readonly securedKey = process.env.PAYFAST_SECURED_KEY!;
  private readonly apiUrl =
    "https://ipguat.apps.net.pk/Ecommerce/api/Transaction";
  private readonly baseUrl =
    process.env.NEXT_PUBLIC_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:5000/";
  private merchantName: string;
  private storeId: string;

  constructor(config: { merchantName: string; storeId: string }) {
    this.merchantName = config.merchantName;
    this.storeId = config.storeId;
  }

  private async getAccessToken(config: {
    txnAmount: number;
    basketId: string;
  }): Promise<string> {
    const params = new URLSearchParams({
      MERCHANT_ID: this.merchantId,
      SECURED_KEY: this.securedKey,
      TXNAMT: config.txnAmount.toString(),
      BASKET_ID: config.basketId,
    });

    try {
      const response = await fetch(`${this.apiUrl}/GetAccessToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Next.js Server",
        },
        body: params.toString(),
      });

      const data = await response.json();

      if (!data.ACCESS_TOKEN) {
        throw new Error("No token received");
      }

      return data.ACCESS_TOKEN;
    } catch (error) {
      console.error("Error fetching Token", error);
      throw new Error("Error fetching Token");
    }
  }

  async createTransaction(details: ITransactionDetails) {
    const token = await this.getAccessToken(details);

    const orderDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      // const form = document.createElement("form");
      // form.method = "POST";
      // form.action = `${this.apiUrl}/PostTransaction`;

      const fields = {
        CURRENCY_CODE: "PKR",
        MERCHANT_ID: this.merchantId,
        MERCHANT_NAME: this.merchantName,
        TOKEN: token,
        SUCCESS_URL: `${this.baseUrl}/payfast/success`,
        FAILURE_URL: `${this.baseUrl}/payfast/failure`,
        CHECKOUT_URL: `${this.baseUrl}payfast`,
        CUSTOMER_EMAIL_ADDRESS: details.email,
        CUSTOMER_MOBILE_NO: details.mobile,
        TXNAMT: details.txnAmount.toString(),
        BASKET_ID: details.basketId,
        ORDER_DATE: orderDate,
        SIGNATURE: "SOMERANDOM-STRING",
        VERSION: "MERCHANTCART-0.1",
        TXNDESC: details.txndesc ?? "Item Purchased from Cart",
        PROCCODE: "00",
        TRAN_TYPE: "ECOMM_PURCHASE",
        STORE_ID: this.storeId,
        RECURRING_TXN: "FALSE",
      };

      const redirectUrl = `/payfast/redirect?fields=${encodeURIComponent(
        JSON.stringify(fields)
      )}`;

      // console.log("json", encodeURIComponent(JSON.parse(fields));

      console.log("re", redirectUrl);

      return redirectUrl;

      return "SUCCESS";
    } catch (e) {
      console.log("Error with from", e);
      throw new Error("Error with from");
    }
  }
}
