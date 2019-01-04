import { authHelper, showCommonNetWorkErrorTip, showTip } from "utils";
import { apiPrefix } from "config/config";

export async function fetchLikeAnalysis({ analysisId }) {
  try {
    const headers = authHelper.buildAuthHeader();

    const req = new Request(apiPrefix + "like/post/" + analysisId, {
      method: "put",
      headers
    });

    const res = await fetch(req);
    if (res.status === 200) return Promise.resolve();
    return Promise.reject();
  } catch (err) {
    return Promise.reject();
  }
}

export async function fetchDisLikeAnalysis({ analysisId }) {
  try {
    const headers = authHelper.buildAuthHeader();

    const req = new Request(apiPrefix + "dislike/post/" + analysisId, {
      method: "put",
      headers
    });

    const res = await fetch(req);
    if (res.status === 200) return Promise.resolve();
    return Promise.reject();
  } catch (err) {
    return Promise.reject();
  }
}

export async function fetchFavouriteAnalysis({ analysisId }) {
  try {
    const headers = authHelper.buildAuthHeader();
    headers.append("Content-Type", "application/json");
    const req = new Request(apiPrefix + "favourites", {
      method: "post",
      headers,
      body: JSON.stringify({
        model: "post",
        ids: [analysisId]
      })
    });

    const res = await fetch(req);
    if (res.status === 200) return Promise.resolve();
    return Promise.reject();
  } catch (err) {
    return Promise.reject();
  }
}

export async function fetchUnFavouriteAnalysis({ analysisId }) {
  try {
    const headers = authHelper.buildAuthHeader();

    const req = new Request(apiPrefix + "favourites/post/" + analysisId, {
      method: "delete",
      headers
    });

    const res = await fetch(req);
    if (res.status === 200) return Promise.resolve();
    return Promise.reject();
  } catch (err) {
    return Promise.reject();
  }
}

export async function fetchShareAnalysis({ analysisId }) {
  let headers;
  try {
    headers = authHelper.buildAuthHeader();
  } catch (err) {
    headers = new Headers({});
  }

  try {
    const req = new Request(apiPrefix + `posts/${analysisId}/share`, {
      method: "put",
      headers
    });

    const res = await fetch(req);
    if (res.status === 200) return Promise.resolve();
    return Promise.reject();
  } catch (err) {
    return Promise.reject();
  }
}

export async function fetchReplyAnalysis({
  analysisId,
  content,
  muid,
  mcontent
}) {
  try {
    const headers = authHelper.buildAuthHeader();
    const formData = new FormData();
    // formData.append("parent_id", analysisId);
    // formData.append("content", content);
    // formData.append("muid[0]", 1);
    // formData.append("mcontent", mcontent);
    headers.append("Content-Type", "application/json");

    const data = {
      parent_id: analysisId,
      content: content,
      muid: muid,
      mcontent: mcontent
    };

    const req = new Request(apiPrefix + "posts", {
      method: "post",
      headers,
      body: JSON.stringify(data)
    });

    const res = await fetch(req);
    if (res.status === 200) {
      return Promise.resolve();
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
}

export async function fetchUserFriends({ value }) {
  try {
    const headers = authHelper.buildAuthHeader();

    const req = new Request(
      `${apiPrefix}users?type=ma&mention=0&mention_filter=${value}`,
      {
        method: "get",
        headers
      }
    );

    const res = await fetch(req);
    if (res.status === 200) {
      const { data } = await res.json();
      return Promise.resolve(data);
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject();
    }
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
}
