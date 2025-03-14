import { BASE_URL } from "@/constants/api";
import { ChampionDetail } from "@/types/Champion";

// 챔피언 데이터 가져오기 함수
export async function getChampionData(
  championId: string
): Promise<ChampionDetail | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/cdn/15.5.1/data/ko_KR/champion/${championId}.json`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data[championId] as ChampionDetail;
  } catch (error) {
    console.error("챔피언 데이터를 가져오는 중 오류 발생:", error);
    return null;
  }
}

// export async function fetchItemList(): Promise<Item[]> {
//   const res = await fetch(`${BASE_URL}/cdn/15.5.1/data/ko_KR/item.json`, {
//     cache: "force-cache",
//   });

//   const data = await res.json();

//   return data.data;
// }
