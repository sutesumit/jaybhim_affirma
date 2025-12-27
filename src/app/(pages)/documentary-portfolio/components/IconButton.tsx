"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  Icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
  "aria-label"?: string;
  fill?: boolean;
}

export function IconButton({ 
  Icon, 
  onClick, 
  isActive = false, 
  className,
  "aria-label": ariaLabel,
  fill = false
}: IconButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "p-2 rounded-full backdrop-blur-md transition-all border border-white/20 group pointer-events-auto",
        isActive 
          ? "ring-2 ring-[var(--primary-blue)] bg-[var(--primary-blue)] text-white shadow-lg shadow-[var(--primary-blue)]/20" 
          : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white",
        className
      )}
    >
      <Icon className={cn("w-4 h-4 transition-transform group-hover:rotate-3", fill && "fill-current")} />
    </motion.button>
  );
}
