import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { destinationDetails } from "@/data/destinationDetails";
import BackLink from "@/components/BackLink";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

export function generateStaticParams() {
    return Object.keys(destinationDetails).map((slug) => ({
        slug,
    }));
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const destination = destinationDetails[slug];

    if (!destination) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#F8F5F2] text-[#1A1A1A]">
                {/* Hero Section */}
                <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
                    <div className="absolute z-50 top-24 left-4 md:left-8">
                        <BackLink href="/destinations" label="Back to Destinations" variant="light" />
                    </div>
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={destination.images.hero}
                            alt={destination.name}
                            fill
                            className="object-cover"
                            priority
                            quality={90}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    <div className="relative z-10 text-center text-white px-5 max-w-4xl mx-auto mt-20">
                        <h1 className="font-canto text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-wide">
                            {destination.name}
                        </h1>
                        <p className="font-avenir text-lg md:text-2xl font-light tracking-wider mb-8 italic opacity-90">
                            {destination.tagline}
                        </p>
                        <div className="max-w-2xl mx-auto">
                            <p className="font-avenir text-base md:text-lg leading-relaxed opacity-90 drop-shadow-md">
                                {destination.intro}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Container */}
                <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24 space-y-24 md:space-y-32">

                    {/* Quick Highlights */}
                    <section className="max-w-4xl mx-auto text-center">
                        <h2 className="font-canto text-3xl md:text-4xl mb-10 text-[#2C3E50]">Why it matters</h2>
                        <ul className="grid gap-4 md:gap-6">
                            {destination.whyItMatters.map((item, idx) => (
                                <li key={idx} className="font-avenir text-lg md:text-xl text-gray-700 leading-relaxed">
                                    &bull; {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Experiences Grid */}
                    <section>
                        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-gray-200 pb-4">
                            <h2 className="font-canto text-3xl md:text-5xl text-[#2C3E50]">Signature Experiences</h2>
                            <div className="font-avenir text-sm uppercase tracking-widest text-gray-500 mt-2 md:mt-0">
                                Curated for {destination.name}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                            {destination.experiences.map((exp, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="font-avenir text-xs font-bold text-gray-400 tracking-widest">0{idx + 1}</span>
                                        <div className="h-[1px] flex-1 bg-gray-200 group-hover:bg-gray-400 transition-colors" />
                                    </div>
                                    <h3 className="font-canto text-2xl md:text-3xl mb-3 text-[#2C3E50]">{exp.title}</h3>
                                    <p className="font-avenir text-gray-600 leading-relaxed text-sm md:text-base">
                                        {exp.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 bg-white p-8 md:p-10 rounded-sm border border-gray-100 shadow-sm">
                            <h4 className="font-canto text-xl md:text-2xl mb-2 text-gray-800">The Signature Moment</h4>
                            <p className="font-avenir text-lg italic text-gray-600">
                                "{destination.signatureMoment}"
                            </p>
                        </div>
                    </section>

                    {/* Gallery Strip */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-3">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                                <Image
                                    src={destination.images.secondary}
                                    alt="Experience detail"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <p className="font-avenir text-xs uppercase tracking-widest text-gray-500 text-center">
                                Texture & Detail
                            </p>
                        </div>
                        <div className="space-y-3 md:pt-16">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                                <Image
                                    src={destination.images.mood}
                                    alt="Atmosphere"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <p className="font-avenir text-xs uppercase tracking-widest text-gray-500 text-center">
                                Atmosphere & Mood
                            </p>
                        </div>
                    </section>

                    {/* Route Fit & Practical Notes */}
                    <section className="grid grid-cols-1 md:grid-cols-12 gap-12 bg-white p-8 md:p-12 border border-blue-50/50 shadow-sm">
                        {/* Route Fit */}
                        <div className="md:col-span-7 space-y-8">
                            <h2 className="font-canto text-3xl md:text-4xl text-[#2C3E50]">Route Planning</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <span className="font-avenir text-xs uppercase text-gray-400 tracking-wider block mb-1">Ideal Timing</span>
                                    <p className="font-avenir text-lg text-gray-800">{destination.routeFit.idealTiming}</p>
                                </div>
                                <div>
                                    <span className="font-avenir text-xs uppercase text-gray-400 tracking-wider block mb-1">Suggested Duration</span>
                                    <p className="font-avenir text-lg text-gray-800">{destination.routeFit.suggestedDuration}</p>
                                </div>
                            </div>

                            <div>
                                <span className="font-avenir text-xs uppercase text-gray-400 tracking-wider block mb-2">Pairs well with</span>
                                <div className="flex flex-wrap gap-2">
                                    {destination.routeFit.pairsWellWith.map((pair, idx) => (
                                        <span key={idx} className="font-avenir px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm border border-gray-100">
                                            {pair}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="font-avenir text-xs uppercase text-gray-400 tracking-wider block mb-2">Notes</span>
                                <ul className="space-y-1">
                                    {destination.routeFit.notes.map((note, idx) => (
                                        <li key={idx} className="font-avenir text-gray-600 text-sm">
                                            &mdash; {note}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Practical Notes */}
                        <div className="md:col-span-5 space-y-6 md:border-l md:border-gray-100 md:pl-12">
                            <h3 className="font-canto text-2xl text-[#2C3E50]">Practicalities</h3>
                            <ul className="space-y-3">
                                {destination.practicalNotes.map((note, idx) => (
                                    <li key={idx} className="font-avenir text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-gray-300 mt-0.5">&bull;</span>
                                        <span>{note}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                </div>

                {/* Footer CTA */}
                <section className="bg-[#111827] text-white py-20 px-5 text-center">
                    <div className="max-w-2xl mx-auto space-y-8">
                        <h2 className="font-canto text-4xl md:text-5xl">Make it part of your route</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/book"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 rounded-full font-avenir font-medium tracking-wide hover:bg-gray-100 transition-colors"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-80"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Book Now
                            </Link>
                            <Link
                                href="/destinations"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-white/20 text-white rounded-full font-avenir font-medium tracking-wide hover:bg-white/10 transition-colors"
                            >
                                See all destinations
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <FooterSection />
        </>
    );
}
