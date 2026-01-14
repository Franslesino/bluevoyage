import AccommodationPage from "@/app/_pages/AccommodationPage";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

export async function generateStaticParams() {
    return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export default function Page() {
    return <AccommodationPage />;
}
