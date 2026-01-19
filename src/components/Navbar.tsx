"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import NavOverlayMenu from "./NavOverlayMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import LocaleLink from "./LocaleLink";
import { useTranslation } from "./I18nProvider";
import { getLocaleFromPathname, SUPPORTED_LOCALES, stripLocalePrefix } from "@/lib/i18n";

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
    const textColorClass = isSolid ? "text-neutral-900" : "text-white";
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
                            <Image
                                src="/icon.webp"
                                alt="Togean Voyage Logo"
                                width={180}
                                height={180}
                                className={`${logoClass} ${isHomePage && !isSolid ? "brightness-0 invert" : ""}`}
                                priority
                            />
                        </LocaleLink>
                    </div>

                    {/* Book Now Button (Desktop) */}
                    <LocaleLink
                        href="/how-to-booking"
                        className={`hidden md:inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all duration-300 font-avenir shadow-sm border 
                            ${isHomePage && !isSolid
                                ? "bg-white text-neutral-900 border-white hover:bg-neutral-100" // Transparent state: White button
                                : "bg-[#CB9275] text-white border-transparent hover:bg-[#B67F63]" // Solid state: Tan button
                            }`}
                    >
                        {/* WhatsApp Icon */}
                        <svg
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>

                        {t("nav.bookNow")}
                    </LocaleLink>

                    {/* Book Now Button (Mobile) */}
                    <LocaleLink
                        href="/how-to-booking"
                        className={`md:hidden inline-flex items-center gap-1 text-sm font-avenir uppercase tracking-[0.08em] transition-colors duration-300
                            ${isHomePage && !isSolid ? "text-white" : "text-[#CB9275]"}
                        `}
                    >
                        <span className="flex flex-col text-right leading-tight">
                            {t("nav.bookNow").split(" ").map((word, index) => (
                                <span key={index}>{word}</span>
                            ))}
                        </span>
                        <span>&gt;</span>
                    </LocaleLink>
                </div>
            </header>
        </>
    );
}
