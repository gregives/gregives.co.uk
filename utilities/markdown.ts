import { join } from "path";
import { readdirSync } from "fs";
import { ArticleMetadata } from "@/types";
import { notFound } from "next/navigation";

export async function loadMarkdown<TPath extends string>(path: TPath) {
  try {
    const {
      default: Content,
      metadata,
      ...other
    }: {
      default: React.FC;
      metadata: TPath extends `/blog/${string}` | `/projects/${string}`
        ? ArticleMetadata
        : {};
    } = await import(
      // webpackInclude: /\.mdx$/
      `../markdown${path}.mdx`
    );

    return {
      Content,
      metadata: {
        ...metadata,
        path,
      },
      ...other,
    };
  } catch {
    notFound();
  }
}

export async function loadMarkdownDirectory<TPath extends string>(path: TPath) {
  const slugs = readdirSync(join(process.cwd(), "markdown", path))
    .filter((path) => path.endsWith(".mdx"))
    .map((path) => path.replace(/\.mdx$/, ""));

  return (
    await Promise.all(
      slugs.map((slug) => loadMarkdown<`${TPath}/${string}`>(`${path}/${slug}`))
    )
  ).sort((a, b) => {
    const dateA =
      "date" in a.metadata && typeof a.metadata.date === "string"
        ? new Date(a.metadata.date)
        : new Date(0);

    const dateB =
      "date" in b.metadata && typeof b.metadata.date === "string"
        ? new Date(b.metadata.date)
        : new Date(0);

    return dateB.getTime() - dateA.getTime();
  });
}
