import { UPDATE_DRAFT_LIST, DELETE_A_DRAFT } from "./types";
import { CLEAR_ACCOUNT } from "../account/types";

export function draftList(state = [], action) {
  switch (action.type) {
    case UPDATE_DRAFT_LIST:
      return action.payload;
    case DELETE_A_DRAFT:
      return (() => {
        const arr = [];
        state.forEach(draft => {
          if (+draft.id !== +action.payload) {
            arr.push(draft);
          }
        });
        if (arr.length === state.length) return state;
        return arr;
      })();
    case CLEAR_ACCOUNT:
      return [];
    default:
      return state;
  }
}
