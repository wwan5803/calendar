import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchUsersThatIFollowed(search) {
  try {
    const headers = authHelper.buildAuthHeader();
    const searchParam = search && search !== "" ? "?search=" + search : "";
    const req = new Request(apiPrefix + "friends/followedUser" + searchParam, {
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
    return Promise.reject();
  }
}
