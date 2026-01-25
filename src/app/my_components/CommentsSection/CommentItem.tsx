"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Quote, Dot, Pencil, Trash2, X, Check } from "lucide-react";
import { ProtectedActionDrawer, UserSessionCard } from "@/app/my_components/AuthCard";
import { CommentService } from "@/lib/comments/comment-service";
import { MAX_COMMENT_LENGTH } from "@/lib/comments/constants";
import type { Comment } from "@/types/comments";
import { CommentContent } from "./CommentContent";
import { AnonymousToggle } from "./AnonymousToggle";

interface CommentItemProps {
  comment: Comment;
  currentUser: { id: string } | null | undefined;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, isAnonymous: boolean) => Promise<{ success: boolean; error?: string }>;
  mode?: "overlay" | "standalone";
}

export const CommentItem = ({ comment, currentUser, onDelete, onEdit, mode }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(comment.is_anonymous);
  const [editValue, setEditValue] = useState(comment.comment_text);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (editValue.trim() === comment.comment_text && isAnonymous === comment.is_anonymous) {
      setIsEditing(false);
      return;
    }
    
    setIsSaving(true);
    const result = await onEdit(comment.id, editValue, isAnonymous);
    setIsSaving(false);
    
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(comment.comment_text);
    setIsAnonymous(comment.is_anonymous);
    setIsEditing(false);
  };

  return (
    <div className="group relative">
      <div className="hover:card-shadow p-1 rounded-sm border border-white/5 hover:border-white/10 transition-all duration-300 relative bg-white/[0.02]">
        <Quote className="w-3 h-3 absolute top-1 left-1 rotate-180 text-[--primary-blue]/40" />
        
        <div className="flex justify-between items-start pl-4">
          <div className="flex flex-col min-w-0 w-full">
            <motion.div layout className="flex items-center gap-1 flex-wrap">

              {currentUser?.id === comment.user_id ? (
                <ProtectedActionDrawer 
                  mode="view"
                  trigger={
                    <motion.span 
                      layout
                      className="font-bold comment-author-self-tag tracking-wide cursor-pointer transition-colors block"
                    >
                      {CommentService.formatAuthorName(comment.user, isEditing ? isAnonymous : comment.is_anonymous)}:
                    </motion.span>
                  }
                >
                  <UserSessionCard />
                </ProtectedActionDrawer>
              ) : (
                <motion.span layout className="font-bold comment-author-tag tracking-wide block">
                  {CommentService.formatAuthorName(comment.user, comment.is_anonymous)}:
                </motion.span>
              )}

              <AnimatePresence mode="popLayout">
                {isEditing && currentUser?.id === comment.user_id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AnonymousToggle
                      id={`anonymous-${comment.id}`}
                      checked={isAnonymous}
                      onCheckedChange={setIsAnonymous}
                    />
                  </motion.div>
                )}
              </AnimatePresence>


              {comment.updated_at !== comment.created_at ? (
                <motion.span layout className="inline-flex text-sm items-center font-light text-[--primary-blue]/40">
                  <Dot className="w-3 h-3 self-center" />
                  <span className="text-[--primary-blue]/40">[edited {CommentService.formatTimestamp(comment.updated_at)}]</span>
                </motion.span>
              ) : (
                <motion.span layout className="inline-flex text-sm items-center font-light text-[--primary-blue]/40">
                  <Dot className="w-3 h-3 self-center" />
                  <span className="text-[--primary-blue]/40">[created {CommentService.formatTimestamp(comment.updated_at)}]</span>
                </motion.span>
              )}

            </motion.div>

            <div className={`relative group/edit-container pl-1 ${isEditing ? 'w-full max-h-32 overflow-y-auto' : ''}`}>
              {isEditing ? (
                <div className="relative w-full">
                  {/* Ghost Content: Always rendered with same typography to drive container height */}
                  <div 
                    className="comment-body-text invisible pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    {(editValue || "\u00a0").replace(/ /g, "\u00a0")}
                  </div>

                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="absolute card-inner-shadow inset-0 w-full h-full bg-transparent border-none rounded-sm comment-body-text focus:outline-none focus:ring-0 resize-none overflow-hidden"
                    autoFocus
                    maxLength={MAX_COMMENT_LENGTH}
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

          <div className={`flex gap-1 p-2 ${mode === "overlay" ? "flex-col" : "flex-row"} ${isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300`}>
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
                    onClick={() => {
                      setEditValue(comment.comment_text);
                      setIsAnonymous(comment.is_anonymous);
                      setIsEditing(true);
                    }}
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
