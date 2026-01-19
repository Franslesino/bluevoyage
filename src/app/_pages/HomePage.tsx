"use client";

/**
 * HomePage - Shared homepage component used by both (en) and [locale] routes
 * 
 * This component contains all the homepage sections and receives locale
 * from the I18nProvider context.
 */

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SpotlightCarousel from "@/components/SpotlightCarousel";
import ProgramCarousel from "@/components/ProgramCarousel";
import WildlifeCarousel from "@/components/WildlifeCarousel";
import KapalSafetyExperience from "@/components/KapalSafetyExperience";
import AccommodationSection from "@/components/AccommodationSection";
import LocalCommunity from "@/components/LocalCommunity";
import BlogSection from "@/components/BlogSection";
import FooterSection from "@/components/FooterSection";
import MobileTripCtaBar from "@/components/MobileTripCtaBar";
import HomepageCta from "@/components/HomepageCta";
import { useHashScroll } from "@/hooks/useHashScroll";

export default function HomePage() {
    useHashScroll();
    return (
        <>
            <Navbar />
            <main>
                <Hero />

                {/* Destination Section */}
                <div id="destinations" className="scroll-mt-24 md:scroll-mt-28">
                    <SpotlightCarousel />
                </div>

                {/* Program Section */}
                <div id="programs" className="scroll-mt-24 md:scroll-mt-28">
                    <ProgramCarousel />
                </div>

                {/* Safety & Experience Ship Section */}
                <div id="boat" className="scroll-mt-24 md:scroll-mt-28">
                    <KapalSafetyExperience />
                </div>

                {/* Accommodation Section */}
                <AccommodationSection />

                {/* Wildlife Section */}
                <div id="wildlife" className="scroll-mt-24 md:scroll-mt-28">
                    <WildlifeCarousel />
                </div>

                {/* Local Community Section */}
                <div id="local-community" className="scroll-mt-24 md:scroll-mt-28">
                    <LocalCommunity />
                </div>

                {/* Blog Section */}
                <div id="blog" className="scroll-mt-24 md:scroll-mt-28">
                    <BlogSection />
                </div>

                {/* Homepage CTA */}
                <HomepageCta />

                {/* Footer Section */}
                <FooterSection />

                <MobileTripCtaBar targetId="wildlife" />
            </main>
        </>
    );
}
