const projects = [
  {
    name: "Myles Wellbeing",
    href: "https://myleswellbeing.com",
    description: "Rewards employees for living a healthy lifestyle.",
  },
  {
    name: "Jotboard",
    href: "https://jotboard.com",
    description: "An online whiteboard for real-time collaboration.",
  },
  {
    name: "WWYLL",
    href: "https://whatwouldyoulooklike.com",
    description: "See what you would look like bald, or with a new hairstyle.",
  },
  {
    name: "Emoji Family",
    href: "https://emoji.family",
    description: "More than 3,000 emojis in SVG and PNG, with an API.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24 sm:py-32">
      <h1 className="font-[family-name:var(--font-serif)] text-6xl sm:text-7xl leading-none tracking-tight">
        Greg Ives
      </h1>
      <p className="mt-10 text-lg leading-relaxed">
        I&rsquo;m a software engineer, interested in everything from database
        design to great user experiences. I&rsquo;m currently working at{" "}
        <a
          href="https://zopa.com"
          className="underline underline-offset-4 decoration-[var(--muted)] hover:decoration-current"
        >
          Zopa Bank
        </a>{" "}
        by day, and on my side projects by night.
      </p>
      <h2 className="mt-16 text-sm uppercase tracking-widest text-[var(--muted)]">
        Projects
      </h2>
      <ul className="mt-4 border-t border-[var(--rule)]">
        {projects.map((project) => (
          <li key={project.name} className="border-b border-[var(--rule)]">
            <a
              href={project.href}
              className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-4"
            >
              <span className="font-medium underline-offset-4 group-hover:underline">
                {project.name}
              </span>
              <span className="text-[var(--muted)] sm:text-right">
                {project.description}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
