import React from "react";
import { CommentsSection } from "@/components/features/comments";

export function CommentsSectionWrapper() {
  return (
    <>
      <CommentsSection
        pagePath="/documentary-portfolio"
        mode="overlay"
      />
    </>
  );
}
