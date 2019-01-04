import { apiPrefix } from "config/config";
import { authHelper } from "utils";
import { showCommonNetWorkErrorTip } from "utils";
let cache;

async function acquireSymbols() {
  try {
    const req = new Request(apiPrefix + "favourites/symbol/100", {
      method: "get",
      headers: authHelper.buildAuthHeader()
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

function parseSymbols(symbols) {
  const forex = [];
  const indices = [];
  const commodities = [];

  const ret = { forex, indices, commodities };

  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    const { id, name, market_id } = symbol;
    switch (market_id) {
      case 1:
        forex.push({ id, name, type: "forex" });
        break;
      case 2:
        indices.push({ id, name, type: "indices" });
        break;
      case 3:
        commodities.push({ id, name, type: "commodities" });
        break;
      default:
        throw `Invalid market id : ${market_id}`;
    }
  }
  return ret;
}

export async function getSymbols() {
  if (!cache) {
    const result = await acquireSymbols();
    if (result) {
      const { symbols } = result;
      cache = parseSymbols(symbols);
    }
  }
  return cache;
}

export async function changeSymbol({ market, position, id }) {
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

export function convertSymbol(remoteSymbol) {
  const { id, name, description, market, exchange } = remoteSymbol;
  return {
    refCount: 1,
    id,
    info: {
      name,
      description,
      exchange,
      market
    }
  };
}
