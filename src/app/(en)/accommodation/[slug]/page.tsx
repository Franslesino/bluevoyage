import AccommodationDetails from "@/app/_pages/AccommodationDetails";
import { accommodations } from "@/data/accommodations";

export async function generateStaticParams() {
    return accommodations.map((item) => ({ slug: item.slug }));
}

export default function Page() {
    return <AccommodationDetails />;
}
