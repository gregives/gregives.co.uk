import { twMerge } from "tailwind-merge";

type AlertProperties = JSX.IntrinsicElements["div"] & {
  type: "info" | "warning";
};

export function Alert({ className, type, ...properties }: AlertProperties) {
  return (
    <div
      className={twMerge(
        "mb-8 last:mb-0 ring-2 ring-inset p-4 rounded-xl",
        type === "info"
          ? "ring-blue-400 dark:ring-blue-500/50 bg-blue-50 dark:bg-blue-500/10"
          : "ring-orange-400 dark:ring-orange-500/50 bg-orange-50 dark:bg-orange-500/10 group/error",
        className
      )}
      {...properties}
    />
  );
}
