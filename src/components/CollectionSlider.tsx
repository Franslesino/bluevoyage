"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import LocaleLink from "./LocaleLink";
import useEmblaCarousel from "embla-carousel-react";

type Item = {
    title: string;
    description: string;
    imagePath: string;
    href: string;
};

type CollectionSliderProps = {
    variant?: "boat" | "stay";
    items: Item[];
};

export default function CollectionSlider({
    variant = "boat",
    items,
}: CollectionSliderProps) {
    // Embla config: loop + align start + trimSnaps
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        containScroll: "trimSnaps",
        duration: 40, // Slightly slower for cinematic feel
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section className="relative w-full overflow-hidden bg-neutral-900 rounded-sm">
            {/* Carousel Viewport - Force LTR for carousel */}
            <div ref={emblaRef} className="h-[80vh] md:h-[90vh] w-full cursor-grab active:cursor-grabbing" dir="ltr" style={{ direction: "ltr" }}>
                {/* Container */}
                <div className="flex h-full touch-pan-y">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="relative h-full flex-[0_0_85vw] md:flex-[0_0_60vw] lg:flex-[0_0_50vw] min-w-0 border-r border-[#ffffff10]"
                        >
                            {/* Image Background */}
                            <div className="relative w-full h-full">
                                <Image
                                    src={item.imagePath}
                                    alt={item.title}
                                    fill
                                    priority={index < 2}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 85vw, 50vw"
                                />
                                {/* Mobile Overlay (Always Visible Gradient) */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
                            </div>

                            {/* Content Overlay */}
                            <LocaleLink href={item.href} className="group absolute inset-0 block">
                                {/* Desktop Hover Overlay: Fades in dark bg */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 ease-out md:group-hover:opacity-100 hidden md:block" />

                                {/* Content Stack */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 text-center items-center">
                                    <div className="transform translate-y-4 transition-all duration-500 ease-out md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 text-white max-w-lg">
                                        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 md:mb-4 text-white/80 font-avenir">
                                            {variant === "boat" ? "THE BOAT LIFE" : "ACCOMMODATION"}
                                        </p>
                                        <h3 className="font-canto text-2xl md:text-4xl lg:text-5xl uppercase tracking-wide mb-3 md:mb-4 leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="font-avenir text-sm md:text-base text-gray-200 mb-6 md:mb-8 leading-relaxed max-w-sm mx-auto">
                                            {item.description}
                                        </p>
                                        <span className="inline-block font-avenir text-xs md:text-sm font-bold uppercase tracking-widest border-b border-white pb-1 group/cta transition-all">
                                            Take Me There
                                        </span>
                                    </div>
                                </div>
                            </LocaleLink>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 md:px-8 z-30">
                <button
                    onClick={scrollPrev}
                    className="pointer-events-auto w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-105 backdrop-blur-sm group focus:outline-none"
                    aria-label="Previous slide"
                >
                    <svg
                        className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <button
                    onClick={scrollNext}
                    className="pointer-events-auto w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-105 backdrop-blur-sm group focus:outline-none"
                    aria-label="Next slide"
                >
                    <svg
                        className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </section>
    );
}
