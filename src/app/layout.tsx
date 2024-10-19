import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdConfigProvider from "@/lib/providers/antdProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ConditionalNav from "@/lib/providers/conditionalNav";
import ReactQueryWrapper from "@/lib/providers/reactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fetan Eta",
  description: "Fetan Eta next generation lucky",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icons/logo.svg"
          sizes="180x180"
          type="image/svg+xml"
        />
      </head>
      <body className={inter.className}>
        <ReactQueryWrapper>
          <AntdRegistry>
            <AntdConfigProvider>
              <ConditionalNav>{children}</ConditionalNav>
            </AntdConfigProvider>
          </AntdRegistry>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
