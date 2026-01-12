"use client";

import Link from "next/link";
import Image from "next/image";
import BackLink from "@/components/BackLink";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ZigzagScrollSections, { ZigzagItem } from "@/components/ZigzagScrollSections";

const localCommunityItems: ZigzagItem[] = [
    {
        id: "village-walks",
        title: "Basket Balancing, Morning Smiles",
        body: "Walk the village paths as neighbors carry harvest and household goods with ease. Say hello, share a laugh, and glimpse the rhythm of island mornings where work and warmth travel together.",
        imageSrc: "/local-community/gambarpertamax.webp",
        imageAlt: "Village walks and interactions in Togean",
    },
    {
        id: "sea-gypsy",
        title: "Harbor Fish Market Buzz",
        body: "Step into the waterfront market where today’s catch becomes tonight’s dinner. Watch friendly bargaining, learn fish names, and meet fishers and sellers who keep coastal life lively and connected.",
        imageSrc: "/local-community/gambarkeduax.webp",
        imageAlt: "Bajau sea gypsy culture and boats",
    },
    {
        id: "shared-meals",
        title: "Island Boat Rides, Shared Laughs",
        body: "Cruise between reefs and villages with local boat crews and fellow travelers. Swap stories, snap a quick photo, and feel how shared ocean time turns strangers into a small team.",
        imageSrc: "/local-community/gambarketigax.webp",
        imageAlt: "Shared meal with locals",
    },
    {
        id: "respectful-photos",
        title: "Weaving Circles and Community Pride",
        body: "Sit with women artisans as they stitch bold textiles by hand while children giggle nearby. Learn the meaning of patterns, support local livelihoods, and leave with a story you can wear.",
        imageSrc: "/local-community/gambarkeempatx.webp",
        imageAlt: "Respectful photography and connection",
    },
];

export default function LocalCommunityPage() {
    return (
        <div className="bg-white min-h-screen text-neutral-900 flex flex-col">
            <Navbar />

            <main className="flex-grow w-full">
                {/* Hero Section */}
                <div className="relative w-full min-h-[100vh] flex flex-col justify-center items-center text-center px-4 md:px-8 text-white overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        <Image
                            src="/local-community/hero.webp"
                            alt="Local Community Hero"
                            fill
                            className="object-cover"
                            priority
                            quality={90}
                        />
                        {/* Overlay for readability */}
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Back Button (Absolute Top-Left within Hero) */}
                    <div className="absolute top-24 left-4 md:left-8 z-20">
                        <BackLink href="/#local-community" label="Back" variant="light" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-4xl mx-auto pt-10">
                        <h1 className="font-canto text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-none drop-shadow-md">
                            Local Community
                        </h1>
                        <p className="font-avenir text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed drop-shadow-sm text-white/90">
                            Experience the heart of Togean and Luwuk through the people who call it home. Discover a culture built on warmth, shared stories, and the timeless rhythm of coastal life.
                        </p>
                    </div>
                </div>

                {/* Zigzag Scroll Sections */}
                <ZigzagScrollSections items={localCommunityItems} />

            </main>

            <FooterSection />
        </div>
    );
}
