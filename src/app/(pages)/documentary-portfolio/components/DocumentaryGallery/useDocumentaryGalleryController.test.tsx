import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDocumentaryGalleryController } from "./useDocumentaryGalleryController";

const images = [
  { filename: "one.jpg", src: "/one.jpg", alt: "One", year: "2024" },
  { filename: "two.jpg", src: "/two.jpg", alt: "Two", year: "2025" },
];

describe("useDocumentaryGalleryController", () => {
  it("opens from an initial valid route image id", () => {
    const setRouteImageId = vi.fn();

    const { result } = renderHook(() =>
      useDocumentaryGalleryController({
        images,
        slideShowInterval: 5_000,
        routeImageId: "two.jpg",
        setRouteImageId,
      })
    );

    expect(result.current.isDialogOpen).toBe(true);
    expect(result.current.modalImage?.filename).toBe("two.jpg");
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.isSlideShowPlaying).toBe(false);
    expect(setRouteImageId).not.toHaveBeenCalled();
  });

  it("switches modal images when route image id changes while open", () => {
    const setRouteImageId = vi.fn();

    const { result, rerender } = renderHook(
      ({ routeImageId }) =>
        useDocumentaryGalleryController({
          images,
          slideShowInterval: 5_000,
          routeImageId,
          setRouteImageId,
        }),
      {
        initialProps: {
          routeImageId: "one.jpg" as string | null,
        },
      }
    );

    expect(result.current.isDialogOpen).toBe(true);
    expect(result.current.modalImage?.filename).toBe("one.jpg");

    rerender({ routeImageId: "two.jpg" });

    expect(result.current.isDialogOpen).toBe(true);
    expect(result.current.modalImage?.filename).toBe("two.jpg");
    expect(result.current.currentIndex).toBe(1);
  });

  it("clears an invalid route image id", async () => {
    const setRouteImageId = vi.fn();

    const { result } = renderHook(() =>
      useDocumentaryGalleryController({
        images,
        slideShowInterval: 5_000,
        routeImageId: "missing.jpg",
        setRouteImageId,
      })
    );

    expect(result.current.isDialogOpen).toBe(false);
    expect(result.current.modalImage).toBeNull();

    await waitFor(() => {
      expect(setRouteImageId).toHaveBeenCalledWith(null);
    });
  });

  it("keeps the modal open while route state catches up after opening an image", async () => {
    const setRouteImageId = vi.fn();
    const { result, rerender } = renderHook(
      ({ routeImageId }) =>
        useDocumentaryGalleryController({
          images,
          slideShowInterval: 5_000,
          routeImageId,
          setRouteImageId,
        }),
      {
        initialProps: {
          routeImageId: null as string | null,
        },
      }
    );

    act(() => {
      result.current.openImage(images[1]);
    });

    expect(result.current.isDialogOpen).toBe(true);
    expect(result.current.modalImage?.filename).toBe("two.jpg");

    await waitFor(() => {
      expect(setRouteImageId).toHaveBeenCalledWith("two.jpg");
    });

    rerender({ routeImageId: "two.jpg" });

    expect(result.current.isDialogOpen).toBe(true);
    expect(result.current.modalImage?.filename).toBe("two.jpg");
  });

  describe("close flow", () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("transitions through closing → closed and restores slideshow state", () => {
      const setRouteImageId = vi.fn();

      const { result } = renderHook(() =>
        useDocumentaryGalleryController({
          images,
          slideShowInterval: 5_000,
          routeImageId: null,
          setRouteImageId,
        })
      );

      // Start with slideshow playing (default)
      expect(result.current.isSlideShowPlaying).toBe(true);

      // Open an image — slideshow pauses
      act(() => {
        result.current.openImage(images[0]);
      });

      expect(result.current.isDialogOpen).toBe(true);
      expect(result.current.isSlideShowPlaying).toBe(false);

      // Request close — enters "closing"
      act(() => {
        result.current.requestClose();
      });

      expect(result.current.modalPhase).toBe("closing");
      expect(result.current.isDialogOpen).toBe(false);
      expect(result.current.shouldRenderModalContent).toBe(true); // still rendered during animation

      // Complete close — transitions to "closed" and restores slideshow
      act(() => {
        result.current.completeClose();
      });

      expect(result.current.modalPhase).toBe("closed");
      expect(result.current.isDialogOpen).toBe(false);
      expect(result.current.shouldRenderModalContent).toBe(false);
      expect(result.current.isSlideShowPlaying).toBe(true); // restored
    });

    it("preserves paused slideshow when modal closes after slideshow was already paused", () => {
      const setRouteImageId = vi.fn();

      const { result } = renderHook(() =>
        useDocumentaryGalleryController({
          images,
          slideShowInterval: 5_000,
          routeImageId: null,
          setRouteImageId,
        })
      );

      // Pause slideshow first
      act(() => {
        result.current.toggleSlideShow();
      });

      expect(result.current.isSlideShowPlaying).toBe(false);

      // Open modal
      act(() => {
        result.current.openImage(images[0]);
      });

      // Close it
      act(() => {
        result.current.requestClose();
      });

      act(() => {
        result.current.completeClose();
      });

      // Slideshow should still be paused after close
      expect(result.current.isSlideShowPlaying).toBe(false);
    });

    it("does not clear the URL during the closing phase", () => {
      const setRouteImageId = vi.fn();

      const { result, rerender } = renderHook(
        ({ routeImageId }) =>
          useDocumentaryGalleryController({
            images,
            slideShowInterval: 5_000,
            routeImageId,
            setRouteImageId,
          }),
        { initialProps: { routeImageId: null as string | null } }
      );

      // Open modal → URL gets set
      act(() => {
        result.current.openImage(images[0]);
      });

      setRouteImageId.mockClear();
      rerender({ routeImageId: "one.jpg" });
      setRouteImageId.mockClear();

      // Request close — URL should NOT be cleared during "closing"
      act(() => {
        result.current.requestClose();
      });

      expect(result.current.modalPhase).toBe("closing");
      expect(setRouteImageId).not.toHaveBeenCalled();

      // Complete close — NOW the URL should be cleared
      act(() => {
        result.current.completeClose();
      });

      expect(result.current.modalPhase).toBe("closed");
      expect(setRouteImageId).toHaveBeenCalledWith(null);
    });

    it("allows reopening a different image during the closing phase", () => {
      const setRouteImageId = vi.fn();

      const { result } = renderHook(() =>
        useDocumentaryGalleryController({
          images,
          slideShowInterval: 5_000,
          routeImageId: null,
          setRouteImageId,
        })
      );

      // Open image 0
      act(() => {
        result.current.openImage(images[0]);
      });

      // Start closing
      act(() => {
        result.current.requestClose();
      });

      expect(result.current.modalPhase).toBe("closing");

      // Open a different image before close completes
      act(() => {
        result.current.openImage(images[1]);
      });

      // Should be back to "open" with the new image
      expect(result.current.modalPhase).toBe("open");
      expect(result.current.isDialogOpen).toBe(true);
      expect(result.current.modalImage?.filename).toBe("two.jpg");

      act(() => {
        result.current.requestClose();
      });

      act(() => {
        result.current.completeClose();
      });

      expect(result.current.modalPhase).toBe("closed");
      expect(result.current.isSlideShowPlaying).toBe(true);
    });

    it("preserves paused slideshow when reopening during the closing phase", () => {
      const setRouteImageId = vi.fn();

      const { result } = renderHook(() =>
        useDocumentaryGalleryController({
          images,
          slideShowInterval: 5_000,
          routeImageId: null,
          setRouteImageId,
        })
      );

      act(() => {
        result.current.toggleSlideShow();
      });

      act(() => {
        result.current.openImage(images[0]);
      });

      act(() => {
        result.current.requestClose();
      });

      act(() => {
        result.current.openImage(images[1]);
      });

      act(() => {
        result.current.requestClose();
      });

      act(() => {
        result.current.completeClose();
      });

      expect(result.current.modalPhase).toBe("closed");
      expect(result.current.isSlideShowPlaying).toBe(false);
    });

    it("safety timeout completes close if animation never fires completeClose", () => {
      const setRouteImageId = vi.fn();

      const { result } = renderHook(() =>
        useDocumentaryGalleryController({
          images,
          slideShowInterval: 5_000,
          routeImageId: null,
          setRouteImageId,
        })
      );

      // Open modal
      act(() => {
        result.current.openImage(images[0]);
      });

      // Request close — fires the 700ms safety timeout
      act(() => {
        result.current.requestClose();
      });

      expect(result.current.modalPhase).toBe("closing");

      // Simulate the safety timeout without calling completeClose
      act(() => {
        vi.advanceTimersByTime(700);
      });

      // Should be "closed" even though completeClose was never called explicitly
      expect(result.current.modalPhase).toBe("closed");
      expect(result.current.isDialogOpen).toBe(false);
      expect(result.current.shouldRenderModalContent).toBe(false);
    });
  });
});
