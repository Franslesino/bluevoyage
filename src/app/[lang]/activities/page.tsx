import ActivitiesPage from "@/app/_pages/ActivitiesPage";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

export async function generateStaticParams() {
    return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export default function Page() {
    return <ActivitiesPage />;
}
