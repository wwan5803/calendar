import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchFollowUser({ userId }) {
  try {
    const headers = authHelper.buildAuthHeader();
    headers.append("Content-Type", "application/json");

    const req = new Request(apiPrefix + "friends", {
      method: "post",
      headers,
      body: JSON.stringify({
        ids: [userId]
      })
    });

    const res = await fetch(req);
    if (res.status === 200) return Promise.resolve();
    showCommonNetWorkErrorTip(res.status);
    return Promise.reject();
  } catch (err) {
    return Promise.reject();
  }
}

export async function fetchUnFollowUser({ userId }) {
  try {
    const headers = authHelper.buildAuthHeader();

    const req = new Request(apiPrefix + "friends/" + userId, {
      method: "delete",
      headers
    });

    const res = await fetch(req);
    if (res.status === 200) return Promise.resolve();
    showCommonNetWorkErrorTip(res.status);
    return Promise.reject();
  } catch (err) {
    return Promise.reject();
  }
}

export async function fetchAFollowedUser(userId) {
  try {
    const req = new Request(apiPrefix + "users/" + userId, {
      method: "get"
    });

    const res = await fetch(req);

    if (res.status === 200) {
      const { data } = await res.json();
      return Promise.resolve(data);
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
