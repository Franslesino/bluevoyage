"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { countries, Country } from "@/data/countries";
import "@/styles/reservation.css";

interface ItineraryItem {
    cabin: string;
    ship: string;
    date: string;
    price: number;
    guests: number;
    addedAt?: number;
}

interface FormData {
    title: string;
    firstName: string;
    lastName: string;
    phoneCountry: string;
    phoneNumber: string;
    email: string;
    addressLine1: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    notes: string;
    subscribeNews: boolean;
    consentData: boolean;
}

interface AddressSuggestion {
    display_name: string;
    address?: {
        house_number?: string;
        road?: string;
        suburb?: string;
        neighbourhood?: string;
        city?: string;
        town?: string;
        village?: string;
        municipality?: string;
        state?: string;
        county?: string;
        country?: string;
        postcode?: string;
    };
}

export default function ReservationPage() {
    const router = useRouter();

    // Form State
    const [form, setForm] = useState<FormData>({
        title: "",
        firstName: "",
        lastName: "",
        phoneCountry: "+62",
        phoneNumber: "",
        email: "",
        addressLine1: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        notes: "",
        subscribeNews: false,
        consentData: false,
    });

    // UI State
    const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(
        countries.find((c) => c.dialMethod === "+62") || countries[0]
    );
    const [submitting, setSubmitting] = useState(false);
    const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);

    // Address Autocomplete
    const [addressSearch, setAddressSearch] = useState("");
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);

    // Refs
    const phoneDropdownRef = useRef<HTMLDivElement>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(e.target as Node)) {
                setIsPhoneDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Form handlers
    const updateForm = (field: keyof FormData, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const selectPhoneCountry = (country: Country) => {
        setSelectedCountry(country);
        setForm((prev) => ({ ...prev, phoneCountry: country.dialMethod }));
        setIsPhoneDropdownOpen(false);
    };

    // Address search with debounce
    const searchAddress = async (query: string) => {
        setAddressSearch(query);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (query.trim().length < 3) {
            setAddressSuggestions([]);
            return;
        }

        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
                    { headers: { "Accept-Language": "en" } }
                );
                const data = await response.json();
                setAddressSuggestions(data);
            } catch (error) {
                console.error("Address search error:", error);
                setAddressSuggestions([]);
            }
        }, 400);
    };

    const selectAddress = (suggestion: AddressSuggestion) => {
        const addr = suggestion.address || {};

        const streetParts: string[] = [];
        if (addr.house_number) streetParts.push(addr.house_number);
        if (addr.road) streetParts.push(addr.road);
        if (addr.suburb) streetParts.push(addr.suburb);

        setForm((prev) => ({
            ...prev,
            addressLine1: streetParts.join(", ") || suggestion.display_name.split(",")[0],
            city: addr.city || addr.town || addr.village || addr.municipality || "",
            state: addr.state || addr.county || "",
            country: addr.country || "",
            zipCode: addr.postcode || "",
        }));

        setAddressSearch(suggestion.display_name);
        setAddressSuggestions([]);
    };

    // Calculate total price
    const totalPrice = itineraryItems.reduce((sum, item) => {
        const numericPrice = typeof item.price === "number"
            ? item.price
            : parseInt(String(item.price).replace(/[^0-9]/g, ""), 10) || 0;
        return sum + numericPrice;
    }, 0);

    // Format helpers
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getEndDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        date.setDate(date.getDate() + 3);
        return date.toISOString();
    };

    const formatPrice = (price: number) => {
        if (!price) return "Price on request";
        return `Rp ${price.toLocaleString("id-ID")}`;
    };

    // Submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Clear itinerary
            localStorage.removeItem("togean_itinerary");

            // Navigate to success page
            router.push("/booking-success");
        } catch (error) {
            console.error("Submission error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const removeItineraryItem = (index: number) => {
        const newItems = itineraryItems.filter((_, i) => i !== index);
        setItineraryItems(newItems);
        localStorage.setItem("togean_itinerary", JSON.stringify(newItems));
    };

    return (
        <div className="reservation-page">
            <div className="reservation-container">
                <div className="reservation-layout">
                    {/* Left: Main Content (Form) */}
                    <div className="reservation-main">
                        <div className="reservation-form-container">
                            <div className="form-section-header">GUEST INFORMATION</div>

                            <form className="reservation-form" onSubmit={handleSubmit}>
                                {/* Prefix | First Name | Last Name */}
                                <div className="form-row-3-equal">
                                    <div className="form-group-clean">
                                        <label className="clean-label">PREFIX</label>
                                        <div className="select-wrapper">
                                            <select
                                                className="clean-input"
                                                value={form.title}
                                                onChange={(e) => updateForm("title", e.target.value)}
                                            >
                                                <option value="" disabled></option>
                                                <option value="Mr">Mr</option>
                                                <option value="Mrs">Mrs</option>
                                                <option value="Ms">Ms</option>
                                                <option value="Dr">Dr</option>
                                            </select>
                                            <span className="select-arrow">
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="form-group-clean">
                                        <label className="clean-label">FIRST NAME*</label>
                                        <input
                                            type="text"
                                            className="clean-input"
                                            value={form.firstName}
                                            onChange={(e) => updateForm("firstName", e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group-clean">
                                        <label className="clean-label">LAST NAME*</label>
                                        <input
                                            type="text"
                                            className="clean-input"
                                            value={form.lastName}
                                            onChange={(e) => updateForm("lastName", e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Phone | Email */}
                                <div className="form-row-2">
                                    <div className="form-group-clean">
                                        <label className="clean-label">PHONE*</label>
                                        <div className="phone-input-clean" ref={phoneDropdownRef}>
                                            {/* Custom Phone Dropdown */}
                                            <div
                                                className="custom-phone-dropdown"
                                                onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                                            >
                                                <div className="selected-flag-trigger">
                                                    <img
                                                        src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                                                        alt={selectedCountry.code}
                                                        className="flag-icon"
                                                    />
                                                    <span className="select-arrow">
                                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </span>
                                                </div>

                                                {isPhoneDropdownOpen && (
                                                    <div className="phone-dropdown-menu">
                                                        {countries.map((country) => (
                                                            <div
                                                                key={country.code}
                                                                className="phone-dropdown-item"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    selectPhoneCountry(country);
                                                                }}
                                                            >
                                                                <img
                                                                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                                                    alt=""
                                                                    className="flag-icon-small"
                                                                />
                                                                <span className="country-name">{country.name}</span>
                                                                <span className="dial-code">({country.dialMethod})</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="dial-code-display">{form.phoneCountry}</div>

                                            <input
                                                type="tel"
                                                className="clean-input phone-number"
                                                value={form.phoneNumber}
                                                onChange={(e) => updateForm("phoneNumber", e.target.value)}
                                                placeholder=""
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group-clean">
                                        <label className="clean-label">EMAIL*</label>
                                        <input
                                            type="email"
                                            className="clean-input"
                                            value={form.email}
                                            onChange={(e) => updateForm("email", e.target.value)}
                                            required
                                        />
                                        <div className="field-helper">
                                            The email address to which we will send your confirmation.
                                        </div>
                                    </div>
                                </div>

                                {/* ADDRESS SECTION */}
                                <div className="form-section-header mt-large">ADDRESS</div>

                                <div className="form-group-clean address-autocomplete-wrapper">
                                    <label className="clean-label">FIND YOUR ADDRESS</label>
                                    <div className="search-input-wrapper">
                                        <input
                                            type="text"
                                            className="clean-input"
                                            value={addressSearch}
                                            onChange={(e) => searchAddress(e.target.value)}
                                            placeholder="Start typing your address..."
                                        />
                                        <span className="search-icon">🔍</span>

                                        {addressSuggestions.length > 0 && (
                                            <div className="address-suggestions-dropdown">
                                                {addressSuggestions.map((suggestion, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="address-suggestion-item"
                                                        onClick={() => selectAddress(suggestion)}
                                                    >
                                                        {suggestion.display_name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-row-2">
                                    <div className="form-group-clean">
                                        <label className="clean-label">ADDRESS*</label>
                                        <input
                                            type="text"
                                            className="clean-input"
                                            value={form.addressLine1}
                                            onChange={(e) => updateForm("addressLine1", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group-clean">
                                        <label className="clean-label">CITY*</label>
                                        <input
                                            type="text"
                                            className="clean-input"
                                            value={form.city}
                                            onChange={(e) => updateForm("city", e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row-2">
                                    <div className="form-group-clean">
                                        <label className="clean-label">STATE / PROVINCE</label>
                                        <input
                                            type="text"
                                            className="clean-input"
                                            value={form.state}
                                            onChange={(e) => updateForm("state", e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group-clean">
                                        <label className="clean-label">COUNTRY / REGION*</label>
                                        <div className="select-wrapper">
                                            <select
                                                className="clean-input"
                                                value={form.country}
                                                onChange={(e) => updateForm("country", e.target.value)}
                                                required
                                            >
                                                <option value="" disabled></option>
                                                {countries.map((country) => (
                                                    <option key={country.code} value={country.name}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="select-arrow">
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row-2">
                                    <div className="form-group-clean">
                                        <label className="clean-label">ZIP / POSTAL CODE*</label>
                                        <input
                                            type="text"
                                            className="clean-input"
                                            value={form.zipCode}
                                            onChange={(e) => updateForm("zipCode", e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="form-section-header mt-large">ADDITIONAL INFORMATION</div>

                                <div className="form-group-clean">
                                    <label className="clean-label">SPECIAL REQUESTS</label>
                                    <textarea
                                        className="clean-input clean-textarea"
                                        rows={3}
                                        value={form.notes}
                                        onChange={(e) => updateForm("notes", e.target.value)}
                                    />
                                </div>

                                <div className="form-checkboxes">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={form.subscribeNews}
                                            onChange={(e) => updateForm("subscribeNews", e.target.checked)}
                                        />
                                        <span className="checkbox-text">
                                            Sign up to receive news and updates from Togean Voyages
                                        </span>
                                    </label>

                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={form.consentData}
                                            onChange={(e) => updateForm("consentData", e.target.checked)}
                                            required
                                        />
                                        <span className="checkbox-text">
                                            I consent to my submitted data being collected and stored
                                        </span>
                                    </label>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="submit"
                                        className="btn-submit-reservation"
                                        disabled={submitting}
                                    >
                                        {submitting ? "PROCESSING..." : "CONFIRM BOOKING"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right: Itinerary Sidebar */}
                    <div className="reservation-sidebar">
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
                                    <ul className="itinerary-list">
                                        {itineraryItems.map((item, idx) => (
                                            <li key={item.addedAt || idx} className="itinerary-item">
                                                {/* Header */}
                                                <div className="itinerary-header">
                                                    <div>
                                                        <div className="itinerary-type">CABIN</div>
                                                        <div className="itinerary-cabin-name">{item.cabin}</div>
                                                    </div>
                                                    <button
                                                        className="itinerary-remove-btn-top"
                                                        title="Remove from itinerary"
                                                        onClick={() => removeItineraryItem(idx)}
                                                    >
                                                        <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                            <line x1="18" y1="6" x2="6" y2="18" />
                                                            <line x1="6" y1="6" x2="18" y2="18" />
                                                        </svg>
                                                    </button>
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
                                                        <strong>{formatDate(item.date)}</strong> –{" "}
                                                        <strong>{formatDate(getEndDate(item.date))}</strong>
                                                    </span>
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

                                                {/* Guests Row */}
                                                <div className="itinerary-info-row">
                                                    <svg className="itinerary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                        <circle cx="12" cy="7" r="4" />
                                                    </svg>
                                                    <span className="itinerary-info-text">
                                                        {item.guests || 2} adult{(item.guests || 2) > 1 ? "s" : ""}
                                                    </span>
                                                </div>

                                                {/* Price Row */}
                                                <div className="itinerary-price-row">
                                                    <div className="itinerary-price-left">
                                                        <svg className="itinerary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                            <rect x="2" y="6" width="20" height="12" rx="2" />
                                                            <circle cx="12" cy="12" r="2" />
                                                            <path d="M6 12h.01M18 12h.01" />
                                                        </svg>
                                                        <span className="itinerary-price-label">{item.cabin}</span>
                                                    </div>
                                                    <span className="itinerary-price-value">
                                                        {formatPrice(item.price)}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="itinerary-total">
                                    <div className="itinerary-total-row">
                                        <span className="itinerary-total-label-simple">EST. TOTAL</span>
                                        <div className="itinerary-total-right">
                                            <span className="itinerary-total-amount">
                                                {formatPrice(totalPrice)}
                                            </span>
                                            <span className="itinerary-tax-note">(Tax Included)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
