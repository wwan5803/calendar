import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";
export async function fetchAnalysis({ url, per_page, profileLanguage } = {}) {
  let headers;
  try {
    headers = authHelper.buildAuthHeader();
  } catch (err) {
    headers = new Headers({});
  }

  try {
    const req = new Request(
      url
        ? url
        : apiPrefix +
          "posts?post_language=" +
          profileLanguage +
          (per_page ? "&per_page=" + per_page : ""),
      {
        method: "get",
        headers
      }
    );

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
          has_more: true,
          next_page_url: meta.pagination.links.next
        });
      } else return Promise.resolve({ data, has_more: false });
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
}
