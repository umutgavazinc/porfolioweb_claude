import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { ImageProtection } from "@/components/ImageProtection";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ImageProtection />
      <div className="flex flex-col min-h-dvh">
        <Nav />
        <main
          className="flex-1"
          style={{ paddingTop: "var(--nav-height)" }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
