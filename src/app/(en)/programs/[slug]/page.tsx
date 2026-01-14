import Image from "next/image";
import { notFound } from "next/navigation";
import { programs } from "@/data/programs";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BackLink from "@/components/BackLink";
import FooterSection from "@/components/FooterSection";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return programs.map((program) => ({
        slug: program.slug,
    }));
}

export default async function ProgramDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const program = programs.find((p) => p.slug === slug);

    if (!program) {
        notFound();
    }

    const backHref = "/programs";
    const backLabel = "BACK TO PROGRAMS";

    return (
        <div className="bg-white min-h-screen text-neutral-900">
            <Navbar />
            <main className="pb-24">
                {/* Hero Section */}
                <div className="relative h-[60vh] md:h-[70vh] w-full">
                    <div className="absolute z-50 top-24 left-4 md:left-8">
                        <BackLink href={backHref} label={backLabel} variant="light" />
                    </div>
                    <Image
                        src={program.image}
                        alt={program.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center text-center px-4 pt-20">
                        <div className="max-w-4xl">
                            <span className="block font-avenir text-white text-sm md:text-base uppercase tracking-[0.2em] mb-4 md:mb-6">
                                Signature Program
                            </span>
                            <h1 className="font-canto text-5xl md:text-6xl lg:text-8xl text-white mb-6 drop-shadow-lg">
                                {program.name}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 -mt-20 relative z-10">
                    <div className="bg-white p-8 md:p-16 shadow-sm">
                        {/* Top Description */}
                        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
                            <p className="font-avenir text-lg md:text-xl md:leading-relaxed text-neutral-700">
                                {program.description}
                            </p>
                        </div>

                        {/* Placeholder Content Blocks */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-4xl mx-auto">
                            <div className="space-y-4">
                                <h3 className="font-canto text-2xl md:text-3xl text-[#6b4c3b]">Overview</h3>
                                <p className="font-avenir text-neutral-600 leading-relaxed">
                                    {program.overview}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-canto text-2xl md:text-3xl text-[#6b4c3b]">What you'll do</h3>
                                <p className="font-avenir text-neutral-600 leading-relaxed">
                                    {program.whatYoullDo}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-canto text-2xl md:text-3xl text-[#6b4c3b]">Best time</h3>
                                <p className="font-avenir text-neutral-600 leading-relaxed">
                                    {program.bestTime}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-canto text-2xl md:text-3xl text-[#6b4c3b]">Notes</h3>
                                <p className="font-avenir text-neutral-600 leading-relaxed">
                                    {program.notes}
                                </p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-20 flex flex-col items-center gap-6">
                            <Link
                                href="/book"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#6b4c3b] text-white rounded-full text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#5a3f31] font-avenir shadow-sm hover:shadow-md"
                            >
                                <span>Book Now</span>
                                <svg
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </Link>

                            <Link href="/programs" className="inline-block font-avenir text-sm uppercase tracking-widest text-neutral-500 hover:text-[#6b4c3b] transition-colors border-b border-transparent hover:border-[#6b4c3b] pb-1">
                                See all programs
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <FooterSection />
        </div>
    );
}
