import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr"],
  defaultLocale: "tr",
  pathnames: {
    "/": "/",
    "/about": "/about",
    "/works": "/works",
    "/works/[slug]": "/works/[slug]",
    "/experience": "/experience",
    "/contact": "/contact",
  },
});
