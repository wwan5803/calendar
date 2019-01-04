import Immutable from "immutable";

export function generateNumberKeyMap(obj) {
  const seed = Immutable.Map();
  if (!obj) return seed;
  return seed.withMutations(tmp => {
    Object.keys(obj).forEach(key => {
      tmp.set(+key, Immutable.fromJS(obj[key]));
    });
  });
}

export function generateStringKeyMap(obj) {
  const seed = Immutable.Map();
  if (!obj) return seed;
  return seed.withMutations(tmp => {
    Object.keys(obj).forEach(key => {
      tmp.set(key, Immutable.fromJS(obj[key]));
    });
  });
}
