import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";
export async function fetchAnalysis(
  { url, profileLanguage = "en", searchUrl, per_page } = {}
) {
  let headers;
  try {
    headers = authHelper.buildAuthHeader();
  } catch (err) {
    headers = new Headers({});
  }

  try {
    let endpoint;
    if (url) {
      endpoint = url;
    } else if (searchUrl)
      endpoint = `${apiPrefix}posts?${searchUrl}&post_language=${profileLanguage}`;
    else {
      endpoint = apiPrefix + "posts";
      if (per_page) {
        endpoint += per_page ? "?per_page=" + per_page : "";
        if (profileLanguage) {
          endpoint += "&post_language=" + profileLanguage;
        }
      } else if (profileLanguage)
        endpoint += "?post_language=" + profileLanguage;
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

export async function fetchSearchProfileAnalysis(
    { url, profileLanguage = "en", searchUrl, per_page, accountId } = {}
) {
    let headers;
    try {
        headers = authHelper.buildAuthHeader();
    } catch (err) {
        headers = new Headers({});
    }

    try {
        let endpoint;
        if (url) {
            endpoint = url;
        } else if (searchUrl && accountId)
            endpoint = `${apiPrefix}posts?${searchUrl}&post_language=${profileLanguage}&authors[0]=${accountId}`;
        else {
            endpoint = apiPrefix + "posts";
            if (per_page) {
                endpoint += per_page ? "?per_page=" + per_page : "";
                if (profileLanguage) {
                    endpoint += "&post_language=" + profileLanguage;
                }
            } else if (profileLanguage)
                endpoint += "?post_language=" + profileLanguage;
        }
        console.log("endpoint", endpoint);

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


export async function fetchSearchFavoriteAnalysis(
    { url, profileLanguage = "en", searchUrl, per_page, accountId } = {}
) {
    let headers;
    try {
        headers = authHelper.buildAuthHeader();
    } catch (err) {
        headers = new Headers({});
    }

    try {
        let endpoint;
        if (url) {
            endpoint = url;
        } else if (searchUrl && accountId)
            endpoint = `${apiPrefix}posts?${searchUrl}&post_language=${profileLanguage}&favourited=1&author=${accountId}`;
        else {
            endpoint = apiPrefix + "posts";
            if (per_page) {
                endpoint += per_page ? "?per_page=" + per_page : "";
                if (profileLanguage) {
                    endpoint += "&post_language=" + profileLanguage;
                }
            } else if (profileLanguage)
                endpoint += "?post_language=" + profileLanguage;
        }
        console.log("endpoint", endpoint);

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



