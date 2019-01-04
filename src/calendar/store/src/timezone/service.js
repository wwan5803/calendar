import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchTimezone() {
  try {
    const req = new Request(apiPrefix + `timezones`, {
      method: "get"
    });

    const res = await fetch(req);
    if (res.status === 200) {
      const result = await res.json();
      return Promise.resolve(result);
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
}
