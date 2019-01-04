import { UPDATE_HORIZONTAL_LAYOUT_SIZE } from "./types";

export function horizontalLayoutSize(
  domain = {
    offsetTop: 0,
    scrollAreaHeight: 0
  },
  { type, payload }
) {
  if (type === UPDATE_HORIZONTAL_LAYOUT_SIZE) {
    return { ...domain, ...payload };
  }

  return domain;
}
