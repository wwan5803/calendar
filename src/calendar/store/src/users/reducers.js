import {
  UPDATE_USERS,
  UPDATE_USER,
  FOLLOW_AN_USER,
  UN_FOLLOW_AN_USER
} from "./types";
import { createReducer } from "redux-create-reducer";
import Immutable from "immutable";
import { generateCombinedReducer, COMBINED_ACTIONS } from "../combinedHelper";

function mergeUsers(domain, action) {
  return domain.mergeDeep(action.payload);
}

function updateUsersIfNeed(domain, { payload: { id, ...rest } }) {
  if (domain.has(id)) {
    return domain.set(id, domain.get(id).merge(Immutable.fromJS({ ...rest })));
  }

  return domain.set(id, Immutable.fromJS({ id, ...rest }));
}

function followAnUserInState(state, action) {
  if (!state.has(action.userId)) return state;

  const result = state.withMutations(tmp => {
    tmp.setIn([action.userId, "following"], !!1);
    tmp.setIn(
      [action.userId, "follower_count"],
      +tmp.getIn([action.userId, "follower_count"]) + 1
    );
  });

  return Immutable.is(state, result) ? state : result;
}

function unFollowAnUserInState(state, action) {
  if (!state.has(action.userId)) return state;

  const result = state.withMutations(tmp => {
    tmp.setIn([action.userId, "following"], !!0);
    tmp.setIn(
      [action.userId, "follower_count"],
      +tmp.getIn([action.userId, "follower_count"]) - 1
    );
  });

  return Immutable.is(state, result) ? state : result;
}

export const users = createReducer(Immutable.Map(), {
  [UPDATE_USERS]: mergeUsers,
  [UPDATE_USER]: updateUsersIfNeed,
  [FOLLOW_AN_USER]: followAnUserInState,
  [UN_FOLLOW_AN_USER]: unFollowAnUserInState,
  [COMBINED_ACTIONS]: generateCombinedReducer([
    {
      type: UPDATE_USERS,
      handler: mergeUsers
    },
    {
      type: UPDATE_USER,
      handler: updateUsersIfNeed
    }
  ])
});
