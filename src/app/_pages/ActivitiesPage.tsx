"use client";

import Image from "next/image";
import { programs } from "@/data/programs";
import BackLink from "@/components/BackLink";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import LocaleLink from "@/components/LocaleLink";
import { useTranslation } from "@/components/I18nProvider";

export default function ActivitiesPage() {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen text-neutral-900">
            <Navbar />
            <main className="pt-8 pb-24 md:pb-32 px-4 md:px-8">
                <div className="max-w-[1280px] mx-auto">
                    <div className="pt-6 md:pt-8 mb-8">
                        <BackLink href="/" label={t("common.backToHome")} />
                    </div>
                    {/* Page Header */}
                    <div className="mb-16 md:mb-24 pt-10 md:pt-16">
                        <span className="block font-avenir text-sm md:text-base uppercase tracking-[0.2em] text-neutral-500 mb-4">
                            {t("activities.sectionLabel")}
                        </span>
                        <h1 className="font-canto text-4xl md:text-5xl lg:text-6xl text-[#6b4c3b] mb-4">
                            {t("activities.pageTitle")}
                        </h1>
                        <span className="block font-avenir text-neutral-500 text-lg">
                            {t("activities.activitiesCount", { count: programs.length })}
                        </span>
                    </div>

                    {/* Activities List */}
                    <div className="flex flex-col space-y-16 md:space-y-24">
                        {programs.map((program, index) => {
                            const programName = t(`activities.items.${program.slug}.name`) || program.name;
                            const programDateLabel = t(`activities.items.${program.slug}.dateLabel`) || program.dateLabel;
                            const programDescription = t(`activities.items.${program.slug}.description`) || program.description;

                            return (
                                <div key={program.slug} className="group">
                                    <div className="flex flex-col md:flex-row gap-8 md:gap-14 lg:gap-20 items-stretch">
                                        {/* Image Block */}
                                        <div className="w-full md:w-[480px] lg:w-[520px] shrink-0">
                                            <LocaleLink href={`/activities/${program.slug}?from=list`} className="block overflow-hidden relative aspect-[16/10] bg-neutral-200">
                                                <Image
                                                    src={program.image}
                                                    alt={programName}
                                                    fill
                                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
                                                />
                                            </LocaleLink>
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex flex-col justify-center py-2 md:py-4 flex-grow border-b border-neutral-200 md:border-none pb-8 md:pb-0">
                                            {programDateLabel && (
                                                <span className="font-avenir text-xs md:text-sm uppercase tracking-wider text-neutral-500 mb-3">
                                                    {programDateLabel}
                                                </span>
                                            )}
                                            <h2 className="font-canto text-3xl md:text-4xl lg:text-[2.75rem] text-neutral-900 leading-tight mb-4 md:mb-6">
                                                <LocaleLink href={`/activities/${program.slug}?from=list`} className="hover:text-[#6b4c3b] transition-colors">
                                                    {programName}
                                                </LocaleLink>
                                            </h2>
                                            <p className="font-avenir text-neutral-600 text-base md:text-lg leading-relaxed max-w-xl mb-6 md:mb-8">
                                                {programDescription}
                                            </p>

                                            <div className="mt-auto">
                                                <LocaleLink
                                                    href={`/activities/${program.slug}?from=list`}
                                                    className="inline-flex items-center gap-2 font-avenir text-sm uppercase tracking-[0.15em] text-[#6b4c3b] hover:text-[#4a3429] transition-colors group/link"
                                                >
                                                    {t("activities.viewActivity")}
                                                    <svg
                                                        className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </LocaleLink>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile/Desktop Divider (except last item) */}
                                    {index !== programs.length - 1 && (
                                        <div className="hidden md:block h-px bg-neutral-200 mt-16 md:mt-24" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
            <FooterSection />
        </div>
    );
}
