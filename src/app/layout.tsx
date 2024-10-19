import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdConfigProvider from "@/lib/providers/antdProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ConditionalNav from "@/lib/providers/conditionalNav";
import ReactQueryWrapper from "@/lib/providers/reactQueryProvider";
import { ThemeProvider } from "next-themes";

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
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <ReactQueryWrapper>
            <AntdRegistry>
              <AntdConfigProvider>
                <ConditionalNav>{children}</ConditionalNav>
              </AntdConfigProvider>
            </AntdRegistry>
          </ReactQueryWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
