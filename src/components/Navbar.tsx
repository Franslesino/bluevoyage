"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import NavOverlayMenu from "./NavOverlayMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import LocaleLink from "./LocaleLink";
import { useTranslation } from "./I18nProvider";
import { getLocaleFromPathname, SUPPORTED_LOCALES, stripLocalePrefix } from "@/lib/i18n";
import ScrollProgressBar from "./ScrollProgressBar";

export default function Navbar() {
    // Component for main navigation
    const pathname = usePathname();
    const { t } = useTranslation();

    // Homepage Detection - works with new i18n routing
    // Home is "/" (English) or "/de" or "/fr" (non-English)
    const pathWithoutLocale = stripLocalePrefix(pathname);
    const isHomePage = pathWithoutLocale === "/" || pathWithoutLocale === "";

    // isTransparent = true when Hero is visible (only applies to Home)
    const [isTransparent, setIsTransparent] = useState(isHomePage);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const headerRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);

    // Mobile Hide-on-scroll logic (keep as requested, good UX)
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            // Always show near top
            if (currentY < 10) {
                setIsHidden(false);
                lastScrollY.current = currentY;
                return;
            }

            // Scroll Down (Hide)
            if (currentY > lastScrollY.current + 8) {
                setIsHidden(true);
            }
            // Scroll Up (Show)
            else if (currentY < lastScrollY.current - 8) {
                setIsHidden(false);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // IntersectionObserver for Hero Section
    // Detects if Hero is visible. If yes, navbar is transparent.
    useEffect(() => {
        if (!isHomePage) {
            setIsTransparent(false);
            return;
        }

        // Initial check - assume transparent on mount if home (avoids flash)
        setIsTransparent(true);

        const observer = new IntersectionObserver(
            ([entry]) => {
                // If hero is intersecting (any part visible), we are transparent
                // When hero moves completely out of view, we become solid
                setIsTransparent(entry.isIntersecting);
            },
            { threshold: 0 } // Trigger when any pixel of hero is visible
        );

        const heroSection = document.getElementById("hero-section");
        if (heroSection) {
            observer.observe(heroSection);
        }

        return () => observer.disconnect();
    }, [isHomePage]);

    // Measure height for spacer (only used on non-home pages now, or when solid)
    useEffect(() => {
        if (!headerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setNavbarHeight(entry.contentRect.height);
            }
        });
        resizeObserver.observe(headerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Derived state for styles
    const isSolid = !isHomePage || !isTransparent;

    // Navbar fixed positioning
    const positionClass = "fixed top-0 left-0 right-0";

    // Styles based on state
    // Transparent: No bg, no shadow, no border
    // Solid: White bg, shadow, border
    const bgClass = isSolid
        ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-200"
        : "bg-transparent border-transparent shadow-none backdrop-blur-none";

    // Text colors
    // When transparent (over hero), text should be white to contrast with video
    // When solid, text is dark

    const hamburgerColorClass = isSolid ? "bg-neutral-900" : "bg-white";

    // Logo: Invert brightness when on transparent dark background
    const logoClass = "w-[110px] md:w-[140px] lg:w-[180px] h-auto object-contain transition-all duration-300";

    // Padding
    const paddingClass = "py-2 md:py-3";

    return (
        <>
            {/* Full Screen Overlay Menu */}
            <NavOverlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Spacer: Only needed on non-home pages where navbar is solid/fixed 
                and might overlap content. On Home, layout starts under navbar anyway? 
                Actually, usually home hero starts at top:0, so no spacer needed.
                Non-home pages: content starts at top. If fixed navbar, we need spacer.
            */}
            {!isHomePage && <div style={{ height: navbarHeight }} />}

            <header
                ref={headerRef}
                className={`transition-all duration-300 ease-out z-50 w-full ${positionClass} ${bgClass} ${isHidden ? "-translate-y-full" : "translate-y-0"} md:translate-y-0`}
            >
                <div className={`flex items-center justify-between px-5 md:px-10 ${paddingClass}`}>
                    {/* Left: Hamburger & Language */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            className="flex flex-col justify-center gap-[5px] bg-transparent border-none cursor-pointer p-2 w-10 h-10 group"
                            aria-label="Open menu"
                            onClick={() => {
                                setIsMenuOpen(true);
                                setIsHidden(false); // Force show when opening menu
                            }}
                        >
                            <span className={`block w-6 h-0.5 transition-all duration-300 ${hamburgerColorClass} ${isMenuOpen ? "opacity-0" : ""}`} />
                            <span className={`block w-6 h-0.5 transition-all duration-300 ${hamburgerColorClass} ${isMenuOpen ? "opacity-0" : ""}`} />
                            <span className={`block w-6 h-0.5 transition-all duration-300 ${hamburgerColorClass} ${isMenuOpen ? "opacity-0" : ""}`} />
                        </button>

                        <LanguageSwitcher isTransparent={!isSolid} />
                    </div>

                    {/* Logo */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                        <LocaleLink href="/">
                            <span
                                className={`font-canto text-xl md:text-2xl lg:text-3xl tracking-wide transition-all duration-300 ${isHomePage && !isSolid ? "text-white" : "text-neutral-900"}`}
                            >
                                BLUEVOYAGE
                            </span>
                        </LocaleLink>
                    </div>

                    {/* Plan Trip Button (Desktop) - Hidden on Results and Check Booking */}
                    {!pathWithoutLocale.startsWith("/results") && !pathWithoutLocale.startsWith("/check-booking") && (
                        <LocaleLink
                            href="/check-booking"
                            className={`hidden md:inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all duration-300 font-avenir shadow-sm border cursor-pointer
                            ${isHomePage && !isSolid
                                    ? "bg-white text-neutral-900 border-white hover:bg-neutral-100" // Transparent state: White button
                                    : "bg-[#088F8F] text-white border-transparent hover:bg-[#3da8d4]" // Solid state: Tan button
                                }`}
                        >
                            {/* Bell Icon */}
                            <svg
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]"
                            >
                                <path d="M2 18h20" />
                                <path d="M12 18v-3" />
                                <path d="M17 15a5 5 0 1 0-10 0" />
                                <circle cx="12" cy="7" r="1" />
                            </svg>

                            {t("nav.planTrip")}
                        </LocaleLink>
                    )}

                    {/* Plan Trip Button (Mobile) - Hidden on Results and Check Booking */}
                    {!pathWithoutLocale.startsWith("/results") && !pathWithoutLocale.startsWith("/check-booking") && (
                        <LocaleLink
                            href="/check-booking"
                            className={`md:hidden inline-flex items-center gap-1 text-sm font-avenir uppercase tracking-[0.08em] transition-colors duration-300 cursor-pointer bg-transparent border-none
                            ${isHomePage && !isSolid ? "text-white" : "text-[#52bcec]"}
                        `}
                        >
                            <span className="flex flex-col text-right leading-tight">
                                {t("nav.planTripShort").split(" ").map((word, index) => (
                                    <span key={index}>{word}</span>
                                ))}
                            </span>
                            <span>&gt;</span>
                        </LocaleLink>
                    )}
                </div>
                <ScrollProgressBar />
            </header>
        </>
    );
}
