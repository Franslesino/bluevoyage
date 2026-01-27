import HomePage from "@/app/_pages/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BLUEVOYAGE - Explore Komodo Island",
    description: "Experience the ultimate expedition through Komodo Island's iconic landscapes with BlueVoyage.",
    alternates: {
        canonical: "/",
        languages: {
            "en": "/",
            "de": "/de",
            "fr": "/fr",
        },
    },
};

/**
 * English Homepage (root "/")
 */
export default function Page() {
    return <HomePage />;
}
