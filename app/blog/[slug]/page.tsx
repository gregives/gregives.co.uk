import { ArticleHeader } from "@/components/ArticleHeader";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown } from "@/utilities/markdown";

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
        <BentoItem className="justify-start show-toc sm:col-span-8 bg-slate-50">
          <ArticleHeader metadata={metadata} className="mb-8" />
          <Content />
        </BentoItem>
      </BentoGrid>
    </main>
  );
}
