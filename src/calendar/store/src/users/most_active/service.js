import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchMostActiveUsers(search, language) {
  let userlanguage = 'en';
  if(language){
      userlanguage = language;
  }
  let headers;
  try {
    headers = authHelper.buildAuthHeader();
  } catch (err) {
    headers = new Headers({});
  }

  try {
    const searchParam = search && search !== "" ? `&search=${search}` : "";
    const req = new Request(apiPrefix + "users?type=ma&lang=" + userlanguage + searchParam, {
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