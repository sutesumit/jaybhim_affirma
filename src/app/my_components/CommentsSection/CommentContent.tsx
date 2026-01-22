"use client";
import React, { useState } from "react";

interface CommentContentProps {
  text: string;
}

export const CommentContent = ({ text }: CommentContentProps) => {
  const MAX_LENGTH = 100;
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = text.length > MAX_LENGTH;
  if (!isLongText) return (
    <span className="flex-1 font-light text-sm leading-relaxed whitespace-pre-wrap break-words">
      {text}
    </span>
  );

  return (
    <>
      <span className="flex-1 font-light text-sm leading-relaxed whitespace-pre-wrap break-words">
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
