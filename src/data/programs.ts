export interface Program {
    name: string;
    slug: string;
    image: string;
    dateLabel: string;
    description: string;
    overview: string;
    whatYoullDo: string;
    bestTime: string;
    notes: string;
}

export const programs: Program[] = [
    {
        name: "Snorkeling & Diving",
        slug: "snorkeling-diving",
        image: "/programs_real/activity-snorkeling.png",
        dateLabel: "Komodo Voyage",
        description: "Experience world-class marine life at Batu Bolong, Manta Point, and vibrant coral gardens teeming with fish.",
        overview: "Drift through nutrient-rich currents, swim alongside massive manta rays, and marvel at the kaleidoscope of coral reefs that make Komodo a diver's dream.",
        whatYoullDo: "Snorkel with mantas, dive iconic sites like Castle Rock, and explore the underwater wonders of the Coral Triangle.",
        bestTime: "April to December for the best visibility; mantas are year-round but gather in larger numbers during plankton seasons.",
        notes: "Suitable for most fitness levels. Bring rashguard and reef-safe sunscreen. Gear can be arranged; currents can be strong at some sites."
    },
    {
        name: "Dragon Trekking",
        slug: "dragon-trekking",
        image: "/wildlife_real/land/komodo-dragon/hero.webp",
        dateLabel: "Komodo Voyage",
        description: "Walk with legends. Guided treks on Rinca and Komodo Islands to see the world's largest lizard in its natural habitat.",
        overview: "A ranger-led adventure through savannah and monsoon forests to safely observe Komodo dragons and other island wildlife.",
        whatYoullDo: "Trek scenic trails, spot dragons, water buffalo, and deer, and learn about the park's unique ecology from expert rangers.",
        bestTime: "Early morning or late afternoon when dragons are most active.",
        notes: "Stay with your ranger at all times. Bring water, hat, and sturdy shoes."
    },
    {
        name: "Hiking & Viewpoints",
        slug: "hiking-viewpoints",
        image: "/programs_real/activity-hiking.png",
        dateLabel: "Komodo Voyage",
        description: "Scale the heights of Padar and Gili Laba for iconic panoramic views of crescent bays and turquoise waters.",
        overview: "Sunrise treks that reward you with breathtaking vistas of the archipelago's rugged landscape and contrasting beaches.",
        whatYoullDo: "Hike up stone steps to Padar's summit, capture the famous three-bay photo, and enjoy golden hour from high above.",
        bestTime: "Sunrise is magical for Padar; cooler temperatures and stunning light.",
        notes: "Moderate fitness required for Padar. Bring water and sunscreen."
    },
    {
        name: "Pink Beach Relaxation",
        slug: "pink-beach-relaxation",
        image: "/destinations/destination_pink_beach.webp",
        dateLabel: "Komodo Voyage",
        description: "Unwind on rare rose-hued sands created by crushed red coral, contrasting vividly with fantastic blue water.",
        overview: "A surreal beach experience where you can swim, sunbathe, and snap incredible photos of the unique pink shoreline.",
        whatYoullDo: "Picnic on the beach, snorkel the near-shore reef, and marvel at the pink sand grains under your feet.",
        bestTime: "Mid-day for the brightest colors, or sunset for a soft glow.",
        notes: "Please do not take sand home. Leave nature as you found it."
    },
    {
        name: "Island Hopping",
        slug: "island-hopping",
        image: "/programs_real/activity-beach.png",
        dateLabel: "Komodo Voyage",
        description: "Sail between craggy islands, discovering hidden lagoons, sandbars like Taka Makassar, and secluded coves.",
        overview: "The joy of the journey itself—feeling the sea breeze, watching flying fish, and anchoring in pristine turquoise bays.",
        whatYoullDo: "Visit Taka Makassar sandbar, explore Kalong Island at dusk, and cruise past dramatic coastal cliffs.",
        bestTime: "All day; the changing light transforms the seascape constantly.",
        notes: "Sun protection is essential on the open deck."
    },
    {
        name: "Sunset with Bats",
        slug: "sunset-bats",
        image: "/destinations/destination_rinca.webp", // Fallback to Rinca or Kalong if available
        dateLabel: "Komodo Voyage",
        description: "Witness thousands of Flying Foxes migrate at dusk from the mangroves of Kalong Island—a natural spectacle.",
        overview: "Anchor near the mangroves as the sky turns purple and watch endless streams of fruit bats fill the air.",
        whatYoullDo: "Relax on the boat deck with a sundowner drink and watch the mesmerizing migration.",
        bestTime: "Sunset (around 6 PM).",
        notes: "Quiet observation creates the best atmosphere."
    },
    {
        name: "Stargazing",
        slug: "stargazing",
        image: "/programs_real/activity-stargazing.png",
        dateLabel: "Komodo Voyage",
        description: "Drift into sleep under a canopy of stars. Far from city lights, the Milky Way shines bright over the Flores Sea.",
        overview: "Peaceful nights on the boat or at your remote resort, looking up at the southern sky.",
        whatYoullDo: "Identify constellations, spot shooting stars, and enjoy the absolute silence of the ocean.",
        bestTime: "New moon nights for the darkest skies.",
        notes: "Bring a light jacket for the cool sea breeze."
    }
];
