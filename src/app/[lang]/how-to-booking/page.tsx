import HowToBookingPage from "@/app/_pages/HowToBookingPage";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

export async function generateStaticParams() {
    return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export default function Page() {
    return <HowToBookingPage />;
}
