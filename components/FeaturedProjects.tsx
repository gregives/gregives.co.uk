import Link from "next/link";
import Image from "next/image";
import { Heading2, Paragraph } from "@/mdx-components";
import { ArticleMetadata } from "@/types";
import mylesWellbeingImage from "@/assets/images/myles-wellbeing/screenshot.jpg";
import { BentoItem } from "./BentoItem";

type FeaturedProjectsProperties = {
  mylesWellbeing?: ArticleMetadata;
  poetryTips: ArticleMetadata;
  recommendDomains: ArticleMetadata;
};

export function FeaturedProjects({
  mylesWellbeing,
  poetryTips,
  recommendDomains,
}: FeaturedProjectsProperties) {
  return (
    <>
      {mylesWellbeing && (
        <BentoItem className="order-3 relative sm:col-span-6 sm:row-span-2 bg-gradient-to-b from-yellow-800 to-20% to-orange-300 overflow-hidden">
          <div className="relative -mx-10 -mt-8 mb-8">
            <Image
              src={mylesWellbeingImage}
              alt="Screenshot of the Myles Wellbeing app"
              priority
              className="mix-blend-luminosity"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-orange-300" />
          </div>
          <Heading2>
            <Link href={mylesWellbeing.website as string} target="_blank">
              {mylesWellbeing.title}
            </Link>
          </Heading2>
          <Paragraph>{mylesWellbeing.description}</Paragraph>
        </BentoItem>
      )}
      <BentoItem className="order-4 relative sm:col-span-6 bg-red-300">
        <Heading2>
          <Link href={poetryTips.website as string} target="_blank">
            {poetryTips.title}
          </Link>
        </Heading2>
        <Paragraph>{poetryTips.description}</Paragraph>
      </BentoItem>
      <BentoItem className="order-5 relative sm:col-span-6 bg-indigo-300">
        <Heading2>
          <Link href={recommendDomains.website as string} target="_blank">
            {recommendDomains.title}
          </Link>
        </Heading2>
        <Paragraph>{recommendDomains.description}</Paragraph>
      </BentoItem>
    </>
  );
}
