import SearchResults from "@/components/SearchResults";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Search Results | Togean Voyages",
    description: "Browse available liveaboard ships and cabins for your Togean Islands adventure.",
};

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
