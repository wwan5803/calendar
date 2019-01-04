import { UPDATE_SYMBOLS } from "./types";
import Immutable from "immutable";

export function symbols(domain = Immutable.Map(), action) {
  switch (action.type) {
    case UPDATE_SYMBOLS:
      return action.payload;

    default:
      return domain;
  }
}
