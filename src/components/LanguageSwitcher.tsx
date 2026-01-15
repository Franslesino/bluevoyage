"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { 
    Locale, 
    ALL_LOCALES, 
    LOCALE_NAMES, 
    localizePath, 
    stripLocalePrefix,
    getLocaleFromPathname 
} from "@/lib/i18n";

/**
 * Language configuration for the switcher
 */
const LANGUAGES: { code: Locale; label: string }[] = ALL_LOCALES.map((code) => ({
    code,
    label: LOCALE_NAMES[code],
}));

/**
 * LanguageSwitcher - Static i18n language dropdown
 * 
 * Switches the current page to the selected locale:
 * - EN: strips prefix, navigates to root path (e.g., /destinations)
 * - DE/FR: adds prefix (e.g., /de/destinations, /fr/destinations)
 * 
 * Does NOT use cookies or localStorage for redirects (SEO-first).
 * URL is the source of truth for locale.
 */
export default function LanguageSwitcher({ isTransparent = false }: { isTransparent?: boolean }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    // Get current locale from pathname
    const currentLocale = getLocaleFromPathname(pathname);
    const currentLang = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];

    // Mount check for portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Calculate dropdown position based on navbar
    const updatePosition = useCallback(() => {
        if (!triggerRef.current) return;

        // Find the navbar header element
        const navbar = triggerRef.current.closest('header');
        if (!navbar) return;

        const navbarRect = navbar.getBoundingClientRect();
        const triggerRect = triggerRef.current.getBoundingClientRect();

        setDropdownPosition({
            top: navbarRect.bottom, // Position below navbar
            left: triggerRect.left, // Align with trigger button
        });
    }, []);

    // Update position when opening
    useEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        }
        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isOpen, updatePosition]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                triggerRef.current && !triggerRef.current.contains(target) &&
                dropdownRef.current && !dropdownRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    /**
     * Handle language selection
     * - Strips current locale prefix from pathname
     * - Adds new locale prefix (or none for English)
     * - Navigates to the new URL
     */
    const handleLanguageSelect = (newLocale: Locale) => {
        setIsOpen(false);

        if (newLocale === currentLocale) return;

        // Get the path without any locale prefix
        const pathWithoutLocale = stripLocalePrefix(pathname);
        
        // Build the new path with the selected locale
        const newPath = localizePath(pathWithoutLocale, newLocale);

        // Preserve query string and hash
        const url = new URL(window.location.href);
        const fullPath = `${newPath}${url.search}${url.hash}`;

        // Optional: Store preference in localStorage (for UX, not for redirects)
        if (typeof window !== "undefined") {
            localStorage.setItem("preferred-locale", newLocale);
        }

        router.push(fullPath);
    };

    // Dropdown menu rendered via portal to position relative to viewport
    const dropdownMenu = mounted && isOpen ? createPortal(
        <div
            ref={dropdownRef}
            className="fixed z-[100] font-avenir"
            style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
            }}
        >
            <div
                className={`
                    w-48 max-h-[70vh] overflow-y-auto
                    bg-[#CB9275] 
                    shadow-[0_8px_30px_rgba(0,0,0,0.15)]
                    flex flex-col
                    transition-all duration-300 ease-out origin-top
                    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                `}
                style={{ borderRadius: 0 }}
                role="menu"
            >
                {LANGUAGES.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`
                            text-left px-5 py-3.5
                            text-sm text-white
                            hover:bg-black/10
                            transition-colors duration-200
                            uppercase tracking-wider
                            leading-relaxed
                            flex items-center gap-3
                            ${currentLocale === lang.code ? "bg-black/15 font-medium" : "font-normal"}
                        `}
                        role="menuitem"
                    >
                        <span className="w-7 font-medium">{lang.code.toUpperCase()}</span>
                        <span className="opacity-80 text-xs">{lang.label}</span>
                    </button>
                ))}
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <>
            {/* Trigger Button */}
            <button
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-1.5 text-xs md:text-sm uppercase tracking-widest hover:opacity-80 transition-opacity p-2 font-avenir ${isTransparent ? "text-white" : "text-neutral-900"
                    }`}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-label="Select Language"
            >
                <span>{currentLang.code.toUpperCase()}</span>
                <svg
                    className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Portal-rendered dropdown */}
            {dropdownMenu}
        </>
    );
}

// Export languages for use in other components if needed
export { LANGUAGES };
