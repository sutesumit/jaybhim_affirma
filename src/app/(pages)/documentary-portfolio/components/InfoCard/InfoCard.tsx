"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "../../imageList";
import { ExperienceSection } from "../ExperienceSection";
import { CommentsSection } from "../CommentsSection";
import { CaptionsSection } from "../CaptionsSection";
import { Gradient1 } from "@/components/features/shared";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export type SectionId = "experience" | "comments" | "captions";

interface InfoCardProps {
  id: SectionId;
  data: GalleryImage;
  onOpenModal?: (image: GalleryImage) => void;
}

export function InfoCard({ id, data, onOpenModal }: InfoCardProps) {
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

          {/* Buy Photo button */}
          {onOpenModal && (
            <div className="mt-4 pt-3 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenModal(data)}
                className="w-full comment-tiny-button"
                aria-label="Buy photo"
                title="Buy prints — coming soon"
                disabled={false} // Could disable while modal open, but not required
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Buy Photo
              </Button>
            </div>
          )}
        </div>
      </Gradient1>
    </motion.div>
  );
}
