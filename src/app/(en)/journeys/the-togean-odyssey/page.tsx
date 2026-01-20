
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { theTogeanOdyssey } from "@/data/journeys/theTogeanOdyssey";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

export default function TheTogeanOdysseyPage() {
    const {
        headline,
        subline,
        shortDescription,
        modelConfirmation,
        description,
        stats,
        itinerary,
        socialProof,
        highlights,
        tabs,
        pricing,
        faq,
    } = theTogeanOdyssey;

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

                {/* PHASE 1: THE HOOK */}
                {/* Hero Section */}
                <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 select-none">
                        <Image
                            src="/destinations/destination_una_una.webp"
                            alt="The Togean Odyssey"
                            fill
                            className="object-cover"
                            priority
                            quality={90}
                        />
                        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 container mx-auto px-6 text-center text-white mt-10">
                        <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs md:text-sm font-avenir tracking-widest uppercase backdrop-blur-sm mb-6">
                            {subline}
                        </span>
                        <h1 className="font-canto text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight drop-shadow-lg">
                            {headline}
                        </h1>
                        <p className="font-avenir text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-6 font-light text-white/90">
                            {shortDescription}
                        </p>
                        <p className="font-avenir text-xs md:text-sm uppercase tracking-wider text-white/70 mb-10 max-w-xl mx-auto border-t border-white/20 pt-6 mt-6">
                            {modelConfirmation}
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={scrollToItinerary}
                                className="px-8 py-4 bg-[#CB9275] hover:bg-[#B67F63] text-white font-avenir tracking-widest uppercase text-sm transition-all duration-300 w-full md:w-auto min-w-[200px]"
                            >
                                View Itinerary
                            </button>
                            <Link
                                href="/how-to-book"
                                className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black font-avenir tracking-widest uppercase text-sm transition-all duration-300 w-full md:w-auto min-w-[200px]"
                            >
                                Check Availability
                            </Link>
                        </div>
                    </div>
                </section>

                {/* The Concept Section */}
                <section className="py-24 md:py-32 bg-background relative">
                    <div className="container mx-auto px-6 md:px-12 max-w-5xl text-center">
                        <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                            Why Odyssey Exists
                        </span>
                        <h2 className="font-canto text-4xl md:text-5xl mb-10 text-foreground">
                            Built like an expedition, <span className="italic text-[#CB9275]">felt like a private escape.</span>
                        </h2>
                        <p className="font-avenir text-lg md:text-xl text-foreground/70 leading-relaxed mb-16 max-w-3xl mx-auto">
                            {description}
                        </p>

                        {/* Journey Balance Visual */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-4 max-w-4xl mx-auto">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="50%"
                                                cy="50%"
                                                r="40%"
                                                fill="none"
                                                stroke="#e5e5e5"
                                                strokeWidth="4"
                                            />
                                            <circle
                                                cx="50%"
                                                cy="50%"
                                                r="40%"
                                                fill="none"
                                                stroke="#CB9275"
                                                strokeWidth="4"
                                                strokeDasharray={`${(stat.value / 100) * 251} 251`}
                                                strokeLinecap="round"
                                                className="transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                            <span className="font-canto text-2xl md:text-3xl text-foreground">{stat.value}%</span>
                                        </div>
                                    </div>
                                    <span className="font-avenir text-sm uppercase tracking-widest text-[#CB9275] text-center h-10 flex items-center">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                        <p className="font-avenir text-sm text-foreground/50 mt-8 italic">
                            “A true expedition: ocean-first, culture-rich, with just enough hiking to earn the views.”
                        </p>
                    </div>
                </section>

                {/* PHASE 2: THE JOURNEY */}
                <section id="itinerary" className="py-24 bg-[#F9F9F9]">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="text-center mb-20">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                                Your Day-by-Day Flow
                            </span>
                            <h2 className="font-canto text-4xl md:text-6xl text-foreground mb-4">
                                A 10-Day Odyssey
                            </h2>
                            <p className="font-avenir text-foreground/60 italic">
                                This is a sample flow—weather and sea conditions guide the final route.
                            </p>
                        </div>

                        <div className="relative max-w-6xl mx-auto">
                            {/* Vertical Line */}
                            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[#CB9275]/20 hidden md:block"></div>

                            <div className="space-y-12 md:space-y-0">
                                {itinerary.map((day, index) => (
                                    <div key={day.day} className={`flex flex-col md:flex-row gap-8 items-start relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                        {/* Desktop Center Marker */}
                                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#CB9275] rounded-full mt-8 ring-4 ring-white hidden md:block z-10"></div>

                                        {/* Content Card */}
                                        <div className={`w-full md:w-[calc(50%-2rem)] bg-white p-8 md:p-10 shadow-sm border-t-4 border-[#CB9275] hover:shadow-md transition-shadow duration-300 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                            <span className="font-avenir text-xs font-bold tracking-widest text-[#CB9275] uppercase block mb-2">
                                                Day {day.day}
                                            </span>
                                            <h3 className="font-canto text-2xl md:text-3xl text-foreground mb-6">
                                                {day.title}
                                            </h3>
                                            <ul className={`space-y-3 font-avenir text-foreground/70 text-sm md:text-base mb-8 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} flex flex-col items-start`}>
                                                <li className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} items-start`}>
                                                    <span className="font-bold text-foreground/90 text-xs uppercase tracking-wide">Morning</span>
                                                    {day.schedule.morning}
                                                </li>
                                                <li className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} items-start`}>
                                                    <span className="font-bold text-foreground/90 text-xs uppercase tracking-wide">Afternoon</span>
                                                    {day.schedule.afternoon}
                                                </li>
                                                <li className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} items-start`}>
                                                    <span className="font-bold text-foreground/90 text-xs uppercase tracking-wide">Evening</span>
                                                    {day.schedule.evening}
                                                </li>
                                            </ul>
                                            <div className={`p-4 bg-[#FDF8F6] border-l-2 border-[#CB9275] italic text-foreground/80 font-canto text-lg ${index % 2 === 0 ? 'md:border-l-0 md:border-r-2' : ''}`}>
                                                “{day.highlight}”
                                            </div>
                                        </div>

                                        {/* Image Card */}
                                        <div className="w-full md:w-[calc(50%-2rem)] hidden md:block">
                                            <div className="relative aspect-[4/3] overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-700">
                                                <Image
                                                    src={day.image}
                                                    alt={day.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Mobile Image */}
                                        <div className="w-full block md:hidden mt-[-1rem]">
                                            <div className="relative aspect-video w-full overflow-hidden mb-4">
                                                <Image
                                                    src={day.image}
                                                    alt={day.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Proof */}
                <section className="py-24 bg-foreground relative text-background overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src={socialProof.image}
                            alt="Social Proof"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative container mx-auto px-6 text-center max-w-4xl z-10">
                        <svg className="w-12 h-12 mx-auto mb-8 text-[#CB9275]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.896 14.912 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H15.017C14.465 8 14.017 8.448 14.017 9V11C14.017 11.552 13.569 12 13.017 12H12.017V5H22.017V15C22.017 18.314 19.331 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.896 5.91197 16 7.01697 16H10.017C10.569 16 11.017 15.552 11.017 15V9C11.017 8.448 10.569 8 10.017 8H6.01697C5.46497 8 5.01697 8.448 5.01697 9V11C5.01697 11.552 4.56897 12 4.01697 12H3.01697V5H13.017V15C13.017 18.314 10.331 21 7.01697 21H5.01697Z" />
                        </svg>
                        <blockquote className="font-canto text-3xl md:text-5xl leading-tight mb-8">
                            “{socialProof.quote}”
                        </blockquote>
                        <p className="font-avenir text-[#CB9275] uppercase tracking-widest text-sm">
                            {socialProof.subQuote}
                        </p>
                    </div>
                </section>

                {/* Program Highlights */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="text-center mb-16">
                            <span className="text-[#CB9275] font-avenir text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                                Why Choose Odyssey
                            </span>
                            <h2 className="font-canto text-4xl md:text-5xl text-foreground">
                                Only in Odyssey
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="group relative overflow-hidden h-[400px]">
                                    <Image
                                        src={item.image}
                                        alt={item.text}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <p className="text-white font-canto text-2xl leading-normal">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PHASE 3: PREMIUM STANDARD - TABS */}
                <section className="py-24 bg-[#F3F3F3]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="flex justify-center mb-12">
                            <div className="inline-flex bg-white p-1 rounded-full shadow-sm">
                                {["villa", "boat"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as "villa" | "boat")}
                                        className={`px-8 py-3 rounded-full text-sm font-avenir tracking-widest uppercase transition-all duration-300 ${activeTab === tab
                                                ? "bg-[#CB9275] text-white shadow-md"
                                                : "text-foreground/50 hover:text-foreground"
                                            }`}
                                    >
                                        {tab === "villa" ? "Your Villa" : "Your Boat"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                {/* Text Content */}
                                <div className="order-2 lg:order-1 px-4 lg:px-12">
                                    <h3 className="font-canto text-4xl md:text-5xl mb-6 text-foreground">
                                        {tabs[activeTab].title}
                                    </h3>
                                    <p className="font-avenir text-lg text-foreground/70 leading-relaxed mb-10">
                                        {tabs[activeTab].description}
                                    </p>
                                    <ul className="space-y-4">
                                        {tabs[activeTab].points.map((point, i) => (
                                            <li key={i} className="flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-[#CB9275]" />
                                                <span className="font-avenir text-foreground text-lg">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Image Gallery */}
                                <div className="order-1 lg:order-2 grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
                                    {tabs[activeTab].images.map((img, i) => (
                                        <div key={i} className={`relative overflow-hidden ${i === 0 ? 'col-span-1 row-span-2' : 'col-span-1 row-span-1'}`}>
                                            <Image
                                                src={img}
                                                alt={tabs[activeTab].title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* PHASE 4: LOGISTICS & CLOSE */}
                <section id="pricing" className="py-24 bg-background">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                            {/* Pricing & CTA */}
                            <div>
                                <h2 className="font-canto text-5xl text-foreground mb-8">
                                    {pricing.title}
                                </h2>
                                <p className="font-avenir text-2xl text-[#CB9275] mb-8 font-light">
                                    {pricing.text}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                                    <div>
                                        <h4 className="font-bold uppercase tracking-widest text-xs mb-4 text-foreground/40">Included</h4>
                                        <ul className="space-y-2">
                                            {pricing.included.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                                    <span className="text-[#CB9275]">✓</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold uppercase tracking-widest text-xs mb-4 text-foreground/40">Excluded</h4>
                                        <ul className="space-y-2">
                                            {pricing.excluded.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/60">
                                                    <span className="text-foreground/30">×</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Link
                                        href="/how-to-book"
                                        className="block w-full py-4 bg-[#CB9275] hover:bg-[#B67F63] text-white text-center font-avenir tracking-widest uppercase text-sm transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Check Availability
                                    </Link>
                                    <a
                                        href="https://wa.me/62812345678"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-4 border border-foreground/10 hover:border-[#CB9275] text-foreground hover:text-[#CB9275] text-center font-avenir tracking-widest uppercase text-sm transition-all"
                                    >
                                        Chat to Customize
                                    </a>
                                </div>
                            </div>

                            {/* FAQ */}
                            <div>
                                <h3 className="font-canto text-3xl mb-8 text-foreground">Common Questions</h3>
                                <div className="space-y-4">
                                    {faq.map((item, index) => (
                                        <div key={index} className="border-b border-foreground/10 pb-4">
                                            <button
                                                onClick={() => toggleFaq(index)}
                                                className="w-full flex justify-between items-center text-left focus:outline-none py-2"
                                            >
                                                <span className="font-avenir text-lg text-foreground/90">{item.question}</span>
                                                <span className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-45 text-[#CB9275]' : 'text-foreground/30'}`}>
                                                    +
                                                </span>
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                <p className="font-avenir text-foreground/70 leading-relaxed text-sm">
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
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 md:hidden flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col">
                    <span className="text-[10px] text-foreground/50 uppercase tracking-wide">Odyssey</span>
                    <span className="text-xs font-bold text-foreground">From 10 Days</span>
                </div>
                <div className="flex gap-2">
                    <a
                        href="https://wa.me/62812345678"
                        target="_blank"
                        className="px-4 py-3 bg-gray-100 rounded text-foreground text-xs font-bold uppercase tracking-wide"
                    >
                        Chat
                    </a>
                    <Link
                        href="/how-to-book"
                        className="px-6 py-3 bg-[#CB9275] rounded text-white text-xs font-bold uppercase tracking-wide shadow-md"
                    >
                        Check
                    </Link>
                </div>
            </div>
        </>
    );
}
