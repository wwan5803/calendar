import { createReducer } from "redux-create-reducer";
import { UPDATE_MARKET_SYMBOLS_MAP } from "./types";
import Immutable from "immutable";

function handler(domain, action) {
  return action.payload;
}

export const marketSymbolsMap = createReducer(Immutable.Map(), {
  [UPDATE_MARKET_SYMBOLS_MAP]: handler
});
