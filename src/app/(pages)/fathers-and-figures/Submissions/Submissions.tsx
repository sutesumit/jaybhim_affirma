"use client";
import React, { useState, useMemo } from "react";
import { RotateCw, AlertCircle } from "lucide-react";
import { useStories } from "./hooks/useStories";
import { SubmissionCard } from "./components/SubmissionCard";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import ProjectedActionDrawer from "@/components/auth/ProtectedActionDrawer";
import Carousel from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";
import SubmitStoryButton from "../MakeMyCard/components/inputStory/SubmitStoryButton";
import InstructionReel from "../MakeMyCard/components/InstructionReel";



interface SubmissionsProps {
    artCanvasRef: React.RefObject<HTMLDivElement | null>
}

const Submissions = ({ artCanvasRef }: SubmissionsProps) => {


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

  // Find user's own story from the list
  const userStory = useMemo(() => stories.find(s => s.is_own), [stories]);
  
  // Track which story is being edited (if any)
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);

  const handleToggleEdit = (id: string, isEditing: boolean) => {
    if (isEditing) {
      setEditingStoryId(id);
    } else if (editingStoryId === id) {
      setEditingStoryId(null);
    }
  };

  return (
    <div className="relative w-full">
    <InstructionReel />
    <div className="py-1 relative w-full text-container">
      
      {/* <SubmitStoryButton artCanvasRef={artCanvasRef} /> */}
      {/* Header with Refresh Button */}
      <div className="flex h-full gap-1 items-center justify-between py-2">
        <SubmitStoryButton 
          artCanvasRef={artCanvasRef} 
          userStory={userStory}
          onEditStart={(id) => setEditingStoryId(id)}
        />
        {/* <ProjectedActionDrawer>
        <button 
          onClick={handleCreateStory}
          className="flex-1 button-style text-center text-xs font-medium tracking-[0.2em] uppercase px-2 py-1 pointer-events-autos"
        >
          {stories.length} {stories.length === 1 ? "story" : "stories"} shared
        </button>
        </ProjectedActionDrawer> */}
        <button
          onClick={fetchStories}
          disabled={isFetching}
          title="Refresh Stories"
          className="w-fit px-2 py-2 h-full button-style text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
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
        <div className="flex flex-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full justify-center items-center py-10">
          <div className="loader2"></div>
        </div>
      )}

      {/* Stories List */}
      <div className="w-full h-[400px]">
        {stories.length > 0 ? (
          <Carousel 
            containerClassName="w-full h-full"
            slideClassName="w-full h-full"
          >
            {stories.map((story) => (
              <div key={story.id} className="w-full h-full flex justify-center items-center">
                <SubmissionCard
                  story={story}
                  onDelete={requestDeleteStory}
                  onEdit={handleEditStory}
                  isEditing={editingStoryId === story.id}
                  onToggleEdit={(isEditing) => handleToggleEdit(story.id, isEditing)}
                />
              </div>
            ))}
          </Carousel>
        ) : null}
      </div>

      {/* Empty State */}
      {!isFetching && stories.length === 0 && !error && (
        <div className="text-center font-rajdhani py-10 opacity-50">
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
    </div>
  );
};

export default Submissions;
