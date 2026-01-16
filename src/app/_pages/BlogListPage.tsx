"use client";

import Image from "next/image";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BackLink from "@/components/BackLink";
import LocaleLink from "@/components/LocaleLink";
import { useTranslation } from "@/components/I18nProvider";

// Blog post keys for translation (should match slugs)
const blogPostKeys = [
    "responsible-wildlife-encounters",
    "best-snorkeling-spots",
    "village-visit-etiquette"
];

export default function BlogListPage() {
    const { t } = useTranslation();
    
    // Helper to truncate text
    const truncateExcerpt = (text: string, maxWords: number = 23): string => {
        const words = text.trim().split(/\s+/);
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(" ") + " .........";
        }
        return text;
    };

    return (
        <div className="bg-white min-h-screen text-neutral-900 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-[calc(env(safe-area-inset-top)+24px)] md:pt-10 pb-24 px-6 md:px-12 w-full max-w-[1280px] mx-auto relative">
                <div className="pt-6 md:pt-8 mb-8">
                    <BackLink href="/#blog" label={t("blog.backToHome")} />
                </div>
                {/* Header */}
                <div className="mb-16 border-b border-neutral-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-canto text-5xl md:text-6xl text-neutral-900 mb-2">
                            {t("blog.pageTitle")}
                        </h1>
                        <p className="font-avenir text-lg text-neutral-500">
                            {t("blog.storiesCount", { count: blogPosts.length })}
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {blogPostKeys.map((postKey) => {
                        const post = blogPosts.find(p => p.slug === postKey);
                        if (!post) return null;
                        
                        return (
                            <div key={postKey} className="group flex flex-col h-full">
                                {/* Image Card */}
                                <LocaleLink href={`/blog/${post.slug}`} className="block relative aspect-[3/2] overflow-hidden rounded-sm bg-neutral-100 mb-6">
                                    <Image
                                        src={post.image}
                                        alt={t(`blogPosts.${postKey}.title`)}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </LocaleLink>

                                {/* Content */}
                                <div className="flex flex-col flex-grow">
                                    <div className="font-avenir text-xs text-neutral-400 uppercase tracking-widest mb-3">
                                        {t(`blogPosts.${postKey}.locationLabel`)} | {t(`blogPosts.${postKey}.date`)} | {t(`blogPosts.${postKey}.category`)}
                                    </div>

                                    <LocaleLink href={`/blog/${post.slug}`} className="block">
                                        <h3 className="font-canto text-2xl text-neutral-900 leading-tight mb-4 group-hover:underline underline-offset-4 decoration-neutral-300 transition-all">
                                            {t(`blogPosts.${postKey}.title`)}
                                        </h3>
                                    </LocaleLink>

                                    <p className="font-avenir text-sm text-neutral-600 leading-relaxed mb-6 flex-grow">
                                        {truncateExcerpt(t(`blogPosts.${postKey}.excerpt`))}
                                    </p>

                                    <div className="mt-auto flex justify-end">
                                        <LocaleLink
                                            href={`/blog/${post.slug}`}
                                            className="font-avenir inline-flex items-center text-xs uppercase tracking-[0.15em] border-b border-transparent hover:border-neutral-900 pb-0.5 transition-colors"
                                        >
                                            {t("blog.readMore")}
                                            <svg
                                                className="w-3 h-3 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </LocaleLink>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <FooterSection />
        </div>
    );
}
