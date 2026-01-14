import BoatSafetyAndExperiencePage from "@/app/_pages/BoatSafetyAndExperiencePage";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
    return SUPPORTED_LOCALES.map((lang: Locale) => ({ lang }));
}

export default function Page() {
    return <BoatSafetyAndExperiencePage />;
}
