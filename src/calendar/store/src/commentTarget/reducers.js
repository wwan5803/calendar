import { UPDATE_COMMENT_TARGET } from "./types";
export function commentTarget(
  state = {
    hasTarget: !!0
  },
  { type, payload }
) {
  switch (type) {
    case UPDATE_COMMENT_TARGET:
      return payload;
    default:
      return state;
  }
}
