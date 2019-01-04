import { UPDATE_USERS_THAT_I_FOLLOWED_IN_FLOAT_APP } from "./types";
import { fetchUsersThatIFollowed } from "./service";
import { parseUsers } from "../adapter";
import { updateUsers } from "../actions";

function updateUsersThatIFollowed({ result, search }) {
  return {
    type: UPDATE_USERS_THAT_I_FOLLOWED_IN_FLOAT_APP,
    result,
    search,
    init: !!1
  };
}

export const acquireUsersThatIFollowedInFloatApp = (
  { search = "", fin_callback } = {}
) => async dispatch => {
  try {
    const userList = await fetchUsersThatIFollowed(search);
    const { users, result } = parseUsers(userList);
    dispatch(updateUsers(users));
    dispatch(updateUsersThatIFollowed({ result, search }));
    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
