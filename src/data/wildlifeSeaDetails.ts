export interface SeaWildlifeDetail {
    nameEn: string;
    nameId: string;
    scientificName: string;
    habitat: string;
    commonLocations: string;
    notesShort: string;
    slug: string;
    images: {
        hero: string;
        gallery: string[];
    };
    expandedContent: {
        intro: string;
        keyFacts: { label: string; value: string }[];
        whereToSee: string;
        howToSpot: string;
        responsibleGuidelines: string[];
        conservationStatus: string;
        quickSummary: string;
    };
}

export const wildLifeSeaDetails: SeaWildlifeDetail[] = [
    {
        nameEn: "Green Sea Turtle",
        nameId: "Penyu Hijau",
        scientificName: "Chelonia mydas",
        habitat: "Reefs, Seagrass Beds",
        commonLocations: "Shallow reefs around Togean islands (e.g., Kadidiri waters)",
        notesShort: "Often seen surfacing to breathe; protected species. Nests on secluded sandy beaches.",
        slug: "green-sea-turtle",
        images: {
            hero: "/wildlife_real/sea/green-sea-turtle/hero.webp",
            gallery: [
                "/wildlife_real/sea/green-sea-turtle/gallery-1.webp",
                "/wildlife_real/sea/green-sea-turtle/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Green Sea Turtle is a graceful mariner of the Togean archipelago, often spotted gliding effortlessly over shallow reefs or grazing on seagrass meadows. Known for their smooth, olive-colored shells and gentle demeanor, these ancient reptiles play a crucial role in maintaining the health of marine ecosystems.",
            keyFacts: [
                { label: "Habitat", value: "Coral reefs and seagrass beds" },
                { label: "Diet", value: "Herbivorous (seagrass and algae)" },
                { label: "Size", value: "Up to 1.5 meters" },
                { label: "Behavior", value: "Solitary, often seen surfacing to breathe" }
            ],
            whereToSee: "You are most likely to encounter Green Sea Turtles in the calm, shallow waters surrounding Kadidiri and Pangempa islands. They frequently visit the seagrass beds to feed during the day.",
            howToSpot: "Look for a round, dark silhouette hovering just above the reef or a small head breaking the surface for a breath of air. They often rest under large coral overhangs.",
            responsibleGuidelines: [
                "Maintain a respectful distance of at least 3 meters.",
                "Do not touch, chase, or attempt to ride the turtles.",
                "Avoid sudden movements that might startle them.",
                "Do not block their path to the surface when they need to breathe.",
                "Use reef-safe sunscreen to protect their habitat."
            ],
            conservationStatus: "Protected in Indonesia and globally recognized as Endangered. Their populations are recovering but remain vulnerable to habitat loss and poaching.",
            quickSummary: "A gentle giant of the reefs, the Green Sea Turtle is a highlight of any snorkeling trip in Togean."
        }
    },
    {
        nameEn: "Hawksbill Turtle",
        nameId: "Penyu Sisik",
        scientificName: "Eretmochelys imbricata",
        habitat: "Coral Reefs",
        commonLocations: "Rocky coral reefs (e.g., Una-Una reef drop-offs)",
        notesShort: "Beautiful patterned shell, critically endangered. Sometimes seen by divers feeding on sponges.",
        slug: "hawksbill-turtle",
        images: {
            hero: "/wildlife_real/sea/hawksbill-turtle/hero.webp",
            gallery: [
                "/wildlife_real/sea/hawksbill-turtle/gallery-1.webp",
                "/wildlife_real/sea/hawksbill-turtle/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "Distinguished by its narrow, pointed beak and beautifully patterned shell, the Hawksbill Turtle is a critical inhabitant of the Togean coral reefs. Unlike their vegetarian cousins, Hawksbills are specialized sponge feeders, helping to keep coral competition in check and maintaining reef diversity.",
            keyFacts: [
                { label: "Habitat", value: "Coral reefs, especially drop-offs" },
                { label: "Diet", value: "Omnivorous (primarily sponges)" },
                { label: "Size", value: "Up to 1 meter" },
                { label: "Behavior", value: "Forages in crevices for sponges" }
            ],
            whereToSee: "Divers often spot Hawksbills along the dramatic walls and drop-offs of Una-Una, where sponges are abundant. They are also occasionally seen on the pristine reefs of Malenge.",
            howToSpot: "Look for the serrated edges of their shell and their beak-like mouth. They are often found poking around coral crevices searching for food.",
            responsibleGuidelines: [
                "Keep a distance and observe without crowding.",
                "Do not disturb them while they are foraging.",
                "Never touch the turtle or its shell.",
                "Be mindful of your fins to avoid damaging the reef they rely on.",
                "Report any nesting sightings to local conservation groups."
            ],
            conservationStatus: "Critically Endangered. The Hawksbill is strictly protected due to the historical trade of its shell (tortoiseshell).",
            quickSummary: "A critically endangered beauty, the Hawksbill is a vital guardian of coral reef health."
        }
    },
    {
        nameEn: "Napoleon Wrasse",
        nameId: "Ikan Napoleon",
        scientificName: "Cheilinus undulatus",
        habitat: "Deep Reef Slopes",
        commonLocations: "Deep reef slopes (e.g., dive sites in Una-Una)",
        notesShort: "Largest reef fish (can be >1m); blue-green with forehead hump. Protected, declining population. Curious.",
        slug: "napoleon-wrasse",
        images: {
            hero: "/wildlife_real/sea/napoleon-wrasse/hero.jpg",
            gallery: [
                "/wildlife_real/sea/napoleon-wrasse/gallery-1.jpg",
                "/wildlife_real/sea/napoleon-wrasse/gallery-2.jpg"
            ]
        },
        expandedContent: {
            intro: "The Maori Wrasse, or Napoleon Wrasse, is the colossus of the coral reef. With its intricate blue-green markings and distinctive prominent hump on the forehead, this intelligent fish can grow to enormous sizes. They are known for their inquisitive nature, often eyeing divers with a human-like curiosity.",
            keyFacts: [
                { label: "Habitat", value: "Deep reef slopes and drop-offs" },
                { label: "Diet", value: "Carnivorous (shellfish, sea stars)" },
                { label: "Size", value: "Up to 2 meters" },
                { label: "Behavior", value: "Solitary, curious, slow-moving" }
            ],
            whereToSee: "The deep, nutrient-rich walls around Una-Una are the best place to encounter large adults. Juveniles are sometimes seen in shallower lagoon patches.",
            howToSpot: "Look for a massive, slow-moving fish with a geometric pattern on its face. The large hump on the head indicates a mature male.",
            responsibleGuidelines: [
                "Do not feed them; this alters their natural behavior.",
                "Avoid sudden movements that might startle this large fish.",
                "Maintain a respectful distance, even if they approach you.",
                "Do not touch or chase them.",
                "Support sustainable tourism operators who respect marine life."
            ],
            conservationStatus: "Endangered and protected in Indonesia. Their slow reproduction rate makes them highly vulnerable to overfishing.",
            quickSummary: "An inquisitive giant, the Napoleon Wrasse is an unforgettable encounter for divers in Togean."
        }
    },
    {
        nameEn: "Dugong",
        nameId: "Duyung",
        scientificName: "Dugong dugon",
        habitat: "Seagrass Meadows",
        commonLocations: "Shallow seagrass bays (e.g., around Talatakoh Island)",
        notesShort: "Rare marine mammal, seagrass eater; solitary and shy. Protected, rare sightings but reported by locals.",
        slug: "dugong",
        images: {
            hero: "/wildlife_real/sea/dugong/hero.webp",
            gallery: [
                "/wildlife_real/sea/dugong/gallery-1.webp",
                "/wildlife_real/sea/dugong/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Dugong, or 'Sea Cow', is a legendary and elusive marine mammal found in the Togean islands. These gentle giants spend their days grazing peacefully on seagrass meadows. Solitary and shy, an encounter with a Dugong is a rare and magical privilege.",
            keyFacts: [
                { label: "Habitat", value: "Coastal seagrass meadows" },
                { label: "Diet", value: "Herbivorous (seagrass specialist)" },
                { label: "Size", value: "Up to 3 meters" },
                { label: "Behavior", value: "Shy, slow-swimming, solitary" }
            ],
            whereToSee: "Sightings are rare and unpredictable, but they are known to inhabit the quiet, shallow bays around Talatakoh and the southern part of the Togean National Park where seagrass is plentiful.",
            howToSpot: "Scan calm, shallow water for a surfacing snout or a cloud of sediment stirred up by their feeding. They are very quiet and easily missed.",
            responsibleGuidelines: [
                "Cut boat engines immediately if a Dugong is spotted.",
                "Maintain complete silence and stillness in the water.",
                "Keep a distance of at least 50 meters.",
                "Never chase or swim directly towards them.",
                "Do not touch them under any circumstances."
            ],
            conservationStatus: "Vulnerable to extinction. Protected in Indonesia. They act as a flagship species for the health of coastal seagrass ecosystems.",
            quickSummary: "The 'Ghost of the Seagrass', finding a Duyung is a rare gift requiring patience and luck."
        }
    },
    {
        nameEn: "Giant Clam",
        nameId: "Kima",
        scientificName: "Tridacna spp.",
        habitat: "Coral Reefs",
        commonLocations: "Shallow reef areas (natural 'clam gardens' near some islands)",
        notesShort: "Giant bivalve >50cm. Colorful mantle (green, blue). Protected, snorkeling attraction.",
        slug: "giant-clam",
        images: {
            hero: "/wildlife_real/sea/giant-clam/hero.webp",
            gallery: [
                "/wildlife_real/sea/giant-clam/gallery-1.webp",
                "/wildlife_real/sea/giant-clam/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Togean Islands are home to impressive impressive Giant Clams, the largest living bivalve mollusks. Anchored into the coral, their fleshy mantles display a kaleidoscope of iridescent blues, greens, and purples, acting as solar panels for the algae living within their tissues.",
            keyFacts: [
                { label: "Habitat", value: "Sunlit shallow coral reefs" },
                { label: "Diet", value: "Filter feeder & photosynthesis" },
                { label: "Size", value: "Can exceed 1 meter" },
                { label: "Behavior", value: "Sessile (stationary)" }
            ],
            whereToSee: "You can find them dotted across almost every shallow reef in Togean. Some areas, protected by locals as 'Kima Gardens', host high densities of very large individuals.",
            howToSpot: "Look for large, wavy shells embedded in the reef with brightly colored fleshy lips. They will close quickly if a shadow passes over them.",
            responsibleGuidelines: [
                "Do not poke or touch the mantle; it can damage their delicate tissues.",
                "Avoid blocking their sunlight for extended periods.",
                "Be careful with your fins in shallow water to avoid kicking them.",
                "Do not collect or remove them from the reef.",
                "Admire their colors from a respectful distance."
            ],
            conservationStatus: "Protected species. Overharvesting has threatened them in many parts of the world, making Togean populations particularly valuable.",
            quickSummary: "A stationary jewel of the reef, displaying nature's most vibrant neon colors."
        }
    },
    {
        nameEn: "Seahorse",
        nameId: "Kuda Laut",
        scientificName: "Hippocampus sp.",
        habitat: "Seagrass, Mangroves, Coral",
        commonLocations: "Seagrass beds and mangrove roots (e.g., around Kabalutan village)",
        notesShort: "Small (~10cm) and master of camouflage. Sometimes found by dive guides. Vulnerable due to trade.",
        slug: "seahorse",
        images: {
            hero: "/wildlife/sea/seahorse/hero.webp",
            gallery: [
                "/wildlife/sea/seahorse/gallery-1.webp",
                "/wildlife/sea/seahorse/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "Masters of camouflage, the Seahorses of Togean are tiny marvels often hidden in plain sight. Clinging to seagrass blades or mangrove roots with their prehensile tails, these upright-swimming fish are a favorite find for macro photography enthusiasts.",
            keyFacts: [
                { label: "Habitat", value: "Seagrass, mangroves, soft coral" },
                { label: "Diet", value: "Tiny crustaceans (ambush predator)" },
                { label: "Size", value: "2 to 15 cm" },
                { label: "Behavior", value: "Stationary, relies on camouflage" }
            ],
            whereToSee: "The seagrass beds and shallow, silty areas near mangrove forests, such as those around Kabalutan village, are prime hunting grounds. You need a keen eye or a good guide.",
            howToSpot: "Move very slowly and scan the stems of seagrass or gorgonian fans. Look for the curl of their tail or their distinctive snout profile.",
            responsibleGuidelines: [
                "Do not use a pointer stick to move or touch them.",
                "Avoid using strong strobes or flash photography repeatedly.",
                "Do not disturb the habitat they are holding onto.",
                "Keep buoyancy control perfect to avoid stirring up silt.",
                "Never attempt to capture or handle them."
            ],
            conservationStatus: "Vulnerable. Populations are threatened globally by the traditional medicine trade and habitat loss.",
            quickSummary: "A tiny, hidden treasure that rewarding the most patient and observant explorers."
        }
    },
    {
        nameEn: "Stingless Jellyfish",
        nameId: "Ubur-ubur tak menyengat",
        scientificName: "Mastigias papua",
        habitat: "Marine Lakes",
        commonLocations: "Mariona Lake, Togean Island (near Katupat)",
        notesShort: "Thousands of orange spotted jellyfish. Evolved without sting due to no predators. Safe for swimming.",
        slug: "stingless-jellyfish",
        images: {
            hero: "/wildlife/sea/stingless-jellyfish/hero.webp",
            gallery: [
                "/wildlife/sea/stingless-jellyfish/gallery-1.webp",
                "/wildlife/sea/stingless-jellyfish/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "In the isolated Mariona Lake, a unique evolutionary phenomenon has occurred. Cut off from the ocean and its predators for millennia, the Golden Jellyfish here have lost their ability to sting. Swimming amongst thousands of these pulsing, orange orbs is an ethereal and harmless experience.",
            keyFacts: [
                { label: "Habitat", value: "Enclosed marine lakes" },
                { label: "Diet", value: "Photosynthesis (via symbiotic algae)" },
                { label: "Size", value: "5 to 20 cm" },
                { label: "Behavior", value: "Migrates following the sun" }
            ],
            whereToSee: "Exclusively found in Mariona Lake, located near Katupat village on Togean Island. A short trek from the jetty brings you to this hidden lagoon.",
            howToSpot: "You cannot miss them. Once you enter the water and swim towards the sunlit areas, you will be surrounded by thousands of them.",
            responsibleGuidelines: [
                "Do not wear sunscreen (chemicals harm the jellyfish).",
                "Do not wear fins (kicking tears their delicate bodies).",
                "Enter the water slowly and swim gently.",
                "Do not lift them out of the water; they will collapse.",
                "Do not jump or dive into the lake."
            ],
            conservationStatus: "Protected locally. The ecosystem is fragile and dependent on maintaining the lake's chemical balance.",
            quickSummary: "An otherworldly experience, swimming in a galaxy of harmless, golden jellyfish."
        }
    }
];
