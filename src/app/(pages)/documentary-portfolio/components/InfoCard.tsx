"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "../imageList";
import { ExperienceSection } from "./sections/ExperienceSection";
import { CommentsSectionWrapper as CommentsSection } from "./sections/CommentsSection";
import { CaptionsSection } from "./sections/CaptionsSection";
import Gradient1 from "@/app/my_components/gradients/Gradient1";

export type SectionId = "experience" | "comments" | "captions";

interface InfoCardProps {
  id: SectionId;
  data: GalleryImage;
}

export function InfoCard({ id, data }: InfoCardProps) {
  const renderContent = () => {
    switch (id) {
      case "experience":
        return <ExperienceSection data={data} />;
      case "comments":
        return <CommentsSection />;
      case "captions":
        return <CaptionsSection data={data} />;
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
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        layout: { duration: 0.3 }
      }}
      className="w-[80vw] max-w-[400px] card-shadow glass-hover rounded-sm font-rajdhani overflow-hidden pointer-events-auto"
    >
      <Gradient1 hoverOn={true} className="p-0">
        <div className="p-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Gradient1>
    </motion.div>
  );
}
