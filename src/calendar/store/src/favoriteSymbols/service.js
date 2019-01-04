import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchFavoriteSymbol(symbolId) {
  try {
    const headers = authHelper.buildAuthHeader();
    headers.append("Content-Type", "application/json");

    const req = new Request(apiPrefix + "favourites", {
      method: "post",
      headers,
      body: JSON.stringify({
        ids: [symbolId],
        model: "symbol"
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

export async function fetchFavoriteSymbols() {
  try {
    const headers = authHelper.buildAuthHeader();

    const req = new Request(apiPrefix + "favourites/symbol", {
      method: "get",
      headers
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
    return Promise.reject(err);
  }
}

export async function fetchUnFavoriteSymbol(symbolId) {
  try {
    const headers = authHelper.buildAuthHeader();

    const req = new Request(apiPrefix + "favourites/symbol/" + symbolId, {
      method: "delete",
      headers
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
