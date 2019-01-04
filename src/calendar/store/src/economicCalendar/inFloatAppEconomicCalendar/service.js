import { encodeParams } from "utils";
import {
  apiPrefix,
  symbolServer,
  bridgeApiPrefix
} from "config";

export async function fetchInFloatAppEconomicCalendarData({ start, end }) {
  try {
    const req = new Request(
      bridgeApiPrefix +
        `getEconomicData?start=${start}&end=${end}&pageSize=500`,
      {
        method: "get"
      }
    );

    const res = await fetch(req);
    return await res.json();
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
}
