import {
  UPDATE_DEALING_CUSTOMIZED_DATA,
  CLEAR_DEALING_CUSTOMIZED_DATA
} from "./types";

export function dealingCustomizedData(
  state = { showDealWithCustomizedData: !!0 },
  action
) {
  switch (action.type) {
    case UPDATE_DEALING_CUSTOMIZED_DATA:
      return {
        showDealWithCustomizedData: !!1,
        payload: action.payload
      };
    case CLEAR_DEALING_CUSTOMIZED_DATA:
      return {
        showDealWithCustomizedData: !!0
      };
    default:
      return state;
  }
}
