import { ArticleHeader } from "@/components/ArticleHeader";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown } from "@/utilities/markdown";
import { generateTags } from "@/utilities/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const { metadata } = await loadMarkdown(`/blog/${params.slug}`);

  return generateTags({
    url: `/blog/${params.slug}`,
    title: metadata.title,
    description: metadata.description,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { Content, metadata } = await loadMarkdown(`/blog/${params.slug}`);

  return (
    <main className="h-full">
      <BentoGrid className="h-full">
        <BentoItem className="justify-start show-toc sm:col-span-8 bg-slate-50 dark:bg-slate-800 dark:before:opacity-25">
          <ArticleHeader metadata={metadata} className="mb-8" />
          <Content />
        </BentoItem>
        <BentoItem className="hidden sm:flex col-span-4 bg-slate-700 dark:bg-slate-800 before:opacity-25 dark:before:opacity-25" />
      </BentoGrid>
    </main>
  );
}