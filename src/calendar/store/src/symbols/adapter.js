import Immutable from "immutable";

export function symbolsToMap(symbols) {
  const { COMMODITY, FOREX, INDICES } = symbols;

  return Immutable.Map().withMutations(tmp => {
    const commodityIds = [];
    const forexIds = [];
    const indexIds = [];
    COMMODITY.forEach(symbol => {
      const id = symbol.id;
      tmp.set(id, symbol);
      commodityIds.push(id);
    });
    FOREX.forEach(symbol => {
      const id = symbol.id;
      tmp.set(id, symbol);
      forexIds.push(id);
    });
    INDICES.forEach(symbol => {
      const id = symbol.id;
      tmp.set(id, symbol);
      indexIds.push(id);
    });

    tmp.set("COMMODITY", commodityIds);
    tmp.set("FOREX", forexIds);
    tmp.set("INDICES", indexIds);
  });
}
