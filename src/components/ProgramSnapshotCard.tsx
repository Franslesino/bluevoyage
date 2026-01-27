"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface StatItem {
    label: string;
    icon: string;
}

interface ProgramSnapshotCardProps {
    duration: string;
    bestFor: string;
    style: string;
    stats: StatItem[];
}

const ProgramSnapshotCard: React.FC<ProgramSnapshotCardProps> = ({
    duration,
    bestFor,
    style,
    stats,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md p-8 shadow-2xl w-[268px] min-h-[462px] border-t-4 border-[#088F8F]"
        >
            <h3 className="font-canto text-2xl text-[#1a1a1a] mb-6 border-b border-foreground/10 pb-3">
                Program Snapshot
            </h3>
            <div className="space-y-4 mb-6">
                <div>
                    <span className="font-avenir text-xs uppercase tracking-[0.15em] text-[#1a1a1a]/50 block mb-1">
                        Duration
                    </span>
                    <span className="font-avenir text-lg text-[#1a1a1a] font-medium">
                        {duration}
                    </span>
                </div>
                <div>
                    <span className="font-avenir text-xs uppercase tracking-[0.15em] text-[#1a1a1a]/50 block mb-1">
                        Best for
                    </span>
                    <span className="font-avenir text-sm text-[#1a1a1a] leading-relaxed">
                        {bestFor}
                    </span>
                </div>
                <div>
                    <span className="font-avenir text-xs uppercase tracking-[0.15em] text-[#1a1a1a]/50 block mb-1">
                        Style
                    </span>
                    <span className="font-avenir text-sm text-[#1a1a1a]">
                        {style}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-foreground/10">
                {stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                        <div className="w-8 h-8 mb-2 relative">
                            {/* Using Image component effectively "fixes" the placeholder circle if strictly followed, 
                                matching the Why Exists icon style requested. */}
                            <Image
                                src={stat.icon}
                                alt={stat.label}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-avenir text-[10px] uppercase tracking-wide text-[#1a1a1a]/70 leading-tight">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default ProgramSnapshotCard;
