import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Greg Ives",
    default: "Greg Ives",
  },
  description:
    "Greg Ives is a software engineer, currently leading the development of Myles Wellbeing.",
};

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
      <body className="h-full flex flex-col">
        <div className="focus-ignore" tabIndex={0} />
        <Header className="text-slate-100 sticky top-0" />
        <div className="focus-ignore" tabIndex={0} />
        <Container className="w-full relative p-2 z-10 flex-grow bg-slate-800 rounded-[2rem]">
          {children}
        </Container>
        <div className="focus-ignore" tabIndex={0} />
        <Footer className="text-slate-100 sticky bottom-0" />
        <div className="focus-ignore" tabIndex={0} />
      </body>
    </html>
  );
}
