import { UPDATE_TIMEZONE_STATE } from "./type";
import { fetchTimezone } from "./service";
import { transformListToMap } from "./adapter";

function updateTimezoneState(payload) {
  return {
    type: UPDATE_TIMEZONE_STATE,
    payload
  };
}

export async function createAcquireTimezoneAction() {
  try {
    const result = await fetchTimezone();
    return Promise.resolve(updateTimezoneState(transformListToMap(result)));
  } catch (err) {
    return Promise.reject(err);
  }
}

export const acquireTimezone = () => async dispatch => {
  try {
    const action = await createAcquireTimezoneAction();
    dispatch(action);
  } catch (err) {
    return Promise.reject(err);
  }
};
