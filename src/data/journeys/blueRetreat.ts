
import { type ReactNode } from "react";

export const blueRetreat = {
    slug: "blue-retreat",
    headline: "Blue Retreat",
    subline: "SLOW TRAVEL PROGRAM",
    shortDescription: "Restorative by design.",
    tagline: "A slow-luxury escape of quiet beaches, gentle reefs, and evenings that linger.",
    modelConfirmation: "Daily Private Cruises • Nightly Luxury Villa Stay • Flexible Day-by-Day Pace",
    vibeTags: ["Restorative", "Romantic", "Unhurried"],

    // Core experience pillars - NO percentages, just icons + labels
    stats: [
        { label: "Beach Time", icon: "/icons/blue-retreat/beach.svg", description: "Quiet coves, soft sand, endless calm" },
        { label: "Snorkeling", icon: "/icons/blue-retreat/snorkeling.svg", description: "Gentle reefs, crystal water, unhurried rhythm" },
        { label: "Culture", icon: "/icons/blue-retreat/culture.svg", description: "Soft village moments, coffee, and connection" },
        { label: "Light Hikes", icon: "/icons/blue-retreat/hiking.svg", description: "Sunset viewpoints, never strenuous" }
    ],

    // Program snapshot (floating card on desktop)
    snapshot: {
        duration: "From 8 Days",
        bestFor: "Couples / Honeymooners / Slow travelers",
        style: "Romantic / Restorative / Unhurried"
    },

    // Why Blue Retreat Section
    concept: {
        eyebrow: "WHY BLUE RETREAT EXISTS",
        headline: "Because rest deserves a destination.",
        description: "Blue Retreat is for travelers who want Togean at its softest pace—late mornings, quiet coves, and reef time without rushing. It's romantic without trying, and restorative without feeling empty. Every day is designed to feel spacious."
    },

    // 8-Day Itinerary (show only first 3 days on page)
    itinerary: [
        {
            day: 1,
            title: "Arrive + Exhale",
            schedule: {
                morning: "Private pickup + calm transfer into the islands",
                afternoon: "Settle into your villa, slow lunch, first swim in glassy water",
                evening: "Sunset cruise close to shore, light dinner, early night if you want"
            },
            highlight: "No rush—just arrival and exhale.",
            image: "/journeys/blue-retreat/blue-retreat-day1.webp"
        },
        {
            day: 2,
            title: "Reef Time, Unrushed",
            schedule: {
                morning: "Easy snorkeling over shallow reefs—gentle, colorful, unhurried",
                afternoon: "Beach lounging + optional paddle / reading time (no fixed schedule)",
                evening: "Golden-hour coastline cruise, quiet stargazing"
            },
            highlight: "Water time at your own rhythm.",
            image: "/journeys/blue-retreat/blue-retreat-day2.webp"
        },
        {
            day: 3,
            title: "Culture + Soft Viewpoint",
            schedule: {
                morning: "Visit a local village—craft, stories, and a slow coffee moment",
                afternoon: "A short, scenic walk to a viewpoint (light hike, optional)",
                evening: "Back to the villa—long shower, slow dinner, and stillness"
            },
            highlight: "Connection without rush, views without strain.",
            image: "/journeys/blue-retreat/blue-retreat-day3.webp"
        },
        {
            day: 4,
            title: "Sandbar + Slow Swimming",
            schedule: {
                morning: "Private sandbar discovery (tide permitting)",
                afternoon: "Float time + beach picnic",
                evening: "Sunset cocktail on deck"
            },
            highlight: "A day that feels private and endless.",
            image: "/program-beach.webp"
        },
        {
            day: 5,
            title: "Reef Safari Day",
            schedule: {
                morning: "Longer reef session—variety without rush",
                afternoon: "Shaded boat nap or villa rest",
                evening: "Candlelit dinner"
            },
            highlight: "The best reefs, at the perfect pace.",
            image: "/program-snorkeling.webp"
        },
        {
            day: 6,
            title: "Open Day (Your Choice)",
            schedule: {
                morning: "Late breakfast + optional massage",
                afternoon: "Villa time / beach walk / light swim",
                evening: "Quiet night under stars"
            },
            highlight: "A blank page—fill it as you like.",
            image: "/program-relaxing.webp"
        },
        {
            day: 7,
            title: "Hidden Cove Exploration",
            schedule: {
                morning: "Cruise to a remote cove",
                afternoon: "Private swim + slow lunch onboard",
                evening: "Final sunset from the water"
            },
            highlight: "The kind of place you'll remember forever.",
            image: "/program-beach.webp"
        },
        {
            day: 8,
            title: "Farewell + Carry It Home",
            schedule: {
                morning: "Last swim, final reef if you want",
                afternoon: "Pack slowly, light lunch",
                evening: "Transfer and departure"
            },
            highlight: "One last ocean memory.",
            image: "/boat/boat-1.webp"
        }
    ],

    // Social Proof
    socialProof: {
        quote: "A week on Blue Retreat felt like pressing pause—reef mornings, soft afternoons, and sunsets that stretched forever.",
        attribution: "Guest, Blue Retreat Journey",
        tags: ["Romantic", "Restorative", "Unhurried"],
        image: "/journeys/blue-retreat/blue-retreat-hero.webp"
    },

    // Signature Highlights
    highlights: [
        {
            title: "Golden-hour lagoon cruise, just the two of you",
            image: "/boat/boat-1.webp",
            description: "Private sunset moments on calm water"
        },
        {
            title: "Private reef sessions chosen for calm water and clarity",
            image: "/program-snorkeling.webp",
            description: "Gentle snorkeling, never rushed"
        },
        {
            title: "Slow village moments—coffee, crafts, and conversation",
            image: "/local-community-1.webp",
            description: "Cultural connection at a comfortable pace"
        },
        {
            title: "A light viewpoint walk timed for sunset, not effort",
            image: "/program-hiking.webp",
            description: "Views earned gently"
        }
    ],

    // Premium Standard Tabs
    tabs: {
        villa: {
            title: "Your Villa",
            headline: "Every Blue Retreat night is spent in a handpicked luxury villa—cool, private, and designed for rest.",
            description: "These are not backpacker huts. Your villa is a sanctuary: spacious rooms with ocean views, modern amenities wrapped in natural materials, and the kind of quiet that helps you truly unwind.",
            points: [
                "Air conditioning or natural breeze",
                "Private bathroom with hot water",
                "Ocean or garden views",
                "Sunset terrace for slow evenings"
            ],
            images: [
                "/journeys/blue-retreat/blue-retreat-villa1.webp",
                "/journeys/blue-retreat/blue-retreat-villa2.webp",
                "/accommodation/kadidiri/other2.webp"
            ]
        },
        boat: {
            title: "Your Boat",
            headline: "Our private boat is built for slow travel: shade when you want it, space to stretch out, and a calm rhythm on the water.",
            description: "This isn't a speedboat tour. Your boat is a comfortable day base—a traditional Indonesian vessel upgraded for comfort. Cushioned seating, shade when you need it, sun when you want it, and a crew that knows these waters intimately.",
            points: [
                "Shaded lounge area with cushions",
                "Open sun deck for panoramic views",
                "Fresh towels & drinking water",
                "Not a liveaboard (villa stays every night)"
            ],
            images: [
                "/journeys/blue-retreat/blue-retreat-boat1.webp",
                "/boat/boat-2.webp",
                "/boat/boat-3.webp"
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
            "Villa accommodation (8 nights)",
            "Cultural experience coordination"
        ],
        excluded: [
            "Flights to/from Togean",
            "Alcohol & premium beverages",
            "Crew tips (appreciated, not required)",
            "Personal purchases & souvenirs",
            "Travel insurance"
        ]
    },

    // FAQ
    faq: [
        {
            question: "Is Blue Retreat suitable for honeymooners?",
            answer: "Absolutely. Blue Retreat is designed for couples who want romance without crowding, and rest without boredom. The pace is slow, the setting is intimate, and every detail is calibrated for two."
        },
        {
            question: "How flexible is the day-by-day plan?",
            answer: "Extremely. The 8-day flow is a guide, not a rule. We adjust for your energy, preferences, and sea conditions. Want an extra rest day? Done. Prefer more reef time? We'll make it happen."
        },
        {
            question: "Is the snorkeling beginner-friendly?",
            answer: "Yes. We choose shallow, calm reefs with excellent visibility. Our guides are patient and attentive. If you've never snorkeled before, this is a perfect place to start."
        },
        {
            question: "Can we add extra rest days?",
            answer: "Of course. Blue Retreat is built on flexibility. If you want to slow it down even more, we can add extra villa days, massage time, or simply more space to breathe."
        },
        {
            question: "What if sea conditions change?",
            answer: "Our captains monitor weather daily. If conditions shift, we adjust the route to prioritize safety and experience quality—you'll still get the highlights, just rerouted for comfort."
        },
        {
            question: "Best season / best months?",
            answer: "The Togean Islands are beautiful year-round, but April–October typically offers the calmest seas and clearest skies. That said, Blue Retreat's flexible nature means we adapt to any season."
        }
    ]
};
