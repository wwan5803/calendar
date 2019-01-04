import { authHelper } from "utils";
import { apiPrefix } from "config/config";
import { showCommonNetWorkErrorTip } from "utils";

export async function fetchDraft() {
  try {
    const headers = authHelper.buildAuthHeader();

    const req = new Request(
      apiPrefix + "get_own_post?per_page=100&approved[0]=2",
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
        // TODO
      }

      return Promise.resolve(data);
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
}

const fetchingMap = {};

export async function fetchDeleteDraft(id) {
  if (fetchingMap[id]) return Promise.reject();
  fetchingMap[id] = !!1;
  try {
    const headers = authHelper.buildAuthHeader();

    const req = new Request(apiPrefix + `posts/${id}`, {
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
    return Promise.reject();
  } finally {
    fetchingMap[id] = !!0;
  }
}
