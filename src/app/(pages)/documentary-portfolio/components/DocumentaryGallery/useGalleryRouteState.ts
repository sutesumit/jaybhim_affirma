"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useGalleryRouteState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedImageId = searchParams.get("image");

  const setSelectedImageId = useCallback(
    (imageId: string | null) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      if (imageId) {
        nextParams.set("image", imageId);
      } else {
        nextParams.delete("image");
      }

      const nextQuery = nextParams.toString();
      const nextUrl = nextQuery
        ? `${window.location.pathname}?${nextQuery}`
        : window.location.pathname;

      router.replace(nextUrl);
    },
    [router, searchParams]
  );

  return {
    selectedImageId,
    setSelectedImageId,
  };
}
