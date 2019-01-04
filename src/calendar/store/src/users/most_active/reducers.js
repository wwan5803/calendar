import { UPDATE_MOST_ACTIVE_USER } from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";
import Immutable from "immutable";
// import { FOLLOW_AN_USER, UN_FOLLOW_AN_USER } from "../types";

/*function followAnUserInState(state, userId) {
  const userList = state.userList.map(user => {
    const { id } = user;
    if (userId !== id) {
      return user;
    } else {
      const { follower_count } = user;
      return { ...user, follower_count: follower_count + 1, following: true };
    }
  });

  return { ...state, userList };
}

function unFollowAnUserInState(state, userId) {
  const userList = state.userList.map(user => {
    const { id } = user;
    if (userId !== id) {
      return user;
    } else {
      const { follower_count } = user;
      return { ...user, follower_count: follower_count - 1, following: false };
    }
  });

  return { ...state, userList };
}*/

export function mostActiveUsers(
  state = {
    // userList: Immutable.List(),
    resultList: Immutable.List(),
    search: ""
  },
  action
) {
  switch (action.type) {
    case UPDATE_MOST_ACTIVE_USER:
      return {
        // userList: action.users,
        resultList: action.result,
        search: action.search
      };

    /*case FOLLOW_AN_USER:
      return followAnUserInState(state, action.userId);

    case UN_FOLLOW_AN_USER:
      return unFollowAnUserInState(state, action.userId);*/

    case UPDATE_ACCOUNT:
      return action.payload.authenticated
        ? {
            // userList: Immutable.List(),
            resultList: Immutable.List(),
            search: ""
          }
        : state;

    case CLEAR_ACCOUNT:
      return {
        // userList: Immutable.List(),
        resultList: Immutable.List(),
        search: ""
      };

    default:
      return state;
  }
}
