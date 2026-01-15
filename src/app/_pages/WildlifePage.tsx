"use client";

import { useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WildlifeIntroScroll from "@/components/WildlifeIntroScroll";
import WildlifeGallery from "@/components/WildlifeGallery";
import { wildlifeSpecies } from "@/data/wildlifeSpecies";
import BackLink from "@/components/BackLink";
import { useTranslation } from "@/components/I18nProvider";

export default function WildlifePage() {
    const { t } = useTranslation();
    
    // Handle hash scrolling on mount
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, []);

    return (
        <div className="bg-white min-h-screen text-neutral-900">
            <Navbar />

            {/* SECTION 1: HERO (FULL 1 SCREEN) */}
            <header className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute z-50 top-24 left-4 md:left-8">
                    <BackLink href="/#wildlife" label={t("common.backToHome")} variant="light" />
                </div>
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/wildlife_real/hero.png"
                        alt="Togean Islands seascape with wildlife mood"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Subtle Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
                </div>

                {/* Overlay Text */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="font-canto text-5xl md:text-7xl lg:text-8xl text-white tracking-wide shadow-sm">
                        {t("wildlife.heroTitle")}
                    </h1>
                </div>
            </header>

            <main>
                {/* SECTION 2: SCROLL INTRO BLOCK */}
                <WildlifeIntroScroll />

                {/* SECTION 3: SPECIES GALLERY */}
                <WildlifeGallery species={wildlifeSpecies} />
            </main>

            <FooterSection />
        </div>
    );
}
