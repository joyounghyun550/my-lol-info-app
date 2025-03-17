"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/constants/api";
import { Champion } from "@/types/Champion";

interface ChampionsListProps {
  initialChampions: Champion[];
}

const ChampionsList: React.FC<ChampionsListProps> = ({ initialChampions }) => {
  const [displayedChampions, setDisplayedChampions] = useState<Champion[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const itemsPerPage: number = 20;

  // 초기 데이터 로드
  useEffect(() => {
    setDisplayedChampions(initialChampions.slice(0, itemsPerPage));
  }, [initialChampions]);

  // Intersection Observer를 이용한 무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading) {
          loadMoreChampions();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, page, initialChampions]);

  // 더 많은 챔피언 로드
  const loadMoreChampions = (): void => {
    if (page * itemsPerPage >= initialChampions.length) return;

    setLoading(true);

    // 다음 페이지 데이터 로드 (지연 시간 추가로 로딩 시각화)
    setTimeout(() => {
      const nextPage = page + 1;
      const nextChampions = initialChampions.slice(0, nextPage * itemsPerPage);

      setDisplayedChampions(nextChampions);
      setPage(nextPage);
      setLoading(false);
    }, 500); // 500ms 지연으로 로딩 효과
  };

  return (
    <>
      {/* 챔피언 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedChampions.map((champion) => (
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
                  loading="lazy"
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

      {/* 로딩 인디케이터 */}
      {loading ? (
        <div className="text-center mt-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gold">더 불러오는 중...</p>
        </div>
      ) : (
        displayedChampions.length < initialChampions.length && (
          <div ref={loadMoreRef} className="text-center mt-8 pb-8 h-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-gold">로딩 중...</p>
          </div>
        )
      )}
    </>
  );
};

export default ChampionsList;
