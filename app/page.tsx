import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown, loadMarkdownDirectory } from "@/utilities/markdown";
import { Heading2, Paragraph } from "@/mdx-components";
import Link from "next/link";
import { Headshots } from "@/components/Headshots";
import { FeaturedProjects } from "@/components/FeaturedProjects";

export default async function Home() {
  const [
    { Content },
    { metadata: mylesWellbeing },
    { metadata: poetryTips },
    { metadata: recommendDomains },
    articles,
  ] = await Promise.all([
    loadMarkdown("/index"),
    loadMarkdown("/projects/myles-wellbeing"),
    loadMarkdown("/projects/poetry-tips"),
    loadMarkdown("/projects/recommend-domains"),
    loadMarkdownDirectory("/blog"),
  ]);

  const latestArticles = articles.slice(0, 3);

  return (
    <main>
      <BentoGrid>
        <BentoItem className="order-1 sm:order-2 sm:col-span-6 md:col-span-4 overflow-hidden bg-blue-200 sm:bg-blue-300 max-sm:before:opacity-50">
          <div className="relative max-sm:overflow-hidden">
            <Headshots />
            <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-transparent from-60% to-blue-200 sm:to-blue-300" />
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Content />
          </div>
        </BentoItem>
        <BentoItem className="hidden sm:flex order-2 sm:order-1 sm:col-span-6 md:col-span-8 bg-blue-100 before:opacity-50">
          <div className="max-w-2xl pt-8">
            <Content />
          </div>
        </BentoItem>
        <FeaturedProjects
          mylesWellbeing={mylesWellbeing}
          poetryTips={poetryTips}
          recommendDomains={recommendDomains}
        />
        <BentoItem className="order-7 md:order-6 col-span-6 md:col-span-4 relative items-center bg-blue-300">
          <Heading2>
            <Link href="https://twitter.com/gregiv_es" target="_blank">
              Twitter
              <span className="absolute inset-0" />
            </Link>
          </Heading2>
        </BentoItem>
        <BentoItem className="order-8 md:order-7 col-span-6 md:col-span-4 relative items-center bg-slate-300">
          <Heading2>
            <Link href="https://github.com/gregives" target="_blank">
              GitHub
              <span className="absolute inset-0" />
            </Link>
          </Heading2>
        </BentoItem>
        <BentoItem className="order-6 md:order-8 md:col-span-4 relative items-center bg-purple-300">
          <Heading2>
            <Link href="/projects">
              Other projects
              <span className="absolute inset-0" />
            </Link>
          </Heading2>
        </BentoItem>
        <BentoItem className="order-9 sm:col-span-3 md:col-span-2 sm:row-span-3 bg-slate-700 before:opacity-25 ring-inset shadow-inner">
          <Heading2 className="text-center sm:text-left sm:[writing-mode:vertical-lr] sm:rotate-180 sm:p-0 sm:text-6xl text-slate-50">
            From the blog
          </Heading2>
        </BentoItem>
        {latestArticles.map((article) => (
          <BentoItem
            key={article.metadata.title}
            className="order-10 sm:col-span-9 md:col-span-10 bg-teal-300 saturate-50"
          >
            <Heading2>
              <Link href={article.metadata.path}>{article.metadata.title}</Link>
            </Heading2>
            <Paragraph>{article.metadata.description}</Paragraph>
          </BentoItem>
        ))}
      </BentoGrid>
    </main>
  );
}
