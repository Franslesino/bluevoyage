
import { type ReactNode } from "react";

export const theTogeanMosaic = {
    slug: "the-togean-mosaic",
    headline: "The Togean Mosaic",
    subline: "SIGNATURE PROGRAM",
    shortDescription: "The Perfect Equilibrium",
    tagline: "A complete story of the islands—reef days, slow beach time, and cultural depth, balanced into one signature flow.",
    modelConfirmation: "Daily Private Cruises • Nightly Luxury Villa Stay • Flexible Day-by-Day Pace",
    vibeTags: ["Comprehensive", "Diverse", "Iconic"],

    // Core experience pillars - NO percentages, just icons + labels
    stats: [
        { label: "Reefs", icon: "/icons/mosaic/reefs.png", description: "Curated coral gardens, turtles, clarity-first routes" },
        { label: "Relaxation", icon: "/icons/mosaic/relaxation.png", description: "Sandbars, quiet coves, long afternoons" },
        { label: "Culture", icon: "/icons/mosaic/culture.png", description: "Village rhythm, local flavors, gentle connection" },
        { label: "Hiking", icon: "/icons/mosaic/hiking.png", description: "A viewpoint or two—earned, not exhausting" }
    ],

    // Program snapshot (floating card on desktop)
    snapshot: {
        duration: "From 8 Days",
        bestFor: "First-time Togean / Couples / Friends",
        style: "Balanced / Iconic / Unhurried"
    },

    // Why Mosaic Section
    concept: {
        eyebrow: "WHY MOSAIC EXISTS",
        headline: "The signature 'best-of'—without the rush.",
        description: "Mosaic is our most complete introduction to Togean. It blends iconic reefs with genuine rest—plus cultural and viewpoint moments that make the islands feel alive. You leave feeling like you've seen the whole canvas, not just one highlight."
    },

    // 8-Day Itinerary (distinct from Odyssey)
    itinerary: [
        {
            day: 1,
            title: "Arrival & Lagoon Ease",
            schedule: {
                morning: "Welcome drink, villa briefing, settle in",
                afternoon: "Soft snorkel warm-up in protected lagoon",
                evening: "Sunset from shore, early night"
            },
            highlight: "The journey starts gently—no rush, just ease.",
            image: "/journeys/mosaic/mosaic-day1.webp"
        },
        {
            day: 2,
            title: "Reef Icons",
            schedule: {
                morning: "Signature coral gardens with turtle encounters",
                afternoon: "Beach time + light swimming",
                evening: "Sunset deck moment with refreshments"
            },
            highlight: "The reefs that define Togean—vivid, clear, alive.",
            image: "/journeys/mosaic/mosaic-day2.webp"
        },
        {
            day: 3,
            title: "Slow Beach Luxury",
            schedule: {
                morning: "Private sandbar discovery (tide permitting)",
                afternoon: "Hidden cove picnic, long swim, relaxation",
                evening: "Golden hour on the water"
            },
            highlight: "A beach day that feels completely yours.",
            image: "/journeys/mosaic/mosaic-day3.webp"
        },
        {
            day: 4,
            title: "Culture & Island Life",
            schedule: {
                morning: "Village walk with respectful immersion",
                afternoon: "Home-style lunch + simple craft moment",
                evening: "Calm cruise back to villa"
            },
            highlight: "Connection without intrusion—the islands open up.",
            image: "/journeys/mosaic/mosaic-day4.webp"
        },
        {
            day: 5,
            title: "Reef Variety Day",
            schedule: {
                morning: "Drift snorkel + remote coral spots",
                afternoon: "Relaxed afternoon nap on deck or beach",
                evening: "Fresh seafood dinner"
            },
            highlight: "Different reefs, same clarity—never repetitive.",
            image: "/journeys/mosaic/mosaic-day5.webp"
        },
        {
            day: 6,
            title: "Viewpoint & Freshwater Reset",
            schedule: {
                morning: "Light hike to panoramic viewpoint",
                afternoon: "Waterfall dip + freshwater refresh",
                evening: "Calm evening, storytelling"
            },
            highlight: "A viewpoint earned, not exhausting.",
            image: "/journeys/mosaic/mosaic-day6.webp"
        },
        {
            day: 7,
            title: "Farewell Reef + Departure",
            schedule: {
                morning: "Final signature snorkel, last photos",
                afternoon: "Pack, reflect, light lunch",
                evening: "Transfer and departure"
            },
            highlight: "One final ocean memory to carry home.",
            image: "/journeys/mosaic/mosaic-day7.webp"
        }
    ],

    // Social Proof
    socialProof: {
        quote: "We felt like we experienced everything—without ever feeling rushed.",
        attribution: "Guest, Private Mosaic Journey",
        tags: ["Reef clarity", "Unhurried pace", "Private comfort"],
        image: "/journeys/mosaic/mosaic-testimonial.webp"
    },

    // Signature Highlights
    highlights: [
        {
            title: "Reef Safari, curated by clarity",
            image: "/journeys/mosaic/mosaic-reef.webp",
            description: "Handpicked coral routes where visibility meets biodiversity"
        },
        {
            title: "Private sandbar lunch (conditions permitting)",
            image: "/journeys/mosaic/mosaic-sandbar.webp",
            description: "A table on a ribbon of sand, surrounded by turquoise"
        },
        {
            title: "Village flavors + gentle cultural immersion",
            image: "/journeys/mosaic/mosaic-culture.webp",
            description: "Respectful connection with island rhythms and traditions"
        },
        {
            title: "Viewpoints at a calm pace",
            image: "/journeys/mosaic/mosaic-hike.webp",
            description: "Panoramas earned through light hikes, not marathons"
        }
    ],

    // Premium Standard Tabs
    tabs: {
        villa: {
            title: "Your Villa",
            headline: "Quiet luxury: private bathrooms, breeze, and deep sleep.",
            description: "Every evening returns you to comfort. Spacious rooms with ocean views, modern amenities wrapped in natural materials, and the kind of quiet that helps you truly rest.",
            points: [
                "Private bathroom & hot water",
                "Air conditioning or natural breeze",
                "Ocean or garden views",
                "Comfortable bedding for deep rest"
            ],
            images: [
                "/journeys/mosaic/mosaic-villa.webp",
                "/accommodation/kadidiri/other1.webp",
                "/accommodation/kadidiri/other2.webp"
            ]
        },
        boat: {
            title: "Your Boat",
            headline: "Shaded lounge, open deck air, and space to slow down.",
            description: "This is your day base—a traditional Indonesian vessel upgraded for comfort. Cushioned seating, shade when you need it, sun when you want it, and a crew that knows these waters intimately.",
            points: [
                "Shaded lounge area with cushions",
                "Open sun deck for panoramic views",
                "Fresh towels & drinking water",
                "Safety equipment & snorkel gear"
            ],
            images: [
                "/journeys/mosaic/mosaic-boat.webp",
                "/boat/boat-2.webp",
                "/boat/boat-3.webp"
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
            question: "Is Mosaic right for first-timers?",
            answer: "Absolutely. Mosaic is designed as the perfect introduction—balanced, comprehensive, and paced for comfort rather than intensity."
        },
        {
            question: "Can we make it slower or more beach-focused?",
            answer: "Yes. The 8-day flow is a guide, not a rule. We can adjust for more relaxation days or swap hiking for additional reef time."
        },
        {
            question: "Are the hikes optional?",
            answer: "Completely. Viewpoint days can be replaced with beach or reef alternatives if you prefer to stay at sea level."
        },
        {
            question: "What if sea conditions change?",
            answer: "Our captains monitor weather daily. If conditions shift, we adjust the route to prioritize safety and experience quality—you'll still get the highlights."
        },
        {
            question: "Do we sleep on the boat?",
            answer: "No. Every night you return to a comfortable villa on land. The boat is your day base, not a liveaboard."
        },
        {
            question: "How is Mosaic different from Odyssey?",
            answer: "Mosaic is shorter (8 vs 10+ days), more balanced in experience types, and skips the intensity of the Una-Una volcano expedition. Think 'best-of' versus 'full legend.'"
        }
    ]
};
