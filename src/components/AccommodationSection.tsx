"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

// --- Data ---

const slides = [
    {
        title: "Pulau Puat",
        description: "Simple seaside guest house calm, with sunrise views and easy boat access.",
        image: "/accommodation/accommodation-pulau-puat.webp",
    },
    {
        title: "Malengue",
        description: "A quiet village stay with breezy nights and warm local hosting.",
        image: "/accommodation/accommodation-malengue.webp",
    },
    {
        title: "Walea Kodi",
        description: "A restful base near reefs, perfect for slow mornings and early snorkels.",
        image: "/accommodation/accommodation-walea-kodi.webp",
    },
    {
        title: "Una Una",
        description: "Volcanic-island atmosphere, cool evenings, and a peaceful place to reset.",
        image: "/accommodation/accommodation-una-una.webp",
    },
];

const features = [
    {
        id: "guest-house",
        title: "By the sea at sunrise, under stars at night",
        description: "Wake to soft sea light, fall asleep to waves. Open-air evenings, clear skies, and the slow island rhythm that resets your body clock.",
    },
    {
        id: "comfort",
        title: "Crafted with locally sourced woods",
        description: "Built with local timber and island know-how. Natural textures, sturdy joinery, and a warm, grounded feel that fits the landscape.",
    },
    {
        id: "shared-spaces",
        title: "Sleep easy & quiet comfort",
        description: "Clean beds, good airflow, and low-noise nights. Simple comforts that help you rest deeply and wake ready for tomorrow’s boat time.",
    },
    {
        id: "hosts",
        title: "Stay on preserved beaches, intentionally chosen",
        description: "We choose beaches that stay quiet and cared for. Minimal footprint, fewer crowds, and settings that keep nature feeling untouched.",
    },
    {
        id: "meals",
        title: "Designed with care for thoughtful stays",
        description: "Small details done right: shade, seating, storage, and lighting. Spaces that feel considerate, practical, and easy to live in.",
    },
    {
        id: "impact",
        title: "Evenings made calm and intimate",
        description: "Sunset tea, soft lamps, and quiet conversation. A gentle end to the day, where you can read, reflect, or simply listen to the sea.",
    },
];

// --- Components ---

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

