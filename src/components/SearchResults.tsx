"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import LocaleLink from "./LocaleLink";
import { getLocaleFromPathname } from "@/lib/i18n";
import {
    Ship,
    Cabin,
    OperatorAvailability,
    AvailabilityResponse,
    fetchAllShips,
    fetchAllCabins,
    fetchCabinDetails,
    checkAvailability,
    getDirectImageUrl,
    isValidImageUrl,
    formatPrice,
    boatNamesMatch,
} from "@/lib/cabinApi";
import "@/styles/results.css";
import CabinCardCarousel from "./CabinCardCarousel";

// Sort options
const SORT_OPTIONS = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name A-Z" },
];

// Destination options (same as BookingBar)
const DESTINATIONS = [
    { id: "komodo", name: "Komodo National Park" },
    { id: "labuan-bajo", name: "Labuan Bajo" },
];

interface SearchCriteria {
    destinations?: string[];
    destinationName?: string;
    dateFrom?: string;
    dateTo?: string;
    guests?: number;
    tripDuration?: number;
    maxTripDuration?: number;
    structuredCabins?: StructuredCabin[];
}

interface ShipWithDetails extends Ship {
    startFromPrice: number;
    cabinCount: number;
    availableCabins: number;
    isAvailable: boolean;
    cabins: Cabin[];
}

interface ItineraryItem {
    cabin: string;
    ship: string;
    date: string;
    price: number;
    guests: number;
    addedAt?: number;
}

interface StructuredCabin {
    adults: number;
    children: number;
}

// Helper to format date as YYYY-MM-DD using local time
const toLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Generate evenly-spaced sample dates from a date range
const generateSampleDates = (dateFrom: string, dateTo?: string): string[] => {
    if (!dateTo || dateTo === dateFrom) {
        return [dateFrom];
    }

    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    const diffDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    // For ranges <= 7 days, check every day
    // For ranges > 7 days, sample every 3 days, max 10 samples
    const interval = diffDays <= 7 ? 1 : Math.max(3, Math.ceil(diffDays / 10));
    const samples: string[] = [];

    for (let i = 0; i <= diffDays; i += interval) {
        const sampleDate = new Date(start);
        sampleDate.setDate(start.getDate() + i);
        samples.push(toLocalDateString(sampleDate));
    }

    // Always include the last date if not already included
    const lastSample = samples[samples.length - 1];
    if (lastSample !== dateTo) {
        samples.push(dateTo);
    }

    return samples;
};

// Aggregate availability data from multiple API responses
const aggregateAvailability = (responses: AvailabilityResponse[]): Map<string, OperatorAvailability> => {
    const operatorMap = new Map<string, OperatorAvailability>();

    responses.forEach(response => {
        if (!response?.data?.operators) return;

        response.data.operators.forEach((op: OperatorAvailability) => {
            const key = op.operator.toUpperCase();

            if (operatorMap.has(key)) {
                // Aggregate: sum the totals
                const existing = operatorMap.get(key)!;
                existing.total += op.total;

                // Merge cabin data (sum availability for matching cabins)
                if (op.cabins && existing.cabins) {
                    op.cabins.forEach(newCabin => {
                        const existingCabin = existing.cabins!.find(c => c.name === newCabin.name);
                        if (existingCabin) {
                            existingCabin.available += newCabin.available;
                        } else {
                            existing.cabins!.push({ ...newCabin });
                        }
                    });
                }
            } else {
                // New operator: deep copy
                operatorMap.set(key, {
                    operator: op.operator,
                    total: op.total,
                    cabins: op.cabins ? op.cabins.map(c => ({ ...c })) : []
                });
            }
        });
    });

    return operatorMap;
};

// Helper to create dynamic ship from operator availability
const createDynamicShipFromAvailability = (op: OperatorAvailability): ShipWithDetails => {
    // Map availability API cabins to Cabin type
    const dynamicCabins: Cabin[] = (op.cabins || []).map(apiCabin => ({
        cabin_id: `${op.operator}-${apiCabin.name}`.replace(/\s+/g, '-'),
        cabin_name: apiCabin.name,
        boat_name: op.operator,
        price: 0, // Price not available in availability API
        image_main: "/placeholder-cabin.jpg",
        images: [],
        description: `${apiCabin.available} cabins available`,
        max_guests: 2,
        facilities: []
    }));

    return {
        name: op.operator,
        image_main: "/placeholder-boat.svg",
        images: [],
        trip: "3",
        description: `Available liveaboard operator with ${op.total} cabins available.`,
        startFromPrice: 0,
        cabinCount: op.cabins?.length || 0,
        availableCabins: op.total,
        isAvailable: true,
        cabins: dynamicCabins,
    };
};

// Helper to fetch and aggregate availability for a date range
const fetchAndAggregateAvailability = async (dateFrom: string, dateTo?: string): Promise<Map<string, OperatorAvailability>> => {
    try {
        // Generate sample dates (single date or range)
        const sampleDates = generateSampleDates(dateFrom, dateTo);
        console.log(`Checking availability for ${sampleDates.length} date(s):`, sampleDates);

        // Fetch availability for all sample dates in parallel
        const availabilityPromises = sampleDates.map(date =>
            checkAvailability(date).catch(err => {
                console.warn(`Failed to fetch availability for ${date}:`, err);
                return null;
            })
        );

        const availabilityResponses = await Promise.all(availabilityPromises);
        const validResponses = availabilityResponses.filter(r => r !== null) as AvailabilityResponse[];

        // Aggregate availability from all dates
        if (validResponses.length > 0) {
            const aggregated = aggregateAvailability(validResponses);
            console.log(`Aggregated ${aggregated.size} operators from ${validResponses.length} dates`);
            return aggregated;
        }
    } catch (err) {
        console.warn("Could not fetch availability:", err);
    }

    return new Map<string, OperatorAvailability>();
};

