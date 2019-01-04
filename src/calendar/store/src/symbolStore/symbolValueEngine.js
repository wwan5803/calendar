import setAsap from "setasap";
import { updateTickValue } from "./symbolsStore";

const symbolValueUpdateHandlerMap = {};

export function registerSymbolValueUpdateHandler({ symbolId, handler }) {
  const handlerId = "__" + Math.random() + Math.random();

  symbolValueUpdateHandlerMap[symbolId] =
    symbolValueUpdateHandlerMap[symbolId] || {};
  symbolValueUpdateHandlerMap[symbolId][handlerId] = handler;

  return handlerId;
}

export function unRegisterSymbolValueUpdateHandler({ symbolId, handlerId }) {
  symbolValueUpdateHandlerMap[symbolId] &&
    delete symbolValueUpdateHandlerMap[symbolId][handlerId];
}

export function updateSymbolValue(payload) {
  updateTickValue(payload);

  const map = symbolValueUpdateHandlerMap[payload.symbolId];
  map && Object.keys(map).forEach(key => setAsap(map[key]));
}

export function forceInvokeSymbolValueUpdateHandler({ symbolId }) {
  const map = symbolValueUpdateHandlerMap[symbolId];
  map && Object.keys(map).forEach(key => setAsap(map[key]));
}
