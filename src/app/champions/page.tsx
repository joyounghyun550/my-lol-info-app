import { BASE_URL } from "@/constants/api";
import { Champion } from "@/types/Champion";
import Image from "next/image";
import Link from "next/link";

const ChampionPage = async () => {
  const res = await fetch(`${BASE_URL}/cdn/15.5.1/data/ko_KR/champion.json`, {
    next: {
      revalidate: 86400,
    },
  });

  const data = await res.json();
  const championArray: Champion[] = Object.values(data.data);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">챔피언 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {championArray.map((champion) => (
          <Link
            key={champion.id}
            className="border rounded p-4 hover:shadow-lg relative"
            href={`/champions/${champion.id}`}
          >
            <div className="relative aspect-video w-full bg-gray-200">
              <Image
                className="mx-auto object-cover"
                src={`${BASE_URL}/cdn/img/champion/splash/${champion.id}_1.jpg`}
                alt={champion.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                loading="eager"
              />
            </div>
            <h2 className="mt-2 text-xl font-semibold text-center">{`${champion.name}`}</h2>
            <p className="text-gray-500 text-center">{`${champion.title}`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChampionPage;
