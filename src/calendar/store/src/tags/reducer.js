import { UPDATE_TAGS } from "./types";

export function tags(state = [], action) {
  switch (action.type) {
    case UPDATE_TAGS:
      return action.payload;
    default:
      return state;
  }
}
