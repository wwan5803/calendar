import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchTags() {
  try {
    const req = new Request(apiPrefix + "tags");

    const res = await fetch(req);

    if (res.status === 200) {
      const result = await res.json();
      return Promise.resolve(result);
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
