"use client";
import React, { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { ProtectedActionDrawer } from "@/app/my_components/AuthCard";
import { useAutoResizeTextarea } from "@/_hooks/useAutoResizeTextarea";
import { MAX_COMMENT_LENGTH } from "@/lib/comments/constants";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@radix-ui/react-checkbox";

interface CommentInputProps {
  onPost: (text: string) => Promise<{ success: boolean }>;
  isSubmitting: boolean;
  mode?: "overlay" | "standalone";
}

export const CommentInput = ({ onPost, isSubmitting, mode }: CommentInputProps) => {
  const [commentText, setCommentText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
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
      <div className="flex gap-2 items-stretch h-full">
        <textarea
          ref={textareaRef}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handlePost()}
          placeholder="Feel like sharing a thought?"
          className={`flex-1 max-h-32 overflow-y-auto bg-white/5 border ${mode === "overlay" ? "border-white/10" : "border-[--primary-blue]/10"} rounded-sm px-1 py-1 text-sm text-[--primary-blue] placeholder:${mode === "overlay" ? "text-white/70" : "text-[--primary-blue]"} outline-none focus:border-[--primary-blue]/60 hover:border-white/20 hover:card-inner-shadow transition-all duration-300`}
          disabled={isSubmitting}
          maxLength={MAX_COMMENT_LENGTH}
        />
        <div className="flex flex-col justify-between gap-2">
          <ProtectedActionDrawer title="Login to post a comment">
            <button
              onClick={handlePost}
              disabled={isSubmitting || !commentText.trim()}
              className="px-4 py-2 w-full h-full button-style text-xs text-center font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : "Post"}
            </button>
          </ProtectedActionDrawer>
          <div className="flex items-center space-x-1 px-1 group/anon opacity-70 hover:opacity-100 transition-opacity">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(!!checked)}
              className="border border-[--primary-blue] rounded-[2px] data-[state=checked]:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.6)]
 data-[state=checked]:bg-[--primary-blue] data-[state=checked]:border-[--primary-blue] h-3 w-3"
            />
            <Label
              htmlFor="anonymous"
              className="text-[9px] font-bold tracking-wide uppercase text-[--primary-blue] cursor-pointer select-none group-hover/anon:text-[--primary-blue]"
            >
              Anonymous
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
