"use client";

import { useEffect, useState } from "react";

export default function PayFastFormPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    fetch("/api/payfast/token", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setOrderDate(new Date().toISOString().slice(0, 19).replace("T", " "));
        } else {
          setError(data.error || "Failed to get token");
        }
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Getting access token...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <form
      method="POST"
      action="https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction"
    >
      <h1>PayFast Payment Form</h1>

      <label>Currency Code:</label>
      <input name="CURRENCY_CODE" value="PKR" readOnly />
      <br />

      <label>Merchant ID:</label>
      <input name="MERCHANT_ID" value="102" readOnly />
      <br />

      <label>Merchant Name:</label>
      <input name="MERCHANT_NAME" value="UAT Demo Merchant" readOnly />
      <br />

      <label>Token:</label>
      <input name="TOKEN" value={token} readOnly />
      <br />

      <label>Success URL:</label>
      <input name="SUCCESS_URL" value="http://localhost:3000" />
      <br />

      <label>Failure URL:</label>
      <input name="FAILURE_URL" value="http://localhost:3000" />
      <br />

      <label>Checkout URL:</label>
      <input name="CHECKOUT_URL" value="http://localhost:3000" />
      <br />

      <label>Email:</label>
      <input name="CUSTOMER_EMAIL_ADDRESS" value="some-email@example.com" />
      <br />

      <label>Mobile:</label>
      <input name="CUSTOMER_MOBILE_NO" value="00000000000" />
      <br />

      <label>Transaction Amount:</label>
      <input name="TXNAMT" value="100" readOnly />
      <br />

      <label>Basket ID:</label>
      <input name="BASKET_ID" value="ITEM-001" readOnly />
      <br />

      <label>Order Date:</label>
      <input name="ORDER_DATE" value={orderDate} readOnly />
      <br />

      <label>Signature:</label>
      <input name="SIGNATURE" value="SOMERANDOM-STRING" />
      <br />

      <label>Version:</label>
      <input name="VERSION" value="MERCHANTCART-0.1" />
      <br />

      <label>Description:</label>
      <input name="TXNDESC" value="Item Purchased from Cart" />
      <br />

      <label>Proc Code:</label>
      <input name="PROCCODE" value="00" />
      <br />

      <label>Transaction Type:</label>
      <input name="TRAN_TYPE" value="ECOMM_PURCHASE" />
      <br />

      <label>Store ID:</label>
      <input name="STORE_ID" value="102-ZEOJDZS3V" />
      <br />

      <label>Recurring:</label>
      <input name="RECURRING_TXN" value="FALSE" />
      <br />

      <input type="hidden" name="MERCHANT_USERAGENT" value="Mozilla/5.0" />
      <input type="hidden" name="ITEMS[0][SKU]" value="SAMPLE-SKU-01" />
      <input type="hidden" name="ITEMS[0][PRICE]" value="150" />
      <input type="hidden" name="ITEMS[0][QTY]" value="2" />
      <input type="hidden" name="ITEMS[1][SKU]" value="SAMPLE-SKU-02" />
      <input type="hidden" name="ITEMS[1][NAME]" value="Ice Cream" />
      <input type="hidden" name="ITEMS[1][PRICE]" value="45" />
      <input type="hidden" name="ITEMS[1][QTY]" value="5" />

      <br />
      <button type="submit">Pay with PayFast</button>
    </form>
  );
}
