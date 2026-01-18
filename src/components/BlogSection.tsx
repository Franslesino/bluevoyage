"use client";

import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { blogPosts } from "@/data/blogPosts";
import LocaleLink from "./LocaleLink";
import { useTranslation } from "./I18nProvider";

// Blog post keys for translation
const blogPostKeys = [
    "responsible-wildlife-encounters",
    "best-snorkeling-spots",
    "village-visit-etiquette"
];

// --- Helper: Truncate Excerpt ---
function truncateExcerpt(text: string, maxWords: number = 23): string {
    const words = text.trim().split(/\s+/);
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + " .........";
    }
    return text;
}

export default function BlogSection() {
    const { t } = useTranslation();
    // Embla for mobile
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    return (
        <section className="bg-white py-16 md:py-24 text-black">
            <div className="mx-auto px-4 md:px-8 max-w-[1200px]">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-center md:relative mb-12">
                    <h2 className="font-canto text-[30px] text-center">
                        {t("blog.title")}
                    </h2>
                    <LocaleLink
                        href="/blog"
                        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.2em] border border-[#CB9275] text-[#CB9275] px-6 py-2 hover:bg-[#CB9275] hover:text-white transition-colors duration-300"
                    >
                        {t("blog.viewAll")}
                    </LocaleLink>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-3 divide-x divide-gray-200">
                    {blogPostKeys.map((postKey, idx) => {
                        const post = blogPosts.find(p => p.slug === postKey);
                        if (!post) return null;

                        return (
                            <div key={postKey} className={`group flex flex-col h-full ${idx === 0 ? 'pr-8' : idx === 1 ? 'px-8' : 'pl-8'}`}>
                                <LocaleLink href={`/blog/${post.slug}`} className="block relative aspect-[3/2] overflow-hidden rounded-sm bg-neutral-100 mb-6">
                                    <Image
                                        src={post.image}
                                        alt={t(`blogPosts.${postKey}.title`)}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </LocaleLink>

                                <div className="flex flex-col flex-grow">
                                    <div className="font-avenir text-xs text-neutral-400 uppercase tracking-widest mb-3">
                                        {t(`blogPosts.${postKey}.locationLabel`)} | {t(`blogPosts.${postKey}.date`)} | {t(`blogPosts.${postKey}.category`)}
                                    </div>

                                    <LocaleLink href={`/blog/${post.slug}`} className="block">
                                        <h3 className="font-canto text-2xl text-neutral-900 leading-tight mb-4 group-hover:underline underline-offset-4 decoration-neutral-300 transition-all">
                                            {t(`blogPosts.${postKey}.title`)}
                                        </h3>
                                    </LocaleLink>

                                    <p className="font-avenir text-sm text-neutral-600 leading-relaxed mb-6 flex-grow">
                                        {truncateExcerpt(t(`blogPosts.${postKey}.excerpt`))}
                                    </p>

                                    <div className="mt-auto flex justify-end">
                                        <LocaleLink
                                            href={`/blog/${post.slug}`}
                                            className="font-avenir inline-flex items-center text-xs uppercase tracking-[0.15em] border-b border-transparent hover:border-neutral-900 pb-0.5 transition-colors"
                                        >
                                            {t("blog.readMore")}
                                            <svg
                                                className="w-3 h-3 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </LocaleLink>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden">
                    <div className="overflow-hidden" ref={emblaRef} dir="ltr" style={{ direction: "ltr" }}>
                        <div className="flex touch-pan-y">
                            {blogPostKeys.map((postKey) => {
                                const post = blogPosts.find(p => p.slug === postKey);
                                if (!post) return null;

                                return (
                                    <div key={postKey} className="flex-[0_0_100%] min-w-0 pl-4 pr-4">
                                        <div className="flex flex-col h-full">
                                            <LocaleLink href={`/blog/${post.slug}`} className="block overflow-hidden mb-6 relative aspect-[3/2] w-full">
                                                <Image
                                                    src={post.image}
                                                    alt={t(`blogPosts.${postKey}.title`)}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </LocaleLink>
                                            <div className="font-avenir text-xs text-gray-500 uppercase tracking-widest mb-3">
                                                {t(`blogPosts.${postKey}.locationLabel`)} | {t(`blogPosts.${postKey}.date`)} | {t(`blogPosts.${postKey}.category`)}
                                            </div>
                                            <LocaleLink href={`/blog/${post.slug}`} className="block">
                                                <h3 className="font-canto text-2xl leading-tight mb-3 line-clamp-3">
                                                    {t(`blogPosts.${postKey}.title`)}
                                                </h3>
                                            </LocaleLink>
                                            <p className="font-avenir text-sm leading-relaxed text-gray-800 mb-6">
                                                {truncateExcerpt(t(`blogPosts.${postKey}.excerpt`))}
                                            </p>
                                            <div className="mt-auto flex justify-end">
                                                <LocaleLink
                                                    href={`/blog/${post.slug}`}
                                                    className="font-avenir inline-flex items-center text-xs uppercase tracking-[0.15em] border-b border-transparent pb-0.5"
                                                >
                                                    {t("blog.readMore")}
                                                    <svg
                                                        className="w-3 h-3 ml-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        />
                                                    </svg>
                                                </LocaleLink>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === selectedIndex ? "bg-[#6b4c3b]" : "bg-neutral-300"
                                    }`}
                                onClick={() => scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Mobile View All Button */}
                    <div className="flex justify-center mt-8">
                        <LocaleLink
                            href="/blog"
                            className="text-xs uppercase tracking-[0.2em] border border-[#CB9275] text-[#CB9275] px-8 py-3 hover:bg-[#CB9275] hover:text-white transition-colors duration-300"
                        >
                            {t("blog.viewAll")}
                        </LocaleLink>
                    </div>
                </div>
            </div>
        </section>
    );
}
