export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          ✅ Payment Successful
        </h1>
        <p className="text-gray-700">
          Thank you! Your transaction has been completed.
        </p>
      </div>
    </div>
  );
}
