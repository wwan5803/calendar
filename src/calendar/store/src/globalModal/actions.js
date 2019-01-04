import { CLOSE_GLOBAL_MODAL, SHOW_GLOBAL_MODAL } from "./types";

export function closeGlobalModal() {
  return {
    type: CLOSE_GLOBAL_MODAL
  };
}

export function showGlobalModal(payload) {
  return {
    type: SHOW_GLOBAL_MODAL,
    payload
  };
}

export const showSignInAction = {
  type: SHOW_GLOBAL_MODAL,
  payload: "sign_in"
};
