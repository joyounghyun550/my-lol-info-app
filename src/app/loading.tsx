export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-16">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      <p className="mt-4 text-lg text-gold font-medium">로딩 중...</p>
      <p className="text-white text-sm mt-2 max-w-xs text-center">
        잠시만 기다려 주세요. 정보를 불러오고 있습니다.
      </p>
    </div>
  );
}
