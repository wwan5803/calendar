import {
  LIKE_AN_ANALYSIS,
  DISLIKE_AN_ANALYSIS,
  FAVOURITE_AN_ANALYSIS,
  UN_FAVOURITE_AN_ANALYSIS,
  SHARE_AN_ANALYSIS,
  UPDATE_ANALYSES,
  UPDATE_COMMENTS,
  UPDATE_REPLIES,
  UPDATE_STRATEGIES_STATUS,
  INIT_MIXEDCONTENT,
  UPDATE_MIXEDCONTENT
} from "./types";
import {
  fetchLikeAnalysis,
  fetchDisLikeAnalysis,
  fetchFavouriteAnalysis,
  fetchUnFavouriteAnalysis,
  fetchShareAnalysis
} from "./service";
import { showSignInAction } from "../globalModal/actions";

export function shareAnAnalysisInStore({ analysisId }) {
  return {
    type: SHARE_AN_ANALYSIS,
    analysisId
  };
}

export const increaseLikedAnalysis = analysisId => async (
  dispatch,
  getState
) => {
  if (!getState().get("account").authenticated) {
    dispatch(showSignInAction);
  } else {
    try {
      await fetchLikeAnalysis({ analysisId });
      dispatch(likeAnAnalysisInStore({ analysisId }));
    } catch (err) {}
  }
};

export const decreaseLikedAnalysis = analysisId => async (
  dispatch,
  getState
) => {
  if (!getState().get("account").authenticated) {
    dispatch(showSignInAction);
  } else {
    try {
      await fetchDisLikeAnalysis({ analysisId });
      dispatch(disLikeAnAnalysisInStore({ analysisId }));
    } catch (err) {}
  }
};

export function likeAnAnalysisInStore({ analysisId }) {
  return {
    type: LIKE_AN_ANALYSIS,
    analysisId
  };
}

export function disLikeAnAnalysisInStore({ analysisId }) {
  return {
    type: DISLIKE_AN_ANALYSIS,
    analysisId
  };
}

export const increaseFavoriteAnalysis = analysisId => async (
  dispatch,
  getState
) => {
  if (!getState().get("account").authenticated) {
    dispatch(showSignInAction);
  } else {
    try {
      await fetchFavouriteAnalysis({ analysisId });
      dispatch(favouriteAnAnalysisInStore({ analysisId }));
    } catch (err) {}
  }
};

export const decreaseFavoriteAnalysis = analysisId => async (
  dispatch,
  getState
) => {
  if (!getState().get("account").authenticated) {
    dispatch(showSignInAction);
  } else {
    try {
      await fetchUnFavouriteAnalysis({ analysisId });
      dispatch(unFavouriteAnAnalysisInStore({ analysisId }));
    } catch (err) {}
  }
};

function favouriteAnAnalysisInStore({ analysisId }) {
  return {
    type: FAVOURITE_AN_ANALYSIS,
    analysisId
  };
}

function unFavouriteAnAnalysisInStore({ analysisId }) {
  return {
    type: UN_FAVOURITE_AN_ANALYSIS,
    analysisId
  };
}

/**
 *
 * @param {*} strategies : [strategy]
 *
 * strategy : {
 *   analysisId,
 *   strategyId,
 *   status
 * }
 */
export function updateStrategiesStatus(strategies) {
  return {
    type: UPDATE_STRATEGIES_STATUS,
    payload: strategies
  };
}

export function updateAnalyses(analyses) {
  return {
    type: UPDATE_ANALYSES,
    payload: analyses
  };
}

export function updateComments(comments) {
  return {
    type: UPDATE_COMMENTS,
    payload: comments
  };
}

export function updateReplies(replies) {
  return {
    type: UPDATE_REPLIES,
    payload: replies
  };
}

export function initMixedContent(content) {
  return {
    type: INIT_MIXEDCONTENT,
    payload: content
  };
}

export function updateMixedContent(content) {
  return {
    type: UPDATE_MIXEDCONTENT,
    payload: content
  };
}
