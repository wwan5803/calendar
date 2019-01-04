import { UPDATE_FLOATAPP_FAVORITE_ANALYSES } from "./types";
import { fetchFavoriteAnalysis } from "./service";
import { parseAnalyses } from "../../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../../actions";
import { updateUsers } from "../../../users";
import { generateCombinedActions } from "../../../combinedHelper";

function updateFloatAppFavoriteAnalyses({
  has_more,
  next_page_url,
  resultSet
}) {
  return {
    type: UPDATE_FLOATAPP_FAVORITE_ANALYSES,
    payload: {
      resultSet,
      has_more,
      next_page_url,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export const acquireFloatAppFavoriteAnalysis = (
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
      updateFloatAppFavoriteAnalyses({
        has_more,
        next_page_url,
        resultSet
      })
    );
    actions.length && dispatch(generateCombinedActions(actions));

    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
