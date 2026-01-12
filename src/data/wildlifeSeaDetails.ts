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
        habitat: "Seagrass meadows, lagoons, shallow coral reefs",
        commonLocations: "Calm, shallow areas around Kadidiri and sheltered lagoons",
        notesShort: "Calm grazer; surfaces to breathe; rests under ledges.",
        slug: "green-sea-turtle",
        images: {
            hero: "/wildlife_real/sea/green-sea-turtle/hero.webp",
            gallery: [
                "/wildlife_real/sea/green-sea-turtle/gallery-1.webp",
                "/wildlife_real/sea/green-sea-turtle/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "A large, gentle sea turtle often seen cruising reefs and grazing seagrass meadows. Adults are mostly herbivorous and spend long periods foraging in shallow coastal waters before surfacing calmly to breathe.",
            keyFacts: [
                { label: "Habitat", value: "Seagrass meadows, lagoons, shallow coral reefs" },
                { label: "Diet", value: "Seagrass and algae (mostly herbivorous)" },
                { label: "Size", value: "Up to 1.5 meters" },
                { label: "Behavior", value: "Calm grazer; surfaces to breathe; rests under ledges" }
            ],
            whereToSee: "Most likely in calm, shallow areas around Kadidiri and sheltered lagoons across the Togeans, especially where seagrass is present.",
            howToSpot: "Scan seagrass edges and reef flats for a dark oval shell. Watch for a head surfacing briefly to breathe, then gliding back down.",
            responsibleGuidelines: [
                "Keep 3–5 m distance; never chase or block its path.",
                "Do not touch, ride, or attempt selfies.",
                "Maintain neutral buoyancy; don’t stand on coral/seagrass.",
                "No flash; avoid loud splashing.",
                "If it changes direction, you’re too close—back off."
            ],
            conservationStatus: "IUCN: Least Concern (2025 update); still protected, vulnerable locally to bycatch, habitat loss, and pollution.",
            quickSummary: "A large, gentle sea turtle often seen cruising reefs and grazing seagrass meadows."
        }
    },
    {
        nameEn: "Hawksbill Turtle",
        nameId: "Penyu Sisik",
        scientificName: "Eretmochelys imbricata",
        habitat: "Coral reefs, rocky reefs, lagoons",
        commonLocations: "Coral-rich snorkel and dive sites",
        notesShort: "Shy; threads through reefs; often solitary.",
        slug: "hawksbill-turtle",
        images: {
            hero: "/wildlife_real/sea/hawksbill-turtle/hero.webp",
            gallery: [
                "/wildlife_real/sea/hawksbill-turtle/gallery-1.webp",
                "/wildlife_real/sea/hawksbill-turtle/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "A smaller, reef-loving turtle with a pointed “hawk-like” beak, often weaving through coral structure. Many populations remain severely depleted; it’s strongly associated with healthy reefs and is famous for feeding heavily on sponges.",
            keyFacts: [
                { label: "Habitat", value: "Coral reefs, rocky reefs, lagoons" },
                { label: "Diet", value: "Sea sponges (plus mixed reef invertebrates)" },
                { label: "Size", value: "Up to ~1.0 meter" },
                { label: "Behavior", value: "Shy; threads through reefs; often solitary" }
            ],
            whereToSee: "On coral-rich snorkel and dive sites across the Togeans look along reef walls, bommies, and crevices where it forages.",
            howToSpot: "Search complex reef structure for a narrow beak and patterned shell. Check coral overhangs and cracks where it picks at sponges.",
            responsibleGuidelines: [
                "Give it space hawksbills spook easily.",
                "Never corner it in narrow reef passages.",
                "No touching; avoid contact with reef while watching.",
                "Keep fins up; don’t kick sand onto coral.",
                "Skip flash; limit time with a single animal."
            ],
            conservationStatus: "IUCN: Critically Endangered; threatened by illegal shell trade, bycatch, and reef loss.",
            quickSummary: "A smaller, reef-loving turtle with a pointed “hawk-like” beak, often weaving through coral structure."
        }
    },
    {
        nameEn: "Napoleon Wrasse",
        nameId: "Ikan Napoleon",
        scientificName: "Cheilinus undulatus",
        habitat: "Outer reef slopes, channels, lagoons",
        commonLocations: "Deep reef slopes and drop-offs",
        notesShort: "Usually solitary; curious; slow, powerful swimmer.",
        slug: "napoleon-wrasse",
        images: {
            hero: "/wildlife_real/sea/napoleon-wrasse/hero.jpg",
            gallery: [
                "/wildlife_real/sea/napoleon-wrasse/gallery-1.jpg",
                "/wildlife_real/sea/napoleon-wrasse/gallery-2.jpg"
            ]
        },
        expandedContent: {
            intro: "A massive, charismatic reef fish recognized by thick lips and an adult forehead “hump.” It patrols reef slopes and channels and is a highlight on deeper snorkel/dive sites. Slow-growing and heavily targeted in parts of its range.",
            keyFacts: [
                { label: "Habitat", value: "Outer reef slopes, channels, lagoons" },
                { label: "Diet", value: "Hard-shelled invertebrates, fish, reef fauna" },
                { label: "Size", value: "Up to 2 meters" },
                { label: "Behavior", value: "Usually solitary; curious; slow, powerful swimmer" }
            ],
            whereToSee: "Best chance on healthy coral reefs and drop-offs, especially around more exposed island reefs (including Una Una’s volcanic reef systems).",
            howToSpot: "Look for a very large silhouette with thick lips and a blunt head. Adults often cruise along reef edges; juveniles stay shallower near sheltered reef areas.",
            responsibleGuidelines: [
                "Keep distance; don’t crowd for photos.",
                "Never feed wildlife (changes behavior).",
                "Avoid rapid descents/noise that startle it.",
                "Maintain buoyancy; protect reef habitat.",
                "Choose operators that discourage taking “trophy” shots."
            ],
            conservationStatus: "IUCN: Endangered; also listed on CITES Appendix II (trade monitored).",
            quickSummary: "A massive, charismatic reef fish recognized by thick lips and an adult forehead “hump.”"
        }
    },
    {
        nameEn: "Dugong",
        nameId: "Duyung",
        scientificName: "Dugong dugon",
        habitat: "Shallow seagrass meadows in sheltered bays",
        commonLocations: "Calm, shallow seagrass areas",
        notesShort: "Shy; slow grazer; surfaces quietly to breathe.",
        slug: "dugong",
        images: {
            hero: "/wildlife_real/sea/dugong/hero.webp",
            gallery: [
                "/wildlife_real/sea/dugong/gallery-1.webp",
                "/wildlife_real/sea/dugong/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "A rare, gentle marine mammal that grazes seagrass in shallow bays. Dugongs are quiet, cautious, and most often seen where seagrass meadows are extensive and undisturbed making any sighting feel truly special.",
            keyFacts: [
                { label: "Habitat", value: "Shallow seagrass meadows in sheltered bays" },
                { label: "Diet", value: "Seagrass (grazing herbivore)" },
                { label: "Size", value: "Up to 3 meters" },
                { label: "Behavior", value: "Shy; slow grazer; surfaces quietly to breathe" }
            ],
            whereToSee: "If you’re lucky, in calm, shallow seagrass areas around the Togeans; sightings are uncommon and depend on conditions and disturbance levels.",
            howToSpot: "Look for muddy “grazing trails” in seagrass and a gray shape moving low over the bottom. Watch for a subtle roll and nostrils breaking the surface.",
            responsibleGuidelines: [
                "Keep very large distance; never pursue.",
                "No motorboats over seagrass at speed.",
                "If it dives/changes direction, you’re too close retreat.",
                "Avoid loud splashing; keep group small.",
                "Never separate mother and calf."
            ],
            conservationStatus: "IUCN: Vulnerable; CITES Appendix I (trade prohibited). Threatened by seagrass loss and net entanglement.",
            quickSummary: "A rare, gentle marine mammal that grazes seagrass in shallow bays."
        }
    },
    {
        nameEn: "Giant Clam",
        nameId: "Kima",
        scientificName: "Tridacna spp.",
        habitat: "Shallow coral reefs and reef flats",
        commonLocations: "Shallow coral gardens",
        notesShort: "Sessile; mantle open in sunlight; closes when disturbed.",
        slug: "giant-clam",
        images: {
            hero: "/wildlife_real/sea/giant-clam/hero.webp",
            gallery: [
                "/wildlife_real/sea/giant-clam/gallery-1.webp",
                "/wildlife_real/sea/giant-clam/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "A spectacular reef bivalve that can be enormous and brightly colored, with a living mantle that hosts symbiotic algae. Giant clams help filter water and contribute to reef productivity, but many populations have been heavily depleted by harvesting.",
            keyFacts: [
                { label: "Habitat", value: "Shallow coral reefs and reef flats" },
                { label: "Diet", value: "Filter-feeding plus symbiotic algae photosynthates" },
                { label: "Size", value: "Up to 1.2 meters" },
                { label: "Behavior", value: "Sessile; mantle open in sunlight; closes when disturbed" }
            ],
            whereToSee: "On clear, shallow coral gardens around the Togeans, scan reef flats and bommies for large shells with vivid mantles, especially on less disturbed sites.",
            howToSpot: "Look for a thick, ridged shell embedded in coral rock with a bright, wavy mantle. Approach slowly sudden shadows can make it clamp shut.",
            responsibleGuidelines: [
                "Never touch the mantle (it can stress the animal).",
                "Don’t stand/kneel on reef to photograph it.",
                "No souvenir collection clams are targeted.",
                "Avoid stirring sediment over reef flats.",
                "Use buoyancy control; keep fins up."
            ],
            conservationStatus: "Status varies by species; some giant clams are Critically Endangered due to overharvest and habitat decline.",
            quickSummary: "A spectacular reef bivalve that can be enormous and brightly colored."
        }
    },
    {
        nameEn: "Seahorse",
        nameId: "Kuda Laut",
        scientificName: "Hippocampus spp.",
        habitat: "Seagrass, mangroves, corals, sponges, seaweed",
        commonLocations: "Sheltered shallows, seagrass patches",
        notesShort: "Slow; hides; anchors with tail; ambush-feeds.",
        slug: "seahorse",
        images: {
            hero: "/wildlife_real/sea/seahorse/hero.webp",
            gallery: [
                "/wildlife_real/sea/seahorse/gallery-1.webp",
                "/wildlife_real/sea/seahorse/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "Small, camouflaged fish that cling to seagrass, sponges, and coral with a prehensile tail. Seahorses rely on stealth and blend into textured habitats, making sightings feel like a “treasure hunt” for patient snorkelers and divers.",
            keyFacts: [
                { label: "Habitat", value: "Seagrass, mangroves, corals, sponges, seaweed" },
                { label: "Diet", value: "Tiny crustaceans and plankton" },
                { label: "Size", value: "Typically up to ~15 cm (species-dependent)" },
                { label: "Behavior", value: "Slow; hides; anchors with tail; ambush-feeds" }
            ],
            whereToSee: "In sheltered shallows seagrass patches, spongey reef edges, and coral rubble. Look in calm lagoons near mangroves or protected bays across the Togeans.",
            howToSpot: "Slow down and scan for unusual “knobs” holding onto grass or sponges. Watch for tiny eye movement and a curled tail wrapped around a stem.",
            responsibleGuidelines: [
                "No touching seahorses stress easily.",
                "Keep fins controlled; avoid silt-out.",
                "No flash at close range; keep lights low.",
                "Don’t move vegetation to “reveal” them.",
                "Limit viewing time; rotate the group."
            ],
            conservationStatus: "All seahorses are CITES Appendix II; many species are pressured by habitat loss and trade.",
            quickSummary: "Small, camouflaged fish that cling to seagrass, sponges, and coral with a prehensile tail."
        }
    },
    {
        nameEn: "Stingless Jellyfish",
        nameId: "Ubur-ubur tak menyengat",
        scientificName: "Mastigias-type",
        habitat: "Isolated marine lakes and enclosed lagoons",
        commonLocations: "Lake Mariona (Jellyfish Lake)",
        notesShort: "Slow drifters; gather in sunlit water; daily movements.",
        slug: "stingless-jellyfish",
        images: {
            hero: "/wildlife_real/sea/stingless-jellyfish/hero.webp",
            gallery: [
                "/wildlife_real/sea/stingless-jellyfish/gallery-1.webp",
                "/wildlife_real/sea/stingless-jellyfish/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "In sheltered marine lakes, Mastigias-type jellyfish can be abundant and largely harmless to swimmers. They’re often called “stingless,” though some populations have very mild stinging cells; the experience is typically gentle, surreal, and slow-paced.",
            keyFacts: [
                { label: "Habitat", value: "Isolated marine lakes and enclosed lagoons" },
                { label: "Diet", value: "Plankton plus symbiotic algae (zooxanthellae)" },
                { label: "Size", value: "Usually ~8–10 cm bell diameter" },
                { label: "Behavior", value: "Slow drifters; gather in sunlit water; daily movements" }
            ],
            whereToSee: "At Lake Mariona (Jellyfish Lake) in the Togean Islands, where swimmers can float among dense groups of gentle jellyfish in calm, enclosed water.",
            howToSpot: "You’ll see soft, amber “dots” pulsing just below the surface in still water. Enter slowly and let your eyes adjust then they appear everywhere.",
            responsibleGuidelines: [
                "Don’t touch or scoop jellyfish.",
                "No fins (can injure them); float gently.",
                "Avoid sunscreen oils in the lake; cover up instead.",
                "No soap/shampoo before swimming.",
                "Keep noise low; respect local rules."
            ],
            conservationStatus: "Often not formally assessed; highly sensitive to pollution, temperature shifts, and human impact in enclosed lake ecosystems.",
            quickSummary: "In sheltered marine lakes, Mastigias-type jellyfish can be abundant and largely harmless to swimmers."
        }
    }
];
