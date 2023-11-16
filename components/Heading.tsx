import { twMerge } from "tailwind-merge";

type HeadingProperties<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T] & {
    level: 1 | 2 | 3 | 4 | 5 | 6;
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
    level === 1
      ? "text-5xl/tight"
      : level === 2
      ? "text-4xl/tight"
      : "text-3xl/tight",
    "font-display font-extrabold dark:font-bold dark:tracking-wide uppercase",
    className
  );

  return (
    // @ts-ignore
    <Component className={className} {...properties} />
  );
}
