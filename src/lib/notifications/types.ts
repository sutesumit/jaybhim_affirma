export type VisitorNotificationPayload = {
  city?: string;
  country?: string;
  region?: string;
  ip?: string;
  deviceType?: string;
  isReturning?: boolean;
  visitCount?: number;
  timestamp?: string;
};

export type LikeNotificationPayload = {
  pagePath: string;
  likeCount: number;
  isLiked: boolean;
  userName: string;
  contact?: string | null;
  ip?: string | null;
};

export type CommentNotificationPayload = {
  pagePath: string;
  commentText: string;
  userName: string;
  contact?: string | null;
  ip?: string | null;
};

export type CommentEditNotificationPayload = {
  pagePath: string;
  oldText: string;
  newText: string;
  userName: string;
  contact?: string | null;
  ip?: string | null;
};

export type CommentDeleteNotificationPayload = {
  pagePath: string;
  commentText: string;
  userName: string;
  contact?: string | null;
  ip?: string | null;
};

export type StoryNotificationPayload = {
  storyId: string;
  storyText: string;
  signature?: string | null;
  userName: string;
  contact?: string | null;
  ip?: string | null;
};

export type StoryEditNotificationPayload = {
  storyId: string;
  oldText: string;
  newText: string;
  userName: string;
  contact?: string | null;
  ip?: string | null;
};

export type StoryDeleteNotificationPayload = {
  storyId: string;
  storyText: string;
  userName: string;
  contact?: string | null;
  ip?: string | null;
};

export type AuthOtpVerifiedPayload = {
  phone: string;
  isNewUser: boolean;
  userName?: string;
  ip?: string | null;
};

export type AuthLogoutPayload = {
  userName: string;
  contact?: string | null;
  ip?: string | null;
};

export interface TelegramNotifier {
  notifyVisitor(
    visitor: VisitorNotificationPayload,
    referrer?: string
  ): Promise<void>;
  notifyLike(like: LikeNotificationPayload): Promise<void>;
  notifyComment(comment: CommentNotificationPayload): Promise<void>;
  notifyCommentEdit(comment: CommentEditNotificationPayload): Promise<void>;
  notifyCommentDelete(comment: CommentDeleteNotificationPayload): Promise<void>;
  notifyStory(story: StoryNotificationPayload): Promise<void>;
  notifyStoryEdit(story: StoryEditNotificationPayload): Promise<void>;
  notifyStoryDelete(story: StoryDeleteNotificationPayload): Promise<void>;
  notifyOtpVerified(auth: AuthOtpVerifiedPayload): Promise<void>;
  notifyLogout(auth: AuthLogoutPayload): Promise<void>;
}

export const noopTelegramNotifier: TelegramNotifier = {
  async notifyVisitor(): Promise<void> {},
  async notifyLike(): Promise<void> {},
  async notifyComment(): Promise<void> {},
  async notifyCommentEdit(): Promise<void> {},
  async notifyCommentDelete(): Promise<void> {},
  async notifyStory(): Promise<void> {},
  async notifyStoryEdit(): Promise<void> {},
  async notifyStoryDelete(): Promise<void> {},
  async notifyOtpVerified(): Promise<void> {},
  async notifyLogout(): Promise<void> {},
};
