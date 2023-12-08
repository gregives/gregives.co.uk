import addMDX from "@next/mdx";
import addBundleAnalyzer from "@next/bundle-analyzer";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeTableOfContents from "rehype-toc";
import remarkSmartyPants from "remark-smartypants";

/** @type {import("next").NextConfig} */
const nextConfig = {};

/** @type {import("rehype-pretty-code").Options} */
const prettyCodeOptions = {
  keepBackground: false,
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
};

export default addBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(
  addMDX({
    options: {
      remarkPlugins: [[remarkSmartyPants]],
      rehypePlugins: [
        [rehypeSlug],
        [rehypeAutolinkHeadings],
        [rehypeTableOfContents],
        [rehypePrettyCode, prettyCodeOptions],
      ],
    },
  })(nextConfig)
);
