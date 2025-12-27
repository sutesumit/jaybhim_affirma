"use client";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Play, Pause, ChevronLast, ChevronFirst, 
  Aperture, Captions, MessagesSquare 
} from "lucide-react";
import { useState } from "react";
import type { GalleryImage } from "./imageList";
import { IconButton } from "./components/IconButton";
import { InfoCard, type SectionId } from "./components/InfoCard";

interface Props {
  isPlaying: boolean;
  onTogglePlay: () => void;
  goPrev: () => void;
  goNext: () => void;
  currentImage: GalleryImage;
}

const SECTIONS = [
  { id: "experience", Icon: Aperture, label: "Experience" },
  { id: "comments", Icon: MessagesSquare, label: "Comments" },
  { id: "captions", Icon: Captions, label: "Captions" },
] as const;

export default function GalleryControls({ 
  isPlaying, 
  onTogglePlay, 
  goPrev, 
  goNext, 
  currentImage 
}: Props) {
  const [activeTab, setActiveTab] = useState<SectionId | null>(null);

  const toggleSection = (id: SectionId) => {
    setActiveTab(current => current === id ? null : id);
  };

  return (
    <div className="absolute inset-0 w-full h-full z-20 isolate pointer-events-none">
      {/* Top Bar: Navigation & Tools */}
      <div className="pt-14 px-4 w-full flex flex-col-reverse md:flex-row justify-center items-center md:justify-between md:items-start gap-2">
        
        {/* Left: Info Toggles */}
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {SECTIONS.map(({ id, Icon, label }) => (
            <IconButton
              key={id}
              Icon={Icon}
              onClick={() => toggleSection(id as SectionId)}
              isActive={activeTab === id}
              aria-label={`Toggle ${label}`}
            />
          ))}
        </motion.div>

        {/* Right: Playback Controls */}
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <IconButton Icon={ChevronFirst} onClick={goPrev} aria-label="Previous image" />
          <IconButton 
            Icon={isPlaying ? Pause : Play} 
            onClick={onTogglePlay} 
            fill={!isPlaying}
            aria-label={isPlaying ? "Pause" : "Play"}
          />
          <IconButton Icon={ChevronLast} onClick={goNext} aria-label="Next image" />
        </motion.div>
      </div>

      <div className="relative top-2 md:left-4 w-full flex justify-center items-center md:justify-start">
        <AnimatePresence>
          {activeTab && (
            <InfoCard id={activeTab} data={currentImage} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
