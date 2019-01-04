import { apiPrefix } from "config/config";
import { authHelper, showCommonNetWorkErrorTip } from "utils";

const cache = {
  hot_market: {},
  markets: {}
};

export function updateHotMarketCache(layout, value) {
  cache.hot_market[layout] = value;
}

export function updateMarketsCache(market, value) {
  cache.markets[market] = value;
}

export function clearCache() {
  cache.hot_market = {};
  cache.markets = {};
}

function parseSymbolsList(list) {
  if (!list) return;
  const symbols = {};
  const maps = {};
  for (let i = 0; i < list.length; i++) {
    const entity = list[i];
    const {
      id,
      name,
      description,
      exchange,
      position,
      market,
      channel
    } = entity;

    // TODO make sure this rule works
    maps[position] = { position, id };

    if (!symbols[id]) {
      symbols[id] = {
        refCount: 1,
        id,
        channel,
        info: {
          name,
          description,
          exchange,
          market
        }
      };
    } else {
      // already have this symbol
      symbols[id].refCount++;
    }
  }
  return { symbols, maps };
}

export async function fetchHotMarketSymbols({ layout }) {
  try {
    const req = new Request(apiPrefix + "symbols/hot?theme_id=" + layout, {
      method: "get"
    });

    const res = await fetch(req);
    const { status } = res;

    if (status !== 200) {
      showCommonNetWorkErrorTip(status);
    } else {
      return await res.json();
    }
  } catch (err) {
    console.error(err);
  }
}

export async function fetchChangeSymbol({ market, position, id }) {
  try {
    const headers = authHelper.buildAuthHeader();
    headers.append("Content-Type", "application/json");

    let slider_id;
    if (market === "popular") {
      slider_id = 0;
    } else if (market === "forex") {
      slider_id = 1;
    } else if (market === "indices") {
      slider_id = 2;
    } else if (market === "commodities") {
      slider_id = 3;
    } else {
      return Promise.reject("Invalid slider id");
    }

    const req = new Request(apiPrefix + "settings/markets", {
      method: "post",
      headers,
      body: JSON.stringify({
        layout: [
          {
            slider_id,
            position,
            symbol_id: id
          }
        ]
      })
    });

    const res = await fetch(req);
    const { status } = res;

    if (status !== 200) {
      showCommonNetWorkErrorTip(status);
    } else {
      const result = await res.json();
      return result[0];
    }
  } catch (err) {
    console.error(err);
  }
}

export async function acquireHotMarketSymbols(layout) {
  if (!cache.hot_market[layout]) {
    const list = await fetchHotMarketSymbols(layout);
    list && updateHotMarketCache(layout, parseSymbolsList(list));
  }

  if (cache.hot_market[layout]) {
    return cache.hot_market[layout];
  } else {
    return Promise.reject();
  }
}

export async function fetchMarketsSymbols({ authenticated, token }) {
  const headers = authenticated
    ? new Headers({ Authorization: "Bearer " + token })
    : new Headers({});

  try {
    const req = new Request(apiPrefix + "symbols", {
      method: "get",
      headers
    });

    const res = await fetch(req);
    const { status } = res;

    if (status !== 200) {
      showCommonNetWorkErrorTip(status);
    } else {
      return await res.json();
    }
  } catch (err) {
    console.error(err);
  }
}

let oldAuthenticated = "impossible";

export async function acquireMarketsSymbols(market, authenticated) {
  if (!cache.markets[market] || oldAuthenticated !== authenticated) {
    // when authorization status changed, force update
    oldAuthenticated = authenticated;
    const lists = await fetchMarketsSymbols(authenticated);
    if (lists) {
      updateMarketsCache("popular", parseSymbolsList(lists[0]));
      updateMarketsCache("forex", parseSymbolsList(lists[1]));
      updateMarketsCache("indices", parseSymbolsList(lists[2]));
      updateMarketsCache("commodities", parseSymbolsList(lists[3]));
    }
  }

  if (cache.markets[market]) {
    return cache.markets[market];
  } else {
    return Promise.reject();
  }
}
