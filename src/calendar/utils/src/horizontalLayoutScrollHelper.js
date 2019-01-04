import setAsap from "setasap";
let scrollTop = 0;
const scrollTopHandlersMap = {};

export function registerScrollTopHandler(handler) {
  const hashKey = `__scrollTopHandler__${Math.random()}${Math.random()}${Math.random()}`;
  scrollTopHandlersMap[hashKey] = handler;
  return function unRegisterScrollTopHandler() {
    delete scrollTopHandlersMap[hashKey];
  };
}

function execScrollTopHandlers() {
  setAsap(() => {
    Object.keys(scrollTopHandlersMap).forEach(hashKey => {
      const handler = scrollTopHandlersMap[hashKey];
      try {
        if (typeof handler === "function") {
          handler(getHorizontalLayoutScrollTop());
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
}

export function updateHorizontalLayoutScrollTop(s) {
  scrollTop = s;
  execScrollTopHandlers();
}

export function getHorizontalLayoutScrollTop() {
  return scrollTop;
}
