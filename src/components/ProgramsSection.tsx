"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { PROGRAMS_HOME } from "@/data/programsHome";

// Extracted Card Component for State Management
const ProgramSlide = ({ program, index }: { program: typeof PROGRAMS_HOME[0]; index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="relative flex-none w-full min-w-0 pl-4 md:pl-0">
            {/* Card Container: Centered with mx-auto to avoid button overlap, reduced size */}
            <div className="relative w-full max-w-[95%] md:max-w-[85%] lg:max-w-[85%] mx-auto min-h-0 md:min-h-[500px] flex flex-col md:flex-row md:items-stretch">

                {/* Info Panel (Left on Desktop, Top on Mobile) */}
                <div className="relative w-full md:w-[57%] md:shrink-0 bg-[#F3F3F3] z-10 p-6 md:p-12 lg:p-14 shadow-sm md:shadow-none border-l-4 border-l-[#088F8F] md:border-l-0 flex flex-col justify-between">

                    <div className="mb-6 md:mb-10">
                        {/* Top Label - kept but styled consistently */}
                        <span className="block text-[10px] md:text-xs font-avenir font-bold tracking-[0.2em] text-[#088F8F] uppercase mb-3 md:mb-4">
                            PROGRAMS NOW OPEN
                        </span>

                        <h3 className="font-canto text-2xl md:text-4xl lg:text-5xl text-[#1a1a1a] leading-tight mb-4 md:mb-6">
                            {(() => {
                                if (!program.title.includes(":")) return program.title;
                                const parts = program.title.split(":");
                                const main = parts[0];
                                const sub = parts[1].trim().split(" ");
                                const firstWord = sub[0];
                                const rest = sub.slice(1).join(" ");
                                return (
                                    <>
                                        {main} : {firstWord}
                                        <br />
                                        {rest}
                                    </>
                                );
                            })()}
                        </h3>

                        <div className="w-12 md:w-16 h-[1px] bg-[#088F8F] mb-4 md:mb-6"></div>

                        {/* Description Wrapper with max-height transition for mobile */}
                        <div
                            className={`relative overflow-hidden transition-all duration-700 ease-in-out md:max-h-none ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-[3.6em] opacity-90"
                                }`}
                        >
                            <p className="font-avenir text-sm md:text-base lg:text-lg text-[#1a1a1a]/70 leading-relaxed mb-0 max-w-lg">
                                {program.description}
                            </p>

                            {/* Gradient Fade for Collapsed State (Mobile Only) */}
                            <div className={`absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#F3F3F3] to-transparent md:hidden transition-opacity duration-500 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
                        </div>

                        {/* Read More Toggle (Mobile Only) */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="md:hidden mt-2 text-xs font-bold font-avenir text-[#088F8F] uppercase tracking-wider flex items-center gap-1 focus:outline-none"
                            aria-expanded={isExpanded}
                            aria-controls={`desc-${program.id}`}
                        >
                            {isExpanded ? "Show Less" : "Read More"}
                            <svg
                                className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="w-full md:w-auto mt-6 md:mt-0">
                        <Link
                            href={`/journeys/${program.slug}`}
                            className="block w-full md:w-[360px] text-center py-3 md:py-4 border border-[#088F8F] font-avenir text-xs md:text-sm tracking-[0.2em] uppercase text-[#088F8F] hover:bg-[#088F8F] hover:text-white transition-all duration-200"
                        >
                            INFO
                        </Link>
                    </div>
                </div>

                {/* Image Panel (Right on Desktop, Bottom on Mobile) */}
                <div className="w-full md:w-[47%] md:shrink-0 md:-ml-[4%] z-20 aspect-[16/9] md:aspect-auto relative overflow-hidden mt-0 md:mt-0 shadow-xl">
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
    );
};

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
    const accentColor = "#088F8F";

    return (
        <section id="programs" className="relative w-full py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">

                {/* Section Header */}
                <div className="mb-10 md:mb-12 text-center max-w-4xl mx-auto">
                    <h2 className="font-canto text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 font-normal">
                        Choose your journey: Signature Programs
                    </h2>
                    <Link
                        href="/journeys/the-togean-odyssey" // Temporary link
                        className="inline-flex items-center gap-2 text-sm md:text-base uppercase tracking-wider font-avenir text-[#088F8F] visited:text-[#088F8F] active:text-[#066e6e] hover:text-[#066e6e] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#088F8F]/30"
                    >
                        <span className="relative bg-gradient-to-r from-[#088F8F] to-[#066e6e] bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-[#066e6e] group-hover:to-[#088F8F] font-bold">
                            Discover our programs: Explore All
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#088F8F] to-[#066e6e] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <svg
                            className="w-4 h-4 text-[#088F8F] transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>

                {/* Carousel Container */}
                <div className="relative group">
                    <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                        <div className="flex touch-pan-y">
                            {PROGRAMS_HOME.map((program, index) => (
                                <ProgramSlide key={program.id} program={program} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows - Absolute Positioned */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-[-2rem] z-40 w-12 h-12 rounded-full bg-background/80 border border-foreground/10 flex items-center justify-center hover:bg-[#088F8F] hover:text-white hover:border-[#088F8F] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-background/80 disabled:hover:text-foreground hidden md:flex shadow-lg backdrop-blur-sm"
                        aria-label="Previous slide"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 z-40 w-12 h-12 rounded-full bg-background/80 border border-foreground/10 flex items-center justify-center hover:bg-[#088F8F] hover:text-white hover:border-[#088F8F] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-background/80 disabled:hover:text-foreground hidden md:flex shadow-lg backdrop-blur-sm"
                        aria-label="Next slide"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots - Centered below card */}
                    <div className="flex justify-center gap-3 mt-6">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex
                                    ? "bg-[#088F8F] scale-125"
                                    : "bg-[#CFCFCF] hover:bg-[#B0B0B0]"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProgramsSection;
