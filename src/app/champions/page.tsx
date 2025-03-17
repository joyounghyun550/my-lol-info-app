import Image from "next/image";
import championBg from "@/public/images/champions-bg.jpg";
import { getChampions } from "@/utils/serverApi";
import ChampionsList from "@/components/ChampionsList";

export const generateMetadata = async () => {
  return {
    title: "챔피언 페이지 - My Riot App",
    description: "리그 오브 레전드 챔피언 목록",
  };
};

const ChampionsPage = async () => {
  const { championArray } = await getChampions();

  return (
    <div className="min-h-screen bg-black text-white py-16">
      {/* 배경 이미지 및 오버레이 */}
      <div className="fixed inset-0 z-0">
        <Image
          src={championBg}
          alt="Champions background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gold-light">
            챔피언
          </h1>
          <p className="text-base md:text-xl max-w-3xl mx-auto">
            다양한 챔피언들 중에서 당신의 플레이 스타일에 맞는 챔피언을
            찾아보세요. <br />
            투사, 암살자, 마법사, 서포터 등 80개 이상의 챔피언이 있습니다.
          </p>
        </div>

        {/* 클라이언트 컴포넌트로 무한 스크롤 구현 */}
        <ChampionsList initialChampions={championArray} />
      </div>
    </div>
  );
};

export default ChampionsPage;
