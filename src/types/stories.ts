/**
 * Story type definitions
 */

export interface FatherSonStory {
  id: string;
  user_id: string;
  story_text: string;
  signature?: string | null;
  background_url?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  // Joined user data (optional)
  user?: {
    phone?: string | null;
    email?: string | null;
    display_name?: string | null;
  };
}

export interface PostStoryRequest {
  storyText: string;
  signature?: string;
  backgroundUrl?: string;
}

export interface PostStoryResponse {
  success: boolean;
  story?: FatherSonStory;
  error?: string;
}

export interface GetStoriesResponse {
  success: boolean;
  stories?: FatherSonStory[];
  error?: string;
}

export interface UpdateStoryRequest {
  storyText: string;
  signature?: string;
}

export interface UpdateStoryResponse {
  success: boolean;
  story?: FatherSonStory;
  error?: string;
}

export interface DeleteStoryResponse {
  success: boolean;
  error?: string;
}
