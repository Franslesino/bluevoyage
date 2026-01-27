// Cabin API Types and Service
// Production API integrated with Komodo Voyage booking system

// API Base URL - production API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ac0c4wsgo0cg4sc8ksos04ko.49.13.148.202.sslip.io/api";

// ============================================
// TYPES
// ============================================

export interface CabinFacilities {
    balcony: boolean;
    bathtub: boolean;
    seaview: boolean;
    large_bed: boolean;
    private_jacuzzi: boolean;
    cabin_display_facilities: string;
}

export interface Cabin {
    cabin_id: string;
    cabin_name: string;
    boat_name: string;
    total_capacity: number;
    price: number;
    facilities: CabinFacilities;
    image_main: string;
    images?: string[];
}

export interface CabinAPIResponse {
    success: boolean;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    source: string;
    data: Cabin[];
}

export interface Ship {
    name: string;
    description: string;
    trip: string;
    image_main: string;
    images: string[];
}

export interface ShipsAPIResponse {
    success: boolean;
    count: number;
    source: string;
    data: Ship[];
}

export interface AvailabilityCabin {
    name: string;
    available: number;
}

export interface OperatorAvailability {
    operator: string;
    total: number;
    cabins: AvailabilityCabin[];
}

export interface AvailabilityResponse {
    success: boolean;
    source: string;
    data: {
        date: string;
        total: number;
        operators: OperatorAvailability[];
    };
}

export interface CabinWithAvailability extends Cabin {
    availability?: "available" | "booked" | "hold" | "maintenance" | "unknown";
}

export interface ShipWithCabinCount extends Ship {
    cabinCount: number;
}

// ============================================
// SHIPS FUNCTIONS
// ============================================

