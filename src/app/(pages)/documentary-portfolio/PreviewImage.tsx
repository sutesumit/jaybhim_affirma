"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
    src: string;
    alt: string;
}

export default function GalleryImage({ src, alt }: Props) {
    return (
        <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Image src={src} alt={alt} fill className="object-cover" priority />
        </motion.div>
    );
}
