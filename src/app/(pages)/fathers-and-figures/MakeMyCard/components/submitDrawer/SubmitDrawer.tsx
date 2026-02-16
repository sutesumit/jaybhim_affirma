// 'use client'
import React from 'react'
import { toast } from '@/hooks/use-toast'
import StoryCanvasCard from '../cardBackground/StoryCanvasCard'
import { DownloadIcon, SendIcon, Loader, X } from "lucide-react"
import { ProtectedActionDrawer } from '@/components/auth/ProtectedActionDrawer'
import ToggleCanvasButton from '../cardBackground/ToggleCanvasButton'
import { useDownloadImage } from '@/_hooks/useDownloadImage'
import { useRef, useState } from "react"
import { useMyCardContext } from '../../context/MyCardContext'
import type { PostStoryResponse } from '@/types/stories'
import { Drawer, DrawerTitle, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer'
import { MAX_FATHER_SON_STORY_LENGTH } from '@/lib/constants'



const SubmitDrawer = ({
  artCanvasRef,
  onSuccess
}: {
  artCanvasRef: React.RefObject<HTMLDivElement | null>,
  onSuccess?: () => void
}) => {

  const { url, myStory, myName } = useMyCardContext();
  const storyCardRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null);
  const { downloadImage, loading: downloadLoading } = useDownloadImage({ downloadRef: storyCardRef })
  const [submitting, setSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async () => {
    if (!myStory.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Description is required",
      });
      return;
    }

    if (myStory.length > MAX_FATHER_SON_STORY_LENGTH) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Story exceeds maximum length of ${MAX_FATHER_SON_STORY_LENGTH} characters`,
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/father-son-stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storyText: myStory,
          signature: myName,
          backgroundUrl: url,
        }),
      });

      const data: PostStoryResponse = await response.json();

      if (data.success) {
        // Close the drawer automatically first for immediate feedback
        closeRef.current?.click();

        toast({
          title: "Success!",
          description: "Your story has been submitted successfully.",
        });
        onSuccess?.();
      } else {
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: data.error || "An unexpected error occurred.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to the server.",
      });
    } finally {
      setSubmitting(false);
    }
  }


  return (
    // Replace ProtectedActionDrawer with regular Drawer
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className='w-full button-style gradient-button hover:brightness-150 hover:tracking-wider h-full m-auto text-sm'>
          Submit a story
        </button>
      </DrawerTrigger>
      <DrawerContent className='backdrop-blur-sm p-2 items-center justify-center'>
        <DrawerTitle className="hidden">Submit Your Story</DrawerTitle>

        {/* Show story canvas and controls to everyone */}
        <div className='flex flex-col max-w-[60ch] gap-2 sm:p-2 p-2 justify-center items-center w-full'>
            <div className='w-full items-center justify-center'>
              <StoryCanvasCard ref={storyCardRef} />
            </div>
          <div className='flex flex-col gap-2 justify-center items-center w-full'>
            <div className='flex sm:flex-row flex-col w-full gap-2 text-xs justify-between'>
              <ToggleCanvasButton artCanvasRef={artCanvasRef} />

              {/* Download button - no auth needed */}
              <button
                className='flex-1 flex items-center justify-center gap-2 button-style'
                disabled={downloadLoading}
                onClick={downloadImage}
              >
                {downloadLoading ? <><Loader className='animate-spin h-4 w-4' /> Downloading...</> : <><DownloadIcon className="h-4 w-4" />Download</>}
              </button>

              {/* Submit button - wrapped with auth protection */}
              <ProtectedActionDrawer
                mode="action"
                description='An small verify to keep stories human'
              >
                <button
                  className={`flex-1 flex items-center justify-center gap-2 button-style ${submitting || !myStory.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={submitting || !myStory.trim()}
                  onClick={handleSubmit}
                >
                  {submitting ? (
                    <><Loader className='animate-spin h-4 w-4' /> Submitting...</>
                  ) : (
                    <><SendIcon className="h-4 w-4" />Submit</>
                  )}
                </button>
              </ProtectedActionDrawer>
            </div>
          </div>


          {/* Visible close button */}
          <DrawerClose asChild>
            <button className='absolute top-2 right-2 p-1 rounded-full card-border hover:bg-[var(--primary-blue)] hover:text-white transition-colors duration-200'>
              <X className='h-3 w-3' />
            </button>
          </DrawerClose>

          {/* Hidden close button for programmatic closing */}
          <DrawerClose asChild>
            <button ref={closeRef} className='hidden' />
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>

  )
}

export default SubmitDrawer
