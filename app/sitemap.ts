import { readdirSync } from "fs";
import { basename } from "path";
import { MetadataRoute } from "next";
import { BASE_ORIGIN } from "@/utilities/constants";

export const articleSlugs = readdirSync("./markdown/blog/")
  .filter((path) => path.endsWith(".mdx"))
  .map((path) => path.replace(/\.mdx$/, ""));

export const projectSlugs = readdirSync("./markdown/projects/")
  .filter((path) => path.endsWith(".mdx"))
  .map((path) => path.replace(/\.mdx$/, ""));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${BASE_ORIGIN}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_ORIGIN}/blog`,
      lastModified: new Date(),
    },
    ...articleSlugs.map((slug) => ({
      url: `${BASE_ORIGIN}/blog/${slug}`,
      lastModified: new Date(),
    })),
    {
      url: `${BASE_ORIGIN}/projects`,
      lastModified: new Date(),
    },
    ...projectSlugs.map((slug) => ({
      url: `${BASE_ORIGIN}/projects/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
