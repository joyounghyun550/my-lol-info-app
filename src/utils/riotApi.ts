import { ChampionRotations } from "@/types/ChampionRotation";

/**
 * Tanstack Query와 함께 사용할 챔피언 로테이션 데이터를 가져오는 함수
 * @returns 챔피언 로테이션 데이터
 * @throws 데이터 페칭 중 발생한 에러
 */
export const getChampionRotation = async (): Promise<ChampionRotations> => {
  const response = await fetch("/api/rotation");

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText ||
        `로테이션 데이터를 가져오는데 실패했습니다: ${response.status}`
    );
  }

  return response.json();
};
