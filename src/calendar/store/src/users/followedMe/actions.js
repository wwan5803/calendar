import { UPDATE_USERS_THAT_FOLLOWED_ME } from "./types";
import {
  fetchUsersThatFollowedMe,
  fetchUsersThatFollowedMeByFilter
} from "./service";
import { parseUsers } from "../adapter";
import { updateUsers } from "../actions";

function updateUsersThatFollowedMe({ result, search }) {
  return {
    type: UPDATE_USERS_THAT_FOLLOWED_ME,
    result,
    search,
    init: !!1
  };
}

export const acquireUsersThatFollowedMe = (
  { search = "", fin_callback } = {}
) => async dispatch => {
  try {
    const userList = await fetchUsersThatFollowedMe(search);
    const { users, result } = parseUsers(userList);
    dispatch(updateUsers(users));
    dispatch(updateUsersThatFollowedMe({ result, search }));
    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};

export const acquireUsersThatFollowedMeByFilter = (
  { filter, fin_callback } = {}
) => async dispatch => {
  try {
    const userList = await fetchUsersThatFollowedMeByFilter(filter);
    const { users, result } = parseUsers(userList);
    dispatch(updateUsers(users));
    dispatch(updateUsersThatFollowedMe({ result }));
    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
