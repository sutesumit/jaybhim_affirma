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
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "p-2 rounded-sm transition-colors border card-bg card-border button-style group pointer-events-auto duration-300 ease-in-out",
        isActive 
          ? "bg-[var(--primary-blue)] text-white shadow-lg shadow-[var(--primary-blue)]/20" 
          : "",
        className
      )}
    >
      <Icon className={cn("w-4 h-4 transition-transform group-hover:rotate-3", fill && "fill-current")} />
    </motion.button>
  );
}
