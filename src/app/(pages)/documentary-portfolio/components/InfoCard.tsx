"use client";
import { motion } from "framer-motion";
import type { GalleryImage } from "../imageList";

export type SectionId = "experience" | "comments" | "captions";

interface InfoCardProps {
  id: SectionId;
  data: GalleryImage;
}

export function InfoCard({ id, data }: InfoCardProps) {
  const renderContent = () => {
    switch (id) {
      case "experience":
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[var(--primary-blue)] font-bold">{data.year || "N/A"}</span>
              <span className="text-white/40">|</span>
              <span className="text-white font-medium">{data.organization || "Independent"}</span>
            </div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">{data.filename}</p>
          </div>
        );
      case "comments":
        return <p className="italic text-white/90">"{data.alt || "No description available."}"</p>;
      case "captions":
        return <p className="leading-relaxed text-white">{data.caption || "No caption provided."}</p>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 10 }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-3 w-full bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl pointer-events-auto"
    >
      {renderContent()}
    </motion.div>
  );
}
