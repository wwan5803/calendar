import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";
const default_per_page = 100;

export async function fetchFavoriteAnalysis(
  { url, profileLanguage = "en", searchUrl, per_page, accountId } = {}
) {
  try {
    const headers = authHelper.buildAuthHeader();

    if (!url) {
      if (per_page) {
        url = `${apiPrefix}posts?favourited=1&author=${accountId}&per_page=${per_page}`;
      } else {
        url = `${apiPrefix}posts?favourited=1&author=${accountId}&per_page=${default_per_page}`;
      }
    }

    const req = new Request(url, {
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
