import { useState, useEffect, useCallback } from "react";
import { CommentService } from "@/lib/comments/comment-service";
import type { Comment } from "@/types/comments";

export function useComments(pagePath: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handlePostComment = async (commentText: string) => {
    const trimmed = commentText.trim();
    if (!trimmed || isSubmitting) return { success: false };

    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await CommentService.postComment(pagePath, trimmed);
      
      if (result.success && result.comment) {
        setComments((prev) => [result.comment!, ...prev]);
        return { success: true };
      } else {
        setError(result.error || "Failed to post comment");
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError("An unexpected error occurred while posting.");
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
        return { success: true };
      } else {
        setError(result.error || "Failed to edit comment");
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError("An unexpected error occurred while editing.");
      console.error(err);
      return { success: false, error: "Unexpected error" };
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      const result = await CommentService.deleteComment(commentId);
      if (result.success) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      } else {
        alert(result.error || "Failed to delete comment");
      }
    } catch (err) {
      alert("An unexpected error occurred while deleting.");
      console.error(err);
    }
  };

  return {
    comments,
    isFetching,
    isSubmitting,
    error,
    fetchComments,
    handlePostComment,
    handleEditComment,
    handleDeleteComment,
  };
}
