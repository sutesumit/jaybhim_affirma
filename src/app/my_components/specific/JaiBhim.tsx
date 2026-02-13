"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ChakraCursor from "../shared/cursorPointers/ChakraCursor";

const DURATION = 0.2;
const STAGGER = 0.05;

export default function JaiBhim() {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div className="relative">
            <div 
                className={`relative group`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="relative flex items-center justify-center "
                    initial="initial"
                    whileHover="hovered"
                >
                    {isHovered && <ChakraCursor />}
                    {/* Bottom Ashok Chakra - slides in */}
                    <motion.div
                        className="absolute m-auto inset-0 flex items-center justify-center -z-10 pointer-events-none"
                        variants={{
                            initial: { opacity: 0, scale: 0.5 },
                            hovered: { opacity: 1, scale: 1 }
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <Image
                            src="/ashoka-chakra.svg"
                            alt="Ashok Chakra"
                            width={80}
                            height={80}
                            className="animate-spin [animation-duration:10s]"
                        />
                    </motion.div>
                    <div
                        className="overflow-hidden relative px-6 font-rajdhani button-style !cursor-none text-[1rem] flex items-center justify-center whitespace-nowrap uppercase"
                        style={{ lineHeight: 1.1 }}
                    >
                        {/* Top Text layer - slides out */}
                        <motion.div
                            className="flex items-center justify-center z-0"
                            variants={{
                                initial: { y: 0 },
                                hovered: { y: "-100%" },
                            }}
                        >
                            {"HELLO".split("").map((letter, index) => (
                                <motion.span
                                    key={index}
                                    className="inline-block"
                                    variants={{
                                        initial: { y: 0 },
                                        hovered: { y: "-100%" },
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index,
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Bottom layer - slides in */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-10"
                            variants={{
                                initial: { y: "100%" },
                                hovered: { y: 0 },
                            }}
                        >
                            {["ज", "य", " ", "भी", "म"].map((letter, index) => (
                                <motion.span
                                    key={index}
                                    className="inline-block"
                                    variants={{
                                        initial: { y: "100%" },
                                        hovered: { y: 0 },
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index,
                                    }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

