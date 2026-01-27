"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

interface BookingData {
    bookingId: string;
    customerName: string;
    email: string;
    phone: string;
    shipName: string;
    cabinName: string;
    itinerary: string;
    travelDate: string;
    guests: number;
    pricePerCabin: number;
    totalAmount: number;
}

export default function PaymentSuccessPage() {
    const [emailStatus, setEmailStatus] = useState<"sending" | "sent" | "failed">("sending");
    const [bookingData, setBookingData] = useState<BookingData>({
        bookingId: "KV2025001",
        customerName: "Guest",
        email: "guest@email.com",
        phone: "-",
        shipName: "Komodo Voyage",
        cabinName: "-",
        itinerary: "-",
        travelDate: "To be confirmed",
        guests: 2,
        pricePerCabin: 0,
        totalAmount: 0,
    });

    const formatCurrency = (amount: number) => {
        if (!amount) return "Rp 0";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        })
            .format(amount)
            .replace("IDR", "Rp");
    };

    useEffect(() => {
        let isMounted = true;
        const timerRefs: NodeJS.Timeout[] = [];

        // Load booking data from localStorage
        try {
            const lastEnquiry = localStorage.getItem("komodo_last_enquiry");
            if (lastEnquiry) {
                const data = JSON.parse(lastEnquiry);
                const newBookingData = { ...bookingData };

                if (data.form) {
                    newBookingData.customerName =
                        `${data.form.title || ""} ${data.form.firstName || ""} ${data.form.lastName || ""}`.trim() || "Guest";
                    newBookingData.email = data.form.email || "guest@email.com";
                    newBookingData.phone = data.form.phone || "-";
                }

                if (data.itinerary && data.itinerary.length > 0) {
                    const item = data.itinerary[0];
                    newBookingData.shipName = item.ship || "Komodo Voyage";
                    newBookingData.cabinName = item.cabin || "-";
                    newBookingData.itinerary = item.itinerary || "-";
                    newBookingData.travelDate = item.date || "To be confirmed";
                    newBookingData.guests = item.guests || 2;
                    newBookingData.pricePerCabin = item.pricePerCabin || 0;
                }

                newBookingData.totalAmount = data.amount || 0;
                newBookingData.bookingId = data.invoiceId
                    ? `KV${Date.now().toString().slice(-8)}`
                    : "KV2025001";

                if (isMounted) {
                    setBookingData(newBookingData);
                }

                // Clear itinerary after loading
                localStorage.removeItem("komodo_itinerary");

                // Simulate email sending
                if (newBookingData.email && newBookingData.email !== "guest@email.com") {
                    const timer = setTimeout(() => {
                        if (isMounted) setEmailStatus("sent");
                    }, 2000);
                    timerRefs.push(timer);
                } else {
                    if (isMounted) setEmailStatus("sent");
                }
            } else {
                if (isMounted) setEmailStatus("sent");
            }
        } catch (error) {
            console.error("Error loading booking data:", error);
            if (isMounted) setEmailStatus("failed");
        }

        return () => {
            isMounted = false;
            timerRefs.forEach(clearTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 px-4 py-10 md:py-16">
                <div className="max-w-[700px] mx-auto">
                    {/* Success Animation */}
                    <div className="text-center mb-6">
                        <div className="w-24 h-24 mx-auto">
                            <svg className="w-full h-full" viewBox="0 0 52 52">
                                <circle
                                    className="fill-green-100 stroke-green-500"
                                    cx="26"
                                    cy="26"
                                    r="25"
                                    strokeWidth="2"
                                />
                                <path
                                    className="stroke-green-500"
                                    fill="none"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Main Content Card */}
                    <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl">
                        <h1 className="font-canto text-2xl md:text-4xl font-semibold text-slate-800 text-center mb-2">
                            Thank You for Your Purchase!
                        </h1>
                        <p className="text-base text-slate-500 text-center mb-8">
                            Your payment has been successfully processed
                        </p>

                        {/* Booking Summary Card */}
                        <div className="bg-slate-50 rounded-2xl overflow-hidden mb-6">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div className="flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    Booking Confirmed
                                </div>
                                <div className="text-white">
                                    <span className="block text-xs text-white/70">Booking ID</span>
                                    <span className="font-mono font-semibold">#{bookingData.bookingId}</span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6 space-y-6">
                                {/* Guest Info */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide border-b border-slate-200 pb-3 mb-4">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#088F8F]">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        Guest Information
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs text-slate-500">Name</span>
                                            <span className="font-medium text-slate-800">{bookingData.customerName}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-slate-500">Email</span>
                                            <span className="font-medium text-slate-800">{bookingData.email}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-slate-500">Phone</span>
                                            <span className="font-medium text-slate-800">{bookingData.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Trip Info */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide border-b border-slate-200 pb-3 mb-4">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#088F8F]">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                        </svg>
                                        Trip Details
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs text-slate-500">Ship</span>
                                            <span className="font-medium text-slate-800">{bookingData.shipName}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-slate-500">Cabin Type</span>
                                            <span className="font-medium text-slate-800">{bookingData.cabinName}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-slate-500">Itinerary</span>
                                            <span className="font-medium text-slate-800">{bookingData.itinerary}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-slate-500">Travel Date</span>
                                            <span className="font-medium text-slate-800">{bookingData.travelDate}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-slate-500">Guests</span>
                                            <span className="font-medium text-slate-800">{bookingData.guests} Person(s)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Summary */}
                                <div className="bg-white rounded-xl p-5">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide border-b border-slate-200 pb-3 mb-4">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#088F8F]">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                            <line x1="1" y1="10" x2="23" y2="10" />
                                        </svg>
                                        Payment Summary
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm text-slate-600">
                                            <span>{bookingData.cabinName} × {bookingData.guests}</span>
                                            <span>{formatCurrency(bookingData.pricePerCabin)} × {bookingData.guests}</span>
                                        </div>
                                        <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold">
                                            <span>Total Paid</span>
                                            <span className="text-xl text-green-600">{formatCurrency(bookingData.totalAmount)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-center gap-2 bg-green-100 text-green-700 py-3 rounded-lg font-semibold text-sm">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                        Payment Successful
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Notice */}
                        <div className="flex flex-col sm:flex-row items-start gap-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-xl p-5 mb-6">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-blue-800 mb-1">Check Your Email</h4>
                                <p className="text-sm text-blue-600 leading-relaxed">
                                    A detailed receipt and booking confirmation has been sent to <strong>{bookingData.email}</strong>
                                </p>
                                <p className="text-xs text-blue-500 mt-2">
                                    Don&apos;t forget to check your spam folder if you don&apos;t see it within a few minutes.
                                </p>
                            </div>
                            <div className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${emailStatus === "sending" ? "bg-amber-100 text-amber-700" :
                                emailStatus === "sent" ? "bg-green-100 text-green-700" :
                                    "bg-red-100 text-red-700"
                                }`}>
                                {emailStatus === "sending" ? "Sending..." :
                                    emailStatus === "sent" ? "✓ Email Sent" : "⚠ Will retry"}
                            </div>
                        </div>

                        {/* What's Next */}
                        <div className="mb-8">
                            <h3 className="font-canto text-xl text-slate-800 text-center mb-5">What Happens Next?</h3>
                            <div className="space-y-4">
                                {[
                                    { num: 1, title: "Email Confirmation", desc: "Check your inbox for your booking receipt and trip details" },
                                    { num: 2, title: "Journey Designer Contact", desc: "Our team will reach out within 24 hours to finalize your itinerary" },
                                    { num: 3, title: "Prepare for Adventure", desc: "Get your travel documents ready and pack for an unforgettable trip!" },
                                ].map((step) => (
                                    <div key={step.num} className="flex gap-4 items-start">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#088F8F] to-[#066e6e] text-white rounded-full flex items-center justify-center font-semibold text-sm shrink-0">
                                            {step.num}
                                        </div>
                                        <div>
                                            <strong className="block text-slate-800 mb-1">{step.title}</strong>
                                            <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#088F8F] to-[#066e6e] text-white font-semibold px-7 py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                Back to Home
                            </Link>
                            <Link
                                href="/journeys"
                                className="inline-flex items-center justify-center bg-white text-slate-700 font-semibold px-7 py-3.5 rounded-xl border-2 border-slate-200 hover:border-[#088F8F] hover:text-[#088F8F] transition-all"
                            >
                                Explore More Trips
                            </Link>
                        </div>

                        {/* Support */}
                        <div className="text-center pt-6 border-t border-slate-200">
                            <p className="text-sm text-slate-500 mb-2">Need help? Contact our support team at</p>
                            <a href="mailto:support@komodovoyage.com" className="text-[#088F8F] font-medium hover:underline">
                                support@komodovoyage.com
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <FooterSection />
        </>
    );
}
