import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Big_Shoulders_Display, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { BASE_ORIGIN } from "@/utilities/constants";
import { generateTags } from "@/utilities/metadata";
import Script from "next/script";

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

function setTheme() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.documentElement.dataset.theme = "dark";
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} bg-slate-950 h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${setTheme.toString()})()`,
          }}
        />
      </head>
      <body className="h-full text-slate-900 dark:text-slate-100">
        <Header className="text-slate-100 sticky top-0" />
        <Container className="min-h-[calc(100%-11rem)] grid relative z-10 p-2 bg-slate-800 dark:bg-slate-900 shadow-2xl shadow-slate-950 rounded-[2rem]">
          {children}
        </Container>
        <Footer className="text-slate-100 sticky bottom-0" />
        <Script id="animate">
          {'document.documentElement.dataset.animate = "true";'}
        </Script>
      </body>
    </html>
  );
}
