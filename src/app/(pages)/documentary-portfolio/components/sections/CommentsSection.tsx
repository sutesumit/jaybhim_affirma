"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Dot, Quote, Loader2, Trash2, AlertCircle, Pencil, RotateCw } from "lucide-react";
import { useAuthContext } from "@/auth/useAuthContext";
import { CommentService } from "@/lib/comments/comment-service";
import type { Comment } from "@/types/comments";
import { ProtectedActionDrawer, UserSessionCard } from "@/app/my_components/AuthCard";

interface CommentsSectionProps {
  pagePath: string;
}

interface CommentContentProps {
  text: string;
}

const CommentContent = ({ text }: CommentContentProps) => {
  const MAX_LENGTH = 100;
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = text.length > MAX_LENGTH;
  if (!isLongText) return (
    <span
      className="flex-1 font-light text-sm leading-relaxed whitespace-pre-wrap break-words"
    >
      {text}
    </span>
  );

  return (
    <>
    <span
      className="flex-1 font-light text-sm leading-relaxed whitespace-pre-wrap break-words"
    >
      {isExpanded ? text : text.slice(0, MAX_LENGTH) + "..."}
    </span>
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="text-xs text-[--primary-blue] opacity-50 px-2 rounded-sm ml-1 hover:bg-[--primary-blue] hover:text-[--primary-white] hover:opacity-100 transition-all duration-300"
    >
      {isExpanded ? "Show Less" : "Show More"}
    </button>
    </>
  );
};




export function CommentsSection({ pagePath }: CommentsSectionProps) {
  const { user } = useAuthContext();

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);

  // Fetch comments from the API
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
    if (textareaRef) {
      textareaRef.style.height = "auto";
      textareaRef.style.height = `${textareaRef.scrollHeight}px`;
    }
  }, [commentText, textareaRef]);

  // Handle posting a new comment
  const handlePostComment = async () => {
    const trimmed = commentText.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await CommentService.postComment(pagePath, trimmed);
      
      if (result.success && result.comment) {
        // Add the new comment to the top of the list
        setComments((prev) => [result.comment!, ...prev]);
        setCommentText(""); // Clear input
      } else {
        setError(result.error || "Failed to post comment");
      }
    } catch (err) {
      setError("An unexpected error occurred while posting.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle comment deletion
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

  return (
    <div className="space-y- max-h-[60vh] overflow-y-auto overflow-x-hidden scroll-smooth font-rajdhani pr-1 antialiased custom-scrollbar">
      {/* Interaction Header */}
      <div className="flex gap-1 items-center justify-between bg-transparent z-10 py-1">
        <button className="button-style text-xs font-medium tracking-[0.2em] uppercase px-2 py-1 pointer-events-auto">
          Community Interactions
        </button>
        <button
          onClick={fetchComments}
          disabled={isFetching}
          title="Refresh Comments"
          className="w-fit px-2 py-1.5 button-style text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
        >
          <RotateCw className={`w-3 h-3 ${isFetching ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Input Area */}
      <div className="py-2">
        <div className="flex gap-2">
          <textarea 
            ref={setTextareaRef}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
            placeholder="Feel like sharing a thought?" 
            className="flex-1 max-h-24 overflow-y-auto bg-white/5 border border-white/10 rounded-sm px-1 py-1 text-sm text-[--primary-blue] placeholder:text-white/70 outline-none focus:border-[--primary-blue]/60 hover:border-white/20 transition-all duration-300"
            disabled={isSubmitting}
          />
          <ProtectedActionDrawer title="Login to post a comment">
            <button 
              onClick={handlePostComment}
              disabled={isSubmitting || !commentText.trim()}
              className="px-4 w-fit py-2 button-style text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : "Post"}
            </button>
          </ProtectedActionDrawer>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-[11px] bg-red-400/10 p-2 rounded-sm">
            <AlertCircle className="w-3 h-3" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-1 text-[--primary-blue]">
        {isFetching ? (
          <div className="flex flex-col items-center justify-center p-8 text-white/40">
            <div className='loader2 mb-5 opacity-50'></div>
            <span className="text-xs text-[--primary-blue] uppercase tracking-widest opacity-50">Loading Conversation...</span>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center p-8 bg-white/5 rounded-sm border border-dashed border-white/10">
            <p className="text-sm text-[--primary-blue] italic">No echoes yet. The room is open! ✦</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="group relative">
              <div className="hover:card-shadow p-1 rounded-sm border border-white/5 hover:border-white/10 transition-all duration-300 relative bg-white/[0.02]">
                <Quote className="w-3 h-3 absolute top-1 left-1 rotate-180 text-[--primary-blue]/40" />
                
                <div className="flex justify-between items-start pl-4">
                  <span className="flex flex-wrap min-w-0">
                    <span className="flex-1 items-center gap-2 flex-wrap mb-1">
                      {user?.id === comment.user_id ? (
                        <ProtectedActionDrawer 
                          mode="view"
                          trigger={
                            <span className="font-bold comment-author-self-tag text-xs tracking-wide pr-1 cursor-pointer transition-colors">
                              {CommentService.formatAuthorName(comment.user)}:
                            </span>
                          }
                        >
                          <UserSessionCard />
                        </ProtectedActionDrawer>
                      ) : (
                        <span className="font-bold comment-author-tag text-xs tracking-wide pr-1">
                          {CommentService.formatAuthorName(comment.user)}:
                        </span>
                      )}
                      {comment.updated_at !== comment.created_at && (
                        <span className="text-sm italic">(edited)</span>
                      )}
                      {/* </span> */}
                      <CommentContent text={comment.comment_text} />
                      <span className="inline-flex items-baseline text-xs font-light italic flex items-baseline">
                        <Dot className="w-3 h-3 self-center" />
                        {CommentService.formatTimestamp(comment.created_at)}
                      </span>
                    </span>
                  </span>

                  {user?.id === comment.user_id && (
                    <div className="flex gap-3 p-2">
                        <button 
                            // onClick={() => handleEditComment(comment.id)}
                            className="opacity-0 group-hover:opacity-100 text-white/70 hover:text-blue-900 transition-all duration-300"
                            title="Edit Comment"
                        >
                            <Pencil className="w-3 h-3" />
                        </button>
                        <button 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="opacity-0 group-hover:opacity-100 text-white/70 hover:text-red-900 transition-all duration-300"
                            title="Delete Comment"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
