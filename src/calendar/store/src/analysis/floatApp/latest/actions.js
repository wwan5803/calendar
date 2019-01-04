import { UPDATE_IN_FLOAT_APP_ANALYSES } from "./types";
import { fetchAnalysis } from "./service";
import { parseAnalyses } from "../../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../../actions";
import { updateUsers } from "../../../users";
import { generateCombinedActions } from "../../../combinedHelper";

export function updateInFloatAppAnalyses({
  data,
  has_more,
  next_page_url,
  resultSet
}) {
  return {
    type: UPDATE_IN_FLOAT_APP_ANALYSES,
    payload: {
      data,
      resultSet,
      has_more,
      next_page_url,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export const acquireInFloatAppAnalyses = (
  { url, profileLanguage = "en", per_page, fin_callback } = {}
) => async dispatch => {
  try {
    const { has_more, next_page_url, data } = await fetchAnalysis({
      url,
      profileLanguage,
      per_page
    });

    const { analyses, comments, replies, users, result } = parseAnalyses(data);
    const resultSet = result.toSet();

    const actions = [];
    !analyses.isEmpty() && actions.push(updateAnalyses(analyses));
    !comments.isEmpty() && actions.push(updateComments(comments));
    !replies.isEmpty() && actions.push(updateReplies(replies));
    !users.isEmpty() && actions.push(updateUsers(users));
    actions.push(
      updateInFloatAppAnalyses({
        has_more,
        next_page_url,
        resultSet
      })
    );
    actions.length && dispatch(generateCombinedActions(actions));
  } catch (err) {
  } finally {
    fin_callback && fin_callback();
  }
};
