import { Badge } from "@/components/Badge";
import { BentoGrid } from "@/components/BentoGrid";
import { Project } from "@/components/Project";
import { loadMarkdownDirectory } from "@/utilities/markdown";
import { generateTags } from "@/utilities/metadata";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateTags({
  url: "/projects",
  title: "Projects",
  description: "Projects created by software engineer Greg Ives.",
});

export default async function ProjectsPage() {
  const [
    ,
    // Myles Wellbeing is first because it's the most recent project
    { metadata: lineAvatars },
    { metadata: jotboard },
    { metadata: emojiFamily },
    { metadata: poemGenerator },
    ...projects
  ] = await loadMarkdownDirectory("/projects");

  return (
    <main>
      <BentoGrid>
        <Project
          project={jotboard}
          className="sm:col-span-6 bg-lime-400 dark:bg-lime-700"
        />
        <Project
          project={lineAvatars}
          className="sm:col-span-6 bg-teal-300 dark:bg-teal-700"
        />
        <Project
          project={emojiFamily}
          className="sm:col-span-6 bg-sky-300 dark:bg-sky-700"
        />
        <Project
          project={poemGenerator}
          className="sm:col-span-6 bg-red-300 dark:bg-red-700"
        >
          <Badge>Acquired!</Badge>
          <div className="-mb-12" />
        </Project>
        {projects.map((project) => (
          <Project key={project.metadata.title} project={project.metadata} />
        ))}
      </BentoGrid>
    </main>
  );
}
