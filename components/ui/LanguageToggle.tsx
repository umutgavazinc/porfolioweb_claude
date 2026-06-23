"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const otherLocale = locale === "tr" ? "en" : "tr";

  function handleSwitch() {
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.replace(pathname as any, { locale: otherLocale });
    });
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      aria-label={`Switch to ${otherLocale.toUpperCase()}`}
      className="label px-3 py-2 text-xs transition-all duration-300 hover:text-white/80 disabled:opacity-50"
      style={{
        color: "var(--color-text-secondary)",
        fontSize: "var(--text-label)",
        letterSpacing: "var(--tracking-wider)",
        textTransform: "uppercase",
        fontWeight: "500",
      }}
    >
      {locale === "tr" ? "TR / EN" : "EN / TR"}
    </button>
  );
}
