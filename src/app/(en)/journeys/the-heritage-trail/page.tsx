
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { theHeritageTrail } from "@/data/journeys/theHeritageTrail";
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
    const message = `Hi TogeanVoyage team! I'm interested in The Heritage Trail (From 8 Days).
Intent: ${intent}
Preferred month: [your month]
Group size: [your group size]
Link: /journeys/the-heritage-trail`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

export default function TheHeritageTrailPage() {
    const {
        headline,
        subline,
        shortDescription,
        tagline,
        modelConfirmation,
        snapshot,
        concept,
        stats,
        itinerary,
        socialProof,
        highlights,
        tabs,
        pricing,
        faq,
    } = theHeritageTrail;

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

                {/* PHASE 1: THE HOOK - HERO SECTION */}
                <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0 z-0 select-none">
                        <Image
                            src="/journeys/heritage-trail/heritage-hero.webp"
                            alt="The Heritage Trail"
                            fill
                            className="object-cover"
                            priority
                            quality={95}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
                    </div>

                    {/* Back Link */}
                    <div className="absolute top-3 left-6 md:top-4 md:left-12 z-20">
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

                        {/* Sub-head with readability treatment */}
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

                {/* WHY HERITAGE TRAIL EXISTS */}
                <WhyExistsSection
                    subtitle={concept.eyebrow}
                    headline={concept.headline}
                    description={concept.description}
                    stats={stats}
                    quote="Not just a trip—an introduction to the islands and the people who shape them."
                />

                {/* PHASE 2: THE JOURNEY - ITINERARY */}
                <section id="itinerary" className="py-32 bg-[#FAFAFA] relative">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="text-center mb-24">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.25em] uppercase mb-6 block">
                                Your Day-by-Day Flow
                            </span>
                            <h2 className="font-canto text-5xl md:text-7xl text-foreground mb-6">
                                The Heritage Trail Journey
                            </h2>
                            <p className="font-avenir text-foreground/60 italic text-lg">
                                Sample itinerary — the full route adapts to your season.
                            </p>
                        </div>

                        <div className="relative max-w-6xl mx-auto">
                            {/* Vertical Timeline */}
                            <div className="absolute left-[19px] md:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#CB9275]/40 via-[#CB9275]/60 to-[#CB9275]/40 hidden md:block"></div>

                            <div className="space-y-16 md:space-y-20">
                                {/* Show only first 3 days */}
                                {itinerary.slice(0, 3).map((day, index) => (
                                    <motion.div
                                        key={day.day}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15, duration: 0.6 }}
                                        className="relative"
                                    >
                                        {/* Desktop Layout */}
                                        <div className={`hidden md:flex gap-12 items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                            {/* Timeline Marker */}
                                            <div className="absolute left-12 w-8 h-8 bg-[#CB9275] rounded-full ring-8 ring-white shadow-lg flex items-center justify-center z-10">
                                                <span className="font-avenir text-xs text-white font-bold">{day.day}</span>
                                            </div>

                                            {/* Content Card */}
                                            <div className={`w-1/2 ${index % 2 === 0 ? 'ml-28' : 'mr-28'}`}>
                                                <div className="bg-white p-10 shadow-lg hover:shadow-2xl transition-shadow duration-500 border-l-4 border-[#CB9275]">
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
                                                    <div className="p-5 bg-[#FDF8F6] border-l-2 border-[#CB9275] italic text-foreground/80 font-canto text-lg">
                                                        "{day.highlight}"
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Image Card */}
                                            <div className="w-1/2">
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

                                        {/* Mobile Layout */}
                                        <div className="md:hidden bg-white p-8 shadow-lg border-t-4 border-[#CB9275]">
                                            <span className="font-avenir text-xs font-bold tracking-[0.2em] text-[#CB9275] uppercase block mb-2">
                                                Day {day.day}
                                            </span>
                                            <h3 className="font-canto text-2xl text-foreground mb-6">
                                                {day.title}
                                            </h3>
                                            <div className="relative aspect-video w-full overflow-hidden mb-6">
                                                <Image
                                                    src={day.image}
                                                    alt={day.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="space-y-4 mb-6">
                                                <div>
                                                    <span className="font-avenir font-bold text-xs uppercase tracking-wide text-foreground/50 block mb-1">Morning</span>
                                                    <p className="font-avenir text-foreground/80 text-sm">{day.schedule.morning}</p>
                                                </div>
                                                <div>
                                                    <span className="font-avenir font-bold text-xs uppercase tracking-wide text-foreground/50 block mb-1">Afternoon</span>
                                                    <p className="font-avenir text-foreground/80 text-sm">{day.schedule.afternoon}</p>
                                                </div>
                                                <div>
                                                    <span className="font-avenir font-bold text-xs uppercase tracking-wide text-foreground/50 block mb-1">Evening</span>
                                                    <p className="font-avenir text-foreground/80 text-sm">{day.schedule.evening}</p>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-[#FDF8F6] border-l-2 border-[#CB9275] italic text-foreground/80 font-canto text-base">
                                                "{day.highlight}"
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Full Itinerary Invite Card */}
                                <FullItineraryCard
                                    title="Want the complete day-by-day route?"
                                    description="We'll send the complete PDF itinerary and tailor it to your season, pace, and interests—villages, reefs, and hikes included."
                                    whatsappHref={createWaLink("Request Full Itinerary")}
                                    emailHref={`mailto:contact@togeanvoyages.com?subject=${encodeURIComponent("Heritage Trail — Full Itinerary Request")}&body=${encodeURIComponent("Hi TogeanVoyage team, I'd like the full Heritage Trail itinerary (8+ days). Traveling on: __ / Group size: __ / Interests: __ / Notes: __")}`}
                                    whatsappLabel="Request the Full Itinerary"
                                    emailLabel="Email for Dates & Details"
                                    durationLabel="+ 5 More Days Available"
                                />
                            </div>
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
                        <svg className="w-16 h-16 mx-auto mb-10 text-[#CB9275]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.896 14.912 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H15.017C14.465 8 14.017 8.448 14.017 9V11C14.017 11.552 13.569 12 13.017 12H12.017V5H22.017V15C22.017 18.314 19.331 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.896 5.91197 16 7.01697 16H10.017C10.569 16 11.017 15.552 11.017 15V9C11.017 8.448 10.569 8 10.017 8H6.01697C5.46497 8 5.01697 8.448 5.01697 9V11C5.01697 11.552 4.56897 12 4.01697 12H3.01697V5H13.017V15C13.017 18.314 10.331 21 7.01697 21H5.01697Z" />
                        </svg>
                        <blockquote className="font-canto text-4xl md:text-6xl leading-tight mb-10">
                            "{socialProof.quote}"
                        </blockquote>
                        <p className="font-avenir text-[#CB9275] uppercase tracking-[0.2em] text-sm mb-12">
                            — {socialProof.attribution}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {socialProof.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-5 py-2 border border-background/30 rounded-full text-xs font-avenir uppercase tracking-wide backdrop-blur-sm bg-background/5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PROGRAM HIGHLIGHTS */}
                <section className="py-32 bg-background">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-20">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.25em] uppercase mb-6 block">
                                Only in Heritage Trail
                            </span>
                            <h2 className="font-canto text-5xl md:text-7xl text-foreground">
                                Signature Moments
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {highlights.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    className="group relative overflow-hidden h-[500px]"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-10">
                                        <h3 className="text-white font-canto text-3xl mb-4 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/80 font-avenir text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PHASE 3: PREMIUM STANDARD - TABS */}
                <section className="py-32 bg-[#F7F7F7]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="flex justify-center mb-16">
                            <div className="inline-flex bg-white p-2 rounded-full shadow-lg">
                                {(["villa", "boat"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-10 py-4 rounded-full text-sm font-avenir tracking-[0.15em] uppercase transition-all duration-300 ${activeTab === tab
                                            ? "bg-[#CB9275] text-white shadow-lg"
                                            : "text-foreground/50 hover:text-foreground"
                                            }`}
                                    >
                                        {tab === "villa" ? "Your Villa" : "Your Boat"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Text Content */}
                            <div className="order-2 lg:order-1 px-4 lg:px-12">
                                <h3 className="font-canto text-5xl md:text-6xl mb-6 text-foreground leading-tight">
                                    {tabs[activeTab].title}
                                </h3>
                                <p className="font-canto text-2xl italic text-[#CB9275] mb-8 leading-relaxed">
                                    {tabs[activeTab].headline}
                                </p>
                                <p className="font-avenir text-lg text-foreground/70 leading-relaxed mb-10">
                                    {tabs[activeTab].description}
                                </p>
                                <ul className="space-y-5">
                                    {tabs[activeTab].points.map((point, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className="w-3 h-3 rounded-full bg-[#CB9275] mt-1.5 flex-shrink-0" />
                                            <span className="font-avenir text-foreground text-base leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Image Gallery */}
                            <div className="order-1 lg:order-2 grid grid-cols-2 grid-rows-2 gap-4 h-[550px]">
                                {tabs[activeTab].images.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`relative overflow-hidden shadow-lg ${i === 0 ? "col-span-1 row-span-2" : "col-span-1 row-span-1"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={tabs[activeTab].title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* PHASE 4: PRICING & FAQ */}
                <section id="pricing" className="py-32 bg-background">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28">
                            {/* Pricing & CTA */}
                            <div>
                                <h2 className="font-canto text-6xl text-foreground mb-8 leading-tight">
                                    {pricing.title}
                                </h2>
                                <p className="font-avenir text-3xl text-[#CB9275] mb-4 font-light">
                                    {pricing.text}
                                </p>
                                <p className="font-avenir text-sm text-foreground/60 mb-12 italic">
                                    {pricing.note}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
                                    <div>
                                        <h4 className="font-bold uppercase tracking-[0.15em] text-xs mb-5 text-foreground/40">Included</h4>
                                        <ul className="space-y-3">
                                            {pricing.included.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 font-avenir">
                                                    <span className="text-[#CB9275] font-bold">✓</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold uppercase tracking-[0.15em] text-xs mb-5 text-foreground/40">Excluded</h4>
                                        <ul className="space-y-3">
                                            {pricing.excluded.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-foreground/60 font-avenir">
                                                    <span className="text-foreground/30 font-bold">×</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5">
                                    <a
                                        href={createWaLink("Check Availability")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full py-5 bg-[#CB9275] hover:bg-[#B67F63] text-white text-center font-avenir tracking-[0.15em] uppercase text-sm transition-all shadow-xl hover:shadow-2xl"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Message on WhatsApp
                                    </a>

                                    <div className="flex items-center justify-center gap-4 my-2">
                                        <div className="flex-1 h-px bg-[#CB9275]/40"></div>
                                        <span className="text-xs font-avenir tracking-[0.2em] uppercase text-[#CB9275]/70">OR</span>
                                        <div className="flex-1 h-px bg-[#CB9275]/40"></div>
                                    </div>

                                    <a
                                        href={`mailto:contact@togeanvoyages.com?subject=${encodeURIComponent("Inquiry: The Heritage Trail (8 Days)")}&body=${encodeURIComponent("Hi TogeanVoyage team,\n\nI'm interested in The Heritage Trail (8 Days). Please share availability, pricing, and next steps.\n\nThanks!")}`}
                                        className="flex items-center justify-center gap-3 w-full py-5 border-2 border-foreground/10 hover:border-[#CB9275] text-foreground hover:text-[#CB9275] text-center font-avenir tracking-[0.15em] uppercase text-sm transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Request Details by Email
                                    </a>
                                </div>
                            </div>

                            {/* FAQ */}
                            <div>
                                <h3 className="font-canto text-4xl mb-12 text-foreground">Common Questions</h3>
                                <div className="space-y-5">
                                    {faq.map((item, index) => (
                                        <div key={index} className="border-b border-foreground/10 pb-5">
                                            <button
                                                onClick={() => toggleFaq(index)}
                                                className="w-full flex justify-between items-center text-left focus:outline-none py-3 group"
                                            >
                                                <span className="font-avenir text-lg text-foreground/90 group-hover:text-[#CB9275] transition-colors pr-4">
                                                    {item.question}
                                                </span>
                                                <span
                                                    className={`text-2xl transition-all duration-300 flex-shrink-0 ${openFaqIndex === index ? "rotate-45 text-[#CB9275]" : "text-foreground/30"
                                                        }`}
                                                >
                                                    +
                                                </span>
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <p className="font-avenir text-foreground/70 leading-relaxed text-base">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <FooterSection />
            </main>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 md:hidden flex items-center justify-between gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col">
                    <span className="text-[10px] text-foreground/50 uppercase tracking-wide">Heritage Trail</span>
                    <span className="text-xs font-bold text-foreground">From 8 Days</span>
                </div>
                <div className="flex gap-2">
                    <a
                        href={createWaLink("Inquire")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded text-foreground text-xs font-bold uppercase tracking-wide transition-all"
                    >
                        WhatsApp
                    </a>
                    <a
                        href={`mailto:contact@togeanvoyages.com`}
                        className="px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded text-foreground text-xs font-bold uppercase tracking-wide transition-all"
                    >
                        Email
                    </a>
                    <Link
                        href="/how-to-booking"
                        className="px-6 py-3 bg-[#CB9275] hover:bg-[#B67F63] rounded text-white text-xs font-bold uppercase tracking-wide shadow-md transition-all"
                    >
                        Book
                    </Link>
                </div>
            </div>
        </>
    );
}
