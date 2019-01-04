import {
  FAVORITE_AN_SYMBOL,
  UN_FAVORITE_AN_SYMBOL,
  UPDATE_FAVORITE_SYMBOLS
} from "./types";
import {
  fetchFavoriteSymbol,
  fetchUnFavoriteSymbol,
  fetchFavoriteSymbols
} from "./service";
import { showSignInAction } from "../globalModal/actions";
import Immutable from "immutable";

function favoriteAnSymbol(symbolId) {
  return {
    type: FAVORITE_AN_SYMBOL,
    payload: symbolId
  };
}

function unFavoriteAnSymbol(symbolId) {
  return {
    type: UN_FAVORITE_AN_SYMBOL,
    payload: symbolId
  };
}

function updateFavoriteSymbols({ set }) {
  return {
    type: UPDATE_FAVORITE_SYMBOLS,
    payload: {
      set,
      init: !!1
    }
  };
}

export const acquireFavoriteSymbol = ({ fin_callback, symbolId }) => async (
  dispatch,
  getState
) => {
  if (!getState().get("account").authenticated) {
    dispatch(showSignInAction);
  } else {
    try {
      await fetchFavoriteSymbol(symbolId);
      dispatch(favoriteAnSymbol(symbolId));
      fin_callback && fin_callback();
    } catch (err) {
    } finally {
      fin_callback && fin_callback();
    }
  }
};

export const acquireUnFavoriteSymbol = ({ fin_callback, symbolId }) => async (
  dispatch,
  getState
) => {
  if (!getState().get("account").authenticated) {
    dispatch(showSignInAction);
  } else {
    try {
      await fetchUnFavoriteSymbol(symbolId);
      dispatch(unFavoriteAnSymbol(symbolId));
      fin_callback && fin_callback();
    } catch (err) {
    } finally {
      fin_callback && fin_callback();
    }
  }
};

export const acquireFavoriteSymbols = ({ fin_callback }) => async dispatch => {
  try {
    const result = await fetchFavoriteSymbols();
    const set = Immutable.Set().withMutations(tmp => {
      result.forEach(symbol => {
        tmp.add(symbol.id);
      });
    });
    dispatch(updateFavoriteSymbols({ set }));
  } catch (err) {
    console.log(err);
  } finally {
    fin_callback && fin_callback();
  }
};
