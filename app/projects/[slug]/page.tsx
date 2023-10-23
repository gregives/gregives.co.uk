import { ArticleHeader } from "@/components/ArticleHeader";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown } from "@/utilities/markdown";
import { redirect } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { Content, metadata } = await loadMarkdown(`/projects/${params.slug}`);

  if (metadata.website) {
    redirect(metadata.website);
  }

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
