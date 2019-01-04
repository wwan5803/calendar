import { UPDATE_IN_SLIDER_USERS } from "./types";
import { fetchInSliderUsers } from "./service";

function updateInSliderUsersInStore(users) {
  return {
    type: UPDATE_IN_SLIDER_USERS,
    users
  };
}

export const acquireInSliderUsers = (
  { fin_callback, lang } = {}
) => async dispatch => {
  try {
    const users = await fetchInSliderUsers(lang);
    dispatch(updateInSliderUsersInStore(users));
    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
