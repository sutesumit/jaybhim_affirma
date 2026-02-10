"use client";
import React from "react";
import { RotateCw, AlertCircle } from "lucide-react";
import { useAuthContext } from "@/auth/useAuthContext";
import { useStories } from "./hooks/useStories";
import { SubmissionCard } from "./components/SubmissionCard";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import ProjectedActionDrawer from "@/components/auth/ProtectedActionDrawer";
import { toast } from "@/hooks/use-toast";


const Submissions = () => {
  const { user } = useAuthContext();

  const handleCreateStory = () => {
    toast({
        variant: "default",
        title: "Experiement",
        description: "This is a test toast",
    });
  };

  const {
    stories,
    isFetching,
    error,
    fetchStories,
    handleEditStory,
    // Delete with confirmation
    requestDeleteStory,
    confirmDeleteStory,
    cancelDeleteStory,
    deleteDialogOpen,
    isDeleting,
  } = useStories();

  return (
    <div className="py-1 relative w-full text-container">
      {/* Header with Refresh Button */}
      <div className="flex gap-1 items-center justify-between py-2">
        <ProjectedActionDrawer>
        <button 
          onClick={handleCreateStory}
          className="flex-1 button-style text-center text-xs font-medium tracking-[0.2em] uppercase px-2 py-1 pointer-events-autos"
        >
          {stories.length} {stories.length === 1 ? "story" : "stories"} shared
        </button>
        </ProjectedActionDrawer>
        <button
          onClick={fetchStories}
          disabled={isFetching}
          title="Refresh Stories"
          className="w-fit px-2 py-1.5 button-style text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
        >
          <RotateCw className={`w-3 h-3 ${isFetching ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-[11px] bg-red-400/10 p-2 rounded-sm mb-2">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {isFetching && stories.length === 0 && (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Stories List */}
      <div className="flex flex-col gap-4 w-full">
        {stories.map((story) => (
          <SubmissionCard
            key={story.id}
            story={story}
            currentUser={user}
            onDelete={requestDeleteStory}
            onEdit={handleEditStory}
          />
        ))}
      </div>

      {/* Empty State */}
      {!isFetching && stories.length === 0 && !error && (
        <div className="text-center py-10 opacity-50">
          <p>No stories yet. Be the first to share yours!</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => !open && cancelDeleteStory()}
        title="Delete Story"
        description="Are you sure? This story will be permanently removed."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={confirmDeleteStory}
        onCancel={cancelDeleteStory}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Submissions;
