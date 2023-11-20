import { ArticleMetadata } from "@/types";
import { Heading1, Paragraph } from "@/mdx-components";
import { ViewCounter } from "./ViewCounter";
import { EyeIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

type ArticleHeaderProperties = Omit<
  JSX.IntrinsicElements["div"],
  "children"
> & {
  metadata: ArticleMetadata;
};

export function ArticleHeader({
  metadata,
  className,
  ...properties
}: ArticleHeaderProperties) {
  return (
    <div className={twMerge("mb-16", className)} {...properties}>
      <Heading1>{metadata.title}</Heading1>
      <div className="flex -mt-6 mb-8">
        <ViewCounter className="flex items-center">
          <EyeIcon className="inline w-6 h-6 mr-2 -my-2" aria-hidden="true" />
        </ViewCounter>
      </div>
      <Paragraph className="text-xl text-blue-600 dark:text-blue-300 font-medium">
        {metadata.description}
      </Paragraph>
    </div>
  );
}
