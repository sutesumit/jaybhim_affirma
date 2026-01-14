"use client";
import type { GalleryImage } from "../../imageList";
import { Dot, Quote } from "lucide-react";

interface Props {
  data: GalleryImage;
}

const PLACEHOLDER_COMMENTS = [
  {
    author: "Priya Sharma",
    comment: "This work beautifully captures the essence of community resilience. The composition and storytelling are exceptional.",
    timestamp: "2 days ago"
  },
  {
    author: "Rajesh Kumar",
    comment: "Your documentary approach brings such authenticity to these moments. Each frame tells a story that needs to be heard.",
    timestamp: "1 week ago"
  },
  {
    author: "Anita Desai",
    comment: "The way you document these communities with respect and dignity is truly inspiring. Thank you for sharing these perspectives.",
    timestamp: "2 weeks ago"
  }
];

export function CommentsSection({  }: Props) {
  return (
    <div className="space-y-2 max-h-[60vh] overflow-y-auto overflow-x-hidden scroll-smooth font-rajdhani pr-1 antialiased">
      <button className="button-style relative z-10 font-medium text-xs tracking-[0.2em] uppercase p-1 pointer-events-auto">
        Community Interactions
      </button>

      <div className="relative hover:card-shadow rounded-sm transition-all duration-300 space-y-4">
        <div className="flex text-[var(--primary-blue)] gap-2">
          <input 
            type="text" 
            placeholder="This section is under construction..." 
            className="flex-1 bg-transparent rounded-sm px-3 py-2 text-sm outline-none border border-white/20 hover:card-inner-shadow transition-all duration-300"
          />
          <button 
            className="px-4 py-2 button-style text-xs font-medium w-auto transition-all duration-300"
          >
            Post
          </button>
        </div>
        <div className="space-y-1.5 pb-4">
        {PLACEHOLDER_COMMENTS.map((comment, index) => (
          <div key={index} className="space-y-4 group relative">
            <div className="hover:card-shadow p-3 rounded-sm transition-all duration-300">
              <Quote className="w-4 h-4 absolute rotate-180 inline-block" />
              <span className="font-medium ml-5 pr-2">
                {comment.author}:
              </span>
              <span className="font-light">
                {comment.comment}
              </span>
              <span className="text-xs text-right uppercase">
              <Dot className="w-4 h-4 inline-block" />{comment.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
