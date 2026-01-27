export type RoomImages = {
    main?: string;
    bed?: string;
    bath?: string;
    balcony?: string;
};

export type Room = {
    id: string;
    name: string;
    images: RoomImages;
    orientation?: "landscape" | "portrait";
};

export type GuestHouse = {
    id: string;
    island: "Labuan Bajo" | "Komodo Island" | "Rinca Island" | "Padar Island" | "Kanawa Island";
    slug: string;
    guestHouseName: string;
    shortDescription: string;
    rooms: Room[];
    otherImages: string[];
    // properties for compatibility with existing listing page
    title: string;
    description: string;
    image: string;
    destination: string;
};

export const accommodations: GuestHouse[] = [
    {
        id: "labuan-bajo-1",
        island: "Labuan Bajo",
        slug: "labuan-bajo",
        guestHouseName: "Ayana Komodo Waecicu Beach",
        shortDescription: "A world-class resort perched on cliffs above Waecicu Beach, offering panoramic ocean views, infinity pools, private beach access, and award-winning cuisine just minutes from Labuan Bajo town.",
        rooms: [
            {
                id: "ocean-view-room",
                name: "Ocean View Room",
                images: {
                    main: "/accommodation/labuan-bajo/main.png",
                }
            },
            {
                id: "deluxe-ocean-room",
                name: "Deluxe Ocean Room",
                images: {
                    main: "/accommodation/labuan-bajo/main.png",
                }
            },
            {
                id: "komodo-suite",
                name: "Komodo Suite",
                images: {
                    main: "/accommodation/labuan-bajo/main.png",
                }
            }
        ],
        otherImages: [
            "/accommodation/labuan-bajo/main.png"
        ],
        get title() { return this.guestHouseName; },
        get description() { return this.shortDescription; },
        get image() { return this.otherImages[0]; },
        get destination() { return this.island; }
    },
    {
        id: "komodo-island-1",
        island: "Komodo Island",
        slug: "komodo-island",
        guestHouseName: "Komodo Resort & Diving Club",
        shortDescription: "An eco-friendly dive resort on the shores of Komodo Island itself, offering rustic-chic bungalows, PADI dive center access, and unparalleled proximity to dragon trekking and world-class dive sites.",
        rooms: [
            {
                id: "garden-bungalow",
                name: "Garden Bungalow",
                images: {
                    main: "/accommodation/komodo-island/main.png",
                }
            },
            {
                id: "beachfront-bungalow",
                name: "Beachfront Bungalow",
                images: {
                    main: "/accommodation/komodo-island/main.png",
                }
            },
            {
                id: "overwater-bungalow",
                name: "Overwater Bungalow",
                images: {
                    main: "/accommodation/komodo-island/main.png",
                }
            }
        ],
        otherImages: [
            "/accommodation/komodo-island/main.png"
        ],
        get title() { return this.guestHouseName; },
        get description() { return this.shortDescription; },
        get image() { return this.otherImages[0]; },
        get destination() { return this.island; }
    },
    {
        id: "rinca-island-1",
        island: "Rinca Island",
        slug: "rinca-island",
        guestHouseName: "Rinca Eco Lodge",
        shortDescription: "A small eco-lodge near Rinca ranger station, offering simple but comfortable accommodation with incredible savannah views, dragon encounters, and sunrise hikes to nearby viewpoints.",
        rooms: [
            {
                id: "standard-cabin",
                name: "Standard Cabin",
                images: {
                    main: "/accommodation/rinca-island/main.jpg",
                }
            },
            {
                id: "seaview-cabin",
                name: "Seaview Cabin",
                images: {
                    main: "/accommodation/rinca-island/main.jpg",
                }
            }
        ],
        otherImages: [
            "/accommodation/rinca-island/main.jpg"
        ],
        get title() { return this.guestHouseName; },
        get description() { return this.shortDescription; },
        get image() { return this.otherImages[0]; },
        get destination() { return this.island; }
    },
    {
        id: "padar-island-1",
        island: "Padar Island",
        slug: "padar-island",
        guestHouseName: "Padar Viewpoint Camp",
        shortDescription: "A glamping-style camp at the foot of Padar's famous viewpoint, offering stargazing nights, sunrise treks, and the most iconic three-bay panorama in all of Indonesia.",
        rooms: [
            {
                id: "luxury-tent",
                name: "Luxury Tent",
                images: {
                    main: "/accommodation/padar-island/main.png",
                }
            },
            {
                id: "safari-tent",
                name: "Safari Tent",
                images: {
                    main: "/accommodation/padar-island/main.png",
                }
            }
        ],
        otherImages: [
            "/accommodation/padar-island/main.png"
        ],
        get title() { return this.guestHouseName; },
        get description() { return this.shortDescription; },
        get image() { return this.otherImages[0]; },
        get destination() { return this.island; }
    },
    {
        id: "kanawa-island-1",
        island: "Kanawa Island",
        slug: "kanawa-island",
        guestHouseName: "Kanawa Island Resort",
        shortDescription: "A private island retreat with crystal-clear waters and spectacular house reef snorkeling. Beachfront bungalows, fresh seafood, and the serenity of a car-free island paradise.",
        rooms: [
            {
                id: "beach-bungalow",
                name: "Beach Bungalow",
                images: {
                    main: "/accommodation/kanawa-island/main.png",
                }
            },
            {
                id: "hillside-bungalow",
                name: "Hillside Bungalow",
                images: {
                    main: "/accommodation/kanawa-island/main.png",
                }
            },
            {
                id: "family-bungalow",
                name: "Family Bungalow",
                images: {
                    main: "/accommodation/kanawa-island/main.png",
                }
            }
        ],
        otherImages: [
            "/accommodation/kanawa-island/main.png"
        ],
        get title() { return this.guestHouseName; },
        get description() { return this.shortDescription; },
        get image() { return this.otherImages[0]; },
        get destination() { return this.island; }
    }
];
