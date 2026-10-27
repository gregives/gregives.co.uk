import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown, loadMarkdownDirectory } from "@/utilities/markdown";
import { Article } from "@/components/Article";
import { Project } from "@/components/Project";
import Image from "next/image";
import mylesWellbeingImage from "@/assets/images/myles-wellbeing/screenshot.jpg";

export default async function Home() {
  const [
    { Content },
    { metadata: whatWouldYouLookLike },
    { metadata: mylesWellbeing },
    { metadata: jotboard },
    { metadata: emojiFamily },
    articles,
  ] = await Promise.all([
    loadMarkdown("/subscribed"),
    loadMarkdown("/projects/what-would-you-look-like"),
    loadMarkdown("/projects/myles-wellbeing"),
    loadMarkdown("/projects/jotboard"),
    loadMarkdown("/projects/poem-generator"),
    loadMarkdownDirectory("/blog"),
  ]);

  const latestArticles = articles.slice(0, 3);

  return (
    <main>
      <BentoGrid>
        <BentoItem className="order-1 bg-blue-100 dark:bg-blue-950 before:opacity-50">
          <Content />
        </BentoItem>
        <Project
          project={mylesWellbeing}
          className="order-2 relative sm:col-span-6 sm:row-span-3 bg-gradient-to-b from-yellow-800 to-20% to-orange-300 dark:to-amber-700 overflow-hidden"
        >
          <div className="relative -mx-10 -mt-8 mb-8">
            <Image
              src={mylesWellbeingImage}
              alt="Screenshot of the Myles Wellbeing app"
              priority
              className="mix-blend-luminosity"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-orange-300 dark:to-amber-700" />
          </div>
        </Project>
        <Project
          project={whatWouldYouLookLike}
          className="order-2 sm:col-span-6 bg-pink-300 dark:bg-pink-700"
        />
        <Project
          project={jotboard}
          className="order-2 sm:col-span-6 bg-lime-400 dark:bg-lime-700"
        />
        <Project
          project={emojiFamily}
          className="order-2 sm:col-span-6 bg-sky-300 dark:bg-sky-700"
        />
        {latestArticles.map((article) => (
          <Article
            key={article.metadata.title}
            metadata={article.metadata}
            className="order-2"
          />
        ))}
      </BentoGrid>
    </main>
  );
}
