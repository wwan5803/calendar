import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

const fetchingMap = {};

export async function fetchSymbols() {
  if (fetchingMap["symbols_market"]) {
    return Promise.reject("Another process is fetching symbols_market");
  }
  let headers;
  try {
    headers = authHelper.buildAuthHeader();
  } catch (err) {
    headers = new Headers({});
  }

  try {
    const req = new Request(apiPrefix + "symbols_market", {
      method: "get",
      headers
    });

    fetchingMap["symbols_market"] = !!1;
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
  } finally {
    fetchingMap["symbols_market"] = !!0;
  }
}
