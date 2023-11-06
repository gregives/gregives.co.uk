import { ArticleMetadata } from "@/types";
import { Heading1, Paragraph } from "@/mdx-components";

type ArticleHeaderProperties = Omit<
  JSX.IntrinsicElements["div"],
  "children"
> & {
  metadata: ArticleMetadata;
};

export function ArticleHeader({
  metadata,
  ...properties
}: ArticleHeaderProperties) {
  return (
    <div {...properties}>
      <Heading1>{metadata.title}</Heading1>
      <Paragraph className="text-xl text-blue-700 font-medium">
        {metadata.description}
      </Paragraph>
    </div>
  );
}
