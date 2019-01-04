import { UPDATE_USERS_THAT_I_FOLLOWED } from "./types";
import { FOLLOW_AN_USER, UN_FOLLOW_AN_USER } from "../types";
import { CLEAR_ACCOUNT } from "../../account/types";
import Immutable from "immutable";

// function unFollowAnUserInState(state, userId) {
//   const userList = state.userList.filter(user => userId !== user.id);
//
//   return { ...state, userList };
// }
//
// function insertAFollowedUserInState(state, user) {
//   const { userList } = state;
//   const { id } = user;
//   for (let i = 0; i < userList.length; i++) {
//     if (userList[i].id === id)
//       throw "Invalid follow user operation, this user is already in followed list";
//   }
//   return { ...state, userList: [user, ...userList] };
// }

export function usersThatIFollowed(
  state = {
    resultList: Immutable.List(),
    search: ""
  },
  action
) {
  switch (action.type) {
    case UPDATE_USERS_THAT_I_FOLLOWED:
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

    // case UN_FOLLOW_AN_USER:
    //   return unFollowAnUserInState(state, action.userId);
    //
    // case INSERT_A_FOLLOWED_USER:
    //   return insertAFollowedUserInState(state, action.payload);

    case CLEAR_ACCOUNT:
      return {
        resultList: Immutable.List(),
        search: ""
      };

    default:
      return state;
  }
}
