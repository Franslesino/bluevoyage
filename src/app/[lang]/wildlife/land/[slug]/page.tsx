import Image from "next/image";
import LocaleLink from "@/components/LocaleLink";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { wildlifeLandDetails } from "@/data/wildlifeLandDetails";
import BackLink from "@/components/BackLink";
import { getDictionary, Locale } from "@/lib/i18n";

export async function generateStaticParams() {
    const locales = ['en', 'fr', 'es', 'ru', 'id', 'ja', 'ko', 'zh', 'ar', 'de', 'it', 'pt', 'tr'];
    return locales.flatMap((lang) =>
        wildlifeLandDetails.map((species) => ({
            lang,
            slug: species.slug,
        }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const species = wildlifeLandDetails.find((s) => s.slug === slug);
    if (!species) {
        return {
            title: "Wildlife Not Found | Togean Voyage",
        };
    }
    return {
        title: `${species.nameEn} (${species.nameId}) | Land Wildlife`,
        description: species.expandedContent.intro.substring(0, 160),
    };
}

export default async function LandWildlifeDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const species = wildlifeLandDetails.find((s) => s.slug === slug);
    const t = getDictionary(lang as Locale);

    if (!species) {
        notFound();
    }

    // Get translated content if available, fallback to default
    const translatedContent = (t as any).wildlifeLandContent?.[slug];
    const intro = translatedContent?.intro || species.expandedContent.intro;
    const keyFacts = translatedContent?.keyFacts || species.expandedContent.keyFacts;
    const whereToSee = translatedContent?.whereToSee || species.expandedContent.whereToSee;
    const howToSpot = translatedContent?.howToSpot || species.expandedContent.howToSpot;
    const responsibleGuidelines = translatedContent?.responsibleGuidelines || species.expandedContent.responsibleGuidelines;
    const conservationNotes = translatedContent?.conservationNotes || species.expandedContent.conservationNotes;

    return (
        <div className="bg-white min-h-screen text-neutral-900 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-[calc(env(safe-area-inset-top)+24px)] md:pt-10 pb-24 w-full">
                {/* HERO SECTION */}
                <section className="px-6 md:px-12 max-w-[1280px] mx-auto mb-16 md:mb-24">
                    <BackLink href="/wildlife/land" label={t.wildlifeDetail?.backToLandWildlife || "Back to Land Wildlife"} />
                    {/* Title Block */}
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <h1 className="font-canto text-5xl md:text-7xl text-neutral-900 mb-4 tracking-tight">
                            {(t as any).wildlifeNames?.land?.[slug]?.name || species.nameEn} <span className="text-neutral-400 font-light">({(t as any).wildlifeNames?.land?.[slug]?.localName || species.nameId})</span>
                        </h1>
                        <p className="font-avenir text-xl md:text-2xl text-neutral-500 italic font-light">
                            {species.scientificName}
                        </p>
                    </div>

                    {/* Hero Image */}
                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden mb-12 bg-neutral-100">
                        <Image
                            src={species.images.hero}
                            alt={`${species.nameEn} habitat`}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                    </div>

                    {/* Intro Text */}
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="font-avenir text-lg md:text-xl text-neutral-800 leading-relaxed">
                            {intro}
                        </p>
                    </div>
                </section>

                {/* AT A GLANCE (KEY FACTS) */}
                <section className="bg-neutral-50 py-16 mb-24">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            {keyFacts.map((fact: { label: string; value: string }, idx: number) => (
                                <div key={idx} className="flex flex-col">
                                    <span className="font-canto text-xl text-neutral-400 mb-2">{fact.label}</span>
                                    <span className="font-avenir text-lg text-neutral-900 font-medium">{fact.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONTENT BODY */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center gap-24 mb-24">

                    {/* Where to See & How to Spot */}
                    <div className="grid md:grid-cols-2 gap-16 w-full">
                        <div>
                            <h2 className="font-canto text-3xl md:text-4xl text-neutral-900 mb-6">
                                {t.wildlifeDetail?.whereYouMightSeeIt || "Where you might see it"}
                            </h2>
                            <p className="font-avenir text-lg text-neutral-600 leading-relaxed">
                                {whereToSee}
                            </p>
                        </div>
                        <div>
                            <h2 className="font-canto text-3xl md:text-4xl text-neutral-900 mb-6">
                                {t.wildlifeDetail?.howToSpotIt || "How to spot it"}
                            </h2>
                            <p className="font-avenir text-lg text-neutral-600 leading-relaxed">
                                {howToSpot}
                            </p>
                        </div>
                    </div>

                    {/* Responsible Guidelines */}
                    <div className="w-full bg-neutral-900 text-white p-8 md:p-16 rounded-sm">
                        <h2 className="font-canto text-3xl md:text-4xl text-white mb-8 text-center">
                            {t.wildlifeDetail?.responsibleGuidelines || "Responsible Encounter Guidelines"}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <ul className="space-y-4">
                                {responsibleGuidelines.slice(0, Math.ceil(responsibleGuidelines.length / 2)).map((guide: string, idx: number) => (
                                    <li key={idx} className="font-avenir text-lg text-neutral-300 flex gap-3">
                                        <span className="text-emerald-400">•</span>
                                        {guide}
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-4">
                                {responsibleGuidelines.slice(Math.ceil(responsibleGuidelines.length / 2)).map((guide: string, idx: number) => (
                                    <li key={idx} className="font-avenir text-lg text-neutral-300 flex gap-3">
                                        <span className="text-emerald-400">•</span>
                                        {guide}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="w-full">
                        <h2 className="font-canto text-3xl md:text-4xl text-neutral-900 mb-8 text-center">
                            {t.wildlifeDetail?.gallery || "Gallery"}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {species.images.gallery.map((img, idx) => (
                                <div key={idx} className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100">
                                    <Image
                                        src={img}
                                        alt={`${species.nameEn} gallery ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 90vw, 50vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conservation Note */}
                    <div className="max-w-2xl text-center">
                        <h3 className="font-canto text-2xl text-neutral-900 mb-4">{t.wildlifeDetail?.conservationStatus || "Conservation Status"}</h3>
                        <p className="font-avenir text-lg text-neutral-600 leading-relaxed">
                            {conservationNotes}
                        </p>
                    </div>

                </section>

                {/* DISCLAIMER / CTA */}
                <div className="border-t border-neutral-200 mt-12 py-12 px-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-xl mx-auto">
                        <LocaleLink
                            href="/wildlife/land"
                            className="w-full md:w-auto text-center px-8 py-3 border border-[#088F8F] text-[#088F8F] font-avenir tracking-wider uppercase text-sm hover:bg-[#088F8F]/10 transition-colors rounded-sm"
                        >
                            {t.wildlifeDetail?.backToLandWildlife || "Back to Land Wildlife"}
                        </LocaleLink>
                        <LocaleLink
                            href="/wildlife"
                            className="w-full md:w-auto text-center px-8 py-3 bg-[#088F8F] text-white font-avenir tracking-wider uppercase text-sm hover:bg-[#066e6e] transition-colors rounded-sm"
                        >
                            {t.wildlifeDetail?.backToWildlifeGallery || "Back to Wildlife Gallery"}
                        </LocaleLink>
                    </div>
                </div>
            </main>

            <FooterSection />
        </div>
    );
}
