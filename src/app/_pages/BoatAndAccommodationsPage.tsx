"use client";

import React, { useMemo } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import CollectionSlider from "@/components/CollectionSlider";
import LocaleLink from "@/components/LocaleLink";
import { useTranslation } from "@/components/I18nProvider";

const boatItemsData = [
    {
        id: "speed-of-silence",
        imagePath: "/images/collection/boat-1.png",
        href: "#"
    },
    {
        id: "lounge-horizon",
        imagePath: "/images/collection/boat-2.png",
        href: "#"
    },
    {
        id: "safety-service",
        imagePath: "/images/collection/boat-3.png",
        href: "#"
    },
    {
        id: "lagoon-explorer",
        imagePath: "/images/collection/boat-4.png",
        href: "#"
    }
];

const stayItemsData = [
    {
        id: "pulau-puat",
        imagePath: "/images/collection/stay-1.png",
        href: "#"
    },
    {
        id: "malenge",
        imagePath: "/images/collection/stay-2.png",
        href: "#"
    },
    {
        id: "walea-kodi",
        imagePath: "/images/collection/stay-3.png",
        href: "#"
    },
    {
        id: "una-una",
        imagePath: "/images/collection/stay-4.png",
        href: "#"
    }
];

export default function BoatAndAccommodationsPage() {
    const { t } = useTranslation();

    const boatItems = useMemo(() => 
        boatItemsData.map(item => ({
            title: t(`boatAndAccommodations.boatItems.${item.id}.title`),
            description: t(`boatAndAccommodations.boatItems.${item.id}.description`),
            imagePath: item.imagePath,
            href: item.href
        }))
    , [t]);

    const stayItems = useMemo(() => 
        stayItemsData.map(item => ({
            title: t(`boatAndAccommodations.stayItems.${item.id}.title`),
            description: t(`boatAndAccommodations.stayItems.${item.id}.description`),
            imagePath: item.imagePath,
            href: item.href
        }))
    , [t]);

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
