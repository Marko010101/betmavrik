import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(en|ar|ge)/:path*"], // Match root and locales
};
