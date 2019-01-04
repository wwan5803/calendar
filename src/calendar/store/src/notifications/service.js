import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";
import { transformSourceType } from "./notificationTypesHelper";

export async function fetchNotifications({ url, per_page } = {}) {
  try {
    const headers = authHelper.buildAuthHeader();

    per_page = per_page || 16;

    const req = new Request(
      url ? url : apiPrefix + "notifications?per_page=" + per_page,
      {
        method: "get",
        headers
      }
    );

    const res = await fetch(req);

    if (res.status === 200) {
      const result = await res.json();
      const { data, next_page_url, total } = result;
      data &&
        data.forEach(notification => {
          notification.type = transformSourceType(notification.type);
        });
      const has_more = next_page_url ? !!1 : !!0;
      return Promise.resolve({ data, next_page_url, has_more, total });
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function fetchMarkNotificationAsRead(notificationId) {
  try {
    const headers = authHelper.buildAuthHeader();
    const req = new Request(
      apiPrefix + "notifications/read?id=" + notificationId,
      {
        method: "put",
        headers
      }
    );

    const res = await fetch(req);

    if (res.status === 200) {
      return Promise.resolve();
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function fetchBlockATypeOfNotificationByUser({ type, userId }) {
  try {
    const headers = authHelper.buildAuthHeader();
    headers.append("Content-Type", "application/json");
    const req = new Request(apiPrefix + "notifications/block", {
      method: "put",
      headers,
      body: JSON.stringify({
        ids: [userId],
        type
      })
    });

    const res = await fetch(req);

    if (res.status === 200) {
      return Promise.resolve();
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
