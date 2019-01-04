import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

const default_per_page = 100;

export async function fetchAnalysis({ url, accountId, per_page } = {}) {
  try {
    const headers = authHelper.buildAuthHeader();

    if (!url) {
      if (accountId) {
        if (per_page) {
          url = `${apiPrefix}posts?per_page=${per_page}&authors[0]=${accountId}`;
        } else {
          url = `${apiPrefix}posts?per_page=${default_per_page}&authors[0]=${accountId}`;
        }
      } else {
        url = `${apiPrefix}posts?per_page=${per_page}`;
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

export async function fetchSelfLatestUpdatedAnalyses(
  { url, accountId, per_page } = {}
) {
  try {
    const headers = authHelper.buildAuthHeader();
    if (!url) {
      if (per_page) {
        url = `${apiPrefix}posts?per_page=${per_page}&orderby=updated_at&authors[0]=${accountId}`;
      } else {
        url = `${apiPrefix}posts?per_page=${default_per_page}&orderby=updated_at&authors[0]=${accountId}`;
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

export async function fetchSelfMostLikedAnalyses({ url, accountId, per_page }) {
  try {
    const headers = authHelper.buildAuthHeader();
    if (!url) {
      if (per_page) {
        url = `${apiPrefix}posts?per_page=${per_page}&orderby=like_count&authors[0]=${accountId}`;
      } else {
        url = `${apiPrefix}posts?per_page=${default_per_page}&orderby=like_count&authors[0]=${accountId}`;
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

export async function fetchSelfMostCommentAnalyses({
  url,
  accountId,
  per_page
}) {
  try {
    const headers = authHelper.buildAuthHeader();
    if (!url) {
      if (per_page) {
        url = `${apiPrefix}posts?per_page=${per_page}&orderby=comment_count&authors[0]=${accountId}`;
      } else {
        url = `${apiPrefix}posts?per_page=${default_per_page}&orderby=comment_count&authors[0]=${accountId}`;
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

export async function fetchSelfMostViewAnalyses({ url, accountId, per_page }) {
  try {
    const headers = authHelper.buildAuthHeader();
    if (!url) {
      if (per_page) {
        url = `${apiPrefix}posts?per_page=${per_page}&orderby=view_count&authors[0]=${accountId}`;
      } else {
        url = `${apiPrefix}posts?per_page=${default_per_page}&orderby=view_count&authors[0]=${accountId}`;
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

export async function fetchSelfMostSharedAnalyses({
  url,
  accountId,
  per_page
}) {
  try {
    const headers = authHelper.buildAuthHeader();
    if (!url) {
      if (per_page) {
        url = `${apiPrefix}posts?per_page=${per_page}&orderby=share_count&authors[0]=${accountId}`;
      } else {
        url = `${apiPrefix}posts?per_page=${default_per_page}&orderby=share_count&authors[0]=${accountId}`;
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

export async function fetchSelfMostFavoriteAnalyses({
  url,
  accountId,
  per_page
}) {
  try {
    const headers = authHelper.buildAuthHeader();
    if (!url) {
      if (per_page) {
        url = `${apiPrefix}posts?per_page=${per_page}&orderby=favourite_count&authors[0]=${accountId}`;
      } else {
        url = `${apiPrefix}posts?per_page=${default_per_page}&orderby=favourite_count&authors[0]=${accountId}`;
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

export async function filterSelfAnalysesByDate({
  url,
  accountId,
  per_page,
  from,
  to
}) {
  try {
    const headers = authHelper.buildAuthHeader();
    if (!url) {
      if (per_page) {
        url = `${apiPrefix}posts?per_page=${per_page}&timerange[from]=${from}&timerange[to]=${to}&authors[0]=${accountId}`;
      } else {
        url = `${apiPrefix}posts?per_page=${default_per_page}&timerange[from]=${from}&timerange[to]=${to}&authors[0]=${accountId}`;
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
