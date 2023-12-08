import { twMerge } from "tailwind-merge";

type InputProperties = JSX.IntrinsicElements["input"];

export function Input({ className, ...properties }: InputProperties) {
  return (
    <input
      className={twMerge(
        "appearance-none bg-slate-900 text-current rounded-xl px-4 py-3 outline-none ring-2 ring-slate-700 focus:outline-none focus:ring-current",
        className
      )}
      {...properties}
    />
  );
}
