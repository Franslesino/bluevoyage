import AccommodationDetails from "@/app/_pages/AccommodationDetails";
import { accommodations } from "@/data/accommodations";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

export async function generateStaticParams() {
    const params = [];
    for (const locale of SUPPORTED_LOCALES) {
        for (const item of accommodations) {
            params.push({ lang: locale, slug: item.slug });
        }
    }
    return params;
}

export default function Page() {
    return <AccommodationDetails />;
}
