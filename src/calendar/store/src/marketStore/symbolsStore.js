/*
 * actions :
 * 1. init store => trigger init UI subscription
 * 2. change symbol
 * 3. update symbol information
 * 4. update symbol price (low, start[, end], high, current)
 * 5. update symbol chart
 * *** change layout -- consider as another initial
 * */

export const INIT_SYMBOL_STORE = "INIT_SYMBOL_STORE";
export const UPDATE_SYMBOL = "UPDATE_SYMBOL";
export const CHANGE_SYMBOL = "CHANGE_SYMBOL";
export const CHANGE_VALUE = "CHANGE_VALUE";
export const CHANGE_CHART_VALUE = "CHANGE_CHART_VALUE";
const actions = { INIT_SYMBOL_STORE, UPDATE_SYMBOL };

export function createStore() {
  /**
   * symbols ->  key : symbol, use symbol id as the key
   * */

  /** a symbol instance :
   * {
   *  refCount : 1 -- how many UI ref to this symbol, when it become 0, the symbol can be removed
   *  id:101,
   *  info : {
   *    name : 'AUDUSD',
   *    description :'',
   *    exchange : '',
   *  }
   *  commonValue : {
   *    trend :
   *    current:
   *    high :
   *    low :
   *    start:
   *    [maybe as well as end price]
   *  },
   *  chartValue : [] -- 15 min chart
   * }
   *
   *
   */

  /**
   * maps -> key : map, use position as the key
   * */

  /**
   * a map position instance :
   * {
   *   position : 1,
   *   id : 101
   * }
   * */

  /**
   * withChartSymbols : some symbols in the UI have chart, this kind of
   * symbols we have to push 15 mins history of 1 day for it
   *
   * a instance :
   * {
   *   refCount : 1,
   *   id : 101,
   * }
   * */
  let state = { symbols: {}, maps: {}, withChartSymbols: {} };

  const subscription = {
    INIT_SYMBOL_STORE: {},
    CHANGE_SYMBOL: {},
    UPDATE_SYMBOL: {},
    CHANGE_VALUE: {},
    CHANGE_CHART_VALUE: {}
  };

  function subscribe(type, fn) {
    if (!actions[type]) throw "Not support such subscribe type : " + type;

    const subscriptionID = "__" + Math.random() + Math.random();
    subscription[type][subscriptionID] = fn;
    return subscriptionID;
  }

  function subscribeInit(fn) {
    const subscriptionID = "__" + Math.random() + Math.random();
    subscription[INIT_SYMBOL_STORE][subscriptionID] = fn;
    return subscriptionID;
  }

  function subscribeChangeSymbol(fn, position) {
    const subscriptionID = "__" + Math.random() + Math.random();
    subscription[CHANGE_SYMBOL][position] =
      subscription[CHANGE_SYMBOL][position] || {};
    subscription[CHANGE_SYMBOL][position][subscriptionID] = fn;
    return subscriptionID;
  }

  function subscribeChangeValue(fn, symbolId) {
    const subscriptionID = "__" + Math.random() + Math.random();
    subscription[CHANGE_VALUE][symbolId] =
      subscription[CHANGE_VALUE][symbolId] || {};
    subscription[CHANGE_VALUE][symbolId][subscriptionID] = fn;
    return subscriptionID;
  }

  function subscribeChangeChartValue(fn, symbolId) {
    const subscriptionID = "__" + Math.random() + Math.random();
    subscription[CHANGE_CHART_VALUE][symbolId] =
      subscription[CHANGE_CHART_VALUE][symbolId] || {};
    subscription[CHANGE_CHART_VALUE][symbolId][subscriptionID] = fn;
    return subscriptionID;
  }

  function unSubscribe(type, subscriptionID) {
    if (!actions[type]) throw "Not support such unSubscribe type : " + type;

    subscription[type] && delete subscription[type][subscriptionID];
  }

  function unSubscribeInit(subscriptionID) {
    subscription[INIT_SYMBOL_STORE] &&
      delete subscription[INIT_SYMBOL_STORE][subscriptionID];
  }

  function unSubscribeChangeSymbol(subscriptionID, position) {
    subscription[CHANGE_SYMBOL] &&
      subscription[CHANGE_SYMBOL][position] &&
      delete subscription[CHANGE_SYMBOL][position][subscriptionID];
  }

  function unSubscribeChangeValue(subscriptionID, symbolId) {
    subscription[CHANGE_VALUE] &&
      subscription[CHANGE_VALUE][symbolId] &&
      delete subscription[CHANGE_VALUE][symbolId][subscriptionID];
  }

  function unSubscribeChangeChartValue(subscriptionID, symbolId) {
    subscription[CHANGE_CHART_VALUE] &&
      subscription[CHANGE_CHART_VALUE][symbolId] &&
      delete subscription[CHANGE_CHART_VALUE][symbolId][subscriptionID];
  }

  function getState() {
    return state;
  }

  function getSubscribingSymbols() {
    try {
      return Object.keys(state.symbols);
    } catch (err) {}
  }

  function getChartSymbols() {
    try {
      return Object.keys(state.withChartSymbols);
    } catch (err) {}
  }

  function init(symbols, maps) {
    state.symbols = symbols;
    state.maps = maps;
    for (const key in subscription[INIT_SYMBOL_STORE]) {
      const fn = subscription[INIT_SYMBOL_STORE][key];
      typeof fn === "function" && fn();
    }
  }

  function updateMap(position, id) {
    const map = state.maps[position];
    map.id = id;
  }

  function changeSymbol({ symbol, position }) {
    // 1. update symbols list
    // 1.1  find the old symbol, refresh it's refCount, delete it if needed
    const oldMap = state.maps[position];
    const oldSymbol = state.symbols[oldMap.id];
    oldSymbol.refCount--;
    if (oldSymbol.refCount <= 0) {
      delete state.symbols[oldSymbol.id];
    }

    // 1.2 insert new symbol, if already exist, update refCount
    if (state.symbols[symbol.id]) {
      state.symbols[symbol.id].refCount++;
    } else {
      state.symbols[symbol.id] = symbol;
    }

    // 2. update map
    updateMap(position, symbol.id);

    // 3. invoke subscription
    try {
      const fns = subscription[CHANGE_SYMBOL][position];
      for (const key in fns) {
        const fn = fns[key];
        typeof fn === "function" && fn();
      }
    } catch (err) {
      console.error(err);
    }
  }

  function insertChartSymbol(symbolId) {
    // record a chart symbol, if already exist, increase it's ref count, otherwise create a record
    const symbol = state.withChartSymbols[symbolId];
    if (!symbol) {
      state.withChartSymbols[symbolId] = {
        refCount: 1,
        id: symbolId
      };
    } else {
      symbol.refCount++;
    }
  }

  function releaseChartSymbol(symbolId) {
    // de-record a chart symbol, decrease it's ref count, if down to 0, delete the record
    const symbol = state.withChartSymbols[symbolId];
    if (symbol) {
      symbol.refCount--;
      if (symbol.refCount <= 0) {
        delete state.withChartSymbols[symbolId];
      }
    }
  }

  function switchChartSymbol(oldSymbolId, newSymbolId) {
    releaseChartSymbol(oldSymbolId);
    insertChartSymbol(newSymbolId);
  }

  // symbol's price, trend value update
  function updateValue(newValue) {
    const { high, start, low, current, symbolId, last_close } = newValue;

    const symbol = state.symbols[symbolId];
    symbol.commonValue = symbol.commonValue || {};

    symbol.commonValue = {
      ...symbol.commonValue,
      high,
      start,
      low,
      current,
      last_close
    };

    if (!subscription[CHANGE_VALUE]) return;
    try {
      const fns = subscription[CHANGE_VALUE][symbolId];
      for (const key in fns) {
        const fn = fns[key];
        typeof fn === "function" && fn();
      }
    } catch (err) {
      console.error(err);
    }
  }

  function update15minsHistory(newValue) {
    const { symbolId, values } = newValue;
    const symbol = state.symbols[symbolId];
    symbol.chartValue = symbol.chartValue || [];
    for (let i = 0; i < values.length; i++) {
      symbol.chartValue[i] = values[i];
    }

    if (!subscription[CHANGE_CHART_VALUE]) return;

    try {
      const fns = subscription[CHANGE_CHART_VALUE][symbolId];
      for (const key in fns) {
        const fn = fns[key];
        typeof fn === "function" && fn();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return {
    getState,
    getSubscribingSymbols,
    getChartSymbols,
    subscribe,
    subscribeInit,
    subscribeChangeSymbol,
    subscribeChangeValue,
    subscribeChangeChartValue,
    unSubscribe,
    unSubscribeInit,
    unSubscribeChangeSymbol,
    unSubscribeChangeValue,
    unSubscribeChangeChartValue,
    init,
    changeSymbol,
    updateValue,
    update15minsHistory,
    insertChartSymbol,
    releaseChartSymbol,
    switchChartSymbol
  };
}
