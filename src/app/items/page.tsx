import { BASE_URL } from "@/constants/api";
import Image from "next/image";
import itemsBg from "@/public/images/item-bg.jpg"; // You'll need to add this image
import { fetchItemList } from "@/utils/serverApi";

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
          src={itemsBg} // 리그 오브 레전드 아이템 테마 배경 이미지
          alt="Items background"
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
            아이템
          </h1>
          <p className="text-base md:text-xl max-w-3xl mx-auto">
            전투에서 승리하기 위한 다양한 아이템들을 살펴보세요. <br /> 당신의
            챔피언을 강화시킬 수 있는 아이템이 준비되어 있습니다.
          </p>
        </div>

        {/* 아이템 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {uniqueItems.map((item) => (
            <div
              key={item.image.full}
              className="group bg-gray-900 bg-opacity-70 border border-gray-800 rounded-lg overflow-hidden hover:border-gold-light transition duration-300 transform hover:scale-105 hover:shadow-glow"
            >
              <div className="p-4 relative">
                {/* 아이템 이미지 배경 효과 */}
                <div className="relative w-full aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-radial from-gold-light to-transparent opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative h-10 w-16 mx-auto">
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
                <h2 className="text-center font-semibold text-gold-light mb-1 group-hover:text-gold transition-colors">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-400 text-center h-auto overflow-hidden">
                  {item.plaintext}
                </p>
                <p className="text-sm text-gray-300 text-center">
                  {item.gold && `${item.gold.total} 골드`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
