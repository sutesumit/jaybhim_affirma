"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "../../imageList";

interface Props {
  data: GalleryImage;
}

export function CaptionsSection({ data }: Props) {
  return (
    <div className="space-y-2 max-h-[60vh] overflow-y-auto overflow-x-hidden scroll-smooth font-rajdhani pr-1 antialiased">
      <button className="button-style relative z-10 font-medium text-xs tracking-[0.2em] uppercase p-1 pointer-events-auto">
        Image Caption
      </button>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={data.filename}
          initial={{ opacity: 0, x: "100%", filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: "-100%", filter: "blur(4px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative border-[1px] border-dotted border-[--primary-blue] p-3 rounded-sm bg-white/15 hover:shadow-[inset_0px_0px_15px_-5px_rgba(59,_130,_246,_0.4)] transition-all duration-300 space-y-4"
        >
          {data.caption && (
            <p className="leading-relaxed text-[--primary-blue] text-lg font-light">
              {data.caption}
            </p>
          )}

          {data.alt && (
            <p className="text-[--primary-blue]/90 text-[14px] leading-relaxed font-light border-l border-[--primary-blue]/20 pl-3">
              {data.alt}
            </p>
          )}

          <div className="pt-3 border-t border-[--primary-blue]/20 space-y-1.5 mt-3">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[--primary-blue] font-bold">{data.year || "N/A"}</span>
              <span className="text-[--primary-blue]/30">|</span>
              <span className="text-[--primary-blue] font-bold tracking-wide uppercase">{data.organization || "Independent"}</span>
            </div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[--primary-blue] font-bold">{data.filename}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
