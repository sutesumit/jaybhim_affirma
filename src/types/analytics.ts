export interface InteractionCounters {
  globalLikeCount: number;
  globalCommentCount: number;
  globalTotal: number;
  myLikeCount: number;
  myCommentCount: number;
  myTotal: number;
}
export interface TopUserStats {
  user_id: string;
  display_name: string;
  total: number;
  updated_at: string;
  is_me: boolean;
}
export interface InteractionAnalyticsData {
  counters: InteractionCounters;
  topUser: TopUserStats | null;
}
export interface GetInteractionAnalyticsResponse {
  success: boolean;
  data?: InteractionCounters;
  error?: string;
}
export interface GetTopUserResponse {
  success: boolean;
  data?: TopUserStats | null;
  error?: string;
}
