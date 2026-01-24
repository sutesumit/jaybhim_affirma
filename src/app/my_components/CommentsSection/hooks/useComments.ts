import { useState, useEffect, useCallback } from "react";
import { CommentService } from "@/lib/comments/comment-service";
import { subscribeToProfileUpdates } from "@/auth/AuthContext";
import { toast } from "@/hooks/use-toast";
import type { Comment } from "@/types/comments";

export function useComments(pagePath: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchComments = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      const result = await CommentService.getComments(pagePath);
      if (result.success && result.comments) {
        setComments(result.comments);
      } else {
        setError(result.error || "Failed to load comments");
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching comments.");
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }, [pagePath]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    const unsubscribe = subscribeToProfileUpdates(() => {
       fetchComments();
    });
    return unsubscribe;
  }, [fetchComments]);

  const handlePostComment = async (commentText: string) => {
    const trimmed = commentText.trim();
    if (!trimmed || isSubmitting) return { success: false };

    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await CommentService.postComment(pagePath, trimmed);
      
      if (result.success && result.comment) {
        setComments((prev) => [result.comment!, ...prev]);
        toast({
          variant: "success",
          title: "Comment Posted",
          description: "It’s public now. Don't look back.",
        });
        return { success: true };
      } else {
        toast({
          variant: "destructive",
          title: "Failed to Post",
          description: result.error || "So close",
        });
        return { success: false, error: result.error };
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Your words were stopped at the border.",
      });
      console.error(err);
      return { success: false, error: "Unexpected error" };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: string, commentText: string) => {
    const trimmed = commentText.trim();
    if (!trimmed || isSubmitting) return { success: false };

    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await CommentService.updateComment(commentId, trimmed);
      
      if (result.success && result.comment) {
        setComments((prev) => prev.map((c) => c.id === commentId ? result.comment! : c));
        toast({
          variant: "success",
          title: "Comment Updated",
          description: "I’ll pretend we didn’t see it. Others won’t.",
        });
        return { success: true };
      } else {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: result.error || "So close. The edit didn’t make it.",
        });
        return { success: false, error: result.error };
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Your words were stopped at the border.",
      });
      console.error(err);
      return { success: false, error: "Unexpected error" };
    } finally {
      setIsSubmitting(false);
    }
  }

  // Opens the delete confirmation dialog
  const requestDeleteComment = (commentId: string) => {
    setPendingDeleteId(commentId);
    setDeleteDialogOpen(true);
  };

  // Confirms and executes the deletion
  const confirmDeleteComment = async () => {
    if (!pendingDeleteId) return;

    setIsDeleting(true);
    try {
      const result = await CommentService.deleteComment(pendingDeleteId);
      if (result.success) {
        setComments((prev) => prev.filter((c) => c.id !== pendingDeleteId));
        toast({
          variant: "success",
          title: "Comment Deleted",
          description: "Vanished. Like it was never here.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: result.error || "Some things linger, but try again.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Your words were stopped at the border.",
      });
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setPendingDeleteId(null);
    }
  };

  // Cancels the delete operation
  const cancelDeleteComment = () => {
    setDeleteDialogOpen(false);
    setPendingDeleteId(null);
  };

  return {
    comments,
    isFetching,
    isSubmitting,
    error,
    fetchComments,
    handlePostComment,
    handleEditComment,
    // Delete with confirmation dialog
    requestDeleteComment,
    confirmDeleteComment,
    cancelDeleteComment,
    deleteDialogOpen,
    isDeleting,
  };
}
