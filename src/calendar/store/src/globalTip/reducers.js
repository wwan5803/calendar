import { ADD_GLOBAL_TIP } from "./types";

export function globalTip(state = {}, action) {
  switch (action.type) {
    case ADD_GLOBAL_TIP:
      return action.tip;
    default:
      return state;
  }
}
