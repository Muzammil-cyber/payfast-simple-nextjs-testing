export default function FailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold text-red-700 mb-2">
          ❌ Payment Failed
        </h1>
        <p className="text-gray-700">Something went wrong. Please try again.</p>
      </div>
    </div>
  );
}
