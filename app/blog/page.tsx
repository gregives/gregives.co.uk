import { Article } from "@/components/Article";
import { BentoGrid } from "@/components/BentoGrid";
import { loadMarkdownDirectory } from "@/utilities/markdown";
import { generateTags } from "@/utilities/metadata";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateTags({
  url: "/blog",
  title: "Blog",
  description: "Articles written by software engineer Greg Ives.",
});

export default async function ArticlesPage() {
  const articles = await loadMarkdownDirectory("/blog");

  return (
    <main>
      <BentoGrid>
        {articles.map((article) => (
          <Article key={article.metadata.path} metadata={article.metadata} />
        ))}
      </BentoGrid>
    </main>
  );
}
