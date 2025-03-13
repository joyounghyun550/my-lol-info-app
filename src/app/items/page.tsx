import { BASE_URL } from "@/constants/api";
import { Item } from "@/types/Item";
import Image from "next/image";

const ItemsPage = async () => {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/15.5.1/data/ko_KR/item.json",
    {
      cache: "force-cache",
    }
  );

  const data = await res.json();
  const itemsArray: Item[] = Object.values(data.data);
  const itemFiltering = itemsArray.filter((item) => {
    return item.plaintext !== "" && item.inStore !== false;
  });

  // 중복된 name 제거
  const uniqueItems = Array.from(
    new Map(itemFiltering.map((item) => [item.name, item])).values()
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">아이템 목록</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {uniqueItems.map((item) => (
          <div
            key={item.image.full}
            className="border rounded p-4 hover:shadow-lg"
          >
            <Image
              src={`${BASE_URL}/cdn/15.5.1/img/item/${item.image.full}`}
              alt={item.name}
              className="mx-auto"
              width={100}
              height={100}
            />
            <h2 className="mt-2 text-xl font-semibold text-center">
              {item.name}
            </h2>
            <p className="text-gray-500 text-center">{item.plaintext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;
