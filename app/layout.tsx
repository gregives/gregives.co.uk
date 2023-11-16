import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Big_Shoulders_Display, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { BASE_ORIGIN } from "@/utilities/constants";
import { generateTags } from "@/utilities/metadata";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const title = "Greg Ives";
const description =
  "Greg Ives is a software engineer, currently leading the development of Myles Wellbeing.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_ORIGIN),
  ...generateTags({
    url: "/",
    title,
    description,
  }),
  title: {
    template: `%s | ${title}`,
    default: title,
  },
};

const css = String.raw;

const noscript = css`
  .bento-item {
    opacity: 1 !important;
    transform: none !important;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} bg-slate-950 h-full`}
    >
      <head>
        <noscript>
          <style>{noscript}</style>
        </noscript>
      </head>
      <body className="h-full flex flex-col text-slate-900 dark:text-slate-100">
        <div className="focus-ignore" tabIndex={0} />
        <Header className="text-slate-100 sticky top-0" />
        <div className="focus-ignore" tabIndex={0} />
        <Container className="w-full relative p-2 z-10 flex-grow bg-slate-800 dark:bg-slate-900 rounded-[2rem]">
          {children}
        </Container>
        <div className="focus-ignore" tabIndex={0} />
        <Footer className="text-slate-100 sticky bottom-0" />
        <div className="focus-ignore" tabIndex={0} />
      </body>
    </html>
  );
}
