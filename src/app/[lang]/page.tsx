import HomePage from "@/app/_pages/HomePage";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

/**
 * Generate static params for all locale routes
 */
export function generateStaticParams() {
    return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

/**
 * Non-English Homepage (/de, /fr)
 */
export default function Page() {
    return <HomePage />;
}
