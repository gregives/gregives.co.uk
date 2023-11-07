import { twMerge } from "tailwind-merge";

type BentoGridProperties = JSX.IntrinsicElements["div"];

export function BentoGrid({ className, ...properties }: BentoGridProperties) {
  return (
    <div
      className={twMerge("bento grid grid-cols-12 gap-2", className)}
      {...properties}
    />
  );
}
