import {
  UPDATE_SELF_ANALYSES,
  UPDATE_SELF_LATEST_UPDATED_ANALYSES,
  UPDATE_SELF_MOST_COMMENT_ANALYSES,
  UPDATE_SELF_MOST_LIKED_ANALYSES,
  UPDATE_SELF_MOST_SHARED_ANALYSES,
  UPDATE_SELF_MOST_VIEW_ANALYSES,
  UPDATE_SELF_MOST_FAVORITE_ANALYSES,
  UPDATE_SELF_ANALYSES_BY_DATE
} from "./types";
import {
  fetchAnalysis,
  fetchSelfLatestUpdatedAnalyses,
  fetchSelfMostCommentAnalyses,
  fetchSelfMostLikedAnalyses,
  fetchSelfMostSharedAnalyses,
  fetchSelfMostViewAnalyses,
  fetchSelfMostFavoriteAnalyses,
  filterSelfAnalysesByDate
} from "./service";
import { parseAnalyses } from "../adapter";
import { updateAnalyses, updateComments, updateReplies } from "../actions";
import { updateUsers } from "../../users";
import { generateCombinedActions } from "../../combinedHelper";

function updateSelfAnalyses({ has_more, next_page_url, resultSet }) {
  return {
    type: UPDATE_SELF_ANALYSES,
    payload: {
      resultSet,
      has_more,
      next_page_url,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export const acquireSelfAnalyses = ({
  url,
  per_page,
  accountId,
  fin_callback
}) => async dispatch => {
  try {
    const { has_more, next_page_url, data } = await fetchAnalysis({
      url,
      accountId,
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
      updateSelfAnalyses({
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

function updateSelfLatestUpdatedAnalyses({
  has_more,
  next_page_url,
  resultSet
}) {
  return {
    type: UPDATE_SELF_LATEST_UPDATED_ANALYSES,
    payload: {
      has_more,
      next_page_url,
      resultSet,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export const acquireSelfLatestUpdatedAnalyses = (
  { url, accountId, fin_callback } = {}
) => async dispatch => {
  const per_page = 10;
  try {
    const {
      has_more,
      next_page_url,
      data
    } = await fetchSelfLatestUpdatedAnalyses({
      url,
      accountId,
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
      updateSelfLatestUpdatedAnalyses({
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

function updateSelfMostSharedAnalyses({ has_more, next_page_url, resultSet }) {
  return {
    type: UPDATE_SELF_MOST_SHARED_ANALYSES,
    payload: {
      has_more,
      next_page_url,
      resultSet,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export const acquireSelfMostSharedAnalyses = ({
  url,
  per_page,
  accountId,
  fin_callback
}) => async dispatch => {
  try {
    const {
      has_more,
      next_page_url,
      data
    } = await fetchSelfMostSharedAnalyses({
      url,
      accountId,
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
      updateSelfMostSharedAnalyses({
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

function updateSelfMostFavoriteAnalyses({
  has_more,
  next_page_url,
  resultSet
}) {
  return {
    type: UPDATE_SELF_MOST_FAVORITE_ANALYSES,
    payload: {
      has_more,
      next_page_url,
      resultSet,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export const acquireSelfMostFavoriteAnalysis = ({
  url,
  per_page,
  accountId,
  fin_callback
}) => async dispatch => {
  try {
    const {
      has_more,
      next_page_url,
      data
    } = await fetchSelfMostFavoriteAnalyses({
      url,
      accountId,
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
      updateSelfMostFavoriteAnalyses({
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

function updateSelfMostLikedAnalyses({ has_more, next_page_url, resultSet }) {
  return {
    type: UPDATE_SELF_MOST_LIKED_ANALYSES,
    payload: {
      has_more,
      next_page_url,
      resultSet,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export const acquireSelfMostLikedAnalyses = ({
  url,
  per_page,
  accountId,
  fin_callback
}) => async dispatch => {
  try {
    const { has_more, next_page_url, data } = await fetchSelfMostLikedAnalyses({
      url,
      accountId,
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
      updateSelfMostLikedAnalyses({
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

function updateSelfMostCommentAnalyses({ has_more, next_page_url, resultSet }) {
  return {
    type: UPDATE_SELF_MOST_COMMENT_ANALYSES,
    payload: {
      has_more,
      next_page_url,
      resultSet,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export const acquireSelfMostCommentAnalyses = ({
  url,
  per_page,
  accountId,
  fin_callback
}) => async dispatch => {
  try {
    const {
      has_more,
      next_page_url,
      data
    } = await fetchSelfMostCommentAnalyses({
      url,
      accountId,
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
      updateSelfMostCommentAnalyses({
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

function updateSelfMostViewAnalyses({ has_more, next_page_url, resultSet }) {
  return {
    type: UPDATE_SELF_MOST_VIEW_ANALYSES,
    payload: {
      has_more,
      next_page_url,
      resultSet,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export const acquireSelfMostViewAnalyses = ({
  url,
  per_page,
  accountId,
  fin_callback
}) => async dispatch => {
  try {
    const { has_more, next_page_url, data } = await fetchSelfMostViewAnalyses({
      url,
      accountId,
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
      updateSelfMostViewAnalyses({
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

function updateSelfAnalysesByDate(properties) {
  return {
    type: UPDATE_SELF_ANALYSES_BY_DATE,
    payload: {
      ...properties,
      init: !!1,
      updated_time: new Date()
    }
  };
}

export const acquireSelfAnalysesByDate = ({
  url,
  per_page,
  accountId,
  from,
  to,
  fin_callback
}) => async dispatch => {
  try {
    const { has_more, next_page_url, data } = await filterSelfAnalysesByDate({
      url,
      accountId,
      per_page,
      from,
      to
    });

    const { analyses, comments, replies, users, result } = parseAnalyses(data);
    const resultSet = result.toSet();

    const actions = [];
    !analyses.isEmpty() && actions.push(updateAnalyses(analyses));
    !comments.isEmpty() && actions.push(updateComments(comments));
    !replies.isEmpty() && actions.push(updateReplies(replies));
    !users.isEmpty() && actions.push(updateUsers(users));
    actions.push(
      updateSelfAnalysesByDate({
        has_more,
        next_page_url,
        resultSet,
        from,
        to
      })
    );
    actions.length && dispatch(generateCombinedActions(actions));
  } catch (err) {
  } finally {
    fin_callback && fin_callback();
  }
};
