import { twMerge } from "tailwind-merge";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

type HeadingProperties<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T] & {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    as?: T;
    link?: boolean;
  };

export function Heading<T extends keyof JSX.IntrinsicElements>({
  level,
  // @ts-ignore
  as: Component = `h${level}`,
  link = false,
  children,
  className,
  ...properties
}: HeadingProperties<T>) {
  className = twMerge(
    level === 1
      ? "text-5xl/tight"
      : level === 2
      ? "text-4xl/tight"
      : level === 3
      ? "text-3xl/tight"
      : "text-2xl/tight",
    "font-display font-extrabold dark:font-bold dark:tracking-wide uppercase",
    link && "flex items-end space-x-2",
    className
  );

  return (
    // @ts-ignore
    <Component className={className} {...properties}>
      {children}
      {link && (
        <ArrowUpRightIcon
          className="flex-shrink-0 h-[1em] w-[1em] mb-1.5"
          aria-hidden="true"
          strokeWidth={2.5}
        />
      )}
    </Component>
  );
}
