import { twMerge } from "tailwind-merge";

const classNames = {
  slate:
    "shadow-slate-500/50 bg-gradient-to-br from-slate-300 from-80% to-slate-400",
  red: "shadow-red-500/50 bg-gradient-to-br from-red-300 from-80% to-red-400",
  orange:
    "shadow-orange-500/50 bg-gradient-to-br from-orange-300 from-80% to-orange-400",
  amber:
    "shadow-amber-500/50 bg-gradient-to-br from-amber-300 from-80% to-amber-400",
  yellow:
    "shadow-yellow-500/50 bg-gradient-to-br from-yellow-300 from-80% to-yellow-400",
  lime: "shadow-lime-500/50 bg-gradient-to-br from-lime-300 from-80% to-lime-400",
  green:
    "shadow-green-500/50 bg-gradient-to-br from-green-300 from-80% to-green-400",
  emerald:
    "shadow-emerald-500/50 bg-gradient-to-br from-emerald-300 from-80% to-emerald-400",
  teal: "shadow-teal-500/50 bg-gradient-to-br from-teal-300 from-80% to-teal-400",
  cyan: "shadow-cyan-500/50 bg-gradient-to-br from-cyan-300 from-80% to-cyan-400",
  sky: "shadow-sky-500/50 bg-gradient-to-br from-sky-300 from-80% to-sky-400",
  blue: "shadow-blue-500/50 bg-gradient-to-br from-blue-300 from-80% to-blue-400",
  indigo:
    "shadow-indigo-500/50 bg-gradient-to-br from-indigo-300 from-80% to-indigo-400",
  violet:
    "shadow-violet-500/50 bg-gradient-to-br from-violet-300 from-80% to-violet-400",
  purple:
    "shadow-purple-500/50 bg-gradient-to-br from-purple-300 from-80% to-purple-400",
  fuchsia:
    "shadow-fuchsia-500/50 bg-gradient-to-br from-fuchsia-300 from-80% to-fuchsia-400",
  pink: "shadow-pink-500/50 bg-gradient-to-br from-pink-300 from-80% to-pink-400",
  rose: "shadow-rose-500/50 bg-gradient-to-br from-rose-300 from-80% to-rose-400",
};

type BentoItemProperties = JSX.IntrinsicElements["div"] & {
  color?: keyof typeof classNames;
};

export function BentoItem({
  color = "slate",
  className,
  ...properties
}: BentoItemProperties) {
  const applyBackground =
    className === undefined || className.search(/\bbg-\w+-\d+\b/) === -1;

  return (
    <div
      className={
        twMerge(
          "flex flex-col justify-end rounded-2xl overflow-hidden col-span-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8",
          applyBackground && classNames[color],
          className
        ) + " shadow-bento"
      }
      {...properties}
    />
  );
}
