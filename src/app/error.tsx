"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-16 text-center">
      <div className="bg-black bg-opacity-70 p-6 md:p-8 rounded-lg max-w-md border border-gold">
        <h2 className="text-2xl md:text-3xl font-bold text-gold mb-4">
          오류가 발생했습니다
        </h2>
        <p className="text-white mb-6">
          {error.message || "페이지를 로드하는 중 문제가 발생했습니다."}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() =>
              startTransition(() => {
                refresh();
                reset();
              })
            }
            className="bg-gold text-black font-bold px-6 py-2 rounded hover:bg-opacity-80 transition-colors"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="border border-gold text-gold font-bold px-6 py-2 rounded hover:bg-gold hover:bg-opacity-20 transition-colors"
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
