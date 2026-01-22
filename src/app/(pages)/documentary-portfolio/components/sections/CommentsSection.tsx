import React from "react";
import { CommentsSection } from "@/app/my_components/CommentsSection/CommentsSection";

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
