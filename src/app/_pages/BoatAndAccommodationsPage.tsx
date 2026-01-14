"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import CollectionSlider from "@/components/CollectionSlider";
import LocaleLink from "@/components/LocaleLink";
import { useTranslation } from "@/components/I18nProvider";

const boatItems = [
    {
        title: "The Speed of Silence",
        description: "Glide through the archipelago on our premium wooden speedboat. Designed for smooth transfers and sunset cruises.",
        imagePath: "/images/collection/boat-1.png",
        href: "#"
    },
    {
        title: "Lounge & Horizon",
        description: "Shaded comfort, teak decks, and the endless blue. Ideally suited for long lazy days between dives.",
        imagePath: "/images/collection/boat-2.png",
        href: "#"
    },
    {
        title: "Safety & Service",
        description: "Your safety is our ritual. Expert crew, top-tier gear, and genuine care in every interaction.",
        imagePath: "/images/collection/boat-3.png",
        href: "#"
    },
    {
        title: "Lagoon Explorer",
        description: "Navigate shallow reefs and hidden lagoons where larger vessels cannot reach. Pure immersion.",
        imagePath: "/images/collection/boat-4.png",
        href: "#"
    }
];

const stayItems = [
    {
        title: "Pulau Puat Guest House",
        description: "Sustainable luxury woven into the jungle. Wake up to the sound of waves and birdsong.",
        imagePath: "/images/collection/stay-1.png",
        href: "#"
    },
    {
        title: "Malenge Guest House",
        description: "Airy, light-filled rooms with panoramic ocean views. Simplicity meets premium comfort.",
        imagePath: "/images/collection/stay-2.png",
        href: "#"
    },
    {
        title: "Walea Kodi Guest House",
        description: "Your own private terrace for golden hours. Unwind in a hammock where time stands still.",
        imagePath: "/images/collection/stay-3.png",
        href: "#"
    },
    {
        title: "Una Una Guest House",
        description: "Gather under the palms for communal feasting. Warm lights, sand floors, and unforgettable stories.",
        imagePath: "/images/collection/stay-4.png",
        href: "#"
    }
];

export default function BoatAndAccommodationsPage() {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen text-neutral-900 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-24 w-full">
                {/* Back Button & Page Header */}
                <div className="max-w-[1280px] mx-auto px-4 md:px-8 mb-16 md:mb-20">
                    {/* Back Button */}
                    <div className="mb-8 md:mb-12">
                        <LocaleLink
                            href="/#boat-and-accommodations"
                            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-[#6b4c3b] transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                            {t("common.back")}
                        </LocaleLink>
                    </div>

                    <div className="text-center">
                        <h1 className="font-canto text-5xl md:text-7xl text-neutral-900 mb-6 tracking-tight">
                            {t("boatAndAccommodations.pageTitle")}
                        </h1>
                        <p className="font-avenir text-xl md:text-2xl text-neutral-500 font-light max-w-2xl mx-auto">
                            {t("boatAndAccommodations.subtitle")}
                        </p>
                    </div>
                </div>

                {/* Boat Section */}
                <section className="pl-4 md:pl-8 lg:pl-12 pr-0 mb-24 md:mb-32">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center mb-8 md:mb-12">
                        <h2 className="font-canto text-3xl md:text-5xl text-neutral-900">
                            {t("boatAndAccommodations.boatSectionTitle")}
                        </h2>
                    </div>
                    <CollectionSlider
                        variant="boat"
                        items={boatItems}
                    />
                </section>

                {/* Accommodation Section */}
                <section className="pl-4 md:pl-8 lg:pl-12 pr-0">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center mb-8 md:mb-12">
                        <h2 className="font-canto text-3xl md:text-5xl text-neutral-900">
                            {t("boatAndAccommodations.accommodationSectionTitle")}
                        </h2>
                    </div>
                    <CollectionSlider
                        variant="stay"
                        items={stayItems}
                    />
                </section>
            </main>

            <FooterSection />
        </div>
    );
}
