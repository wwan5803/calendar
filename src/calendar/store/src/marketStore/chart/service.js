import { bridgeApiPrefix } from "config/config";

export async function getMarket15MinsData(id) {
  try {
    const req = new Request(
      bridgeApiPrefix + "getMarketData/" + id + "?resolution=M15",
      {
        method: "get"
      }
    );

    const res = await fetch(req);
    if (res.status === 200) {
      return await res.json();
    } else {
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
}
