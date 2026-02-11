// src/app/(pages)/fathers-and-figures/Submissions/components/SubmissionCard.tsx
// Read-only story card with inline edit capability for authenticated authors
// Pattern: Same as CommentItem in src/app/my_components/CommentsSection/CommentItem.tsx

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X, Check, Dot } from "lucide-react";
import Gradient1 from "@/app/my_components/gradients/Gradient1";
import { useRandomRotation } from "@/_hooks/useRandomRotation";
import { StoryService } from "@/lib/stories/story-service";
import type { FatherSonStory } from "@/types/stories";

interface SubmissionCardProps {
  story: FatherSonStory;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    storyText: string,
    signature?: string
  ) => Promise<{ success: boolean; error?: string }>;
}

export const SubmissionCard = ({
  story,
  onDelete,
  onEdit,
}: SubmissionCardProps) => {
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editStoryText, setEditStoryText] = useState(story.story_text);
  const [editSignature, setEditSignature] = useState(story.signature || "");
  const [isSaving, setIsSaving] = useState(false);

  // Rotation animation (same as StoryCanvasCard)
  const { rotation, setRotation, randomRotation } = useRandomRotation();

  // Check if current user owns this story
  const isOwner = story.is_own;

  /**
   * Save edits to the story
   */
  const handleSave = async () => {
    // Skip if nothing changed
    if (
      editStoryText.trim() === story.story_text &&
      editSignature === (story.signature || "")
    ) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    const result = await onEdit(story.id, editStoryText, editSignature || undefined);
    setIsSaving(false);

    if (result.success) {
      setIsEditing(false);
    }
  };

  /**
   * Cancel editing and reset values
   */
  const handleCancel = () => {
    setEditStoryText(story.story_text);
    setEditSignature(story.signature || "");
    setIsEditing(false);
  };

  return (
    <div
      className="rounded-sm glass-hover p-2 transition-all duration-300 w-full h-full"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 1s ease-in-out",
      }}
      onMouseEnter={() => setRotation(0)}
      onMouseLeave={() => randomRotation()}
    >
      <Gradient1 hoverOn={true} className="relative w-full h-full">
        <div className="group relative card-shadow pb-2 z-10 h-[360px] w-full flex flex-col font-handwriting text-xl submission-card rounded-sm overflow-y-auto scrollbar-thin transition-all duration-300">
          {/* Story Content Area */}
          <div className="flex-1 p-5 pt-10 relative">
            {isEditing ? (
              /* === EDIT MODE: Ghost + Textarea Pattern === */
              <div className="relative w-full h-full">
                {/* Ghost: invisible div that drives the container height */}
                <div
                  className="text-2xl p-1 font-handwriting text-justify invisible pointer-events-none select-none whitespace-pre-wrap"
                  aria-hidden="true"
                >
                  {editStoryText || "\u00a0"}
                </div>

                {/* Actual textarea: absolute positioned over the ghost */}
                <textarea
                  value={editStoryText}
                  onChange={(e) => setEditStoryText(e.target.value)}
                  className="absolute p-1 inset-0 w-full h-full bg-transparent text-2xl font-handwriting text-justify focus:outline-none resize-none card-inner-shadow rounded-sm"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      if (editStoryText.trim().length > 0 && editStoryText.length <= 5000) {
                        handleSave();
                      }
                    }
                    if (e.key === "Escape") {
                      handleCancel();
                    }
                  }}
                />

                {/* Character Counter Overlay */}
                <div 
                  className={`absolute bottom-2 right-2 text-xs font-rajdhani pointer-events-none select-none ${
                    editStoryText.length > 5000 ? 'text-red-500' : 'text-[--primary-blue]'
                  }`}
                >
                  {editStoryText.length}/5000
                </div>
              </div>
            ) : (
              /* === VIEW MODE: Static text === */
              <div className="text-2xl p-1 font-handwriting text-justify whitespace-pre-wrap">
                {story.story_text}
              </div>
            )}
          </div>

          {/* Signature Area */}
          <div className="p-5 pt-0">
            {isEditing ? (
              <div className="relative w-full">
                {/* Ghost: invisible div that drives the container height */}
                <div
                  className="invisble p-1 pointer-events-none uppercase select-none text-xl font-handwriting text-end whitespace-pre-wrap"
                  // className="invisible pointer-events-none select-none text-end uppercase text-xl font-handwriting min-h-[1.5em] whitespace-pre-wrap"
                  aria-hidden="true"
                >
                  {editSignature || "\u00a0"}
                </div>

                {/* Actual textarea: absolute positioned over the ghost */}
                <textarea
                  value={editSignature}
                  onChange={(e) => setEditSignature(e.target.value)}
                  placeholder="Sign your name... (optional)"
                  className="absolute p-1 inset-0 w-full h-full bg-transparent uppercase text-xl font-handwriting text-end focus:outline-none resize-none card-inner-shadow rounded-sm placeholder:text-lg"
                  // className="absolute inset-0 w-full h-full bg-transparent card-inner-shadow text-end uppercase text-xl font-handwriting focus:outline-none resize-none overflow-hidden placeholder:font-rajdhani  placeholder:capitalize"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      if (editStoryText.trim().length > 0 && editStoryText.length <= 5000) {
                        handleSave();
                      }
                    }
                    if (e.key === "Escape") {
                      handleCancel();
                    }
                  }}
                />
              </div>
            ) : (
              story.signature && (
                <p
                  className="text-xl p-1 uppercase font-handwriting text-end whitespace-pre-wrap" 
                  // className="text-end uppercase mb-2 text-xl font-handwriting"
                >
                  — {story.signature}
                </p>
              )
            )}
          </div>

          {/* Timestamp */}
          <motion.div
            layout
            className="absolute bottom-2 left-4 text-xs font-rajdhani text-[--primary-blue] flex items-center"
          >
            {story.updated_at !== story.created_at ? (
              <>
                <Dot className="w-3 h-3" />
                <span>[edited {StoryService.formatTimestamp(story.updated_at)}]</span>
              </>
            ) : (
              <>
                <Dot className="w-3 h-3" />
                <span className="italic opacity-50">Created {StoryService.formatTimestamp(story.created_at)}</span>
              </>
            )}
          </motion.div>

          {/* === ACTION BUTTONS (only visible to owner) === */}
          <div
            className={`absolute top-3 right-5 flex gap-1 ${
              isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          >
            <AnimatePresence mode="popLayout">
              {isEditing ? (
                /* Save/Cancel buttons when editing */
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleSave}
                    disabled={isSaving || !editStoryText.trim() || editStoryText.length > 5000}
                    className="comment-tiny-button"
                    title="Save (Ctrl+Enter)"
                  >
                    {isSaving ? (
                      <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Check className="w-3 h-3" /> 
                    )}
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="comment-tiny-button text-red-500"
                    title="Cancel (Esc)"
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                </div>
              ) : (
                /* Edit/Delete buttons when not editing (only for owner) */
                isOwner && (
                  <div className="flex gap-1">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => {
                        setEditStoryText(story.story_text);
                        setEditSignature(story.signature || "");
                        setIsEditing(true);
                      }}
                      className="comment-tiny-button"
                      title="Edit Story"
                    >
                      <Pencil className="w-3 h-3" />
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => onDelete(story.id)}
                      className="comment-tiny-button text-red-500"
                      title="Delete Story"
                    >
                      <Trash2 className="w-3 h-3" />
                    </motion.button>
                  </div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </Gradient1>
    </div>
  );
};
