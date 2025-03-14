import Image from "next/image";
import Link from "next/link";
import lolLogo from "@/public/images/Logo.png";

const Home = () => {
  const features = [
    {
      title: "챔피언 목록",
      description: "다양한 챔피언들의 정보와 능력을 확인하세요.",
      image:
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_6.jpg",
      link: "/champions",
    },
    {
      title: "금주 로테이션",
      description:
        "무료로 플레이할 수 있는 이번 주 챔피언 라인업을 확인하세요.",
      image:
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_3.jpg",
      link: "/rotation",
    },
    {
      title: "아이템 목록",
      description:
        "게임에서 사용 가능한 모든 아이템의 정보와 효과를 살펴보세요.",
      image:
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_7.jpg",
      link: "/items",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 배경 이미지 및 오버레이 */}
      <div className="fixed inset-0 z-0">
        <Image
          src={
            "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_1.jpg"
          }
          alt="Champions background"
          fill
          className="object-cover opacity-20"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      </div>
      <div className="relative h-screen">
        {/* 상단 콘텐츠 */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-4xl">
            <div className="mb-4 opacity-90">
              <Image
                src={lolLogo}
                alt="League of Legends"
                className="mx-auto w-48"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gold-light">
              전설의 여정
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
              세계를 탐험하고 나에게 맞는 챔피언을 발견하세요
            </p>
            {/* 목록 */}
            <div className="py-10 px-4 bg-gradient-to-b">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 text-gold-light">
                  주요 기능
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  {features.map((feature, index) => (
                    <Link
                      key={index}
                      href={feature.link}
                      className="group bg-gray-900 bg-opacity-50 border border-gray-800 rounded-lg overflow-hidden hover:border-gold-light transition-all duration-300 hover:shadow-glow transform hover:-translate-y-1"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-2xl font-bold text-gold-light">
                            {feature.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-300">{feature.description}</p>
                        <div className="mt-4 text-gold flex items-center group-hover:text-gold-light transition-colors">
                          <span>자세히 보기</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
