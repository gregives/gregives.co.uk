import NextLink from "next/link";
import { twMerge } from "tailwind-merge";

type LinkProperties = React.ComponentProps<typeof NextLink>;

export function Link({ className, ...properties }: LinkProperties) {
  return (
    <NextLink
      className={twMerge(
        "text-blue-700 dark:text-blue-300 group-[]/error:text-orange-700 dark:group-[]/error:text-orange-300 underline underline-offset-2 decoration-1 decoration-blue-700/20 dark:decoration-blue-300/20 group-[]/error:decoration-orange-700/20 dark:group-[]/error:decoration-orange-700/20 hover:decoration-current dark:hover:decoration-current group-[]/error:hover:decoration-current dark:group-[]/error:hover:decoration-current",
        className
      )}
      {...properties}
    />
  );
}
