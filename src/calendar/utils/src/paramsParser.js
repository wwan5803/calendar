const esc = encodeURIComponent;

export function encodeParams(params) {
  const arr = [];
  Object.keys(params).forEach(k => {
    const key = esc(k);
    const value = esc(params[k]);
    key && value && arr.push(key + "=" + value);
  });
  return arr.join("&");
}

export function urlToObject(url) {
  if (url[0] === "?") url = url.substr(1);

  const result = {};
  url.split("&").forEach(function(part) {
    const item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
