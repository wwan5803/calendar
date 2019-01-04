import io from "socket.io-client";
import { symbolServer } from "config/config";

let socket;

export const isBridgeActive = () => socket !== undefined;

export function initBridgeConnection() {
  socket && destroyBridgeConnection();
  socket = io(symbolServer);
}

export function destroyBridgeConnection() {
  clearBridgeListener();
  socket && socket.disconnect();
  socket = void 0;
}

export function clearBridgeListener() {
  socket && socket.off();
}

export function registerBridgeListener({ key, handler }) {
  if (socket && key && handler) {
    socket.on(key, handler);
  }
}

export function unRegisterBridgeListener({ key }) {
  if (socket && key) {
    socket.off(key);
  }
}
