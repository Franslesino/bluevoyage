"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import LocaleLink from "@/components/LocaleLink";
import { useTranslation } from "@/components/I18nProvider";

export default function BoatSafetyAndExperiencePage() {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto text-center">
                <div className="mb-8">
                    <LocaleLink
                        href="/"
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-[#6b4c3b] transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                        {t("common.back")}
                    </LocaleLink>
                </div>
                <h1 className="font-canto text-5xl md:text-7xl mb-6">
                    {t("boatSafetyAndExperience.pageTitle")}
                </h1>
                <p className="font-avenir text-xl text-neutral-500">
                    {t("boatSafetyAndExperience.comingSoon")}
                </p>
            </main>
            <FooterSection />
        </div>
    );
}
