import { UPDATE_PROFILE_ANALYSES } from "./types";
import { fetchAnalysis } from "./service";
import { parseAnalyses } from "../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../actions";
import { updateUsers } from "../../users";
import { generateCombinedActions } from "../../combinedHelper";

export function updateProfileAnalyses({
  has_more,
  next_page_url,
  resultSet,
  accountId
}) {
  return {
    type: UPDATE_PROFILE_ANALYSES,
    payload: {
      resultSet,
      has_more,
      next_page_url,
      updated_time: new Date(),
      init: !!1,
      accountId
    }
  };
}

export async function createAcquireProfileAnalysesActions({
  url,
  accountId,
  per_page,
  authenticated,
  token
}) {
  try {
    const { has_more, next_page_url, data } = await fetchAnalysis({
      url,
      per_page,
      accountId,
      authenticated,
      token
    });

    const { analyses, comments, replies, users, result } = parseAnalyses(data);

    const actions = [];
    !analyses.isEmpty() && actions.push(updateAnalyses(analyses));
    !comments.isEmpty() && actions.push(updateComments(comments));
    !replies.isEmpty() && actions.push(updateReplies(replies));
    !users.isEmpty() && actions.push(updateUsers(users));
    const resultSet = result.toSet();
    actions.push(
      updateProfileAnalyses({
        has_more,
        next_page_url,
        resultSet,
        accountId
      })
    );

    return Promise.resolve(
      actions.length ? generateCombinedActions(actions) : void 0
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireProfileAnalyses = (
  { url, accountId, per_page, fin_callback } = {}
) => async (dispatch, getState) => {
  try {
    const { authenticated, token } = getState().get("account");

    const actions = await createAcquireProfileAnalysesActions({
      url,
      accountId,
      per_page,
      authenticated,
      token
    });

    actions && dispatch(actions);

    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
