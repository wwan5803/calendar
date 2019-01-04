import { FOLLOW_AN_USER, UN_FOLLOW_AN_USER } from "../types";
import { UPDATE_IN_SLIDER_USERS } from "./types";
import { CLEAR_ACCOUNT, UPDATE_ACCOUNT } from "../../account/types";

function followAnUserInState(state, userId) {
  return state.map(user => {
    const { id } = user;
    if (userId !== id) {
      return user;
    } else {
      const { follower_count } = user;
      return { ...user, follower_count: follower_count + 1, following: true };
    }
  });
}

function unFollowAnUserInState(state, userId) {
  return state.map(user => {
    const { id } = user;
    if (userId !== id) {
      return user;
    } else {
      const { follower_count } = user;
      return { ...user, follower_count: follower_count - 1, following: false };
    }
  });
}

export function inSliderUsers(state = [], action) {
  switch (action.type) {
    case UPDATE_IN_SLIDER_USERS:
      return action.users;

    case FOLLOW_AN_USER:
      return followAnUserInState(state, action.userId);

    case UN_FOLLOW_AN_USER:
      return unFollowAnUserInState(state, action.userId);

    case UPDATE_ACCOUNT:
      return action.payload.authenticated ? [] : state;

    case CLEAR_ACCOUNT:
      return [];

    default:
      return state;
  }
}
