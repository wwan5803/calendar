import { UPDATE_HORIZONTAL_LAYOUT_SIZE } from "./types";

let action = {};
let hasDelayFn = !!0;

export const updateHorizontalLayoutSize = payload => dispatch => {
  Object.keys(payload).forEach(key => {
    action[key] = payload[key];
  });
  if (hasDelayFn) return;
  hasDelayFn = !!1;
  setTimeout(() => {
    const _action = { ...action };
    action = {};
    hasDelayFn = !!0;
    dispatch({
      type: UPDATE_HORIZONTAL_LAYOUT_SIZE,
      payload: _action
    });
  }, 33);
};
