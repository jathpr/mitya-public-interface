import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["by", "en", "ru"],
  defaultLocale: "by",
});
