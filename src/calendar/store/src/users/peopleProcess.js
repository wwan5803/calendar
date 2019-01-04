// import { fetchFollowUser, fetchUnFollowUser } from "./service";
// import {
//   followAnUserInStore,
//   unFollowAnUserInStore,
//   acquireAnFollowedUser
// } from "./actions";
//
// const fetchingMap = {
//   followAnUser: {},
//   unFollowAnUser: {}
// };
//
// export function generateUserProcessActions({
//   authenticated,
//   popupAuthIfNotAuthenticated,
//   dispatch
// }) {
//   function isValid({ userId }) {
//     if (!userId) return;
//     if (!authenticated) {
//       popupAuthIfNotAuthenticated();
//       return;
//     }
//     return true;
//   }
//
//   return {
//     followAnUser: async ({ userId }) => {
//       if (isValid({ userId })) {
//         if (fetchingMap.followAnUser[userId]) return;
//         fetchingMap.followAnUser[userId] = true;
//         try {
//           await fetchFollowUser({ userId });
//           dispatch(followAnUserInStore({ userId }));
//           dispatch(acquireAnFollowedUser(userId));
//           fetchingMap.followAnUser[userId] = false;
//         } catch (err) {
//           fetchingMap.followAnUser[userId] = false;
//         }
//       }
//     },
//     unFollowAnUser: async ({ userId }) => {
//       if (isValid({ userId })) {
//         if (fetchingMap.unFollowAnUser[userId]) return;
//         fetchingMap.unFollowAnUser[userId] = true;
//         try {
//           await fetchUnFollowUser({ userId });
//           dispatch(unFollowAnUserInStore({ userId }));
//           fetchingMap.unFollowAnUser[userId] = false;
//         } catch (err) {
//           fetchingMap.unFollowAnUser[userId] = false;
//         }
//       }
//     }
//   };
// }
