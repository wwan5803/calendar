const symbolsMap = {};
const channelMap = {};

/**
 * usage : {0 : symbolStore}
 *
 * symbolStore = {
 *   symbolId : 0,
 *   name : 'AUDUSD',
 *   description : '',
 *   exchange : '',
 *   tickValue : {
 *     high,
 *     start,
 *     current,
 *     low,
 *     last_close
 *   },
 *   chartValue : []
 * }
 */

export const insertSymbolToStore = symbol => {
  const { symbolId, channel } = symbol;
  if (symbolsMap[symbolId]) return;

  symbolsMap[symbolId] = symbol;
  channelMap[channel] = symbolId;
};

export const insertSourceSymbolToStore = symbols => {
  symbols.forEach(symbol => {
    const { id: symbolId, name, accuracy, description, channel } = symbol;

    insertSymbolToStore({ name, accuracy, description, channel, symbolId });
  });
};

export const getSymbolStoreById = symbolId => symbolsMap[symbolId];

export const getSymbolIdByChannel = channel => channelMap[channel];

export const updateTickValue = payload => {
  const { symbolId, high, start, current, low, last_close } = payload;

  const symbol = symbolsMap[symbolId];

  symbol && (symbol.tickValue = { high, start, current, low, last_close });
};

export const fillTickValueIfNotExist = payload => {
  const { symbolId, high, start, current, low, last_close } = payload;

  const symbol = symbolsMap[symbolId];

  if (symbol && !symbol.tickValue) {
    symbol.tickValue = { high, start, current, low, last_close };
    return !!1;
  }
};
