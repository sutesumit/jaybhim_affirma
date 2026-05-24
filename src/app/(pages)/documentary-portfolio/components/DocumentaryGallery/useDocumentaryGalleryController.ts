"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import type { GalleryImage } from "../../imageList";

type ModalPhase = "closed" | "open" | "closing";

interface DocumentaryGalleryState {
  currentIndex: number;
  direction: number;
  isSlideShowPlaying: boolean;
  modalPhase: ModalPhase;
  selectedImageId: string | null;
  wasSlideShowPlaying: boolean;
}

type DocumentaryGalleryAction =
  | { type: "OPEN"; imageId: string; index: number }
  | { type: "REQUEST_CLOSE" }
  | { type: "CLOSE_COMPLETE" }
  | { type: "GO_NEXT"; total: number }
  | { type: "GO_PREV"; total: number }
  | { type: "MODAL_NEXT"; total: number; imageId: string }
  | { type: "MODAL_PREV"; total: number; imageId: string }
  | { type: "SELECT_INDEX"; index: number }
  | { type: "TOGGLE_SLIDESHOW" }
  | { type: "SYNC_FROM_ROUTE"; imageId: string | null; index: number | null };

interface ControllerOptions {
  images: GalleryImage[];
  slideShowInterval: number;
  routeImageId: string | null;
  setRouteImageId: (imageId: string | null) => void;
}

function documentaryGalleryReducer(
  state: DocumentaryGalleryState,
  action: DocumentaryGalleryAction
): DocumentaryGalleryState {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        currentIndex: action.index,
        modalPhase: "open",
        selectedImageId: action.imageId,
        wasSlideShowPlaying:
          state.modalPhase === "closed" ? state.isSlideShowPlaying : state.wasSlideShowPlaying,
        isSlideShowPlaying: false,
      };
    case "REQUEST_CLOSE":
      if (state.modalPhase === "closed") {
        return state;
      }

      return {
        ...state,
        modalPhase: "closing",
      };
    case "CLOSE_COMPLETE":
      if (state.modalPhase !== "closing") {
        return state;
      }

      return {
        ...state,
        modalPhase: "closed",
        selectedImageId: null,
        isSlideShowPlaying: state.wasSlideShowPlaying,
      };
    case "GO_NEXT":
      return {
        ...state,
        direction: 1,
        currentIndex: state.currentIndex === action.total - 1 ? 0 : state.currentIndex + 1,
      };
    case "GO_PREV":
      return {
        ...state,
        direction: -1,
        currentIndex: state.currentIndex === 0 ? action.total - 1 : state.currentIndex - 1,
      };
    case "MODAL_NEXT":
      return {
        ...state,
        direction: 1,
        currentIndex: state.currentIndex === action.total - 1 ? 0 : state.currentIndex + 1,
        selectedImageId: action.imageId,
      };
    case "MODAL_PREV":
      return {
        ...state,
        direction: -1,
        currentIndex: state.currentIndex === 0 ? action.total - 1 : state.currentIndex - 1,
        selectedImageId: action.imageId,
      };
    case "SELECT_INDEX":
      return {
        ...state,
        currentIndex: action.index,
      };
    case "TOGGLE_SLIDESHOW":
      return {
        ...state,
        isSlideShowPlaying: !state.isSlideShowPlaying,
      };
    case "SYNC_FROM_ROUTE":
      if (action.imageId === null) {
        if (state.modalPhase === "open") {
          return {
            ...state,
            modalPhase: "closing",
          };
        }

        return state;
      }

      if (action.index === null || state.modalPhase === "closing") {
        return state;
      }

      if (
        state.currentIndex === action.index &&
        state.selectedImageId === action.imageId &&
        state.modalPhase === "open"
      ) {
        return state;
      }

      return {
        ...state,
        currentIndex: action.index,
        modalPhase: "open",
        selectedImageId: action.imageId,
        wasSlideShowPlaying:
          state.modalPhase === "closed" ? state.isSlideShowPlaying : state.wasSlideShowPlaying,
        isSlideShowPlaying: false,
      };
    default:
      return state;
  }
}

function getInitialState(): DocumentaryGalleryState {
  return {
    currentIndex: 0,
    direction: 0,
    isSlideShowPlaying: true,
    modalPhase: "closed",
    selectedImageId: null,
    wasSlideShowPlaying: true,
  };
}

function getInitialStateFromRoute({
  images,
  routeImageId,
}: Pick<ControllerOptions, "images" | "routeImageId">): DocumentaryGalleryState {
  if (!routeImageId) {
    return getInitialState();
  }

  const routeIndex = images.findIndex((image) => image.filename === routeImageId);
  if (routeIndex === -1) {
    return getInitialState();
  }

  return {
    currentIndex: routeIndex,
    direction: 0,
    isSlideShowPlaying: false,
    modalPhase: "open",
    selectedImageId: routeImageId,
    wasSlideShowPlaying: true,
  };
}

