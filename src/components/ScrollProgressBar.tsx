"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#088F8F] origin-left z-50 transform-gpu"
            style={{ scaleX }}
        />
    );
}
