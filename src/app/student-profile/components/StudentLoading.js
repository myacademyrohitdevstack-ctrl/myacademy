"use client";

export default function StudentLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />

        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Loading your dashboard...
          </h2>

          <p className="text-gray-500 mt-1">
            Please wait while we prepare your data.
          </p>
        </div>
      </div>
    </div>
  );
}