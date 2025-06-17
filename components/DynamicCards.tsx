import { getRecentlyPlayed } from "@/utilities/spotify";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { getWeather } from "@/utilities/weather";
import { BentoItem } from "@/components/BentoItem";
import { Heading2, Paragraph } from "@/mdx-components";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

export async function DynamicCards() {
  const [recentlyPlayedSong, weather] = await Promise.all([
    getRecentlyPlayed(),
    getWeather(),
  ]);

  return (
    <>
      <BentoItem className="h-72 order-2 col-span-6 md:col-span-4 bg-slate-800">
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <Image
            alt=""
            priority
            unoptimized
            sizes="(min-width: 768px) 33.3333vw, 50vw"
            src={recentlyPlayedSong.albumImage.url}
            height={recentlyPlayedSong.albumImage.height}
            width={recentlyPlayedSong.albumImage.width}
            className="w-full h-full object-cover blur-2xl scale-125 saturate-200 brightness-125 dark:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80" />
        </div>
        <div className="z-10 flex flex-col justify-end text-white">
          <Heading2
            className={twMerge(
              "font-bold tracking-wide text-3xl/tight",
              recentlyPlayedSong.name.length < 20 && "md:text-4xl/tight"
            )}
          >
            <Link
              href={recentlyPlayedSong.url}
              target="_blank"
              className="line-clamp-2"
            >
              {recentlyPlayedSong.name}
              <span className="absolute inset-0" />
            </Link>
          </Heading2>
          <Paragraph className="leading-7 line-clamp-2">
            <SpeakerWaveIcon
              className="inline-block h-6 w-6 -mt-1 mr-3 align-middle"
              aria-hidden="true"
            />
            {recentlyPlayedSong.artist}
          </Paragraph>
        </div>
      </BentoItem>
      <BentoItem
        className={twMerge(
          "h-72 order-2 col-span-6 md:col-span-4 bg-gray-300 dark:bg-gray-700",
          weather.background
        )}
      >
        <Image
          alt=""
          src={weather.icon}
          height={128}
          width={128}
          className={twMerge(
            "justify-self-start self-end w-48 -mt-8 -mb-12 sm:-mx-8 sm:-mt-12 sm:-mb-16 hue-rotate-[10deg] brightness-200 saturate-150 drop-shadow-lg",
            // Invert snow icon
            weather.icon.includes("/wn/13") && "brightness-0 invert"
          )}
          unoptimized
        />
        <Heading2
          className={twMerge(
            "text-3xl/tight md:text-4xl/tight",
            weather.icon.includes("n@") && "font-bold tracking-wide"
          )}
        >
          {weather.description}
        </Heading2>
        <Paragraph>Warrington, UK</Paragraph>
      </BentoItem>
    </>
  );
}
