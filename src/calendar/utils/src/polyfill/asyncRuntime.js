import Promise from "promise-polyfill";
import setAsap from "setasap";
Promise._immediateFn = setAsap;

const g = Function("return this")();
g.Promise = g.Promise || Promise;
// (async () => {})();
