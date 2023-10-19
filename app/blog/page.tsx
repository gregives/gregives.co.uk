import { articleSlugs } from "@/app/sitemap";
import Link from "next/link";
import React from "react";

export default async function BlogPage() {
  const articles = (
    await Promise.all(
      articleSlugs.map((slug) => import(`@/markdown/blog/${slug}.mdx`))
    )
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main>
      {articles.map((article) => (
        <Link key={article.title} href={`/blog/${article.slug}`}>
          {article.title}
        </Link>
      ))}
    </main>
  );
}
