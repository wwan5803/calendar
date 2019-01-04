import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchInSliderPicksAnalyses(
  { url, profileLanguage, per_page, page, token, authenticated } = {}
) {
  const headers = authenticated
    ? new Headers({ Authorization: "Bearer " + token })
    : new Headers({});

  try {
    let endpoint;
    if (url) endpoint = url;
    else {
      endpoint = apiPrefix + "posts?picked=1";
      if (per_page) {
        endpoint += per_page ? "&per_page=" + per_page : "";
        if (profileLanguage) {
          endpoint += "&post_language=" + profileLanguage;
        }
        if (page && page > 1) {
          endpoint += "&page=" + page;
        }
      } else if (profileLanguage)
        endpoint += "&post_language=" + profileLanguage;
    }

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
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject(res.status);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
