
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import SpotlightCarousel from "@/components/SpotlightCarousel";
import ProgramCarousel from "@/components/ProgramCarousel";

// Helper to create WhatsApp link with form data
const createWaLink = (formData?: any) => {
    const phoneNumber = "6285943001104";

    if (formData) {
        const message = `Hi TogeanVoyage team! I'd like to plan a Custom Voyage.

Name: ${formData.name || '[Your name]'}
Preferred dates: ${formData.dates || '[Your dates]'}
Group size: ${formData.groupSize || '[Your group size]'}
Interests: ${formData.interests?.join(', ') || '[Your interests]'}
Pace: ${formData.pace || '[Your pace]'}
Notes: ${formData.notes || 'N/A'}

Link: /journeys/custom-voyage`;

        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    }

    const defaultMessage = `Hi TogeanVoyage team! I'm interested in planning a Custom Voyage. Can we discuss my preferences?

Link: /journeys/custom-voyage`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
};

export default function CustomVoyagePage() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        dates: "",
        groupSize: "",
        interests: [] as string[],
        pace: "",
        notes: ""
    });

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const scrollToForm = () => {
        const element = document.getElementById("concierge-form");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const interestOptions = [
        "Reefs",
        "Beach time",
        "Snorkeling",
        "Culture",
        "Wildlife",
        "Light hikes",
        "Photography",
        "Romance"
    ];

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const faqData = [
        {
            question: "How flexible is the route?",
            answer: "Completely flexible. We design every Custom Voyage from scratch based on your interests, pace, and travel dates. Routes adapt to sea conditions and your preferences throughout the journey."
        },
        {
            question: "Can we mix culture and reefs?",
            answer: "Absolutely. Most Custom Voyages blend snorkeling, cultural visits, beach time, and light hiking. We'll balance activities according to what matters most to you."
        },
        {
            question: "Is this suitable for families?",
            answer: "Yes. Custom Voyages work beautifully for families—we pace activities for all ages and can include hands-on cultural experiences, easy snorkeling sites, and relaxed beach days."
        },
        {
            question: "What's the minimum duration?",
            answer: "We recommend at least 5 days to experience the islands properly, but most Custom Voyages run 7-10 days. Longer journeys allow for deeper exploration and a more relaxed rhythm."
        },
        {
            question: "How far in advance should we book?",
            answer: "2-3 months ahead is ideal for most dates. For peak season (July-September) or larger groups, 4-6 months advance notice ensures full availability."
        },
        {
            question: "What if weather changes our plans?",
            answer: "Your captain monitors conditions daily. If weather shifts, we adjust the route in real-time—prioritizing safety and experience quality. Flexibility is built into every Custom Voyage."
        },
        {
            question: "How does pricing work?",
            answer: "Pricing depends on duration, group size, season, and specific requests. After you share your preferences, we'll send a transparent quote with all costs included. No hidden fees."
        }
    ];

    return (
        <>
            <Navbar />
            <main className="w-full bg-background text-foreground overflow-x-hidden selection:bg-[#CB9275] selection:text-white pb-24 md:pb-0">

                {/* PHASE 1: HERO - THE HOOK */}
                <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 select-none">
                        <Image
                            src="/journeys/custom-voyage/hero.webp"
                            alt="Custom Voyage - Your bespoke journey"
                            fill
                            className="object-cover"
                            priority
                            quality={95}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
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

                    {/* Hero Content - Refined Spacing & Size */}
                    <div className="relative z-10 container mx-auto px-6 md:px-12 text-center text-white max-w-5xl">
                        <span className="inline-block py-2 px-5 border border-white/40 rounded-full text-xs md:text-sm font-avenir tracking-[0.2em] uppercase backdrop-blur-md mb-6 bg-white/5">
                            CUSTOM PROGRAM
                        </span>

                        {/* H1 Reduced from 9xl to 8xl (Desktop) and tuned for mobile */}
                        <h1 className="font-canto text-5xl md:text-7xl lg:text-8xl mb-5 leading-[0.95] drop-shadow-2xl tracking-tight">
                            Custom Voyage
                        </h1>

                        <span className="inline-block px-8 py-3 rounded-full border border-[#CB9275]/20 bg-[#FDF8F6]/10 backdrop-blur-sm mb-6">
                            <p className="font-canto text-2xl md:text-4xl italic text-white drop-shadow-sm font-medium">
                                Designed around you.
                            </p>
                        </span>

                        <p className="font-avenir text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-6 font-light text-white/95 px-4 drop-shadow-md">
                            Tell us what you love—reef time, quiet beaches, village culture, wildlife, hikes. We'll craft a private route that fits your pace, your dates, and your idea of perfect.
                        </p>

                        <p className="font-avenir text-xs md:text-sm uppercase tracking-[0.15em] text-white/80 mb-8 max-w-2xl mx-auto border-t border-white/30 pt-6 mt-6">
                            Daily Private Cruises • Nightly Luxury Villa Stay • Flexible Day-by-Day Pace
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                            <button
                                onClick={scrollToForm}
                                className="group px-8 py-4 bg-[#CB9275] hover:bg-[#B67F63] text-white font-avenir tracking-[0.15em] uppercase text-sm transition-all duration-300 w-full md:w-auto min-w-[260px] shadow-2xl hover:shadow-[#CB9275]/30"
                            >
                                <span className="inline-block group-hover:scale-105 transition-transform duration-300">Custom Your Itinerary</span>
                            </button>
                            <a
                                href={createWaLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-8 py-4 border-2 border-white/90 text-white hover:bg-white/10 hover:border-white font-avenir tracking-[0.15em] uppercase text-sm transition-all duration-300 w-full md:w-auto min-w-[260px] backdrop-blur-sm text-center"
                            >
                                <span className="inline-block group-hover:scale-105 transition-transform duration-300">Chat on WhatsApp</span>
                            </a>
                        </div>

                        {/* Trust micro-row */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center text-white/80 text-xs md:text-sm font-avenir">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#CB9275]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>Tailored routes, not templates</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#CB9275]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>Private crew + calm pace</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#CB9275]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>Fast response, human planning</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PHASE 2: HOW CUSTOM WORKS - Tightened Spacing */}
                <section className="py-16 md:py-20 bg-background relative overflow-hidden">
                    {/* Subtle background texture */}
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 hidden md:block">
                        <Image
                            src="/journeys/custom-voyage/planning.webp"
                            alt="Planning"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="container mx-auto px-6 max-w-7xl relative z-10">
                        <div className="text-center mb-12">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
                                How Custom Works
                            </span>
                            <h2 className="font-canto text-4xl md:text-6xl text-foreground mb-4">
                                Three steps to a trip that fits.
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 max-w-6xl mx-auto mb-12">
                            {/* Step 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-[#CB9275]/10 flex items-center justify-center">
                                    <span className="font-canto text-2xl md:text-3xl text-[#CB9275]">1</span>
                                </div>
                                <h3 className="font-canto text-2xl md:text-3xl text-foreground mb-3">Tell us your vibe</h3>
                                <p className="font-avenir text-foreground/70 leading-relaxed text-sm md:text-base">
                                    Reefs, rest, culture, hikes, wildlife—we'll ask the right questions to understand what matters most.
                                </p>
                            </motion.div>

                            {/* Step 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-[#CB9275]/10 flex items-center justify-center">
                                    <span className="font-canto text-2xl md:text-3xl text-[#CB9275]">2</span>
                                </div>
                                <h3 className="font-canto text-2xl md:text-3xl text-foreground mb-3">We design the route</h3>
                                <p className="font-avenir text-foreground/70 leading-relaxed text-sm md:text-base">
                                    Tailored to season, sea conditions, and your interests—every day shaped with intention.
                                </p>
                            </motion.div>

                            {/* Step 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-[#CB9275]/10 flex items-center justify-center">
                                    <span className="font-canto text-2xl md:text-3xl text-[#CB9275]">3</span>
                                </div>
                                <h3 className="font-canto text-2xl md:text-3xl text-foreground mb-3">You approve + refine</h3>
                                <p className="font-avenir text-foreground/70 leading-relaxed text-sm md:text-base">
                                    We adjust until it feels perfect. No pressure, just clarity and collaboration.
                                </p>
                            </motion.div>
                        </div>

                        <p className="text-center font-avenir text-foreground/60 italic text-base md:text-lg max-w-2xl mx-auto">
                            We'll guide you—no overwhelm, just clarity.
                        </p>
                    </div>
                </section>

                {/* PHASE 3: DESTINATIONS SECTION - Tightened Spacing */}
                <section className="py-10 md:py-14 bg-[#FAFAFA]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-12">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
                                Select Your Islands
                            </span>
                            <h2 className="font-canto text-4xl md:text-6xl text-foreground mb-4">
                                Choose your islands.
                            </h2>
                            <p className="font-avenir text-foreground/60 text-base md:text-lg max-w-3xl mx-auto">
                                Start with a destination—then we shape the days around what you want to see and do.
                            </p>
                        </div>
                    </div>

                    {/* Reuse Home's SpotlightCarousel component */}
                    <SpotlightCarousel />
                </section>

                {/* PHASE 4: ACTIVITIES SECTION - Tightened Spacing */}
                <section className="py-10 md:py-14 bg-background">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-12">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
                                Select Your Experiences
                            </span>
                            <h2 className="font-canto text-4xl md:text-6xl text-foreground mb-4">
                                Choose your experiences.
                            </h2>
                            <p className="font-avenir text-foreground/60 text-base md:text-lg max-w-3xl mx-auto">
                                Reef days, village moments, hikes, wildlife—your mix, your balance.
                            </p>
                        </div>
                    </div>

                    {/* Reuse Home's ProgramCarousel component */}
                    <ProgramCarousel />
                </section>

                {/* PHASE 5: CONCIERGE FORM - Tightened Spacing */}
                <section id="concierge-form" className="py-6 md:py-8 bg-[#FAFAFA] relative scroll-mt-24">
                    {/* Background texture */}
                    <div className="absolute bottom-0 left-0 w-1/2 h-2/3 opacity-5 hidden md:block">
                        <Image
                            src="/journeys/custom-voyage/concierge.webp"
                            alt="Concierge service"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="container mx-auto px-6 max-w-2xl relative z-10">
                        <div className="text-center mb-4 md:mb-6">
                            <span className="text-[#CB9275] font-avenir text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block">
                                Concierge Request
                            </span>
                            <h2 className="font-canto text-2xl md:text-3xl lg:text-4xl text-foreground mb-2">
                                We'll craft your Custom Voyage.
                            </h2>
                            <p className="font-avenir text-foreground/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                                Share a few details. We'll reply with a tailored route suggestion.
                            </p>
                        </div>

                        <div className="bg-white p-5 md:p-8 shadow-xl">
                            <div className="space-y-3">
                                {/* Name & Group Size Row - COMPACTED */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-avenir text-[10px] md:text-xs font-bold text-foreground/80 mb-1 uppercase tracking-wide">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-1.5 border border-foreground/20 focus:border-[#CB9275] focus:outline-none font-avenir text-sm transition-colors"
                                            placeholder="First & Last Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-avenir text-[10px] md:text-xs font-bold text-foreground/80 mb-1 uppercase tracking-wide">
                                            Group Size
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.groupSize}
                                            onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                                            className="w-full px-3 py-1.5 border border-foreground/20 focus:border-[#CB9275] focus:outline-none font-avenir text-sm transition-colors"
                                            placeholder="e.g. 2 adults"
                                        />
                                    </div>
                                </div>

                                {/* Preferred Dates - Full width but short */}
                                <div>
                                    <label className="block font-avenir text-[10px] md:text-xs font-bold text-foreground/80 mb-1 uppercase tracking-wide">
                                        Preferred Dates (or Month)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.dates}
                                        onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                                        className="w-full px-3 py-1.5 border border-foreground/20 focus:border-[#CB9275] focus:outline-none font-avenir text-sm transition-colors"
                                        placeholder="e.g. June 2026"
                                    />
                                </div>

                                {/* Interests - Tighter grid */}
                                <div>
                                    <label className="block font-avenir text-[10px] md:text-xs font-bold text-foreground/80 mb-1 uppercase tracking-wide">
                                        Your Interests
                                    </label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {interestOptions.map((interest) => (
                                            <button
                                                key={interest}
                                                type="button"
                                                onClick={() => toggleInterest(interest)}
                                                className={`px-2.5 py-1 rounded-full font-avenir text-[10px] md:text-xs transition-all ${formData.interests.includes(interest)
                                                    ? "bg-[#CB9275] text-white shadow-md"
                                                    : "bg-white border border-foreground/20 text-foreground hover:border-[#CB9275]"
                                                    }`}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Pace - Compact buttons */}
                                <div>
                                    <label className="block font-avenir text-[10px] md:text-xs font-bold text-foreground/80 mb-1 uppercase tracking-wide">
                                        Pace Preference
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["Unhurried", "Balanced", "Expedition"].map((pace) => (
                                            <button
                                                key={pace}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, pace })}
                                                className={`px-2 py-1.5 font-avenir text-[10px] md:text-xs transition-all ${formData.pace === pace
                                                    ? "bg-[#CB9275] text-white shadow-md"
                                                    : "bg-white border border-foreground/20 text-foreground hover:border-[#CB9275]"
                                                    }`}
                                            >
                                                {pace}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Notes - Reduced rows */}
                                <div>
                                    <label className="block font-avenir text-[10px] md:text-xs font-bold text-foreground/80 mb-1 uppercase tracking-wide">
                                        Additional Notes (Optional)
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows={2}
                                        className="w-full px-3 py-1.5 border border-foreground/20 focus:border-[#CB9275] focus:outline-none font-avenir text-sm transition-colors resize-none"
                                        placeholder="Any specific requests..."
                                    />
                                </div>

                                {/* Submit buttons */}
                                <div className="pt-2 space-y-2">
                                    <a
                                        href={createWaLink(formData)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#CB9275] hover:bg-[#B67F63] text-white text-center font-avenir tracking-[0.15em] uppercase text-xs font-bold transition-all shadow-lg hover:shadow-xl"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Send to WhatsApp
                                    </a>

                                    <div className="flex items-center justify-center gap-4 my-1">
                                        <div className="flex-1 h-px bg-[#CB9275]/40"></div>
                                        <span className="text-[10px] font-avenir tracking-[0.2em] uppercase text-[#CB9275]/70">OR</span>
                                        <div className="flex-1 h-px bg-[#CB9275]/40"></div>
                                    </div>

                                    <a
                                        href={`mailto:contact@togeanvoyages.com?subject=${encodeURIComponent("Custom Voyage Request")}&body=${encodeURIComponent(`Hi TogeanVoyage team,

I'd like to plan a Custom Voyage.

Name: ${formData.name || '[Your name]'}
Preferred dates: ${formData.dates || '[Your dates]'}
Group size: ${formData.groupSize || '[Your group size]'}
Interests: ${formData.interests.join(', ') || '[Your interests]'}
Pace: ${formData.pace || '[Your pace]'}
Notes: ${formData.notes || 'N/A'}

Looking forward to hearing from you!`)}`}
                                        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-foreground/10 hover:border-[#CB9275] text-foreground hover:text-[#CB9275] text-center font-avenir tracking-[0.15em] uppercase text-xs font-bold transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send via Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PHASE 6: SOCIAL PROOF - Tightened Spacing */}
                <section className="py-16 md:py-20 bg-foreground text-background">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="text-center space-y-8 md:space-y-10">
                            <div>
                                <svg className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-6 md:mb-8 text-[#CB9275]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21L14.017 18C14.017 16.896 14.912 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H15.017C14.465 8 14.017 8.448 14.017 9V11C14.017 11.552 13.569 12 13.017 12H12.017V5H22.017V15C22.017 18.314 19.331 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.896 5.91197 16 7.01697 16H10.017C10.569 16 11.017 15.552 11.017 15V9C11.017 8.448 10.569 8 10.017 8H6.01697C5.46497 8 5.01697 8.448 5.01697 9V11C5.01697 11.552 4.56897 12 4.01697 12H3.01697V5H13.017V15C13.017 18.314 10.331 21 7.01697 21H5.01697Z" />
                                </svg>
                                <blockquote className="font-canto text-3xl md:text-5xl leading-tight mb-6 italic">
                                    "We told them what we loved—quiet reefs and slow mornings—and they built a route that felt made for us."
                                </blockquote>
                                <p className="font-avenir text-[#CB9275] uppercase tracking-[0.2em] text-xs md:text-sm">
                                    — Couple, Jakarta
                                </p>
                            </div>

                            <div className="border-t border-background/20 pt-8 md:pt-10">
                                <blockquote className="font-canto text-2xl md:text-4xl leading-tight mb-6 italic">
                                    "They adjusted everything mid-trip when weather shifted—no stress, just solutions. True concierge service."
                                </blockquote>
                                <p className="font-avenir text-[#CB9275] uppercase tracking-[0.2em] text-xs md:text-sm">
                                    — Family, Singapore
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PHASE 7: FAQ - Tightened Spacing */}
                <section className="py-10 md:py-12 bg-background">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-8">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
                                Common Questions
                            </span>
                            <h2 className="font-canto text-3xl md:text-4xl text-foreground">
                                Everything you need to know
                            </h2>
                        </div>

                        <div className="space-y-2">
                            {faqData.map((item, index) => (
                                <div key={index} className="border-b border-foreground/10 pb-2">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex justify-between items-center text-left focus:outline-none py-2 group"
                                    >
                                        <span className="font-avenir text-sm md:text-base text-foreground/90 group-hover:text-[#CB9275] transition-colors pr-4">
                                            {item.question}
                                        </span>
                                        <span
                                            className={`text-lg md:text-xl transition-all duration-300 flex-shrink-0 ${openFaqIndex === index ? "rotate-45 text-[#CB9275]" : "text-foreground/30"
                                                }`}
                                        >
                                            +
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <p className="font-avenir text-foreground/70 leading-relaxed text-xs md:text-sm">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PHASE 8: FINAL CTA - Tightened Spacing */}
                <section className="py-16 md:py-20 bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-background relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <Image
                            src="/journeys/custom-voyage/hero.webp"
                            alt="Your voyage"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                        <h2 className="font-canto text-4xl md:text-6xl mb-6 leading-tight">
                            Your islands. Your pace. Your voyage.
                        </h2>
                        <p className="font-avenir text-lg md:text-xl text-background/80 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                            Let's craft something unforgettable together.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={scrollToForm}
                                className="group px-8 py-4 bg-[#CB9275] hover:bg-[#B67F63] text-white font-avenir tracking-[0.15em] uppercase text-xs md:text-sm transition-all duration-300 w-full md:w-auto min-w-[260px] shadow-2xl hover:shadow-[#CB9275]/30"
                            >
                                <span className="inline-block group-hover:scale-105 transition-transform duration-300">Custom Your Itinerary</span>
                            </button>
                            <a
                                href={createWaLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-8 py-4 border-2 border-background/90 text-background hover:bg-background/10 hover:border-background font-avenir tracking-[0.15em] uppercase text-xs md:text-sm transition-all duration-300 w-full md:w-auto min-w-[260px] backdrop-blur-sm text-center"
                            >
                                <span className="inline-block group-hover:scale-105 transition-transform duration-300">Chat on WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </section>

                <FooterSection />
            </main>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 md:hidden flex items-center justify-between gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col">
                    <span className="text-[10px] text-foreground/50 uppercase tracking-wide">Custom Voyage</span>
                    <span className="text-xs font-bold text-foreground">Bespoke Planning</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={scrollToForm}
                        className="px-6 py-3 bg-[#CB9275] hover:bg-[#B67F63] rounded text-white text-xs font-bold uppercase tracking-wide shadow-md transition-all"
                    >
                        Custom
                    </button>
                    <a
                        href={createWaLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded text-foreground text-xs font-bold uppercase tracking-wide transition-all"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </>
    );
}
