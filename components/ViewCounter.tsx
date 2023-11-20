"use client";

import { useAPI } from "@/utilities/api";
import { useFadeIn } from "./BentoItem";
import { usePathname } from "next/navigation";

type ViewCounterProperties = JSX.IntrinsicElements["span"] & {
  path?: string;
  increment?: boolean;
};

function ViewCounterInner(properties: JSX.IntrinsicElements["span"]) {
  const fadeProperties = useFadeIn();

  return <span {...properties} {...fadeProperties} />;
}

export function ViewCounter({
  path,
  increment,
  children,
  ...properties
}: ViewCounterProperties) {
  const pathname = usePathname();
  const page = useAPI(path ?? pathname, increment);

  if (page === undefined) {
    return <span {...properties}>&nbsp;</span>;
  }

  return (
    <ViewCounterInner {...properties}>
      {children}
      {page.views === 1 ? "1 view" : `${page.views} views`}
    </ViewCounterInner>
  );
}
