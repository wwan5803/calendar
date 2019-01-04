import { UPDATE_USERS_THAT_FOLLOWED_ME_IN_FLOAT_APP } from "./types";
import { fetchUsersThatFollowedMe } from "./service";
import { parseUsers } from "../adapter";
import { updateUsers } from "../actions";

function updateUsersThatFollowedMeInFloatApp({ result, search }) {
  return {
    type: UPDATE_USERS_THAT_FOLLOWED_ME_IN_FLOAT_APP,
    result,
    search,
    init: !!1
  };
}

export const acquireUsersThatFollowedMeInFloatApp = (
  { search = "", fin_callback } = {}
) => async dispatch => {
  try {
    const userList = await fetchUsersThatFollowedMe(search);
    const { users, result } = parseUsers(userList);
    dispatch(updateUsers(users));
    dispatch(updateUsersThatFollowedMeInFloatApp({ result, search }));
    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
