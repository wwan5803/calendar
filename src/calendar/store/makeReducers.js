import { combineReducers } from 'redux';
import globalsReducer from './reducers';

export const makeRootReducer = (asyncReducers = {}) => (
  combineReducers({
    global: globalsReducer, // 注入全局reducer
    ...asyncReducers, // hook 以后用来注入异步reducer
  })
);

export const injectReducers = (store, reducers) => {
  store.asyncReducers = { // eslint-disable-line no-param-reassign
    ...store.asyncReducers,
    ...reducers,
  };
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
