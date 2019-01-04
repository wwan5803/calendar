import { UPDATE_USERS_THAT_FOLLOWED_ME_IN_FLOAT_APP } from "./types";
import { FOLLOW_AN_USER, UN_FOLLOW_AN_USER } from "../types";
import { CLEAR_ACCOUNT } from "../../account/types";
import Immutable from "immutable";

// function followAnUserInState(state, userId) {
//   return {
//     ...state,
//     userList: state.userList.map(user => {
//       const { id } = user;
//       if (userId !== id) {
//         return user;
//       } else {
//         const { follower_count } = user;
//         return { ...user, follower_count: follower_count + 1, following: true };
//       }
//     })
//   };
// }
//
// function unFollowAnUserInState(state, userId) {
//   return {
//     ...state,
//     userList: state.userList.map(user => {
//       const { id } = user;
//       if (userId !== id) {
//         return user;
//       } else {
//         const { follower_count } = user;
//         return {
//           ...user,
//           follower_count: follower_count - 1,
//           following: false
//         };
//       }
//     })
//   };
// }

export function usersThatFollowedMeInFloatApp(
  state = {
    resultList: Immutable.List(),
    search: ""
  },
  action
) {
  switch (action.type) {
    case UPDATE_USERS_THAT_FOLLOWED_ME_IN_FLOAT_APP:
      return {
        resultList: action.result,
        search: action.search
      };

    // case FOLLOW_AN_USER:
    //   return followAnUserInState(state, action.userId);
    //
    // case UN_FOLLOW_AN_USER:
    //   return unFollowAnUserInState(state, action.userId);

    case CLEAR_ACCOUNT:
      return {
        resultList: Immutable.List(),
        search: ""
      };

    default:
      return state;
  }
}
