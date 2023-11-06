import type { MDXComponents } from "mdx/types";
import NextImage from "next/image";
import { Heading } from "./components/Heading";
import { Link } from "./components/Link";
import { twMerge } from "tailwind-merge";

async function Image({
  src: path,
  title: maxWidth,
  ...properties
}: JSX.IntrinsicElements["img"]) {
  const image = await import(`@/assets/images/${path}`);
  const { src, height, width } = image.default;

  return (
    // @ts-ignore
    <NextImage
      {...properties}
      src={src}
      height={height}
      width={width}
      sizes="(min-width: 640px) 66.6666vw, 100vw"
      className="my-4 w-full max-h-[60svh] object-contain object-left drop-shadow-md"
      style={{
        maxWidth,
      }}
    />
  );
}

export function Heading1({
  className,
  ...properties
}: JSX.IntrinsicElements["h1"]) {
  return (
    <Heading
      level={1}
      className={twMerge("pt-8 -mt-8 mb-8 last:mb-0", className)}
      {...properties}
    />
  );
}

export function Heading2({
  className,
  ...properties
}: JSX.IntrinsicElements["h2"]) {
  return (
    <Heading
      level={2}
      className={twMerge("pt-8 -mt-2 first:-mt-8 mb-6 last:mb-0", className)}
      {...properties}
    />
  );
}

export function Heading3({
  className,
  ...properties
}: JSX.IntrinsicElements["h3"]) {
  return (
    <Heading
      level={3}
      className={twMerge("pt-8 -mt-4 first:-mt-8 mb-4 last:mb-0", className)}
      {...properties}
    />
  );
}

export function Paragraph({
  className,
  ...properties
}: JSX.IntrinsicElements["p"]) {
  return <p className={twMerge("mb-6 last:mb-0", className)} {...properties} />;
}

export function OrderedList(properties: JSX.IntrinsicElements["ol"]) {
  return (
    <ol
      className="mb-6 last:mb-0 list-decimal marker:tracking-tighter"
      {...properties}
    />
  );
}

export function UnorderedList(properties: JSX.IntrinsicElements["ul"]) {
  return (
    <ul
      className="mb-6 last:mb-0 list-disc marker:tracking-tighter"
      {...properties}
    />
  );
}

export function ListItem(properties: JSX.IntrinsicElements["li"]) {
  return (
    <li className="first:-mt-2 mb-3 last:mb-0 ml-6 pl-1" {...properties} />
  );
}

export function Pre(properties: JSX.IntrinsicElements["pre"]) {
  return (
    <pre
      className="bg-slate-200 rounded-xl overflow-x-auto overflow-y-hidden"
      {...properties}
    />
  );
}

export function Code(properties: JSX.IntrinsicElements["code"]) {
  return (
    <code
      className="bg-slate-200 group-[]/error:bg-orange-100 rounded px-1 box-decoration-clone"
      {...properties}
    />
  );
}

export function Blockquote(properties: JSX.IntrinsicElements["blockquote"]) {
  return (
    <blockquote
      className="mb-6 first:mt-0 last:mb-0 ring-2 ring-inset ring-slate-300 p-4 rounded-xl"
      {...properties}
    />
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: Image,
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    p: Paragraph,
    // @ts-ignore
    a: Link,
    ol: OrderedList,
    ul: UnorderedList,
    li: ListItem,
    pre: Pre,
    code: Code,
    blockquote: Blockquote,
  };
}
