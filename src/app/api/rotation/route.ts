import { NextResponse } from "next/server";
import { ChampionRotations } from "@/types/ChampionRotation";

export async function GET() {
  try {
    // 환경 변수에서 API 키 가져오기
    const apiKey = process.env.NEXT_PUBLIC_RIOT_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Riot API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // Riot Games API 호출
    const response = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
        cache: "no-store", // 캐시 사용 안함
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return NextResponse.json(
        {
          error: "로테이션 데이터를 가져오는데 실패했습니다.",
          details: errorData,
        },
        { status: response.status }
      );
    }

    // 데이터 변환 및 응답
    const data = (await response.json()) as ChampionRotations;

    return NextResponse.json(data);
  } catch (error) {
    console.error("챔피언 로테이션 API 에러:", error);

    return NextResponse.json(
      {
        error: "서버 내부 오류가 발생했습니다.",
        message: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}
