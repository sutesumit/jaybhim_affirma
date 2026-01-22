"use client";
import React, { useState } from "react";
import { COMMENT_TRUNCATION_THRESHOLD } from "@/lib/comments/constants";

interface CommentContentProps {
  text: string;
}

export const CommentContent = ({ text }: CommentContentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = text.length > COMMENT_TRUNCATION_THRESHOLD;
  if (!isLongText) return (
    <span className="flex-1 font-light text-sm leading-relaxed whitespace-pre-wrap break-words">
      {text}
    </span>
  );

  return (
    <>
      <span className="flex-1 font-light text-sm leading-relaxed whitespace-pre-wrap break-words">
        {isExpanded ? text : text.slice(0, COMMENT_TRUNCATION_THRESHOLD) + "..."}
      </span>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs text-[--primary-blue] opacity-30 px-2 rounded-sm ml-1 border border-[var(--primary-blue)] hover:bg-[--primary-blue] hover:text-[--primary-white] hover:opacity-100 transition-all duration-300"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </>
  );
};
