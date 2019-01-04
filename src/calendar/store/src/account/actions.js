import { showCommonNetWorkErrorTip } from "utils";
import { UPDATE_ACCOUNT, CLEAR_ACCOUNT } from "./types";
import {
  fetchAccountInfo,
  fetchUpdateLayout,
  fetchLogin,
  fetchRefreshToken,
  fetchSignUp,
  fetchLogout
} from "./service";
import { updateUILanguage } from "../language";

export function updateAccount(payload) {
  return (dispatch, getState) => {
    const account = getState().get("account");

    const result = {};

    Object.keys(payload).forEach(key => {
      const value = payload[key];
      if (value !== account[key]) {
        result[key] = value;
      }
    });

    dispatch({
      type: UPDATE_ACCOUNT,
      payload: result
    });
  };
}

export function clearAccount() {
  return {
    type: CLEAR_ACCOUNT
  };
}

export async function createAcquireAccountActions({ token }) {
  try {
    const user = await fetchAccountInfo({ token });
    const actions = [];
    actions.push({
      type: UPDATE_ACCOUNT,
      payload: user
    });
    if (user.ui_language) {
      actions.push(updateUILanguage(user.ui_language));
    }
    return Promise.resolve(actions);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireAccountProcess = ({ fin_callback } = {}) => async (
  dispatch,
  getState
) => {
  try {
    const { token, authenticated } = getState().get("account");
    if (!authenticated) return;

    const actions = await createAcquireAccountActions({ token });
    actions.forEach(action => dispatch(action));

    fin_callback && fin_callback();
  } catch (err) {
    fin_callback && fin_callback();
  }
};

export const persistUpdateLayout = ({ layout, cb }) => async dispatch => {
  try {
    await fetchUpdateLayout(layout);
    dispatch(
      updateAccount({
        hot_markets_theme_index: layout
      })
    );
    cb(1);
  } catch (err) {
    cb(0);
  }
};

export const login = ({
  email,
  password,
  captcha,
  success,
  fail,
  failVerification,
  fin
}) => async dispatch => {
  try {
    const json = await fetchLogin({ email, password, captcha });
    success && success();

    dispatch(
      updateAccount({ token: json.token, authenticated: !!1, ...json.user })
    );

    if (json.user && json.user.ui_language) {
      dispatch(updateUILanguage(json.user.ui_language));
    }

    fin && fin();
  } catch (err) {
    console.log(err);
    if (err.status === 422 && err.statusText === "Unprocessable Entity") {
      failVerification && failVerification();
    } else {
      fail && fail();
    }
    fin && fin();
  }
};

export const refreshToken = () => async dispatch => {
  try {
    const token = await fetchRefreshToken();
    dispatch(updateAccount({ token }));
  } catch (err) {}
};

export const signUp = ({
  email,
  password,
  code,
  success,
  fail
}) => async dispatch => {
  try {
    const res = await fetchSignUp({ email, password, code });
    const { status } = res;

    switch (status) {
      case 200:
        const json = await res.json();
        success && success();
        dispatch(
          updateAccount({ token: json.token, authenticated: !!1, ...json.user })
        );
        break;
      case 400:
        fail && fail({ wrongCode: true });
        break;
      case 422:
        fail && fail({ invalidEntities: true });
        break;
      default:
        showCommonNetWorkErrorTip(status);
    }
  } catch (err) {}
};

export const logout = () => dispatch => {
  fetchLogout();
  dispatch(clearAccount());
};
