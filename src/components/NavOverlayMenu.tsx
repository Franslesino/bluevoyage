"use client";

import { useEffect } from "react";
import { CONTACT_INFO } from "@/config/contact";
import LocaleLink from "./LocaleLink";
import { useTranslation } from "./I18nProvider";

interface NavOverlayMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const LEFT_ITEMS = [
    { labelKey: "nav.home", href: "/" },
    { labelKey: "nav.destinations", href: "/destinations" },
    { labelKey: "nav.programs", href: "/programs" },
    { labelKey: "nav.wildlife", href: "/wildlife" },
];

const RIGHT_ITEMS = [
    { labelKey: "nav.localCommunity", href: "/local-community" },
    { labelKey: "nav.boatSafety", href: "/boat" },
    { labelKey: "nav.accommodation", href: "/accommodation" },
    { labelKey: "nav.blog", href: "/blog" },
    { labelKey: "nav.howToBook", href: "/how-to-booking" },
];

export default function NavOverlayMenu({ isOpen, onClose }: NavOverlayMenuProps) {
    const { t } = useTranslation();
    
    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Reusable Menu Render Function
    const renderMenuItems = (items: typeof LEFT_ITEMS) => {
        return items.map((item) => {
            const isClickable = item.href !== null;
            const label = t(item.labelKey);

            if (!isClickable) {
                return (
                    <span
                        key={item.labelKey}
                        className="font-canto text-[26px] sm:text-[28px] md:text-[34px] lg:text-[42px] leading-[1.1] text-center text-white opacity-60 cursor-default pointer-events-none"
                    >
                        {label}
                    </span>
                );
            }

            return (
                <LocaleLink
                    key={item.labelKey}
                    href={item.href!}
                    onClick={onClose}
                    className="group relative flex items-center justify-center text-white"
                >
                    <span className="font-canto text-[26px] sm:text-[28px] md:text-[34px] lg:text-[42px] leading-[1.1] text-center transition-opacity duration-300">
                        {label}
                    </span>

                    {/* Hover Arrow Wrapper */}
                    <span className="absolute left-full ml-3 md:ml-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex items-center">
                        {/* ChevronRight Icon */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </span>
                </LocaleLink>
            );
        });
    };

    return (
        <div
            className={`fixed inset-0 z-[60] bg-[#CB9275] transition-all duration-500 ease-out flex flex-col ${isOpen
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-full opacity-0 pointer-events-none"
                }`}
        >
            {/* Top Bar: Close Button */}
            <div className="absolute top-0 left-0 w-full px-5 md:px-10 py-5 md:py-8 flex justify-between items-center z-10">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 group text-white font-avenir text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
                    aria-label="Close menu"
                >
                    <span className="text-lg">{t("nav.close")}</span>
                    {/* X Icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto w-full h-full pt-16 pb-8 md:pt-20 md:pb-10 no-scrollbar">

                {/* Navigation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-12 lg:gap-x-24 mb-12 md:mb-16 w-full max-w-6xl px-6">
                    {/* Left Column */}
                    <nav className="flex flex-col items-center gap-2 md:gap-3 lg:gap-4 order-1">
                        {renderMenuItems(LEFT_ITEMS)}
                    </nav>

                    {/* Right Column */}
                    <nav className="flex flex-col items-center gap-2 md:gap-3 lg:gap-4 order-2 mt-2 md:mt-0">
                        {renderMenuItems(RIGHT_ITEMS)}
                    </nav>
                </div>

                {/* Bottom Contact Area */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-4xl px-6 relative">

                    {/* Left: Book Your Trip */}
                    <div className="flex flex-col items-center gap-4 flex-1">
                        <span className="font-avenir text-white text-xs md:text-sm uppercase tracking-widest opacity-80">
                            {t("nav.bookYourTrip")}
                        </span>
                        <div className="flex items-center gap-6">
                            {/* WhatsApp (Icon Only) */}
                            <a
                                href={CONTACT_INFO.whatsapp.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                className="text-white hover:opacity-80 hover:scale-105 transition-all duration-300"
                                aria-label="Contact via WhatsApp"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>

                            {/* Email (Icon + Text) */}
                            <a
                                href={CONTACT_INFO.email.url}
                                onClick={onClose}
                                className="flex items-center gap-2 text-white hover:opacity-80 hover:scale-105 transition-all duration-300 group"
                                aria-label="Contact via Email"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                                <span className="font-avenir text-sm md:text-base group-hover:underline decoration-white/50 underline-offset-4 hidden sm:inline-block">
                                    {CONTACT_INFO.email.address}
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Vertical Divider (Desktop Only) */}
                    <div className="hidden md:block w-px h-16 bg-white/40 self-center mx-4"></div>

                    {/* Right: Social Media */}
                    <div className="flex flex-col items-center gap-4 flex-1">
                        <span className="font-avenir text-white text-xs md:text-sm uppercase tracking-widest opacity-80">
                            {t("nav.socialMedia")}
                        </span>
                        <div className="flex items-center gap-6 md:gap-8">
                            {/* Instagram */}
                            <a
                                href={CONTACT_INFO.socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80 transition-opacity"
                                aria-label="Instagram"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href={CONTACT_INFO.socials.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80 transition-opacity"
                                aria-label="Facebook"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
