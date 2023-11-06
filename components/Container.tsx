import { twMerge } from "tailwind-merge";

type ContainerProperties = JSX.IntrinsicElements["div"];

export function Container({ className, ...properties }: ContainerProperties) {
  return (
    <div {...properties} className={twMerge("mx-auto max-w-7xl", className)} />
  );
}
