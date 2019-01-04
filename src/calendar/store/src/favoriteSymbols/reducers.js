import {
  UPDATE_FAVORITE_SYMBOLS,
  FAVORITE_AN_SYMBOL,
  UN_FAVORITE_AN_SYMBOL
} from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../account/types";
import Immutable from "immutable";

export function favoriteSymbols(domain = Immutable.Set(), { type, payload }) {
  switch (type) {
    case UPDATE_FAVORITE_SYMBOLS:
      return payload.set;
    case FAVORITE_AN_SYMBOL:
      return domain.add(payload);
    case UN_FAVORITE_AN_SYMBOL:
      return domain.remove(payload);
    case UPDATE_ACCOUNT:
      return payload.authenticated ? Immutable.Set() : domain;

    case CLEAR_ACCOUNT:
      return Immutable.Set();
    default:
      return domain;
  }
}
