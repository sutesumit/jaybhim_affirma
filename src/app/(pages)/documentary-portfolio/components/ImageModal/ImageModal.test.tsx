import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ImageModal } from "./ImageModal";

const toastMock = vi.fn();
const imageLikeButtonMock = vi.fn();

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) =>
      React.createElement("div", props, children),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) =>
      React.createElement("span", props, children),
  },
}));

vi.mock("@/hooks", () => ({
  randomInRange: () => 0,
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: toastMock,
  }),
}));

vi.mock("@/components/ui/dialog", () => ({
  DialogHeader: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children),
  DialogFooter: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children),
  DialogTitle: ({ children }: { children: React.ReactNode }) =>
    React.createElement("h2", null, children),
}));

vi.mock("@/components/features/likes", () => ({
  ImageLikeButton: (props: { pathName: string }) => {
    imageLikeButtonMock(props);
    return React.createElement("button", { type: "button" }, "Like image");
  },
}));

vi.mock("../GalleryImageViewport", () => ({
  GalleryImageViewport: ({ image }: { image: { alt: string } }) =>
    React.createElement("div", null, image.alt),
}));

describe("ImageModal", () => {
  beforeEach(() => {
    toastMock.mockReset();
    imageLikeButtonMock.mockReset();
    vi.restoreAllMocks();
  });

  it("shows a coming soon toast when print CTA is clicked", async () => {
    const user = userEvent.setup();

    render(
      React.createElement(ImageModal, {
        image: {
          filename: "photo-1.jpg",
          src: "/photo-1.jpg",
          alt: "Photo 1",
          caption: "Caption",
          year: "2024",
        },
      })
    );

    await user.click(screen.getByRole("button", { name: "Buy photo" }));

    expect(toastMock).toHaveBeenCalledWith({
      variant: "default",
      title: "Coming Soon",
      description: "We are working on print orders for this gallery. Check back soon.",
    });
  });

  it("passes an image-specific like path and label to the like control", () => {
    render(
      React.createElement(ImageModal, {
        image: {
          filename: "photo 1.jpg",
          src: "/photo-1.jpg",
          alt: "Photo 1",
          caption: "Caption",
          year: "2024",
        },
      })
    );

    expect(imageLikeButtonMock).toHaveBeenCalledWith({
      pathName: "/documentary-portfolio?image=photo%201.jpg",
    });
  });

  it("copies the current URL and shows success feedback when share is clicked", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(window, "location", {
      configurable: true,
      value: { href: "https://example.com/documentary-portfolio?image=photo-1.jpg" },
    });
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      React.createElement(ImageModal, {
        image: {
          filename: "photo-1.jpg",
          src: "/photo-1.jpg",
          alt: "Photo 1",
          caption: "Caption",
          year: "2024",
        },
      })
    );

    const shareButtons = screen.getAllByRole("button", { name: "Share this image" });

    await user.click(shareButtons[shareButtons.length - 1]);

    expect(writeText).toHaveBeenCalledWith(
      "https://example.com/documentary-portfolio?image=photo-1.jpg"
    );
    expect(toastMock).toHaveBeenCalledWith({
      variant: "success",
      title: "Link Copied",
      description: "The link is with you now. Pass it along.",
    });
  });
});
