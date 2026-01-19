/**
 * Kapal Safety & Experience Section
 * 
 * Introductory section describing the boat fleet and crew hospitality.
 * 
 * Section naming convention:
 * - Destination (SpotlightCarousel)
 * - Kapal Safety & Experience (this component)
 * - Local Community (LocalCommunity)
 */

import React from 'react';

const BoatsHospitalityIntro = () => {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6 text-center">
                {/* Title */}
                <h2 className="font-canto text-3xl md:text-5xl leading-tight tracking-tight text-neutral-900">
                    Comfortable Boats, Unbeatable Hospitality
                </h2>

                {/* Body Text */}
                <div className="mx-auto mt-8 md:mt-10 max-w-2xl md:max-w-3xl font-avenir text-sm md:text-base leading-relaxed text-neutral-700">
                    <p>
                        Our boats are crafted with love, warm, and designed for your ultimate comfort. With spacious lounging areas, a sunbathing deck, and room for up to 8 guests, you’ll have plenty of space to relax and enjoy the stunning views. Each boat is equipped with a toilet and thoughtfully designed features you won’t find anywhere else.
                    </p>
                    <p className="mt-6">
                        What truly sets us apart is our crew. Trained to serve with heart, they ensure every moment of your journey is seamless and memorable, from warm welcomes to attentive care throughout the trip.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BoatsHospitalityIntro;
