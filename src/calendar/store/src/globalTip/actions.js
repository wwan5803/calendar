import { ADD_GLOBAL_TIP } from "./types";

export function addGlobalTip(tip) {
  return {
    type: ADD_GLOBAL_TIP,
    tip
  };
}
