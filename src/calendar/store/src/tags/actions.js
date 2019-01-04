import { UPDATE_TAGS } from "./types";
import { fetchTags } from "./service";

function updateTags(tagList) {
  return {
    type: UPDATE_TAGS,
    payload: tagList
  };
}

export async function createAcquireTagsAction() {
  try {
    const tagList = await fetchTags();
    return Promise.resolve(updateTags(tagList));
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireTags = ({ fin_callback } = {}) => async dispatch => {
  try {
    const action = await createAcquireTagsAction();
    dispatch(action);
    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