export default function AccommodationSection() {
    // --- Desktop Carousel State ---
    const [desktopRef, desktopApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        containScroll: "trimSnaps"
    });
    const [desktopSelectedIndex, setDesktopSelectedIndex] = useState(0);
    const [desktopScrollSnaps, setDesktopScrollSnaps] = useState<number[]>([]);

    const onSelectDesktop = useCallback(() => {
        if (!desktopApi) return;
        setDesktopSelectedIndex(desktopApi.selectedScrollSnap());
    }, [desktopApi]);

    useEffect(() => {
        if (!desktopApi) return;
        onSelectDesktop();
        setDesktopScrollSnaps(desktopApi.scrollSnapList());
        desktopApi.on("select", onSelectDesktop);
        desktopApi.on("reInit", onSelectDesktop);
    }, [desktopApi, onSelectDesktop]);

    const scrollPrevDesktop = useCallback(() => desktopApi && desktopApi.scrollPrev(), [desktopApi]);
    const scrollNextDesktop = useCallback(() => desktopApi && desktopApi.scrollNext(), [desktopApi]);
    const scrollToDesktop = useCallback((index: number) => desktopApi && desktopApi.scrollTo(index), [desktopApi]);

    // --- Mobile Carousel State ---
    const [mobileRef, mobileApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        containScroll: "trimSnaps"
    });
    const [mobileSelectedIndex, setMobileSelectedIndex] = useState(0);
    const [mobileScrollSnaps, setMobileScrollSnaps] = useState<number[]>([]);

    const onSelectMobile = useCallback(() => {
        if (!mobileApi) return;
        setMobileSelectedIndex(mobileApi.selectedScrollSnap());
    }, [mobileApi]);

    useEffect(() => {
        if (!mobileApi) return;
        onSelectMobile();
        setMobileScrollSnaps(mobileApi.scrollSnapList());
        mobileApi.on("select", onSelectMobile);
        mobileApi.on("reInit", onSelectMobile);
    }, [mobileApi, onSelectMobile]);

    const scrollToMobile = useCallback((index: number) => mobileApi && mobileApi.scrollTo(index), [mobileApi]);

    // Accordion state
    const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setOpenAccordionId((prev) => (prev === id ? null : id));
    };

    return (
        <section id="accommodation" className="bg-white py-12 md:py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-14 px-4">
                    <Link href="/accommodation">
                        <h2 className="font-canto text-3xl md:text-4xl lg:text-5xl mb-4 text-neutral-900 hover:text-neutral-700 transition-colors cursor-pointer">
                            At rest: Island Guest Houses
                        </h2>
                    </Link>
                    <Link
                        href="/accommodation"
                        className="inline-flex items-center gap-2 text-sm md:text-base uppercase tracking-wider text-[#6b4c3b] hover:text-[#4a3429] transition-colors group font-avenir"
                    >
                        <span className="group-hover:underline underline-offset-4">
                            Curated stays: Explore All
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

                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column: Carousel */}
                    <div className="relative h-[600px] lg:h-[750px] group">
                        <div className="overflow-hidden h-full rounded-sm" ref={desktopRef}>
                            <div className="flex h-full touch-pan-y">
                                {slides.map((slide, idx) => (
                                    <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 50vw, 50vw"
                                            priority={idx === 0}
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                        <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                                            <h3 className="font-canto text-3xl mb-2">{slide.title}</h3>
                                            <p className="font-avenir text-sm text-gray-200">{slide.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                            onClick={scrollPrevDesktop}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                            onClick={scrollNextDesktop}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-4 right-4 flex space-x-2">
                            {desktopScrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${index === desktopSelectedIndex ? "bg-white w-3" : "bg-white/50"}`}
                                    onClick={() => scrollToDesktop(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="pr-6 lg:pr-8 pl-4 flex flex-col justify-center">
                        <h2 className="font-canto text-3xl md:text-4xl lg:text-5xl leading-tight text-neutral-900">
                            Stay easy, feel at home
                        </h2>
                        <p className="mt-6 md:mt-8 font-avenir text-sm md:text-base leading-relaxed text-neutral-600 max-w-lg">
                            Unhurried stays, island-simple comfort, and warm hosts. You explore by day, then unwind on land in thoughtfully chosen guest houses.
                        </p>

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
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    {/* Carousel on Top */}
                    <div className="relative aspect-[4/3] w-full mb-8 rounded-sm overflow-hidden text-white">
                        <div className="overflow-hidden h-full" ref={mobileRef}>
                            <div className="flex h-full touch-pan-y">
                                {slides.map((slide, idx) => (
                                    <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-cover"
                                            sizes="100vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                        <div className="absolute bottom-0 left-0 p-6 w-full">
                                            <h3 className="font-canto text-2xl mb-1">{slide.title}</h3>
                                            <p className="font-avenir text-xs text-gray-200">{slide.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Dots */}
                        <div className="absolute bottom-4 right-4 flex space-x-2">
                            {mobileScrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${index === mobileSelectedIndex ? "bg-white w-3" : "bg-white/50"}`}
                                    onClick={() => scrollToMobile(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="px-2">
                        <h2 className="font-canto text-3xl leading-tight text-neutral-900 text-center">
                            Stay easy, feel at home
                        </h2>
                        <p className="mt-6 font-avenir text-sm leading-relaxed text-neutral-600 text-center">
                            Unhurried stays, island-simple comfort, and warm hosts. You explore by day, then unwind on land in thoughtfully chosen guest houses.
                        </p>

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
                </div>
            </div>
        </section>
    );
}
