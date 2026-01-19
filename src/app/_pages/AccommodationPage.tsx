"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { accommodations } from "@/data/accommodations";
import BackLink from "@/components/BackLink";
import LocaleLink from "@/components/LocaleLink";
import { useTranslation } from "@/components/I18nProvider";

const TABS = ["All", "Malenge", "Una-una", "Kadidiri", "Bomba", "Luwuk"];

// Tab key mapping for translations
const TAB_KEYS: Record<string, string> = {
    "All": "all",
    "Malenge": "malenge",
    "Una-una": "unaUna",
    "Kadidiri": "kadidiri",
    "Bomba": "bomba",
    "Luwuk": "luwuk"
};

export default function AccommodationPage() {
    const { t } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);

    // Mobile check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Embla for "All" tab on desktop (and mobile usage generally)
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center", // Changed to center for focus
        containScroll: "trimSnaps",
        slidesToScroll: 1,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        onSelect(); // initial select
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close dropdown on Escape
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsDropdownOpen(false);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="bg-white min-h-screen text-neutral-900 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-8 md:pt-10 pb-24 md:pb-32 w-full">
                {/* Back Button & Header */}
                <div className="max-w-[1280px] mx-auto px-4 md:px-8 mb-12">
                    <div className="mb-12 md:mb-16">
                        <BackLink href="/#accommodation" label={t("common.backToHome")} />
                    </div>

                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="font-canto text-5xl md:text-7xl text-neutral-900 mb-4 tracking-tight">
                            {t("accommodation.pageTitle")}
                        </h1>
                        <p className="font-avenir text-lg md:text-xl text-neutral-500 font-light uppercase tracking-widest">
                            {t("accommodation.subtitle")}
                        </p>
                    </div>
                </div>

                {/* Filter Controls (Tabs vs Dropdown) */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 mb-12 md:mb-16 relative z-30">

                    {/* Mobile Dropdown (< md) */}
                    <div className="md:hidden w-full relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between px-6 py-4 bg-white border border-neutral-200 rounded-sm font-avenir text-base uppercase tracking-widest text-neutral-900 shadow-sm focus:outline-none focus:border-[#CB9275] focus:ring-1 focus:ring-[#CB9275] transition-all"
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="listbox"
                        >
                            <span>{t("accommodation.tabs.all")}</span>
                            <svg
                                className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div
                            className={`absolute top-full left-0 w-full mt-2 bg-white border border-neutral-100 shadow-xl rounded-sm overflow-hidden transition-all duration-300 ease-in-out origin-top ${isDropdownOpen ? "opacity-100 max-h-[400px] visible translate-y-0" : "opacity-0 max-h-0 invisible -translate-y-2"
                                }`}
                            role="listbox"
                        >
                            {TABS.map((tab) => {
                                const tabKey = TAB_KEYS[tab] || tab.toLowerCase();
                                return (
                                    <LocaleLink
                                        key={tab}
                                        href={tab === "All" ? "/accommodation" : `/accommodation/${tab.toLowerCase()}`}
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={`block w-full text-left px-6 py-4 font-avenir text-sm uppercase tracking-widest transition-colors hover:bg-neutral-50 ${tab === "All"
                                            ? "text-[#CB9275] font-semibold bg-neutral-50/50"
                                            : "text-neutral-600"
                                            }`}
                                        role="option"
                                    >
                                        {t(`accommodation.tabs.${tabKey}`) || tab}
                                    </LocaleLink>
                                );
                            })}
                        </div>
                    </div>

                    {/* Desktop Tabs (>= md) */}
                    <div className="hidden md:flex items-center justify-center overflow-x-auto no-scrollbar space-x-12 border-b border-neutral-100 pb-1">
                        {TABS.map((tab) => {
                            const tabKey = TAB_KEYS[tab] || tab.toLowerCase();
                            return (
                                <LocaleLink
                                    key={tab}
                                    href={tab === "All" ? "/accommodation" : `/accommodation/${tab.toLowerCase()}`}
                                    className={`font-avenir text-base uppercase tracking-widest pb-4 whitespace-nowrap transition-all duration-300 relative ${tab === "All"
                                        ? "text-[#CB9275]"
                                        : "text-neutral-400 hover:text-neutral-600"
                                        }`}
                                >
                                    {t(`accommodation.tabs.${tabKey}`) || tab}
                                    {/* Active Indicator for All Tab */}
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#CB9275] transition-transform duration-300 origin-center ${tab === "All" ? "scale-x-100" : "scale-x-0"
                                            }`}
                                    />
                                </LocaleLink>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-[1600px] mx-auto px-0 md:px-8 transition-opacity duration-500 ease-in-out">

                    {/* All Tab - Carousel View */}
                    <div className="relative group/carousel">
                        {/* Carousel Viewport - Force LTR for carousel */}
                        <div className="overflow-hidden px-4 md:px-0" ref={emblaRef} dir="ltr" style={{ direction: "ltr" }}>
                            <div className="flex -ml-4 md:-ml-6 py-8">
                                {accommodations.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="flex-[0_0_85vw] md:flex-[0_0_400px] lg:flex-[0_0_450px] min-w-0 pl-4 md:pl-6 relative"
                                    >
                                        <LocaleLink href={`/accommodation/${item.slug}`} className="block h-full group">
                                            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100 shadow-sm cursor-pointer">
                                                {/* Image */}
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    sizes="(max-width: 768px) 85vw, 400px"
                                                />

                                                {/* Desktop Overlay Content */}
                                                <div className="hidden md:flex absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex-col justify-end p-8 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transform duration-500">
                                                    <span className="font-avenir text-xs uppercase tracking-widest mb-2 opacity-90">
                                                        {t(`accommodation.tabs.${item.slug === 'una-una' ? 'unaUna' : item.slug}`) || item.island}
                                                    </span>
                                                    <h3 className="font-canto text-3xl mb-2">
                                                        {t(`accommodation.guestHouses.${item.slug === 'una-una' ? 'una-una' : item.slug}.name`) || item.title}
                                                    </h3>
                                                    <p className="font-avenir text-sm opacity-90 leading-relaxed line-clamp-2">
                                                        {t(`accommodation.guestHouses.${item.slug === 'una-una' ? 'una-una' : item.slug}.description`) || item.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Mobile Content Underneath */}
                                            <div className="md:hidden mt-4 text-center px-2">
                                                <span className="block font-avenir text-[10px] uppercase tracking-widest text-[#CB9275] mb-1">
                                                    {t(`accommodation.tabs.${item.slug === 'una-una' ? 'unaUna' : item.slug}`) || item.island}
                                                </span>
                                                <h3 className="font-canto text-2xl text-neutral-900 mb-2">
                                                    {t(`accommodation.guestHouses.${item.slug === 'una-una' ? 'una-una' : item.slug}.name`) || item.title}
                                                </h3>
                                                <p className="font-avenir text-sm text-neutral-500 leading-relaxed">
                                                    {t(`accommodation.guestHouses.${item.slug === 'una-una' ? 'una-una' : item.slug}.description`) || item.description}
                                                </p>
                                            </div>
                                        </LocaleLink>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows (Desktop) */}
                        <button
                            className="hidden md:flex absolute top-1/2 -left-4 lg:left-0 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full items-center justify-center text-neutral-900 shadow-lg transition-all opacity-0 group-hover/carousel:opacity-100 z-10 disabled:opacity-0"
                            onClick={scrollPrev}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                            className="hidden md:flex absolute top-1/2 -right-4 lg:right-0 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full items-center justify-center text-neutral-900 shadow-lg transition-all opacity-0 group-hover/carousel:opacity-100 z-10 disabled:opacity-0"
                            onClick={scrollNext}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                        </button>

                        {/* Pagination Dots */}
                        <div className="flex justify-center mt-8 gap-3">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-[#CB9275] scale-125" : "bg-neutral-300 hover:bg-neutral-400"
                                        }`}
                                    onClick={() => scrollTo(index)}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            <FooterSection />
        </div>
    );
}
