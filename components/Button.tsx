import { twMerge } from "tailwind-merge";

type ButtonProperties = JSX.IntrinsicElements["button"];

export function Button({
  className,
  type = "button",
  ...properties
}: ButtonProperties) {
  return (
    <button
      className={twMerge(
        "relative rounded-xl bg-gradient-to-br from-sky-700 to-sky-800 px-4 py-2.5 before:absolute before:-inset-[2px] before:rounded-[14px] before:-z-10 before:bg-gradient-to-br before:from-sky-500 before:via-sky-700 before:to-sky-800 focus:outline-offset-0",
        className
      )}
      type={type}
      {...properties}
    />
  );
}
