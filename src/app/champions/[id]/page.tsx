import { BASE_URL } from "@/constants/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { ChampionDetail } from "@/types/Champion";
import detailBg from "@/public/images/detail-bg-1.jpg";
import { getDetailChampionData } from "@/utils/serverApi";

interface PageProps {
  params: {
    id: string;
  };
}

const ChampionDetail = async ({ params }: PageProps) => {
  const championId = params.id;
  const champion = await getDetailChampionData(championId);

  if (!champion) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        챔피언을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="relative pb-8 md:pb-16">
      {/* 배경 이미지 */}
      <div className="fixed inset-0 z-0">
        <Image
          src={detailBg}
          alt="Champions background"
          fill
          className="object-cover opacity-20"
          loading="eager"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      </div>

      {/* 챔피언 정보 컨테이너 */}
      <div className="relative z-10 flex flex-col pt-4 md:pt-8">
        <div className="container mx-auto px-4">
          {/* 이전 페이지로 돌아가기 버튼 */}
          <div className="mb-4 md:mb-8">
            <Link
              href="/champions"
              className="inline-block text-white font-bold border border-gold px-3 py-1 md:px-4 md:py-2 hover:bg-gold hover:text-black transition-colors text-sm md:text-base"
            >
              ← 챔피언 목록으로 돌아가기
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* 왼쪽 챔피언 정보 */}
            <div className="w-full md:w-1/2 text-white mb-6 md:mb-0">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2 text-center md:text-left">
                {champion.name}
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl uppercase tracking-widest mb-4 md:mb-6 text-center md:text-left">
                {champion.title}
              </h2>

              <div className="mb-6 md:mb-8">
                <div className="text-gold text-lg md:text-xl mb-2 text-center md:text-left">
                  역할
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {champion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gold bg-opacity-20 text-gold px-3 py-1 rounded text-sm md:text-base"
                    >
                      {tag === "Fighter"
                        ? "전사"
                        : tag === "Tank"
                        ? "탱커"
                        : tag === "Mage"
                        ? "마법사"
                        : tag === "Assassin"
                        ? "암살자"
                        : tag === "Marksman"
                        ? "원거리 딜러"
                        : tag === "Support"
                        ? "서포터"
                        : tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 소개 섹션 - 모바일에서는 이미지 아래로 이동 */}
              <div className="mb-6 md:mb-8 hidden md:block">
                <div className="text-gold text-lg md:text-xl mb-2 text-center md:text-left">
                  소개
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  {champion.lore}
                </p>
              </div>
            </div>

            {/* 오른쪽 챔피언 이미지 */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
              <div className="relative w-full aspect-[4/3] max-w-md md:max-w-lg">
                <Image
                  src={`${BASE_URL}/cdn/img/champion/centered/${championId}_1.jpg`}
                  alt={champion.name}
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 모바일에서 소개 섹션 (이미지 아래) */}
          <div className="mb-8 md:hidden">
            <div className="text-gold text-lg md:text-xl mb-2 text-center md:text-left">
              소개
            </div>
            <p className="text-base md:text-lg leading-relaxed text-white">
              {champion.lore}
            </p>
          </div>
        </div>

        {/* 스킬 섹션 */}
        <div className="container mx-auto px-4 py-8 md:py-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-center">
            스킬
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* 패시브 */}
            <div className="bg-black bg-opacity-70 p-4 md:p-6 rounded">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 relative mr-3 md:mr-4 flex-shrink-0">
                  <Image
                    src={`${BASE_URL}/cdn/15.5.1/img/passive/${champion.passive.image.full}`}
                    alt={champion.passive.name}
                    width={64}
                    height={64}
                    className="rounded"
                  />
                </div>
                <div>
                  <div className="text-gold font-bold text-sm md:text-base">
                    패시브
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">
                    {champion.passive.name}
                  </h3>
                </div>
              </div>
              <p className="text-sm md:text-base">
                {champion.passive.description.replace(/<[^>]*>/g, "")}
              </p>
            </div>

            {/* Q, W, E, R 스킬 */}
            {["Q", "W", "E", "R"].map((key, index) => (
              <div
                key={key}
                className="bg-black bg-opacity-70 p-4 md:p-6 rounded"
              >
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 relative mr-3 md:mr-4 flex-shrink-0">
                    <Image
                      src={`${BASE_URL}/cdn/15.5.1/img/spell/${champion.spells[index].image.full}`}
                      alt={champion.spells[index].name}
                      width={64}
                      height={64}
                      className="rounded"
                    />
                  </div>
                  <div>
                    <div className="text-gold font-bold text-sm md:text-base">
                      {key} 스킬
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">
                      {champion.spells[index].name}
                    </h3>
                  </div>
                </div>
                <p className="text-sm md:text-base">
                  {champion.spells[index].description.replace(/<[^>]*>/g, "")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 챔피언 특징 */}
        <div className="container mx-auto px-4 py-8 md:py-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-center">
            챔피언 능력치
          </h2>

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-8">
              <div className="text-center">
                <h3 className="text-gold text-xl md:text-2xl font-bold mb-2">
                  공격력
                </h3>
                <div className="flex justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 md:w-4 md:h-4 mx-1 rounded-full ${
                        i < champion.info.attack ? "bg-gold" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-8">
              <div className="text-center">
                <h3 className="text-gold text-xl md:text-2xl font-bold mb-2">
                  방어력
                </h3>
                <div className="flex justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 md:w-4 md:h-4 mx-1 rounded-full ${
                        i < champion.info.defense ? "bg-gold" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-8">
              <div className="text-center">
                <h3 className="text-gold text-xl md:text-2xl font-bold mb-2">
                  마법
                </h3>
                <div className="flex justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 md:w-4 md:h-4 mx-1 rounded-full ${
                        i < champion.info.magic ? "bg-gold" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-8">
              <div className="text-center">
                <h3 className="text-gold text-xl md:text-2xl font-bold mb-2">
                  난이도
                </h3>
                <div className="flex justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 md:w-4 md:h-4 mx-1 rounded-full ${
                        i < champion.info.difficulty ? "bg-gold" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionDetail;
