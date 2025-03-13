import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "리그 오브 레전드 정보 앱",
  description: "리그 오브 레전드의 정보를 찾아 볼 수 있는 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased py-[100px]`}
      >
        <header className="bg-gray-800 text-white py-4 fixed top-0 w-full z-10">
          <nav className="container mx-auto flex justify-around">
            <Link href={"/"}>홈</Link>
            <Link href={"/champions"}>챔피언 목록</Link>
            <Link href={"/items"}>아이템 목록</Link>
            <Link href={"/rotation"}>챔피언 로테이션</Link>
          </nav>
        </header>
        <main className="container mx-auto mt-10">{children}</main>
        <footer className="bg-gray-800 p-4 mt-8 fixed bottom-0 w-full">
          <div className="container mx-auto text-center text-white text-sm">
            [리그 오브 레전드 정보 앱]은 Riot Games에서 보증하지 않으며 Riot
            Games 또는 Riot Games 자산을 제작하거나 관리하는 데 공식적으로
            관여한 사람의 견해나 의견을 반영하지 않습니다. Riot Games 및 모든
            관련 자산은 Riot Games, Inc.의 상표 또는 등록 상표입니다.
          </div>
        </footer>
      </body>
    </html>
  );
}
