import { BASE_URL } from "@/constants/api";
import Image from "next/image";
import itemsBg from "@/public/images/item-bg.jpg";
import { fetchItemList } from "@/utils/serverApi";

export const generateMetadata = async () => {
  return {
    title: "아이템 페이지 - My Riot App",
    description: "리그 오브 레전드 아이템 목록",
  };
};

const ItemsPage = async () => {
  const itemsArray = await fetchItemList();
  const itemFiltering = itemsArray.filter((item) => {
    return item.plaintext !== "" && item.inStore !== false;
  });

  // 중복된 name 제거
  const uniqueItems = Array.from(
    new Map(itemFiltering.map((item) => [item.name, item])).values()
  );

  return (
    <div className="min-h-screen bg-black text-white py-16">
      {/* 배경 이미지 및 오버레이 */}
      <div className="fixed inset-0 z-0">
        <Image
          src={itemsBg}
          alt="Items background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gold-light">
            아이템
          </h1>
          <p className="text-base md:text-xl max-w-3xl mx-auto">
            전투에서 승리하기 위한 다양한 아이템들을 살펴보세요.
            <br />
            당신의 챔피언을 강화 할 수 있는 아이템이 준비되어 있습니다.
          </p>
        </div>

        {/* 아이템 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
          {uniqueItems.map((item) => (
            <div
              key={item.image.full}
              className="group bg-gray-900 bg-opacity-70 border border-gray-800 rounded-lg overflow-hidden hover:border-gold-light transition duration-300 transform hover:scale-105 hover:shadow-glow"
            >
              <div className="p-2 sm:p-3 md:p-4 flex flex-col items-center">
                {/* 아이템 이미지 컨테이너 */}
                <div className="relative w-full mb-2 flex justify-center">
                  <div className="absolute inset-0 bg-gradient-radial from-gold-light to-transparent opacity-10 group-hover:opacity-20 transition-opacity rounded-full"></div>
                  <div className="h-16 w-16 flex items-center justify-center">
                    <Image
                      src={`${BASE_URL}/cdn/15.5.1/img/item/${item.image.full}`}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* 아이템 정보 */}
                <div className="flex flex-col w-full text-center gap-2 mt-2">
                  <h2 className="font-semibold text-xs sm:text-sm text-gold-light group-hover:text-gold transition-colors line-clamp-1">
                    {item.name}
                  </h2>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {item.plaintext}
                  </p>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-300 mt-1">
                      {`구매골드: ${item.gold.total}`}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      {`판매골드: ${item.gold.sell}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
