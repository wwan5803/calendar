import jwtDecode from "jwt-decode";
import isBrowser from "./isBrowser";

let expireString = "";

function updateCookieByAccount(account) {
  if (!isBrowser) return;

  const { authenticated, hot_markets_theme_index, language } = account;

  if (!authenticated) {
    document.cookie =
      "hot_markets_theme_index=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "profile_language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return;
  }

  document.cookie = `hot_markets_theme_index=${hot_markets_theme_index}; expires=${expireString}; path=/;`;
  document.cookie = `profile_language=${language}; expires=${expireString}; path=/;`;
}

function updateCookieByUILanguage(language) {
  if (!isBrowser) return;

  if (language) {
    document.cookie = `ui_language=${language}; expires=${expireString}; path=/;`;
  }
}

function updateCookieByToken(token) {
  if (!isBrowser) return;

  if (!token) {
    document.cookie =
      "authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return;
  }

  const jwt = jwtDecode(token);
  const { exp } = jwt;
  if (!exp) {
    document.cookie =
      "authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return;
  }

  expireString = new Date(exp * 1000).toGMTString().replace("GMT", "UTC");

  document.cookie = `authenticated=true; expires=${expireString}; path=/;`;
  document.cookie = `token=${token}; expires=${expireString}; path=/;`;
}

const fns = (() => {
  let token;
  let account;
  let language;
  const getToken = () => {
    if (!token) {
      throw Error(`There's no token in current environment!`);
    }
    return token;
  };
  const setToken = t => {
    if (token === t) return;
    token = t;
    updateCookieByToken(t);
  };
  const updateAccount = a => {
    if (account === a) return;
    account = a;
    updateCookieByAccount(a);
  };
  const updateUILanguage = l => {
    if (language === l) return;
    language = l;
    updateCookieByUILanguage(l);
  };

  function testTokenExpire(t) {
    try {
      const token = t || getToken();
      const jwt = jwtDecode(token);
      const { exp } = jwt;
      if (!exp) return { expired: true };

      const now = parseInt(new Date().getTime() / 1000, 10);

      return {
        expired: exp <= now,
        expiredIn: exp - now
      };
    } catch (err) {
      return { expired: true };
    }
  }

  const buildAuthHeader = () =>
    new Headers({ Authorization: "Bearer " + getToken() });

  return {
    getToken,
    setToken,
    updateAccount,
    testTokenExpire,
    buildAuthHeader,
    updateUILanguage
  };
})();

export default fns;
