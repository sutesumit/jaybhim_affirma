"use client";
import { useState } from "react";
import { Quote, Dot, Pencil, Trash2, X, Check } from "lucide-react";
import { ProtectedActionDrawer, UserSessionCard } from "@/app/my_components/AuthCard";
import { CommentService } from "@/lib/comments/comment-service";
import type { Comment } from "@/types/comments";
import { CommentContent } from "./CommentContent";

interface CommentItemProps {
  comment: Comment;
  currentUser: { id: string } | null | undefined;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => Promise<{ success: boolean; error?: string }>;
  mode?: "overlay" | "standalone";
}

export const CommentItem = ({ comment, currentUser, onDelete, onEdit, mode }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.comment_text);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (editValue.trim() === comment.comment_text) {
      setIsEditing(false);
      return;
    }
    
    setIsSaving(true);
    const result = await onEdit(comment.id, editValue);
    setIsSaving(false);
    
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(comment.comment_text);
    setIsEditing(false);
  };

  return (
    <div className="group relative">
      <div className="hover:card-shadow p-1 rounded-sm border border-white/5 hover:border-white/10 transition-all duration-300 relative bg-white/[0.02]">
        <Quote className="w-3 h-3 absolute top-1 left-1 rotate-180 text-[--primary-blue]/40" />
        
        <div className="flex justify-between items-start pl-4">
          <div className="flex flex-col min-w-0 w-full">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {currentUser?.id === comment.user_id ? (
                <ProtectedActionDrawer 
                  mode="view"
                  trigger={
                    <span className="font-bold comment-author-self-tag text-xs tracking-wide cursor-pointer transition-colors">
                      {CommentService.formatAuthorName(comment.user)}:
                    </span>
                  }
                >
                  <UserSessionCard />
                </ProtectedActionDrawer>
              ) : (
                <span className="font-bold comment-author-tag text-xs tracking-wide">
                  {CommentService.formatAuthorName(comment.user)}:
                </span>
              )}

              {comment.updated_at !== comment.created_at && !isEditing ? (
                <>
                  
                  <span className="inline-flex items-center text-[10px] font-light text-[--primary-blue]/40">
                    <Dot className="w-3 h-3 self-center" />
                    <span className="text-[10px] text-[--primary-blue]/40">[edited {CommentService.formatTimestamp(comment.updated_at)}]</span>
                  </span>
                </>
              ) : (
                <span className="inline-flex items-center text-[10px] font-light text-[--primary-blue]/40">
                  <Dot className="w-3 h-3 self-center" />
                    <span className="text-[10px] text-[--primary-blue]/40">[created {CommentService.formatTimestamp(comment.updated_at)}]</span>
                </span>
              )}
            </div>

            <div className={`relative group/edit-container mt-1 ${isEditing ? 'w-full' : ''}`}>
              {isEditing ? (
                <div className="relative w-full">
                  {/* Ghost Content: Always rendered with same typography to drive container height */}
                  <div 
                    className="font-light text-sm leading-relaxed whitespace-pre-wrap break-words pb-2 pr-2 invisible pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    {(editValue || "\u00a0").replace(/ /g, "\u00a0")}
                  </div>

                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="absolute inset-0 w-full h-full bg-transparent border-none font-light text-sm leading-relaxed p-0 focus:outline-none focus:ring-0 resize-none overflow-hidden"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        handleSave();
                      }
                      if (e.key === 'Escape') {
                        handleCancel();
                      }
                    }}
                  />
                </div>
              ) : (
                <CommentContent text={comment.comment_text} />
              )}
            </div>
          </div>

          <div className={`flex gap-3 p-2 ${mode === "overlay" ? "flex-col" : "flex-row"} ${isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300`}>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving || !editValue.trim()}
                  className="comment-tiny-button"
                  title="Save Changes"
                >
                  {isSaving ? (
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-3 h-3" />
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="comment-tiny-button text-red-500"
                  title="Cancel"
                >
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              currentUser?.id === comment.user_id && (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="comment-tiny-button"
                    title="Edit Comment"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => onDelete(comment.id)}
                    className="comment-tiny-button text-red-500"
                    title="Delete Comment"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
