import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { Heading2, Paragraph } from "@/mdx-components";
import { loadMarkdownDirectory } from "@/utilities/markdown";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles written by software engineer Greg Ives.",
};

export default async function ArticlesPage() {
  const articles = await loadMarkdownDirectory("/blog");

  return (
    <main>
      <BentoGrid>
        {articles.map((article) => (
          <BentoItem key={article.metadata.title} className="bg-slate-300">
            <Heading2>
              <Link
                href={
                  article.metadata.website
                    ? article.metadata.website
                    : article.metadata.path
                }
                target={article.metadata.website ? "_blank" : undefined}
              >
                {article.metadata.title}
              </Link>
            </Heading2>
            <Paragraph>{article.metadata.description}</Paragraph>
          </BentoItem>
        ))}
      </BentoGrid>
    </main>
  );
}
