import isBrowser from "./isBrowser";
export const MOBILE = "MOBILE";
export const TABLET = "TABLET";
export const LAPTOP = "LAPTOP";
export const DESKTOP = "DESKTOP";

let w;
let d;
let e;
let g;
let initialWidth;

if (isBrowser) {
  w = window;
  d = document;
  e = d.documentElement;
  g = d.getElementsByTagName("body")[0];
  initialWidth = w.innerWidth || e.clientWidth || g.clientWidth;
} else {
  initialWidth = 1920;
}

export { initialWidth };

export function calcSize(width) {
  if (width < 768) return MOBILE;
  if (width < 1280) return TABLET;
  if (width < 1800) return LAPTOP;
  return DESKTOP;
}
