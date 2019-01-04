import { symbolServer } from "config/config";

export async function fetchSubscribeChannels(channelString) {
  try {
    const res = await fetch(symbolServer, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: "c=" + encodeURIComponent(channelString)
    });
    return await res.text();
  } catch (err) {
    return Promise.reject(err);
  }
}
