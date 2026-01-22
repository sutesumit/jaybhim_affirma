"use client";
import React, { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { ProtectedActionDrawer } from "@/app/my_components/AuthCard";
import { useAutoResizeTextarea } from "@/_hooks/useAutoResizeTextarea";
import { MAX_COMMENT_LENGTH } from "@/lib/comments/constants";

interface CommentInputProps {
  onPost: (text: string) => Promise<{ success: boolean }>;
  isSubmitting: boolean;
  mode?: "overlay" | "standalone";
}

export const CommentInput = ({ onPost, isSubmitting, mode }: CommentInputProps) => {
  const [commentText, setCommentText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useAutoResizeTextarea(textareaRef.current, commentText);

  const handlePost = async () => {
    const result = await onPost(commentText);
    if (result.success) {
      setCommentText("");
    }
  };

  return (
    <div className="py-2">
      <div className="flex gap-2">
        <textarea 
          ref={textareaRef}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handlePost()}
          placeholder="Feel like sharing a thought?" 
          className={`flex-1 max-h-24 overflow-y-auto bg-white/5 border ${mode === "overlay" ? "border-white/10" : "border-[--primary-blue]/10"} rounded-sm px-1 py-1 text-sm text-[--primary-blue] placeholder:${mode === "overlay" ? "text-white/70" : "text-[--primary-blue]"} outline-none focus:border-[--primary-blue]/60 hover:border-white/20 hover:card-inner-shadow transition-all duration-300`}
          disabled={isSubmitting}
          maxLength={MAX_COMMENT_LENGTH}
        />
        <ProtectedActionDrawer title="Login to post a comment">
          <button 
            onClick={handlePost}
            disabled={isSubmitting || !commentText.trim()}
            className="px-4 w-fit py-2 button-style text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : "Post"}
          </button>
        </ProtectedActionDrawer>
      </div>
    </div>
  );
};
