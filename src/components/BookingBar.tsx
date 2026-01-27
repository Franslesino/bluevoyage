"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n";

// Destination options
const DESTINATIONS = [
    { id: "komodo", name: "Komodo National Park", description: "Explore dragons & pristine waters" },
    { id: "labuan-bajo", name: "Labuan Bajo", description: "Gateway to paradise islands" },
];

// Generate calendar days for a month
function generateCalendarDays(year: number, month: number): (Date | null)[] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const days: (Date | null)[] = [];

    for (let i = 0; i < adjustedStartDay; i++) {
        days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
    }

    return days;
}

// Format date for display
function formatDateDisplay(date: Date | null): string {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

// BookingBar Component - Destinations based search
// Helper to format date as YYYY-MM-DD using local time
const toLocalDateStr = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function BookingBar() {
    const router = useRouter();

    // State
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [passengers, setPassengers] = useState(2);

    // Dropdown states
    const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDurationDropdown, setShowDurationDropdown] = useState(false);
    const [showGuestDropdown, setShowGuestDropdown] = useState(false);

    // Calendar state
    const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
    const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
    const [tripDuration, setTripDuration] = useState(1); // Min duration
    const [maxTripDuration, setMaxTripDuration] = useState(10); // Max duration

    // Structured Guest State
    interface StructuredCabin {
        adults: number;
        children: number;
    }
    const [guestMode, setGuestMode] = useState<'flexible' | 'structured'>('structured');
    const [structuredCabins, setStructuredCabins] = useState<StructuredCabin[]>([{ adults: 2, children: 0 }]);
    const [expandedCabinIndex, setExpandedCabinIndex] = useState<number | null>(0);

    // Sync total guests when structured cabins change
    useEffect(() => {
        if (guestMode === 'structured') {
            const total = structuredCabins.reduce((sum, cabin) => sum + cabin.adults + cabin.children, 0);
            setPassengers(total);
        }
    }, [structuredCabins, guestMode]);

    // Structured Guest Helpers
    const updateCabinGuests = (index: number, type: 'adults' | 'children', delta: number) => {
        setStructuredCabins(prev => prev.map((cabin, idx) => {
            if (idx !== index) return cabin;
            const newVal = cabin[type] + delta;
            if (type === 'adults' && newVal < 1) return cabin;
            if (type === 'children' && newVal < 0) return cabin;
            return { ...cabin, [type]: newVal };
        }));
    };

    const addCabin = () => {
        setStructuredCabins(prev => [...prev, { adults: 1, children: 0 }]);
        setExpandedCabinIndex(structuredCabins.length);
    };

    const removeCabin = (index: number) => {
        if (structuredCabins.length <= 1) return;
        setStructuredCabins(prev => prev.filter((_, idx) => idx !== index));
        setExpandedCabinIndex(null);
    };

    const toggleCabinExpand = (index: number) => {
        setExpandedCabinIndex(prev => prev === index ? null : index);
    };

    // Loading states
    const [isSearching, setIsSearching] = useState(false);

    // Refs for click outside
    const destinationRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const durationRef = useRef<HTMLDivElement>(null);
    const guestRef = useRef<HTMLDivElement>(null);

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
                setShowDestinationDropdown(false);
            }
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
            if (durationRef.current && !durationRef.current.contains(event.target as Node)) {
                setShowDurationDropdown(false);
            }
            if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
                setShowGuestDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle date selection
    const handleDateClick = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Don't allow past dates
        if (date < today) return;

        if (!checkInDate || (checkInDate && checkOutDate)) {
            // Start new selection
            setCheckInDate(date);
            setCheckOutDate(null);
        } else if (date < checkInDate) {
            // If clicking before start date, reset start date
            setCheckInDate(date);
        } else if (date.getTime() === checkInDate.getTime()) {
            // Deselect if clicking same date
            setCheckInDate(null);
            setCheckOutDate(null);
        } else {
            // Select end date
            setCheckOutDate(date);
            setShowCalendar(false);
        }
    };

    // Check if date is past
    const isPastDate = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    // Check helpers
    const isStartDate = (date: Date) => checkInDate && date.getTime() === checkInDate.getTime();
    const isEndDate = (date: Date) => checkOutDate && date.getTime() === checkOutDate.getTime();
    const isInRange = (date: Date) => {
        if (!checkInDate || !checkOutDate) return false;
        return date > checkInDate && date < checkOutDate;
    };

    // Check if date is selected (start or end)
    const isSelected = (date: Date): boolean => {
        return !!((checkInDate && date.getTime() === checkInDate.getTime()) ||
            (checkOutDate && date.getTime() === checkOutDate.getTime()));
    };

    // Navigate months
    const prevMonth = () => {
        if (calendarMonth === 0) {
            setCalendarMonth(11);
            setCalendarYear(calendarYear - 1);
        } else {
            setCalendarMonth(calendarMonth - 1);
        }
    };

    const nextMonth = () => {
        if (calendarMonth === 11) {
            setCalendarMonth(0);
            setCalendarYear(calendarYear + 1);
        } else {
            setCalendarMonth(calendarMonth + 1);
        }
    };

    // Get month name
    const getMonthName = (month: number, year: number): string => {
        return new Date(year, month).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        });
    };

    // Handle search - navigate to results page
    const pathname = usePathname();
    const handleSearch = useCallback(async () => {
        if (!checkInDate) return;

        setIsSearching(true);

        // Store search criteria in localStorage for results page
        const destinationNames = selectedDestinations.length > 0
            ? selectedDestinations.map(id => DESTINATIONS.find(d => d.id === id)?.name).filter(Boolean).join(", ")
            : "All Destinations";

        const criteria = {
            destinations: selectedDestinations.length > 0 ? selectedDestinations : undefined,
            destinationName: destinationNames,
            dateFrom: toLocalDateStr(checkInDate),
            dateTo: checkOutDate ? toLocalDateStr(checkOutDate) : undefined,
            guests: passengers,
            tripDuration: tripDuration,
            maxTripDuration: maxTripDuration,
            structuredCabins: structuredCabins,
        };
        localStorage.setItem("togean_search_criteria", JSON.stringify(criteria));

        // Detect current locale and navigate to localized results
        const currentLocale = getLocaleFromPathname(pathname);
        const targetPath = localizePath("/results", currentLocale);

        router.push(targetPath);
    }, [selectedDestinations, checkInDate, checkOutDate, passengers, tripDuration, maxTripDuration, structuredCabins, router, pathname]);

    // Days of week header
    const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    // Generate calendar days
    const currentMonthDays = generateCalendarDays(calendarYear, calendarMonth);
    const nextMonthDate = calendarMonth === 11 ? 0 : calendarMonth + 1;
    const nextMonthYear = calendarMonth === 11 ? calendarYear + 1 : calendarYear;
    const nextMonthDays = generateCalendarDays(nextMonthYear, nextMonthDate);

    // Get selected destination names
    const selectedDestinationName = selectedDestinations.length > 0
        ? selectedDestinations.map(id => DESTINATIONS.find(d => d.id === id)?.name).filter(Boolean).join(", ")
        : null;

    return (
        <div id="booking-bar" className="w-full">
            {/* Booking Bar - Clean Horizontal Design */}
            <div className="bg-white rounded-lg shadow-xl mx-4 md:mx-auto max-w-5xl -mt-8 md:-mt-20 relative z-20 border border-gray-100">
                <div className="flex flex-col md:flex-row items-stretch">

                    {/* Destination Selector */}
                    <div ref={destinationRef} className="relative flex-1 border-b md:border-b-0 md:border-r border-gray-200">
                        <button
                            onClick={() => {
                                setShowDestinationDropdown(!showDestinationDropdown);
                                setShowCalendar(false);
                                setShowGuestDropdown(false);
                            }}
                            className="w-full px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                        >
                            <svg className="w-5 h-5 text-[#088F8F] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Destination</p>
                                <p className="text-sm text-gray-800 truncate">
                                    {selectedDestinationName || "Select destination..."}
                                </p>
                            </div>
                            <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${showDestinationDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Destination Dropdown */}
                        {showDestinationDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2">Select one or more destinations</p>
                                {DESTINATIONS.map((dest) => {
                                    const isSelected = selectedDestinations.includes(dest.id);
                                    return (
                                        <button
                                            key={dest.id}
                                            onClick={() => {
                                                if (isSelected) {
                                                    setSelectedDestinations(selectedDestinations.filter(id => id !== dest.id));
                                                } else {
                                                    setSelectedDestinations([...selectedDestinations, dest.id]);
                                                }
                                            }}
                                            className={`w-full p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left rounded-lg ${isSelected ? "bg-[#088F8F]/5" : ""}`}
                                        >
                                            <div className="flex items-center justify-center flex-shrink-0">
                                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? "bg-[#088F8F] border-[#088F8F]" : "border-gray-300"
                                                    }`}>
                                                    {isSelected && (
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-[#088F8F]/10 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-4 h-4 text-[#088F8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">{dest.name}</p>
                                                <p className="text-xs text-gray-500">{dest.description}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                                <div className="border-t border-gray-200 mt-2 pt-2">
                                    <button
                                        onClick={() => setShowDestinationDropdown(false)}
                                        className="w-full px-3 py-2 text-xs font-medium text-[#088F8F] hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Date Selector */}
                    <div ref={calendarRef} className="relative flex-1 border-b md:border-b-0 md:border-r border-gray-200">
                        <button
                            onClick={() => {
                                setShowCalendar(!showCalendar);
                                setShowDestinationDropdown(false);
                                setShowGuestDropdown(false);
                            }}
                            className="w-full px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                        >
                            <svg className="w-5 h-5 text-[#088F8F] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Date</p>
                                <p className="text-sm text-gray-800">
                                    {checkInDate ? (
                                        checkOutDate ? (
                                            `${formatDateDisplay(checkInDate)} - ${formatDateDisplay(checkOutDate)}`
                                        ) : (
                                            formatDateDisplay(checkInDate)
                                        )
                                    ) : "Select dates"}
                                </p>
                            </div>
                            <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${showCalendar ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Calendar Dropdown */}
                        {showCalendar && (
                            <div className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50 w-[95vw] md:w-auto md:min-w-[580px]">
                                {/* Close button */}
                                <button
                                    onClick={() => setShowCalendar(false)}
                                    className="absolute top-2 right-2 p-1.5 hover:bg-gray-100 rounded-full"
                                >
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Date Range Summary - Original Simple Style */}
                                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4 pb-4 border-b border-gray-200">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 font-medium mb-1">Select your travel dates:</p>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {checkInDate ? (
                                                checkOutDate ? (
                                                    `${formatDateDisplay(checkInDate)} - ${formatDateDisplay(checkOutDate)}`
                                                ) : (
                                                    formatDateDisplay(checkInDate)
                                                )
                                            ) : "Click dates below"}
                                        </p>
                                    </div>
                                </div>

                                {/* Month Navigation */}
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <div className="flex gap-12">
                                        <span className="text-sm font-semibold text-gray-800">{getMonthName(calendarMonth, calendarYear)}</span>
                                        <span className="text-sm font-semibold text-gray-800">{getMonthName(nextMonthDate, nextMonthYear)}</span>
                                    </div>
                                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Calendars */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Current Month */}
                                    <div>
                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {daysOfWeek.map(day => (
                                                <div key={day} className="text-center text-xs font-medium text-gray-400 py-1.5">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-1">
                                            {currentMonthDays.map((date, idx) => (
                                                <div key={idx} className="aspect-square">
                                                    {date ? (
                                                        <button
                                                            onClick={() => handleDateClick(date)}
                                                            disabled={isPastDate(date)}
                                                            className={`w-full h-full flex items-center justify-center text-xs rounded-lg transition-colors ${isSelected(date)
                                                                ? "bg-[#088F8F] text-white font-medium"
                                                                : isInRange(date)
                                                                    ? "bg-[#088F8F]/15 text-[#088F8F]"
                                                                    : isPastDate(date)
                                                                        ? "text-gray-300 cursor-not-allowed"
                                                                        : "hover:bg-[#088F8F]/10 text-gray-700"
                                                                }`}
                                                        >
                                                            {date.getDate()}
                                                        </button>
                                                    ) : null}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Next Month */}
                                    <div>
                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {daysOfWeek.map(day => (
                                                <div key={`next-${day}`} className="text-center text-xs font-medium text-gray-400 py-1.5">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-1">
                                            {nextMonthDays.map((date, idx) => (
                                                <div key={`next-${idx}`} className="aspect-square">
                                                    {date ? (
                                                        <button
                                                            onClick={() => handleDateClick(date)}
                                                            disabled={isPastDate(date)}
                                                            className={`w-full h-full flex items-center justify-center text-xs rounded-lg transition-colors ${isSelected(date)
                                                                ? "bg-[#088F8F] text-white font-medium"
                                                                : isInRange(date)
                                                                    ? "bg-[#088F8F]/15 text-[#088F8F]"
                                                                    : isPastDate(date)
                                                                        ? "text-gray-300 cursor-not-allowed"
                                                                        : "hover:bg-[#088F8F]/10 text-gray-700"
                                                                }`}
                                                        >
                                                            {date.getDate()}
                                                        </button>
                                                    ) : null}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Hint */}
                                <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
                                    Select your departure date to see available boats
                                </p>
                            </div>
                        )}
                    </div>



                    {/* Trip Duration Selector */}
                    <div ref={durationRef} className="relative flex-1 border-b md:border-b-0 md:border-r border-gray-200">
                        <button
                            onClick={() => {
                                setShowDurationDropdown(!showDurationDropdown);
                                setShowDestinationDropdown(false);
                                setShowCalendar(false);
                                setShowGuestDropdown(false);
                            }}
                            className="w-full px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                        >
                            <svg className="w-5 h-5 text-[#088F8F] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Duration</p>
                                <p className="text-sm text-gray-800">
                                    {tripDuration === maxTripDuration ? `${tripDuration} Days` : `${tripDuration} - ${maxTripDuration} Days`}
                                </p>
                            </div>
                            <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${showDurationDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Duration Dropdown */}
                        {showDurationDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 p-5 z-50 min-w-[320px]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-semibold text-gray-900">
                                        Trip Duration <span className="font-normal text-gray-400 text-xs ml-1">max 15 days</span>
                                    </span>
                                    <span className="text-xs text-gray-500">In days</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {/* Min Control */}
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg w-full">
                                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Min Days</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setTripDuration(Math.max(1, tripDuration - 1))}
                                                className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#088F8F] hover:border-[#088F8F] transition-colors disabled:opacity-50"
                                                disabled={tripDuration <= 1}
                                            >
                                                −
                                            </button>
                                            <span className="w-6 text-center text-base font-semibold text-gray-800">{tripDuration}</span>
                                            <button
                                                onClick={() => setTripDuration(Math.min(maxTripDuration, tripDuration + 1))}
                                                className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#088F8F] hover:border-[#088F8F] transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Max Control */}
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg w-full">
                                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Max Days</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setMaxTripDuration(Math.max(tripDuration, maxTripDuration - 1))}
                                                className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#088F8F] hover:border-[#088F8F] transition-colors"
                                            >
                                                −
                                            </button>
                                            <span className="w-6 text-center text-base font-semibold text-gray-800">{maxTripDuration}</span>
                                            <button
                                                onClick={() => setMaxTripDuration(Math.min(15, maxTripDuration + 1))}
                                                className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#088F8F] hover:border-[#088F8F] transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end">
                                    <button
                                        onClick={() => setShowDurationDropdown(false)}
                                        className="text-xs font-bold text-[#088F8F] hover:text-[#066e6e] uppercase tracking-wide px-2 py-1 hover:bg-[#088F8F]/5 rounded transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Passenger Selector */}
                    <div ref={guestRef} className="relative flex-1 border-b md:border-b-0 md:border-r border-gray-200">
                        <button
                            onClick={() => {
                                setShowGuestDropdown(!showGuestDropdown);
                                setShowDestinationDropdown(false);
                                setShowCalendar(false);
                            }}
                            className="w-full px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                        >
                            <svg className="w-5 h-5 text-[#088F8F] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Cabins & Guests</p>
                                <p className="text-sm text-gray-800">
                                    {`${structuredCabins.length} Cabin${structuredCabins.length > 1 ? 's' : ''}, ${passengers} Guests`}
                                </p>
                            </div>
                            <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${showGuestDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Passenger Dropdown */}
                        {showGuestDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 w-[300px] md:w-[340px]">
                                <div className="flex justify-between items-center mb-3 px-1">
                                    <span className="text-sm font-medium text-gray-900">Room Configuration</span>
                                    <span className="text-xs text-gray-500">Max 4 pax / cabin</span>
                                </div>
                                {/* Structured Mode Only - Cabins List */}
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                                    {structuredCabins.map((cabin, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <div
                                                className="px-3 py-2.5 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                                                onClick={() => toggleCabinExpand(idx)}
                                            >
                                                <span className="text-sm font-semibold text-gray-800">
                                                    CABIN {idx + 1}
                                                    <span className="ml-2 font-normal text-gray-500 text-xs">{cabin.adults + cabin.children} guests</span>
                                                </span>
                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className={`transform transition-transform duration-200 ${expandedCabinIndex === idx ? 'rotate-180' : ''}`}
                                                >
                                                    <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>

                                            {expandedCabinIndex === idx && (
                                                <div className="p-3 bg-white space-y-3 border-t border-gray-100">
                                                    {/* Adults */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Adults</span>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30"
                                                                onClick={(e) => { e.stopPropagation(); updateCabinGuests(idx, 'adults', -1); }}
                                                                disabled={cabin.adults <= 1}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-4 text-center text-sm font-medium">{cabin.adults}</span>
                                                            <button
                                                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                                                                onClick={(e) => { e.stopPropagation(); updateCabinGuests(idx, 'adults', 1); }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* Children */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Children</span>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30"
                                                                onClick={(e) => { e.stopPropagation(); updateCabinGuests(idx, 'children', -1); }}
                                                                disabled={cabin.children <= 0}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-4 text-center text-sm font-medium">{cabin.children}</span>
                                                            <button
                                                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                                                                onClick={(e) => { e.stopPropagation(); updateCabinGuests(idx, 'children', 1); }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {structuredCabins.length > 1 && (
                                                        <button
                                                            className="text-xs text-red-500 hover:text-red-700 font-medium underline mt-1 w-full text-right"
                                                            onClick={(e) => { e.stopPropagation(); removeCabin(idx); }}
                                                        >
                                                            Remove Cabin
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        className="w-full py-2 border border-dashed border-[#088F8F] text-[#088F8F] rounded-lg text-sm font-medium hover:bg-[#088F8F]/5 transition-colors"
                                        onClick={addCabin}
                                    >
                                        + Add Another Cabin
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <div className="p-2 md:p-2.5 flex items-center">
                        <button
                            onClick={handleSearch}
                            disabled={!checkInDate || isSearching}
                            className="w-full md:w-auto px-6 py-3 bg-[#088F8F] text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#066e6e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            <span>{isSearching ? "SEARCHING..." : "SEARCH"}</span>
                            {isSearching ? (
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
