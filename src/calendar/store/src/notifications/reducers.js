import {
  UPDATE_NOTIFICATIONS,
  MARK_A_NOTIFICATION_AS_READ,
  BLOCK_A_TYPE_OF_NOTIFICATIONS_BY_USER
} from "./types";
import {
  NOTIFICATION_TYPE_FOLLOWED,
  NOTIFICATION_TYPE_INVITED_COMMENT,
  NOTIFICATION_TYPE_POST_CREATED,
  NOTIFICATION_TYPE_POST_UPDATED,
  NOTIFICATION_TYPE_POST_LIKED,
  NOTIFICATION_TYPE_POST_COMMENTED,
  NOTIFICATION_TYPE_COMMENT_REPLIED
} from "./notificationTypesHelper";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../account/types";

function notificationsToMap(list) {
  const result = {};
  list.forEach(notification => (result[notification.id] = notification));
  return result;
}

function filterDuplicateNotifications(notificationList, nextNotificationList) {
  const nextNotificationMap = notificationsToMap(nextNotificationList);

  const result = [];

  notificationList.forEach(notification => {
    const id = notification.id;

    if (nextNotificationMap[id]) {
      result.push(nextNotificationMap[id]);
      nextNotificationMap[id] = undefined;
    } else {
      result.push(notification);
    }
  });

  nextNotificationList.forEach(notification => {
    const id = notification.id;
    if (nextNotificationMap[id]) {
      result.push(nextNotificationMap[id]);
    }
  });

  return result;
}

function readANotificationInState(state, notificationId) {
  const { data, total } = state;
  return {
    ...state,
    data: data.filter(notification => notification.id !== notificationId),
    total: total - 1
  };
}

function blockATypeOfNotificationsOfAUserInState(
  state,
  { notificationType, userId }
) {
  const { data } = state;
  return {
    ...state,
    data: data.filter(notification => {
      const { type } = notification;
      if (type !== notificationType) return !!1;

      let notificationTriggerUserId;

      switch (type) {
        case NOTIFICATION_TYPE_FOLLOWED:
          notificationTriggerUserId = notification.data.id;
          break;
        case NOTIFICATION_TYPE_INVITED_COMMENT:
        case NOTIFICATION_TYPE_POST_CREATED:
          notificationTriggerUserId = notification.data.creator.id;
          break;
        case NOTIFICATION_TYPE_POST_LIKED:
          notificationTriggerUserId = notification.data.liker.id;
          break;
        // todo
        default:
          return !!1;
      }
      return +notificationTriggerUserId !== +userId;
    })
  };
}

function regenerateNotifications(state, nextPayload) {
  const { has_more, next_page_url, updated_time, total } = nextPayload;

  const data = filterDuplicateNotifications(state.data, nextPayload.data);
  data.sort((notificationA, notificationB) => {
    const createdAtA = new Date(notificationA.created_at).getTime();
    const createdAtB = new Date(notificationB.created_at).getTime();
    if (createdAtA < createdAtB) {
      return 1;
    } else if (createdAtA > createdAtB) {
      return -1;
    } else {
      return 0;
    }
  });
  return { has_more, next_page_url, updated_time, data, total };
}

export function notifications(
  state = {
    updated_time: new Date(),
    data: [],
    has_more: false,
    next_page_url: "",
    total: 0
  },
  action
) {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      return regenerateNotifications(state, action.payload);

    case MARK_A_NOTIFICATION_AS_READ:
      return readANotificationInState(state, action.payload);

    case BLOCK_A_TYPE_OF_NOTIFICATIONS_BY_USER:
      return blockATypeOfNotificationsOfAUserInState(state, action.payload);

    case UPDATE_ACCOUNT:
      return action.payload.authenticated
        ? {
            updated_time: new Date(),
            data: [],
            has_more: false,
            next_page_url: "",
            total: 0
          }
        : state;

    case CLEAR_ACCOUNT:
      return {
        updated_time: new Date(),
        data: [],
        has_more: false,
        next_page_url: "",
        total: 0
      };

    default:
      return state;
  }
}
