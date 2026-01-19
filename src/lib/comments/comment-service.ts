import { 
  Comment, 
  PostCommentResponse, 
  GetCommentsResponse, 
  DeleteCommentResponse,
  PostCommentRequest,
  UpdateCommentRequest
} from "@/types/comments";

export class CommentService {
  /**
   * Fetches all active comments for a specific page
   */
  static async getComments(pagePath: string): Promise<GetCommentsResponse> {
    try {
      const response = await fetch(`/api/comments?pagePath=${encodeURIComponent(pagePath)}`);
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || "Failed to fetch comments" };
      }
      
      return data;
    } catch (error) {
      console.error("CommentService.getComments error:", error);
      return { success: false, error: "Network error occurred" };
    }
  }

  /**
   * Posts a new comment to a page
   */
  static async postComment(pagePath: string, commentText: string): Promise<PostCommentResponse> {
    try {
      const body: PostCommentRequest = { pagePath, commentText };
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || "Failed to post comment" };
      }
      
      return data;
    } catch (error) {
      console.error("CommentService.postComment error:", error);
      return { success: false, error: "Network error occurred" };
    }
  }

  /**
   * Updates an existing comment
   */
  static async updateComment(commentId: string, commentText: string): Promise<PostCommentResponse> {
    try {
      const body: UpdateCommentRequest = { commentText };
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || "Failed to update comment" };
      }
      
      return data;
    } catch (error) {
      console.error("CommentService.updateComment error:", error);
      return { success: false, error: "Network error occurred" };
    }
  }

  /**
   * Soft deletes a comment
   */
  static async deleteComment(commentId: string): Promise<DeleteCommentResponse> {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || "Failed to delete comment" };
      }
      
      return data;
    } catch (error) {
      console.error("CommentService.deleteComment error:", error);
      return { success: false, error: "Network error occurred" };
    }
  }

  /**
   * Formats a UTC timestamp into a readable relative string
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
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  /**
   * Extracts a display name from user auth data
   */
  static formatAuthorName(user: { phone?: string | null; email?: string | null } | undefined): string {
    if (!user) return "Anonymous";
    
    if (user.phone) {
      // Mask phone number for privacy: +91******1234
      const p = user.phone;
      if (p.length > 7) {
        return `${p.substring(0, 3)}****${p.substring(p.length - 4)}`;
      }
      return p;
    }
    
    if (user.email) {
      // Mask email: s***e@gmail.com
      const [local, domain] = user.email.split("@");
      if (local.length > 2) {
        return `${local[0]}***${local[local.length - 1]}@${domain}`;
      }
      return user.email;
    }
    
    return "User";
  }
}
