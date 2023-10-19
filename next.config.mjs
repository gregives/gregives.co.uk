import addMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";

/** @type {import("next").NextConfig} */
const nextConfig = {};

export default addMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug],
  },
})(nextConfig);
