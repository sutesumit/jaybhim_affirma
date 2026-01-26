import { 
  ToggleLikeResponse, 
  GetLikesResponse 
} from "@/types/likes";

export class LikeService {
  /**
   * Fetches like count and user's like status for a specific page
   */
  static async getLikes(pagePath: string): Promise<GetLikesResponse> {
    try {
      const response = await fetch(`/api/likes?pagePath=${encodeURIComponent(pagePath)}`);
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || "Failed to fetch likes" };
      }
      
      return data;
    } catch (error) {
      console.error("LikeService.getLikes error:", error);
      return { success: false, error: "Network error occurred" };
    }
  }

  /**
   * Toggles like status for a page (like if not liked, unlike if liked)
   */
  static async toggleLike(pagePath: string): Promise<ToggleLikeResponse> {
    try {
      const body = { pagePath };
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || "Failed to toggle like" };
      }
      
      return data;
    } catch (error) {
      console.error("LikeService.toggleLike error:", error);
      return { success: false, error: "Network error occurred" };
    }
  }
}
