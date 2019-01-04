import io from "socket.io-client";
import { symbolServer } from "config/config";

let socket;

export const isSelfServerActive = () => socket !== undefined;

export function initSelfServerConnection() {
  socket && destroySelfServerConnection();
  socket = io(symbolServer);
}

export function destroySelfServerConnection() {
  clearSelfServerListener();
  socket && socket.disconnect();
  socket = void 0;
}

export function clearSelfServerListener() {
  socket && socket.off();
}

export function registerSelfServerListener({ key, handler }) {
  if (socket && key && handler) {
    socket.on(key, handler);
  }
}

export function unRegisterSelfServerListener({ key }) {
  if (socket && key) {
    socket.off(key);
  }
}
