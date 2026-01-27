"use client";

import Image from "next/image";
import { useTranslation } from "./I18nProvider";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section id="hero-section" className="hero relative">
            {/* Background Video */}
            <video
                className="hero__video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            >
                <source src="/vidfootage.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay */}
            <div className="hero__overlay" />

            {/* Center Content */}
            <div className="absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none w-full px-6 flex justify-center text-center">
                <p className="font-canto text-white text-2xl leading-snug sm:text-3xl lg:text-5xl lg:leading-snug max-w-[24ch] sm:max-w-[35ch] lg:max-w-[45ch] drop-shadow-sm pointer-events-auto">
                    {t("hero.tagline")}
                </p>
            </div>

            {/* Sentinel for IntersectionObserver */}
            <div id="hero-sentinel" className="absolute bottom-0 left-0 w-full h-px pointer-events-none" />
        </section>
    );
}

