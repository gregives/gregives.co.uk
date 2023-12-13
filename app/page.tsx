import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown, loadMarkdownDirectory } from "@/utilities/markdown";
import { Heading2, Paragraph } from "@/mdx-components";
import Link from "next/link";
import { Headshots } from "@/components/Headshots";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ArticlePreview } from "@/components/ArticlePreview";
import { getRecentlyPlayed } from "@/utilities/spotify";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { getWeather } from "@/utilities/weather";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

export default async function Home() {
  const [
    { Content },
    { metadata: mylesWellbeing },
    { metadata: poetryTips },
    { metadata: recommendDomains },
    articles,
    recentlyPlayedSong,
    weather,
  ] = await Promise.all([
    loadMarkdown("/index"),
    loadMarkdown("/projects/myles-wellbeing"),
    loadMarkdown("/projects/poetry-tips"),
    loadMarkdown("/projects/recommend-domains"),
    loadMarkdownDirectory("/blog"),
    getRecentlyPlayed(),
    getWeather(),
  ]);

  const latestArticles = articles.slice(0, 3);

  return (
    <main>
      <BentoGrid>
        <BentoItem className="order-1 sm:order-2 sm:col-span-6 md:col-span-4 overflow-hidden bg-blue-200 sm:bg-blue-300 dark:bg-blue-900 max-sm:before:opacity-50">
          <div className="relative max-sm:overflow-hidden">
            <Headshots />
            <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-transparent from-60% to-blue-200 sm:to-blue-300 dark:to-blue-900" />
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Content />
          </div>
        </BentoItem>
        <BentoItem className="hidden sm:flex order-2 sm:order-1 sm:col-span-6 md:col-span-8 bg-blue-100 dark:bg-blue-950 before:opacity-50">
          <div className="max-w-2xl pt-8">
            <Content />
          </div>
        </BentoItem>
        <BentoItem className="order-2 col-span-6 md:col-span-4 bg-slate-800">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              decoding="async"
              sizes="(min-width: 768px) 33.3333vw, 50vw"
              srcSet={recentlyPlayedSong.albumImages
                .map((image) => `${image.url} ${image.width}w`)
                .join(", ")}
              src={recentlyPlayedSong.albumImages[0].url}
              className="w-full h-full object-cover blur-lg scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80" />
          </div>
          <div className="z-10 flex flex-col justify-end text-white">
            <Heading2
              className={twMerge(
                "font-bold tracking-wide text-3xl/tight line-clamp-3",
                recentlyPlayedSong.name.length < 20 && "md:text-4xl/tight"
              )}
            >
              <Link href={recentlyPlayedSong.url} target="_blank">
                {recentlyPlayedSong.name}
                <span className="absolute inset-0" />
              </Link>
            </Heading2>
            <Paragraph className="leading-7 line-clamp-3">
              <SpeakerWaveIcon
                className="inline-block h-6 w-6 -mt-1 mr-3 align-middle"
                aria-hidden="true"
              />
              {recentlyPlayedSong.artists.join(", ")}
            </Paragraph>
          </div>
        </BentoItem>
        <BentoItem
          className={twMerge(
            "order-2 col-span-6 md:col-span-4 bg-gray-300 dark:bg-gray-700",
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
          <Paragraph>Nottingham, UK</Paragraph>
        </BentoItem>
        <BentoItem className="order-2 hidden md:flex md:col-span-4 bg-fuchsia-200 dark:bg-fuchsia-900">
          <div />
          <Heading2 className="-skew-y-6 origin-left">
            What&rsquo;s up?
          </Heading2>
          <Paragraph>The opposite of down.</Paragraph>
        </BentoItem>
        <FeaturedProjects
          mylesWellbeing={mylesWellbeing}
          poetryTips={poetryTips}
          recommendDomains={recommendDomains}
        />
        <div className="order-6 col-span-full flex flex-wrap justify-stretch text-center -m-1">
          <BentoItem className="order-2 md:order-1 m-1 flex-1 relative items-center bg-blue-300 dark:bg-blue-500">
            <Heading2 link className="text-3xl/tight sm:text-4xl/tight">
              <Link href="https://twitter.com/gregiv_es" target="_blank">
                Twitter
                <span className="absolute inset-0" />
              </Link>
            </Heading2>
          </BentoItem>
          <BentoItem className="order-3 md:order-2 m-1 flex-1 relative items-center bg-slate-300 dark:bg-slate-600">
            <Heading2 link className="text-3xl/tight sm:text-4xl/tight">
              <Link href="https://github.com/gregives" target="_blank">
                GitHub
                <span className="absolute inset-0" />
              </Link>
            </Heading2>
          </BentoItem>
          <BentoItem className="order-1 md:order-3 w-full md:w-auto m-1 flex-grow lg:flex-1 relative items-center bg-purple-300 dark:bg-purple-700">
            <Heading2>
              <Link href="/projects">
                Other projects
                <span className="absolute inset-0" />
              </Link>
            </Heading2>
          </BentoItem>
        </div>
        <BentoItem
          className="order-7 sm:col-span-3 md:col-span-2 sm:row-span-3 bg-slate-800"
          inset
        >
          <Heading2 className="text-center sm:text-left sm:[writing-mode:vertical-lr] sm:rotate-180 sm:p-0 sm:text-6xl text-slate-50">
            From the blog
          </Heading2>
        </BentoItem>
        {latestArticles.map((article) => (
          <ArticlePreview
            key={article.metadata.title}
            metadata={article.metadata}
            className="order-8 sm:col-span-9 md:col-span-10 md:flex-col lg:flex-row bg-emerald-200 dark:bg-emerald-700"
          />
        ))}
        <BentoItem className="order-9 bg-sky-700 dark:bg-sky-900 text-slate-100 before:opacity-25 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div className="flex flex-col lg:flex-row">
              <div className="relative w-20 h-16 flex-shrink-0">
                <div className="absolute -top-1 left-0 font-display font-extrabold text-9xl/none">
                  &ldquo;
                </div>
              </div>
              <blockquote className="text-xl sm:text-2xl flex-grow max-w-xl font-light">
                Greg is a rare breed of developer that can work across the full
                stack and is a genuine joy to work with. We&rsquo;re lucky to
                have him leading our development at Myles.
              </blockquote>
            </div>
            <div className="flex-shrink-0 md:ml-16">
              <p className="mt-12 md:mt-0 md:text-right text-4xl/tight sm:text-5xl/tight font-display font-bold tracking-wide uppercase">
                Toby Cannon
              </p>
              <p className="mt-4 md:text-right md:text-lg">
                CEO, Myles Wellbeing
              </p>
            </div>
          </div>
        </BentoItem>
      </BentoGrid>
    </main>
  );
}
