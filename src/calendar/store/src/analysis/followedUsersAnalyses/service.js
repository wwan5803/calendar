import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";
export async function fetchAnalysis({ per_page } = {}) {
  let headers;
  try {
    headers = authHelper.buildAuthHeader();
    const endpoint =
      apiPrefix +
      "posts/relations/followedUser" +
      (per_page ? "?per_page=" + per_page : "");

    const req = new Request(endpoint, {
      method: "get",
      headers
    });

    const res = await fetch(req);
    if (res.status === 200) {
      const result = await res.json();
      const { data, meta } = result;
      if (
        meta &&
        meta.pagination &&
        meta.pagination.links &&
        meta.pagination.links.next
      ) {
        return Promise.resolve({
          data,
          has_more: !!1,
          next_page_url: meta.pagination.links.next
        });
      } else return Promise.resolve({ data, has_more: !!0 });
    } else if (res.status === 422) {
      return Promise.resolve({ data: [], has_more: !!0, next_page_url: "" });
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
}
