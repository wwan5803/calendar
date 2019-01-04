import { UPDATE_IN_SLIDER_PICKS_ANALYSES } from "./types";
import { fetchInSliderPicksAnalyses } from "./service";
import { parseAnalyses } from "../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../actions";
import { updateUsers } from "../../users";
import { generateCombinedActions } from "../../combinedHelper";

function updateInSliderPicksAnalyses(resultList) {
  return {
    type: UPDATE_IN_SLIDER_PICKS_ANALYSES,
    payload: {
      resultList,
      updated_time: new Date(),
      init: !!1
    }
  };
}

export async function createAcquireInSliderPicksAnalysesActions({
  lang = "en",
  authenticated,
  token
}) {
  try {
    const data = await fetchInSliderPicksAnalyses({
      lang,
      authenticated,
      token
    });

    const { analyses, comments, replies, users, result } = parseAnalyses(data);
    const resultList = result;

    const actions = [];
    !analyses.isEmpty() && actions.push(updateAnalyses(analyses));
    !comments.isEmpty() && actions.push(updateComments(comments));
    !replies.isEmpty() && actions.push(updateReplies(replies));
    !users.isEmpty() && actions.push(updateUsers(users));
    actions.push(updateInSliderPicksAnalyses(resultList));
    return Promise.resolve(
      actions.length ? generateCombinedActions(actions) : void 0
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireInSliderPicksAnalyses = ({ lang, fin_callback }) => async (
  dispatch,
  getState
) => {
  try {
    const { authenticated, token } = getState().get(
      "account"
    );
    const actions = await createAcquireInSliderPicksAnalysesActions({
      lang,
      authenticated,
      token
    });
    actions && dispatch(actions);
  } catch (err) {
  } finally {
    fin_callback && fin_callback();
  }
};
