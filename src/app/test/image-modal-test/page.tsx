"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageModal } from "../components/ImageModal/ImageModal";
import type { GalleryImage } from "../components/documentary-portfolio/imageList";

const DUMMY_IMAGE: GalleryImage = {
  filename: "test.jpg",
  src: "/documentary_portfolio/test.jpg",
  alt: "Test documentary image",
  year: "2024",
  caption: "A powerful moment captured during the protest.",
  organization: "People's Coalition for Rights",
  camera: "Nikon Z8",
  lens: "Nikkor Z 35mm f/1.8",
  exposure: "1/250s",
  iso: "400",
  focalLength: "35mm",
};

export default function TestImageModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Image Modal Test</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Open Modal</Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <ImageModal image={DUMMY_IMAGE} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      <div className="mt-8 text-sm text-muted-foreground max-w-md">
        <p>
          This page verifies that ImageModal renders correctly inside the existing Dialog component with Gradient1/DotGrid styling.
        </p>
      </div>
    </div>
  );
}
