import isBrowser from "./isBrowser";
function getScrollTop() {
  const parent = document.getElementById("page-container");
  if (!parent) return 0;
  const ele = parent.firstElementChild;
  return ele ? ele.scrollTop : 0;
}

function setScrollTop(position) {
  const parent = document.getElementById("page-container");
  if (!parent) return 0;
  const ele = parent.firstElementChild;
  ele && (ele.scrollTop = position);
}

function getOffsetTop(element) {
  const { top } = element.getBoundingClientRect();
  return top + getScrollTop();
}

const defaultScrollAnimate = {
  offset: 0,
  duration: 400,
  easing: easeOutQuad
};

let animating = !!0;

export function animateScroll(id) {
  if (!isBrowser) return;
  const element = id ? document.getElementById(id) : document.body;
  if (element) {
    if (animating) {
      return;
    }
    animating = !!1;
    scrollTo(element, defaultScrollAnimate);
    setTimeout(() => (animating = !!0), defaultScrollAnimate.duration);
  }
}

function scrollTo(element, { offset, duration, easing }) {
  const start = getScrollTop();
  const to = getOffsetTop(element) + offset;
  const change = to - start;
  const increment = 20;

  function animate(elapsedTime) {
    const elapsed = elapsedTime + increment;
    const position = easing(null, elapsed, start, change, duration);
    setScrollTop(position);
    if (elapsed < duration) {
      setTimeout(() => {
        animate(elapsed);
      }, increment);
    }
  }

  animate(0);
}

function easeOutQuad(x, t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}





