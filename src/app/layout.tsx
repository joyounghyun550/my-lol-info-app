import type { Metadata } from "next";
import "./globals.css";
import Wrapper from "@/components/Wrapper";

export const metadata: Metadata = {
  title: "League of Legends Champions",
  description: "League of Legends 챔피언 정보 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
