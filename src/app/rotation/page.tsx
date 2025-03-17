"use client";

import { BASE_URL } from "@/constants/api";
import { Champion } from "@/types/Champion";
import { ChampionRotations } from "@/types/ChampionRotation";
import { getChampions } from "@/utils/serverApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import rotationBg from "@/public/images/rotation-bg.jpg";

const RotationPage = () => {
  const { data: rotationData, isLoading: isRotationLoading } = useQuery({
    queryKey: ["rotation"],
    queryFn: async () => {
      const res = await fetch(
        `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch rotation data");
      }
      return res.json() as Promise<ChampionRotations>;
    },
  });

  const { data: championArray, isLoading: isChampionsLoading } = useQuery({
    queryKey: ["champions"],
    queryFn: async () => {
      const { championArray } = await getChampions();
      return championArray;
    },
  });

  if (isRotationLoading || isChampionsLoading) {
    return <div>Loading...</div>;
  }

  if (!rotationData || !championArray) {
    return <div>Error loading data</div>;
  }

  const filteredChampions = championArray.filter((champion: Champion) =>
    rotationData.freeChampionIds.includes(parseInt(champion.key))
  );

  console.log(filteredChampions);

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
            매 주 화요일 로테이션으로 20명의 챔피언들이 무료로 제공됩니다.
          </p>
        </div>

        {/* 챔피언 그리드 */}
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
                  <p className="text-sm text-gold truncate">{champion.title}</p>
                </div>

                {/* 호버 효과 */}
                <div className="absolute inset-0 bg-gold bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotationPage;
