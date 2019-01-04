import { UPDATE_FAVORITE_ANALYSES } from "./types";
import { fetchFavoriteAnalysis } from "./service";
import { parseAnalyses } from "../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../actions";
import { updateUsers } from "../../users";
import { generateCombinedActions } from "../../combinedHelper";

function updateFavoriteAnalyses({
  data,
  has_more,
  next_page_url,
  resultSet,
  accountId
}) {
  return {
    type: UPDATE_FAVORITE_ANALYSES,
    payload: {
      data,
      resultSet,
      has_more,
      next_page_url,
      init: !!1,
      accountId,
      updated_time: new Date()
    }
  };
}

export const acquireFavoriteAnalysis = (
  { url, profileLanguage = "en", per_page, accountId, fin_callback } = {}
) => async dispatch => {
  try {
    const { has_more, next_page_url, data } = await fetchFavoriteAnalysis({
      url,
      profileLanguage,
      per_page,
      accountId
    });
    const { analyses, comments, replies, users, result } = parseAnalyses(data);
    const resultSet = result.toSet();

    const actions = [];
    !analyses.isEmpty() && actions.push(updateAnalyses(analyses));
    !comments.isEmpty() && actions.push(updateComments(comments));
    !replies.isEmpty() && actions.push(updateReplies(replies));
    !users.isEmpty() && actions.push(updateUsers(users));
    actions.push(
      updateFavoriteAnalyses({
        has_more,
        next_page_url,
        data,
        resultSet,
        accountId
      })
    );
    actions.length && dispatch(generateCombinedActions(actions));
  } catch (err) {
  } finally {
    fin_callback && fin_callback();
  }
};
