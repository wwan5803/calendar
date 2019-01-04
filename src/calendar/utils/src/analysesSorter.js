import moment from "moment";
export function sortAnalysesIdSetByCreatedTime({ analyses, idSet, DESC }) {
  return analyses
    .filter((analysis, id) => idSet.has(id))
    .sort((analysisA, analysisB) => {
      const createdAtA = moment(analysisA.get("created_at")).valueOf();
      const createdAtB = moment(analysisB.get("created_at")).valueOf();
      if (createdAtA < createdAtB) {
        return DESC ? 1 : -1;
      } else if (createdAtA > createdAtB) {
        return DESC ? -1 : 1;
      } else {
        return 0;
      }
    })
    .keySeq()
    .toArray();
}

export function sortAnalysesIdSetByUpdatedTime({ analyses, idSet, DESC }) {
  return analyses
    .filter((analysis, id) => idSet.has(id))
    .sort((analysisA, analysisB) => {
      const createdAtA = moment(analysisA.get("updated_at")).valueOf();
      const createdAtB = moment(analysisB.get("updated_at")).valueOf();
      if (createdAtA < createdAtB) {
        return DESC ? 1 : -1;
      } else if (createdAtA > createdAtB) {
        return DESC ? -1 : 1;
      } else {
        return 0;
      }
    })
    .keySeq()
    .toArray();
}

export function sortAnalysesIdSetByLikeCount({ analyses, idSet, DESC }) {
  return analyses
    .filter((analysis, id) => idSet.has(id))
    .sort((analysisA, analysisB) => {
      const likeCountA = analysisA.get("like_count");
      const likeCountB = analysisB.get("like_count");
      if (likeCountA < likeCountB) {
        return DESC ? 1 : -1;
      } else if (likeCountA > likeCountB) {
        return DESC ? -1 : 1;
      } else {
        return 0;
      }
    })
    .keySeq()
    .toArray();
}

export function sortAnalysesIdSetByCommentCount({ analyses, idSet, DESC }) {
  return analyses
    .filter((analysis, id) => idSet.has(id))
    .sort((analysisA, analysisB) => {
      const commentCountA = analysisA.get("comment_count");
      const commentCountB = analysisB.get("comment_count");
      if (commentCountA < commentCountB) {
        return DESC ? 1 : -1;
      } else if (commentCountA > commentCountB) {
        return DESC ? -1 : 1;
      } else {
        return 0;
      }
    })
    .keySeq()
    .toArray();
}

export function sortAnalysesIdSetByViewCount({ analyses, idSet, DESC }) {
  return analyses
    .filter((analysis, id) => idSet.has(id))
    .sort((analysisA, analysisB) => {
      const viewCountA = analysisA.get("view_count");
      const viewCountB = analysisB.get("view_count");
      if (viewCountA < viewCountB) {
        return DESC ? 1 : -1;
      } else if (viewCountA > viewCountB) {
        return DESC ? -1 : 1;
      } else {
        return 0;
      }
    })
    .keySeq()
    .toArray();
}

export function sortAnalysesIdSetByFavoriteCount({ analyses, idSet, DESC }) {
  return analyses
    .filter((analysis, id) => idSet.has(id))
    .sort((analysisA, analysisB) => {
      const favoriteCountA = analysisA.get("favourite_count");
      const favoriteCountB = analysisB.get("favourite_count");
      if (favoriteCountA < favoriteCountB) {
        return DESC ? 1 : -1;
      } else if (favoriteCountA > favoriteCountB) {
        return DESC ? -1 : 1;
      } else {
        return 0;
      }
    })
    .keySeq()
    .toArray();
}
