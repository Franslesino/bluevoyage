"use client";

import { useMemo } from "react";
import Image from "next/image";
import BackLink from "@/components/BackLink";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ZigzagScrollSections, { ZigzagItem } from "@/components/ZigzagScrollSections";
import { useTranslation } from "@/components/I18nProvider";

const localCommunityItemsData = [
    {
        id: "village-walks",
        imageSrc: "/local-community/gambarpertamax.webp",
        imageAlt: "Village walks and interactions in Togean",
    },
    {
        id: "sea-gypsy",
        imageSrc: "/local-community/gambarkeduax.webp",
        imageAlt: "Bajau sea gypsy culture and boats",
    },
    {
        id: "shared-meals",
        imageSrc: "/local-community/gambarketigax.webp",
        imageAlt: "Shared meal with locals",
    },
    {
        id: "respectful-photos",
        imageSrc: "/local-community/gambarkeempatx.webp",
        imageAlt: "Respectful photography and connection",
    },
];

export default function LocalCommunityPage() {
    const { t } = useTranslation();

    const localCommunityItems: ZigzagItem[] = useMemo(() => 
        localCommunityItemsData.map(item => ({
            id: item.id,
            title: t(`localCommunityPage.items.${item.id}.title`),
            body: t(`localCommunityPage.items.${item.id}.body`),
            imageSrc: item.imageSrc,
            imageAlt: item.imageAlt,
        }))
    , [t]);

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
                        <BackLink href="/#local-community" label={t("localCommunityPage.backLabel")} variant="light" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-4xl mx-auto pt-10">
                        <h1 className="font-canto text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-none drop-shadow-md">
                            {t("localCommunityPage.heroTitle")}
                        </h1>
                        <p className="font-avenir text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed drop-shadow-sm text-white/90">
                            {t("localCommunityPage.heroDescription")}
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
