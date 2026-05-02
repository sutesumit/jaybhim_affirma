"use client";

import React from "react";
import Image from "next/image";
import { X, ShoppingBag, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gradient1 } from "@/components/features/shared";
import { useToast } from "@/hooks/use-toast";
import type { GalleryImage } from "../../imageList";

interface ImageModalProps {
  image: GalleryImage;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        variant: "success",
        title: "Link Copied",
        description: "The link is with you now. Pass it along.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Couldn't copy the link. Try again?",
      });
    }
  };

  const metadataFields: [keyof GalleryImage, string][] = [
    ["year", "Year"],
    ["caption", "Caption"],
    ["organization", "Organization"],
    ["camera", "Camera"],
    ["lens", "Lens"],
    ["exposure", "Exposure"],
    ["iso", "ISO"],
    ["focalLength", "Focal Length"],
  ];

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-h-[90vh] overflow-y-auto">
      {/* Large image container */}
      <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Metadata section */}
      <div className="w-full max-w-2xl">
        <h3 className="text-sm uppercase font-bold mb-2 text-center font-rajdhani text-[--primary-blue]">
          Image Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
          {metadataFields
            .filter(([key]) => image[key] && String(image[key]).trim() !== "")
            .map(([key, label]) => (
              <div key={key} className="flex justify-between border-b border-white/10 pb-1">
                <span className="text-muted-foreground uppercase text-xs tracking-wider">{label}</span>
                <span className="font-rajdhani text-foreground text-right">{String(image[key])}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
        <Button
          variant="outline"
          size="sm"
          disabled
          className="opacity-50 cursor-not-allowed"
          title="Buy prints — coming soon"
          aria-label="Buy photo"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Buy
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled
          className="opacity-50 cursor-not-allowed"
          title="Like — coming soon"
          aria-label="Like this image"
        >
          <Heart className="w-4 h-4 mr-2" />
          Like
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleShare}
          aria-label="Share this image"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}
