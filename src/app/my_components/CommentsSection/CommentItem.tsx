"use client";
import React from "react";
import { Quote, Dot, Pencil, Trash2 } from "lucide-react";
import { ProtectedActionDrawer, UserSessionCard } from "@/app/my_components/AuthCard";
import { CommentService } from "@/lib/comments/comment-service";
import type { Comment } from "@/types/comments";
import { CommentContent } from "./CommentContent";

interface CommentItemProps {
  comment: Comment;
  currentUser: { id: string } | null | undefined;
  onDelete: (id: string) => void;
  mode?: "overlay" | "standalone";
}

export const CommentItem = ({ comment, currentUser, onDelete, mode }: CommentItemProps) => {
  return (
    <div className="group relative">
      <div className="hover:card-shadow p-1 rounded-sm border border-white/5 hover:border-white/10 transition-all duration-300 relative bg-white/[0.02]">
        <Quote className="w-3 h-3 absolute top-1 left-1 rotate-180 text-[--primary-blue]/40" />
        
        <div className="flex justify-between items-start pl-4">
          <span className="flex flex-wrap min-w-0 w-full">
            <span className="flex-1 w-full items-center gap-2 flex-wrap mb-1">
              {currentUser?.id === comment.user_id ? (
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
              <CommentContent text={comment.comment_text} />
              <span className="inline-flex items-baseline text-xs font-light italic flex items-baseline">
                <Dot className="w-3 h-3 self-center" />
                {CommentService.formatTimestamp(comment.created_at)}
              </span>
            </span>
          </span>

          {currentUser?.id === comment.user_id && (
            <div className={`flex gap-3 p-2 ${mode === "overlay" ? "flex-col" : "flex-row"}`}>
                <button 
                    // onClick={() => handleEditComment(comment.id)}
                    className="opacity-0 group-hover:opacity-100 text-white/70 hover:text-blue-900 transition-all duration-300"
                    title="Edit Comment"
                >
                    <Pencil className="w-3 h-3" />
                </button>
                <button 
                    onClick={() => onDelete(comment.id)}
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
  );
};
