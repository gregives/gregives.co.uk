import { loadMarkdownDirectory } from "@/utilities/markdown";
import Link from "next/link";
import React from "react";

export default async function ProjectsPage() {
  const projects = await loadMarkdownDirectory("/projects");

  return (
    <main>
      {projects.map(({ metadata }) => (
        <Link key={metadata.title} href={metadata.path}>
          {metadata.title}
        </Link>
      ))}
    </main>
  );
}
