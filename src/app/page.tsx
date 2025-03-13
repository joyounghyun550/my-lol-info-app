import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">리그 오브 레전드 정보 앱</h1>
        <p className="mt-4 text-gray-500">
          Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.
        </p>
      </div>
      <div className="mt-[40px] flex flex-col justify-center gap-10">
        <div className="flex flex-col justify-center gap-10">
          <Link
            className="flex flex-col justify-center items-center gap-5 text-amber-400"
            href={"/champions"}
          >
            <Image
              src={
                "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_6.jpg"
              }
              alt="챔피언 목록 확인"
              width={500}
              height={500}
            />
            챔피언 목록 보기
          </Link>
          <Link
            className="flex flex-col justify-center items-center gap-5 text-amber-400"
            href={"/rotation"}
          >
            <Image
              src={
                "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_3.jpg"
              }
              alt="금주 로테이션 확인"
              width={500}
              height={500}
            />
            금주 로테이션 확인
          </Link>
          <Link
            className="flex flex-col justify-center items-center gap-5 text-amber-400"
            href={"/items"}
          >
            <Image
              src={
                "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_7.jpg"
              }
              alt="금주 로테이션 확인"
              width={500}
              height={500}
            />
            아이템 목록 보기
          </Link>
        </div>
      </div>
    </>
  );
}
