"use client";

import React from "react";
import Image from "next/image";

interface StatItem {
    label: string;
    icon: string;
}

interface WhyExistsSectionProps {
    subtitle: string;
    headline: React.ReactNode;
    description: string;
    stats: StatItem[];
    quote: string;
}

const WhyExistsSection: React.FC<WhyExistsSectionProps> = ({
    subtitle,
    headline,
    description,
    stats,
    quote,
}) => {
    return (
        <section className="py-24 md:py-32 bg-white relative">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl text-center">
                <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                    {subtitle}
                </span>
                <h2 className="font-canto text-4xl md:text-5xl mb-10 text-[#1a1a1a]">
                    {headline}
                </h2>
                <p className="font-avenir text-lg md:text-xl text-foreground/70 leading-relaxed mb-16 max-w-3xl mx-auto">
                    {description}
                </p>

                {/* Journey Balance Visual */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-8 max-w-4xl mx-auto py-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 transition-transform duration-500 group-hover:scale-110">
                                <Image
                                    src={stat.icon}
                                    alt={stat.label}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="font-avenir text-xs uppercase tracking-[0.2em] text-[#CB9275]">
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="font-avenir text-sm text-foreground/50 mt-8 italic">
                    “{quote}”
                </p>
            </div>
        </section>
    );
};

export default WhyExistsSection;
