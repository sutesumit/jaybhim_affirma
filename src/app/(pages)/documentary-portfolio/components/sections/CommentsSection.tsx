"use client";
import type { GalleryImage } from "../../imageList";

interface Props {
  data: GalleryImage;
}

export function CommentsSection({ data }: Props) {
  return (
    <div className="space-y-2 max-h-[60vh] overflow-y-auto overflow-x-hidden scroll-smooth font-rajdhani pr-1 antialiased">
      <button className="button-style relative z-10 font-medium text-xs tracking-[0.2em] uppercase p-1 pointer-events-auto">
        Community Interactions
      </button>

      <div className="relative border-[1px] border-dotted border-[--primary-blue] p-3 rounded-sm bg-white/10 hover:shadow-[inset_0px_0px_15px_-5px_rgba(59,_130,_246,_0.3)] transition-all duration-300 space-y-4">
        <div className="flex text-[var(--primary-blue)] gap-2">
          <input 
            type="text" 
            placeholder="This section is under construction..." 
            disabled
            className="flex-1 bg-white/10 border border-[--primary-blue]/40 rounded-sm px-3 py-2 text-sm text-[--primary-blue] placeholder:text-[--primary-blue]/70 cursor-not-allowed outline-none hover:border-[--primary-blue]/60 transition-all duration-300"
          />
          <button 
            disabled
            className="px-4 py-2 border border-[--primary-blue]/40 rounded-sm text-sm font-bold text-[--primary-blue]/90 cursor-not-allowed bg-white/10 hover:bg-[--primary-blue]/10 transition-all duration-300"
          >
            Post
          </button>
        </div>
        <p className="text-[11px] text-[--primary-blue] italic tracking-wide font-bold border-t border-[--primary-blue]/20 pt-3 mt-3">
          Archive // Community feedback coming soon.
        </p>
      </div>
    </div>
  );
}
