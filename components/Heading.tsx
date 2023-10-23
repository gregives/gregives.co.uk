import { twMerge } from "tailwind-merge";

type HeadingProperties<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T] & {
    level: 1 | 2 | 3;
    as?: T;
  };

export function Heading<T extends keyof JSX.IntrinsicElements>({
  level,
  // @ts-ignore
  as: Component = `h${level}`,
  className,
  ...properties
}: HeadingProperties<T>) {
  className = twMerge(
    level === 1 ? "text-5xl" : level === 2 ? "text-4xl" : "text-3xl",
    "font-display",
    className
  );

  return (
    // @ts-ignore
    <Component className={className} {...properties} />
  );
}
