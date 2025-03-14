"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isWithoutHeaderComponent = pathname.includes("champions/");

  if (isWithoutHeaderComponent) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="relative z-50 bg-black text-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gold">
                LoL Champions
              </a>
            </div>
            <div>
              <ul className="flex space-x-6">
                <li>
                  <Link
                    href={"/"}
                    className="hover:text-gold transition-colors"
                  >
                    홈
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/champions"}
                    className="hover:text-gold transition-colors"
                  >
                    챔피언
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/items"}
                    className="hover:text-gold transition-colors"
                  >
                    아이템
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/rotation"}
                    className="hover:text-gold transition-colors"
                  >
                    로테이션
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <main className="relative z-10 min-h-screen">{children}</main>
      <footer className="relative z-50 bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-gold mb-4">
                League of Legends
              </h3>
              <p className="text-gray-400">
                © 2025 Riot Games, Inc. League of Legends와 모든 관련 로고,
                캐릭터, 이름 및 고유 콘텐츠는 Riot Games, Inc.의 상표, 서비스
                마크 및 저작권입니다.
                <span className="text-gray-500 text-sm mt-2">
                  이 사이트는 Riot Games와 공식적으로 연결되어 있지 않습니다.
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Wrapper;
