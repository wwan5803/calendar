// TODO more serious pathname check -- only allow meaningful pathname (/home /picks ...)
export function generateAnalysisUrl({ pathname, search, analysisId }) {
  if (!pathname || !analysisId) {
    console.log("Invalid pathname or analysis id : ", pathname, analysisId);
    return;
  }

  // if (/\/my_analyses/.test(pathname)) {
  //   return `/home/analyses/${analysisId}`;
  // }
  //
  // if (/\/notification/.test(pathname)) {
  //   return `/home/analyses/${analysisId}`;
  // }

  if (search) {
    if (/\/analyses\/\d+/.test(pathname)) {
      return (
        pathname.replace(/\/analyses\/(\d+)/, `/analyses/${analysisId}`) +
        search
      );
    } else {
      return `${pathname}${pathname[pathname.length - 1] === "/"
        ? ""
        : "/"}analyses/${analysisId}${search}`;
    }
  } else {
    if (/\/analyses\/\d+/.test(pathname)) {
      return pathname.replace(/\/analyses\/(\d+)/, `/analyses/${analysisId}`);
    } else {
      return `${pathname}${pathname[pathname.length - 1] === "/"
        ? ""
        : "/"}analyses/${analysisId}`;
    }
  }
}

export function getAnalysisIdFromPathname({ pathname }) {
  if (/\/analyses\/(\d+)/.test(pathname))
    return +/\/analyses\/(\d+)/.exec(pathname)[1];
}
