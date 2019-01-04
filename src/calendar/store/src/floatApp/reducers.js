import { TOGGLE_FLOAT_APP, CLOSE_FLOAT_APP } from "./types";
export function floatApp(state = { active: !!0 }, action) {
  switch (action.type) {
    case TOGGLE_FLOAT_APP:
      return {
        ...state,
        active: !state.active
      };
    case CLOSE_FLOAT_APP:
      return {
        ...state,
        active: !!0
      };
    default:
      return state;
  }
}
