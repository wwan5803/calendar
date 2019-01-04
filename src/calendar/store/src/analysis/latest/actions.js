import { UPDATE_LATEST_ANALYSES } from "./types";
import { fetchAnalysis } from "./service";
import { parseAnalyses } from "../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../actions";
import { updateUsers } from "../../users";
import { generateCombinedActions } from "../../combinedHelper";
import { addHeader, updateHeader } from "../../../actions";
import { metaLinkParser } from "utils";
import { hostname } from "config/config";

export function updateLatestAnalyses({
  has_more,
  next_page_url,
  previous_page_url,
  resultSet
}) {
  return {
    type: UPDATE_LATEST_ANALYSES,
    payload: {
      resultSet,
      has_more,
      next_page_url,
      previous_page_url,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export async function createAcquireLatestAnalysesActions({
  url,
  profileLanguage,
  page,
  per_page,
  authenticated,
  token,
  pathname
}) {
  try {
    const {
      has_more,
      next_page_url,
      previous_page_url,
      data
    } = await fetchAnalysis({
      url,
      profileLanguage,
      per_page,
      page,
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
      updateLatestAnalyses({
        has_more,
        next_page_url,
        previous_page_url,
        resultSet
      })
    );

    const links = metaLinkParser({
      hostname,
      pathname,
      prevUrl: previous_page_url,
      nextUrl: next_page_url
    });

    actions.push(
      updateHeader({
        links
      })
    );

    return Promise.resolve(
      actions.length ? generateCombinedActions(actions) : void 0
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireLatestAnalyses = (
  { url, page, per_page, fin_callback } = {}
) => async (dispatch, getState) => {
  try {
    let { token, language: profileLanguage, authenticated } = getState().get(
      "account"
    );
    if (!profileLanguage) {
      profileLanguage = getState().get("language");
    }
    const pathname = getState().get("router").location.pathname;

    const actions = await createAcquireLatestAnalysesActions({
      url,
      profileLanguage,
      page,
      per_page,
      token,
      authenticated,
      pathname
    });

    actions && dispatch(actions);

    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
