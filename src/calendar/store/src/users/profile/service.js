import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchUser({ userId, authenticated, token }) {
  const headers = authenticated
    ? new Headers({ Authorization: "Bearer " + token })
    : new Headers({});
  try {
    const req = new Request(apiPrefix + "users/" + userId, {
      method: "get",
      headers
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
