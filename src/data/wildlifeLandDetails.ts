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
        habitat: "Island Forests",
        commonLocations: "Malenge Island Forests, Togean Islands",
        notesShort: "Endemic black macaque of Malenge. Groups of 5-10; sometimes seen in coconut plantations. Protected.",
        slug: "togian-monkey",
        images: {
            hero: "/wildlife_real/land/togian-monkey/hero.webp",
            gallery: [
                "/wildlife_real/land/togian-monkey/gallery-1.webp",
                "/wildlife_real/land/togian-monkey/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Togian Macaque is a spirited and intelligent primate endemic to the archipelago, most notably found on the island of Malenge. Distinguishable by their jet-black fur and expressive faces, these macaques are a living treasure of Togian's evolutionary isolation. Often heard before they are seen, their calls echo through the dense canopy of the island forests.",
            keyFacts: [
                { label: "Habitat", value: "Primary & Secondary Forests" },
                { label: "Diet", value: "Omnivorous (fruit, insects, crops)" },
                { label: "Social", value: "Troops of 5-10 individuals" },
                { label: "Activity", value: "Diurnal (Active during day)" }
            ],
            whereToSee: "The forests of Malenge Island offer the most consistent sightings. They are occasionally spotted on the fringes of coconut plantations where they forage for food.",
            howToSpot: "Listen for the rustling of leaves in the canopy or their distinctive vocalizations. Early morning treks near the forest edge often yield the best encounters.",
            responsibleGuidelines: [
                "Keep a safe distance of at least 7 meters.",
                "Never feed them; human food is harmful and alters behavior.",
                "Do not stare directly into their eyes (a sign of aggression).",
                "Secure your belongings; they are notoriously curious.",
                "Keep noise levels low to observe natural behavior."
            ],
            conservationNotes: "Protected in Indonesa. As an island endemic with a small population, they are vulnerable to habitat loss and conflict with agriculture.",
            quickSummary: "A charismatic and rare primate, the black macaque is the soul of Malenge's forests."
        }
    },
    {
        nameEn: "Togean Tarsier",
        nameId: "Tarsius Togean",
        scientificName: "Tarsius togeanus",
        habitat: "Forests (Nocturnal)",
        commonLocations: "Forests of Malenge Island (and surrounding small islands)",
        notesShort: "Tiny primate (~12cm). Nocturnal with huge eyes. Local guides can help spot them.",
        slug: "togean-tarsier",
        images: {
            hero: "/wildlife_real/land/togean-tarsier/hero.webp",
            gallery: [
                "/wildlife_real/land/togean-tarsier/gallery-1.webp",
                "/wildlife_real/land/togean-tarsier/gallery-2.png"
            ]
        },
        expandedContent: {
            intro: "The Togean Tarsier is a miniature marvel of the nocturnal world. With eyes larger than its brain and the agility of a master acrobat, this tiny primate fits in the palm of a hand. Emerging only under the cover of darkness, they are the ghosts of the Togean jungle, leaping between vertical saplings with silent precision.",
            keyFacts: [
                { label: "Habitat", value: "Dense forest & bamboo thickets" },
                { label: "Diet", value: "Insectivorous (crickets, moths)" },
                { label: "Size", value: "Approx. 12 cm (body length)" },
                { label: "Activity", value: "Strictly Nocturnal" }
            ],
            whereToSee: "They are known to inhabit the forests of Malenge and some smaller surrounding islets. Specific sleeping trees are often known to local guides.",
            howToSpot: "You need a guide. Without one, spotting them is nearly impossible. They are best seen at dusk as they wake up and emerge from their sleeping hollows or vine tangles.",
            responsibleGuidelines: [
                "Use red-light flashlights only; white light hurts their sensitive eyes.",
                "Maintain absolute silence near their roosting sites.",
                "Do not use flash photography.",
                "Do not shake trees or attempt to wake them during the day.",
                "Limit observation time to avoid stressing the family group."
            ],
            conservationNotes: "Protected. Their reliance on specific forest structures makes them sensitive to logging and habitat disturbance.",
            quickSummary: "The world's smallest primate, a wide-eyed nocturnal hunter of the Togean night."
        }
    },
    {
        nameEn: "Togian Babirusa",
        nameId: "Babirusa Togean",
        scientificName: "Babyrousa togeanensis",
        habitat: "Humid Forests",
        commonLocations: "Primary forests of Togean & Malenge Islands",
        notesShort: "Endemic. Males have curved tusks. Very rare sightings; threatened status (<1,000 left).",
        slug: "togian-babirusa",
        images: {
            hero: "/wildlife_real/land/togean-babirusa/hero.webp",
            gallery: [
                "/wildlife_real/land/togean-babirusa/gallery-1.webp",
                "/wildlife_real/land/togean-babirusa/gallery-2.jpg"
            ]
        },
        expandedContent: {
            intro: "The Babirusa, or 'Deer-Pig', is a prehistoric-looking creature unique to Sulawesi and its islands. The Togian subspecies is the largest and arguably most impressive, with males sporting distinctively curved upper tusks that grow through their snout. An encounter with this shy, forest-dwelling ungulate is the holy grail for wildlife enthusiasts in the region.",
            keyFacts: [
                { label: "Habitat", value: "Primary rainforests & wallows" },
                { label: "Diet", value: "Omnivorous (roots, fruits, invertebrates)" },
                { label: "Status", value: "Endangered (<1,000 individuals)" },
                { label: "Activity", value: "Diurnal but elusive" }
            ],
            whereToSee: "Deep primary forests on Togean and Malenge Islands offer the best potential habitat, particularly near muddy wallows or fruiting trees.",
            howToSpot: "Sightings are extremely rare and require patience, stealth, and luck. Look for tracks in the mud or listen for heavy movement in the undergrowth.",
            responsibleGuidelines: [
                "Move silently and keep downwind.",
                "Do not pursue them if they retreat.",
                "Stay hidden and use binoculars for observation.",
                "Do not disturb wallowing sites.",
                "Report sightings to local conservation efforts."
            ],
            conservationNotes: "Endangered. The population is small and fragmented, threatened by habitat loss and poaching. Every individual is precious effectively.",
            quickSummary: "A rare, tusked wonder of the deep jungle, shrouded in mystery."
        }
    },
    {
        nameEn: "Knobbed Hornbill",
        nameId: "Rangkong Sulawesi",
        scientificName: "Aceros cassidix",
        habitat: "Canopy Forests",
        commonLocations: "All Togean forests; also Luwuk highlands",
        notesShort: "Red casque (helmet) on males. Flies in pairs/groups. Easy to see morning/afternoon.",
        slug: "knobbed-hornbill",
        images: {
            hero: "/wildlife_real/land/knobbed-hornbill/hero.webp",
            gallery: [
                "/wildlife_real/land/knobbed-hornbill/gallery-1.webp",
                "/wildlife_real/land/knobbed-hornbill/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Knobbed Hornbill is the icon of the Sulawesi skies. Large, colorful, and vocal, they are famous for the vibrant red casque (helmet) atop the male's bill. Their distinctive wing-beat sound—a rhythmic 'whoosh-whoosh'—can be heard long before they fly directly overhead, patrolling the canopy for figs.",
            keyFacts: [
                { label: "Habitat", value: "Tall forest canopy" },
                { label: "Diet", value: "Frugivorous (figs are a staple)" },
                { label: "Social", value: "Pairs or small flocks" },
                { label: "Activity", value: "Diurnal (Morning/Afternoon)" }
            ],
            whereToSee: "They are widespread across the forested islands of Togean and the highlands of Luwuk. Look for tall, fruiting fig trees which act as magnets for these birds.",
            howToSpot: "Scan the exposed upper branches of tall trees in the early morning. Listen for their loud, barking calls and the heavy sound of their wings in flight.",
            responsibleGuidelines: [
                "Do not disturb nesting sites (sealed tree hollows).",
                "Use binoculars to observe from a distance.",
                "Do not make loud noises that could startle them into flight.",
                "Avoid mimicking their calls repeatedly.",
                "Support forest protection initiatives."
            ],
            conservationNotes: "Vulnerable. As large-bodied frugivores, they require large tracts of healthy forest and are indicators of ecosystem health.",
            quickSummary: "The noisy, colorful kings of the canopy, impossible to miss and a joy to watch."
        }
    },
    {
        nameEn: "Togian Water Monitor",
        nameId: "Biawak Togean",
        scientificName: "Varanus togianus",
        habitat: "Coastal & Mangrove",
        commonLocations: "Mangrove edges & village outskirts in Togean",
        notesShort: "Endemic, ~1m long. Excellent swimmer. Sometimes seen near settlements.",
        slug: "togian-water-monitor",
        images: {
            hero: "/wildlife_real/land/togian-water-monitor/hero.webp",
            gallery: [
                "/wildlife_real/land/togian-water-monitor/gallery-1.webp",
                "/wildlife_real/land/togian-water-monitor/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Togian Water Monitor is a sleek, adaptable reptile perfectly commanded of the archipelago's interface between land and sea. Growing up to a meter or more, these lizards are often seen basking on mangrove roots or swimming effortlessly through the channels with a serpentine grace.",
            keyFacts: [
                { label: "Habitat", value: "Mangroves, coasts, secondary forest" },
                { label: "Diet", value: "Carnivorous/Scavenger" },
                { label: "Size", value: "Up to 1.5 meters" },
                { label: "Behavior", value: "Semi-aquatic, good climber" }
            ],
            whereToSee: "They frequent the edges of mangrove forests and quiet rocky shores. It is not uncommon to see them near village outskirts scavenging for scraps.",
            howToSpot: "Look for a long, dark shape moving along the shoreline or sunning itself on fallen logs. Sudden splashes near the mangroves often indicate a monitor diving for cover.",
            responsibleGuidelines: [
                "Do not corner them; they can bite or whip with their tail if threatened.",
                "Keep a respectful distance.",
                "Do not feed them human food.",
                "Observe them quietly as they forage.",
                "Let them have the right of way on paths."
            ],
            conservationNotes: "Endemic subspecies. While adaptable, they are often misunderstood and persecuted near settlements.",
            quickSummary: "A modern-day dragon of the mangroves, equally at home on land and in the sea."
        }
    },
    {
        nameEn: "Coconut Crab",
        nameId: "Kepiting Kenari",
        scientificName: "Birgus latro",
        habitat: "Rocky Coasts",
        commonLocations: "Small rocky islets (e.g., Pulau Papan, Pulau Kayuadi)",
        notesShort: "Largest land crab, nocturnal, climbs coconut trees. Very rare; strictly protected.",
        slug: "coconut-crab",
        images: {
            hero: "/wildlife_real/land/coconut-crab/hero.webp",
            gallery: [
                "/wildlife_real/land/coconut-crab/gallery-1.webp",
                "/wildlife_real/land/coconut-crab/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Coconut Crab is a true giant among arthropods—the largest land-living arthropod in the world. With claws powerful enough to crack open coconuts and a lifespan that can reach 60 years, they are legendary creatures of the night. Their presence is a sign of a pristine, undisturbed coastline.",
            keyFacts: [
                { label: "Habitat", value: "Coastal rock/scrub forest" },
                { label: "Diet", value: "Coconuts, fruits, carrion" },
                { label: "Size", value: "Leg span up to 1 meter" },
                { label: "Activity", value: "Strictly Nocturnal" }
            ],
            whereToSee: "They are rare and have been extirpated from many populated areas. Small, rocky, uninhabited islets like those around Pulau Papan offer the best chance of a sighting.",
            howToSpot: "They emerge at night. Look for them around the bases of coconut trees or amongst limestone crevices using a flashlight.",
            responsibleGuidelines: [
                "Strictly protected: Do not capture, eat, or buy them.",
                "Do not handle them; their claws are incredibly powerful.",
                "Avoid using bright lights directly on them for long periods.",
                "Watch your step on rocky islets at night.",
                "Report any illegal trade to authorities."
            ],
            conservationNotes: "Vulnerable to Extinction. Their slow growth and lack of fear make them heavily targeted for food, requiring strict protection.",
            quickSummary: "An alien-like giant of the limestone rocks, powerful and ancient."
        }
    },
    {
        nameEn: "Maleo",
        nameId: "Maleo Senkawor",
        scientificName: "Macrocephalon maleo",
        habitat: "Coastal/Forest (Nesting)",
        commonLocations: "Taima Sanctuary, Tompotika coast (Banggai)",
        notesShort: "Sulawesi endemic, lays eggs in hot sand. Luwuk Banggai mascot. Best seen in mornings with conservation guides.",
        slug: "burung-maleo",
        images: {
            hero: "/wildlife_real/land/burung-maleo/hero.webp",
            gallery: [
                "/wildlife_real/land/burung-maleo/gallery-1.webp",
                "/wildlife_real/land/burung-maleo/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "The Maleo is a unique megapode bird found only in Sulawesi. Instead of incubating their eggs with body heat, they bury them in geothermal sands or sun-warmed beaches, leaving the earth to do the work. The chicks emerge fully feathered and ready to fly, a miracle of avian evolution.",
            keyFacts: [
                { label: "Habitat", value: "Lowland forest & sandy nesting grounds" },
                { label: "Diet", value: "Omnivorous (seeds, fruit, ants)" },
                { label: "Behavior", value: "Communal nesting, monogamous pairs" },
                { label: "Status", value: "Endangered" }
            ],
            whereToSee: "The Taima Sanctuary on the Tompotika coast (accessible from Luwuk) is one of the best places in the world to observe them during the nesting season.",
            howToSpot: "The nesting grounds are active in the early morning. You will see pairs digging deep pits in the sand. A guide is absolutely essential to visit these sensitive areas.",
            responsibleGuidelines: [
                "Visit only with official conservation guides.",
                "Stay behind designated hides or observation points.",
                "Do not approach the nesting pits.",
                "Keep noise to a minimum.",
                "Support the local community guardians who protect the eggs."
            ],
            conservationNotes: "Endangered. Egg poaching and habitat loss are major threats. Community-based protection programs nearby are critical to their survival.",
            quickSummary: "The mascot of Banggai, a bird that entrusts its future to the volcanic heat of the earth."
        }
    },
    {
        nameEn: "Togian Boobook",
        nameId: "Togian Hawk-owl",
        scientificName: "Ninox burhani",
        habitat: "Lowland Forest",
        commonLocations: "Forests of Togean & Talatakoh Islands",
        notesShort: "Endemic to Togean, described in 1999. Nocturnal, yellow eyes. Hard to find without experts.",
        slug: "togian-boobook",
        images: {
            hero: "/wildlife_real/land/togian-boobook/hero.webp",
            gallery: [
                "/wildlife_real/land/togian-boobook/gallery-1.webp",
                "/wildlife_real/land/togian-boobook/gallery-2.webp"
            ]
        },
        expandedContent: {
            intro: "Defined by science only recently in 1999, the Togian Boobook is a testament to how much of Sulawesi's biodiversity remains to be discovered. This small, brown hawk-owl with piercing yellow eyes is endemic solely to the Togean Islands. Its distinct call is the soundtrack of the deep island night.",
            keyFacts: [
                { label: "Habitat", value: "Disturbed & Primary Lowland Forest" },
                { label: "Diet", value: "Insectivorous/Carnivorous" },
                { label: "Size", value: "Small (approx. 25 cm)" },
                { label: "Activity", value: "Nocturnal" }
            ],
            whereToSee: "They are found in the forests of Togean, Malenge, and Talatakoh. They seem to tolerate some habitat disturbance and can be found in garden mosaics near forests.",
            howToSpot: "Tracking their call—a series of specfic hoots—is the only reliable method. Spotlighting them requires patience and a sharp eye for movement in the mid-canopy.",
            responsibleGuidelines: [
                "Use minimal lighting when observing.",
                "Do not play playback of their calls (it stresses territorial birds).",
                "Keep movements slow and quiet.",
                "Respect the forest at night.",
                "Share sightings with birding communities to help map their range."
            ],
            conservationNotes: "Near Threatened. Restricted range makes them vulnerable, though they appear somewhat adaptable to habitat shifting.",
            quickSummary: "A mysterious and recently discovered owl, the secret watcher of the Togean night."
        }
    }
];
