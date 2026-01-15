import HomePage from "@/app/_pages/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Togean Voyage - Explore the Togean Islands",
    description: "Discover the untouched beauty of the Togean Islands. Slow travel, pristine reefs, and authentic island experiences.",
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
