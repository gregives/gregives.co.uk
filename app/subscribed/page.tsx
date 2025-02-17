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
    { metadata: lineAvatars },
    { metadata: mylesWellbeing },
    { metadata: jotboard },
    { metadata: poemGenerator },
    articles,
  ] = await Promise.all([
    loadMarkdown("/subscribed"),
    loadMarkdown("/projects/line-avatars"),
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
          project={lineAvatars}
          className="order-2 sm:col-span-6 bg-teal-300 dark:bg-teal-700"
        />
        <Project
          project={jotboard}
          className="order-2 sm:col-span-6 bg-lime-400 dark:bg-lime-700"
        />
        <Project
          project={poemGenerator}
          className="order-2 sm:col-span-6 bg-red-300 dark:bg-red-700"
        />
        {latestArticles.map((article) => (
          <Article
            key={article.metadata.title}
            metadata={article.metadata}
            className="order-2 bg-teal-300 dark:bg-emerald-700 saturate-50 dark:saturate-100"
          />
        ))}
      </BentoGrid>
    </main>
  );
}
