"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "../../imageList";

interface GalleryImageViewportProps {
  image: Pick<GalleryImage, "src" | "alt">;
  fit?: "contain" | "cover";
  priority?: boolean;
  className?: string;
}

export function GalleryImageViewport({
  image,
  fit = "cover",
  priority = false,
  className,
}: GalleryImageViewportProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={priority}
      className={cn(
        fit === "contain" ? "object-contain" : "object-cover",
        className
      )}
    />
  );
}
