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
          ? "ring-blue-400 bg-blue-50"
          : "ring-red-400 bg-red-50 group/error",
        className
      )}
      {...properties}
    />
  );
}
