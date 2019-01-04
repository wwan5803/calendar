import { authHelper, showCommonNetWorkErrorTip } from "utils";
import { apiPrefix } from "config/config";
import { updateAccount, clearAccount } from "./actions";
import { updateUILanguage } from "../language";

export async function fetchAccountInfo({ token }) {
  try {
    const headers = new Headers({ Authorization: "Bearer " + token });
    const req = new Request(apiPrefix + "users/me", {
      method: "post",
      headers
    });

    const res = await fetch(req);
    if (res.status === 200) {
      const { user } = await res.json();
      return Promise.resolve(user);
    } else {
      showCommonNetWorkErrorTip(res.status);
      return Promise.reject(res.status);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function fetchUpdateLayout(layout) {
  try {
    const headers = authHelper.buildAuthHeader();
    headers.append("Content-Type", "application/json");
    const req = new Request(apiPrefix + "settings/system", {
      method: "post",
      body: JSON.stringify({ hot_markets_theme_index: layout }),
      headers
    });

    const { status } = await fetch(req);
    if (status === 200) {
      return Promise.resolve();
    } else {
      showCommonNetWorkErrorTip(status);
      return Promise.reject();
    }
  } catch (err) {}
}

export async function fetchLogin({ email, password, captcha }) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    const req = new Request(apiPrefix + "login", {
      method: "post",
      credentials: "include",

      body: JSON.stringify({ email, password, captcha }),
      headers
    });

    const res = await fetch(req);
    const { status, statusText } = res;

    if (status === 401 || status === 422) {
      return Promise.reject({ status, statusText });
    } else if (status !== 200) {
      showCommonNetWorkErrorTip(status);
      return Promise.reject({ status, statusText });
    } else {
      const json = await res.json();
      return Promise.resolve(json);
    }
  } catch (err) {
    return Promise.reject(err ? err : "something went wrong");
  }
}

export async function fetchRefreshToken() {
  try {
    const headers = authHelper.buildAuthHeader();
    const req = new Request(apiPrefix + "refresh_token", {
      method: "get",
      headers
    });

    const res = await fetch(req);
    if (res.status === 200) {
      const { token } = await res.json();
      return Promise.resolve(token);
    } else {
      return Promise.reject();
    }
  } catch (err) {}
}

export async function fetchSignUp({ email, password, code }) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    const req = new Request(apiPrefix + "register", {
      method: "post",
      body: JSON.stringify({
        name: email,
        email,
        password,
        code,
        password_confirmation: password
      }),
      headers
    });

    const res = await fetch(req);
    const status = res.status;
    if (status === 200 || status === 400 || status === 422)
      return Promise.resolve(res);
    else {
      showCommonNetWorkErrorTip(status);
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function fetchLogout() {
  try {
    const token = authHelper.getToken();

    const headers = new Headers({
      Authorization: "Bearer " + token
    });
    const req = new Request(apiPrefix + "logout", {
      method: "post",
      headers
    });

    await fetch(req);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}
