"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { PROGRAMS_HOME } from "@/data/programsHome";

const ProgramsSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
        dragFree: false,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onInit = useCallback((emblaApi: any) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: any) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi.on("reInit", onInit);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    // Accent color for inline styles where needed (though we use Tailwind classes mostly)
    const accentColor = "#CB9275";

    return (
        <section className="relative w-full py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">

                {/* Section Header */}
                <div className="mb-12 md:mb-16 text-center max-w-4xl mx-auto">
                    <h2 className="font-canto text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 font-normal">
                        In the spotlight: Signature Programs
                    </h2>
                    <Link
                        href="/journeys/the-togean-odyssey" // Temporary link to first program or could be a general programs page if it existed
                        className="group inline-flex items-center text-lg md:text-xl font-avenir font-medium text-[#6B4C3B] hover:text-[#6B4C3B] transition-colors"
                    >
                        <span className="border-b border-transparent group-hover:border-[#6B4C3B] transition-all duration-300">
                            Curated Experiences: Explore Programs
                        </span>
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&gt;</span>
                    </Link>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                        <div className="flex touch-pan-y">
                            {PROGRAMS_HOME.map((program, index) => (
                                <div
                                    key={program.id}
                                    className="relative flex-none w-full min-w-0 pl-4 md:pl-0"
                                >
                                    <div className="relative w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mr-auto min-h-[500px] md:min-h-[750px] flex flex-col md:block">

                                        {/* Info Panel (Left on Desktop, Top on Mobile) */}
                                        <div className="relative w-full md:w-[60%] bg-[#F3F3F3] z-10 p-8 md:p-16 lg:p-20 shadow-sm md:shadow-none border-l-4 border-l-[#CB9275] md:border-l-0">

                                            <div className="mb-8 md:mb-12">
                                                <span className="block text-xs font-avenir font-bold tracking-[0.2em] text-[#CB9275] uppercase mb-4">
                                                    PROGRAMS NOW OPEN
                                                </span>
                                                <h3 className="font-canto text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                                                    {program.title}
                                                </h3>
                                                <div className="w-16 h-[1px] bg-[#CB9275] mb-6"></div>
                                                <p className="font-avenir text-base md:text-lg text-foreground/70 leading-relaxed mb-8 max-w-lg">
                                                    {program.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-4">
                                                <Link
                                                    href={`/journeys/${program.slug}`}
                                                    className="px-8 py-3 border border-foreground/20 font-avenir text-sm tracking-wider uppercase hover:bg-foreground hover:text-background transition-all duration-300"
                                                >
                                                    Info
                                                </Link>
                                                <Link
                                                    href="/how-to-book"
                                                    className="px-8 py-3 bg-[#CB9275] text-white border border-[#CB9275] font-avenir text-sm tracking-wider uppercase hover:bg-[#B67F63] hover:border-[#B67F63] transition-all duration-300"
                                                >
                                                    Book Now
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Image Panel (Right on Desktop, Bottom on Mobile) - Overlap Effect */}
                                        <div className="w-full md:w-[63%] md:absolute md:top-16 md:right-0 z-20 aspect-[4/3] md:h-[624px] md:aspect-auto relative overflow-hidden mt-0 md:mt-0 shadow-xl">
                                            <Image
                                                src={program.image}
                                                alt={program.title}
                                                fill
                                                className="object-cover transition-transform duration-700 hover:scale-105"
                                                priority={index === 0}
                                            />
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center md:justify-end md:gap-8 mt-8 md:mt-4 w-full max-w-[90%] lg:max-w-[85%] mx-auto px-4 md:px-0 relative z-30">

                        {/* Dots */}
                        <div className="flex gap-3">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex
                                        ? "bg-[#CB9275] scale-125"
                                        : "bg-foreground/20 hover:bg-foreground/40"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Arrows */}
                        <div className="flex gap-4 ml-6">
                            <button
                                onClick={scrollPrev}
                                className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-white transition-all duration-300 disabled:opacity-30"
                                aria-label="Previous slide"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={scrollNext}
                                className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-white transition-all duration-300 disabled:opacity-30"
                                aria-label="Next slide"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramsSection;
