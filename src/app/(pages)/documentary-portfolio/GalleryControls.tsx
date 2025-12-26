"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, ChevronLast, ChevronFirst, Aperture, Captions, MessagesSquare } from "lucide-react";
import { useState } from "react";

interface Props {
  isPlaying: boolean;
  onTogglePlay: () => void;
  goPrev: () => void;
  goNext: () => void;
}

export default function GalleryControls({ isPlaying, onTogglePlay, goPrev, goNext }: Props) {
  const [active, setActive] = useState({
    experience: false,
    comments: false,
    captions: false,
  })
  return (
    <div className="relative inset-0 w-full h-full z-20 isolate">
    <div className="pt-14 px-3 w-full z-20 flex justify-between items-start pointer-events-none">
      <div className="info-icons pointer-events-auto flex flex-1 gap-2">
        <button 
          onClick={() => { setActive((prev) => ({ ...prev, experience: !prev.experience })) }}
          className={`p-2 rounded-full backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 group ${active.experience ? "ring-2 ring-[var(--primary-blue)] bg-[var(--primary-blue)] text-white" : "bg-white/10"}`}
        >
          <Aperture 
            className={`w-4 h-4 text-white/80 group-hover:text-white`} 
          />
        </button>
        <button 
          onClick={() => { setActive((prev) => ({ ...prev, comments: !prev.comments })) }}
          className={`p-2 rounded-full backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 group ${active.comments ? "ring-2 ring-[var(--primary-blue)] bg-[var(--primary-blue)] text-white" : "bg-white/10"}`}
        >
          <MessagesSquare
            className={`w-4 h-4 text-white/80 group-hover:text-white`} 
          />
        </button>
        <button 
          onClick={() => { setActive((prev) => ({ ...prev, captions: !prev.captions })) }}
          className={`p-2 rounded-full backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 group ${active.captions ? "ring-2 ring-[var(--primary-blue)] bg-[var(--primary-blue)] text-white" : "bg-white/10"}`}
        >
          <Captions 
            className={`w-4 h-4 text-white/80 group-hover:text-white`} 
          />
        </button>
      </div>
      <div className="control-icons justify-end pointer-events-auto flex flex-1 gap-2">
        <button 
           onClick={goPrev}
           className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 group"
        >
          <ChevronFirst className="w-4 h-4 text-white/80 group-hover:text-white" />
        </button>
        <button 
           onClick={onTogglePlay}
           className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 group"
           aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
           {isPlaying ? (
             <Pause className="w-4 h-4 text-white/80 group-hover:text-white" /> 
            ) : ( 
             <Play className="w-4 h-4 text-white/80 group-hover:text-white fill-current" /> 
            )}
        </button>
        <button 
           onClick={goNext}
           className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 group"
        >
          <ChevronLast className="w-4 h-4 text-white/80 group-hover:text-white" />
        </button>
      </div>
    
    </div>
    <div className="info-cards text-sm h-auto max-w-[400px] mx-3 my-1 p-1 justify-center flex flex-col items-center gap-1">
      <AnimatePresence>
      {active.experience && (
        <motion.div 
          key="experience"
          className="p-2 w-full card-bg rounded card-border"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <p>Experience</p>
        </motion.div>
      )}
      {active.comments && (
        <motion.div 
          key="comments"
          className="p-2 w-full card-bg rounded card-border"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <p>Comments</p>
        </motion.div>
      )}
      {active.captions && (
        <motion.div 
          key="captions"
          className="p-2 w-full card-bg rounded card-border"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <p>Captions</p>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
    </div>
  );
}
