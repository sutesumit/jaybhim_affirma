/**
 * Comment type definitions
 */

export interface Comment {
  id: string;
  page_path: string;
  user_id: string;
  comment_text: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  is_anonymous: boolean;
  // Joined user data (optional)
  user?: {
    phone?: string | null;
    email?: string | null;
    display_name?: string | null;
  };
}

export interface CommentVersion {
  id: string;
  comment_id: string;
  comment_text: string;
  version_number: number;
  created_at: string;
}

export interface PostCommentRequest {
  pagePath: string;
  commentText: string;
  isAnonymous?: boolean;
}

export interface UpdateCommentRequest {
  commentText: string;
}

export interface PostCommentResponse {
  success: boolean;
  comment?: Comment;
  error?: string;
}

export interface GetCommentsResponse {
  success: boolean;
  comments?: Comment[];
  error?: string;
}

export interface DeleteCommentResponse {
  success: boolean;
  error?: string;
}
