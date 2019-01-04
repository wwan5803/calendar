import { UPDATE_MARKET_SYMBOLS_MAP } from "./types";
import {
  fetchHotMarketSymbols,
  fetchMarketsSymbols,
  fetchChangeSymbol
} from "./remoteDataHandler";
import Immutable from "immutable";

function symbolsToMap(symbols) {
  return Immutable.Map().withMutations(tmp => {
    symbols.forEach(symbol => {
      const { id, position } = symbol;
      tmp.set(+position, {
        id: +id,
        position: +position
      });
    });
  });
}

function updateMarketSymbolsMap(payload) {
  return {
    type: UPDATE_MARKET_SYMBOLS_MAP,
    payload
  };
}

export async function createAcquireMarketSymbolMap({
  authenticated,
  token,
  layout = 1
}) {
  try {
    const [symbols, lists] = await Promise.all([
      fetchHotMarketSymbols({
        layout
      }),
      fetchMarketsSymbols({
        authenticated,
        token
      })
    ]);

    const nextMap = Immutable.Map().withMutations(tmp => {
      if (symbols) {
        tmp.set("hot", symbolsToMap(symbols));
      }

      if (lists) {
        tmp.set("popular", symbolsToMap(lists[0]));
        tmp.set("forex", symbolsToMap(lists[1]));
        tmp.set("indices", symbolsToMap(lists[2]));
        tmp.set("commodities", symbolsToMap(lists[3]));
      }
    });
    return updateMarketSymbolsMap(nextMap);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireHotMarketSymbolsMap = () => async (dispatch, getState) => {
  try {
    const { hot_markets_theme_index: layout } = getState().get("account");
    let themeId;
    if (layout) {
      if (typeof layout === "boolean") {
        themeId = 1;
      } else {
        themeId = layout;
      }
    } else {
      themeId = 1;
    }
    const symbols = await fetchHotMarketSymbols({
      layout: themeId
    });
    if (symbols) {
      const marketSymbolsMap = getState().get("marketSymbolsMap");
      const map = symbolsToMap(symbols);
      const nextMap = marketSymbolsMap.set("hot", map);
      !Immutable.is(nextMap, marketSymbolsMap) &&
        dispatch(updateMarketSymbolsMap(nextMap));
    }
  } catch (err) {}
};

export const acquireMarketSymbolsMap = () => async (dispatch, getState) => {
  try {
    const { authenticated, token } = getState().get("account");
    const lists = await fetchMarketsSymbols({
      authenticated,
      token
    });
    if (lists) {
      const marketSymbolsMap = getState().get("marketSymbolsMap");
      const nextMap = marketSymbolsMap.withMutations(tmp => {
        tmp.set("popular", symbolsToMap(lists[0]));
        tmp.set("forex", symbolsToMap(lists[1]));
        tmp.set("indices", symbolsToMap(lists[2]));
        tmp.set("commodities", symbolsToMap(lists[3]));
      });
      !Immutable.is(nextMap, marketSymbolsMap) &&
        dispatch(updateMarketSymbolsMap(nextMap));
    }
  } catch (err) {}
};

export const acquireChangeMarketSymbol = ({ market, position, id }) => async (
  dispatch,
  getState
) => {
  try {
    await fetchChangeSymbol({ market, position, id });
    const marketSymbolsMap = getState().get("marketSymbolsMap");
    const nextMap = marketSymbolsMap.setIn([market, position], {
      position,
      id
    });
    !Immutable.is(nextMap, marketSymbolsMap) &&
      dispatch(updateMarketSymbolsMap(nextMap));
  } catch (err) {
    console.log(err);
  }
};
