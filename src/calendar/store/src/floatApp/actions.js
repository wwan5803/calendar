import { TOGGLE_FLOAT_APP, CLOSE_FLOAT_APP } from "./types";

export function toggleFloatApp() {
  return {
    type: TOGGLE_FLOAT_APP
  };
}

export function closeFloatApp() {
  return {
    type: CLOSE_FLOAT_APP
  };
}
