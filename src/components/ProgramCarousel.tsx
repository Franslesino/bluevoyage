"use client";

/**
 * Program Carousel Section
 * 
 * Displays a square-card infinite carousel of featured programs.
 * Uses embla-carousel-react.
 * 
 * - Desktop: ~5 slides visible, centered
 * - Mobile: 1 slide visible, centered
 * - Infinite loop
 */

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import { programs } from "@/data/programs";
import ExploreAllLink from "./ExploreAllLink";
import LocaleLink from "./LocaleLink";
import { useTranslation } from "./I18nProvider";

export default function ProgramCarousel() {
    const { t } = useTranslation();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        containScroll: "trimSnaps",
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14 px-4">
                    <h2 className="font-canto text-3xl md:text-4xl lg:text-5xl mb-4 text-neutral-900 leading-tight">
                        {t("activities.title")}
                    </h2>
                    <ExploreAllLink href="/activities" label={t("activities.subtitle")} />
                </div>

                {/* Carousel Wrapper */}
                <div className="relative group">
                    {/* Viewport - Force LTR to prevent RTL layout issues */}
                    <div className="overflow-hidden" ref={emblaRef} dir="ltr" style={{ direction: "ltr" }}>
                        <div className="flex touch-pan-y">
                            {programs.map((program, index) => {
                                const programName = t(`activities.items.${program.slug}.name`) || program.name;

                                return (
                                    <div
                                        key={index}
                                        className="flex-[0_0_88%] md:flex-[0_0_22%] min-w-0 pl-4 md:pl-6 relative"
                                    >
                                        <LocaleLink
                                            href={`/activities/${program.slug}?from=home`}
                                            className="block aspect-square relative overflow-hidden group/card cursor-pointer rounded-sm"
                                            aria-label={`${t("activities.viewActivity")}: ${programName}`}
                                        >
                                            <Image
                                                src={program.image}
                                                alt={programName}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                                                sizes="(max-width: 768px) 80vw, 25vw"
                                            />
                                            {/* Gradient Overlay (Bottom only) */}
                                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                                            {/* Text Content */}
                                            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 pointer-events-none">
                                                <h3 className="font-canto font-bold text-white text-lg md:text-2xl leading-tight text-left max-w-[95%] drop-shadow-sm">
                                                    {programName}
                                                </h3>
                                            </div>
                                        </LocaleLink>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Arrows (Desktop) */}
                    <button
                        onClick={scrollPrev}
                        className="hidden md:flex absolute -left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm transition-all z-10 text-neutral-700 hover:text-neutral-900 focus:outline-none"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="hidden md:flex absolute -right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm transition-all z-10 text-neutral-700 hover:text-neutral-900 focus:outline-none"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-8 md:mt-10">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex
                                ? "bg-[#6b4c3b] scale-110"
                                : "bg-neutral-300 hover:bg-neutral-400"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section >
    );
}
