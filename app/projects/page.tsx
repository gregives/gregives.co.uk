import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Heading2, Paragraph } from "@/mdx-components";
import { loadMarkdownDirectory } from "@/utilities/markdown";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects created by software engineer Greg Ives.",
};

export default async function ProjectsPage() {
  const [
    ,
    { metadata: poetryTips },
    { metadata: recommendDomains },
    ...projects
  ] = await loadMarkdownDirectory("/projects");

  return (
    <main>
      <BentoGrid>
        <FeaturedProjects
          poetryTips={poetryTips}
          recommendDomains={recommendDomains}
        />
        {projects.map((project) => (
          <BentoItem
            key={project.metadata.title}
            className="order-10 bg-slate-300"
          >
            <Heading2>
              <Link
                href={
                  project.metadata.website
                    ? project.metadata.website
                    : project.metadata.path
                }
                target={project.metadata.website ? "_blank" : undefined}
              >
                {project.metadata.title}
              </Link>
            </Heading2>
            <Paragraph>{project.metadata.description}</Paragraph>
          </BentoItem>
        ))}
      </BentoGrid>
    </main>
  );
}
