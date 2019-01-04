const subscriber = {};

export function subscribeGlobalTipHandler(handler) {
  const handlerId = "" + Math.random() + Math.random() + Math.random();
  subscriber[handlerId] = handler;
  return function unsubscribeGlobalTip() {
    delete subscriber[handlerId];
  };
}

function dispatchGlobalTip(tip) {
  try {
    Object.keys(subscriber).forEach(handlerId => {
      const handler = subscriber[handlerId];
      if (typeof handler === "function") {
        handler(tip);
      }
    });
  } catch (err) {}
}

export const COMMON_NET_WORK_ERROR = "COMMON_NET_WORK_ERROR";

export function showCommonNetWorkErrorTip(httpStatus) {
  dispatchGlobalTip({
    type: COMMON_NET_WORK_ERROR,
    payload: httpStatus
  });
}

export function showTip(tip) {
  dispatchGlobalTip({ payload: tip });
}
