"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-100">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="mb-4">{error.message}</p>
      <button onClick={() => reset()} className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600">
        Try again
      </button>
    </div>
  );
}
