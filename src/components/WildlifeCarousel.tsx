"use client";

/**
 * Wildlife Section
 * 
 * Displays a split layout (Text Left, Carousel Right) on desktop,
 * and stacked layout on mobile.
 * Dark background #1E1E1D.
 * Uses embla-carousel-react with infinite loop.
 */

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const wildlifeData = [
    {
        name: "Monyet Togean",
        scientific: "Macaca tonkeana togeanus",
        description: "Endemic island macaque, curious forest forager.",
        image: "/wildlife_real/land/togian-monkey/hero.webp",
    },
    {
        name: "Babirusa Togean",
        scientific: "Babyrousa togeanensis",
        description: "Rare tusked pig, shy in dense forest.",
        image: "/wildlife_real/land/togean-babirusa/hero.webp",
    },
    {
        name: "Togean Golden Bulbul",
        scientific: "Hypsipetes aureus",
        description: "Golden-feathered songbird, endemic canopy resident.",
        image: "/wildlife-bulbul.webp",
    },
    {
        name: "Kima Raksasa",
        scientific: "Tridacna spp.",
        description: "Protected reef giant, vibrant mantle filters water.",
        image: "/wildlife_real/sea/giant-clam/hero.webp",
    },
    {
        name: "Biawak Togean",
        scientific: "Varanus togianus",
        description: "Large island monitor, basks near mangroves.",
        image: "/wildlife_real/land/togian-water-monitor/hero.webp",
    },
    {
        name: "Tarsius Togean",
        scientific: "Tarsius niemitzi",
        description: "Nocturnal big-eyed tarsier, best seen at night.",
        image: "/wildlife_real/land/togean-tarsier/hero.webp",
    },
];

export default function WildlifeCarousel() {
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
        <section className="bg-[#1E1E1D] py-16 md:py-24 text-white overflow-hidden">
            <div className="mx-auto max-w-[1400px] px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left order-1">
                        <h2 className="font-canto text-4xl lg:text-5xl mb-6 leading-tight">
                            Where to meet the wild
                        </h2>
                        <p className="font-avenir text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
                            A living archipelago of forests, reefs, and night sounds. Discover the native species that make Togean feel untouched and unforgettable.
                        </p>

                        {/* Desktop Button Location */}
                        <div className="hidden lg:block">
                            <Link
                                href="/wildlife"
                                className="inline-block px-8 py-3 border border-gray-500 text-white font-avenir tracking-wide uppercase text-sm hover:border-white hover:bg-white/5 transition-all duration-300"
                            >
                                Explore the wildlife
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Carousel */}
                    <div className="w-full lg:w-2/3 relative order-2">
                        {/* Carousel Wrapper */}
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex touch-pan-y -ml-4">
                                {wildlifeData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex-[0_0_85%] md:flex-[0_0_26%] min-w-0 pl-4 relative"
                                    >
                                        <div className="relative aspect-[3/5] md:aspect-[3/5] overflow-hidden group/card bg-neutral-800 rounded-sm">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                                                sizes="(max-width: 768px) 85vw, 25vw"
                                            />
                                            {/* Bottom Gradient Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                                            {/* Text Content */}
                                            <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none">
                                                <h3 className="font-canto font-bold text-white text-2xl mb-1 leading-tight text-left">
                                                    {item.name}
                                                </h3>
                                                <p className="font-avenir text-sm text-white/80 leading-snug text-left max-w-[90%]">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows (Desktop Only) */}
                        <button
                            onClick={scrollPrev}
                            className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 border border-white/20 text-white transition-all z-10 backdrop-blur-sm"
                            aria-label="Previous slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 border border-white/20 text-white transition-all z-10 backdrop-blur-sm"
                            aria-label="Next slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-3 mt-8">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex
                                            ? "bg-white scale-110"
                                            : "bg-gray-600 hover:bg-gray-500"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Mobile Button Location (Last) */}
                    <div className="w-full flex justify-center lg:hidden order-3 mt-4">
                        <Link
                            href="/wildlife"
                            className="inline-block px-8 py-3 border border-gray-500 text-white font-avenir tracking-wide uppercase text-sm hover:border-white hover:bg-white/5 transition-all duration-300"
                        >
                            Explore the wildlife
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
