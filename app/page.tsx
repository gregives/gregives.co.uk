import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown, loadMarkdownDirectory } from "@/utilities/markdown";
import { Heading2 } from "@/mdx-components";
import Link from "next/link";
import { Headshots } from "@/components/Headshots";
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
            className="order-8 sm:col-span-9 md:col-span-10 md:flex-col lg:flex-row bg-teal-300 dark:bg-emerald-700 saturate-50 dark:saturate-100"
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
              <blockquote className="text-xl sm:text-2xl flex-grow max-w-xl">
                Greg is a rare breed of developer that can work across the full
                stack and is a genuine joy to work with. We&rsquo;re lucky to
                have him leading our development at Myles.
              </blockquote>
            </div>
            <div className="flex-shrink-0 md:ml-16">
              <p className="mt-12 md:mt-0 md:text-right text-4xl sm:text-5xl font-display font-extrabold dark:font-bold dark:tracking-wide uppercase">
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
