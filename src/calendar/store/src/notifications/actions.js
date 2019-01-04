import {
  MARK_A_NOTIFICATION_AS_READ,
  BLOCK_A_TYPE_OF_NOTIFICATIONS_BY_USER,
  UPDATE_NOTIFICATIONS
} from "./types";
import { transformNotificationTypeToServiceBlockType } from "./notificationTypesHelper";
import {
  fetchMarkNotificationAsRead,
  fetchNotifications,
  fetchBlockATypeOfNotificationByUser
} from "./service";

function generateMarkANotificationAsReadAction(notificationId) {
  return {
    type: MARK_A_NOTIFICATION_AS_READ,
    payload: notificationId
  };
}

export const acquireMarkANotificationAsRead = ({
  notificationId,
  fin_callback
}) => async dispatch => {
  try {
    await fetchMarkNotificationAsRead(notificationId);
    dispatch(generateMarkANotificationAsReadAction(notificationId));
    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};

function generateBlockATypeOfNotificationsByUser({ notificationType, userId }) {
  return {
    type: BLOCK_A_TYPE_OF_NOTIFICATIONS_BY_USER,
    payload: {
      notificationType,
      userId
    }
  };
}

export const acquireBlockATypeOfNotificationsByUser = ({
  notificationType,
  userId,
  fin_callback
}) => async dispatch => {
  try {
    const type = transformNotificationTypeToServiceBlockType(notificationType);
    await fetchBlockATypeOfNotificationByUser({ type, userId });
    dispatch(
      generateBlockATypeOfNotificationsByUser({ notificationType, userId })
    );
    fin_callback && fin_callback();
  } catch (err) {
    console.error(err);
    fin_callback && fin_callback();
  }
};

export function updateFullPageNotifications({
  data,
  has_more,
  next_page_url,
  total
}) {
  return {
    type: UPDATE_NOTIFICATIONS,
    payload: {
      data,
      has_more,
      next_page_url,
      total,
      updated_time: new Date()
    }
  };
}

export const acquireNotifications = ({
  url,
  per_page,
  fin_callback
}) => async dispatch => {
  try {
    const { total, has_more, next_page_url, data } = await fetchNotifications({
      url,
      per_page
    });

    console.log("data", data);

    dispatch(
      updateFullPageNotifications({ data, has_more, next_page_url, total })
    );

    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
