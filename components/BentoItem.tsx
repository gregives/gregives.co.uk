"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type BentoItemProperties = JSX.IntrinsicElements["div"] & {
  inset?: boolean;
};

export function useFadeIn() {
  const ref = useRef(null);

  // const [style, setStyle] = useState<CSSProperties | undefined>({
  //   opacity: 0,
  //   transitionProperty: "all",
  //   transform: "translateY(1rem) skewY(1deg) scale(0.98)",
  //   transformOrigin: "top",
  // });

  // useEffect(() => {
  //   if (ref.current) {
  //     let handle: NodeJS.Timeout;

  //     const observer = new IntersectionObserver(([entry]) => {
  //       if (entry.isIntersecting) {
  //         const transitionDuration =
  //           500 +
  //           (entry.boundingClientRect.top / window.innerHeight) * 500 +
  //           (entry.boundingClientRect.left / window.innerWidth) * 500;

  //         setStyle((style) => ({
  //           ...style,
  //           opacity: 1,
  //           transitionDuration: transitionDuration + "ms",
  //           transform: "none",
  //         }));

  //         handle = setTimeout(() => {
  //           setStyle(undefined);
  //         }, transitionDuration);

  //         if (ref.current) {
  //           observer.unobserve(ref.current);
  //         }
  //       }
  //     });

  //     observer.observe(ref.current);

  //     return () => {
  //       observer.disconnect();
  //       clearTimeout(handle);
  //     };
  //   }
  // }, [ref]);

  return {
    ref,
    // style,
  };
}

export function BentoItem({
  className,
  inset,
  ...properties
}: BentoItemProperties) {
  const fadeProperties = useFadeIn();

  return (
    <div
      className={twMerge(
        "relative flex flex-col justify-end rounded-3xl col-span-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 bg-slate-200 ring-1 ring-black/10 shadow",
        "before:absolute before:bottom-0 before:left-0 before:w-full before:h-48 before:max-h-full before:rounded-3xl before:shadow-[inset_0_-2rem_2rem_-2rem_black] before:bg-gradient-to-br before:from-transparent before:from-[calc(100%-8rem)] before:to-black before:mix-blend-soft-light dark:before:opacity-50 before:pointer-events-none",
        "after:absolute after:inset-0 after:h-12 after:rounded-3xl after:border-t-2 after:border-t-white/20 after:mix-blend-overlay after:pointer-events-none",
        inset &&
          "before:opacity-25 dark:before:opacity-25 ring-inset shadow-inner after:hidden",
        className
      )}
      {...fadeProperties}
      {...properties}
    />
  );
}
