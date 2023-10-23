import { twMerge } from "tailwind-merge";
import { Container } from "./Container";
import Link from "next/link";

type HeaderProperties = JSX.IntrinsicElements["header"];

export function Header({ className, ...properties }: HeaderProperties) {
  return (
    <header className={twMerge("py-8", className)} {...properties}>
      <Container className="flex space-x-8 px-6 sm:px-8 md:px-10 lg:px-12">
        <Link className="text-sm font-medium" href="/">
          Home
        </Link>
        <Link className="text-sm font-medium" href="/blog">
          Blog
        </Link>
        <Link className="text-sm font-medium" href="/projects">
          Work
        </Link>
      </Container>
    </header>
  );
}
