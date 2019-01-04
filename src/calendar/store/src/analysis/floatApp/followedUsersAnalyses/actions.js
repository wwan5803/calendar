import { UPDATE_FLOATAPP_FOLLOWED_USERS_ANALYSIS } from "./types";
import { fetchAnalysis } from "./service";
import { parseAnalyses } from "../../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../../actions";
import { updateUsers } from "../../../users";
import { generateCombinedActions } from "../../../combinedHelper";

function updateFollowedUsersAnalysis({
  data,
  has_more,
  next_page_url,
  resultSet
}) {
  return {
    type: UPDATE_FLOATAPP_FOLLOWED_USERS_ANALYSIS,
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

export const acquireFloatAppFollowedUsersAnalysis = (
  { url, fin_callback, per_page } = {}
) => async dispatch => {
  try {
    const { data, has_more, next_page_url } = await fetchAnalysis({
      per_page,
      url
    });

    const { analyses, comments, replies, users, result } = parseAnalyses(data);
    const resultSet = result.toSet();

    const actions = [];
    !analyses.isEmpty() && actions.push(updateAnalyses(analyses));
    !comments.isEmpty() && actions.push(updateComments(comments));
    !replies.isEmpty() && actions.push(updateReplies(replies));
    !users.isEmpty() && actions.push(updateUsers(users));
    actions.push(
      updateFollowedUsersAnalysis({
        data,
        has_more,
        next_page_url,
        resultSet
      })
    );
    actions.length && dispatch(generateCombinedActions(actions));
  } finally {
    fin_callback && fin_callback();
  }
};
