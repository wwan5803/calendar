import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchHotAnalysis({ authenticated, token, language }) {
  const headers = authenticated
    ? new Headers({ Authorization: "Bearer " + token })
    : new Headers({});

  try {
    const req = new Request(
      `${apiPrefix}posts?post_language=${language}&hotpicked=1`,
      {
        method: "get",
        headers
      }
    );

    const res = await fetch(req);
    if (res.status === 200) {
      const result = await res.json();
      return Promise.resolve(result);
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject(res.status);
    }
  } catch (err) {
    return Promise.reject();
  }
}
