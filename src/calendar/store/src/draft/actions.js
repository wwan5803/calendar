import { UPDATE_DRAFT_LIST, DELETE_A_DRAFT } from "./types";
import { fetchDraft, fetchDeleteDraft } from "./service";

function updateDraftList(payload) {
  return {
    type: UPDATE_DRAFT_LIST,
    payload
  };
}

export const acquireDraftList = ({ fin_callback } = {}) => async dispatch => {
  try {
    const result = await fetchDraft();
    if (result) {
      dispatch(updateDraftList(result));
    }
  } catch (err) {
    console.log(err);
  } finally {
    fin_callback && fin_callback();
  }
};

function deleteADraftAction(id) {
  return {
    type: DELETE_A_DRAFT,
    payload: id
  };
}

export const deleteADraft = ({ id, fin_callback }) => async dispatch => {
  try {
    await fetchDeleteDraft(id);
    dispatch(deleteADraftAction(id));
  } catch (err) {
  } finally {
    fin_callback && fin_callback();
  }
};
