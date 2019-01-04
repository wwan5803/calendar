import { UPDATE_PROFILE_PAGE_USER } from "./types";
import { fetchUser } from "./service";
import { updateUser } from "../actions";
import { addHeader, updateHeader } from "../../../actions";
import { generateCombinedActions } from "../../combinedHelper";

function updateProfilePageUser(userId) {
  return {
    type: UPDATE_PROFILE_PAGE_USER,
    payload: { userId, updated_time: new Date() }
  };
}

function getHeaderAction(hasHeader, user) {
  return hasHeader
    ? updateHeader({
        profileTitle: `Profile | ${user.nick_name} | Finlogix`,
        profileContent: "Finlogix Profile Page",
        profileImage: user.avatar,
        links: ""
      })
    : addHeader({
        profileTitle: `Profile | ${user.nick_name} | Finlogix`,
        profileContent: "Finlogix Profile Page",
        profileImage: user.avatar,
        links: ""
      });
}

export async function createAcquireProfilePageUserAction({
  userId,
  authenticated,
  token,
  hasHeader
}) {
  try {
    const user = await fetchUser({
      userId,
      authenticated,
      token
    });
    return Promise.resolve(
      user
        ? generateCombinedActions(
            updateUser({ id: userId, profile: user }),
            updateProfilePageUser(userId),
            getHeaderAction(hasHeader, user)
          )
        : void 0
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireProfilePageUser = ({ fin_callback, userId }) => async (
  dispatch,
  getState
) => {
  userId = +userId;
  try {
    const { authenticated, token } = getState().get("account");
    const hasHeader = getState().get("header").size === 0 ? false : true;
    // if (getState().get("header").size === 0) {
    //   headerAction = addHeader({
    //     profileTitle: "Finlogix",
    //     profileContent: "Finlogix is a trading platform",
    //     profileImage: "/img/finlogix_logo_mobile.png",
    //     links: ""
    //   });
    // } else {
    //   headerAction = updateHeader({
    //     profileTitle: "Finlogix",
    //     profileContent: "Finlogix is a trading platform",
    //     profileImage: "/img/finlogix_logo_mobile.png",
    //     links: ""
    //   });
    // }
    const action = await createAcquireProfilePageUserAction({
      userId,
      authenticated,
      token,
      hasHeader
    });
    action && dispatch(action);
  } catch (err) {
  } finally {
    fin_callback && fin_callback();
  }
};
