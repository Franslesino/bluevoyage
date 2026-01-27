import SearchResults from "@/components/SearchResults";
import Navbar from "@/components/Navbar";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

export const metadata = {
    title: "Search Results | Togean Voyages",
    description: "Browse available liveaboard ships and cabins for your Togean Islands adventure.",
};

export function generateStaticParams() {
    return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export default function ResultsRoute() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
                <SearchResults />
            </main>
        </>
    );
}
