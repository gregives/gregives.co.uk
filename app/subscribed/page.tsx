import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown, loadMarkdownDirectory } from "@/utilities/markdown";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ArticlePreview } from "@/components/ArticlePreview";

export default async function Home() {
  const [
    { Content },
    { metadata: mylesWellbeing },
    { metadata: jotboard },
    { metadata: poemGenerator },
    articles,
  ] = await Promise.all([
    loadMarkdown("/subscribed"),
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
        <FeaturedProjects
          mylesWellbeing={mylesWellbeing}
          jotboard={jotboard}
          poemGenerator={poemGenerator}
        />
        {latestArticles.map((article) => (
          <ArticlePreview
            key={article.metadata.title}
            metadata={article.metadata}
            className="order-7 bg-teal-300 dark:bg-emerald-700 saturate-50 dark:saturate-100"
          />
        ))}
      </BentoGrid>
    </main>
  );
}
