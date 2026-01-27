"use client";

import { useState } from "react";
import { useTranslation } from "./I18nProvider";
import LocaleLink from "./LocaleLink";
import Navbar from "./Navbar";

export default function CheckBookingContent() {
    const { t } = useTranslation();
    const [bookingId, setBookingId] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<null | { status: string; message: string }>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingId.trim()) return;

        setIsSearching(true);
        setResult(null);

        // Simulate API call
        setTimeout(() => {
            setIsSearching(false);
            // Mock result
            setResult({
                status: "info",
                message: t("checkBooking.checkResultPlaceholder") || "Booking feature coming soon. ID: " + bookingId
            });
        }, 1000);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-32 pb-20 px-5 md:px-10 bg-neutral-50 flex items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-neutral-100">
                    <div className="text-center mb-8">
                        <h1 className="font-canto text-3xl md:text-4xl text-neutral-900 mb-2">
                            {t("checkBooking.checkTitle") || "Check Your Booking"}
                        </h1>
                        <p className="font-avenir text-neutral-500 text-sm md:text-base">
                            {t("checkBooking.checkSubtitle") || "Enter your booking ID to view details"}
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="space-y-6">
                        <div>
                            <label htmlFor="booking-id" className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 font-avenir">
                                {t("checkBooking.bookingIdLabel") || "Booking ID"}
                            </label>
                            <input
                                id="booking-id"
                                type="text"
                                value={bookingId}
                                onChange={(e) => setBookingId(e.target.value)}
                                placeholder="e.g. TV-123456"
                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#088F8F] focus:ring-1 focus:ring-[#088F8F] outline-none transition-all font-avenir text-neutral-800 placeholder-neutral-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSearching || !bookingId}
                            className={`w-full py-3.5 rounded-full font-avenir font-medium tracking-wide text-white transition-all duration-300 shadow-md
                            ${isSearching || !bookingId
                                    ? "bg-neutral-300 cursor-not-allowed"
                                    : "bg-[#088F8F] hover:bg-[#3da8d4] hover:shadow-lg"
                                }`}
                        >
                            {isSearching
                                ? (t("checkBooking.checking") || "Checking...")
                                : (t("checkBooking.checkButton") || "Check Booking")}
                        </button>
                    </form>

                    {result && (
                        <div className="mt-8 p-4 bg-[#088F8F]/10 text-[#066e6e] rounded-lg text-sm font-avenir text-center border border-[#088F8F]/20">
                            {result.message}
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <LocaleLink
                            href="/"
                            className="inline-block px-6 py-2 rounded-full border border-neutral-200 text-neutral-400 hover:text-[#088F8F] hover:border-[#088F8F] text-xs font-avenir uppercase tracking-widest transition-all duration-300"
                        >
                            {t("common.backToHome") || "BACK TO HOME"}
                        </LocaleLink>
                    </div>
                </div>
            </main>
        </>
    );
}
