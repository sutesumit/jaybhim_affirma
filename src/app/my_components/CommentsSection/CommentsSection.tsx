"use client";
import React from "react";
import { RotateCw, AlertCircle } from "lucide-react";
import { useAuthContext } from "@/auth/useAuthContext";
import { useComments } from "./hooks/useComments";
import { CommentInput } from "./CommentInput";
import { CommentsList } from "./CommentsList";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import Gradient1 from "../gradients/Gradient1";

interface CommentsSectionProps {
  pagePath: string;
  mode?: "overlay" | "standalone";
}

function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
}) {
  return condition ? wrapper(children) : <>{children}</>;
}

export function CommentsSection({
  pagePath,
  mode,
}: CommentsSectionProps) {
  const { user } = useAuthContext();

  const {
    comments,
    isFetching,
    isSubmitting,
    error,
    fetchComments,
    handlePostComment,
    handleEditComment,
    // Delete with confirmation
    requestDeleteComment,
    confirmDeleteComment,
    cancelDeleteComment,
    deleteDialogOpen,
    isDeleting,
  } = useComments(pagePath);

  const content = (
    <div className="z-10 max-h-[60vh] h-full flex flex-col overflow-y-auto overflow-x-hidden scroll-smooth font-rajdhani pr-1 antialiased custom-scrollbar">
      {/* Interaction Header */}
      <div className="flex gap-1 items-center justify-between bg-transparent z-10 py-1">
        <button className="button-style text-xs font-medium tracking-[0.2em] uppercase px-2 py-1 pointer-events-auto">
          Common Ground
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
      <CommentInput mode={mode} onPost={handlePostComment} isSubmitting={isSubmitting} />

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-[11px] bg-red-400/10 p-2 rounded-sm mb-2">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}

      <CommentsList
        comments={comments}
        isFetching={isFetching}
        currentUser={user}
        onDelete={requestDeleteComment}
        onEdit={handleEditComment}
        mode={mode}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => !open && cancelDeleteComment()}
        title="Delete Comment"
        description="Sure? Once it’s gone, it’s between you and your memory."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={confirmDeleteComment}
        onCancel={cancelDeleteComment}
        isLoading={isDeleting}
      />
    </div>
  );

  return (
    <ConditionalWrapper
      condition={mode === "standalone"}
      wrapper={(children) => (
        <Gradient1
          hoverOn
          className="w-full max-w-2xl min-h-64 my-4 p-4 glass-hover card-shadow card-bg rounded-sm"
        >
          {children}
        </Gradient1>
      )}
    >
      {content}
    </ConditionalWrapper>
  );
}

