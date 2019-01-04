import { encodeParams, urlToObject } from "utils";

// function filterAnalysisSearchFiled(searchObj) {
//   const result = {};
//   const searchKeys = Object.keys(searchObj);
//   const symbolsKeys = searchKeys.filter(key => /^symbols\[\d\]$/.test(key));
//   const tagsKeys = searchKeys.filter(key => /^tags\[\d\]$/.test(key));
//   const directionsKeys = searchKeys.filter(key =>
//     /^posts_directions\[\d\]$/.test(key)
//   );
//   const time_periodKeys = searchKeys.filter(key =>
//     /^time_period\[\d\]$/.test(key)
//   );
//   [...symbolsKeys, ...tagsKeys, ...directionsKeys, ...time_periodKeys].forEach(
//     key => (result[key] = searchObj[key])
//   );
//   if (searchObj.per_page) result.per_page = searchObj.per_page;
//   if (searchObj.contains_strategy) result.contains_strategy = 1;
//   return result;
// }

function filterAnalysisSearchFiled(searchObj) {
  const result = {};
  if (searchObj.posts_directions) {
    let posts_directions_arr = searchObj.posts_directions.split(",");
    posts_directions_arr.forEach((value, key) => {
      result[`posts_directions[${key}]`] = value;
    });
  }

  if (searchObj.time_period) {
    let time_period_arr = searchObj.time_period.split(",");
    time_period_arr.forEach((value, key) => {
      result[`time_period[${key}]`] = value;
    });
  }
  if (searchObj.symbols) {
    let symbols_arr = searchObj.symbols.split(",");
    symbols_arr.forEach((value, key) => {
      result[`symbols[${key}]`] = value;
    });
  }

  if (searchObj.tags) {
    let tags_arr = searchObj.tags.split(",");
    tags_arr.forEach((value, key) => {
      result[`tags[${key}]`] = value;
    });
  }

  if (searchObj.per_page) result.per_page = searchObj.per_page;
  if (searchObj.contains_strategy) result.contains_strategy = 1;

  return result;
}

export function parseAnalysisSearchUrl(search) {
  try {
    const searchObj = urlToObject(search);
    const searchUrl = encodeParams(filterAnalysisSearchFiled(searchObj));
    return searchUrl.length > 0 ? searchUrl : undefined;
  } catch (err) {
    return undefined;
  }
}
