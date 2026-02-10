// src/lib/stories/story-service.ts
// Client-side service for story CRUD operations
// Pattern: Same as CommentService in src/lib/comments/comment-service.ts

import type {
  FatherSonStory,
  GetStoriesResponse,
  UpdateStoryResponse,
  DeleteStoryResponse,
} from "@/types/stories";

export class StoryService {
  /**
   * Fetches all active stories
   */
  static async getStories(): Promise<GetStoriesResponse> {
    try {
      const response = await fetch("/api/father-son-stories");
      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Failed to fetch stories" };
      }

      return data;
    } catch (error) {
      console.error("StoryService.getStories error:", error);
      return { success: false, error: "Network error occurred" };
    }
  }

  /**
   * Updates an existing story
   */
  static async updateStory(
    storyId: string,
    storyText: string,
    signature?: string
  ): Promise<UpdateStoryResponse> {
    try {
      const response = await fetch(`/api/father-son-stories/${storyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyText, signature }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Failed to update story" };
      }

      return data;
    } catch (error) {
      console.error("StoryService.updateStory error:", error);
      return { success: false, error: "Network error occurred" };
    }
  }

  /**
   * Soft deletes a story
   */
  static async deleteStory(storyId: string): Promise<DeleteStoryResponse> {
    try {
      const response = await fetch(`/api/father-son-stories/${storyId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Failed to delete story" };
      }

      return data;
    } catch (error) {
      console.error("StoryService.deleteStory error:", error);
      return { success: false, error: "Network error occurred" };
    }
  }

  /**
   * Formats a timestamp into a readable relative string
   * Reuses logic from CommentService
   */
  static formatTimestamp(utcTimestamp: string): string {
    const date = new Date(utcTimestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hrs ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
