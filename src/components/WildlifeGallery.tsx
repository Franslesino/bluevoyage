"use client";

import React, { useState } from "react";
import Image from "next/image";
import LocaleLink from "./LocaleLink";
import { motion, AnimatePresence } from "framer-motion";
import { WildlifeSpecies } from "@/data/wildlifeSpecies";
import { useTranslation } from "./I18nProvider";

interface WildlifeGalleryProps {
    species: WildlifeSpecies[];
}

type Habitat = "sea" | "land";

export default function WildlifeGallery({ species }: WildlifeGalleryProps) {
    const { t } = useTranslation();
    const [activeHabitat, setActiveHabitat] = useState<Habitat>("sea");

    const filteredSpecies = species.filter((s) => s.habitat === activeHabitat);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    // Handle hash change on mount/update to switch tabs
    React.useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === "#land") {
                setActiveHabitat("land");
            } else if (hash === "#sea") {
                setActiveHabitat("sea");
            }
        };

        // Check on mount
        handleHashChange();

        // Check on hash change (if user clicks back/forward)
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    return (
        <section className="w-full max-w-[1280px] mx-auto px-6 pb-32">
            {/* Gallery Header */}
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <h2 className="font-canto text-4xl md:text-5xl text-neutral-900 mb-6">
                    {t("wildlifeGallery.title")}
                </h2>
                <p className="font-avenir text-lg text-neutral-600 leading-relaxed mb-8">
                    {t("wildlifeGallery.description")}
                </p>

                {/* Toggle */}
                <div className="inline-flex items-center gap-1 p-1 bg-neutral-100 rounded-full">
                    <button
                        onClick={() => setActiveHabitat("sea")}
                        className={`
                            px-6 py-2 rounded-full font-avenir text-base transition-all duration-300
                            ${activeHabitat === "sea"
                                ? "bg-white text-neutral-900 shadow-sm"
                                : "text-neutral-500 hover:text-neutral-700"
                            }
                        `}
                    >
                        {t("wildlife.sea")}
                    </button>
                    <button
                        onClick={() => setActiveHabitat("land")}
                        className={`
                            px-6 py-2 rounded-full font-avenir text-base transition-all duration-300
                            ${activeHabitat === "land"
                                ? "bg-white text-neutral-900 shadow-sm"
                                : "text-neutral-500 hover:text-neutral-700"
                            }
                        `}
                    >
                        {t("wildlife.land")}
                    </button>
                </div>
            </div>

            {/* Gallery Grid */}
            <motion.div
                id={activeHabitat} // Dynamic ID for hash linking
                key={activeHabitat} // Trigger re-render of container animation on toggle
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
            >
                {filteredSpecies.map((species) => {
                    const speciesName = t(`wildlifeGallery.species.${species.slug}.name`) || species.name;
                    const speciesLocalName = t(`wildlifeGallery.species.${species.slug}.localName`) || species.localName;
                    
                    return (
                        <motion.div
                            key={species.id}
                            variants={cardVariants}
                            className="group flex flex-col h-full"
                        >
                            {/* Image Card */}
                            <div className="aspect-[4/5] relative overflow-hidden rounded-sm bg-neutral-100 mb-6">
                                <Image
                                    src={species.image}
                                    alt={speciesName}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>

                            {/* Text Info */}
                            <div className="flex flex-col flex-grow text-center sm:text-left">
                                <h3 className="font-canto text-2xl text-neutral-900 mb-1">
                                    {speciesName}
                                </h3>
                                <p className="font-avenir text-sm text-neutral-500 italic mb-4">
                                    {speciesLocalName}
                                </p>

                                {/* Details Button */}
                                <div className="mt-auto pt-2">
                                    <LocaleLink
                                        href={`/wildlife/${species.habitat}/${species.slug}`}
                                        className="font-avenir text-sm font-medium text-neutral-900 hover:text-neutral-600 hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1"
                                    >
                                        {t("wildlifeGallery.details")} &gt;
                                    </LocaleLink>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
