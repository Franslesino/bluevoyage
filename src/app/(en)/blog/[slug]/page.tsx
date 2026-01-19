import Image from "next/image";
import LocaleLink from "@/components/LocaleLink";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BackLink from "@/components/BackLink";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Simple parser to handle content and placeholders
    const renderContent = (content: string) => {
        const parts = content.split(/(\[\[IMAGE_.*?\]\])/);

        return parts.map((part, index) => {
            if (part === "[[IMAGE_VILLAGE]]") {
                return (
                    <figure key={index} className="my-10">
                        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm">
                            <Image
                                src="/blog/village-visit-etiquette/village.png"
                                alt="Respectful village visit"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <figcaption className="mt-3 font-avenir text-sm text-neutral-500 text-center italic">
                            Connecting with locals on the village jetty
                        </figcaption>
                    </figure>
                );
            }


            if (part === "[[IMAGE_OCEAN]]") {
                return (
                    <figure key={index} className="my-10">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm">
                            <Image
                                src="/blog/village-visit-etiquette/ocean.png"
                                alt="Togean ocean scene"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <figcaption className="mt-3 font-avenir text-sm text-neutral-500 text-center italic">
                            Protecting the pristine environment for future generations
                        </figcaption>
                    </figure>
                );
            }
            if (part === "[[IMAGE_REEF]]") {
                return (
                    <figure key={index} className="my-10">
                        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm">
                            <Image
                                src="/blog/best-snorkeling-spots-togean-luwuk/reef.png"
                                alt="Vibrant coral reef"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <figcaption className="mt-3 font-avenir text-sm text-neutral-500 text-center italic">
                            Exploring the colorful underwater gardens
                        </figcaption>
                    </figure>
                );
            }
            if (part === "[[IMAGE_TURTLES]]") {
                return (
                    <figure key={index} className="my-10">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm">
                            <Image
                                src="/blog/best-snorkeling-spots-togean-luwuk/turtles.png"
                                alt="Sea turtle swimming"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <figcaption className="mt-3 font-avenir text-sm text-neutral-500 text-center italic">
                            A peaceful encounter with a sea turtle
                        </figcaption>
                    </figure>
                );
            }

            // Text processing
            // We'll split by newlines to handle paragraphs and headings
            const lines = part.split("\n");
            return (
                <div key={index}>
                    {lines.map((line, lineIndex) => {
                        const trimLine = line.trim();
                        if (!trimLine) return <div key={lineIndex} className="h-4" />; // Spacer

                        if (trimLine.startsWith("### ")) {
                            // Heading 3
                            return (
                                <h3 key={lineIndex} className="font-canto text-2xl md:text-3xl text-neutral-900 mt-10 mb-6">
                                    {trimLine.replace("### ", "")}
                                </h3>
                            );
                        }

                        if (trimLine.startsWith("- ")) {
                            // List item
                            return (
                                <ul key={lineIndex} className="list-disc pl-5 mb-4 font-avenir text-lg text-neutral-700 leading-relaxed">
                                    <li className="pl-2">{trimLine.replace("- ", "")}</li>
                                </ul>
                            );
                        }

                        // Paragraph split by colon for "Bold: Text" pattern? 
                        // The user text has "The Vibe: ..."
                        if (trimLine.includes(": ")) {
                            const [boldPart, ...rest] = trimLine.split(": ");
                            if (["The Vibe", "The Fix", "The Rule", "Pro Tip", "Don't", "Do", "Buy Local Products", "Be a Zero-Waste Warrior", "Hire Local Guides"].includes(boldPart)) {
                                return (
                                    <p key={lineIndex} className="font-avenir text-lg text-neutral-700 mb-6 leading-relaxed">
                                        <strong className="font-medium text-neutral-900">{boldPart}:</strong> {rest.join(": ")}
                                    </p>
                                );
                            }
                        }

                        // Regular paragraph
                        return (
                            <p key={lineIndex} className="font-avenir text-lg text-neutral-700 mb-6 leading-relaxed">
                                {trimLine}
                            </p>
                        );
                    })}
                </div>
            );
        });
    };

    return (
        <div className="bg-white min-h-screen text-neutral-900">
            <Navbar />
            <main className="pt-[calc(env(safe-area-inset-top)+24px)] md:pt-10 pb-24 px-4 md:px-8">
                <article className="max-w-[900px] mx-auto">
                    <div className="pt-6 md:pt-8 mb-8">
                        <BackLink href="/blog" label="Back to Blog" />
                    </div>
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <div className="font-avenir text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6 flex justify-center gap-4">
                            <span>{post.locationLabel}</span>
                            <span>|</span>
                            <span>{post.date}</span>
                            <span>|</span>
                            <span>{post.category}</span>
                        </div>
                        <h1 className="font-canto text-4xl md:text-5xl lg:text-6xl text-neutral-900 leading-tight mb-8">
                            {post.title}
                        </h1>
                        <p className="font-avenir text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                            {post.excerpt}
                        </p>
                    </header>

                    {/* Hero Image */}
                    <div className="relative aspect-[16/9] w-full mb-16 rounded-sm overflow-hidden">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        {renderContent(post.content)}
                    </div>

                    {/* Bottom Nav */}
                    <div className="mt-20 pt-10 border-t border-neutral-200 flex justify-between items-center">
                        <LocaleLink
                            href="/"
                            className="font-avenir text-sm uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                            ← Back to Home
                        </LocaleLink>
                    </div>
                </article>
            </main>
            <FooterSection />
        </div>
    );
}
