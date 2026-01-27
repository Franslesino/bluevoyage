"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

export default function PaymentFailedPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f1ec] to-[#e8e4df] px-4 py-16 md:py-24">
                <div className="bg-white rounded-2xl p-8 md:p-12 max-w-[500px] w-full text-center shadow-xl">
                    {/* Failed Icon */}
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="56"
                            height="56"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-red-600"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h1 className="font-canto text-3xl md:text-4xl font-medium text-red-600 mb-4">
                        Payment Failed
                    </h1>

                    {/* Message */}
                    <p className="font-avenir text-lg text-neutral-700 mb-6 leading-relaxed">
                        We&apos;re sorry, but your payment could not be processed.
                    </p>

                    {/* Details Box */}
                    <div className="bg-red-50 rounded-lg p-5 mb-8 text-left">
                        <p className="font-avenir text-sm text-neutral-600 mb-3">
                            This could be due to:
                        </p>
                        <ul className="list-disc pl-5 font-avenir text-sm text-neutral-600 space-y-1 mb-3">
                            <li>Insufficient funds</li>
                            <li>Card declined by issuer</li>
                            <li>Payment session expired</li>
                            <li>Technical issues</li>
                        </ul>
                        <p className="font-avenir text-sm text-neutral-600">
                            Please try again or contact our support team for assistance.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/results"
                            className="inline-block font-avenir font-semibold text-base bg-neutral-100 text-neutral-700 rounded-lg px-6 py-3.5 hover:bg-neutral-200 transition-all text-center"
                        >
                            Try Again
                        </Link>
                        <Link
                            href="/"
                            className="inline-block font-avenir font-semibold text-base bg-[#088F8F] text-white rounded-lg px-6 py-3.5 hover:bg-[#066e6e] transition-all hover:-translate-y-0.5 text-center"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
            <FooterSection />
        </>
    );
}
