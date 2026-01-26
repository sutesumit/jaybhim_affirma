"use client";

import { useState, useEffect, useCallback } from "react";
import { LikeService } from "@/lib/likes/like-service";
import { toast } from "@/hooks/use-toast";

export function useLikes(pagePath: string | null) {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLikes = useCallback(async () => {
    if (!pagePath) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await LikeService.getLikes(pagePath);
      if (result.success) {
        setLikeCount(result.likeCount ?? 0);
        setIsLiked(result.isLiked ?? false);
      } else {
        setError(result.error || "Failed to load likes");
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching likes.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [pagePath]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const toggleLike = useCallback(async () => {
    if (!pagePath || isToggling) return { success: false };

    setIsToggling(true);
    setError(null);

    // Store previous state for optimistic update rollback
    const previousCount = likeCount;
    const previousIsLiked = isLiked;

    // Optimistically update UI
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount((prev) => newIsLiked ? prev + 1 : prev - 1);

    try {
      const result = await LikeService.toggleLike(pagePath);
      
      if (result.success) {
        // Update with actual values from server
        if (result.likeCount !== undefined) {
          setLikeCount(result.likeCount);
        }
        if (result.isLiked !== undefined) {
          setIsLiked(result.isLiked);
        }

        // Show success toast
        toast({
          variant: "success",
          title: result.isLiked ? "Liked" : "Unliked.",
          description: result.isLiked 
            ? "This page feels appreciated now." 
            : "Changed your mind? Happens to the best of us.",
        });

        return { success: true };
      } else {
        // Revert optimistic update on error
        setLikeCount(previousCount);
        setIsLiked(previousIsLiked);
        
        toast({
          variant: "destructive",
          title: "Like Failed",
          description: result.error || "Uh oh. That didn’t quite work. Mind trying again?",
        });
        
        return { success: false, error: result.error };
      }
    } catch (err) {
      // Revert optimistic update on error
      setLikeCount(previousCount);
      setIsLiked(previousIsLiked);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Uh oh. That didn’t quite work. Mind trying again?",
      });
      
      console.error(err);
      return { success: false, error: "Unexpected error" };
    } finally {
      setIsToggling(false);
    }
  }, [pagePath, isToggling, likeCount, isLiked]);

  return {
    likeCount,
    isLiked,
    isLoading,
    isToggling,
    error,
    toggleLike,
    fetchLikes,
  };
}
