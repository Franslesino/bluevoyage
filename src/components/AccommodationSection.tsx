"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import LocaleLink from "./LocaleLink";
import { useTranslation } from "./I18nProvider";

// --- Data ---

const slidesData = [
    {
        titleKey: "accommodation.slides.malenge.title",
        descriptionKey: "accommodation.slides.malenge.description",
        image: "/accommodation/malenge/other1.webp",
    },
    {
        titleKey: "accommodation.slides.kadidiri.title",
        descriptionKey: "accommodation.slides.kadidiri.description",
        image: "/accommodation/kadidiri/other1.webp",
    },
    {
        titleKey: "accommodation.slides.unaUna.title",
        descriptionKey: "accommodation.slides.unaUna.description",
        image: "/accommodation/una-una/other1.webp",
    },
    {
        titleKey: "accommodation.slides.luwuk.title",
        descriptionKey: "accommodation.slides.luwuk.description",
        image: "/accommodation/Luwuk/other1.webp",
    },
];

const featuresData = [
    {
        id: "guest-house",
        titleKey: "accommodation.features.guestHouse.title",
        descriptionKey: "accommodation.features.guestHouse.description",
    },
    {
        id: "comfort",
        titleKey: "accommodation.features.comfort.title",
        descriptionKey: "accommodation.features.comfort.description",
    },
    {
        id: "shared-spaces",
        titleKey: "accommodation.features.sharedSpaces.title",
        descriptionKey: "accommodation.features.sharedSpaces.description",
    },
    {
        id: "hosts",
        titleKey: "accommodation.features.hosts.title",
        descriptionKey: "accommodation.features.hosts.description",
    },
    {
        id: "meals",
        titleKey: "accommodation.features.meals.title",
        descriptionKey: "accommodation.features.meals.description",
    },
    {
        id: "impact",
        titleKey: "accommodation.features.impact.title",
        descriptionKey: "accommodation.features.impact.description",
    },
];

// --- Components ---

type FeatureType = typeof featuresData[0];

function AccordionItem({
    feature,
    isOpen,
    onToggle,
    t,
}: {
    feature: FeatureType;
    isOpen: boolean;
    onToggle: () => void;
    t: (key: string) => string;
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
                    {t(feature.titleKey)}
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
                        {t(feature.descriptionKey)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function AccommodationSection() {
    const { t } = useTranslation();

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
                    <LocaleLink href="/accommodation">
                        <h2 className="font-canto text-3xl md:text-4xl lg:text-5xl mb-4 text-neutral-900 hover:text-neutral-700 transition-colors cursor-pointer">
                            {t("accommodation.title")}
                        </h2>
                    </LocaleLink>
                    <LocaleLink
                        href="/accommodation"
                        className="inline-flex items-center gap-2 text-sm md:text-base uppercase tracking-wider text-[#6b4c3b] hover:text-[#4a3429] transition-colors group font-avenir"
                    >
                        <span className="group-hover:underline underline-offset-4">
                            {t("accommodation.subtitle")}
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
                    </LocaleLink>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column: Carousel */}
                    <div className="relative h-[600px] lg:h-[750px] group">
                        <div className="overflow-hidden h-full rounded-sm" ref={desktopRef}>
                            <div className="flex h-full touch-pan-y">
                                {slidesData.map((slide, idx) => (
                                    <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full">
                                        <Image
                                            src={slide.image}
                                            alt={t(slide.titleKey)}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 50vw, 50vw"
                                            priority={idx === 0}
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                        <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                                            <h3 className="font-canto text-3xl mb-2">{t(slide.titleKey)}</h3>
                                            <p className="font-avenir text-sm text-gray-200">{t(slide.descriptionKey)}</p>
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
                            {t("accommodation.contentTitle")}
                        </h2>
                        <p className="mt-6 md:mt-8 font-avenir text-sm md:text-base leading-relaxed text-neutral-600 max-w-lg">
                            {t("accommodation.contentDescription")}
                        </p>

                        <div className="mt-10 md:mt-12 grid grid-cols-2 gap-x-8 gap-y-8 lg:gap-x-12 lg:gap-y-10">
                            {featuresData.map((feature) => (
                                <div key={feature.id}>
                                    <h3 className="font-canto text-xl md:text-2xl text-neutral-800">
                                        {t(feature.titleKey)}
                                    </h3>
                                    <p className="mt-3 font-avenir text-sm leading-relaxed text-neutral-500">
                                        {t(feature.descriptionKey)}
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
                                {slidesData.map((slide, idx) => (
                                    <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full">
                                        <Image
                                            src={slide.image}
                                            alt={t(slide.titleKey)}
                                            fill
                                            className="object-cover"
                                            sizes="100vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                        <div className="absolute bottom-0 left-0 p-6 w-full">
                                            <h3 className="font-canto text-2xl mb-1">{t(slide.titleKey)}</h3>
                                            <p className="font-avenir text-xs text-gray-200">{t(slide.descriptionKey)}</p>
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
                            {t("accommodation.contentTitle")}
                        </h2>
                        <p className="mt-6 font-avenir text-sm leading-relaxed text-neutral-600 text-center">
                            {t("accommodation.contentDescription")}
                        </p>

                        <div className="mt-8">
                            {featuresData.map((feature) => (
                                <AccordionItem
                                    key={feature.id}
                                    feature={feature}
                                    isOpen={openAccordionId === feature.id}
                                    onToggle={() => toggleAccordion(feature.id)}
                                    t={t}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

