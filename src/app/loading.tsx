export default function Loading() {
  return (
    <>
      <div className="text-center mt-8 pb-8 h-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-gold">로딩 중...</p>
      </div>
    </>
  );
}
