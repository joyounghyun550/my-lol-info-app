import type { Metadata } from "next";
import "@/styles/globals.css";
import Wrapper from "@/components/Wrapper";
import Providers from "@/providers/RQProviders";

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
        <Providers>
          <Wrapper>{children}</Wrapper>
        </Providers>
      </body>
    </html>
  );
}
