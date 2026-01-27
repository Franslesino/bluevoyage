export interface LandWildlifeDetail {
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
        conservationNotes: string;
        quickSummary: string;
    };
}

export const wildlifeLandDetails: LandWildlifeDetail[] = [
    {
        nameEn: "Komodo Dragon",
        nameId: "Komodo",
        scientificName: "Varanus komodoensis",
        habitat: "Savannah, dry forest, beaches",
        commonLocations: "Komodo Island, Rinca Island",
        notesShort: "The world's largest lizard, capable of growing up to 3 meters. A powerful apex predator known for its stealth, strength, and venomous bite.",
        slug: "komodo-dragon",
        images: {
            hero: "/wildlife_real/land/komodo-dragon/hero.webp",
            gallery: [
                "/wildlife_real/land/komodo-dragon/gallery-1.webp",
                "/wildlife_real/land/komodo-dragon/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Komodo Dragon is the largest living lizard in the world, a prehistoric-looking reptile that dominates the food chain of its island home. These powerful predators are famous for their size, strength, and unique hunting abilities.",
            keyFacts: [
                { label: "Habitat", value: "Savannah, dry forest, beaches" },
                { label: "Diet", value: "Deer, boar, buffalo, carrion" },
                { label: "Size", value: "Up to 3 meters; 70-90 kg" },
                { label: "Behavior", value: "Solitary ambush predator; highly intelligent" }
            ],
            whereToSee: "Rangers will guide you on trails in Komodo and Rinca islands where dragons are frequently spotted basking or patrolling.",
            howToSpot: "Look for large, low shapes moving slowly through the grass or resting in the shade of trees. Always stay with your ranger.",
            responsibleGuidelines: [
                "Always keep a safe distance (10m+).",
                "Stay with your ranger at all times.",
                "No running or sudden movements.",
                "Do not eat/carry strong-smelling food.",
                "Respect their territory."
            ],
            conservationNotes: "Endangered; protected within Komodo National Park.",
            quickSummary: "The legendary dragon of Flores, a living dinosaur."
        }
    },
    {
        nameEn: "Timor Deer",
        nameId: "Rusa Timor",
        scientificName: "Rusa timorensis",
        habitat: "Savannah, open forest",
        commonLocations: "Komodo, Rinca, Padar",
        notesShort: "The primary prey of the Komodo dragon. These agile deer are commonly seen grazing in the open savannahs of the park.",
        slug: "timor-deer",
        images: {
            hero: "/wildlife_real/land/timor-deer/hero.webp",
            gallery: [
                "/wildlife_real/land/timor-deer/gallery-1.webp",
                "/wildlife_real/land/timor-deer/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Timor Deer is an elegant deer species native to Indonesia and Timor-Leste. In Komodo National Park, they play a crucial role as the main food source for the Komodo dragon.",
            keyFacts: [
                { label: "Habitat", value: "Savannah, grassland, open forest" },
                { label: "Diet", value: "Grass, leaves, herbs" },
                { label: "Size", value: "Medium-sized deer" },
                { label: "Behavior", value: "Herd animals; wary and alert" }
            ],
            whereToSee: "Commonly seen grazing on the savannah slopes of Komodo and Rinca, often venturing onto beaches.",
            howToSpot: "Scan the open grassy slopes, especially in the early morning and late afternoon. Look for herds resting under shade trees.",
            responsibleGuidelines: [
                "Do not approach or chase.",
                "Do not feed them.",
                "Observe quietly from a distance.",
                "Be aware they are wild animals."
            ],
            conservationNotes: "Vulnerable; important population within the park.",
            quickSummary: "Graceful grazers of the savannah, living alongside dragons."
        }
    },
    {
        nameEn: "Orange-footed Scrubfowl",
        nameId: "Burung Gosong",
        scientificName: "Megapodius reinwardt",
        habitat: "Forest, coastal scrub",
        commonLocations: "Komodo, Rinca",
        notesShort: "A chicken-sized ground bird known for building massive incubation mounds. They rely on solar or volcanic heat to hatch their eggs.",
        slug: "orange-footed-scrubfowl",
        images: {
            hero: "/wildlife_real/land/orange-footed-scrubfowl/hero.webp",
            gallery: [
                "/wildlife_real/land/orange-footed-scrubfowl/gallery-1.webp",
                "/wildlife_real/land/orange-footed-scrubfowl/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Orange-footed Scrubfowl is a fascinating megapode that constructs enormous mounds of decaying vegetation and earth to incubate its eggs, checking the temperature with its beak.",
            keyFacts: [
                { label: "Habitat", value: "Forest, coastal scrub" },
                { label: "Diet", value: "Seeds, berries, insects" },
                { label: "Size", value: "Chicken-sized" },
                { label: "Behavior", value: "Ground-dwelling; builds huge mounds" }
            ],
            whereToSee: "Look for large mounds of earth and leaves in the forest understory on Rinca and Komodo.",
            howToSpot: "Listen for their raucous calls or scratching sounds in the leaf litter. Spot the bright orange legs and crest.",
            responsibleGuidelines: [
                "Do not disturb nesting mounds.",
                "Avoid sudden movements.",
                "Observe from a distance.",
                "No flash photography specifically near nests."
            ],
            conservationNotes: "Least Concern; common in suitable habitat.",
            quickSummary: "The master builder of the forest floor."
        }
    },
    {
        nameEn: "Water Buffalo",
        nameId: "Kerbau Air",
        scientificName: "Bubalus bubalis",
        habitat: "Waterholes, wallows, savannah",
        commonLocations: "Rinca, Komodo",
        notesShort: "Large, formidable bovines introduced to the islands long ago. They often wallow in mud pools to keep cool and are another prey item for large dragons.",
        slug: "water-buffalo",
        images: {
            hero: "/wildlife_real/land/water-buffalo/hero.webp",
            gallery: [
                "/wildlife_real/land/water-buffalo/gallery-1.webp",
                "/wildlife_real/land/water-buffalo/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "Water Buffaloes in Komodo National Park are feral descendants of domestic stock. These massive animals can be dangerous when cornered or injured, and large adults are occasionally taken down by groups of dragons.",
            keyFacts: [
                { label: "Habitat", value: "Waterholes, wallows, savannah" },
                { label: "Diet", value: "Grass, aquatic plants" },
                { label: "Size", value: "Large, up to 1200kg" },
                { label: "Behavior", value: "Social; wallows in mud; defensive" }
            ],
            whereToSee: "Often found near permanent water sources or mud wallows, especially on Rinca Island.",
            howToSpot: "Look for massive dark shapes in mud pools or grazing in tall grass.",
            responsibleGuidelines: [
                "Keep a very safe distance.",
                "Do not block their path to water.",
                "Respect their size and power.",
                "Never startle them."
            ],
            conservationNotes: "Introduced species; integrated into the local food web.",
            quickSummary: "Massive and powerful, a challenge even for dragons."
        }
    },
    {
        nameEn: "Wild Boar",
        nameId: "Babi Hutan",
        scientificName: "Sus scrofa",
        habitat: "Forest, savannah",
        commonLocations: "Throughout the park",
        notesShort: "Adaptable and omnivorous, wild boars forage widely across the islands. They are a common food source for medium to large dragons.",
        slug: "wild-boar",
        images: {
            hero: "/wildlife_real/land/wild-boar/hero.webp",
            gallery: [
                "/wildlife_real/land/wild-boar/gallery-1.webp",
                "/wildlife_real/land/wild-boar/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "Wild boars are tough and adaptable survivors. In Komodo, they are frequently seen foraging in the forest or near beaches, always on the alert for predators.",
            keyFacts: [
                { label: "Habitat", value: "Forest, savannah, mangroves" },
                { label: "Diet", value: "Roots, tubers, fruit, carrion" },
                { label: "Size", value: "Medium" },
                { label: "Behavior", value: "Social sounders; skittish" }
            ],
            whereToSee: "Can be encountered on trails on both Komodo and Rinca.",
            howToSpot: "Listen for grunting and rustling in the bushes. They often freeze before bolting.",
            responsibleGuidelines: [
                "Do not corner them.",
                "Do not feed.",
                "Observation from distance only.",
                "Be quiet to avoid scaring them."
            ],
            conservationNotes: "Least Concern; abundant population.",
            quickSummary: "Resourceful foragers of the island ecosystem."
        }
    },
    {
        nameEn: "Sunda Flying Fox",
        nameId: "Kalong",
        scientificName: "Pteropus vampyrus",
        habitat: "Mangroves (roosting), Forest (feeding)",
        commonLocations: "Kalong Island (near Rinca)",
        notesShort: "Large fruit bats that roost in mangroves by day and fly out in massive flocks at sunset—a spectacular daily migration.",
        slug: "sunda-flying-fox",
        images: {
            hero: "/wildlife_real/land/sunda-flying-fox/hero.webp",
            gallery: [
                "/wildlife_real/land/sunda-flying-fox/gallery-1.webp",
                "/wildlife_real/land/sunda-flying-fox/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The daily flight of the Sunda Flying Foxes from Kalong Island is a Komodo highlight. Thousands of these large bats take to the sky at twilight to feed on fruit on neighboring islands.",
            keyFacts: [
                { label: "Habitat", value: "Mangroves (day), Fruit forests (night)" },
                { label: "Diet", value: "Fruit, nectar, flowers" },
                { label: "Size", value: "Large wingspan ~1.5m" },
                { label: "Behavior", value: "Colonial roosters; nocturnal foragers" }
            ],
            whereToSee: "Best seen from a boat near Kalong Island at sunset.",
            howToSpot: "Look up at sunset! The sky fills with their silhouettes.",
            responsibleGuidelines: [
                "Do not disturb roosting sites during the day.",
                "Keep noise down near mangrove roots.",
                "No strong lights/lasers at the bats.",
                "Enjoy the spectacle quietly."
            ],
            conservationNotes: "Near Threatened; vital seed dispersers and pollinators.",
            quickSummary: "Masters of the sunset sky."
        }
    }
];
