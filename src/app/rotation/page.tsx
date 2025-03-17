"use client";

import { BASE_URL } from "@/constants/api";
import { Champion } from "@/types/Champion";
import { getChampionRotation } from "@/utils/riotApi";
import { getChampions } from "@/utils/serverApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import rotationBg from "@/public/images/rotation-bg.jpg";

const RotationPage = () => {
  // 챔피언 로테이션 데이터 가져오기
  const {
    data: rotationData,
    isLoading: isRotationLoading,
    error: rotationError,
  } = useQuery({
    queryKey: ["rotation"],
    queryFn: getChampionRotation,
    staleTime: 1000 * 60 * 60, // 1시간 동안 데이터를 신선하게 유지
  });

  // 모든 챔피언 데이터 가져오기
  const {
    data: championArray,
    isLoading: isChampionsLoading,
    error: championError,
  } = useQuery({
    queryKey: ["champions"],
    queryFn: async () => {
      const { championArray } = await getChampions();
      return championArray;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 데이터를 신선하게 유지
  });

  // 로딩 중 상태 표시
  if (isRotationLoading || isChampionsLoading) {
    return (
      <div className="text-center mt-8 pb-8 h-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-gold">로딩 중...</p>
      </div>
    );
  }

  // 에러 처리
  if (rotationError || championError) {
    return (
      <div className="text-center mt-8 pb-8">
        <p className="text-red-500 font-bold">
          데이터를 가져오는 중 오류가 발생했습니다.
        </p>
        <p className="mt-2 text-gray-400">
          {rotationError instanceof Error ? rotationError.message : ""}
          {championError instanceof Error ? championError.message : ""}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-gold text-black rounded hover:bg-gold-light"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 데이터 없음 처리
  if (!rotationData || !championArray) {
    return (
      <div className="text-center mt-8 pb-8">
        <p className="text-red-500 font-bold">데이터를 찾을 수 없습니다.</p>
        <button
          className="mt-4 px-4 py-2 bg-gold text-black rounded hover:bg-gold-light"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 현재 로테이션 챔피언만 필터링
  const filteredChampions = championArray.filter((champion: Champion) =>
    rotationData.freeChampionIds.includes(parseInt(champion.key))
  );

  return (
    <div className="min-h-screen bg-black text-white py-16">
      {/* 배경 이미지 및 오버레이 */}
      <div className="fixed inset-0 z-0">
        <Image
          src={rotationBg}
          alt="Champions background"
          fill
          className="object-cover opacity-20"
          loading="eager"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gold-light">
            로테이션
          </h1>
          <p className="text-base md:text-xl max-w-3xl mx-auto">
            매 주 화요일 로테이션으로 {filteredChampions.length}명의 챔피언들이
            무료로 제공됩니다.
          </p>
        </div>

        {/* 챔피언 그리드 */}
        {filteredChampions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredChampions.map((champion) => (
              <Link
                key={champion.id}
                href={`/champions/${champion.id}`}
                className="group transform transition duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg">
                  {/* 챔피언 이미지 */}
                  <div className="relative aspect-video w-full bg-gray-200">
                    <Image
                      className="mx-auto object-cover"
                      src={`${BASE_URL}/cdn/img/champion/splash/${champion.id}_1.jpg`}
                      alt={champion.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  </div>

                  {/* 챔피언 정보 */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-lg font-bold text-white">
                      {champion.name}
                    </h2>
                    <p className="text-sm text-gold truncate">
                      {champion.title}
                    </p>
                  </div>

                  {/* 호버 효과 */}
                  <div className="absolute inset-0 bg-gold bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20 pointer-events-none"></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-gold">
              현재 로테이션 챔피언이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RotationPage;
