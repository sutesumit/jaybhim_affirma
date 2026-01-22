"use client";
import React from "react";
import { RotateCw, AlertCircle } from "lucide-react";
import { useAuthContext } from "@/auth/useAuthContext";
import { useComments } from "./hooks/useComments";
import { CommentInput } from "./CommentInput";
import { CommentsList } from "./CommentsList";

interface CommentsSectionProps {
  pagePath: string;
}

export function CommentsSection({ pagePath }: CommentsSectionProps) {
  const { user } = useAuthContext();
  const {
    comments,
    isFetching,
    isSubmitting,
    error,
    fetchComments,
    handlePostComment,
    handleDeleteComment,
  } = useComments(pagePath);

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
      <CommentInput onPost={handlePostComment} isSubmitting={isSubmitting} />

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-[11px] bg-red-400/10 p-2 rounded-sm mb-2">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}

      {/* Comments List */}
      <CommentsList 
        comments={comments} 
        isFetching={isFetching} 
        currentUser={user} 
        onDelete={handleDeleteComment} 
      />
    </div>
  );
}
