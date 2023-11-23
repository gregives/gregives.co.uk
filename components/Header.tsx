"use client";

import { twMerge } from "tailwind-merge";
import { Container } from "./Container";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";

type HeaderProperties = React.ComponentProps<typeof Disclosure>;

function HeaderLink({
  className,
  ...properties
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={twMerge(
        "inline-flex items-center text-sm font-medium",
        className
      )}
      {...properties}
    />
  );
}

function HeaderButton({
  className,
  ...properties
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className={twMerge(
        "inline-flex items-center text-sm font-medium",
        className
      )}
      {...properties}
    />
  );
}

type Theme = "light" | "dark";

function useTheme() {
  const [theme, setTheme] = useState<Theme>();

  const setThemeWrapper = (theme: Theme) => {
    if (theme === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }

    setTheme(theme);
  };

  useEffect(() => {
    const initialTheme =
      typeof localStorage === "undefined"
        ? "light"
        : (localStorage.getItem("theme") as Theme) ?? "light";

    setThemeWrapper(initialTheme);
  }, []);

  useEffect(() => {
    if (theme !== undefined) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return [theme, setThemeWrapper] as const;
}

export function Header({ className, ...properties }: HeaderProperties) {
  const [theme, setTheme] = useTheme();
  const [switching, setSwitching] = useState(false);

  const toggleTheme = useCallback(() => {
    setSwitching(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setTimeout(() => {
        setSwitching(false);
      }, 100);
    }, 100);
  }, [setTheme, theme]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={twMerge("relative", className)}
      onFocus={scrollToTop}
      {...properties}
    >
      <Container className="relative bg-radial-gradient-b from-slate-800 to-transparent py-8 px-6 sm:px-8 md:px-10 lg:px-12 flex overflow-x-auto hide-scrollbar justify-between">
        <div className="flex space-x-8 mr-8">
          <HeaderLink href="/">Home</HeaderLink>
          <HeaderLink href="/blog">Blog</HeaderLink>
          <HeaderLink href="/projects">Projects</HeaderLink>
        </div>
        <div className="flex space-x-8">
          <HeaderButton onClick={toggleTheme}>
            <span className="mr-2">Theme</span>
            <MoonIcon
              className={twMerge(
                "hidden dark:inline w-4 h-4 transition-transform origin-bottom",
                switching && "rotate-90 scale-0"
              )}
              aria-hidden="true"
            />
            <SunIcon
              className={twMerge(
                "inline dark:hidden w-4 h-4 scale-125 transition-transform",
                switching && "-rotate-90 scale-0"
              )}
              aria-hidden="true"
            />
          </HeaderButton>
        </div>
      </Container>
      <div className="absolute pointer-events-none top-0 left-0 h-full w-6 sm:w-8 md:w-10 lg:w-12 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="absolute pointer-events-none top-0 right-0 h-full w-6 sm:w-8 md:w-10 lg:w-12 bg-gradient-to-l from-slate-950 to-transparent" />
    </header>
  );
}
