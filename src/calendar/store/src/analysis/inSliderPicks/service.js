import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchInSliderPicksAnalyses({
  lang,
  authenticated,
  token
}) {
  const headers = authenticated
    ? new Headers({ Authorization: "Bearer " + token })
    : new Headers({});

  try {
    const req = new Request(
      apiPrefix + "posts?picked=1&post_language=" + lang,
      {
        method: "get",
        headers
      }
    );

    const res = await fetch(req);
    if (res.status === 200) {
      const result = await res.json();
      const { data } = result;
      return Promise.resolve(data);
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
}
