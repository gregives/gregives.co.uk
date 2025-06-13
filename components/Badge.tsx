import { twMerge } from "tailwind-merge";

type BadgeProperties = JSX.IntrinsicElements["div"];

export function Badge({ className, children, ...properties }: BadgeProperties) {
  return (
    <div
      className={twMerge(
        "absolute inset-0 overflow-hidden pointer-events-none flex justify-end items-start",
        className
      )}
      {...properties}
    >
      <div className="origin-top-left rotate-[30deg] p-1 md:p-2 before:absolute before:bg-yellow-200 dark:before:bg-slate-900 before:inset-0 before:-mx-64 before:-z-10 before:shadow">
        {children}
      </div>
    </div>
  );
}