export function useDocumentaryGalleryController({
  images,
  slideShowInterval,
  routeImageId,
  setRouteImageId,
}: ControllerOptions) {
  const imageIndexById = useMemo(
    () => new Map(images.map((image, index) => [image.filename, index])),
    [images]
  );
  const [state, dispatch] = useReducer(
    documentaryGalleryReducer,
    { images, routeImageId },
    getInitialStateFromRoute
  );

  const currentImage = images[state.currentIndex] ?? null;
  const selectedImage =
    state.selectedImageId === null
      ? null
      : images[imageIndexById.get(state.selectedImageId) ?? -1] ?? null;

  const openImage = useCallback((image: GalleryImage) => {
    const index = imageIndexById.get(image.filename);
    if (index === undefined) {
      return;
    }

    dispatch({ type: "OPEN", imageId: image.filename, index });
  }, [imageIndexById]);

  const requestClose = useCallback(() => {
    dispatch({ type: "REQUEST_CLOSE" });
  }, []);

  const completeClose = useCallback(() => {
    dispatch({ type: "CLOSE_COMPLETE" });
  }, []);

  const goNext = useCallback(() => {
    if (images.length === 0) {
      return;
    }

    dispatch({ type: "GO_NEXT", total: images.length });
  }, [images.length]);

  const goPrev = useCallback(() => {
    if (images.length === 0) {
      return;
    }

    dispatch({ type: "GO_PREV", total: images.length });
  }, [images.length]);

  const goNextInModal = useCallback(() => {
    if (images.length === 0 || state.modalPhase !== "open") {
      return;
    }

    const nextIndex = state.currentIndex === images.length - 1 ? 0 : state.currentIndex + 1;
    const nextImage = images[nextIndex];
    if (!nextImage) {
      return;
    }

    dispatch({ type: "MODAL_NEXT", total: images.length, imageId: nextImage.filename });
  }, [images, state.currentIndex, state.modalPhase]);

  const goPrevInModal = useCallback(() => {
    if (images.length === 0 || state.modalPhase !== "open") {
      return;
    }

    const prevIndex = state.currentIndex === 0 ? images.length - 1 : state.currentIndex - 1;
    const prevImage = images[prevIndex];
    if (!prevImage) {
      return;
    }

    dispatch({ type: "MODAL_PREV", total: images.length, imageId: prevImage.filename });
  }, [images, state.currentIndex, state.modalPhase]);

  const selectIndex = useCallback((index: number) => {
    dispatch({ type: "SELECT_INDEX", index });
  }, []);

  const toggleSlideShow = useCallback(() => {
    dispatch({ type: "TOGGLE_SLIDESHOW" });
  }, []);

  useEffect(() => {
    if (!state.isSlideShowPlaying || images.length === 0) {
      return;
    }

    const interval = setInterval(goNext, slideShowInterval);
    return () => clearInterval(interval);
  }, [goNext, images.length, slideShowInterval, state.isSlideShowPlaying]);

  useEffect(() => {
    dispatch({
      type: "SYNC_FROM_ROUTE",
      imageId: routeImageId,
      index: routeImageId ? imageIndexById.get(routeImageId) ?? null : null,
    });
  }, [imageIndexById, routeImageId]);

  // Safety timeout: force-complete close if the Dialog animation end event
  // never fires (e.g., if a mid-animation re-render restarts the exit animation).
  const closeSafetyRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (state.modalPhase !== "closing") {
      if (closeSafetyRef.current !== null) {
        clearTimeout(closeSafetyRef.current);
        closeSafetyRef.current = null;
      }

      return;
    }

    // 700ms matches the longest Dialog exit animation + a small buffer.
    closeSafetyRef.current = setTimeout(() => {
      dispatch({ type: "CLOSE_COMPLETE" });
      closeSafetyRef.current = null;
    }, 700);

    return () => {
      if (closeSafetyRef.current !== null) {
        clearTimeout(closeSafetyRef.current);
        closeSafetyRef.current = null;
      }
    };
  }, [state.modalPhase]);

  // Bidirectional URL sync: push imageId to the route when the modal opens;
  // clear it only after the modal is fully closed.  During the "closing"
  // phase the URL is held as-is so that no route-change effects fire while
  // the Dialog exit animation is in progress.
  useEffect(() => {
    const desiredImageId =
      state.modalPhase === "open"
        ? state.selectedImageId
        : state.modalPhase === "closed"
          ? null
          : routeImageId;

    if (desiredImageId === routeImageId) {
      return;
    }

    setRouteImageId(desiredImageId);
  }, [routeImageId, setRouteImageId, state.modalPhase, state.selectedImageId]);

  return {
    currentIndex: state.currentIndex,
    currentImage,
    direction: state.direction,
    isDialogOpen: state.modalPhase === "open",
    isSlideShowPlaying: state.isSlideShowPlaying,
    modalImage: selectedImage,
    modalPhase: state.modalPhase,
    shouldRenderModalContent: state.modalPhase !== "closed",
    canInteractWithGallery: state.modalPhase === "closed",
    openImage,
    requestClose,
    completeClose,
    goNext,
    goPrev,
    goNextInModal,
    goPrevInModal,
    selectIndex,
    toggleSlideShow,
  };
}
