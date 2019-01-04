import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchInSliderUsers(lang) {
  let userLanguage = "en";
  if (lang) {
    userLanguage = lang;
  }
  let headers;
  try {
    headers = authHelper.buildAuthHeader();
  } catch (err) {
    headers = new Headers({});
  }

  try {
    const req = new Request(apiPrefix + "users?type=ta&lang=" + userLanguage, {
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
