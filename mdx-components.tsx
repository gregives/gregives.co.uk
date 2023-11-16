import type { MDXComponents } from "mdx/types";
import NextImage from "next/image";
import { Heading } from "./components/Heading";
import { Link } from "./components/Link";
import { twMerge } from "tailwind-merge";

async function Image({
  src: path,
  title: maxWidth,
  className,
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
      className={twMerge(
        "my-4 w-full max-h-[60svh] object-contain object-left drop-shadow-md dark:brightness-90",
        className
      )}
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
      className={twMerge("pt-8 -mt-8 mb-10 last:mb-0", className)}
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
      className={twMerge("pt-8 mt-4 first:-mt-8 mb-8 last:mb-0", className)}
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
      className={twMerge("pt-8 first:-mt-8 mb-6 last:mb-0", className)}
      {...properties}
    />
  );
}

export function Heading4({
  className,
  ...properties
}: JSX.IntrinsicElements["h4"]) {
  return (
    <Heading
      level={4}
      className={twMerge("pt-8 -mt-4 first:-mt-8 mb-6 last:mb-0", className)}
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

export function OrderedList({
  className,
  ...properties
}: JSX.IntrinsicElements["ol"]) {
  return (
    <ol
      className={twMerge(
        "mb-6 last:mb-0 list-decimal marker:tracking-tighter",
        className
      )}
      {...properties}
    />
  );
}

export function UnorderedList({
  className,
  ...properties
}: JSX.IntrinsicElements["ul"]) {
  return (
    <ul
      className={twMerge(
        "mb-6 last:mb-0 list-disc marker:tracking-tighter",
        className
      )}
      {...properties}
    />
  );
}

export function ListItem({
  className,
  ...properties
}: JSX.IntrinsicElements["li"]) {
  return (
    <li
      className={twMerge("first:-mt-2 mb-3 last:mb-0 ml-6 pl-1", className)}
      {...properties}
    />
  );
}

export function Pre({
  className,
  ...properties
}: JSX.IntrinsicElements["pre"]) {
  return (
    <pre
      className={twMerge(
        "bg-slate-200 dark:bg-slate-900 rounded-xl overflow-x-auto overflow-y-hidden",
        className
      )}
      {...properties}
    />
  );
}

export function Code({
  className,
  ...properties
}: JSX.IntrinsicElements["code"]) {
  return (
    <code
      className={twMerge(
        "bg-slate-200 dark:bg-slate-900 group-[]/error:bg-orange-100 dark:group-[]/error:bg-orange-950/50 rounded px-1 box-decoration-clone",
        className
      )}
      {...properties}
    />
  );
}

export function Blockquote({
  className,
  ...properties
}: JSX.IntrinsicElements["blockquote"]) {
  return (
    <blockquote
      className={twMerge(
        "mb-6 first:mt-0 last:mb-0 ring-2 ring-inset ring-slate-300 dark:ring-slate-600 p-4 rounded-xl",
        className
      )}
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
    h4: Heading4,
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
