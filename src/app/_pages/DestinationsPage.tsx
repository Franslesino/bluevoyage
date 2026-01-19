"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { destinations } from "@/data/destinations";
import BackLink from "@/components/BackLink";
import LocaleLink from "@/components/LocaleLink";
import { useTranslation } from "@/components/I18nProvider";

export default function DestinationsPage() {
    const { t } = useTranslation();

    return (
        <>
            <Navbar />
            <main className="bg-white min-h-screen pt-8 pb-24 md:pb-32 px-4 md:px-8">
                <div className="mx-auto max-w-[1280px]">
                    <div className="pt-6 md:pt-8 mb-8">
                        <BackLink href="/#destinations" label={t("common.backToHome")} />
                    </div>
                    {/* Header */}
                    <span className="block font-avenir text-sm md:text-base uppercase tracking-[0.2em] text-neutral-500 mb-4">
                        {t("destinations.sectionLabel")}
                    </span>
                    <h1 className="font-canto text-4xl md:text-5xl lg:text-6xl text-[#6b4c3b] mb-4">
                        {t("destinations.title")}
                    </h1>
                    <span className="block font-avenir text-neutral-500 text-lg mb-6 md:mb-8">
                        {destinations.length} {t("destinations.destinationsCount")}
                    </span>

                    {/* Destinations List */}
                    <div className="flex flex-col gap-0">
                        {destinations.map((destination, index) => (
                            <div
                                key={destination.slug}
                                className="group border-t border-neutral-200 py-12 md:py-20 first:border-t-0 first:pt-0"
                            >
                                <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-20 items-start">

                                    {/* Image Section */}
                                    <div className="w-full md:w-[480px] lg:w-[520px] shrink-0 overflow-hidden relative aspect-[16/10]">
                                        <LocaleLink href={`/destinations/${destination.slug}`} className="block h-full w-full cursor-pointer">
                                            <Image
                                                src={destination.image}
                                                alt={t(`destinations.items.${destination.slug}.name`) || destination.name}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                priority={index < 2}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </LocaleLink>
                                    </div>

                                    {/* Text Section */}
                                    <div className="flex flex-col">
                                        <LocaleLink href={`/destinations/${destination.slug}`} className="block cursor-pointer">
                                            <h2 className="font-canto text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-4 md:mb-6 group-hover:text-[#6b4c3b] transition-colors">
                                                {t(`destinations.items.${destination.slug}.name`) || destination.name}
                                            </h2>
                                        </LocaleLink>
                                        <p className="font-avenir text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl mb-6 md:mb-8">
                                            {t(`destinations.items.${destination.slug}.description`) || destination.description}
                                        </p>
                                        <LocaleLink
                                            href={`/destinations/${destination.slug}`}
                                            className="inline-flex items-center gap-2 font-avenir text-sm md:text-base uppercase tracking-wider text-[#6b4c3b] hover:text-[#4a3429] transition-colors group/link"
                                        >
                                            <span className="group-hover/link:underline underline-offset-4">
                                                {t("common.viewDetails")}
                                            </span>
                                            <svg
                                                className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <FooterSection />
        </>
    );
}
