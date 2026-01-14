import { SUPPORTED_LOCALES } from "@/lib/i18n";

/**
 * Generate static params for all locale routes
 * This ensures /de and /fr are pre-rendered during build
 */
export function generateStaticParams() {
    return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export { generateStaticParams as default };
