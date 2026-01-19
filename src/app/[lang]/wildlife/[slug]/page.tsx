import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { wildlifeSpecies } from "@/data/wildlifeSpecies";
import { getDictionary, Locale } from "@/lib/i18n";

export async function generateStaticParams() {
    const locales = ['en', 'fr', 'es', 'ru', 'id', 'ja', 'ko', 'zh', 'ar', 'de', 'it', 'pt', 'tr'];
    return locales.flatMap((lang) =>
        wildlifeSpecies.map((species) => ({
            lang,
            slug: species.slug,
        }))
    );
}

export default async function WildlifeDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const species = wildlifeSpecies.find((s) => s.slug === slug);
    const t = getDictionary(lang as Locale);

    if (!species) {
        notFound();
    }

    // Get translated coming soon text and replace placeholder
    const comingSoonText = (t.wildlifeDetail?.comingSoonText || "More details regarding the {{name}} and where to find them in Togean will be coming soon.")
        .replace("{{name}}", species.name);

    return (
        <div className="bg-white min-h-screen text-neutral-900 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-24 px-6 md:px-12 w-full max-w-[1280px] mx-auto flex flex-col items-center justify-center text-center">
                <div className="relative w-full max-w-2xl aspect-video rounded-sm overflow-hidden mb-12 bg-neutral-100 shadow-sm">
                    <Image
                        src={species.image}
                        alt={species.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                        priority
                    />
                </div>

                <h1 className="font-canto text-5xl md:text-6xl text-neutral-900 mb-4">
                    {species.name}
                </h1>

                <p className="font-avenir text-xl text-neutral-500 italic mb-12">
                    {species.localName}
                </p>

                <div className="max-w-prose mx-auto">
                    <p className="font-avenir text-lg text-neutral-600 leading-relaxed border-t border-neutral-200 pt-8">
                        {comingSoonText}
                    </p>
                </div>
            </main>

            <FooterSection />
        </div>
    );
}
