import {
  UPDATE_SEARCH_ANALYSES,
  UPDATE_SEARCH_PROFILE_ANALYSES,
  UPDATE_FAVORITE_PROFILE_ANALYSES
} from "./types";
import {
  fetchAnalysis,
  fetchSearchProfileAnalysis,
  fetchSearchFavoriteAnalysis
} from "./service";
import { parseAnalyses } from "../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../actions";
import { updateUsers } from "../../users";
import { generateCombinedActions } from "../../combinedHelper";

function removePageStr(str) {
  // different page should consider as the same query_options, so we remove page str from query_options
  return str
    .replace(/&page=\d/, "")
    .replace(/\?page=\d/, "")
    .replace(/^\?/, "")
    .replace(/^&/, "");
}

export function updateSearchAnalyses({
  data,
  query_options,
  has_more,
  next_page_url,
  resultSet
}) {
  query_options = removePageStr(query_options);
  return {
    type: UPDATE_SEARCH_ANALYSES,
    payload: {
      data,
      resultSet,
      query_options,
      has_more,
      next_page_url,
      updated_time: new Date()
    }
  };
}

export const acquireSearchAnalyses = (
  { url, profileLanguage = "en", searchUrl, per_page, fin_callback } = {}
) => async dispatch => {
  try {
    const { has_more, next_page_url, data } = await fetchAnalysis({
      url,
      searchUrl,
      profileLanguage,
      per_page
    });

    let query_options = "";
    if (url) query_options = url.split("?")[1] || "";
    else if (searchUrl) query_options = searchUrl;
    else if (per_page && profileLanguage)
      query_options =
        "per_page=" + per_page + "&post_language=" + profileLanguage;

    const { analyses, comments, replies, users, result } = parseAnalyses(data);
    const resultSet = result.toSet();

    const actions = [];
    !analyses.isEmpty() && actions.push(updateAnalyses(analyses));
    !comments.isEmpty() && actions.push(updateComments(comments));
    !replies.isEmpty() && actions.push(updateReplies(replies));
    !users.isEmpty() && actions.push(updateUsers(users));
    actions.push(
      updateSearchAnalyses({
        has_more,
        next_page_url,
        data,
        updated_time: new Date(),
        query_options,
        resultSet
      })
    );
    actions.length && dispatch(generateCombinedActions(actions));

    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};

export function updateSearchProfileAnalyses({
  data,
  query_options,
  has_more,
  next_page_url,
  resultSet,
  accountId
}) {
  query_options = removePageStr(query_options);
  return {
    type: UPDATE_SEARCH_PROFILE_ANALYSES,
    payload: {
      data,
      accountId,
      resultSet,
      query_options,
      has_more,
      next_page_url,
      updated_time: new Date()
    }
  };
}

export const acquireSearchProfileAnalyses = (
  {
    url,
    profileLanguage = "en",
    searchUrl,
    per_page,
    accountId,
    fin_callback
  } = {}
) => async dispatch => {
  try {
    const { has_more, next_page_url, data } = await fetchSearchProfileAnalysis({
      url,
      accountId,
      searchUrl,
      profileLanguage,
      per_page
    });

    let query_options = "";
    if (url) query_options = url.split("?")[1] || "";
    else if (searchUrl) query_options = searchUrl;
    else if (per_page && profileLanguage)
      query_options =
        "per_page=" + per_page + "&post_language=" + profileLanguage;

    const { analyses, comments, replies, users, result } = parseAnalyses(data);
    const resultSet = result.toSet();

    dispatch(updateAnalyses(analyses));
    dispatch(updateComments(comments));
    dispatch(updateReplies(replies));
    dispatch(updateUsers(users));
    dispatch(
      updateSearchProfileAnalyses({
        has_more,
        next_page_url,
        accountId,
        data,
        updated_time: new Date(),
        query_options,
        resultSet
      })
    );

    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};

export function updateSearchFavoriteAnalyses({
  data,
  query_options,
  has_more,
  next_page_url,
  resultSet,
  accountId
}) {
  query_options = removePageStr(query_options);
  return {
    type: UPDATE_FAVORITE_PROFILE_ANALYSES,
    payload: {
      data,
      accountId,
      resultSet,
      query_options,
      has_more,
      next_page_url,
      updated_time: new Date()
    }
  };
}

export const acquireSearchFavoriteAnalyses = (
  {
    url,
    profileLanguage = "en",
    searchUrl,
    per_page,
    accountId,
    fin_callback
  } = {}
) => async dispatch => {
  try {
    const {
      has_more,
      next_page_url,
      data
    } = await fetchSearchFavoriteAnalysis({
      url,
      searchUrl,
      profileLanguage,
      per_page,
      accountId
    });

    let query_options = "";
    if (url) query_options = url.split("?")[1] || "";
    else if (searchUrl) query_options = searchUrl;
    else if (per_page && profileLanguage)
      query_options =
        "per_page=" + per_page + "&post_language=" + profileLanguage;

    const { analyses, comments, replies, users, result } = parseAnalyses(data);
    const resultSet = result.toSet();

    dispatch(updateAnalyses(analyses));
    dispatch(updateComments(comments));
    dispatch(updateReplies(replies));
    dispatch(updateUsers(users));
    dispatch(
      updateSearchFavoriteAnalyses({
        has_more,
        next_page_url,
        data,
        updated_time: new Date(),
        query_options,
        resultSet,
        accountId
      })
    );

    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
