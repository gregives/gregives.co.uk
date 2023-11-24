"use client";

import { Heading2, Paragraph } from "@/mdx-components";
import Link from "next/link";
import { BentoItem } from "./BentoItem";
import { ArticleMetadata } from "@/types";
import { twMerge } from "tailwind-merge";
import { ViewCounter } from "./ViewCounter";
import { EyeIcon } from "@heroicons/react/24/outline";

type ArticlePreviewProperties = React.ComponentProps<typeof BentoItem> & {
  metadata: ArticleMetadata & {
    path: string;
  };
};

export function ArticlePreview({
  metadata,
  className,
  ...properties
}: ArticlePreviewProperties) {
  return (
    <BentoItem
      className={twMerge(
        "md:flex-row flex-wrap justify-between bg-slate-300 dark:bg-slate-700",
        className
      )}
      {...properties}
    >
      <Heading2 className="flex-grow relative mb-4">
        <Link href={metadata.path}>
          {metadata.title}
          <span className="absolute inset-0" />
        </Link>
      </Heading2>
      <ViewCounter
        path={metadata.path}
        className="self-start flex items-center mb-2"
      >
        <EyeIcon className="inline w-6 h-6 mr-2 -my-2" aria-hidden="true" />
      </ViewCounter>
      <Paragraph className="w-full flex-shrink-0 mt-4">
        {metadata.description}
      </Paragraph>
    </BentoItem>
  );
}
