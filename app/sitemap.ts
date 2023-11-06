import { MetadataRoute } from "next";
import { BASE_ORIGIN } from "@/utilities/constants";
import { loadMarkdownDirectory } from "@/utilities/markdown";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, projects] = await Promise.all([
    loadMarkdownDirectory("/blog"),
    loadMarkdownDirectory("/projects"),
  ]);

  return [
    {
      url: `${BASE_ORIGIN}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_ORIGIN}/blog`,
      lastModified: new Date(),
    },
    ...articles
      .filter(({ metadata }) => metadata.website === undefined)
      .map(({ metadata }) => ({
        url: `${BASE_ORIGIN}${metadata.path}`,
        lastModified: new Date(),
      })),
    {
      url: `${BASE_ORIGIN}/projects`,
      lastModified: new Date(),
    },
    ...projects
      .filter(({ metadata }) => metadata.website === undefined)
      .map(({ metadata }) => ({
        url: `${BASE_ORIGIN}${metadata.path}`,
        lastModified: new Date(),
      })),
  ];
}
