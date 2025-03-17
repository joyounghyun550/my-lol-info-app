"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { refresh } = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{error.message}</h2>
      <button
        onClick={() =>
          startTransition(() => {
            refresh();
            reset();
          })
        }
      >
        Try again
      </button>
    </div>
  );
}
