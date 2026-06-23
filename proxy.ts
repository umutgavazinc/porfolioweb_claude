import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Tüm rotaları eşleştir, Next.js dahili dosyalarını hariç tut
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
