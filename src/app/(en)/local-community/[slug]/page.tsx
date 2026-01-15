import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { localCommunityExperiences } from "@/data/localCommunityExperiences";
import BackLink from "@/components/BackLink";

export function generateStaticParams() {
    return localCommunityExperiences.map((exp) => ({
        slug: exp.slug,
    }));
}

export default async function LocalCommunityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const experience = localCommunityExperiences.find((exp) => exp.slug === slug);

    if (!experience) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white text-[#1A1A1A]">
                {/* Hero Section */}
                <section className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden">
                    <div className="absolute z-50 top-24 left-4 md:left-8">
                        <BackLink href="/local-community" label="Back to Local Community" variant="light" />
                    </div>
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={experience.image}
                            alt={experience.title}
                            fill
                            className="object-cover"
                            priority
                            quality={90}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    </div>

                    <div className="relative z-10 w-full max-w-5xl mx-auto px-5 md:px-10 pb-12 md:pb-16 text-white">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="font-avenir text-xs uppercase tracking-[0.2em] opacity-80">
                                {experience.location}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/50" />
                            <span className="font-avenir text-xs uppercase tracking-[0.15em] opacity-80">
                                {experience.duration}
                            </span>
                        </div>

                        <h1 className="font-canto text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                            {experience.title}
                        </h1>

                        <p className="font-avenir text-sm md:text-base uppercase tracking-wider opacity-70">
                            Best for: {experience.bestFor}
                        </p>
                    </div>
                </section>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-5 md:px-10 py-16 md:py-24 space-y-16 md:space-y-20">

                    {/* Intro */}
                    <section>
                        <p className="font-avenir text-lg md:text-xl leading-relaxed text-neutral-700">
                            {experience.shortDescription}
                        </p>
                    </section>

                    {/* What You'll Do */}
                    <section>
                        <h2 className="font-canto text-3xl md:text-4xl text-[#1a1a1a] mb-8">
                            What you will do
                        </h2>
                        <ul className="space-y-4">
                            {experience.whatYoullDo.map((item, idx) => (
                                <li key={idx} className="font-avenir text-base md:text-lg text-neutral-600 flex items-start gap-4">
                                    <span className="font-avenir text-xs font-bold text-neutral-400 tracking-widest mt-1.5 shrink-0">
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Good to Know */}
                    <section className="bg-neutral-50 p-8 md:p-12 rounded-sm">
                        <h2 className="font-canto text-2xl md:text-3xl text-[#1a1a1a] mb-6">
                            Good to know
                        </h2>
                        <ul className="space-y-3">
                            {experience.goodToKnow.map((item, idx) => (
                                <li key={idx} className="font-avenir text-sm md:text-base text-neutral-600 flex items-start gap-3">
                                    <span className="text-neutral-400 mt-0.5">&#8226;</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                </div>

                {/* CTA Section */}
                <section className="bg-[#111827] text-white py-16 md:py-20 px-5 text-center">
                    <div className="max-w-2xl mx-auto space-y-8">
                        <h2 className="font-canto text-3xl md:text-4xl">
                            Ready to experience this?
                        </h2>
                        <p className="font-avenir text-neutral-300 text-base md:text-lg">
                            Get in touch and we will help you plan your visit.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
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
                                href="/local-community"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-white/20 text-white rounded-full font-avenir font-medium tracking-wide hover:bg-white/10 transition-colors"
                            >
                                Back to Local Community
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <FooterSection />
        </>
    );
}
