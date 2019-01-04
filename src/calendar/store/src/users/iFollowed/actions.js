import { UPDATE_USERS_THAT_I_FOLLOWED } from "./types";
import {
  fetchUsersThatIFollowed,
  fetchUsersThatIFollowedByFilter
} from "./service";
import { parseUsers } from "../adapter";
import { updateUsers } from "../actions";

function updateUsersThatIFollowed({ result, search }) {
  return {
    type: UPDATE_USERS_THAT_I_FOLLOWED,
    result,
    search,
    init: !!1
  };
}

export const acquireUsersThatIFollowed = (
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

export const acquireUsersThatIFollowedByFilter = (
  { filter, fin_callback } = {}
) => async dispatch => {
  try {
    const userList = await fetchUsersThatIFollowedByFilter(filter);
    const { users, result } = parseUsers(userList);
    dispatch(updateUsers(users));
    dispatch(updateUsersThatIFollowed({ result }));
    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
