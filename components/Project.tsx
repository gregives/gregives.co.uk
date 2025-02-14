import { Heading2, Paragraph } from "@/mdx-components";
import { BentoItem } from "./BentoItem";
import { ArticleMetadata } from "@/types";
import Link from "next/link";

type ProjectProperties = React.ComponentProps<typeof BentoItem> & {
  project: ArticleMetadata;
};

export function Project({
  children,
  project,
  ...properties
}: ProjectProperties) {
  return (
    <BentoItem {...properties}>
      {children}
      <Heading2 link={project.website !== undefined} className="relative">
        <Link
          href={project.website ? project.website : project.path}
          target={project.website ? "_blank" : undefined}
        >
          {project.title}
          <span className="absolute inset-0" />
        </Link>
      </Heading2>
      <Paragraph>{project.description}</Paragraph>
    </BentoItem>
  );
}
