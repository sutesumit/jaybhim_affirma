"use client";
import React from "react";
import type { Comment } from "@/types/comments";
import { CommentItem } from "./CommentItem";

interface CommentsListProps {
  comments: Comment[];
  isFetching: boolean;
  currentUser: { id: string } | null | undefined;
  onDelete: (id: string) => void;
  mode?: "overlay" | "standalone";
}

export const CommentsList = ({ comments, isFetching, currentUser, onDelete, mode }: CommentsListProps) => {
  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-white/40">
        <div className="loader2 mb-5 opacity-50"></div>
        <span className="text-xs text-[--primary-blue] uppercase tracking-widest opacity-50">
          Loading Conversation...
        </span>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center p-8 bg-white/5 rounded-sm border border-dashed border-white/10">
        <p className="text-sm text-[--primary-blue] italic">No echoes yet. The room is open! ✦</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 text-[--primary-blue]">
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          currentUser={currentUser} 
          onDelete={onDelete} 
          mode={mode}
        />
      ))}
    </div>
  );
};
