import { BentoGrid } from "@/components/BentoGrid";
import { BentoItem } from "@/components/BentoItem";
import { loadMarkdown } from "@/utilities/markdown";
import Image from "next/image";
import mylesWellbeingImage from "@/assets/images/myles-wellbeing/screenshot.jpg";
import { Heading2, Paragraph } from "@/mdx-components";
import Link from "next/link";

export default async function Home() {
  const [
    { Content },
    { metadata: mylesWellbeing },
    { metadata: poetryTips },
    { metadata: recommendDomains },
  ] = await Promise.all([
    loadMarkdown("/index"),
    loadMarkdown("/projects/myles-wellbeing"),
    loadMarkdown("/projects/poetry-tips"),
    loadMarkdown("/projects/recommend-domains"),
  ]);

  return (
    <main>
      <BentoGrid>
        <BentoItem className="order-1 sm:col-span-6 md:col-span-8">
          <Content />
        </BentoItem>
        <BentoItem
          className="order-2 sm:col-span-6 md:col-span-4"
          color="blue"
        ></BentoItem>
        <BentoItem
          className="order-3 relative sm:col-span-6 sm:row-span-2"
          color="orange"
        >
          <div className="relative -mx-10 -mt-8 mb-8">
            <Image
              src={mylesWellbeingImage}
              alt="Screenshot of the Myles Wellbeing app"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-orange-300" />
          </div>
          <Heading2 className="whitespace-nowrap">
            <Link href={mylesWellbeing.website as string}>
              {mylesWellbeing.title}
              <span className="absolute inset-0" />
            </Link>
          </Heading2>
          <Paragraph>{mylesWellbeing.description}</Paragraph>
        </BentoItem>
        <BentoItem className="order-4 relative sm:col-span-6" color="red">
          <Heading2 className="whitespace-nowrap">
            <Link href={poetryTips.website as string}>
              {poetryTips.title}
              <span className="absolute inset-0" />
            </Link>
          </Heading2>
          <Paragraph>{poetryTips.description}</Paragraph>
        </BentoItem>
        <BentoItem className="order-5 relative sm:col-span-6" color="indigo">
          <Heading2 className="whitespace-nowrap">
            <Link href={recommendDomains.website as string}>
              {recommendDomains.title}
              <span className="absolute inset-0" />
            </Link>
          </Heading2>
          <Paragraph>{recommendDomains.description}</Paragraph>
        </BentoItem>
        <BentoItem
          className="order-7 md:order-6 col-span-6 md:col-span-3 lg:col-span-2 relative items-center"
          color="blue"
        >
          <Heading2>
            <Link href="https://twitter.com/gregiv_es">
              Twitter
              <span className="absolute inset-0" />
            </Link>
          </Heading2>
        </BentoItem>
        <BentoItem className="order-8 md:order-7 col-span-6 md:col-span-3 lg:col-span-2 relative items-center">
          <Heading2>
            <Link href="https://github.com/gregives">
              GitHub
              <span className="absolute inset-0" />
            </Link>
          </Heading2>
        </BentoItem>
        <BentoItem
          className="order-6 md:order-8 md:col-span-6 lg:col-span-8 relative items-center"
          color="purple"
        >
          <Heading2>
            <Link href="/projects">
              Other projects
              <span className="absolute inset-0" />
            </Link>
          </Heading2>
        </BentoItem>
      </BentoGrid>
    </main>
  );
}
