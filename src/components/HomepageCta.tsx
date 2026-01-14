"use client";

import React from "react";
import { CONTACT_INFO } from "@/config/contact";
import { useTranslation } from "./I18nProvider";

export default function HomepageCta() {
    const { t } = useTranslation();
    
    return (
        <section className="w-full bg-white py-20 md:py-28 relative text-center px-6">
            {/* Top Divider: Subtle and wide */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1120px] h-px bg-neutral-200/60" />

            {/* Content Container */}
            <div className="flex flex-col items-center">
                {/* Eyebrow */}
                <span className="font-avenir text-xs md:text-sm uppercase tracking-[0.2em] text-[#CB9275] mb-6 block">
                    {t("cta.eyebrow")}
                </span>

                {/* Headline */}
                <h2 className="font-canto text-4xl md:text-5xl lg:text-6xl text-neutral-800 leading-[1.1] mb-6 mx-auto max-w-3xl">
                    {t("cta.title")}
                </h2>

                {/* Supporting Text */}
                <p className="font-avenir text-lg md:text-xl text-neutral-500 font-light leading-relaxed max-w-xl mx-auto mb-10">
                    {t("cta.description")}
                </p>

                {/* CTA Button */}
                <a
                    href={CONTACT_INFO.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        inline-flex items-center gap-3 
                        font-avenir text-sm uppercase tracking-widest text-[#CB9275] 
                        border border-[#CB9275]/30 px-8 py-4 rounded-full
                        hover:bg-[#CB9275] hover:text-white hover:border-[#CB9275] 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CB9275]/40 focus-visible:ring-offset-2
                        transition-all duration-500 ease-out group
                    "
                >
                    <span>{t("cta.button")}</span>
                    {/* Arrow Icon */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        </section>
    );
}
