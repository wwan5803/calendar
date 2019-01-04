import { initialWidth, calcSize } from "utils";

const UPDATE_SCREEN_SIZE = "UPDATE_SCREEN_SIZE";

export function screenSize(domain = calcSize(initialWidth), action) {
  switch (action.type) {
    case UPDATE_SCREEN_SIZE:
      return action.screenSize;
    default:
      return domain;
  }
}

export function updateScreenSize(screenSize) {
  return {
    type: UPDATE_SCREEN_SIZE,
    screenSize
  };
}
