import { UPDATE_DETAIL_ANALYSIS } from "./types";
import { fetchAnalysis } from "./service";
import { parseAnalysis } from "../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../actions";
import { addHeader, updateHeader } from "../../../actions";
import { updateUsers } from "../../users";
import { generateCombinedActions } from "../../combinedHelper";

export function updateDetailAnalysis(result) {
  return {
    type: UPDATE_DETAIL_ANALYSIS,
    payload: {
      result,
      updated_time: new Date()
    }
  };
}

export async function createAcquireAnalysisDetailActions({
  id,
  increaseViewCount
}) {
  try {
    const data = await fetchAnalysis(id, increaseViewCount);
    const { analyses, comments, replies, users, result } = parseAnalysis(data);
    const actions = [];
    !analyses.isEmpty() && actions.push(updateAnalyses(analyses));
    !comments.isEmpty() && actions.push(updateComments(comments));
    !replies.isEmpty() && actions.push(updateReplies(replies));
    !users.isEmpty() && actions.push(updateUsers(users));
    actions.push(updateDetailAnalysis(result));
    actions.push(
      updateHeader({
        analysisTitle: `${data.title} | Finlogix`,
        analysisContent: data.content
          .replace(/<\/?.*?>/g, "")
          .replace(new RegExp("&nbsp;", "g"), "")
          .replace(/\n/gm, " "),
        analysisImage: data.analysis_snapshot
      })
    );

    return Promise.resolve(
      actions.length ? generateCombinedActions(actions) : void 0
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireDetailAnalysis = ({
  id,
  increaseViewCount,
  fin_callback
}) => async (dispatch, getState) => {
  try {
    const header = getState().get("header");
    const actions = await createAcquireAnalysisDetailActions({
      id,
      increaseViewCount,
      header
    });

    actions && dispatch(actions);

    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
