"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
    src: string;
    alt: string;
    custom?: number;
}

const variants = {
    enter: (direction: number) => ({
        opacity: 0,
        zIndex: 1
    }),
    center: {
        zIndex: 1,
        rotate: 0,
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        opacity: 0,
    })
}

export default function GalleryImage({ src, alt, custom }: Props) {
    return (
        <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden"
            custom={custom}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
                x: {
                    type: "spring",
                    stiffness: 180,
                    damping: 25
                },
                rotate: {
                    duration: 0.1,
                    ease: "easeInOut"
                },
                scale: {
                    duration: 0.1,
                    ease: "easeInOut"
                },
                opacity: {
                    duration: 1,
                    ease: "easeIn"
                }
             }}
        >
            <Image src={src} alt={alt} fill className="object-cover" priority />
        </motion.div>
    );
}
