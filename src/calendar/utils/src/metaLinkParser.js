export default function metaLinkParser({
  hostname,
  pathname,
  prevUrl,
  nextUrl
}) {
  const links = {};
  if (!prevUrl && nextUrl) {
    addNextUrl({
      hostname,
      pathname,
      nextUrl,
      links
    });
  } else if (prevUrl && nextUrl) {
    addNextUrl({
      hostname,
      pathname,
      nextUrl,
      links
    });
    addPreviousUrl({
      hostname,
      pathname,
      prevUrl,
      links
    });
  } else if (prevUrl && !nextUrl) {
    addPreviousUrl({
      hostname,
      pathname,
      prevUrl,
      links
    });
  }
  return links;
  //links: eg. [next, prev]
}

function addNextUrl({ hostname, pathname, nextUrl, links }) {
  const page = urlToObject(nextUrl).page;
  const perPage = urlToObject(nextUrl).per_page
    ? urlToObject(nextUrl).per_page
    : 12;
  const next = `${hostname}${pathname}?page=${page}&per_page=${perPage}`;
  links["nextLink"] = next;
  return links;
}

function addPreviousUrl({ hostname, pathname, prevUrl, links }) {
  const page = urlToObject(prevUrl).page;
  const perPage = urlToObject(prevUrl).per_page
    ? urlToObject(prevUrl).per_page
    : 12;
  const prev = `${hostname}${pathname}?page=${page}&per_page=${perPage}`;
  links["prevLink"] = prev;
  return links;
}

function urlToObject(url) {
  url = url.split("?");
  const result = {};
  url[1].split("&").forEach(function(part) {
    const item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
