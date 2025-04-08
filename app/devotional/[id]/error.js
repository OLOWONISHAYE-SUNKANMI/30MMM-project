// app/Foundation/[id]/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <p className="mb-4 text-red-500">{error.message}</p>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}

