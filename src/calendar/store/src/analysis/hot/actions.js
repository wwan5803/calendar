import { UPDATE_HOT_ANALYSIS } from "./types";
import { fetchHotAnalysis } from "./service";
import { parseAnalysis } from "../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../actions";
import { updateUsers } from "../../users";
import { generateCombinedActions } from "../../combinedHelper";

function updateHotAnalysis(analysisId) {
  return {
    type: UPDATE_HOT_ANALYSIS,
    payload: {
      updated_time: new Date(),
      result: analysisId
    }
  };
}

export async function createAcquireHotAnalysisActions({
  authenticated,
  token,
  language
}) {
  try {
    const data = await fetchHotAnalysis({
      authenticated,
      token,
      language
    });

    const { analyses, comments, replies, users, result } = parseAnalysis(data);
    const actions = [];
    !analyses.isEmpty() && actions.push(updateAnalyses(analyses));
    !comments.isEmpty() && actions.push(updateComments(comments));
    !replies.isEmpty() && actions.push(updateReplies(replies));
    !users.isEmpty() && actions.push(updateUsers(users));
    actions.push(updateHotAnalysis(result));

    return Promise.resolve(
      actions.length ? generateCombinedActions(actions) : void 0
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireHotAnalysis = ({ fin_callback }) => async (
  dispatch,
  getState
) => {
  try {
    const { language, authenticated, token } = getState().get("account");
    const ui_language = getState().get("language");
    const actions = await createAcquireHotAnalysisActions({
      authenticated,
      token,
      language: authenticated ? language : ui_language || "en"
    });
    dispatch(actions);
  } catch (err) {
  } finally {
    fin_callback && fin_callback();
  }
};
