import "../globals.css";
import "./home.css";
import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { BASE_ORIGIN } from "@/utilities/constants";
import { generateTags } from "@/utilities/metadata";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-serif",
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

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} home`}>
      <body>{children}</body>
    </html>
  );
}
