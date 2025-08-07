"use client";

import { useState, FormEvent } from "react";

import { payFromPayfast } from "./action";

export default function PayFastFormPage() {
  // const [token, setToken] = useState("");
  // const [orderDate, setOrderDate] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError("Invalid email");
    }
    if (!/^\d{11}$/.test(mobile)) {
      return setError("Mobile must be 11 digits");
    }

    try {
      const url = await payFromPayfast({
        email,
        mobile,
        txnAmount: 100,
        basketId: "ITEM-001",
      });

      window.location.href = url;
    } catch (e) {
      console.error("detaie of error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          PayFast Checkout{" "}
          {process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"}
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile (11 digits)
            </label>
            <input
              type="tel"
              pattern="\d{11}"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
            disabled={loading}
          >
            {loading ? "loading" : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
