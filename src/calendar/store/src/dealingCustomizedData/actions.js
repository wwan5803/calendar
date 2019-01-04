import {
  UPDATE_DEALING_CUSTOMIZED_DATA,
  CLEAR_DEALING_CUSTOMIZED_DATA
} from "./types";

export function updateDealingCustomizedData(payload) {
  return {
    type: UPDATE_DEALING_CUSTOMIZED_DATA,
    payload
  };
}
export function clearDealingCustomizedData() {
  return {
    type: CLEAR_DEALING_CUSTOMIZED_DATA
  };
}
