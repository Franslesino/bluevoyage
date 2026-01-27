export interface Destination {
    name: string;
    slug: string;
    image: string;
    description: string;
}

export const destinations: Destination[] = [
    {
        name: "Padar Island",
        slug: "padar-island",
        image: "/destinations/destination_padar.webp",
        description: "The iconic three-bay viewpoint of Komodo National Park, offering breathtaking panoramic views of turquoise waters and dramatic savannah hills.",
    },
    {
        name: "Komodo Island",
        slug: "komodo-island",
        image: "/destinations/dest-komodo.png",
        description: "Home of the legendary Komodo dragon. Trek through ancient forests and encounter the world's largest lizard in its natural habitat.",
    },
    {
        name: "Pink Beach",
        slug: "pink-beach",
        image: "/destinations/destination_pink_beach.webp",
        description: "One of only seven pink beaches in the world, where crushed red coral creates stunning rose-tinted sands against crystal-clear waters.",
    },
    {
        name: "Manta Point",
        slug: "manta-point",
        image: "/destinations/destination_manta_point.webp",
        description: "A world-class dive site where giant manta rays glide gracefully through nutrient-rich currents in mesmerizing underwater ballets.",
    },
    {
        name: "Rinca Island",
        slug: "rinca-island",
        image: "/destinations/destination_rinca.webp",
        description: "A wilder alternative to Komodo Island with excellent dragon sightings, dramatic coastal landscapes, and pristine diving spots.",
    },
    {
        name: "Labuan Bajo",
        slug: "labuan-bajo",
        image: "/destinations/dest-labuan-bajo.png",
        description: "The gateway to Komodo National Park, a charming fishing town with stunning sunset views, vibrant markets, and world-class restaurants.",
    },
];