export default function SearchResults() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // State
    const [loading, setLoading] = useState(true);
    const [ships, setShips] = useState<ShipWithDetails[]>([]);
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({});
    const [sortBy, setSortBy] = useState("recommended");
    const [openSortBy, setOpenSortBy] = useState(false);
    const [totalAvailableCabins, setTotalAvailableCabins] = useState(0);
    const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);

    // Sidebar form state
    const [formDestinations, setFormDestinations] = useState<string[]>([]);
    const [formDateFrom, setFormDateFrom] = useState<string>("");
    const [formDateTo, setFormDateTo] = useState<string>("");
    const [formTripDuration, setFormTripDuration] = useState<number>(3);
    const [formMaxTripDuration, setFormMaxTripDuration] = useState<number>(10);
    const [formGuests, setFormGuests] = useState<number>(2);

    // Guest Selector State (Flexible vs Structured)
    const [guestMode, setGuestMode] = useState<'flexible' | 'structured'>('structured');
    const [structuredCabins, setStructuredCabins] = useState<StructuredCabin[]>([{ adults: 2, children: 0 }]);
    const [expandedCabinIndex, setExpandedCabinIndex] = useState<number | null>(0); // Auto-expand first cabin

    // Sidebar dropdown states
    const [showDestDropdown, setShowDestDropdown] = useState(false);
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showDurationDropdown, setShowDurationDropdown] = useState(false);
    const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

    // Calendar state for date picker
    const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
    const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

    // Refs
    const sortDropdownRef = useRef<HTMLDivElement>(null);
    const destDropdownRef = useRef<HTMLDivElement>(null);
    const dateDropdownRef = useRef<HTMLDivElement>(null);
    const durationDropdownRef = useRef<HTMLDivElement>(null);
    const guestsDropdownRef = useRef<HTMLDivElement>(null);

    // State for View Dates dropdown - tracks which ship's dates are open
    const [openDatesShip, setOpenDatesShip] = useState<string | null>(null);
    const datesDropdownRef = useRef<HTMLDivElement>(null);

    // State for viewing cabins of a selected ship (tab-like navigation)
    const [selectedShipForCabins, setSelectedShipForCabins] = useState<string | null>(searchParams.get('ship'));

    // State for cabin dates dropdown - tracks which cabin's dates are open
    const [openCabinDates, setOpenCabinDates] = useState<string | null>(null);
    const cabinDatesDropdownRef = useRef<HTMLDivElement>(null);

    // Cache for cabin images (fetched from detail endpoint)
    const [cabinImagesCache, setCabinImagesCache] = useState<Record<string, string[]>>({});

    // Update URL when selectedShipForCabins changes
    const updateShipQueryParam = (shipName: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (shipName) {
            params.set('ship', shipName);
        } else {
            params.delete('ship');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };



    // Details Modal State
    const [selectedCabinForDetail, setSelectedCabinForDetail] = useState<Cabin | null>(null);
    const [modalImageIndex, setModalImageIndex] = useState(0);


    // Load ships, cabins, and availability from real API
    useEffect(() => {
        async function loadData() {
            try {
                // Load search criteria from localStorage
                const storedCriteria = localStorage.getItem("togean_search_criteria");
                let criteria: SearchCriteria = {};
                if (storedCriteria) {
                    criteria = JSON.parse(storedCriteria);
                    setSearchCriteria(criteria);
                }

                // Fetch ships and cabins in parallel
                const [shipsData, cabinsData] = await Promise.all([
                    fetchAllShips(),
                    fetchAllCabins(),
                ]);

                // Check availability for the selected date(s)
                let availableOperators: Map<string, OperatorAvailability> = new Map();

                if (criteria.dateFrom) {
                    availableOperators = await fetchAndAggregateAvailability(criteria.dateFrom, criteria.dateTo);
                }

                // Build a map of available operators from availability API (already aggregated above)

                // Map cabins to ships and check availability
                const shipsWithDetails: ShipWithDetails[] = shipsData.map((ship) => {
                    // Find cabins that belong to this ship
                    const shipCabins = cabinsData.filter(
                        (cabin) => boatNamesMatch(cabin.boat_name, ship.name)
                    );

                    // Calculate lowest price from cabins
                    const validPrices = shipCabins
                        .map((c) => c.price)
                        .filter((p) => p > 0);
                    const startFromPrice = validPrices.length > 0
                        ? Math.min(...validPrices)
                        : 0;

                    // Check if this ship is available on the selected date
                    let isAvailable = false;
                    let availableCabins = 0;

                    // Find matching operator in availability data
                    for (const [opName, opData] of availableOperators) {
                        if (boatNamesMatch(opName, ship.name)) {
                            isAvailable = opData.total > 0;
                            availableCabins = opData.total;
                            break;
                        }
                    }

                    return {
                        ...ship,
                        startFromPrice,
                        cabinCount: shipCabins.length,
                        availableCabins,
                        isAvailable,
                        cabins: shipCabins,
                    };
                });

                // Add dynamic ships for operators that don't have a ship entry
                availableOperators.forEach((op: OperatorAvailability) => {
                    // Check if this operator already matched a ship
                    const alreadyMatched = shipsWithDetails.some(ship =>
                        boatNamesMatch(ship.name, op.operator)
                    );

                    if (!alreadyMatched && op.total > 0) {
                        // Create a dynamic ship entry for this operator
                        const dynamicShip = createDynamicShipFromAvailability(op);
                        shipsWithDetails.push(dynamicShip);
                    }
                });


                // Filter only available ships if date was selected
                let filteredShips = shipsWithDetails;
                if (criteria.dateFrom) {
                    filteredShips = shipsWithDetails.filter((s) => s.isAvailable);
                }

                // Calculate total available cabins
                const total = filteredShips.reduce((sum, s) => sum + s.availableCabins, 0);
                setTotalAvailableCabins(total);

                setShips(filteredShips);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    // Load itinerary from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("togean_itinerary");
        if (stored) {
            try {
                setItineraryItems(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse itinerary:", e);
            }
        }
    }, []);

    // Initialize sidebar form from search criteria
    useEffect(() => {
        if (searchCriteria.destinations) {
            setFormDestinations(searchCriteria.destinations);
        }
        if (searchCriteria.dateFrom) {
            setFormDateFrom(searchCriteria.dateFrom);
        }
        if (searchCriteria.dateTo) {
            setFormDateTo(searchCriteria.dateTo);
        }
        if (searchCriteria.tripDuration) {
            setFormTripDuration(searchCriteria.tripDuration);
        }
        if (searchCriteria.maxTripDuration) {
            setFormMaxTripDuration(searchCriteria.maxTripDuration);
        }
        if (searchCriteria.guests) {
            setFormGuests(searchCriteria.guests);
        }
        // Initialize structuredCabins from stored configuration
        if (searchCriteria.structuredCabins && searchCriteria.structuredCabins.length > 0) {
            setStructuredCabins(searchCriteria.structuredCabins);
        }
    }, [searchCriteria]);

    // Sync total guests when structured cabins change
    useEffect(() => {
        if (guestMode === 'structured') {
            const total = structuredCabins.reduce((sum, cabin) => sum + cabin.adults + cabin.children, 0);
            setFormGuests(total);
        }
    }, [structuredCabins, guestMode]);

    // Fetch cabin images when viewing a ship's cabins
    useEffect(() => {
        if (!selectedShipForCabins) return;

        const ship = ships.find(s => s.name === selectedShipForCabins);
        if (!ship || !ship.cabins) return;

        // Fetch details for cabins that don't have images cached yet
        const cabinsToFetch = ship.cabins.filter(cabin => !cabinImagesCache[cabin.cabin_id]);
        if (cabinsToFetch.length === 0) return;

        // Fetch all cabin details in parallel
        Promise.all(
            cabinsToFetch.map(cabin => fetchCabinDetails(cabin.cabin_id))
        ).then(results => {
            const newCache: Record<string, string[]> = {};
            results.forEach((cabinDetail, idx) => {
                if (cabinDetail && cabinDetail.images && cabinDetail.images.length > 0) {
                    // Filter out invalid URLs (folders, empty, etc.)
                    const validImages = cabinDetail.images.filter(img => isValidImageUrl(img));
                    if (validImages.length > 0) {
                        newCache[cabinsToFetch[idx].cabin_id] = validImages;
                    }
                }
            });
            if (Object.keys(newCache).length > 0) {
                setCabinImagesCache(prev => ({ ...prev, ...newCache }));
            }
        }).catch(err => {
            console.warn('Error fetching cabin details:', err);
        });
    }, [selectedShipForCabins, ships]);

    // Helper functions for Structured Guest Selector
    const updateCabinGuests = (index: number, type: 'adults' | 'children', delta: number) => {
        setStructuredCabins(prev => prev.map((cabin, idx) => {
            if (idx !== index) return cabin;
            const newVal = cabin[type] + delta;
            // Limits: Min 1 adult per cabin, min 0 children. Max 4 total per cabin usually, but let's keep it simple
            if (type === 'adults' && newVal < 1) return cabin;
            if (type === 'children' && newVal < 0) return cabin;
            return { ...cabin, [type]: newVal };
        }));
    };

    const addCabin = () => {
        setStructuredCabins(prev => [...prev, { adults: 1, children: 0 }]);
        setExpandedCabinIndex(structuredCabins.length); // Expand the new cabin
    };

    const removeCabin = (index: number) => {
        if (structuredCabins.length <= 1) return;
        setStructuredCabins(prev => prev.filter((_, idx) => idx !== index));
        setExpandedCabinIndex(null);
    };

    const toggleCabinExpand = (index: number) => {
        setExpandedCabinIndex(prev => prev === index ? null : index);
    };

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
                setOpenSortBy(false);
            }
            if (destDropdownRef.current && !destDropdownRef.current.contains(e.target as Node)) {
                setShowDestDropdown(false);
            }
            if (dateDropdownRef.current && !dateDropdownRef.current.contains(e.target as Node)) {
                setShowDateDropdown(false);
            }
            if (durationDropdownRef.current && !durationDropdownRef.current.contains(e.target as Node)) {
                setShowDurationDropdown(false);
            }
            if (guestsDropdownRef.current && !guestsDropdownRef.current.contains(e.target as Node)) {
                setShowGuestsDropdown(false);
            }
            // Close View Dates dropdown for ships
            if (datesDropdownRef.current && !datesDropdownRef.current.contains(e.target as Node)) {
                setOpenDatesShip(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Sort ships
    const sortedShips = [...ships].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return (a.startFromPrice || Infinity) - (b.startFromPrice || Infinity);
            case "price-high":
                return (b.startFromPrice || 0) - (a.startFromPrice || 0);
            case "name":
                return a.name.localeCompare(b.name);
            default:
                // Recommended: sort by availability count then price
                if (a.availableCabins !== b.availableCabins) {
                    return b.availableCabins - a.availableCabins;
                }
                return (a.startFromPrice || Infinity) - (b.startFromPrice || Infinity);
        }
    });

    // Format trip nights
    const formatTripNights = (ship: Ship) => {
        const tripDays = parseInt(ship.trip, 10) || 3;
        return tripDays - 1;
    };

    // Gallery helpers for cabin images
    const getCabinGalleryImages = (cabin: Cabin): string[] => {
        // Check cache first (fetched from detail endpoint)
        const cachedImages = cabinImagesCache[cabin.cabin_id];
        if (cachedImages && cachedImages.length > 0) {
            return cachedImages;
        }

        // Fallback to data from list endpoint
        const images: string[] = [];

        // 1. Start with cabin's main image
        if (cabin.image_main) images.push(cabin.image_main);

        // 2. Add cabin specific extra images from API (if available)
        if (cabin.images && cabin.images.length > 0) {
            images.push(...cabin.images.filter(img => img && img !== cabin.image_main));
        }

        return images.length > 0 ? images : ["/placeholder-cabin.jpg"];
    };





    // Modal Handlers
    const openCabinDetail = (cabin: Cabin) => {
        setSelectedCabinForDetail(cabin);
        setModalImageIndex(0); // Reset gallery
        document.body.style.overflow = 'hidden'; // Prevent scrolling bg
    };

    const closeCabinDetail = () => {
        setSelectedCabinForDetail(null);
        document.body.style.overflow = '';
    };

    const nextModalImage = () => {
        if (!selectedCabinForDetail) return;
        const images = getCabinGalleryImages(selectedCabinForDetail);
        setModalImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevModalImage = () => {
        if (!selectedCabinForDetail) return;
        const images = getCabinGalleryImages(selectedCabinForDetail);
        setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const getModalCurrentImage = () => {
        if (!selectedCabinForDetail) return "";
        const images = getCabinGalleryImages(selectedCabinForDetail);
        return images[modalImageIndex] || images[0];
    };

    // Handle View Dates - show cabins tab for the selected ship
    const handleViewDates = (shipName: string) => {
        setSelectedShipForCabins(shipName);
        updateShipQueryParam(shipName);
        setOpenDatesShip(null);
    };

    // Handle View Cabins - show cabins tab for the selected ship
    const handleViewCabins = (shipName: string) => {
        setSelectedShipForCabins(shipName);
        updateShipQueryParam(shipName);
    };

    // Handle back to ships list
    const handleBackToShips = () => {
        setSelectedShipForCabins(null);
        updateShipQueryParam(null);
    };

    // Check if cabin is already in itinerary
    const isCabinInItinerary = (cabinName: string, shipName: string, date: string) => {
        return itineraryItems.some(it =>
            it.cabin === cabinName &&
            it.ship === shipName &&
            it.date === date
        );
    };

    // Handle data Add/Remove from Itinerary
    const toggleItinerary = (cabin: Cabin, shipName: string) => {
        const ship = ships.find(s => s.name === shipName);
        if (ship) {
            const date = searchCriteria.dateFrom || toLocalDateString(new Date());
            const newItem: ItineraryItem = {
                cabin: cabin.cabin_name,
                ship: ship.name,
                date: date,
                price: cabin.price || ship.startFromPrice,
                guests: searchCriteria.guests || 2,
                addedAt: Date.now()
            };

            // Check if already exists
            const exists = itineraryItems.some(it =>
                it.cabin === newItem.cabin &&
                it.ship === newItem.ship &&
                it.date === newItem.date
            );

            if (exists) {
                // Remove if exists
                const updatedItems = itineraryItems.filter(it =>
                    !(it.cabin === newItem.cabin && it.ship === newItem.ship && it.date === newItem.date)
                );
                setItineraryItems(updatedItems);
                localStorage.setItem("togean_itinerary", JSON.stringify(updatedItems));
            } else {
                // Add if not exists
                const updatedItems = [...itineraryItems, newItem];
                setItineraryItems(updatedItems);
                localStorage.setItem("togean_itinerary", JSON.stringify(updatedItems));
            }
        }
    };

    const removeFromItinerary = (index: number) => {
        const updatedItems = itineraryItems.filter((_, i) => i !== index);
        setItineraryItems(updatedItems);
        localStorage.setItem("togean_itinerary", JSON.stringify(updatedItems));
    };

    const handleEnquireNow = () => {
        router.push("/reservation");
    };

    // Calculate total price
    const itineraryTotal = itineraryItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

    // Get the selected ship object
    const getSelectedShip = (): ShipWithDetails | null => {
        if (!selectedShipForCabins) return null;
        return ships.find(s => s.name === selectedShipForCabins) || null;
    };

    // Generate available dates for ship (based on availability data)
    const getAvailableDatesForShip = (shipName: string): string[] => {
        const ship = ships.find(s => s.name === shipName);
        if (!ship) return [];

        // Generate available dates from today + 7 days onwards
        const dates: string[] = [];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 7); // Start from 1 week from now

        // Generate dates based on availability count
        const availableCount = ship.availableCabins || 1;
        for (let i = 0; i < Math.min(availableCount, 8); i++) {
            const nextDate = new Date(startDate);
            nextDate.setDate(startDate.getDate() + (i * 7)); // Weekly intervals
            dates.push(toLocalDateString(nextDate));
        }

        return dates;
    };

    // Format date for display
    const formatDateDisplay = (dateStr?: string) => {
        if (!dateStr) return "Select date";
        // Parse "YYYY-MM-DD" manually to avoid timezone issues
        const parts = dateStr.split('-');
        if (parts.length !== 3) return dateStr;

        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);

        const date = new Date(year, month, day);

        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    // Generate calendar days for sidebar date picker
    const generateCalendarDays = (year: number, month: number): (Date | null)[] => {
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
    };

    const calendarDays = generateCalendarDays(calendarYear, calendarMonth);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Toggle destination in form
    const toggleFormDestination = (destId: string) => {
        setFormDestinations(prev =>
            prev.includes(destId)
                ? prev.filter(d => d !== destId)
                : [...prev, destId]
        );
    };

    // Handle date click in calendar
    const handleCalendarDateClick = (date: Date) => {
        const dateStr = toLocalDateString(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) return;

        if (!formDateFrom || (formDateFrom && formDateTo)) {
            setFormDateFrom(dateStr);
            setFormDateTo("");
        } else {
            if (dateStr < formDateFrom) {
                setFormDateTo(formDateFrom);
                setFormDateFrom(dateStr);
            } else {
                setFormDateTo(dateStr);
            }
        }
    };

    // Check if date is in selected range
    const isDateInRange = (date: Date): boolean => {
        if (!formDateFrom || !formDateTo) return false;
        const dateStr = toLocalDateString(date);
        return dateStr >= formDateFrom && dateStr <= formDateTo;
    };

    // Get display text for selected destinations
    const getDestinationDisplayText = (): string => {
        if (formDestinations.length === 0) return "All Destinations";
        return formDestinations
            .map(id => DESTINATIONS.find(d => d.id === id)?.name)
            .filter(Boolean)
            .join(", ");
    };

    // Handle Modify Search - refresh results with new criteria
    const handleModifySearch = async () => {
        setLoading(true);

        // Build new criteria
        const newCriteria: SearchCriteria = {
            destinations: formDestinations.length > 0 ? formDestinations : undefined,
            destinationName: getDestinationDisplayText(),
            dateFrom: formDateFrom || undefined,
            dateTo: formDateTo || undefined,
            tripDuration: formTripDuration,
            maxTripDuration: formMaxTripDuration,
            guests: formGuests,
        };

        // Save to localStorage
        localStorage.setItem("togean_search_criteria", JSON.stringify(newCriteria));
        setSearchCriteria(newCriteria);

        try {
            // Re-fetch data with new criteria
            const [shipsData, cabinsData] = await Promise.all([
                fetchAllShips(),
                fetchAllCabins(),
            ]);

            let availableOperators: Map<string, OperatorAvailability> = new Map();

            if (newCriteria.dateFrom) {
                availableOperators = await fetchAndAggregateAvailability(newCriteria.dateFrom, newCriteria.dateTo);
            }

            const shipsWithDetails: ShipWithDetails[] = shipsData.map((ship) => {
                const shipCabins = cabinsData.filter(
                    (cabin) => boatNamesMatch(cabin.boat_name, ship.name)
                );
                const validPrices = shipCabins.map((c) => c.price).filter((p) => p > 0);
                const startFromPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;

                let isAvailable = false;
                let availableCabins = 0;
                for (const [opName, opData] of availableOperators) {
                    if (boatNamesMatch(opName, ship.name)) {
                        isAvailable = opData.total > 0;
                        availableCabins = opData.total;
                        break;
                    }
                }

                return {
                    ...ship,
                    startFromPrice,
                    cabinCount: shipCabins.length,
                    availableCabins,
                    isAvailable,
                    cabins: shipCabins,
                };
            });

            // Add dynamic ships for operators that don't have a ship entry
            availableOperators.forEach((op: OperatorAvailability) => {
                // Check if this operator already matched a ship
                const alreadyMatched = shipsWithDetails.some(ship =>
                    boatNamesMatch(ship.name, op.operator)
                );

                if (!alreadyMatched && op.total > 0) {
                    // Create a dynamic ship entry for this operator
                    const dynamicShip = createDynamicShipFromAvailability(op);
                    shipsWithDetails.push(dynamicShip);
                }
            });


            let filteredShips = shipsWithDetails;
            if (newCriteria.dateFrom) {
                // Always filter by availability based on dateFrom
                // Even for date ranges, we use the start date's availability as baseline
                filteredShips = shipsWithDetails.filter((s) => s.isAvailable);
            }

            const total = filteredShips.reduce((sum, s) => sum + s.availableCabins, 0);
            setTotalAvailableCabins(total);
            setShips(filteredShips);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Get price symbol and value
    const getPriceSymbol = (priceStr: string) => {
        return priceStr.replace(/[0-9,.\s]/g, "").trim() || "Rp";
    };

    const getPriceVal = (priceStr: string) => {
        return priceStr.replace(/[^0-9,.\s]/g, "").trim();
    };

    // Gallery helpers for ship images
    const getShipGalleryImages = (ship: ShipWithDetails): string[] => {
        const images: string[] = [];
        if (ship.image_main) images.push(ship.image_main);
        if (ship.images && ship.images.length > 0) {
            images.push(...ship.images.filter(img => img !== ship.image_main));
        }
        return images.length > 0 ? images : ["/placeholder-boat.svg"];
    };




    return (
        <div className="results-wrap">
            <div className="results-container">
                {loading ? (
                    /* Skeleton Loading State */
                    <div className="results-layout">
                        <div className="results-main">
                            <div className="ship-selection-container">
                                <div className="ship-selection-header">
                                    <div className="skeleton-ship-title" style={{ width: "200px" }} />
                                    <div className="skeleton-ship-desc" style={{ width: "300px", marginTop: "0.5rem" }} />
                                </div>
                                <div className="ship-cards-container">
                                    {[1, 2, 3].map((n) => (
                                        <div key={n} className="ship-card-horizontal skeleton-card">
                                            <div className="ship-card-media">
                                                <div className="skeleton-ship-image" />
                                            </div>
                                            <div className="ship-card-details">
                                                <div className="skeleton-ship-title" />
                                                <div className="skeleton-ship-desc" />
                                                <div className="skeleton-ship-desc short" />
                                                <div className="skeleton-ship-price" style={{ marginTop: "auto" }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="results-layout">
                        {/* Main Content */}
                        <div className="results-main">
                            {/* Back to Homepage Button */}
                            <div className="mb-4">
                                <LocaleLink
                                    href="/"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-[#088F8F] transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Homepage
                                </LocaleLink>
                            </div>

                            <h2 className="results-title" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a', fontSize: '2rem', marginBottom: '0.5rem' }}>Select a Ship</h2>

                            <div className="results-intro">
                                {sortedShips.length > 0 ? (
                                    <p style={{ color: '#666', fontSize: '1rem', marginTop: 0 }}>
                                        You selected <strong style={{ color: '#088F8F' }}>{sortedShips.length} ships</strong>. Please choose one to view available cabins.
                                    </p>
                                ) : (
                                    <div className="success-message" style={{ borderLeftColor: "#f59e0b", background: "#fffbeb" }}>
                                        <p>
                                            <strong style={{ color: "#b45309" }}>No boats available for this date.</strong>{" "}
                                            Please try selecting a different date or contact our team for assistance.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Controls Bar */}
                            <div className="results-controls">
                                <div className="results-controls-left">
                                    <div className="sort-dropdown" ref={sortDropdownRef}>
                                        <span className="sort-label">SORT BY</span>
                                        <button
                                            type="button"
                                            className="sort-btn"
                                            onClick={() => setOpenSortBy(!openSortBy)}
                                        >
                                            <span>
                                                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label || "Recommended"}
                                            </span>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points={openSortBy ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                                            </svg>
                                        </button>

                                        {openSortBy && (
                                            <div className="sort-dropdown-panel">
                                                {SORT_OPTIONS.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        className={`sort-option ${sortBy === option.value ? "active" : ""}`}
                                                        onClick={() => {
                                                            setSortBy(option.value);
                                                            setOpenSortBy(false);
                                                        }}
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="results-controls-right">
                                    <span className="results-count">
                                        {totalAvailableCabins} {totalAvailableCabins === 1 ? "Cabin" : "Cabins"} Available
                                    </span>
                                </div>
                            </div>

                            {/* Ship Cards - Only show when NOT viewing cabins */}
                            {!selectedShipForCabins && sortedShips.length > 0 && (
                                <div className="ship-selection-container">
                                    <div className="ship-cards-container">
                                        {sortedShips.map((ship) => (
                                            <div key={ship.name} className="ship-card-horizontal">
                                                {/* Left: Image Section */}
                                                <div className="ship-card-media group">
                                                    <div className="absolute inset-0 z-0">
                                                        <CabinCardCarousel
                                                            images={getShipGalleryImages(ship)}
                                                            altText={ship.name}
                                                        />
                                                    </div>
                                                    <div className="gradient-overlay z-10 pointer-events-none" />
                                                    <div className="nights-badge-overlay z-10">
                                                        {formatTripNights(ship)} Nights
                                                    </div>
                                                    <h3 className="title-overlay z-10">{ship.name}</h3>
                                                </div>

                                                {/* Right: Details Section */}
                                                <div className="ship-card-details">
                                                    {/* Header Row */}
                                                    <div className="details-header">
                                                        <div className="ship-name-row">
                                                            <svg className="ship-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                                <path d="M3 15h18l-1.5 6h-15L3 15z" />
                                                                <rect x="5" y="8" width="14" height="7" rx="1" />
                                                                <path d="M8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" />
                                                            </svg>
                                                            <span className="ship-name-text">{ship.name}</span>
                                                            <span className="rating-stars">★★★★★</span>
                                                            <span className="rating-value">4.8</span>
                                                        </div>
                                                    </div>

                                                    {/* Itinerary Info */}
                                                    <div className="itinerary-info">
                                                        <p className="info-line">
                                                            <span className="info-label">DESTINATION:</span>
                                                            <span className="info-value">
                                                                {searchCriteria.destinationName || "Komodo National Park"}
                                                            </span>
                                                        </p>
                                                        <p className="info-line">
                                                            <span className="info-label">AVAILABLE CABINS:</span>
                                                            <span className="info-value" style={{ color: "#088F8F", fontWeight: 600 }}>
                                                                {ship.availableCabins} cabins available
                                                            </span>
                                                        </p>
                                                    </div>

                                                    {/* Divider */}
                                                    <div className="card-divider" />

                                                    {/* Footer: Price & Actions */}
                                                    <div className="details-footer">
                                                        <div className="price-section">
                                                            <span className="price-label">STARTING FROM*</span>
                                                            <div className="price-container">
                                                                {ship.startFromPrice > 0 ? (
                                                                    <>
                                                                        <sup className="currency-symbol">
                                                                            {getPriceSymbol(formatPrice(ship.startFromPrice))}
                                                                        </sup>
                                                                        <span className="price-amount-value">
                                                                            {getPriceVal(formatPrice(ship.startFromPrice))}
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span className="price-amount-value" style={{ fontSize: "1rem" }}>
                                                                        Contact for price
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {ship.startFromPrice > 0 && (
                                                                <span className="price-disclaimer">Per person, taxes included</span>
                                                            )}
                                                        </div>

                                                        <div className="actions-section" style={{ position: "relative" }}>
                                                            <button
                                                                className="btn-view-cabins"
                                                                onClick={() => handleViewCabins(ship.name)}
                                                            >
                                                                View {ship.availableCabins} Cabins
                                                            </button>
                                                            <button
                                                                className="btn-view-cabins"
                                                                onClick={() => handleViewCabins(ship.name)}
                                                            >
                                                                View Cabins
                                                            </button>

                                                            {/* Dates Dropdown */}
                                                            {openDatesShip === ship.name && (
                                                                <div
                                                                    className="dates-dropdown-panel"
                                                                    ref={datesDropdownRef}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <div className="dates-dropdown-title">Available Departure Dates</div>
                                                                    <div className="dates-list">
                                                                        {getAvailableDatesForShip(ship.name).map((date, idx) => (
                                                                            <button
                                                                                key={idx}
                                                                                className="date-option"
                                                                                onClick={() => {
                                                                                    setSelectedShipForCabins(ship.name);
                                                                                    updateShipQueryParam(ship.name);
                                                                                    setOpenDatesShip(null);
                                                                                }}
                                                                            >
                                                                                <span className="date-text">
                                                                                    {new Date(date).toLocaleDateString("en-US", {
                                                                                        weekday: "short",
                                                                                        month: "short",
                                                                                        day: "numeric",
                                                                                        year: "numeric"
                                                                                    })}
                                                                                </span>
                                                                                <span className="date-availability">Available</span>
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                    <button
                                                                        className="dates-close-btn"
                                                                        onClick={() => setOpenDatesShip(null)}
                                                                    >
                                                                        Close
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ===== CABIN TAB VIEW ===== */}
                            {selectedShipForCabins && getSelectedShip() && (
                                <div className="cabin-tab-view">
                                    {/* Back to Ships Bar */}
                                    <div className="back-to-ships-bar">
                                        <button className="btn-back-ships" onClick={handleBackToShips}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="15 18 9 12 15 6" />
                                            </svg>
                                            Back to Ships
                                        </button>
                                        <span className="viewing-ship-label">
                                            Viewing: <strong>{selectedShipForCabins}</strong>
                                        </span>
                                    </div>

                                    {/* Cabins List */}
                                    <div className="cabin-results-section">
                                        <div className="cabin-results-header">
                                            <h3 className="cabin-results-title">Available Cabins</h3>
                                            <span className="cabin-results-count">
                                                {getSelectedShip()?.cabins.length || 0} Cabins
                                            </span>
                                        </div>

                                        <div className="cabin-cards-list">
                                            {getSelectedShip()?.cabins.map((cabin, idx) => (
                                                <div key={idx} className="cabin-card-wrapper">
                                                    {/* TOP SECTION: Grid of Image + Details */}
                                                    <div className="cabin-card-body">
                                                        <div className="cabin-card-image">
                                                            <CabinCardCarousel
                                                                images={getCabinGalleryImages(cabin)}
                                                                altText={cabin.cabin_name}
                                                                onImageClick={() => openCabinDetail(cabin)}
                                                            />
                                                        </div>

                                                        <div className="cabin-card-content-top">
                                                            <h4 className="cabin-title">{cabin.cabin_name}</h4>
                                                            <span className="cabin-type-badge">
                                                                {cabin.cabin_name.toUpperCase().includes("MASTER") ? "MASTER SUITE" :
                                                                    cabin.cabin_name.toUpperCase().includes("SUITE") ? "SUITE" : "DELUXE"}
                                                            </span>

                                                            <div className="cabin-specs">
                                                                <span>Sleeps {cabin.total_capacity || 2}</span>
                                                                <span className="specs-divider">|</span>
                                                                <span>{cabin.facilities?.large_bed ? "Double Bed" : "Twin Beds"}</span>
                                                            </div>

                                                            <div className="cabin-features">
                                                                <ul className="features-list">
                                                                    {cabin.facilities?.balcony ? <li>Private Balcony</li> : <li>Shared Deck</li>}
                                                                    {cabin.facilities?.seaview ? <li>Ocean View</li> : <li>Standard View</li>}
                                                                    <li>Private Bathroom</li>
                                                                    <li>Hot Water</li>
                                                                    <li>Daily Housekeeping</li>
                                                                    <li>Air Conditioning</li>
                                                                </ul>
                                                            </div>

                                                            <button
                                                                className="cabin-details-btn"
                                                                onClick={() => openCabinDetail(cabin)}
                                                            >
                                                                CABIN DETAILS
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* BOTTOM SECTION: Full Width Dates + Footer */}
                                                    <div className="cabin-card-bottom">
                                                        <div className="cabin-date-row">
                                                            <span className="cabin-date-text">
                                                                {formatDateDisplay(searchCriteria.dateFrom)} - {formatDateDisplay(searchCriteria.dateTo || searchCriteria.dateFrom)}
                                                            </span>
                                                            <span className="cabin-availability-badge">1 cabin</span>
                                                        </div>

                                                        {/* Dates Dropdown for Cabin - Moved above footer to push buttons down */}
                                                        {openCabinDates === cabin.cabin_id && (
                                                            <div
                                                                className="more-dates-dropdown"
                                                                ref={cabinDatesDropdownRef}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                {getAvailableDatesForShip(selectedShipForCabins!).slice(0, 3).map((date, dateIdx) => {
                                                                    // Calculate date range (assuming 2-night trips)
                                                                    const startDate = new Date(date);
                                                                    const endDate = new Date(date);
                                                                    endDate.setDate(endDate.getDate() + 2);

                                                                    const isReserved = date === searchCriteria.dateFrom;

                                                                    return (
                                                                        <div
                                                                            key={dateIdx}
                                                                            className={`trip-option-alt ${isReserved ? 'trip-reserved' : ''}`}
                                                                        >
                                                                            <div className="trip-alt-info">
                                                                                <span className="trip-alt-date">
                                                                                    {startDate.toLocaleDateString("en-US", {
                                                                                        month: 'short',
                                                                                        day: 'numeric',
                                                                                        year: 'numeric'
                                                                                    })} - {endDate.toLocaleDateString("en-US", {
                                                                                        month: 'short',
                                                                                        day: 'numeric',
                                                                                        year: 'numeric'
                                                                                    })}
                                                                                </span>
                                                                                <span className="trip-alt-rooms">1 cabin</span>
                                                                            </div>

                                                                            {isReserved ? (
                                                                                <span className="trip-reserved-label">
                                                                                    <span className="reserved-check-small">✓</span>
                                                                                    RESERVED
                                                                                </span>
                                                                            ) : (
                                                                                <button
                                                                                    className="trip-select-action"
                                                                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                                                                    onClick={() => {
                                                                                        // Update search criteria with selected date
                                                                                        const newCriteria = {
                                                                                            ...searchCriteria,
                                                                                            dateFrom: date,
                                                                                            dateTo: undefined
                                                                                        };
                                                                                        setSearchCriteria(newCriteria);
                                                                                        localStorage.setItem("togean_search_criteria", JSON.stringify(newCriteria));

                                                                                        // Add to itinerary with selected date
                                                                                        toggleItinerary(cabin, selectedShipForCabins!);

                                                                                        // Close dropdown
                                                                                        setOpenCabinDates(null);
                                                                                    }}
                                                                                >
                                                                                    SELECT
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}

                                                                {/* LESS DATES Button */}
                                                                <button
                                                                    className="less-dates-toggle"
                                                                    onClick={() => setOpenCabinDates(null)}
                                                                >
                                                                    <span>LESS DATES</span>
                                                                    <span className="toggle-arrow expanded">▼</span>
                                                                </button>
                                                            </div>
                                                        )}

                                                        <div className="cabin-footer">
                                                            <div className="cabin-price-info">
                                                                <span className="cabin-price-label">FROM</span>
                                                                <span className="cabin-price-value">
                                                                    {formatPrice(cabin.price || getSelectedShip()?.startFromPrice || 0)}
                                                                </span>
                                                                <span className="cabin-price-note">per person, per night</span>
                                                            </div>
                                                            <div className="cabin-action-buttons" style={{ display: 'flex', gap: '8px', position: 'relative' }}>
                                                                <button
                                                                    className="btn-more-dates"
                                                                    onClick={() => setOpenCabinDates(openCabinDates === cabin.cabin_id ? null : cabin.cabin_id)}
                                                                    style={{
                                                                        backgroundColor: '#fff',
                                                                        color: '#088F8F',
                                                                        border: '2px solid #088F8F',
                                                                        padding: '12px 20px',
                                                                        borderRadius: '4px',
                                                                        fontWeight: '600',
                                                                        cursor: 'pointer',
                                                                        fontSize: '0.9rem',
                                                                        transition: 'all 0.3s ease',
                                                                        whiteSpace: 'nowrap'
                                                                    }}
                                                                >
                                                                    MORE DATES
                                                                </button>
                                                                <button
                                                                    className={`btn-reserve-now ${isCabinInItinerary(cabin.cabin_name, selectedShipForCabins!, searchCriteria.dateFrom || toLocalDateString(new Date())) ? "btn-reserved" : ""}`}
                                                                    onClick={() => toggleItinerary(cabin, selectedShipForCabins!)}
                                                                >
                                                                    {isCabinInItinerary(cabin.cabin_name, selectedShipForCabins!, searchCriteria.dateFrom || toLocalDateString(new Date())) ? (
                                                                        <>
                                                                            <span className="reserved-check">
                                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ verticalAlign: 'text-bottom' }}>
                                                                                    <polyline points="20 6 9 17 4 12" />
                                                                                </svg>
                                                                            </span>
                                                                            RESERVED
                                                                        </>
                                                                    ) : (
                                                                        "RESERVE NOW"
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="sidebar-section-wrapper">
                            <div className="check-availability-section">
                                <h3 className="sidebar-section-title">Check Availability</h3>

                                {/* Destination Dropdown */}
                                <div className="sidebar-group" ref={destDropdownRef}>
                                    <span className="sidebar-label">Destinations</span>
                                    <div
                                        className="sidebar-value sidebar-clickable"
                                        onClick={() => setShowDestDropdown(!showDestDropdown)}
                                    >
                                        <span>Destinations: {formDestinations.length}</span>
                                        <svg className="sidebar-chevron" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        </svg>
                                    </div>
                                    {showDestDropdown && (
                                        <div className="sidebar-dropdown-panel">
                                            {DESTINATIONS.map(dest => (
                                                <label key={dest.id} className="sidebar-checkbox-item">
                                                    <input
                                                        type="checkbox"
                                                        checked={formDestinations.includes(dest.id)}
                                                        onChange={() => toggleFormDestination(dest.id)}
                                                    />
                                                    <span>{dest.name}</span>
                                                </label>
                                            ))}
                                            <button className="sidebar-done-btn" onClick={() => setShowDestDropdown(false)}>
                                                Done
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Date Picker Dropdown */}
                                <div className="sidebar-group" ref={dateDropdownRef}>
                                    <span className="sidebar-label">Dates</span>
                                    <div
                                        className="sidebar-value sidebar-clickable"
                                        onClick={() => setShowDateDropdown(!showDateDropdown)}
                                    >
                                        <span>
                                            {formDateFrom
                                                ? (formDateTo
                                                    ? `${formDateFrom} → ${formDateTo}`
                                                    : formDateFrom)
                                                : "Select dates"}
                                        </span>
                                        <svg className="sidebar-chevron" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        </svg>
                                    </div>
                                    {showDateDropdown && (
                                        <div className="sidebar-dropdown-panel sidebar-calendar-panel">
                                            <div className="sidebar-calendar-header">
                                                <button
                                                    className="sidebar-cal-nav"
                                                    onClick={() => {
                                                        if (calendarMonth === 0) {
                                                            setCalendarMonth(11);
                                                            setCalendarYear(calendarYear - 1);
                                                        } else {
                                                            setCalendarMonth(calendarMonth - 1);
                                                        }
                                                    }}
                                                >
                                                    ←
                                                </button>
                                                <span className="sidebar-cal-month">{monthNames[calendarMonth]} {calendarYear}</span>
                                                <button
                                                    className="sidebar-cal-nav"
                                                    onClick={() => {
                                                        if (calendarMonth === 11) {
                                                            setCalendarMonth(0);
                                                            setCalendarYear(calendarYear + 1);
                                                        } else {
                                                            setCalendarMonth(calendarMonth + 1);
                                                        }
                                                    }}
                                                >
                                                    →
                                                </button>
                                            </div>
                                            <div className="sidebar-calendar-weekdays">
                                                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(day => (
                                                    <span key={day} className="sidebar-cal-weekday">{day}</span>
                                                ))}
                                            </div>
                                            <div className="sidebar-calendar-days">
                                                {calendarDays.map((day, idx) => {
                                                    if (!day) return <span key={idx} className="sidebar-cal-day empty" />;
                                                    const dateStr = toLocalDateString(day);
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0);
                                                    const isPast = day < today;
                                                    const isSelected = dateStr === formDateFrom || dateStr === formDateTo;
                                                    const inRange = isDateInRange(day);
                                                    return (
                                                        <button
                                                            key={idx}
                                                            className={`sidebar-cal-day ${isPast ? "past" : ""} ${isSelected ? "selected" : ""} ${inRange ? "in-range" : ""}`}
                                                            onClick={() => !isPast && handleCalendarDateClick(day)}
                                                            disabled={isPast}
                                                        >
                                                            {day.getDate()}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <button className="sidebar-done-btn" onClick={() => setShowDateDropdown(false)}>
                                                Done
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Trip Duration Dropdown */}
                                <div className="sidebar-group" ref={durationDropdownRef}>
                                    <span className="sidebar-label">Trip Duration</span>
                                    <div
                                        className="sidebar-value sidebar-clickable"
                                        onClick={() => setShowDurationDropdown(!showDurationDropdown)}
                                    >
                                        <span>
                                            {formTripDuration === formMaxTripDuration
                                                ? `${formTripDuration} day${formTripDuration > 1 ? 's' : ''}`
                                                : `${formTripDuration} - ${formMaxTripDuration} days`}
                                        </span>
                                        <svg className="sidebar-chevron" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        </svg>
                                    </div>
                                    {showDurationDropdown && (
                                        <div className="sidebar-dropdown-panel" style={{ width: '300px' }}>
                                            <div className="flex flex-col gap-3 p-1">
                                                {/* Min Control */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-600">Min Days</span>
                                                    <div className="sidebar-counter-row" style={{ margin: 0 }}>
                                                        <button
                                                            className="btn-counter"
                                                            onClick={() => setFormTripDuration(Math.max(1, formTripDuration - 1))}
                                                            disabled={formTripDuration <= 1}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="counter-value" style={{ minWidth: "2rem" }}>{formTripDuration}</span>
                                                        <button
                                                            className="btn-counter"
                                                            onClick={() => setFormTripDuration(Math.min(formMaxTripDuration, formTripDuration + 1))}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Max Control */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-600">Max Days</span>
                                                    <div className="sidebar-counter-row" style={{ margin: 0 }}>
                                                        <button
                                                            className="btn-counter"
                                                            onClick={() => setFormMaxTripDuration(Math.max(formTripDuration, formMaxTripDuration - 1))}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="counter-value" style={{ minWidth: "2rem" }}>{formMaxTripDuration}</span>
                                                        <button
                                                            className="btn-counter"
                                                            onClick={() => setFormMaxTripDuration(Math.min(15, formMaxTripDuration + 1))}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="sidebar-done-btn" onClick={() => setShowDurationDropdown(false)}>
                                                Done
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Cabins & Guests Dropdown */}
                                <div className="sidebar-group" ref={guestsDropdownRef}>
                                    <span className="sidebar-label">Cabins & Guests</span>
                                    <div
                                        className="sidebar-value sidebar-clickable"
                                        onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                                    >
                                        <span>
                                            {`${structuredCabins.length} Cabin${structuredCabins.length > 1 ? 's' : ''}, ${formGuests} Guests`}
                                        </span>
                                        <svg className="sidebar-chevron" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        </svg>
                                    </div>
                                    {showGuestsDropdown && (
                                        <div className="sidebar-dropdown-panel" style={{ width: '320px', right: '-20px' }}>
                                            <div className="flex justify-between items-center mb-3 px-1" style={{ marginBottom: '12px', paddingLeft: '4px', paddingRight: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1a1a1a' }}>Room Configuration</span>
                                                <span style={{ fontSize: '0.75rem', color: '#666' }}>Max 4 pax / cabin</span>
                                            </div>
                                            <div className="structured-guest-content">
                                                <div className="structured-cabins-list">
                                                    {structuredCabins.map((cabin, idx) => (
                                                        <div key={idx} className="structured-cabin-item">
                                                            <div className="structured-cabin-header" onClick={() => toggleCabinExpand(idx)}>
                                                                <span className="cabin-header-title">CABIN {idx + 1} <span className="cabin-header-guests">{cabin.adults + cabin.children} guests</span></span>
                                                                <svg
                                                                    width="12"
                                                                    height="12"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    style={{ transform: expandedCabinIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                                                                >
                                                                    <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>

                                                            {expandedCabinIndex === idx && (
                                                                <div className="structured-cabin-body">
                                                                    {/* Adults */}
                                                                    <div className="cabin-counter-row">
                                                                        <span className="cabin-counter-label">Adults</span>
                                                                        <div className="cabin-counter-controls">
                                                                            <button
                                                                                className="btn-mini-counter"
                                                                                onClick={(e) => { e.stopPropagation(); updateCabinGuests(idx, 'adults', -1); }}
                                                                                disabled={cabin.adults <= 1}
                                                                            >
                                                                                -
                                                                            </button>
                                                                            <span className="cabin-counter-val">{cabin.adults}</span>
                                                                            <button
                                                                                className="btn-mini-counter"
                                                                                onClick={(e) => { e.stopPropagation(); updateCabinGuests(idx, 'adults', 1); }}
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    {/* Children */}
                                                                    <div className="cabin-counter-row">
                                                                        <span className="cabin-counter-label">Children</span>
                                                                        <div className="cabin-counter-controls">
                                                                            <button
                                                                                className="btn-mini-counter"
                                                                                onClick={(e) => { e.stopPropagation(); updateCabinGuests(idx, 'children', -1); }}
                                                                                disabled={cabin.children <= 0}
                                                                            >
                                                                                -
                                                                            </button>
                                                                            <span className="cabin-counter-val">{cabin.children}</span>
                                                                            <button
                                                                                className="btn-mini-counter"
                                                                                onClick={(e) => { e.stopPropagation(); updateCabinGuests(idx, 'children', 1); }}
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    {structuredCabins.length > 1 && (
                                                                        <button className="btn-remove-cabin" onClick={(e) => { e.stopPropagation(); removeCabin(idx); }}>
                                                                            Remove Cabin
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <button className="btn-add-cabin" onClick={addCabin}>
                                                    + Add Another Cabin
                                                </button>
                                            </div>

                                            <div className="sidebar-dropdown-footer" style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                                <button className="sidebar-done-btn" onClick={() => setShowGuestsDropdown(false)}>
                                                    Done
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button className="btn-apply" onClick={handleModifySearch}>
                                    Apply
                                </button>
                            </div>

                            {/* Results Summary */}
                            <div className="sidebar-track">
                                <div className="itinerary-sticky">
                                    <h3 className="itinerary-title">Your Itinerary</h3>
                                    <p className="itinerary-description">
                                        This is a summary of the accommodation you have selected.
                                    </p>

                                    <div className="itinerary-divider" />

                                    {itineraryItems.length === 0 ? (
                                        <div className="itinerary-empty">
                                            You haven&apos;t selected any options yet.
                                        </div>
                                    ) : (
                                        <>
                                            <ul className="itinerary-list">
                                                {itineraryItems.map((item, idx) => (
                                                    <li key={item.addedAt || idx} className="itinerary-item">
                                                        <div className="itinerary-header">
                                                            <div>
                                                                <div className="itinerary-type">CABIN</div>
                                                                <div className="itinerary-cabin-name">{item.cabin}</div>
                                                            </div>
                                                            <button
                                                                className="itinerary-remove-btn-top"
                                                                title="Remove from itinerary"
                                                                onClick={() => removeFromItinerary(idx)}
                                                            >
                                                                <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        {/* Ship Name Row */}
                                                        <div className="itinerary-info-row">
                                                            <svg className="itinerary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                                <path d="M3 15h18l-1.5 6h-15L3 15z" />
                                                                <rect x="5" y="8" width="14" height="7" rx="1" />
                                                                <path d="M8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" />
                                                                <line x1="2" y1="15" x2="22" y2="15" />
                                                            </svg>
                                                            <span className="itinerary-info-text">{item.ship}</span>
                                                        </div>

                                                        {/* Date Row */}
                                                        <div className="itinerary-info-row">
                                                            <svg className="itinerary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                                <line x1="3" y1="10" x2="21" y2="10" />
                                                            </svg>
                                                            <span className="itinerary-info-text">
                                                                {formatDateDisplay(item.date)}
                                                            </span>
                                                        </div>

                                                        <div className="itinerary-price-row">
                                                            <span className="itinerary-price-label">Price</span>
                                                            <span className="itinerary-price-value">{formatPrice(item.price)}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="itinerary-total">
                                                <div className="itinerary-total-row">
                                                    <span className="itinerary-total-label-simple">EST. TOTAL</span>
                                                    <div className="itinerary-total-right">
                                                        <span className="itinerary-total-amount">
                                                            {formatPrice(itineraryTotal)}
                                                        </span>
                                                        <span className="itinerary-tax-note">(Tax Included)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                className="btn-send-enquiry"
                                                onClick={handleEnquireNow}
                                                style={{ marginTop: "1rem", width: "100%", background: "#088F8F", color: "white", padding: "0.8rem", border: "none", borderRadius: "4px", fontWeight: 600, cursor: "pointer" }}
                                            >
                                                ENQUIRE NOW
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ===== CABIN DETAIL MODAL ===== */}
            {
                selectedCabinForDetail && (
                    <div className="modal-overlay" onClick={closeCabinDetail}>
                        <div className="modal-content modal-content-redesigned" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close-details" onClick={closeCabinDetail}>✕</button>

                            <div className="modal-body modal-body-redesigned">
                                {/* Left: Info */}
                                <div className="modal-info-section modal-info-left">
                                    <div className="modal-cabin-header">
                                        <h2 className="modal-cabin-name">{selectedCabinForDetail.cabin_name}</h2>
                                        <p className="modal-cabin-subtitle">Room</p>
                                    </div>

                                    <div className="modal-cabin-specs">
                                        SLEEPS {selectedCabinForDetail.total_capacity || 2} | {selectedCabinForDetail.facilities?.large_bed ? "1 KING OR 2 TWINS" : "TWIN BEDS"} | PRIVATE CABIN
                                    </div>

                                    <blockquote className="modal-cabin-quote">
                                        "Experience luxury on the open ocean with our premium cabin selection."
                                    </blockquote>

                                    <div className="modal-overview-section">
                                        <h3 className="modal-section-title">OVERVIEW</h3>
                                        <ul className="modal-overview-list">
                                            <li>{selectedCabinForDetail.facilities?.balcony ? "Private Balcony" : "Shared Deck"}</li>
                                            <li>{selectedCabinForDetail.facilities?.seaview ? "Ocean View" : "Standard View"}</li>
                                            <li>Air conditioning</li>
                                            <li>Daily housekeeping</li>
                                            <li>Private bathroom</li>
                                            <li>Hot water</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Right: Image Gallery */}
                                <div className="modal-image-section modal-image-right">
                                    <Image
                                        key={getModalCurrentImage()}
                                        src={getDirectImageUrl(getModalCurrentImage())}
                                        alt={selectedCabinForDetail.cabin_name}
                                        fill
                                        className="gallery-image-anim"
                                        style={{ objectFit: "cover" }}
                                        unoptimized
                                        referrerPolicy="no-referrer"
                                    />
                                    {/* Navigation */}
                                    <button className="modal-gallery-nav modal-gallery-prev" onClick={prevModalImage}>‹</button>
                                    <button className="modal-gallery-nav modal-gallery-next" onClick={nextModalImage}>›</button>

                                    <div className="modal-image-indicator">
                                        {getCabinGalleryImages(selectedCabinForDetail).map((_, idx) => (
                                            <span key={idx} className={`indicator-dot ${idx === modalImageIndex ? 'active' : ''}`} />
                                        ))}
                                    </div>

                                    <div className="modal-image-count-badge">
                                        CABIN {modalImageIndex + 1} of {getCabinGalleryImages(selectedCabinForDetail).length}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer-bar">
                                <div className="modal-price-container">
                                    <span className="modal-price-val">
                                        {getPriceSymbol(formatPrice(selectedCabinForDetail.price || getSelectedShip()?.startFromPrice || 0))} {getPriceVal(formatPrice(selectedCabinForDetail.price || getSelectedShip()?.startFromPrice || 0))}
                                    </span>
                                    <span className="modal-price-unit">/NIGHT</span>
                                    <div className="modal-price-sub">Excluding taxes and fees</div>
                                </div>
                                <button
                                    className="btn-reserve-modal"
                                    onClick={() => {
                                        toggleItinerary(selectedCabinForDetail, selectedShipForCabins!);
                                        closeCabinDetail();
                                    }}
                                >
                                    {isCabinInItinerary(selectedCabinForDetail.cabin_name, selectedShipForCabins!, searchCriteria.dateFrom || "") ? "RESERVED" : "RESERVE NOW"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
