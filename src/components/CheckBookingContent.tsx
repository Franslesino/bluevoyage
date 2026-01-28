"use client";

import { useState } from "react";
import { useTranslation } from "./I18nProvider";
import LocaleLink from "./LocaleLink";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

interface BookingData {
    booking_id: string;
    invoice_id: string;
    status: string;
    amount: string;
    currency: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    items: {
        name: string;
        price: number;
        category: string;
        quantity: number;
    }[];
    description: string;
    payment_method: string;
    paid_at: string;
    created_at: string;
    updated_at: string;
}

// API function to fetch bookings
const fetchBookings = async (): Promise<BookingData[]> => {
    try {
        const response = await fetch('https://ac0c4wsgo0cg4sc8ksos04ko.49.13.148.202.sslip.io/api/bookings');
        const result = await response.json();
        
        if (result.success) {
            return result.data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
};

// API function to fetch ships
const fetchShips = async () => {
    try {
        const response = await fetch('https://ac0c4wsgo0cg4sc8ksos04ko.49.13.148.202.sslip.io/api/ships');
        const result = await response.json();
        
        if (result.success && result.data) {
            return result.data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching ships:', error);
        return [];
    }
};

// Function to extract Google Drive file ID and convert to lh3 URL
const extractFileId = (url: string): string | null => {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
};

// Function to get ship image by name
const getShipImage = async (shipName: string) => {
    try {
        const ships = await fetchShips();
        
        const ship = ships.find((s: any) => 
            s.name?.toUpperCase() === shipName?.toUpperCase()
        );
        
        if (ship && ship.image_main) {
            const fileId = extractFileId(ship.image_main);
            if (fileId) {
                // Use lh3.googleusercontent.com - works without authentication
                return `https://lh3.googleusercontent.com/d/${fileId}=w1600`;
            }
        }
        
        return null;
    } catch (error) {
        console.error('Error in getShipImage:', error);
        return null;
    }
};

export default function CheckBookingContent() {
    const { t } = useTranslation();
    const [bookingId, setBookingId] = useState("");
    const [lastName, setLastName] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [shipImage, setShipImage] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingId.trim() || !lastName.trim()) return;

        setIsSearching(true);
        setErrorMessage("");
        setSuccessMessage("");
        setShipImage(null);

        try {
            // Fetch bookings from API
            const bookings = await fetchBookings();
            
            // Check if booking exists - search by booking_id and customer_name contains lastName
            const booking = bookings.find(
                b => b.booking_id.toLowerCase() === bookingId.trim().toLowerCase() && 
                     b.customer_name.toLowerCase().includes(lastName.trim().toLowerCase())
            );

            if (booking) {
                // Success: Show alert with created date
                setBookingData(booking);
                const createdDate = new Date(booking.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                setSuccessMessage(`Booking found! Created on ${createdDate}`);
                
                // Fetch ship image based on ship name
                const shipName = booking.items[0]?.name?.split(' - ')[1] || 'AL FATHRAN';
                const imageUrl = await getShipImage(shipName);
                setShipImage(imageUrl);
            } else {
                // Error: Show alert
                setErrorMessage("Booking not found. Please check your Booking ID and Last Name.");
            }
        } catch (error) {
            setErrorMessage("Error fetching booking data. Please try again.");
        }

        setIsSearching(false);
    };

    const handleViewReceipt = () => {
        setShowModal(true);
    };

    const handleDownloadReceipt = () => {
        if (!bookingData) return;
        
        // Save booking data to local storage
        const receiptData = {
            ...bookingData,
            downloadedAt: new Date().toISOString()
        };
        
        localStorage.setItem(`receipt_${bookingData.booking_id}`, JSON.stringify(receiptData));
        
        // Show confirmation
        alert(`Receipt saved to your browser!\nBooking ID: ${bookingData.booking_id}`);
    };

    const handleCompletePayment = () => {
        if (!bookingData) return;
        
        // Redirect to payment gateway - in real implementation:
        // window.location.href = `/payment/${bookingData.booking_id}`;
    };

    const closeModal = () => {
        setShowModal(false);
        // Don't clear bookingData so the alert stays visible
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-10 pb-12 px-5 md:px-10 bg-white">
                {/* Back Button */}
                <div className="max-w-4xl mx-auto mb-6">
                    <LocaleLink
                        href="/"
                        className="inline-flex items-center gap-2 text-[#088F8F] hover:text-[#066e6e] font-avenir text-sm font-medium transition-colors duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </LocaleLink>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="font-canto text-4xl md:text-5xl text-neutral-800 mb-4 tracking-wide">
                            FIND YOUR RESERVATION
                        </h1>
                    </div>

                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="last-name" className="block text-xs font-bold text-[#088F8F] uppercase tracking-wider mb-3 font-avenir">
                                    Last Name
                                </label>
                                <input
                                    id="last-name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-0 py-3 border-b-2 border-neutral-300 focus:border-[#088F8F] outline-none transition-all font-avenir text-neutral-800 bg-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="booking-id" className="block text-xs font-bold text-[#088F8F] uppercase tracking-wider mb-3 font-avenir">
                                    Booking ID
                                </label>
                                <input
                                    id="booking-id"
                                    type="text"
                                    value={bookingId}
                                    onChange={(e) => setBookingId(e.target.value)}
                                    className="w-full px-0 py-3 border-b-2 border-neutral-300 focus:border-[#088F8F] outline-none transition-all font-avenir text-neutral-800 bg-transparent"
                                />
                                <p className="text-neutral-400 text-xs italic mt-2 font-avenir">
                                    *Confirmation number format: 12345678-1-ABC
                                </p>
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <button
                                type="submit"
                                disabled={isSearching || !bookingId || !lastName}
                                className={`px-12 py-3.5 font-avenir font-semibold text-sm uppercase tracking-widest transition-all duration-300
                                ${isSearching || !bookingId || !lastName
                                        ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                                        : "bg-neutral-300 text-neutral-600 hover:bg-[#088F8F] hover:text-white"
                                    }`}
                            >
                                {isSearching ? "Checking..." : "Find Reservation"}
                            </button>
                        </div>

                        {errorMessage && (
                            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-avenir text-center border border-red-200">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && bookingData && (
                            <div className="mt-8 bg-white border border-neutral-200 rounded-lg shadow-sm">
                                {/* Booking Header */}
                                <div className="border-b border-neutral-200 p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-canto text-xl font-semibold text-neutral-900 mb-1">Booking Details</h3>
                                            <p className="font-avenir text-sm text-neutral-600">Reference: {bookingData.booking_id}</p>
                                        </div>
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Content */}
                                <div className="p-6">
                                    {/* Ship Image */}
                                    <div className="mb-8">
                                        <div className="relative h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden">
                                            {shipImage ? (
                                                <img 
                                                    src={shipImage} 
                                                    alt={bookingData?.items[0]?.name?.split(' - ')[1] || 'Ship'} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center text-neutral-500">
                                                        <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l.01 0M12 12l.01 0M16 12l.01 0M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                        </svg>
                                                        <h4 className="font-canto font-semibold text-lg text-neutral-700 mb-1">
                                                            {bookingData?.items[0]?.name?.split(' - ')[1] || 'Ship'}
                                                        </h4>
                                                        <p className="font-avenir text-sm text-neutral-500">{bookingData?.items[0]?.name || 'Cabin'}</p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                <span className="font-avenir text-xs font-semibold text-neutral-700">{bookingData?.items[0]?.category || 'Travel'}</span>
                                            </div>
                                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                <span className="font-avenir text-xs font-semibold text-neutral-700">{bookingData?.items[0]?.quantity || 0} Guests</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {/* Guest Information */}
                                        <div>
                                            <h4 className="font-avenir font-semibold text-neutral-900 text-sm uppercase tracking-wider mb-4">Guest Information</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Name</p>
                                                    <p className="font-avenir font-medium text-neutral-900">{bookingData.customer_name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Email</p>
                                                    <p className="font-avenir text-sm text-neutral-700">{bookingData.customer_email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Phone</p>
                                                    <p className="font-avenir text-sm text-neutral-700">{bookingData.customer_phone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Booking Information */}
                                        <div>
                                            <h4 className="font-avenir font-semibold text-neutral-900 text-sm uppercase tracking-wider mb-4">Booking Information</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Ship</p>
                                                    <p className="font-avenir font-medium text-neutral-900">
                                                        {bookingData.items[0]?.name?.split(' - ')[1] || 'N/A'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Cabin Type</p>
                                                    <p className="font-avenir text-sm text-neutral-700">
                                                        {bookingData.items[0]?.name?.split(' - ')[0] || 'Family Cabin'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Guests</p>
                                                    <p className="font-avenir text-sm text-neutral-700">{bookingData.items[0]?.quantity || 0} Guests</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Information */}
                                        <div>
                                            <h4 className="font-avenir font-semibold text-neutral-900 text-sm uppercase tracking-wider mb-4">Payment</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Status</p>
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                        bookingData.status === 'SETTLED' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-orange-100 text-orange-800'
                                                    }`}>
                                                        {bookingData.status}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Total Amount</p>
                                                    <p className="font-canto text-2xl font-bold text-neutral-900 mt-1">
                                                        Rp {Number(bookingData.amount).toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Payment Method</p>
                                                    <p className="font-avenir text-sm text-neutral-700">{bookingData.payment_method}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-8 pt-6 border-t border-neutral-200">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={handleViewReceipt}
                                                className="flex-1 bg-neutral-900 text-white px-6 py-3 rounded-md font-avenir font-medium text-sm hover:bg-neutral-800 transition-colors"
                                            >
                                                View Receipt
                                            </button>
                                            <button
                                                onClick={handleDownloadReceipt}
                                                className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-md font-avenir font-medium text-sm hover:bg-neutral-50 transition-colors"
                                            >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="text-center mt-8 space-y-2">
                            <p className="text-neutral-500 text-sm font-avenir">
                                Don't know your confirmation number?
                            </p>
                            <p className="text-neutral-400 text-xs font-avenir">
                                This number was included in an email sent at the time of booking. Please check your email to recover the number.
                            </p>
                        </div>
                    </form>
                </div>
            </main>
            
            <FooterSection />

            {/* Modal for Booking Details - Receipt Style */}
            {showModal && bookingData && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6">
                    <div className="bg-white shadow-2xl max-w-md w-full max-h-[95vh] overflow-hidden flex flex-col border-2 border-neutral-300">
                        {/* Receipt Header */}
                        <div className="bg-white border-b-2 border-dashed border-neutral-300 px-6 py-6">
                            <div className="text-center mb-4">
                                <h2 className="font-canto text-2xl text-neutral-900 mb-1 tracking-wide">BLUE VOYAGE</h2>
                                <p className="font-avenir text-xs text-neutral-500 uppercase tracking-widest">Booking Confirmation</p>
                            </div>
                            <div className="flex justify-between items-center text-xs font-avenir">
                                <span className="text-neutral-500">Ref No:</span>
                                <span className="font-bold text-neutral-900">{bookingData.booking_id}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-avenir mt-1">
                                <span className="text-neutral-500">Date:</span>
                                <span className="text-neutral-900">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Receipt Body */}
                        <div className="overflow-y-auto flex-1 bg-white">
                            <div className="px-6 py-5 space-y-4">
                                {/* Guest Information */}
                                <div>
                                    <h3 className="font-avenir text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3 border-b border-neutral-200 pb-1">Guest Details</h3>
                                    <div className="space-y-2 font-avenir text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Name:</span>
                                            <span className="text-neutral-900 font-medium">{bookingData.customer_name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Email:</span>
                                            <span className="text-neutral-900 text-xs">{bookingData.customer_email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Phone:</span>
                                            <span className="text-neutral-900">{bookingData.customer_phone}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Invoice ID:</span>
                                            <span className="text-neutral-900">{bookingData.invoice_id}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Dotted Line Separator */}
                                <div className="border-t-2 border-dashed border-neutral-300"></div>

                                {/* Journey Details */}
                                <div>
                                    <h3 className="font-avenir text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3 border-b border-neutral-200 pb-1">Booking Information</h3>
                                    <div className="space-y-2 font-avenir text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Items:</span>
                                            <span className="text-neutral-900 font-medium">{bookingData.items[0]?.name || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Created:</span>
                                            <span className="text-neutral-900">{new Date(bookingData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Quantity:</span>
                                            <span className="text-neutral-900">{bookingData.items[0]?.quantity || 0} {bookingData.items[0]?.quantity > 1 ? 'Items' : 'Item'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Payment Method:</span>
                                            <span className="text-neutral-900">{bookingData.payment_method}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Dotted Line Separator */}
                                <div className="border-t-2 border-dashed border-neutral-300"></div>

                                {/* Payment Status */}
                                <div>
                                    <h3 className="font-avenir text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3 border-b border-neutral-200 pb-1">Payment Details</h3>
                                    <div className="space-y-2 font-avenir text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Booking Status:</span>
                                            <span className={`font-bold ${bookingData.status === "SETTLED" ? "text-green-700" : "text-orange-700"}`}>
                                                {bookingData.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Currency:</span>
                                            <span className="font-bold text-neutral-900">
                                                {bookingData.currency}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Paid At:</span>
                                            <span className="text-neutral-900">
                                                {new Date(bookingData.paid_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Dotted Line Separator */}
                                <div className="border-t-2 border-dashed border-neutral-300"></div>

                                {/* Total Amount */}
                                <div className="bg-neutral-50 border-2 border-neutral-300 p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-avenir text-sm font-bold text-neutral-700 uppercase tracking-wide">Total Amount:</span>
                                        <span className="font-canto text-2xl font-bold text-neutral-900">
                                            Rp {Number(bookingData.amount).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                {/* Footer Note */}
                                <div className="text-center pt-2">
                                    <p className="font-avenir text-xs text-neutral-400 italic">Thank you for choosing Blue Voyage</p>
                                    <p className="font-avenir text-xs text-neutral-400 mt-1">Please keep this confirmation for your records</p>
                                </div>
                            </div>
                        </div>

                        {/* Receipt Footer - Action Buttons */}
                        <div className="border-t-2 border-neutral-300 bg-neutral-50 px-6 py-4">
                            {bookingData.status !== "SETTLED" ? (
                                // When payment is pending - show Complete Payment as primary action
                                <div className="space-y-3">
                                    <button
                                        onClick={handleCompletePayment}
                                        className="w-full py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 font-avenir font-semibold transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Pay Now
                                    </button>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={closeModal}
                                            className="flex-1 py-2.5 border-2 border-neutral-400 text-neutral-700 hover:bg-neutral-200 font-avenir font-semibold transition-all text-xs uppercase tracking-wider"
                                        >
                                            Close
                                        </button>
                                        <button
                                            onClick={handleDownloadReceipt}
                                            className="flex-1 py-2.5 border-2 border-neutral-400 text-neutral-700 hover:bg-neutral-200 font-avenir font-semibold transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // When payment is complete - show normal actions
                                <div className="flex gap-3">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 py-2.5 border-2 border-neutral-400 text-neutral-700 hover:bg-neutral-200 font-avenir font-semibold transition-all text-xs uppercase tracking-wider"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={handleDownloadReceipt}
                                        className="flex-1 py-2.5 bg-neutral-800 text-white hover:bg-neutral-900 font-avenir font-semibold transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
