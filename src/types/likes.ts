/**
 * Like type definitions
 */

export interface Like {
  id: string;
  page_path: string;
  user_id: string;
  created_at: string;
}

export interface ToggleLikeRequest {
  pagePath: string;
  intent?: 'like' | 'unlike' | 'toggle';
}

export interface ToggleLikeResponse {
  success: boolean;
  likeCount?: number;
  isLiked?: boolean;
  error?: string;
  code?: string;
}

export interface GetLikesResponse {
  success: boolean;
  likeCount?: number;
  isLiked?: boolean; // Optional - only present if user is authenticated, represents current user's like status
  error?: string;
}
