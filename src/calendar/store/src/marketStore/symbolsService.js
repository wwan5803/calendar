import io from "socket.io-client";
import { encodeParams } from "utils";
import {
  apiPrefix,
  symbolServer,
  bridgeApiPrefix
} from "config/config";
export async function getAllAvailableSymbolChannel() {
  try {
    const req = new Request(apiPrefix + "symbols", {
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

export async function getHotSymbolListByThemeId(themeId) {
  try {
    const req = new Request(apiPrefix + "symbols/hot?theme_id=" + themeId, {
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

export async function getMarketSymbolList(market) {
  try {
    const req = new Request(apiPrefix + "symbols", {
      method: "get"
    });

    const res = await fetch(req);
    if (res.status !== 200) return Promise.reject();
    const list = await res.json();
    if (market) {
      switch (market) {
        case "popular":
          return list[0];
        case "forex":
          return list[1];
        case "indices":
          return list[2];
        case "commodities":
          return list[3];
        default:
          return list;
      }
    } else return list;
  } catch (err) {
    return Promise.reject();
  }
}

export function genChannelDayTickStringBySymbol(symbol) {
  if (typeof symbol === "string") symbol = JSON.parse(symbol);
  return symbol.channel + ":D1";
}

export function genChannelDayTickStringBySymbolList(symbolList) {
  return symbolList.reduce(
    (acc, symbol, currentIndex) =>
      acc +
      genChannelDayTickStringBySymbol(symbol) +
      (currentIndex === symbolList.length - 1 ? "" : ","),
    ""
  );
}

export async function getChannelStringOfHotSymbolList(themeId) {
  const result = await getHotSymbolListByThemeId(themeId);
  if (result !== "fail") {
    return "CHART:" + genChannelDayTickStringBySymbolList(result);
  }
  return Promise.reject();
}

export async function getChannelStringOfMarketSymbolList(market) {
  const result = await getMarketSymbolList(market);
  if (result !== "fail") {
    if (market) return "CHART:" + genChannelDayTickStringBySymbolList(result);
    return (
      "CHART:" +
      genChannelDayTickStringBySymbolList(result[0]) +
      "," +
      genChannelDayTickStringBySymbolList(result[1]) +
      "," +
      genChannelDayTickStringBySymbolList(result[2]) +
      "," +
      genChannelDayTickStringBySymbolList(result[3])
    );
  }
  return Promise.reject();
}

export async function subSymbolChannel(channelString) {
  try {
    const headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    const req = new Request(symbolServer, {
      method: "post",
      body: encodeParams({ c: channelString }),
      headers
    });

    const res = await fetch(req);
    return res.status;
  } catch (err) {
    return Promise.reject();
  }
}

let socket;
const listeningList = [];

export function connectWebSocket() {
  if (!socket) {
    socket = io(symbolServer);
  }
}

export function disconnectSocket() {
  removeAllListenerOnWebSocket();
  socket && socket.disconnect();
  socket = void 0;
}

export function listenOnWebSocket({ key, handler }) {
  if (socket) {
    socket.on(key, handler);
    listeningList.push(key);
  }
}

export function removeListenerOnWebSocket(key) {
  socket && socket.off(key);
}

export function removeAllListenerOnWebSocket() {
  socket && socket.off();
}

/***
 * Acquire all symbols last value from server
 *
 * For the symbols page, after setup websocket connection,
 * do acquire all symbols last value to avoid too much blank symbol
 *
 */
export async function getAllSymbolsLastValue() {
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

export function parseAllSymbolsLastValue(values) {
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
