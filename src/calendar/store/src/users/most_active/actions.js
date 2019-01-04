import { fetchMostActiveUsers } from "./service";
import { UPDATE_MOST_ACTIVE_USER } from "./types";
import { parseUsers } from "../adapter";
import { updateUsers } from "../actions";

export function updateMostActiveUsersInStore({ result, search }) {
  return {
    type: UPDATE_MOST_ACTIVE_USER,
    result,
    search
  };
}

export async function createAcquireMostActiveUsersActions({
  search = "",
  language,
  authenticated,
  token
}) {
  try {
    const userList = await fetchMostActiveUsers(search, language);
    const { users, result } = parseUsers(userList);
    return Promise.resolve([
      updateUsers(users),
      updateMostActiveUsersInStore({ result, search })
    ]);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireMostActiveUsers = (
  { search, language, fin_callback } = {}
) => async (dispatch, getState) => {
  try {
    const { authenticated, token } = getState().get("account");
    const [usersAction, maAction] = await createAcquireMostActiveUsersActions({
      search,
      language,
      authenticated,
      token
    });

    dispatch(usersAction);
    dispatch(maAction);

    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};
