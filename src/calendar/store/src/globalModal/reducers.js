import { SHOW_GLOBAL_MODAL, CLOSE_GLOBAL_MODAL } from "./types";
import { createReducer } from "redux-create-reducer";

export const globalModal = createReducer(
  { show: !!0 },
  {
    [SHOW_GLOBAL_MODAL]: (domain, { payload }) => {
      if (typeof payload === "string") {
        return {
          show: !!1,
          componentName: payload
        };
      }

      return {
        show: !!1,
        ...payload
      };
    },
    [CLOSE_GLOBAL_MODAL]: () => ({ show: !!0 })
  }
);