// MOCK DATA for Fallback
const MOCK_CABINS: Cabin[] = [
    {
        "cabin_id": "D1",
        "cabin_name": "Padar",
        "boat_name": "DERYA LIVEABOARD",
        "total_capacity": 4,
        "price": 3000000,
        "facilities": {
            "balcony": true,
            "bathtub": true,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "https://drive.google.com/file/d/1A87nuXaQrGNabTR1__vUTJtEAHQFcJrG/view?usp=sharing",
        "images": []
    },
    {
        "cabin_id": "D10",
        "cabin_name": "Moon",
        "boat_name": "SEMESTA VOYAGE",
        "total_capacity": 4,
        "price": 13000000,
        "facilities": {
            "balcony": true,
            "bathtub": false,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": true,
            "cabin_display_facilities": ""
        },
        "image_main": "https://drive.google.com/file/d/1uLxtgx-viKQM0pvwmLSIcjkwHLTKM0YF/view?usp=sharing",
        "images": []
    },
    {
        "cabin_id": "D11",
        "cabin_name": "Mars",
        "boat_name": "SEMESTA VOYAGE",
        "total_capacity": 2,
        "price": 12000000,
        "facilities": {
            "balcony": false,
            "bathtub": true,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "https://drive.google.com/file/d/1oHUHaNBoGUoSXCVsSP2nKW3hKRZejeA0/view?usp=sharing",
        "images": []
    },
    {
        "cabin_id": "D2",
        "cabin_name": "Rinca",
        "boat_name": "DERYA LIVEABOARD",
        "total_capacity": 4,
        "price": 4000000,
        "facilities": {
            "balcony": false,
            "bathtub": false,
            "seaview": false,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "https://drive.google.com/file/d/1k-LzsN39F309Ldwo7GVsiqw25U3h1Ntc/view?usp=sharing",
        "images": []
    },
    {
        "cabin_id": "D18",
        "cabin_name": "Kadatua",
        "boat_name": "BARAKATI LIVEBOARD",
        "total_capacity": 2,
        "price": 6000000,
        "facilities": {
            "balcony": false,
            "bathtub": false,
            "seaview": false,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "https://drive.google.com/file/d/1ZFn2Pbbtd5I0Ww1j1-iJwdC5nlxuSrKR/view?usp=sharing",
        "images": []
    },
    {
        "cabin_id": "D23",
        "cabin_name": "Banda Neira & Savu",
        "boat_name": "ELBARK CRUISE",
        "total_capacity": 2,
        "price": 5500000,
        "facilities": {
            "balcony": false,
            "bathtub": false,
            "seaview": false,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "https://drive.google.com/file/d/1dMScdEnEszfJSBwHDlgipholxEgxBo6o/view?usp=sharing",
        "images": []
    },
    // NEW IJC
    {
        "cabin_id": "IJC1",
        "cabin_name": "Deluxe Suite",
        "boat_name": "NEW IJC",
        "total_capacity": 2,
        "price": 8000000,
        "facilities": {
            "balcony": true,
            "bathtub": true,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // AL FATHRAN (DELUXE)
    {
        "cabin_id": "AF1",
        "cabin_name": "Deluxe Cabin",
        "boat_name": "AL FATHRAN (DELUXE)",
        "total_capacity": 2,
        "price": 7500000,
        "facilities": {
            "balcony": true,
            "bathtub": false,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // GAISAN (DELUXE)
    {
        "cabin_id": "GS1",
        "cabin_name": "Deluxe Room",
        "boat_name": "GAISAN (DELUXE)",
        "total_capacity": 2,
        "price": 7000000,
        "facilities": {
            "balcony": false,
            "bathtub": true,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // HATIRA HELA (DELUXE)
    {
        "cabin_id": "HH1",
        "cabin_name": "Deluxe Suite",
        "boat_name": "HATIRA HELA (DELUXE)",
        "total_capacity": 2,
        "price": 7800000,
        "facilities": {
            "balcony": true,
            "bathtub": true,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // GAMALA (DELUXE)
    {
        "cabin_id": "GM1",
        "cabin_name": "Deluxe Cabin",
        "boat_name": "GAMALA (DELUXE)",
        "total_capacity": 2,
        "price": 7200000,
        "facilities": {
            "balcony": true,
            "bathtub": false,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // MAHESWARI (DELUXE)
    {
        "cabin_id": "MH1",
        "cabin_name": "Deluxe Room",
        "boat_name": "MAHESWARI (DELUXE)",
        "total_capacity": 2,
        "price": 7600000,
        "facilities": {
            "balcony": true,
            "bathtub": true,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // GIONA LIVEABOARD
    {
        "cabin_id": "GL1",
        "cabin_name": "Standard Cabin",
        "boat_name": "GIONA LIVEABOARD",
        "total_capacity": 2,
        "price": 6500000,
        "facilities": {
            "balcony": false,
            "bathtub": false,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // YUKAI (DELUXE)
    {
        "cabin_id": "YK1",
        "cabin_name": "Deluxe Suite",
        "boat_name": "YUKAI (DELUXE)",
        "total_capacity": 2,
        "price": 8200000,
        "facilities": {
            "balcony": true,
            "bathtub": true,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": true,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // YUMANA
    {
        "cabin_id": "YM1",
        "cabin_name": "Deluxe Suite",
        "boat_name": "YUMANA",
        "total_capacity": 2,
        "price": 7500000,
        "facilities": {
            "balcony": true,
            "bathtub": true,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // AKASA
    {
        "cabin_id": "AK1",
        "cabin_name": "Premium Cabin",
        "boat_name": "AKASSA CRUISE",
        "total_capacity": 2,
        "price": 7000000,
        "facilities": {
            "balcony": true,
            "bathtub": false,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // AMORE
    {
        "cabin_id": "AM1",
        "cabin_name": "Deluxe Room",
        "boat_name": "AMORE BOAT",
        "total_capacity": 2,
        "price": 6800000,
        "facilities": {
            "balcony": false,
            "bathtub": true,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    },
    // BOMBANA
    {
        "cabin_id": "BM1",
        "cabin_name": "Standard Suite",
        "boat_name": "BOMBANA 02",
        "total_capacity": 2,
        "price": 6500000,
        "facilities": {
            "balcony": true,
            "bathtub": true,
            "seaview": true,
            "large_bed": true,
            "private_jacuzzi": false,
            "cabin_display_facilities": ""
        },
        "image_main": "/placeholder-cabin.jpg",
        "images": []
    }
];

const MOCK_SHIPS: Ship[] = [
    {
        name: "SEMESTA VOYAGE",
        description: "Berlayar dengan Semesta Voyage untuk petualangan yang mendalam, sebuah ekspedisi yang merayakan keindahan tak terbatas dari samudra, dengan perhatian detail pada setiap momen perjalanan.",
        trip: "3",
        image_main: "https://drive.google.com/file/d/17PhbIjJU-w1u-19cqL5Dx7dwVrgBs1n_/view?usp=sharing",
        images: [
            "https://drive.google.com/file/d/17PhbIjJU-w1u-19cqL5Dx7dwVrgBs1n_/view?usp=sharing",
            "https://drive.google.com/file/d/11mJnXCmJ-YEyGOhTw8PGbQZ4dUUNei7T/view?usp=sharing",
            "https://drive.google.com/file/d/1cM9DLVEjd_ldqyay9VkqfnYvLQEFgmzp/view?usp=sharing",
            "https://drive.google.com/file/d/19AVwgfWEdixIAnWQmTv22vTcOIZ6mNhz/view?usp=sharing",
            "https://drive.google.com/file/d/1AbmbXzaZr4vRXaz0HCMgTn07nGJCvwfa/view?usp=sharing"
        ]
    },
    {
        name: "DERYA LIVEABOARD",
        description: "Jelajahi perairan tropis dengan Derya Liveaboard, sebuah perahu Pinisi yang anggun, menjanjikan pelayaran mewah dan penuh ketenangan di tengah lautan yang mempesona.",
        trip: "3",
        image_main: "https://drive.google.com/file/d/1roeMwKfi0J0GK8Hn_-3CoiXVjbuFukFa/view?usp=sharing",
        images: [
            "https://drive.google.com/file/d/1roeMwKfi0J0GK8Hn_-3CoiXVjbuFukFa/view?usp=sharing",
            "https://drive.google.com/file/d/1geJN_2OD-OnsctgfLMHWjWXvNAA-p0Kw/view?usp=sharing",
            "https://drive.google.com/file/d/1Cvb5hSP1jvEXuzZo0uwQCm-GxdQ27AW5/view?usp=sharing"
        ]
    },
    {
        name: "BARAKATI LIVEBOARD",
        description: "Berlayar dengan Semesta Voyage untuk petualangan yang mendalam, sebuah ekspedisi yang merayakan keindahan tak terbatas dari samudra, dengan perhatian detail pada setiap momen perjalanan.",
        trip: "3",
        image_main: "https://drive.google.com/file/d/12wwXRmIRzMdhLjCMgBpwZu6LWJlpMdRe/view?usp=sharing",
        images: [
            "https://drive.google.com/file/d/12wwXRmIRzMdhLjCMgBpwZu6LWJlpMdRe/view?usp=sharing",
            "https://drive.google.com/file/d/1qpHobyCnXEJhxF_ITDgnMVRLQL9CEoCQ/view?usp=sharing"
        ]
    },
    {
        name: "ELBARK CRUISE",
        description: "",
        trip: "3",
        image_main: "https://drive.google.com/file/d/1EX_XQSyDGrxyFpjs2PzuUB4rcXCIMDXP/view?usp=sharing",
        images: [
            "https://drive.google.com/file/d/1EX_XQSyDGrxyFpjs2PzuUB4rcXCIMDXP/view?usp=sharing",
            "https://drive.google.com/file/d/1Slm2omqeMyCG5cmDEj4vAHpD6nqgwoYT/view?usp=sharing",
            "https://drive.google.com/file/d/1fXKpvG8BMO00RPm0Z3GgeQtg6z3IZEaS/view?usp=sharing",
            "https://drive.google.com/file/d/1lMMNs84uPII5BwslFH3Qlt3eyOTjFeTb/view?usp=sharing"
        ]
    },
    {
        name: "NEW IJC",
        description: "Modern liveaboard with premium amenities",
        trip: "3",
        image_main: "/placeholder-boat.svg",
        images: []
    },
    {
        name: "AL FATHRAN (DELUXE)",
        description: "Deluxe sailing experience in Komodo waters",
        trip: "3",
        image_main: "/placeholder-boat.svg",
        images: []
    },
    {
        name: "GAISAN (DELUXE)",
        description: "Premium comfort on traditional phinisi",
        trip: "3",
        image_main: "/placeholder-boat.svg",
        images: []
    },
    {
        name: "HATIRA HELA (DELUXE)",
        description: "Luxury liveaboard adventure",
        trip: "3",
        image_main: "/placeholder-boat.svg",
        images: []
    },
    {
        name: "GAMALA (DELUXE)",
        description: "Elegant cruising with deluxe facilities",
        trip: "3",
        image_main: "/placeholder-boat.svg",
        images: []
    },
    {
        name: "MAHESWARI (DELUXE)",
        description: "Premium liveaboard experience",
        trip: "3",
        image_main: "/placeholder-boat.svg",
        images: []
    },
    {
        name: "GIONA LIVEABOARD",
        description: "Comfortable sailing through Komodo",
        trip: "3",
        image_main: "/placeholder-boat.svg",
        images: []
    },
    {
        name: "YUKAI (DELUXE)",
        description: "Luxury cruise with top-tier amenities",
        trip: "3",
        image_main: "/placeholder-boat.svg",
        images: []
    },
    {
        name: "YUMANA",
        description: "",
        trip: "3",
        image_main: "https://drive.google.com/file/d/1udLDI86vboxH66XegxHsptHn1rVk03yU/view?usp=sharing",
        images: [
            "https://drive.google.com/file/d/1udLDI86vboxH66XegxHsptHn1rVk03yU/view?usp=sharing",
            "https://drive.google.com/file/d/1w0PMef8E8ZCjhjs_k-X4DMH7xfYoJ8Ql/view?usp=sharing",
            "https://drive.google.com/file/d/1-lrXAKzjSzvMZywoBtYU04U0l1GGLmF1/view?usp=sharing",
            "https://drive.google.com/file/d/1F04n_Iyv_G5PnngtpMtHmpEYbeFflsVI/view?usp=sharing",
            "https://drive.google.com/file/d/1WDL9KLWUBXNI2kIsQNao6QFksPchmdXk/view?usp=sharing",
            "https://drive.google.com/file/d/1qcdCmllqAPvzCZZnUamWcaqUcRwRNuqa/view?usp=sharing"
        ]
    },
    {
        name: "AKASSA CRUISE",
        description: "Akassa Cruise menawarkan kemewahan tanpa batas, dirancang untuk penjelajahan skala besar, membawa Anda melintasi kepulauan dengan kenyamanan dan fasilitas kelas atas yang tak tertandingi.",
        trip: "3",
        image_main: "https://drive.google.com/file/d/1xJNNkdXkyD_TKnVnhKMrrRwMXNn8-vEc/view?usp=sharing",
        images: [
            "https://drive.google.com/file/d/1xJNNkdXkyD_TKnVnhKMrrRwMXNn8-vEc/view?usp=sharing",
            "https://drive.google.com/file/d/1CKwZhVgXeDyMrxLKKvzbhMcyX2OeUO6p/view?usp=sharing",
            "https://drive.google.com/file/d/1D2iSKWbJcTNVYpc6hRYnOwkp3XTnH-no/view?usp=sharing"
        ]
    },
    {
        name: "AMORE BOAT",
        description: "",
        trip: "3",
        image_main: "https://drive.google.com/file/d/1UDy7Dbp0S8-V1mwJQkO1K9HYLiDfCjLg/view?usp=sharing",
        images: [
            "https://drive.google.com/file/d/1UDy7Dbp0S8-V1mwJQkO1K9HYLiDfCjLg/view?usp=sharing",
            "https://drive.google.com/file/d/1QN-6KWN4WMD-hrAWZmEUAJdJLywoCD_A/view?usp=sharing"
        ]
    },
    {
        name: "BOMBANA 02",
        description: "",
        trip: "3",
        image_main: "https://drive.google.com/file/d/1OA1mnKvjKR1dzvcMX0Ji9l5tZsPOLyCN/view?usp=sharing",
        images: [
            "https://drive.google.com/file/d/1OA1mnKvjKR1dzvcMX0Ji9l5tZsPOLyCN/view?usp=sharing",
            "https://drive.google.com/file/d/1lo8WpMaRDLFltugUfF8sY1YdCg_kTDCT/view?usp=sharing",
            "https://drive.google.com/file/d/1yt6iQ8z12KuM4lI6326J9CWuudmDPE9n/view?usp=sharing",
            "https://drive.google.com/file/d/1vgU7Iq49IIsmV1wmtVvI7IibcCjWl0Uq/view?usp=sharing",
            "https://drive.google.com/file/d/1SAVwfDSuelwIPMwKnxO75_zNDOk9X9T1/view?usp=sharing",
            "https://drive.google.com/file/d/1cOxDfvlx2uJDwGc1bsd9tUSku9HvmcKC/view?usp=sharing"
        ]
    }
];

// ============================================
// SHIPS FUNCTIONS
// ============================================

// Fetch all ships from API
export async function fetchShips(): Promise<ShipsAPIResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/ships`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn("API Error (fetchShips), using fallback mock data:", error);
        return {
            success: true,
            count: MOCK_SHIPS.length,
            source: "mock-fallback",
            data: MOCK_SHIPS
        };
    }
}

// Fetch all ships as array
export async function fetchAllShips(): Promise<Ship[]> {
    const response = await fetchShips();
    return response.data;
}

// Get ship by name
export async function getShipByName(name: string): Promise<Ship | undefined> {
    const ships = await fetchAllShips();
    return ships.find(ship => ship.name.toLowerCase() === name.toLowerCase());
}

// Get ships with cabin count
export async function getShipsWithCabinCount(): Promise<ShipWithCabinCount[]> {
    const [ships, cabins] = await Promise.all([
        fetchAllShips(),
        fetchAllCabins()
    ]);

    return ships.map(ship => {
        // Match cabins to ship by exact name or partial match
        const shipCabins = cabins.filter(cabin =>
            normalizeBoatName(cabin.boat_name) === normalizeBoatName(ship.name)
        );
        return {
            ...ship,
            cabinCount: shipCabins.length
        };
    });
}

// ============================================
// CABINS FUNCTIONS
// ============================================

// Fetch cabins with pagination
export async function fetchCabins(page = 1, limit = 20): Promise<CabinAPIResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/cabins?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn("API Error (fetchCabins), using fallback mock data:", error);
        return {
            success: true,
            pagination: {
                page: 1,
                limit: 100,
                total: MOCK_CABINS.length,
                totalPages: 1
            },
            source: "mock-fallback",
            data: MOCK_CABINS
        };
    }
}

// Fetch ALL cabins (all pages)
export async function fetchAllCabins(): Promise<Cabin[]> {
    // First fetch to get pagination info
    const firstPage = await fetchCabins(1, 100);
    let allCabins = [...firstPage.data];

    // If more pages exist, fetch them in parallel
    if (firstPage.pagination.totalPages > 1) {
        const pagePromises = [];
        for (let i = 2; i <= firstPage.pagination.totalPages; i++) {
            pagePromises.push(fetchCabins(i, 100));
        }

        const responses = await Promise.all(pagePromises);
        responses.forEach(response => {
            if (response.success && response.data) {
                allCabins = [...allCabins, ...response.data];
            }
        });
    }

    return allCabins;
}

// Fetch single cabin detail (includes images array)
export async function fetchCabinDetails(cabinId: string): Promise<Cabin | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/cabins/${cabinId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.data) {
            return result.data as Cabin;
        }
        return null;
    } catch (error) {
        console.warn(`API Error (fetchCabinDetails ${cabinId}):`, error);
        return null;
    }
}

// Fetch cabins by boat name
export async function fetchCabinsByBoat(boatName: string): Promise<Cabin[]> {
    const allCabins = await fetchAllCabins();
    const normalizedSearch = normalizeBoatName(boatName);
    return allCabins.filter(cabin =>
        normalizeBoatName(cabin.boat_name) === normalizedSearch
    );
}

// Get unique boat names from cabins
export async function getBoatNames(): Promise<string[]> {
    const cabins = await fetchAllCabins();
    const boatNames = [...new Set(cabins.map(cabin => cabin.boat_name))];
    return boatNames.sort();
}

// ============================================
// AVAILABILITY FUNCTIONS
// ============================================

// Check availability for a specific date
export async function checkAvailability(date: Date | string): Promise<AvailabilityResponse> {
    let dateStr: string;
    if (typeof date === "string") {
        dateStr = date;
    } else {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        dateStr = `${year}-${month}-${day}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/availability?date=${dateStr}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        // Fallback to mock response if API fails
        console.warn("API Error, using fallback availability:", error);
        return {
            success: true,
            source: "mock-fallback",
            data: {
                date: dateStr,
                total: 80,
                operators: [
                    {
                        operator: "SEMESTA VOYAGE",
                        total: 5,
                        cabins: [
                            { name: "Moon", available: 1 },
                            { name: "Mars", available: 2 }
                        ]
                    },
                    {
                        operator: "DERYA LIVEABOARD",
                        total: 5,
                        cabins: [
                            { name: "Padar", available: 1 },
                            { name: "Rinca", available: 2 }
                        ]
                    },
                    {
                        operator: "BARAKATI LIVEBOARD",
                        total: 5,
                        cabins: [
                            { name: "Kadatua", available: 1 }
                        ]
                    },
                    {
                        operator: "ELBARK CRUISE",
                        total: 5,
                        cabins: [
                            { name: "Banda Neira", available: 1 }
                        ]
                    },
                    {
                        operator: "NEW IJC",
                        total: 5,
                        cabins: [
                            { name: "Deluxe Suite", available: 2 }
                        ]
                    },
                    {
                        operator: "AL FATHRAN (DELUXE)",
                        total: 5,
                        cabins: [
                            { name: "Deluxe Cabin", available: 2 }
                        ]
                    },
                    {
                        operator: "GAISAN (DELUXE)",
                        total: 5,
                        cabins: [
                            { name: "Deluxe Room", available: 2 }
                        ]
                    },
                    {
                        operator: "HATIRA HELA (DELUXE)",
                        total: 5,
                        cabins: [
                            { name: "Deluxe Suite", available: 2 }
                        ]
                    },
                    {
                        operator: "GAMALA (DELUXE)",
                        total: 5,
                        cabins: [
                            { name: "Deluxe Cabin", available: 2 }
                        ]
                    },
                    {
                        operator: "MAHESWARI (DELUXE)",
                        total: 5,
                        cabins: [
                            { name: "Deluxe Room", available: 2 }
                        ]
                    },
                    {
                        operator: "GIONA LIVEABOARD",
                        total: 5,
                        cabins: [
                            { name: "Standard Cabin", available: 2 }
                        ]
                    },
                    {
                        operator: "YUKAI (DELUXE)",
                        total: 5,
                        cabins: [
                            { name: "Deluxe Suite", available: 2 }
                        ]
                    },
                    {
                        operator: "YUMANA",
                        total: 5,
                        cabins: [
                            { name: "Deluxe Suite", available: 2 }
                        ]
                    },
                    {
                        operator: "AKASSA CRUISE",
                        total: 5,
                        cabins: [
                            { name: "Premium Cabin", available: 2 }
                        ]
                    },
                    {
                        operator: "AMORE BOAT",
                        total: 5,
                        cabins: [
                            { name: "Deluxe Room", available: 2 }
                        ]
                    },
                    {
                        operator: "BOMBANA 02",
                        total: 5,
                        cabins: [
                            { name: "Standard Suite", available: 2 }
                        ]
                    }
                ]
            }
        };
    }
}

// ============================================
// SEARCH FUNCTIONS
// ============================================

export interface CabinSearchParams {
    boatName?: string;
    minCapacity?: number;
    maxPrice?: number;
    facilities?: Partial<CabinFacilities>;
}

export async function searchCabins(params: CabinSearchParams): Promise<Cabin[]> {
    const allCabins = await fetchAllCabins();

    return allCabins.filter(cabin => {
        // Filter by boat name
        if (params.boatName) {
            const normalizedSearch = normalizeBoatName(params.boatName);
            const normalizedCabin = normalizeBoatName(cabin.boat_name);
            if (normalizedCabin !== normalizedSearch) {
                return false;
            }
        }

        // Filter by capacity (if capacity > 0)
        if (params.minCapacity && cabin.total_capacity > 0 && cabin.total_capacity < params.minCapacity) {
            return false;
        }

        // Filter by price (if price > 0)
        if (params.maxPrice && cabin.price > 0 && cabin.price > params.maxPrice) {
            return false;
        }

        // Filter by facilities
        if (params.facilities) {
            for (const [key, value] of Object.entries(params.facilities)) {
                if (value && !cabin.facilities[key as keyof CabinFacilities]) {
                    return false;
                }
            }
        }

        return true;
    });
}

export interface SearchWithAvailabilityParams extends CabinSearchParams {
    checkInDate?: Date | string;
    checkOutDate?: Date | string;
    guests?: number;
}

export async function searchCabinsWithAvailability(
    params: SearchWithAvailabilityParams
): Promise<CabinWithAvailability[]> {
    // Get all matching cabins - pass guests as minCapacity to filter by capacity
    const cabins = await searchCabins({
        ...params,
        minCapacity: params.guests
    });

    // If no dates specified, return cabins without availability info
    if (!params.checkInDate) {
        return cabins.map(cabin => ({
            ...cabin,
            availability: "unknown" as const
        }));
    }

    // Get availability for the check-in date
    const availability = await checkAvailability(params.checkInDate);

    // Merge cabin data with availability
    const cabinsWithAvailability: CabinWithAvailability[] = cabins.map(cabin => {
        // Find matching operator (handle name variations)
        const operator = availability.data.operators.find(op =>
            normalizeBoatName(cabin.boat_name) === normalizeBoatName(op.operator)
        );

        // Find matching cabin availability (API uses long descriptive names, we match by cabin_name)
        const cabinAvail = operator?.cabins.find(c =>
            c.name.toLowerCase().includes(cabin.cabin_name.toLowerCase())
        );

        return {
            ...cabin,
            availability: cabinAvail && cabinAvail.available > 0 ? "available" : "booked"
        };
    });

    // Filter to only return cabins that are available
    return cabinsWithAvailability.filter(c => c.availability === "available");
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Normalize boat names for matching
// Handles variations between APIs:
// - Availability API: "SEMESTA VOYAGES", "GAISAN (DELUXE)", "HATIRA HELA (DELUXE)"
// - Ships API: "SEMESTA VOYAGE", "GIONA LIVEABOARD"
// - Cabins API: "SEMESTA VOYAGE", "DERYA LIVEABOARD"
export function normalizeBoatName(name: string): string {
    return name
        .toUpperCase()
        .trim()
        // Remove suffixes like (DELUXE), (PREMIUM), etc.
        .replace(/\s*\([^)]*\)\s*/g, "")
        // Normalize multiple spaces
        .replace(/\s+/g, " ")
        // VOYAGES → VOYAGE (availability uses VOYAGES, ships uses VOYAGE)
        .replace("VOYAGES", "VOYAGE")
        // LIVEBOARD → LIVEABOARD (typo normalization)
        .replace("LIVEBOARD", "LIVEABOARD")
        .trim();
}

// Check if two boat names match (with fuzzy matching for partial names)
export function boatNamesMatch(name1: string, name2: string): boolean {
    const n1 = normalizeBoatName(name1);
    const n2 = normalizeBoatName(name2);

    // Exact match
    if (n1 === n2) return true;

    // Check if one contains the other (for partial matches)
    if (n1.includes(n2) || n2.includes(n1)) return true;

    // Check first word match (e.g., "AKASSA" matches "AKASSA CRUISE")
    const words1 = n1.split(" ");
    const words2 = n2.split(" ");
    if (words1[0] === words2[0] && words1[0].length > 3) return true;

    return false;
}

// Format price to IDR
export function formatPrice(price: number): string {
    if (price === 0) return "Contact for price";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

// Check if URL is a valid image URL (not a folder)
export function isValidImageUrl(url: string): boolean {
    if (!url) return false;
    // Filter out folder URLs
    if (url.includes('/folders/') || url.includes('/drive/folders')) return false;
    // Must be a file URL or non-Google Drive URL
    return true;
}

// Convert Google Drive link to direct image URL
export function getDirectImageUrl(driveUrl: string): string {
    if (!driveUrl) return "/placeholder-boat.svg";

    // Filter out folder URLs early
    if (driveUrl.includes('/folders/') || driveUrl.includes('/drive/folders')) {
        return "/placeholder-cabin.jpg";
    }

    // Already a direct URL (not Google Drive)
    if (!driveUrl.includes("drive.google.com") && !driveUrl.includes("docs.google.com")) {
        return driveUrl;
    }

    let fileId: string | null = null;

    // Try different patterns to extract file ID
    // Pattern 1: /d/ID/ or /d/ID (most common)
    const pattern1 = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (pattern1 && pattern1[1]) {
        fileId = pattern1[1];
    }

    // Pattern 2: ?id=ID or &id=ID
    if (!fileId) {
        const pattern2 = driveUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (pattern2 && pattern2[1]) {
            fileId = pattern2[1];
        }
    }

    // Pattern 3: /file/d/ID
    if (!fileId) {
        const pattern3 = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (pattern3 && pattern3[1]) {
            fileId = pattern3[1];
        }
    }

    // Pattern 4: /uc?id=ID or /uc?export=view&id=ID
    if (!fileId) {
        const pattern4 = driveUrl.match(/\/uc\?.*id=([a-zA-Z0-9_-]+)/);
        if (pattern4 && pattern4[1]) {
            fileId = pattern4[1];
        }
    }

    if (fileId) {
        // Use Google Drive's lh3 service - best for HD images
        return `https://lh3.googleusercontent.com/d/${fileId}=w1600`;
    }

    // Fallback: return placeholder
    return "/placeholder-boat.svg";
}

// Get availability status label
export function getAvailabilityLabel(status?: string): string {
    switch (status) {
        case "available": return "Available";
        case "booked": return "Booked";
        case "hold": return "On Hold";
        case "maintenance": return "Maintenance";
        default: return "Check Availability";
    }
}

// Get availability badge color
export function getAvailabilityColor(status?: string): { bg: string; text: string } {
    switch (status) {
        case "available": return { bg: "bg-green-500", text: "text-white" };
        case "booked": return { bg: "bg-red-500", text: "text-white" };
        case "hold": return { bg: "bg-yellow-500", text: "text-black" };
        case "maintenance": return { bg: "bg-gray-500", text: "text-white" };
        default: return { bg: "bg-blue-500", text: "text-white" };
    }
}
