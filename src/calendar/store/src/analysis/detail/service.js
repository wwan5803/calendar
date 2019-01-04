import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchAnalysis(id, increaseViewCount) {
  let headers;
  try {
    headers = authHelper.buildAuthHeader();
  } catch (err) {
    headers = new Headers({});
  }

  try {
    const req = new Request(
      `${apiPrefix}posts/${id}${increaseViewCount ? "?count=1" : ""}`,
      {
        method: "get",
        headers
      }
    );

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
