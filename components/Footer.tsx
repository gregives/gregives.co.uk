"use client";

import { Container } from "./Container";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { ViewCounter } from "./ViewCounter";
import { Heading2, Paragraph } from "@/mdx-components";
import { Input } from "./Input";
import { Button } from "./Button";

const navigation = [
  {
    name: "Email",
    href: "mailto:greg@gregives.co.uk",
    icon: EnvelopeIcon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/gregiv_es",
    icon: (properties: JSX.IntrinsicElements["svg"]) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...properties}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/gregives",
    icon: (properties: JSX.IntrinsicElements["svg"]) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...properties}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const RANDOM_NUMBERS = [
  -1.02, 1.57, 1.26, -1.01, 0.22, -1.51, 0.86, -0.89, 1.32, 1.91, -0.72, -0.92,
  1.22, -0.27,
];

type FooterProperties = JSX.IntrinsicElements["footer"];

export function Footer(properties: FooterProperties) {
  const scrollToBottom = () => {
    document.documentElement.scrollTo(0, document.documentElement.scrollHeight);
  };

  return (
    <footer onFocus={scrollToBottom} {...properties}>
      <Container className="pb-8 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="py-16 sm:py-24 text-center flex flex-col items-center bg-radial-gradient-t from-sky-900 to-transparent">
          <Heading2 className="text-4xl/tight sm:text-5xl/tight tracking-wide">
            <span className="hidden sm:inline-block md:skew-y-6 origin-right">
              Subscribe to
            </span>{" "}
            My Newsletter
          </Heading2>
          <Paragraph className="max-w-xl">
            Sign up to receive my{" "}
            {"very irregular".split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block whitespace-pre"
                style={{
                  transform: `translateY(${RANDOM_NUMBERS[index]}px)`,
                }}
              >
                {letter}
              </span>
            ))}{" "}
            newsletter including updates on new blog posts, projects I&rsquo;m
            working on and exclusive content.
          </Paragraph>
          <form
            action="https://app.convertkit.com/forms/5075878/subscriptions"
            className="mt-8 w-full max-w-xl flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 items-stretch"
            method="POST"
          >
            <Input
              aria-label="Email address"
              className="flex-grow"
              name="email_address"
              placeholder="Email address"
              required
              type="email"
            />
            <Button className="shadow-xl shadow-sky-800/50" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
        <div className="flex flex-wrap items-center justify-between space-y-8 sm:space-y-0">
          <div className="w-full sm:w-auto flex space-x-6 sm:order-3">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-400 hover:text-slate-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="text-slate-500 sm:order-1">
            &copy; {new Date().getFullYear()} Greg Ives
          </p>
          <p className="text-slate-500 sm:order-2">
            <ViewCounter increment />
          </p>
        </div>
      </Container>
    </footer>
  );
}
