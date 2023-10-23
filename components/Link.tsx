import NextLink from "next/link";
import { twMerge } from "tailwind-merge";

type LinkProperties = React.ComponentProps<typeof NextLink>;

export function Link({ className, ...properties }: LinkProperties) {
  return (
    <NextLink
      className={twMerge(
        "text-blue-700 group-[]/error:text-red-700 underline underline-offset-2 decoration-1 decoration-blue-700/20 group-[]/error:decoration-red-700/20 hover:decoration-current group-[]/error:hover:decoration-current",
        className
      )}
      {...properties}
    />
  );
}
