import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DocumentaryGallery } from "./DocumentaryGallery";

const routeStateMock = vi.fn();
const controllerMock = vi.fn();

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

vi.mock("./useGalleryRouteState", () => ({
  useGalleryRouteState: () => routeStateMock(),
}));

vi.mock("./useDocumentaryGalleryController", () => ({
  useDocumentaryGalleryController: (args: unknown) => controllerMock(args),
}));

vi.mock("../PreviewImage", () => ({
  PreviewImage: ({ image }: { image: { alt: string } }) =>
    React.createElement("div", null, image.alt),
}));

vi.mock("../GalleryControls", () => ({
  GalleryControls: () => React.createElement("div", null, "controls"),
}));

vi.mock("../ThumbnailStrip", () => ({
  ThumbnailStrip: () => React.createElement("div", null, "thumbnails"),
}));

vi.mock("../ImageModal/ImageModal", () => ({
  ImageModal: ({ image }: { image: { alt: string } }) =>
    React.createElement("div", null, image.alt),
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children),
  DialogContent: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children),
}));

const images = [
  { filename: "one.jpg", src: "/one.jpg", alt: "One", year: "2024" },
  { filename: "two.jpg", src: "/two.jpg", alt: "Two", year: "2025" },
];

function buildControllerState(overrides: Record<string, unknown> = {}) {
  return {
    currentIndex: 0,
    currentImage: images[0],
    direction: 0,
    isDialogOpen: false,
    isSlideShowPlaying: true,
    modalImage: null,
    modalPhase: "closed",
    shouldRenderModalContent: false,
    canInteractWithGallery: true,
    openImage: vi.fn(),
    requestClose: vi.fn(),
    completeClose: vi.fn(),
    goNext: vi.fn(),
    goPrev: vi.fn(),
    goNextInModal: vi.fn(),
    goPrevInModal: vi.fn(),
    selectIndex: vi.fn(),
    toggleSlideShow: vi.fn(),
    ...overrides,
  };
}

describe("DocumentaryGallery keyboard behavior", () => {
  beforeEach(() => {
    routeStateMock.mockReset();
    controllerMock.mockReset();

    routeStateMock.mockReturnValue({
      selectedImageId: null,
      setSelectedImageId: vi.fn(),
    });
  });

  it("uses modal navigation when arrow keys are pressed with the dialog open", () => {
    const controllerState = buildControllerState({
      isDialogOpen: true,
      modalImage: images[0],
      modalPhase: "open",
      shouldRenderModalContent: true,
      canInteractWithGallery: false,
    });
    controllerMock.mockReturnValue(controllerState);

    render(React.createElement(DocumentaryGallery, { images }));

    fireEvent.keyDown(window, { key: "ArrowRight" });
    fireEvent.keyDown(window, { key: "ArrowLeft" });

    expect(controllerState.goNextInModal).toHaveBeenCalledTimes(1);
    expect(controllerState.goPrevInModal).toHaveBeenCalledTimes(1);
    expect(controllerState.goNext).not.toHaveBeenCalled();
    expect(controllerState.goPrev).not.toHaveBeenCalled();
  });

  it("uses gallery navigation when arrow keys are pressed with the dialog closed", () => {
    const controllerState = buildControllerState();
    controllerMock.mockReturnValue(controllerState);

    render(React.createElement(DocumentaryGallery, { images }));

    fireEvent.keyDown(window, { key: "ArrowRight" });
    fireEvent.keyDown(window, { key: "ArrowLeft" });

    expect(controllerState.goNext).toHaveBeenCalledTimes(1);
    expect(controllerState.goPrev).toHaveBeenCalledTimes(1);
    expect(controllerState.goNextInModal).not.toHaveBeenCalled();
    expect(controllerState.goPrevInModal).not.toHaveBeenCalled();
  });
});
