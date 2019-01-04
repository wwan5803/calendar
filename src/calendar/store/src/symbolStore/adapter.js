import {
  registerBridgeListener,
  unRegisterBridgeListener,
  initBridgeConnection,
  destroyBridgeConnection,
  isBridgeActive
} from "../bridgeService";
import { fetchSubscribeChannels } from "./symbolsBridgeService";
import { fillTickValueIfNotExist, getSymbolIdByChannel } from "./symbolsStore";
import { bridgeApiPrefix } from "config/config";
import {
  updateSymbolValue,
  forceInvokeSymbolValueUpdateHandler
} from "./symbolValueEngine";

async function fetchAllSymbolsLastValue() {
  try {
    const req = new Request(bridgeApiPrefix + "getAllSymbolLastPrices", {
      method: "get"
    });

    const res = await fetch(req);
    if (res.status === 200) {
      return await res.json();
    } else {
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
}

function parseAllSymbolsLastValue(values) {
  const result = {};
  for (let key in values) {
    const array = values[key];
    const item = array[array.length - 1];
    try {
      const content = item.replace(/'/g, '"');
      const obj = JSON.parse(content);
      result[key] = obj;
    } catch (err) {
      return;
    }
  }
  return result;
}

export async function acquireAllSymbolsLastValue() {
  try {
    const ret = await fetchAllSymbolsLastValue();
    const values = parseAllSymbolsLastValue(ret);
    for (let symbolId in values) {
      const value = values[symbolId];

      if (value.h && value.o && value.c && value.l) {
        const updated = fillTickValueIfNotExist({
          high: parseFloat(value.h),
          start: parseFloat(value.o),
          current: parseFloat(value.c),
          low: parseFloat(value.l),
          last_close: parseFloat(value.lc),
          symbolId
        });
        if (updated) {
          forceInvokeSymbolValueUpdateHandler({ symbolId });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

const generateSymbolDailyTickDataHandler = symbolId => str => {
  try {
    const content = str.replace(/'/g, '"');
    const obj = JSON.parse(content);
    if (!(obj.h && obj.o && obj.c && obj.l)) return;

    const symbolValues = {
      high: parseFloat(obj.h),
      start: parseFloat(obj.o),
      current: parseFloat(obj.c),
      low: parseFloat(obj.l),
      last_close: parseFloat(obj.lc),
      symbolId
    };

    updateSymbolValue(symbolValues);
  } catch (err) {}
};

const keyHandlerMap = {};

function registerSymbolDailyTickListener({ symbolId }) {
  const key = `${symbolId}:D1`;
  if (keyHandlerMap[key]) {
    return keyHandlerMap[key]++;
  }

  keyHandlerMap[key] = 1;

  registerBridgeListener({
    key,
    handler: generateSymbolDailyTickDataHandler(symbolId)
  });
}

export function registerSymbolsDailyTickListener({ ids }) {
  if (!isBridgeActive()) {
    initBridgeConnection();
  }
  ids.forEach(symbolId => registerSymbolDailyTickListener({ symbolId }));
}

function unRegisterSymbolDailyTickListener({ symbolId }) {
  const key = `${symbolId}:D1`;

  if (!keyHandlerMap[key]) {
    throw `Incorrect unRegister request key : ${key}`;
  }

  keyHandlerMap[key]--;

  if (!keyHandlerMap[key]) {
    unRegisterBridgeListener({ key });
  }
}

export function unRegisterSymbolsDailyTickListener({ ids }) {
  if (!isBridgeActive()) {
    return;
  }
  ids.forEach(symbolId => unRegisterSymbolDailyTickListener({ symbolId }));
}

export function clearSymbolDailyTickListener() {
  destroyBridgeConnection();
}

const registeredIds = {};
export function isIdRegistered(id) {
  return !!registeredIds[id];
}

export async function registerChannelForSymbol(symbolId){
  if (!symbolId) return Promise.reject("symbol id invalid : " + symbolId);
  if (isIdRegistered(symbolId)) return Promise.resolve();
  const channelString = symbolId + ":D1";
  try {
    await fetchSubscribeChannels(channelString);
    registeredIds[symbolId] = !!1;
  } catch (err) {
    console.log(err);
  }
}

export async function registerChannelForSymbols(ids) {
  const arr = [];
  const shouldRegisterIds = [];
  ids.forEach(symbolId => {
    if (!isIdRegistered(symbolId)) shouldRegisterIds.push(symbolId);
  });

  if (!shouldRegisterIds.length) {
    return;
  }

  shouldRegisterIds.forEach(symbolId => {
    arr.push(symbolId + ":D1");
  });
  if (arr.length > 0) {
    const channelString = arr.join(",");
    try {
      await fetchSubscribeChannels(channelString);
      shouldRegisterIds.forEach(symbolId => {
        registeredIds[symbolId] = !!1;
      });
    } catch (err) {
      console.log(err);
    }
  }
}
