export interface WildlifeSpecies {
    id: number;
    name: string;
    localName: string;
    image: string;
    habitat: "sea" | "land";
    slug: string;
}

export const wildlifeSpecies: WildlifeSpecies[] = [
    // SEA WILDLIFE
    {
        id: 1,
        name: "Manta Ray",
        localName: "Pari Manta",
        image: "/wildlife/species/01-manta-ray.webp",
        habitat: "sea",
        slug: "manta-ray",
    },
    {
        id: 2,
        name: "Green Sea Turtle",
        localName: "Penyu Hijau",
        image: "/wildlife/species/02-green-sea-turtle.webp",
        habitat: "sea",
        slug: "green-sea-turtle",
    },
    {
        id: 3,
        name: "Dugong",
        localName: "Duyung",
        image: "/wildlife/species/03-dugong.webp",
        habitat: "sea",
        slug: "dugong",
    },
    {
        id: 4,
        name: "Eagle Ray",
        localName: "Pari Elang",
        image: "/wildlife/species/04-eagle-ray.webp",
        habitat: "sea",
        slug: "eagle-ray",
    },
    {
        id: 5,
        name: "Clownfish",
        localName: "Ikan Badut",
        image: "/wildlife/species/05-clownfish.webp",
        habitat: "sea",
        slug: "clownfish",
    },
    {
        id: 6,
        name: "Giant Trevally",
        localName: "Ikan Bobara",
        image: "/wildlife/species/06-giant-trevally.webp",
        habitat: "sea",
        slug: "giant-trevally",
    },

    // LAND WILDLIFE
    {
        id: 7,
        name: "Komodo Dragon",
        localName: "Komodo",
        image: "/wildlife/species/07-komodo-dragon.webp",
        habitat: "land",
        slug: "komodo-dragon",
    },
    {
        id: 8,
        name: "Timor Deer",
        localName: "Rusa Timor",
        image: "/wildlife/species/08-timor-deer.webp",
        habitat: "land",
        slug: "timor-deer",
    },
    {
        id: 9,
        name: "Orange-footed Scrubfowl",
        localName: "Burung Gosong",
        image: "/wildlife/species/09-orange-footed-scrubfowl.webp",
        habitat: "land",
        slug: "orange-footed-scrubfowl",
    },
    {
        id: 10,
        name: "Water Buffalo",
        localName: "Kerbau Air",
        image: "/wildlife/species/10-water-buffalo.webp",
        habitat: "land",
        slug: "water-buffalo",
    },
    {
        id: 11,
        name: "Wild Boar",
        localName: "Babi Hutan",
        image: "/wildlife/species/11-wild-boar.webp",
        habitat: "land",
        slug: "wild-boar",
    },
    {
        id: 12,
        name: "Sunda Flying Fox",
        localName: "Kalong",
        image: "/wildlife/species/12-sunda-flying-fox.webp",
        habitat: "land",
        slug: "sunda-flying-fox",
    },
];
