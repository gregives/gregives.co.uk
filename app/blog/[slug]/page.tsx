import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  try {
    const { default: Content } = await import(
      // webpackInclude: /\.mdx$/
      `@/markdown/blog/${params.slug}.mdx`
    );

    return (
      <main>
        <Content />
      </main>
    );
  } catch {
    notFound();
  }
}
