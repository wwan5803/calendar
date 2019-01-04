import { UPDATE_USERS_THAT_I_FOLLOWED_IN_FLOAT_APP } from "./types";
import { UN_FOLLOW_AN_USER, FOLLOW_AN_USER } from "../types";
import { CLEAR_ACCOUNT } from "../../account/types";
import Immutable from "immutable";

export function usersThatIFollowedInFloatApp(
  state = {
    resultList: Immutable.List(),
    search: ""
  },
  action
) {
  switch (action.type) {
    case UPDATE_USERS_THAT_I_FOLLOWED_IN_FLOAT_APP:
      return {
        resultList: action.result,
        search: action.search
      };

    case FOLLOW_AN_USER:
      return state.resultList.contains(action.userId)
        ? state
        : {
            search: state.search,
            resultList: state.resultList.push(action.userId)
          };

    case UN_FOLLOW_AN_USER:
      return !state.resultList.contains(action.userId)
        ? state
        : {
            search: state.search,
            resultList: state.resultList.delete(
              state.resultList.indexOf(action.userId)
            )
          };

    case CLEAR_ACCOUNT:
      return {
        resultList: Immutable.List(),
        search: ""
      };

    default:
      return state;
  }
}
