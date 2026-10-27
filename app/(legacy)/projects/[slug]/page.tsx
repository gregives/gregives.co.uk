import { ArticleHeader } from "@/components/ArticleHeader";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown } from "@/utilities/markdown";
import { generateTags } from "@/utilities/metadata";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const { metadata } = await loadMarkdown(`/projects/${params.slug}`);

  return generateTags({
    url: `/projects/${params.slug}`,
    title: metadata.title,
    description: metadata.description,
  });
}

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
    <main>
      <BentoGrid className="h-full">
        <BentoItem className="justify-start show-toc sm:col-span-8 bg-slate-50 dark:bg-slate-800 dark:before:opacity-25">
          <ArticleHeader metadata={metadata} />
          <Content />
        </BentoItem>
        <BentoItem className="hidden sm:flex col-span-4 bg-slate-800" inset />
      </BentoGrid>
    </main>
  );
}
