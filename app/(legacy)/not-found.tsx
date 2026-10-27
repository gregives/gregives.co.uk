import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { Link } from "@/components/Link";
import { Heading1, Paragraph } from "@/mdx-components";

export default function NotFound() {
  return (
    <main>
      <BentoGrid className="h-full">
        <BentoItem className="justify-center items-center text-center bg-blue-200 dark:bg-blue-950">
          <Heading1 className="sm:text-7xl md:text-8xl lg:text-9xl">
            Page not found
          </Heading1>
          <Paragraph className="px-4">
            Uh oh, looks like this page has gone missing.{" "}
            <Link href="/">Return home?</Link>
          </Paragraph>
        </BentoItem>
      </BentoGrid>
    </main>
  );
}
