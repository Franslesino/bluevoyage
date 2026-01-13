"use client";

/**
 * Safety & Experience Ship Section
 * 
 * Displays boat safety and experience features with:
 * - Desktop: Split layout with 2-column feature grid + right-aligned image
 * - Mobile: Accordion layout for compact scrolling
 * 
 * Section naming convention:
 * - Destination (SpotlightCarousel)
 * - Safety & Experience Ship (this component)
 * - Local Community (LocalCommunity)
 */

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

// Boat Slides Data
const boatSlides = [
    { src: "/boat/zigzig/01.jpeg", alt: "TogeanVoyage boat - exterior view" },
    { src: "/boat/zigzig/02.jpeg", alt: "TogeanVoyage boat - deck and lounge" },
    { src: "/boat/zigzig/03.jpeg", alt: "TogeanVoyage boat - cabins and comfort" },
    { src: "/boat/zigzig/04.jpeg", alt: "TogeanVoyage boat - at sea golden hour" },
];

function BoatCarousel({ className }: { className?: string }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "center",
        containScroll: "trimSnaps",
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const applyActiveStyles = useCallback(() => {
        if (!emblaApi) return;
        const slides = emblaApi.slideNodes();
        const selected = emblaApi.selectedScrollSnap();

        slides.forEach((slide, index) => {
            if (index === selected) {
                slide.classList.add("is-active");
            } else {
                slide.classList.remove("is-active");
            }
        });
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
        applyActiveStyles();
    }, [emblaApi, applyActiveStyles]);

    useEffect(() => {
        if (!emblaApi) return;

        // Initial setup
        setScrollSnaps(emblaApi.scrollSnapList());
        onSelect(); // Set initial disabled state

        // Events
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("settle", applyActiveStyles);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
            emblaApi.off("settle", applyActiveStyles);
        };
    }, [emblaApi, onSelect, applyActiveStyles]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    return (
        <div className={`relative group ${className}`}>
            <div className="overflow-hidden h-full rounded-sm" ref={emblaRef}>
                <div className="flex h-full touch-pan-y gap-4 md:gap-6">
                    {boatSlides.map((slide, index) => (
                        <div
                            key={index}
                            className="embla-slide relative flex-[0_0_88%] md:flex-[0_0_55%] h-full min-w-0"
                        >
                            <div className="relative w-full h-full overflow-hidden rounded-sm bg-neutral-100 shadow-sm">
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows (Desktop Only) */}
            <button
                className={`hidden md:flex absolute top-1/2 left-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center text-neutral-900 shadow-lg transition-all z-20 -translate-y-1/2 ${prevBtnDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white opacity-0 group-hover:opacity-100"
                    }`}
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                aria-label="Previous slide"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                className={`hidden md:flex absolute top-1/2 right-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center text-neutral-900 shadow-lg transition-all z-20 -translate-y-1/2 ${nextBtnDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white opacity-0 group-hover:opacity-100"
                    }`}
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                aria-label="Next slide"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${index === selectedIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                            }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

// Feature items data
const features = [
    {
        id: "boat-cabins",
        title: "Boat, Cabins & Shared Space",
        description:
            "Comfort-first layout with shaded lounging, breezy cabins, and social corners. Room to stretch out, read, nap, and gather without feeling crowded.",
    },
    {
        id: "safety",
        title: "Safety On Board",
        description:
            "Safety-first routines, clear briefings, and well-maintained gear. You can relax fully knowing every detail is planned and checked.",
    },
    {
        id: "crew",
        title: "The Crew & Your Captain",
        description:
            "A calm, capable captain and warm crew who anticipate needs. They guide, help, and host with genuine care from start to finish.",
    },
    {
        id: "rhythm",
        title: "Daily Rhythm & Atmosphere",
        description:
            "A smooth, flexible flow shaped around weather and energy. Sunrise starts, slow afternoons, and golden-hour stops that feel right each day.",
    },
    {
        id: "cuisine",
        title: "Fresh Cuisine",
        description:
            "Fresh, flavorful meals prepared with attention. Local ingredients, balanced options, and thoughtful touches that make dining onboard simple and satisfying.",
    },
    {
        id: "purpose",
        title: "Travel With Purpose",
        description:
            "Travel that gives back through respectful local partnerships and mindful routes. Small choices that support communities and protect the reefs we all come to love.",
    },
];

// Accordion Item Component (Mobile)
function AccordionItem({
    feature,
    isOpen,
    onToggle,
}: {
    feature: (typeof features)[0];
    isOpen: boolean;
    onToggle: () => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(contentRef.current.scrollHeight);
        }
    }, []);

    return (
        <div className="border-b border-neutral-200">
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${feature.id}`}
                className="w-full flex items-center justify-between py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-[#6b4c3b] focus:ring-offset-2 rounded"
            >
                <span className="font-canto text-lg text-neutral-900">
                    {feature.title}
                </span>
                <svg
                    className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ease-out ${isOpen ? "rotate-90" : ""
                        }`}
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
            </button>
            <div
                id={`accordion-content-${feature.id}`}
                ref={contentRef}
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                    maxHeight: isOpen ? `${maxHeight}px` : "0px",
                    opacity: isOpen ? 1 : 0,
                }}
            >
                <div className="pt-3 pb-4 px-4">
                    <p className="font-avenir text-sm leading-relaxed text-neutral-600">
                        {feature.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function KapalSafetyExperience() {
    const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setOpenAccordionId((prev) => (prev === id ? null : id));
    };

    return (
        <section id="boat-safety-experience" className="bg-white py-16 md:py-24 lg:py-32">
            {/* Section Header */}
            <div className="text-center mb-10 md:mb-14 px-4">
                <Link href="/boat">
                    <h2 className="font-canto text-3xl md:text-4xl lg:text-5xl mb-4 text-neutral-900 hover:text-neutral-700 transition-colors cursor-pointer">
                        In the details: Boat Safety & Experience
                    </h2>
                </Link>
                <Link
                    href="/boat"
                    className="inline-flex items-center gap-2 text-sm md:text-base uppercase tracking-wider text-[#6B4C3B] hover:text-[#4A3429] transition-colors group font-avenir"
                >
                    <span className="group-hover:underline underline-offset-4">
                        Curated essentials: Explore All
                    </span>
                    <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
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

            {/* Desktop/Tablet Layout */}
            <div className="hidden md:block">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Column: Text Content */}
                        <div className="pl-6 lg:pl-8 pr-4 flex flex-col justify-center">
                            {/* Title */}
                            <h2 className="font-canto text-3xl md:text-4xl lg:text-5xl leading-tight text-neutral-900">
                                Sail easy, feel at home
                            </h2>

                            {/* Intro */}
                            <p className="mt-6 md:mt-8 font-avenir text-sm md:text-base leading-relaxed text-neutral-600 max-w-lg">
                                We travel unhurried. More sea, more silence, more care. These
                                are the essentials that make every TogeanVoyage journey safe,
                                comfortable, and deeply personal.
                            </p>

                            {/* Feature Grid (2 columns × 3 rows) */}
                            <div className="mt-10 md:mt-12 grid grid-cols-2 gap-x-8 gap-y-8 lg:gap-x-12 lg:gap-y-10">
                                {features.map((feature) => (
                                    <div key={feature.id}>
                                        <h3 className="font-canto text-xl md:text-2xl text-neutral-800">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-3 font-avenir text-sm leading-relaxed text-neutral-500">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Carousel */}
                        <div className="relative h-[600px] lg:h-[750px] w-full">
                            <BoatCarousel className="h-full w-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden px-4">
                {/* Title */}
                <h2 className="font-canto text-3xl leading-tight text-neutral-900 text-center">
                    Sail easy, feel at home
                </h2>

                {/* Intro */}
                <p className="mt-6 font-avenir text-sm leading-relaxed text-neutral-600 text-center">
                    We travel unhurried. More sea, more silence, more care. These are
                    the essentials that make every TogeanVoyage journey safe,
                    comfortable, and deeply personal.
                </p>

                {/* Carousel */}
                <div className="mt-8 w-full aspect-[4/3]">
                    <BoatCarousel className="h-full w-full" />
                </div>

                {/* Accordion */}
                <div className="mt-8">
                    {features.map((feature) => (
                        <AccordionItem
                            key={feature.id}
                            feature={feature}
                            isOpen={openAccordionId === feature.id}
                            onToggle={() => toggleAccordion(feature.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
