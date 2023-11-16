"use client";

import { twMerge } from "tailwind-merge";
import { Container } from "./Container";
import { Disclosure } from "@headlessui/react";
import { useLocalStorage } from "react-use";
import Link from "next/link";
import { useFadeIn } from "./BentoItem";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type HeaderProperties = React.ComponentProps<typeof Disclosure>;

function HeaderLink({
  className,
  ...properties
}: React.ComponentProps<typeof Link>) {
  const fadeProperties = useFadeIn();

  return (
    <Link
      className={twMerge(
        "inline-flex items-center text-sm font-medium",
        className
      )}
      {...fadeProperties}
      {...properties}
    />
  );
}

function HeaderButton({
  className,
  ...properties
}: JSX.IntrinsicElements["button"]) {
  const fadeProperties = useFadeIn();

  return (
    <button
      className={twMerge(
        "inline-flex items-center text-sm font-medium",
        className
      )}
      {...fadeProperties}
      {...properties}
    />
  );
}

export function Header({ className, ...properties }: HeaderProperties) {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("theme", "light");
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setSwitching(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setTimeout(() => {
        setSwitching(false);
      }, 100);
    }, 100);
  };

  return (
    <header className={twMerge("relative", className)} {...properties}>
      <Container className="relative px-6 sm:px-8 md:px-10 lg:px-12 flex overflow-x-auto hide-scrollbar justify-between py-8">
        <div className="flex space-x-8 mr-8">
          <HeaderLink href="/">Home</HeaderLink>
          <HeaderLink href="/blog">Blog</HeaderLink>
          <HeaderLink href="/projects">Projects</HeaderLink>
        </div>
        <div className="flex space-x-8">
          <HeaderButton onClick={toggleTheme}>
            <span className="mr-2">Theme</span>
            {theme === "light" ? (
              <SunIcon
                className={twMerge(
                  "w-4 h-4 scale-125 transition-transform",
                  switching && "-rotate-90 scale-0"
                )}
                aria-hidden="true"
              />
            ) : (
              <MoonIcon
                className={twMerge(
                  "w-4 h-4 transition-transform origin-bottom",
                  switching && "rotate-90 scale-0"
                )}
                aria-hidden="true"
              />
            )}
          </HeaderButton>
        </div>
      </Container>
      <div className="absolute pointer-events-none top-0 left-0 h-full w-6 sm:w-8 md:w-10 lg:w-12 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="absolute pointer-events-none top-0 right-0 h-full w-6 sm:w-8 md:w-10 lg:w-12 bg-gradient-to-l from-slate-950 to-transparent" />
    </header>
  );
}
