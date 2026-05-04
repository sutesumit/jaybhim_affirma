"use client";

import React from "react";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { GalleryImage } from "../../imageList";

interface ImageModalProps {
  image: GalleryImage;
}

export function ImageModal({ image }: ImageModalProps) {
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
    <div className="flex flex-col items-center max-h-[90vh] overflow-y-auto">
      <div className="inline-title-style">
        Image Details
      </div>
      <div className="px-4 pb-4 flex flex-col items-center w-full">
        {/* Large image container */}
        <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] rounded-md">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Metadata section */}
        <div className="w-full max-w-2xl my-2 space-y-2">
          {image.caption && String(image.caption).trim() !== "" && (
            <div className="text-left px-2">
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-light">
                {String(image.caption)}
              </p>
            </div>
          )}
          
          <div className="flex text-[10px] flex-wrap justify-center items-center gap-x-2 gap-y-1">
            {metadataFields
              .filter(([key]) => key !== "caption" && image[key] && String(image[key]).trim() !== "")
              .map(([key, label], index, arr) => (
                <React.Fragment key={key}>
                  <span className="flex items-center gap-1">
                    <span className="uppercase text-primary-blue/60">{label}</span>
                    <span className="font-rajdhani tracking-wide text-primary-blue/80">{String(image[key])}</span>
                  </span>
                  {index < arr.length - 1 && <span className="text-primary-blue/50">|</span>}
                </React.Fragment>
              ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-2">
          <button
            className="button-style gradient-button flex-1"
            title="Buy prints — coming soon"
            aria-label="Buy photo"
          >
            Get this print
          </button>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="opacity-50 cursor-not-allowed"
            title="Like — coming soon"
            aria-label="Like this image"
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleShare}
            aria-label="Share this image"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
