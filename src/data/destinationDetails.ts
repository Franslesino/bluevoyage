export interface DestinationDetail {
    slug: string;
    name: string;
    tagline: string;
    intro: string;
    whyItMatters: string[];
    experiences: { title: string; text: string }[];
    signatureMoment: string;
    routeFit: {
        idealTiming: string;
        suggestedDuration: string;
        pairsWellWith: string[];
        notes: string[];
    };
    practicalNotes: string[];
    images: {
        hero: string;
        secondary: string;
        mood: string;
    };
}

export const destinationDetails: Record<string, DestinationDetail> = {
    "padar-island": {
        slug: "padar-island",
        name: "Padar Island",
        tagline: "The iconic three-bay viewpoint of Komodo National Park.",
        intro: "Padar Island is the third largest island in Komodo National Park, famous for its surreal landscape of jagged volcanic hills and three distinct bays with white, pink, and black sand beaches. The summit offers one of Indonesia's most photographed panoramic views.",
        whyItMatters: [
            "Features the park's most iconic viewpoint with three different colored beaches visible at once.",
            "Offers spectacular sunrise hikes with dramatic lighting over the savannah hills.",
            "A prehistoric landscape that feels like stepping into a Jurassic world."
        ],
        experiences: [
            {
                title: "Sunrise Summit Hike",
                text: "Trek up the stone staircase before dawn to witness the sun rising over the dramatic bays from the island's highest point."
            },
            {
                title: "Three-Colored Beach Spotting",
                text: "From the top, identify the unique white, charcoal-black, and rose-pink beaches in the bays below."
            },
            {
                title: "Savannah Photography",
                text: "Capture the golden dry-season grasses or vibrant wet-season green hills against the turquoise sea."
            },
            {
                title: "Bay Exploration",
                text: "After the hike, boat down to relax on one of the pristine, secluded beaches you saw from above."
            }
        ],
        signatureMoment: "Watching the first light of dawn illuminate the three curved bays of Padar, revealing the tricolor sands.",
        routeFit: {
            idealTiming: "Sunrise (start hiking 4:30 AM) or Sunset.",
            suggestedDuration: "3–4 hours.",
            pairsWellWith: ["Komodo Island", "Pink Beach"],
            notes: [
                "Steep hike with stairs; moderate fitness required.",
                "Bring water, hat, and sunscreen; no shade on the trail.",
                "Drone usage strictly regulated/prohibited without permit."
            ]
        },
        practicalNotes: [
            "Wear sturdy shoes/sneakers for the hike.",
            "It gets very hot by 9 AM; early morning is crucial.",
            "Stick to the marked trail to protect the fragile savannah ecosystem."
        ],
        images: {
            hero: "/destinations/destination_padar.webp",
            secondary: "/destinations/destination_pink_beach.webp",
            mood: "/komodo-hero.webp"
        }
    },
    "komodo-island": {
        slug: "komodo-island",
        name: "Komodo Island",
        tagline: "The legendary home of the Komodo Dragon.",
        intro: "The largest island in the park and the namesake of the world's largest lizard. Komodo Island offers a mix of dry savannah, thorny green forests, and beautiful coastline, where visitors can safely trek to observe these prehistoric predators in the wild.",
        whyItMatters: [
            "The primary place to see wild Komodo dragons in their natural habitat.",
            "Home to diverse wildlife including Timor deer, wild boar, and dangerous twisting tamarind trees.",
            "A UNESCO World Heritage site of immense biological and geological significance."
        ],
        experiences: [
            {
                title: "Guided Dragon Trek",
                text: "Walk with an expert ranger through the forest to safely spot Komodo dragons and observe their behavior."
            },
            {
                title: "Wildlife Spotting",
                text: "Keep an eye out for orange-footed scrub fowl, wild boar, and the deer that serve as the dragons' prey."
            },
            {
                title: "Local Market Visit",
                text: "Visit the souvenir market at the entrance to support local artisans selling wooden carvings and pearls."
            },
            {
                title: "Pink Beach Snorkel",
                text: "Often combined with a visit to the nearby Pantai Merah for cooling off after the hot trek."
            }
        ],
        signatureMoment: "Silent encounter with a massive 3-meter Komodo dragon resting in the shade of a tamarind tree.",
        routeFit: {
            idealTiming: "Morning (active dragons) or late afternoon.",
            suggestedDuration: "2–3 hours.",
            pairsWellWith: ["Padar Island", "Pink Beach"],
            notes: [
                "Ranger accompaniment is mandatory at all times.",
                "Menstruating women must notify rangers for safety (dragons smell blood).",
                "Keep distance and never feed the wildlife."
            ]
        },
        practicalNotes: [
            "Bring cash for ranger tips and souvenirs.",
            "Stay on the path and stay behind your ranger.",
            "Carry water; the trek can be hot and dry."
        ],
        images: {
            hero: "/destinations/dest-komodo.png",
            secondary: "/destinations/destination_rinca.webp",
            mood: "/komodo-hero.webp"
        }
    },
    "pink-beach": {
        slug: "pink-beach",
        name: "Pink Beach",
        tagline: "A surreal coastline of rose-tinted sands.",
        intro: "Pantai Merah, or Pink Beach, is one of only seven pink beaches on the planet. The sand gets its striking color from microscopic animals called Foraminifera, which produce a red pigment on the coral reefs. It's a surreal place for swimming and photography.",
        whyItMatters: [
            "A rare geological wonder with photogenic pink sands contrasting against turquoise water.",
            "Excellent snorkeling right off the shore with healthy coral gardens.",
            "A perfect relaxation spot after hiking Padar or trekking Komodo."
        ],
        experiences: [
            {
                title: "Pink Sand Photography",
                text: "Capture the unique contrast of pink sand and blue water—best seen where the waves crash."
            },
            {
                title: "Shore Snorkeling",
                text: "Drift over colorful shallow reefs teeming with fish just meters from the shoreline."
            },
            {
                title: "Hilltop View",
                text: "Climb the small hills flanking the beach for a panoramic view of the pink crescent."
            },
            {
                title: "Crystal Clear Swim",
                text: "Enjoy a refreshing dip in some of the clearest waters in the archipelago."
            }
        ],
        signatureMoment: "Holding a handful of sand and seeing the tiny red coral fragments that create the pink illusion.",
        routeFit: {
            idealTiming: "Midday sun for brightest pink color.",
            suggestedDuration: "1–2 hours.",
            pairsWellWith: ["Komodo Island", "Padar Island"],
            notes: [
                "Taking sand or coral is strictly prohibited.",
                "Please use reef-safe sunscreen to protect the coral.",
                "Can get busy; visit early or late for solitude."
            ]
        },
        practicalNotes: [
            "Bring underwater camera for the coral.",
            "No shade on the beach; bring a hat or umbrella.",
            "Support local warungs (stalls) if available."
        ],
        images: {
            hero: "/destinations/destination_pink_beach.webp",
            secondary: "/destinations/dest-komodo.png",
            mood: "/destinations/destination_padar.webp"
        }
    },
    "manta-point": {
        slug: "manta-point",
        name: "Manta Point",
        tagline: "Swim with the gentle giants of the ocean.",
        intro: "Manta Point (Karang Makassar) is a world-famous drift dive and snorkel site where giant Manta Rays gather to feed and clean. The nutrient-rich currents attract these majestic creatures year-round, offering one of the best manta encounters in the world.",
        whyItMatters: [
            "Consistent sightings of Reef and Oceanic Manta Rays, sometimes in large groups.",
            "Accessible for both snorkelers and divers due to shallow reef sections.",
            "High biodiversity area often visited by sharks, eagle rays, and turtles."
        ],
        experiences: [
            {
                title: "Manta Ray Snorkeling",
                text: "Float on the surface as massive mantas glide and barrel-roll in the current beneath you."
            },
            {
                title: "Drift Diving",
                text: "Let the current carry you along the kilometer-long reef while watching the marine show."
            },
            {
                title: "Turtle Spotting",
                text: "Look for large green turtles resting on the coral rubble bottoms."
            },
            {
                title: "Boat Deck Viewing",
                text: "Even non-swimmers can often see mantas breaching or feeding near the surface."
            }
        ],
        signatureMoment: "The breathless moment a 3-meter manta ray swims directly towards you and gracefully banks away at the last second.",
        routeFit: {
            idealTiming: "Morning or depending on tidal currents.",
            suggestedDuration: "1–2 hours.",
            pairsWellWith: ["Taka Makassar", "Siaba Besar"],
            notes: [
                "Currents can be strong; follow guide instructions carefully.",
                "Do not touch or chase the mantas.",
                "Sightings are wild nature and never 100% guaranteed."
            ]
        },
        practicalNotes: [
            "Wear fins for swimming in currents.",
            "Rash guard recommended for warmth and jelly protection.",
            "Stay relaxed in the water to attract curious mantas."
        ],
        images: {
            hero: "/destinations/destination_manta_point.webp",
            secondary: "/destinations/destination_pink_beach.webp",
            mood: "/komodo-hero.webp"
        }
    },
    "rinca-island": {
        slug: "rinca-island",
        name: "Rinca Island",
        tagline: "Wild savannahs and easier dragon spotting.",
        intro: "Rinca offers a wilder, more savannah-like landscape than Komodo Island. It is often easier to spot dragons here, especially near the ranger station kitchen. The hikes offer dramatic views of the surrounding bays and brown grassy hills.",
        whyItMatters: [
            "Second largest island for dragons, with a high density population.",
            "Beautiful expansive views from the hilltops suitable for all fitness levels.",
            "Includes mangrove forests creating a diverse ecosystem."
        ],
        experiences: [
            {
                title: "Dragon Walk",
                text: "See dragons basking in the sun near the new elevated boardwalks and ranger station."
            },
            {
                title: "Hilltop Panorama",
                text: "Hike to the top of the island for a stunning 360-degree view of the park's islands."
            },
            {
                title: "Buffalo & Monkey Spotting",
                text: "Wildlife is abundant; look for water buffaloes in mud pools and macaques in the trees."
            },
            {
                title: "Mangrove Boat Tour",
                text: "Cruise through coastal mangroves to spot kingfishers and baby sharks."
            }
        ],
        signatureMoment: "Reaching the highest viewpoint on Rinca and seeing the dragons' domain stretching out to the horizon.",
        routeFit: {
            idealTiming: "Morning or late afternoon to avoid heat.",
            suggestedDuration: "2 hours.",
            pairsWellWith: ["Kelor Island", "Kalong Island"],
            notes: [
                "Closer to Labuan Bajo than Komodo Island (easier day trip).",
                "New elevated boardwalks make viewing safer and easier.",
                "Hot and exposed; bring sun protection."
            ]
        },
        practicalNotes: [
            "Brings hat and sunglasses.",
            "Stay on the boardwalks.",
            "Great alternative if short on time for Komodo Island."
        ],
        images: {
            hero: "/destinations/destination_rinca.webp",
            secondary: "/destinations/destination_padar.webp",
            mood: "/komodo-hero.webp"
        }
    },
    "labuan-bajo": {
        slug: "labuan-bajo",
        name: "Labuan Bajo",
        tagline: "The vibrant gateway to the dragons.",
        intro: "Once a small fishing village, Labuan Bajo is now the bustling gateway to Komodo National Park. It sits on the western tip of Flores, famous for its spectacular sunsets, diverse dining scene, and harbor filled with Phinisi boats ready for adventure.",
        whyItMatters: [
            "The starting and ending point for all cruising adventures.",
            "Famous for some of the best sunsets in Indonesia, best viewed from rooftop bars.",
            "Offers cultural excursions to waterfalls, caves, and traditional villages nearby."
        ],
        experiences: [
            {
                title: "Sunset at Paradise Bar",
                text: "Watch the sun sink behind the islands with a cocktail and live music."
            },
            {
                title: "Fish Market Feast",
                text: "Choose your fresh catch at the night market and have it grilled spicy-style by the water."
            },
            {
                title: "Batu Cermin Cave",
                text: "Explore the 'Mirror Stone' cave with its dazzling rock formations and fossils."
            },
            {
                title: "Rangko Cave Swim",
                text: "Swim in a secret underground saltwater pool illuminated by natural skylights."
            }
        ],
        signatureMoment: "Watching the silhouette of hundreds of boats in the harbor against a fiery purple sunset.",
        routeFit: {
            idealTiming: "Before or after your boat trip.",
            suggestedDuration: "1–2 nights.",
            pairsWellWith: ["Cunca Wulang Waterfall"],
            notes: [
                "Wide range of accommodation from hostels to 5-star resorts.",
                "Airport is 10 minutes from town.",
                "ATMs and pharmacies are readily available."
            ]
        },
        practicalNotes: [
            "Book accommodation early in peak season.",
            "Use Grab or Ojek (motorcycle taxi) to get around.",
            "Visit the fish market for cheap, delicious local dinner."
        ],
        images: {
            hero: "/destinations/dest-labuan-bajo.png",
            secondary: "/destinations/destination_rinca.webp",
            mood: "/komodo-hero.webp"
        }
    }
};
