import {
  UPDATE_ANALYSES,
  UPDATE_COMMENTS,
  UPDATE_REPLIES,
  LIKE_AN_ANALYSIS,
  DISLIKE_AN_ANALYSIS,
  FAVOURITE_AN_ANALYSIS,
  UN_FAVOURITE_AN_ANALYSIS,
  SHARE_AN_ANALYSIS,
  UPDATE_STRATEGIES_STATUS,
  INIT_MIXEDCONTENT,
  UPDATE_MIXEDCONTENT
} from "./types";
import { createReducer } from "redux-create-reducer";
import Immutable from "immutable";
import { generateCombinedReducer, COMBINED_ACTIONS } from "../combinedHelper";

/**
 *
 * @param {* } domain analyses domain in redux state
 * @param {* } action redux action, show contain a property payload which contains
 * normalized analyses in immutable['Map'] format
 */
function mergeAnalyses(domain, action) {
  return domain.mergeDeep(action.payload);
}

function likeAnalysis(domain, action) {
  const analysisId = action.analysisId;
  if (!domain.has(analysisId)) return domain;
  else {
    return domain.withMutations(tmp =>
      tmp
        .setIn(
          [analysisId, "like_count"],
          (tmp.getIn([analysisId, "like_count"]) || 0) + 1
        )
        .setIn([analysisId, "liked"], !!1)
    );
  }
}

function disLikeAnalysis(domain, action) {
  const analysisId = action.analysisId;
  if (!domain.has(analysisId)) return domain;
  else {
    return domain.withMutations(tmp =>
      tmp
        .setIn(
          [analysisId, "like_count"],
          (tmp.getIn([analysisId, "like_count"]) || 0) - 1
        )
        .setIn([analysisId, "liked"], !!0)
    );
  }
}

function favouriteAnalysis(domain, action) {
  const analysisId = action.analysisId;
  if (!domain.has(analysisId)) return domain;
  else {
    return domain.withMutations(tmp =>
      tmp
        .setIn(
          [analysisId, "favourite_count"],
          (tmp.getIn([analysisId, "favourite_count"]) || 0) + 1
        )
        .setIn([analysisId, "favourited"], !!1)
    );
  }
}

function unFavouriteAnalysis(domain, action) {
  const analysisId = action.analysisId;
  if (!domain.has(analysisId)) return domain;
  else {
    return domain.withMutations(tmp =>
      tmp
        .setIn(
          [analysisId, "favourite_count"],
          (tmp.getIn([analysisId, "favourite_count"]) || 0) - 1
        )
        .setIn([analysisId, "favourited"], !!0)
    );
  }
}

function shareAnalysis(domain, action) {
  const analysisId = action.analysisId;
  if (!domain.has(analysisId)) return domain;
  else {
    return domain.setIn(
      [analysisId, "share_count"],
      (domain.getIn([analysisId, "share_count"]) || 0) + 1
    );
  }
}

function mergeComments(domain, action) {
  return domain.mergeDeep(action.payload);
}

function mergeReplies(domain, action) {
  return domain.mergeDeep(action.payload);
}

function initMixedContent(domain, action) {
  let newArr = [].concat(action.payload);
  newArr.splice(3, 0, !!0);
  return newArr;
}

function updateMixedContent(domain, action) {
  return [...new Set([...domain, ...action.payload])];
}

function updateStrategies(domain, action) {
  const strategies = action.payload;
  if (!strategies.length) return domain;

  return domain.withMutations(tmp => {
    strategies.forEach(({ analysisId, strategyId, status }) => {
      const analysis = domain.get(analysisId);
      if (!analysis) {
        return;
      }

      if (analysis.getIn(["strategies", 0, "id"]) === strategyId) {
        tmp.setIn([analysisId, "strategies", 0, "status"], status);
      } else if (analysis.getIn(["strategies", 1, "id"]) === strategyId) {
        tmp.setIn([analysisId, "strategies", 1, "status"], status);
      }
    });
  });
}

export const analyses = createReducer(Immutable.Map(), {
  [UPDATE_ANALYSES]: mergeAnalyses,
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_ANALYSES,
      handler: mergeAnalyses
    }
  ]),
  [LIKE_AN_ANALYSIS]: likeAnalysis,
  [DISLIKE_AN_ANALYSIS]: disLikeAnalysis,
  [FAVOURITE_AN_ANALYSIS]: favouriteAnalysis,
  [UN_FAVOURITE_AN_ANALYSIS]: unFavouriteAnalysis,
  [SHARE_AN_ANALYSIS]: shareAnalysis,
  [UPDATE_STRATEGIES_STATUS]: updateStrategies
});

export const comments = createReducer(Immutable.Map(), {
  [UPDATE_COMMENTS]: mergeComments,
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_COMMENTS,
      handler: mergeComments
    }
  ])
});

export const replies = createReducer(Immutable.Map(), {
  [UPDATE_REPLIES]: mergeReplies,
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_REPLIES,
      handler: mergeReplies
    }
  ])
});

export const mixedContent = createReducer([], {
  [INIT_MIXEDCONTENT]: initMixedContent,
  [UPDATE_MIXEDCONTENT]: updateMixedContent
});
