import { SET_GLOBEL_ITEM } from "./types";

export function setGlobelItem(payload) {
  return {
    type: SET_GLOBEL_ITEM,
    payload
  };
}
