import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Heading2, Paragraph } from "@/mdx-components";
import { loadMarkdownDirectory } from "@/utilities/markdown";
import { generateTags } from "@/utilities/metadata";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

export const metadata: Metadata = generateTags({
  url: "/projects",
  title: "Projects",
  description: "Projects created by software engineer Greg Ives.",
});

export default async function ProjectsPage() {
  const [
    ,
    { metadata: emojiFamily },
    { metadata: poemGenerator },
    ...projects
  ] = await loadMarkdownDirectory("/projects");

  return (
    <main>
      <BentoGrid>
        <FeaturedProjects
          poemGenerator={poemGenerator}
          emojiFamily={emojiFamily}
        />
        {projects.map((project) => (
          <BentoItem
            key={project.metadata.title}
            className={twMerge(
              "order-10 bg-slate-300 dark:bg-slate-700",
              project.metadata.title === "Recommend Domains" &&
                "bg-indigo-300 dark:bg-indigo-700"
            )}
          >
            <Heading2
              link={project.metadata.website !== undefined}
              className="relative"
            >
              <Link
                href={
                  project.metadata.website
                    ? project.metadata.website
                    : project.metadata.path
                }
                target={project.metadata.website ? "_blank" : undefined}
              >
                {project.metadata.title}
                <span className="absolute inset-0" />
              </Link>
            </Heading2>
            <Paragraph>{project.metadata.description}</Paragraph>
          </BentoItem>
        ))}
      </BentoGrid>
    </main>
  );
}
