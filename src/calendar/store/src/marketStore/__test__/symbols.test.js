import "isomorphic-fetch";
import {
  getAllAvailableSymbolChannel,
  getHotSymbolListByThemeId,
  getMarketSymbolList,
  subSymbolChannel,
  genChannelDayTickStringBySymbol,
  genChannelDayTickStringBySymbolList,
  getChannelStringOfHotSymbolList,
  getChannelStringOfMarketSymbolList,
  getAllSymbolsLastValue,
  parseAllSymbolsLastValue
} from "../symbolsService";

import { hotSymbols_1, allSubStr } from "./data";

it(`success to get channel string from symbol`, () => {
  expect(genChannelDayTickStringBySymbol(hotSymbols_1[0])).toBe(
    "CS.D.AUDCAD.CFD.IP:DAY"
  );
});

it(`success to get all channel string from symbol list`, () => {
  expect(genChannelDayTickStringBySymbolList(hotSymbols_1)).toBe(allSubStr);
});

it(`won't fail to get all available symbol channels`, async () => {
  const result = await getAllAvailableSymbolChannel();
  expect(result).not.toBe("fail");
});

it(`won't fail to get hot symbol list`, async () => {
  let result = await getHotSymbolListByThemeId(1);
  expect(result).not.toBe("fail");
  result = await getHotSymbolListByThemeId(2);
  expect(result).not.toBe("fail");
  result = await getHotSymbolListByThemeId(3);
  expect(result).not.toBe("fail");
});

it(`won't fail to get market symbol list`, async () => {
  let result = await getMarketSymbolList();
  expect(result).not.toBe("fail");
  result = await getMarketSymbolList("popular");
  expect(result).not.toBe("fail");
  result = await getMarketSymbolList("forex");
  expect(result).not.toBe("fail");
  result = await getMarketSymbolList("indices");
  expect(result).not.toBe("fail");
  result = await getMarketSymbolList("commodities");
  expect(result).not.toBe("fail");
});

it(`won't fail to get channel string of hot symbol list`, async () => {
  const result = await getChannelStringOfHotSymbolList(1);
  expect(result).not.toBe("fail");
});

it(`won't fail to get channel string of market symbol list`, async () => {
  const result = await getChannelStringOfMarketSymbolList();
  expect(result).not.toBe("fail");
});

it.skip(`can subscribe eurusd daily tick by ticks symbol channel`, async () => {
  const status = await subSymbolChannel(`CHART:CS.D.EURUSD.CFD.IP:DAY`);
  expect(status).toBe(200);
});

it.skip(`won't fail to subscribe hot symbol list`, async () => {
  let channelString = await getChannelStringOfHotSymbolList(1);
  let status = await subSymbolChannel(channelString);
  expect(status).toBe(200);
  channelString = await getChannelStringOfHotSymbolList(2);
  status = await subSymbolChannel(channelString);
  expect(status).toBe(200);
  channelString = await getChannelStringOfHotSymbolList(3);
  status = await subSymbolChannel(channelString);
  expect(status).toBe(200);
});

it.skip(`won't fail to subscribe market symbol list`, async () => {
  let channelString = await getChannelStringOfMarketSymbolList();
  let status = await subSymbolChannel(channelString);
  expect(status).toBe(200);
});

it(`won't fail to acquire all symbols' last price`, async () => {
  const res = await getAllSymbolsLastValue();
  expect(res).not.toBe("fail");
});

it(`success to parse all symbols' last price string`, async () => {
  const res = await getAllSymbolsLastValue();
  expect(res).not.toBe("fail");
  expect(typeof parseAllSymbolsLastValue(res)).toBe("object");
});
