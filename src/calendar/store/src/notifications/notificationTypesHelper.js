export const NOTIFICATION_TYPE_FOLLOWED = "NOTIFICATION_TYPE_FOLLOWED";
export const NOTIFICATION_TYPE_INVITED_COMMENT =
  "NOTIFICATION_TYPE_INVITED_COMMENT";
export const NOTIFICATION_TYPE_POST_LIKED = "NOTIFICATION_TYPE_POST_LIKED";
export const NOTIFICATION_TYPE_POST_CREATED = "NOTIFICATION_TYPE_POST_CREATED";
export const NOTIFICATION_TYPE_COMMENT_REPLIED =
  "NOTIFICATION_TYPE_COMMENT_REPLIED";
export const NOTIFICATION_TYPE_POST_COMMENTED =
  "NOTIFICATION_TYPE_POST_COMMENTED";
export const NOTIFICATION_TYPE_POST_UPDATED = "NOTIFICATION_TYPE_POST_UPDATED";
export const NOTIFICATION_TYPE_POST_PICKED = "NOTIFICATION_TYPE_POST_PICKED";
export const NOTIFICATION_TYPE_POST_FAVOURITE =
  "NOTIFICATION_TYPE_POST_FAVOURITE";
export const NOTIFICATION_TYPE_MENTION = "NOTIFICATION_TYPE_MENTION";
export const NOTIFICATION_TYPE_STRATEGY_UPDATED =
  "NOTIFICATION_TYPE_STRATEGY_UPDATED";

const blockTypeRecommend = "recommend";
const blockTypeFollowed = "followed";
const blockTypeInvited_comment = "invited_comment";
const blockTypePost_liked = "post_liked";
const blockTypePost_commented = "post_commented";
const blockTypeComment_replied = "comment_replied";
const blockTypePost_created = "post_created";
const blockTypePost_updated = "post_updated";
const blockTypePost_picked = "post_picked";

export function transformSourceType(sourceType) {
  switch (sourceType) {
    case "App\\Notifications\\Followed":
      return NOTIFICATION_TYPE_FOLLOWED;
    case "App\\Notifications\\PostLiked":
      return NOTIFICATION_TYPE_POST_LIKED;
    case "App\\Notifications\\PostCreated":
      return NOTIFICATION_TYPE_POST_CREATED;
    case "App\\Notifications\\InvitedComment":
      return NOTIFICATION_TYPE_INVITED_COMMENT;
    case "App\\Notifications\\CommentReplied":
      return NOTIFICATION_TYPE_COMMENT_REPLIED;
    case "App\\Notifications\\PostCommented":
      return NOTIFICATION_TYPE_POST_COMMENTED;
    case "App\\Notifications\\PostUpdated":
      return NOTIFICATION_TYPE_POST_UPDATED;
    case "App\\Notifications\\PickedNotification":
      return NOTIFICATION_TYPE_POST_PICKED;
    case "App\\Notifications\\MentionedNotification":
      return NOTIFICATION_TYPE_MENTION;
    case "App\\Notifications\\StrategyUpdatedNotification":
      return NOTIFICATION_TYPE_STRATEGY_UPDATED;
    default:
      return sourceType;
  }
}

export function transformNotificationTypeToServiceBlockType(notificationType) {
  switch (notificationType) {
    case NOTIFICATION_TYPE_FOLLOWED:
      return blockTypeFollowed;
    case NOTIFICATION_TYPE_INVITED_COMMENT:
      return blockTypeInvited_comment;
    case NOTIFICATION_TYPE_POST_LIKED:
      return blockTypePost_liked;
    case NOTIFICATION_TYPE_POST_CREATED:
      return blockTypePost_created;
    case NOTIFICATION_TYPE_COMMENT_REPLIED:
      return blockTypeComment_replied;
    case NOTIFICATION_TYPE_POST_COMMENTED:
      return blockTypePost_commented;
    case NOTIFICATION_TYPE_POST_UPDATED:
      return blockTypePost_updated;
    case NOTIFICATION_TYPE_POST_PICKED:
      return blockTypePost_picked;
    default:
      throw "no such notification block type";
  }
}
