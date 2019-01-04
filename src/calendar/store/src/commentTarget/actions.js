import { UPDATE_COMMENT_TARGET } from "./types";
export const setCommentTarget = ({ targetId, userId, nick_name }) => ({
  type: UPDATE_COMMENT_TARGET,
  payload: {
    hasTarget: !!1,
    targetId,
    userId,
    nick_name
  }
});

export const clearCommentTarget = {
  type: UPDATE_COMMENT_TARGET,
  payload: {
    hasTarget: !!0
  }
};
