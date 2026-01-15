import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { wildlifeLandDetails } from "@/data/wildlifeLandDetails";
import BackLink from "@/components/BackLink";

export default function LandWildlifeListingPage() {
    return (
        <div className="bg-white min-h-screen text-neutral-900 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-[calc(env(safe-area-inset-top)+24px)] md:pt-10 pb-24 px-6 md:px-12 w-full max-w-[1280px] mx-auto">
                {/* Back Link */}
                <div className="mb-8">
                    <BackLink href="/wildlife#land" label="BACK TO WILDLIFE" />
                </div>

                {/* Header */}
                <div className="mb-16 border-b border-neutral-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-canto text-5xl md:text-6xl text-neutral-900 mb-2">
                            Land Wildlife
                        </h1>
                        <p className="font-avenir text-lg text-neutral-500">
                            Discover the unique species of the rainforests
                        </p>
                    </div>
                    <div className="font-avenir text-xl text-neutral-400">
                        {wildlifeLandDetails.length} Species
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {wildlifeLandDetails.map((species) => (
                        <Link
                            key={species.slug}
                            href={`/wildlife/land/${species.slug}`}
                            className="group flex flex-col block"
                        >
                            {/* Image Card */}
                            <div className="aspect-[4/5] relative overflow-hidden rounded-sm bg-neutral-100 mb-6">
                                <Image
                                    src={species.images.hero}
                                    alt={species.nameEn}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>

                            {/* Text Info */}
                            <div className="flex flex-col flex-grow">
                                <h3 className="font-canto text-2xl text-neutral-900 mb-1 group-hover:underline underline-offset-4 decoration-neutral-300">
                                    {species.nameEn}
                                </h3>
                                <p className="font-avenir text-sm text-neutral-500 italic mb-2">
                                    {species.scientificName}
                                </p>

                                <span className="font-avenir text-sm font-medium text-neutral-900 mt-auto inline-flex items-center gap-1 opacity-100 transition-opacity">
                                    Details &gt;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <FooterSection />
        </div>
    );
}
