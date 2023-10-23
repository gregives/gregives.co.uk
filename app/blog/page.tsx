import { loadMarkdownDirectory } from "@/utilities/markdown";
import Link from "next/link";
import React from "react";

export default async function ArticlesPage() {
  const articles = await loadMarkdownDirectory("/blog");

  return (
    <main>
      {articles.map(({ metadata }) => (
        <Link key={metadata.title} href={metadata.path}>
          {metadata.title}
        </Link>
      ))}
    </main>
  );
}
