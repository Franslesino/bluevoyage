
import { type ReactNode } from "react";

export const theKomodoOdyssey = {
    slug: "the-komodo-odyssey",
    headline: "The Komodo Odyssey",
    subline: "From 10 Days",
    shortDescription: "The ultimate expedition through Komodo National Park—iconic dragons, pink sands, manta rays, and dramatic volcanic landscapes.",
    modelConfirmation: "Daily Private Cruises • Nightly Premium Stays • Flexible Day-by-Day Pace",
    vibeTags: ["Ultimate", "Iconic", "Unforgettable"],

    stats: [
        { label: "Islands & Reefs", value: 35, icon: "/icons/odyssey/reefs-beaches.svg" },
        { label: "Relaxation", value: 25, icon: "/icons/odyssey/relaxation.svg" },
        { label: "Culture", value: 25, icon: "/icons/odyssey/culture.svg" },
        { label: "Hiking & Viewpoints", value: 15, icon: "/icons/odyssey/hiking-viewpoints.svg" }
    ],

    description: "Odyssey is for travelers who want the full Komodo legend—beyond a quick day trip. Over 10+ days, you move deeper through the archipelago's reefs, savannas, and hidden beaches without rushing. It’s built like an expedition, but felt like a private escape.",

    itinerary: [
        {
            day: 1,
            title: "Arrival in Labuan Bajo",
            schedule: {
                morning: "Arrive, settle in, welcome drink + short briefing",
                afternoon: "Sunset view from Bukit Silvia or Amelia Sea View",
                evening: "Seafood dinner at the harbor"
            },
            highlight: "Your gateway to the dragons awaits.",
            image: "/destinations/destination_labuan_bajo.webp"
        },
        {
            day: 2,
            title: "The Icons: Padar & Pink Beach",
            schedule: {
                morning: "Sunrise hike to Padar Island summit",
                afternoon: "Relax and snorkel at Pink Beach (Long Beach)",
                evening: "Cruise back, sunset at sea"
            },
            highlight: "The view that defines Komodo.",
            image: "/destinations/destination_padar.webp"
        },
        {
            day: 3,
            title: "Dragons & Flying Foxes",
            schedule: {
                morning: "Ranger-guided trek on Rinca Island (Loh Buaya)",
                afternoon: "Snorkel at Kelor Island",
                evening: "Watch thousands of bats at Kalong Island"
            },
            highlight: "Walking with prehistoric giants.",
            image: "/destinations/destination_rinca.webp"
        },
        {
            day: 4,
            title: "Manta Magic & Sandbars",
            schedule: {
                morning: "Snorkel with Manta Rays at Manta Point",
                afternoon: "Relax on the sandbar at Taka Makassar",
                evening: "Quiet dinner"
            },
            highlight: "Dancing with the gentle giants.",
            image: "/wildlife_real/sea/manta-ray/hero.webp"
        },
        {
            day: 5,
            title: "Turtle City & Crystal Rocks",
            schedule: {
                morning: "Snorkel with turtles at Siaba Besar",
                afternoon: "Drift snorkel at Crystal Rock / Castle Rock area",
                evening: "Relaxing evening"
            },
            highlight: "An underwater aquarium come to life.",
            image: "/wildlife_real/sea/green-sea-turtle/hero.webp"
        },
        {
            day: 6,
            title: "Relaxation Reset",
            schedule: {
                morning: "Late breakfast + optional swim",
                afternoon: "Massage / leisure time / shopping in Labuan Bajo",
                evening: "Lantern dinner"
            },
            highlight: "A rest day that keeps the expedition joyful.",
            image: "/program-relaxing.webp"
        },
        {
            day: 7,
            title: "Hidden Coves: Sebayur & Kanawa",
            schedule: {
                morning: "Snorkel pristine reefs at Sebayur",
                afternoon: "Relax on Kanawa Island's white sands",
                evening: "Games / movie-night"
            },
            highlight: "Perfect coral gardens just below the surface.",
            image: "/program-beach.webp"
        },
        {
            day: 8,
            title: "Waterfall Adventure (Cunca Wulang)",
            schedule: {
                morning: "Drive inland to Cunca Wulang canyon",
                afternoon: "Swim in fresh water pools, jungle trek",
                evening: "Authentic Flores coffee tasting"
            },
            highlight: "The jungle side of Flores.",
            image: "/activity-hiking.png"
        },
        {
            day: 9,
            title: "Cultural Immersion (Melting Pot)",
            schedule: {
                morning: "Visit Batu Cermin Cave",
                afternoon: "Local market tour / weaving demonstration",
                evening: "Farewell celebration dinner"
            },
            highlight: "Connecting with the soul of Flores.",
            image: "/local-community-1.webp"
        },
        {
            day: 10,
            title: "Farewell",
            schedule: {
                morning: "Last swim or souvenir hunt",
                afternoon: "Pack + chill",
                evening: "Departure / transfer to airport"
            },
            highlight: "Taking the spirit of Komodo home.",
            image: "/boat/boat-1.webp"
        }
    ],

    socialProof: {
        quote: "Odyssey felt like Komodo opened its best chapters just for us—dragons, mantas, and culture, all in perfect rhythm.",
        subQuote: "The Padar sunrise was unreal.",
        image: "/local-community-2.webp"
    },

    highlights: [
        { text: "Sunrise at the iconic Padar Island viewpoint", image: "/destinations/destination_padar.webp" },
        { text: "Swimming with Manta Rays at Manta Point", image: "/wildlife_real/sea/manta-ray/hero.webp" },
        { text: "Walking with Komodo Dragons on Rinca", image: "/destinations/destination_rinca.webp" },
        { text: "Pink sands of Long Beach", image: "/destinations/destination_pink_beach.webp" },
        { text: "Sunset with thousands of flying foxes", image: "/wildlife/wildlife-flying-fox.webp" }
    ],

    tabs: {
        villa: {
            title: "Your Villa",
            description: "Every day is an ocean adventure—every night returns to comfort. Your villa is designed for deep rest: quiet rooms, clean bathrooms, and a view worth waking up to.",
            points: [
                "A/C & restful bedding",
                "Private bathrooms",
                "Sunset / sea-view moments",
                "Calm, quiet atmosphere"
            ],
            images: [
                "/accommodation/kadidiri/other1.webp",
                "/accommodation/kadidiri/other2.webp",
                "/accommodation/kadidiri/other3.webp"
            ]
        },
        boat: {
            title: "Your Boat",
            description: "Odyssey is not a liveaboard—no sleeping in cramped cabins. Your boat is a comfortable day base: space to stretch, snack, dry off, and enjoy the sea between stops.",
            points: [
                "Shaded lounge + sun deck",
                "Dining table for lunches",
                "Towels / water / refresh setup",
                "Safety briefings + well-maintained gear"
            ],
            images: [
                "/boat/boat-1.webp",
                "/boat/boat-2.webp",
                "/boat/boat-3.webp"
            ]
        }
    },

    pricing: {
        title: "Pricing (Starting From)",
        text: "From IDR [TBD] / person",
        included: [
            "Private boat + fuel",
            "Guide + crew",
            "Daily cruises & route planning",
            "Meals & drinking water",
            "Snorkeling gear",
            "Entrance fees"
        ],
        excluded: [
            "Flights",
            "Alcohol",
            "Tips",
            "Personal purchases"
        ]
    },

    faq: [
        { question: "Is 10 days fixed?", answer: "This is a base duration, but it can be adjusted to fit your schedule." },
        { question: "Is it physically hard?", answer: "It is designed to be active but manageable. The Padar hike is a steep flight of stairs." },
        { question: "What if sea conditions change?", answer: "Our captains monitor weather daily and will adjust the route for safety and comfort." },
        { question: "Do we sleep on the boat?", answer: "No, you sleep in comfortable villas/hotels on land each night." },
        { question: "Can we add more relaxation days?", answer: "Absolutely, customization is part of the service." },
        { question: "Best season / best months?", answer: "April to October is best for dry weather and calm seas." }
    ]
};
