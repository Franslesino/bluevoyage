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
        nameEn: "Togian Monkey",
        nameId: "Monyet Togean",
        scientificName: "Macaca togeanus",
        habitat: "Lowland island forest, forest edges",
        commonLocations: "Malenge Island Forests",
        notesShort: "A stocky, dark macaque with short tail and pale cheek tufts, known from the Togian Islands. Often seen in small-to-medium troops along forest edges and trails, foraging on fruits and other plant foods. Most reliably associated with Malenge’s forests.",
        slug: "togian-monkey",
        images: {
            hero: "/wildlife_real/land/togian-monkey/hero.webp",
            gallery: [
                "/wildlife_real/land/togian-monkey/gallery-1.webp",
                "/wildlife_real/land/togian-monkey/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "A stocky, dark macaque with short tail and pale cheek tufts, known from the Togian Islands. Often seen in small-to-medium troops along forest edges and trails, foraging on fruits and other plant foods. Most reliably associated with Malenge’s forests.",
            keyFacts: [
                { label: "Habitat", value: "Lowland island forest, forest edges" },
                { label: "Diet", value: "Fruits, leaves, seeds, insects" },
                { label: "Size", value: "~50–68 cm; tail ~3–7 cm; ~8–12 kg" },
                { label: "Behavior", value: "Social troops; vocal; bold near fruiting trees" }
            ],
            whereToSee: "Best chance on Malenge forest walks and edges near gardens; early morning and late afternoon activity is most noticeable.",
            howToSpot: "Listen for branch rustles and contact calls; scan mid-canopy near fruiting trees. Look for dark bodies with pale cheek tufts moving in groups.",
            responsibleGuidelines: [
                "Keep 10+ meters distance.",
                "Never feed or show food.",
                "Move slowly; avoid direct staring.",
                "Don’t block their path on trails.",
                "Pack out all trash; secure snacks."
            ],
            conservationNotes: "Generally treated as Vulnerable (Tonkean macaque complex); habitat loss is the key threat.",
            quickSummary: "A charismatic and rare primate, the black macaque is the soul of Malenge's forests."
        }
    },
    {
        nameEn: "Togean Tarsier",
        nameId: "Tarsius Togean",
        scientificName: "Tarsius niemitzi",
        habitat: "Lowland forest, scrubby woodland, gardens",
        commonLocations: "Forest edges and mixed gardens",
        notesShort: "A tiny nocturnal primate endemic to the Togian Islands, famous for huge eyes, powerful vertical leaps, and insect-hunting. It sleeps by day in dense vegetation and becomes active after dusk, moving quickly through understory and small trees.",
        slug: "togean-tarsier",
        images: {
            hero: "/wildlife_real/land/togean-tarsier/hero.webp",
            gallery: [
                "/wildlife_real/land/togean-tarsier/gallery-1.webp",
                "/wildlife_real/land/togean-tarsier/gallery-2.png"
            ]
        },
        expandedContent: {
            intro: "A tiny nocturnal primate endemic to the Togian Islands, famous for huge eyes, powerful vertical leaps, and insect-hunting. It sleeps by day in dense vegetation and becomes active after dusk, moving quickly through understory and small trees.",
            keyFacts: [
                { label: "Habitat", value: "Lowland forest, scrubby woodland, gardens" },
                { label: "Diet", value: "Insectivorous: insects, spiders, small vertebrates" },
                { label: "Size", value: "Body ~10–15 cm (very small)" },
                { label: "Behavior", value: "Nocturnal; agile leaper; calls at dusk" }
            ],
            whereToSee: "Night walks on larger Togian islands’ forest edges and mixed gardens; reports note it’s absent from Una-Una.",
            howToSpot: "Use a dim red light; look for eye-shine low in the understory. Pause often—tarsiers freeze, then leap suddenly.",
            responsibleGuidelines: [
                "Use red light only; no flash.",
                "Keep voices low; no playback calls.",
                "Limit viewing time per animal.",
                "Don’t approach roost sites by day.",
                "Stay on paths; avoid trampling understory."
            ],
            conservationNotes: "Endangered; highly sensitive to forest disturbance on small islands.",
            quickSummary: "The world's smallest primate, a wide-eyed nocturnal hunter of the Togean night."
        }
    },
    {
        nameEn: "Togian Babirusa",
        nameId: "Babirusa Togean",
        scientificName: "Babyrousa togeanensis",
        habitat: "Lowland forest, riverine areas, edges",
        commonLocations: "Malenge, Batudaka, Togean",
        notesShort: "A rare, pig-like mammal with remarkable upward-curving tusks in males. Endemic to the Togian archipelago, it forages on roots, fallen fruit, and invertebrates in forest and near gardens, and can be wary where hunting pressure exists.",
        slug: "togian-babirusa",
        images: {
            hero: "/wildlife_real/land/togean-babirusa/hero.webp",
            gallery: [
                "/wildlife_real/land/togean-babirusa/gallery-1.webp",
                "/wildlife_real/land/togean-babirusa/gallery-2.jpg"
            ]
        },
        expandedContent: {
            intro: "A rare, pig-like mammal with remarkable upward-curving tusks in males. Endemic to the Togian archipelago, it forages on roots, fallen fruit, and invertebrates in forest and near gardens, and can be wary where hunting pressure exists.",
            keyFacts: [
                { label: "Habitat", value: "Lowland forest, riverine areas, edges" },
                { label: "Diet", value: "Roots, fallen fruit, worms, invertebrates" },
                { label: "Size", value: "Largest babirusa; boar-sized" },
                { label: "Behavior", value: "Shy; mostly crepuscular; uses forest cover" }
            ],
            whereToSee: "Only in Togian Islands; records emphasize Malenge, Batudaka, Togean, and nearby islands—never guaranteed and very local.",
            howToSpot: "Look for tracks and rooting signs near muddy wallows and fruit fall; dawn/dusk quiet sits near forest-edge clearings can work better than hiking fast.",
            responsibleGuidelines: [
                "Keep 20+ meters distance.",
                "Never corner animals on narrow trails.",
                "No baiting, feeding, or spotlighting.",
                "Respect community rules and gardens.",
                "Use local guides; avoid sensitive areas."
            ],
            conservationNotes: "Endangered; protected; threatened by hunting and habitat pressure/human–wildlife conflict.",
            quickSummary: "A rare, tusked wonder of the deep jungle, shrouded in mystery."
        }
    },
    {
        nameEn: "Knobbed Hornbill",
        nameId: "Rangkong Sulawesi",
        scientificName: "Rhyticeros cassidix",
        habitat: "Lowland and hill forest canopy",
        commonLocations: "Tall forest canopy",
        notesShort: "A large Sulawesi endemic hornbill with an unmistakable casque (“knob”) and loud wingbeats. A key seed-disperser that spends much of its time in tall forest canopy, often traveling widely to follow fruiting fig trees.",
        slug: "knobbed-hornbill",
        images: {
            hero: "/wildlife_real/land/knobbed-hornbill/hero.webp",
            gallery: [
                "/wildlife_real/land/knobbed-hornbill/gallery-1.webp",
                "/wildlife_real/land/knobbed-hornbill/gallery-2.png"
            ]
        },
        expandedContent: {
            intro: "A large Sulawesi endemic hornbill with an unmistakable casque (“knob”) and loud wingbeats. A key seed-disperser that spends much of its time in tall forest canopy, often traveling widely to follow fruiting fig trees.",
            keyFacts: [
                { label: "Habitat", value: "Lowland and hill forest canopy" },
                { label: "Diet", value: "Mostly fruit (figs), some insects" },
                { label: "Size", value: "About 70–80 cm long" },
                { label: "Behavior", value: "Canopy forager; wide-ranging; noisy flight" }
            ],
            whereToSee: "Most realistic around mainland Sulawesi forests (Luwuk/Banggai region) or protected areas with tall trees; sightings depend heavily on intact canopy and fruiting seasons.",
            howToSpot: "Scan treetops at sunrise; listen for deep calls and heavy wingbeats. Watch fruiting figs—hornbills often dominate these feeding trees.",
            responsibleGuidelines: [
                "Stay on trails; minimize canopy disturbance.",
                "Keep distance from nesting cavities.",
                "No drones near forest canopy.",
                "Avoid playback calls.",
                "Support local conservation-friendly guides."
            ],
            conservationNotes: "Vulnerable; forest loss is the primary driver of decline.",
            quickSummary: "The noisy, colorful kings of the canopy, impossible to miss and a joy to watch."
        }
    },
    {
        nameEn: "Togian Water Monitor",
        nameId: "Biawak Togean",
        scientificName: "Varanus togianus",
        habitat: "Forest and mangroves",
        commonLocations: "Mangrove creeks, muddy shorelines",
        notesShort: "A monitor lizard endemic to the Togian Islands, often associated with forests and mangroves. Opportunistic and alert, it hunts invertebrates and also takes eggs. You may spot it basking, slipping into water, or moving along muddy mangrove edges.",
        slug: "togian-water-monitor",
        images: {
            hero: "/wildlife_real/land/togian-water-monitor/hero.webp",
            gallery: [
                "/wildlife_real/land/togian-water-monitor/gallery-1.webp",
                "/wildlife_real/land/togian-water-monitor/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "A monitor lizard endemic to the Togian Islands, often associated with forests and mangroves. Opportunistic and alert, it hunts invertebrates and also takes eggs. You may spot it basking, slipping into water, or moving along muddy mangrove edges.",
            keyFacts: [
                { label: "Habitat", value: "Forest and mangroves" },
                { label: "Diet", value: "Invertebrates, insects, arachnids, eggs" },
                { label: "Size", value: "Typically under ~1.5 m total length" },
                { label: "Behavior", value: "Diurnal; wary; basks then dives to escape" }
            ],
            whereToSee: "Mangrove creeks, muddy shorelines, and forest edges on larger Togian islands—especially quiet coves where mangroves meet the sea.",
            howToSpot: "Walk slowly near mangroves at low tide; watch sunlit logs and roots. Look for quick movement and a long tail sliding into water.",
            responsibleGuidelines: [
                "Keep distance; monitors can bite.",
                "Never try to handle or corner it.",
                "Don’t block escape routes to water.",
                "Avoid disturbing nesting/egg areas.",
                "No feeding; it changes behavior."
            ],
            conservationNotes: "Least Concern (IUCN); small range but no major documented threats.",
            quickSummary: "A modern-day dragon of the mangroves, equally at home on land and in the sea."
        }
    },
    {
        nameEn: "Coconut Crab",
        nameId: "Kepiting Kenari",
        scientificName: "Birgus latro",
        habitat: "Coastal forest; burrows near shore",
        commonLocations: "Small rocky islets",
        notesShort: "The world’s largest land arthropod, active mainly at night in coastal forest. Despite the name, it mostly eats fruits, nuts, seeds, and scavenged food. It can climb and drag items surprisingly far—an unforgettable “wild island” highlight.",
        slug: "coconut-crab",
        images: {
            hero: "/wildlife_real/land/coconut-crab/hero.webp",
            gallery: [
                "/wildlife_real/land/coconut-crab/gallery-1.webp",
                "/wildlife_real/land/coconut-crab/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The world’s largest land arthropod, active mainly at night in coastal forest. Despite the name, it mostly eats fruits, nuts, seeds, and scavenged food. It can climb and drag items surprisingly far—an unforgettable “wild island” highlight.",
            keyFacts: [
                { label: "Habitat", value: "Coastal forest; burrows near shore" },
                { label: "Diet", value: "Fruits, nuts, seeds, carrion" },
                { label: "Size", value: "Up to ~1 m leg span" },
                { label: "Behavior", value: "Nocturnal; burrowing; cautious; strong-clawed scavenger" }
            ],
            whereToSee: "Remote, lightly disturbed islands/coves with coastal forest—nighttime near fallen fruit trees or behind beaches. Sightings depend on local protection and low harvesting.",
            howToSpot: "Night walk with red light; scan ground near roots and burrow entrances. Listen for scraping and look for large claws and a heavy, deliberate gait.",
            responsibleGuidelines: [
                "Do not touch—claws can crush.",
                "No feeding or baiting.",
                "Keep lights low; avoid long spotlighting.",
                "Don’t block burrow entrances.",
                "Never collect; it’s easily overharvested."
            ],
            conservationNotes: "Vulnerable (IUCN); threatened by harvesting and habitat loss on islands.",
            quickSummary: "An alien-like giant of the limestone rocks, powerful and ancient."
        }
    },
    {
        nameEn: "Maleo",
        nameId: "Maleo Senkawor",
        scientificName: "Macrocephalon maleo",
        habitat: "Lowland/hill forest; nesting sandy sites",
        commonLocations: "Taima Sanctuary, Tompotika coast (Banggai)",
        notesShort: "A remarkable Sulawesi megapode that incubates huge eggs in warm sand or geothermal soils rather than sitting on a nest. It travels between forest feeding areas and communal nesting grounds, making it vulnerable to habitat loss and egg harvesting.",
        slug: "burung-maleo",
        images: {
            hero: "/wildlife_real/land/burung-maleo/hero.webp",
            gallery: [
                "/wildlife_real/land/burung-maleo/gallery-1.png",
                "/wildlife_real/land/burung-maleo/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "A remarkable Sulawesi megapode that incubates huge eggs in warm sand or geothermal soils rather than sitting on a nest. It travels between forest feeding areas and communal nesting grounds, making it vulnerable to habitat loss and egg harvesting.",
            keyFacts: [
                { label: "Habitat", value: "Lowland/hill forest; nesting sandy sites" },
                { label: "Diet", value: "Fruits, seeds, invertebrates (generalist)" },
                { label: "Size", value: "About 55–60 cm long" },
                { label: "Behavior", value: "Ground-dwelling; communal nesting; wary near beaches" }
            ],
            whereToSee: "On Sulawesi mainland (not the small Togian resort beaches): visits depend on access to known protected nesting grounds—best treated as a special, location-specific excursion.",
            howToSpot: "At authorized nesting sites, watch quietly from a distance for pairs arriving and digging. In forests, look for chicken-like tracks and brief ground movements near clearings.",
            responsibleGuidelines: [
                "Visit only official, permitted sites.",
                "Never approach active nests or digging birds.",
                "No flash or drones.",
                "Keep group sizes small and quiet.",
                "Do not buy/encourage egg trade."
            ],
            conservationNotes: "Critically Endangered (BirdLife/IUCN history); pressured by egg harvesting and habitat loss.",
            quickSummary: "The mascot of Banggai, a bird that entrusts its future to the volcanic heat of the earth."
        }
    },
    {
        nameEn: "Togian Boobook",
        nameId: "Togian Hawk-owl",
        scientificName: "Ninox burhani",
        habitat: "Lowland/hill forest; degraded forest; gardens",
        commonLocations: "Togian islands near forest edges",
        notesShort: "A small owl endemic to the Togian Islands. It calls after dusk and hunts insects and small prey from perches along forest edges. Recorded in lowland and hill forest, including degraded forest and mixed gardens—good news for responsible night-walk tourism.",
        slug: "togian-boobook",
        images: {
            hero: "/wildlife_real/land/togean-boobook/hero.webp",
            gallery: [
                "/wildlife_real/land/togean-boobook/gallery-1.webp",
                "/wildlife_real/land/togean-boobook/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "A small owl endemic to the Togian Islands. It calls after dusk and hunts insects and small prey from perches along forest edges. Recorded in lowland and hill forest, including degraded forest and mixed gardens—good news for responsible night-walk tourism.",
            keyFacts: [
                { label: "Habitat", value: "Lowland/hill forest; degraded forest; gardens" },
                { label: "Diet", value: "Insects and small vertebrates" },
                { label: "Size", value: "Small owl (roughly 25–30 cm)" },
                { label: "Behavior", value: "Nocturnal; perch-hunter; responds with distinct calls" }
            ],
            whereToSee: "Evening walks on Togian islands near forest edges, mixed gardens, and scrubby woodland surrounded by evergreen forest; best chances in quiet areas with minimal lighting.",
            howToSpot: "Stop often and listen for rhythmic owl calls. Scan mid-level branches with a dim red light for eye-shine and a compact silhouette perched still.",
            responsibleGuidelines: [
                "Red light only; no flash photography.",
                "No playback calls near roosts.",
                "Keep distance; don’t follow repeatedly.",
                "Stay on paths; avoid breaking branches.",
                "Limit viewing time per individual."
            ],
            conservationNotes: "Near Threatened (BirdLife); endemic with limited range, sensitive to forest loss.",
            quickSummary: "A mysterious and recently discovered owl, the secret watcher of the Togean night."
        }
    }
];
