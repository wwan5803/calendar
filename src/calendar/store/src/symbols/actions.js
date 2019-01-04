import { UPDATE_SYMBOLS } from "./types";
import { fetchSymbols } from "./service";
import { symbolsToMap } from "./adapter";
import { insertSourceSymbolToStore } from "../symbolStore";

function updateSymbols(symbols) {
  return {
    type: UPDATE_SYMBOLS,
    payload: symbols
  };
}

let fetching = !!0;

export async function createAcquireSymbolsAction() {
  try {
    const result = await fetchSymbols();
    const { COMMODITY, FOREX, INDICE } = result;
    return Promise.resolve(
      updateSymbols(symbolsToMap({ COMMODITY, FOREX, INDICES: INDICE }))
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireSymbols = ({ fin_callback } = {}) => async dispatch => {
  if (fetching) {
    fin_callback && fin_callback();
    return;
  }
  try {
    fetching = !!1;
    const result = await fetchSymbols();
    const { COMMODITY, FOREX, INDICE } = result;
    insertSourceSymbolToStore([...COMMODITY, ...FOREX, ...INDICE]);
    dispatch(
      updateSymbols(symbolsToMap({ COMMODITY, FOREX, INDICES: INDICE }))
    );
  } catch (err) {
  } finally {
    fetching = !!0;
    fin_callback && fin_callback();
  }
};
