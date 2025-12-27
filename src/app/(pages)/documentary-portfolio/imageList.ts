import fs from "fs";
import path from "path";

export interface GalleryImage {
  filename: string;
  src: string;
  alt: string;
  year: string;
  caption?: string;
  organization?: string;
  // Technical properties (preserved from metadata.json)
  camera?: string;
  lens?: string;
  exposure?: string;
  focalLength?: string;
  iso?: string;
}

let cachedImages: GalleryImage[] | null = null;

export function getImageList(): GalleryImage[] {
  if (cachedImages) return cachedImages;

  const directoryPath = path.join(process.cwd(), "public", "documentary_portfolio");
  const metadataPath = path.join(directoryPath, "metadata.json");
  
  if(!fs.existsSync(directoryPath)) {
    return [];
  }

  // Load static metadata map if it exists
  let metadataMap: Record<string, any> = {};
  if (fs.existsSync(metadataPath)) {
    try {
      metadataMap = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    } catch (e) {
      console.error("Error reading metadata.json:", e);
    }
  }

  const allFiles = fs.readdirSync(directoryPath)
    .filter((filename) => /\.(jpg|jpeg|png|webp|avif)$/i.test(filename))
    .filter(filename => !filename.startsWith('temp_') && filename !== 'metadata.json');

  const images = allFiles.map((filename) => {
    const meta = metadataMap[filename] || {};

    return {
      filename,
      src: `/documentary_portfolio/${filename}`,
      alt: meta.caption || filename,
      year: meta.year || "",
      caption: meta.caption || "",
      organization: meta.organization || "",
      camera: meta.camera,
      lens: meta.lens,
      exposure: meta.exposure,
      iso: meta.iso,
      focalLength: meta.focalLength,
    };
  });

  // Randomize order
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  cachedImages = images;
  return images;
}