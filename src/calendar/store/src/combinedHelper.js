export const COMBINED_ACTIONS = "COMBINED_ACTIONS";

export function generateCombinedActions() {
  const payload = {};
  if (!arguments.length) return { type: COMBINED_ACTIONS, payload: {} };
  const actions =
    arguments[0] instanceof Array ? arguments[0] : [].slice.call(arguments);

  actions.forEach(action => (payload[action.type] = action));
  return { type: COMBINED_ACTIONS, payload };
}

/**
 * 
 * use this only when action order insensitive
 */
export const generateCombinedReducer = array => (domain, actions) => {
  let result = domain;

  array.forEach(
    ({ type, handler }) =>
      actions.payload[type] && (result = handler(result, actions.payload[type]))
  );

  return result;
};
