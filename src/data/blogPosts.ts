export interface BlogPost {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string; // Used for both hero and card for now
    date: string;
    locationLabel: string;
    category: string;
    tags?: string[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: "responsible-wildlife-encounters",
        image: "/blog-11.webp",
        locationLabel: "Togean",
        date: "Jan 03, 2026",
        category: "Journal",
        title: "Responsible wildlife encounters and reef etiquette in Togean",
        excerpt: "Discover the vibrant marine life of the Togean Islands. From colorful coral gardens to playful reef fish, learn how to observe these wonders respectfully without disturbing their natural habitat. Our guide ensures a sustainable adventure for everyone.",
        content: `The Togean Islands are a sanctuary of biodiversity, both above and below the water. As visitors to this pristine archipelago, we have a responsibility to tread lightly and ensure that our presence does not harm the delicate ecosystems we have come to admire.

### Reef Etiquette 101
The coral reefs of the Togeans are teeming with life, but they are also fragile. When snorkeling or diving, maintaining good buoyancy is crucial. Avoid touching the coral with your fins or hands, as even a light touch can remove the protective mucous layer or break delicate structures that have taken decades to grow.

### Encounters with Marine Life
Seeing a sea turtle glide past or a school of barracuda formation swimming is a highlight of any trip. However, we must remember that we are guests in their home. specific guidelines include:

- Do not chase: Let marine life come to you. Chasing causes stress and can disrupt feeding or mating behaviors.
- No feeding: Feeding fish alters their natural diet and behavior, making them dependent on humans and aggressive.
- Flash photography: Use minimal flash, as bright lights can distress sensitive marine eyes.

By following these simple guidelines, we ensure that the Togean Islands remain a thriving wild habitat for generations to come. Responsible tourism is not just a choice; it is the only way forward.`,
        tags: ["Wildlife", "Sustainability", "Marine Life"]
    },
    {
        slug: "best-snorkeling-spots",
        image: "/blog-22.webp",
        locationLabel: "Togean",
        date: "Feb 15, 2026",
        category: "Journal",
        title: "Best snorkeling spots and what you might see",
        excerpt: "Plunge into the crystal-clear waters of the Togeans. We reveal the top snorkeling locations where you can spot giant clams, sea turtles, and an endless variety of tropical fish. Prepare for an underwater journey like no other.",
        content: `The Togean Islands are located in the heart of the Coral Triangle, the global epicenter of marine biodiversity. For snorkelers, this means warm, calm waters filled with an explosion of color and life. Here are three spots you absolutely cannot miss.

### California Reef
Named for its vibrant, sun-drenched corals that reminded early visitors of the California coast, this reef is accessible and stunning. It offers a classic wall dive experience for snorkelers, where the reef drops off into the deep blue, allowing you to float above massive gorgonian fans and schools of fusiliers.

### Reef One
A hidden gem located near Malenge. This spot is famous for its incredible visibility and the high chance of spotting resident sea turtles grazing on the seagrass in the shallows. The coral gardens here are exceptionally healthy, with vast patches of staghorn coral providing shelter for thousands of chromis and anthias.

### The Jellyfish Lake
While technically not a snorkeling reef, the stingless jellyfish lake is a surreal experience. Floating among millions of pulsing, golden jellyfish in a silent, landlocked marine lake is a memory that will stay with you forever. Ensure you are free of sunscreen to protect the lake's unique chemistry.`,
        tags: ["Snorkeling", "Travel Guide", "Ocean"]
    },
    {
        slug: "village-visit-etiquette",
        image: "/blog-33.webp",
        locationLabel: "Togean",
        date: "Mar 10, 2026",
        category: "Journal",
        title: "Village visit etiquette and how to support local communities",
        excerpt: "Experience the warmth of the Bajau people. This guide outlines the cultural dos and don'ts when visiting local villages, ensuring your interactions are respectful and support the livelihood of these unique island communities.",
        content: `Visiting the local villages of the Togean Islands, particularly the settlements of the Bajau (Sea Gypsies), is a profound cultural experience. These communities have lived in harmony with the sea for centuries. To ensure your visit is positive for everyone, here are some cultural nuances to respect.

### Dress Modestly
While swimwear is fine on the beach or boat, it is respectful to cover up when entering a village. For women, a sarong or loose t-shirt is appreciated. For men, a t-shirt is better than going bare-chested.

### Ask Permission
The Bajau people are incredibly welcoming, but their homes are private spaces. Always ask for permission before taking close-up photos of individuals, especially elders and children. A smile and a gesture to your camera are usually understood, but respect a "no" if given.

### Supporting the Economy
The best way to say thank you is to support the local economy directly. Purchase handmade crafts, dried fish, or snacks from village stalls. Avoid giving money or candy directly to children, as this can encourage begging. Instead, consider donating school supplies to the village head or teacher if you wish to contribute.

By visiting with an open heart and a respectful mind, you bridge the gap between cultures and create meaningful connections that go beyond the typical tourist experience.`,
        tags: ["Culture", "Community", "Travel Tips"]
    }
];
