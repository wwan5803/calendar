import { UPDATE_HISTORY_PICKS } from "./types";
import { fetchInSliderPicksAnalyses } from "./service";
import { parseAnalyses } from "../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../actions";
import { updateUsers } from "../../users";
import { generateCombinedActions } from "../../combinedHelper";

function updateHistoryPicks({ data, has_more, next_page_url, resultSet }) {
  return {
    type: UPDATE_HISTORY_PICKS,
    payload: {
      has_more,
      next_page_url,
      updated_time: new Date(),
      init: !!1,
      resultSet
    }
  };
}

export async function createAcquireHistoryPicksActions({
  url,
  profileLanguage = "en",
  page,
  per_page,
  token,
  authenticated
}) {
  try {
    const { has_more, next_page_url, data } = await fetchInSliderPicksAnalyses({
      url,
      profileLanguage,
      per_page,
      page,
      token,
      authenticated
    });

    const { analyses, comments, replies, users, result } = parseAnalyses(data);

    const actions = [];
    !analyses.isEmpty() && actions.push(updateAnalyses(analyses));
    !comments.isEmpty() && actions.push(updateComments(comments));
    !replies.isEmpty() && actions.push(updateReplies(replies));
    !users.isEmpty() && actions.push(updateUsers(users));
    actions.push(
      updateHistoryPicks({
        has_more,
        next_page_url,
        resultSet: result.toSet()
      })
    );
    return Promise.resolve(
      actions.length ? generateCombinedActions(actions) : void 0
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireHistoryPicks = (
  { url, profileLanguage, page, per_page, fin_callback } = {}
) => async dispatch => {
  try {
    const actions = await createAcquireHistoryPicksActions({
      url,
      profileLanguage,
      page,
      per_page
    });
    actions && dispatch(actions);
  } catch (err) {
  } finally {
    fin_callback && fin_callback();
  }
};
