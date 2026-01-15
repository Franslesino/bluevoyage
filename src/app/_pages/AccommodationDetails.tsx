"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"; // Use next/navigation for app dir
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { accommodations, GuestHouse } from "@/data/accommodations";
import BackLink from "@/components/BackLink";
import LocaleLink from "@/components/LocaleLink";
import { useTranslation } from "@/components/I18nProvider";

const TABS = ["All", "Malenge", "Una-una", "Kadidiri", "Bomba", "Luwuk"];

export default function AccommodationDetails() {
    const { t } = useTranslation();
    const params = useParams();
    const router = useRouter(); // For programmatic navigation if needed

    // Handle potential array or string for slug, safely.
    const slugParam = params?.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

    const [guestHouse, setGuestHouse] = useState<GuestHouse | null>(null);
    const [selectedRoomId, setSelectedRoomId] = useState<string>("");

    useEffect(() => {
        if (slug) {
            const found = accommodations.find((g) => g.slug === slug.toLowerCase());
            if (found) {
                setGuestHouse(found);
                if (found.rooms.length > 0) {
                    setSelectedRoomId(found.rooms[0].id);
                }
            }
        }
    }, [slug]);

    if (!guestHouse) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const selectedRoom = guestHouse.rooms.find(r => r.id === selectedRoomId) || guestHouse.rooms[0];

    // Prepare room images. Filter out undefined/empty paths.
    // Order: main, bed, bath, balcony
    const roomImages = [
        selectedRoom.images.main,
        selectedRoom.images.bed,
        selectedRoom.images.bath,
        selectedRoom.images.balcony
    ].filter(Boolean) as string[];

    return (
        <div className="bg-white min-h-screen text-neutral-900 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-8 md:pt-10 pb-24 md:pb-32 w-full">
                {/* Back Button & Header */}
                <div className="max-w-[1280px] mx-auto px-4 md:px-8 mb-8 md:mb-12">
                    <div className="mb-8 md:mb-12">
                        <BackLink href="/accommodation" label={t("common.backToAccommodations") || "Back to Accommodations"} />
                    </div>

                    <div className="text-center max-w-4xl mx-auto mb-8">
                        <h1 className="font-canto text-5xl md:text-7xl text-neutral-900 mb-4 tracking-tight">
                            {t("accommodation.pageTitle") || "Accommodation"}
                        </h1>
                    </div>

                    {/* Tabs */}
                    <div className="hidden md:flex items-center justify-center overflow-x-auto no-scrollbar space-x-12 border-b border-neutral-100 pb-1 mb-12">
                        {TABS.map((tab) => {
                            const isActive = tab === guestHouse.island;
                            const href = tab === "All" ? "/accommodation" : `/accommodation/${tab.toLowerCase()}`;
                            return (
                                <LocaleLink
                                    key={tab}
                                    href={href}
                                    className={`font-avenir text-base uppercase tracking-widest pb-4 whitespace-nowrap transition-all duration-300 relative ${isActive ? "text-[#CB9275]" : "text-neutral-400 hover:text-neutral-600"
                                        }`}
                                >
                                    {tab}
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#CB9275] transition-transform duration-300 origin-center ${isActive ? "scale-x-100" : "scale-x-0"
                                            }`}
                                    />
                                </LocaleLink>
                            );
                        })}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Guest House Title & Description */}
                    <div className="text-center mb-12">
                        <h2 className="font-canto text-4xl md:text-5xl text-neutral-900 mb-4">
                            {guestHouse.guestHouseName}
                        </h2>
                        <p className="font-avenir text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                            {guestHouse.shortDescription}
                        </p>
                    </div>

                    {/* Room Dropdown */}
                    <div className="max-w-xs mx-auto mb-16">
                        <label className="block text-xs font-avenir uppercase tracking-widest text-neutral-500 mb-2 text-center">
                            Select Room Type
                        </label>
                        <div className="relative">
                            <select
                                value={selectedRoomId}
                                onChange={(e) => setSelectedRoomId(e.target.value)}
                                className="w-full appearance-none bg-white border-b border-neutral-300 py-3 pl-4 pr-10 font-canto text-xl text-neutral-900 focus:outline-none focus:border-[#CB9275] transition-colors cursor-pointer text-center"
                            >
                                {guestHouse.rooms.map((room) => (
                                    <option key={room.id} value={room.id} className="font-sans text-base">
                                        {room.name}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Room Gallery */}
                    <div className="mb-24">
                        <h3 className="font-canto text-3xl mb-8 text-neutral-800">Room Gallery</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 auto-rows-min">
                            {roomImages.map((src, index) => {
                                const isMain = index === 0;
                                const isSecond = index === 1; // Usually the 'bed' image
                                const isPortrait = selectedRoom.orientation === "portrait";

                                // Dynamic classes based on orientation
                                let containerClasses = "relative w-full bg-neutral-100 overflow-hidden rounded-sm";

                                if (isMain) {
                                    if (isPortrait) {
                                        // Portrait Main: 1 column wide, portrait aspect ratio (3:4), span 2 rows to allow nice flow
                                        containerClasses += " aspect-[3/4] md:col-span-1 md:row-span-2";
                                    } else {
                                        // Landscape Main: 2 columns wide, landscape aspect ratio (2:1)
                                        containerClasses += " aspect-[4/3] md:col-span-2 md:aspect-[2/1]";
                                    }
                                } else if (isSecond && isPortrait) {
                                    // Portrait Second Image (Bed): Also make it tall to match Main if possible
                                    containerClasses += " aspect-[3/4] md:col-span-1 md:row-span-2";
                                } else {
                                    // Other images: standard square-ish.
                                    containerClasses += " aspect-[4/3]";
                                }

                                return (
                                    <div key={index} className={containerClasses}>
                                        <Image
                                            src={src}
                                            alt={`${selectedRoom.name} image ${index + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                                            sizes={(isMain || (isSecond && isPortrait)) && isPortrait ? "(max-width: 768px) 100vw, 50vw" : (isMain ? "90vw" : "(max-width: 768px) 100vw, 50vw")}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Section 2: Other Photos Gallery */}
                    <div>
                        <h3 className="font-canto text-3xl mb-8 text-neutral-800">Other Photos</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {guestHouse.otherImages.map((src, index) => (
                                <div key={index} className="relative w-full aspect-square bg-neutral-100 overflow-hidden rounded-sm">
                                    <Image
                                        src={src}
                                        alt={`${guestHouse.guestHouseName} other image ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
            <FooterSection />
        </div>
    );
}
