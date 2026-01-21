
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blueRetreat } from "@/data/journeys/blueRetreat";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { CONTACT_INFO } from "@/config/contact";
import WhyExistsSection from "@/components/WhyExistsSection";
import ProgramSnapshotCard from "@/components/ProgramSnapshotCard";
import FullItineraryCard from "@/components/FullItineraryCard";

// Helper to create WhatsApp link
const createWaLink = (intent: string) => {
    const phoneNumber = "6285943001104";
    const message = `Hi TogeanVoyage team! I'm interested in Blue Retreat (From 8 Days).
Intent: ${intent}
Preferred month: [your month]
Group size: [your group size]
Link: /journeys/blue-retreat`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

export default function BlueRetreatPage() {
    const {
        headline,
        subline,
        shortDescription,
        tagline,
        modelConfirmation,
        vibeTags,
        stats,
        snapshot,
        concept,
        itinerary,
        socialProof,
        highlights,
        tabs,
        pricing,
        faq,
    } = blueRetreat;

    const [activeTab, setActiveTab] = useState<"villa" | "boat">("villa");
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const scrollToItinerary = () => {
        const element = document.getElementById("itinerary");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Navbar />
            <main className="w-full bg-background text-foreground overflow-x-hidden selection:bg-[#CB9275] selection:text-white pb-24 md:pb-0">

                {/* HERO SECTION - Premium, above the fold */}
                <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0 z-0 select-none">
                        <Image
                            src="/journeys/blue-retreat/blue-retreat-hero.webp"
                            alt="Blue Retreat"
                            fill
                            className="object-cover"
                            priority
                            quality={95}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
                    </div>

                    {/* Back Link */}
                    <div className="absolute top-6 left-6 md:top-10 md:left-12 z-20">
                        <Link
                            href="/#programs"
                            className="inline-flex items-center gap-2 font-avenir text-xs md:text-sm text-white/90 hover:text-white uppercase tracking-[0.15em] transition-colors duration-300 group"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform duration-300">{"<"}</span>
                            <span className="border-b border-transparent group-hover:border-white/90 pb-0.5">Back to Programs</span>
                        </Link>
                    </div>

                    {/* Hero Content - Centered & Luxurious */}
                    <div className="relative z-10 container mx-auto px-6 md:px-12 text-center text-white max-w-5xl">
                        <span className="inline-block py-2 px-5 border border-white/40 rounded-full text-xs md:text-sm font-avenir tracking-[0.2em] uppercase backdrop-blur-md mb-8 bg-white/5">
                            {subline}
                        </span>
                        <h1 className="font-canto text-6xl md:text-7xl lg:text-8xl mb-8 leading-[0.95] drop-shadow-2xl tracking-tight">
                            {headline}
                        </h1>
                        <span className="inline-block px-8 py-3 rounded-full border border-[#CB9275]/20 bg-[#FDF8F6]/10 backdrop-blur-sm mb-6">
                            <p className="font-canto text-2xl md:text-4xl italic text-white drop-shadow-sm font-medium">
                                {shortDescription}
                            </p>
                        </span>
                        <p className="font-avenir text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 font-light text-white/95 px-4 drop-shadow-md">
                            {tagline}
                        </p>
                        <p className="font-avenir text-xs md:text-sm uppercase tracking-[0.15em] text-white/80 mb-12 max-w-2xl mx-auto border-t border-white/30 pt-8 mt-8">
                            {modelConfirmation}
                        </p>

                        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                            <button
                                onClick={scrollToItinerary}
                                className="group px-10 py-5 bg-[#CB9275] hover:bg-[#B67F63] text-white font-avenir tracking-[0.15em] uppercase text-sm transition-all duration-300 w-full md:w-auto min-w-[240px] shadow-2xl hover:shadow-[#CB9275]/30"
                            >
                                <span className="inline-block group-hover:scale-105 transition-transform duration-300">View Itinerary</span>
                            </button>
                            <Link
                                href="/how-to-booking"
                                className="group px-10 py-5 border-2 border-white/90 text-white hover:bg-white/10 hover:border-white font-avenir tracking-[0.15em] uppercase text-sm transition-all duration-300 w-full md:w-auto min-w-[240px] backdrop-blur-sm text-center"
                            >
                                <span className="inline-block group-hover:scale-105 transition-transform duration-300">Check Availability</span>
                            </Link>
                        </div>
                    </div>

                    {/* Floating Snapshot Card - Desktop Only */}
                    <ProgramSnapshotCard
                        duration={snapshot.duration}
                        bestFor={snapshot.bestFor}
                        style={snapshot.style}
                        stats={stats}
                    />
                </section>

                {/* WHY BLUE RETREAT EXISTS */}
                <WhyExistsSection
                    subtitle={concept.eyebrow}
                    headline={concept.headline}
                    description={concept.description}
                    stats={stats}
                    quote="Slow days, clear water, and a rhythm you don't want to end."
                />

                {/* ITINERARY - Premium Day Cards (Show only 3 days) */}
                <section id="itinerary" className="py-32 bg-[#FAFAFA] relative">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="text-center mb-20 max-w-4xl mx-auto">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                                Your Day-by-Day Flow
                            </span>
                            <h2 className="font-canto text-4xl md:text-6xl text-foreground mb-6">
                                A gentle 8-day rhythm
                            </h2>
                            <p className="font-avenir text-foreground/60 text-lg leading-relaxed">
                                Sample itinerary — the full flow adapts to you.
                            </p>
                        </div>

                        <div className="max-w-7xl mx-auto relative">
                            {/* Vertical Timeline Line - Desktop */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#CB9275]/20 via-[#CB9275]/10 to-transparent"></div>

                            {/* Show only first 3 days */}
                            <div className="space-y-16 md:space-y-20">
                                {itinerary.slice(0, 3).map((day, index) => (
                                    <motion.div
                                        key={day.day}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15, duration: 0.6 }}
                                        className="relative"
                                    >
                                        <div className={`flex flex-col md:flex-row gap-8 md:gap-12 items-start ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                            {/* Timeline dot - Desktop */}
                                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-[#CB9275] rounded-full ring-8 ring-white shadow-lg items-center justify-center z-10">
                                                <span className="font-avenir text-xs text-white font-bold leading-none pt-[1px]">{day.day}</span>
                                            </div>

                                            {/* Content */}
                                            <div className="md:w-1/2">
                                                <div className="bg-white p-8 md:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-500 border-l-4 border-[#CB9275]">
                                                    <span className="font-avenir text-xs font-bold tracking-[0.2em] text-[#CB9275] uppercase block mb-3">
                                                        Day {day.day}
                                                    </span>
                                                    <h3 className="font-canto text-3xl md:text-4xl text-foreground mb-8 leading-tight">
                                                        {day.title}
                                                    </h3>
                                                    <div className="space-y-5 mb-8">
                                                        <div>
                                                            <span className="font-avenir font-bold text-xs uppercase tracking-wide text-foreground/50 block mb-2">Morning</span>
                                                            <p className="font-avenir text-foreground/80 text-sm leading-relaxed">{day.schedule.morning}</p>
                                                        </div>
                                                        <div>
                                                            <span className="font-avenir font-bold text-xs uppercase tracking-wide text-foreground/50 block mb-2">Afternoon</span>
                                                            <p className="font-avenir text-foreground/80 text-sm leading-relaxed">{day.schedule.afternoon}</p>
                                                        </div>
                                                        <div>
                                                            <span className="font-avenir font-bold text-xs uppercase tracking-wide text-foreground/50 block mb-2">Evening</span>
                                                            <p className="font-avenir text-foreground/80 text-sm leading-relaxed">{day.schedule.evening}</p>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 bg-[#FDF8F6] border-l-2 border-[#CB9275] italic text-foreground/80 font-canto text-base">
                                                        "{day.highlight}"
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Image */}
                                            <div className="md:w-1/2 order-first md:order-none">
                                                <div className="relative aspect-[4/3] overflow-hidden shadow-xl group">
                                                    <Image
                                                        src={day.image}
                                                        alt={day.title}
                                                        fill
                                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Full Itinerary Invite Card */}
                            <FullItineraryCard
                                title="Want the complete 8-day flow?"
                                description="The remaining days adapt to sea conditions and the season—so we personalize the rhythm to you. Message us and we'll share the full day-by-day PDF and tailor it to your pace."
                                whatsappHref={createWaLink("Get full 8-day itinerary")}
                                emailHref={`mailto:contact@togeanvoyages.com?subject=${encodeURIComponent("Blue Retreat — Full Itinerary Request")}&body=${encodeURIComponent("Hi TogeanVoyage team, I'd like the full Blue Retreat itinerary (8+ days). Traveling on: __ / Group size: __ / Preferred pace: __ / Notes: __")}`}
                                whatsappLabel="Request Full Itinerary on WhatsApp"
                                emailLabel="Request Full Itinerary by Email"
                                durationLabel="+ 5 More Days Available"
                            />
                        </div>
                    </div>
                </section>

                {/* SOCIAL PROOF */}
                <section className="py-32 bg-foreground relative text-background overflow-hidden">
                    <div className="absolute inset-0 opacity-15">
                        <Image
                            src={socialProof.image}
                            alt="Guest testimonial"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative container mx-auto px-6 text-center max-w-5xl z-10">
                        <p className="font-canto text-3xl md:text-5xl italic mb-8 leading-tight">
                            {socialProof.quote}
                        </p>
                        <span className="font-avenir text-sm uppercase tracking-widest text-background/60">
                            {socialProof.attribution}
                        </span>
                    </div>
                </section>

                {/* PROGRAM HIGHLIGHTS */}
                <section className="py-32 bg-background">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="text-center mb-20 max-w-3xl mx-auto">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                                What Makes Blue Retreat Special
                            </span>
                            <h2 className="font-canto text-4xl md:text-5xl text-foreground mb-6">
                                Signature Highlights
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {highlights.map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden group"
                                >
                                    <div className="relative h-64">
                                        <Image
                                            src={highlight.image}
                                            alt={highlight.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <h3 className="font-canto text-2xl text-foreground mb-3">
                                            {highlight.title}
                                        </h3>
                                        <p className="font-avenir text-foreground/60 text-sm leading-relaxed">
                                            {highlight.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* YOUR PREMIUM STANDARD - Tabbed */}
                <section className="py-32 bg-[#FAFAFA]">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="text-center mb-20 max-w-3xl mx-auto">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                                The Blue Retreat Standard
                            </span>
                            <h2 className="font-canto text-4xl md:text-5xl text-foreground">
                                Your Premium Standard
                            </h2>
                        </div>

                        {/* Tabs */}
                        <div className="max-w-5xl mx-auto">
                            <div className="flex justify-center gap-4 mb-12">
                                <button
                                    onClick={() => setActiveTab("villa")}
                                    className={`px-8 py-3 font-avenir text-sm uppercase tracking-widest transition-all ${activeTab === "villa"
                                        ? "bg-[#CB9275] text-white"
                                        : "bg-white text-foreground hover:bg-[#CB9275]/10"
                                        }`}
                                >
                                    Your Villa
                                </button>
                                <button
                                    onClick={() => setActiveTab("boat")}
                                    className={`px-8 py-3 font-avenir text-sm uppercase tracking-widest transition-all ${activeTab === "boat"
                                        ? "bg-[#CB9275] text-white"
                                        : "bg-white text-foreground hover:bg-[#CB9275]/10"
                                        }`}
                                >
                                    Your Boat
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="bg-white shadow-xl p-8 md:p-12">
                                <h3 className="font-canto text-3xl md:text-4xl text-foreground mb-6">
                                    {tabs[activeTab].title}
                                </h3>
                                <p className="font-avenir text-lg text-foreground/80 mb-6 leading-relaxed">
                                    {tabs[activeTab].headline}
                                </p>
                                <p className="font-avenir text-foreground/70 mb-8 leading-relaxed">
                                    {tabs[activeTab].description}
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    {tabs[activeTab].points.map((point, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#CB9275]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-avenir text-sm text-foreground">{point}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    {tabs[activeTab].images.map((image, index) => (
                                        <div key={index} className="relative aspect-[4/3] overflow-hidden group">
                                            <Image
                                                src={image}
                                                alt={`${tabs[activeTab].title} ${index + 1}`}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING & INCLUSIONS */}
                <section className="py-32 bg-background">
                    <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                        <div className="text-center mb-20">
                            <h2 className="font-canto text-4xl md:text-5xl text-foreground mb-4">
                                {pricing.title}
                            </h2>
                            <p className="font-avenir text-3xl text-[#CB9275] font-light">
                                {pricing.text}
                            </p>
                            <p className="font-avenir text-sm text-foreground/60 mt-4 max-w-2xl mx-auto">
                                {pricing.note}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-white p-8 shadow-lg">
                                <h3 className="font-canto text-2xl text-foreground mb-6 pb-4 border-b border-foreground/10">
                                    What's Included
                                </h3>
                                <ul className="space-y-3">
                                    {pricing.included.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-[#CB9275] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-avenir text-sm text-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white p-8 shadow-lg">
                                <h3 className="font-canto text-2xl text-foreground mb-6 pb-4 border-b border-foreground/10">
                                    Not Included
                                </h3>
                                <ul className="space-y-3">
                                    {pricing.excluded.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-foreground/30 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-avenir text-sm text-foreground/60">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-16 flex flex-col md:flex-row gap-5 justify-center items-center">
                            <a
                                href={createWaLink("Check availability")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-10 py-5 bg-[#CB9275] hover:bg-[#B67F63] text-white font-avenir tracking-[0.15em] uppercase text-sm transition-all duration-300 w-full md:w-auto min-w-[280px] shadow-2xl text-center"
                            >
                                <span className="inline-block group-hover:scale-105 transition-transform duration-300">Message Us on WhatsApp</span>
                            </a>
                            <a
                                href={`mailto:contact@togeanvoyages.com?subject=${encodeURIComponent("Blue Retreat Inquiry")}&body=${encodeURIComponent("Hi TogeanVoyage team, I'm interested in Blue Retreat (8+ days). Please share availability, pricing, and next steps.")}`}
                                className="group px-10 py-5 border-2 border-foreground/20 text-foreground hover:border-[#CB9275] hover:text-[#CB9275] font-avenir tracking-[0.15em] uppercase text-sm transition-all duration-300 w-full md:w-auto min-w-[280px] text-center"
                            >
                                <span className="inline-block group-hover:scale-105 transition-transform duration-300">Email Us</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-32 bg-[#FAFAFA]">
                    <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                        <div className="text-center mb-20">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                                Common Questions
                            </span>
                            <h2 className="font-canto text-4xl md:text-5xl text-foreground">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {faq.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-md overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-avenir font-bold text-foreground pr-4">
                                            {item.question}
                                        </span>
                                        <svg
                                            className={`w-5 h-5 text-[#CB9275] transition-transform ${openFaqIndex === index ? "rotate-180" : ""
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    {openFaqIndex === index && (
                                        <div className="px-8 pb-6">
                                            <p className="font-avenir text-foreground/70 leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 md:hidden flex items-center justify-between gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col">
                    <span className="text-[10px] text-foreground/50 uppercase tracking-wide">Blue Retreat</span>
                    <span className="text-xs font-bold text-foreground">From 8 Days</span>
                </div>
                <div className="flex gap-2">
                    <a
                        href={createWaLink("Inquire")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-[#CB9275] hover:bg-[#B67F63] rounded text-white text-xs font-bold uppercase tracking-wide transition-all"
                    >
                        WhatsApp
                    </a>
                    <a
                        href={`mailto:contact@togeanvoyages.com`}
                        className="px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded text-foreground text-xs font-bold uppercase tracking-wide transition-all"
                    >
                        Email
                    </a>
                </div>
            </div>

            <FooterSection />
        </>
    );
}
