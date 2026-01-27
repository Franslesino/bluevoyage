
import { type ReactNode } from "react";

export const theKomodoMosaic = {
    slug: "the-komodo-mosaic",
    headline: "The Komodo Mosaic",
    subline: "SIGNATURE PROGRAM",
    shortDescription: "The Perfect Equilibrium",
    tagline: "A complete story of the park—dragons, reefs, pink beaches, and cultural depth, balanced into one signature flow.",
    modelConfirmation: "Daily Private Cruises • Nightly Luxury Villa Stay • Flexible Day-by-Day Pace",
    vibeTags: ["Comprehensive", "Diverse", "Iconic"],

    // Core experience pillars - NO percentages, just icons + labels
    stats: [
        { label: "Wildlife", icon: "/icons/mosaic/reefs_v2.png", description: "Dragons, mantas, bats, turtles" },
        { label: "Relaxation", icon: "/icons/mosaic/relaxation_v2.png", description: "Sandbars, quiet coves, sunset decks" },
        { label: "Culture", icon: "/icons/mosaic/culture_v2.png", description: "Market visits, village tales, connection" },
        { label: "Hiking", icon: "/icons/mosaic/hiking_v2.png", description: "Padar and Kelor views—earned, not exhausting" }
    ],

    // Program snapshot (floating card on desktop)
    snapshot: {
        duration: "From 8 Days",
        bestFor: "First-time Komodo / Couples / Families",
        style: "Balanced / Iconic / Unhurried"
    },

    // Why Mosaic Section
    concept: {
        eyebrow: "WHY MOSAIC EXISTS",
        headline: "The signature 'best-of'—without the rush.",
        description: "Mosaic is our most complete introduction to Komodo. It blends iconic encounters like dragons and Padar with genuine rest—plus cultural moments that make the experience feel connected. You leave feeling like you've seen the whole story, not just the highlights."
    },

    // 8-Day Itinerary (distinct from Odyssey)
    itinerary: [
        {
            day: 1,
            title: "Arrival & Sunset Welcome",
            schedule: {
                morning: "Airport pickup, check-in to your villa",
                afternoon: "Relax by the pool or explore Labuan Bajo harbor",
                evening: "Sunset drinks at Paradise Bar"
            },
            highlight: "Welcome to the gateway of dragons.",
            image: "/destinations/destination_labuan_bajo.webp"
        },
        {
            day: 2,
            title: "Dragons of Rinca",
            schedule: {
                morning: "Boat to Rinca Island, ranger Trek to see dragons",
                afternoon: "Snorkel at Kelor Island's clear waters",
                evening: "Early dinner"
            },
            highlight: "Walking with prehistoric legends.",
            image: "/destinations/destination_rinca.webp"
        },
        {
            day: 3,
            title: "Padar Heights & Pink Sands",
            schedule: {
                morning: "Early hike to Padar scenic viewpoint",
                afternoon: "Long relax at Pink Beach (Long Beach)",
                evening: "Cruise back under the stars"
            },
            highlight: "The postcard moment you'll never forget.",
            image: "/destinations/destination_padar.webp"
        },
        {
            day: 4,
            title: "Manta Ray Encounter",
            schedule: {
                morning: "Snorkel search for Mantas at Manta Point",
                afternoon: "Taka Makassar sandbar picnic",
                evening: "Relaxing evening at villa"
            },
            highlight: "Swimming with the ocean's gentle giants.",
            image: "/wildlife_real/sea/manta-ray/hero.webp"
        },
        {
            day: 5,
            title: "Culture & Cave Quest",
            schedule: {
                morning: "Rangko Cave trip (swim in the cave)",
                afternoon: "Visit a local fishing village",
                evening: "Traditional Flores dinner"
            },
            highlight: "Discovering the secret blue cave.",
            image: "/local-community-1.webp"
        },
        {
            day: 6,
            title: "Turtle City Dip",
            schedule: {
                morning: "Snorkeling at Siaba Besar (Turtle City)",
                afternoon: "Drift snorkel at Tatawa Besar",
                evening: "Free time"
            },
            highlight: "Surrounded by graceful sea turtles.",
            image: "/wildlife_real/sea/green-sea-turtle/hero.webp"
        },
        {
            day: 7,
            title: "Island Hop & Chill",
            schedule: {
                morning: "Visit Kanawa Island for snorkeling",
                afternoon: "Bidadari Island relaxation",
                evening: "Farewell dinner celebration"
            },
            highlight: "Pure island bliss to end the trip.",
            image: "/program-beach.webp"
        },
        {
            day: 8,
            title: "Departure",
            schedule: {
                morning: "Souvenir shopping (optional)",
                afternoon: "Transfer to Komodo Airport",
                evening: "Safe travels home"
            },
            highlight: "Leaving with a heart full of Komodo.",
            image: "/boat/boat-1.webp"
        }
    ],

    // Social Proof
    socialProof: {
        quote: "We felt like we saw everything Komodo is famous for—without ever feeling rushed.",
        attribution: "Guest, Private Mosaic Journey",
        tags: ["Dragon encounters", "Unhurried pace", "Private comfort"],
        image: "/journeys/mosaic/mosaic-testimonial.webp"
    },

    // Signature Highlights
    highlights: [
        {
            title: "Dragon Trekking",
            image: "/destinations/destination_rinca.webp",
            description: "Safe, ranger-led encounters with the world's largest lizard"
        },
        {
            title: "Pink Beach Relaxation",
            image: "/destinations/destination_pink_beach.webp",
            description: "A rare natural wonder with rosy sands and turquoise water"
        },
        {
            title: "Manta Point Snorkeling",
            image: "/wildlife_real/sea/manta-ray/hero.webp",
            description: "Swimming alongside massive reef manta rays"
        },
        {
            title: "Padar Island Viewpoint",
            image: "/destinations/destination_padar.webp",
            description: "The iconic three-bay panorama earned by a morning hike"
        }
    ],

    // Premium Standard Tabs
    tabs: {
        villa: {
            title: "Your Villa",
            headline: "Quiet luxury: private bathrooms, breeze, and deep sleep.",
            description: "Every evening returns you to comfort in Labuan Bajo. Spacious rooms with views, modern amenities, and the kind of quiet that helps you truly rest after an adventure.",
            points: [
                "Private bathroom & hot water",
                "Air conditioning",
                "Ocean or garden views",
                "Comfortable bedding for deep rest"
            ],
            images: [
                "/accommodation/kadidiri/other1.webp",
                "/accommodation/kadidiri/other2.webp",
                "/accommodation/kadidiri/other3.webp"
            ]
        },
        boat: {
            title: "Your Boat",
            headline: "Shaded lounge, open deck air, and space to slow down.",
            description: "This is your day base—a traditional Phinisi or speed boat upgraded for comfort. Cushioned seating, shade when you need it, and a crew that knows the park intimately.",
            points: [
                "Shaded lounge area with cushions",
                "Open sun deck for panoramic views",
                "Fresh towels & drinking water",
                "Safety equipment & snorkel gear"
            ],
            images: [
                "/boat/boat-2.webp",
                "/boat/boat-3.webp",
                "/boat/boat-1.webp"
            ]
        },
        crew: {
            title: "Your Crew",
            headline: "Warm, attentive, and discreet—hospitality without hovering.",
            description: "Our guides and crew are locals who know every reef, every tide, and when to offer help versus space. They make the journey smooth without ever making it feel managed.",
            points: [
                "Experienced local captain & guide",
                "Reef knowledge & safety expertise",
                "Attentive service, never intrusive",
                "Cultural bridge & language support"
            ],
            images: [
                "/local-community-1.webp",
                "/local-community-2.webp",
                "/boat/boat-1.webp"
            ]
        }
    },

    // Pricing & Logistics
    pricing: {
        title: "Investment",
        text: "From IDR [TBD] / person",
        note: "Final pricing varies by group size, season, and customization. Contact us for a tailored quote.",
        included: [
            "Private boat + fuel for all days",
            "Experienced guide + crew",
            "Daily route planning & tide coordination",
            "All meals + drinking water",
            "Snorkeling gear",
            "Villa/Hotel accommodation (7 nights)",
            "Entrance fees & ranger fees"
        ],
        excluded: [
            "Flights to/from Komodo (LBJ)",
            "Alcohol & premium beverages",
            "Crew tips (appreciated, not required)",
            "Personal purchases & souvenirs",
            "Travel insurance"
        ]
    },

    // FAQ
    faq: [
        {
            question: "Is Mosaic right for first-timers?",
            answer: "Absolutely. Mosaic is designed as the perfect introduction—balanced, comprehensive, and paced for comfort rather than intensity."
        },
        {
            question: "Can we make it slower or more beach-focused?",
            answer: "Yes. The 8-day flow is a guide, not a rule. We can adjust for more relaxation days or swap hiking for additional reef time."
        },
        {
            question: "Are the hikes mandatory?",
            answer: "No. Padar and Rinca involve walking, but can be adjusted to your fitness level or skipped for alternatives."
        },
        {
            question: "What if sea conditions change?",
            answer: "Our captains monitor weather daily. If conditions shift, we adjust the route to prioritize safety and experience quality."
        },
        {
            question: "Do we sleep on the boat?",
            answer: "No. Every night you return to a comfortable villa on land. The boat is your day base, not a liveaboard."
        },
        {
            question: "How is Mosaic different from Odyssey?",
            answer: "Mosaic is shorter (8 vs 10+ days), more balanced in experience types, and focuses on the central park highlights. Odyssey goes deeper and further."
        }
    ]
};
