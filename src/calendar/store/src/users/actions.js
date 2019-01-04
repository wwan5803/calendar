import {
  FOLLOW_AN_USER,
  UN_FOLLOW_AN_USER,
  INSERT_A_FOLLOWED_USER,
  UPDATE_USERS,
  UPDATE_USER
} from "./types";
import { fetchFollowUser, fetchUnFollowUser } from "./service";
import { fetchAFollowedUser } from "./service";
import { showSignInAction } from "../globalModal/actions";

function insertAnFollowedUser(user) {
  return {
    type: INSERT_A_FOLLOWED_USER,
    payload: user
  };
}

export const acquireAnFollowedUser = userId => async dispatch => {
  try {
    const user = await fetchAFollowedUser(userId);
    dispatch(insertAnFollowedUser(user));
  } catch (err) {}
};

export const acquireFollowUser = userId => async (dispatch, getState) => {
  if (!getState().get("account").authenticated) {
    dispatch(showSignInAction);
  } else {
    const analyses = getState().get("analyses");
    try {
      await fetchFollowUser({ userId });
      dispatch(followAnUserInStore({ userId, analyses }));
    } catch (err) {}
  }
};

export const acquireUnfollowUser = userId => async (dispatch, getState) => {
  if (!getState().get("account").authenticated) {
    dispatch(showSignInAction);
  } else {
    const analyses = getState().get("analyses");
    try {
      await fetchUnFollowUser({ userId });
      dispatch(unFollowAnUserInStore({ userId, analyses }));
    } catch (err) {}
  }
};

export function followAnUserInStore({ userId, analyses }) {
  return {
    type: FOLLOW_AN_USER,
    userId: +userId,
    analyses
  };
}

export function unFollowAnUserInStore({ userId, analyses }) {
  return {
    type: UN_FOLLOW_AN_USER,
    userId: +userId,
    analyses
  };
}

export function updateUsers(users) {
  return {
    type: UPDATE_USERS,
    payload: users
  };
}

export function updateUser({ id, profile }) {
  return {
    type: UPDATE_USER,
    payload: {
      id,
      ...profile
    }
  };
}
