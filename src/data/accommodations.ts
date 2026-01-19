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
    island: "Malenge" | "Una-una" | "Kadidiri" | "Bomba" | "Luwuk";
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
        id: "malenge-1",
        island: "Malenge",
        slug: "malenge",
        guestHouseName: "The Cliff dibe resort",
        shortDescription: "A cliffside resort on Malenge Island with panoramic ocean views, a pristine white-sand beach, lush rainforest backdrop, and an on-site dive center, ideal for both diving and serene tropical relaxation.",
        rooms: [
            {
                id: "deluxe-bungalow-ac",
                name: "Deluxe Bungalow AC",
                images: {
                    main: "/accommodation/malenge/deluxe_bungalow_AC/main.webp",
                    bed: "/accommodation/malenge/deluxe_bungalow_AC/bed.webp",
                    bath: "/accommodation/malenge/deluxe_bungalow_AC/bath.webp",
                    balcony: "/accommodation/malenge/deluxe_bungalow_AC/balcony.webp"
                }
            },
            {
                id: "deluxe-bungalow-fan",
                name: "Deluxe Bungalow Fan",
                images: {
                    main: "/accommodation/malenge/delux_bungalow_FAN/main.webp",
                    bed: "/accommodation/malenge/delux_bungalow_FAN/bed.webp",
                    bath: "/accommodation/malenge/delux_bungalow_FAN/bath.webp",
                    balcony: "/accommodation/malenge/delux_bungalow_FAN/balcony.webp"
                }
            },
            {
                id: "standard-bungalow-fan",
                name: "Standard Bungalow Fan",
                images: {
                    main: "/accommodation/malenge/Standard_Bungalow_Fan/main.webp",
                    bed: "/accommodation/malenge/Standard_Bungalow_Fan/bed.webp",
                    bath: "/accommodation/malenge/Standard_Bungalow_Fan/bath.webp",
                    balcony: "/accommodation/malenge/Standard_Bungalow_Fan/balcony.webp"
                }
            },
            {
                id: "family-bungalow-fan",
                name: "Family Bungalow Fan",
                images: {
                    main: "/accommodation/malenge/Family_Bungalow_Fan/main.webp",
                    bed: "/accommodation/malenge/Family_Bungalow_Fan/bed.webp",
                    bath: "/accommodation/malenge/Family_Bungalow_Fan/bath.webp",
                    balcony: "/accommodation/malenge/Family_Bungalow_Fan/balcony.webp"
                }
            }
        ],
        otherImages: [
            "/accommodation/malenge/other1.webp",
            "/accommodation/malenge/other2.webp",
            "/accommodation/malenge/other3.webp",
            "/accommodation/malenge/other4.webp",
            "/accommodation/malenge/other5.webp"
        ],
        // Mapped properties
        get title() { return this.guestHouseName; },
        get description() { return this.shortDescription; },
        get image() { return this.otherImages[0]; }, // Using first "other" image as main card image
        get destination() { return this.island; }
    },
    {
        id: "una-una-1",
        island: "Una-una",
        slug: "una-una",
        guestHouseName: "Pristine",
        shortDescription: "A beachfront PADI dive resort on remote Una Una Island with cozy wooden bungalows, ocean-view hammocks, and access to top Togean dive sites, plus all-inclusive meals and a calm, off-the-grid atmosphere.",
        rooms: [
            {
                id: "standard-room",
                name: "Standard room",
                images: {
                    main: "/accommodation/una-una/standard_room/main.webp",
                    bed: "/accommodation/una-una/standard_room/bed.webp"
                }
            },
            {
                id: "superior-bungalow",
                name: "Superior Bungalow",
                images: {
                    main: "/accommodation/una-una/superior_bungalow/main.webp",
                    bed: "/accommodation/una-una/superior_bungalow/bed.webp"
                }
            },
            {
                id: "deluxe-seaview-bungalow",
                name: "Deluxe Seaview bungalow",
                images: {
                    main: "/accommodation/una-una/Deluxe_Seaview_bungalow/main.webp",
                    bed: "/accommodation/una-una/Deluxe_Seaview_bungalow/bed.jpeg",
                    bath: "/accommodation/una-una/Deluxe_Seaview_bungalow/bath.webp",
                    balcony: "/accommodation/una-una/Deluxe_Seaview_bungalow/balcon.jpeg"
                }
            },
            {
                id: "vip-family-room",
                name: "VIP/Family Room",
                images: {
                    bed: "/accommodation/una-una/VIPFamilyRoom/bed.webp",
                    balcony: "/accommodation/una-una/VIPFamilyRoom/balcony.webp"
                }
            }
        ],
        otherImages: [
            "/accommodation/una-una/other1.webp",
            "/accommodation/una-una/other2.webp",
            "/accommodation/una-una/other3.webp",
            "/accommodation/una-una/other4.webp",
            "/accommodation/una-una/other5.webp",
            "/accommodation/una-una/other6.webp"
        ],
        get title() { return this.guestHouseName; },
        get description() { return this.shortDescription; },
        get image() { return this.otherImages[0]; },
        get destination() { return this.island; }
    },
    {
        id: "kadidiri-1",
        island: "Kadidiri",
        slug: "kadidiri",
        guestHouseName: "Kadidiri Paradise",
        shortDescription: "A laid-back resort with rustic beachfront bungalows and a colorful house reef just off the jetty, perfect for snorkeling, diving, kayaking, and enjoying a simple barefoot island stay.",
        rooms: [
            {
                id: "superior-double-twin",
                name: "Superior Double or Twin Room with Sea View",
                images: {
                    main: "/accommodation/kadidiri/Superior_Double_or_Twin_Room_with_Sea_View/main.webp",
                    bed: "/accommodation/kadidiri/Superior_Double_or_Twin_Room_with_Sea_View/bed.webp",
                    bath: "/accommodation/kadidiri/Superior_Double_or_Twin_Room_with_Sea_View/bath.webp"
                }
            },
            {
                id: "villa-room",
                name: "Villa room",
                images: {
                    main: "/accommodation/kadidiri/Villa_room/main.webp",
                    bed: "/accommodation/kadidiri/Villa_room/bed.webp",
                    bath: "/accommodation/kadidiri/Villa_room/bath.webp",
                    balcony: "/accommodation/kadidiri/Villa_room/balcony.webp"
                }
            },
            {
                id: "deluxe-double-seaview",
                name: "Deluxe Double Room with Sea View",
                images: {
                    // Main image is missing in folder, mapping bed to main to ensure it shows up in portrait slot as requested user intent (showing "main" portrait)
                    main: "/accommodation/kadidiri/Deluxe_Double_Room_with_Sea_View/balcony.webp",
                    // Also showing balcony as the secondary image since bed is now main
                    bed: "/accommodation/kadidiri/Deluxe_Double_Room_with_Sea_View/bed.webp",
                },
                orientation: "portrait"
            },
            {
                id: "standard-double",
                name: "Standard double",
                images: {
                    main: "/accommodation/kadidiri/standar_double/main.webp",
                    bed: "/accommodation/kadidiri/standar_double/bed.webp"
                },
                orientation: "portrait"
            }
        ],
        otherImages: [
            "/accommodation/kadidiri/other1.webp",
            "/accommodation/kadidiri/other2.webp",
            "/accommodation/kadidiri/other3.webp",
            "/accommodation/kadidiri/other4.webp",
            "/accommodation/kadidiri/other5.webp"
        ],
        get title() { return this.guestHouseName; },
        get description() { return this.shortDescription; },
        get image() { return this.otherImages[0]; },
        get destination() { return this.island; }
    },
    {
        id: "bomba-1",
        island: "Bomba",
        slug: "bomba",
        guestHouseName: "Poya Lisa",
        shortDescription: "A quiet private-island retreat near Bomba Village with seafront cottages over clear water, great coral reef snorkeling, fresh seafood, and an unhurried, nature-first island experience.",
        rooms: [
            {
                id: "deluxe-bungalow",
                name: "Deluxe Bungalows",
                images: {
                    main: "/accommodation/bomba/Deluxe_Bungalows/main.webp",
                    bed: "/accommodation/bomba/Deluxe_Bungalows/bed.webp",
                    balcony: "/accommodation/bomba/Deluxe_Bungalows/balcony.webp"
                },
                orientation: "portrait"
            },
            {
                id: "superior-bungalow",
                name: "Superior Bungalows",
                images: {
                    main: "/accommodation/bomba/Superior_Bungalows/main.webp",
                    bed: "/accommodation/bomba/Superior_Bungalows/bed.webp",
                },
                orientation: "portrait"
            },
            {
                id: "standard-bungalow",
                name: "Standard bungalows",
                images: {
                    main: "/accommodation/bomba/Standard_Bungalows/main.webp",
                    bed: "/accommodation/bomba/Standard_Bungalows/bed.webp",
                },
                orientation: "portrait"
            }
        ],
        otherImages: [
            "/accommodation/bomba/other1.webp",
            "/accommodation/bomba/other2.webp",
            "/accommodation/bomba/other3.webp",
            "/accommodation/bomba/other4.webp",
            "/accommodation/bomba/other5.webp",
            "/accommodation/bomba/other6.webp"
        ],
        get title() { return this.guestHouseName; },
        get description() { return this.shortDescription; },
        get image() { return this.otherImages[0]; },
        get destination() { return this.island; }
    },
    {
        id: "luwuk-1",
        island: "Luwuk",
        slug: "luwuk",
        guestHouseName: "Estrella",
        shortDescription: "A modern 4-star hotel in Luwuk with comfortable rooms, conference spaces, two outdoor pools, spa, gym, and on-site dining, combining resort-style facilities with easy access to town and bay views.",
        rooms: [
            {
                id: "double-bed",
                name: "Double Bed",
                images: {
                    main: "/accommodation/Luwuk/DoubleBed/bed.webp",
                    bed: "/accommodation/Luwuk/DoubleBed/bath.webp",
                }
            },
            {
                id: "deluxe",
                name: "Deluxe",
                images: {
                    main: "/accommodation/Luwuk/Delux/bed.webp",
                    bed: "/accommodation/Luwuk/Delux/toilet.webp",
                }
            },
            {
                id: "business-garden-view",
                name: "Business with garden view",
                images: {
                    main: "/accommodation/Luwuk/Business_with_garden_view/bed1.webp",
                    bed: "/accommodation/Luwuk/Business_with_garden_view/bed2.webp",
                    bath: "/accommodation/Luwuk/Business_with_garden_view/toilet.webp",
                }
            },
            {
                id: "grand-deluxe-garden-view",
                name: "Grand deluxe with garden view",
                images: {
                    main: "/accommodation/Luwuk/Grand_deluxe_with_garden_view/bed.webp",
                    bed: "/accommodation/Luwuk/Grand_deluxe_with_garden_view/toilet.webp",
                }
            },
            {
                id: "premier-balcony",
                name: "Premier with balcony",
                images: {
                    main: "/accommodation/Luwuk/premier_with_balcony/bed.jpeg",
                    bed: "/accommodation/Luwuk/premier_with_balcony/bed2.webp",
                    bath: "/accommodation/Luwuk/premier_with_balcony/toilet.webp",
                }
            }
        ],
        otherImages: [
            "/accommodation/Luwuk/other1.webp",
            "/accommodation/Luwuk/other2.webp",
            "/accommodation/Luwuk/other3.webp",
            "/accommodation/Luwuk/other4.webp",
            "/accommodation/Luwuk/other6.webp",
            "/accommodation/Luwuk/other7.webp",
            "/accommodation/Luwuk/other8.webp",
            "/accommodation/Luwuk/other9.webp",
            "/accommodation/Luwuk/other10.webp",
            "/accommodation/Luwuk/other11.webp"
        ],
        get title() { return this.guestHouseName; },
        get description() { return this.shortDescription; },
        get image() { return this.otherImages[0]; },
        get destination() { return this.island; }
    }
];
