import fs from "fs";
import path from "path";

export interface GalleryImage {
  filename: string;
  src: string;
  alt: string;
  year: string;
  caption?: string;
  organization?: string;
}

const metadataMap: Record<string, Partial<GalleryImage>> = {

}

export function getImageList(): GalleryImage[] {
  const directoryPath = path.join(process.cwd(), "public", "documentary_portfolio");
  
  if(!fs.existsSync(directoryPath)) {
    return [];
  }

  const allFiles = fs.readdirSync(directoryPath)
    .filter((filename) => /\.(jpg|jpeg|png|webp|avif)$/i.test(filename));

  for (let i= allFiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allFiles[i], allFiles[j]] = [allFiles[j], allFiles[i]];
  }

  return allFiles.map((filename) => {
    const metadata = metadataMap[filename] || {};
    return {
      filename,
      src: `/documentary_portfolio/${filename}`,
      alt: filename,
      year: metadata.year || "",
      caption: metadata.caption || "",
      organization: metadata.organization || "",
    };
  });
  
}