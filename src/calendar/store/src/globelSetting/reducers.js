import { SET_GLOBEL_ITEM } from "./types";

export function globelSetting(state = {autoPlay: true, baseModalOpen: false}, action) {
  switch (action.type) {
    case SET_GLOBEL_ITEM:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
