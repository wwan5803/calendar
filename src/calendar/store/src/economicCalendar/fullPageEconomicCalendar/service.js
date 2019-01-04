import { encodeParams } from "utils";
import {
  apiPrefix,
  symbolServer,
  bridgeApiPrefix
} from "config/config";

export async function fetchFullPageEconomicCalendarData({
  page,
  perPage,
  start,
  end
}) {
  try {
    let req;
    if (!page && !perPage) {
      req = new Request(
        bridgeApiPrefix +
          `getEconomicData?start=${start}&end=${end}&pageSize=1000`,
        {
          method: "get"
        }
      );
    } else {
      req = new Request(
        bridgeApiPrefix + `getEconomicData?page=${page}&pageSize=${perPage}`,
        {
          method: "get"
        }
      );
    }
    const res = await fetch(req);
    return await res.json();
  } catch (err) {
    console.log(err);
    return Promise.reject();
  }
}
