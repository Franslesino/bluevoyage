
import { type ReactNode } from "react";
// We'll keep the strings simple for now as requested
export const theTogeanOdyssey = {
    slug: "the-togean-odyssey",
    headline: "The Togean Odyssey",
    subline: "From 10 Days",
    shortDescription: "The ultimate island expedition—iconic reefs, quiet beaches, deep culture, and a volcano-grade finale.",
    modelConfirmation: "Daily Private Cruises • Nightly Premium Stays • Flexible Day-by-Day Pace",
    vibeTags: ["Ultimate", "Iconic", "Unforgettable"],

    stats: [
        { label: "Reefs & Beaches", value: 35 },
        { label: "Relaxation", value: 25 },
        { label: "Culture", value: 25 },
        { label: "Hiking & Viewpoints", value: 15 }
    ],

    description: "Odyssey is for travelers who want the full Togean legend—beyond a single island or a quick highlight. Over 10+ days, you move deeper through reefs, beaches, villages, and viewpoints without rushing the days or sacrificing comfort. It’s built like an expedition, but felt like a private escape.",

    itinerary: [
        {
            day: 1,
            title: "Arrival & Exhale",
            schedule: {
                morning: "Arrive, settle in, welcome drink + short briefing",
                afternoon: "Easy lagoon swim + first sunset spot",
                evening: "Slow dinner, early night"
            },
            highlight: "Your body arrives before your schedule does.",
            image: "/program-relaxing.webp"
        },
        {
            day: 2,
            title: "Reef Immersion (Warm-Up)",
            schedule: {
                morning: "Easy-depth snorkel garden reef",
                afternoon: "Sandbar + beach picnic",
                evening: "Stargazing from shore"
            },
            highlight: "First coral day—pure color, zero rush.",
            image: "/program-snorkeling.webp"
        },
        {
            day: 3,
            title: "Hidden Coves & Calm Bays",
            schedule: {
                morning: "Cruise to quiet coves + swim",
                afternoon: "Paddle/float + reading time",
                evening: "Seafood dinner"
            },
            highlight: "A beach day that feels private.",
            image: "/program-beach.webp"
        },
        {
            day: 4,
            title: "Culture Day (Village + Story)",
            schedule: {
                morning: "Visit island community, gentle cultural walk",
                afternoon: "Local cooking moment / craft demo",
                evening: "Calm cruise back"
            },
            highlight: "You don’t just see islands—you meet them.",
            image: "/local-community-1.webp"
        },
        {
            day: 5,
            title: "Signature Reefs (Iconic Spots)",
            schedule: {
                morning: "Best reef window (variety: gardens/walls/lagoon)",
                afternoon: "Drift snorkel + beach nap",
                evening: "Sunset deck tea"
            },
            highlight: "The day your camera fills up.",
            image: "/wildlife/wildlife-giant-clam.webp"
        },
        {
            day: 6,
            title: "Relaxation Reset (Slow Day)",
            schedule: {
                morning: "Late breakfast + optional swim",
                afternoon: "Massage / hammock time / quiet beach",
                evening: "Lantern dinner"
            },
            highlight: "A rest day that keeps the expedition joyful.",
            image: "/program-relaxing.webp"
        },
        {
            day: 7,
            title: "Hike & Viewpoint (Earned Beauty)",
            schedule: {
                morning: "Short hike to viewpoint (moderate)",
                afternoon: "Beach recovery + coconut water",
                evening: "Games / movie-night"
            },
            highlight: "15% hiking—just enough to feel epic.",
            image: "/program-hiking.webp"
        },
        {
            day: 8,
            title: "Remote Island Push (Expedition Feel)",
            schedule: {
                morning: "Longer cruise, open-sea feel",
                afternoon: "Remote reef stop + picnic",
                evening: "Quiet night, early sleep"
            },
            highlight: "You’re now in the far chapters of Togean.",
            image: "/destinations/destination_una_una.webp"
        },
        {
            day: 9,
            title: "Una-Una Volcano Moment (Odyssey Signature)",
            schedule: {
                morning: "Expedition toward Una-Una (weather permitting)",
                afternoon: "Volcano viewpoint / island exploration",
                evening: "Celebration dinner"
            },
            highlight: "This is the Odyssey day—unforgettable.",
            image: "/accommodation/accommodation-una-una.webp"
        },
        {
            day: 10,
            title: "Farewell Cruise",
            schedule: {
                morning: "Last swim + final reef",
                afternoon: "Pack + chill",
                evening: "Departure / transfer"
            },
            highlight: "One last ocean memory—then home.",
            image: "/boat/boat-1.webp"
        }
    ],

    socialProof: {
        quote: "Odyssey felt like the Togean Islands opened their best chapters just for us—reefs, quiet beaches, and culture, all in perfect rhythm.",
        subQuote: "The volcano day was unreal.",
        image: "/local-community-2.webp"
    },

    highlights: [
        { text: "Expedition to remote Una-Una (weather permitting)", image: "/accommodation/accommodation-una-una.webp" },
        { text: "Handpicked reef sequence for maximum variety", image: "/program-snorkeling.webp" },
        { text: "Private beach picnics in quieter coves", image: "/program-beach.webp" },
        { text: "Respectful culture day (not staged, not rushed)", image: "/local-community-1.webp" },
        { text: "Built-in rest day so the trip stays joyful", image: "/program-relaxing.webp" }
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
            "Snorkeling gear"
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
        { question: "Is it physically hard?", answer: "It is designed to be active but manageable for most fitness levels." },
        { question: "What if sea conditions change?", answer: "Our captains monitor weather daily and will adjust the route for safety and comfort." },
        { question: "Do we sleep on the boat?", answer: "No, you sleep in comfortable villas on land each night." },
        { question: "Can we add more relaxation days?", answer: "Absolutely, customization is part of the service." },
        { question: "Best season / best months?", answer: "The Togean Islands are great year-round, but specific months might offer calmer seas." }
    ]
};
