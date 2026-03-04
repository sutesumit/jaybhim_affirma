// src/app/(pages)/fathers-and-figures/Submissions/hooks/useStories.ts
// Hook for managing stories state and CRUD operations
// Pattern: Same as useComments in src/app/my_components/CommentsSection/hooks/useComments.ts

import { useState, useEffect, useCallback } from "react";
import { StoryService } from "@/lib/stories/story-service";
import { toast } from "@/hooks/use-toast";
import type { FatherSonStory } from "@/types/stories";

export function useStories() {
  // Data state
  const [stories, setStories] = useState<FatherSonStory[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Delete confirmation dialog state (same pattern as useComments)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Fetch all stories from the API
   */
  const fetchStories = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const result = await StoryService.getStories();
      if (result.success && result.stories) {
        setStories(result.stories);
      } else {
        setError(result.error || "Failed to load stories");
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching stories.");
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Fetch stories on mount
  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  /**
   * Update an existing story
   * Called from SubmissionCard when user saves edits
   */
  const handleEditStory = async (
    storyId: string,
    storyText: string,
    signature?: string
  ) => {
    const trimmed = storyText.trim();
    if (!trimmed || isSubmitting) return { success: false };

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await StoryService.updateStory(storyId, trimmed, signature);

      if (result.success && result.story) {
        // Update the story in local state
        setStories((prev) =>
          prev.map((s) => (s.id === storyId ? result.story! : s))
        );
        toast({
          variant: "success",
          title: "Story Updated",
          description: "Your story has been saved.",
        });
        return { success: true };
      } else {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: result.error || "Could not save your changes.",
        });
        return { success: false, error: result.error };
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
      console.error(err);
      return { success: false, error: "Unexpected error" };
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Opens the delete confirmation dialog
   * Same pattern as requestDeleteComment in useComments
   */
  const requestDeleteStory = (storyId: string) => {
    setPendingDeleteId(storyId);
    setDeleteDialogOpen(true);
  };

  /**
   * Confirms and executes the deletion
   */
  const confirmDeleteStory = async () => {
    if (!pendingDeleteId) return;

    setIsDeleting(true);
    try {
      const result = await StoryService.deleteStory(pendingDeleteId);
      if (result.success) {
        // Remove from local state
        setStories((prev) => prev.filter((s) => s.id !== pendingDeleteId));
        toast({
          variant: "success",
          title: "Story Deleted",
          description: "Your story has been removed.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: result.error || "Could not delete the story.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setPendingDeleteId(null);
    }
  };

  /**
   * Cancels the delete operation
   */
  const cancelDeleteStory = () => {
    setDeleteDialogOpen(false);
    setPendingDeleteId(null);
  };

  return {
    stories,
    isFetching,
    isSubmitting,
    error,
    fetchStories,
    handleEditStory,
    // Delete with confirmation dialog
    requestDeleteStory,
    confirmDeleteStory,
    cancelDeleteStory,
    deleteDialogOpen,
    isDeleting,
  };
}
