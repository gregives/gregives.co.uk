import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown, loadMarkdownDirectory } from "@/utilities/markdown";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ArticlePreview } from "@/components/ArticlePreview";

export default async function Home() {
  const [
    { Content },
    { metadata: mylesWellbeing },
    { metadata: poetryTips },
    { metadata: recommendDomains },
    articles,
  ] = await Promise.all([
    loadMarkdown("/subscribed"),
    loadMarkdown("/projects/myles-wellbeing"),
    loadMarkdown("/projects/poetry-tips"),
    loadMarkdown("/projects/recommend-domains"),
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
          poetryTips={poetryTips}
          recommendDomains={recommendDomains}
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
