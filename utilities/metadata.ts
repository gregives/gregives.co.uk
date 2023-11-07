import { Metadata } from "next";

export function generateTags({
  url,
  title,
  description,
}: {
  url: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Greg Ives",
      images: [
        {
          url: `/opengraph?title=${title}&description=${description}`,
          width: 1200,
          height: 630,
          alt: description,
          type: "image/png",
        },
      ],
      type: "website",
    },
    twitter: {
      site: "@gregiv_es",
    },
  };
}
