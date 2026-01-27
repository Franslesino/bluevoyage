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
        nameEn: "Manta Ray",
        nameId: "Pari Manta",
        scientificName: "Manta alfredi",
        habitat: "Open water, cleaning stations",
        commonLocations: "Manta Point, Makassar Reef",
        notesShort: "The gentle giant of the ocean. Komodo is famous for its resident population of Reef Mantas, often seen feeding or interacting at cleaning stations.",
        slug: "manta-ray",
        images: {
            hero: "/wildlife_real/sea/manta-ray/hero.webp",
            gallery: [
                "/wildlife_real/sea/manta-ray/gallery-1.webp",
                "/wildlife_real/sea/manta-ray/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "Manta Rays are among the most graceful creatures in the ocean. In Komodo National Park, currents bring plankton-rich water that attracts these giants to specific sites like Manta Point, offering unforgettable encounters for snorkelers and divers.",
            keyFacts: [
                { label: "Habitat", value: "Open water, cleaning stations" },
                { label: "Diet", value: "Plankton (filter feeder)" },
                { label: "Size", value: "Wingspan up to 5 meters" },
                { label: "Behavior", value: "Curious; visits cleaning stations" }
            ],
            whereToSee: "Manta Point (Makassar Reef) is the most reliable spot, especially when currents are running. Sightings are year-round but best from December to March.",
            howToSpot: "Look for dark diamond shapes near the surface or gliding along the bottom. Watch for wing tips breaking the surface.",
            responsibleGuidelines: [
                "Do not chase or touch.",
                "Stay calm and let them approach you.",
                "Do not block their path.",
                "Maintain 3 meters distance."
            ],
            conservationStatus: "Vulnerable; protected in Indonesia.",
            quickSummary: "The flying carpets of the deep."
        }
    },
    {
        nameEn: "Green Sea Turtle",
        nameId: "Penyu Hijau",
        scientificName: "Chelonia mydas",
        habitat: "Seagrass meadows, coral reefs",
        commonLocations: "Siaba Besar, Batu Bolong",
        notesShort: "A frequent sight in Komodo's waters. These large turtles can often be seen resting on the reef or grazing in seagrass beds.",
        slug: "green-sea-turtle",
        images: {
            hero: "/wildlife_real/sea/green-sea-turtle/hero.webp",
            gallery: [
                "/wildlife_real/sea/green-sea-turtle/gallery-1.webp",
                "/wildlife_real/sea/green-sea-turtle/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Green Sea Turtle is a large and peaceful marine reptile. Unlike other sea turtles, adults are herbivorous, feeding primarily on seagrass and algae, which gives their fat (and name) a greenish color.",
            keyFacts: [
                { label: "Habitat", value: "Seagrass meadows, coral reefs" },
                { label: "Diet", value: "Seagrass, algae" },
                { label: "Size", value: "Up to 1.5 meters" },
                { label: "Behavior", value: "Grazes in shallows; rests under ledges" }
            ],
            whereToSee: "Siaba Besar (often called 'Turtle City') is a hotspot. Also commonly seen at Batu Bolong and Pink Beach.",
            howToSpot: "Scan seagrass beds for a large shell. They surface regularly to breathe.",
            responsibleGuidelines: [
                "Do not hold or ride turtles.",
                "Give them space to surface.",
                "Do not stand on seagrass.",
                "No flash photography."
            ],
            conservationStatus: "Endangered; sensitive to coastal development.",
            quickSummary: "The peaceful grazer of the seagrass gardens."
        }
    },
    {
        nameEn: "Dugong",
        nameId: "Duyung",
        scientificName: "Dugong dugon",
        habitat: "Shallow seagrass meadows",
        commonLocations: "Remote bays",
        notesShort: "The shy 'sea cow' is a rare find. They graze on seagrass in quiet, shallow bays and are strictly marine mammals.",
        slug: "dugong",
        images: {
            hero: "/wildlife_real/sea/dugong/hero.webp",
            gallery: [
                "/wildlife_real/sea/dugong/gallery-1.webp",
                "/wildlife_real/sea/dugong/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "Dugongs are related to manatees and are the only strictly marine herbivorous mammal. They are extremely shy and elusive in Komodo, requiring undisturbed seagrass meadows to thrive.",
            keyFacts: [
                { label: "Habitat", value: "Shallow seagrass meadows" },
                { label: "Diet", value: "Seagrass exclusively" },
                { label: "Size", value: "Up to 3 meters" },
                { label: "Behavior", value: "Shy; slow-moving; grazes constantly" }
            ],
            whereToSee: "Very rare. Occasionally spotted in quiet bays away from boat traffic.",
            howToSpot: "Look for a snout breaking the surface in calm water or a large shadow moving over sand.",
            responsibleGuidelines: [
                "Cut engines immediately if sighted.",
                "Do not pursue.",
                "Observe from a distance.",
                "Silence is key."
            ],
            conservationStatus: "Vulnerable; threatened by propeller strikes and habitat loss.",
            quickSummary: "The elusive mermaid of the seagrass."
        }
    },
    {
        nameEn: "Eagle Ray",
        nameId: "Pari Elang",
        scientificName: "Aetobatus ocellatus",
        habitat: "Open water, reef edges",
        commonLocations: "Crystal Rock, Castle Rock",
        notesShort: "Recognizable by their spotted backs and distinct 'duck-bill' snout. They often fly in formation through the currents.",
        slug: "eagle-ray",
        images: {
            hero: "/wildlife_real/sea/eagle-ray/hero.webp",
            gallery: [
                "/wildlife_real/sea/eagle-ray/gallery-1.webp",
                "/wildlife_real/sea/eagle-ray/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "Spotted Eagle Rays are among the most beautiful rays, with white spots on a dark background. They are active swimmers, often seen cruising in the current or digging in the sand for crustaceans.",
            keyFacts: [
                { label: "Habitat", value: "Open water, reef edges" },
                { label: "Diet", value: "Mollusks, crustaceans" },
                { label: "Size", value: "Wingspan up to 3 meters" },
                { label: "Behavior", value: "Schools in currents; active swimmers" }
            ],
            whereToSee: "Often seen patrolling the reef edge at current-swept sites like Crystal Rock and Castle Rock.",
            howToSpot: "Look for their distinct spotted pattern and long tail flying in the blue water.",
            responsibleGuidelines: [
                "Do not chase.",
                "Maintain neutral buoyancy.",
                "Watch their flight path.",
                "Give them space."
            ],
            conservationStatus: "Vulnerable; prone to bycatch.",
            quickSummary: "The spotted aviators of the reef."
        }
    },
    {
        nameEn: "Clownfish",
        nameId: "Ikan Badut",
        scientificName: "Amphiprioninae",
        habitat: "Anemones on coral reefs",
        commonLocations: "All snorkeling sites",
        notesShort: "Living in symbiosis with sea anemones, these colorful fish are aggressive defenders of their homes despite their small size.",
        slug: "clownfish",
        images: {
            hero: "/wildlife_real/sea/clownfish/hero.webp",
            gallery: [
                "/wildlife_real/sea/clownfish/gallery-1.webp",
                "/wildlife_real/sea/clownfish/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "Famous and photogenic, Clownfish (or Anemonefish) have a unique relationship with their host anemones, immune to their sting. There are many species in Komodo, not just the famous 'Nemo' (False Percula).",
            keyFacts: [
                { label: "Habitat", value: "Anemones on coral reefs" },
                { label: "Diet", value: "Algae, plankton, parasites" },
                { label: "Size", value: "Small, 5-10cm" },
                { label: "Behavior", value: "Territorial; never leaves host" }
            ],
            whereToSee: "Almost every reef in Komodo has anemones with resident clownfish. Look in shallow waters.",
            howToSpot: "Find an anemone and look for the fish dancing within the tentacles.",
            responsibleGuidelines: [
                "Do not touch the anemone (it stings).",
                "Do not harass the fish to make them move.",
                "Be careful with fins around coral.",
                "No flash close up."
            ],
            conservationStatus: "Stable, but habitat (reefs) is threatened.",
            quickSummary: "The brave little warriors of the anemone."
        }
    },
    {
        nameEn: "Giant Trevally",
        nameId: "Ikan Bobara",
        scientificName: "Caranx ignobilis",
        habitat: "Reef drop-offs, currents",
        commonLocations: "Batu Bolong, Crystal Rock",
        notesShort: "A powerful predator often seen patrolling reef walls in search of prey. They are impressive, silvery fish with a steep head profile.",
        slug: "giant-trevally",
        images: {
            hero: "/wildlife_real/sea/giant-trevally/hero.webp",
            gallery: [
                "/wildlife_real/sea/giant-trevally/gallery-1.webp",
                "/wildlife_real/sea/giant-trevally/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Giant Trevally (GT) is a top predator of the reef fish world. Known for their power and speed, they often hunt in packs or solitary, darting into schools of fusiliers. They dominate the high-current sites of Komodo.",
            keyFacts: [
                { label: "Habitat", value: "Reef drop-offs, currents" },
                { label: "Diet", value: "Fish, crustaceans, birds (rarely)" },
                { label: "Size", value: "Up to 1.7 meters; 80kg" },
                { label: "Behavior", value: "Aggressive hunter; attracted to movement" }
            ],
            whereToSee: "High-energy sites like Batu Bolong and The Cauldron. They love the current.",
            howToSpot: "Look for large, silver, bulldog-faced fish patrolling the blue or charging into the reef.",
            responsibleGuidelines: [
                "Do not wear shiny jewelry (attracts them).",
                "Keep fingers tucked in.",
                "Enjoy the action from a distance.",
                "Do not feed."
            ],
            conservationStatus: "Least Concern, but targeted by sport fishing.",
            quickSummary: "The silver king of the current."
        }
    }
];
