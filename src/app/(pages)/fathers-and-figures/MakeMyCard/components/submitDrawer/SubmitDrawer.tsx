'use client'
import React, { useRef, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import StoryCanvasCard from '../cardBackground/StoryCanvasCard'
import { DownloadIcon, SendIcon, Loader, X } from "lucide-react"
import { ProtectedActionDrawer } from '@/components/auth/ProtectedActionDrawer'
import ToggleCanvasButton from '../cardBackground/ToggleCanvasButton'
import { useDownloadImage } from '@/_hooks/useDownloadImage'
import { useMyCardContext } from '../../context/MyCardContext'
import type { PostStoryResponse } from '@/types/stories'
import { Drawer, DrawerTitle, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer'
import { MAX_FATHER_SON_STORY_LENGTH } from '@/lib/constants'

/* ==========================================================================
   Internal Hook (SRP: Business Logic & Validation)
   ========================================================================== */

/**
 * Custom hook to manage the story submission lifecycle and validation.
 */
const useStorySubmission = (onSuccess?: () => void) => {
  const { url, myStory, myName } = useMyCardContext();
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!myStory.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Description is required" });
      return false;
    }
    if (myStory.length > MAX_FATHER_SON_STORY_LENGTH) {
      toast({ variant: "destructive", title: "Error", description: `Story exceeds maximum length of ${MAX_FATHER_SON_STORY_LENGTH} characters` });
      return false;
    }
    return true;
  };

  const submit = async (closeDrawer: () => void) => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/father-son-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storyText: myStory, signature: myName, backgroundUrl: url }),
      });

      const data: PostStoryResponse = await response.json();

      if (data.success) {
        closeDrawer();
        toast({ title: "Success!", description: "Your story has been submitted successfully." });
        onSuccess?.();
      } else {
        toast({ variant: "destructive", title: "Submission failed", description: data.error || "An unexpected error occurred." });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to connect to the server." });
    } finally {
      setSubmitting(false);
    }
  };

  return { submit, submitting, isStoryEmpty: !myStory.trim() };
};

/* ==========================================================================
   Main Component
   ========================================================================== */

const SubmitDrawer = ({
  artCanvasRef,
  onSuccess
}: {
  artCanvasRef: React.RefObject<HTMLDivElement | null>,
  onSuccess?: () => void
}) => {
  const storyCardRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false)
  
  const { downloadImage, loading: downloadLoading } = useDownloadImage({ downloadRef: storyCardRef })
  const { submit, submitting, isStoryEmpty } = useStorySubmission(onSuccess);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className='w-full button-style gradient-button hover:brightness-150 hover:tracking-wider h-full m-auto text-sm'>
          Submit a story
        </button>
      </DrawerTrigger>
      
      <DrawerContent className='backdrop-blur-sm p-2 items-center justify-center'>
        <DrawerTitle className="hidden">Submit Your Story</DrawerTitle>

        <div className='flex flex-col max-w-[60ch] gap-2 sm:p-2 p-2 justify-center items-center w-full'>
          <div className='w-full items-center justify-center'>
            <StoryCanvasCard ref={storyCardRef} />
          </div>

          <div className='flex flex-col gap-2 justify-center items-center w-full'>
            <div className='flex sm:flex-row flex-col w-full gap-2 text-xs justify-between'>
              <ToggleCanvasButton artCanvasRef={artCanvasRef} />

              <button
                className='flex-1 flex items-center justify-center gap-2 button-style'
                disabled={downloadLoading}
                onClick={downloadImage}
              >
                {downloadLoading ? <><Loader className='animate-spin h-4 w-4' /> Downloading...</> : <><DownloadIcon className="h-4 w-4" />Download</>}
              </button>

              <ProtectedActionDrawer mode="action" description='An small verify to keep stories human'>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 button-style ${submitting || isStoryEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={submitting || isStoryEmpty}
                  onClick={() => submit(() => closeRef.current?.click())}
                >
                  {submitting ? <><Loader className='animate-spin h-4 w-4' /> Submitting...</> : <><SendIcon className="h-4 w-4" />Submit</>}
                </button>
              </ProtectedActionDrawer>
            </div>
          </div>

          <DrawerClose asChild>
            <button className='absolute top-2 right-2 p-1 rounded-full card-border hover:bg-[var(--primary-blue)] hover:text-white transition-colors duration-200'>
              <X className='h-3 w-3' />
            </button>
          </DrawerClose>

          {/* Hidden button for programmatic closing */}
          <DrawerClose asChild>
            <button ref={closeRef} className='hidden' />
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default SubmitDrawer
